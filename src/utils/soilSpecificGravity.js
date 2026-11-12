import { numeric } from './labInputValues.js'

export const SOIL_GS_SOURCE = 'https://binamarga.pu.go.id/uploads/files/589/sni-1964-2008-cara-uji-berat-jenis-tanah.pdf'
// SNI 1964:2008, Table 1, at integer temperatures from 18 to 30 °C.
export const SOIL_GS_FACTORS = [1.0004, 1.0002, 1, 0.9998, 0.9996, 0.9993, 0.9991, 0.9989, 0.9986, 0.9983, 0.9980, 0.9977, 0.9974]

export function soilGsTemperatureFactor(value) {
  const temp = numeric(value)
  if (temp === null || temp < 18 || temp > 30) return null
  const offset = temp - 18
  const lower = Math.floor(offset)
  const upper = Math.ceil(offset)
  return SOIL_GS_FACTORS[lower] + (offset - lower) * (SOIL_GS_FACTORS[upper] - SOIL_GS_FACTORS[lower])
}

export function calculateSoilSpecificGravity(inputs) {
  const temp = numeric(Object.hasOwn(inputs, 'temp') ? inputs.temp : 20)
  const factor = soilGsTemperatureFactor(temp)
  const samples = inputs.samples ?? [{
    name: 'Piknometer 1', w1: inputs.wPikno, w2: inputs.wPiknoTanah, w3: inputs.wPiknoAirTanah, w4: inputs.wPiknoAir,
  }]
  const rows = samples.map((sample, i) => {
    const [w1, w2, w3, w4] = [sample.w1, sample.w2, sample.w3, sample.w4].map(numeric)
    const ws = w1 > 0 && w2 > w1 ? w2 - w1 : null
    const displaced = ws !== null && w4 > w1 && w3 > w2 && ws + w4 > w3 ? ws + w4 - w3 : null
    const measured = displaced === null ? null : ws / displaced
    return { name: sample.name || `Piknometer ${i + 1}`, w1, w2, w3, w4, ws, displaced, measured,
      gs: measured !== null && factor !== null ? factor * measured : null }
  })
  const complete = rows.length > 0 && rows.every((row) => row.measured !== null)
  const average = complete && factor !== null ? rows.reduce((sum, row) => sum + row.gs, 0) / rows.length : null
  const outsideTypical = rows.some(({ gs }) => gs !== null && (gs < 2.5 || gs > 2.8))
  const fmt = (n, digits = 3) => n?.toFixed(digits) ?? '—'
  const status = complete && factor !== null && !outsideTypical ? 'Data terhitung' : 'Perlu Evaluasi'
  const conclusion = !complete ? 'Periksa massa tiap piknometer. W₂ > W₁, W₃ > W₂, W₄ > W₁, dan massa air terdesak harus positif.'
    : factor === null ? 'Untuk koreksi Gs ke 20 °C, gunakan suhu penimbangan W₃ dan W₄ yang sama dalam rentang tabel 18–30 °C.'
      : outsideTypical ? 'Ada Gs di luar kisaran tipikal tanah mineral 2,50–2,80. Periksa material dan penimbangan.'
        : `Rata-rata berat jenis butiran pada acuan 20 °C adalah ${fmt(average)}.`
  const parameters = [
    ['Piknometer kosong', 'W₁ (g)', 'w1'], ['Piknometer + tanah kering', 'W₂ (g)', 'w2'],
    ['Piknometer + tanah + air', 'W₃ (g)', 'w3'], ['Piknometer + air', 'W₄ (g)', 'w4'],
    ['Massa tanah kering', 'W₂ − W₁ (g)', 'ws'], ['Massa air terdesak', 'W₂ − W₁ + W₄ − W₃ (g)', 'displaced'],
    ['Berat jenis pada suhu uji', 'Gs(T) = massa tanah / massa air terdesak', 'measured'],
    ['Berat jenis terkoreksi 20 °C', 'Gs(20) = K × Gs(T)', 'gs'],
  ]
  return {
    status, verdictClass: status === 'Data terhitung' ? 'valid' : 'warning', isError: !complete,
    conclusion, summaryString: `Gs(20 °C) = ${fmt(average)} • ${status}`,
    results: [
      { label: 'Rata-rata Gs pada 20 °C', value: fmt(average), numericValue: average, highlight: true },
      { label: 'Suhu penimbangan', value: fmt(temp, 1), unit: '°C' },
      { label: 'Faktor koreksi K', value: fmt(factor, 4) },
    ],
    formulaSteps: [
      'Timbang W₃ dan W₄ pada suhu air yang sama. Gs(T) = (W₂ − W₁)/(W₂ − W₁ + W₄ − W₃).',
      `Gs(20 °C) = K × Gs(T). Faktor K pada suhu uji = ${fmt(factor, 4)}.`,
      ...rows.map((row) => `${row.name}: Gs(T) = ${fmt(row.measured)}. Gs(20 °C) = ${fmt(row.gs)}.`),
    ],
    recapTable: {
      title: 'Rekap Berat Jenis Tanah (SNI 1964:2008)',
      headers: ['Parameter Pengujian', 'Simbol / Rumus', ...rows.map(({ name }) => name), 'Rata-rata'],
      rows: parameters.map(([label, equation, key]) => ({
        label, equation, values: rows.map((row) => fmt(row[key])), average: key === 'gs' ? fmt(average) : '—',
      })),
    },
    soilGsRows: rows, soilGsAverage: average,
  }
}
