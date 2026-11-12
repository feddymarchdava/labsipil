import { numeric } from './labInputValues.js'

export const CPT_AREAS = { pistonArea: 10, coneArea: 10, sleeveArea: 150 }
export const CPT_STANDARD = 'https://pesta.bsn.go.id/produk/detail/8068-sni28272008'

export const CPT_EXAMPLE_ROWS = [
  [0, 0], [6, 9], [8, 12], [10, 15], [12, 18], [16, 24], [21, 30], [27, 38],
  [34, 46], [44, 57], [56, 70], [68, 83], [82, 98], [96, 114], [110, 130],
].map(([qc, tw], i) => ({ id: i + 1, depth: i / 5, qc, tw }))

export const CPT_FORMULAS = [
  'Perlawanan konus: qc = Cw × Ap / Ac.',
  'Geser lokal: fs = (Tw − Cw) × Ap / As.',
  'Angka banding geser: Rf = 100 × fs / qc. Jika qc nol, Rf tidak terdefinisi.',
  'JHP kumulatif = Σ(fs × Δz), dengan Δz dalam cm. Interval nominal pengukuran 20 cm.',
]

export function getCptAreas(inputs) {
  return Object.fromEntries(Object.entries(CPT_AREAS).map(([key, value]) => [key, numeric(inputs[key] ?? value)]))
}

export function cptDepthScale(rows) {
  const depth = rows.reduce((max, row) => Math.max(max, row.depth ?? 0), 0.2)
  const step = depth <= 4 ? 0.5 : depth <= 10 ? 1 : Math.ceil(depth / 5)
  return { max: Math.ceil(depth / step) * step, step }
}

export function calculateCptProfile(inputs) {
  const rawRows = Array.isArray(inputs.cptRows) ? inputs.cptRows : [inputs]
  const profile = Array.isArray(inputs.cptRows)
  const areas = getCptAreas(inputs)
  const hasInvalidAreas = Object.values(areas).some((area) => !(area > 0))
  let previousDepth = null
  let cumulative = 0
  let hasIntervalDeviation = false

  const cptRows = rawRows.map((raw, index) => {
    const [depth, cw, tw] = [raw.depth, raw.qc, raw.tw].map(numeric)
    const surface = index === 0 && depth === 0 && cw === 0 && tw === 0
    const errorMessage = depth === null || cw === null || tw === null ? 'Lengkapi kedalaman, Cw, dan Tw.'
      : depth < 0 || cw < 0 || tw < 0 ? 'Nilai tidak boleh negatif.'
        : depth === 0 && !surface ? 'Pada 0 m, gunakan 0/0 sebagai acuan permukaan.'
          : index > 0 && previousDepth !== null && depth <= previousDepth ? 'Kedalaman harus bertambah.'
            : tw < cw ? 'Tw tidak boleh lebih kecil dari Cw.' : null
    const isInvalid = Boolean(errorMessage)
    const valid = !isInvalid && !hasInvalidAreas && !surface
    const friction = valid ? tw - cw : null
    const qc = valid ? cw * areas.pistonArea / areas.coneArea : null
    const fs = valid ? friction * areas.pistonArea / areas.sleeveArea : null
    const frictionRatio = qc > 0 ? 100 * fs / qc : null
    const interval = valid && profile && (index === 0 || previousDepth !== null) ? (depth - (previousDepth ?? 0)) * 100 : null
    if (interval !== null && Math.abs(interval - 20) > 1e-6) hasIntervalDeviation = true
    const deltaJhp = surface && profile && !hasInvalidAreas ? 0 : interval === null ? null : fs * interval
    cumulative = cumulative === null || deltaJhp === null ? null : cumulative + deltaJhp
    previousDepth = depth !== null && depth >= 0 ? depth : null
    return {
      id: raw.id ?? index + 1, depth, cw, tw, qc, fs, friction, interval, deltaJhp,
      jumlahHambatanPelekat: cumulative, frictionRatio, surface, isInvalid, errorMessage,
    }
  })

  const measurements = cptRows.filter((row) => row.qc !== null)
  const ratios = measurements.map((row) => row.frictionRatio).filter(Number.isFinite)
  const totalKedalaman = measurements.length ? Math.max(...measurements.map((row) => row.depth)) : null
  const avgQc = measurements.length ? measurements.reduce((sum, row) => sum + row.qc, 0) / measurements.length : null
  const avgFr = ratios.length ? ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length : null
  const totalJhp = measurements.length ? cptRows.at(-1).jumlahHambatanPelekat : null
  const hasInvalidRow = cptRows.some((row) => row.isInvalid)
  const isError = hasInvalidAreas || hasInvalidRow || !measurements.length
  const status = isError ? 'Periksa input' : hasIntervalDeviation ? 'Periksa interval' : 'Data terhitung'
  const conclusion = hasInvalidAreas ? 'Masukkan luas piston, konus, dan selimut geser yang positif.'
    : hasInvalidRow ? 'Perbaiki baris yang ditandai. JHP kumulatif tidak diteruskan melewati baris yang tidak sah.'
      : !measurements.length ? 'Masukkan sedikitnya satu pembacaan di bawah permukaan.'
        : `Terdapat ${measurements.length} titik pengamatan hingga ${totalKedalaman.toFixed(2)} m. ${hasIntervalDeviation
          ? 'Ada jarak antarpembacaan yang berbeda dari 20 cm; JHP dihitung dari jarak yang tercatat. '
          : ''}Profil ini menunjukkan perubahan tahanan terhadap kedalaman. Jenis tanah memerlukan interpretasi geoteknik dan data pendukung.`
  const chartData = cptRows.filter((row) => !row.surface && row.depth > 0)
    .map((row) => ({ ...row, fr: row.frictionRatio }))
    .sort((a, b) => a.depth - b.depth)

  return {
    cptRows, chartData, areas, totalKedalaman, avgQc, avgFr, totalJhp, measurementCount: measurements.length,
    hasInvalidRow, hasInvalidAreas, hasIntervalDeviation, isError, status, conclusion,
    verdictClass: isError ? 'danger' : hasIntervalDeviation ? 'review' : 'valid',
    verdictLabel: status,
    summaryString: measurements.length ? `${measurements.length} titik • ${totalKedalaman.toFixed(2)} m • ${status}` : status,
    formulaSteps: CPT_FORMULAS,
    results: [
      { label: 'Kedalaman terakhir', value: totalKedalaman?.toFixed(2) ?? '—', unit: 'm' },
      { label: 'Rata-rata qc', value: avgQc?.toFixed(2) ?? '—', unit: 'kgf/cm²' },
      { label: 'Rata-rata Rf', value: avgFr?.toFixed(2) ?? '—', unit: '%' },
      { label: 'JHP kumulatif', value: totalJhp?.toFixed(2) ?? '—', unit: 'kgf/cm' },
    ],
  }
}
