import { numeric } from './labInputValues.js'

// SNI 8135:2015; Pen 60/70 is also the Tipe I range in Bina Marga 2018 Rev. 2, Table 6.3.2.5.
export const PENETRATION_GRADES = {
  pen6070: [60, 70],
  pen4050: [40, 50],
  pen85100: [85, 100],
  pen120150: [120, 150],
  pen200300: [200, 300],
}

// SNI 2456:2011, Table 2: [minimum penetration, maximum penetration, permitted spread], in dmm.
export const PENETRATION_PRECISION = [[0, 49, 2], [50, 149, 4], [150, 249, 12], [250, 500, 20]]

export const DEFAULT_PENETRATION_GROUPS = [
  { id: 1, name: 'Kelompok 1 (Sampel A)', points: [64, 65, 66].map((value, i) => ({ id: i + 1, value })) },
  { id: 2, name: 'Kelompok 2 (Sampel B)', points: [65, 66, 66].map((value, i) => ({ id: i + 1, value })) },
]

export function getPenetrationGroups(inputs) {
  const legacyKeys = ['x1', 'x2', 'x3', 'x4', 'x5']
  const legacyPoints = legacyKeys.filter((key) => Object.hasOwn(inputs, key)).map((key) => inputs[key])
  const groups = Array.isArray(inputs.groups) ? inputs.groups
    : legacyPoints.length ? [{ id: 1, name: 'Kelompok 1', points: legacyPoints }]
      : DEFAULT_PENETRATION_GROUPS
  return groups.map((group, i) => ({
    ...group,
    id: group.id ?? i + 1,
    points: (group.points ?? []).map((point, j) => typeof point === 'object' && point !== null
      ? { id: point.id ?? j + 1, value: point.value ?? '' } : { id: j + 1, value: point ?? '' }),
  }))
}

export function calculateAsphaltPenetration(inputs) {
  const grade = inputs.kelasAspal ?? 'pen6070'
  const range = Object.hasOwn(PENETRATION_GRADES, grade) ? PENETRATION_GRADES[grade] : null
  const [minSpec, maxSpec] = range ?? []
  const kelasLabel = range ? `Aspal Pen ${minSpec}/${maxSpec}` : 'Kelas perlu dipilih ulang'
  const standardConditions = numeric(inputs.suhuUji ?? 25) === 25 &&
    numeric(inputs.bebanJarum ?? 100) === 100 && numeric(inputs.waktuPenetrasi ?? 5) === 5

  const groupResults = getPenetrationGroups(inputs).map((group, i) => {
    const pointsAnalysis = group.points.map(({ id, value: rawValue }) => {
      const reading = numeric(rawValue)
      const isValidNumber = reading !== null && reading >= 0 && reading <= 500
      return { id, rawValue, value: isValidNumber ? reading : null, isValidNumber }
    })
    const readings = pointsAnalysis.filter((point) => point.isValidNumber).map((point) => point.value)
    const n = readings.length
    const meanInitial = n ? readings.reduce((total, value) => total + value, 0) / n : null
    const rounded = meanInitial === null ? null : Math.round(meanInitial)
    const precisionLimit = rounded === null ? null : PENETRATION_PRECISION.find(([, max]) => rounded <= max)[2]
    const precisionGap = n >= 2 ? Math.max(...readings) - Math.min(...readings) : null
    const precisionOk = n >= 3 && n === pointsAnalysis.length && precisionGap <= precisionLimit + 1e-9
    const reported = precisionOk ? rounded : null
    const evaluation = n < 3 || n !== pointsAnalysis.length ? 'Lengkapi / periksa bacaan'
      : !precisionOk ? 'Ulangi uji'
        : !standardConditions ? 'Kondisi uji berbeda'
          : !range ? 'Pilih kelas yang berlaku'
            : reported >= minSpec && reported <= maxSpec ? 'Masuk rentang kelas' : 'Di luar rentang kelas'
    return { groupId: group.id, groupName: group.name || `Kelompok ${i + 1}`,
      n, meanInitial, precisionGap, precisionLimit, precisionOk, reported, pointsAnalysis, evaluation }
  })
  const readings = groupResults.flatMap((group) => group.pointsAnalysis.filter((point) => point.isValidNumber).map((point) => point.value))
  const totalValidCount = readings.length
  const totalRawPointsCount = groupResults.reduce((total, group) => total + group.pointsAnalysis.length, 0)
  const passed = groupResults.filter((group) => group.precisionOk).length
  const isPresisiLolos = passed > 0 && passed === groupResults.length
  const isSpecLolos = isPresisiLolos && groupResults.every((group) => group.evaluation === 'Masuk rentang kelas')
  const canCompare = isPresisiLolos && standardConditions && range
  const status = !totalValidCount ? 'Input Belum Lengkap' : !canCompare ? 'Perlu Evaluasi'
    : isSpecLolos ? 'Masuk rentang kelas' : 'Di luar rentang kelas'
  const conclusion = !isPresisiLolos ? 'Gunakan minimal tiga bacaan sah per kelompok. Ulangi kelompok yang melebihi batas selisih.'
    : !standardConditions ? 'Pembanding kelas memakai kondisi nominal 25 °C, 100 g, dan 5 detik.'
      : !range ? 'Pilih kelas penetrasi yang berlaku untuk mengevaluasi hasil.'
        : `Hasil pelaporan per kelompok ${isSpecLolos ? 'masuk' : 'tidak semuanya masuk'} rentang ${kelasLabel} (${minSpec}–${maxSpec} dmm).`
  const penAkhir = totalValidCount ? (readings.reduce((sum, value) => sum + value, 0) / totalValidCount).toFixed(1) : '-'
  const gaps = groupResults.map((group) => group.precisionGap).filter(Number.isFinite)
  const selisih = gaps.length ? Math.max(...gaps).toFixed(1) : '-'
  const formulaSteps = [
    'SNI 2456:2011 Tabel 2: hitung rata-rata dan selisih bacaan tertinggi–terendah untuk setiap kelompok.',
    'Laporkan rata-rata yang dibulatkan ke bilangan bulat jika sedikitnya tiga bacaan sah tersedia dan selisih dalam batas. Bacaan tidak dibuang otomatis.',
    ...groupResults.map((group) => `${group.groupName}: n = ${group.n}, rata-rata = ${group.meanInitial?.toFixed(2) ?? '—'}, selisih = ${group.precisionGap?.toFixed(2) ?? '—'}, batas = ${group.precisionLimit ?? '—'} dmm. ${group.evaluation}.`),
  ]
  return {
    groupResults, formulaSteps, conclusion, status, isPresisiLolos, isSpecLolos, minSpec, maxSpec, kelasLabel,
    totalValidCount, totalRawPointsCount, penAkhir, selisih,
    isError: !totalValidCount,
    verdictClass: !canCompare ? 'warning' : isSpecLolos ? 'valid' : 'error',
    summaryString: `${passed}/${groupResults.length} kelompok dalam batas selisih • ${status}`,
    results: [
      { label: 'Rerata Pembacaan (Deskriptif)', value: penAkhir, unit: 'dmm' },
      { label: 'Selisih Terbesar dalam Kelompok', value: selisih, unit: 'dmm' },
      { label: 'Kelompok dalam Batas Selisih', value: `${passed}/${groupResults.length}` },
    ],
  }
}
