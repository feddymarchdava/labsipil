export const BINA_MARGA_2018_R2 = 'https://binamarga.pu.go.id/uploads/files/987/spesifikasi-umum-bina-marga-2018-untuk-pekerjaan-konstruksi-jalan-dan-jembatan-revisi-2.pdf'
export const SNI_ASPHALT_GRADES = 'https://binamarga.pu.go.id/uploads/files/795/sni-8135-2015-spesifikasi-aspal-keras-berdasarkan-kelas-penetrasi.pdf'
export const ASPHALT_SOFTENING_MIN = { pen6070: 48, pen85100: 46 }
export const LA_BALLS = { A: 12, B: 11, C: 8, D: 6 }
export const SNI_STEEL_2017 = 'https://kms-inspektorat.mojokertokota.go.id/wp-content/uploads/2023/07/sni-2052-2017_baja_tulangan.pdf'
export const SNI_CONCRETE_COMPRESSION = 'https://binamarga.pu.go.id/uploads/files/387/sni-19742011-tentang-cara-uji-kuat-tekan-beton-dengan-benda-uji-silinder.pdf'

// Practical age estimates, separate from the measured strength under SNI 1974.
export const CONCRETE_AGE_FACTORS = { 3: 0.4, 7: 0.65, 14: 0.88, 21: 0.95, 28: 1 }

// SNI 2052:2017, Table 6. Elongation limits apply to a 200 mm gauge length.
export const STEEL_TENSION_LIMITS = {
  'BjTS 280': { fy: [280, 405], fu: 350, ratio: 1.25, elongation: [[0, 10, 11], [13, Infinity, 12]] },
  'BjTS 420A': { fy: [420, 545], fu: 525, ratio: 1.25, elongation: [[0, 19, 9], [22, 25, 8], [29, Infinity, 7]] },
  'BjTS 420B': { fy: [420, 545], fu: 525, ratio: 1.25, elongation: [[0, 19, 14], [22, 36, 12], [37, Infinity, 10]] },
  'BjTS 520': { fy: [520, 645], fu: 650, ratio: 1.25, elongation: [[0, 25, 7], [29, Infinity, 6]] },
}

export function steelTensionLimits(grade, diameter) {
  const spec = STEEL_TENSION_LIMITS[grade === 'BjTS 420' ? 'BjTS 420B' : grade]
  return spec ? { ...spec, elongationMin: spec.elongation.find(([min, max]) => diameter >= min && diameter <= max)?.[2] } : null
}

// Bina Marga 2018 (Revisi 2), Table 6.3.2.3. Blank entries have no specified limit.
export const LASTON_GRADATION = {
  'ac-wc': { 19: [100, 100], 12.5: [90, 100], 9.5: [77, 90], 4.75: [53, 69], 2.36: [33, 53], 1.18: [21, 40], 0.6: [14, 30], 0.3: [9, 22], 0.15: [6, 15], 0.075: [4, 9] },
  'ac-bc': { 25: [100, 100], 19: [90, 100], 12.5: [75, 90], 9.5: [66, 82], 4.75: [46, 64], 2.36: [30, 49], 1.18: [18, 38], 0.6: [12, 28], 0.3: [7, 20], 0.15: [5, 13], 0.075: [4, 8] },
  'ac-base': { 37.5: [100, 100], 25: [90, 100], 19: [76, 90], 12.5: [60, 78], 9.5: [52, 71], 4.75: [35, 54], 2.36: [23, 41], 1.18: [13, 30], 0.6: [10, 22], 0.3: [6, 15], 0.15: [4, 10], 0.075: [3, 7] },
}

// Bina Marga 2018 (Revisi 2), Table 6.3.3.1c. MQ is reported without a Laston limit.
export const LASTON_MARSHALL = {
  'ac-wc': { stabilitas: [800, null], flow: [2, 4], vma: [15, null], vim: [3, 5], vfa: [65, null] },
  'ac-bc': { stabilitas: [800, null], flow: [2, 4], vma: [14, null], vim: [3, 5], vfa: [65, null] },
  'ac-base': { stabilitas: [1800, null], flow: [3, 6], vma: [13, null], vim: [3, 5], vfa: [65, null] },
}
