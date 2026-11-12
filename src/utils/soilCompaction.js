import { numeric } from './labInputValues.js'

export const PROCTOR_EXAMPLE_SOURCE = 'https://wsdot.wa.gov/publications/manuals/fulltext/M46-01/t99.pdf'
export const PROCTOR_MOLD = { diameterMold: 10.16, heightMold: 11.64 }
const exampleVolume = Math.PI * PROCTOR_MOLD.diameterMold ** 2 * PROCTOR_MOLD.heightMold / 4

// The five moisture/density pairs are from the WSDOT worked example.
// The individual weighings are reconstructed for the example mold and containers.
export const PROCTOR_EXAMPLE = [[11.3, 1.831], [12.1, 1.853], [12.8, 1.873], [13.6, 1.869], [14.2, 1.857]]
  .map(([w, dry], i) => ({
    id: i + 1, name: `Titik ${i + 1}`, ...PROCTOR_MOLD, gs: 2.65,
    moldTare: 2150, moldWithSoil: +(2150 + exampleVolume * dry * (1 + w / 100)).toFixed(2),
    containers: [12, 12.5, 13].map((m1, j) => {
      const drySoil = 25 + j
      return { id: j + 1, label: `Cawan ${j + 1}`, m1, m3: m1 + drySoil, m2: +(m1 + drySoil * (1 + w / 100)).toFixed(3) }
    }),
  }))

export function soilMoisture(tare, wet, dry) {
  const [m1, m2, m3] = [tare, wet, dry].map(numeric)
  return [m1, m2, m3].every(Number.isFinite) && m1 >= 0 && m3 > m1 && m2 >= m3
    ? 100 * (m2 - m3) / (m3 - m1) : null
}

export function hasProctorTare(sample) {
  return Object.hasOwn(sample, 'moldTare') || Object.hasOwn(sample, 'moldWithSoil')
}

export function calculateProctor(samples) {
  const computed = samples.map((sample, i) => {
    const [d, h, gs] = [sample.diameterMold, sample.heightMold, sample.gs].map(numeric)
    const separateTare = hasProctorTare(sample)
    const rawMass = numeric(sample.massMoldSoil)
    const [tare, gross] = [sample.moldTare, sample.moldWithSoil].map(numeric)
    const mass = separateTare
      ? tare > 0 && gross > tare ? gross - tare : null
      : rawMass > 0 ? rawMass < 10 ? rawMass * 1000 : rawMass : null
    const volume = d > 0 && h > 0 ? Math.PI * d * d * h / 4 : null
    const containers = (sample.containers ?? []).map((c, j) => {
      const [m1, m2, m3] = [c.m1, c.m2, c.m3].map(numeric)
      const wPct = soilMoisture(m1, m2, m3)
      return {
        id: c.id ?? j + 1, label: c.label || `Cawan ${j + 1}`, m1, m2, m3, wPct,
        wAir: wPct === null ? null : m2 - m3, wPadat: wPct === null ? null : m3 - m1, isInvalid: wPct === null,
      }
    })
    const moistureComplete = containers.length > 0 && containers.every((c) => !c.isInvalid)
    const avgW = moistureComplete ? containers.reduce((sum, c) => sum + c.wPct, 0) / containers.length : null
    const gammaWet = volume !== null && mass !== null ? mass / volume : null
    const gammaDry = gammaWet !== null && avgW !== null ? gammaWet / (1 + avgW / 100) : null
    const gammaZav = gs > 0 && avgW !== null ? gs / (1 + avgW * gs / 100) : null
    return {
      ...sample, id: sample.id ?? i + 1, name: sample.name || `Titik ${i + 1}`,
      diameterMold: d, heightMold: h, gs, moldTare: tare, moldWithSoil: gross,
      separateTare, massMoldSoil: rawMass, massSoilGram: mass, volumeMold: volume,
      containers, moistureComplete, avgW, gammaWet, gammaDry, gammaZav,
      aboveZav: gammaDry !== null && gammaZav !== null && gammaDry > gammaZav + 1e-9,
      isInvalid: gammaDry === null || !(gs > 0),
    }
  })
  const ordered = computed.filter(({ gammaDry }) => gammaDry !== null).sort((a, b) => a.avgW - b.avgW)
  const peak = ordered.reduce((best, point) => !best || point.gammaDry > best.gammaDry ? point : best, null)
  const peakIndex = ordered.indexOf(peak)
  const [left, right] = [ordered[peakIndex - 1], ordered[peakIndex + 1]]
  const sameGs = computed.every((point) => Math.abs(point.gs - computed[0].gs) < 1e-6)
  const isError = computed.some((point) => point.isInvalid)
  const aboveZav = computed.some((point) => point.aboveZav)
  const unique = new Set(ordered.map((point) => point.avgW)).size === ordered.length
  let mdd = null
  let omc = null
  if (!isError && !aboveZav && sameGs && unique && left && right && peak.gammaDry > left.gammaDry && peak.gammaDry > right.gammaDry) {
    const dx1 = left.avgW - peak.avgW
    const dx2 = right.avgW - peak.avgW
    const dy1 = (left.gammaDry - peak.gammaDry) / dx1
    const dy2 = (right.gammaDry - peak.gammaDry) / dx2
    const a = (dy2 - dy1) / (dx2 - dx1)
    const b = dy1 - a * dx1
    const offset = -b / (2 * a)
    const vertexW = peak.avgW + offset
    const vertexD = peak.gammaDry + b * offset + a * offset ** 2
    const zav = peak.gs / (1 + vertexW * peak.gs / 100)
    if (a < 0 && offset > dx1 && offset < dx2 && vertexD <= zav + 1e-9) {
      mdd = vertexD
      omc = vertexW
    }
  }

  const wet = computed.map((s) => s.gammaWet).filter(Number.isFinite)
  const avgWet = wet.length ? wet.reduce((sum, value) => sum + value, 0) / wet.length : null
  const issues = [
    isError ? 'Lengkapi penimbangan, dimensi cetakan, Gs, dan seluruh cawan. Syarat massa cawan M₂ ≥ M₃ > M₁.' : '',
    aboveZav ? 'Ada titik di atas garis tanpa rongga udara (ZAV). Periksa massa, volume, kadar air, dan Gs.' : '',
    !sameGs ? 'Gunakan Gs yang sama untuk semua titik pada satu kurva tanah.' : '',
    !unique ? 'Kadar air antartitik harus berbeda untuk menentukan puncak.' : '',
    mdd === null ? 'MDD dan OMC belum dapat ditentukan. Dibutuhkan titik di kedua sisi puncak dan data yang memenuhi cek fisik.' : '',
  ].filter(Boolean)
  const status = mdd === null ? 'Perlu Evaluasi' : 'Puncak terestimasi'
  const value = (n, precision) => n?.toFixed(precision) ?? '—'
  const conclusion = issues.join(' ') || `Puncak interpolasi lokal: MDD ${value(mdd, 3)} g/cm³ pada OMC ${value(omc, 2)}%. Bandingkan dengan kurva hasil uji laboratorium.`
  return {
    proctorSamples: computed, mdd, omc, avgWet, isError, status, verdictClass: mdd === null ? 'warning' : 'valid',
    hasInvalidContainer: computed.some((point) => !point.moistureComplete),
    hasInvalidMold: computed.some((point) => point.gammaWet === null),
    rekapitulasiTable: computed.map((point) => ({ ...point, isPeak: point.id === peak?.id })),
    chartData: ordered.map((point) => ({
      w: point.avgW, gammaDry: point.gammaDry, zav: point.gammaZav, sampleName: point.name, isActualPoint: true,
    })),
    results: [
      { label: 'Densitas Kering Maksimum (MDD)', value: value(mdd, 3), unit: 'g/cm³', highlight: true },
      { label: 'Kadar Air Optimum (OMC)', value: value(omc, 2), unit: '%', highlight: true },
      { label: 'Rata-rata Densitas Basah', value: value(avgWet, 3), unit: 'g/cm³' },
    ],
    formulaSteps: [
      'Massa tanah basah = massa cetakan + tanah − massa cetakan kosong. Volume cetakan = πD²H/4.',
      'Kadar air cawan = 100 × (M₂ − M₃)/(M₃ − M₁). Gunakan rata-rata seluruh cawan yang diisi.',
      'ρ basah = massa tanah basah / volume. ρ kering = ρ basah / (1 + w/100).',
      'ZAV = Gs/(1 + Gs × w/100) dalam g/cm³ dengan densitas air ≈ 1 g/cm³.',
      'Estimasi MDD/OMC memakai parabola lokal pada titik tertinggi terukur dan dua titik yang mengapitnya.',
    ],
    conclusion,
    summaryString: mdd === null ? 'Proctor • Puncak belum terverifikasi' : `MDD ${value(mdd, 3)} g/cm³ • OMC ${value(omc, 2)}% (estimasi)`,
  }
}
