import { BINA_MARGA_2018_R2, LASTON_GRADATION } from './labSpecifications.js'

// PUPR, Pedoman Tata Cara Penentuan Campuran Beton Normal dengan Semen OPC, PPC dan PCC, Tabel 3.
export const FINE_GRADATION_SOURCE = 'https://binamarga.pu.go.id/uploads/files/946/pedoman-tata-cara-penentuan-campuran-beton-normal-dengan-semen-opc-ppc-dan-pcc.pdf'
export const COARSE_GRADATION_SOURCE = 'https://www.kanecountyil.gov/FDER/Documents/waterOrdinances/article16.pdf'

// The guidance uses BS 882 openings. The app uses their nominal ASTM counterparts.
const fineSizes = [9.5, 4.75, 2.36, 1.18, 0.6, 0.3, 0.15]
const aliases = new Map([[9.6, 9.5], [4.8, 4.75], [2.4, 2.36], [1.2, 1.18]])
const fineBounds = {
  1: [[100, 100], [90, 100], [60, 95], [30, 70], [15, 34], [5, 20], [0, 10]],
  2: [[100, 100], [90, 100], [75, 100], [55, 90], [35, 59], [8, 30], [0, 10]],
  3: [[100, 100], [90, 100], [85, 100], [75, 100], [60, 79], [12, 40], [0, 10]],
  4: [[100, 100], [95, 100], [95, 100], [90, 100], [80, 100], [15, 50], [0, 15]],
}

// ASTM C33 No. 57. The 19 and 9.5 mm sieves have no limits for this designation.
const coarseBounds = [[37.5, 100, 100], [25, 95, 100], [12.5, 25, 60], [4.75, 0, 10], [2.36, 0, 5]]
const fmSizes = [150, 75, 37.5, 19, ...fineSizes]

export function nominalSieveSize(size) {
  return aliases.get(size) ?? size
}

export function aggregateSpecimens(inputs) {
  if (Array.isArray(inputs.specimens) && inputs.specimens.length) return inputs.specimens
  const count = Math.max(1, ...(inputs.sieves || []).map((sieve) => sieve.weights?.length ?? 0))
  return Array.from({ length: count }, (_, i) => `Benda Uji ${i + 1}`)
}

export function aggregateWeight(sieve, index) {
  return Array.isArray(sieve.weights) ? sieve.weights[index] : index === 0 ? sieve.weight : undefined
}

export function comparePassing(value, lower, upper) {
  if (!Number.isFinite(value)) return 'Data belum lengkap'
  if (lower == null || upper == null) return 'Tidak ada batas'
  if (value < lower - 1e-9) return 'Di bawah batas'
  if (value > upper + 1e-9) return 'Di atas batas'
  return 'Memenuhi'
}

function measured(value) {
  if (value === '' || value == null) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function calculateAggregateGradation(inputs, isCoarse) {
  const specimens = aggregateSpecimens(inputs)
  const sieves = (inputs.sieves || []).map((sieve) => ({
    size: measured(sieve.size),
    label: sieve.label || `${sieve.size} mm`,
    pan: sieve.isPan || measured(sieve.size) === 0,
    weights: specimens.map((_, i) => measured(aggregateWeight(sieve, i))),
  })).sort((a, b) => Number(a.pan) - Number(b.pan) || b.size - a.size)
  const nonPan = sieves.filter((sieve) => !sieve.pan)
  const nominalSizes = nonPan.map((sieve) => nominalSieveSize(sieve.size))

  const error = !nonPan.length || nonPan.some((sieve) => !(sieve.size > 0))
    ? 'Diperlukan minimal satu ayakan dengan bukaan positif.'
    : new Set(nominalSizes).size !== nominalSizes.length
      ? 'Ukuran nominal ayakan harus unik.'
      : sieves.filter((sieve) => sieve.pan).length > 1
        ? 'Gunakan hanya satu pan penampung.'
        : sieves.some((sieve) => sieve.weights.some((mass) => mass === null || mass < 0))
          ? 'Isi setiap massa tertahan dengan angka ≥ 0. Isi 0 untuk fraksi yang tidak tertahan.'
          : ''

  const specimenData = specimens.map((name, i) => {
    const total = sieves.reduce((sum, sieve) => sum + (sieve.weights[i] ?? 0), 0)
    let cumulative = 0
    const rows = sieves.map((sieve) => {
      const weight = sieve.weights[i]
      cumulative += weight ?? 0
      const retained = !error && total > 0 ? weight / total * 100 : null
      const cumRetained = retained === null ? null : cumulative / total * 100
      return { weight, retained, cumRetained, passing: cumRetained === null ? null : Math.max(0, 100 - cumRetained) }
    })
    const fm = !error && total > 0 && nominalSizes.some((size) => fmSizes.includes(size))
      ? rows.reduce((sum, row, index) => sum + (fmSizes.includes(nominalSizes[index]) ? row.cumRetained : 0), 0) / 100
      : null
    return { name, total, rows, fm }
  })

  const average = (numbers) => numbers.every(Number.isFinite) ? numbers.reduce((a, b) => a + b, 0) / numbers.length : null
  const avgTotal = average(specimenData.map((specimen) => specimen.total))
  const avgFm = average(specimenData.map((specimen) => specimen.fm))
  const zoneNum = [1, 2, 3, 4].includes(Number(inputs.gradationZone)) ? Number(inputs.gradationZone) : 2
  const coarseStandard = inputs.coarseStandard === 'ac-wc' ? 'ac-wc' : 'astm57'
  const useLaston = isCoarse && coarseStandard === 'ac-wc'
  const bounds = useLaston ? Object.entries(LASTON_GRADATION['ac-wc']).map(([size, limits]) => [Number(size), ...limits])
    : isCoarse ? coarseBounds : fineSizes.map((size, i) => [size, ...fineBounds[zoneNum][i]])
  const lookup = new Map(bounds.map(([size, lower, upper]) => [size, { lower, upper }]))
  const specLabel = useLaston ? 'Laston AC-WC • Bina Marga 2018 Revisi 2' : isCoarse ? 'ASTM C33 No. 57' : `PUPR Zona ${zoneNum}`
  const source = useLaston ? BINA_MARGA_2018_R2 : isCoarse ? COARSE_GRADATION_SOURCE : FINE_GRADATION_SOURCE
  const detailRows = sieves.map((sieve, i) => ({
    ...sieve,
    fmSieve: fmSizes.includes(nominalSizes[i]),
    actual: average(specimenData.map((specimen) => specimen.rows[i].passing)),
    ...lookup.get(nominalSizes[i]),
  }))
  const coveredRows = detailRows.filter((row) => row.lower != null)
  const missingBounds = bounds.filter(([size]) => !nominalSizes.includes(size)).map(([size]) => size)
  const complete = !error && specimenData.every((sample) => sample.total > 0)
  const outside = coveredRows.filter((row) => comparePassing(row.actual, row.lower, row.upper) !== 'Memenuhi')
  const isWithinBounds = complete && !missingBounds.length && !outside.length
  const status = !complete ? 'Data tidak lengkap' : isWithinBounds ? 'Masuk amplop gradasi' : 'Perlu Evaluasi'
  const conclusion = !complete
    ? error || 'Total massa tertahan setiap benda uji harus lebih besar dari 0 g.'
    : missingBounds.length
      ? `Evaluasi ${specLabel} belum lengkap. Ayakan acuan belum tersedia: ${missingBounds.join(', ')} mm.${outside.length ? ` Persen lolos yang sudah di luar amplop: ${outside.map(({ size }) => size).join(', ')} mm.` : ''}`
      : isWithinBounds
        ? `Rata-rata persen lolos pada semua ayakan acuan berada di dalam amplop ${specLabel}.`
        : `Rata-rata persen lolos berada di luar amplop ${specLabel} pada satu atau lebih ayakan acuan.`

  const chartRows = detailRows.filter((row) => !row.pan).reverse()
  const percent = (value) => value === null ? '—' : `${value.toFixed(1)}%`
  const fm = (value) => value === null ? '—' : value.toFixed(2)
  return {
    results: [
      { label: 'Massa Tertahan Total (Rata-rata)', value: avgTotal?.toFixed(1) ?? '—', unit: 'g' },
      { label: 'MHB Seri Ayakan Tersedia (Rata-rata)', value: fm(avgFm), unit: '', highlight: true },
      { label: 'Acuan Amplop Gradasi', value: specLabel, unit: '' },
      { label: 'Evaluasi Amplop', value: status, unit: '', highlight: true },
    ],
    formulaSteps: [
      'Urutkan ayakan dari bukaan terbesar ke terkecil. Pan termasuk dalam massa tertahan total.',
      '% tertahan = massa tertahan / massa tertahan total × 100. % lolos = 100 − % tertahan kumulatif.',
      'MHB seri tersedia = jumlah % tertahan kumulatif pada seri ayakan MHB yang diukur / 100. Pan tidak termasuk.',
      'Massa sebelum pengayakan tidak tersedia pada modul ini. Selisih penimbangan perlu diperiksa dari catatan laboratorium.',
    ],
    recapTable: {
      title: 'Rekapitulasi Gradasi & MHB',
      headers: ['Ukuran Saringan (mm)', 'Label Saringan', ...specimens.map((name) => `${name} (% Lolos)`), 'Rata-rata % Lolos'],
      rows: [
        ...chartRows.slice().reverse().map((sieve, i) => ({
          label: `${sieve.size} mm`, equation: sieve.label, unit: '%',
          values: specimenData.map((specimen) => percent(specimen.rows[i].passing)), average: percent(sieve.actual),
        })),
        { label: 'MHB Seri Ayakan Tersedia', equation: 'Σ(% tertahan kumulatif seri MHB) / 100', unit: '', values: specimenData.map((specimen) => fm(specimen.fm)), average: fm(avgFm), highlight: true },
      ],
    },
    gradation: { detailRows, specimenData, bounds, missingBounds, specLabel, source },
    gradationChart: complete ? {
      isCoarse,
      chartTitle: `Kurva Gradasi Agregat ${useLaston ? 'Gabungan' : isCoarse ? 'Kasar' : 'Halus'}`,
      chartSubtitle: `Distribusi butiran • amplop pembanding ${specLabel}`,
      specLabel,
      coarseStandard,
      zoneNum,
      sieves: chartRows.map((sieve) => sieve.size),
      sieveLabels: chartRows.map((sieve) => `${sieve.size} mm`),
      sieveNames: chartRows.map((sieve) => sieve.label),
      actualPassing: chartRows.map((sieve) => sieve.actual),
      upperBound: chartRows.map((sieve) => sieve.upper ?? null),
      lowerBound: chartRows.map((sieve) => sieve.lower ?? null),
      isWithinBounds,
    } : null,
    isError: !complete,
    status,
    verdictClass: !complete ? 'error' : isWithinBounds ? 'valid' : 'warning',
    conclusion,
    summaryString: `MHB ${fm(avgFm)} • ${specLabel} • ${status}`,
  }
}
