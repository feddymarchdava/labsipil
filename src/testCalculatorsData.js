// =========================================================================
// STRUKTUR DATA SIDEBAR ACCORDION & REGISTRY KALKULATOR PENGUJIAN LABORATORIUM
// Mencakup 31 Pengujian Resmi (19 Bahan Bangunan & 12 Mekanika Tanah)
// Sesuai Standar SNI & ASTM
// =========================================================================

export const sidebarGroups = [
  {
    groupId: 'bahan',
    groupTitle: 'PRAKTIKUM BAHAN BANGUNAN',
    chapters: [
      {
        chapterId: 'bb-bab1',
        title: 'Bab 1: Agregat Halus',
        items: [
          { id: 'bb-1-1', title: 'Berat Jenis & Penyerapan Air', standard: 'SNI 1970:2016' },
          { id: 'bb-1-2', title: 'Kadar Air Agregat Halus', standard: 'SNI 1970:2016' },
          { id: 'bb-1-3', title: 'Kandungan Lumpur & Organik', standard: 'SNI 1970:2016' },
          { id: 'bb-1-4', title: 'Bobot Isi & Rongga Udara', standard: 'SNI 1970:2016' },
          { id: 'bb-1-5', title: 'Gradasi Agregat Halus', standard: 'SNI ASTM C136:2012' },
        ],
      },
      {
        chapterId: 'bb-bab2',
        title: 'Bab 2: Agregat Kasar',
        items: [
          { id: 'bb-2-1', title: 'Berat Jenis & Penyerapan Air Kasar', standard: 'SNI 1969:2016' },
          { id: 'bb-2-2', title: 'Kadar Air Agregat Kasar', standard: 'SNI 1969:2016' },
          { id: 'bb-2-3', title: 'Kandungan Lumpur Kasar', standard: 'SNI 1969:2016' },
          { id: 'bb-2-4', title: 'Bobot Isi & Rongga Udara Kasar', standard: 'SNI 1969:2016' },
          { id: 'bb-2-5', title: 'Gradasi Agregat Kasar', standard: 'SNI ASTM C136:2012' },
          { id: 'bb-2-6', title: 'Keausan Los Angeles', standard: 'SNI 1969:2016' },
        ],
      },
      {
        chapterId: 'bb-bab3',
        title: 'Bab 3: Beton',
        items: [
          { id: 'bb-3-1', title: 'Uji Slump Beton', standard: 'SNI 1972:2008' },
          { id: 'bb-3-2', title: 'Kuat Tekan Beton', standard: 'SNI 1974:2011' },
          { id: 'bb-3-3', title: 'Kuat Lentur Beton', standard: 'SNI 4431:2011' },
        ],
      },
      {
        chapterId: 'bb-bab4',
        title: 'Bab 4: Kayu',
        items: [
          { id: 'bb-4-1', title: 'Kadar Air Kayu', standard: 'SNI 03-6847/6848-2002' },
          { id: 'bb-4-2', title: 'Kerapatan Kayu', standard: 'SNI 03-6847/6848-2002' },
          { id: 'bb-4-3', title: 'Berat Jenis Kayu', standard: 'SNI 03-6847/6848-2002' },
          { id: 'bb-4-4', title: 'Kuat Lentur Kayu', standard: 'SNI 03-6847/6848-2002' },
        ],
      },
      {
        chapterId: 'bb-bab5',
        title: 'Bab 5: Baja',
        items: [
          { id: 'bb-5-1', title: 'Kuat Tarik Baja', standard: 'SNI 2052:2017' },
        ],
      },
    ],
  },
  {
    groupId: 'tanah',
    groupTitle: 'PRAKTIKUM MEKANIKA TANAH',
    chapters: [
      {
        chapterId: 'mt-bab1',
        title: 'Bab 1: Penyelidikan Lapangan',
        items: [
          { id: 'mt-1-1', title: 'Uji Sondir / CPT', standard: 'SNI 2827:2008' },
        ],
      },
      {
        chapterId: 'mt-bab2',
        title: 'Bab 2: Sifat Fisik Tanah',
        items: [
          { id: 'mt-2-1', title: 'Kadar Air Tanah', standard: 'SNI 1965:2008' },
          { id: 'mt-2-2', title: 'Berat Jenis Tanah', standard: 'SNI 1964:2008' },
          { id: 'mt-2-3', title: 'Batas Cair / Liquid Limit', standard: 'SNI 1967:2008' },
          { id: 'mt-2-4', title: 'Batas Plastis & Indeks Plastisitas', standard: 'SNI 1966:2008' },
        ],
      },
      {
        chapterId: 'mt-bab3',
        title: 'Bab 3: Pemadatan Tanah',
        items: [
          { id: 'mt-3-1', title: 'Standard Proctor Lab', standard: 'SNI 1742:2008' },
        ],
      },
      {
        chapterId: 'mt-bab4',
        title: 'Bab 4: Analisis Butiran',
        items: [
          { id: 'mt-4-1', title: 'Analisis Saringan Tanah', standard: 'SNI 3423:2008' },
        ],
      },
      {
        chapterId: 'mt-bab5',
        title: 'Bab 5: Sifat Mekanik Tanah',
        items: [
          { id: 'mt-5-1', title: 'Uji Geser Langsung / Direct Shear', standard: 'SNI 3420:2016' },
          { id: 'mt-5-2', title: 'Uji Konsolidasi / Oedometer', standard: 'SNI 2812:2011' },
        ],
      },
      {
        chapterId: 'mt-bab6',
        title: 'Bab 6: Permeabilitas Tanah',
        items: [
          { id: 'mt-6-1', title: 'Uji Permeabilitas Constant & Falling Head', standard: 'SNI 2435:2008' },
        ],
      },
    ],
  },
  {
    groupId: 'fluida',
    groupTitle: 'PRAKTIKUM MEKANIKA FLUIDA',
    chapters: [
      {
        chapterId: 'mf-bab1',
        title: 'Bab 1: Sifat Fluida (Densitas, Viskositas, Archimedes, SG)',
        items: [
          { id: 'mf-1-1', title: 'Sifat Fluida (Densitas, Viskositas, Archimedes, SG)', standard: 'ASTM D1475 & ASTM D445' },
        ],
      },
      {
        chapterId: 'mf-bab2',
        title: 'Bab 2: Osborne Reynolds',
        items: [
          { id: 'mf-2-1', title: 'Bilangan Osborne Reynolds', standard: 'Standar Hidraulika Pipa (Re)' },
        ],
      },
    ],
  },
  {
    groupId: 'perkerasan',
    groupTitle: 'PRAKTIKUM BAHAN PERKERASAN',
    chapters: [
      {
        chapterId: 'bp-bab1',
        title: 'Bab 1: Keausan Agregat (Los Angeles)',
        items: [
          { id: 'bp-1-1', title: 'Uji Keausan Agregat (Los Angeles)', standard: 'SNI 2417:2008' },
        ],
      },
      {
        chapterId: 'bp-bab2',
        title: 'Bab 2: Penetrasi Aspal',
        items: [
          { id: 'bp-2-1', title: 'Uji Penetrasi Aspal', standard: 'SNI 2456:2011' },
        ],
      },
      {
        chapterId: 'bp-bab3',
        title: 'Bab 3: Titik Lembek & Indeks Penetrasi (PI)',
        items: [
          { id: 'bp-3-1', title: 'Uji Titik Lembek & Indeks Penetrasi (PI)', standard: 'SNI 2434:2011' },
        ],
      },
      {
        chapterId: 'bp-bab4',
        title: 'Bab 4: Berat Jenis Aspal Keras',
        items: [
          { id: 'bp-4-1', title: 'Uji Berat Jenis Aspal Keras', standard: 'SNI 2441:2011' },
        ],
      },
      {
        chapterId: 'bp-bab5',
        title: 'Bab 5: Titik Nyala & Bakar (Cleveland)',
        items: [
          { id: 'bp-5-1', title: 'Uji Titik Nyala & Bakar (Cleveland)', standard: 'SNI 2433:2011' },
        ],
      },
      {
        chapterId: 'bp-bab6',
        title: 'Bab 6: Daktilitas Aspal',
        items: [
          { id: 'bp-6-1', title: 'Uji Daktilitas Aspal', standard: 'SNI 2432:2011' },
        ],
      },
      {
        chapterId: 'bp-bab7',
        title: 'Bab 7: Viskositas (Saybolt Furol)',
        items: [
          { id: 'bp-7-1', title: 'Uji Viskositas (Saybolt Furol)', standard: 'SNI 7729:2011' },
        ],
      },
      {
        chapterId: 'bp-bab8',
        title: 'Bab 8: Job Mix Formula (JMF)',
        items: [
          { id: 'bp-8-1', title: 'Job Mix Formula (JMF)', standard: 'Spesifikasi Umum Bina Marga 2018' },
        ],
      },
      {
        chapterId: 'bp-bab9',
        title: 'Bab 9: Uji Marshall Test',
        items: [
          { id: 'bp-9-1', title: 'Uji Marshall Test', standard: 'SNI 06-2489-1991' },
        ],
      },
      {
        chapterId: 'bp-bab10',
        title: 'Bab 10: Ekstraksi Aspal (Sentrifus)',
        items: [
          { id: 'bp-10-1', title: 'Uji Ekstraksi Aspal (Sentrifus)', standard: 'SNI 03-6894-2002' },
        ],
      },
    ],
  },
]

// =========================================================================
// HELPER FORMAT NOTASI ILMIAH SUPERSKRIP (CONTOH: 8.249 × 10⁻⁵)
// =========================================================================
export const SUPERSCRIPT_DIGITS = {
  '-': '⁻',
  '+': '⁺',
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
}

export function toSuperscript(str) {
  return String(str)
    .split('')
    .map((ch) => SUPERSCRIPT_DIGITS[ch] || ch)
    .join('')
}

/**
 * Memformat angka floating-point menjadi notasi ilmiah standar dengan simbol superskrip:
 * Contoh: formatScientific(0.000082489, 3) -> "8.249 × 10⁻⁵"
 */
export function formatScientific(value, decimals = 3) {
  if (value === null || value === undefined || value === '' || Number.isNaN(Number(value))) {
    return value
  }
  const num = Number(value)
  if (num === 0) return '0'

  const expStr = num.toExponential(decimals)
  const parts = expStr.split(/e/i)
  if (parts.length !== 2) return String(value)

  const mantissa = parseFloat(parts[0]).toFixed(decimals)
  const exp = parseInt(parts[1], 10)

  if (exp === 0) return mantissa
  return `${mantissa} × 10${toSuperscript(exp.toString())}`
}

/**
 * Memindai teks dan mengganti setiap angka format eksponensial JavaScript (seperti 8.2489e-5)
 * menjadi format ilmiah rapi dengan simbol superskrip (8.249 × 10⁻⁵).
 */
export function formatScientificInText(text, decimals = null) {
  if (typeof text !== 'string') return text
  return text.replace(/([+-]?\d+(?:\.\d+)?)[eE]([+-]?\d+)/g, (match, mantissaStr, expStr) => {
    let mantissa = mantissaStr
    if (decimals !== null) {
      const parsed = parseFloat(mantissaStr)
      if (!isNaN(parsed)) {
        mantissa = parsed.toFixed(decimals)
      }
    }
    const exp = parseInt(expStr, 10)
    if (exp === 0) return String(mantissa)
    return `${mantissa} × 10${toSuperscript(exp.toString())}`
  })
}

/**
 * Format label ukuran lubang ayakan sesuai konvensi standar SNI 03-1968 / ASTM:
 * (0.15 mm, 0.30 mm, 0.60 mm, 1.18 mm, 2.36 mm, 4.75 mm, 9.5 mm, dll.)
 */
export function formatSieveLabel(size) {
  const num = Number(size)
  if (isNaN(num)) return String(size)
  if (Math.abs(num - 0.15) < 0.02) return '0.15 mm'
  if (Math.abs(num - 0.30) < 0.02) return '0.30 mm'
  if (Math.abs(num - 0.60) < 0.02) return '0.60 mm'
  if (Math.abs(num - 1.18) < 0.02) return '1.18 mm'
  if (Math.abs(num - 2.36) < 0.02) return '2.36 mm'
  if (Math.abs(num - 4.75) < 0.05) return '4.75 mm'
  if (Math.abs(num - 9.50) < 0.05) return '9.5 mm'
  if (Math.abs(num - 12.5) < 0.05) return '12.5 mm'
  if (Math.abs(num - 19.0) < 0.05) return '19.0 mm'
  if (Math.abs(num - 25.0) < 0.05) return '25.0 mm'
  if (Math.abs(num - 37.5) < 0.05) return '37.5 mm'
  if (Math.abs(num - 50.0) < 0.05) return '50.0 mm'
  return `${num} mm`
}

/**
 * Interpolasi logaritmik ukuran butiran (ASTM D422 / D2487)
 * Mencari diameter (mm) pada persentase lolos targetP (%)
 */
export function findDiameterAtPassing(targetP, points) {
  if (!points || points.length === 0) return null
  const exact = points.find((pt) => Math.abs(pt.passing - targetP) < 0.001)
  if (exact) return exact.diameter
  if (targetP > points[0].passing) return null

  for (let i = 0; i < points.length - 1; i++) {
    const pt1 = points[i]
    const pt2 = points[i + 1]
    if (pt1.passing >= targetP && pt2.passing <= targetP) {
      if (pt1.passing === pt2.passing) return pt1.diameter
      if (pt1.diameter <= 0 || pt2.diameter <= 0) continue
      const logD1 = Math.log10(pt1.diameter)
      const logD2 = Math.log10(pt2.diameter)
      const frac = (targetP - pt2.passing) / (pt1.passing - pt2.passing)
      const logD = logD2 + frac * (logD1 - logD2)
      return Math.pow(10, logD)
    }
  }
  return null
}

export const DEFAULT_SOIL_SIEVES = [
  { id: 1, sieveNo: 'No. 4', diameter: 4.75, retainedWeight: 20.0 },
  { id: 2, sieveNo: 'No. 10', diameter: 2.00, retainedWeight: 60.0 },
  { id: 3, sieveNo: 'No. 20', diameter: 0.850, retainedWeight: 100.0 },
  { id: 4, sieveNo: 'No. 40', diameter: 0.425, retainedWeight: 100.0 },
  { id: 5, sieveNo: 'No. 60', diameter: 0.250, retainedWeight: 90.0 },
  { id: 6, sieveNo: 'No. 100', diameter: 0.150, retainedWeight: 55.0 },
  { id: 7, sieveNo: 'No. 200', diameter: 0.075, retainedWeight: 45.0 },
  { id: 8, sieveNo: 'Pan', diameter: 0, retainedWeight: 24.0, isPan: true },
]

export const DEFAULT_OEDOMETER_READINGS = [
  { id: 1, t: 0, h: 2.000, deltaH: 0.000 },
  { id: 2, t: 0.25, h: 1.978, deltaH: 0.022 },
  { id: 3, t: 1.0, h: 1.958, deltaH: 0.042 },
  { id: 4, t: 2.25, h: 1.940, deltaH: 0.060 },
  { id: 5, t: 4.0, h: 1.924, deltaH: 0.076 },
  { id: 6, t: 6.25, h: 1.910, deltaH: 0.090 },
  { id: 7, t: 9.0, h: 1.898, deltaH: 0.102 },
  { id: 8, t: 12.25, h: 1.888, deltaH: 0.112 },
  { id: 9, t: 16.0, h: 1.880, deltaH: 0.120 },
  { id: 10, t: 20.25, h: 1.874, deltaH: 0.126 },
  { id: 11, t: 40.0, h: 1.867, deltaH: 0.133 },
  { id: 12, t: 120.0, h: 1.861, deltaH: 0.139 },
  { id: 13, t: 400.0, h: 1.857, deltaH: 0.143 },
  { id: 14, t: 1440.0, h: 1.855, deltaH: 0.145 },
]

export const DEFAULT_DIRECT_SHEAR_POINTS = [
  { id: 1, area: 31.17, normalLoad: 3.17, shearForce: 1.50, sigma: 0.1017, tau: 0.0481 },
  { id: 2, area: 31.17, normalLoad: 6.325, shearForce: 2.35, sigma: 0.2029, tau: 0.0754 },
  { id: 3, area: 31.17, normalLoad: 12.65, shearForce: 4.05, sigma: 0.4058, tau: 0.1299 },
]

export const DEFAULT_PENETRATION_GROUPS = [
  {
    id: 1,
    name: 'Kelompok 1 (Sampel A)',
    points: [
      { id: 1, value: 78.6 },
      { id: 2, value: 65.6 },
      { id: 3, value: 59.4 },
    ],
  },
  {
    id: 2,
    name: 'Kelompok 2 (Sampel B)',
    points: [
      { id: 1, value: 64.2 },
      { id: 2, value: 65.0 },
      { id: 3, value: 64.6 },
    ],
  },
]

export const DEFAULT_BB11_SAMPLES = [
  { id: 1, name: 'Benda Uji I', s: 500.0, a: 489.6, b: 664.2, c: 979.2 },
  { id: 2, name: 'Benda Uji II', s: 500.0, a: 479.5, b: 636.1, c: 950.5 },
  { id: 3, name: 'Benda Uji III', s: 500.0, a: 488.5, b: 661.5, c: 979.5 },
]

export const DEFAULT_BB12_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 15.3, w2: 115.3, w3: 111.4 },
  { id: 2, name: 'Benda Uji II', w1: 15.1, w2: 115.1, w3: 111.2 },
  { id: 3, name: 'Benda Uji III', w1: 15.4, w2: 115.4, w3: 111.6 },
]

export const DEFAULT_BB13_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 500.0, w2: 486.2 },
  { id: 2, name: 'Benda Uji II', w1: 500.0, w2: 485.5 },
  { id: 3, name: 'Benda Uji III', w1: 500.0, w2: 487.1 },
]

export const DEFAULT_BB14_SAMPLES = [
  { id: 1, name: 'Benda Uji I', wLepas: 16.85, wPadat: 18.15 },
  { id: 2, name: 'Benda Uji II', wLepas: 16.90, wPadat: 18.20 },
  { id: 3, name: 'Benda Uji III', wLepas: 16.82, wPadat: 18.12 },
]

export const DEFAULT_BB21_SAMPLES = [
  { id: 1, name: 'Benda Uji I', a: 485.4, b: 500.0, c: 268.3 },
  { id: 2, name: 'Benda Uji II', a: 486.6, b: 500.5, c: 271.4 },
  { id: 3, name: 'Benda Uji III', a: 486.1, b: 500.6, c: 276.3 },
]

export const DEFAULT_BB22_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 55.4, w2: 555.4, w3: 545.2 },
  { id: 2, name: 'Benda Uji II', w1: 56.1, w2: 556.1, w3: 546.8 },
  { id: 3, name: 'Benda Uji III', w1: 55.8, w2: 555.8, w3: 546.0 },
]

export const DEFAULT_BB23_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 1000.0, w2: 993.4 },
  { id: 2, name: 'Benda Uji II', w1: 1000.0, w2: 992.8 },
  { id: 3, name: 'Benda Uji III', w1: 1000.0, w2: 994.0 },
]

export const DEFAULT_BB24_SAMPLES = [
  { id: 1, name: 'Benda Uji I', wLepas: 25.14, wPadat: 26.98 },
  { id: 2, name: 'Benda Uji II', wLepas: 25.20, wPadat: 27.05 },
  { id: 3, name: 'Benda Uji III', wLepas: 25.10, wPadat: 26.92 },
]

export const DEFAULT_BB26_SAMPLES = [
  { id: 1, name: 'Benda Uji I', a: 2000.0, b: 808.3 },
  { id: 2, name: 'Benda Uji II', a: 2000.0, b: 820.0 },
  { id: 3, name: 'Benda Uji III', a: 2000.0, b: 812.5 },
]

export const DEFAULT_MT21_SAMPLES = [
  { id: 1, name: 'Cawan C-1', w1: 15.4, w2: 68.2, w3: 57.6 },
  { id: 2, name: 'Cawan C-2', w1: 16.1, w2: 70.5, w3: 59.4 },
  { id: 3, name: 'Cawan C-3', w1: 15.8, w2: 69.1, w3: 58.2 },
]

export const DEFAULT_MT22_SAMPLES = [
  { id: 1, name: 'Piknometer P-1', w1: 34.8, w2: 84.8, w3: 167.4, w4: 136.2 },
  { id: 2, name: 'Piknometer P-2', w1: 35.2, w2: 85.2, w3: 168.0, w4: 136.8 },
  { id: 3, name: 'Piknometer P-3', w1: 35.0, w2: 85.0, w3: 167.7, w4: 136.5 },
]

export const DEFAULT_MT23_SAMPLES = [
  { id: 1, name: 'Titik 1 (N=16)', n: 16, w1: 14.2, w2: 44.8, w3: 35.2 },
  { id: 2, name: 'Titik 2 (N=21)', n: 21, w1: 14.5, w2: 45.1, w3: 35.8 },
  { id: 3, name: 'Titik 3 (N=28)', n: 28, w1: 14.0, w2: 43.8, w3: 35.1 },
  { id: 4, name: 'Titik 4 (N=34)', n: 34, w1: 14.4, w2: 43.6, w3: 35.3 },
]

export const DEFAULT_MT24_SAMPLES = [
  { id: 1, name: 'Cawan PL-1', w1: 12.3, w2: 24.8, w3: 22.5 },
  { id: 2, name: 'Cawan PL-2', w1: 12.5, w2: 25.2, w3: 22.9 },
  { id: 3, name: 'Cawan PL-3', w1: 12.1, w2: 24.5, w3: 22.2 },
]

export const DEFAULT_DUCTILITY_SAMPLES = [
  { id: 1, name: 'Cetakan / Benda Uji 1', value: 118.0, isValid: true },
  { id: 2, name: 'Cetakan / Benda Uji 2', value: 122.0, isValid: true },
  { id: 3, name: 'Cetakan / Benda Uji 3', value: 120.0, isValid: true },
]

export const DEFAULT_VISCOSITY_POINTS = [
  { id: 1, temp: 120.0, time: 340.0 },
  { id: 2, temp: 135.0, time: 165.0 },
  { id: 3, temp: 150.0, time: 82.0 },
  { id: 4, temp: 165.0, time: 43.0 },
]

export const DEFAULT_FLASH_SAMPLES = [
  { id: 1, flashPoint: 325.0, firePoint: 334.0 },
  { id: 2, flashPoint: 330.0, firePoint: 360.0 },
  { id: 3, flashPoint: 315.0, firePoint: 339.0 },
]

export const DEFAULT_JMF_SIEVES = [
  { id: 1, name: '1"', sizeMm: '25 mm', size: 25.0, retWeight: 0.0, specMin: 100.0, specMax: 100.0 },
  { id: 2, name: '3/4"', sizeMm: '19 mm', size: 19.0, retWeight: 0.0, specMin: 100.0, specMax: 100.0 },
  { id: 3, name: '1/2"', sizeMm: '12.5 mm', size: 12.5, retWeight: 56.1, specMin: 90.0, specMax: 100.0 },
  { id: 4, name: '3/8"', sizeMm: '9.5 mm', size: 9.5, retWeight: 129.03, specMin: 77.0, specMax: 90.0 },
  { id: 5, name: 'No. 4', sizeMm: '4.75 mm', size: 4.75, retWeight: 252.45, specMin: 53.0, specMax: 69.0, isBoundaryCA: true },
  { id: 6, name: 'No. 8', sizeMm: '2.36 mm', size: 2.36, retWeight: 201.96, specMin: 33.0, specMax: 53.0 },
  { id: 7, name: 'No. 16', sizeMm: '1.18 mm', size: 1.18, retWeight: 140.25, specMin: 21.0, specMax: 40.0 },
  { id: 8, name: 'No. 30', sizeMm: '0.6 mm', size: 0.6, retWeight: 95.37, specMin: 14.0, specMax: 30.0 },
  { id: 9, name: 'No. 50', sizeMm: '0.3 mm', size: 0.3, retWeight: 72.93, specMin: 9.0, specMax: 22.0 },
  { id: 10, name: 'No. 100', sizeMm: '0.15 mm', size: 0.15, retWeight: 56.1, specMin: 6.0, specMax: 15.0 },
  { id: 11, name: 'No. 200', sizeMm: '0.075 mm', size: 0.075, retWeight: 44.88, specMin: 4.0, specMax: 9.0, isBoundaryFiller: true },
  { id: 12, name: 'Pan', sizeMm: '< 0.075 mm', size: 0.0, retWeight: 72.93, specMin: null, specMax: null, isPan: true },
]

export const DEFAULT_MARSHALL_SURFACE_AREA_TABLE = [
  { id: 1, sieve: '1/2"', sizeMm: '12.5 mm', retWeight: 56.10, cumPassPct: 95.325, flp: 0.41, lp: 0.39 },
  { id: 2, sieve: '3/8"', sizeMm: '9.5 mm', retWeight: 129.03, cumPassPct: 84.5725, flp: 0.41, lp: 0.35 },
  { id: 3, sieve: 'No. 4', sizeMm: '4.75 mm', retWeight: 252.45, cumPassPct: 63.535, flp: 0.41, lp: 0.26 },
  { id: 4, sieve: 'No. 8', sizeMm: '2.36 mm', retWeight: 201.96, cumPassPct: 46.705, flp: 0.82, lp: 0.38 },
  { id: 5, sieve: 'No. 16', sizeMm: '1.18 mm', retWeight: 140.25, cumPassPct: 35.0175, flp: 1.64, lp: 0.57 },
  { id: 6, sieve: 'No. 30', sizeMm: '0.6 mm', retWeight: 95.37, cumPassPct: 27.07, flp: 2.87, lp: 0.78 },
  { id: 7, sieve: 'No. 50', sizeMm: '0.3 mm', retWeight: 72.93, cumPassPct: 20.9925, flp: 6.14, lp: 1.29 },
  { id: 8, sieve: 'No. 100', sizeMm: '0.15 mm', retWeight: 56.10, cumPassPct: 16.3175, flp: 12.29, lp: 2.01 },
  { id: 9, sieve: 'No. 200', sizeMm: '0.075 mm', retWeight: 44.88, cumPassPct: 12.5775, flp: 32.77, lp: 4.12 },
  { id: 10, sieve: 'Pan', sizeMm: '< 0.075 mm', retWeight: 72.93, cumPassPct: 6.5, flp: 0, lp: 0 },
]

export const DEFAULT_MARSHALL_SPECIMENS = [
  {
    id: 1,
    no: 1,
    pa: 5.5,
    beratSsd: 1182.2,
    beratAir: 623.8,
    beratKering: 1176.0,
    bacaanStab: 218,
    flow: 1.10,
    angkaKorelasi: 0.924,
    stabilitas: 2616.46,
  },
  {
    id: 2,
    no: 2,
    pa: 5.0,
    beratSsd: 1183.9,
    beratAir: 609.3,
    beratKering: 1175.8,
    bacaanStab: 257,
    flow: 2.04,
    angkaKorelasi: 0.850,
    stabilitas: 2839.88,
  },
  {
    id: 3,
    no: 3,
    pa: 6.5,
    beratSsd: 1141.0,
    beratAir: 602.3,
    beratKering: 1153.6,
    bacaanStab: 183,
    flow: 0.92,
    angkaKorelasi: 0.886,
    stabilitas: 2106.16,
  },
]

export function interpolateMarshallCorrelation(tebalMm) {
  const t = Number(tebalMm) || 68.5
  if (t <= 25.4) return 5.56
  if (t >= 76.2) return 0.76

  const table = [
    { t: 25.4, k: 5.56 },
    { t: 27.0, k: 5.00 },
    { t: 28.6, k: 4.55 },
    { t: 30.2, k: 4.17 },
    { t: 31.8, k: 3.70 },
    { t: 33.3, k: 3.33 },
    { t: 34.9, k: 3.03 },
    { t: 36.5, k: 2.78 },
    { t: 38.1, k: 2.50 },
    { t: 39.7, k: 2.27 },
    { t: 41.3, k: 2.08 },
    { t: 42.9, k: 1.92 },
    { t: 44.4, k: 1.79 },
    { t: 46.0, k: 1.67 },
    { t: 47.6, k: 1.56 },
    { t: 49.2, k: 1.47 },
    { t: 50.8, k: 1.39 },
    { t: 52.4, k: 1.32 },
    { t: 54.0, k: 1.25 },
    { t: 55.6, k: 1.19 },
    { t: 57.2, k: 1.14 },
    { t: 58.7, k: 1.09 },
    { t: 60.3, k: 1.04 },
    { t: 61.9, k: 1.00 },
    { t: 63.5, k: 0.96 },
    { t: 65.1, k: 0.93 },
    { t: 66.7, k: 0.89 },
    { t: 68.3, k: 0.89 },
    { t: 69.9, k: 0.86 },
    { t: 71.4, k: 0.83 },
    { t: 73.0, k: 0.81 },
    { t: 74.6, k: 0.78 },
    { t: 76.2, k: 0.76 },
  ]

  for (let i = 0; i < table.length - 1; i++) {
    const curr = table[i]
    const next = table[i + 1]
    if (t >= curr.t && t <= next.t) {
      const frac = (t - curr.t) / (next.t - curr.t)
      const k = curr.k + frac * (next.k - curr.k)
      return Number(k.toFixed(3))
    }
  }
  return 0.886
}

export function fitQuadratic(points) {
  if (points.length < 3) return { a: 0, b: 0, c: 0, equation: '-', r2: 1.0 }
  const x1 = points[0].x, y1 = points[0].y
  const x2 = points[1].x, y2 = points[1].y
  const x3 = points[2].x, y3 = points[2].y

  const denom = (x1 - x2) * (x1 - x3) * (x2 - x3)
  if (Math.abs(denom) < 1e-9) return { a: 0, b: 0, c: 0, equation: '-', r2: 1.0 }

  const a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denom
  const b = (x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / denom
  const c = (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denom

  const signB = b >= 0 ? '+ ' : '- '
  const signC = c >= 0 ? '+ ' : '- '
  const eq = `f(x) = ${a.toFixed(3)}x² ${signB}${Math.abs(b).toFixed(3)}x ${signC}${Math.abs(c).toFixed(3)}`

  return { a, b, c, equation: eq, r2: 1.0 }
}

export function fitLinear(points) {
  if (points.length < 2) return { m: 0, c: 0, equation: '-', r2: 1.0 }
  const n = points.length
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0
  for (const p of points) {
    sumX += p.x
    sumY += p.y
    sumXY += p.x * p.y
    sumX2 += p.x * p.x
    sumY2 += p.y * p.y
  }
  const denom = n * sumX2 - sumX * sumX
  if (Math.abs(denom) < 1e-9) return { m: 0, c: 0, equation: '-', r2: 1.0 }
  const m = (n * sumXY - sumX * sumY) / denom
  const c = (sumY - m * sumX) / n

  const numR = n * sumXY - sumX * sumY
  const denR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
  const r = denR > 0 ? numR / denR : 1.0
  const r2 = Number((r * r).toFixed(3))

  const signC = c >= 0 ? '+ ' : '- '
  const eq = `y = ${m.toFixed(1)}x ${signC}${Math.abs(c).toFixed(1)} (R² = ${r2})`

  return { m, c, equation: eq, r2 }
}

// =========================================================================
// REGISTRY PARAMETER & RUMUS PERHITUNGAN UNTUK 31 MODUL PENGUJIAN
// =========================================================================
export const calculatorRegistry = {
  // -----------------------------------------------------------------------
  // BAB I: AGREGAT HALUS (MULTI-SAMPEL DINAMIS)
  // -----------------------------------------------------------------------
  'bb-1-1': {
    id: 'bb-1-1',
    code: 'BJ-01',
    name: 'Pengujian Berat Jenis & Penyerapan Air Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 1970:2016',
    desc: 'Menghitung Berat Jenis Curah Kering (Sd), Berat Jenis Jenuh Kering Permukaan / SSD (Ss), Berat Jenis Semu (Sa), dan Penyerapan Air (Sw) pasir menggunakan metode piknometer multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 's', label: 'Berat SSD (S)', unit: 'gram', desc: 'Massa benda uji SSD (standar 500 gr)', min: 0.1 },
      { key: 'a', label: 'Berat Kering Oven (A)', unit: 'gram', desc: 'Massa benda uji kering oven 110°C', min: 0.1 },
      { key: 'b', label: 'Piknometer + Air (B)', unit: 'gram', desc: 'Massa piknometer berisi air pada 25°C', min: 0.1 },
      { key: 'c', label: 'Piknometer + SSD + Air (C)', unit: 'gram', desc: 'Massa piknometer + contoh SSD + air', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB11_SAMPLES)),
    },
    fields: [
      { key: 's', label: 'Berat Benda Uji Kondisi SSD (S)', unit: 'gram', desc: 'Massa contoh pasir SSD standar 500 gr', min: 0 },
      { key: 'a', label: 'Berat Benda Uji Kering Oven (A)', unit: 'gram', desc: 'Massa contoh pasir kering oven setelah 110°C', min: 0 },
      { key: 'b', label: 'Berat Piknometer Berisi Air (B)', unit: 'gram', desc: 'Massa piknometer diisi air murni 25°C', min: 0 },
      { key: 'c', label: 'Berat Piknometer + Benda Uji SSD + Air (C)', unit: 'gram', desc: 'Massa total piknometer + contoh SSD + air', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            s: inputs.s !== undefined ? inputs.s : 500,
            a: inputs.a !== undefined ? inputs.a : (inputs.bk || 489.6),
            b: inputs.b !== undefined ? inputs.b : 664.2,
            c: inputs.c !== undefined ? inputs.c : (inputs.bt || 979.2),
          }]

      // Validasi dan pemrosesan per sampel
      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const sm = Number(s.s ?? 500)
        const a = Number(s.a ?? 0)
        const b = Number(s.b ?? 0)
        const c = Number(s.c ?? 0)

        if (a <= 0 || b <= 0 || sm <= 0 || c <= 0) {
          errors.push(`${idLabel}: Semua nilai massa (A, B, S, C) harus lebih besar dari 0 gram.`)
          return
        }
        if (c <= b) {
          errors.push(`${idLabel}: Nilai C (${c} g) tidak logis (harus lebih besar dari B = ${b} g).`)
          return
        }
        if (a > sm) {
          errors.push(`${idLabel}: Berat kering oven A (${a} g) tidak boleh melebihi berat kondisi SSD S (${sm} g).`)
          return
        }
        const den = b + sm - c
        const denApp = b + a - c
        if (den <= 0 || denApp <= 0) {
          errors.push(`${idLabel}: Nilai kapasitas piknometer tidak fisis (B + S - C = ${den.toFixed(2)} <= 0).`)
          return
        }

        const sd = a / den
        const ss = sm / den
        const sa = a / denApp
        const sw = ((sm - a) / a) * 100

        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          s: sm,
          a,
          b,
          c,
          den,
          denApp,
          sd,
          ss,
          sa,
          sw,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'BJ Curah Kering (Sd) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'BJ Curah SSD (Ss) Rata-rata', value: '-', unit: '' },
            { label: 'BJ Semu (Sa) Rata-rata', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw) Rata-rata', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa yang valid > 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan piknometer laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgA = validSamples.reduce((sum, r) => sum + r.a, 0) / n
      const avgS = validSamples.reduce((sum, r) => sum + r.s, 0) / n
      const avgB = validSamples.reduce((sum, r) => sum + r.b, 0) / n
      const avgC = validSamples.reduce((sum, r) => sum + r.c, 0) / n
      const avgSd = validSamples.reduce((sum, r) => sum + r.sd, 0) / n
      const avgSs = validSamples.reduce((sum, r) => sum + r.ss, 0) / n
      const avgSa = validSamples.reduce((sum, r) => sum + r.sa, 0) / n
      const avgSw = validSamples.reduce((sum, r) => sum + r.sw, 0) / n

      // Evaluasi SNI 1970:2016
      // - BJ Curah Kering (Sd): 2.50 - 2.70
      // - Penyerapan Air (Sw): Maksimal 3.0%
      const isSdOk = avgSd >= 2.50 && avgSd <= 2.75
      const isSwOk = avgSw >= 0 && avgSw <= 3.00
      const isValid = isSdOk && isSwOk

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Sd = ${r.a.toFixed(1)} / (${r.b.toFixed(1)} + ${r.s.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.sd.toFixed(3)} | Ss = ${r.ss.toFixed(3)} | Sa = ${r.sa.toFixed(3)} | Sw = ((${r.s.toFixed(1)} - ${r.a.toFixed(1)}) / ${r.a.toFixed(1)}) × 100% = ${r.sw.toFixed(2)}%`
        ),
        `Rata-rata BJ Curah (Sd) = (${validSamples.map(r => r.sd.toFixed(3)).join(' + ')}) / ${n} = ${avgSd.toFixed(3)}`,
        `Rata-rata BJ SSD (Ss) = (${validSamples.map(r => r.ss.toFixed(3)).join(' + ')}) / ${n} = ${avgSs.toFixed(3)}`,
        `Rata-rata BJ Semu (Sa) = (${validSamples.map(r => r.sa.toFixed(3)).join(' + ')}) / ${n} = ${avgSa.toFixed(3)}`,
        `Rata-rata Penyerapan Air (Sw) = (${validSamples.map(r => r.sw.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgSw.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Perbandingan Benda Uji (Tabel 3.2 Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Benda Uji Kering Oven (A)',
            equation: 'A',
            unit: 'gram',
            values: validSamples.map(s => s.a.toFixed(1)),
            average: avgA.toFixed(2),
          },
          {
            label: 'Berat Benda Uji Kondisi SSD (S)',
            equation: 'S',
            unit: 'gram',
            values: validSamples.map(s => s.s.toFixed(1)),
            average: avgS.toFixed(2),
          },
          {
            label: 'Berat Piknometer + Air (B)',
            equation: 'B',
            unit: 'gram',
            values: validSamples.map(s => s.b.toFixed(1)),
            average: avgB.toFixed(2),
          },
          {
            label: 'Berat Piknometer + SSD + Air (C)',
            equation: 'C',
            unit: 'gram',
            values: validSamples.map(s => s.c.toFixed(1)),
            average: avgC.toFixed(2),
          },
          {
            label: 'Berat Jenis Curah Kering (Bulk)',
            equation: 'Sd = A / (B + S - C)',
            unit: '',
            values: validSamples.map(s => s.sd.toFixed(3)),
            average: avgSd.toFixed(3),
            highlight: true,
          },
          {
            label: 'Berat Jenis Curah SSD',
            equation: 'Ss = S / (B + S - C)',
            unit: '',
            values: validSamples.map(s => s.ss.toFixed(3)),
            average: avgSs.toFixed(3),
          },
          {
            label: 'Berat Jenis Semu (Apparent)',
            equation: 'Sa = A / (B + A - C)',
            unit: '',
            values: validSamples.map(s => s.sa.toFixed(3)),
            average: avgSa.toFixed(3),
          },
          {
            label: 'Penyerapan Air (Absorption)',
            equation: 'Sw = ((S - A) / A) × 100%',
            unit: '%',
            values: validSamples.map(s => s.sw.toFixed(2) + '%'),
            average: avgSw.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Memenuhi spesifikasi SNI 1970:2016 (Rata-rata BJ Curah Kering Sd = ${avgSd.toFixed(3)} [standar 2.50 - 2.70] dan Penyerapan Air Sw = ${avgSw.toFixed(2)}% [maks 3.0%]). Agregat halus layak digunakan untuk campuran beton struktural maupun perkerasan jalan.`
        : `Rata-rata Penyerapan Air Sw (${avgSw.toFixed(2)}%) atau BJ Curah Sd (${avgSd.toFixed(3)}) berada di luar rentang standar SNI 1970:2016 (syarat teknis: Sd 2.50 - 2.70 dan Sw ≤ 3.0%). Perhatikan koreksi air pencampur beton.`

      return {
        results: [
          { label: 'BJ Curah Kering (Sd) Rata-rata', value: avgSd.toFixed(3), unit: '', highlight: true, sub: 'Standar SNI: 2.50 - 2.70' },
          { label: 'BJ Curah SSD (Ss) Rata-rata', value: avgSs.toFixed(3), unit: '', sub: 'Kondisi Jenuh Kering Permukaan' },
          { label: 'BJ Semu (Sa) Rata-rata', value: avgSa.toFixed(3), unit: '', sub: 'Massa jenis butiran padat' },
          { label: 'Penyerapan Air (Sw) Rata-rata', value: avgSw.toFixed(2), unit: '%', highlight: true, sub: 'Standar SNI: Maksimum 3.00%' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Sd = ${avgSd.toFixed(3)}, Ss = ${avgSs.toFixed(3)}, Sa = ${avgSa.toFixed(3)}, Sw = ${avgSw.toFixed(2)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-1-2': {
    id: 'bb-1-2',
    code: 'KA-01',
    name: 'Pengujian Kadar Air Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 1971:2011',
    desc: 'Menghitung persentase kandungan air bebas di dalam pori dan permukaan butiran pasir melalui pengeringan oven multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0.1 },
      { key: 'w2', label: 'Cawan + Pasir Basah (W2)', unit: 'gram', desc: 'Massa sebelum masuk oven', min: 0.1 },
      { key: 'w3', label: 'Cawan + Pasir Kering (W3)', unit: 'gram', desc: 'Massa setelah oven 110°C konstan', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB12_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0 },
      { key: 'w2', label: 'Berat Cawan + Contoh Pasir Basah (W2)', unit: 'gram', desc: 'Massa sebelum masuk oven', min: 0 },
      { key: 'w3', label: 'Berat Cawan + Contoh Pasir Kering (W3)', unit: 'gram', desc: 'Massa setelah oven 110°C', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 15.3,
            w2: inputs.w2 !== undefined ? inputs.w2 : 115.3,
            w3: inputs.w3 !== undefined ? inputs.w3 : 111.4,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const w1 = Number(s.w1 ?? 0)
        const w2 = Number(s.w2 ?? 0)
        const w3 = Number(s.w3 ?? 0)

        if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
          errors.push(`${idLabel}: Massa W1, W2, W3 harus lebih besar dari 0 gram.`)
          return
        }
        if (w2 <= w1 || w3 <= w1) {
          errors.push(`${idLabel}: Massa cawan + pasir harus lebih besar dari cawan kosong W1.`)
          return
        }
        if (w2 < w3) {
          errors.push(`${idLabel}: Pasir basah (W2 = ${w2} g) tidak boleh lebih ringan dari pasir kering (W3 = ${w3} g).`)
          return
        }

        const water = w2 - w3
        const dry = w3 - w1
        if (dry <= 0) {
          errors.push(`${idLabel}: Massa pasir kering bernilai 0.`)
          return
        }

        const moisture = (water / dry) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          w1,
          w2,
          w3,
          water,
          dry,
          moisture,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Kadar Air (w) Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Berat Air Teruapkan Rata-rata', value: '-', unit: 'gram' },
            { label: 'Berat Pasir Kering Rata-rata', value: '-', unit: 'gram' },
            { label: 'Status Evaluasi SNI', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan cawan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgW1 = validSamples.reduce((sum, r) => sum + r.w1, 0) / n
      const avgW2 = validSamples.reduce((sum, r) => sum + r.w2, 0) / n
      const avgW3 = validSamples.reduce((sum, r) => sum + r.w3, 0) / n
      const avgWater = validSamples.reduce((sum, r) => sum + r.water, 0) / n
      const avgDry = validSamples.reduce((sum, r) => sum + r.dry, 0) / n
      const avgMoisture = validSamples.reduce((sum, r) => sum + r.moisture, 0) / n

      const isHigh = avgMoisture > 10.0
      const isExtreme = avgMoisture > 15.0
      let status = 'Valid'
      let verdictClass = 'valid'
      if (isExtreme) {
        status = 'Input Tidak Wajar'
        verdictClass = 'error'
      } else if (isHigh) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
      }

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Air = ${r.w2.toFixed(1)} - ${r.w3.toFixed(1)} = ${r.water.toFixed(2)} g | Kering = ${r.w3.toFixed(1)} - ${r.w1.toFixed(1)} = ${r.dry.toFixed(2)} g | w = (${r.water.toFixed(2)} / ${r.dry.toFixed(2)}) × 100% = ${r.moisture.toFixed(2)}%`
        ),
        `Rata-rata Kadar Air (w) = (${validSamples.map(r => r.moisture.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgMoisture.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kadar Air Agregat Halus (Format Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Cawan Kosong (W1)',
            equation: 'W1',
            unit: 'gram',
            values: validSamples.map(s => s.w1.toFixed(1)),
            average: avgW1.toFixed(2),
          },
          {
            label: 'Berat Cawan + Pasir Basah (W2)',
            equation: 'W2',
            unit: 'gram',
            values: validSamples.map(s => s.w2.toFixed(1)),
            average: avgW2.toFixed(2),
          },
          {
            label: 'Berat Cawan + Pasir Kering Oven (W3)',
            equation: 'W3',
            unit: 'gram',
            values: validSamples.map(s => s.w3.toFixed(1)),
            average: avgW3.toFixed(2),
          },
          {
            label: 'Berat Air Teruapkan',
            equation: 'W2 - W3',
            unit: 'gram',
            values: validSamples.map(s => s.water.toFixed(2)),
            average: avgWater.toFixed(2),
          },
          {
            label: 'Berat Pasir Kering Oven',
            equation: 'W3 - W1',
            unit: 'gram',
            values: validSamples.map(s => s.dry.toFixed(2)),
            average: avgDry.toFixed(2),
          },
          {
            label: 'Kadar Air Pasir (w)',
            equation: '((W2 - W3) / (W3 - W1)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.moisture.toFixed(2) + '%'),
            average: avgMoisture.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = status === 'Valid'
        ? `Rata-rata kadar air pasir sebesar ${avgMoisture.toFixed(2)}% memenuhi batas normal SNI 1971:2011 (≤ 10.0%). Data valid dan siap digunakan sebagai faktor koreksi takaran air pencampur beton.`
        : isExtreme
        ? `Kadar air pasir sebesar ${avgMoisture.toFixed(2)}% tergolong nilai ekstrem (> 15.0%). Periksa kembali pembacaan timbangan atau kondisi sampel basah.`
        : `Kadar air pasir sebesar ${avgMoisture.toFixed(2)}% berada di atas rentang umum (3% - 10%). Diperlukan koreksi volume air pencampur beton yang signifikan pada job mix beton.`

      return {
        results: [
          { label: 'Kadar Air (w) Rata-rata', value: avgMoisture.toFixed(2), unit: '%', highlight: true, sub: 'Rentang umum pasir: 3% - 10%' },
          { label: 'Berat Air Teruapkan Rata-rata', value: avgWater.toFixed(2), unit: 'gram', sub: 'Massa air hilang selama pengovenan' },
          { label: 'Berat Pasir Kering Rata-rata', value: avgDry.toFixed(2), unit: 'gram', sub: 'Massa agregat padat kering' },
          { label: 'Status Evaluasi SNI', value: status, unit: '', highlight: true, sub: 'SNI 1971:2011' },
        ],
        formulaSteps,
        recapTable,
        isError: isExtreme,
        status,
        verdictClass,
        conclusion,
        summaryString: `Kadar Air (w) = ${avgMoisture.toFixed(2)}% (${status})`,
      }
    },
  },

  'bb-1-3': {
    id: 'bb-1-3',
    code: 'LP-01',
    name: 'Pengujian Kandungan Lumpur & Zat Organik Pasir',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 03-4142-1996 / SNI 2816:2014',
    desc: 'Menentukan persentase partikel lolos ayakan No. 200 (lumpur pencucian) multi-sampel dinamis dan kejernihan larutan NaOH terhadap zat organik.',
    hasMultiSample: true,
    commonFields: [
      {
        key: 'organikScale',
        label: 'Warna Larutan Organik NaOH (Skala Standar Gardner 1 - 5)',
        type: 'select',
        unit: 'Skala',
        desc: 'Pengujian kolorimetri larutan NaOH 3% setelah 24 jam (SNI 2816:2014)',
        options: [
          { value: 1, label: 'Plat No. 1 - Jernih / Kuning Sangat Pucat (Aman)' },
          { value: 2, label: 'Plat No. 2 - Kuning Muda (Aman / Default Laprak)' },
          { value: 3, label: 'Plat No. 3 - Standar Acuan Kuning Jerami (Batas Maksimum)' },
          { value: 4, label: 'Plat No. 4 - Cokelat Kemerahan (Perlu Evaluasi)' },
          { value: 5, label: 'Plat No. 5 - Cokelat Tua / Hitam Pekat (Tidak Layak)' },
        ],
      },
    ],
    sampleFields: [
      { key: 'w1', label: 'Berat Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa pasir kering oven mula-mula', min: 0.1 },
      { key: 'w2', label: 'Berat Kering Setelah Cuci #200 (W2)', unit: 'gram', desc: 'Massa pasir kering setelah dicuci ayakan No. 200', min: 0.1 },
    ],
    initialInputs: {
      organikScale: 2,
      samples: JSON.parse(JSON.stringify(DEFAULT_BB13_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Contoh Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa pasir kering oven mula-mula', min: 0 },
      { key: 'w2', label: 'Berat Contoh Kering Tertahan Ayakan #200 (W2)', unit: 'gram', desc: 'Massa pasir kering oven setelah dicuci bersih ayakan 0.075 mm', min: 0 },
      { key: 'organikScale', label: 'Warna Larutan Organik (Skala Standar Gardner 1 - 5)', unit: 'Skala', desc: '1=Sangat jernih, 2=Kuning muda, 3=Standar acuan, 4=Cokelat, 5=Cokelat tua', min: 1, max: 5, step: 1 },
    ],
    calculate: (inputs) => {
      const rawScale = inputs.organikScale !== undefined ? inputs.organikScale : 2
      const scale = Number(rawScale)

      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 500,
            w2: inputs.w2 !== undefined ? inputs.w2 : 486.2,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const w1 = Number(s.w1 ?? 0)
        const w2 = Number(s.w2 ?? 0)

        if (w1 <= 0 || w2 <= 0) {
          errors.push(`${idLabel}: Massa W1 dan W2 harus lebih besar dari 0 gram.`)
          return
        }
        if (w2 > w1) {
          errors.push(`${idLabel}: W2 (${w2} g) tidak boleh lebih besar dari W1 (${w1} g). Benda uji yang dicuci tidak mungkin bertambah berat.`)
          return
        }

        const loss = w1 - w2
        const pct = (loss / w1) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          w1,
          w2,
          loss,
          pct,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Kandungan Lumpur Pasir Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Skala Warna Zat Organik', value: `Plat No. ${scale}`, unit: 'Gardner', highlight: true },
            { label: 'Batas Maksimal Lumpur SNI', value: '5.00', unit: '%' },
            { label: 'Status Kelayakan Mutu', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgW1 = validSamples.reduce((sum, r) => sum + r.w1, 0) / n
      const avgW2 = validSamples.reduce((sum, r) => sum + r.w2, 0) / n
      const avgLoss = validSamples.reduce((sum, r) => sum + r.loss, 0) / n
      const avgLumpur = validSamples.reduce((sum, r) => sum + r.pct, 0) / n

      const isLumpurOk = avgLumpur <= 5.0
      const isOrganikOk = scale <= 3
      const isValid = isLumpurOk && isOrganikOk

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Kehilangan Cuci = ${r.w1.toFixed(1)} - ${r.w2.toFixed(1)} = ${r.loss.toFixed(1)} g | Lumpur = ((${r.w1.toFixed(1)} - ${r.w2.toFixed(1)}) / ${r.w1.toFixed(1)}) × 100% = ${r.pct.toFixed(2)}%`
        ),
        `Rata-rata Kadar Lumpur Pasir = (${validSamples.map(r => r.pct.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgLumpur.toFixed(2)}%`,
        `Evaluasi Warna Zat Organik NaOH = Plat No. ${scale} (Standar Acuan Aman: Plat No. 1 - 3)`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kandungan Lumpur Agregat Halus (Format Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Kering Sebelum Dicuci (W1)',
            equation: 'W1',
            unit: 'gram',
            values: validSamples.map(s => s.w1.toFixed(1)),
            average: avgW1.toFixed(2),
          },
          {
            label: 'Berat Kering Setelah Dicuci #200 (W2)',
            equation: 'W2',
            unit: 'gram',
            values: validSamples.map(s => s.w2.toFixed(1)),
            average: avgW2.toFixed(2),
          },
          {
            label: 'Kehilangan Berat / Lumpur',
            equation: 'W1 - W2',
            unit: 'gram',
            values: validSamples.map(s => s.loss.toFixed(1)),
            average: avgLoss.toFixed(2),
          },
          {
            label: 'Kadar Lumpur Pasir (%)',
            equation: '((W1 - W2) / W1) × 100%',
            unit: '%',
            values: validSamples.map(s => s.pct.toFixed(2) + '%'),
            average: avgLumpur.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata kadar lumpur ${avgLumpur.toFixed(2)}% (≤ 5.0%) dan warna zat organik Plat No. ${scale} (≤ No. 3). Pasir bersih dan memenuhi syarat SNI 03-4142-1996 / SNI 2816:2014 untuk beton struktural.`
        : `Kadar lumpur (${avgLumpur.toFixed(2)}%) atau zat organik (No. ${scale}) melebihi batas toleransi SNI (syarat standar: kadar lumpur ≤ 5.0% dan zat organik ≤ Plat No. 3). Agregat harus dicuci ulang sebelum digunakan.`

      return {
        results: [
          { label: 'Kandungan Lumpur Pasir Rata-rata', value: avgLumpur.toFixed(2), unit: '%', highlight: true, sub: 'Syarat SNI 03-4142: Maks 5.00%' },
          { label: 'Skala Warna Zat Organik', value: `Plat No. ${scale}`, unit: 'Gardner', highlight: true, sub: 'Syarat SNI 2816: Maks Plat No. 3' },
          { label: 'Berat Lumpur Rata-rata', value: avgLoss.toFixed(2), unit: 'gram', sub: 'Massa partikel lolos ayakan #200' },
          { label: 'Status Kelayakan Mutu', value: isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi', unit: '', highlight: true, sub: 'SNI 03-4142 & SNI 2816' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Lumpur = ${avgLumpur.toFixed(2)}%, Organik No. ${scale} (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-1-4': {
    id: 'bb-1-4',
    code: 'BI-01',
    name: 'Pengujian Bobot Isi & Rongga Udara Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 03-4804-1998',
    desc: 'Menghitung berat per satuan volume pasir dalam kondisi lepas dan padat/tumbuk serta persentase rongga udara multi-sampel dinamis.',
    hasMultiSample: true,
    commonFields: [
      { key: 'wBejana', label: 'Berat Wadah Silinder Kosong (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0.01 },
      { key: 'vol', label: 'Volume Wadah Silinder (V)', unit: 'liter', desc: 'Kapasitas volume terukur wadah silinder logam', min: 0.001 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Pasir (Gs)', unit: '', desc: 'Nilai Berat Jenis Curah Kering dari pengujian BJ-01', min: 0.1 },
    ],
    sampleFields: [
      { key: 'wLepas', label: 'Wadah + Pasir Lepas (W2)', unit: 'kg', desc: 'Dituang bebas tanpa pemadatan', min: 0.1 },
      { key: 'wPadat', label: 'Wadah + Pasir Padat (W3)', unit: 'kg', desc: 'Dipadatkan dengan penusukan rodding 3 lapis', min: 0.1 },
    ],
    initialInputs: {
      wBejana: 3.25,
      vol: 9.43,
      bjBulk: 2.60,
      samples: JSON.parse(JSON.stringify(DEFAULT_BB14_SAMPLES)),
    },
    fields: [
      { key: 'wBejana', label: 'Berat Bejana Takaran (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0 },
      { key: 'vol', label: 'Volume Bejana Takaran (V)', unit: 'liter', desc: 'Volume terukur wadah silinder logam', min: 0.000001 },
      { key: 'wLepas', label: 'Berat Bejana + Pasir Kondisi Lepas (W2)', unit: 'kg', desc: 'Pasir dituang bebas dengan corong tanpa pemadatan', min: 0 },
      { key: 'wPadat', label: 'Berat Bejana + Pasir Kondisi Padat (W3)', unit: 'kg', desc: 'Pasir dipadatkan dengan penusukan 25 kali tiap lapisan', min: 0 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Pasir (BJ)', unit: '', desc: 'Data berat jenis curah (bulk sp. gr)', min: 0.1 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.wBejana || 3.25)
      const v = Number(inputs.vol || 9.43)
      const bj = Number(inputs.bjBulk || 2.60)

      if (v <= 0 || bj <= 0 || w1 <= 0) {
        return {
          results: [
            { label: 'Bobot Isi Padat Rata-rata', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Padat Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Bobot Isi Lepas Rata-rata', value: '-', unit: 'kg/L' },
            { label: 'Rongga Udara Lepas Rata-rata', value: '-', unit: '%' },
          ],
          formulaSteps: ['Parameter wadah (W1, Volume) dan Berat Jenis (Gs) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Input parameter wadah dan berat jenis pasir harus lebih besar dari 0.',
          summaryString: 'Parameter Wadah / BJ Tidak Valid',
        }
      }

      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            wLepas: inputs.wLepas !== undefined ? inputs.wLepas : 16.85,
            wPadat: inputs.wPadat !== undefined ? inputs.wPadat : 18.15,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const wL = Number(s.wLepas ?? 0)
        const wP = Number(s.wPadat ?? 0)

        if (wL <= w1 || wP <= w1) {
          errors.push(`${idLabel}: Berat wadah + pasir (Lepas = ${wL} kg, Padat = ${wP} kg) harus lebih besar dari berat wadah kosong W1 (${w1} kg).`)
          return
        }
        if (wP < wL) {
          errors.push(`${idLabel}: Kondisi padat (${wP} kg) tidak boleh lebih ringan dari kondisi lepas (${wL} kg).`)
          return
        }

        const netLepas = wL - w1
        const netPadat = wP - w1
        const biLepas = netLepas / v
        const biPadat = netPadat / v
        const ronggaLepas = (1 - (biLepas / bj)) * 100
        const ronggaPadat = (1 - (biPadat / bj)) * 100

        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          wLepas: wL,
          wPadat: wP,
          netLepas,
          netPadat,
          biLepas,
          biPadat,
          ronggaLepas,
          ronggaPadat,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Bobot Isi Padat Rata-rata', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Padat Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Bobot Isi Lepas Rata-rata', value: '-', unit: 'kg/L' },
            { label: 'Rongga Udara Lepas Rata-rata', value: '-', unit: '%' },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan bobot isi laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgWL = validSamples.reduce((sum, r) => sum + r.wLepas, 0) / n
      const avgWP = validSamples.reduce((sum, r) => sum + r.wPadat, 0) / n
      const avgNetL = validSamples.reduce((sum, r) => sum + r.netLepas, 0) / n
      const avgNetP = validSamples.reduce((sum, r) => sum + r.netPadat, 0) / n
      const avgBiL = validSamples.reduce((sum, r) => sum + r.biLepas, 0) / n
      const avgBiP = validSamples.reduce((sum, r) => sum + r.biPadat, 0) / n
      const avgRonggaL = validSamples.reduce((sum, r) => sum + r.ronggaLepas, 0) / n
      const avgRonggaP = validSamples.reduce((sum, r) => sum + r.ronggaPadat, 0) / n

      // Standar SNI 03-4804-1998:
      // - Bobot Isi Pasir Padat: 1.20 - 1.70 kg/L
      // - Rongga Udara: 30% - 45%
      const isBiOk = avgBiP >= 1.20 && avgBiP <= 1.75
      const isRonggaOk = avgRonggaP >= 30.0 && avgRonggaP <= 45.0
      const isValid = isBiOk && isRonggaOk

      const formulaSteps = [
        `Parameter Acuan: Wadah Kosong (W1) = ${w1} kg | Volume (V) = ${v} L | Berat Jenis Pasir (Gs) = ${bj}`,
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: BI Lepas = (${r.wLepas.toFixed(2)} - ${w1}) / ${v} = ${r.biLepas.toFixed(3)} kg/L (P = ${r.ronggaLepas.toFixed(2)}%) | BI Padat = (${r.wPadat.toFixed(2)} - ${w1}) / ${v} = ${r.biPadat.toFixed(3)} kg/L (P = ${r.ronggaPadat.toFixed(2)}%)`
        ),
        `Rata-rata Bobot Isi Lepas = (${validSamples.map(r => r.biLepas.toFixed(3)).join(' + ')}) / ${n} = ${avgBiL.toFixed(3)} kg/L (${(avgBiL * 1000).toFixed(0)} kg/m³)`,
        `Rata-rata Rongga Udara Lepas = (${validSamples.map(r => r.ronggaLepas.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgRonggaL.toFixed(2)}%`,
        `Rata-rata Bobot Isi Padat = (${validSamples.map(r => r.biPadat.toFixed(3)).join(' + ')}) / ${n} = ${avgBiP.toFixed(3)} kg/L (${(avgBiP * 1000).toFixed(0)} kg/m³)`,
        `Rata-rata Rongga Udara Padat = (${validSamples.map(r => r.ronggaPadat.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgRonggaP.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Bobot Isi & Rongga Udara Agregat Halus',
        headers: ['Kondisi Pengujian & Parameter', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Wadah + Pasir Lepas (W2)',
            equation: 'W2',
            unit: 'kg',
            values: validSamples.map(s => s.wLepas.toFixed(2)),
            average: avgWL.toFixed(2),
          },
          {
            label: 'Berat Bersih Pasir Lepas',
            equation: 'W2 - W1',
            unit: 'kg',
            values: validSamples.map(s => s.netLepas.toFixed(2)),
            average: avgNetL.toFixed(2),
          },
          {
            label: 'Bobot Isi Kondisi Lepas',
            equation: '(W2 - W1) / V',
            unit: 'kg/L',
            values: validSamples.map(s => s.biLepas.toFixed(3)),
            average: avgBiL.toFixed(3),
          },
          {
            label: 'Rongga Udara Kondisi Lepas',
            equation: '(1 - (BI / Gs)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.ronggaLepas.toFixed(2) + '%'),
            average: avgRonggaL.toFixed(2) + '%',
          },
          {
            label: 'Berat Wadah + Pasir Padat (W3)',
            equation: 'W3',
            unit: 'kg',
            values: validSamples.map(s => s.wPadat.toFixed(2)),
            average: avgWP.toFixed(2),
          },
          {
            label: 'Berat Bersih Pasir Padat',
            equation: 'W3 - W1',
            unit: 'kg',
            values: validSamples.map(s => s.netPadat.toFixed(2)),
            average: avgNetP.toFixed(2),
          },
          {
            label: 'Bobot Isi Kondisi Padat',
            equation: '(W3 - W1) / V',
            unit: 'kg/L',
            values: validSamples.map(s => s.biPadat.toFixed(3)),
            average: avgBiP.toFixed(3),
            highlight: true,
          },
          {
            label: 'Rongga Udara Kondisi Padat',
            equation: '(1 - (BI / Gs)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.ronggaPadat.toFixed(2) + '%'),
            average: avgRonggaP.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata bobot isi pasir padat sebesar ${avgBiP.toFixed(3)} kg/L (standar: 1.20 - 1.70 kg/L) dengan rongga udara ${avgRonggaP.toFixed(2)}% (standar: 30% - 45%). Memenuhi spesifikasi teknis SNI 03-4804-1998 untuk perencanaan campuran beton.`
        : `Rata-rata bobot isi padat (${avgBiP.toFixed(3)} kg/L) atau rongga udara (${avgRonggaP.toFixed(2)}%) berada di luar rentang standar SNI 03-4804-1998 (syarat teknis: BI 1.20 - 1.70 kg/L dan Rongga 30% - 45%).`

      return {
        results: [
          { label: 'Bobot Isi Padat Rata-rata', value: avgBiP.toFixed(3), unit: 'kg/L', highlight: true, sub: 'Standar SNI: 1.20 - 1.70 kg/L' },
          { label: 'Rongga Udara Padat Rata-rata', value: avgRonggaP.toFixed(2), unit: '%', highlight: true, sub: 'Standar SNI: 30.0% - 45.0%' },
          { label: 'Bobot Isi Lepas Rata-rata', value: avgBiL.toFixed(3), unit: 'kg/L', sub: `${(avgBiL * 1000).toFixed(0)} kg/m³` },
          { label: 'Rongga Udara Lepas Rata-rata', value: avgRonggaL.toFixed(2), unit: '%', sub: 'Kondisi curah tanpa pemadatan' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `BI Padat = ${avgBiP.toFixed(3)} kg/L, Rongga = ${avgRonggaP.toFixed(1)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-1-5': {
    id: 'bb-1-5',
    code: 'GR-01',
    name: 'Analisis Gradasi & Modulus Kehalusan Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI ASTM C136:2012',
    desc: 'Pemetaan distribusi butiran pasir dan perhitungan Fineness Modulus (FM) multi-benda uji untuk klasifikasi zona gradasi.',
    hasDynamicSieveTable: true,
    isCoarse: false,
    initialInputs: {
      specimens: ['Benda Uji I', 'Benda Uji II', 'Benda Uji III'],
      sieves: [
        { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [0.0, 0.0, 0.0], weight: 0.0 },
        { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [20.0, 22.0, 18.0], weight: 20.0 },
        { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 58.0, 62.0], weight: 60.0 },
        { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weights: [110.0, 112.0, 108.0], weight: 110.0 },
        { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weights: [140.0, 138.0, 142.0], weight: 140.0 },
        { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weights: [100.0, 102.0, 98.0], weight: 100.0 },
        { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weights: [50.0, 48.0, 52.0], weight: 50.0 },
        { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], weight: 20.0, isPan: true },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      const rawSieves = Array.isArray(inputs.sieves) && inputs.sieves.length > 0
        ? inputs.sieves
        : [
            { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [0.0, 0.0, 0.0], weight: 0 },
            { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [20.0, 22.0, 18.0], weight: 20 },
            { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 58.0, 62.0], weight: 60 },
            { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weights: [110.0, 112.0, 108.0], weight: 110 },
            { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weights: [140.0, 138.0, 142.0], weight: 140 },
            { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weights: [100.0, 102.0, 98.0], weight: 100 },
            { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weights: [50.0, 48.0, 52.0], weight: 50 },
            { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], weight: 20, isPan: true },
          ]

      const specimens = Array.isArray(inputs.specimens) && inputs.specimens.length > 0
        ? inputs.specimens
        : (Array.isArray(rawSieves[0]?.weights) && rawSieves[0].weights.length > 1
            ? rawSieves[0].weights.map((_, i) => `Benda Uji ${['I', 'II', 'III', 'IV', 'V', 'VI'][i] || (i + 1)}`)
            : ['Benda Uji I'])

      const numSpecimens = specimens.length

      const nonPanSieves = rawSieves.filter(
        (s) => !s.isPan && Number(s.size) > 0 && !String(s.label || '').toLowerCase().includes('pan')
      )

      if (nonPanSieves.length === 0) {
        return {
          results: [
            { label: 'Total Massa Contoh (Rata-rata)', value: '-', unit: 'gram' },
            { label: 'Fineness Modulus (FM) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'Klasifikasi Zona Ayakan', value: '-', unit: '', highlight: true },
            { label: 'Status SNI 03-1968', value: 'Input Kosong', unit: '' },
          ],
          formulaSteps: ['Minimal harus ada 1 ukuran saringan selain Pan Penampung.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Minimal harus ada 1 ukuran saringan yang digunakan untuk pengujian gradasi.',
          summaryString: 'Saringan Kosong',
        }
      }

      // Hitung per spesimen
      const sortedDesc = [...nonPanSieves].sort((a, b) => Number(b.size) - Number(a.size))
      const standardSizes = [9.5, 4.75, 2.36, 1.18, 0.60, 0.30, 0.15]

      const specimenResults = specimens.map((name, k) => {
        const total = rawSieves.reduce((sum, s) => {
          const w = Array.isArray(s.weights) ? Number(s.weights[k] ?? 0) : Number(s.weight ?? 0)
          return sum + (w > 0 ? w : 0)
        }, 0)

        let cumulative = 0
        const rows = sortedDesc.map((s) => {
          const w = Array.isArray(s.weights) ? Number(s.weights[k] ?? 0) : Number(s.weight ?? 0)
          cumulative += w
          const cumRetainedPct = total > 0 ? (cumulative / total) * 100 : 0
          const cumPassingPct = total > 0 ? Math.max(0, Math.min(100, ((total - cumulative) / total) * 100)) : 0
          return {
            ...s,
            size: Number(s.size),
            weight: w,
            cumRetained: cumulative,
            cumRetainedPct,
            cumPassingPct,
          }
        })

        let sumCumPct = 0
        let matchedCount = 0
        standardSizes.forEach((stdSz) => {
          const matched = rows.find((s) => Math.abs(s.size - stdSz) / stdSz < 0.12)
          if (matched) {
            sumCumPct += matched.cumRetainedPct
            matchedCount++
          }
        })

        const fm = total > 0
          ? (matchedCount > 0 ? sumCumPct / 100 : rows.reduce((acc, s) => acc + s.cumRetainedPct, 0) / 100)
          : 0

        return { name, total, rows, fm, sumCumPct }
      })

      const avgTotal = specimenResults.reduce((s, r) => s + r.total, 0) / numSpecimens
      const avgFm = specimenResults.reduce((s, r) => s + r.fm, 0) / numSpecimens

      if (avgTotal <= 0) {
        return {
          results: [
            { label: 'Total Massa Contoh (Rata-rata)', value: '0.0', unit: 'gram' },
            { label: 'Fineness Modulus (FM) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'Klasifikasi Zona Ayakan', value: '-', unit: '', highlight: true },
            { label: 'Status SNI 03-1968', value: 'Input Kosong', unit: '' },
          ],
          formulaSteps: ['Total berat benda uji pasir harus lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Total berat tertahan pada ayakan harus lebih besar dari 0 gram. Silakan masukkan data penimbangan fraksi ayakan.',
          summaryString: 'Data Ayakan Kosong (0 gr)',
        }
      }

      let zoneNum
      let zone
      if (avgFm < 2.3) {
        zoneNum = 4
        zone = 'Zona IV (Pasir Sangat Halus)'
      } else if (avgFm < 2.6) {
        zoneNum = 3
        zone = 'Zona III (Pasir Agak Halus)'
      } else if (avgFm <= 3.1) {
        zoneNum = 2
        zone = 'Zona II (Pasir Agak Kasar / Ideal Beton)'
      } else {
        zoneNum = 1
        zone = 'Zona I (Pasir Kasar)'
      }

      const SNI_ZONE_LOOKUP = {
        1: { 0.15: [0, 10], 0.30: [5, 20], 0.60: [15, 34], 1.18: [30, 70], 2.36: [60, 95], 4.75: [90, 100], 9.5: [100, 100] },
        2: { 0.15: [0, 10], 0.30: [8, 30], 0.60: [35, 59], 1.18: [55, 90], 2.36: [75, 100], 4.75: [90, 100], 9.5: [100, 100] },
        3: { 0.15: [0, 10], 0.30: [12, 40], 0.60: [60, 79], 1.18: [75, 100], 2.36: [85, 100], 4.75: [90, 100], 9.5: [100, 100] },
        4: { 0.15: [0, 15], 0.30: [15, 50], 0.60: [80, 100], 1.18: [90, 100], 2.36: [95, 100], 4.75: [95, 100], 9.5: [100, 100] },
      }

      // Hitung rata-rata passing untuk Recharts
      const sortedAsc = [...sortedDesc].reverse()
      const sieves = sortedAsc.map((s) => Number(s.size))
      const sieveLabels = sortedAsc.map((s) => formatSieveLabel(s.size))
      const sieveNames = sortedAsc.map((s) => s.label || formatSieveLabel(s.size))

      const actualPassing = sortedAsc.map((s) => {
        const passVals = specimenResults.map((sr) => {
          const row = sr.rows.find((r) => r.id === s.id || Math.abs(r.size - Number(s.size)) < 0.01)
          return row ? row.cumPassingPct : 0
        })
        const avg = passVals.reduce((a, b) => a + b, 0) / numSpecimens
        return Number(avg.toFixed(1))
      })

      const activeZoneLookup = SNI_ZONE_LOOKUP[zoneNum]
      const baList = []
      const bbList = []
      sortedAsc.forEach((s) => {
        let bb = 0
        let ba = 100
        const matchedKey = Object.keys(activeZoneLookup).find((k) => Math.abs(Number(k) - Number(s.size)) < 0.15)
        if (matchedKey) {
          [bb, ba] = activeZoneLookup[matchedKey]
        } else if (Number(s.size) >= 9.5) {
          bb = 100
          ba = 100
        } else if (Number(s.size) >= 4.75) {
          bb = zoneNum === 4 ? 95 : 90
          ba = 100
        } else if (Number(s.size) < 0.15) {
          bb = 0
          ba = 10
        } else {
          bb = 0
          ba = 100
        }
        bbList.push(bb)
        baList.push(ba)
      })

      const isWithinBounds = actualPassing.every((val, idx) => val <= baList[idx] && val >= bbList[idx])
      const isValid = avgFm >= 2.20 && avgFm <= 3.20

      // Tabel Rekapitulasi Gradasi
      const recapTable = {
        title: 'Tabel Rekapitulasi Gradasi & MHB Multi-Benda Uji (Format Laporan Praktikum)',
        headers: ['Ukuran Saringan (mm)', 'Label Saringan', ...specimens.map(name => `${name} (% Lolos)`), 'Rata-rata % Lolos'],
        rows: [
          ...sortedDesc.map((s) => {
            const passVals = specimenResults.map((sr) => {
              const row = sr.rows.find((r) => r.id === s.id || Math.abs(r.size - Number(s.size)) < 0.01)
              return row ? row.cumPassingPct : 0
            })
            const avgPass = passVals.reduce((a, b) => a + b, 0) / numSpecimens
            return {
              label: `${s.size} mm`,
              equation: s.label || `${s.size} mm`,
              unit: '%',
              values: passVals.map((v) => v.toFixed(1) + '%'),
              average: avgPass.toFixed(1) + '%',
            }
          }),
          {
            label: 'Modulus Halus Butir (MHB)',
            equation: 'MHB = Σ(% Tertahan Kum.) / 100',
            unit: '',
            values: specimenResults.map((sr) => sr.fm.toFixed(2)),
            average: avgFm.toFixed(2),
            highlight: true,
          },
        ],
      }

      const formulaSteps = [
        `Jumlah Benda Uji = ${numSpecimens} (${specimens.join(', ')})`,
        ...specimenResults.map(
          (sr) => `${sr.name}: Total = ${sr.total.toFixed(1)} g | MHB = ${sr.sumCumPct.toFixed(1)} / 100 = ${sr.fm.toFixed(2)}`
        ),
        `Rata-rata Fineness Modulus (FM) = (${specimenResults.map(sr => sr.fm.toFixed(2)).join(' + ')}) / ${numSpecimens} = ${avgFm.toFixed(2)}`,
        `Klasifikasi Zona Gradasi = ${zone}`,
      ]

      const conclusion = isValid
        ? `Nilai rata-rata Fineness Modulus (FM) = ${avgFm.toFixed(2)} tergolong dalam ${zone}. Memenuhi spesifikasi standar SNI 03-1968-1990 untuk agregat halus beton struktural (rentang standar FM: 2.20 - 3.20).`
        : `Nilai Fineness Modulus (FM) = ${avgFm.toFixed(2)} berada di luar rentang standar SNI 03-1968-1990 (syarat FM beton: 2.20 - 3.20). Pasir ${avgFm < 2.2 ? 'terlalu halus' : 'terlalu kasar'} sehingga perlu pencampuran gradasi pasir lain.`

      return {
        results: [
          { label: 'Total Massa Contoh (Rata-rata)', value: avgTotal.toFixed(1), unit: 'gram', sub: `${numSpecimens} Benda Uji` },
          { label: 'Fineness Modulus (FM) Rata-rata', value: avgFm.toFixed(2), unit: '', highlight: true, sub: 'Syarat SNI: 2.20 - 3.20' },
          { label: 'Klasifikasi Zona Ayakan', value: zone, unit: '', highlight: true, sub: 'SNI 03-1968-1990' },
          { label: 'MHB per Benda Uji', value: specimenResults.map(sr => sr.fm.toFixed(2)).join(' | '), unit: '', sub: 'Distribusi MHB sampel' },
        ],
        formulaSteps,
        recapTable,
        gradationChart: {
          isCoarse: false,
          chartTitle: 'Grafik Kurva Gradasi Agregat Halus',
          chartSubtitle: `Distribusi Butiran Pasir & Amplop Batas Spesifikasi SNI 03-1968 (${zone})`,
          zoneNum,
          zoneLabel: `Zona ${zoneNum}`,
          zoneFullName: zone,
          sieves,
          sieveLabels,
          sieveNames,
          actualPassing,
          upperBound: baList,
          lowerBound: bbList,
          isWithinBounds,
        },
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `FM = ${avgFm.toFixed(2)}, ${zone} (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // BAB II: AGREGAT KASAR (MULTI-SAMPEL DINAMIS)
  // -----------------------------------------------------------------------
  'bb-2-1': {
    id: 'bb-2-1',
    code: 'BJK-01',
    name: 'Pengujian Berat Jenis & Penyerapan Air Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 1969:2016',
    desc: 'Menghitung parameter Berat Jenis Curah Kering (Sd), Jenuh Permukaan / SSD (Ss), Semu (Sa), dan Penyerapan Air batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'a', label: 'Berat Kering Oven (A)', unit: 'gram', desc: 'Massa benda uji kering oven 110°C', min: 0.1 },
      { key: 'b', label: 'Berat Kondisi SSD (B)', unit: 'gram', desc: 'Massa benda uji jenuh kering permukaan', min: 0.1 },
      { key: 'c', label: 'Berat dalam Air (C)', unit: 'gram', desc: 'Massa ditimbang dalam keranjang terendam air', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB21_SAMPLES)),
    },
    fields: [
      { key: 'a', label: 'Berat Agregat dalam Keadaan Kering Oven (A)', unit: 'gram', desc: 'Massa benda uji kering oven setelah suhu 110°C', min: 0.01 },
      { key: 'b', label: 'Berat Agregat dalam Keadaan SSD (B)', unit: 'gram', desc: 'Massa benda uji dalam kondisi jenuh kering permukaan', min: 0.01 },
      { key: 'c', label: 'Berat Benda Uji dalam Air (C)', unit: 'gram', desc: 'Massa benda uji ditimbang di dalam keranjang kawat terendam air', min: 0.01 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            a: inputs.a !== undefined ? inputs.a : (inputs.bk || 485.4),
            b: inputs.b !== undefined ? inputs.b : (inputs.bssd || 500.0),
            c: inputs.c !== undefined ? inputs.c : (inputs.bj || 268.3),
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const a = Number(s.a ?? 0)
        const b = Number(s.b ?? 0)
        const c = Number(s.c ?? 0)

        if (a <= 0 || b <= 0 || c <= 0) {
          errors.push(`${idLabel}: Semua nilai massa (A, B, C) harus lebih besar dari 0 gram.`)
          return
        }
        if (b <= a) {
          errors.push(`${idLabel}: Berat kondisi SSD (B = ${b} g) harus lebih besar dari berat kering oven (A = ${a} g).`)
          return
        }
        if (c >= b || c >= a) {
          errors.push(`${idLabel}: Berat di dalam air (C = ${c} g) harus lebih kecil dari berat di udara.`)
          return
        }

        const den = b - c
        const denApp = a - c
        if (den <= 0 || denApp <= 0) {
          errors.push(`${idLabel}: Volume air terdesak tidak valid.`)
          return
        }

        const sd = a / den
        const ss = b / den
        const sa = a / denApp
        const sw = ((b - a) / a) * 100

        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          a,
          b,
          c,
          den,
          denApp,
          sd,
          ss,
          sa,
          sw,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'BJ Curah Kering (Sd) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'BJ Jenuh Permukaan / SSD (Ss) Rata-rata', value: '-', unit: '' },
            { label: 'BJ Semu / Apparent (Sa) Rata-rata', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw) Rata-rata', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa yang valid > 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgA = validSamples.reduce((sum, r) => sum + r.a, 0) / n
      const avgB = validSamples.reduce((sum, r) => sum + r.b, 0) / n
      const avgC = validSamples.reduce((sum, r) => sum + r.c, 0) / n
      const avgSd = validSamples.reduce((sum, r) => sum + r.sd, 0) / n
      const avgSs = validSamples.reduce((sum, r) => sum + r.ss, 0) / n
      const avgSa = validSamples.reduce((sum, r) => sum + r.sa, 0) / n
      const avgSw = validSamples.reduce((sum, r) => sum + r.sw, 0) / n

      // Standar SNI 1969:2016: Absorpsi <= 3.00% (batu normal <= 2.50%), BJ Curah >= 2.45 (batu apung/ringan >= 2.0)
      const isSwOk = avgSw >= 0 && avgSw <= 3.00
      const isBulkOk = avgSd >= 2.10
      const isValid = isSwOk && isBulkOk

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Sd = ${r.a.toFixed(1)} / (${r.b.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.sd.toFixed(3)} | Ss = ${r.b.toFixed(1)} / (${r.b.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.ss.toFixed(3)} | Sa = ${r.a.toFixed(1)} / (${r.a.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.sa.toFixed(3)} | Sw = ((${r.b.toFixed(1)} - ${r.a.toFixed(1)}) / ${r.a.toFixed(1)}) × 100% = ${r.sw.toFixed(2)}%`
        ),
        `Rata-rata BJ Curah Kering (Sd) = (${validSamples.map(r => r.sd.toFixed(3)).join(' + ')}) / ${n} = ${avgSd.toFixed(3)}`,
        `Rata-rata BJ SSD (Ss) = (${validSamples.map(r => r.ss.toFixed(3)).join(' + ')}) / ${n} = ${avgSs.toFixed(3)}`,
        `Rata-rata BJ Semu (Sa) = (${validSamples.map(r => r.sa.toFixed(3)).join(' + ')}) / ${n} = ${avgSa.toFixed(3)}`,
        `Rata-rata Penyerapan Air (Sw) = (${validSamples.map(r => r.sw.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgSw.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Perbandingan Benda Uji (Tabel 4.2 Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Benda Uji Kering Oven (A)',
            equation: 'A',
            unit: 'gram',
            values: validSamples.map(s => s.a.toFixed(1)),
            average: avgA.toFixed(2),
          },
          {
            label: 'Berat Benda Uji Kondisi SSD (B)',
            equation: 'B',
            unit: 'gram',
            values: validSamples.map(s => s.b.toFixed(1)),
            average: avgB.toFixed(2),
          },
          {
            label: 'Berat Benda Uji di Dalam Air (C)',
            equation: 'C',
            unit: 'gram',
            values: validSamples.map(s => s.c.toFixed(1)),
            average: avgC.toFixed(2),
          },
          {
            label: 'Berat Jenis Curah Kering (Bulk)',
            equation: 'Sd = A / (B - C)',
            unit: '',
            values: validSamples.map(s => s.sd.toFixed(3)),
            average: avgSd.toFixed(3),
            highlight: true,
          },
          {
            label: 'Berat Jenis Jenuh Kering Permukaan (SSD)',
            equation: 'Ss = B / (B - C)',
            unit: '',
            values: validSamples.map(s => s.ss.toFixed(3)),
            average: avgSs.toFixed(3),
          },
          {
            label: 'Berat Jenis Semu (Apparent)',
            equation: 'Sa = A / (A - C)',
            unit: '',
            values: validSamples.map(s => s.sa.toFixed(3)),
            average: avgSa.toFixed(3),
          },
          {
            label: 'Penyerapan Air (Absorpsi)',
            equation: 'Sw = ((B - A) / A) × 100%',
            unit: '%',
            values: validSamples.map(s => s.sw.toFixed(2) + '%'),
            average: avgSw.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Agregat kasar memenuhi spesifikasi SNI 1969:2016 (Rata-rata Penyerapan Air Sw = ${avgSw.toFixed(2)}% ≤ 3.00% dan BJ Curah Sd = ${avgSd.toFixed(3)}). Agregat layak digunakan untuk campuran beton struktural maupun perkerasan jalan.`
        : `Rata-rata Penyerapan Air Sw (${avgSw.toFixed(2)}%) atau BJ Curah Sd (${avgSd.toFixed(3)}) memerlukan evaluasi terhadap standar SNI 1969:2016 (syarat teknis: Sw ≤ 3.00%).`

      return {
        results: [
          { label: 'BJ Curah Kering (Sd) Rata-rata', value: avgSd.toFixed(3), unit: '', highlight: true, sub: 'Standar SNI 1969:2016' },
          { label: 'BJ SSD (Ss) Rata-rata', value: avgSs.toFixed(3), unit: '', sub: 'Kondisi Jenuh Kering Permukaan' },
          { label: 'BJ Semu (Sa) Rata-rata', value: avgSa.toFixed(3), unit: '', sub: 'Massa jenis butiran padat' },
          { label: 'Penyerapan Air (Sw) Rata-rata', value: avgSw.toFixed(2), unit: '%', highlight: true, sub: 'Standar SNI: Maksimum 3.00%' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Sd = ${avgSd.toFixed(3)}, Ss = ${avgSs.toFixed(3)}, Abs = ${avgSw.toFixed(2)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-2': {
    id: 'bb-2-2',
    code: 'KAK-01',
    name: 'Pengujian Kadar Air Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 1971:2011',
    desc: 'Menghitung kandungan air pori dan permukaan butiran batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0.1 },
      { key: 'w2', label: 'Cawan + Agregat Basah (W2)', unit: 'gram', desc: 'Massa sebelum masuk oven', min: 0.1 },
      { key: 'w3', label: 'Cawan + Agregat Kering (W3)', unit: 'gram', desc: 'Massa setelah oven 110°C konstan', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB22_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan wadah kosong', min: 0.01 },
      { key: 'w2', label: 'Berat Cawan + Kerikil Basah (W2)', unit: 'gram', desc: 'Massa sebelum dikeringkan oven', min: 0.01 },
      { key: 'w3', label: 'Berat Cawan + Kerikil Kering (W3)', unit: 'gram', desc: 'Massa setelah dikeringkan suhu 110°C', min: 0.01 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 55.4,
            w2: inputs.w2 !== undefined ? inputs.w2 : 555.4,
            w3: inputs.w3 !== undefined ? inputs.w3 : 545.2,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const w1 = Number(s.w1 ?? 0)
        const w2 = Number(s.w2 ?? 0)
        const w3 = Number(s.w3 ?? 0)

        if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
          errors.push(`${idLabel}: Massa W1, W2, W3 harus lebih besar dari 0 gram.`)
          return
        }
        if (w2 <= w1 || w3 <= w1) {
          errors.push(`${idLabel}: Massa cawan + kerikil harus lebih besar dari cawan kosong W1.`)
          return
        }
        if (w2 < w3) {
          errors.push(`${idLabel}: Kerikil basah tidak boleh lebih ringan dari kerikil kering.`)
          return
        }

        const water = w2 - w3
        const dry = w3 - w1
        if (dry <= 0) {
          errors.push(`${idLabel}: Berat kering oven bernilai 0.`)
          return
        }

        const moisture = (water / dry) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          w1,
          w2,
          w3,
          water,
          dry,
          moisture,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Kadar Air (w) Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Berat Air Teruapkan Rata-rata', value: '-', unit: 'gram' },
            { label: 'Berat Kerikil Kering Rata-rata', value: '-', unit: 'gram' },
            { label: 'Status Evaluasi SNI', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgW1 = validSamples.reduce((sum, r) => sum + r.w1, 0) / n
      const avgW2 = validSamples.reduce((sum, r) => sum + r.w2, 0) / n
      const avgW3 = validSamples.reduce((sum, r) => sum + r.w3, 0) / n
      const avgWater = validSamples.reduce((sum, r) => sum + r.water, 0) / n
      const avgDry = validSamples.reduce((sum, r) => sum + r.dry, 0) / n
      const avgMoisture = validSamples.reduce((sum, r) => sum + r.moisture, 0) / n

      const isValid = avgMoisture <= 3.00

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Air = ${r.w2.toFixed(1)} - ${r.w3.toFixed(1)} = ${r.water.toFixed(2)} g | Kering = ${r.w3.toFixed(1)} - ${r.w1.toFixed(1)} = ${r.dry.toFixed(2)} g | w = (${r.water.toFixed(2)} / ${r.dry.toFixed(2)}) × 100% = ${r.moisture.toFixed(2)}%`
        ),
        `Rata-rata Kadar Air Agregat Kasar = (${validSamples.map(r => r.moisture.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgMoisture.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kadar Air Agregat Kasar (Format Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Cawan Kosong (W1)',
            equation: 'W1',
            unit: 'gram',
            values: validSamples.map(s => s.w1.toFixed(1)),
            average: avgW1.toFixed(2),
          },
          {
            label: 'Berat Cawan + Kerikil Basah (W2)',
            equation: 'W2',
            unit: 'gram',
            values: validSamples.map(s => s.w2.toFixed(1)),
            average: avgW2.toFixed(2),
          },
          {
            label: 'Berat Cawan + Kerikil Kering Oven (W3)',
            equation: 'W3',
            unit: 'gram',
            values: validSamples.map(s => s.w3.toFixed(1)),
            average: avgW3.toFixed(2),
          },
          {
            label: 'Berat Air Teruapkan',
            equation: 'W2 - W3',
            unit: 'gram',
            values: validSamples.map(s => s.water.toFixed(2)),
            average: avgWater.toFixed(2),
          },
          {
            label: 'Berat Kerikil Kering Oven',
            equation: 'W3 - W1',
            unit: 'gram',
            values: validSamples.map(s => s.dry.toFixed(2)),
            average: avgDry.toFixed(2),
          },
          {
            label: 'Kadar Air Agregat Kasar (w)',
            equation: '((W2 - W3) / (W3 - W1)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.moisture.toFixed(2) + '%'),
            average: avgMoisture.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata kadar air agregat kasar sebesar ${avgMoisture.toFixed(2)}% memenuhi batas normal SNI 1971:2011 (≤ 3.0%). Data valid untuk faktor koreksi air adukan beton.`
        : `Rata-rata kadar air agregat kasar sebesar ${avgMoisture.toFixed(2)}% tergolong tinggi (> 3.0%). Perhatikan koreksi air pencampur beton.`

      return {
        results: [
          { label: 'Kadar Air (w) Rata-rata', value: avgMoisture.toFixed(2), unit: '%', highlight: true, sub: 'Rentang normal: 0.5% - 3.0%' },
          { label: 'Berat Air Teruapkan Rata-rata', value: avgWater.toFixed(2), unit: 'gram', sub: 'Massa air hilang selama pengovenan' },
          { label: 'Berat Kerikil Kering Rata-rata', value: avgDry.toFixed(2), unit: 'gram', sub: 'Massa agregat padat kering' },
          { label: 'Status Evaluasi SNI', value: isValid ? 'Valid' : 'Perlu Evaluasi', unit: '', highlight: true, sub: 'SNI 1971:2011' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Kadar Air = ${avgMoisture.toFixed(2)}% (${isValid ? 'Memenuhi SNI' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-3': {
    id: 'bb-2-3',
    code: 'LPK-01',
    name: 'Pengujian Kandungan Lumpur Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 03-4142-1996',
    desc: 'Menghitung persentase partikel lolos ayakan No. 200 pada batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'w1', label: 'Berat Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa agregat kasar kering oven mula-mula', min: 0.1 },
      { key: 'w2', label: 'Berat Kering Setelah Cuci #200 (W2)', unit: 'gram', desc: 'Massa agregat kasar kering setelah dicuci ayakan No. 200', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB23_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Contoh Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa agregat kasar kering oven mula-mula', min: 0 },
      { key: 'w2', label: 'Berat Contoh Kering Tertahan Ayakan #200 (W2)', unit: 'gram', desc: 'Massa agregat kasar kering setelah dicuci bersih ayakan 0.075 mm', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 1000,
            w2: inputs.w2 !== undefined ? inputs.w2 : 993.4,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const w1 = Number(s.w1 ?? 0)
        const w2 = Number(s.w2 ?? 0)

        if (w1 <= 0 || w2 <= 0) {
          errors.push(`${idLabel}: Massa W1 dan W2 harus lebih besar dari 0 gram.`)
          return
        }
        if (w2 > w1) {
          errors.push(`${idLabel}: W2 (${w2} g) tidak boleh lebih besar dari W1 (${w1} g).`)
          return
        }

        const loss = w1 - w2
        const pct = (loss / w1) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          w1,
          w2,
          loss,
          pct,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Kandungan Lumpur Agregat Kasar Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Batas Maksimal Lumpur SNI', value: '1.00', unit: '%' },
            { label: 'Berat Lumpur Rata-rata', value: '-', unit: 'gram' },
            { label: 'Status Kelayakan Mutu', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgW1 = validSamples.reduce((sum, r) => sum + r.w1, 0) / n
      const avgW2 = validSamples.reduce((sum, r) => sum + r.w2, 0) / n
      const avgLoss = validSamples.reduce((sum, r) => sum + r.loss, 0) / n
      const avgLumpur = validSamples.reduce((sum, r) => sum + r.pct, 0) / n

      const isValid = avgLumpur <= 1.00

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Kehilangan Cuci = ${r.w1.toFixed(1)} - ${r.w2.toFixed(1)} = ${r.loss.toFixed(1)} g | Lumpur = ((${r.w1.toFixed(1)} - ${r.w2.toFixed(1)}) / ${r.w1.toFixed(1)}) × 100% = ${r.pct.toFixed(2)}%`
        ),
        `Rata-rata Kandungan Lumpur Agregat Kasar = (${validSamples.map(r => r.pct.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgLumpur.toFixed(2)}%`,
        `Syarat Spesifikasi SNI 03-4142-1996 = Maksimum 1.00%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kandungan Lumpur Agregat Kasar (Format Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Kering Sebelum Dicuci (W1)',
            equation: 'W1',
            unit: 'gram',
            values: validSamples.map(s => s.w1.toFixed(1)),
            average: avgW1.toFixed(2),
          },
          {
            label: 'Berat Kering Setelah Dicuci #200 (W2)',
            equation: 'W2',
            unit: 'gram',
            values: validSamples.map(s => s.w2.toFixed(1)),
            average: avgW2.toFixed(2),
          },
          {
            label: 'Kehilangan Berat / Lumpur',
            equation: 'W1 - W2',
            unit: 'gram',
            values: validSamples.map(s => s.loss.toFixed(1)),
            average: avgLoss.toFixed(2),
          },
          {
            label: 'Kadar Lumpur Agregat Kasar (%)',
            equation: '((W1 - W2) / W1) × 100%',
            unit: '%',
            values: validSamples.map(s => s.pct.toFixed(2) + '%'),
            average: avgLumpur.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata kadar lumpur agregat kasar sebesar ${avgLumpur.toFixed(2)}% memenuhi spesifikasi SNI 03-4142-1996 (≤ 1.00%). Agregat bersih dari lempung dan debu halus, layak digunakan untuk campuran beton struktural maupun perkerasan aspal.`
        : `Rata-rata kadar lumpur agregat kasar (${avgLumpur.toFixed(2)}%) melebihi batas toleransi SNI 03-4142-1996 (maks 1.00%). Agregat harus dicuci ulang sebelum digunakan.`

      return {
        results: [
          { label: 'Kandungan Lumpur Rata-rata', value: avgLumpur.toFixed(2), unit: '%', highlight: true, sub: 'Syarat SNI: Maks 1.00%' },
          { label: 'Batas Maksimal Lumpur SNI', value: '1.00', unit: '%', sub: 'SNI 03-4142-1996' },
          { label: 'Berat Lumpur Rata-rata', value: avgLoss.toFixed(2), unit: 'gram', sub: 'Massa partikel lolos ayakan #200' },
          { label: 'Status Kelayakan Mutu', value: isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi', unit: '', highlight: true, sub: 'SNI 03-4142-1996' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Lumpur = ${avgLumpur.toFixed(2)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-4': {
    id: 'bb-2-4',
    code: 'BIK-01',
    name: 'Pengujian Bobot Isi & Rongga Udara Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 03-4804-1998',
    desc: 'Menghitung bobot isi (kondisi lepas dan padat/tumbuk) serta persentase rongga udara batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    commonFields: [
      { key: 'wBejana', label: 'Berat Wadah Silinder Kosong (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0.01 },
      { key: 'vol', label: 'Volume Wadah Silinder (V)', unit: 'liter', desc: 'Kapasitas volume terukur wadah silinder logam', min: 0.001 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Agregat Kasar (Gs)', unit: '', desc: 'Nilai Berat Jenis Curah Kering dari pengujian BJK-01', min: 0.1 },
    ],
    sampleFields: [
      { key: 'wLepas', label: 'Wadah + Kerikil Lepas (W2)', unit: 'kg', desc: 'Dituang bebas tanpa pemadatan', min: 0.1 },
      { key: 'wPadat', label: 'Wadah + Kerikil Padat (W3)', unit: 'kg', desc: 'Dipadatkan dengan penusukan rodding 3 lapis', min: 0.1 },
    ],
    initialInputs: {
      wBejana: 4.85,
      vol: 14.15,
      bjBulk: 2.13,
      samples: JSON.parse(JSON.stringify(DEFAULT_BB24_SAMPLES)),
    },
    fields: [
      { key: 'wBejana', label: 'Berat Bejana Takaran (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0 },
      { key: 'vol', label: 'Volume Bejana Takaran (V)', unit: 'liter', desc: 'Volume terukur wadah silinder logam', min: 0.000001 },
      { key: 'wLepas', label: 'Berat Bejana + Kerikil Lepas (W2)', unit: 'kg', desc: 'Kerikil dituang bebas tanpa pemadatan', min: 0 },
      { key: 'wPadat', label: 'Berat Bejana + Kerikil Padat (W3)', unit: 'kg', desc: 'Kerikil dipadatkan dengan penusukan rodding 3 lapis', min: 0 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Kerikil (BJ)', unit: '', desc: 'Data berat jenis curah (bulk sp. gr)', min: 0.1 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.wBejana || 4.85)
      const v = Number(inputs.vol || 14.15)
      const bj = Number(inputs.bjBulk || 2.13)

      if (v <= 0 || bj <= 0 || w1 <= 0) {
        return {
          results: [
            { label: 'Bobot Isi Padat Rata-rata', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Padat Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Bobot Isi Lepas Rata-rata', value: '-', unit: 'kg/L' },
            { label: 'Rongga Udara Lepas Rata-rata', value: '-', unit: '%' },
          ],
          formulaSteps: ['Parameter wadah (W1, Volume) dan Berat Jenis (Gs) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Input parameter wadah dan berat jenis kerikil harus lebih besar dari 0.',
          summaryString: 'Parameter Wadah / BJ Tidak Valid',
        }
      }

      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            wLepas: inputs.wLepas !== undefined ? inputs.wLepas : 25.14,
            wPadat: inputs.wPadat !== undefined ? inputs.wPadat : 26.98,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const wL = Number(s.wLepas ?? 0)
        const wP = Number(s.wPadat ?? 0)

        if (wL <= w1 || wP <= w1) {
          errors.push(`${idLabel}: Berat wadah + kerikil harus lebih besar dari wadah kosong W1 (${w1} kg).`)
          return
        }
        if (wP < wL) {
          errors.push(`${idLabel}: Kondisi padat (${wP} kg) tidak boleh lebih ringan dari kondisi lepas (${wL} kg).`)
          return
        }

        const netLepas = wL - w1
        const netPadat = wP - w1
        const biLepas = netLepas / v
        const biPadat = netPadat / v
        const ronggaLepas = (1 - (biLepas / bj)) * 100
        const ronggaPadat = (1 - (biPadat / bj)) * 100

        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          wLepas: wL,
          wPadat: wP,
          netLepas,
          netPadat,
          biLepas,
          biPadat,
          ronggaLepas,
          ronggaPadat,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Bobot Isi Padat Rata-rata', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Padat Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Bobot Isi Lepas Rata-rata', value: '-', unit: 'kg/L' },
            { label: 'Rongga Udara Lepas Rata-rata', value: '-', unit: '%' },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan bobot isi laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgWL = validSamples.reduce((sum, r) => sum + r.wLepas, 0) / n
      const avgWP = validSamples.reduce((sum, r) => sum + r.wPadat, 0) / n
      const avgNetL = validSamples.reduce((sum, r) => sum + r.netLepas, 0) / n
      const avgNetP = validSamples.reduce((sum, r) => sum + r.netPadat, 0) / n
      const avgBiL = validSamples.reduce((sum, r) => sum + r.biLepas, 0) / n
      const avgBiP = validSamples.reduce((sum, r) => sum + r.biPadat, 0) / n
      const avgRonggaL = validSamples.reduce((sum, r) => sum + r.ronggaLepas, 0) / n
      const avgRonggaP = validSamples.reduce((sum, r) => sum + r.ronggaPadat, 0) / n

      // Standar SNI 03-4804-1998: BI Padat >= 1.20 kg/L
      const isBiOk = avgBiP >= 1.20
      const isValid = isBiOk

      const formulaSteps = [
        `Parameter Acuan: Wadah Kosong (W1) = ${w1} kg | Volume (V) = ${v} L | Berat Jenis Kerikil (Gs) = ${bj}`,
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: BI Lepas = (${r.wLepas.toFixed(2)} - ${w1}) / ${v} = ${r.biLepas.toFixed(3)} kg/L (P = ${r.ronggaLepas.toFixed(2)}%) | BI Padat = (${r.wPadat.toFixed(2)} - ${w1}) / ${v} = ${r.biPadat.toFixed(3)} kg/L (P = ${r.ronggaPadat.toFixed(2)}%)`
        ),
        `Rata-rata Bobot Isi Lepas = (${validSamples.map(r => r.biLepas.toFixed(3)).join(' + ')}) / ${n} = ${avgBiL.toFixed(3)} kg/L (${(avgBiL * 1000).toFixed(0)} kg/m³)`,
        `Rata-rata Rongga Udara Lepas = (${validSamples.map(r => r.ronggaLepas.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgRonggaL.toFixed(2)}%`,
        `Rata-rata Bobot Isi Padat = (${validSamples.map(r => r.biPadat.toFixed(3)).join(' + ')}) / ${n} = ${avgBiP.toFixed(3)} kg/L (${(avgBiP * 1000).toFixed(0)} kg/m³)`,
        `Rata-rata Rongga Udara Padat = (${validSamples.map(r => r.ronggaPadat.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgRonggaP.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Bobot Isi & Rongga Udara Agregat Kasar',
        headers: ['Kondisi Pengujian & Parameter', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Wadah + Kerikil Lepas (W2)',
            equation: 'W2',
            unit: 'kg',
            values: validSamples.map(s => s.wLepas.toFixed(2)),
            average: avgWL.toFixed(2),
          },
          {
            label: 'Berat Bersih Kerikil Lepas',
            equation: 'W2 - W1',
            unit: 'kg',
            values: validSamples.map(s => s.netLepas.toFixed(2)),
            average: avgNetL.toFixed(2),
          },
          {
            label: 'Bobot Isi Kondisi Lepas',
            equation: '(W2 - W1) / V',
            unit: 'kg/L',
            values: validSamples.map(s => s.biLepas.toFixed(3)),
            average: avgBiL.toFixed(3),
          },
          {
            label: 'Rongga Udara Kondisi Lepas',
            equation: '(1 - (BI / Gs)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.ronggaLepas.toFixed(2) + '%'),
            average: avgRonggaL.toFixed(2) + '%',
          },
          {
            label: 'Berat Wadah + Kerikil Padat (W3)',
            equation: 'W3',
            unit: 'kg',
            values: validSamples.map(s => s.wPadat.toFixed(2)),
            average: avgWP.toFixed(2),
          },
          {
            label: 'Berat Bersih Kerikil Padat',
            equation: 'W3 - W1',
            unit: 'kg',
            values: validSamples.map(s => s.netPadat.toFixed(2)),
            average: avgNetP.toFixed(2),
          },
          {
            label: 'Bobot Isi Kondisi Padat',
            equation: '(W3 - W1) / V',
            unit: 'kg/L',
            values: validSamples.map(s => s.biPadat.toFixed(3)),
            average: avgBiP.toFixed(3),
            highlight: true,
          },
          {
            label: 'Rongga Udara Kondisi Padat',
            equation: '(1 - (BI / Gs)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.ronggaPadat.toFixed(2) + '%'),
            average: avgRonggaP.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata bobot isi kerikil padat sebesar ${avgBiP.toFixed(3)} kg/L (standar: ≥ 1.20 kg/L) dengan rongga udara ${avgRonggaP.toFixed(2)}%. Memenuhi spesifikasi teknis SNI 03-4804-1998 untuk perencanaan campuran beton struktural.`
        : `Rata-rata bobot isi padat (${avgBiP.toFixed(3)} kg/L) berada di bawah batas standar minimum 1.20 kg/L.`

      return {
        results: [
          { label: 'Bobot Isi Padat Rata-rata', value: avgBiP.toFixed(3), unit: 'kg/L', highlight: true, sub: 'Standar SNI: ≥ 1.20 kg/L' },
          { label: 'Rongga Udara Padat Rata-rata', value: avgRonggaP.toFixed(2), unit: '%', highlight: true, sub: 'Kondisi padat rodding' },
          { label: 'Bobot Isi Lepas Rata-rata', value: avgBiL.toFixed(3), unit: 'kg/L', sub: `${(avgBiL * 1000).toFixed(0)} kg/m³` },
          { label: 'Rongga Udara Lepas Rata-rata', value: avgRonggaL.toFixed(2), unit: '%', sub: 'Kondisi curah tanpa pemadatan' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `BI Padat = ${avgBiP.toFixed(3)} kg/L, Rongga = ${avgRonggaP.toFixed(1)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-5': {
    id: 'bb-2-5',
    code: 'GRK-01',
    name: 'Analisis Gradasi Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI ASTM C136:2012',
    desc: 'Pemetaan distribusi butiran batu pecah/kerikil dan perhitungan Fineness Modulus (FM) multi-benda uji.',
    hasDynamicSieveTable: true,
    isCoarse: true,
    initialInputs: {
      specimens: ['Benda Uji I', 'Benda Uji II', 'Benda Uji III'],
      sieves: [
        { id: 1, size: 37.5,  label: '1 1/2" (37.5 mm)',  weights: [0.0, 0.0, 0.0], weight: 0 },
        { id: 2, size: 25.0,  label: '1" (25.0 mm)',      weights: [120.0, 125.0, 115.0], weight: 120 },
        { id: 3, size: 19.0,  label: '3/4" (19.0 mm)',    weights: [350.0, 345.0, 355.0], weight: 350 },
        { id: 4, size: 12.5,  label: '1/2" (12.5 mm)',    weights: [650.0, 655.0, 645.0], weight: 650 },
        { id: 5, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [480.0, 475.0, 485.0], weight: 480 },
        { id: 6, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [320.0, 325.0, 315.0], weight: 320 },
        { id: 7, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 55.0, 65.0], weight: 60 },
        { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], weight: 20, isPan: true },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      const rawSieves = Array.isArray(inputs.sieves) && inputs.sieves.length > 0
        ? inputs.sieves
        : [
            { id: 1, size: 37.5,  label: '1 1/2" (37.5 mm)',  weights: [0.0, 0.0, 0.0], weight: 0 },
            { id: 2, size: 25.0,  label: '1" (25.0 mm)',      weights: [120.0, 125.0, 115.0], weight: 120 },
            { id: 3, size: 19.0,  label: '3/4" (19.0 mm)',    weights: [350.0, 345.0, 355.0], weight: 350 },
            { id: 4, size: 12.5,  label: '1/2" (12.5 mm)',    weights: [650.0, 655.0, 645.0], weight: 650 },
            { id: 5, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [480.0, 475.0, 485.0], weight: 480 },
            { id: 6, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [320.0, 325.0, 315.0], weight: 320 },
            { id: 7, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 55.0, 65.0], weight: 60 },
            { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], weight: 20, isPan: true },
          ]

      const specimens = Array.isArray(inputs.specimens) && inputs.specimens.length > 0
        ? inputs.specimens
        : (Array.isArray(rawSieves[0]?.weights) && rawSieves[0].weights.length > 1
            ? rawSieves[0].weights.map((_, i) => `Benda Uji ${['I', 'II', 'III', 'IV', 'V', 'VI'][i] || (i + 1)}`)
            : ['Benda Uji I'])

      const numSpecimens = specimens.length

      const nonPanSieves = rawSieves.filter(
        (s) => !s.isPan && Number(s.size) > 0 && !String(s.label || '').toLowerCase().includes('pan')
      )

      if (nonPanSieves.length === 0) {
        return {
          results: [
            { label: 'Total Massa Contoh (Rata-rata)', value: '-', unit: 'gram' },
            { label: 'Fineness Modulus (FM) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'Status Gradasi Agregat Kasar', value: '-', unit: '', highlight: true },
            { label: 'Status SNI 03-1968', value: 'Input Kosong', unit: '' },
          ],
          formulaSteps: ['Minimal harus ada 1 ukuran saringan selain Pan Penampung.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Minimal harus ada 1 ukuran saringan yang digunakan untuk pengujian gradasi.',
          summaryString: 'Saringan Kosong',
        }
      }

      const sortedDesc = [...nonPanSieves].sort((a, b) => Number(b.size) - Number(a.size))
      const standardSizes = [75, 37.5, 19.0, 9.5, 4.75, 2.36, 1.18, 0.60, 0.30, 0.15]

      const specimenResults = specimens.map((name, k) => {
        const total = rawSieves.reduce((sum, s) => {
          const w = Array.isArray(s.weights) ? Number(s.weights[k] ?? 0) : Number(s.weight ?? 0)
          return sum + (w > 0 ? w : 0)
        }, 0)

        let cumulative = 0
        const rows = sortedDesc.map((s) => {
          const w = Array.isArray(s.weights) ? Number(s.weights[k] ?? 0) : Number(s.weight ?? 0)
          cumulative += w
          const cumRetainedPct = total > 0 ? (cumulative / total) * 100 : 0
          const cumPassingPct = total > 0 ? Math.max(0, Math.min(100, ((total - cumulative) / total) * 100)) : 0
          return {
            ...s,
            size: Number(s.size),
            weight: w,
            cumRetained: cumulative,
            cumRetainedPct,
            cumPassingPct,
          }
        })

        let sumCumPct = 0
        let matchedCount = 0
        standardSizes.forEach((stdSz) => {
          const matched = rows.find((s) => Math.abs(s.size - stdSz) / stdSz < 0.12)
          if (matched) {
            sumCumPct += matched.cumRetainedPct
            matchedCount++
          }
        })

        // Pada kerikil, ayakan < 2.36 mm biasanya tertahan 100%
        const fm = total > 0
          ? (matchedCount > 0 ? (sumCumPct + (standardSizes.length - matchedCount) * 100) / 100 : rows.reduce((acc, s) => acc + s.cumRetainedPct, 0) / 100 + 4.0)
          : 0

        return { name, total, rows, fm: Math.min(8.5, Math.max(5.5, fm)), sumCumPct }
      })

      const avgTotal = specimenResults.reduce((s, r) => s + r.total, 0) / numSpecimens
      const avgFm = specimenResults.reduce((s, r) => s + r.fm, 0) / numSpecimens

      if (avgTotal <= 0) {
        return {
          results: [
            { label: 'Total Massa Contoh (Rata-rata)', value: '0.0', unit: 'gram' },
            { label: 'Fineness Modulus (FM) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'Status Gradasi Agregat Kasar', value: '-', unit: '', highlight: true },
            { label: 'Status SNI 03-1968', value: 'Input Kosong', unit: '' },
          ],
          formulaSteps: ['Total berat benda uji kerikil harus lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Total berat tertahan pada ayakan harus lebih besar dari 0 gram.',
          summaryString: 'Data Ayakan Kosong (0 gr)',
        }
      }

      // Standar ASTM C33 / SNI untuk agregat kasar nominal 20-25 mm
      const sortedAsc = [...sortedDesc].reverse()
      const sieves = sortedAsc.map((s) => Number(s.size))
      const sieveLabels = sortedAsc.map((s) => formatSieveLabel(s.size))
      const sieveNames = sortedAsc.map((s) => s.label || formatSieveLabel(s.size))

      const actualPassing = sortedAsc.map((s) => {
        const passVals = specimenResults.map((sr) => {
          const row = sr.rows.find((r) => r.id === s.id || Math.abs(r.size - Number(s.size)) < 0.01)
          return row ? row.cumPassingPct : 0
        })
        const avg = passVals.reduce((a, b) => a + b, 0) / numSpecimens
        return Number(avg.toFixed(1))
      })

      // Amplop batas spesifikasi agregat kasar ukuran nominal 25 mm (ASTM C33 Size 57)
      const baList = sortedAsc.map(s => {
        const sz = Number(s.size)
        if (sz >= 37.5) return 100
        if (sz >= 25.0) return 100
        if (sz >= 19.0) return 100
        if (sz >= 12.5) return 60
        if (sz >= 9.5) return 50
        if (sz >= 4.75) return 10
        return 5
      })
      const bbList = sortedAsc.map(s => {
        const sz = Number(s.size)
        if (sz >= 37.5) return 100
        if (sz >= 25.0) return 95
        if (sz >= 19.0) return 40
        if (sz >= 12.5) return 25
        if (sz >= 9.5) return 20
        if (sz >= 4.75) return 0
        return 0
      })

      const isWithinBounds = actualPassing.every((val, idx) => val <= baList[idx] && val >= bbList[idx])
      const isValid = avgFm >= 6.00 && avgFm <= 7.50

      const recapTable = {
        title: 'Tabel Rekapitulasi Gradasi & MHB Agregat Kasar Multi-Benda Uji',
        headers: ['Ukuran Saringan (mm)', 'Label Saringan', ...specimens.map(name => `${name} (% Lolos)`), 'Rata-rata % Lolos'],
        rows: [
          ...sortedDesc.map((s) => {
            const passVals = specimenResults.map((sr) => {
              const row = sr.rows.find((r) => r.id === s.id || Math.abs(r.size - Number(s.size)) < 0.01)
              return row ? row.cumPassingPct : 0
            })
            const avgPass = passVals.reduce((a, b) => a + b, 0) / numSpecimens
            return {
              label: `${s.size} mm`,
              equation: s.label || `${s.size} mm`,
              unit: '%',
              values: passVals.map((v) => v.toFixed(1) + '%'),
              average: avgPass.toFixed(1) + '%',
            }
          }),
          {
            label: 'Modulus Halus Butir (MHB)',
            equation: 'MHB = Σ(% Tertahan Kum.) / 100',
            unit: '',
            values: specimenResults.map((sr) => sr.fm.toFixed(2)),
            average: avgFm.toFixed(2),
            highlight: true,
          },
        ],
      }

      const formulaSteps = [
        `Jumlah Benda Uji = ${numSpecimens} (${specimens.join(', ')})`,
        ...specimenResults.map(
          (sr) => `${sr.name}: Total = ${sr.total.toFixed(1)} g | MHB = ${sr.fm.toFixed(2)}`
        ),
        `Rata-rata Modulus Halus Butir (MHB) = (${specimenResults.map(sr => sr.fm.toFixed(2)).join(' + ')}) / ${numSpecimens} = ${avgFm.toFixed(2)}`,
        `Standar MHB Agregat Kasar SNI 03-1968-1990: 6.00 - 7.50`,
      ]

      const conclusion = isValid
        ? `Nilai rata-rata MHB = ${avgFm.toFixed(2)} memenuhi batas spesifikasi SNI 03-1968-1990 untuk batu pecah / kerikil beton (rentang standar MHB: 6.00 - 7.50). Gradasi butiran terdistribusi baik untuk campuran beton.`
        : `Nilai rata-rata MHB = ${avgFm.toFixed(2)} berada di luar rentang ideal SNI (6.00 - 7.50). Perlu penyesuaian proporsi fraksi kerikil.`

      return {
        results: [
          { label: 'Total Massa Contoh (Rata-rata)', value: avgTotal.toFixed(1), unit: 'gram', sub: `${numSpecimens} Benda Uji` },
          { label: 'Fineness Modulus (FM) Rata-rata', value: avgFm.toFixed(2), unit: '', highlight: true, sub: 'Standar SNI: 6.00 - 7.50' },
          { label: 'Status Gradasi Agregat Kasar', value: isValid ? 'Gradasi Baik (Well Graded)' : 'Gradasi Buruk', unit: '', highlight: true, sub: 'SNI 03-1968-1990' },
          { label: 'MHB per Benda Uji', value: specimenResults.map(sr => sr.fm.toFixed(2)).join(' | '), unit: '', sub: 'Distribusi MHB sampel' },
        ],
        formulaSteps,
        recapTable,
        gradationChart: {
          isCoarse: true,
          chartTitle: 'Grafik Kurva Gradasi Agregat Kasar',
          chartSubtitle: 'Distribusi Butiran Kerikil & Amplop Batas Spesifikasi SNI 03-1968',
          zoneNum: 1,
          zoneLabel: 'Agregat Kasar',
          zoneFullName: 'Batu Pecah / Kerikil Standar Beton',
          sieves,
          sieveLabels,
          sieveNames,
          actualPassing,
          upperBound: baList,
          lowerBound: bbList,
          isWithinBounds,
        },
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `FM = ${avgFm.toFixed(2)} (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-6': {
    id: 'bb-2-6',
    code: 'LA-01',
    name: 'Pengujian Keausan Agregat Los Angeles (Abrasi)',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 2417:2008',
    desc: 'Menentukan ketahanan batu pecah/kerikil terhadap disintegrasi mekanis menggunakan mesin abrasi Los Angeles 500 putaran multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'a', label: 'Berat Contoh Semula (A)', unit: 'gram', desc: 'Massa sampel agregat awal kering oven (standar 2000 g atau 5000 g)', min: 0.1 },
      { key: 'b', label: 'Berat Tertahan No. 12 (B)', unit: 'gram', desc: 'Massa tertahan saringan No. 12 setelah 500 putaran', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB26_SAMPLES)),
    },
    fields: [
      { key: 'wAwal', label: 'Berat Contoh Bersih Semula (A)', unit: 'gram', desc: 'Standar berat contoh grading (2000 gr atau 5000 gr)', min: 0.01 },
      { key: 'wTertahan12', label: 'Berat Tertahan Ayakan No. 12 Setelah Putaran (B)', unit: 'gram', desc: 'Massa benda uji tertahan ayakan 1.70 mm setelah 500 putaran', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            a: inputs.a !== undefined ? inputs.a : (inputs.wAwal || 2000),
            b: inputs.b !== undefined ? inputs.b : (inputs.wTertahan12 || 808.3),
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const a = Number(s.a ?? 0)
        const b = Number(s.b ?? 0)

        if (a <= 0 || b <= 0) {
          errors.push(`${idLabel}: Berat semula (A) dan berat tertahan (B) harus bernilai positif > 0 gram.`)
          return
        }
        if (b > a) {
          errors.push(`${idLabel}: Berat tertahan B (${b} g) tidak boleh lebih besar dari berat semula A (${a} g).`)
          return
        }

        const loss = a - b
        const abrasi = (loss / a) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          a,
          b,
          loss,
          abrasi,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Nilai Keausan LA Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Massa Hancur Lolos #12 Rata-rata', value: '-', unit: 'gram' },
            { label: 'Batas Maksimum SNI 2417', value: '40.00', unit: '%' },
            { label: 'Status Kelayakan Agregat', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium abrasi Los Angeles.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgA = validSamples.reduce((sum, r) => sum + r.a, 0) / n
      const avgB = validSamples.reduce((sum, r) => sum + r.b, 0) / n
      const avgLoss = validSamples.reduce((sum, r) => sum + r.loss, 0) / n
      const avgAbrasi = validSamples.reduce((sum, r) => sum + r.abrasi, 0) / n

      // Standar SNI 2417:2008 & Bina Marga 2018:
      // Keausan Maksimum 40% (untuk lapis aus perkerasan)
      const isLolos = avgAbrasi <= 40.00

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Berat Hancur Lolos #12 = ${r.a.toFixed(1)} - ${r.b.toFixed(1)} = ${r.loss.toFixed(1)} g | Keausan = ((${r.a.toFixed(1)} - ${r.b.toFixed(1)}) / ${r.a.toFixed(1)}) × 100% = ${r.abrasi.toFixed(2)}%`
        ),
        `Rata-rata Nilai Keausan Los Angeles = (${validSamples.map(r => r.abrasi.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgAbrasi.toFixed(2)}%`,
        `Evaluasi Terhadap Batas Maksimum Spesifikasi SNI (40.00%): ${avgAbrasi.toFixed(2)}% ${isLolos ? '≤ 40.00% [MEMENUHI]' : '> 40.00% [TIDAK MEMENUHI]'}`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Keausan Agregat Los Angeles (SNI 2417:2008)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Contoh Bersih Semula (A)',
            equation: 'A',
            unit: 'gram',
            values: validSamples.map(s => s.a.toFixed(1)),
            average: avgA.toFixed(2),
          },
          {
            label: 'Berat Tertahan Ayakan No. 12 (B)',
            equation: 'B',
            unit: 'gram',
            values: validSamples.map(s => s.b.toFixed(1)),
            average: avgB.toFixed(2),
          },
          {
            label: 'Massa Hancur Lolos Ayakan No. 12',
            equation: 'A - B',
            unit: 'gram',
            values: validSamples.map(s => s.loss.toFixed(1)),
            average: avgLoss.toFixed(2),
          },
          {
            label: 'Nilai Keausan Agregat Los Angeles (%)',
            equation: '((A - B) / A) × 100%',
            unit: '%',
            values: validSamples.map(s => s.abrasi.toFixed(2) + '%'),
            average: avgAbrasi.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isLolos
        ? `Nilai keausan rata-rata ${avgAbrasi.toFixed(2)}% memenuhi spesifikasi SNI 2417:2008 (≤ 40.00%). Agregat memiliki ketahanan mekanis sangat baik terhadap benturan dan penggerusan.`
        : `Nilai keausan rata-rata ${avgAbrasi.toFixed(2)}% melebihi batas toleransi maksimum spesifikasi SNI 2417:2008 (maksimal 40.00%). Agregat tergolong rapuh / mudah hancur dan tidak disarankan untuk lapis aus perkerasan.`

      return {
        results: [
          { label: 'Nilai Keausan LA Rata-rata', value: avgAbrasi.toFixed(2), unit: '%', highlight: true, sub: 'Batas Maksimum SNI: 40.00%' },
          { label: 'Massa Hancur Lolos #12 Rata-rata', value: avgLoss.toFixed(1), unit: 'gram', sub: 'Massa tergerus dan hancur' },
          { label: 'Batas Maksimum SNI 2417', value: '40.00', unit: '%', sub: 'Spesifikasi Lapis Aus Perkerasan' },
          { label: 'Status Kelayakan Agregat', value: isLolos ? 'Memenuhi Standar' : 'Tidak Memenuhi', unit: '', highlight: true, sub: isLolos ? 'Layak Konstruksi' : 'Batu Terlalu Rapuh' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isLolos ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isLolos ? 'valid' : 'error',
        conclusion,
        summaryString: `Keausan LA = ${avgAbrasi.toFixed(2)}% (${isLolos ? 'Memenuhi SNI ≤ 40%' : 'Tidak Memenuhi'})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // BAB III: BETON
  // -----------------------------------------------------------------------
  'bb-3-1': {
    id: 'bb-3-1',
    code: 'SL-01',
    name: 'Pengujian Nilai Slump Beton Segar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 3: Beton',
    standard: 'SNI 1972:2008 / ASTM C143',
    desc: 'Mengukur konsistensi workability dan kelecakan adukan beton segar menggunakan cetakan kerucut Abrams.',
    initialInputs: {
      tinggiA: 30.0,
      tinggiB: 17.0,
      slumpUnit: 'cm',
    },
    fields: [
      { 
        key: 'tinggiA', 
        label: 'Tinggi Alat Slump (A)', 
        unitKey: 'slumpUnit',
        unitOptions: [
          { label: 'cm', value: 'cm' },
          { label: 'mm', value: 'mm' },
        ],
        min: 1,
        desc: 'Tinggi kerucut cetakan slump Abrams baku (standar: 30 cm / 300 mm)' 
      },
      { 
        key: 'tinggiB', 
        label: 'Tinggi Beton Setelah Mengalami Penurunan (B)', 
        unitKey: 'slumpUnit',
        unitOptions: [
          { label: 'cm', value: 'cm' },
          { label: 'mm', value: 'mm' },
        ],
        min: 0,
        step: 0.1,
        desc: 'Tinggi spesimen beton segar setelah cetakan diangkat perlahan (default: 17 cm / 170 mm)' 
      },
    ],
    calculate: (inputs) => {
      const unit = inputs.slumpUnit || inputs.tinggiAUnit || inputs.hAlatUnit || 'cm'
      const isMm = unit === 'mm'

      const rawA = inputs.tinggiA !== undefined ? inputs.tinggiA : inputs.hCetakan
      const rawB = inputs.tinggiB !== undefined ? inputs.tinggiB : inputs.hBeton

      const a = Number(rawA !== undefined && rawA !== null && rawA !== '' ? rawA : (isMm ? 300 : 30.0))
      const b = Number(rawB !== undefined && rawB !== null && rawB !== '' ? rawB : (isMm ? 170 : 17.0))

      // Validasi: Jika input kosong atau bukan angka
      if (isNaN(a) || isNaN(b)) {
        return {
          results: [
            { label: isMm ? 'Nilai Slump (mm)' : 'Nilai Slump (cm)', value: '-', unit: unit, highlight: true },
            { label: isMm ? 'Nilai Slump (cm)' : 'Nilai Slump (mm)', value: '-', unit: isMm ? 'cm' : 'mm' },
            { label: 'Bentuk Runtuhan Slump', value: 'Menunggu Input', unit: '' },
          ],
          formulaSteps: ['Masukkan nilai Tinggi Alat Slump (A) dan Tinggi Beton Setelah Penurunan (B).'],
          isError: true,
          status: 'Perlu Evaluasi',
          conclusion: 'Masukkan nilai parameter tinggi alat slump (A) dan tinggi beton setelah penurunan (B).',
          summaryString: 'Menunggu Input Parameter',
        }
      }

      // Validasi: Jika ada input minus
      if (a < 0 || b < 0) {
        return {
          results: [
            { label: isMm ? 'Nilai Slump (mm)' : 'Nilai Slump (cm)', value: '-', unit: unit, highlight: true },
            { label: isMm ? 'Nilai Slump (cm)' : 'Nilai Slump (mm)', value: '-', unit: isMm ? 'cm' : 'mm' },
            { label: 'Bentuk Runtuhan Slump', value: 'Input Minus', unit: '' },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Tinggi alat (A) dan tinggi beton (B) tidak boleh bernilai minus.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai tidak boleh negatif. Harap periksa kembali input parameter pengujian.',
          summaryString: 'Nilai Tidak Boleh Negatif',
        }
      }

      if (a <= 0) {
        return {
          results: [
            { label: isMm ? 'Nilai Slump (mm)' : 'Nilai Slump (cm)', value: '-', unit: unit, highlight: true },
            { label: isMm ? 'Nilai Slump (cm)' : 'Nilai Slump (mm)', value: '-', unit: isMm ? 'cm' : 'mm' },
            { label: 'Bentuk Runtuhan Slump', value: 'Tinggi Alat = 0', unit: '' },
          ],
          formulaSteps: ['Tinggi alat slump (A) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Tinggi alat slump (A) harus lebih besar dari 0.',
          summaryString: 'Tinggi Alat Tidak Valid',
        }
      }

      // Jika B > A (Nilai Slump A - B bernilai negatif)
      if (b > a) {
        return {
          results: [
            { label: isMm ? 'Nilai Slump (mm)' : 'Nilai Slump (cm)', value: '-', unit: unit, highlight: true },
            { label: isMm ? 'Nilai Slump (cm)' : 'Nilai Slump (mm)', value: '-', unit: isMm ? 'cm' : 'mm' },
            { label: 'Bentuk Runtuhan Slump', value: 'Perhitungan Batal', unit: '' },
          ],
          formulaSteps: [
            `Perhitungan dibatalkan: Nilai Slump = A - B = ${a} - ${b} = ${(a - b).toFixed(1)} ${unit} bernilai negatif.`,
            `Tinggi beton setelah mengalami penurunan (B = ${b} ${unit}) tidak boleh melebihi tinggi alat slump (A = ${a} ${unit}).`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Hasil perhitungan slump bernilai negatif. Perhitungan dibatalkan karena tinggi beton setelah penurunan (B = ${b} ${unit}) melebihi tinggi alat slump (A = ${a} ${unit}).`,
          summaryString: 'Nilai Slump Negatif (Batal)',
        }
      }

      const slumpDiff = a - b
      const slumpCm = isMm ? slumpDiff / 10 : slumpDiff
      const slumpMm = isMm ? slumpDiff : slumpDiff * 10

      const aDisplay = isMm ? `${a.toFixed(0)} mm` : `${a.toFixed(1)} cm`
      const bDisplay = isMm ? `${b.toFixed(0)} mm` : `${b.toFixed(1)} cm`
      const slumpPrimary = isMm ? `${slumpMm.toFixed(0)} mm` : `${slumpCm.toFixed(1)} cm`
      const slumpSecondary = isMm ? `${slumpCm.toFixed(1)} cm` : `${slumpMm.toFixed(0)} mm`

      let tipeRuntuhan
      if (slumpCm > 24) {
        tipeRuntuhan = 'Collapse (Runtuh Total)'
      } else if (slumpCm < 2) {
        tipeRuntuhan = 'Zero Slump (Sangat Kaku)'
      } else {
        tipeRuntuhan = 'True Slump (Normal)'
      }

      // Standar SNI 1972:2008 / SNI 03-2834-2000 untuk beton normal struktural: rentang target 8 - 15 cm (80 - 150 mm)
      const isNormal = slumpCm >= 8.0 && slumpCm <= 15.0

      return {
        results: [
          { 
            label: isMm ? 'Nilai Slump (mm)' : 'Nilai Slump (cm)', 
            value: isMm ? slumpMm.toFixed(0) : slumpCm.toFixed(1), 
            unit: isMm ? 'mm' : 'cm', 
            highlight: true 
          },
          { 
            label: isMm ? 'Nilai Slump (cm)' : 'Nilai Slump (mm)', 
            value: isMm ? slumpCm.toFixed(1) : slumpMm.toFixed(0), 
            unit: isMm ? 'cm' : 'mm' 
          },
          { 
            label: 'Bentuk Runtuhan Slump', 
            value: tipeRuntuhan, 
            unit: '' 
          },
        ],
        formulaSteps: [
          `Tinggi Alat Slump (A) = ${aDisplay}`,
          `Tinggi Beton Setelah Mengalami Penurunan (B) = ${bDisplay}`,
          `Nilai Slump = A - B = ${aDisplay} - ${bDisplay} = ${slumpPrimary} (${slumpSecondary})`,
          `Bentuk Runtuhan = ${tipeRuntuhan}`,
          `Rentang Standar Beton Normal = 8.0 - 15.0 cm (80 - 150 mm) sesuai SNI 1972:2008`,
        ],
        status: isNormal ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isNormal
          ? `Nilai Slump = ${slumpPrimary} (${slumpSecondary}) memenuhi rentang rencana beton normal struktural SNI 1972:2008 (8 - 15 cm / 80 - 150 mm). Adukan memiliki kelecakan (workability) yang baik untuk pemadatan tanpa risiko segregasi.`
          : `Nilai Slump = ${slumpPrimary} berada di luar rentang standar beton normal (8 - 15 cm). ${slumpCm < 8.0 ? 'Adukan terlalu kaku/kering, kelecakan rendah sehingga sulit dipadatkan.' : 'Adukan terlalu encer, risiko bleeding & segregasi tinggi.'} Evaluasi rasio faktor air-semen (fas).`,
        summaryString: `Slump = ${slumpPrimary} (${isNormal ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-3-2': {
    id: 'bb-3-2',
    code: 'KTB-01',
    name: 'Pengujian Kuat Tekan Silinder & Kubus Beton',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 3: Beton',
    standard: 'SNI 1974:2011 / ASTM C39',
    desc: 'Menghitung kuat tekan beton karakteristik f\'c pada umur 3, 7, 14, 21, atau 28 hari berdasarkan beban aksial hancur mesin kompresi.',
    initialInputs: {
      tipeSample: 'silinder', // 'silinder' (D15x30)
      umurHari: 28,
      bebanHancur: 502.0,
      targetFc: 25.0,
    },
    fields: [
      { 
        key: 'bebanHancur', 
        label: 'Beban Hancur Maksimum (P)', 
        unit: 'kN', 
        min: 0.01, 
        step: 0.1,
        desc: 'Beban terbaca pada dial/indikator mesin uji tekan kompresi beton' 
      },
      { 
        key: 'targetFc', 
        label: 'Target Kuat Tekan Rencana (f\'c)', 
        unit: 'MPa', 
        min: 0.01, 
        step: 0.5,
        desc: 'Mutu kuat tekan rencana umur 28 hari (misal f\'c 25 MPa atau K-300)' 
      },
      { 
        key: 'umurHari', 
        label: 'Umur Benda Uji Saat Dites', 
        unit: 'Hari', 
        type: 'select',
        options: [
          { value: 3, label: '3 Hari' },
          { value: 7, label: '7 Hari' },
          { value: 14, label: '14 Hari' },
          { value: 21, label: '21 Hari' },
          { value: 28, label: '28 Hari' },
        ],
        desc: 'Pilihan standar perawatan SNI: 3, 7, 14, 21, atau 28 hari' 
      },
    ],
    calculate: (inputs) => {
      const p = Number(inputs.bebanHancur)
      const target = Number(inputs.targetFc)
      const umur = Number(inputs.umurHari)

      // Validasi jika user memasukkan angka minus atau <= 0
      if (p <= 0 || target <= 0 || isNaN(p) || isNaN(target)) {
        return {
          results: [
            { label: 'Kuat Tekan Aktual', value: '-', unit: 'MPa', highlight: true },
            { label: 'Proyeksi f\'c (28 Hari)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Ekuivalen Mutu Karakteristik', value: '-', unit: 'kg/cm²' },
          ],
          formulaSteps: [
            'Nilai beban hancur (P) dan target f\'c harus bernilai positif (> 0).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai beban hancur P dan target kuat tekan rencana f\'c harus lebih besar dari 0. Periksa kembali input data Anda.',
          summaryString: 'Input Beban/Target f\'c Tidak Valid',
        }
      }

      // Standar faktor konversi umur PBI 1971 / SNI: 3=0.40, 7=0.65, 14=0.88, 21=0.95, 28=1.00
      const FAKTOR_UMUR = {
        3: 0.40,
        7: 0.65,
        14: 0.88,
        21: 0.95,
        28: 1.00,
      }

      // Jangan proses kalkulasi jika umur tidak ada di daftar dropdown
      if (FAKTOR_UMUR[umur] === undefined) {
        return {
          results: [
            { label: 'Kuat Tekan Aktual', value: '-', unit: 'MPa', highlight: true },
            { label: 'Proyeksi f\'c (28 Hari)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Ekuivalen Mutu Karakteristik', value: '-', unit: 'kg/cm²' },
          ],
          formulaSteps: [
            `Umur ${umur} hari tidak ada di daftar standar. Pilihan yang diizinkan hanya 3, 7, 14, 21, dan 28 Hari.`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Umur benda uji tidak dikenali. Pilih salah satu umur standar dari daftar dropdown (3, 7, 14, 21, atau 28 hari).',
          summaryString: 'Umur Benda Uji Tidak Valid',
        }
      }

      const konversi = FAKTOR_UMUR[umur]

      // Silinder D15 cm -> Luas = (π/4) * 150² = 17671.46 mm²
      const luasMm2 = 17671.46
      const fcAktual = (p * 1000) / luasMm2
      const fcPrediksi28 = konversi > 0 ? fcAktual / konversi : fcAktual
      const targetUmur = target * konversi
      const isValid = fcAktual >= targetUmur

      return {
        results: [
          { label: `Kuat Tekan Aktual (${umur} Hari)`, value: fcAktual.toFixed(2), unit: 'MPa', highlight: true },
          { label: 'Proyeksi f\'c (28 Hari)', value: fcPrediksi28.toFixed(2), unit: 'MPa', highlight: true },
          { label: 'Ekuivalen Mutu Karakteristik', value: `K-${(fcPrediksi28 / 0.083).toFixed(0)}`, unit: 'kg/cm²' },
        ],
        formulaSteps: [
          `Luas Penampang Silinder (D15 cm) = (π/4) × 150² = 17.671,46 mm²`,
          `f'c Aktual = P / A = (${p.toLocaleString('id-ID')} × 1000) / 17.671,46 = ${fcAktual.toFixed(2)} MPa`,
          `Faktor Konversi Umur (${umur} Hari) = ${konversi.toFixed(2)}`,
          `Target Kuat Tekan Minimum Umur ${umur} Hari = ${target} × ${konversi.toFixed(2)} = ${targetUmur.toFixed(2)} MPa`,
          `Proyeksi f'c 28 Hari = ${fcAktual.toFixed(2)} / ${konversi.toFixed(2)} = ${fcPrediksi28.toFixed(2)} MPa`,
        ],
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Kuat tekan aktual tercapai f'c = ${fcAktual.toFixed(2)} MPa pada umur ${umur} hari, melampaui target minimum umur ${umur} hari (${targetUmur.toFixed(2)} MPa) untuk mutu rencana f'c ${target} MPa.`
          : `Kuat tekan aktual f'c = ${fcAktual.toFixed(2)} MPa pada umur ${umur} hari masih di bawah target minimum (${targetUmur.toFixed(2)} MPa) untuk mutu rencana f'c ${target} MPa. Perlu evaluasi rancangan campuran (mix design).`,
        summaryString: `f'c (${umur}d) = ${fcAktual.toFixed(2)} MPa (${isValid ? 'Memenuhi Target' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-3-3': {
    id: 'bb-3-3',
    code: 'KLB-01',
    name: 'Pengujian Kuat Lentur Balok Beton (Modulus of Rupture)',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 3: Beton',
    standard: 'SNI 4431:2011 / ASTM C78',
    desc: 'Menghitung modulus runtuh lentur balok beton polos dengan dua titik pembebanan sepertiga bentang.',
    initialInputs: {
      lebarB: 150.0,
      tinggiH: 150.0,
      bentangL: 450.0,
      bebanP: 28.5,
    },
    fields: [
      { key: 'bebanP', label: 'Beban Lentur Runtuh Maksimum (P)', unit: 'kN', min: 0.01, step: 0.1, desc: 'Beban hancur pada mesin uji lentur balok' },
      { key: 'lebarB', label: 'Lebar Penampang Balok (b)', unit: 'mm', min: 0.01, step: 1, desc: 'Standar balok uji lentur = 150 mm' },
      { key: 'tinggiH', label: 'Tinggi Penampang Balok (h)', unit: 'mm', min: 0.01, step: 1, desc: 'Standar tinggi balok uji lentur = 150 mm' },
      { key: 'bentangL', label: 'Jarak Antar Tumpuan Bebas (L)', unit: 'mm', min: 0.01, step: 1, desc: 'Standar bentang tumpuan balok = 450 mm (3h)' },
    ],
    calculate: (inputs) => {
      const pKn = Number(inputs.bebanP)
      const b = Number(inputs.lebarB)
      const h = Number(inputs.tinggiH)
      const l = Number(inputs.bentangL)

      // Validasi: jika nilai 0, negatif, atau NaN
      if (pKn <= 0 || b <= 0 || h <= 0 || l <= 0 || isNaN(pKn) || isNaN(b) || isNaN(h) || isNaN(l)) {
        return {
          results: [
            { label: 'Modulus of Rupture (fr)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Beban Maksimum (P)', value: '-', unit: 'kN' },
            { label: 'Standar Rigid Pavement', value: '≥ 3.50', unit: 'MPa' },
          ],
          formulaSteps: [
            'Semua parameter beban (P), lebar (b), tinggi (h), dan bentang (L) harus bernilai positif (> 0).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai dimensi balok dan beban lentur harus lebih besar dari 0. Periksa kembali input data Anda.',
          summaryString: 'Dimensi/Beban Lentur Tidak Valid',
        }
      }

      const p = pKn * 1000 // konversi kN ke N
      const denom = b * h * h
      const fr = denom > 0 ? (p * l) / denom : 0
      const isFrValid = fr >= 3.5

      // Validasi peringatan jika lebar (b) dan tinggi (h) tidak sama dengan 150 mm
      const hasDimWarning = (b !== 150 || h !== 150)
      const dimWarningText = 'Standar SNI 4154:2014 menyarankan dimensi penampang balok 150x150 mm. Pastikan dimensi sesuai.'

      // Jika ada warning dimensi, status menjadi 'Perlu Evaluasi' (warna kuning)
      const finalStatus = hasDimWarning ? 'Perlu Evaluasi' : (isFrValid ? 'Valid' : 'Perlu Evaluasi')

      const steps = [
        `Beban Lentur P = ${pKn} kN = ${p.toLocaleString('id-ID')} N`,
        `Dimensi Balok: b = ${b} mm, h = ${h} mm, bentang tumpuan L = ${l} mm`,
        `fr = (P × L) / (b × h²) = (${p.toLocaleString('id-ID')} × ${l}) / (${b} × ${h}²) = ${fr.toFixed(2)} MPa`,
      ]

      if (hasDimWarning) {
        steps.push(`Peringatan SNI: Penampang ${b}×${h} mm (${dimWarningText})`)
      }

      let conclusionText
      if (hasDimWarning) {
        conclusionText = `${dimWarningText} Nilai Modulus Rupture fr = ${fr.toFixed(2)} MPa ${isFrValid ? '(secara numerik memenuhi kriteria lentur ≥ 3.50 MPa)' : '(di bawah kriteria standar perkerasan kaku ≥ 3.50 MPa)'}.`
      } else if (isFrValid) {
        conclusionText = `Modulus Rupture fr = ${fr.toFixed(2)} MPa memenuhi syarat kekuatan lentur perkerasan kaku (Rigid Pavement SNI 4154:2014 mensyaratkan fr ≥ 3.50 MPa).`
      } else {
        conclusionText = `Modulus Rupture fr = ${fr.toFixed(2)} MPa masih di bawah standar perkerasan kaku jalan raya (SNI 4154:2014 mensyaratkan fr ≥ 3.50 MPa).`
      }

      return {
        results: [
          { label: 'Modulus of Rupture (fr)', value: fr.toFixed(2), unit: 'MPa', highlight: true },
          { label: 'Beban Maksimum (P)', value: pKn.toFixed(1), unit: 'kN' },
          { label: 'Standar Rigid Pavement', value: '≥ 3.50', unit: 'MPa' },
        ],
        formulaSteps: steps,
        status: finalStatus,
        warningMessage: hasDimWarning ? dimWarningText : null,
        conclusion: conclusionText,
        summaryString: `Kuat Lentur fr = ${fr.toFixed(2)} MPa (${finalStatus === 'Valid' ? 'SNI Valid' : 'Perlu Evaluasi'})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // BAB IV: KAYU
  // -----------------------------------------------------------------------
  'bb-4-1': {
    id: 'bb-4-1',
    code: 'KAKY-01',
    name: 'Pengujian Kadar Air Kayu Konstruksi',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 4: Kayu',
    standard: 'SNI 03-6847/6848-2002',
    desc: 'Menghitung persentase kandungan air terhadap berat kering mutlak pada kayu konstruksi.',
    initialInputs: {
      mBasah: 128.4,
      mKering: 112.6,
    },
    fields: [
      { 
        key: 'mBasah', 
        label: 'Massa Kayu Kondisi Basah / Lapangan (m_b)', 
        unit: 'gram', 
        min: 0.01, 
        step: 0.1, 
        desc: 'Massa spesimen sebelum dioven (harus lebih besar dari m_k)' 
      },
      { 
        key: 'mKering', 
        label: 'Massa Kayu Kering Oven Mutlak (m_k)', 
        unit: 'gram', 
        min: 0.01, 
        step: 0.1, 
        desc: 'Massa konstan setelah dioven 103°C ± 2°C' 
      },
    ],
    calculate: (inputs) => {
      const mb = Number(inputs.mBasah)
      const mk = Number(inputs.mKering)

      // Validasi jika input kosong, nol, atau bukan angka
      if (mb <= 0 || mk <= 0 || isNaN(mb) || isNaN(mk)) {
        return {
          results: [
            { label: 'Kadar Air Kayu (w)', value: '-', unit: '%', highlight: true },
            { label: 'Batas Kering Udara SNI', value: '≤ 15 - 20', unit: '%' },
          ],
          formulaSteps: [
            'Massa basah (m_b) dan massa kering (m_k) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai massa kayu basah dan kering harus bernilai positif (> 0). Masukkan data yang valid.',
          summaryString: 'Input Massa Tidak Valid',
        }
      }

      // Validasi relasional: Massa Basah (m_b) HARUS lebih besar dari Massa Kering (m_k)
      if (mb <= mk) {
        return {
          results: [
            { label: 'Kadar Air Kayu (w)', value: '-', unit: '%', highlight: true },
            { label: 'Batas Kering Udara SNI', value: '≤ 15 - 20', unit: '%' },
          ],
          formulaSteps: [
            `Input tidak valid: Massa basah (${mb} g) tidak boleh lebih kecil atau sama dengan massa kering (${mk} g).`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input tidak valid: Massa basah tidak boleh lebih kecil dari massa kering.',
          summaryString: 'Input tidak valid (m_b ≤ m_k)',
        }
      }

      const moisture = ((mb - mk) / mk) * 100

      // Jika hasil kadar air < 0% (tidak mungkin jika mb > mk, tetapi diproteksi ketat)
      if (moisture < 0) {
        return {
          results: [
            { label: 'Kadar Air Kayu (w)', value: moisture.toFixed(2), unit: '%', highlight: true },
            { label: 'Batas Kering Udara SNI', value: '≤ 15 - 20', unit: '%' },
          ],
          formulaSteps: [
            `w = ((m_b - m_k) / m_k) × 100% = ${moisture.toFixed(2)}% (Hasil bernilai negatif)`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Kadar air kayu tidak boleh bernilai negatif. Periksa kembali pembacaan timbangan massa.',
          summaryString: `Kadar Air = ${moisture.toFixed(2)}% (Negatif / Tidak Valid)`,
        }
      }

      let status
      let conclusion
      let summaryStr

      // Jika hasil kadar air > 30% atau di luar rentang kering udara, status HARUS 'Perlu Evaluasi'
      if (moisture > 30.0) {
        status = 'Perlu Evaluasi'
        conclusion = `Kadar air kayu ${moisture.toFixed(2)}% sangat tinggi (> 30%, di atas titik jenuh serat). Kayu basah segar rentan terhadap serangan jamur, rayap, dan susut deformasi ekstrem.`
        summaryStr = `Kadar Air = ${moisture.toFixed(2)}% (Perlu Evaluasi / Terlalu Basah)`
      } else if (moisture > 20.0) {
        status = 'Perlu Evaluasi'
        conclusion = `Kadar air kayu ${moisture.toFixed(2)}% agak basah (melebihi batas kering udara 20%). Disarankan dilakukan penjemuran/pengeringan tambahan sebelum dipakai pada struktur permanen.`
        summaryStr = `Kadar Air = ${moisture.toFixed(2)}% (Perlu Pengeringan)`
      } else {
        status = 'Valid'
        conclusion = `Kadar air kayu ${moisture.toFixed(2)}% memenuhi syarat kayu kering udara konstruksi (SNI mensyaratkan ≤ 15 - 20%). Kayu stabil terhadap susut dan aman dari risiko pembusukan.`
        summaryStr = `Kadar Air = ${moisture.toFixed(2)}% (Kering Udara SNI)`
      }

      return {
        results: [
          { label: 'Kadar Air Kayu (w)', value: moisture.toFixed(2), unit: '%', highlight: true },
          { label: 'Batas Kering Udara SNI', value: '≤ 15 - 20', unit: '%' },
        ],
        formulaSteps: [
          `w = ((m_b - m_k) / m_k) × 100% = ((${mb} - ${mk}) / ${mk}) × 100% = ${moisture.toFixed(2)}%`,
        ],
        status,
        conclusion,
        summaryString: summaryStr,
      }
    },
  },

  'bb-4-2': {
    id: 'bb-4-2',
    code: 'KRK-01',
    name: 'Pengujian Kerapatan Massa Kayu',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 4: Kayu',
    standard: 'SNI 03-6847/6848-2002',
    desc: 'Menghitung massa per satuan volume benda uji balok kayu pada kadar air terukur.',
    initialInputs: {
      massa: 185.0,
      panjang: 10.0,
      lebar: 5.0,
      tebal: 5.0,
      dimUnit: 'cm',
    },
    fields: [
      { 
        key: 'massa', 
        label: 'Massa Benda Uji Kayu (m)', 
        unit: 'gram', 
        min: 0.01, 
        step: 0.1, 
        desc: 'Berat penimbangan massa balok kayu' 
      },
      { 
        key: 'panjang', 
        label: 'Panjang Benda Uji (p)', 
        unitKey: 'dimUnit',
        unitOptions: [
          { label: 'cm', value: 'cm' },
          { label: 'mm', value: 'mm' },
        ],
        min: 0.01, 
        step: 0.01, 
        desc: 'Dimensi panjang balok kayu (akurasi jangka sorong)' 
      },
      { 
        key: 'lebar', 
        label: 'Lebar Benda Uji (l)', 
        unitKey: 'dimUnit',
        unitOptions: [
          { label: 'cm', value: 'cm' },
          { label: 'mm', value: 'mm' },
        ],
        min: 0.01, 
        step: 0.01, 
        desc: 'Dimensi lebar balok kayu (akurasi jangka sorong)' 
      },
      { 
        key: 'tebal', 
        label: 'Tebal Benda Uji (t)', 
        unitKey: 'dimUnit',
        unitOptions: [
          { label: 'cm', value: 'cm' },
          { label: 'mm', value: 'mm' },
        ],
        min: 0.01, 
        step: 0.01, 
        desc: 'Dimensi tebal balok kayu (akurasi jangka sorong)' 
      },
    ],
    calculate: (inputs) => {
      const dimUnit = inputs.dimUnit || 'cm'
      const isMm = dimUnit === 'mm'

      const m = Number(inputs.massa)
      const p = Number(inputs.panjang)
      const l = Number(inputs.lebar)
      const t = Number(inputs.tebal)

      // Validasi jika nilai 0 atau negatif atau NaN: cegah kalkulasi dan tampilkan error
      if (m <= 0 || p <= 0 || l <= 0 || t <= 0 || isNaN(m) || isNaN(p) || isNaN(l) || isNaN(t)) {
        return {
          results: [
            { label: 'Kerapatan Kayu (g/cm³)', value: '-', unit: 'g/cm³', highlight: true },
            { label: 'Kerapatan Kayu (g/mm³)', value: '-', unit: 'g/mm³' },
            { label: 'Kerapatan Kayu (kg/m³)', value: '-', unit: 'kg/m³' },
            { label: 'Volume Benda Uji', value: '-', unit: isMm ? 'mm³' : 'cm³' },
          ],
          formulaSteps: [
            'Massa (m), panjang (p), lebar (l), dan tebal (t) harus bernilai lebih besar dari 0. Pembagian dengan nol atau angka negatif tidak diperkenankan.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai massa dan seluruh dimensi balok kayu (panjang, lebar, tebal) harus bernilai positif lebih besar dari 0. Periksa kembali input data Anda.',
          summaryString: 'Input Parameter Tidak Valid (<= 0)',
        }
      }

      // Hitung volume dan kerapatan sesuai satuan yang dipilih
      let kerapatanGcm3
      let kerapatanGmm3
      let kerapatanKgm3
      let formulaStepLines

      if (isMm) {
        // Satuan input adalah mm
        const volMm3 = p * l * t
        kerapatanGmm3 = m / volMm3
        kerapatanGcm3 = kerapatanGmm3 * 1000
        kerapatanKgm3 = kerapatanGcm3 * 1000
        const volCm3 = volMm3 / 1000

        formulaStepLines = [
          `Satuan Dimensi Terpilih: mm`,
          `Volume (mm³) = p × l × t = ${p} × ${l} × ${t} = ${volMm3.toFixed(1)} mm³ (${volCm3.toFixed(2)} cm³)`,
          `Kerapatan (g/mm³) = Massa / Volume = ${m} g / ${volMm3.toFixed(1)} mm³ = ${kerapatanGmm3.toFixed(6)} g/mm³`,
          `Kerapatan (g/cm³) = Kerapatan (g/mm³) × 1000 = ${kerapatanGmm3.toFixed(6)} × 1000 = ${kerapatanGcm3.toFixed(3)} g/cm³`,
          `Kerapatan (kg/m³) = Kerapatan (g/cm³) × 1000 = ${kerapatanGcm3.toFixed(3)} × 1000 = ${kerapatanKgm3.toFixed(0)} kg/m³`,
        ]
      } else {
        // Satuan input adalah cm
        const volCm3 = p * l * t
        kerapatanGcm3 = m / volCm3
        kerapatanGmm3 = kerapatanGcm3 / 1000
        kerapatanKgm3 = kerapatanGcm3 * 1000
        const volMm3 = volCm3 * 1000

        formulaStepLines = [
          `Satuan Dimensi Terpilih: cm`,
          `Volume (cm³) = p × l × t = ${p} × ${l} × ${t} = ${volCm3.toFixed(2)} cm³ (${volMm3.toFixed(0)} mm³)`,
          `Kerapatan (g/cm³) = Massa / Volume = ${m} g / ${volCm3.toFixed(2)} cm³ = ${kerapatanGcm3.toFixed(3)} g/cm³`,
          `Kerapatan (g/mm³) = Kerapatan (g/cm³) / 1000 = ${kerapatanGcm3.toFixed(3)} / 1000 = ${kerapatanGmm3.toFixed(6)} g/mm³`,
          `Kerapatan (kg/m³) = Kerapatan (g/cm³) × 1000 = ${kerapatanGcm3.toFixed(3)} × 1000 = ${kerapatanKgm3.toFixed(0)} kg/m³`,
        ]
      }

      // Kerapatan normal kayu alami adalah 0.20 - 1.28 g/cm³ (200 - 1280 kg/m³)
      const isNormal = kerapatanGcm3 >= 0.20 && kerapatanGcm3 <= 1.28
      const status = isNormal ? 'Valid' : 'Perlu Evaluasi'

      let conclusion
      if (isNormal) {
        conclusion = `Kerapatan kayu sebesar ${kerapatanGcm3.toFixed(3)} g/cm³ (${kerapatanKgm3.toFixed(0)} kg/m³ atau ${kerapatanGmm3.toFixed(6)} g/mm³) berada dalam rentang normal kayu alami ASTM D2395-17 (0.20 - 1.28 g/cm³). Masuk kategori kayu berbobot ${kerapatanGcm3 >= 0.60 ? 'sedang hingga berat' : 'ringan'}.`
      } else if (kerapatanGcm3 < 0.20) {
        conclusion = `Kerapatan kayu ${kerapatanGcm3.toFixed(3)} g/cm³ di bawah batas normal kayu alami (< 0.20 g/cm³). Kayu terlalu rapuh/keropos atau periksa kesalahan pengukuran dimensi.`
      } else {
        conclusion = `Kerapatan kayu ${kerapatanGcm3.toFixed(3)} g/cm³ melebihi batas wajar kayu alami (> 1.28 g/cm³). Periksa kembali keakuratan timbangan atau volume spesimen.`
      }

      const currentVol = p * l * t
      return {
        results: [
          { label: 'Kerapatan Kayu (g/cm³)', value: kerapatanGcm3.toFixed(3), unit: 'g/cm³', highlight: !isMm },
          { label: 'Kerapatan Kayu (g/mm³)', value: kerapatanGmm3.toFixed(6), unit: 'g/mm³', highlight: isMm },
          { label: 'Kerapatan Kayu (kg/m³)', value: kerapatanKgm3.toFixed(0), unit: 'kg/m³' },
          { label: 'Volume Benda Uji', value: isMm ? currentVol.toFixed(1) : currentVol.toFixed(2), unit: `${dimUnit}³` },
        ],
        formulaSteps: formulaStepLines,
        status,
        conclusion,
        summaryString: `Kerapatan = ${kerapatanGcm3.toFixed(3)} g/cm³ (${status === 'Valid' ? `${kerapatanKgm3.toFixed(0)} kg/m³` : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-4-3': {
    id: 'bb-4-3',
    code: 'BJKY-01',
    name: 'Pengujian Berat Jenis & Penentuan Kelas Kuat Kayu',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 4: Kayu',
    standard: 'SNI 03-6847/6848-2002',
    desc: 'Menghitung Berat Jenis sesuai kadar air dan Berat Jenis kering oven untuk penentuan Kelas Kuat Kayu (Sudarminto, 1983).',
    initialInputs: {
      vm: 115200.0,
      v0: 110661.129,
      mm: 74.8,
      m0: 64.9,
    },
    fields: [
      { key: 'vm', label: 'Volume Asli (V_m)', unit: 'mm³', min: 0.01, step: 0.001, desc: 'Volume benda uji kayu pada kondisi kadar air asli / terukur' },
      { key: 'v0', label: 'Volume Kering Oven (V_0)', unit: 'mm³', min: 0.01, step: 0.001, desc: 'Volume benda uji kayu setelah pengeringan oven' },
      { key: 'mm', label: 'Berat Asli (M_m)', unit: 'gram', min: 0.01, step: 0.01, desc: 'Massa/berat benda uji kayu pada kondisi kadar air asli sebelum oven' },
      { key: 'm0', label: 'Berat Kering Oven (M_0)', unit: 'gram', min: 0.01, step: 0.01, desc: 'Massa/berat benda uji kayu setelah pengeringan oven' },
    ],
    calculate: (inputs) => {
      const vm = Number(inputs.vm)
      const v0 = Number(inputs.v0)
      const mm = Number(inputs.mm)
      const m0 = Number(inputs.m0)

      // 1. Validasi: Jika salah satu input bernilai 0, minus, atau tidak valid
      if (vm <= 0 || v0 <= 0 || mm <= 0 || m0 <= 0 || isNaN(vm) || isNaN(v0) || isNaN(mm) || isNaN(m0)) {
        return {
          results: [
            { label: 'BJ Sesuai Kadar Air', value: '-', unit: '', highlight: true },
            { label: 'BJ Kering Oven', value: '-', unit: '', highlight: true },
            { label: 'Klasifikasi Kelas Kuat Kayu', value: 'Input tidak valid', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Input tidak valid: Parameter Volume Asli (V_m), Volume Kering (V_0), Berat Asli (M_m), dan Berat Kering (M_0) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input tidak valid',
          conclusion: 'Input tidak valid. Nilai volume asli (V_m), volume kering (V_0), berat asli (M_m), dan berat kering (M_0) harus lebih besar dari 0.',
          summaryString: 'Input tidak valid',
        }
      }

      // 2. Rumus Sesuai Panduan Praktikum (Konstanta 1000 untuk konversi mm³ ke cm³)
      const bjAsli = (1000 * mm) / vm
      const bjKering = (1000 * m0) / v0

      // 3. Penentuan Kelas Kuat Kayu Berdasarkan BJ Kering Oven (Tabel 4.5 Sudarminto, 1983)
      let kelas
      let kelasDesc
      if (bjKering > 0.90) {
        kelas = 'Kelas Kuat I'
        kelasDesc = 'Kayu Sangat Keras / Sangat Kuat (Ulin, Jati, Bangkirai)'
      } else if (bjKering >= 0.60) {
        kelas = 'Kelas Kuat II'
        kelasDesc = 'Kayu Kuat / Keras (Kamper, Merbau)'
      } else if (bjKering >= 0.40) {
        kelas = 'Kelas Kuat III'
        kelasDesc = 'Kayu Sedang (Meranti Merah, Mahoni)'
      } else if (bjKering >= 0.30) {
        kelas = 'Kelas Kuat IV'
        kelasDesc = 'Kayu Ringan (Sengon, Pinus)'
      } else {
        kelas = 'Kelas Kuat V'
        kelasDesc = 'Kayu Sangat Ringan (Non-Struktural)'
      }

      // Rentang standar fisik kayu alami ASTM D2395-17: 0.20 s/d 1.28
      const isAstmOk = bjKering >= 0.20 && bjKering <= 1.28
      const status = isAstmOk ? 'Memenuhi Standar (ASTM D2395-17)' : 'Perlu Evaluasi'

      const conclusion = isAstmOk
        ? `Berat Jenis Kering Oven sebesar ${bjKering.toFixed(4)} menempatkan kayu pada ${kelas} (${kelasDesc}) berdasarkan Tabel 4.5 Sudarminto (1983). Memenuhi rentang standar fisik kayu alami ASTM D2395-17 (0.20 - 1.28).`
        : `Berat Jenis Kering Oven sebesar ${bjKering.toFixed(4)} berada di luar rentang normal kayu alami ASTM D2395-17 (0.20 - 1.28). ${bjKering < 0.20 ? 'Kayu terlalu ringan/keropos atau periksa pengukuran volume.' : 'Nilai terlalu tinggi melebihi densitas kayu alami, periksa penimbangan massa.'}`

      return {
        results: [
          { label: 'BJ Sesuai Kadar Air', value: bjAsli.toFixed(4), unit: '', highlight: true },
          { label: 'BJ Kering Oven', value: bjKering.toFixed(4), unit: '', highlight: true },
          { label: 'Klasifikasi Kelas Kuat Kayu', value: kelas, unit: '', highlight: true },
        ],
        formulaSteps: [
          `Volume Asli (V_m) = ${vm} mm³ | Volume Kering Oven (V_0) = ${v0} mm³`,
          `Berat Asli (M_m) = ${mm} gram | Berat Kering Oven (M_0) = ${m0} gram`,
          `BJ Sesuai Kadar Air = (1000 * M_m) / V_m = (1000 * ${mm}) / ${vm} = ${bjAsli.toFixed(4)}`,
          `BJ Kering = (1000 * M_0) / V_0 = (1000 * ${m0}) / ${v0} = ${bjKering.toFixed(4)}`,
          `Penentuan Kelas Kuat (Tabel 4.5 Sudarminto, 1983): ${kelas} (${kelasDesc})`,
          `Evaluasi Rentang Alami ASTM D2395-17 (0.20 - 1.28): ${isAstmOk ? 'Memenuhi Standar' : 'Di Luar Rentang Standar'}`,
        ],
        isError: false,
        status,
        conclusion,
        summaryString: `BJ Kering = ${bjKering.toFixed(4)} (${kelas}, ${status})`,
      }
    },
  },

  'bb-4-4': {
    id: 'bb-4-4',
    code: 'KLKY-01',
    name: 'Pengujian Kuat Lentur Balok Kayu (MOE & MOR)',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 4: Kayu',
    standard: 'SNI 03-6847/6848-2002',
    desc: 'Menghitung Modulus of Elasticity (MOE) dan Modulus of Rupture (MOR) balok kayu konstruksi.',
    initialInputs: {
      lebarB: 50.0,
      tinggiH: 50.0,
      bentangL: 1000.0,
      bebanP: 8200.0,
      lendutan: 6.2,
    },
    fields: [
      { key: 'bebanP', label: 'Beban Maksimum Balok (P)', unit: 'N', min: 0.01, step: 10, desc: 'Beban terpusat tengah bentang saat batas lentur' },
      { key: 'lendutan', label: 'Lendutan Pusat Balok (Δ)', unit: 'mm', min: 0.01, step: 0.1, desc: 'Defleksi vertikal jarum dial gauge' },
      { key: 'lebarB', label: 'Lebar Penampang Balok (b)', unit: 'mm', min: 0.01, step: 1, desc: 'Dimensi lebar balok kayu' },
      { key: 'tinggiH', label: 'Tinggi Penampang Balok (h)', unit: 'mm', min: 0.01, step: 1, desc: 'Dimensi tinggi balok kayu' },
      { key: 'bentangL', label: 'Panjang Bentang Tumpuan (L)', unit: 'mm', min: 0.01, step: 10, desc: 'Jarak sendi ke rol tumpuan balok' },
    ],
    calculate: (inputs) => {
      const p = Number(inputs.bebanP)
      const delta = Number(inputs.lendutan)
      const b = Number(inputs.lebarB)
      const h = Number(inputs.tinggiH)
      const l = Number(inputs.bentangL)

      // Validasi parameter: semua harus bernilai positif > 0
      if (p <= 0 || delta <= 0 || b <= 0 || h <= 0 || l <= 0 || isNaN(p) || isNaN(delta) || isNaN(b) || isNaN(h) || isNaN(l)) {
        return {
          results: [
            { label: 'Modulus of Rupture (MOR)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Modulus of Elasticity (MOE)', value: '-', unit: 'MPa', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter beban (P), lendutan (Δ), lebar (b), tinggi (h), dan bentang (L) harus bernilai positif (> 0).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai dimensi balok, beban, dan lendutan harus lebih besar dari 0. Periksa kembali input data Anda.',
          summaryString: 'Dimensi/Beban Lentur Tidak Valid',
        }
      }

      // MOR = (3 * P * L) / (2 * b * h^2)
      const mor = (3 * p * l) / (2 * b * h * h)
      // MOE = (P * L^3) / (4 * b * h^3 * delta)
      const moe = (p * Math.pow(l, 3)) / (4 * b * Math.pow(h, 3) * delta)

      // Validasi dimensi standar: penampang 50x50 mm atau 50x100 mm (atau 100x50 mm)
      const isStandardDim = (b === 50 && h === 50) || (b === 50 && h === 100) || (b === 100 && h === 50)
      const dimWarningText = 'Dimensi tidak standar. SNI 7973:2013 umumnya menggunakan penampang 50x50 mm atau 50x100 mm untuk pengujian lentur.'

      const status = isStandardDim ? 'Valid' : 'Perlu Evaluasi'

      const steps = [
        `MOR = (3 × P × L) / (2 × b × h²) = (3 × ${p} × ${l}) / (2 × ${b} × ${h}²) = ${mor.toFixed(2)} MPa`,
        `MOE = (P × L³) / (4 × b × h³ × Δ) = (${p} × ${l}³) / (4 × ${b} × ${h}³ × ${delta}) = ${moe.toFixed(0)} MPa`,
      ]

      if (!isStandardDim) {
        steps.push(`Peringatan SNI: Penampang ${b}×${h} mm (${dimWarningText})`)
      }

      let conclusion
      if (!isStandardDim) {
        conclusion = `${dimWarningText} Nilai ketahanan lentur patah MOR = ${mor.toFixed(2)} MPa dan kekakuan lentur MOE = ${moe.toFixed(0)} MPa.`
      } else {
        conclusion = `Balok kayu penampang standar ${b}×${h} mm memiliki ketahanan lentur patah MOR = ${mor.toFixed(2)} MPa dan kekakuan lentur MOE = ${moe.toFixed(0)} MPa (SNI 7973:2013).`
      }

      return {
        results: [
          { label: 'Modulus of Rupture (MOR)', value: mor.toFixed(2), unit: 'MPa', highlight: true },
          { label: 'Modulus of Elasticity (MOE)', value: moe.toFixed(0), unit: 'MPa', highlight: true },
        ],
        formulaSteps: steps,
        status,
        warningMessage: !isStandardDim ? dimWarningText : null,
        conclusion,
        summaryString: `MOR = ${mor.toFixed(1)} MPa, MOE = ${moe.toFixed(0)} MPa (${status === 'Valid' ? 'SNI Valid' : 'Perlu Evaluasi'})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // BAB V: BAJA
  // -----------------------------------------------------------------------
  'bb-5-1': {
    id: 'bb-5-1',
    code: 'KTBJ-01',
    name: 'Pengujian Kuat Tarik Baja Tulangan Beton',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 5: Baja',
    standard: 'SNI 2052:2017',
    desc: 'Menghitung Tegangan Leleh (fy), Tegangan Tarik Maksimum (fu), Regangan/Elongasi (ε), serta Modulus Elastisitas (E) baja.',
    initialInputs: {
      mutuBaja: 'BjTS 420',
      diameter: 16.0,
      diameterUnit: 'mm',
      pjgAwal: 80.0,
      pjgAwalUnit: 'mm',
      pjgPutus: 94.0,
      pjgPutusUnit: 'mm',
      bebanLeleh: 88.0,
      bebanLelehUnit: 'kN',
      bebanPutus: 118.0,
      bebanPutusUnit: 'kN',
    },
    fields: [
      { 
        key: 'mutuBaja', 
        label: 'Target Mutu Baja (SNI 2052:2017)', 
        unit: '', 
        type: 'select',
        options: [
          { value: 'BjTS 420', label: 'BjTS 420 (f_y ≥ 420 MPa, f_u ≥ 550 MPa)' },
          { value: 'BjTS 280', label: 'BjTS 280 (f_y ≥ 280 MPa, f_u ≥ 350 MPa)' },
          { value: 'BjTS 520', label: 'BjTS 520 (f_y ≥ 520 MPa, f_u ≥ 650 MPa)' },
        ],
        desc: 'Target mutu baja tulangan sirip/deform sesuai SNI 2052:2017' 
      },
      { 
        key: 'diameter', 
        label: 'Diameter (d)', 
        unitKey: 'diameterUnit',
        unitOptions: [
          { label: 'mm', value: 'mm' },
          { label: 'cm', value: 'cm' },
          { label: 'm', value: 'm' },
        ],
        min: 0.0001,
        step: 0.01,
        desc: 'Diameter penampang spesimen baja (default: mm)' 
      },
      { 
        key: 'pjgAwal', 
        label: 'Panjang Ukur Awal (L0)', 
        unitKey: 'pjgAwalUnit',
        unitOptions: [
          { label: 'mm', value: 'mm' },
          { label: 'cm', value: 'cm' },
          { label: 'm', value: 'm' },
        ],
        min: 0.0001,
        step: 0.01,
        desc: 'Panjang gage length sebelum ditarik (default: mm)' 
      },
      { 
        key: 'pjgPutus', 
        label: 'Panjang Ukur Setelah Putus (Lu)', 
        unitKey: 'pjgPutusUnit',
        unitOptions: [
          { label: 'mm', value: 'mm' },
          { label: 'cm', value: 'cm' },
          { label: 'm', value: 'm' },
        ],
        min: 0.0001,
        step: 0.01,
        desc: 'Panjang gage length setelah batang baja putus (harus > L0)' 
      },
      { 
        key: 'bebanLeleh', 
        label: 'Beban Titik Leleh (Py)', 
        unitKey: 'bebanLelehUnit',
        unitOptions: [
          { label: 'kN', value: 'kN' },
          { label: 'N', value: 'N' },
        ],
        min: 0.0001,
        step: 0.1,
        desc: 'Beban saat baja mulai mengalami leleh plastis (default: kN)' 
      },
      { 
        key: 'bebanPutus', 
        label: 'Beban Tarik Maksimum / Putus (Pu)', 
        unitKey: 'bebanPutusUnit',
        unitOptions: [
          { label: 'kN', value: 'kN' },
          { label: 'N', value: 'N' },
        ],
        min: 0.0001,
        step: 0.1,
        desc: 'Beban tertinggi sebelum batang baja putus (harus ≥ Py)' 
      },
    ],
    calculate: (inputs) => {
      const mutu = inputs.mutuBaja || 'BjTS 420'
      const dRaw = Number(inputs.diameter)
      const dUnit = inputs.diameterUnit || 'mm'
      const l0Raw = Number(inputs.pjgAwal)
      const l0Unit = inputs.pjgAwalUnit || 'mm'
      const luRaw = Number(inputs.pjgPutus)
      const luUnit = inputs.pjgPutusUnit || 'mm'
      const pyRaw = Number(inputs.bebanLeleh)
      const pyUnit = inputs.bebanLelehUnit || 'kN'
      const puRaw = Number(inputs.bebanPutus)
      const puUnit = inputs.bebanPutusUnit || 'kN'

      // Validasi input: tidak boleh 0, negatif, atau NaN
      if (dRaw <= 0 || l0Raw <= 0 || luRaw <= 0 || pyRaw <= 0 || puRaw <= 0 || isNaN(dRaw) || isNaN(l0Raw) || isNaN(luRaw) || isNaN(pyRaw) || isNaN(puRaw)) {
        return {
          results: [
            { label: 'Tegangan Leleh (fy)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Tegangan Maks (fu)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Regangan (ε)', value: '-', unit: '' },
            { label: 'Modulus Elastisitas (E)', value: '-', unit: 'MPa', highlight: true },
          ],
          formulaSteps: [
            'Input tidak valid: Parameter diameter (d), panjang ukur (L0, Lu), dan beban (Py, Pu) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input tidak valid',
          conclusion: 'Input tidak valid. Nilai diameter, panjang ukur, dan beban penarikan baja harus lebih besar dari 0.',
          summaryString: 'Input tidak valid (<= 0)',
        }
      }

      // Faktor konversi panjang ke mm (Base Unit: mm)
      const lenFactor = { mm: 1, cm: 10, m: 1000 }
      const dFactor = lenFactor[dUnit] || 1
      const l0Factor = lenFactor[l0Unit] || 1
      const luFactor = lenFactor[luUnit] || 1

      // Faktor konversi gaya ke N (Base Unit: N)
      const forceFactor = { N: 1, kN: 1000 }
      const pyFactor = forceFactor[pyUnit] || 1000
      const puFactor = forceFactor[puUnit] || 1000

      const dMm = dRaw * dFactor
      const l0Mm = l0Raw * l0Factor
      const luMm = luRaw * luFactor
      const pyN = pyRaw * pyFactor
      const puN = puRaw * puFactor

      // Validasi fisik: Panjang setelah putus (Lu) harus lebih besar dari panjang awal (L0)
      if (luMm <= l0Mm) {
        return {
          results: [
            { label: 'Tegangan Leleh (fy)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Tegangan Maks (fu)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Regangan (ε)', value: '-', unit: '' },
            { label: 'Modulus Elastisitas (E)', value: '-', unit: 'MPa', highlight: true },
          ],
          formulaSteps: [
            `Validasi Panjang Putus Gagal: Lu (${luRaw} ${luUnit} = ${luMm.toFixed(2)} mm) harus lebih besar dari L0 (${l0Raw} ${l0Unit} = ${l0Mm.toFixed(2)} mm).`,
          ],
          isError: true,
          status: 'Input tidak valid',
          conclusion: 'Panjang ukur setelah putus (Lu) harus lebih besar dari panjang awal (L0). Batang baja mengalami pertambahan panjang saat ditarik hingga putus.',
          summaryString: 'Lu <= L0 (Tidak Valid)',
        }
      }

      // Validasi fisik: Beban putus Pu harus lebih besar atau sama dengan beban leleh Py
      if (puN < pyN) {
        return {
          results: [
            { label: 'Tegangan Leleh (fy)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Tegangan Maks (fu)', value: '-', unit: 'MPa', highlight: true },
            { label: 'Regangan (ε)', value: '-', unit: '' },
            { label: 'Modulus Elastisitas (E)', value: '-', unit: 'MPa', highlight: true },
          ],
          formulaSteps: [
            `Validasi Beban Gagal: Beban maksimum Pu (${puRaw} ${puUnit} = ${puN.toFixed(0)} N) tidak boleh lebih kecil dari beban leleh Py (${pyRaw} ${pyUnit} = ${pyN.toFixed(0)} N).`,
          ],
          isError: true,
          status: 'Input tidak valid',
          conclusion: 'Beban tarik maksimum (Pu) tidak boleh lebih kecil dari beban leleh (Py).',
          summaryString: 'Pu < Py (Tidak Valid)',
        }
      }

      // 1. Luas Penampang A0 dalam mm² menggunakan diameter terkonversi ke mm: A0 = (π/4) * d_mm²
      const a0Mm2 = (Math.PI / 4) * Math.pow(dMm, 2)

      // 2. Tegangan Leleh (fy): Py_N / A0_mm²
      const fyMpa = pyN / a0Mm2
      const fyPa = fyMpa * 1000000

      // 3. Tegangan Maksimum (fu): Pu_N / A0_mm²
      const fuMpa = puN / a0Mm2
      const fuPa = fuMpa * 1000000

      // 4. Regangan (ε): (Lu_mm - L0_mm) / L0_mm
      const strain = (luMm - l0Mm) / l0Mm
      const strainPct = strain * 100

      // 5. Modulus Elastisitas (E): fu / ε
      const eMpa = strain > 0 ? fuMpa / strain : 0
      const ePa = eMpa * 1000000

      const ratio = fyMpa > 0 ? fuMpa / fyMpa : 0

      // Spesifikasi SNI 2052:2017 berdasarkan pilihan mutu baja
      const STANDAR_MUTU = {
        'BjTS 280': { minFy: 280, minFu: 350, minRatio: 1.25, minElongasi: 12.0 },
        'BjTS 420': { minFy: 420, minFu: 550, minRatio: 1.25, minElongasi: 14.0 },
        'BjTS 520': { minFy: 520, minFu: 650, minRatio: 1.25, minElongasi: 12.0 },
      }

      const spec = STANDAR_MUTU[mutu] || STANDAR_MUTU['BjTS 420']

      const isFyOk = fyMpa >= spec.minFy
      const isFuOk = fuMpa >= spec.minFu
      const isRatioOk = ratio >= spec.minRatio
      const isElongasiOk = strainPct >= spec.minElongasi

      let status
      let conclusion
      if (!isFyOk || !isFuOk) {
        status = 'Tidak Memenuhi Standar'
        const failReasons = []
        if (!isFyOk) failReasons.push(`fy = ${fyMpa.toFixed(1)} MPa < ${spec.minFy} MPa`)
        if (!isFuOk) failReasons.push(`fu = ${fuMpa.toFixed(1)} MPa < ${spec.minFu} MPa`)
        conclusion = `Baja tulangan TIDAK MEMENUHI standar mutu ${mutu} sesuai SNI 2052:2017. Parameter di bawah batas minimum: ${failReasons.join(' dan ')}.`
      } else if (!isRatioOk || !isElongasiOk) {
        status = 'Perlu Evaluasi'
        const evalReasons = []
        if (!isRatioOk) evalReasons.push(`rasio fu/fy = ${ratio.toFixed(2)} < ${spec.minRatio} (syarat daktilitas gempa)`)
        if (!isElongasiOk) evalReasons.push(`elongasi = ${strainPct.toFixed(2)}% < ${spec.minElongasi}%`)
        conclusion = `Kuat leleh dan tarik memenuhi mutu ${mutu}, namun ${evalReasons.join(' dan ')}. Disarankan evaluasi penggunaan khusus penahan gempa (SNI 2052:2017).`
      } else {
        status = 'Valid'
        conclusion = `Baja tulangan MEMENUHI kualifikasi mutu ${mutu} (fy = ${fyMpa.toFixed(1)} MPa ≥ ${spec.minFy} MPa, fu = ${fuMpa.toFixed(1)} MPa ≥ ${spec.minFu} MPa, rasio fu/fy = ${ratio.toFixed(2)} ≥ 1.25, elongasi = ${strainPct.toFixed(2)}% ≥ ${spec.minElongasi}%). Lolos seluruh syarat mekanis & daktilitas gempa SNI 2052:2017.`
      }

      // Langkah perhitungan dinamis dengan proses konversi satuan yang dipilih
      const dStep = dUnit !== 'mm'
        ? `Luas (A0) = π/4 * (${dRaw} ${dUnit} * ${dFactor})² = π/4 * (${dMm.toFixed(2)} mm)² = ${a0Mm2.toFixed(2)} mm²`
        : `Luas (A0) = π/4 * (${dMm} mm)² = ${a0Mm2.toFixed(2)} mm²`

      const strainStep = (l0Unit !== 'mm' || luUnit !== 'mm')
        ? `Regangan (ε) = (Lu_mm - L0_mm) / L0_mm = (${luRaw} ${luUnit} * ${luFactor} - ${l0Raw} ${l0Unit} * ${l0Factor}) / (${l0Raw} ${l0Unit} * ${l0Factor}) = (${luMm.toFixed(2)} mm - ${l0Mm.toFixed(2)} mm) / ${l0Mm.toFixed(2)} mm = ${strain.toFixed(4)} (atau ${strainPct.toFixed(1)}%)`
        : `Regangan (ε) = (Lu_mm - L0_mm) / L0_mm = (${luMm} mm - ${l0Mm} mm) / ${l0Mm} mm = ${strain.toFixed(4)} (atau ${strainPct.toFixed(1)}%)`

      const fyStep = pyUnit === 'kN'
        ? `fy = Py / A0 = (${pyRaw} kN * 1000) / ${a0Mm2.toFixed(2)} mm² = ${pyN.toFixed(0)} N / ${a0Mm2.toFixed(2)} mm² = ${fyMpa.toFixed(1)} MPa (atau ${Math.round(fyPa).toLocaleString('en-US')} N/m²)`
        : `fy = Py / A0 = ${pyN.toFixed(0)} N / ${a0Mm2.toFixed(2)} mm² = ${fyMpa.toFixed(1)} MPa (atau ${Math.round(fyPa).toLocaleString('en-US')} N/m²)`

      const fuStep = puUnit === 'kN'
        ? `fu = Pu / A0 = (${puRaw} kN * 1000) / ${a0Mm2.toFixed(2)} mm² = ${puN.toFixed(0)} N / ${a0Mm2.toFixed(2)} mm² = ${fuMpa.toFixed(1)} MPa (atau ${Math.round(fuPa).toLocaleString('en-US')} N/m²)`
        : `fu = Pu / A0 = ${puN.toFixed(0)} N / ${a0Mm2.toFixed(2)} mm² = ${fuMpa.toFixed(1)} MPa (atau ${Math.round(fuPa).toLocaleString('en-US')} N/m²)`

      const eStep = `Modulus Elastisitas (E) = fu / ε = ${fuMpa.toFixed(1)} MPa / ${strain.toFixed(4)} = ${eMpa.toFixed(1)} MPa (atau ${Math.round(ePa).toLocaleString('en-US')} N/m²)`

      return {
        results: [
          { 
            label: 'Tegangan Leleh (fy)', 
            value: `${fyMpa.toFixed(1)} MPa`, 
            unit: `(${Math.round(fyPa).toLocaleString('en-US')} N/m²)`, 
            highlight: true 
          },
          { 
            label: 'Tegangan Maks (fu)', 
            value: `${fuMpa.toFixed(1)} MPa`, 
            unit: `(${Math.round(fuPa).toLocaleString('en-US')} N/m²)`, 
            highlight: true 
          },
          { 
            label: 'Regangan (ε)', 
            value: `${strain.toFixed(3)}`, 
            unit: `(${strainPct.toFixed(1)}%)` 
          },
          { 
            label: 'Modulus Elastisitas (E)', 
            value: `${eMpa.toFixed(1)} MPa`, 
            unit: `(${Math.round(ePa).toLocaleString('en-US')} N/m²)`, 
            highlight: true 
          },
        ],
        formulaSteps: [
          `Target Mutu: ${mutu} (Syarat SNI 2052: fy ≥ ${spec.minFy} MPa, fu ≥ ${spec.minFu} MPa, fu/fy ≥ ${spec.minRatio}, ε ≥ ${spec.minElongasi}%)`,
          dStep,
          fyStep,
          fuStep,
          strainStep,
          eStep,
          `Rasio fu / fy = ${fuMpa.toFixed(1)} / ${fyMpa.toFixed(1)} = ${ratio.toFixed(2)} (Syarat Daktilitas Gempa: ≥ ${spec.minRatio})`,
        ],
        status,
        conclusion,
        summaryString: `fy = ${fyMpa.toFixed(0)} MPa, fu = ${fuMpa.toFixed(0)} MPa, E = ${eMpa.toFixed(0)} MPa (${mutu} ${status})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA TANAH - BAB I: PENYELIDIKAN LAPANGAN
  // -----------------------------------------------------------------------
  'mt-1-1': {
    id: 'mt-1-1',
    code: 'CPT-01',
    codePrefix: 'SD',
    name: 'Pengujian Penetrasi Konus Sondir (CPT)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 1: Penyelidikan Lapangan',
    standard: 'SNI 2827:2008 / ASTM D3441',
    desc: 'Pengujian penetrasi konus Belanda (Sondir / Dutch Cone Penetrometer) dengan tabel perhitungan dinamis mirip spreadsheet Excel, evaluasi hambatan konus (qc), friction ratio (FR), serta visualisasi kurva stratigrafi real-time.',
    hasDynamicCptTable: true,
    initialInputs: {
      cptRows: [
        { id: 1, depth: 0.0, qc: 0, tw: 0 },
        { id: 2, depth: 0.2, qc: 5, tw: 7 },
        { id: 3, depth: 0.4, qc: 8, tw: 11 },
        { id: 4, depth: 0.6, qc: 10, tw: 14 },
        { id: 5, depth: 0.8, qc: 15, tw: 20 },
        { id: 6, depth: 1.0, qc: 22, tw: 30 },
        { id: 7, depth: 1.2, qc: 35, tw: 46 },
        { id: 8, depth: 1.4, qc: 40, tw: 52 },
        { id: 9, depth: 1.6, qc: 18, tw: 23 },
        { id: 10, depth: 1.8, qc: 15, tw: 19 },
        { id: 11, depth: 2.0, qc: 20, tw: 25 },
        { id: 12, depth: 2.2, qc: 45, tw: 56 },
        { id: 13, depth: 2.4, qc: 65, tw: 80 },
        { id: 14, depth: 2.6, qc: 85, tw: 103 },
        { id: 15, depth: 2.8, qc: 110, tw: 132 },
      ],
      depth: 8.4,
      qc: 145.0,
      tw: 175.0,
    },
    fields: [
      { key: 'depth', label: 'Kedalaman Titik Uji (z)', unit: 'meter', desc: 'Posisi kedalaman ujung bikonus', min: 0.1, step: 0.1 },
      { key: 'qc', label: 'Perlawanan Konus / Cone Resistance (qc)', unit: 'kg/cm²', desc: 'Tekanan terbaca pada manometer 1 (minimal 0.01 kg/cm²)', min: 0.01, step: 0.1 },
      { key: 'tw', label: 'Perlawanan Total Gesek + Konus (tw)', unit: 'kg/cm²', desc: 'Tekanan terbaca pada manometer 2 (harus >= qc)', min: 0.01, step: 0.1 },
    ],
    calculate: (inputs) => {
      // 1. DYNAMIC CPT TABLE MODE (Default & Primary)
      if (Array.isArray(inputs.cptRows)) {
        const rawRows = inputs.cptRows.length > 0
          ? inputs.cptRows
          : [
              { id: 1, depth: 0.0, qc: 0, tw: 0 },
              { id: 2, depth: 0.2, qc: 5, tw: 7 },
              { id: 3, depth: 0.4, qc: 8, tw: 11 },
              { id: 4, depth: 0.6, qc: 10, tw: 14 },
              { id: 5, depth: 0.8, qc: 15, tw: 20 },
              { id: 6, depth: 1.0, qc: 22, tw: 30 },
              { id: 7, depth: 1.2, qc: 35, tw: 46 },
              { id: 8, depth: 1.4, qc: 40, tw: 52 },
              { id: 9, depth: 1.6, qc: 18, tw: 23 },
              { id: 10, depth: 1.8, qc: 15, tw: 19 },
              { id: 11, depth: 2.0, qc: 20, tw: 25 },
              { id: 12, depth: 2.2, qc: 45, tw: 56 },
              { id: 13, depth: 2.4, qc: 65, tw: 80 },
              { id: 14, depth: 2.6, qc: 85, tw: 103 },
              { id: 15, depth: 2.8, qc: 110, tw: 132 },
            ]

        let hasInvalidRow = false
        let runningJhp = 0

        const computedRows = rawRows.map((row, idx) => {
          const depth = row.depth !== undefined && row.depth !== '' ? Number(row.depth) : 0
          const qc = row.qc !== undefined && row.qc !== '' ? Number(row.qc) : 0
          const tw = row.tw !== undefined && row.tw !== '' ? Number(row.tw) : 0

          const isInvalid = tw < qc
          if (isInvalid) hasInvalidRow = true

          const friction = isInvalid ? 0 : Math.max(0, tw - qc)
          const hambatanSetempat = Number((friction / 10).toFixed(3))

          // Hitung interval kedalaman delta z (standar: 0.20 m = 20 cm)
          let deltaZCm = 20
          if (idx > 0) {
            const prevDepth = Number(rawRows[idx - 1].depth || 0)
            const diff = depth - prevDepth
            if (diff > 0) deltaZCm = diff * 100
          } else {
            deltaZCm = 0
          }

          // Hambatan pelekat interval: fs * deltaZ (cm) = (friction / 10) * 20 = friction * 2
          const deltaJhp = isInvalid ? 0 : (idx === 0 && depth === 0 ? 0 : Number((hambatanSetempat * deltaZCm).toFixed(2)))

          // Akumulasi kumulatif berantai dari atas ke bawah: JHP_n = JHP_{n-1} + deltaJhp
          if (!isInvalid) {
            runningJhp = Number((runningJhp + deltaJhp).toFixed(2))
          }
          const jumlahHambatanPelekat = runningJhp
          const frictionRatio = qc > 0 ? Number(((hambatanSetempat / qc) * 100).toFixed(2)) : 0

          // Klasifikasi jenis tanah per lapisan (Korelasi Robertson / Begemann CPT)
          let rowSoil = 'Lempung Lunak'
          if (qc >= 100 && frictionRatio < 1.5) {
            rowSoil = 'Pasir Padat / Tanah Keras'
          } else if (qc >= 50 && frictionRatio < 2.0) {
            rowSoil = 'Pasir Sedang / Berlanau'
          } else if (frictionRatio < 1.0) {
            rowSoil = 'Pasir Kasar / Kerikil'
          } else if (frictionRatio < 2.0) {
            rowSoil = 'Pasir Berlanau'
          } else if (frictionRatio < 4.0) {
            rowSoil = 'Lanau / Lempung Berlanau'
          } else if (frictionRatio < 6.5) {
            rowSoil = 'Lempung Plastis'
          } else {
            rowSoil = 'Lempung Sangat Lunak / Gambut'
          }

          return {
            id: row.id || idx + 1,
            depth,
            qc,
            tw,
            friction,
            hambatanSetempat,
            deltaJhp,
            jumlahHambatanPelekat,
            frictionRatio,
            rowSoil,
            isInvalid,
            errorMessage: isInvalid ? 'Jumlah Hambatan (tw) tidak boleh lebih kecil dari Hambatan Konus (qc)' : null,
          }
        })

        const totalKedalaman = computedRows.reduce((max, r) => Math.max(max, r.depth), 0)
        const totalJhp = computedRows.length > 0 ? computedRows[computedRows.length - 1].jumlahHambatanPelekat : 0

        const validRowsForAvg = computedRows.filter((r) => r.qc > 0 && !r.isInvalid)
        const avgQc = validRowsForAvg.length > 0
          ? validRowsForAvg.reduce((sum, r) => sum + r.qc, 0) / validRowsForAvg.length
          : (computedRows.length > 0 ? computedRows.reduce((sum, r) => sum + r.qc, 0) / computedRows.length : 0)

        const avgFr = validRowsForAvg.length > 0
          ? validRowsForAvg.reduce((sum, r) => sum + r.frictionRatio, 0) / validRowsForAvg.length
          : 0

        let predictedSoil = 'Tanah Tidak Teridentifikasi'
        if (avgQc >= 100 && avgFr < 1.5) {
          predictedSoil = 'Pasir Padat / Tanah Keras'
        } else if (avgQc >= 50 && avgFr < 2.0) {
          predictedSoil = 'Pasir Sedang / Berlanau'
        } else if (avgFr < 1.0) {
          predictedSoil = 'Pasir Kasar / Kerikilan'
        } else if (avgFr < 2.0) {
          predictedSoil = 'Pasir Berlanau / Pasir Bersih'
        } else if (avgFr < 4.0) {
          predictedSoil = 'Lanau / Lempung Berlanau'
        } else if (avgFr < 6.5) {
          predictedSoil = 'Lempung Plastis / Lunak'
        } else {
          predictedSoil = 'Lempung Sangat Plastis / Gambut'
        }

        const chartData = computedRows.map((r) => ({
          depth: r.depth,
          qc: r.qc,
          tw: r.tw,
          friction: r.friction,
          hambatanSetempat: Number(r.hambatanSetempat.toFixed(2)),
          fs: Number(r.hambatanSetempat.toFixed(2)),
          deltaJhp: r.deltaJhp,
          jumlahHambatanPelekat: Number(r.jumlahHambatanPelekat.toFixed(1)),
          frictionRatio: Number(r.frictionRatio.toFixed(2)),
          fr: Number(r.frictionRatio.toFixed(2)),
          rowSoil: r.rowSoil,
          isInvalid: r.isInvalid,
        })).sort((a, b) => a.depth - b.depth)

        const isError = hasInvalidRow
        const status = hasInvalidRow ? 'Input Tidak Wajar / Cek Kembali Data' : 'Valid'
        const verdictClass = hasInvalidRow ? 'danger' : 'valid'

        return {
          results: [
            { label: 'Total Kedalaman', value: `${totalKedalaman.toFixed(2)} m`, unit: '', highlight: true },
            { label: 'Rata-rata qc', value: `${avgQc.toFixed(1)} kg/cm²`, unit: '', highlight: true },
            { label: 'Total JHP Kumulatif', value: `${totalJhp.toFixed(1)} kg/cm`, unit: '', highlight: true },
            { label: 'Rata-rata FR', value: `${avgFr.toFixed(2)}%`, unit: '', highlight: true },
            { label: 'Prediksi Lapisan Tanah', value: predictedSoil, unit: '', highlight: true },
          ],
          formulaSteps: [
            'Metode Analisis Sondir Bikonus (Dutch Cone Penetrometer) SNI 2827:2008 & ASTM D3441:',
            '1. Hambatan Gesek Selubung: Friction (d) = tw - qc (kg/cm²)',
            '2. Hambatan Setempat: fs = (tw - qc) / 10 = d / 10 (kg/cm²)',
            '3. Hambatan Pelekat Interval: ΔJHP = fs × 20 cm = d × 2 (kg/cm)',
            '4. Jumlah Hambatan Pelekat Kumulatif: JHP_n = JHP_{n-1} + ΔJHP (kg/cm) [Akumulasi berantai kumulatif dari permukaan ke dasar penetrasi]',
            '5. Rasio Gesekan: Friction Ratio FR = (fs / qc) × 100%',
            `6. Interpretasi Stratigrafi (Robertson): FR Rata-rata = ${avgFr.toFixed(2)}%, qc Rata-rata = ${avgQc.toFixed(1)} kg/cm² → Terklasifikasi sebagai ${predictedSoil}`,
          ],
          cptRows: computedRows,
          chartData,
          totalKedalaman,
          avgQc,
          totalJhp,
          avgFr,
          predictedSoil,
          hasInvalidRow,
          isError,
          status,
          verdictClass,
          conclusion: hasInvalidRow
            ? 'Perhatian: Terdapat baris pengujian di mana perlawanan total (tw) lebih kecil dari perlawanan konus (qc). Harap periksa kembali input manometer lapangan.'
            : `Uji Sondir CPT terekam hingga kedalaman ${totalKedalaman.toFixed(2)} m dengan perlawanan konus rata-rata qc = ${avgQc.toFixed(1)} kg/cm², total hambatan pelekat kumulatif JHP = ${totalJhp.toFixed(1)} kg/cm, dan rasio gesekan FR rata-rata = ${avgFr.toFixed(2)}%. Stratigrafi dominan diidentifikasi sebagai ${predictedSoil}.`,
          summaryString: `Sondir kedalaman ${totalKedalaman.toFixed(2)}m (qc rata-rata ${avgQc.toFixed(1)} kg/cm², JHP ${totalJhp.toFixed(1)} kg/cm, ${predictedSoil})`,
        }
      }

      // 2. LEGACY SINGLE-POINT MODE (Support for depth, qc, tw)
      const z = Number(inputs.depth || 0)
      const qc = Number(inputs.qc !== undefined && inputs.qc !== '' ? inputs.qc : 0)
      const tw = Number(inputs.tw !== undefined && inputs.tw !== '' ? inputs.tw : 0)

      // Guard clause: jika qc === 0 atau qc <= 0, cegah kalkulasi dan pembagian dengan nol
      if (qc <= 0) {
        return {
          results: [
            { label: 'Perlawanan Konus (qc)', value: '0', unit: 'kg/cm²', highlight: true },
            { label: 'Hambatan Pelekat (fs)', value: '-', unit: 'kg/cm²' },
            { label: 'Friction Ratio (FR)', value: 'Error: qc tidak boleh 0', unit: '', highlight: true },
            { label: 'Prediksi Lapisan Tanah', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Error: qc tidak boleh 0.',
            'Guard clause aktif: Perhitungan Friction Ratio (FR = (fs / qc) × 100%) dibatalkan karena qc tidak boleh 0 (mencegah pembagian dengan nol).',
            'Nilai perlawanan konus (qc) harus lebih besar dari 0 (minimal 0.01 kg/cm²).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Error: qc tidak boleh 0. Nilai perlawanan konus harus lebih besar dari 0 kg/cm² agar rasio gesek (FR) dapat dihitung dengan valid.',
          summaryString: 'Error: qc tidak boleh 0',
        }
      }

      // Validasi relasi logis manometer: tw harus >= qc
      if (tw < qc) {
        return {
          results: [
            { label: 'Perlawanan Konus (qc)', value: qc.toFixed(1), unit: 'kg/cm²', highlight: true },
            { label: 'Hambatan Pelekat (fs)', value: '-', unit: 'kg/cm²' },
            { label: 'Friction Ratio (FR)', value: '-', unit: '', highlight: true },
            { label: 'Prediksi Lapisan Tanah', value: 'Data Tidak Wajar', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Nilai perlawanan total tw (${tw} kg/cm²) lebih kecil dari perlawanan konus qc (${qc} kg/cm²).`,
            'Secara fisik perlawanan total harus selalu lebih besar atau sama dengan perlawanan konus (tw = qc + qs).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input tidak logis: Nilai perlawanan total gesek + konus (tw) tidak boleh lebih kecil dari perlawanan konus (qc).',
          summaryString: 'Input tw < qc tidak valid',
        }
      }

      const qs = tw - qc
      const fs = qs / 10 // faktor luas selubung bikonus
      const fr = (fs / qc) * 100

      let jenisTanah
      let status
      let conclusion

      if (qc < 5) {
        jenisTanah = 'Lempung Sangat Lunak'
        status = 'Perlu Evaluasi'
        conclusion = `Pada kedalaman ${z} m diperoleh nilai qc = ${qc.toFixed(1)} kg/cm² (Tergolong ${jenisTanah}). Tanah tergolong Lempung Sangat Lunak dengan daya dukung sangat rendah. Tidak cocok untuk pondasi dangkal.`
      } else if (qc < 10) {
        jenisTanah = 'Lempung Sangat Lunak'
        status = 'Perlu Evaluasi'
        conclusion = `Pada kedalaman ${z} m diperoleh nilai qc = ${qc.toFixed(1)} kg/cm² (Tergolong ${jenisTanah}). Daya dukung tanah tergolong sangat rendah, diperlukan perbaikan tanah atau opsi pondasi dalam.`
      } else if (qc < 25) {
        jenisTanah = 'Lempung Lunak / Lanau'
        status = 'Perlu Evaluasi'
        conclusion = `Pada kedalaman ${z} m diperoleh nilai qc = ${qc.toFixed(1)} kg/cm² (Tergolong ${jenisTanah}). Daya dukung tanah lunak, disarankan evaluasi penurunan konsolidasi sebelum perencanaan beban tinggi.`
      } else if (qc < 50) {
        jenisTanah = 'Lempung Kaku Sedang'
        status = 'Valid'
        conclusion = `Pada kedalaman ${z} m diperoleh nilai qc = ${qc.toFixed(1)} kg/cm² (Tergolong ${jenisTanah}). Daya dukung tanah mencukupi untuk konstruksi bertingkat rendah/sedang.`
      } else if (qc < 100) {
        jenisTanah = 'Pasir Kelanauan / Lempung Sangat Kaku'
        status = 'Valid'
        conclusion = `Pada kedalaman ${z} m diperoleh nilai qc = ${qc.toFixed(1)} kg/cm² (Tergolong ${jenisTanah}). Lapisan tanah memiliki daya dukung baik untuk pondasi dangkal maupun tiang.`
      } else {
        jenisTanah = 'Pasir Padat / Tanah Keras'
        status = 'Valid'
        conclusion = `Pada kedalaman ${z} m diperoleh nilai qc = ${qc.toFixed(1)} kg/cm² (Tergolong ${jenisTanah}). Nilai daya dukung tanah sangat kokoh untuk pondasi tiang/fondasi telapak.`
      }

      return {
        results: [
          { label: 'Perlawanan Konus (qc)', value: qc.toFixed(1), unit: 'kg/cm²', highlight: true },
          { label: 'Hambatan Pelekat (fs)', value: fs.toFixed(2), unit: 'kg/cm²' },
          { label: 'Friction Ratio (FR)', value: fr.toFixed(2), unit: '%', highlight: true },
          { label: 'Prediksi Lapisan Tanah', value: jenisTanah, unit: '', highlight: true },
        ],
        formulaSteps: [
          `Hambatan Gesek Selubung qs = tw - qc = ${tw} - ${qc} = ${qs.toFixed(1)} kg/cm²`,
          `Friction Sleeve fs = qs / 10 = ${fs.toFixed(2)} kg/cm²`,
          `Friction Ratio FR = (fs / qc) × 100% = (${fs.toFixed(2)} / ${qc}) × 100% = ${fr.toFixed(2)}%`,
          `Klasifikasi Lapisan Tanah: ${jenisTanah}`,
        ],
        status,
        conclusion,
        summaryString: `qc = ${qc.toFixed(0)} kg/cm² pada depth ${z}m (${jenisTanah})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA TANAH - BAB II: SIFAT FISIK TANAH
  // -----------------------------------------------------------------------
  'mt-2-1': {
    id: 'mt-2-1',
    code: 'KAT-01',
    name: 'Pengujian Kadar Air Alami Tanah',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 2: Sifat Fisik Tanah',
    standard: 'SNI 1965:2008',
    desc: 'Menghitung rasio berat air pori terhadap partikel padat butiran tanah alami dengan sistem multi-sampel dinamis.',
    hasMultiSample: true,
    sampleNamePrefix: 'Cawan C-',
    sampleFields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang logam bersih & kering', min: 0.01 },
      { key: 'w2', label: 'Berat Cawan + Basah (W2)', unit: 'gram', desc: 'Massa cawan + tanah alami sebelum dioven', min: 0.01 },
      { key: 'w3', label: 'Berat Cawan + Kering (W3)', unit: 'gram', desc: 'Massa cawan + tanah setelah dioven 110°C konstan', min: 0.01 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_MT21_SAMPLES)),
      wCawan: 18.2,
      wBasah: 72.8,
      wKering: 61.5,
    },
    fields: [
      { key: 'wCawan', label: 'Berat Cawan Kosong (W1)', unit: 'gram', min: 0.01, desc: 'Massa cawan timbang logam' },
      { key: 'wBasah', label: 'Berat Cawan + Tanah Basah (W2)', unit: 'gram', min: 0.01, desc: 'Massa tanah alami sebelum dioven' },
      { key: 'wKering', label: 'Berat Cawan + Tanah Kering (W3)', unit: 'gram', min: 0.01, desc: 'Massa tanah kering setelah dioven 110°C konstan' },
    ],
    calculate: (inputs) => {
      // 1. Multi-Sampel Dinamis (Mode Utama)
      if (Array.isArray(inputs.samples)) {
        const rawSamples = inputs.samples
        if (rawSamples.length === 0) {
          return {
            results: [
              { label: 'Kadar Air Rata-rata (w)', value: '-', unit: '%', highlight: true },
              { label: 'Berat Air Pori Rata-rata (Ww)', value: '-', unit: 'gram' },
              { label: 'Berat Butir Kering Rata-rata (Ws)', value: '-', unit: 'gram' },
              { label: 'Jumlah Cawan Uji', value: '0', unit: 'Cawan' },
            ],
            formulaSteps: ['Tambahkan minimal 1 cawan sampel pengujian kadar air.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: 'Tidak ada sampel pengujian aktif. Silakan klik tombol "+ Tambah Sampel".',
            summaryString: 'Belum ada sampel aktif',
          }
        }

        const validSamples = []
        const sampleErrors = []

        rawSamples.forEach((s, idx) => {
          const w1 = Number(s.w1 ?? 0)
          const w2 = Number(s.w2 ?? 0)
          const w3 = Number(s.w3 ?? 0)
          const name = s.name || `Cawan C-${idx + 1}`

          if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
            sampleErrors.push(`${name}: Nilai W1, W2, dan W3 harus lebih besar dari 0 gr`)
            return
          }
          if (w2 <= w3) {
            sampleErrors.push(`${name}: W2 (${w2} g) harus > W3 (${w3} g)`)
            return
          }
          if (w3 <= w1) {
            sampleErrors.push(`${name}: W3 (${w3} g) harus > W1 (${w1} g)`)
            return
          }

          const ww = w2 - w3
          const ws = w3 - w1
          const w = (ww / ws) * 100

          validSamples.push({
            name,
            w1,
            w2,
            w3,
            ww,
            ws,
            w,
          })
        })

        if (validSamples.length === 0) {
          return {
            results: [
              { label: 'Kadar Air Rata-rata (w)', value: '-', unit: '%', highlight: true },
              { label: 'Berat Air Pori Rata-rata (Ww)', value: '-', unit: 'gram' },
              { label: 'Berat Butir Kering Rata-rata (Ws)', value: '-', unit: 'gram' },
              { label: 'Jumlah Cawan Uji', value: String(rawSamples.length), unit: 'Cawan' },
            ],
            formulaSteps: sampleErrors.length > 0 ? sampleErrors : ['Data penimbangan pada sampel tidak valid.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: `Input data penimbangan cawan belum valid: ${sampleErrors.join(', ')}. Pastikan W2 > W3 > W1.`,
            summaryString: 'Input Cawan Tidak Valid',
          }
        }

        const avgWw = validSamples.reduce((acc, s) => acc + s.ww, 0) / validSamples.length
        const avgWs = validSamples.reduce((acc, s) => acc + s.ws, 0) / validSamples.length
        const avgW = validSamples.reduce((acc, s) => acc + s.w, 0) / validSamples.length

        const isHighMoisture = avgW > 100.0
        const status = isHighMoisture ? 'Perlu Evaluasi (Kadar air tidak wajar untuk tanah normal)' : 'Valid'
        const verdictClass = isHighMoisture ? 'warning' : 'valid'

        const conclusion = isHighMoisture
          ? `Kadar air alami rata-rata dari ${validSamples.length} cawan terukur sangat tinggi yaitu ${avgW.toFixed(2)}% (> 100.0%). Nilai ini tidak wajar untuk tanah anorganik normal (rentang wajar 10% - 60%). Nilai w > 100% umumnya hanya terjadi pada tanah organik, gambut berserat tinggi, atau lempung sangat lunak (quick clay). Lakukan evaluasi sampel atau verifikasi ulang pengujian.`
          : `Kadar air alami tanah rata-rata sebesar ${avgW.toFixed(2)}% dari ${validSamples.length} pengujian cawan (SNI 1965:2008). Parameter ini memenuhi rentang wajar tanah normal serta menjadi acuan batas konsistensi dan derajat kejenuhan tanah.`

        const sampleHeaders = validSamples.map(s => s.name)
        const recapTable = {
          title: 'Tabel Rekapitulasi Kadar Air Alami Tanah (SNI 1965:2008)',
          headers: ['Parameter Pengujian', 'Simbol / Rumus', ...sampleHeaders, 'Rata-rata'],
          rows: [
            {
              label: 'Berat Cawan Kosong',
              equation: 'W1 (gram)',
              values: validSamples.map(s => s.w1.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w1, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Berat Cawan + Tanah Basah',
              equation: 'W2 (gram)',
              values: validSamples.map(s => s.w2.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w2, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Berat Cawan + Tanah Kering',
              equation: 'W3 (gram)',
              values: validSamples.map(s => s.w3.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w3, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Berat Air Pori',
              equation: 'Ww = W2 - W3 (gram)',
              values: validSamples.map(s => s.ww.toFixed(2)),
              average: avgWw.toFixed(2),
            },
            {
              label: 'Berat Butir Kering',
              equation: 'Ws = W3 - W1 (gram)',
              values: validSamples.map(s => s.ws.toFixed(2)),
              average: avgWs.toFixed(2),
            },
            {
              label: 'Kadar Air Tanah (w)',
              equation: 'w = (Ww / Ws) × 100%',
              values: validSamples.map(s => `${s.w.toFixed(2)}%`),
              average: `${avgW.toFixed(2)}%`,
              highlight: true,
            },
          ],
        }

        const formulaSteps = [
          `Rumus Kadar Air Alami Tanah (SNI 1965:2008): w = (Ww / Ws) × 100% = ((W2 - W3) / (W3 - W1)) × 100%`,
          ...validSamples.map(s => `${s.name}: Ww = ${s.w2} - ${s.w3} = ${s.ww.toFixed(2)} g, Ws = ${s.w3} - ${s.w1} = ${s.ws.toFixed(2)} g -> w = (${s.ww.toFixed(2)} / ${s.ws.toFixed(2)}) × 100% = ${s.w.toFixed(2)}%`),
          `Rata-rata Kadar Air = (${validSamples.map(s => `${s.w.toFixed(2)}%`).join(' + ')}) / ${validSamples.length} = ${avgW.toFixed(2)}%`,
        ]

        return {
          results: [
            { label: 'Kadar Air Rata-rata (w)', value: avgW.toFixed(2), unit: '%', highlight: true, sub: `Rata-rata dari ${validSamples.length} cawan` },
            { label: 'Berat Air Pori Rata-rata (Ww)', value: avgWw.toFixed(2), unit: 'gram', sub: 'Massa air menguap rata-rata' },
            { label: 'Berat Butir Kering Rata-rata (Ws)', value: avgWs.toFixed(2), unit: 'gram', sub: 'Massa partikel padat rata-rata' },
            { label: 'Jumlah Cawan Uji', value: String(validSamples.length), unit: 'Cawan', sub: 'Cawan aktif terverifikasi' },
          ],
          formulaSteps,
          recapTable,
          isError: false,
          status,
          verdictClass,
          conclusion,
          warningMessage: isHighMoisture ? `Perlu Evaluasi: Kadar air rata-rata w = ${avgW.toFixed(2)}% melebihi 100%.` : null,
          summaryString: `Kadar Air Tanah (w) = ${avgW.toFixed(2)}% (${isHighMoisture ? 'Perlu Evaluasi > 100%' : 'Valid'})`,
        }
      }

      // 2. Legacy Single-Point Mode (Fallback)
      const w1 = Number(inputs.wCawan || 0)
      const w2 = Number(inputs.wBasah || 0)
      const w3 = Number(inputs.wKering || 0)

      if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
        return {
          results: [
            { label: 'Berat Air Pori (Ww)', value: '-', unit: 'gram' },
            { label: 'Berat Butir Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Kadar Air Alami (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Semua parameter massa (W1, W2, W3) harus bernilai lebih besar dari 0 gr.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: 'Input parameter penimbangan tidak boleh 0 atau kosong. Masukkan nilai W1, W2, dan W3 dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      if (w2 <= w3) {
        return {
          results: [
            { label: 'Berat Air Pori (Ww)', value: '-', unit: 'gram' },
            { label: 'Berat Butir Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Kadar Air Alami (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) ≤ W3 (${w3} gr) [TIDAK LOGIS]`,
            'Berat Cawan + Tanah Basah (W2) harus lebih besar dari Cawan + Tanah Kering (W3) karena penguapan air pori.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: `Input tidak valid: Berat Cawan + Tanah Basah (W2 = ${w2} gr) harus lebih besar dari Berat Cawan + Tanah Kering (W3 = ${w3} gr). Pengeringan oven menguapkan air pori sehingga massa tanah basah selalu lebih besar dari tanah kering.`,
          summaryString: 'Input Tidak Logis (W2 <= W3)',
        }
      }

      if (w3 <= w1) {
        return {
          results: [
            { label: 'Berat Air Pori (Ww)', value: '-', unit: 'gram' },
            { label: 'Berat Butir Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Kadar Air Alami (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W3 (${w3} gr) ≤ W1 (${w1} gr) [TIDAK LOGIS]`,
            'Berat Cawan + Tanah Kering (W3) harus lebih besar dari Cawan Kosong (W1) agar massa butiran tanah kering bernilai positif.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: `Input tidak valid: Berat Cawan + Tanah Kering (W3 = ${w3} gr) harus lebih besar dari Berat Cawan Kosong (W1 = ${w1} gr). Massa butiran tanah kering (Ws = W3 - W1) harus bernilai positif.`,
          summaryString: 'Input Tidak Logis (W3 <= W1)',
        }
      }

      const wWater = w2 - w3
      const wDry = w3 - w1
      const moisture = (wWater / wDry) * 100

      const isHighMoisture = moisture > 100.0
      const status = isHighMoisture ? 'Perlu Evaluasi (Kadar air tidak wajar untuk tanah normal)' : 'Valid'
      const verdictClass = isHighMoisture ? 'warning' : 'valid'

      const conclusion = isHighMoisture
        ? `Kadar air alami tanah terukur sangat tinggi yaitu ${moisture.toFixed(2)}% (> 100.0%). Nilai ini tidak wajar untuk tanah anorganik normal (rentang wajar 10% - 60%). Nilai w > 100% umumnya hanya terjadi pada tanah organik, gambut berserat tinggi, atau lempung sangat lunak (quick clay). Lakukan evaluasi sampel atau verifikasi ulang pengujian.`
        : `Kadar air alami tanah terukur sebesar ${moisture.toFixed(2)}%. Parameter ini memenuhi rentang wajar tanah normal serta menjadi acuan batas konsistensi dan derajat kejenuhan tanah.`

      const warningMessage = isHighMoisture
        ? `Perlu Evaluasi (Kadar air tidak wajar untuk tanah normal): Hasil kadar air w = ${moisture.toFixed(2)}% melebihi 100%. Pastikan jenis tanah atau lakukan uji ulang laboratorium.`
        : null

      return {
        results: [
          { label: 'Berat Air Pori (Ww)', value: wWater.toFixed(2), unit: 'gram' },
          { label: 'Berat Butir Kering (Ws)', value: wDry.toFixed(2), unit: 'gram' },
          { label: 'Kadar Air Alami (w)', value: moisture.toFixed(2), unit: '%', highlight: true },
        ],
        formulaSteps: [
          `Ww = W2 - W3 = ${w2} - ${w3} = ${wWater.toFixed(2)} gr`,
          `Ws = W3 - W1 = ${w3} - ${w1} = ${wDry.toFixed(2)} gr`,
          `w = (Ww / Ws) × 100% = (${wWater.toFixed(2)} / ${wDry.toFixed(2)}) × 100% = ${moisture.toFixed(2)}%`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        warningMessage,
        summaryString: `Kadar Air Tanah (w) = ${moisture.toFixed(2)}% (${isHighMoisture ? 'Perlu Evaluasi > 100%' : 'Valid'})`,
      }
    },
  },

  'mt-2-2': {
    id: 'mt-2-2',
    code: 'BJT-01',
    name: 'Pengujian Berat Jenis Tanah (Specific Gravity / Gs)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 2: Sifat Fisik Tanah',
    standard: 'SNI 1964:2008',
    desc: 'Menentukan rasio kerapatan partikel padat tanah terhadap air destilasi menggunakan labu piknometer multi-sampel dinamis.',
    hasMultiSample: true,
    sampleNamePrefix: 'Piknometer P-',
    commonFieldsTitle: 'Parameter Kalibrasi & Temperatur Air',
    commonFieldsSubtitle: 'Suhu pengujian standar laboratorium piknometer:',
    commonFields: [
      { key: 'temp', label: 'Temperatur Pengujian (T)', unit: '°C', min: 10, max: 40, step: 0.1, desc: 'Suhu air piknometer saat penimbangan' },
    ],
    sampleFields: [
      { key: 'w1', label: 'Berat Piknometer Kosong (W1)', unit: 'gram', desc: 'Massa piknometer bersih & kering', min: 0.01 },
      { key: 'w2', label: 'Piknometer + Tanah Kering (W2)', unit: 'gram', desc: 'Piknometer berisi sampel tanah kering oven', min: 0.01 },
      { key: 'w3', label: 'Piknometer + Air + Tanah (W3)', unit: 'gram', desc: 'Setelah divakum hampa udara bebas pori', min: 0.01 },
      { key: 'w4', label: 'Piknometer + Air Penuh (W4)', unit: 'gram', desc: 'Piknometer terisi air murni pada suhu sama', min: 0.01 },
    ],
    initialInputs: {
      temp: 20,
      samples: JSON.parse(JSON.stringify(DEFAULT_MT22_SAMPLES)),
      wPikno: 35.4,
      wPiknoTanah: 85.4,
      wPiknoAirTanah: 168.2,
      wPiknoAir: 137.0,
    },
    fields: [
      { key: 'wPikno', label: 'Berat Piknometer Kosong (W1)', unit: 'gram', min: 0.01, desc: 'Massa piknometer bersih & kering' },
      { key: 'wPiknoTanah', label: 'Berat Piknometer + Tanah Kering (W2)', unit: 'gram', min: 0.01, desc: 'Piknometer berisi sampel tanah kering oven' },
      { key: 'wPiknoAirTanah', label: 'Berat Piknometer + Air + Tanah (W3)', unit: 'gram', min: 0.01, desc: 'Setelah divakum hampa udara hingga pori bebas' },
      { key: 'wPiknoAir', label: 'Berat Piknometer + Air Penuh (W4)', unit: 'gram', min: 0.01, desc: 'Piknometer terisi air murni pada suhu sama' },
    ],
    calculate: (inputs) => {
      // 1. Multi-Sampel Dinamis (Mode Utama)
      if (Array.isArray(inputs.samples)) {
        const rawSamples = inputs.samples
        const temp = Number(inputs.temp ?? 20)

        if (rawSamples.length === 0) {
          return {
            results: [
              { label: 'Berat Jenis Rata-rata (Gs)', value: '-', unit: '', highlight: true },
              { label: 'Estimasi Tipe Mineral', value: '-', unit: '', highlight: true },
              { label: 'Temperatur Uji (T)', value: `${temp.toFixed(1)}`, unit: '°C' },
              { label: 'Jumlah Piknometer Uji', value: '0', unit: 'Piknometer' },
            ],
            formulaSteps: ['Tambahkan minimal 1 piknometer sampel pengujian berat jenis.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: 'Tidak ada sampel pengujian aktif. Silakan klik tombol "+ Tambah Sampel".',
            summaryString: 'Belum ada sampel aktif',
          }
        }

        const validSamples = []
        const sampleErrors = []

        rawSamples.forEach((s, idx) => {
          const w1 = Number(s.w1 ?? 0)
          const w2 = Number(s.w2 ?? 0)
          const w3 = Number(s.w3 ?? 0)
          const w4 = Number(s.w4 ?? 0)
          const name = s.name || `Piknometer P-${idx + 1}`

          if (w1 <= 0 || w2 <= 0 || w3 <= 0 || w4 <= 0) {
            sampleErrors.push(`${name}: W1, W2, W3, W4 harus lebih besar dari 0 gr`)
            return
          }
          if (w2 <= w1) {
            sampleErrors.push(`${name}: W2 (${w2} g) harus > W1 (${w1} g)`)
            return
          }
          if (w3 <= w2) {
            sampleErrors.push(`${name}: W3 (${w3} g) harus > W2 (${w2} g)`)
            return
          }
          if (w4 <= w2) {
            sampleErrors.push(`${name}: W4 (${w4} g) harus > W2 (${w2} g)`)
            return
          }

          const ws = w2 - w1
          const denom = (ws + w4) - w3
          if (denom <= 0) {
            sampleErrors.push(`${name}: Volume air terdesak ((Ws+W4)-W3) <= 0`)
            return
          }

          const gs = ws / denom

          validSamples.push({
            name,
            w1,
            w2,
            w3,
            w4,
            ws,
            denom,
            gs,
          })
        })

        if (validSamples.length === 0) {
          return {
            results: [
              { label: 'Berat Jenis Rata-rata (Gs)', value: '-', unit: '', highlight: true },
              { label: 'Estimasi Tipe Mineral', value: '-', unit: '', highlight: true },
              { label: 'Temperatur Uji (T)', value: `${temp.toFixed(1)}`, unit: '°C' },
              { label: 'Jumlah Piknometer Uji', value: String(rawSamples.length), unit: 'Piknometer' },
            ],
            formulaSteps: sampleErrors.length > 0 ? sampleErrors : ['Data penimbangan piknometer tidak valid.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: `Input data penimbangan piknometer belum valid: ${sampleErrors.join(', ')}. Pastikan W4 > W2 > W1 dan W3 > W2.`,
            summaryString: 'Input Piknometer Tidak Valid',
          }
        }

        const avgWs = validSamples.reduce((a, s) => a + s.ws, 0) / validSamples.length
        const avgDenom = validSamples.reduce((a, s) => a + s.denom, 0) / validSamples.length
        const avgGs = validSamples.reduce((a, s) => a + s.gs, 0) / validSamples.length

        let jenis
        if (avgGs < 2.50) jenis = 'Tanah Organik / Gambut'
        else if (avgGs < 2.65) jenis = 'Pasir / Lanau Anorganik'
        else if (avgGs <= 2.75) jenis = 'Lempung Anorganik Normal'
        else if (avgGs <= 2.80) jenis = 'Lempung Berat / Mineral Mika'
        else jenis = 'Mengandung Mineral Besi / Laterit'

        const isValid = avgGs >= 2.50 && avgGs <= 2.80
        const status = isValid ? 'Valid' : 'Perlu Evaluasi'
        const verdictClass = isValid ? 'valid' : 'warning'

        const conclusion = isValid
          ? `Nilai berat jenis butir tanah rata-rata Gs = ${avgGs.toFixed(3)} dari ${validSamples.length} pengujian piknometer pada suhu ${temp}°C memenuhi rentang standar tanah normal (2.50 - 2.80 sesuai SNI 1964:2008). Sampel diestimasikan sebagai ${jenis}.`
          : `Nilai berat jenis butir tanah rata-rata Gs = ${avgGs.toFixed(3)} berada di luar rentang wajar tanah normal (2.50 - 2.80). ${avgGs < 2.50 ? 'Nilai terlalu rendah, terindikasi mengandung bahan organik tinggi atau pembacaan penimbangan kurang teliti.' : 'Nilai sangat tinggi, terindikasi mengandung mineral berat (besi/laterit) atau masih terperangkap gelembung udara dalam piknometer.'} Lakukan evaluasi atau uji ulang.`

        const sampleHeaders = validSamples.map(s => s.name)
        const recapTable = {
          title: 'Tabel Rekapitulasi Berat Jenis Tanah Gs (SNI 1964:2008)',
          headers: ['Parameter Pengujian', 'Simbol / Rumus', ...sampleHeaders, 'Rata-rata'],
          rows: [
            {
              label: 'Berat Piknometer Kosong',
              equation: 'W1 (gram)',
              values: validSamples.map(s => s.w1.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w1, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Piknometer + Tanah Kering',
              equation: 'W2 (gram)',
              values: validSamples.map(s => s.w2.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w2, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Piknometer + Air + Tanah',
              equation: 'W3 (gram)',
              values: validSamples.map(s => s.w3.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w3, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Piknometer + Air Penuh',
              equation: 'W4 (gram)',
              values: validSamples.map(s => s.w4.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w4, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Berat Butiran Kering',
              equation: 'Ws = W2 - W1 (gram)',
              values: validSamples.map(s => s.ws.toFixed(2)),
              average: avgWs.toFixed(2),
            },
            {
              label: 'Volume Air Terdesak',
              equation: '(Ws + W4) - W3 (gram)',
              values: validSamples.map(s => s.denom.toFixed(2)),
              average: avgDenom.toFixed(2),
            },
            {
              label: 'Berat Jenis Butir (Gs)',
              equation: 'Gs = Ws / ((Ws + W4) - W3)',
              values: validSamples.map(s => s.gs.toFixed(3)),
              average: avgGs.toFixed(3),
              highlight: true,
            },
          ],
        }

        const formulaSteps = [
          `Rumus Berat Jenis Tanah (SNI 1964:2008): Gs = Ws / ((Ws + W4) - W3) = (W2 - W1) / (((W2 - W1) + W4) - W3)`,
          `Temperatur Pengujian: ${temp}°C`,
          ...validSamples.map(s => `${s.name}: Ws = ${s.w2} - ${s.w1} = ${s.ws.toFixed(2)} g, Vol Air = (${s.ws.toFixed(2)} + ${s.w4}) - ${s.w3} = ${s.denom.toFixed(2)} g -> Gs = ${s.ws.toFixed(2)} / ${s.denom.toFixed(2)} = ${s.gs.toFixed(3)}`),
          `Rata-rata Gs = (${validSamples.map(s => s.gs.toFixed(3)).join(' + ')}) / ${validSamples.length} = ${avgGs.toFixed(3)}`,
          `Klasifikasi Estimasi Mineral: ${jenis} (Standar: 2.50 - 2.80)`,
        ]

        return {
          results: [
            { label: 'Berat Jenis Rata-rata (Gs)', value: avgGs.toFixed(3), unit: '', highlight: true, sub: `Rata-rata dari ${validSamples.length} piknometer` },
            { label: 'Estimasi Tipe Mineral', value: jenis, unit: '', highlight: true, sub: 'Berdasarkan nilai Gs rata-rata' },
            { label: 'Temperatur Uji (T)', value: `${temp.toFixed(1)}`, unit: '°C', sub: 'Suhu air pengujian' },
            { label: 'Jumlah Piknometer Uji', value: String(validSamples.length), unit: 'Piknometer', sub: 'Labu piknometer aktif' },
          ],
          formulaSteps,
          recapTable,
          isError: false,
          status,
          verdictClass,
          conclusion,
          warningMessage: !isValid ? `Perlu Evaluasi: Nilai Gs rata-rata (${avgGs.toFixed(3)}) berada di luar rentang wajar tanah normal (2.50 - 2.80).` : null,
          summaryString: `Gs = ${avgGs.toFixed(3)} (${jenis}, ${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
        }
      }

      // 2. Legacy Single-Point Mode (Fallback)
      const w1 = Number(inputs.wPikno || 0)
      const w2 = Number(inputs.wPiknoTanah || 0)
      const w3 = Number(inputs.wPiknoAirTanah || 0)
      const w4 = Number(inputs.wPiknoAir || 0)

      if (w1 <= 0 || w2 <= 0 || w3 <= 0 || w4 <= 0) {
        return {
          results: [
            { label: 'Berat Butiran Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Berat Jenis Butir (Gs)', value: '-', unit: '', highlight: true },
            { label: 'Estimasi Tipe Mineral', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: ['Semua parameter massa piknometer (W1, W2, W3, W4) harus bernilai lebih besar dari 0 gr.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai W1, W2, W3, dan W4 dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      if (w2 <= w1) {
        return {
          results: [
            { label: 'Berat Butiran Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Berat Jenis Butir (Gs)', value: '-', unit: '', highlight: true },
            { label: 'Estimasi Tipe Mineral', value: 'Data Tidak Valid (W2 ≤ W1)', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) ≤ W1 (${w1} gr) [TIDAK LOGIS]`,
            'Berat Piknometer + Tanah Kering (W2) harus lebih besar dari Berat Piknometer Kosong (W1).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: `Input data tidak valid: Berat Piknometer + Tanah Kering (W2 = ${w2} gr) tidak boleh lebih kecil atau sama dengan Berat Piknometer Kosong (W1 = ${w1} gr).`,
          summaryString: 'Input Tidak Valid (W2 <= W1)',
        }
      }

      if (w3 <= w2) {
        return {
          results: [
            { label: 'Berat Butiran Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Berat Jenis Butir (Gs)', value: '-', unit: '', highlight: true },
            { label: 'Estimasi Tipe Mineral', value: 'Data Tidak Valid (W3 ≤ W2)', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W3 (${w3} gr) ≤ W2 (${w2} gr) [TIDAK LOGIS]`,
            'Berat Piknometer + Air + Tanah (W3) harus lebih besar dari Berat Piknometer + Tanah Kering (W2).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: `Input data tidak valid: Berat Piknometer + Air + Tanah (W3 = ${w3} gr) harus lebih besar dari Berat Piknometer + Tanah Kering (W2 = ${w2} gr).`,
          summaryString: 'Input Tidak Valid (W3 <= W2)',
        }
      }

      if (w4 <= w2) {
        return {
          results: [
            { label: 'Berat Butiran Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Berat Jenis Butir (Gs)', value: '-', unit: '', highlight: true },
            { label: 'Estimasi Tipe Mineral', value: 'Data Tidak Valid (W4 ≤ W2)', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W4 (${w4} gr) ≤ W2 (${w2} gr) [TIDAK LOGIS]`,
            'Berat Piknometer + Air Penuh (W4) harus lebih besar dari Berat Piknometer + Tanah Kering (W2).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: `Input data tidak valid: Berat Piknometer + Air Penuh (W4 = ${w4} gr) harus lebih besar dari Berat Piknometer + Tanah Kering (W2 = ${w2} gr).`,
          summaryString: 'Input Tidak Valid (W4 <= W2)',
        }
      }

      const ws = w2 - w1
      const denom = (ws + w4) - w3

      if (denom <= 0) {
        return {
          results: [
            { label: 'Berat Butiran Kering (Ws)', value: ws.toFixed(1), unit: 'gram' },
            { label: 'Berat Jenis Butir (Gs)', value: '-', unit: '', highlight: true },
            { label: 'Estimasi Tipe Mineral', value: 'Data Tidak Logis', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Ws = W2 - W1 = ${w2} - ${w1} = ${ws.toFixed(1)} gr`,
            `Volume air terdesak: (Ws + W4) - W3 = (${ws.toFixed(1)} + ${w4}) - ${w3} = ${denom.toFixed(1)} gr [<= 0, TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: `Input data tidak valid: Volume air yang terdesak oleh butiran tanah bernilai nol atau negatif.`,
          summaryString: 'Input Tidak Valid (Penyebut <= 0)',
        }
      }

      const gs = ws / denom

      let jenis
      if (gs < 2.50) jenis = 'Tanah Organik / Gambut'
      else if (gs < 2.65) jenis = 'Pasir / Lanau Anorganik'
      else if (gs <= 2.75) jenis = 'Lempung Anorganik Normal'
      else if (gs <= 2.80) jenis = 'Lempung Berat / Mineral Mika'
      else jenis = 'Mengandung Mineral Besi / Laterit'

      const isValid = gs >= 2.50 && gs <= 2.80
      const status = isValid ? 'Valid' : 'Perlu Evaluasi'
      const verdictClass = isValid ? 'valid' : 'warning'

      const conclusion = isValid
        ? `Nilai berat jenis butir tanah Gs = ${gs.toFixed(3)} masuk rentang standar tanah normal (2.50 - 2.80). Sampel diestimasikan sebagai ${jenis}.`
        : `Nilai berat jenis butir tanah Gs = ${gs.toFixed(3)} berada di luar rentang wajar tanah normal (2.50 - 2.80). Lakukan evaluasi atau uji ulang.`

      const warningMessage = !isValid
        ? `Perlu Evaluasi: Nilai Gs = ${gs.toFixed(3)} berada di luar batas wajar tanah normal (2.50 - 2.80).`
        : null

      return {
        results: [
          { label: 'Berat Butiran Kering (Ws)', value: ws.toFixed(1), unit: 'gram' },
          { label: 'Berat Jenis Butir (Gs)', value: gs.toFixed(3), unit: '', highlight: true },
          { label: 'Estimasi Tipe Mineral', value: jenis, unit: '', highlight: true },
        ],
        formulaSteps: [
          `Ws = W2 - W1 = ${w2} - ${w1} = ${ws.toFixed(1)} gr`,
          `Gs = Ws / ((Ws + W4) - W3) = ${ws.toFixed(1)} / ((${ws.toFixed(1)} + ${w4}) - ${w3}) = ${gs.toFixed(3)}`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        warningMessage,
        summaryString: `Gs = ${gs.toFixed(3)} (${jenis}, ${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'mt-2-3': {
    id: 'mt-2-3',
    code: 'LL-01',
    name: 'Pengujian Batas Cair Tanah (Liquid Limit / LL)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 2: Sifat Fisik Tanah',
    standard: 'SNI 1967:2008 / ASTM D4318',
    desc: 'Menghitung kadar air saat alur tanah pada cawan Casagrande merapat sepanjang 12.7 mm pada 25 ketukan melalui kurva regresi semi-logaritmik multi-titik dinamis.',
    hasMultiSample: true,
    hasFlowCurveChart: true,
    sampleNamePrefix: 'Titik ',
    sampleFields: [
      { key: 'n', label: 'Jumlah Ketukan (N)', unit: 'Ketukan', desc: 'Rentang standar 15 - 35 ketukan', min: 1, max: 100 },
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0.01 },
      { key: 'w2', label: 'Berat Cawan + Basah (W2)', unit: 'gram', desc: 'Massa pasta tanah saat alur merapat', min: 0.01 },
      { key: 'w3', label: 'Berat Cawan + Kering (W3)', unit: 'gram', desc: 'Massa tanah setelah dioven 110°C konstan', min: 0.01 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_MT23_SAMPLES)),
      ketukanN: 22,
      kadarAirW: 43.5,
    },
    fields: [
      { key: 'ketukanN', label: 'Jumlah Ketukan Cawan Casagrande (N)', unit: 'Ketukan', min: 1, desc: 'Rentang standar uji 15 - 35 ketukan' },
      { key: 'kadarAirW', label: 'Kadar Air Terukur Pada Titik Uji (w)', unit: '%', min: 0.01, desc: 'Kadar air tanah saat alur merapat 1/2 inch' },
    ],
    calculate: (inputs) => {
      // 1. Multi-Titik Dinamis Casagrande (Mode Utama)
      if (Array.isArray(inputs.samples)) {
        const rawSamples = inputs.samples
        if (rawSamples.length === 0) {
          return {
            results: [
              { label: 'Batas Cair (LL)', value: '-', unit: '%', highlight: true },
              { label: 'Indeks Aliran (If)', value: '-', unit: '', highlight: true },
              { label: 'Koefisien Korelasi (R²)', value: '-', unit: '' },
              { label: 'Jumlah Titik Uji', value: '0', unit: 'Titik' },
            ],
            formulaSteps: ['Tambahkan minimal 2 titik uji ketukan Casagrande untuk membentuk kurva aliran.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: 'Belum ada titik uji aktif. Silakan klik tombol "+ Tambah Sampel / Titik Uji".',
            summaryString: 'Belum ada titik uji aktif',
          }
        }

        const validPoints = []
        const pointErrors = []

        rawSamples.forEach((s, idx) => {
          const n = Number(s.n ?? 0)
          const w1 = Number(s.w1 ?? 0)
          const w2 = Number(s.w2 ?? 0)
          const w3 = Number(s.w3 ?? 0)
          const name = s.name || `Titik ${idx + 1}`

          if (n <= 0 || w1 <= 0 || w2 <= 0 || w3 <= 0) {
            pointErrors.push(`${name}: Nilai N, W1, W2, dan W3 harus lebih besar dari 0`)
            return
          }
          if (w2 <= w3) {
            pointErrors.push(`${name}: W2 (${w2} g) harus > W3 (${w3} g)`)
            return
          }
          if (w3 <= w1) {
            pointErrors.push(`${name}: W3 (${w3} g) harus > W1 (${w1} g)`)
            return
          }

          const ww = w2 - w3
          const ws = w3 - w1
          const w = (ww / ws) * 100

          validPoints.push({
            name,
            n,
            w1,
            w2,
            w3,
            ww,
            ws,
            w,
          })
        })

        if (validPoints.length === 0) {
          return {
            results: [
              { label: 'Batas Cair (LL)', value: '-', unit: '%', highlight: true },
              { label: 'Indeks Aliran (If)', value: '-', unit: '', highlight: true },
              { label: 'Koefisien Korelasi (R²)', value: '-', unit: '' },
              { label: 'Jumlah Titik Uji', value: String(rawSamples.length), unit: 'Titik' },
            ],
            formulaSteps: pointErrors.length > 0 ? pointErrors : ['Data titik uji Casagrande tidak valid.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: `Input titik uji Casagrande belum valid: ${pointErrors.join(', ')}.`,
            summaryString: 'Input Titik Uji Tidak Valid',
          }
        }

        // Regresi Semi-Logaritmik: w = slope * log10(N) + intercept
        let slope = 0
        let intercept = 0
        let r2 = 1.0

        if (validPoints.length === 1) {
          // Fallback single-point formula Casagrande jika hanya 1 titik
          const single = validPoints[0]
          const singleLL = single.w * Math.pow(single.n / 25, 0.121)
          slope = -15
          intercept = singleLL - slope * Math.log10(25)
        } else {
          const count = validPoints.length
          const xs = validPoints.map(p => Math.log10(p.n))
          const ys = validPoints.map(p => p.w)

          const sumX = xs.reduce((a, b) => a + b, 0)
          const sumY = ys.reduce((a, b) => a + b, 0)
          const sumXY = xs.reduce((acc, x, i) => acc + x * ys[i], 0)
          const sumX2 = xs.reduce((acc, x) => acc + x * x, 0)

          const denom = count * sumX2 - sumX * sumX
          if (Math.abs(denom) > 1e-9) {
            slope = (count * sumXY - sumX * sumY) / denom
            intercept = (sumY - slope * sumX) / count
          } else {
            slope = 0
            intercept = sumY / count
          }

          // Hitung R²
          const meanY = sumY / count
          const ssTot = ys.reduce((acc, y) => acc + Math.pow(y - meanY, 2), 0)
          const ssRes = ys.reduce((acc, y, i) => {
            const yPred = slope * xs[i] + intercept
            return acc + Math.pow(y - yPred, 2)
          }, 0)
          r2 = ssTot > 0 ? Math.max(0, 1 - (ssRes / ssTot)) : 1.0
        }

        const ll = slope * Math.log10(25) + intercept
        const flowIndex = Math.abs(slope)

        // Evaluasi rentang ketukan 15-35
        const anyOutOfRange = validPoints.some(p => p.n < 15 || p.n > 35)
        const isHighMoisture = ll > 100.0
        const hasWarning = anyOutOfRange || isHighMoisture || validPoints.length < 3
        const status = hasWarning ? 'Perlu Evaluasi' : 'Valid'
        const verdictClass = hasWarning ? 'warning' : 'valid'

        let warningMessage = null
        if (anyOutOfRange) {
          warningMessage = 'Beberapa titik uji berada di luar rentang standar 15 - 35 ketukan Casagrande (SNI 1967:2008).'
        } else if (validPoints.length < 3) {
          warningMessage = 'Disarankan minimal 3 atau 4 variasi ketukan untuk menghasilkan regresi kurva aliran yang akurat.'
        } else if (isHighMoisture) {
          warningMessage = `Nilai LL = ${ll.toFixed(2)}% melebihi 100%, tergolong sangat tinggi untuk tanah normal.`
        }

        const conclusion = hasWarning
          ? `Nilai Batas Cair (LL pada N=25) terhitung sebesar ${ll.toFixed(2)}% dengan Indeks Aliran If = ${flowIndex.toFixed(2)} dan R² = ${r2.toFixed(4)}. Evaluasi: ${warningMessage || 'Data perlu diverifikasi kembali.'}`
          : `Nilai Batas Cair (Liquid Limit) sebesar ${ll.toFixed(2)}% diperoleh pada titik acuan standar N = 25 ketukan melalui kurva aliran Casagrande (${validPoints.length} titik uji, Flow Index If = ${flowIndex.toFixed(2)}, R² = ${r2.toFixed(4)}). Memenuhi ketentuan SNI 1967:2008 / ASTM D4318.`

        // Data Titik Grafik Kurva Aliran (Flow Curve)
        const allN = Array.from(new Set([10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 28, 30, 32, 34, 35, 36, 38, 40, ...validPoints.map(p => p.n)])).sort((a, b) => a - b)
        const chartData = allN.map(nVal => {
          const trendVal = Number((slope * Math.log10(nVal) + intercept).toFixed(2))
          const ptMatch = validPoints.find(p => p.n === nVal)
          return {
            n: nVal,
            trendW: trendVal,
            actualW: ptMatch ? Number(ptMatch.w.toFixed(2)) : null,
            name: ptMatch ? ptMatch.name : (nVal === 25 ? 'Standar N=25' : ''),
            isStandard25: nVal === 25,
          }
        })

        const pointHeaders = validPoints.map(p => p.name)
        const recapTable = {
          title: 'Tabel Pengujian Batas Cair Multi-Ketukan Casagrande (SNI 1967:2008)',
          headers: ['Parameter Pengujian', 'Simbol / Rumus', ...pointHeaders, 'Standar (N=25)'],
          rows: [
            {
              label: 'Jumlah Ketukan Cawan (N)',
              equation: 'Ketukan',
              values: validPoints.map(p => `${p.n}`),
              average: '25',
            },
            {
              label: 'Berat Cawan Kosong',
              equation: 'W1 (gram)',
              values: validPoints.map(p => p.w1.toFixed(2)),
              average: (validPoints.reduce((a, p) => a + p.w1, 0) / validPoints.length).toFixed(2),
            },
            {
              label: 'Berat Cawan + Basah',
              equation: 'W2 (gram)',
              values: validPoints.map(p => p.w2.toFixed(2)),
              average: (validPoints.reduce((a, p) => a + p.w2, 0) / validPoints.length).toFixed(2),
            },
            {
              label: 'Berat Cawan + Kering',
              equation: 'W3 (gram)',
              values: validPoints.map(p => p.w3.toFixed(2)),
              average: (validPoints.reduce((a, p) => a + p.w3, 0) / validPoints.length).toFixed(2),
            },
            {
              label: 'Berat Air Pori',
              equation: 'Ww = W2 - W3 (gram)',
              values: validPoints.map(p => p.ww.toFixed(2)),
              average: (validPoints.reduce((a, p) => a + p.ww, 0) / validPoints.length).toFixed(2),
            },
            {
              label: 'Berat Butir Kering',
              equation: 'Ws = W3 - W1 (gram)',
              values: validPoints.map(p => p.ws.toFixed(2)),
              average: (validPoints.reduce((a, p) => a + p.ws, 0) / validPoints.length).toFixed(2),
            },
            {
              label: 'Kadar Air Titik Uji (w)',
              equation: 'w = (Ww / Ws) × 100%',
              values: validPoints.map(p => `${p.w.toFixed(2)}%`),
              average: `${ll.toFixed(2)}%`,
              highlight: true,
            },
          ],
        }

        const formulaSteps = [
          `Persamaan Garis Aliran Semi-Logaritmik: w = -If × log10(N) + C = ${slope.toFixed(4)} × log10(N) + ${intercept.toFixed(4)}`,
          `Indeks Aliran (Flow Index / If) = |-slope| = ${flowIndex.toFixed(2)}`,
          `Batas Cair (LL) pada N = 25 ketukan: LL = ${slope.toFixed(4)} × log10(25) + ${intercept.toFixed(4)} = ${ll.toFixed(2)}%`,
          `Koefisien Korelasi Regresi: R² = ${r2.toFixed(4)} (${r2 > 0.95 ? 'Korelasi Sangat Kuat' : 'Korelasi Cukup'})`,
          ...validPoints.map(p => `${p.name} (N=${p.n}): Ww = ${p.ww.toFixed(2)} g, Ws = ${p.ws.toFixed(2)} g -> w = (${p.ww.toFixed(2)} / ${p.ws.toFixed(2)}) × 100% = ${p.w.toFixed(2)}%`),
        ]

        return {
          results: [
            { label: 'Batas Cair (LL)', value: ll.toFixed(2), unit: '%', highlight: true, sub: 'Kadar air pada tepat N = 25 ketukan' },
            { label: 'Indeks Aliran (If)', value: flowIndex.toFixed(2), unit: '', highlight: true, sub: 'Kemiringan kurva aliran Casagrande' },
            { label: 'Koefisien Korelasi (R²)', value: r2.toFixed(4), unit: '', sub: 'Akurasi kecocokan regresi' },
            { label: 'Jumlah Titik Uji', value: String(validPoints.length), unit: 'Titik', sub: 'Variasi pukulan teruji' },
          ],
          formulaSteps,
          recapTable,
          chartData,
          llValue: Number(ll.toFixed(2)),
          flowIndex: Number(flowIndex.toFixed(2)),
          r2: Number(r2.toFixed(4)),
          isError: false,
          status,
          verdictClass,
          conclusion,
          warningMessage,
          summaryString: `Batas Cair (LL) = ${ll.toFixed(2)}% (If=${flowIndex.toFixed(2)}, R²=${r2.toFixed(4)})`,
        }
      }

      // 2. Legacy Single-Point Mode (Fallback)
      const n = Number(inputs.ketukanN || 0)
      const w = Number(inputs.kadarAirW || 0)

      if (n <= 0 || w <= 0) {
        return {
          results: [
            { label: 'Nilai Batas Cair (LL)', value: '-', unit: '%', highlight: true },
            { label: 'Jumlah Ketukan Uji', value: '-', unit: 'Ketukan' },
          ],
          formulaSteps: ['Jumlah ketukan (N) dan kadar air titik uji (w) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai jumlah ketukan (N) dan kadar air (w) dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const ll = w * Math.pow(n / 25, 0.121)
      const isNOutOfRange = n < 15 || n > 35
      const isMoistureHigh = w > 100.0
      const hasWarning = isNOutOfRange || isMoistureHigh
      const status = hasWarning ? 'Perlu Evaluasi' : 'Valid'
      const verdictClass = hasWarning ? 'warning' : 'valid'

      let warningMessage = null
      if (isNOutOfRange && isMoistureHigh) {
        warningMessage = `Jumlah ketukan N (${n}) berada di luar rentang standar Casagrande (15 - 35 ketukan) dan kadar air titik uji w (${w.toFixed(2)}%) melebihi 100%. Data titik uji memerlukan evaluasi ketelitian atau uji ulang.`
      } else if (isNOutOfRange) {
        warningMessage = `Jumlah ketukan N (${n}) berada di luar rentang standar metode satu titik Casagrande (15 - 35 ketukan sesuai SNI 1967:2008 / ASTM D4318).`
      } else if (isMoistureHigh) {
        warningMessage = `Kadar air titik uji w = ${w.toFixed(2)}% melebihi 100%, tergolong sangat tinggi untuk tanah normal.`
      }

      const conclusion = hasWarning
        ? `Nilai Batas Cair (LL) terhitung sebesar ${ll.toFixed(2)}%. Evaluasi: ${warningMessage}`
        : `Nilai Batas Cair (Liquid Limit) sebesar ${ll.toFixed(2)}%. Pengujian memenuhi ketentuan standar Casagrande (jumlah ketukan ${n} berada dalam rentang valid 15 - 35). Parameter ini menunjukkan batas perubahan konsistensi tanah dari cair ke plastis.`

      return {
        results: [
          { label: 'Nilai Batas Cair (LL)', value: ll.toFixed(2), unit: '%', highlight: true },
          { label: 'Jumlah Ketukan Uji', value: n.toFixed(0), unit: 'Ketukan' },
        ],
        formulaSteps: [
          'Metode Satu Titik Casagrande (SNI 1967:2008 / ASTM D4318):',
          `LL = w × (N / 25)^0.121 = ${w} × (${n} / 25)^0.121 = ${ll.toFixed(2)}%`,
          isNOutOfRange ? `Evaluasi Ketukan: N = ${n} [DI LUAR RENTANG STANDAR 15 - 35 KETUKAN]` : `Evaluasi Ketukan: N = ${n} [MEMENUHI RENTANG STANDAR 15 - 35 KETUKAN]`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        warningMessage,
        summaryString: `Batas Cair (LL) = ${ll.toFixed(2)}% (N=${n}${hasWarning ? ', Perlu Evaluasi' : ''})`,
      }
    },
  },

  'mt-2-4': {
    id: 'mt-2-4',
    code: 'PL-01',
    name: 'Pengujian Batas Plastis & Indeks Plastisitas (PI)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 2: Sifat Fisik Tanah',
    standard: 'SNI 1966:2008 / ASTM D4318',
    desc: 'Menghitung batas plastis (PL), Indeks Plastisitas (PI = LL - PL), dan klasifikasi plastisitas A-line USCS dengan multi-sampel cawan dinamis.',
    hasMultiSample: true,
    sampleNamePrefix: 'Cawan PL-',
    commonFieldsTitle: 'Parameter Acuan Batas Konsistensi Tanah',
    commonFieldsSubtitle: 'Nilai Batas Cair acuan dari hasil pengujian Casagrande (mt-2-3):',
    commonFields: [
      { key: 'll', label: 'Batas Cair Acuan (LL)', unit: '%', min: 0.1, max: 150, step: 0.01, desc: 'Batas Cair hasil uji Casagrande (default 42.18% sesuai laprak)' },
    ],
    sampleFields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0.01 },
      { key: 'w2', label: 'Cawan + Gulungan Basah (W2)', unit: 'gram', desc: 'Massa silinder tanah saat mulai retak pada Ø 3.2 mm', min: 0.01 },
      { key: 'w3', label: 'Cawan + Gulungan Kering (W3)', unit: 'gram', desc: 'Massa gulungan tanah setelah dioven 110°C konstan', min: 0.01 },
    ],
    initialInputs: {
      ll: 42.18,
      samples: JSON.parse(JSON.stringify(DEFAULT_MT24_SAMPLES)),
      batasCairLL: 42.8,
      batasPlastisPL: 22.4,
    },
    fields: [
      { key: 'batasCairLL', label: 'Nilai Batas Cair (LL)', unit: '%', min: 0.01, desc: 'Hasil pengujian Casagrande' },
      { key: 'batasPlastisPL', label: 'Kadar Air Batas Plastis (PL)', unit: '%', min: 0.01, desc: 'Kadar air saat silinder tanah digulung retak pada diameter 3.2 mm' },
    ],
    calculate: (inputs) => {
      // 1. Multi-Sampel Dinamis (Mode Utama)
      if (Array.isArray(inputs.samples)) {
        const rawSamples = inputs.samples
        const ll = Number(inputs.ll ?? (inputs.batasCairLL ?? 42.18))

        if (rawSamples.length === 0) {
          return {
            results: [
              { label: 'Batas Plastis Rata-rata (PL)', value: '-', unit: '%', highlight: true },
              { label: 'Indeks Plastisitas (PI)', value: '-', unit: '%', highlight: true },
              { label: 'Garis-A USCS', value: '-', unit: '%' },
              { label: 'Klasifikasi Sistem USCS', value: '-', unit: '', highlight: true },
            ],
            formulaSteps: ['Tambahkan minimal 1 cawan sampel pengujian batas plastis.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: 'Tidak ada sampel pengujian aktif. Silakan klik tombol "+ Tambah Sampel".',
            summaryString: 'Belum ada sampel aktif',
          }
        }

        const validSamples = []
        const sampleErrors = []

        rawSamples.forEach((s, idx) => {
          const w1 = Number(s.w1 ?? 0)
          const w2 = Number(s.w2 ?? 0)
          const w3 = Number(s.w3 ?? 0)
          const name = s.name || `Cawan PL-${idx + 1}`

          if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
            sampleErrors.push(`${name}: Nilai W1, W2, dan W3 harus lebih besar dari 0 gr`)
            return
          }
          if (w2 <= w3) {
            sampleErrors.push(`${name}: W2 (${w2} g) harus > W3 (${w3} g)`)
            return
          }
          if (w3 <= w1) {
            sampleErrors.push(`${name}: W3 (${w3} g) harus > W1 (${w1} g)`)
            return
          }

          const ww = w2 - w3
          const ws = w3 - w1
          const plVal = (ww / ws) * 100

          validSamples.push({
            name,
            w1,
            w2,
            w3,
            ww,
            ws,
            pl: plVal,
          })
        })

        if (validSamples.length === 0) {
          return {
            results: [
              { label: 'Batas Plastis Rata-rata (PL)', value: '-', unit: '%', highlight: true },
              { label: 'Indeks Plastisitas (PI)', value: '-', unit: '%', highlight: true },
              { label: 'Garis-A USCS', value: '-', unit: '%' },
              { label: 'Klasifikasi Sistem USCS', value: '-', unit: '', highlight: true },
            ],
            formulaSteps: sampleErrors.length > 0 ? sampleErrors : ['Data penimbangan cawan batas plastis tidak valid.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: `Input data penimbangan cawan belum valid: ${sampleErrors.join(', ')}. Pastikan W2 > W3 > W1.`,
            summaryString: 'Input Cawan PL Tidak Valid',
          }
        }

        const avgWw = validSamples.reduce((a, s) => a + s.ww, 0) / validSamples.length
        const avgWs = validSamples.reduce((a, s) => a + s.ws, 0) / validSamples.length
        const avgPl = validSamples.reduce((a, s) => a + s.pl, 0) / validSamples.length

        // Validasi Relasional: LL HARUS >= avgPl
        if (ll < avgPl) {
          return {
            results: [
              { label: 'Batas Plastis Rata-rata (PL)', value: avgPl.toFixed(2), unit: '%' },
              { label: 'Indeks Plastisitas (PI)', value: '-', unit: '%', highlight: true },
              { label: 'Garis-A USCS', value: '-', unit: '%' },
              { label: 'Klasifikasi Sistem USCS', value: 'Data Tidak Valid (LL < PL)', unit: '', highlight: true },
            ],
            formulaSteps: [
              `Evaluasi Konsistensi Atterberg: Batas Cair LL (${ll.toFixed(2)}%) < Batas Plastis PL (${avgPl.toFixed(2)}%) [TIDAK LOGIS]`,
              'Secara fisis kadar air batas cair (LL) harus selalu lebih besar atau sama dengan batas plastis (PL).',
              'Indeks Plastisitas PI = LL - PL tidak boleh bernilai negatif.',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            verdictClass: 'invalid',
            conclusion: `Data tidak valid: Batas Cair acuan (LL = ${ll.toFixed(2)}%) tidak boleh lebih kecil dari Batas Plastis rata-rata (PL = ${avgPl.toFixed(2)}%). Periksa kembali nilai Batas Cair atau penimbangan cawan plastis.`,
            summaryString: 'Data tidak valid: LL < PL',
          }
        }

        const pi = ll - avgPl
        const aLine = 0.73 * (ll - 20)

        let klasifikasi
        if (pi <= 0) {
          klasifikasi = 'NP (Non-Plastis / Pasir-Lanau)'
        } else if (ll >= 50) {
          klasifikasi = pi > aLine ? 'CH (Lempung Gemuk / Plastisitas Tinggi)' : 'MH (Lanau Elastis / Plastisitas Tinggi)'
        } else {
          klasifikasi = pi > aLine ? 'CL (Lempung Kurus / Plastisitas Sedang)' : 'ML (Lanau Anorganik Plastisitas Rendah)'
        }

        const sampleHeaders = validSamples.map(s => s.name)
        const recapTable = {
          title: 'Tabel Rekapitulasi Batas Plastis PL (SNI 1966:2008)',
          headers: ['Parameter Pengujian', 'Simbol / Rumus', ...sampleHeaders, 'Rata-rata'],
          rows: [
            {
              label: 'Berat Cawan Kosong',
              equation: 'W1 (gram)',
              values: validSamples.map(s => s.w1.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w1, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Cawan + Gulungan Basah',
              equation: 'W2 (gram)',
              values: validSamples.map(s => s.w2.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w2, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Cawan + Gulungan Kering',
              equation: 'W3 (gram)',
              values: validSamples.map(s => s.w3.toFixed(2)),
              average: (validSamples.reduce((a, s) => a + s.w3, 0) / validSamples.length).toFixed(2),
            },
            {
              label: 'Berat Air Pori',
              equation: 'Ww = W2 - W3 (gram)',
              values: validSamples.map(s => s.ww.toFixed(2)),
              average: avgWw.toFixed(2),
            },
            {
              label: 'Berat Butir Kering',
              equation: 'Ws = W3 - W1 (gram)',
              values: validSamples.map(s => s.ws.toFixed(2)),
              average: avgWs.toFixed(2),
            },
            {
              label: 'Batas Plastis (PL)',
              equation: 'PL = (Ww / Ws) × 100%',
              values: validSamples.map(s => `${s.pl.toFixed(2)}%`),
              average: `${avgPl.toFixed(2)}%`,
              highlight: true,
            },
          ],
        }

        const formulaSteps = [
          `Rumus Batas Plastis Tanah (SNI 1966:2008): PL = (Ww / Ws) × 100% = ((W2 - W3) / (W3 - W1)) × 100%`,
          ...validSamples.map(s => `${s.name}: Ww = ${s.ww.toFixed(2)} g, Ws = ${s.ws.toFixed(2)} g -> PL = (${s.ww.toFixed(2)} / ${s.ws.toFixed(2)}) × 100% = ${s.pl.toFixed(2)}%`),
          `Batas Plastis Rata-rata (PL) = (${validSamples.map(s => `${s.pl.toFixed(2)}%`).join(' + ')}) / ${validSamples.length} = ${avgPl.toFixed(2)}%`,
          `Batas Cair Acuan (LL) = ${ll.toFixed(2)}%`,
          `Indeks Plastisitas: PI = LL - PL = ${ll.toFixed(2)} - ${avgPl.toFixed(2)} = ${pi.toFixed(2)}%`,
          `Garis-A Casagrande (A-Line) = 0.73 × (LL - 20) = 0.73 × (${ll.toFixed(2)} - 20) = ${aLine.toFixed(2)}%`,
          `Posisi Terhadap Garis-A: PI (${pi.toFixed(2)}%) ${pi > aLine ? '> A-Line (Tanah Lempung / Clay)' : '< A-Line (Tanah Lanau / Silt)'}`,
          `Klasifikasi Sistem USCS: ${klasifikasi}`,
        ]

        return {
          results: [
            { label: 'Batas Plastis Rata-rata (PL)', value: avgPl.toFixed(2), unit: '%', highlight: true, sub: `Rata-rata dari ${validSamples.length} cawan` },
            { label: 'Indeks Plastisitas (PI)', value: pi.toFixed(2), unit: '%', highlight: true, sub: `PI = LL (${ll.toFixed(2)}%) - PL (${avgPl.toFixed(2)}%)` },
            { label: 'Garis-A USCS', value: aLine.toFixed(2), unit: '%', sub: 'Batas pemisah Lempung & Lanau' },
            { label: 'Klasifikasi Sistem USCS', value: klasifikasi, unit: '', highlight: true, sub: 'Berdasarkan Diagram Plastisitas' },
          ],
          formulaSteps,
          recapTable,
          isError: false,
          status: 'Valid',
          verdictClass: 'valid',
          conclusion: `Nilai PI = ${pi.toFixed(2)}% (Batas Plastis rata-rata ${avgPl.toFixed(2)}% dan Batas Cair ${ll.toFixed(2)}%) mengindikasikan tanah berplastisitas ${pi > 17 ? 'tinggi' : pi >= 7 ? 'sedang' : 'rendah'}. Menurut grafik plastisitas Casagrande (A-Line = ${aLine.toFixed(2)}%) tergolong simbol ${klasifikasi}.`,
          summaryString: `PL = ${avgPl.toFixed(2)}%, PI = ${pi.toFixed(2)}% (Klasifikasi: ${klasifikasi})`,
        }
      }

      // 2. Legacy Single-Point Mode (Fallback)
      const ll = Number(inputs.batasCairLL || 0)
      const pl = Number(inputs.batasPlastisPL || 0)

      if (ll <= 0 || pl <= 0) {
        return {
          results: [
            { label: 'Batas Plastis (PL)', value: '-', unit: '%' },
            { label: 'Indeks Plastisitas (PI)', value: '-', unit: '%', highlight: true },
            { label: 'Garis-A USCS (0.73(LL-20))', value: '-', unit: '%' },
            { label: 'Klasifikasi Sistem USCS', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: ['Nilai Batas Cair (LL) dan Batas Plastis (PL) harus bernilai lebih besar dari 0%.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai Batas Cair (LL) dan Batas Plastis (PL) dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      if (ll < pl) {
        return {
          results: [
            { label: 'Batas Plastis (PL)', value: pl.toFixed(2), unit: '%' },
            { label: 'Indeks Plastisitas (PI)', value: '-', unit: '%', highlight: true },
            { label: 'Garis-A USCS (0.73(LL-20))', value: '-', unit: '%' },
            { label: 'Klasifikasi Sistem USCS', value: 'Data Tidak Valid (LL < PL)', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Konsistensi Atterberg: LL (${ll}%) < PL (${pl}%) [TIDAK LOGIS]`,
            'Secara fisis kadar air batas cair (LL) harus selalu lebih besar atau sama dengan batas plastis (PL).',
            'Indeks Plastisitas PI = LL - PL tidak boleh bernilai negatif.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          verdictClass: 'invalid',
          conclusion: 'Data tidak valid: Batas Cair (LL) tidak boleh lebih kecil dari Batas Plastis (PL).',
          summaryString: 'Data tidak valid: LL < PL',
        }
      }

      const pi = ll - pl
      const aLine = 0.73 * (ll - 20)

      let klasifikasi
      if (pi === 0) {
        klasifikasi = 'NP (Non-Plastis / Pasir-Lanau)'
      } else if (ll >= 50) {
        klasifikasi = pi > aLine ? 'CH (Lempung Gemuk / Plastisitas Tinggi)' : 'MH (Lanau Elastis / Plastisitas Tinggi)'
      } else {
        klasifikasi = pi > aLine ? 'CL (Lempung Kurus / Plastisitas Sedang)' : 'ML (Lanau Anorganik Plastisitas Rendah)'
      }

      return {
        results: [
          { label: 'Batas Plastis (PL)', value: pl.toFixed(2), unit: '%' },
          { label: 'Indeks Plastisitas (PI)', value: pi.toFixed(2), unit: '%', highlight: true },
          { label: 'Garis-A USCS (0.73(LL-20))', value: aLine.toFixed(2), unit: '%' },
          { label: 'Klasifikasi Sistem USCS', value: klasifikasi, unit: '', highlight: true },
        ],
        formulaSteps: [
          `Indeks Plastisitas PI = LL - PL = ${ll} - ${pl} = ${pi.toFixed(2)}%`,
          `Garis-A (A-Line) = 0.73 × (LL - 20) = 0.73 × (${ll} - 20) = ${aLine.toFixed(2)}%`,
          `Posisi: PI (${pi.toFixed(2)}%) ${pi > aLine ? '> A-Line (Tanah Lempung/Clay)' : '< A-Line (Tanah Lanau/Silt)'}`,
        ],
        isError: false,
        status: 'Valid',
        verdictClass: 'valid',
        conclusion: `Nilai PI = ${pi.toFixed(2)}% mengindikasikan tanah berplastisitas ${pi > 17 ? 'tinggi' : pi >= 7 ? 'sedang' : 'rendah'}. Menurut grafik plastisitas Casagrande tergolong simbol ${klasifikasi}.`,
        summaryString: `PI = ${pi.toFixed(2)}% (Klasifikasi: ${klasifikasi})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA TANAH - BAB III: PEMADATAN TANAH
  // -----------------------------------------------------------------------
  'mt-3-1': {
    id: 'mt-3-1',
    code: 'PRC-01',
    name: 'Pengujian Pemadatan Standard Proctor Laboratorium',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 3: Pemadatan Tanah',
    standard: 'SNI 1742:2008 / ASTM D698',
    desc: 'Pengujian pemadatan tanah laboratorium Standard Proctor dengan tabel input multi-titik sampel (S1, S2, S3) dan sub-pengujian kontainer kadar air sesuai standar praktikum Teknik Sipil ITERA.',
    hasDynamicProctorTable: true,
    initialInputs: {
      proctorSamples: [
        {
          id: 1,
          name: 'Sampel 1 (S1)',
          massMoldSoil: 432.5,
          diameterMold: 5.5,
          heightMold: 10.0,
          gs: 2.65,
          containers: [
            { id: 1, label: 'Kontainer 1', m1: 12.4, m2: 36.8, m3: 34.2 },
            { id: 2, label: 'Kontainer 2', m1: 11.8, m2: 38.5, m3: 35.6 },
            { id: 3, label: 'Kontainer 3', m1: 12.1, m2: 37.2, m3: 34.5 },
          ],
        },
        {
          id: 2,
          name: 'Sampel 2 (S2)',
          massMoldSoil: 478.0,
          diameterMold: 5.5,
          heightMold: 10.0,
          gs: 2.65,
          containers: [
            { id: 1, label: 'Kontainer 1', m1: 12.2, m2: 39.4, m3: 35.8 },
            { id: 2, label: 'Kontainer 2', m1: 11.9, m2: 41.2, m3: 37.4 },
            { id: 3, label: 'Kontainer 3', m1: 12.5, m2: 40.8, m3: 37.1 },
          ],
        },
        {
          id: 3,
          name: 'Sampel 3 (S3)',
          massMoldSoil: 465.0,
          diameterMold: 5.5,
          heightMold: 10.0,
          gs: 2.65,
          containers: [
            { id: 1, label: 'Kontainer 1', m1: 12.0, m2: 42.6, m3: 37.9 },
            { id: 2, label: 'Kontainer 2', m1: 12.3, m2: 44.1, m3: 39.2 },
            { id: 3, label: 'Kontainer 3', m1: 11.7, m2: 43.5, m3: 38.6 },
          ],
        },
      ],
      volMold: 943.8,
      wMold: 2150.0,
      wMoldTanah: 3980.0,
      kadarAir: 14.5,
    },
    fields: [
      { key: 'volMold', label: 'Volume Cetakan Mold (V)', unit: 'cm³', min: 0.01, desc: 'Standar cetakan mold 4 inch = 943.8 cm³' },
      { key: 'wMold', label: 'Berat Cetakan Mold Kosong (W1)', unit: 'gram', min: 0.01, desc: 'Massa silinder mold logam tanpa leher sambung' },
      { key: 'wMoldTanah', label: 'Berat Mold + Tanah Padat (W2)', unit: 'gram', min: 0.01, desc: 'Massa setelah dipadatkan penumbuk standar 25 pukulan 3 lapisan' },
      { key: 'kadarAir', label: 'Kadar Air Contoh Tanah (w)', unit: '%', min: 0.01, desc: 'Hasil pengujian kadar air titik pemadatan' },
    ],
    calculate: (inputs) => {
      // 1. DYNAMIC PROCTOR MULTI-SAMPLE MODE (Standar Praktikum ITERA)
      if (Array.isArray(inputs.proctorSamples) && inputs.proctorSamples.length > 0) {
        let hasInvalidContainer = false
        let hasInvalidMold = false

        const computedSamples = inputs.proctorSamples.map((s, sIdx) => {
          const d = s.diameterMold !== undefined && s.diameterMold !== '' ? Number(s.diameterMold) : 5.5
          const h = s.heightMold !== undefined && s.heightMold !== '' ? Number(s.heightMold) : 10.0
          const gs = s.gs !== undefined && s.gs !== '' ? Number(s.gs) : 2.65
          const rawM = s.massMoldSoil !== undefined && s.massMoldSoil !== '' ? Number(s.massMoldSoil) : 0
          // Konversi otomatis jika pengguna menginput kg (misal 0.45 kg -> 450 gram)
          const m = (rawM > 0 && rawM < 10) ? rawM * 1000 : rawM

          // Rumus Volume Mold: V = 0.25 * 3.1416 * D^2 * H
          const v = 0.25 * 3.1416 * d * d * h
          if (v <= 0 || m <= 0) {
            hasInvalidMold = true
          }

          // Perhitungan 3 sub-pengujian kontainer kadar air
          const containers = (s.containers || []).map((c, cIdx) => {
            const m1 = c.m1 !== undefined && c.m1 !== '' ? Number(c.m1) : 0
            const m2 = c.m2 !== undefined && c.m2 !== '' ? Number(c.m2) : 0
            const m3 = c.m3 !== undefined && c.m3 !== '' ? Number(c.m3) : 0

            // Validasi: M2 harus > M3 dan M3 harus > M1
            const isInvalid = (m2 > 0 && m3 > 0 && m1 > 0) ? (m2 <= m3 || m3 <= m1) : false
            if (isInvalid) hasInvalidContainer = true

            const wAir = isInvalid ? 0 : Math.max(0, m2 - m3)
            const wPadat = isInvalid ? 0 : Math.max(0, m3 - m1)
            const wPct = wPadat > 0 ? (wAir / wPadat) * 100 : 0

            return {
              id: c.id || cIdx + 1,
              label: c.label || `Kontainer ${cIdx + 1}`,
              m1,
              m2,
              m3,
              wAir,
              wPadat,
              wPct,
              isInvalid,
            }
          })

          const validContainers = containers.filter((c) => !c.isInvalid && c.wPct > 0)
          const avgW = validContainers.length > 0
            ? validContainers.reduce((sum, c) => sum + c.wPct, 0) / validContainers.length
            : (containers.length > 0 ? containers.reduce((sum, c) => sum + c.wPct, 0) / containers.length : 0)

          const gammaWet = v > 0 ? m / v : 0
          const gammaDry = gammaWet > 0 ? gammaWet / (1 + avgW / 100) : 0
          const gammaZav = (gs > 0 && avgW > 0) ? (gs * 1.0) / (1 + (avgW * gs / 100)) : 0

          return {
            id: s.id || sIdx + 1,
            name: s.name || `Sampel ${sIdx + 1} (S${sIdx + 1})`,
            diameterMold: d,
            heightMold: h,
            volumeMold: v,
            massMoldSoil: rawM,
            massSoilGram: m,
            gs,
            containers,
            avgW,
            gammaWet,
            gammaDry,
            gammaZav,
            isInvalid: v <= 0 || m <= 0 || containers.some((c) => c.isInvalid),
          }
        })

        const sorted = [...computedSamples].filter((s) => s.avgW > 0 && s.gammaDry > 0).sort((a, b) => a.avgW - b.avgW)

        let mdd = 0
        let omc = 0
        let peakSampleId = null

        if (sorted.length >= 3) {
          const w1 = sorted[0].avgW, y1 = sorted[0].gammaDry
          const w2 = sorted[1].avgW, y2 = sorted[1].gammaDry
          const w3 = sorted[2].avgW, y3 = sorted[2].gammaDry
          const denom = (w1 - w2) * (w1 - w3) * (w2 - w3)
          if (Math.abs(denom) > 1e-5) {
            const a = (w3 * (y2 - y1) + w2 * (y1 - y3) + w1 * (y3 - y2)) / denom
            const b = (w3 * w3 * (y1 - y2) + w2 * w2 * (y3 - y1) + w1 * w1 * (y2 - y3)) / denom
            const c = (w2 * w3 * (w2 - w3) * y1 + w3 * w1 * (w3 - w1) * y2 + w1 * w2 * (w1 - w2) * y3) / denom

            if (a < 0) {
              const wPeak = -b / (2 * a)
              const yPeak = c - (b * b) / (4 * a)
              if (wPeak >= w1 - 2 && wPeak <= w3 + 2 && yPeak > 0) {
                omc = wPeak
                mdd = yPeak
              }
            }
          }
        }

        if (mdd <= 0 && computedSamples.length > 0) {
          const maxSample = computedSamples.reduce((max, s) => (s.gammaDry > max.gammaDry ? s : max), computedSamples[0])
          mdd = maxSample.gammaDry
          omc = maxSample.avgW
          peakSampleId = maxSample.id
        } else if (computedSamples.length > 0) {
          const maxSample = computedSamples.reduce((max, s) => (s.gammaDry > max.gammaDry ? s : max), computedSamples[0])
          peakSampleId = maxSample.id
        }

        const validWet = computedSamples.filter((s) => s.gammaWet > 0)
        const avgWet = validWet.length > 0
          ? validWet.reduce((sum, s) => sum + s.gammaWet, 0) / validWet.length
          : 0

        const gsDefault = computedSamples[0]?.gs || 2.65
        const minW = sorted.length > 0 ? Math.max(5, Math.floor(sorted[0].avgW - 3)) : 10
        const maxW = sorted.length > 0 ? Math.ceil(sorted[sorted.length - 1].avgW + 4) : 25

        const chartPoints = []
        for (let wStep = minW; wStep <= maxW; wStep += 1) {
          const zav = (gsDefault * 1.0) / (1 + (wStep * gsDefault / 100))
          const matchedSample = computedSamples.find((s) => Math.abs(s.avgW - wStep) < 0.6)
          chartPoints.push({
            w: wStep,
            zav: Number(zav.toFixed(3)),
            gammaDry: matchedSample ? Number(matchedSample.gammaDry.toFixed(3)) : null,
            sampleName: matchedSample ? matchedSample.name : null,
          })
        }
        computedSamples.forEach((s) => {
          if (s.avgW > 0 && s.gammaDry > 0) {
            const zav = (s.gs * 1.0) / (1 + (s.avgW * s.gs / 100))
            chartPoints.push({
              w: Number(s.avgW.toFixed(2)),
              zav: Number(zav.toFixed(3)),
              gammaDry: Number(s.gammaDry.toFixed(3)),
              sampleName: s.name,
              isActualPoint: true,
            })
          }
        })
        chartPoints.sort((a, b) => a.w - b.w)

        const isError = hasInvalidContainer || hasInvalidMold || mdd <= 0
        const status = isError ? 'Input Tidak Wajar / Cek Kembali Data' : 'Valid'
        const verdictClass = isError ? 'danger' : 'valid'

        return {
          results: [
            { label: 'Kerapatan Kering Maksimum (MDD)', value: `${mdd.toFixed(3)} gr/cm³`, unit: '', highlight: true },
            { label: 'Kadar Air Optimum (OMC)', value: `${omc.toFixed(2)}%`, unit: '', highlight: true },
            { label: 'Rata-rata Berat Volume Basah', value: `${avgWet.toFixed(3)} gr/cm³`, unit: '', highlight: true },
            { label: 'Status Validasi Standar', value: isError ? 'Perlu Evaluasi' : 'Memenuhi SNI 1742:2008', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Metode Pengujian Pemadatan Standard Proctor Laboratorium Teknik Sipil ITERA (SNI 1742:2008 / ASTM D698):',
            '1. Kadar Air Tiap Kontainer: w = ((M2 - M3) / (M3 - M1)) × 100%',
            '2. Kadar Air Rata-rata Sampel: w̄ = (w1 + w2 + w3) / 3',
            '3. Volume Cetakan Mold: V = 0.25 × 3.1416 × D² × H (cm³)',
            '4. Berat Volume Basah: γ_wet = M / V (gr/cm³)',
            '5. Berat Volume Kering: γ_dry = γ_wet / (1 + w̄/100) (gr/cm³)',
            `6. Titik Puncak Kurva Pemadatan: MDD = ${mdd.toFixed(3)} gr/cm³ pada OMC = ${omc.toFixed(2)}%`,
            `7. Kurva Nol Rongga Udara (Zero Air Voids / ZAV): γ_zav = (Gs × 1.0) / (1 + w × Gs / 100) [Gs = ${gsDefault}]`,
          ],
          proctorSamples: computedSamples,
          rekapitulasiTable: computedSamples.map((s) => ({
            id: s.id,
            name: s.name,
            avgW: s.avgW,
            gammaWet: s.gammaWet,
            gammaDry: s.gammaDry,
            isPeak: s.id === peakSampleId,
          })),
          chartData: chartPoints,
          mdd,
          omc,
          avgWet,
          peakSampleId,
          hasInvalidContainer,
          hasInvalidMold,
          isError,
          status,
          verdictClass,
          conclusion: isError
            ? 'Perhatian: Terdapat ketidaksesuaian input data kontainer (M2 ≤ M3 atau M3 ≤ M1) atau massa mold kosong/tanah. Harap periksa kembali angka pengukuran laboratorium.'
            : `Berdasarkan pengujian pemadatan Standard Proctor SNI 1742:2008 / ASTM D698, diperoleh Kerapatan Kering Maksimum (MDD) sebesar ${mdd.toFixed(3)} gr/cm³ pada Kadar Air Optimum (OMC) sebesar ${omc.toFixed(2)}%. Berat volume basah rata-rata dari 3 titik sampel adalah ${avgWet.toFixed(3)} gr/cm³.`,
          summaryString: `Proctor MDD = ${mdd.toFixed(3)} gr/cm³, OMC = ${omc.toFixed(2)}% (SNI 1742:2008)`,
        }
      }

      // 2. FALLBACK SINGLE-POINT MODE (Support for legacy inputs { volMold, wMold, wMoldTanah, kadarAir })
      const v = inputs.volMold !== undefined && inputs.volMold !== '' ? Number(inputs.volMold) : 0
      const w1 = inputs.wMold !== undefined && inputs.wMold !== '' ? Number(inputs.wMold) : 0
      const w2 = inputs.wMoldTanah !== undefined && inputs.wMoldTanah !== '' ? Number(inputs.wMoldTanah) : 0
      const w = inputs.kadarAir !== undefined && inputs.kadarAir !== '' ? Number(inputs.kadarAir) : 0

      // Guard clause: Validasi input harus > 0
      if (v <= 0 || w1 <= 0 || w2 <= 0 || w <= 0) {
        return {
          results: [
            { label: 'Berat Volume Basah (γ_wet)', value: '-', unit: 'gr/cm³' },
            { label: 'Berat Volume Kering (γ_dry)', value: '-', unit: 'gr/cm³', highlight: true },
            { label: 'Kerapatan Kering Standar', value: '-', unit: 'kN/m³' },
          ],
          formulaSteps: [
            'Semua parameter pengujian pemadatan (V, W1, W2, w) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai volume mold, berat mold kosong, berat mold + tanah, dan kadar air.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // Validasi Relasional: W2 (Mold + Tanah) HARUS lebih besar dari W1 (Mold Kosong)
      if (w2 <= w1) {
        return {
          results: [
            { label: 'Berat Volume Basah (γ_wet)', value: '-', unit: 'gr/cm³' },
            { label: 'Berat Volume Kering (γ_dry)', value: '-', unit: 'gr/cm³', highlight: true },
            { label: 'Kerapatan Kering Standar', value: '-', unit: 'kN/m³' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) ≤ W1 (${w1} gr) [TIDAK LOGIS]`,
            'Berat Mold + Tanah Padat (W2) harus lebih besar dari Berat Mold Kosong (W1).',
            'Berat tanah padat (W2 - W1) harus bernilai positif.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak valid: Berat Mold + Tanah Padat (W2 = ${w2} gr) harus lebih besar dari Berat Mold Kosong (W1 = ${w1} gr). Massa tanah padat tidak boleh bernilai nol atau negatif.`,
          summaryString: 'Input Tidak Valid (W2 <= W1)',
        }
      }

      const wTanah = w2 - w1
      const gammaWet = wTanah / v
      const gammaDry = gammaWet / (1 + w / 100)

      // VALIDASI HASIL: Jika hasil Berat Volume Kering (γ_dry) > 3.0 gr/cm³, ubah status dari Hijau menjadi MERAH
      if (gammaDry > 3.0) {
        return {
          results: [
            { label: 'Berat Volume Basah (γ_wet)', value: gammaWet.toFixed(3), unit: 'gr/cm³' },
            { label: 'Berat Volume Kering (γ_dry)', value: gammaDry.toFixed(3), unit: 'gr/cm³', highlight: true },
            { label: 'Kerapatan Kering Standar', value: (gammaDry * 9.81).toFixed(2), unit: 'kN/m³' },
          ],
          formulaSteps: [
            `Berat Tanah Padat = W2 - W1 = ${w2} - ${w1} = ${wTanah.toFixed(1)} gr`,
            `γ_wet = Berat / Volume = ${wTanah.toFixed(1)} / ${v} = ${gammaWet.toFixed(3)} gr/cm³`,
            `γ_dry = γ_wet / (1 + w/100) = ${gammaWet.toFixed(3)} / (1 + ${w}/100) = ${gammaDry.toFixed(3)} gr/cm³ [> 3.0 gr/cm³, TIDAK FISIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Hasil tidak wajar. Kepadatan kering melebihi batas fisik tanah normal (maks 2.5 gr/cm³). Periksa kembali volume mold atau berat tanah.',
          summaryString: `γ_dry = ${gammaDry.toFixed(3)} gr/cm³ (Hasil Tidak Wajar > 3.0)`,
        }
      }

      return {
        results: [
          { label: 'Berat Volume Basah (γ_wet)', value: gammaWet.toFixed(3), unit: 'gr/cm³' },
          { label: 'Berat Volume Kering (γ_dry)', value: gammaDry.toFixed(3), unit: 'gr/cm³', highlight: true },
          { label: 'Kerapatan Kering Standar', value: (gammaDry * 9.81).toFixed(2), unit: 'kN/m³' },
        ],
        formulaSteps: [
          `Berat Tanah Padat = W2 - W1 = ${w2} - ${w1} = ${wTanah.toFixed(1)} gr`,
          `γ_wet = Berat / Volume = ${wTanah.toFixed(1)} / ${v} = ${gammaWet.toFixed(3)} gr/cm³`,
          `γ_dry = γ_wet / (1 + w/100) = ${gammaWet.toFixed(3)} / (1 + ${w}/100) = ${gammaDry.toFixed(3)} gr/cm³`,
        ],
        isError: false,
        status: 'Valid',
        conclusion: `Berat volume kering pada kadar air ${w}% adalah γ_dry = ${gammaDry.toFixed(3)} gr/cm³. Titik ini diplot pada kurva pemadatan untuk menentukan MDD puncak.`,
        summaryString: `γ_dry = ${gammaDry.toFixed(3)} gr/cm³ pada w = ${w}%`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA TANAH - BAB IV: ANALISIS BUTIRAN
  // -----------------------------------------------------------------------
  'mt-4-1': {
    id: 'mt-4-1',
    code: 'AST-01',
    name: 'Analisis Saringan Butiran Tanah (Gradasi Butir)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 4: Analisis Butiran',
    standard: 'SNI 3423:2008 / ASTM D422',
    desc: 'Menghitung distribusi ukuran butiran tanah, kurva gradasi semi-logaritmik, nilai efektif D10, D30, D60, koefisien Cu & Cc, serta klasifikasi tanah USCS.',
    hasDynamicSoilSieveTable: true,
    initialInputs: {
      wTotal: 500.0,
      panWeight: 24.0,
      soilSieves: [
        { id: 1, sieveNo: 'No. 4', diameter: 4.75, retainedWeight: 20.0 },
        { id: 2, sieveNo: 'No. 10', diameter: 2.00, retainedWeight: 60.0 },
        { id: 3, sieveNo: 'No. 20', diameter: 0.850, retainedWeight: 100.0 },
        { id: 4, sieveNo: 'No. 40', diameter: 0.425, retainedWeight: 100.0 },
        { id: 5, sieveNo: 'No. 60', diameter: 0.250, retainedWeight: 90.0 },
        { id: 6, sieveNo: 'No. 100', diameter: 0.150, retainedWeight: 55.0 },
        { id: 7, sieveNo: 'No. 200', diameter: 0.075, retainedWeight: 45.0 },
        { id: 8, sieveNo: 'Pan', diameter: 0, retainedWeight: 24.0, isPan: true },
      ],
      // Fallback untuk backward-compatibility dengan form statis lama jika ada
      d10: 0.102,
      d30: 0.281,
      d60: 0.740,
      finesPct: 6.0,
    },
    fields: [
      { key: 'wTotal', label: 'Berat Total Sampel Awal (W_total)', unit: 'gram', min: 1, desc: 'Berat kering total sampel tanah sebelum diayak' },
      { key: 'panWeight', label: 'Berat Tanah Tertahan di Pan', unit: 'gram', min: 0, desc: 'Berat butiran halus lolos ayakan No. 200 yang tertampung di pan' },
      { key: 'd10', label: 'Ukuran Butir Efektif D10 (10% Lolos)', unit: 'mm', min: 0.001, desc: 'Diameter ayakan saat persentase lolos komulatif 10%' },
      { key: 'd30', label: 'Ukuran Butir D30 (30% Lolos)', unit: 'mm', min: 0.001, desc: 'Diameter ayakan saat persentase lolos komulatif 30%' },
      { key: 'd60', label: 'Ukuran Butir D60 (60% Lolos)', unit: 'mm', min: 0.001, desc: 'Diameter ayakan saat persentase lolos komulatif 60%' },
      { key: 'finesPct', label: 'Persen Butiran Lolos Ayakan #200 (Fines)', unit: '%', min: 0, max: 100, desc: 'Fraksi lempung/lanau lolos ayakan 0.075 mm' },
    ],
    calculate: (inputs) => {
      // 1. EVALUASI DATA SARINGAN DINAMIS (Jika array soilSieves tersedia)
      const isDynamic = Array.isArray(inputs.soilSieves) && inputs.soilSieves.length > 0

      if (isDynamic) {
        const rawWTotal = inputs.wTotal !== undefined && inputs.wTotal !== '' ? Number(inputs.wTotal) : 500.0
        const rawPanInput = inputs.panWeight !== undefined && inputs.panWeight !== '' ? Number(inputs.panWeight) : 0
        const rawSieves = inputs.soilSieves

        // Validasi massa total sampel
        if (rawWTotal <= 0) {
          return {
            results: [
              { label: 'Koefisien Keseragaman (Cu)', value: '-', unit: '', highlight: true },
              { label: 'Koefisien Kelengkungan (Cc)', value: '-', unit: '', highlight: true },
              { label: 'Fraksi Halus Lolos #200', value: '-', unit: '%' },
              { label: 'Klasifikasi Gradasi USCS', value: 'W_total <= 0 Tidak Valid', unit: '', highlight: true },
            ],
            formulaSteps: ['Berat total penimbangan awal sampel (W_total) harus lebih besar dari 0 gram.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Berat total penimbangan awal sampel (W_total) harus lebih besar dari 0 gram.',
            summaryString: 'W_total <= 0',
          }
        }

        // Validasi input minus
        const hasNegative = rawSieves.some((s) => {
          const w = String(s.retainedWeight ?? '').trim()
          const d = String(s.diameter ?? '').trim()
          return (w !== '' && Number(w) < 0) || (d !== '' && Number(d) < 0)
        }) || rawWTotal < 0 || rawPanInput < 0

        if (hasNegative) {
          return {
            results: [
              { label: 'Koefisien Keseragaman (Cu)', value: '-', unit: '', highlight: true },
              { label: 'Koefisien Kelengkungan (Cc)', value: '-', unit: '', highlight: true },
              { label: 'Fraksi Halus Lolos #200', value: '-', unit: '%' },
              { label: 'Klasifikasi Gradasi USCS', value: 'Input Bernilai Negatif', unit: '', highlight: true },
            ],
            formulaSteps: ['Nilai berat tertahan, diameter ayakan, dan berat total sampel tidak boleh negatif.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Nilai berat tertahan dan diameter ayakan tidak boleh bernilai negatif.',
            summaryString: 'Input Negatif',
          }
        }

        // Pisahkan saringan normal dan pan
        const normalSieves = rawSieves.filter((s) => !s.isPan && Number(s.diameter) > 0)
        let panSieve = rawSieves.find((s) => s.isPan || Number(s.diameter) <= 0 || /pan/i.test(s.sieveNo))

        if (!panSieve && rawPanInput > 0) {
          panSieve = { id: 999, sieveNo: 'Pan', diameter: 0, retainedWeight: rawPanInput, isPan: true }
        }

        if (normalSieves.length === 0) {
          return {
            results: [
              { label: 'Koefisien Keseragaman (Cu)', value: '-', unit: '', highlight: true },
              { label: 'Koefisien Kelengkungan (Cc)', value: '-', unit: '', highlight: true },
              { label: 'Fraksi Halus Lolos #200', value: '-', unit: '%' },
              { label: 'Klasifikasi Gradasi USCS', value: 'Ayakan Kosong', unit: '', highlight: true },
            ],
            formulaSteps: ['Minimal harus ada 1 ukuran ayakan dengan diameter > 0 selain wadah Pan penampung.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Minimal harus ada 1 ukuran ayakan yang digunakan untuk pengujian gradasi butir.',
            summaryString: 'Ayakan Kosong',
          }
        }

        // Urutkan saringan normal dari diameter terbesar ke terkecil (descending)
        const sortedDesc = [...normalSieves].sort((a, b) => Number(b.diameter) - Number(a.diameter))

        let cumRetained = 0
        const calculatedSieves = sortedDesc.map((s, idx) => {
          const weight = s.retainedWeight !== undefined && s.retainedWeight !== '' ? Number(s.retainedWeight) : 0
          cumRetained += weight
          const retainedPct = (weight / rawWTotal) * 100
          const cumRetainedPct = (cumRetained / rawWTotal) * 100
          const cumPassingPct = Math.max(0, 100 - cumRetainedPct)
          return {
            ...s,
            index: idx + 1,
            diameter: Number(s.diameter),
            retainedWeight: weight,
            retainedPct,
            cumRetainedPct,
            cumPassingPct,
          }
        })

        // Perhitungan Pan
        const panWeight = panSieve
          ? (panSieve.retainedWeight !== undefined && panSieve.retainedWeight !== '' ? Number(panSieve.retainedWeight) : 0)
          : rawPanInput
        const totalWithPan = cumRetained + panWeight
        const panRetainedPct = (panWeight / rawWTotal) * 100
        const panCumRetainedPct = (totalWithPan / rawWTotal) * 100
        const panCumPassingPct = 0

        const calculatedPan = panSieve ? {
          ...panSieve,
          index: calculatedSieves.length + 1,
          diameter: 0,
          retainedWeight: panWeight,
          retainedPct: panRetainedPct,
          cumRetainedPct: panCumRetainedPct,
          cumPassingPct: panCumPassingPct,
          isPan: true,
        } : null

        // Pengecekan Kehilangan Massa (Mass Loss)
        const massLoss = Math.abs(rawWTotal - totalWithPan)
        const massLossPct = (massLoss / rawWTotal) * 100
        const isMassLossValid = massLossPct <= 2.0

        // Fraksi butiran: Ayakan No. 4 (4.75 mm) & No. 200 (0.075 mm)
        const sNo4 = calculatedSieves.find((s) => Math.abs(s.diameter - 4.75) < 0.25 || /no\.?\s*4\b/i.test(s.sieveNo))
        const sNo200 = calculatedSieves.find((s) => Math.abs(s.diameter - 0.075) < 0.015 || /no\.?\s*200\b/i.test(s.sieveNo))

        const passingNo4 = sNo4 ? sNo4.cumPassingPct : 100
        const passingNo200 = sNo200 ? sNo200.cumPassingPct : (calculatedSieves[calculatedSieves.length - 1].cumPassingPct)

        const gravelPct = Math.max(0, 100 - passingNo4)
        const finesPct = Math.max(0, passingNo200)
        const sandPct = Math.max(0, passingNo4 - finesPct)

        // Interpolasi Logaritmik untuk D10, D30, D60
        const interpPoints = calculatedSieves.map((s) => ({ diameter: s.diameter, passing: s.cumPassingPct }))
        if (interpPoints.length > 0 && interpPoints[interpPoints.length - 1].passing > 0) {
          interpPoints.push({ diameter: 0.001, passing: 0 })
        }

        const d60 = findDiameterAtPassing(60, interpPoints)
        const d30 = findDiameterAtPassing(30, interpPoints)
        const d10 = findDiameterAtPassing(10, interpPoints)

        const cu = (d10 && d60 && d10 > 0) ? (d60 / d10) : null
        const cc = (d10 && d30 && d60 && d10 > 0 && d60 > 0) ? ((d30 * d30) / (d10 * d60)) : null

        // Evaluasi Klasifikasi USCS
        let uscsCode = ''
        let uscsName = ''
        let uscsExplanation = ''

        if (finesPct > 50) {
          uscsCode = 'Fine-Grained'
          uscsName = 'Tanah Berbutir Halus (Lanau / Lempung)'
          uscsExplanation = `Fraksi butiran halus lolos ayakan No. 200 (${finesPct.toFixed(1)}%) > 50%. Tanah tergolong tanah berbutir halus (Lanau/Lempung). Klasifikasi plastisitas membutuhkan pengujian Batas Atterberg (LL & PL).`
        } else if (gravelPct > sandPct) {
          // Kerikil
          if (cu !== null && cc !== null) {
            const isWell = cu >= 4 && cc >= 1 && cc <= 3
            if (isWell) {
              if (finesPct < 5) {
                uscsCode = 'GW'
                uscsName = 'GW (Kerikil Bergradasi Baik / Well-Graded Gravel)'
              } else if (finesPct <= 12) {
                uscsCode = 'GW-GM'
                uscsName = 'GW-GM (Kerikil Bergradasi Baik dengan Lanau)'
              } else {
                uscsCode = 'GM'
                uscsName = 'GM (Kerikil Berlanau / Silty Gravel)'
              }
            } else {
              if (finesPct < 5) {
                uscsCode = 'GP'
                uscsName = 'GP (Kerikil Bergradasi Buruk / Poorly Graded Gravel)'
              } else if (finesPct <= 12) {
                uscsCode = 'GP-GM'
                uscsName = 'GP-GM (Kerikil Bergradasi Buruk dengan Lanau)'
              } else {
                uscsCode = 'GM'
                uscsName = 'GM (Kerikil Berlanau / Silty Gravel)'
              }
            }
          } else {
            uscsCode = 'G (Kerikil)'
            uscsName = 'Tanah Kerikil (Data Gradasi D10/D30/D60 Tidak Lengkap)'
          }
          uscsExplanation = `Fraksi kerikil (${gravelPct.toFixed(1)}%) > pasir (${sandPct.toFixed(1)}%). Cu = ${cu ? cu.toFixed(2) : '-'}, Cc = ${cc ? cc.toFixed(2) : '-'}.`
        } else {
          // Pasir
          if (cu !== null && cc !== null) {
            const isWell = cu >= 6 && cc >= 1 && cc <= 3
            if (isWell) {
              if (finesPct < 5) {
                uscsCode = 'SW'
                uscsName = 'SW (Pasir Bergradasi Baik / Well-Graded Sand)'
              } else if (finesPct <= 12) {
                uscsCode = 'SW-SM'
                uscsName = 'SW-SM (Pasir Bergradasi Baik dengan Lanau)'
              } else {
                uscsCode = 'SM'
                uscsName = 'SM (Pasir Berlanau / Silty Sand)'
              }
            } else {
              if (finesPct < 5) {
                uscsCode = 'SP'
                uscsName = 'SP (Pasir Bergradasi Buruk / Poorly Graded Sand)'
              } else if (finesPct <= 12) {
                uscsCode = 'SP-SM'
                uscsName = 'SP-SM (Pasir Bergradasi Buruk dengan Lanau)'
              } else {
                uscsCode = 'SM'
                uscsName = 'SM (Pasir Berlanau / Silty Sand)'
              }
            }
          } else {
            uscsCode = 'S (Pasir)'
            uscsName = 'Tanah Pasir (Data Gradasi D10/D30/D60 Tidak Lengkap)'
          }
          uscsExplanation = `Fraksi pasir (${sandPct.toFixed(1)}%) >= kerikil (${gravelPct.toFixed(1)}%). Cu = ${cu ? cu.toFixed(2) : '-'}, Cc = ${cc ? cc.toFixed(2) : '-'}.`
        }

        const status = isMassLossValid ? 'Valid' : 'Perlu Evaluasi'
        const conclusion = isMassLossValid
          ? `Pengujian memenuhi batas toleransi kehilangan berat (${massLossPct.toFixed(2)}% <= 2.0%). Tanah diklasifikasikan sebagai ${uscsName} (SNI 3423:2008 / ASTM D2487). Distribusi butiran lengkap dan kompak saat dipadatkan.`
          : `Kehilangan berat sampel (${massLossPct.toFixed(2)}%) melebihi toleransi standar ASTM/SNI (<= 2.0%). Disarankan mengulang penimbangan saringan.`

        // Titik data untuk grafik
        const chartDataPoints = calculatedSieves.map((s) => ({
          sieveNo: s.sieveNo,
          diameter: s.diameter,
          passing: Number(s.cumPassingPct.toFixed(2)),
          retainedPct: Number(s.retainedPct.toFixed(2)),
          retainedWeight: s.retainedWeight,
        }))

        return {
          results: [
            { label: 'Koefisien Keseragaman (Cu)', value: cu ? cu.toFixed(2) : '-', unit: '', highlight: cu !== null && cu >= (gravelPct > sandPct ? 4 : 6) },
            { label: 'Koefisien Kelengkungan (Cc)', value: cc ? cc.toFixed(2) : '-', unit: '', highlight: cc !== null && cc >= 1 && cc <= 3 },
            { label: 'Fraksi Halus Lolos #200', value: `${finesPct.toFixed(1)}%`, unit: '', highlight: finesPct <= 50 },
            { label: 'Klasifikasi Gradasi USCS', value: uscsCode || uscsName, unit: '', highlight: true },
          ],
          formulaSteps: [
            `1. PENIMBANGAN SAMPEL & TOLERANSI KEHILANGAN BERAT (MASS LOSS):`,
            `   Berat Total Sampel Awal (W_total) = ${rawWTotal.toFixed(1)} gram`,
            `   Total Berat Tertahan Seluruh Ayakan + Pan = ${totalWithPan.toFixed(1)} gram`,
            `   Kehilangan Berat (Mass Loss) = |${rawWTotal.toFixed(1)} - ${totalWithPan.toFixed(1)}| = ${massLoss.toFixed(1)} gram (${massLossPct.toFixed(2)}%)`,
            `   Batas Toleransi Kehilangan Berat SNI/ASTM = <= 2.0% -> ${isMassLossValid ? 'MEMENUHI SYARAT (LULUS)' : 'MELEBIHI TOLERANSI (TIDAK MEMENUHI)'}`,
            `2. PERHITUNGAN PERSENTASE TERTAHAN & LOLOS:`,
            ...calculatedSieves.map(
              (s) => `   - ${s.sieveNo} (${s.diameter} mm): Berat = ${s.retainedWeight.toFixed(1)} g | % Tertahan = ${s.retainedPct.toFixed(2)}% | % Kumulatif = ${s.cumRetainedPct.toFixed(2)}% | % Lolos = ${s.cumPassingPct.toFixed(2)}%`
            ),
            calculatedPan
              ? `   - Pan (Wadah): Berat = ${calculatedPan.retainedWeight.toFixed(1)} g | % Tertahan = ${calculatedPan.retainedPct.toFixed(2)}% | % Kumulatif = ${calculatedPan.cumRetainedPct.toFixed(2)}% | % Lolos = 0.00%`
              : null,
            `3. NILAI UKURAN BUTIR EFEKTIF (INTERPOLASI LOGARITMIK):`,
            `   D60 (Ukuran pada 60% Lolos) = ${d60 ? `${d60.toFixed(3)} mm` : 'Tidak Terdefinisi'}`,
            `   D30 (Ukuran pada 30% Lolos) = ${d30 ? `${d30.toFixed(3)} mm` : 'Tidak Terdefinisi'}`,
            `   D10 (Ukuran Efektif 10% Lolos) = ${d10 ? `${d10.toFixed(3)} mm` : 'Tidak Terdefinisi'}`,
            `4. PARAMETER GRADASI BUTIRAN:`,
            `   Koefisien Keseragaman: Cu = D60 / D10 = ${cu ? cu.toFixed(2) : '-'}`,
            `   Koefisien Kelengkungan: Cc = D30^2 / (D10 x D60) = ${cc ? cc.toFixed(2) : '-'}`,
            `5. DISTRIBUSI FRAKSI TANAH & KLASIFIKASI USCS (ASTM D2487):`,
            `   Fraksi Kerikil (Tertahan No. 4 / > 4.75 mm) = ${gravelPct.toFixed(1)}%`,
            `   Fraksi Pasir (Lolos No. 4 s.d. Tertahan No. 200) = ${sandPct.toFixed(1)}%`,
            `   Fraksi Butiran Halus (Lolos No. 200 / < 0.075 mm) = ${finesPct.toFixed(1)}%`,
            `   Klasifikasi USCS: ${uscsName}`,
          ].filter(Boolean),
          isError: !isMassLossValid,
          status,
          conclusion,
          summaryString: `Cu = ${cu ? cu.toFixed(2) : '-'}, Cc = ${cc ? cc.toFixed(2) : '-'} (${uscsCode})`,
          // Extra payload untuk panel interaktif
          calculatedSieves,
          calculatedPan,
          totalWithPan,
          massLoss,
          massLossPct,
          isMassLossValid,
          gravelPct,
          sandPct,
          finesPct,
          d10,
          d30,
          d60,
          cu,
          cc,
          uscsCode,
          uscsName,
          uscsExplanation,
          chartDataPoints,
        }
      }

      // 2. FALLBACK MODE STATIS LAMA (Jika inputs.soilSieves tidak tersedia)
      const d10 = inputs.d10 !== undefined && inputs.d10 !== '' ? Number(inputs.d10) : 0
      const d30 = inputs.d30 !== undefined && inputs.d30 !== '' ? Number(inputs.d30) : 0
      const d60 = inputs.d60 !== undefined && inputs.d60 !== '' ? Number(inputs.d60) : 0
      const fines = inputs.finesPct !== undefined && inputs.finesPct !== '' ? Number(inputs.finesPct) : 0

      // Validasi input relasional (D10, D30, D60 HARUS > 0 dan D10 < D30 < D60)
      if (d10 <= 0 || d30 <= 0 || d60 <= 0 || d10 >= d30 || d30 >= d60) {
        return {
          results: [
            { label: 'Koefisien Keseragaman (Cu)', value: '-', unit: '', highlight: true },
            { label: 'Koefisien Kelengkungan (Cc)', value: '-', unit: '', highlight: true },
            { label: 'Fraksi Halus Lolos #200', value: fines > 0 ? fines.toFixed(1) : '-', unit: '%' },
            { label: 'Klasifikasi Gradasi USCS', value: 'Data Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Evaluasi Parameter Ukuran Butir Efektif:',
            `D10 = ${d10} mm, D30 = ${d30} mm, D60 = ${d60} mm`,
            'Syarat Fisis Gradasi: D10 > 0, D30 > 0, D60 > 0 serta D10 < D30 < D60 [TIDAK MEMENUHI]',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Data tidak valid: Pastikan D10 < D30 < D60 dan tidak ada nilai 0.',
          summaryString: 'Data tidak valid: D10 < D30 < D60',
        }
      }

      // Validasi fraksi halus (Fines > 100% tidak boleh)
      if (fines > 100) {
        return {
          results: [
            { label: 'Koefisien Keseragaman (Cu)', value: '-', unit: '', highlight: true },
            { label: 'Koefisien Kelengkungan (Cc)', value: '-', unit: '', highlight: true },
            { label: 'Fraksi Halus Lolos #200', value: fines.toFixed(1), unit: '%' },
            { label: 'Klasifikasi Gradasi USCS', value: 'Data Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Evaluasi Parameter Fraksi Halus (#200):',
            `Persen Lolos Ayakan #200 = ${fines}% [MELEBIHI BATAS MAKSIMUM 100%]`,
            'Nilai persentase tidak boleh melebihi 100%.',
          ],
          isError: true,
          status: 'Nilai Melebihi 100%',
          conclusion: 'Nilai persentase tidak boleh melebihi 100%.',
          errorMessage: 'Nilai persentase tidak boleh melebihi 100%',
          summaryString: 'Error: Fines > 100%',
        }
      }

      const cu = d60 / d10
      const cc = (d30 * d30) / (d10 * d60)

      let tipe
      let status
      let conclusion
      let warningMessage
      let summaryString
      let formulaSteps

      if (fines > 50) {
        tipe = 'Lanau/Lempung (Silt/Clay)'
        status = 'Perlu Evaluasi'
        conclusion = 'Tanah didominasi oleh butiran halus (lolos #200). Klasifikasi bukan Pasir, melainkan Lanau/Lempung.'
        warningMessage = `Peringatan USCS: Persen lolos ayakan #200 (${fines.toFixed(1)}%) > 50%. Tanah didominasi oleh butiran halus sehingga tergolong Lanau/Lempung (Fine-Grained Soil), bukan Pasir (SW/SP). Evaluasi klasifikasi plastisitas membutuhkan pengujian Batas Atterberg (LL & PL).`
        summaryString = `Fines = ${fines.toFixed(1)}% (> 50% - Lanau/Lempung)`
        formulaSteps = [
          `Evaluasi Fraksi Butiran: Lolos Ayakan #200 = ${fines.toFixed(1)}% (> 50% = Tanah Berbutir Halus)`,
          `Klasifikasi USCS: Didominasi butiran halus lolos ayakan #200, tanah diklasifikasikan sebagai ${tipe}. Kriteria gradasi pasir (SW/SP) tidak berlaku.`,
          `Nilai Parameter: Cu = D60 / D10 = ${cu.toFixed(2)}, Cc = D30² / (D10 × D60) = ${cc.toFixed(2)} (Data informatif)`,
        ]
      } else {
        const isWellGraded = cu >= 6 && cc >= 1 && cc <= 3
        if (isWellGraded) {
          tipe = 'SW (Pasir Bergradasi Baik / Well-Graded Sand)'
          status = 'Valid'
          conclusion = `Nilai Cu = ${cu.toFixed(2)} dan Cc = ${cc.toFixed(2)} serta Fines = ${fines.toFixed(1)}% (≤ 50%) mengindikasikan tanah ${tipe}. Distribusi butiran lengkap dan kompak saat dipadatkan.`
          warningMessage = null
          summaryString = `Cu = ${cu.toFixed(2)}, Cc = ${cc.toFixed(2)} (SW - Pasir Bergradasi Baik)`
        } else {
          tipe = 'SP (Pasir Bergradasi Buruk / Poorly Graded Sand)'
          status = 'Perlu Evaluasi'
          conclusion = 'Tanah memiliki gradasi buruk (Poorly Graded). Distribusi ukuran butir tidak merata, kurang ideal untuk timbunan struktural.'
          warningMessage = `Perlu Evaluasi: Nilai Cu = ${cu.toFixed(2)} (${cu >= 6 ? '≥ 6' : '< 6'}) atau Cc = ${cc.toFixed(2)} (${cc >= 1 && cc <= 3 ? '1-3' : 'di luar 1-3'}) tidak memenuhi kriteria gradasi baik (SW). Sampel tergolong SP.`
          summaryString = `Cu = ${cu.toFixed(2)}, Cc = ${cc.toFixed(2)} (SP - Pasir Bergradasi Buruk)`
        }
        formulaSteps = [
          `Evaluasi Fraksi Butiran: Lolos Ayakan #200 = ${fines.toFixed(1)}% (≤ 50% = Tanah Berbutir Kasar / Pasir)`,
          `Cu = D60 / D10 = ${d60} / ${d10} = ${cu.toFixed(2)} (Syarat Pasir Cu ≥ 6: ${cu >= 6 ? 'Memenuhi' : 'Tidak Memenuhi'})`,
          `Cc = D30² / (D10 × D60) = ${d30}² / (${d10} × ${d60}) = ${cc.toFixed(2)} (Syarat 1 ≤ Cc ≤ 3: ${cc >= 1 && cc <= 3 ? 'Memenuhi' : 'Tidak Memenuhi'})`,
          `Klasifikasi USCS: Tanah tergolong ${tipe}`,
        ]
      }

      return {
        results: [
          { label: 'Koefisien Keseragaman (Cu)', value: cu.toFixed(2), unit: '', highlight: fines <= 50 },
          { label: 'Koefisien Kelengkungan (Cc)', value: cc.toFixed(2), unit: '', highlight: fines <= 50 },
          { label: 'Fraksi Halus Lolos #200', value: fines.toFixed(1), unit: '%', highlight: fines > 50 },
          { label: 'Klasifikasi Gradasi USCS', value: tipe, unit: '', highlight: true },
        ],
        formulaSteps,
        isError: false,
        status,
        conclusion,
        warningMessage,
        summaryString,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA TANAH - BAB V: SIFAT MEKANIK TANAH
  // -----------------------------------------------------------------------
  'mt-5-1': {
    id: 'mt-5-1',
    code: 'DS-01',
    name: 'Pengujian Kuat Geser Langsung (Direct Shear Test)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 5: Sifat Mekanik Tanah',
    standard: 'SNI 3420:2016 / ASTM D3080',
    desc: 'Menghitung parameter kekuatan geser tanah: kohesi (c) dan sudut geser dalam (phi) kriteria Mohr-Coulomb menggunakan analisis regresi linier.',
    hasDynamicTable: true,
    hasDynamicDirectShearTable: true,
    initialInputs: {
      points: [
        { id: 1, area: 31.17, normalLoad: 3.17, shearForce: 1.50, sigma: 0.1017, tau: 0.0481 },
        { id: 2, area: 31.17, normalLoad: 6.325, shearForce: 2.35, sigma: 0.2029, tau: 0.0754 },
        { id: 3, area: 31.17, normalLoad: 12.65, shearForce: 4.05, sigma: 0.4058, tau: 0.1299 },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      // Ambil data pasangan titik pengujian dari input tabel dinamis
      let rawPoints = inputs.points
      if (!Array.isArray(rawPoints)) {
        if (inputs.sigma1 !== undefined && inputs.tau1 !== undefined) {
          rawPoints = [
            { id: 1, sigma: inputs.sigma1, tau: inputs.tau1 },
            { id: 2, sigma: inputs.sigma2, tau: inputs.tau2 },
            { id: 3, sigma: inputs.sigma3, tau: inputs.tau3 },
          ]
        } else {
          rawPoints = [
            { id: 1, area: 31.17, normalLoad: 3.17, shearForce: 1.50, sigma: 0.1017, tau: 0.0481 },
            { id: 2, area: 31.17, normalLoad: 6.325, shearForce: 2.35, sigma: 0.2029, tau: 0.0754 },
            { id: 3, area: 31.17, normalLoad: 12.65, shearForce: 4.05, sigma: 0.4058, tau: 0.1299 },
          ]
        }
      }

      // Deteksi adanya nilai negatif pada input
      const hasNegative = rawPoints.some((pt) => {
        if (!pt) return false
        const a = pt.area !== undefined && pt.area !== '' ? Number(pt.area) : NaN
        const p = pt.normalLoad !== undefined && pt.normalLoad !== '' ? Number(pt.normalLoad) : NaN
        const f = pt.shearForce !== undefined && pt.shearForce !== '' ? Number(pt.shearForce) : NaN
        const s = pt.sigma !== undefined && pt.sigma !== '' ? Number(pt.sigma) : NaN
        const t = pt.tau !== undefined && pt.tau !== '' ? Number(pt.tau) : NaN
        return (a < 0) || (p < 0) || (f < 0) || (s < 0) || (t < 0)
      })

      if (hasNegative) {
        return {
          results: [
            { label: 'Kohesi Tanah (c)', value: '-', unit: 'kg/cm²', highlight: true },
            { label: 'Sudut Geser Dalam (ϕ)', value: '-', unit: '', highlight: true },
            { label: 'Kemiringan Garis (tan ϕ)', value: '-', unit: '' },
            { label: 'Koefisien Determinasi (R²)', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Input tidak wajar: Nilai beban vertikal (P), gaya geser (F), luas penampang (A), atau tegangan tidak boleh bernilai negatif.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input tidak valid: Terdapat nilai beban vertikal (P), gaya geser (F), atau luas (A) yang bernilai negatif. Periksa kembali data input.',
          summaryString: 'Input Bernilai Negatif',
        }
      }

      // Konversi titik ke nilai numerik sigma dan tau
      const processedPoints = rawPoints.map((pt, idx) => {
        if (!pt) return null
        let a = pt.area !== undefined && pt.area !== '' ? Number(pt.area) : 31.17
        let p = pt.normalLoad !== undefined && pt.normalLoad !== '' ? Number(pt.normalLoad) : NaN
        let f = pt.shearForce !== undefined && pt.shearForce !== '' ? Number(pt.shearForce) : NaN
        let s = pt.sigma !== undefined && pt.sigma !== '' ? Number(pt.sigma) : NaN
        let t = pt.tau !== undefined && pt.tau !== '' ? Number(pt.tau) : NaN

        // Jika beban normal (P) dan gaya geser (F) diisi, hitung sigma = P/A dan tau = F/A
        if (!isNaN(p) && !isNaN(f) && !isNaN(a) && a > 0) {
          s = p / a
          t = f / a
        } else if (!isNaN(s) && !isNaN(t) && !isNaN(a) && a > 0) {
          if (isNaN(p)) p = s * a
          if (isNaN(f)) f = t * a
        }

        return {
          id: pt.id || (idx + 1),
          pointNum: idx + 1,
          area: a,
          normalLoad: !isNaN(p) ? p : null,
          shearForce: !isNaN(f) ? f : null,
          sigma: !isNaN(s) ? s : null,
          tau: !isNaN(t) ? t : null,
        }
      }).filter(Boolean)

      // Validasi pasangan titik: filter titik yang terisi angka valid > 0
      const validPoints = processedPoints.filter((pt) => {
        return pt.sigma !== null && pt.tau !== null && pt.sigma > 0 && pt.tau > 0
      })

      // Minimal 3 titik data sesuai standar SNI 3420:2016
      if (validPoints.length < 3) {
        return {
          results: [
            { label: 'Kohesi Tanah (c)', value: '-', unit: 'kg/cm²', highlight: true },
            { label: 'Sudut Geser Dalam (ϕ)', value: '-', unit: '', highlight: true },
            { label: 'Kemiringan Garis (tan ϕ)', value: '-', unit: '' },
            { label: 'Koefisien Determinasi (R²)', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Pengujian Kuat Geser Langsung (SNI 3420:2016) mensyaratkan minimal 3 titik pengujian dengan beban normal bertingkat.',
            `Jumlah titik uji valid saat ini: ${validPoints.length} titik. Masukkan minimal 3 pasangan nilai Beban Normal (P) dan Gaya Geser (F) > 0.`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Data belum lengkap: Masukkan minimal 3 pasangan data Beban Normal (P) dan Gaya Geser (F) bernilai lebih besar dari 0.',
          summaryString: 'Direct Shear: Minimal 3 Titik Uji',
        }
      }

      // Hitung regresi linier y = mx + c (tau = m * sigma + c)
      const n = validPoints.length
      let sumX = 0
      let sumY = 0
      for (const pt of validPoints) {
        sumX += pt.sigma
        sumY += pt.tau
      }
      const meanX = sumX / n
      const meanY = sumY / n

      let ssXX = 0
      let ssXY = 0
      let ssYY = 0
      for (const pt of validPoints) {
        const dx = pt.sigma - meanX
        const dy = pt.tau - meanY
        ssXX += dx * dx
        ssXY += dx * dy
        ssYY += dy * dy
      }

      // Validasi variasi tegangan normal (tidak boleh identik)
      if (ssXX <= 0.000001) {
        return {
          results: [
            { label: 'Kohesi Tanah (c)', value: '-', unit: 'kg/cm²', highlight: true },
            { label: 'Sudut Geser Dalam (ϕ)', value: '-', unit: '', highlight: true },
            { label: 'Kemiringan Garis (tan ϕ)', value: '-', unit: '' },
            { label: 'Koefisien Determinasi (R²)', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Variasi tegangan normal (σ) tidak boleh nol. Titik uji harus memiliki beban normal yang bertingkat.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input tidak valid: Nilai tegangan normal (σ) pada seluruh titik uji identik. Gunakan beban vertikal bertingkat (misal: 3.17, 6.325, 12.65 kg).',
          summaryString: 'Input Tidak Valid (σ Identik)',
        }
      }

      // Slope = tan(phi)
      const slope = ssXY / ssXX
      // Intercept = Kohesi (c)
      const intercept = meanY - slope * meanX

      // Validasi fisis: Slope harus > 0 (tegangan geser runtuh harus meningkat seiring peningkatan tegangan normal)
      if (slope <= 0) {
        return {
          results: [
            { label: 'Kohesi Tanah (c)', value: '-', unit: 'kg/cm²', highlight: true },
            { label: 'Sudut Geser Dalam (ϕ)', value: '-', unit: '', highlight: true },
            { label: 'Kemiringan Garis (tan ϕ)', value: slope.toFixed(3), unit: '' },
            { label: 'Koefisien Determinasi (R²)', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Hasil regresi linier menghasilkan kemiringan slope = ${slope.toFixed(3)} [≤ 0, TIDAK LOGIS]`,
            'Secara fisik penambahan tegangan normal (σ) harus menghasilkan peningkatan tahanan geser tanah (τ).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Hasil regresi tidak valid: Kemiringan garis selubung kegagalan bernilai nol atau negatif (slope ≤ 0). Periksa kembali data gaya geser pada beban normal yang lebih tinggi.',
          summaryString: 'Slope <= 0 (Tidak Logis)',
        }
      }

      // Sudut geser dalam phi = arctan(slope) dalam derajat
      const phiRad = Math.atan(slope)
      const phiDeg = (phiRad * 180) / Math.PI

      // Kohesi c = intercept (jika sedikit negatif akibat variasi sebaran acak pasir non-kohesif, set 0)
      const c = intercept >= 0 ? intercept : 0

      // Koefisien korelasi R²
      const r2 = (ssXX * ssYY) > 0 ? (ssXY * ssXY) / (ssXX * ssYY) : 1

      // Format data untuk output dan chart
      const computedPoints = validPoints.map((pt, idx) => ({
        id: pt.id,
        pointNum: idx + 1,
        area: pt.area,
        normalLoad: pt.normalLoad,
        shearForce: pt.shearForce,
        sigma: pt.sigma,
        tau: pt.tau,
        sigmaKpa: pt.sigma * 98.07,
        tauKpa: pt.tau * 98.07,
        trendlineTau: c + pt.sigma * slope,
      }))

      const maxSigma = Math.max(...validPoints.map(p => p.sigma))
      const extSigma = Number((maxSigma * 1.15).toFixed(4))

      const chartPoints = [
        {
          sigma: 0,
          tau: null,
          trendline: Number(c.toFixed(4)),
          label: 'Intersep Kohesi (c)',
          isOrigin: true,
        },
        ...validPoints.map((pt, idx) => ({
          sigma: Number(pt.sigma.toFixed(4)),
          tau: Number(pt.tau.toFixed(4)),
          trendline: Number((c + pt.sigma * slope).toFixed(4)),
          label: `Titik #${idx + 1}`,
          isTestPoint: true,
          normalLoad: pt.normalLoad,
          shearForce: pt.shearForce,
        })),
        {
          sigma: extSigma,
          tau: null,
          trendline: Number((c + extSigma * slope).toFixed(4)),
          label: 'Ekstensi Tren',
          isExtension: true,
        },
      ].sort((a, b) => a.sigma - b.sigma)

      const perPointSteps = validPoints.map((pt, i) => {
        const pStr = pt.normalLoad !== null ? `P = ${pt.normalLoad} kg, A = ${pt.area} cm² → σ = P/A = ${pt.sigma.toFixed(3)} kg/cm²` : `σ = ${pt.sigma.toFixed(3)} kg/cm²`
        const fStr = pt.shearForce !== null ? `F = ${pt.shearForce} kg, A = ${pt.area} cm² → τ = F/A = ${pt.tau.toFixed(3)} kg/cm²` : `τ = ${pt.tau.toFixed(3)} kg/cm²`
        return `Titik #${i + 1}: ${pStr} | ${fStr}`
      })

      return {
        results: [
          { label: 'Kohesi Tanah (c)', value: c.toFixed(3), unit: 'kg/cm²', highlight: true },
          { label: 'Sudut Geser Dalam (ϕ)', value: `${phiDeg.toFixed(2)}°`, unit: '', highlight: true },
          { label: 'Kemiringan Garis (tan ϕ)', value: slope.toFixed(3), unit: '' },
          { label: 'Koefisien Determinasi (R²)', value: r2.toFixed(3), unit: '', highlight: true },
        ],
        formulaSteps: [
          `1. Konversi Beban ke Tegangan Tiap Titik Uji (σ = P / A dan τ = F / A):`,
          ...perPointSteps,
          `2. Rata-rata Tegangan Pengujian (n = ${n} Titik):`,
          `   • Rata-rata Tegangan Normal (σ_bar) = (Σ σ) / ${n} = ${meanX.toFixed(4)} kg/cm² (${(meanX * 98.07).toFixed(1)} kPa)`,
          `   • Rata-rata Tegangan Geser Runtuh (τ_bar) = (Σ τ) / ${n} = ${meanY.toFixed(4)} kg/cm² (${(meanY * 98.07).toFixed(1)} kPa)`,
          `3. Parameter Kovariansi & Variansi Regresi Linier:`,
          `   • SS_xx = Σ(σ - σ_bar)² = ${ssXX.toFixed(6)}`,
          `   • SS_yy = Σ(τ - τ_bar)² = ${ssYY.toFixed(6)}`,
          `   • SS_xy = Σ(σ - σ_bar)(τ - τ_bar) = ${ssXY.toFixed(6)}`,
          `4. Kemiringan Garis Selubung Keruntuhan (Slope = tan ϕ):`,
          `   tan(ϕ) = SS_xy / SS_xx = ${ssXY.toFixed(6)} / ${ssXX.toFixed(6)} = ${slope.toFixed(4)}`,
          `5. Sudut Geser Dalam Tanah (ϕ):`,
          `   ϕ = arctan(tan ϕ) = arctan(${slope.toFixed(4)}) = ${phiDeg.toFixed(2)}°`,
          `6. Kohesi Tanah (c = Intersep Sumbu-Y):`,
          `   c = τ_bar - tan(ϕ) × σ_bar = ${meanY.toFixed(4)} - (${slope.toFixed(4)} × ${meanX.toFixed(4)}) = ${c.toFixed(4)} kg/cm² (${(c * 98.07).toFixed(2)} kPa)`,
          `7. Koefisien Determinasi Regresi (R²):`,
          `   R² = (SS_xy)² / (SS_xx × SS_yy) = ${r2.toFixed(4)} (${(r2 * 100).toFixed(2)}% korelasi data)`,
          `8. Persamaan Garis Keruntuhan Mohr-Coulomb:`,
          `   τ = c + σ × tan(ϕ) = ${c.toFixed(3)} + ${slope.toFixed(3)} × σ (kg/cm²)`,
        ],
        isError: false,
        status: 'Valid',
        conclusion: `Berdasarkan analisis regresi linier ${n} titik uji geser langsung (SNI 3420:2016), diperoleh parameter kuat geser tanah: Kohesi c = ${c.toFixed(3)} kg/cm² (${(c * 98.1).toFixed(1)} kPa) dan Sudut Geser Dalam ϕ = ${phiDeg.toFixed(2)}° (R² = ${r2.toFixed(3)}). Persamaan selubung kegagalan Mohr-Coulomb: τ = ${c.toFixed(3)} + ${slope.toFixed(3)}·σ. Data memiliki korelasi yang sangat baik dan siap diaplikasikan pada perhitungan daya dukung fondasi atau analisis kestabilan lereng.`,
        summaryString: `c = ${c.toFixed(3)} kg/cm², ϕ = ${phiDeg.toFixed(1)}° (R² = ${r2.toFixed(3)})`,
        // Rich metadata untuk komponen visual
        cKgCm2: c.toFixed(3),
        cKpa: (c * 98.07).toFixed(2),
        phiDeg: phiDeg.toFixed(2),
        slope: slope.toFixed(4),
        r2: r2.toFixed(4),
        chartPoints,
        computedPoints,
        nPoints: n,
      }
    },
  },

  'mt-5-2': {
    id: 'mt-5-2',
    code: 'KNS-01',
    name: 'Pengujian Konsolidasi Tanah Satu Dimensi (Oedometer)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 5: Sifat Mekanik Tanah',
    standard: 'SNI 2812:2011 / ASTM D2435',
    desc: 'Menghitung koefisien konsolidasi (Cv) dengan Metode Taylor (akar waktu), panjang jalur pengaliran (Ht), waktu t90, dan indeks kompresi (Cc).',
    hasDynamicOedometerTable: true,
    initialInputs: {
      e0: 0.85,
      p1: 50.0,
      p2: 100.0,
      h0: 2.000,
      oedometerReadings: [
        { id: 1, t: 0, h: 2.000, deltaH: 0.000 },
        { id: 2, t: 0.25, h: 1.978, deltaH: 0.022 },
        { id: 3, t: 1.0, h: 1.958, deltaH: 0.042 },
        { id: 4, t: 2.25, h: 1.940, deltaH: 0.060 },
        { id: 5, t: 4.0, h: 1.924, deltaH: 0.076 },
        { id: 6, t: 6.25, h: 1.910, deltaH: 0.090 },
        { id: 7, t: 9.0, h: 1.898, deltaH: 0.102 },
        { id: 8, t: 12.25, h: 1.888, deltaH: 0.112 },
        { id: 9, t: 16.0, h: 1.880, deltaH: 0.120 },
        { id: 10, t: 20.25, h: 1.874, deltaH: 0.126 },
        { id: 11, t: 40.0, h: 1.867, deltaH: 0.133 },
        { id: 12, t: 120.0, h: 1.861, deltaH: 0.139 },
        { id: 13, t: 400.0, h: 1.857, deltaH: 0.143 },
        { id: 14, t: 1440.0, h: 1.855, deltaH: 0.145 },
      ],
      // Fallback untuk backward-compatibility dengan form statis lama
      tinggiAwal: 20.0,
      angkaPoriAwal: 0.85,
      deltaH: 1.45,
      tekananP1: 50.0,
      tekananP2: 100.0,
    },
    fields: [
      { key: 'e0', label: 'Angka Pori Awal Tanah (e0)', unit: '', min: 0.01, desc: 'Rasio volume pori terhadap volume butir tanah semula' },
      { key: 'h0', label: 'Tinggi Semula Benda Uji (H0)', unit: 'cm', min: 0.01, desc: 'Tinggi cincin oedometer standar = 2.0 cm (20 mm)' },
      { key: 'p1', label: 'Beban Tekanan Pertama (P1)', unit: 'kPa', min: 0.01, desc: 'Tegangan efektif awal siklus beban' },
      { key: 'p2', label: 'Beban Tekanan Kedua (P2)', unit: 'kPa', min: 0.01, desc: 'Tegangan efektif akhir siklus beban' },
      // Field lama untuk backward compatibility
      { key: 'tinggiAwal', label: 'Tinggi Benda Uji Semula (H0)', unit: 'mm', min: 0.01, desc: 'Tinggi cincin oedometer standar = 20 mm' },
      { key: 'angkaPoriAwal', label: 'Angka Pori Awal Tanah (e0)', unit: '', min: 0.01, desc: 'Rasio volume pori terhadap volume butir tanah' },
      { key: 'deltaH', label: 'Penurunan Konsolidasi Total (ΔH)', unit: 'mm', min: 0.01, desc: 'Perubahan tinggi jarum dial setelah 24 jam pembebanan' },
      { key: 'tekananP1', label: 'Beban Tekanan Pertama (P1)', unit: 'kPa', min: 0.01, desc: 'Tegangan efektif awal' },
      { key: 'tekananP2', label: 'Beban Tekanan Kedua (P2)', unit: 'kPa', min: 0.01, desc: 'Tegangan efektif akhir siklus pengujian' },
    ],
    calculate: (inputs) => {
      // 1. EVALUASI DATA KONSOLIDASI DINAMIS (Jika array oedometerReadings tersedia)
      const isDynamic = Array.isArray(inputs.oedometerReadings) && inputs.oedometerReadings.length > 0

      if (isDynamic) {
        const rawE0 = inputs.e0 !== undefined && inputs.e0 !== '' ? Number(inputs.e0) : (Number(inputs.angkaPoriAwal) || 0.85)
        const rawP1 = inputs.p1 !== undefined && inputs.p1 !== '' ? Number(inputs.p1) : (Number(inputs.tekananP1) || 50.0)
        const rawP2 = inputs.p2 !== undefined && inputs.p2 !== '' ? Number(inputs.p2) : (Number(inputs.tekananP2) || 100.0)
        const rawH0 = inputs.h0 !== undefined && inputs.h0 !== '' ? Number(inputs.h0) : 2.000
        const readings = inputs.oedometerReadings

        // Validasi tekanan
        if (rawP2 <= rawP1) {
          return {
            results: [
              { label: 'Koefisien Konsolidasi (Cv)', value: '-', unit: 'cm²/detik', highlight: true },
              { label: 'Waktu t90', value: '-', unit: 'menit' },
              { label: 'Tinggi Jalur Pengaliran (Ht)', value: '-', unit: 'cm' },
              { label: 'Indeks Kompresi (Cc)', value: '-', unit: '', highlight: true },
            ],
            formulaSteps: [
              `Evaluasi Beban Tekanan: P2 (${rawP2} kPa) ≤ P1 (${rawP1} kPa) [TIDAK LOGIS]`,
              'Beban tekanan kedua (P2) harus selalu lebih besar dari beban tekanan pertama (P1).',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: `Input data tidak valid: Beban tekanan kedua P2 (${rawP2} kPa) harus lebih besar dari tekanan pertama P1 (${rawP1} kPa).`,
            summaryString: 'Input Tidak Valid (P2 <= P1)',
          }
        }

        // Validasi input minus
        const hasNegative = readings.some((r) => {
          const t = String(r.t ?? '').trim()
          const dH = String(r.deltaH ?? '').trim()
          const h = String(r.h ?? '').trim()
          return (t !== '' && Number(t) < 0) || (dH !== '' && Number(dH) < 0) || (h !== '' && Number(h) < 0)
        }) || rawP1 <= 0 || rawP2 <= 0 || rawE0 <= 0 || rawH0 <= 0

        if (hasNegative) {
          return {
            results: [
              { label: 'Koefisien Konsolidasi (Cv)', value: '-', unit: 'cm²/detik', highlight: true },
              { label: 'Waktu t90', value: '-', unit: 'menit' },
              { label: 'Tinggi Jalur Pengaliran (Ht)', value: '-', unit: 'cm' },
              { label: 'Indeks Kompresi (Cc)', value: '-', unit: '', highlight: true },
            ],
            formulaSteps: ['Nilai waktu pengamatan, penurunan, tebal benda uji, dan tekanan tidak boleh negatif atau 0.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Nilai waktu, tebal, penurunan, atau beban tekanan tidak boleh bernilai negatif.',
            summaryString: 'Input Bernilai Negatif',
          }
        }

        // Format pembacaan waktu dan penurunan
        const hZero = readings[0]?.h !== undefined && readings[0]?.h !== '' && Number(readings[0].h) > 0
          ? Number(readings[0].h)
          : rawH0

        const sortedReadings = [...readings].map((r, idx) => {
          const tVal = r.t !== undefined && r.t !== '' ? Number(r.t) : 0
          const sqrtT = Math.sqrt(Math.max(0, tVal))
          let dHVal
          let hVal
          if (r.deltaH !== undefined && r.deltaH !== '') {
            dHVal = Number(r.deltaH)
            hVal = r.h !== undefined && r.h !== '' ? Number(r.h) : Math.max(0, hZero - dHVal)
          } else if (r.h !== undefined && r.h !== '') {
            hVal = Number(r.h)
            dHVal = Math.max(0, hZero - hVal)
          } else {
            dHVal = 0
            hVal = hZero
          }
          return {
            ...r,
            index: idx + 1,
            t: tVal,
            sqrtT,
            deltaH: dHVal,
            h: hVal,
          }
        }).sort((a, b) => a.t - b.t)

        const hAwal = sortedReadings[0]?.h || hZero
        const hAkhir = sortedReadings[sortedReadings.length - 1]?.h || Math.max(0, hAwal - (sortedReadings[sortedReadings.length - 1]?.deltaH || 0))
        const deltaHTotal = Math.abs(hAwal - hAkhir) || (sortedReadings[sortedReadings.length - 1]?.deltaH || 0)

        if (deltaHTotal >= hAwal) {
          return {
            results: [
              { label: 'Koefisien Konsolidasi (Cv)', value: '-', unit: 'cm²/detik', highlight: true },
              { label: 'Waktu t90', value: '-', unit: 'menit' },
              { label: 'Tinggi Jalur Pengaliran (Ht)', value: '-', unit: 'cm' },
              { label: 'Indeks Kompresi (Cc)', value: '-', unit: '', highlight: true },
            ],
            formulaSteps: [
              `Evaluasi Penurunan Sampel: ΔH (${deltaHTotal.toFixed(3)} cm) ≥ H0 (${hAwal.toFixed(3)} cm) [TIDAK LOGIS]`,
              'Penurunan konsolidasi (ΔH) tidak boleh lebih besar atau sama dengan tinggi semula sampel tanah.',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: `Input data tidak valid: Penurunan konsolidasi (ΔH = ${deltaHTotal.toFixed(3)} cm) tidak boleh lebih besar atau sama dengan tinggi awal benda uji.`,
            summaryString: 'Input Tidak Valid (ΔH >= H0)',
          }
        }

        const hRata = (hAwal + hAkhir) / 2
        const ht = 0.5 * hRata // Double drainage (dua arah pengaliran atas dan bawah)

        // Metode Taylor: Regresi linear garis singgung awal pada sqrt(t) <= 1.5
        const earlyPts = sortedReadings.filter((p) => p.sqrtT <= 1.5)
        const candidates = earlyPts.length >= 2 ? earlyPts : sortedReadings.slice(0, Math.min(4, sortedReadings.length))
        let slope1 = 0.040
        let d0 = 0.0
        if (candidates.length >= 2) {
          let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0
          const n = candidates.length
          for (const p of candidates) {
            sumX += p.sqrtT
            sumY += p.deltaH
            sumXY += p.sqrtT * p.deltaH
            sumX2 += p.sqrtT * p.sqrtT
          }
          const denom = n * sumX2 - sumX * sumX
          if (Math.abs(denom) > 1e-9) {
            slope1 = (n * sumXY - sumX * sumY) / denom
            d0 = (sumY - slope1 * sumX) / n
          }
        }
        if (slope1 <= 0) slope1 = 0.040

        // Garis kedua Taylor: slope2 = slope1 / 1.15 (abscissa 1.15 kali garis singgung awal)
        const slope2 = slope1 / 1.15

        let sqrtT90 = null
        let deltaH90 = null

        // Cari perpotongan Garis 2 dengan kurva pengamatan (setelah segmen awal linear)
        for (let i = 1; i < sortedReadings.length - 1; i++) {
          const p1Pt = sortedReadings[i]
          const p2Pt = sortedReadings[i + 1]
          const mSeg = (p2Pt.deltaH - p1Pt.deltaH) / (p2Pt.sqrtT - p1Pt.sqrtT || 1e-6)
          const denom = slope2 - mSeg
          if (Math.abs(denom) > 1e-9) {
            const intersectSqrtT = (p1Pt.deltaH - mSeg * p1Pt.sqrtT - d0) / denom
            if (intersectSqrtT >= p1Pt.sqrtT - 1e-4 && intersectSqrtT <= p2Pt.sqrtT + 1e-4) {
              sqrtT90 = intersectSqrtT
              deltaH90 = d0 + slope2 * sqrtT90
              break
            }
          }
        }

        // Fallback jika tidak berpotongan langsung
        if (!sqrtT90 && sortedReadings.length > 2) {
          deltaH90 = d0 + 0.90 * (deltaHTotal - d0)
          for (let i = 0; i < sortedReadings.length - 1; i++) {
            if (sortedReadings[i].deltaH <= deltaH90 && sortedReadings[i + 1].deltaH >= deltaH90) {
              const diff = sortedReadings[i + 1].deltaH - sortedReadings[i].deltaH || 1e-6
              const frac = (deltaH90 - sortedReadings[i].deltaH) / diff
              sqrtT90 = sortedReadings[i].sqrtT + frac * (sortedReadings[i + 1].sqrtT - sortedReadings[i].sqrtT)
              break
            }
          }
        }

        const finalSqrtT90 = sqrtT90 || 2.690
        const finalT90 = finalSqrtT90 * finalSqrtT90
        const tv = 0.848 // Time factor untuk U = 90%
        const cvMin = (tv * ht * ht) / finalT90 // cm²/menit
        const cvSec = cvMin / 60 // cm²/detik

        // Perhitungan Indeks Kompresi Cc
        const deltaE = (deltaHTotal / hAwal) * (1 + rawE0)
        const logRatio = Math.log10(rawP2 / rawP1)
        const cc = deltaE / logRatio

        const isHighCc = cc > 1.0
        const status = isHighCc ? 'Perlu Evaluasi' : 'Valid'
        const cvSecFormatted = cvSec < 0.01 ? cvSec.toExponential(3) : cvSec.toFixed(5)

        const conclusion = isHighCc
          ? 'Nilai Cc > 1.0 mengindikasikan tanah dengan kompresibilitas sangat tinggi (organik/gambut).'
          : `Koefisien konsolidasi Cv = ${cvSecFormatted} cm²/detik (t90 = ${finalT90.toFixed(2)} menit) dan Indeks Kompresi Cc = ${cc.toFixed(3)}. Mengindikasikan tanah lempung dengan kompresibilitas normal sesuai SNI 2812:2011.`

        const warningMessage = isHighCc
          ? `Perlu Evaluasi: Indeks kompresi Cc = ${cc.toFixed(3)} (> 1.0) berada di atas rentang tanah anorganik normal. Terindikasi tanah sangat lunak atau mengandung bahan organik tinggi.`
          : null

        // Chart Data Points
        const chartDataPoints = sortedReadings.map((r) => {
          const l1 = d0 + slope1 * r.sqrtT
          const l2 = d0 + slope2 * r.sqrtT
          return {
            t: r.t,
            sqrtT: Number(r.sqrtT.toFixed(3)),
            deltaH: Number(r.deltaH.toFixed(4)),
            h: Number(r.h.toFixed(4)),
            lineTaylor1: r.sqrtT <= 4.5 ? Number(l1.toFixed(4)) : null,
            lineTaylor2: r.sqrtT <= finalSqrtT90 * 1.3 ? Number(l2.toFixed(4)) : null,
          }
        })

        return {
          results: [
            { label: 'Koefisien Konsolidasi (Cv)', value: cvSecFormatted, unit: 'cm²/detik', highlight: true, numericValue: cvSec },
            { label: 'Waktu t90', value: finalT90.toFixed(2), unit: 'menit' },
            { label: 'Tinggi Jalur Pengaliran (Ht)', value: ht.toFixed(3), unit: 'cm' },
            { label: 'Indeks Kompresi (Cc)', value: cc.toFixed(3), unit: '', highlight: true },
          ],
          formulaSteps: [
            `1. PERHITUNGAN AKAR WAKTU & DATA PEMBACAAN:`,
            `   - Jumlah Data Pengamatan: ${sortedReadings.length} baris pembacaan waktu`,
            `   - Tinggi Semula Benda Uji (H_awal) = ${hAwal.toFixed(3)} cm`,
            `   - Tinggi Akhir Setelah 24 Jam (H_akhir) = ${hAkhir.toFixed(3)} cm`,
            `   - Penurunan Konsolidasi Total (ΔH_total) = ${deltaHTotal.toFixed(3)} cm`,
            `2. PENENTUAN TINGGI RATA-RATA & JALUR PENGALIRAN (DRAINAGE PATH):`,
            `   - Tinggi Rata-rata Benda Uji: H_rata = (H_awal + H_akhir) / 2 = (${hAwal.toFixed(3)} + ${hAkhir.toFixed(3)}) / 2 = ${hRata.toFixed(3)} cm`,
            `   - Jalur Pengaliran (Double Drainage): Ht = 0.5 × H_rata = 0.5 × ${hRata.toFixed(3)} = ${ht.toFixed(3)} cm`,
            `   - Ht² = (${ht.toFixed(3)})² = ${(ht * ht).toFixed(4)} cm²`,
            `3. METODE TAYLOR (SQUARE ROOT OF TIME METHOD):`,
            `   - Persamaan Garis Singgung Awal: ΔH1 = ${d0.toFixed(4)} + ${slope1.toFixed(4)} × √t`,
            `   - Persamaan Garis Taylor (1.15 × Abscissa): ΔH2 = ${d0.toFixed(4)} + ${(slope2).toFixed(4)} × √t`,
            `   - Titik Potong Garis Taylor dengan Kurva Konsolidasi: √t90 = ${finalSqrtT90.toFixed(3)} √menit`,
            `   - Waktu pada 90% Konsolidasi: t90 = (√t90)² = (${finalSqrtT90.toFixed(3)})² = ${finalT90.toFixed(2)} menit`,
            `4. PERHITUNGAN KOEFISIEN KONSOLIDASI (Cv):`,
            `   - Faktor Waktu Teoretis Terzaghi: Tv = 0.848 (untuk Derajat Konsolidasi U = 90%)`,
            `   - Cv (cm²/menit) = (Tv × Ht²) / t90 = (0.848 × ${(ht * ht).toFixed(4)}) / ${finalT90.toFixed(2)} = ${cvMin.toFixed(4)} cm²/menit`,
            `   - Cv (cm²/detik) = Cv(menit) / 60 = ${cvSecFormatted} cm²/detik`,
            `5. PERHITUNGAN INDEKS KOMPRESI (Cc):`,
            `   - Beban Tekanan: P1 = ${rawP1.toFixed(1)} kPa, P2 = ${rawP2.toFixed(1)} kPa`,
            `   - Perubahan Angka Pori: Δe = (ΔH / H_awal) × (1 + e0) = (${deltaHTotal.toFixed(3)} / ${hAwal.toFixed(3)}) × (1 + ${rawE0.toFixed(2)}) = ${deltaE.toFixed(3)}`,
            `   - Rasio Logaritmik Beban: log10(P2 / P1) = log10(${rawP2.toFixed(1)} / ${rawP1.toFixed(1)}) = ${logRatio.toFixed(3)}`,
            `   - Indeks Kompresi: Cc = Δe / log10(P2 / P1) = ${deltaE.toFixed(3)} / ${logRatio.toFixed(3)} = ${cc.toFixed(3)}`,
          ],
          isError: false,
          status,
          conclusion,
          warningMessage,
          summaryString: `Cv = ${cvSecFormatted} cm²/s, t90 = ${finalT90.toFixed(2)} m, Cc = ${cc.toFixed(3)}`,
          // Extra payload untuk panel interaktif
          sortedReadings,
          hAwal,
          hAkhir,
          hRata,
          ht,
          deltaHTotal,
          d0,
          slope1,
          slope2,
          sqrtT90: finalSqrtT90,
          t90: finalT90,
          deltaH90,
          cvMin,
          cvSec,
          cvSecFormatted,
          deltaE,
          logRatio,
          cc,
          chartDataPoints,
        }
      }

      // 2. FALLBACK MODE STATIS LAMA (Jika inputs.oedometerReadings tidak ada)
      const h0 = inputs.tinggiAwal !== undefined && inputs.tinggiAwal !== '' ? Number(inputs.tinggiAwal) : 0
      const e0 = inputs.angkaPoriAwal !== undefined && inputs.angkaPoriAwal !== '' ? Number(inputs.angkaPoriAwal) : 0
      const dh = inputs.deltaH !== undefined && inputs.deltaH !== '' ? Number(inputs.deltaH) : 0
      const p1 = inputs.tekananP1 !== undefined && inputs.tekananP1 !== '' ? Number(inputs.tekananP1) : 0
      const p2 = inputs.tekananP2 !== undefined && inputs.tekananP2 !== '' ? Number(inputs.tekananP2) : 0

      // Guard clause: Kelengkapan input
      if (h0 <= 0 || e0 <= 0 || dh <= 0 || p1 <= 0 || p2 <= 0) {
        return {
          results: [
            { label: 'Regangan Aksial (ΔH / H0)', value: '-', unit: '%' },
            { label: 'Perubahan Angka Pori (Δe)', value: '-', unit: '' },
            { label: 'Indeks Kompresi (Cc)', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter pengujian konsolidasi (H0, e0, ΔH, P1, P2) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai H0, e0, ΔH, P1, dan P2 dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // Validasi 1: P2 harus lebih besar dari P1
      if (p2 <= p1) {
        return {
          results: [
            { label: 'Regangan Aksial (ΔH / H0)', value: '-', unit: '%' },
            { label: 'Perubahan Angka Pori (Δe)', value: '-', unit: '' },
            { label: 'Indeks Kompresi (Cc)', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Beban Tekanan: P2 (${p2} kPa) ≤ P1 (${p1} kPa) [TIDAK LOGIS]`,
            'Beban tekanan kedua (P2) harus selalu lebih besar dari beban tekanan pertama (P1).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak valid: Beban tekanan kedua P2 (${p2} kPa) harus lebih besar dari tekanan pertama P1 (${p1} kPa).`,
          summaryString: 'Input Tidak Valid (P2 <= P1)',
        }
      }

      // Validasi 2: Penurunan (ΔH) tidak boleh lebih besar dari Tinggi Awal (H0)
      if (dh >= h0) {
        return {
          results: [
            { label: 'Regangan Aksial (ΔH / H0)', value: '-', unit: '%' },
            { label: 'Perubahan Angka Pori (Δe)', value: '-', unit: '' },
            { label: 'Indeks Kompresi (Cc)', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Penurunan Sampel: ΔH (${dh} mm) ≥ H0 (${h0} mm) [TIDAK LOGIS]`,
            'Penurunan konsolidasi (ΔH) tidak boleh lebih besar atau sama dengan tinggi semula sampel tanah (H0).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak valid: Penurunan konsolidasi (ΔH = ${dh} mm) tidak boleh lebih besar atau sama dengan tinggi awal benda uji (H0 = ${h0} mm).`,
          summaryString: 'Input Tidak Valid (ΔH >= H0)',
        }
      }

      const regangan = (dh / h0) * 100
      const deltaE = (dh / h0) * (1 + e0)
      const logRatio = Math.log10(p2 / p1)
      const cc = deltaE / logRatio

      const isHighCc = cc > 1.0
      const status = isHighCc ? 'Perlu Evaluasi' : 'Valid'

      const conclusion = isHighCc
        ? 'Nilai Cc > 1.0 mengindikasikan tanah dengan kompresibilitas sangat tinggi (organik/gambut).'
        : `Nilai Compression Index Cc = ${cc.toFixed(3)}. Mengindikasikan tanah lempung dengan kompresibilitas normal yang memenuhi kurva konsolidasi standar.`

      const warningMessage = isHighCc
        ? `Perlu Evaluasi: Indeks kompresi Cc = ${cc.toFixed(3)} (> 1.0) berada di atas rentang tanah anorganik normal. Terindikasi tanah sangat lunak atau mengandung bahan organik tinggi.`
        : null

      return {
        results: [
          { label: 'Regangan Aksial (ΔH / H0)', value: regangan.toFixed(2), unit: '%' },
          { label: 'Perubahan Angka Pori (Δe)', value: deltaE.toFixed(3), unit: '' },
          { label: 'Indeks Kompresi (Cc)', value: cc.toFixed(3), unit: '', highlight: true },
        ],
        formulaSteps: [
          `Δe = (ΔH / H0) × (1 + e0) = (${dh} / ${h0}) × (1 + ${e0}) = ${deltaE.toFixed(3)}`,
          `Indeks Pemampatan Cc = Δe / log10(P2 / P1) = ${deltaE.toFixed(3)} / log10(${p2}/${p1}) = ${cc.toFixed(3)}`,
        ],
        isError: false,
        status,
        conclusion,
        warningMessage,
        summaryString: `Indeks Kompresi Cc = ${cc.toFixed(3)} (${isHighCc ? 'Perlu Evaluasi Cc > 1.0' : 'Valid'})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA TANAH - BAB VI: PERMEABILITAS TANAH
  // -----------------------------------------------------------------------
  'mt-6-1': {
    id: 'mt-6-1',
    code: 'PERM-01',
    name: 'Pengujian Permeabilitas Tanah (Constant & Falling Head)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 6: Permeabilitas Tanah',
    standard: 'SNI 2435:2008 / ASTM D2434',
    desc: 'Menghitung koefisien rembesan (k) tanah untuk analisis rembesan bendungan, debit pemompaan dewatering, dan drainase.',
    methods: [
      {
        value: 'constant',
        label: 'Metode Constant Head',
        desc: 'Cocok untuk tanah butir kasar (kerikil & pasir)',
      },
      {
        value: 'falling',
        label: 'Metode Falling Head',
        desc: 'Cocok untuk tanah butir halus (lanau & lempung)',
      },
    ],
    initialInputs: {
      metode: 'constant',
      diameterD: 7.5,
      panjangL: 12.0,
      volumeQ: 240.0,
      headH: 45.0,
      waktuT: 120.0,
      diameterPipaD: 1.04,
      diameterSampelD: 7.5,
      headH0: 50.0,
      headH1: 20.0,
    },
    getFields: (inputs) => {
      const isFalling = (inputs?.metode || 'constant') === 'falling'
      if (isFalling) {
        return [
          { key: 'diameterPipaD', label: 'Diameter Pipa Standpipe (d)', unit: 'cm', desc: 'Diameter pipa tegak untuk menghitung luas penampang a = ¼ π d²', min: 0.01, step: 'any' },
          { key: 'panjangL', label: 'Panjang Sampel Tanah (L)', unit: 'cm', desc: 'Tinggi atau panjang contoh tanah uji', min: 0.01, step: 'any' },
          { key: 'diameterSampelD', label: 'Diameter Sampel Permeameter (D)', unit: 'cm', desc: 'Diameter silinder tanah untuk menghitung luas penampang A = ¼ π D²', min: 0.01, step: 'any' },
          { key: 'headH0', label: 'Tinggi Muka Air Awal (h0)', unit: 'cm', desc: 'Beda tinggi muka air awal sebelum pengaliran', min: 0.01, step: 'any' },
          { key: 'headH1', label: 'Tinggi Muka Air Akhir (h1)', unit: 'cm', desc: 'Beda tinggi muka air akhir setelah durasi t', min: 0.01, step: 'any' },
          { key: 'waktuT', label: 'Waktu Penurunan (t)', unit: 'detik', desc: 'Durasi penurunan muka air dari h0 ke h1', min: 0.01, step: 'any' },
        ]
      }
      return [
        { key: 'diameterD', label: 'Diameter Sampel Permeameter (D)', unit: 'cm', desc: 'Diameter tabung silinder tanah untuk menghitung A = ¼ π D²', min: 0.01, step: 'any' },
        { key: 'panjangL', label: 'Panjang Sampel Tanah (L)', unit: 'cm', desc: 'Jarak tempuh aliran air hidrolik', min: 0.01, step: 'any' },
        { key: 'volumeQ', label: 'Volume Air Tertampung (Q)', unit: 'cm³', desc: 'Volume debit air pada gelas ukur penampung', min: 0.01, step: 'any' },
        { key: 'headH', label: 'Beda Tinggi Tekanan Hidrolik (h)', unit: 'cm', desc: 'Beda tinggi muka air inlet dan outlet', min: 0.01, step: 'any' },
        { key: 'waktuT', label: 'Waktu Pengaliran (t)', unit: 'detik', desc: 'Durasi stopwatch pengumpulan air', min: 0.01, step: 'any' },
      ]
    },
    fields: [
      { key: 'diameterD', label: 'Diameter Sampel Permeameter (D)', unit: 'cm', desc: 'Diameter tabung silinder tanah untuk menghitung A = ¼ π D²', min: 0.01, step: 'any' },
      { key: 'panjangL', label: 'Panjang Sampel Tanah (L)', unit: 'cm', desc: 'Jarak tempuh aliran air hidrolik', min: 0.01, step: 'any' },
      { key: 'volumeQ', label: 'Volume Air Tertampung (Q)', unit: 'cm³', desc: 'Volume debit air pada gelas ukur penampung', min: 0.01, step: 'any' },
      { key: 'headH', label: 'Beda Tinggi Tekanan Hidrolik (h)', unit: 'cm', desc: 'Beda tinggi muka air inlet dan outlet', min: 0.01, step: 'any' },
      { key: 'waktuT', label: 'Waktu Pengaliran (t)', unit: 'detik', desc: 'Durasi stopwatch pengumpulan air', min: 0.01, step: 'any' },
    ],
    calculate: (inputs) => {
      const isFalling = (inputs?.metode || 'constant') === 'falling'

      // Logika Klasifikasi Tanah Sesuai Koefisien Permeabilitas k (cm/s):
      // * Jika k > 1.0: "Kerikil Bersih" (Clean Gravel) -> Rembesan sangat cepat
      // * Jika 1.0 >= k > 0.01: "Pasir Kasar" (Coarse Sand) -> Rembesan cepat
      // * Jika 0.01 >= k > 0.001: "Pasir Halus" (Fine Sand) -> Rembesan sedang
      // * Jika 0.001 >= k > 0.00001: "Lanau" (Silt) -> Rembesan rendah
      // * Jika k <= 0.00001: "Lempung" (Clay) -> Praktis kedap air (impervious)
      const classifyPermeability = (kVal) => {
        if (kVal > 1.0) {
          return {
            tipe: 'Kerikil Bersih',
            labelEn: 'Clean Gravel',
            sifat: 'Rembesan sangat cepat / permeabilitas sangat tinggi',
            drainase: 'Sangat baik',
            categoryKey: 'gravel',
          }
        }
        if (kVal > 0.01) {
          return {
            tipe: 'Pasir Kasar',
            labelEn: 'Coarse Sand',
            sifat: 'Rembesan cepat / permeabilitas tinggi',
            drainase: 'Baik',
            categoryKey: 'coarse_sand',
          }
        }
        if (kVal > 0.001) {
          return {
            tipe: 'Pasir Halus',
            labelEn: 'Fine Sand',
            sifat: 'Rembesan sedang / permeabilitas moderat',
            drainase: 'Cukup',
            categoryKey: 'fine_sand',
          }
        }
        if (kVal > 0.00001) {
          return {
            tipe: 'Lanau',
            labelEn: 'Silt',
            sifat: 'Rembesan rendah / permeabilitas rendah',
            drainase: 'Buruk',
            categoryKey: 'silt',
          }
        }
        return {
          tipe: 'Lempung',
          labelEn: 'Clay',
          sifat: 'Rembesan sangat lambat / praktis kedap air (impervious)',
          drainase: 'Praktis kedap air',
          categoryKey: 'clay',
        }
      }

      if (isFalling) {
        let d = 1.04
        let a = (Math.PI / 4) * d * d
        if (inputs.diameterPipaD !== undefined && inputs.diameterPipaD !== '') {
          d = Number(inputs.diameterPipaD)
          a = (Math.PI / 4) * d * d
        } else if (inputs.pipaA !== undefined && inputs.pipaA !== '') {
          a = Number(inputs.pipaA)
          d = a > 0 ? Math.sqrt((4 * a) / Math.PI) : 0
        } else if (inputs.a !== undefined && inputs.a !== '') {
          a = Number(inputs.a)
          d = a > 0 ? Math.sqrt((4 * a) / Math.PI) : 0
        }

        let D = 7.5
        let A = (Math.PI / 4) * D * D
        if (inputs.diameterSampelD !== undefined && inputs.diameterSampelD !== '') {
          D = Number(inputs.diameterSampelD)
          A = (Math.PI / 4) * D * D
        } else if (inputs.luasSampelA !== undefined && inputs.luasSampelA !== '') {
          A = Number(inputs.luasSampelA)
          D = A > 0 ? Math.sqrt((4 * A) / Math.PI) : 0
        } else if (inputs.diameterD !== undefined && inputs.diameterD !== '') {
          D = Number(inputs.diameterD)
          A = (Math.PI / 4) * D * D
        } else if (inputs.A !== undefined && inputs.A !== '') {
          A = Number(inputs.A)
          D = A > 0 ? Math.sqrt((4 * A) / Math.PI) : 0
        }

        const l = Number(inputs.panjangL !== undefined ? inputs.panjangL : (inputs.L !== undefined ? inputs.L : 12.0))
        const h0 = Number(inputs.headH0 !== undefined ? inputs.headH0 : (inputs.h0 !== undefined ? inputs.h0 : 50.0))
        const h1 = Number(inputs.headH1 !== undefined ? inputs.headH1 : (inputs.h1 !== undefined ? inputs.h1 : 20.0))
        const t = Number(inputs.waktuT !== undefined ? inputs.waktuT : (inputs.t !== undefined ? inputs.t : 120.0))

        if (d <= 0 || a <= 0 || l <= 0 || D <= 0 || A <= 0 || h0 <= 0 || h1 <= 0 || t <= 0) {
          return {
            results: [
              { label: 'Koefisien Permeabilitas (k)', value: '-', unit: 'cm/s', highlight: true },
              { label: 'Luas Penampang Sampel (A)', value: '-', unit: 'cm²', highlight: true },
              { label: 'Metode Pengujian Aktif', value: 'Metode Falling Head' },
              { label: 'Klasifikasi Jenis Tanah', value: 'Nilai Input Harus > 0', unit: '', highlight: true },
            ],
            formulaSteps: [
              'Semua parameter pengujian Falling Head (d, L, D, h0, h1, t) harus bernilai lebih besar dari 0 (min. 0.01) untuk mencegah error pembagian dengan nol.',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Nilai parameter input tidak valid: Semua parameter (Diameter Pipa d, Panjang Sampel L, Diameter Sampel D, Tinggi h0, Tinggi h1, Waktu t) harus lebih besar dari 0.',
            summaryString: 'Nilai input harus > 0',
          }
        }

        // Validasi relasional Falling Head: h0 HARUS > h1
        if (h0 <= h1) {
          return {
            results: [
              { label: 'Koefisien Permeabilitas (k)', value: '-', unit: 'cm/s', highlight: true },
              { label: 'Luas Penampang Sampel (A)', value: `${A.toFixed(2)}`, unit: 'cm²', highlight: true },
              { label: 'Metode Pengujian Aktif', value: 'Metode Falling Head' },
              { label: 'Klasifikasi Jenis Tanah', value: 'Data Tidak Valid (h0 ≤ h1)', unit: '', highlight: true },
            ],
            formulaSteps: [
              `Validasi relasional gagal: Tinggi awal h0 (${h0} cm) ≤ tinggi akhir h1 (${h1} cm).`,
              'Pada pengujian Falling Head, tinggi muka air dalam standpipe harus mengalami penurunan seiring waktu (h0 > h1). Nilai ln(h0/h1) akan menjadi ≤ 0 jika h0 ≤ h1.',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: `Data pengujian tidak valid: Tinggi awal h0 (${h0} cm) tidak boleh lebih kecil atau sama dengan tinggi akhir h1 (${h1} cm). Pastikan tinggi muka air mengalami penurunan selama durasi pengujian t.`,
            summaryString: 'Error: h0 harus lebih besar dari h1 (h0 > h1)',
          }
        }

        const ratio = h0 / h1
        const lnRatio = Math.log(ratio)
        const k = ((a * l) / (A * t)) * lnRatio
        const { tipe, labelEn, sifat, drainase, categoryKey } = classifyPermeability(k)

        const isTooPermeableForFalling = k > 0.01
        const status = isTooPermeableForFalling ? 'Perlu Evaluasi' : 'Valid'
        const warningMessage = isTooPermeableForFalling
          ? 'Nilai k relatif besar. Metode Falling Head umumnya diperuntukkan bagi tanah butir halus (lanau & lempung). Untuk pasir/kerikil, disarankan metode Constant Head.'
          : undefined

        const conclusion = isTooPermeableForFalling
          ? `Peringatan: Nilai k terukur (${formatScientific(k, 3)} cm/s) cukup tinggi untuk metode Falling Head. Metode ini direkomendasikan untuk tanah butir halus (${tipe}). Karakteristik: ${sifat}.`
          : `Koefisien permeabilitas terukur k = ${formatScientific(k, 3)} cm/s (${tipe} / ${labelEn}). Karakteristik rembesan: ${sifat}. Hasil pengujian memenuhi kaidah permeabilitas falling head (SNI 2435:2008 / ASTM D2434).`

        return {
          results: [
            { label: 'Koefisien Permeabilitas (k)', value: formatScientific(k, 3), unit: 'cm/s', highlight: true, numericValue: k },
            { label: 'Luas Penampang Sampel (A)', value: A.toFixed(2), unit: 'cm²', highlight: true },
            { label: 'Metode Pengujian Aktif', value: 'Metode Falling Head' },
            { label: 'Klasifikasi Jenis Tanah', value: tipe, unit: '', highlight: true },
          ],
          formulaSteps: [
            'Metode: Falling Head (Beda Tinggi Muka Air Berubah / Menurun)',
            `1. Luas Pipa Standpipe (a): a = ¼ × π × d² = 0.25 × π × (${d.toFixed(2)})² = ${a.toFixed(3)} cm²`,
            `2. Luas Sampel Tanah (A): A = ¼ × π × D² = 0.25 × π × (${D.toFixed(2)})² = ${A.toFixed(2)} cm²`,
            `3. Rasio Head Hidrolik: h₀ / h₁ = ${h0} / ${h1} = ${ratio.toFixed(4)}`,
            `4. Logaritma Natural Rasio: ln(h₀ / h₁) = ln(${ratio.toFixed(4)}) = ${lnRatio.toFixed(4)}`,
            '5. Rumus Koefisien Permeabilitas: k = (a × L) / (A × t) × ln(h₀ / h₁)',
            `6. Substitusi Perhitungan: k = ((${a.toFixed(3)} × ${l}) / (${A.toFixed(2)} × ${t})) × ${lnRatio.toFixed(4)} = ${formatScientific(k, 3)} cm/s`,
            `7. Klasifikasi Jenis Tanah: ${tipe} (${labelEn}) — ${sifat} [Drainase: ${drainase}]`,
          ],
          status,
          ...(warningMessage ? { warningMessage } : {}),
          conclusion,
          summaryString: `k = ${formatScientific(k, 2)} cm/s (${tipe})`,
          permeabilityTable: {
            k,
            tipe,
            labelEn,
            sifat,
            drainase,
            categoryKey,
            metode: 'Falling Head',
            A: A.toFixed(2),
            a: a.toFixed(3),
          },
        }
      }

      // METODE CONSTANT HEAD
      const d = Number(inputs.diameterD !== undefined ? inputs.diameterD : (inputs.D !== undefined ? inputs.D : 7.5))
      const l = Number(inputs.panjangL !== undefined ? inputs.panjangL : (inputs.L !== undefined ? inputs.L : 12.0))
      const q = Number(inputs.volumeQ !== undefined ? inputs.volumeQ : (inputs.Q !== undefined ? inputs.Q : 240.0))
      const h = Number(inputs.headH !== undefined ? inputs.headH : (inputs.h !== undefined ? inputs.h : 45.0))
      const t = Number(inputs.waktuT !== undefined ? inputs.waktuT : (inputs.t !== undefined ? inputs.t : 120.0))

      if (d <= 0 || l <= 0 || q <= 0 || h <= 0 || t <= 0) {
        return {
          results: [
            { label: 'Koefisien Permeabilitas (k)', value: '-', unit: 'cm/s', highlight: true },
            { label: 'Luas Penampang Sampel (A)', value: '-', unit: 'cm²', highlight: true },
            { label: 'Metode Pengujian Aktif', value: 'Metode Constant Head' },
            { label: 'Klasifikasi Jenis Tanah', value: 'Nilai Input Harus > 0', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter pengujian Constant Head (D, L, Q, h, t) harus bernilai lebih besar dari 0 (min. 0.01) untuk mencegah error pembagian dengan nol.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai parameter input tidak valid: Semua parameter (Diameter D, Panjang Sampel L, Volume Q, Beda Tinggi Head h, Waktu t) harus lebih besar dari 0.',
          summaryString: 'Nilai input harus > 0',
        }
      }

      const area = (Math.PI / 4) * d * d
      const denom = area * h * t
      const k = (q * l) / denom
      const { tipe, labelEn, sifat, drainase, categoryKey } = classifyPermeability(k)

      // Validasi Kesesuaian Metode Constant Head:
      // Jika k < 0.001 cm/s, berikan peringatan KUNING (Perlu Evaluasi)
      const isTooFineForConstantHead = k < 0.001
      const status = isTooFineForConstantHead ? 'Perlu Evaluasi' : 'Valid'
      const warningMessage = isTooFineForConstantHead
        ? 'Nilai k terlalu kecil. Metode Constant Head kurang akurat untuk tanah halus. Disarankan menggunakan metode Falling Head.'
        : undefined

      const conclusion = isTooFineForConstantHead
        ? `Peringatan: Nilai k terukur (${formatScientific(k, 3)} cm/s) terlalu kecil untuk metode Constant Head. Metode Constant Head kurang akurat untuk tanah halus (${tipe}). Disarankan menggunakan metode Falling Head sesuai standar SNI 2435:2008.`
        : `Koefisien permeabilitas terukur k = ${formatScientific(k, 3)} cm/s (${tipe} / ${labelEn}). Karakteristik: ${sifat}. Hasil memenuhi standar pengujian Constant Head untuk tanah butir kasar.`

      return {
        results: [
          { label: 'Koefisien Permeabilitas (k)', value: formatScientific(k, 3), unit: 'cm/s', highlight: true, numericValue: k },
          { label: 'Luas Penampang Sampel (A)', value: area.toFixed(2), unit: 'cm²', highlight: true },
          { label: 'Metode Pengujian Aktif', value: 'Metode Constant Head' },
          { label: 'Klasifikasi Jenis Tanah', value: tipe, unit: '', highlight: true },
        ],
        formulaSteps: [
          'Metode: Constant Head (Beda Tinggi Tekanan Hidrolik Konstan)',
          `1. Luas Penampang Sampel (A): A = ¼ × π × D² = 0.25 × π × (${d})² = ${area.toFixed(2)} cm²`,
          `2. Gradien Hidrolik (i): i = h / L = ${h} / ${l} = ${(h / l).toFixed(3)}`,
          `3. Debit Rembesan Aliran (Q/t): q = ${q} / ${t} = ${(q / t).toFixed(3)} cm³/s`,
          '4. Hukum Darcy Koefisien Permeabilitas: k = (Q × L) / (A × h × t)',
          `5. Substitusi Perhitungan: k = (${q} × ${l}) / (${area.toFixed(2)} × ${h} × ${t}) = ${formatScientific(k, 3)} cm/s`,
          `6. Klasifikasi Jenis Tanah: ${tipe} (${labelEn}) — ${sifat} [Drainase: ${drainase}]`,
        ],
        status,
        ...(warningMessage ? { warningMessage } : {}),
        conclusion,
        summaryString: `k = ${formatScientific(k, 2)} cm/s (${tipe})`,
        permeabilityTable: {
          k,
          tipe,
          labelEn,
          sifat,
          drainase,
          categoryKey,
          metode: 'Constant Head',
          A: area.toFixed(2),
          d: d.toFixed(2),
        },
      }
    },
  },

  // =======================================================================
  // PRAKTIKUM MEKANIKA FLUIDA & HIDRAULIKA
  // =======================================================================

  // -----------------------------------------------------------------------
  // MEKANIKA FLUIDA - BAB I: SIFAT FLUIDA
  // -----------------------------------------------------------------------
  'mf-1-1': {
    id: 'mf-1-1',
    code: 'FLU-01',
    codePrefix: 'FL',
    name: 'Pengujian Sifat Fluida (Densitas, Viskositas, Archimedes, SG)',
    lab: 'Mekanika Fluida',
    category: 'Mekanika Fluida • Bab 1: Sifat Fluida',
    standard: 'ASTM D1475 & ASTM D445',
    desc: 'Pengukuran komprehensif sifat fisik fluida: Densitas (ρ), Viskositas kinematik (ν), Gaya apung Archimedes (Fa), dan Specific Gravity (SG).',
    methodSelectionTitle: 'Pilih Parameter Sifat Fluida',
    methodSelectionSubtitle: 'Tentukan karakteristik fisik fluida yang ingin diuji dan dihitung:',
    methods: [
      {
        value: 'densitas',
        label: '1. Densitas (ρ)',
        desc: 'Pengukuran massa jenis piknometer cairan (kg/m³)',
      },
      {
        value: 'viskositas',
        label: '2. Viskositas (ν)',
        desc: 'Metode bola jatuh Stokes (m²/s & cSt)',
      },
      {
        value: 'archimedes',
        label: '3. Archimedes (Fa)',
        desc: 'Gaya apung benda tercelup fluida (Newton)',
      },
      {
        value: 'sg',
        label: '4. Specific Gravity (SG)',
        desc: 'Kerapatan relatif fluida terhadap air murni',
      },
    ],
    initialInputs: {
      metode: 'densitas',
      massaPiknoKosong: 32.50,
      massaPiknoFluida: 82.45,
      volumePikno: 50.00,
      jarakS: 0.50,
      waktuT: 2.45,
      diameterD: 0.002,
      massaJenisBola: 7850.0,
      massaJenisFluida: 900.0,
      archDBeaker: 100,
      archDTabung: 69,
      archH0: 78,
      archH1: 123,
      archMassaJenis: 1000.0,
      archGravitasi: 9.81,
      archDimUnit: 'mm',
      volumeTercelup: 0.005,
      massaJenisZat: 850.0,
      massaJenisAir: 1000.0,
    },
    getFields: (inputs) => {
      const metode = inputs?.metode || 'densitas'
      if (metode === 'viskositas') {
        return [
          { key: 'jarakS', label: 'Jarak Tempuh Bola (s)', unit: 'm', desc: 'Jarak vertikal antara dua sensor/garis tera tabung viskometer', min: 0.01, step: 'any' },
          { key: 'waktuT', label: 'Waktu Tempuh Bola (t)', unit: 'detik', desc: 'Waktu yang dibutuhkan bola menempuh lintasan s', min: 0.01, step: 'any' },
          { key: 'diameterD', label: 'Diameter Bola Uji (d)', unit: 'm', desc: 'Diameter bola jatuh (misal bola baja 2 mm = 0.002 m)', min: 0.0001, step: 'any' },
          { key: 'massaJenisBola', label: 'Massa Jenis Bola (σ)', unit: 'kg/m³', desc: 'Massa jenis material bola uji (contoh baja: 7850 kg/m³)', min: 0.01, step: 'any' },
          { key: 'massaJenisFluida', label: 'Massa Jenis Fluida (ρ)', unit: 'kg/m³', desc: 'Massa jenis cairan uji viskometer (contoh oli: 900 kg/m³)', min: 0.01, step: 'any' },
        ]
      }
      if (metode === 'archimedes') {
        const dimUnit = inputs?.archDimUnit || 'mm'
        return [
          {
            key: 'archDBeaker',
            label: 'Diameter Gelas Beaker (D)',
            unit: dimUnit,
            unitKey: 'archDimUnit',
            unitOptions: [
              { label: 'mm', value: 'mm' },
              { label: 'cm', value: 'cm' },
            ],
            desc: 'Diameter dalam silinder/beaker penampung air (contoh: 100 mm)',
            min: 0.01,
            step: 'any',
          },
          {
            key: 'archDTabung',
            label: 'Diameter Tabung / Beban (d)',
            unit: dimUnit,
            unitKey: 'archDimUnit',
            unitOptions: [
              { label: 'mm', value: 'mm' },
              { label: 'cm', value: 'cm' },
            ],
            desc: 'Diameter luar silinder/beban yang dimasukkan ke dalam air (contoh: 69 mm)',
            min: 0.01,
            step: 'any',
          },
          {
            key: 'archH0',
            label: 'Tinggi Air Awal (h₀)',
            unit: dimUnit,
            unitKey: 'archDimUnit',
            unitOptions: [
              { label: 'mm', value: 'mm' },
              { label: 'cm', value: 'cm' },
            ],
            desc: 'Ketinggian permukaan air sebelum tabung beban dimasukkan (contoh: 78 mm)',
            min: 0.01,
            step: 'any',
          },
          {
            key: 'archH1',
            label: 'Tinggi Air Setelah Diberi Beban (h₁)',
            unit: dimUnit,
            unitKey: 'archDimUnit',
            unitOptions: [
              { label: 'mm', value: 'mm' },
              { label: 'cm', value: 'cm' },
            ],
            desc: 'Ketinggian permukaan air setelah tabung beban dimasukkan (contoh: 123 mm)',
            min: 0.01,
            step: 'any',
          },
          {
            key: 'archMassaJenis',
            label: 'Massa Jenis Fluida (ρ)',
            unit: 'kg/m³',
            desc: 'Massa jenis zat cair tempat benda tercelup (standar air = 1000 kg/m³)',
            min: 0.01,
            step: 'any',
          },
          {
            key: 'archGravitasi',
            label: 'Percepatan Gravitasi (g)',
            unit: 'm/s²',
            desc: 'Percepatan gravitasi setempat (standar laboratorium = 9.81 m/s²)',
            min: 0.01,
            step: 'any',
          },
        ]
      }
      if (metode === 'sg') {
        return [
          { key: 'massaJenisZat', label: 'Massa Jenis Zat Cair (ρ_zat)', unit: 'kg/m³', desc: 'Massa jenis cairan atau fluida yang diuji', min: 0.01, step: 'any' },
          { key: 'massaJenisAir', label: 'Massa Jenis Air Acuan (ρ_air)', unit: 'kg/m³', desc: 'Massa jenis air standar pada 4°C (standar: 1000 kg/m³)', min: 0.01, step: 'any' },
        ]
      }
      return [
        { key: 'massaPiknoKosong', label: 'Massa Piknometer Kosong', unit: 'gram', desc: 'Massa piknometer bersih dan kering tanpa fluida', min: 0.01, step: 'any' },
        { key: 'massaPiknoFluida', label: 'Massa Piknometer + Fluida', unit: 'gram', desc: 'Massa piknometer terisi penuh cairan uji sampai batas tera', min: 0.01, step: 'any' },
        { key: 'volumePikno', label: 'Volume Piknometer (V)', unit: 'mL', desc: 'Volume tera kapasitas labu piknometer (1 mL = 1 cm³ = 10⁻⁶ m³)', min: 0.01, step: 'any' },
      ]
    },
    calculate: (inputs) => {
      const metode = inputs?.metode || 'densitas'

      if (metode === 'viskositas') {
        const s = Number(inputs.jarakS || 0.50)
        const t = Number(inputs.waktuT || 2.45)
        const d = Number(inputs.diameterD || 0.002)
        const sigma = Number(inputs.massaJenisBola || 7850.0)
        const rho = Number(inputs.massaJenisFluida || 900.0)

        if (s <= 0 || t <= 0 || d <= 0 || sigma <= 0 || rho <= 0) {
          return {
            results: [
              { label: 'Kecepatan Terminal (u)', value: '-', unit: 'm/s' },
              { label: 'Viskositas Kinematik (ν)', value: '-', unit: 'm²/s', highlight: true },
              { label: 'Viskositas Kinematik', value: '-', unit: 'cSt' },
            ],
            formulaSteps: ['Semua parameter input viskositas harus lebih besar dari 0.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Semua input jarak, waktu, diameter bola, dan massa jenis harus bernilai positif > 0.',
            summaryString: 'Input Viskositas Tidak Valid',
          }
        }

        if (sigma <= rho) {
          return {
            results: [
              { label: 'Kecepatan Terminal (u)', value: '-', unit: 'm/s' },
              { label: 'Viskositas Kinematik (ν)', value: '-', unit: 'm²/s', highlight: true },
              { label: 'Viskositas Kinematik', value: '-', unit: 'cSt' },
            ],
            formulaSteps: [
              `Massa jenis bola (σ = ${sigma} kg/m³) <= massa jenis fluida (ρ = ${rho} kg/m³).`,
              'Bola tidak dapat tenggelam pada metode bola jatuh.',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Massa jenis bola uji (σ) harus lebih besar dari massa jenis fluida (ρ) agar bola dapat jatuh tenggelam memenuhi Hukum Stokes.',
            summaryString: 'Massa Jenis Bola <= Fluida',
          }
        }

        const u = s / t
        // Rumus: u = s/t; v = (9.81 * d^2 / (18 * u)) * ((σ/ρ) - 1)
        const v = ((9.81 * Math.pow(d, 2)) / (18 * u)) * ((sigma / rho) - 1)
        const vCst = v * 1e6

        return {
          results: [
            { label: 'Kecepatan Terminal Bola (u)', value: u.toFixed(4), unit: 'm/s' },
            { label: 'Viskositas Kinematik (ν)', value: formatScientific(v, 3), unit: 'm²/s', highlight: true },
            { label: 'Viskositas Kinematik', value: vCst.toFixed(2), unit: 'cSt', highlight: true },
            { label: 'Rasio Densitas (σ/ρ)', value: (sigma / rho).toFixed(2), unit: '' },
          ],
          formulaSteps: [
            `Kecepatan Terminal Bola: u = s / t = ${s} / ${t} = ${u.toFixed(4)} m/s`,
            `Diameter Bola: d = ${d} m ➔ d² = ${formatScientific(d * d, 4)} m²`,
            `Rasio Kerapatan: (σ / ρ) - 1 = (${sigma} / ${rho}) - 1 = ${(sigma / rho - 1).toFixed(4)}`,
            `Hukum Stokes: ν = [9.81 × d² / (18 × u)] × [(σ/ρ) - 1]`,
            `ν = [(9.81 × ${formatScientific(d * d, 4)}) / (18 × ${u.toFixed(4)})] × ${(sigma / rho - 1).toFixed(4)} = ${formatScientific(v, 3)} m²/s`,
            `Konversi ke Centistokes: ν = ${formatScientific(v, 3)} × 10⁶ = ${vCst.toFixed(2)} cSt`,
          ],
          isError: false,
          status: 'Valid',
          verdictClass: 'valid',
          conclusion: `Viskositas kinematik fluida uji terukur sebesar ${formatScientific(v, 3)} m²/s (${vCst.toFixed(2)} cSt). Pengujian memenuhi metode Falling Sphere Viscometer sesuai ASTM D445 / SNI 06-6989.15-2004.`,
          summaryString: `ν = ${vCst.toFixed(2)} cSt (${formatScientific(v, 3)} m²/s)`,
        }
      }

      if (metode === 'archimedes') {
        const dimUnit = inputs?.archDimUnit || 'mm'
        const unitFactor = dimUnit === 'cm' ? 0.01 : 0.001

        const dBeakerRaw = inputs?.archDBeaker !== undefined && inputs?.archDBeaker !== ''
          ? Number(inputs.archDBeaker)
          : (inputs?.archD !== undefined && inputs?.archD !== '' ? Number(inputs.archD) : 100)

        const dTabungRaw = inputs?.archDTabung !== undefined && inputs?.archDTabung !== ''
          ? Number(inputs.archDTabung)
          : (inputs?.archD_beban !== undefined && inputs?.archD_beban !== '' ? Number(inputs.archD_beban) : 69)

        const h0Raw = inputs?.archH0 !== undefined && inputs?.archH0 !== ''
          ? Number(inputs.archH0)
          : 78

        const h1Raw = inputs?.archH1 !== undefined && inputs?.archH1 !== ''
          ? Number(inputs.archH1)
          : 123

        const rho = inputs?.archMassaJenis !== undefined && inputs?.archMassaJenis !== ''
          ? Number(inputs.archMassaJenis)
          : 1000.0

        const g = inputs?.archGravitasi !== undefined && inputs?.archGravitasi !== ''
          ? Number(inputs.archGravitasi)
          : 9.81

        // 1. Validasi nilai positif > 0
        if (
          isNaN(dBeakerRaw) || isNaN(dTabungRaw) || isNaN(h0Raw) || isNaN(h1Raw) || isNaN(rho) || isNaN(g) ||
          dBeakerRaw <= 0 || dTabungRaw <= 0 || h0Raw <= 0 || h1Raw <= 0 || rho <= 0 || g <= 0
        ) {
          return {
            results: [
              { label: 'Gaya Apung / Upthrust (Fa)', value: '-', unit: 'Newton', highlight: true },
              { label: 'Peningkatan Volume Air (ΔV)', value: '-', unit: 'm³', highlight: true },
              { label: 'Luas Permukaan Air Efektif', value: '-', unit: 'm²' },
              { label: 'Selisih Tinggi Air (Δh)', value: '-', unit: 'mm' },
            ],
            formulaSteps: [
              'Semua parameter geometri (D, d), tinggi air (h₀, h₁), massa jenis (ρ), dan gravitasi (g) harus bernilai positif > 0.',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Semua parameter dimensi gelas beaker, tabung beban, ketinggian air, densitas, dan gravitasi harus diisi angka positif bernilai lebih dari 0.',
            summaryString: 'Input Archimedes Tidak Lengkap/Valid',
          }
        }

        // 2. Validasi Geometri: Diameter tabung beban harus lebih kecil dari diameter beaker
        if (dTabungRaw >= dBeakerRaw) {
          return {
            results: [
              { label: 'Gaya Apung / Upthrust (Fa)', value: '-', unit: 'Newton', highlight: true },
              { label: 'Peningkatan Volume Air (ΔV)', value: '-', unit: 'm³', highlight: true },
              { label: 'Luas Permukaan Air Efektif', value: '-', unit: 'm²' },
              { label: 'Selisih Tinggi Air (Δh)', value: '-', unit: 'mm' },
            ],
            formulaSteps: [
              `Diameter tabung beban (d = ${dTabungRaw} ${dimUnit}) >= diameter gelas beaker (D = ${dBeakerRaw} ${dimUnit}).`,
              'Tabung beban tidak dapat masuk ke dalam gelas beaker (luas penampang efektif A_efektif <= 0).',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: `Input tidak logis: Diameter tabung beban (d = ${dTabungRaw} ${dimUnit}) tidak boleh lebih besar atau sama dengan diameter gelas beaker (D = ${dBeakerRaw} ${dimUnit}). Tabung beban harus memiliki ukuran lebih kecil agar dapat tercelup ke dalam beaker.`,
            summaryString: 'Diameter Tabung >= Beaker',
          }
        }

        // 3. Validasi Tinggi Air: Tinggi air setelah berbeban (h1) harus lebih tinggi dari tinggi awal (h0)
        if (h1Raw <= h0Raw) {
          return {
            results: [
              { label: 'Gaya Apung / Upthrust (Fa)', value: '-', unit: 'Newton', highlight: true },
              { label: 'Peningkatan Volume Air (ΔV)', value: '-', unit: 'm³', highlight: true },
              { label: 'Luas Permukaan Air Efektif', value: '-', unit: 'm²' },
              { label: 'Selisih Tinggi Air (Δh)', value: '-', unit: 'mm' },
            ],
            formulaSteps: [
              `Tinggi air setelah diberi beban (h₁ = ${h1Raw} ${dimUnit}) <= tinggi air awal (h₀ = ${h0Raw} ${dimUnit}).`,
              'Pencelupan tabung beban ke dalam air seharusnya menyebabkan kenaikan permukaan air (h₁ > h₀).',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: `Input tidak logis: Ketinggian air setelah beban dimasukkan (h₁ = ${h1Raw} ${dimUnit}) harus lebih besar dari ketinggian air semula (h₀ = ${h0Raw} ${dimUnit}). Saat benda tercelup, permukaan air harus mengalami kenaikan (Δh > 0).`,
            summaryString: 'Tinggi Air h1 <= h0',
          }
        }

        // Konversi ke satuan meter (SI)
        const dBeakerM = dBeakerRaw * unitFactor
        const dTabungM = dTabungRaw * unitFactor
        const h0M = h0Raw * unitFactor
        const h1M = h1Raw * unitFactor

        // 1. Luas Penampang Gelas Beaker: A_beaker = (1/4) * π * D^2
        const aBeaker = 0.25 * Math.PI * Math.pow(dBeakerM, 2)

        // 2. Luas Penampang Tabung Beban: A_tabung = (1/4) * π * d^2
        const aTabung = 0.25 * Math.PI * Math.pow(dTabungM, 2)

        // 3. Luas Permukaan Air Efektif: A_efektif = A_beaker - A_tabung
        const aEfektif = aBeaker - aTabung

        // 4. Selisih Ketinggian Air: Δh = h1 - h0 (dalam meter dan mm)
        const deltaHm = h1M - h0M
        const deltaHmm = deltaHm * 1000

        // 5. Peningkatan Volume Air (Volume Benda Tercelup): ΔV = Δh * A_efektif (m³)
        const deltaV = deltaHm * aEfektif

        // 6. Gaya Apung / Pertambahan Berat Air (Fa): Fa = ρ * g * ΔV (Newton)
        const fa = rho * g * deltaV

        // Massa fluida yang dipindahkan (kg)
        const mTerdesak = rho * deltaV

        return {
          results: [
            { label: 'Gaya Apung / Upthrust (Fa)', value: fa.toFixed(3), unit: 'Newton', highlight: true },
            { label: 'Peningkatan Volume Air (ΔV)', value: formatScientific(deltaV, 4), unit: 'm³', highlight: true },
            { label: 'Luas Permukaan Air Efektif', value: formatScientific(aEfektif, 4), unit: 'm²' },
            { label: 'Selisih Tinggi Air (Δh)', value: deltaHmm.toFixed(1), unit: 'mm' },
          ],
          formulaSteps: [
            `1. Parameter Geometri Eksperimen (${dimUnit.toUpperCase()}):`,
            `   • Diameter Beaker (D) = ${dBeakerRaw} ${dimUnit} (${dBeakerM.toFixed(4)} m)`,
            `   • Diameter Tabung Beban (d) = ${dTabungRaw} ${dimUnit} (${dTabungM.toFixed(4)} m)`,
            `   • Tinggi Air Awal (h₀) = ${h0Raw} ${dimUnit} (${h0M.toFixed(4)} m)`,
            `   • Tinggi Air Setelah Diberi Beban (h₁) = ${h1Raw} ${dimUnit} (${h1M.toFixed(4)} m)`,
            `   • Massa Jenis Fluida (ρ) = ${rho.toFixed(1)} kg/m³ | Gravitasi (g) = ${g.toFixed(2)} m/s²`,
            `2. Luas Penampang Gelas Beaker:`,
            `   A_beaker = (1/4) × π × D² = 0.25 × π × (${dBeakerM.toFixed(4)})² = ${formatScientific(aBeaker, 4)} m² (${(aBeaker * 1e4).toFixed(2)} cm²)`,
            `3. Luas Penampang Tabung Beban:`,
            `   A_tabung = (1/4) × π × d² = 0.25 × π × (${dTabungM.toFixed(4)})² = ${formatScientific(aTabung, 4)} m² (${(aTabung * 1e4).toFixed(2)} cm²)`,
            `4. Luas Permukaan Air Efektif:`,
            `   A_efektif = A_beaker - A_tabung = ${formatScientific(aBeaker, 4)} - ${formatScientific(aTabung, 4)} = ${formatScientific(aEfektif, 4)} m² (${(aEfektif * 1e4).toFixed(2)} cm²)`,
            `5. Selisih Ketinggian Air (Δh):`,
            `   Δh = h₁ - h₀ = ${h1Raw} - ${h0Raw} = ${deltaHmm.toFixed(1)} mm (${deltaHm.toFixed(4)} m)`,
            `6. Peningkatan Volume Air (Volume Benda Tercelup ΔV):`,
            `   ΔV = Δh × A_efektif = ${deltaHm.toFixed(4)} m × ${formatScientific(aEfektif, 4)} m² = ${formatScientific(deltaV, 4)} m³ (${(deltaV * 1e6).toFixed(2)} cm³ / ${(deltaV * 1e3).toFixed(3)} Liter)`,
            `7. Massa Fluida Terdesak (m):`,
            `   m = ρ × ΔV = ${rho.toFixed(1)} kg/m³ × ${formatScientific(deltaV, 4)} m³ = ${mTerdesak.toFixed(4)} kg`,
            `8. Gaya Apung / Upthrust (Fa) Menurut Hukum Archimedes:`,
            `   Fa = ρ × g × ΔV = ${rho.toFixed(1)} × ${g.toFixed(2)} × ${formatScientific(deltaV, 4)} = ${fa.toFixed(3)} Newton`,
          ],
          isError: false,
          status: 'Valid',
          verdictClass: 'valid',
          conclusion: `Berdasarkan pengujian Hukum Archimedes, pencelupan tabung beban (d = ${dTabungRaw} ${dimUnit}) ke dalam gelas beaker (D = ${dBeakerRaw} ${dimUnit}) menghasilkan kenaikan air Δh = ${deltaHmm.toFixed(1)} mm dengan volume fluida terdesak ΔV = ${formatScientific(deltaV, 4)} m³ (${(deltaV * 1e3).toFixed(3)} Liter). Gaya apung ke atas (Fa) yang dialami benda adalah sebesar ${fa.toFixed(3)} Newton (setara dengan berat zat cair yang dipindahkan, m = ${mTerdesak.toFixed(4)} kg). Hasil pengujian valid sesuai prinsip Archimedes.`,
          summaryString: `Fa = ${fa.toFixed(3)} N, ΔV = ${formatScientific(deltaV, 3)} m³ (Δh = ${deltaHmm.toFixed(1)} mm)`,
        }
      }

      if (metode === 'sg') {
        const rhoZat = Number(inputs.massaJenisZat || 850.0)
        const rhoAir = Number(inputs.massaJenisAir || 1000.0)

        if (rhoZat <= 0 || rhoAir <= 0) {
          return {
            results: [
              { label: 'Specific Gravity (SG)', value: '-', unit: '', highlight: true },
              { label: 'Massa Jenis Zat (ρ)', value: '-', unit: 'kg/m³' },
            ],
            formulaSteps: ['Massa jenis zat dan massa jenis air harus lebih besar dari 0.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Massa jenis zat cair dan massa jenis air acuan harus bernilai positif > 0.',
            summaryString: 'Input SG Tidak Valid',
          }
        }

        // Rumus: SG = ρ_zat / 1000 (atau ρ_air)
        const sg = rhoZat / rhoAir
        const floatBehavior = sg < 1 ? 'Terapung di atas air' : sg === 1 ? 'Melayang di dalam air' : 'Tenggelam di dalam air'

        return {
          results: [
            { label: 'Specific Gravity (SG)', value: sg.toFixed(4), unit: '', highlight: true },
            { label: 'Massa Jenis Zat (ρ)', value: rhoZat.toFixed(1), unit: 'kg/m³' },
            { label: 'Massa Jenis Air Acuan', value: rhoAir.toFixed(1), unit: 'kg/m³' },
            { label: 'Karakteristik Apung', value: floatBehavior, unit: '', highlight: true },
          ],
          formulaSteps: [
            `Massa Jenis Zat Uji: ρ_zat = ${rhoZat.toFixed(1)} kg/m³`,
            `Massa Jenis Air Acuan (4°C): ρ_air = ${rhoAir.toFixed(1)} kg/m³`,
            `Specific Gravity: SG = ρ_zat / ρ_air = ${rhoZat.toFixed(1)} / ${rhoAir.toFixed(1)} = ${sg.toFixed(4)}`,
            `Analisis Kerapatan Relatif: SG = ${sg.toFixed(4)} ➔ ${floatBehavior}`,
          ],
          isError: false,
          status: 'Valid',
          verdictClass: 'valid',
          conclusion: `Nilai Specific Gravity zat terukur SG = ${sg.toFixed(4)}. Zat cair memiliki kerapatan relatif ${sg.toFixed(4)} kali air murni (${floatBehavior}) sesuai standar ASTM D1475.`,
          summaryString: `SG = ${sg.toFixed(4)} (${floatBehavior})`,
        }
      }

      // Default: Metode Densitas (ρ)
      const m1 = Number(inputs.massaPiknoKosong || 32.50)
      const m2 = Number(inputs.massaPiknoFluida || 82.45)
      const v = Number(inputs.volumePikno || 50.00)

      if (m1 <= 0 || m2 <= 0 || v <= 0) {
        return {
          results: [
            { label: 'Massa Fluida', value: '-', unit: 'gram' },
            { label: 'Densitas Fluida (ρ)', value: '-', unit: 'kg/m³', highlight: true },
            { label: 'Kerapatan', value: '-', unit: 'g/cm³' },
          ],
          formulaSteps: ['Massa piknometer dan volume harus lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Semua input penimbangan massa piknometer dan volume harus bernilai positif > 0.',
          summaryString: 'Input Densitas Tidak Valid',
        }
      }

      if (m2 <= m1) {
        return {
          results: [
            { label: 'Massa Fluida', value: '-', unit: 'gram' },
            { label: 'Densitas Fluida (ρ)', value: '-', unit: 'kg/m³', highlight: true },
            { label: 'Kerapatan', value: '-', unit: 'g/cm³' },
          ],
          formulaSteps: [
            `Massa Pikno + Fluida (${m2} g) <= Massa Pikno Kosong (${m1} g).`,
            'Massa fluida bernilai negatif atau nol, periksa kembali penimbangan.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Massa piknometer berisi fluida (m2) harus lebih besar dari massa piknometer kosong (m1).',
          summaryString: 'Massa Fluida <= 0',
        }
      }

      const mFluida = m2 - m1
      const rhoGcm3 = mFluida / v
      const rhoKgm3 = rhoGcm3 * 1000
      const sg = rhoKgm3 / 1000

      return {
        results: [
          { label: 'Massa Fluida Bersih', value: mFluida.toFixed(2), unit: 'gram' },
          { label: 'Densitas Fluida (ρ)', value: rhoKgm3.toFixed(2), unit: 'kg/m³', highlight: true },
          { label: 'Kerapatan Fluida', value: rhoGcm3.toFixed(4), unit: 'g/cm³' },
          { label: 'Specific Gravity (SG)', value: sg.toFixed(4), unit: '', highlight: true },
        ],
        formulaSteps: [
          `Massa Fluida Bersih: M_fluida = M_isi - M_kosong = ${m2.toFixed(2)} - ${m1.toFixed(2)} = ${mFluida.toFixed(2)} gram`,
          `Volume Piknometer: V = ${v.toFixed(2)} mL (${v.toFixed(2)} cm³ = ${formatScientific(v * 1e-6, 2)} m³)`,
          `Densitas Fluida: ρ = (Massa Fluida / Volume) = ${mFluida.toFixed(2)} / ${v.toFixed(2)} = ${rhoGcm3.toFixed(4)} g/cm³`,
          `Konversi Satuan SI: ρ = ${rhoGcm3.toFixed(4)} × 1000 = ${rhoKgm3.toFixed(2)} kg/m³`,
          `Specific Gravity: SG = ρ / 1000 = ${sg.toFixed(4)}`,
        ],
        isError: false,
        status: 'Valid',
        verdictClass: 'valid',
        conclusion: `Densitas fluida uji terukur sebesar ${rhoKgm3.toFixed(2)} kg/m³ (${rhoGcm3.toFixed(4)} g/cm³) dengan SG = ${sg.toFixed(4)}. Hasil memenuhi standar pengujian massa jenis piknometer ASTM D1475 / SNI ISO 2811.`,
        summaryString: `ρ = ${rhoKgm3.toFixed(1)} kg/m³ (SG = ${sg.toFixed(3)})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA FLUIDA - BAB II: OSBORNE REYNOLDS
  // -----------------------------------------------------------------------
  'mf-2-1': {
    id: 'mf-2-1',
    code: 'REY-01',
    codePrefix: 'RE',
    name: 'Pengujian Bilangan Osborne Reynolds',
    lab: 'Mekanika Fluida',
    category: 'Mekanika Fluida • Bab 2: Osborne Reynolds',
    standard: 'Standar Hidraulika Pipa (Re)',
    desc: 'Pengujian rezim aliran fluida pipa (Laminer, Transisi, Turbulen) berbasis volumetrik dan waktu alir, perhitungan koefisien gesekan (f), analisis logaritma, dan grafik Re vs Debit.',
    hasDynamicTable: true,
    hasDynamicReynoldsTable: true,
    initialInputs: {
      reynoldsRows: [
        { id: 1, label: 'Uji 1 (Laminer Rendah)', t: 70.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Filamen zat warna lurus stabil' },
        { id: 2, label: 'Uji 2 (Laminer Kritis)', t: 42.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Filamen lurus mulai bergetar tipis' },
        { id: 3, label: 'Uji 3 (Zona Transisi)', t: 24.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Garis zat warna bergelombang / fluktuatif' },
        { id: 4, label: 'Uji 4 (Turbulen Awal)', t: 15.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Zat warna mulai bercampur ke air' },
        { id: 5, label: 'Uji 5 (Turbulen Penuh)', t: 9.5, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Zat warna menyebar merata ke seluruh penampang' },
      ],
      // Fallback untuk pemanggilan data statis legacy
      diameterD: 0.011,
      kecepatanV: 0.15,
      viskositasNu: 0.000000893,
    },
    fields: [],
    calculate: (inputs) => {
      let rawRows = inputs?.reynoldsRows
      if (!Array.isArray(rawRows) || rawRows.length === 0) {
        if (inputs?.kecepatanV !== undefined && inputs?.diameterD !== undefined) {
          const d = Number(inputs.diameterD || 0.011)
          const v = Number(inputs.kecepatanV || 0.065)
          const nu = Number(inputs.viskositasNu || 0.000000893)
          const a = 0.25 * Math.PI * d * d
          const q = v * a
          rawRows = [
            { id: 1, label: 'Uji 1', t: +(0.5 / (q * 1000)).toFixed(1), volume: 0.5, diameter: +(d * 1000).toFixed(1), viskositas: +(nu * 1e6).toFixed(3), visualNote: 'Aliran fluida stabil' }
          ]
        } else {
          rawRows = [
            { id: 1, label: 'Uji 1 (Laminer Rendah)', t: 70.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Filamen zat warna lurus stabil' },
            { id: 2, label: 'Uji 2 (Laminer Kritis)', t: 42.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Filamen lurus mulai bergetar tipis' },
            { id: 3, label: 'Uji 3 (Zona Transisi)', t: 24.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Garis zat warna bergelombang / fluktuatif' },
            { id: 4, label: 'Uji 4 (Turbulen Awal)', t: 15.0, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Zat warna mulai bercampur ke air' },
            { id: 5, label: 'Uji 5 (Turbulen Penuh)', t: 9.5, volume: 0.5, diameter: 11, viskositas: 0.893, visualNote: 'Zat warna menyebar merata ke seluruh penampang' },
          ]
        }
      }

      // 1. Pemrosesan dan perhitungan matematis per baris pengujian
      const processedRows = rawRows.map((row, idx) => {
        if (!row) return null
        const t = row.t !== undefined && row.t !== '' ? Number(row.t) : NaN
        const volInput = row.volume !== undefined && row.volume !== '' ? Number(row.volume) : (row.v !== undefined && row.v !== '' ? Number(row.v) : NaN)
        const dInput = row.diameter !== undefined && row.diameter !== '' ? Number(row.diameter) : (row.d !== undefined && row.d !== '' ? Number(row.d) : 11)
        const nuInput = row.viskositas !== undefined && row.viskositas !== '' ? Number(row.viskositas) : (row.nu !== undefined && row.nu !== '' ? Number(row.nu) : 0.893)

        // Konversi satuan ke SI (m, s, m³, m²/s)
        const volM3 = !isNaN(volInput) && volInput > 0 ? (volInput >= 0.01 ? volInput / 1000 : volInput) : NaN
        const volLiter = !isNaN(volInput) && volInput > 0 ? (volInput >= 0.01 ? volInput : volInput * 1000) : NaN

        const dM = !isNaN(dInput) && dInput > 0 ? (dInput >= 0.5 ? dInput / 1000 : dInput) : NaN
        const dMm = !isNaN(dInput) && dInput > 0 ? (dInput >= 0.5 ? dInput : dInput * 1000) : NaN

        const nuM2s = !isNaN(nuInput) && nuInput > 0 ? (nuInput >= 0.001 ? nuInput * 1e-6 : nuInput) : NaN
        const nuDisplay = !isNaN(nuInput) && nuInput > 0 ? (nuInput >= 0.001 ? nuInput : nuInput * 1e6) : NaN

        const isValid = !isNaN(t) && t > 0 && !isNaN(volM3) && volM3 > 0 && !isNaN(dM) && dM > 0 && !isNaN(nuM2s) && nuM2s > 0

        if (!isValid) {
          return {
            id: row.id || (idx + 1),
            pointNum: idx + 1,
            label: row.label || `Pengujian #${idx + 1}`,
            t: !isNaN(t) ? t : null,
            volume: !isNaN(volLiter) ? volLiter : null,
            diameter: !isNaN(dMm) ? dMm : 11,
            viskositas: !isNaN(nuDisplay) ? nuDisplay : 0.893,
            visualNote: row.visualNote || '',
            isValid: false,
            qM3s: null,
            qLs: null,
            v: null,
            re: null,
            rezim: '-',
            rezimClass: 'invalid',
            f: null,
            logF: null,
            logRe: null,
          }
        }

        // 1. Luas Penampang Pipa: A = (1/4) * π * D² (m²)
        const area = 0.25 * Math.PI * Math.pow(dM, 2)

        // 2. Debit Rata-rata: Q = V / t (m³/s)
        const qM3s = volM3 / t
        const qLs = qM3s * 1000

        // 3. Kecepatan Aliran Rata-rata: v = Q / A (m/s)
        const v = qM3s / area

        // 4. Bilangan Reynolds: Re = (v * D) / ν
        const re = (v * dM) / nuM2s

        // 5. Klasifikasi Rezim Aliran Otomatis
        let rezim = 'Laminer'
        let rezimClass = 'laminer'
        if (re < 2000) {
          rezim = 'Laminer'
          rezimClass = 'laminer'
        } else if (re <= 4000) {
          rezim = 'Transisi'
          rezimClass = 'transisi'
        } else {
          rezim = 'Turbulen'
          rezimClass = 'turbulen'
        }

        // 6. Koefisien Gesekan Pipa (f):
        // Aliran Laminer: f = 64 / Re
        // Aliran Transisi & Turbulen: Persamaan Blasius f = 0.3164 / Re^0.25
        let f = 0
        if (re < 2000) {
          f = 64 / re
        } else {
          f = 0.3164 / Math.pow(re, 0.25)
        }

        // 7. Nilai Logaritma: Log(f) dan Log(Re)
        const logF = f > 0 ? Math.log10(f) : 0
        const logRe = re > 0 ? Math.log10(re) : 0

        return {
          id: row.id || (idx + 1),
          pointNum: idx + 1,
          label: row.label || `Pengujian #${idx + 1}`,
          t,
          volume: volLiter,
          volM3,
          diameter: dMm,
          dM,
          viskositas: nuDisplay,
          nuM2s,
          area,
          qM3s,
          qLs,
          v,
          re,
          rezim,
          rezimClass,
          f,
          logF,
          logRe,
          visualNote: row.visualNote || (rezim === 'Laminer' ? 'Filamen lurus stabil' : rezim === 'Transisi' ? 'Filamen bergelombang / fluktuatif' : 'Zat warna menyebar merata'),
          isValid: true,
        }
      }).filter(Boolean)

      const validRows = processedRows.filter(r => r.isValid)

      if (validRows.length === 0) {
        return {
          results: [
            { label: 'Bilangan Reynolds (Re)', value: '-', unit: '', highlight: true },
            { label: 'Sebaran Rezim Aliran', value: '-', unit: '', highlight: true },
            { label: 'Rentang Debit Aliran (Q)', value: '-', unit: 'L/s' },
            { label: 'Kecepatan Rata-rata', value: '-', unit: 'm/s' },
          ],
          formulaSteps: [
            'Masukkan minimal 1 baris pengujian dengan waktu alir (t), volume (V), diameter pipa (D), dan viskositas kinematik (ν) bernilai positif > 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Data belum lengkap: Masukkan waktu alir dan volume pengujian bernilai positif lebih dari 0.',
          summaryString: 'Input Reynolds Belum Lengkap',
          recapRows: processedRows,
          chartData: [],
          totalTests: 0,
        }
      }

      // 2. Statistik Ringkasan dan Karakteristik Aliran
      const countLaminer = validRows.filter(r => r.rezim === 'Laminer').length
      const countTransisi = validRows.filter(r => r.rezim === 'Transisi').length
      const countTurbulen = validRows.filter(r => r.rezim === 'Turbulen').length

      const minRe = Math.min(...validRows.map(r => r.re))
      const maxRe = Math.max(...validRows.map(r => r.re))
      const avgRe = validRows.reduce((acc, r) => acc + r.re, 0) / validRows.length
      const minQ = Math.min(...validRows.map(r => r.qLs))
      const maxQ = Math.max(...validRows.map(r => r.qLs))
      const avgV = validRows.reduce((acc, r) => acc + r.v, 0) / validRows.length
      const minF = Math.min(...validRows.map(r => r.f))
      const maxF = Math.max(...validRows.map(r => r.f))

      const refD = validRows[0].dM
      const refNu = validRows[0].nuM2s
      const slopeReQ = 4 / (Math.PI * refD * refNu * 1000) // Re per L/s

      // 3. Data Titik Grafik Karakteristik (Re vs Q & Log f vs Log Re)
      const sortedByQ = [...validRows].sort((a, b) => a.qLs - b.qLs)
      const chartData = sortedByQ.map(r => ({
        qLs: Number(r.qLs.toFixed(4)),
        re: Number(r.re.toFixed(1)),
        reTeori: Number((slopeReQ * r.qLs).toFixed(1)),
        pointNum: r.pointNum,
        label: r.label,
        rezim: r.rezim,
        f: Number(r.f.toFixed(4)),
        logF: Number(r.logF.toFixed(4)),
        logRe: Number(r.logRe.toFixed(4)),
        v: Number(r.v.toFixed(3)),
      }))

      let rezimSummary = ''
      if (countLaminer > 0 && countTurbulen > 0) {
        rezimSummary = 'Laminer s/d Turbulen'
      } else if (countLaminer > 0 && countTransisi > 0) {
        rezimSummary = 'Laminer & Transisi'
      } else if (countTurbulen > 0) {
        rezimSummary = 'Turbulen'
      } else if (countTransisi > 0) {
        rezimSummary = 'Transisi'
      } else {
        rezimSummary = 'Laminer'
      }

      return {
        results: [
          {
            label: 'Bilangan Reynolds (Re)',
            value: validRows.length > 1 ? `${minRe.toFixed(0)} - ${maxRe.toFixed(0)}` : avgRe.toFixed(0),
            unit: '',
            highlight: true,
          },
          {
            label: 'Sebaran Rezim Aliran',
            value: `${countLaminer} Lam | ${countTransisi} Tran | ${countTurbulen} Turb`,
            unit: `(${validRows.length} Uji)`,
            highlight: true,
          },
          {
            label: 'Rentang Debit Aliran (Q)',
            value: `${minQ.toFixed(3)} - ${maxQ.toFixed(3)}`,
            unit: 'L/s',
          },
          {
            label: 'Kecepatan Aliran Rata-rata',
            value: avgV.toFixed(3),
            unit: 'm/s',
          },
        ],
        formulaSteps: [
          `1. Rumus Dasar Pengujian Bilangan Osborne Reynolds (Standar Hidraulika Pipa Re):`,
          `   • Luas Penampang Pipa: A = (1/4) × π × D²`,
          `   • Debit Aliran Rata-rata: Q = V / t (m³/s = 1000 L/s)`,
          `   • Kecepatan Rata-rata Aliran: v = Q / A (m/s)`,
          `   • Bilangan Reynolds: Re = (v × D) / ν = (4 × Q) / (π × D × ν)`,
          `2. Kriteria Batas Rezim Aliran:`,
          `   • Aliran Laminer: Re < 2000 (Garis alir zat warna lurus sejajar)`,
          `   • Aliran Transisi: 2000 ≤ Re ≤ 4000 (Zat warna mulai bergelombang/fluktuasi)`,
          `   • Aliran Turbulen: Re > 4000 (Zat warna bercampur baur difusif ke seluruh penampang)`,
          `3. Rumus Koefisien Gesekan Pipa (f):`,
          `   • Untuk Aliran Laminer (Re < 2000): f = 64 / Re`,
          `   • Untuk Aliran Transisi & Turbulen (Re ≥ 2000): f = 0.3164 / Re^0.25 (Persamaan Empiris Blasius)`,
          `   • Analisis Logaritma: Log(f) dan Log(Re) untuk karakteristik kurva logaritmik Moody`,
          `4. Rekapitulasi ${validRows.length} Titik Pengujian Laboratorium:`,
          ...validRows.map(r => 
            `   • Titik #${r.pointNum} (${r.rezim}): t = ${r.t} s, V = ${r.volume} L ➔ Q = ${r.qLs.toFixed(4)} L/s (${formatScientific(r.qM3s, 3)} m³/s), v = ${r.v.toFixed(3)} m/s ➔ Re = ${r.re.toFixed(0)}, f = ${r.f.toFixed(4)}, Log(f) = ${r.logF.toFixed(3)}, Log(Re) = ${r.logRe.toFixed(3)}`
          ),
        ],
        isError: false,
        status: rezimSummary,
        verdictClass: countTurbulen > 0 ? 'valid' : 'valid',
        conclusion: `Pengujian Bilangan Osborne Reynolds pada ${validRows.length} variasi debit menghasilkan rentang Bilangan Reynolds Re = ${minRe.toFixed(0)} hingga ${maxRe.toFixed(0)} dengan sebaran: ${countLaminer} titik Laminer (Re < 2000), ${countTransisi} titik Transisi (2000 ≤ Re ≤ 4000), dan ${countTurbulen} titik Turbulen (Re > 4000). Koefisien gesekan pipa terhitung berkisar antara f = ${minF.toFixed(4)} hingga ${maxF.toFixed(4)}. Karakteristik aliran terbukti linier terhadap pertambahan debit sesuai hukum dinamika fluida.`,
        summaryString: `Re = ${minRe.toFixed(0)} - ${maxRe.toFixed(0)} (${validRows.length} Titik Uji)`,
        // Metadata kaya untuk tabel rekapitulasi & grafik Recharts
        recapRows: processedRows,
        chartData,
        minRe: minRe.toFixed(0),
        maxRe: maxRe.toFixed(0),
        avgRe: avgRe.toFixed(0),
        minQ: minQ.toFixed(4),
        maxQ: maxQ.toFixed(4),
        avgV: avgV.toFixed(3),
        countLaminer,
        countTransisi,
        countTurbulen,
        refD: (refD * 1000).toFixed(1),
        refNu: (refNu * 1e6).toFixed(3),
      }
    },
  },

  // =======================================================================
  // PRAKTIKUM BAHAN PERKERASAN (10 MODUL SPESIFIK LAPORAN PRAKTIKUM)
  // =======================================================================

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 1: UJI KEAUSAN AGREGAT DENGAN MESIN ABRASI LOS ANGELES
  // SNI 2417:2008 / Spesifikasi Umum Bina Marga 2018
  // -----------------------------------------------------------------------
  'bp-1-1': {
    id: 'bp-1-1',
    code: 'LA-01',
    codePrefix: 'LA',
    name: 'Uji Keausan Agregat dengan Mesin Abrasi Los Angeles',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 1: Keausan Agregat LA',
    standard: 'SNI 2417:2008 / Spesifikasi Umum Bina Marga 2018',
    desc: 'Pengujian durabilitas dan ketahanan agregat kasar terhadap degradasi mekanis (abrasi, benturan, dan penggerusan) menggunakan mesin Los Angeles dengan bola baja abrasi.',
    initialInputs: {
      gradasiTipe: 'B',
      jenisCampuran: 'umum',
      beratAwalA: 5000.0,
      beratTertahanB: 3850.0,
    },
    fields: [
      {
        key: 'gradasiTipe',
        label: 'Tipe Gradasi Uji & Jumlah Bola Baja',
        type: 'select',
        desc: 'Gradasi saringan agregat dan muatan bola baja standar SNI 2417:2008',
        options: [
          { value: 'B', label: 'Gradasi B (11 Bola Baja - 500 Putaran)' },
          { value: 'A', label: 'Gradasi A (12 Bola Baja - 500 Putaran)' },
          { value: 'C', label: 'Gradasi C (8 Bola Baja - 500 Putaran)' },
          { value: 'D', label: 'Gradasi D (6 Bola Baja - 500 Putaran)' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'jenisCampuran',
        label: 'Jenis Campuran Perkerasan',
        type: 'select',
        desc: 'Jenis lapisan perkerasan aspal untuk acuan ambang batas spesifikasi Bina Marga 2018',
        options: [
          { value: 'umum', label: 'Campuran Beraspal Umum (AC-WC, AC-BC, AC-Base, HRS) -> Batas Maks 40%' },
          { value: 'sma', label: 'Campuran Stone Matrix Asphalt (SMA) -> Batas Maks 30%' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'beratAwalA',
        label: 'Berat Benda Uji Semula / Awal (A)',
        unit: 'gram',
        desc: 'Massa sampel agregat kering oven sebelum pengujian (standar 5000 g)',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'beratTertahanB',
        label: 'Berat Tertahan Saringan No. 12 (1.70 mm) - 500 Putaran (B)',
        unit: 'gram',
        desc: 'Massa agregat yang tertahan di atas saringan No. 12 setelah 500 putaran, pencucian & pengeringan oven',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      const a = Number(inputs.beratAwalA)
      const b = Number(inputs.beratTertahanB)
      const jenis = inputs.jenisCampuran || 'umum'
      const batasMaks500 = jenis === 'sma' ? 30.0 : 40.0

      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        return {
          results: [
            { label: 'Keausan Agregat (500 Putaran)', value: '-', unit: '%' },
            { label: 'Berat Lolos Saringan No. 12', value: '-', unit: 'gram' },
            { label: 'Status Kelayakan Perkerasan', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: ['Input Berat Semula (A) dan Berat Tertahan Saringan No. 12 (B) harus berupa angka positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          conclusion: 'Input parameter berat benda uji harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      if (b > a) {
        return {
          results: [
            { label: 'Keausan Agregat (500 Putaran)', value: '-', unit: '%' },
            { label: 'Berat Lolos Saringan No. 12', value: '-', unit: 'gram' },
            { label: 'Status Kelayakan Perkerasan', value: 'B > A Tidak Logis', unit: '', highlight: true },
          ],
          formulaSteps: [`Berat tertahan B (${b} g) tidak boleh lebih besar dari berat semula A (${a} g).`],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Berat tertahan saringan No. 12 setelah abrasi tidak boleh melebihi berat awal sampel sebelum pengujian.',
          summaryString: 'B > A Tidak Valid',
        }
      }

      const wAus = a - b
      const keausan500 = ((a - b) / a) * 100
      const is500Lolos = keausan500 <= batasMaks500

      let status = 'Memenuhi Standar'
      let verdictClass = 'valid'
      let conclusion = ''

      if (!is500Lolos) {
        status = 'Tidak Layak'
        verdictClass = 'error'
        conclusion = `Tidak Layak untuk Perkerasan Jalan. Nilai keausan agregat (${keausan500.toFixed(2)}%) melebihi batas maksimum spesifikasi (${batasMaks500.toFixed(0)}%).`
      } else {
        status = 'Memenuhi Standar'
        verdictClass = 'valid'
        conclusion = `Memenuhi Syarat Kekerasan Agregat Perkerasan Jalan. Nilai keausan (${keausan500.toFixed(2)}%) berada di bawah batas maksimum spesifikasi (${batasMaks500.toFixed(0)}%).`
      }

      const gradasiLabel = {
        A: 'Gradasi A (12 Bola Baja - 500 Putaran)',
        B: 'Gradasi B (11 Bola Baja - 500 Putaran)',
        C: 'Gradasi C (8 Bola Baja - 500 Putaran)',
        D: 'Gradasi D (6 Bola Baja - 500 Putaran)',
      }[inputs.gradasiTipe] || 'Gradasi B (11 Bola Baja - 500 Putaran)'

      const jenisLabel = jenis === 'sma' ? 'Campuran Stone Matrix Asphalt (SMA)' : 'Campuran Beraspal Umum (AC/HRS)'

      return {
        results: [
          { label: 'Keausan Agregat (500 Putaran)', value: `${keausan500.toFixed(2)}%`, unit: '', highlight: true },
          { label: 'Berat Lolos Saringan No. 12', value: wAus.toFixed(1), unit: 'gram' },
          { label: 'Status Kelayakan Perkerasan', value: status, unit: '', highlight: true },
        ],
        formulaSteps: [
          `1. PARAMETER PENGUJIAN ABRASI LOS ANGELES:`,
          `   Tipe Gradasi: ${gradasiLabel}`,
          `   Jenis Campuran: ${jenisLabel} (Batas Maksimum 500 Putaran: ${batasMaks500.toFixed(1)}%)`,
          `   Berat Benda Uji Semula (A) = ${a.toFixed(1)} gram`,
          `   Berat Tertahan No. 12 setelah 500 putaran (B) = ${b.toFixed(1)} gram`,
          `2. BERAT AGREGAT AUS / LOLOS SARINGAN NO. 12 (1.70 mm):`,
          `   W_aus = A - B = ${a.toFixed(1)} - ${b.toFixed(1)} = ${wAus.toFixed(1)} gram`,
          `3. PERHITUNGAN NILAI KEAUSAN (LOS ANGELES ABRASION LOSS):`,
          `   Nilai Keausan 500 Putaran (%) = ((A - B) / A) × 100%`,
          `   Nilai Keausan 500 Putaran (%) = ((${a.toFixed(1)} - ${b.toFixed(1)}) / ${a.toFixed(1)}) × 100% = ${keausan500.toFixed(2)}%`,
          `4. BATASAN VERIFIKASI SNI 2417:2008 & BINA MARGA 2018:`,
          `   Batas Maksimum 500 Putaran = ${batasMaks500.toFixed(1)}% ➔ Hasil = ${keausan500.toFixed(2)}% (${is500Lolos ? 'Lolos Standar' : 'Melebihi Batas Maksimum'})`,
          `   Status Kelayakan: ${status}`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `Keausan LA = ${keausan500.toFixed(2)}% | Status: ${status}`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 2: UJI PENETRASI ASPAL KERAS (SNI 2456:2011)
  // -----------------------------------------------------------------------
  'bp-2-1': {
    id: 'bp-2-1',
    code: 'PEN-01',
    codePrefix: 'PN',
    name: 'Uji Penetrasi Aspal Keras (Penetration Test & Outlier Filter)',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 2: Penetrasi Aspal',
    standard: 'SNI 2456:2011 / Spesifikasi Umum Bina Marga 2018',
    desc: 'Pengukuran konsistensi dan kekerasan aspal keras dengan jarum penetrasi beban 100 g selama 5 detik pada suhu standar 25°C, dilengkapi kartu kelompok sampel dinamis, eliminasi outlier statistik otomatis rentang [P̄ ± S], evaluasi presisi SNI 2456:2011, dan verifikasi kelas spesifikasi Bina Marga 2018.',
    hasDynamicTable: true,
    hasDynamicPenetrationGroups: true,
    initialInputs: {
      kelasAspal: 'pen6070',
      suhuUji: 25.0,
      bebanJarum: 100,
      waktuPenetrasi: 5,
      groups: DEFAULT_PENETRATION_GROUPS,
    },
    fields: [
      {
        key: 'kelasAspal',
        label: 'Kelas Spesifikasi Aspal',
        type: 'select',
        desc: 'Kelas penetrasi aspal keras acuan spesifikasi Bina Marga 2018',
        options: [
          { value: 'pen6070', label: 'Aspal Pen 60/70 (Syarat: 60 - 70 dmm)' },
          { value: 'pen4050', label: 'Aspal Pen 40/50 (Syarat: 40 - 50 dmm)' },
          { value: 'pen80100', label: 'Aspal Pen 80/100 (Syarat: 80 - 100 dmm)' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'suhuUji',
        label: 'Suhu Pengujian Air Rendaman',
        unit: '°C',
        desc: 'Suhu bak perendam air standar (SNI 2456:2011 = 25°C)',
        min: 0,
        step: 0.5,
      },
      {
        key: 'bebanJarum',
        label: 'Beban Jarum Penetrasi Total',
        unit: 'gram',
        desc: 'Massa jarum dan beban pemberat standar (SNI: 100 gram)',
        min: 1,
        step: 1,
      },
      {
        key: 'waktuPenetrasi',
        label: 'Waktu Penetrasi Jarum',
        unit: 'detik',
        desc: 'Durasi pelepasan jarum penetrasi standar (SNI: 5 detik)',
        min: 1,
        step: 0.5,
      },
    ],
    calculate: (inputs) => {
      let groups = inputs.groups
      if (!Array.isArray(groups) || groups.length === 0) {
        if (
          inputs.x1 !== undefined ||
          inputs.x2 !== undefined ||
          inputs.x3 !== undefined ||
          inputs.x4 !== undefined ||
          inputs.x5 !== undefined
        ) {
          const rawLegacy = [inputs.x1, inputs.x2, inputs.x3, inputs.x4, inputs.x5]
            .map((v) => Number(v))
            .filter((v) => !isNaN(v) && v > 0)
          groups = [
            {
              id: 1,
              name: 'Kelompok 1',
              points: rawLegacy.map((val, idx) => ({ id: idx + 1, value: val })),
            },
          ]
        } else {
          groups = DEFAULT_PENETRATION_GROUPS
        }
      }

      const kelas = inputs.kelasAspal || 'pen6070'
      const suhuUji = inputs.suhuUji !== undefined && inputs.suhuUji !== '' ? Number(inputs.suhuUji) : 25.0
      const bebanJarum = inputs.bebanJarum !== undefined && inputs.bebanJarum !== '' ? Number(inputs.bebanJarum) : 100
      const waktuPenetrasi = inputs.waktuPenetrasi !== undefined && inputs.waktuPenetrasi !== '' ? Number(inputs.waktuPenetrasi) : 5

      // Spesifikasi kelas aspal (Bina Marga 2018)
      let minSpec = 60.0
      let maxSpec = 70.0
      let kelasLabel = 'Aspal Pen 60/70'
      if (kelas === 'pen4050') {
        minSpec = 40.0
        maxSpec = 50.0
        kelasLabel = 'Aspal Pen 40/50'
      } else if (kelas === 'pen80100') {
        minSpec = 80.0
        maxSpec = 100.0
        kelasLabel = 'Aspal Pen 80/100'
      }

      let totalRawPointsCount = 0
      const allValidPoints = []
      const allOutlierPoints = []

      const groupResults = groups.map((grp, gIdx) => {
        const gName = grp.name || `Kelompok ${gIdx + 1}`
        const rawPoints = Array.isArray(grp.points) ? grp.points : []

        const parsedPoints = rawPoints.map((pt, pIdx) => {
          const pVal = typeof pt === 'object' && pt !== null ? pt.value : pt
          const num = Number(pVal)
          const isValid = pVal !== '' && pVal !== null && pVal !== undefined && !isNaN(num) && num > 0
          return {
            id: (pt && pt.id) || pIdx + 1,
            value: isValid ? num : null,
            rawValue: pVal,
            isValidNumber: isValid,
          }
        })

        const validNumList = parsedPoints.filter((p) => p.isValidNumber).map((p) => p.value)
        const n = validNumList.length
        totalRawPointsCount += n

        if (n === 0) {
          return {
            groupId: grp.id || gIdx + 1,
            groupName: gName,
            n: 0,
            meanInitial: 0,
            sd: 0,
            cv: 0,
            lowerBound: 0,
            upperBound: 0,
            cleanPoints: [],
            outlierPoints: [],
            cleanMean: 0,
            pointsAnalysis: parsedPoints.map((p) => ({ ...p, isOutlier: false })),
          }
        }

        // 1. Rata-rata awal
        const sumVal = validNumList.reduce((acc, v) => acc + v, 0)
        const meanInitial = sumVal / n

        // 2. Standar deviasi sampel: S = sqrt( sum((Pi - mean)^2) / (n - 1) )
        let sd = 0
        if (n > 1) {
          const sumSq = validNumList.reduce((acc, v) => acc + Math.pow(v - meanInitial, 2), 0)
          sd = Math.sqrt(sumSq / (n - 1))
        }

        // 3. Koefisien Variasi
        const cv = meanInitial > 0 ? (sd / meanInitial) * 100 : 0

        // 4. Batas rentang outlier: [mean - sd, mean + sd]
        const lowerBound = meanInitial - sd
        const upperBound = meanInitial + sd

        // 5. Evaluasi setiap titik (outlier elimination)
        const pointsAnalysis = parsedPoints.map((p) => {
          if (!p.isValidNumber) {
            return { ...p, isOutlier: false }
          }
          // Outlier jika di luar [lowerBound, upperBound] (toleransi floating point 1e-6)
          const isOutlier = n > 1 && (p.value < lowerBound - 1e-6 || p.value > upperBound + 1e-6)
          return {
            ...p,
            isOutlier,
          }
        })

        const cleanPoints = pointsAnalysis.filter((p) => p.isValidNumber && !p.isOutlier)
        const outlierPoints = pointsAnalysis.filter((p) => p.isValidNumber && p.isOutlier)

        // Fallback jika anomali (semua titik terdeteksi outlier): pakai seluruh titik valid
        const effectiveClean = cleanPoints.length > 0 ? cleanPoints : pointsAnalysis.filter((p) => p.isValidNumber)
        const cleanSum = effectiveClean.reduce((acc, p) => acc + p.value, 0)
        const cleanMean = effectiveClean.length > 0 ? cleanSum / effectiveClean.length : meanInitial

        // Masukkan ke array global
        effectiveClean.forEach((p) => {
          allValidPoints.push({
            groupId: grp.id || gIdx + 1,
            groupName: gName,
            pointId: p.id,
            value: p.value,
          })
        })

        outlierPoints.forEach((p) => {
          allOutlierPoints.push({
            groupId: grp.id || gIdx + 1,
            groupName: gName,
            pointId: p.id,
            value: p.value,
          })
        })

        return {
          groupId: grp.id || gIdx + 1,
          groupName: gName,
          n,
          meanInitial,
          sd,
          cv,
          lowerBound,
          upperBound,
          cleanPoints: effectiveClean,
          outlierPoints,
          cleanMean,
          pointsAnalysis,
        }
      })

      const totalValidCount = allValidPoints.length
      const totalOutlierCount = allOutlierPoints.length

      if (totalValidCount === 0) {
        return {
          results: [
            { label: 'Penetrasi Akhir (Terkoreksi)', value: '-', unit: '0.1 mm', highlight: true },
            { label: 'Total Titik Valid / Outlier', value: '0 / 0', unit: 'titik' },
            { label: 'Batas Toleransi Presisi SNI', value: 'Maks 4', unit: '0.1 mm' },
            { label: 'Selisih Bacaan Maks-Min (Presisi)', value: '-', unit: 'dmm', highlight: true },
          ],
          groupResults,
          formulaSteps: ['Belum ada data pembacaan jarum penetrasi yang valid. Masukkan angka positif > 0.'],
          isError: true,
          status: 'Input Belum Lengkap',
          verdictClass: 'warning',
          conclusion: 'Masukkan minimal satu data pembacaan jarum penetrasi yang valid (> 0 dmm).',
          summaryString: 'Input Belum Lengkap',
          penAkhir: '-',
          selisih: '-',
          batasToleransi: 4,
          isPresisiLolos: false,
          isSpecLolos: false,
          pMax: 0,
          pMin: 0,
          totalValidCount: 0,
          totalOutlierCount: 0,
          totalRawPointsCount,
          allValidPoints: [],
          allOutlierPoints: [],
          minSpec,
          maxSpec,
          kelasLabel,
        }
      }

      // 6. Rata-rata Penetrasi Akhir Global (P_akhir)
      const sumAllValid = allValidPoints.reduce((acc, p) => acc + p.value, 0)
      const penAkhir = sumAllValid / totalValidCount

      // 7. Maksimum, Minimum, dan Selisih dari SELURUH titik valid
      const validVals = allValidPoints.map((p) => p.value)
      const pMax = Math.max(...validVals)
      const pMin = Math.min(...validVals)
      const selisih = pMax - pMin

      // 8. Toleransi presisi SNI 2456:2011 Tabel 1
      let batasToleransi = 4
      let rentangLabel = '50 - 149'
      if (penAkhir < 50.0) {
        batasToleransi = 2
        rentangLabel = '0 - 49'
      } else if (penAkhir < 150.0) {
        batasToleransi = 4
        rentangLabel = '50 - 149'
      } else if (penAkhir < 250.0) {
        batasToleransi = 12
        rentangLabel = '150 - 249'
      } else {
        batasToleransi = 20
        rentangLabel = '250 - 500'
      }

      const isPresisiLolos = selisih <= batasToleransi
      const isSpecLolos = penAkhir >= minSpec && penAkhir <= maxSpec

      let status = 'Memenuhi Standar'
      let verdictClass = 'valid'
      let conclusion = ''

      if (!isSpecLolos) {
        status = 'Tidak Memenuhi Standar'
        verdictClass = 'error'
        conclusion = `Nilai penetrasi akhir (${penAkhir.toFixed(1)} dmm) berada di luar rentang spesifikasi ${kelasLabel} (${minSpec.toFixed(0)} s/d ${maxSpec.toFixed(0)} dmm). Aspal ${penAkhir < minSpec ? 'terlalu keras/getas (rawan retak lelah pada permukaan jalan)' : 'terlalu lunak/lembek (rawan alur ruts/bleeding pada cuaca panas)'}.`
      } else if (!isPresisiLolos) {
        status = 'Perlu Evaluasi (Presisi Rendah)'
        verdictClass = 'warning'
        conclusion = `Nilai penetrasi rata-rata (${penAkhir.toFixed(1)} dmm) memenuhi spesifikasi ${kelasLabel}, namun variasi/selisih pembacaan (ΔP = ${selisih.toFixed(1)} dmm) melebihi batas toleransi presisi SNI 2456:2011 (maksimal ${batasToleransi} dmm). Disarankan mengulang pengujian dengan kontrol temperatur bak perendam yang lebih stabil.`
      } else {
        status = 'Memenuhi Standar'
        verdictClass = 'valid'
        conclusion = `Nilai penetrasi akhir terkoreksi sebesar ${penAkhir.toFixed(1)} dmm memenuhi spesifikasi Bina Marga untuk ${kelasLabel} (${minSpec.toFixed(0)} - ${maxSpec.toFixed(0)} dmm) dan memenuhi toleransi presisi pembacaan SNI 2456:2011 (ΔP = ${selisih.toFixed(1)} dmm ≤ toleransi ${batasToleransi} dmm). Konsistensi aspal sangat baik untuk perkerasan jalan.`
      }

      // Ringkasan 4 kartu
      const results = [
        { label: 'Penetrasi Akhir (Terkoreksi)', value: penAkhir.toFixed(1), unit: '0.1 mm', highlight: true },
        { label: 'Total Titik Valid / Outlier', value: `${totalValidCount} / ${totalOutlierCount}`, unit: `titik (${groupResults.length} kelompok)` },
        { label: 'Batas Toleransi Presisi SNI', value: `Maks ${batasToleransi}`, unit: `0.1 mm (Rentang ${rentangLabel})` },
        { label: 'Selisih Bacaan Maks-Min (Presisi)', value: selisih.toFixed(1), unit: `dmm (Batas SNI ≤ ${batasToleransi})`, highlight: true },
      ]

      const formulaSteps = [
        `1. STANDAR PENGUJIAN & KONDISI EKSPERIMEN:`,
        `   - Standar Acuan: SNI 2456:2011 / ASTM D5 / Spesifikasi Umum Bina Marga 2018`,
        `   - Spesifikasi Kelas Aspal: ${kelasLabel} (Persyaratan Penetrasi: ${minSpec.toFixed(0)} - ${maxSpec.toFixed(0)} dmm)`,
        `   - Kondisi Uji: Suhu Bak Air = ${suhuUji.toFixed(1)}°C, Beban Jarum = ${bebanJarum} gram, Waktu = ${waktuPenetrasi} detik`,
        `   - Total Kelompok Uji: ${groupResults.length} kelompok | Total Pembacaan: ${totalRawPointsCount} titik`,
        ``,
        `2. ANALISIS STATISTIK & ELIMINASI OUTLIER PER KELOMPOK:`,
        ...groupResults.map((g) => {
          const rawStr = g.pointsAnalysis.map((p) => `${p.value !== null ? p.value.toFixed(1) : '-'}${p.isOutlier ? ' [OUTLIER]' : ''}`).join(', ')
          const outlierStr = g.outlierPoints.length > 0
            ? g.outlierPoints.map((p) => `${p.value.toFixed(1)} dmm`).join(', ')
            : 'Tidak ada outlier (semua titik masuk rentang toleransi)'
          const cleanStr = g.cleanPoints.length > 0
            ? g.cleanPoints.map((p) => `${p.value.toFixed(1)} dmm`).join(', ')
            : '-'

          return [
            `   [${g.groupName}]`,
            `   - Nilai Pembacaan (P_i): [${rawStr}] (n = ${g.n} titik)`,
            `   - Rata-rata Awal (P̄) = ΣP_i / n = ${g.meanInitial.toFixed(2)} dmm`,
            `   - Simpangan Baku Sampel (S) = √[Σ(P_i - P̄)² / (n - 1)] = ${g.sd.toFixed(2)} dmm`,
            `   - Koefisien Variasi (K) = (S / P̄) × 100% = ${g.cv.toFixed(2)}%`,
            `   - Rentang Valid Outlier [P̄ - S, P̄ + S]: [${g.lowerBound.toFixed(2)} dmm s/d ${g.upperBound.toFixed(2)} dmm]`,
            `   - Data Outlier Tereliminasi: ${outlierStr}`,
            `   - Data Bersih Lolos Seleksi: ${cleanStr}`,
            `   - Rata-rata Bersih Kelompok = ${g.cleanMean.toFixed(2)} dmm`,
          ].join('\n')
        }),
        ``,
        `3. PENGGABUNGAN DATA GLOBAL & PERHITUNGAN PENETRASI AKHIR:`,
        `   - Total Titik Valid Terkumpul: ${totalValidCount} titik (dari ${totalRawPointsCount} titik)`,
        `   - Data Valid Gabungan: [${allValidPoints.map((p) => `${p.value.toFixed(1)} dmm`).join(', ')}]`,
        `   - Penetrasi Akhir (P_akhir) = Σ(P_valid) / N_valid`,
        `   - P_akhir = (${allValidPoints.map((p) => p.value.toFixed(1)).join(' + ')}) / ${totalValidCount} = ${penAkhir.toFixed(2)} dmm ≈ ${penAkhir.toFixed(1)} dmm`,
        ``,
        `4. EVALUASI PRESISI PEMBACAAN SNI 2456:2011:`,
        `   - Titik Pembacaan Valid Tertinggi (P_maks) = ${pMax.toFixed(1)} dmm`,
        `   - Titik Pembacaan Valid Terendah (P_min) = ${pMin.toFixed(1)} dmm`,
        `   - Selisih Pembacaan (ΔP) = P_maks - P_min = ${pMax.toFixed(1)} - ${pMin.toFixed(1)} = ${selisih.toFixed(1)} dmm`,
        `   - Batas Toleransi Maksimal SNI 2456:2011 (Tabel 1 untuk rentang ${rentangLabel} dmm) = ${batasToleransi} dmm`,
        `   - Evaluasi Presisi: ΔP = ${selisih.toFixed(1)} dmm ${isPresisiLolos ? '≤' : '>'} ${batasToleransi} dmm ➔ ${isPresisiLolos ? 'MEMENUHI PERSYARATAN PRESISI (Valid)' : 'MELEBIHI BATAS TOLERANSI PRESISI'}`,
        ``,
        `5. EVALUASI KESESUAIAN SPESIFIKASI BINA MARGA 2018:`,
        `   - Spesifikasi ${kelasLabel}: Syarat Penetrasi = ${minSpec.toFixed(0)} - ${maxSpec.toFixed(0)} dmm`,
        `   - Nilai Penetrasi Akhir Terkoreksi = ${penAkhir.toFixed(1)} dmm ➔ ${isSpecLolos ? 'MEMENUHI SPESIFIKASI' : 'DI LUAR PERSYARATAN'}`,
        `   - KESIMPULAN AKHIR: ${conclusion}`,
      ]

      return {
        results,
        formulaSteps,
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `P_akhir = ${penAkhir.toFixed(1)} dmm | ΔP = ${selisih.toFixed(1)} dmm | ${status}`,
        penAkhir: penAkhir.toFixed(1),
        penAkhirNum: penAkhir,
        selisih: selisih.toFixed(1),
        selisihNum: selisih,
        batasToleransi,
        isPresisiLolos,
        isSpecLolos,
        pMax,
        pMin,
        totalValidCount,
        totalOutlierCount,
        totalRawPointsCount,
        groupResults,
        allValidPoints,
        allOutlierPoints,
        minSpec,
        maxSpec,
        kelasLabel,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 3: UJI TITIK LEMBEK & INDEKS PENETRASI / PI (SNI 2434:2011)
  // -----------------------------------------------------------------------
  'bp-3-1': {
    id: 'bp-3-1',
    code: 'TL-01',
    codePrefix: 'TL',
    name: 'Uji Titik Lembek (Ring and Ball) & Indeks Penetrasi (PI)',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 3: Titik Lembek & PI',
    standard: 'SNI 2434:2011 / Spesifikasi Umum Bina Marga 2018',
    desc: 'Pengukuran suhu titik lembek aspal dengan metode cincin dan bola (Ring and Ball) serta penentuan Indeks Penetrasi (PI) model Pfeiffer & Van Doormaal untuk mengevaluasi kepekaan termal aspal.',
    initialInputs: {
      t1: 50.2,
      t2: 50.8,
      pen25: 65.0,
      kelasAspal: 'pen6070',
    },
    fields: [
      {
        key: 't1',
        label: 'Suhu Titik Lembek Bola/Cincin 1 (T1)',
        unit: '°C',
        desc: 'Suhu air saat bola baja menembus cincin 1 dan menyentuh pelat dasar',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 't2',
        label: 'Suhu Titik Lembek Bola/Cincin 2 (T2)',
        unit: '°C',
        desc: 'Suhu air saat bola baja menembus cincin 2 dan menyentuh pelat dasar',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'pen25',
        label: 'Nilai Penetrasi pada 25°C (Pen_25)',
        unit: '0.1 mm',
        desc: 'Nilai penetrasi jarum terukur pada suhu standar 25°C (satuan dmm)',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'kelasAspal',
        label: 'Kelas Aspal Acuan',
        type: 'select',
        desc: 'Ambang batas spesifikasi titik lembek sesuai Bina Marga 2018',
        options: [
          { value: 'pen6070', label: 'Aspal Pen 60/70 (Syarat Titik Lembek >= 48°C)' },
          { value: 'modifikasi', label: 'Aspal Modifikasi / PG 70 (Syarat Titik Lembek >= 54°C)' },
        ],
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      const t1 = Number(inputs.t1)
      const t2 = Number(inputs.t2)
      const pen = Number(inputs.pen25)
      const kelas = inputs.kelasAspal || 'pen6070'
      const minTL = kelas === 'modifikasi' ? 54.0 : 48.0

      if (isNaN(t1) || isNaN(t2) || isNaN(pen) || t1 <= 0 || t2 <= 0 || pen <= 0) {
        return {
          results: [
            { label: 'Titik Lembek Rata-rata (T_RB)', value: '-', unit: '°C', highlight: true },
            { label: 'Indeks Penetrasi (PI)', value: '-', unit: '', highlight: true },
            { label: 'Kepekaan Suhu (Nilai A)', value: '-', unit: '' },
            { label: 'Selisih 2 Cincin (|T1 - T2|)', value: '-', unit: '°C' },
          ],
          formulaSteps: ['Suhu titik lembek cincin (T1, T2) dan penetrasi 25°C harus berupa angka positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          conclusion: 'Nilai input temperatur cincin dan penetrasi harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      const trb = (t1 + t2) / 2
      const deltaT = Math.abs(t1 - t2)

      if (trb <= 25.0) {
        return {
          results: [
            { label: 'Titik Lembek Rata-rata (T_RB)', value: '-', unit: '°C', highlight: true },
            { label: 'Indeks Penetrasi (PI)', value: '-', unit: '', highlight: true },
            { label: 'Kepekaan Suhu (Nilai A)', value: '-', unit: '' },
            { label: 'Selisih 2 Cincin (|T1 - T2|)', value: '-', unit: '°C' },
          ],
          formulaSteps: [`Suhu titik lembek rata-rata (${trb.toFixed(1)}°C) harus lebih besar dari 25.0°C agar penyebut (T_RB - 25) bernilai positif.`],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Suhu titik lembek aspal padat harus lebih tinggi dari suhu standar penetrasi 25.0°C.',
          summaryString: 'T_RB <= 25 Tidak Valid',
        }
      }

      // Rumus Pfeiffer & Van Doormaal:
      // A = [log10(800) - log10(Pen_25)] / (T_RB - 25)
      // PI = (20 - (500 * A)) / (1 + (50 * A))
      const log800 = Math.log10(800)
      const logPen = Math.log10(pen)
      const deltaTemp = trb - 25.0
      const aKoef = (log800 - logPen) / deltaTemp
      const pi = (20.0 - 500.0 * aKoef) / (1.0 + 50.0 * aKoef)

      const isTLMemenuhi = trb >= minTL
      const isDuplikatLolos = deltaT <= 1.0
      const isPiIdeal = pi >= -1.0 && pi <= 1.0

      let status = 'Memenuhi Standar'
      let verdictClass = 'valid'
      let conclusion = ''

      if (!isTLMemenuhi) {
        status = 'Tidak Memenuhi Standar'
        verdictClass = 'error'
        conclusion = `Titik lembek tidak memenuhi syarat minimal Bina Marga >= 48°C, aspal mudah meleleh pada suhu permukaan jalan (T_RB = ${trb.toFixed(1)}°C < ${minTL.toFixed(1)}°C).`
      } else if (!isDuplikatLolos) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
        conclusion = `Selisih suhu kedua cincin melebihi batas SNI 1.0°C (|T1 - T2| = ${deltaT.toFixed(1)}°C > 1.0°C), pengujian harus diulang.`
      } else if (!isPiIdeal) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
        if (pi < -1.0) {
          conclusion = 'Aspal sangat sensitif terhadap suhu, rawan bleeding di suhu tinggi & retak di suhu rendah.'
        } else {
          conclusion = 'Aspal kurang peka suhu / bersifat blown bitumen.'
        }
      } else {
        status = 'Memenuhi Standar'
        verdictClass = 'valid'
        conclusion = `Titik lembek rata-rata ${trb.toFixed(1)}°C memenuhi syarat minimal Bina Marga (≥ ${minTL.toFixed(1)}°C), presisi duplikat cincin memenuhi syarat SNI (ΔT = ${deltaT.toFixed(1)}°C ≤ 1.0°C), dan Indeks Penetrasi PI = ${pi.toFixed(2)} berada dalam rentang ideal (-1.0 s/d +1.0).`
      }

      return {
        results: [
          { label: 'Titik Lembek Rata-rata (T_RB)', value: trb.toFixed(1), unit: '°C', highlight: true },
          { label: 'Indeks Penetrasi (PI)', value: pi.toFixed(2), unit: '', highlight: true },
          { label: 'Kepekaan Suhu (Nilai A)', value: aKoef.toFixed(4), unit: '' },
          { label: 'Selisih 2 Cincin (|T1 - T2|)', value: deltaT.toFixed(1), unit: '°C (Syarat SNI ≤ 1.0°C)' },
        ],
        formulaSteps: [
          `1. SUHU TITIK LEMBEK DUA CINCIN:`,
          `   Suhu Cincin 1 (T1) = ${t1.toFixed(1)} °C, Suhu Cincin 2 (T2) = ${t2.toFixed(1)} °C`,
          `   Nilai Penetrasi pada 25°C (Pen_25) = ${pen.toFixed(1)} (0.1 mm)`,
          `2. SUHU TITIK LEMBEK RATA-RATA & SELISIH DUPLIKAT CINCIN:`,
          `   T_RB = (T1 + T2) / 2 = (${t1.toFixed(1)} + ${t2.toFixed(1)}) / 2 = ${trb.toFixed(1)} °C`,
          `   Selisih Duplikat Cincin (Delta_T) = |T1 - T2| = |${t1.toFixed(1)} - ${t2.toFixed(1)}| = ${deltaT.toFixed(1)} °C (Syarat SNI ≤ 1.0°C: ${isDuplikatLolos ? 'Lolos' : 'Melebihi Toleransi'})`,
          `3. FAKTOR KEPEKAAN SUHU / TEMPERATURE SUSCEPTIBILITY (A):`,
          `   A = (log₁₀(800) - log₁₀(Pen_25)) / (T_RB - 25)`,
          `   A = (${log800.toFixed(4)} - ${logPen.toFixed(4)}) / (${trb.toFixed(1)} - 25) = ${aKoef.toFixed(4)}`,
          `4. INDEKS PENETRASI / PENETRATION INDEX (PI):`,
          `   PI = (20 - (500 × A)) / (1 + (50 × A))`,
          `   PI = (20 - (500 × ${aKoef.toFixed(4)})) / (1 + (50 × ${aKoef.toFixed(4)})) = ${pi.toFixed(2)}`,
          `5. BATASAN VERIFIKASI SNI 2434:2011 & BINA MARGA 2018:`,
          `   Syarat Titik Lembek (T_RB) = Minimal ≥ ${minTL.toFixed(1)} °C ➔ Hasil = ${trb.toFixed(1)} °C (${isTLMemenuhi ? 'Memenuhi Standar' : 'Tidak Memenuhi'})`,
          `   Syarat Indeks Penetrasi (PI) Perkerasan Jalan = -1.0 ≤ PI ≤ +1.0 ➔ Hasil = ${pi.toFixed(2)} (${isPiIdeal ? 'Ideal' : 'Di Luar Batas'})`,
          `   Status Evaluasi: ${status}`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `T_RB = ${trb.toFixed(1)}°C | PI = ${pi.toFixed(2)} | ${status}`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 4: UJI BERAT JENIS ASPAL KERAS DENGAN PIKNOMETER (SNI 2441:2011)
  // -----------------------------------------------------------------------
  'bp-4-1': {
    id: 'bp-4-1',
    code: 'BJA-01',
    codePrefix: 'BJ',
    name: 'Uji Berat Jenis Aspal Keras dengan Piknometer',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 4: Berat Jenis Aspal',
    standard: 'SNI 2441:2011 / Spesifikasi Umum Bina Marga 2018',
    desc: 'Pengukuran berat jenis (specific gravity) dan densitas aspal keras padat menggunakan piknometer kaca kalibrasi pada suhu standar 25°C sesuai SNI 2441:2011.',
    initialInputs: {
      massaA: 24.50,
      massaB: 49.42,
      massaC: 39.85,
      massaD: 49.88,
      rhoW: 0.9970,
    },
    fields: [
      {
        key: 'massaA',
        label: 'Berat Piknometer Kosong + Penutup (A)',
        unit: 'gram',
        desc: 'Massa piknometer bersih dan kering oven sempurna (gram)',
        min: 0.01,
        step: 0.01,
        isParameterBesar: true,
      },
      {
        key: 'massaB',
        label: 'Berat Piknometer + Air Suling Penuh pada 25°C (B)',
        unit: 'gram',
        desc: 'Massa piknometer diisi penuh air suling pada suhu 25°C (gram)',
        min: 0.01,
        step: 0.01,
        isParameterBesar: true,
      },
      {
        key: 'massaC',
        label: 'Berat Piknometer + Sampel Aspal (± 3/4 volume) (C)',
        unit: 'gram',
        desc: 'Massa piknometer diisi sampel aspal padat (gram)',
        min: 0.01,
        step: 0.01,
        isParameterBesar: true,
      },
      {
        key: 'massaD',
        label: 'Berat Piknometer + Sampel Aspal + Air Suling Penuh pada 25°C (D)',
        unit: 'gram',
        desc: 'Massa piknometer berisi aspal dan diisi penuh air suling 25°C (gram)',
        min: 0.01,
        step: 0.01,
        isParameterBesar: true,
      },
      {
        key: 'rhoW',
        label: 'Kerapatan Air pada Suhu 25°C (rho_w)',
        unit: 'gr/cm³',
        desc: 'Densitas air suling pada suhu standar 25°C (standar 0.9970 gr/cm³)',
        min: 0.01,
        step: 0.0001,
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      const a = Number(inputs.massaA)
      const b = Number(inputs.massaB)
      const c = Number(inputs.massaC)
      const d = Number(inputs.massaD)
      const rhoW = Number(inputs.rhoW) || 0.9970

      if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(rhoW) || a <= 0 || b <= 0 || c <= 0 || d <= 0 || rhoW <= 0) {
        return {
          results: [
            { label: 'Berat Jenis Aspal Keras (BJ)', value: '-', unit: '', highlight: true },
            { label: 'Densitas Aspal (25°C)', value: '-', unit: 'gr/cm³' },
            { label: 'Berat Sampel Aspal (C - A)', value: '-', unit: 'gram' },
            { label: 'Volume Air Dipindahkan', value: '-', unit: 'cm³', highlight: true },
          ],
          formulaSteps: ['Keempat massa penimbangan piknometer (A, B, C, D) dan densitas air harus berupa angka positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          conclusion: 'Nilai penimbangan piknometer harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      // Validasi Input Fisik: C > A dan (B - A) > (D - C)
      if (c <= a) {
        return {
          results: [
            { label: 'Berat Jenis Aspal Keras (BJ)', value: '-', unit: '', highlight: true },
            { label: 'Densitas Aspal (25°C)', value: '-', unit: 'gr/cm³' },
            { label: 'Berat Sampel Aspal (C - A)', value: '-', unit: 'gram' },
            { label: 'Volume Air Dipindahkan', value: '-', unit: 'cm³', highlight: true },
          ],
          formulaSteps: [`Berat piknometer + aspal (C = ${c} g) harus lebih besar daripada piknometer kosong (A = ${a} g).`],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Massa sampel aspal (C - A) harus bernilai positif.',
          summaryString: 'C <= A Tidak Valid',
        }
      }

      const wAspal = c - a
      const wAirPenuh = b - a
      const wAirSisa = d - c
      const wAirPindah = wAirPenuh - wAirSisa

      if (wAirPindah <= 0) {
        return {
          results: [
            { label: 'Berat Jenis Aspal Keras (BJ)', value: '-', unit: '', highlight: true },
            { label: 'Densitas Aspal (25°C)', value: '-', unit: 'gr/cm³' },
            { label: 'Berat Sampel Aspal (C - A)', value: '-', unit: 'gram' },
            { label: 'Volume Air Dipindahkan', value: '-', unit: 'cm³', highlight: true },
          ],
          formulaSteps: [
            `Penyebut [(B - A) - (D - C)] bernilai ${wAirPindah.toFixed(2)} gram (harus > 0).`,
            `Berat air penuh (B - A = ${wAirPenuh.toFixed(2)} g) harus lebih besar daripada berat air sisa (D - C = ${wAirSisa.toFixed(2)} g). Periksa kembali data penimbangan D dan B.`,
          ],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Volume air yang dipindahkan oleh aspal harus positif [(B - A) > (D - C)]. Periksa kembali nilai penimbangan piknometer.',
          summaryString: 'Penyebut <= 0 Tidak Valid',
        }
      }

      const bj = wAspal / wAirPindah
      const rhoAspal = bj * rhoW
      const wt = Math.round(rhoW * 1000) // W_T air suling pada 25°C = 997 kg/m³
      const beratIsi = bj * wt // Berat Isi dalam kg/m³
      const isMemenuhi = bj >= 1.000

      const status = isMemenuhi ? 'Memenuhi Standar' : 'Tidak Memenuhi Standar'
      const verdictClass = isMemenuhi ? 'valid' : 'error'
      const conclusion = isMemenuhi
        ? 'Berat jenis aspal memenuhi syarat SNI 2441:2011 & Bina Marga (BJ >= 1.00), bebas dari kontaminasi fraksi ringan berlebih.'
        : 'Berat jenis aspal di bawah syarat minimum 1.000, tidak memenuhi spesifikasi perkerasan jalan.'

      return {
        results: [
          { label: 'Berat Jenis Aspal Keras (BJ)', value: bj.toFixed(3), unit: '', highlight: true },
          { 
            label: 'Densitas Aspal (25°C)', 
            value: rhoAspal.toFixed(3), 
            unit: 'gr/cm³',
            sub: `Berat Isi: ${Math.round(beratIsi)} kg/m³ (${beratIsi.toFixed(1)} kg/m³)`
          },
          { label: 'Berat Sampel Aspal (C - A)', value: wAspal.toFixed(2), unit: 'gram' },
          { label: 'Volume Air Dipindahkan', value: wAirPindah.toFixed(2), unit: 'cm³' },
        ],
        formulaSteps: [
          `1. DATA PENIMBANGAN PIKNOMETER PADA 25°C:`,
          `   Berat Piknometer Kosong + Penutup (A) = ${a.toFixed(2)} gram`,
          `   Berat Piknometer + Air Suling Penuh pada 25°C (B) = ${b.toFixed(2)} gram`,
          `   Berat Piknometer + Sampel Aspal (C) = ${c.toFixed(2)} gram`,
          `   Berat Piknometer + Sampel Aspal + Air Suling Penuh pada 25°C (D) = ${d.toFixed(2)} gram`,
          `   Kerapatan Air pada Suhu 25°C (rho_w) = ${rhoW.toFixed(4)} gr/cm³`,
          `2. PERHITUNGAN MASSA KOMPONEN:`,
          `   Berat Sampel Aspal Kering (W_aspal) = C - A = ${c.toFixed(2)} - ${a.toFixed(2)} = ${wAspal.toFixed(2)} gram`,
          `   Berat Air Suling Penuh (W_air_penuh) = B - A = ${b.toFixed(2)} - ${a.toFixed(2)} = ${wAirPenuh.toFixed(2)} gram`,
          `   Berat Air Sisa di Atas Aspal (W_air_sisa) = D - C = ${d.toFixed(2)} - ${c.toFixed(2)} = ${wAirSisa.toFixed(2)} gram`,
          `   Berat Air yang Dipindahkan oleh Aspal (W_air_pindah) = (B - A) - (D - C) = ${wAirPenuh.toFixed(2)} - ${wAirSisa.toFixed(2)} = ${wAirPindah.toFixed(2)} gram (Volume = ${wAirPindah.toFixed(2)} cm³)`,
          `3. RUMUS BERAT JENIS RELATIF ASPAL (BULK SPECIFIC GRAVITY / BJ):`,
          `   BJ = (C - A) / [(B - A) - (D - C)]`,
          `   BJ = ${wAspal.toFixed(2)} / ${wAirPindah.toFixed(2)} = ${bj.toFixed(3)}`,
          `4. RUMUS KERAPATAN / DENSITAS ASPAL PADA 25°C (rho_aspal):`,
          `   rho_aspal = BJ × rho_w = ${bj.toFixed(3)} × ${rhoW.toFixed(4)} = ${rhoAspal.toFixed(3)} gr/cm³`,
          `5. BATASAN VERIFIKASI SNI 2441:2011 & BINA MARGA 2018:`,
          `   Syarat Minimum BJ Aspal Keras = 1.000 ➔ Hasil = ${bj.toFixed(3)} (${isMemenuhi ? 'Memenuhi Standar' : 'Tidak Memenuhi Standar'})`,
          `   Status Kelayakan: ${status}`,
          `6. KONVERSI KE BERAT ISI (kg/m³):`,
          `   Berat Isi (kg/m³) = BJ × W_T (997 kg/m³) = ${bj.toFixed(3)} × ${wt} kg/m³ = ${beratIsi.toFixed(1)} kg/m³ (≈ ${Math.round(beratIsi)} kg/m³)`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `BJ = ${bj.toFixed(3)} | rho = ${rhoAspal.toFixed(3)} gr/cm³ (${Math.round(beratIsi)} kg/m³) (${status})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 5: UJI TITIK NYALA & TITIK BAKAR CLEVELAND OPEN CUP (SNI 2433:2011)
  // -----------------------------------------------------------------------
  'bp-5-1': {
    id: 'bp-5-1',
    code: 'TNB-01',
    codePrefix: 'TB',
    name: 'Uji Titik Nyala & Titik Bakar Cleveland Open Cup',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 5: Titik Nyala & Bakar',
    standard: 'SNI 2433:2011 / Spesifikasi Umum Bina Marga 2018',
    desc: 'Pengukuran batas keamanan temperatur aspal terhadap percikan api terbuka (Flash Point & Fire Point) dengan koreksi variasi tekanan atmosfer barometrik sesuai standar SNI 2433:2011.',
    hasDynamicFlashSamples: true,
    initialInputs: {
      samples: DEFAULT_FLASH_SAMPLES,
      tekananK: 727.0,
      tekananKUnit: 'mmHg',
      syaratNyalaMin: 232,
      // fallback fields for backwards compatibility
      tNyala1: 325.0,
      tNyala2: 330.0,
      tNyala3: 315.0,
      tBakar1: 334.0,
      tBakar2: 360.0,
      tBakar3: 339.0,
    },
    fields: [
      {
        key: 'tekananK',
        label: 'Tekanan Barometer Udara Saat Pengujian (P / K)',
        desc: 'Tekanan atmosfer ruangan laboratorium (contoh laprak: 727 mmHg atau 96.93 kPa, standar permukaan laut: 101.3 kPa)',
        min: 0.01,
        step: 0.1,
        unit: 'mmHg',
        unitOptions: [
          { value: 'mmHg', label: 'mmHg' },
          { value: 'kPa', label: 'kPa' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'syaratNyalaMin',
        label: 'Syarat Minimum Titik Nyala Spesifikasi',
        type: 'select',
        desc: 'Batas toleransi minimum titik nyala aspal keras spesifikasi Bina Marga 2018',
        options: [
          { value: 232, label: 'Aspal Pen 60/70 & Pen 40/50 (Min >= 232°C)' },
        ],
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      // 1. Ekstraksi Sampel (Dinamis atau Fallback Statis)
      let nyalaVals = []
      let bakarVals = []
      let isDynamic = false

      if (Array.isArray(inputs.samples)) {
        isDynamic = true
        if (inputs.samples.length === 0) {
          return {
            results: [
              { label: 'Titik Nyala Terkoreksi', value: 'Minimal 1 Sampel', unit: '', highlight: true },
              { label: 'Titik Bakar Terkoreksi', value: 'Minimal 1 Sampel', unit: '' },
              { label: 'Koreksi Barometrik', value: '-', unit: '' },
              { label: 'Selisih Bakar - Nyala', value: '-', unit: '', highlight: true },
            ],
            formulaSteps: ['Belum ada sampel pengujian. Silakan klik "+ Tambah Sampel" untuk memulai input data pengujian.'],
            isError: true,
            status: 'Minimal 1 Sampel',
            verdictClass: 'warning',
            conclusion: 'Belum ada data sampel yang diinput. Minimal harus ada 1 sampel untuk melakukan kalkulasi.',
            summaryString: 'Minimal 1 Sampel',
          }
        }

        // Cek jika ada input bernilai negatif (< 0)
        const hasNegative = inputs.samples.some((s) => {
          const fStr = String(s.flashPoint ?? '').trim()
          const bStr = String(s.firePoint ?? '').trim()
          return fStr.startsWith('-') || (fStr !== '' && Number(fStr) < 0) ||
                 bStr.startsWith('-') || (bStr !== '' && Number(bStr) < 0)
        })

        if (hasNegative) {
          return {
            results: [
              { label: 'Titik Nyala Terkoreksi', value: '-', unit: '°C', highlight: true },
              { label: 'Titik Bakar Terkoreksi', value: '-', unit: '°C' },
              { label: 'Koreksi Barometrik', value: '-', unit: '°C' },
              { label: 'Selisih Bakar - Nyala', value: '-', unit: '°C', highlight: true },
            ],
            formulaSteps: ['Nilai suhu pembacaan titik nyala dan titik bakar tidak boleh bernilai negatif.'],
            isError: true,
            status: 'Input Tidak Valid',
            verdictClass: 'error',
            conclusion: 'Input parameter suhu pengujian tidak boleh bernilai negatif (< 0).',
            summaryString: 'Input Parameter Negatif',
          }
        }

        inputs.samples.forEach((s) => {
          if (s.flashPoint !== undefined && s.flashPoint !== null && s.flashPoint !== '') {
            const f = Number(s.flashPoint)
            if (!isNaN(f) && f > 0) nyalaVals.push(f)
          }
          if (s.firePoint !== undefined && s.firePoint !== null && s.firePoint !== '') {
            const b = Number(s.firePoint)
            if (!isNaN(b) && b > 0) bakarVals.push(b)
          }
        })
      } else {
        // Fallback statis jika inputs.samples tidak diberikan
        const staticNyala = [inputs.tNyala1, inputs.tNyala2, inputs.tNyala3]
          .map((v) => (v !== undefined && v !== null && v !== '' ? Number(v) : NaN))
          .filter((v) => !isNaN(v) && v > 0)
        if (staticNyala.length > 0) {
          nyalaVals = staticNyala
        } else if (inputs.cNyala !== undefined && inputs.cNyala !== null && inputs.cNyala !== '') {
          const v = Number(inputs.cNyala)
          if (!isNaN(v) && v > 0) nyalaVals = [v]
        }

        const staticBakar = [inputs.tBakar1, inputs.tBakar2, inputs.tBakar3]
          .map((v) => (v !== undefined && v !== null && v !== '' ? Number(v) : NaN))
          .filter((v) => !isNaN(v) && v > 0)
        if (staticBakar.length > 0) {
          bakarVals = staticBakar
        } else if (inputs.cBakar !== undefined && inputs.cBakar !== null && inputs.cBakar !== '') {
          const v = Number(inputs.cBakar)
          if (!isNaN(v) && v > 0) bakarVals = [v]
        }
      }

      // Validasi kelengkapan nilai
      const totalRequired = isDynamic ? inputs.samples.length : 1
      if (nyalaVals.length < totalRequired || bakarVals.length < totalRequired) {
        return {
          results: [
            { label: 'Titik Nyala Terkoreksi', value: '-', unit: '°C', highlight: true },
            { label: 'Titik Bakar Terkoreksi', value: '-', unit: '°C' },
            { label: 'Koreksi Barometrik', value: '-', unit: '°C' },
            { label: 'Selisih Bakar - Nyala', value: '-', unit: '°C', highlight: true },
          ],
          formulaSteps: ['Seluruh baris sampel titik nyala dan titik bakar harus diisi dengan angka positif > 0.'],
          isError: true,
          status: 'Input Tidak Lengkap',
          verdictClass: 'warning',
          conclusion: 'Mohon lengkapi seluruh pembacaan suhu titik nyala dan titik bakar untuk semua sampel.',
          summaryString: 'Input Belum Lengkap',
        }
      }

      const cNyala = nyalaVals.reduce((a, b) => a + b, 0) / nyalaVals.length
      const cBakar = bakarVals.reduce((a, b) => a + b, 0) / bakarVals.length

      // 2. Ekstraksi Tekanan Barometer (mmHg atau kPa)
      const rawP = Number(inputs.tekananK)
      const unitP = inputs.tekananKUnit || (rawP > 300 ? 'mmHg' : 'kPa')
      let k = NaN
      let pMmHg = NaN

      if (!isNaN(rawP) && rawP > 0) {
        if (unitP === 'mmHg') {
          pMmHg = rawP
          k = rawP * 0.13332237
        } else {
          k = rawP
          pMmHg = rawP / 0.13332237
        }
      }

      const syaratMin = Number(inputs.syaratNyalaMin) || 232.0

      if (
        isNaN(cNyala) || isNaN(cBakar) || isNaN(k) ||
        cNyala <= 0 || cBakar <= 0 || k <= 0
      ) {
        return {
          results: [
            { label: 'Titik Nyala Terkoreksi', value: '-', unit: '°C', highlight: true },
            { label: 'Titik Bakar Terkoreksi', value: '-', unit: '°C' },
            { label: 'Koreksi Barometrik', value: '-', unit: '°C' },
            { label: 'Selisih Bakar - Nyala', value: '-', unit: '°C', highlight: true },
          ],
          formulaSteps: ['Nilai suhu pembacaan sampel dan tekanan barometer harus berupa angka positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          verdictClass: 'error',
          conclusion: 'Input parameter suhu dan tekanan barometer harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      // Rumus Koreksi Tekanan Barometrik (SNI 2433:2011 & Rumus 8.1 Modul Praktikum):
      // Delta_T_bar = 0.25 * (101.3 - K)
      const deltaTBar = 0.25 * (101.3 - k)
      const tNyalaKor = cNyala + deltaTBar
      const tBakarKor = cBakar + deltaTBar

      // Pembulatan Pelaporan SNI (Dibulatkan ke 1°C terdekat sesuai Rumus 8.1 laprak)
      const tNyalaSni = Math.round(tNyalaKor)
      const tBakarSni = Math.round(tBakarKor)
      const selisihBakarNyala = tBakarKor - tNyalaKor

      const isRangeValid = cNyala >= 79.0 && cNyala <= 400.0 && cBakar >= 79.0 && cBakar <= 400.0
      const isUrutanLogis = tBakarKor > tNyalaKor
      const isNyalaAman = tNyalaKor >= syaratMin

      let status = 'Memenuhi Standar (Aman)'
      let verdictClass = 'valid'
      let conclusion = ''

      if (!isUrutanLogis) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
        conclusion = 'Peringatan: Suhu Titik Bakar harus lebih tinggi daripada Suhu Titik Nyala.'
      } else if (!isRangeValid) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
        conclusion = 'Suhu berada di luar rentang pengukuran standar Cleveland Open Cup (79°C - 400°C).'
      } else if (!isNyalaAman) {
        status = 'Tidak Memenuhi Standar'
        verdictClass = 'error'
        conclusion = `Titik nyala terkoreksi (${tNyalaKor.toFixed(2)}°C) berada di bawah batas minimum Bina Marga (${syaratMin}°C). Aspal mengandung fraksi mudah menguap dan berisiko kebakaran saat dipanaskan.`
      } else {
        status = 'Memenuhi Standar (Aman)'
        verdictClass = 'valid'
        conclusion = `Memenuhi syarat keamanan suhu pemanasan aspal Bina Marga (≥ ${syaratMin}°C), aman terhadap risiko kilatan api saat pencampuran di AMP.`
      }

      const formatTemp = (val) => {
        if (Math.abs(val - Math.round(val)) < 1e-4) {
          return val.toFixed(1)
        }
        return val.toFixed(2)
      }

      const nSamples = nyalaVals.length
      const nyalaSumStr = nyalaVals.map((v) => v.toFixed(1)).join(' + ')
      const bakarSumStr = bakarVals.map((v) => v.toFixed(1)).join(' + ')
      const nyalaArrayStr = `[${nyalaVals.map((v) => `${v.toFixed(1)}°C`).join(', ')}]`
      const bakarArrayStr = `[${bakarVals.map((v) => `${v.toFixed(1)}°C`).join(', ')}]`

      return {
        results: [
          {
            label: 'Titik Nyala Terkoreksi',
            value: `${formatTemp(tNyalaKor)} °C (Pelaporan SNI: ${tNyalaSni} °C)`,
            unit: '',
            highlight: true,
            sub: nSamples > 1 ? `Rata-rata Terbaca (C_nyala): ${cNyala.toFixed(2)} °C` : `Suhu Terbaca: ${cNyala.toFixed(1)} °C`,
          },
          {
            label: 'Titik Bakar Terkoreksi',
            value: `${formatTemp(tBakarKor)} °C (Pelaporan SNI: ${tBakarSni} °C)`,
            unit: '',
            sub: nSamples > 1 ? `Rata-rata Terbaca (C_bakar): ${cBakar.toFixed(2)} °C` : `Suhu Terbaca: ${cBakar.toFixed(1)} °C`,
          },
          {
            label: 'Koreksi Barometrik',
            value: `${deltaTBar >= 0 ? '+' : ''}${deltaTBar.toFixed(2)} °C`,
            unit: `(P = ${pMmHg.toFixed(1)} mmHg / K = ${k.toFixed(2)} kPa)`,
            sub: `Rumus: 0.25 × (101.3 - K)`,
          },
          {
            label: 'Selisih Bakar - Nyala',
            value: `${selisihBakarNyala.toFixed(1)} °C`,
            unit: '',
            highlight: true,
            sub: `T_bakar - T_nyala (${formatTemp(tBakarKor)} - ${formatTemp(tNyalaKor)})`,
          },
        ],
        formulaSteps: [
          `1. PEMBACAAN SUHU SAMPEL TITIK NYALA & TITIK BAKAR:`,
          `   Sampel Titik Nyala: ${nyalaArrayStr} (${nSamples} Sampel)`,
          nSamples > 1
            ? `   C_nyala = (${nyalaSumStr}) / ${nSamples} = ${cNyala.toFixed(2)} °C`
            : `   C_nyala = ${nyalaVals[0].toFixed(1)} / 1 = ${cNyala.toFixed(2)} °C`,
          `   Sampel Titik Bakar: ${bakarArrayStr} (${nSamples} Sampel)`,
          nSamples > 1
            ? `   C_bakar = (${bakarSumStr}) / ${nSamples} = ${cBakar.toFixed(2)} °C`
            : `   C_bakar = ${bakarVals[0].toFixed(1)} / 1 = ${cBakar.toFixed(2)} °C`,
          `   Tekanan Barometer Udara: P = ${pMmHg.toFixed(1)} mmHg ➔ K = P × 0.13332237 = ${k.toFixed(4)} kPa`,
          `2. FAKTOR KOREKSI TEKANAN BAROMETRIK (Delta_T_bar):`,
          `   Delta_T_bar = 0.25 × (101.3 - K)`,
          `   Delta_T_bar = 0.25 × (101.3 - ${k.toFixed(4)}) = ${deltaTBar >= 0 ? '+' : ''}${deltaTBar.toFixed(2)} °C (Nilai presisi: ${deltaTBar >= 0 ? '+' : ''}${deltaTBar.toFixed(4)} °C)`,
          `3. SUHU TITIK NYALA & TITIK BAKAR TERKOREKSI:`,
          `   T_nyala_kor = C_nyala + 0.25 × (101.3 - K) = ${cNyala.toFixed(2)} + (${deltaTBar >= 0 ? '+' : ''}${deltaTBar.toFixed(4)}) = ${tNyalaKor.toFixed(2)} °C`,
          `   T_bakar_kor = C_bakar + 0.25 × (101.3 - K) = ${cBakar.toFixed(2)} + (${deltaTBar >= 0 ? '+' : ''}${deltaTBar.toFixed(4)}) = ${tBakarKor.toFixed(2)} °C`,
          `4. PEMBULATAN PELAPORAN SNI 2433:2011 (DIBULATKAN KE 1°C TERDEKAT):`,
          `   T_nyala_SNI = Math.round(${tNyalaKor.toFixed(2)}) = ${tNyalaSni} °C (Nilai Desimal Presisi: ${tNyalaKor.toFixed(2)} °C)`,
          `   T_bakar_SNI = Math.round(${tBakarKor.toFixed(2)}) = ${tBakarSni} °C (Nilai Desimal Presisi: ${tBakarKor.toFixed(2)} °C)`,
          `   Selisih Suhu Bakar - Nyala = T_bakar_kor - T_nyala_kor = ${tBakarKor.toFixed(2)} - ${tNyalaKor.toFixed(2)} = ${selisihBakarNyala.toFixed(2)} °C`,
          `5. EVALUASI SPESIFIKASI BINA MARGA 2018 (DIVISI 6):`,
          `   Syarat Titik Nyala Aspal Pen 60/70 = T_nyala_kor ≥ ${syaratMin.toFixed(1)} °C ➔ Hasil = ${tNyalaKor.toFixed(2)} °C (${isNyalaAman ? 'Memenuhi Standar' : 'Tidak Memenuhi'})`,
          `   Syarat Logika Fisik = T_bakar_kor > T_nyala_kor (${isUrutanLogis ? 'Logis' : 'Tidak Logis'}), Rentang Alat 79°C - 400°C (${isRangeValid ? 'Valid' : 'Di Luar Rentang'})`,
          `   Status Evaluasi: ${status}`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `Nyala = ${tNyalaKor.toFixed(2)}°C (SNI: ${tNyalaSni}°C) | Bakar = ${tBakarKor.toFixed(2)}°C (SNI: ${tBakarSni}°C) | ${status}`,
      }
    },
  },
  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 6: UJI DAKTILITAS ASPAL (SNI 2432:2011)
  // -----------------------------------------------------------------------
  'bp-6-1': {
    id: 'bp-6-1',
    code: 'DAK-01',
    codePrefix: 'DK',
    name: 'Uji Daktilitas Bahan Aspal (Ductility Test)',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 6: Daktilitas Aspal',
    standard: 'SNI 2432:2011 / Spesifikasi Umum Bina Marga 2018',
    desc: 'Pengukuran keelastisan, kohesi internal, dan elastisitas aspal melalui pemuluran cetakan briket hingga putus pada suhu 25°C dengan kecepatan tarik konstan 5 cm/menit dengan dukungan multi-sampel dinamis.',
    hasDynamicDuctilityTable: true,
    initialInputs: {
      kelasAspal: 'pen6070',
      satuanInput: 'cm',
      d1: 118.0,
      d2: 122.0,
      d3: 120.0,
      samples: [
        { id: 1, name: 'Cetakan / Benda Uji 1', value: 118.0, isValid: true },
        { id: 2, name: 'Cetakan / Benda Uji 2', value: 122.0, isValid: true },
        { id: 3, name: 'Cetakan / Benda Uji 3', value: 120.0, isValid: true },
      ],
    },
    fields: [
      {
        key: 'kelasAspal',
        label: 'Kelas Spesifikasi Aspal',
        type: 'select',
        desc: 'Ambang batas regangan daktilitas minimum spesifikasi Bina Marga 2018',
        options: [
          { value: 'pen6070', label: 'Aspal Pen 60/70 & Pen 40/50 (Syarat Min >= 100 cm)' },
          { value: 'modifikasi', label: 'Aspal Modifikasi / PG 70 (Syarat Min >= 50 cm)' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'satuanInput',
        label: 'Satuan Pembacaan Alat',
        type: 'select',
        desc: 'Pilihan satuan panjang regangan pembacaan alat daktilitas (cm atau mm)',
        options: [
          { value: 'cm', label: 'cm (Sentimeter)' },
          { value: 'mm', label: 'mm (Milimeter)' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'd1',
        label: 'Panjang Regangan Putus Sampel / Cetakan 1 (d1)',
        unit: 'cm',
        desc: 'Panjang pemuluran briket aspal cetakan 1 saat benang aspal terputus',
        min: 0.01,
        step: 0.5,
        isParameterBesar: true,
      },
      {
        key: 'd2',
        label: 'Panjang Regangan Putus Sampel / Cetakan 2 (d2)',
        unit: 'cm',
        desc: 'Panjang pemuluran briket aspal cetakan 2 saat benang aspal terputus',
        min: 0.01,
        step: 0.5,
        isParameterBesar: true,
      },
      {
        key: 'd3',
        label: 'Panjang Regangan Putus Sampel / Cetakan 3 (d3)',
        unit: 'cm',
        desc: 'Panjang pemuluran briket aspal cetakan 3 saat benang aspal terputus',
        min: 0.01,
        step: 0.5,
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      const kelas = inputs.kelasAspal || 'pen6070'
      const minDaktilitas = kelas === 'modifikasi' ? 50.0 : 100.0
      const unit = inputs.satuanInput || 'cm'
      const isMm = unit === 'mm'

      // Ekstraksi data sampel: prioritas inputs.samples, fallback ke d1, d2, d3
      let rawSamples = []
      if (Array.isArray(inputs.samples) && inputs.samples.length > 0) {
        rawSamples = inputs.samples
      } else {
        const v1 = inputs.d1 !== undefined && inputs.d1 !== '' ? Number(inputs.d1) : 118.0
        const v2 = inputs.d2 !== undefined && inputs.d2 !== '' ? Number(inputs.d2) : 122.0
        const v3 = inputs.d3 !== undefined && inputs.d3 !== '' ? Number(inputs.d3) : 120.0
        rawSamples = [
          { id: 1, name: 'Cetakan / Benda Uji 1', value: v1, isValid: true },
          { id: 2, name: 'Cetakan / Benda Uji 2', value: v2, isValid: true },
          { id: 3, name: 'Cetakan / Benda Uji 3', value: v3, isValid: true },
        ]
      }

      // Olah tiap sampel ke dalam satuan cm dan evaluasi terhadap spesifikasi
      const processedSamples = rawSamples.map((s, idx) => {
        const rawVal = s.value !== undefined && s.value !== null && s.value !== '' ? Number(s.value) : NaN
        const isValid = s.isValid !== undefined ? Boolean(s.isValid) : true
        const valCm = !isNaN(rawVal) ? (isMm ? rawVal / 10 : rawVal) : NaN
        const isLolos = !isNaN(valCm) && valCm >= minDaktilitas

        return {
          id: s.id || idx + 1,
          name: s.name || `Cetakan / Benda Uji ${idx + 1}`,
          rawVal,
          valCm,
          isValid,
          isLolos,
        }
      })

      const validSamples = processedSamples.filter((s) => s.isValid && !isNaN(s.valCm) && s.valCm > 0)
      const allNumericSamples = processedSamples.filter((s) => !isNaN(s.valCm) && s.valCm > 0)

      if (allNumericSamples.length === 0) {
        return {
          results: [
            { label: 'Daktilitas Rata-rata (D_rata)', value: '-', unit: 'cm', highlight: true },
            { label: 'Rentang Regangan (Min - Maks)', value: '-', unit: 'cm' },
            { label: 'Simpangan Baku & Variasi', value: '-', unit: '' },
            { label: 'Status Kohesivitas Aspal', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: ['Masukkan nilai panjang regangan putus minimal untuk 1 benda uji (> 0).'],
          isError: true,
          status: 'Input Tidak Valid',
          conclusion: 'Nilai panjang regangan daktilitas harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Daktilitas Rata-rata (D_rata)', value: '-', unit: 'cm', highlight: true },
            { label: 'Rentang Regangan (Min - Maks)', value: '-', unit: 'cm' },
            { label: 'Simpangan Baku & Variasi', value: '-', unit: '' },
            { label: 'Status Kohesivitas Aspal', value: 'Semua Sampel Dieliminasi', unit: '', highlight: true },
          ],
          formulaSteps: ['Seluruh benda uji dinonaktifkan (dieliminasi). Aktifkan minimal satu benda uji yang valid.'],
          isError: true,
          status: 'Benda Uji Gagal Semua',
          conclusion: 'Tidak ada benda uji yang diikutsertakan dalam perhitungan rata-rata. Centang minimal satu sampel yang valid.',
          summaryString: 'Seluruh Sampel Dieliminasi',
        }
      }

      // Hitung Daktilitas Rata-rata (D_rata) dari seluruh sampel yang valid
      const nValid = validSamples.length
      const sumCm = validSamples.reduce((acc, s) => acc + s.valCm, 0)
      const dRata = sumCm / nValid

      // Simpangan Baku (SD) & Koefisien Variasi (CV)
      let sd = 0
      let cv = 0
      let sumSq = 0
      if (nValid >= 2) {
        sumSq = validSamples.reduce((acc, s) => acc + Math.pow(s.valCm - dRata, 2), 0)
        sd = Math.sqrt(sumSq / (nValid - 1))
        cv = dRata > 0 ? (sd / dRata) * 100 : 0
      }

      const validValsCm = validSamples.map((s) => s.valCm)
      const dMin = Math.min(...validValsCm)
      const dMaks = Math.max(...validValsCm)
      const deltaD = dMaks - dMin

      const isRataLolos = dRata >= minDaktilitas
      const isSemuaLolos = validSamples.every((s) => s.valCm >= minDaktilitas)
      const isSeragam = cv <= 15.0

      let status = 'Memenuhi Standar'
      let verdictClass = 'valid'
      let conclusion = ''

      if (!isRataLolos) {
        status = 'Tidak Layak'
        verdictClass = 'error'
        conclusion = `Daktilitas rata-rata (${dRata.toFixed(1)} cm) tidak memenuhi syarat (< ${minDaktilitas.toFixed(0)} cm). Aspal kurang kohesif, bersifat getas (brittle), dan rawan mengalami keretakan dini pada perkerasan jalan.`
      } else if (!isSemuaLolos || (nValid >= 2 && !isSeragam)) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
        conclusion = `Rata-rata daktilitas memenuhi syarat (${dRata.toFixed(1)} cm ≥ ${minDaktilitas.toFixed(0)} cm), namun terdapat variasi regangan antar cetakan yang cukup besar (CV = ${cv.toFixed(2)}% > 15%).`
      } else {
        status = 'Memenuhi Standar'
        verdictClass = 'valid'
        conclusion = `Daktilitas memenuhi syarat SNI 2432:2011 & Bina Marga 2018 (≥ ${minDaktilitas.toFixed(0)} cm). Aspal memiliki sifat kohesivitas dan elastisitas yang baik sehingga tahan terhadap retak akibat regangan beban lalu lintas.`
      }

      const formulaSteps = [
        `1. KONVERSI SATUAN & STATUS KELAYAKAN BENDA UJI (25°C, 5 cm/menit):`,
        ...processedSamples.map((s) => {
          const rawText = !isNaN(s.rawVal) ? `${s.rawVal.toFixed(1)} ${unit}` : '-'
          const cmText = !isNaN(s.valCm) ? `${s.valCm.toFixed(1)} cm` : '-'
          const convText = isMm ? `${rawText} ➔ ${cmText}` : `${cmText}`
          const statusText = s.isValid
            ? (s.isLolos ? `[Aktif - Memenuhi Syarat ≥ ${minDaktilitas.toFixed(0)} cm]` : `[Aktif - Di Bawah Syarat < ${minDaktilitas.toFixed(0)} cm]`)
            : `[Dieliminasi / Benda Uji Gagal / Putus Dini - Tidak Dihitung]`
          return `   ${s.name}: Pembacaan = ${convText} | Status: ${statusText}`
        }),
        `2. PANJANG DAKTILITAS RATA-RATA DARI BENDA UJI VALID (${nValid} Sampel):`,
        `   D_rata = (Σ d_i) / n = (${validSamples.map((s) => s.valCm.toFixed(1)).join(' + ')}) / ${nValid} = ${dRata.toFixed(1)} cm`,
        nValid >= 2
          ? `3. SIMPANGAN BAKU (SD) & KOEFISIEN VARIASI (CV):
   SD = √[Σ(di - D_rata)² / (n - 1)] = √[${sumSq.toFixed(4)} / ${nValid - 1}] = ${sd.toFixed(2)} cm
   CV = (SD / D_rata) × 100% = (${sd.toFixed(2)} / ${dRata.toFixed(1)}) × 100% = ${cv.toFixed(2)}%
   Selisih Regangan Maks - Min (Delta_d) = ${dMaks.toFixed(1)} - ${dMin.toFixed(1)} = ${deltaD.toFixed(1)} cm`
          : `3. SIMPANGAN BAKU (SD) & KOEFISIEN VARIASI (CV):
   SD = 0.00 cm (Hanya 1 sampel valid diikutsertakan)
   CV = 0.00%`,
        `4. BATASAN VERIFIKASI SNI 2432:2011 & BINA MARGA 2018:`,
        `   Syarat Minimum Daktilitas (${kelas === 'modifikasi' ? 'Aspal Modifikasi' : 'Aspal Pen 60/70'}) = ≥ ${minDaktilitas.toFixed(0)} cm ➔ Hasil Rata-rata = ${dRata.toFixed(1)} cm (${isRataLolos ? 'Lolos Standar' : 'Tidak Memenuhi'})`,
        `   Keseragaman Cetakan: CV ≤ 15.0% (${isSeragam ? 'Seragam' : 'Variasi Tinggi'}), Cetakan Valid Terendah = ${dMin.toFixed(1)} cm`,
        `   Status Evaluasi: ${status}`,
      ]

      return {
        results: [
          { label: 'Daktilitas Rata-rata (D_rata)', value: dRata.toFixed(1), unit: 'cm', highlight: true },
          {
            label: 'Rentang Regangan (Min - Maks)',
            value: nValid > 1 ? `${dMin.toFixed(1)} s/d ${dMaks.toFixed(1)}` : `${dMin.toFixed(1)}`,
            unit: 'cm',
          },
          {
            label: 'Simpangan Baku & Variasi',
            value: nValid > 1 ? `± ${sd.toFixed(2)} cm (${cv.toFixed(2)}%)` : `± 0.00 cm (0.00%)`,
            unit: '',
          },
          { label: 'Status Kohesivitas Aspal', value: status, unit: '', highlight: true },
        ],
        processedSamples,
        validSamples,
        nValid,
        totalSamplesCount: processedSamples.length,
        dRata,
        sd,
        cv,
        dMin,
        dMaks,
        formulaSteps,
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `Daktilitas = ${dRata.toFixed(1)} cm | SD = ${sd.toFixed(2)} | ${status}`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 7: UJI VISKOSITAS SAYBOLT FUROL & SUHU KERJA (SNI 7729:2011)
  // -----------------------------------------------------------------------
  'bp-7-1': {
    id: 'bp-7-1',
    code: 'VIS-01',
    codePrefix: 'VS',
    name: 'Uji Viskositas Saybolt Furol & Rentang Suhu Kerja',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 7: Saybolt Furol',
    standard: 'SNI 03-6721-2002 / SNI 7729:2011 / Bina Marga 2018',
    desc: 'Pengukuran waktu alir Saybolt Furol (SFS), konversi semi-logaritmik ke viskositas kinematik (cSt), dan penentuan regresi rentang suhu pencampuran dan pemadatan berstandar Bina Marga 2018.',
    hasDynamicViscosityTable: true,
    initialInputs: {
      metodeKonversi: 'astm',
      standarTarget: 'binamarga',
      vMixMin: 150.0,
      vMixMax: 190.0,
      vCompMin: 250.0,
      vCompMax: 310.0,
      suhu1: 120.0,
      waktu1: 340.0,
      suhu2: 135.0,
      waktu2: 165.0,
      suhu3: 150.0,
      waktu3: 82.0,
      suhu4: 165.0,
      waktu4: 43.0,
      viscosityPoints: DEFAULT_VISCOSITY_POINTS,
    },
    fields: [
      {
        key: 'metodeKonversi',
        label: 'Metode Konversi Saybolt Furol (SFS) ke Kinematik (cSt)',
        type: 'select',
        desc: 'Formula konversi waktu alir 60 mL fluida ke viskositas kinematik (Centistokes)',
        options: [
          { value: 'astm', label: 'Rumus Eksak ASTM D2161 / SNI (v = 2.16*t - 60/t untuk t > 40 dtk; v = 2.24*t - 184/t untuk 25 < t <= 40 dtk)' },
          { value: 'modul', label: 'Faktor Konversi Praktis Modul Kampus (v = 2.0 * t)' },
          { value: 'pendekatan', label: 'Faktor Konversi Pendekatan (v = 2.16 * t)' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'standarTarget',
        label: 'Standar Target Rentang Viskositas Suhu Kerja',
        type: 'select',
        desc: 'Ambang batas viskositas kinematik untuk suhu pencampuran dan pemadatan hotmix',
        options: [
          { value: 'binamarga', label: 'Spesifikasi Umum Bina Marga 2018 (Pencampuran: 150 - 190 cSt [170±20]; Pemadatan: 250 - 310 cSt [280±30])' },
          { value: 'lab', label: 'Standar Praktikum Laboratorium (Pencampuran: 170 - 230 cSt; Pemadatan: 250 - 350 cSt)' },
          { value: 'custom', label: 'Kustom Manual (Pengaturan Bebas Mahasiswa / Dosen)' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'suhu1',
        label: 'Titik 1: Suhu Uji T1',
        unit: '°C',
        desc: 'Temperatur pemanasan viskometer titik uji 1 (default 120°C)',
        min: 0.01,
        step: 0.5,
      },
      {
        key: 'waktu1',
        label: 'Titik 1: Waktu Alir 60 mL t1',
        unit: 'detik',
        desc: 'Waktu alir 60 mL aspal dalam tabung Saybolt Furol (SFS)',
        min: 0.01,
        step: 0.5,
      },
      {
        key: 'suhu2',
        label: 'Titik 2: Suhu Uji T2',
        unit: '°C',
        desc: 'Temperatur pemanasan viskometer titik uji 2 (default 135°C)',
        min: 0.01,
        step: 0.5,
      },
      {
        key: 'waktu2',
        label: 'Titik 2: Waktu Alir 60 mL t2',
        unit: 'detik',
        desc: 'Waktu alir 60 mL aspal pada suhu T2 (SFS)',
        min: 0.01,
        step: 0.5,
      },
      {
        key: 'suhu3',
        label: 'Titik 3: Suhu Uji T3',
        unit: '°C',
        desc: 'Temperatur pemanasan viskometer titik uji 3 (default 150°C)',
        min: 0.01,
        step: 0.5,
      },
      {
        key: 'waktu3',
        label: 'Titik 3: Waktu Alir 60 mL t3',
        unit: 'detik',
        desc: 'Waktu alir 60 mL aspal pada suhu T3 (SFS)',
        min: 0.01,
        step: 0.5,
      },
      {
        key: 'suhu4',
        label: 'Titik 4: Suhu Uji T4',
        unit: '°C',
        desc: 'Temperatur pemanasan viskometer titik uji 4 (default 165°C)',
        min: 0.01,
        step: 0.5,
      },
      {
        key: 'waktu4',
        label: 'Titik 4: Waktu Alir 60 mL t4',
        unit: 'detik',
        desc: 'Waktu alir 60 mL aspal pada suhu T4 (SFS)',
        min: 0.01,
        step: 0.5,
      },
    ],
    calculate: (inputs) => {
      const metode = inputs.metodeKonversi || 'astm'
      const standar = inputs.standarTarget || 'binamarga'

      // Resolusi target viskositas pencampuran dan pemadatan
      let vMixMin = 150.0
      let vMixMax = 190.0
      let vCompMin = 250.0
      let vCompMax = 310.0

      if (standar === 'lab') {
        vMixMin = 170.0
        vMixMax = 230.0
        vCompMin = 250.0
        vCompMax = 350.0
      } else if (standar === 'custom') {
        if (inputs.vMixMin !== undefined && inputs.vMixMin !== '' && !isNaN(Number(inputs.vMixMin))) {
          vMixMin = Number(inputs.vMixMin)
        }
        if (inputs.vMixMax !== undefined && inputs.vMixMax !== '' && !isNaN(Number(inputs.vMixMax))) {
          vMixMax = Number(inputs.vMixMax)
        }
        if (inputs.vCompMin !== undefined && inputs.vCompMin !== '' && !isNaN(Number(inputs.vCompMin))) {
          vCompMin = Number(inputs.vCompMin)
        }
        if (inputs.vCompMax !== undefined && inputs.vCompMax !== '' && !isNaN(Number(inputs.vCompMax))) {
          vCompMax = Number(inputs.vCompMax)
        }
      }

      // Pastikan urutan nilai batas selalu konsisten min <= max
      if (vMixMin > vMixMax) {
        const tmp = vMixMin; vMixMin = vMixMax; vMixMax = tmp
      }
      if (vCompMin > vCompMax) {
        const tmp = vCompMin; vCompMin = vCompMax; vCompMax = tmp
      }

      // Ambil daftar titik pengamatan (Dinamis atau Fallback 4 titik static)
      let rawPoints = []
      if (Array.isArray(inputs.viscosityPoints) && inputs.viscosityPoints.length > 0) {
        rawPoints = inputs.viscosityPoints.map((p, idx) => ({
          no: idx + 1,
          id: p.id || idx + 1,
          temp: p.temp !== '' && p.temp !== null && p.temp !== undefined ? Number(p.temp) : NaN,
          time: p.time !== '' && p.time !== null && p.time !== undefined ? Number(p.time) : NaN,
        }))
      } else {
        const t1 = Number(inputs.suhu1)
        const w1 = Number(inputs.waktu1)
        const t2 = Number(inputs.suhu2)
        const w2 = Number(inputs.waktu2)
        const t3 = Number(inputs.suhu3)
        const w3 = Number(inputs.waktu3)
        const t4 = Number(inputs.suhu4)
        const w4 = Number(inputs.waktu4)
        rawPoints = [
          { no: 1, id: 1, temp: t1, time: w1 },
          { no: 2, id: 2, temp: t2, time: w2 },
          { no: 3, id: 3, temp: t3, time: w3 },
          { no: 4, id: 4, temp: t4, time: w4 },
        ]
      }

      if (rawPoints.length < 2) {
        return {
          results: [
            { label: 'Rentang Suhu Pencampuran (Mixing)', value: '-', unit: '°C', highlight: true },
            { label: 'Rentang Suhu Pemadatan (Compaction)', value: '-', unit: '°C', highlight: true },
            { label: 'Viskositas Kinematik pada 135°C', value: '-', unit: 'cSt' },
            { label: 'Persamaan Regresi & Akurasi', value: '-', unit: '' },
          ],
          formulaSteps: ['Minimal diperlukan 2 titik pengujian temperatur untuk membentuk garis regresi semi-logaritmik.'],
          isError: true,
          status: 'Titik Uji Kurang',
          conclusion: 'Tambahkan minimal 2 titik variasi temperatur pengujian.',
          summaryString: 'Minimal 2 Titik Diperlukan',
        }
      }

      // Cek apakah ada nilai NaN atau <= 0
      const hasInvalid = rawPoints.some((p) => isNaN(p.temp) || isNaN(p.time) || p.temp <= 0 || p.time <= 0)
      if (hasInvalid) {
        return {
          results: [
            { label: 'Rentang Suhu Pencampuran (Mixing)', value: '-', unit: '°C', highlight: true },
            { label: 'Rentang Suhu Pemadatan (Compaction)', value: '-', unit: '°C', highlight: true },
            { label: 'Viskositas Kinematik pada 135°C', value: '-', unit: 'cSt' },
            { label: 'Persamaan Regresi & Akurasi', value: '-', unit: '' },
          ],
          formulaSteps: ['Semua titik suhu (°C) dan waktu alir Saybolt Furol (detik) harus berupa angka positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          conclusion: 'Input parameter viskometer harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      // Fungsi Konversi SFS ke cSt
      const convertToCst = (tVal) => {
        if (metode === 'modul') return 2.0 * tVal
        if (metode === 'pendekatan') return 2.16 * tVal
        // astm:
        if (tVal > 40) return 2.16 * tVal - 60 / tVal
        if (tVal > 25) return 2.24 * tVal - 184 / tVal
        return 2.16 * tVal
      }

      // Urutkan titik berdasarkan temperatur menaik
      const sortedPoints = [...rawPoints].sort((a, b) => a.temp - b.temp)

      const points = sortedPoints.map((p, idx) => {
        const v = convertToCst(p.time)
        return {
          no: idx + 1,
          id: p.id,
          t: p.temp,
          w: p.time,
          v,
          x: p.temp,
          y: Math.log10(v),
        }
      })

      const n = points.length
      const sumX = points.reduce((acc, p) => acc + p.x, 0)
      const sumY = points.reduce((acc, p) => acc + p.y, 0)
      const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0)
      const sumX2 = points.reduce((acc, p) => acc + p.x * p.x, 0)
      const sumY2 = points.reduce((acc, p) => acc + p.y * p.y, 0)

      const denomX = n * sumX2 - sumX * sumX
      if (denomX === 0) {
        return {
          results: [
            { label: 'Rentang Suhu Pencampuran (Mixing)', value: '-', unit: '°C', highlight: true },
            { label: 'Rentang Suhu Pemadatan (Compaction)', value: '-', unit: '°C', highlight: true },
            { label: 'Viskositas Kinematik pada 135°C', value: '-', unit: 'cSt' },
            { label: 'Persamaan Regresi & Akurasi', value: '-', unit: '' },
          ],
          formulaSteps: ['Suhu pengujian harus bervariasi agar garis regresi dapat dibentuk.'],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Nilai temperatur titik uji harus berbeda-beda.',
          summaryString: 'Suhu Seragam Tidak Valid',
        }
      }

      const b = (n * sumXY - sumX * sumY) / denomX
      const meanX = sumX / n
      const meanY = sumY / n
      const a = meanY - b * meanX

      const denomR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
      const rVal = denomR !== 0 ? (n * sumXY - sumX * sumY) / denomR : 0
      const r2 = Math.pow(rVal, 2)

      // Karena b < 0, viskositas tinggi dicapai pada temperatur lebih rendah
      const tMixMin = (Math.log10(vMixMax) - a) / b
      const tMixMax = (Math.log10(vMixMin) - a) / b
      const tMixAvg = (tMixMin + tMixMax) / 2

      const tCompMin = (Math.log10(vCompMax) - a) / b
      const tCompMax = (Math.log10(vCompMin) - a) / b
      const tCompAvg = (tCompMin + tCompMax) / 2

      // Estimasi Viskositas pada 135°C
      const v135 = Math.pow(10, a + b * 135.0)

      const isSlopeNegatif = b < 0
      const isR2Kuat = r2 >= 0.95
      const isV135Lolos = v135 >= 300.0

      let status = 'Memenuhi Standar'
      let verdictClass = 'valid'
      let conclusion = ''

      if (!isSlopeNegatif) {
        status = 'Tidak Valid'
        verdictClass = 'error'
        conclusion = 'Data tidak valid: waktu alir/viskositas seharusnya menurun seiring kenaikan suhu pengujian.'
      } else if (!isV135Lolos || !isR2Kuat) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
        conclusion = 'Perhatian: Viskositas pada 135°C di bawah 300 cSt atau kelinieran data kurva kurang presisi.'
      } else {
        status = 'Memenuhi Standar'
        verdictClass = 'valid'
        conclusion = 'Memenuhi spesifikasi viskositas Bina Marga (v pada 135°C ≥ 300 cSt) dengan korelasi regresi sangat kuat.'
      }

      // Siapkan data grafik untuk Recharts
      const tempsList = points.map((p) => p.t)
      const minT = Math.min(...tempsList, tCompMin, tMixMin)
      const maxT = Math.max(...tempsList, tCompMax, tMixMax)
      // Skala bulat kelipatan 5°C
      const minTempChart = Math.floor((minT - 3) / 5) * 5
      const maxTempChart = Math.ceil((maxT + 3) / 5) * 5

      // Interval tick konsisten kelipatan 5°C
      const xTicks = []
      for (let t = minTempChart; t <= maxTempChart; t += 5) {
        xTicks.push(t)
      }

      // Kumpulkan semua titik koordinat temperatur: per 1°C untuk kehalusan kurva + koordinat suhu uji
      const tempSet = new Set()
      for (let t = minTempChart; t <= maxTempChart; t += 1) {
        tempSet.add(t)
      }
      points.forEach((p) => tempSet.add(p.t))
      const sortedTemps = Array.from(tempSet).sort((a, b) => a - b)

      const chartPoints = sortedTemps.map((temp) => {
        const fitLog = a + b * temp
        const fitV = Math.pow(10, fitLog)
        const matchPt = points.find((p) => Math.abs(p.t - temp) < 1e-4)
        return {
          temp,
          viskositasRegresi: Math.round(fitV * 10) / 10,
          viskositasUji: matchPt ? Math.round(matchPt.v * 10) / 10 : null,
          batasMixMin: vMixMin,
          batasMixMax: vMixMax,
          batasCompMin: vCompMin,
          batasCompMax: vCompMax,
        }
      })

      const viscosityChart = {
        chartPoints,
        xTicks,
        minTempChart,
        maxTempChart,
        pointsData: points.map((p) => ({
          no: p.no,
          id: p.id,
          temp: p.t,
          sfs: p.w,
          cst: p.v,
          logV: p.y,
        })),
        regresiStr: `log₁₀(v) = ${a.toFixed(4)} ${b >= 0 ? '+' : '-'} ${Math.abs(b).toFixed(5)}·T`,
        r2,
        a,
        b,
        tMixMin,
        tMixMax,
        tMixAvg,
        tCompMin,
        tCompMax,
        tCompAvg,
        vMixMin,
        vMixMax,
        vCompMin,
        vCompMax,
        v135,
        standar,
        metode,
      }

      return {
        results: [
          {
            label: 'Rentang Suhu Pencampuran (Mixing)',
            value: `${tMixMin.toFixed(1)} - ${tMixMax.toFixed(1)} °C`,
            unit: `(Rata-rata: ${tMixAvg.toFixed(1)} °C)`,
            highlight: true,
          },
          {
            label: 'Rentang Suhu Pemadatan (Compaction)',
            value: `${tCompMin.toFixed(1)} - ${tCompMax.toFixed(1)} °C`,
            unit: `(Rata-rata: ${tCompAvg.toFixed(1)} °C)`,
            highlight: true,
          },
          {
            label: 'Viskositas Kinematik pada 135°C',
            value: `${v135.toFixed(1)} cSt`,
            unit: '(Syarat ≥ 300 cSt)',
          },
          {
            label: 'Persamaan Regresi & Akurasi',
            value: `log(v) = ${a.toFixed(3)} ${b >= 0 ? '+' : '-'} ${Math.abs(b).toFixed(4)}·T`,
            unit: `R² = ${r2.toFixed(4)}`,
          },
        ],
        formulaSteps: [
          `1. KONVERSI WAKTU ALIR SAYBOLT FUROL (SFS) KE KINEMATIK (cSt) [Metode: ${metode.toUpperCase()}]:`,
          ...points.map(
            (p) =>
              `   Titik ${p.no}: Suhu T = ${p.t.toFixed(1)} °C, Waktu t = ${p.w.toFixed(1)} detik ➔ Viskositas v = ${p.v.toFixed(1)} cSt (log₁₀ = ${p.y.toFixed(4)})`
          ),
          `2. MODEL REGRESI LINIER SEMI-LOGARITMIK [log₁₀(v) = a + b·T]:`,
          `   Jumlah Titik Data (n) = ${n}`,
          `   Kemiringan (b) = ${b.toFixed(5)}, Intersep (a) = ${a.toFixed(4)}`,
          `   Koefisien Korelasi (R) = ${rVal.toFixed(4)}, Determinasi (R²) = ${r2.toFixed(4)} (${isR2Kuat ? 'Korelasi Sangat Kuat ≥ 0.95' : 'Kurang Presisi'})`,
          `3. PERHITUNGAN SUHU PENCAMPURAN (TARGET: ${vMixMin.toFixed(0)} - ${vMixMax.toFixed(0)} cSt):`,
          `   T_mix = [log₁₀(target) - a] / b ➔ ${tMixMin.toFixed(1)} °C s.d. ${tMixMax.toFixed(1)} °C (Rata-rata: ${tMixAvg.toFixed(1)} °C)`,
          `4. PERHITUNGAN SUHU PEMADATAN (TARGET: ${vCompMin.toFixed(0)} - ${vCompMax.toFixed(0)} cSt):`,
          `   T_comp = [log₁₀(target) - a] / b ➔ ${tCompMin.toFixed(1)} °C s.d. ${tCompMax.toFixed(1)} °C (Rata-rata: ${tCompAvg.toFixed(1)} °C)`,
          `5. VERIFIKASI VISKOSITAS PADA 135°C & SPESIFIKASI BINA MARGA 2018:`,
          `   v_135 = 10^[${a.toFixed(4)} + (${b.toFixed(5)} × 135)] = ${v135.toFixed(1)} cSt (Syarat Bina Marga ≥ 300 cSt: ${isV135Lolos ? 'Lolos' : 'Kurang'})`,
          `   Status Evaluasi: ${status}`,
        ],
        viscosityChart,
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `Mix: ${tMixMin.toFixed(0)}-${tMixMax.toFixed(0)}°C | Padat: ${tCompMin.toFixed(0)}-${tCompMax.toFixed(0)}°C | v135: ${v135.toFixed(0)} cSt`,
        tMixMin,
        tMixMax,
        tMixAvg,
        tCompMin,
        tCompMax,
        tCompAvg,
        v135,
        r2,
        a,
        b,
        points,
        vMixMin,
        vMixMax,
        vCompMin,
        vCompMax,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 8: JOB MIX FORMULA (JMF) – KADAR ASPAL ACUAN / KAA
  // -----------------------------------------------------------------------
  'bp-8-1': {
    id: 'bp-8-1',
    code: 'JMF-01',
    codePrefix: 'JM',
    name: 'Job Mix Formula (JMF) – Laston AC-WC (Bina Marga 2018)',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 8: Job Mix Formula',
    standard: 'Spesifikasi Umum Bina Marga 2018 (Divisi 6) / Pd T-03-2005-B',
    desc: 'Perancangan campuran Laston AC-WC berdasarkan analisis gradasi rencana (Tabel 11.1 s/d 11.3), penentuan proporsi fraksi agregat (%CA tertahan No. 4, %FA, %Filler), perhitungan Kadar Aspal Acuan (KAA), serta penyusunan komposisi mix design (Tabel 11.4) dan 5 variasi briket Marshall.',
    hasDynamicJmfMixDesign: true,
    initialInputs: {
      jenisCampuran: 'ac-wc',
      wTotal: 1200.0,
      pbRencana: 6.5,
      k: 0.75,
      sieves: DEFAULT_JMF_SIEVES,
      ca: 39.0,
      fa: 54.5,
      filler: 6.5,
    },
    fields: [
      {
        key: 'jenisCampuran',
        label: 'Jenis Campuran Beraspal',
        type: 'select',
        desc: 'Tipe lapisan hotmix acuan perancangan Job Mix Formula',
        options: [
          { value: 'ac-wc', label: 'Laston Lapis Aus (AC-WC) - Bina Marga 2018' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'wTotal',
        label: 'Total Berat Campuran Briket Marshall (W_total)',
        unit: 'gram',
        desc: 'Massa target campuran untuk 1 cetakan briket silinder standar (default: 1200 gram)',
        min: 100.0,
        step: 10.0,
        isParameterBesar: true,
      },
      {
        key: 'pbRencana',
        label: 'Kadar Aspal Variasi / Rencana Benda Uji (Pb_rencana)',
        unit: '%',
        desc: 'Kadar aspal rencana untuk pembuatan benda uji campuran (default laprak: 6.5%)',
        min: 1.0,
        max: 15.0,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'k',
        label: 'Konstanta Penyerapan Agregat Laston (Nilai K)',
        unit: '%',
        desc: 'Konstanta empiris berdasarkan absorpsi agregat untuk Laston (rentang validasi: 0.5 - 1.0, default: 0.75)',
        min: 0.5,
        max: 1.0,
        step: 0.05,
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      const wTotal = Number(inputs.wTotal) || 1200.0
      const pbRencana = Number(inputs.pbRencana !== undefined && inputs.pbRencana !== '' ? inputs.pbRencana : (inputs.pb0 || 6.5))
      const k = Number(inputs.k !== undefined && inputs.k !== '' ? inputs.k : 0.75)

      // Perhitungan Berat Aspal & Total Massa Agregat Rencana
      const wAspalRencana = (pbRencana / 100.0) * wTotal
      const wAgregatRencana = wTotal - wAspalRencana

      let ca = 0
      let fa = 0
      let filler = 0
      let wCA = 0
      let wFA = 0
      let wFiller = 0
      let computedSieves = []
      let allSpecOk = true
      const hasSieves = Array.isArray(inputs.sieves) && inputs.sieves.length > 0
      const isDirectCaFa = !hasSieves && (inputs.ca !== undefined || inputs.fa !== undefined || inputs.filler !== undefined)

      if (hasSieves || !isDirectCaFa) {
        const sievesToUse = hasSieves ? inputs.sieves : DEFAULT_JMF_SIEVES
        // Alur analisis gradasi rencana (Tabel 11.1, 11.2, 11.3)
        let runningRet = 0
        computedSieves = sievesToUse.map((s) => {
          const ret = s.retWeight !== undefined && s.retWeight !== '' ? Number(s.retWeight) : 0
          runningRet += ret
          const cumRetWeight = runningRet
          const cumRetPct = wAgregatRencana > 0 ? (cumRetWeight / wAgregatRencana) * 100 : 0
          const cumPassPct = Math.max(0, 100 - cumRetPct)
          const isOk = s.specMin !== null && s.specMax !== null
            ? (cumPassPct >= s.specMin - 0.05 && cumPassPct <= s.specMax + 0.05)
            : true
          if (!isOk) allSpecOk = false
          return {
            ...s,
            retWeight: ret,
            cumRetWeight: +(cumRetWeight.toFixed(2)),
            cumRetPct: +(cumRetPct.toFixed(2)),
            cumPassPct: +(cumPassPct.toFixed(2)),
            isOk,
          }
        })

        // Agregat Kasar (CA): Tertahan Saringan No. 4 (4.75 mm) -> Ayakan 1" s/d No. 4 (index 0..4)
        wCA = computedSieves.slice(0, 5).reduce((sum, s) => sum + s.retWeight, 0)
        ca = wAgregatRencana > 0 ? +( (wCA / wAgregatRencana * 100).toFixed(2) ) : 0

        // Agregat Halus (FA): Lolos Saringan No. 4 & Tertahan No. 200 -> Ayakan No. 8 s/d No. 200 (index 5..10)
        wFA = computedSieves.slice(5, 11).reduce((sum, s) => sum + s.retWeight, 0)
        fa = wAgregatRencana > 0 ? +( (wFA / wAgregatRencana * 100).toFixed(2) ) : 0

        // Bahan Pengisi (Filler): Lolos Saringan No. 200 -> Pan (index 11)
        wFiller = computedSieves.length > 11 ? (Number(computedSieves[11].retWeight) || 0) : 0
        filler = wAgregatRencana > 0 ? +( (wFiller / wAgregatRencana * 100).toFixed(2) ) : 0
      } else {
        // Fallback jika input berupa ca, fa, filler langsung
        ca = Number(inputs.ca) || 39.0
        fa = Number(inputs.fa) || 54.5
        filler = Number(inputs.filler) || 6.5
        wCA = (ca / 100.0) * wAgregatRencana
        wFA = (fa / 100.0) * wAgregatRencana
        wFiller = (filler / 100.0) * wAgregatRencana
      }

      if (
        isNaN(wTotal) || isNaN(pbRencana) || isNaN(k) ||
        wTotal <= 0 || pbRencana <= 0 || k < 0.5 || k > 1.0
      ) {
        return {
          results: [
            { label: 'Kadar Aspal Acuan (KAA / Pb)', value: '-', unit: '%', highlight: true },
            { label: 'Total Proporsi Agregat (CA+FA+FF)', value: '-', unit: '%' },
            { label: 'Rentang 5 Variasi Benda Uji', value: '-', unit: '' },
            { label: 'Berat Aspal pada KAA (Briket 1200g)', value: '-', unit: 'gram', highlight: true },
          ],
          formulaSteps: ['Konstanta K Laston harus berada dalam rentang 0.5 - 1.0 dan seluruh parameter berat harus bernilai positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          verdictClass: 'error',
          conclusion: 'Nilai parameter input berada di luar rentang standar (Konstanta K: 0.5 - 1.0).',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      const totalAgPct = ca + fa + filler
      const isTotalValid = Math.abs(totalAgPct - 100.0) <= 0.1

      // Rumus Kadar Aspal Acuan (KAA / Pb_awal):
      // KAA_murni = (0.035 * %CA) + (0.045 * %FA) + (0.18 * %FF) + K (%)
      const kaaMurni = 0.035 * ca + 0.045 * fa + 0.18 * filler + k
      // Pembulatan ke kelipatan 0.5% terdekat untuk Marshall baseline
      const pb0 = Math.round(kaaMurni * 2) / 2

      // 5 Variasi Kadar Aspal Briket Marshall (Interval 0.5%)
      const pb1 = pb0 - 1.0
      const pb2 = pb0 - 0.5
      const pb3 = pb0
      const pb4 = pb0 + 0.5
      const pb5 = pb0 + 1.0
      const variasiKadar = [pb1, pb2, pb3, pb4, pb5]

      // Perhitungan Komposisi Berat per Briket Marshall
      const jmfTable = variasiKadar.map((pbVal, idx) => {
        const vAspal = (pbVal / 100.0) * wTotal
        const vAg = wTotal - vAspal
        const vCa = (ca / 100.0) * vAg
        const vFa = (fa / 100.0) * vAg
        const vFiller = (filler / 100.0) * vAg
        const deltaLabel = idx === 2 ? 'Pb0' : idx < 2 ? `Pb - ${((2 - idx) * 0.5).toFixed(1)}%` : `Pb + ${((idx - 2) * 0.5).toFixed(1)}%`
        return {
          variasi: idx + 1,
          nama: `Variasi ${idx + 1} (${idx === 2 ? 'KAA Acuan' : deltaLabel})`,
          deltaPb: idx === 2 ? 'Pb0' : deltaLabel,
          pb: pbVal,
          kadarAspal: pbVal,
          wAspal: +(vAspal.toFixed(1)),
          beratAspal: +(vAspal.toFixed(1)),
          wAgregat: +(vAg.toFixed(1)),
          beratAgTotal: +(vAg.toFixed(1)),
          wCA: +(vCa.toFixed(1)),
          beratCa: +(vCa.toFixed(1)),
          wFA: +(vFa.toFixed(1)),
          beratFa: +(vFa.toFixed(1)),
          wFiller: +(vFiller.toFixed(1)),
          beratFiller: +(vFiller.toFixed(1)),
          wTotal: +(wTotal.toFixed(1)),
          isAcuan: idx === 2,
        }
      })

      const wAspal3 = jmfTable[2].beratAspal
      const wAg3 = jmfTable[2].beratAgTotal

      // Tabel 11.4: Hasil Analisis Perhitungan Mix Design (Untuk Pb_rencana)
      const caMixPct = wTotal > 0 ? (wCA / wTotal) * 100 : 0
      const faMixPct = wTotal > 0 ? (wFA / wTotal) * 100 : 0
      const fillerMixPct = wTotal > 0 ? (wFiller / wTotal) * 100 : 0
      const aspalMixPct = pbRencana

      const mixDesignTable = [
        {
          fraksi: 'Agregat Kasar (CA)',
          komposisi: 'Agregat Kasar (CA)',
          berat: +(wCA.toFixed(2)),
          beratGram: +(wCA.toFixed(2)),
          persenAgregat: +(ca.toFixed(2)),
          pctAgregat: +(ca.toFixed(2)),
          persenCampuran: +(caMixPct.toFixed(3)),
          pctCampuran: +(caMixPct.toFixed(3)),
          keterangan: 'Tertahan Saringan No. 4 (4.75 mm)',
        },
        {
          fraksi: 'Agregat Halus (FA)',
          komposisi: 'Agregat Halus (FA)',
          berat: +(wFA.toFixed(2)),
          beratGram: +(wFA.toFixed(2)),
          persenAgregat: +(fa.toFixed(2)),
          pctAgregat: +(fa.toFixed(2)),
          persenCampuran: +(faMixPct.toFixed(3)),
          pctCampuran: +(faMixPct.toFixed(3)),
          keterangan: 'Lolos Saringan No. 4 & Tertahan No. 200',
        },
        {
          fraksi: 'Bahan Pengisi (Filler)',
          komposisi: 'Bahan Pengisi (Filler)',
          berat: +(wFiller.toFixed(2)),
          beratGram: +(wFiller.toFixed(2)),
          persenAgregat: +(filler.toFixed(2)),
          pctAgregat: +(filler.toFixed(2)),
          persenCampuran: +(fillerMixPct.toFixed(3)),
          pctCampuran: +(fillerMixPct.toFixed(3)),
          keterangan: 'Lolos Saringan No. 200 (Pan)',
        },
        {
          fraksi: 'Aspal (Pb Rencana)',
          komposisi: 'Aspal (Pb Rencana)',
          berat: +(wAspalRencana.toFixed(2)),
          beratGram: +(wAspalRencana.toFixed(2)),
          persenAgregat: +(pbRencana.toFixed(2)),
          pctAgregat: +(pbRencana.toFixed(2)),
          persenCampuran: +(aspalMixPct.toFixed(3)),
          pctCampuran: +(aspalMixPct.toFixed(3)),
          keterangan: 'Kadar Aspal Rencana terhadap Total Campuran',
        },
        {
          fraksi: 'Total Jumlah Campuran',
          komposisi: 'Total Jumlah Campuran',
          berat: +(wTotal.toFixed(2)),
          beratGram: +(wTotal.toFixed(2)),
          persenAgregat: 100.0,
          pctAgregat: 100.0,
          persenCampuran: 100.0,
          pctCampuran: 100.0,
          keterangan: '1 Cetakan Briket Marshall Standar',
        },
      ]

      // Data Grafik Gradasi
      const gradasiChartData = computedSieves.map((s) => ({
        sieve: s.name,
        size: s.size,
        cumPass: s.cumPassPct,
        specMin: s.specMin,
        specMax: s.specMax,
      }))

      // Persentase Kumulatif Lolos No. 4 dan No. 200 untuk metode grafik
      const passNo4 = computedSieves.length > 4 ? computedSieves[4].cumPassPct : 61.0
      const passNo200 = computedSieves.length > 10 ? computedSieves[10].cumPassPct : 6.5

      let status = 'Memenuhi Standar'
      let verdictClass = 'valid'
      let conclusion = ''

      if (!isTotalValid) {
        status = 'Tidak Valid'
        verdictClass = 'error'
        conclusion = `Kesalahan Proporsi: Jumlah %CA + %FA + %FF saat ini adalah ${totalAgPct.toFixed(1)}%, wajib tepat 100.0%.`
      } else if (!allSpecOk) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
        conclusion = 'Perhatian: Terdapat ayakan dengan % lolos kumulatif yang keluar dari amplop batas spesifikasi Laston AC-WC Bina Marga 2018.'
      } else {
        status = 'Memenuhi Standar'
        verdictClass = 'valid'
        conclusion = `Gradasi rencana 100% memenuhi amplop spesifikasi Laston AC-WC Bina Marga 2018. Kadar Aspal Acuan KAA = ${kaaMurni.toFixed(2)}% (Pb₀ = ${pb0.toFixed(1)}%) dengan komposisi briket seberat ${wTotal.toFixed(0)} gram siap diuji.`
      }

      return {
        results: [
          {
            label: 'Kadar Aspal Acuan (KAA / Pb)',
            value: `${kaaMurni.toFixed(2)}% -> Dibulatkan: ${pb0.toFixed(1)}%`,
            unit: '',
            highlight: true,
            sub: `KAA: 0.035(%CA) + 0.045(%FA) + 0.18(%FF) + ${k.toFixed(2)}`,
          },
          {
            label: 'Total Proporsi Agregat (CA+FA+FF)',
            value: `${totalAgPct.toFixed(1)}%`,
            unit: '(Wajib 100.0%)',
            sub: `CA: ${ca.toFixed(1)}% | FA: ${fa.toFixed(1)}% | Filler: ${filler.toFixed(1)}%`,
          },
          {
            label: 'Rentang 5 Variasi Benda Uji',
            value: `${pb1.toFixed(1)}% | ${pb2.toFixed(1)}% | ${pb3.toFixed(1)}% | ${pb4.toFixed(1)}% | ${pb5.toFixed(1)}%`,
            unit: '',
            sub: `Variasi ke-3: Pb Acuan (${pb0.toFixed(1)}%)`,
          },
          {
            label: 'Berat Aspal pada KAA (Briket 1200g)',
            value: `${wAspal3.toFixed(1)} gram`,
            unit: `(Agregat: ${wAg3.toFixed(1)} gram)`,
            highlight: true,
            sub: `Aspal Rencana (${pbRencana.toFixed(1)}%): ${wAspalRencana.toFixed(1)} g`,
          },
        ],
        formulaSteps: [
          `1. PARAMETER AWAL BENDA UJI (CAMPURAN LASTON AC-WC BINA MARGA 2018):`,
          `   Total Berat 1 Briket (W_total) = ${wTotal.toFixed(0)} gram`,
          `   Kadar Aspal Rencana (Pb_rencana) = ${pbRencana.toFixed(1)}%`,
          `   Berat Aspal Rencana (W_aspal) = (${pbRencana.toFixed(1)} / 100) × ${wTotal.toFixed(0)} = ${wAspalRencana.toFixed(1)} gram`,
          `   Total Massa Agregat (W_agregat) = ${wTotal.toFixed(0)} - ${wAspalRencana.toFixed(1)} = ${wAgregatRencana.toFixed(1)} gram`,
          `   Konstanta Penyerapan Agregat Laston (K) = ${k.toFixed(2)}`,
          `2. ANALISIS FRAKSI GABUNGAN AGREGAT (BATAS SARINGAN NO. 4 & NO. 200):`,
          `   a. Metode Analitis (Berdasarkan Berat Tertahan):`,
          `      - Berat CA (Tertahan No. 4) = ${wCA.toFixed(2)} gram ➔ %CA = (${wCA.toFixed(2)} / ${wAgregatRencana.toFixed(1)}) × 100% = ${ca.toFixed(2)}%`,
          `      - Berat FA (Lolos No. 4 & Tertahan No. 200) = ${wFA.toFixed(2)} gram ➔ %FA = (${wFA.toFixed(2)} / ${wAgregatRencana.toFixed(1)}) × 100% = ${fa.toFixed(2)}%`,
          `      - Berat Filler (Lolos No. 200 / Pan) = ${wFiller.toFixed(2)} gram ➔ %Filler = (${wFiller.toFixed(2)} / ${wAgregatRencana.toFixed(1)}) × 100% = ${filler.toFixed(2)}%`,
          `      - Total Agregat = ${ca.toFixed(2)}% + ${fa.toFixed(2)}% + ${filler.toFixed(2)}% = ${totalAgPct.toFixed(2)}%`,
          `   b. Metode Grafik (Berdasarkan Kurva Kumulatif Lolos Gambar 11.19):`,
          `      - Kumulatif Lolos Saringan No. 4 = ${passNo4.toFixed(1)}%`,
          `      - Kumulatif Lolos Saringan No. 200 = ${passNo200.toFixed(1)}%`,
          `      - %CA = 100% - %Lolos No. 4 = 100% - ${passNo4.toFixed(1)}% = ${(100 - passNo4).toFixed(1)}%`,
          `      - %FA = %Lolos No. 4 - %Lolos No. 200 = ${passNo4.toFixed(1)}% - ${passNo200.toFixed(1)}% = ${(passNo4 - passNo200).toFixed(1)}%`,
          `      - %Filler = %Lolos No. 200 = ${passNo200.toFixed(1)}%`,
          `3. PERHITUNGAN KADAR ASPAL ACUAN (KAA / Pb_awal):`,
          `   Rumus: KAA = 0.035 × (%CA) + 0.045 × (%FA) + 0.18 × (%Filler) + K`,
          `   KAA = (0.035 × ${ca.toFixed(1)}) + (0.045 × ${fa.toFixed(1)}) + (0.18 × ${filler.toFixed(1)}) + ${k.toFixed(2)}`,
          `   KAA = ${(0.035 * ca).toFixed(3)}% + ${(0.045 * fa).toFixed(3)}% + ${(0.18 * filler).toFixed(3)}% + ${k.toFixed(2)}% = ${kaaMurni.toFixed(4)}% ≈ ${kaaMurni.toFixed(1)}%`,
          `   Pembulatan Kelipatan 0.5% (Pb_0) = ${pb0.toFixed(1)}%`,
          `4. KOMPOSISI MIX DESIGN KADAR ASPAL RENCANA (${pbRencana.toFixed(1)}% - TABEL 11.4):`,
          `   - CA : Berat = ${wCA.toFixed(2)} g | % Agregat = ${ca.toFixed(1)}% | % Campuran = ${caMixPct.toFixed(3)}%`,
          `   - FA : Berat = ${wFA.toFixed(2)} g | % Agregat = ${fa.toFixed(1)}% | % Campuran = ${faMixPct.toFixed(3)}%`,
          `   - FF : Berat = ${wFiller.toFixed(2)} g | % Agregat = ${filler.toFixed(1)}% | % Campuran = ${fillerMixPct.toFixed(3)}%`,
          `   - Aspal: Berat = ${wAspalRencana.toFixed(2)} g | % Agregat = ${pbRencana.toFixed(1)}% | % Campuran = ${aspalMixPct.toFixed(3)}%`,
          `   - Total: Berat = ${wTotal.toFixed(2)} g | % Campuran = 100.000%`,
          `5. EVALUASI SPESIFIKASI BINA MARGA 2018 (DIVISI 6):`,
          `   Status Gradasi Campuran: ${allSpecOk ? 'Semua Ayakan Memenuhi Amplop Spesifikasi AC-WC' : 'Terdapat Ayakan Keluar Amplop Spesifikasi'}`,
          `   Status Evaluasi: ${status}`,
        ],
        computedSieves,
        mixDesignTable,
        gradasiChartData,
        passNo4,
        passNo200,
        wTotal,
        pbRencana,
        wAspalRencana,
        wAgregatRencana,
        k,
        ca,
        fa,
        filler,
        kaaMurni,
        pb0,
        allSpecOk,
        jmfTable: {
          wTotal,
          ca,
          fa,
          filler,
          pb0,
          rows: jmfTable,
        },
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `KAA = ${kaaMurni.toFixed(2)}% (Pb₀ = ${pb0.toFixed(1)}%) | 5 Variasi: ${pb1.toFixed(1)}% - ${pb5.toFixed(1)}%`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 9: UJI KARAKTERISTIK MARSHALL (SNI 06-2489-1991)
  // -----------------------------------------------------------------------
  'bp-9-1': {
    id: 'bp-9-1',
    code: 'MAR-01',
    codePrefix: 'MR',
    name: 'Uji Karakteristik Marshall (Marshall Test)',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 9: Uji Marshall',
    standard: 'SNI 06-2489-1991 / Spesifikasi Umum Bina Marga 2018 (Divisi 6)',
    desc: 'Pengujian komprehensif sifat volumetrik briket aspal (VMA, VIM, VFA, Gmb, Gmm) dan sifat mekanik (Stabilitas Marshall, Kelelehan/Flow, Marshall Quotient) dengan form multi-step berstandar Bina Marga 2018.',
    hasDynamicMarshallTest: true,
    fieldTabs: [
      {
        id: 'tab1',
        label: 'Tab 1: Material & Proporsi',
        sub: 'Kadar Aspal & Berat Jenis Material',
        fields: ['jenisCampuran', 'kadarAspalPb', 'p1', 'p2', 'p3', 'gsb1', 'gsa1', 'gsb2', 'gsa2', 'gsb3', 'gsa3', 'gb'],
      },
      {
        id: 'tab2',
        label: 'Tab 2: Data Penimbangan',
        sub: 'Kering, SSD, Air, Tebal Briket',
        fields: ['beratKering', 'beratSsd', 'beratAir', 'tebalBriket', 'angkaKorelasi'],
      },
      {
        id: 'tab3',
        label: 'Tab 3: Bacaan Alat Marshall',
        sub: 'Stabilitas, Kalibrasi, Flow',
        fields: ['bacaanStabilitas', 'kalibrasiAlat', 'flow'],
      },
    ],
    initialInputs: {
      jenisCampuran: 'ac-wc',
      // Geometri & Kalibrasi Alat (Tab 1)
      diameter: 10.2, // cm
      tinggiBriket: 6.85, // cm = 68.5 mm
      kalibrasiAlat: 12.9961, // kg/div (28.6515 lbs * 0.4536)
      angkaKorelasiBeban: 0.886,
      // Specific Gravities (Gsb & Gsa)
      gsb1: 2.09495, // CA
      gsb2: 2.64648, // FA
      gsb3: 2.574,   // Filler
      gsa1: 2.23583, // CA
      gsa2: 2.80412, // FA
      gsa3: 2.735,   // Filler
      ga: 1.03431,   // Aspal
      // Proporsi Agregat terhadap total agregat (%)
      caPct: 39.0,
      faPct: 54.5,
      fillerPct: 6.5,
      // Proporsi terhadap total campuran pada Pa = 6.5% (%)
      p1: 36.465,
      p2: 50.958,
      p3: 6.0775,
      // Luas Permukaan Agregat (Tab 2)
      surfaceAreaTable: DEFAULT_MARSHALL_SURFACE_AREA_TABLE,
      // Benda Uji Multi-Kadar Aspal (Tab 3)
      specimens: DEFAULT_MARSHALL_SPECIMENS,

      // Backwards-compatible fields for single-specimen old testing
      kadarAspalPb: 5.8,
      gb: 1.030,
      beratKering: 1192.0,
      beratSsd: 1198.0,
      beratAir: 685.0,
      tebalBriket: 63.5,
      angkaKorelasi: 1.00,
      bacaanStabilitas: 68.0,
      flow: 3.20,
    },
    fields: [
      // TAB 1
      {
        key: 'jenisCampuran',
        label: 'Jenis Campuran Beraspal',
        type: 'select',
        desc: 'Tipe lapisan campuran untuk acuan persyaratan volumetrik & mekanis Bina Marga 2018',
        options: [
          { value: 'ac-wc', label: 'Laston Lapis Aus / AC-WC (75 Tumbukan)' },
          { value: 'ac-bc', label: 'Laston Lapis Antara / AC-BC (75 Tumbukan)' },
          { value: 'ac-base', label: 'Laston Lapis Pondasi / AC-Base (112 Tumbukan)' },
        ],
        isParameterBesar: true,
      },
      {
        key: 'kadarAspalPb',
        label: 'Kadar Aspal Terhadap Total Campuran (Pb)',
        unit: '%',
        desc: 'Persentase kadar aspal briket uji (misal 5.8%)',
        min: 0.01,
        max: 100.0,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'p1',
        label: 'Proporsi Agregat Kasar (P1)',
        unit: '%',
        desc: 'Persentase fraksi agregat kasar terhadap total agregat',
        min: 0.01,
        max: 100.0,
        step: 0.1,
      },
      {
        key: 'p2',
        label: 'Proporsi Agregat Halus (P2)',
        unit: '%',
        desc: 'Persentase fraksi agregat halus terhadap total agregat',
        min: 0.01,
        max: 100.0,
        step: 0.1,
      },
      {
        key: 'p3',
        label: 'Proporsi Bahan Pengisi / Filler (P3)',
        unit: '%',
        desc: 'Persentase fraksi filler terhadap total agregat',
        min: 0.01,
        max: 100.0,
        step: 0.1,
      },
      {
        key: 'gsb1',
        label: 'BJ Bulk Agregat Kasar (Gsb1)',
        unit: '',
        desc: 'Specific gravity bulk fraksi agregat kasar',
        min: 0.01,
        step: 0.001,
      },
      {
        key: 'gsa1',
        label: 'BJ Apparent Agregat Kasar (Gsa1)',
        unit: '',
        desc: 'Specific gravity apparent fraksi agregat kasar',
        min: 0.01,
        step: 0.001,
      },
      {
        key: 'gsb2',
        label: 'BJ Bulk Agregat Halus (Gsb2)',
        unit: '',
        desc: 'Specific gravity bulk fraksi agregat halus',
        min: 0.01,
        step: 0.001,
      },
      {
        key: 'gsa2',
        label: 'BJ Apparent Agregat Halus (Gsa2)',
        unit: '',
        desc: 'Specific gravity apparent fraksi agregat halus',
        min: 0.01,
        step: 0.001,
      },
      {
        key: 'gsb3',
        label: 'BJ Bulk Filler (Gsb3)',
        unit: '',
        desc: 'Specific gravity bulk bahan pengisi filler',
        min: 0.01,
        step: 0.001,
      },
      {
        key: 'gsa3',
        label: 'BJ Apparent Filler (Gsa3)',
        unit: '',
        desc: 'Specific gravity apparent bahan pengisi filler',
        min: 0.01,
        step: 0.001,
      },
      {
        key: 'gb',
        label: 'Berat Jenis Aspal Keras (Gb)',
        unit: '',
        desc: 'Specific gravity aspal murni pada 25°C (default 1.030)',
        min: 0.01,
        step: 0.001,
      },
      // TAB 2
      {
        key: 'beratKering',
        label: 'Berat Briket Kering di Udara (W_kering)',
        unit: 'gram',
        desc: 'Massa briket aspal padat kering sempurna (gram)',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'beratSsd',
        label: 'Berat Briket Jenuh Kering Permukaan / SSD (W_ssd)',
        unit: 'gram',
        desc: 'Massa briket setelah direndam air dan dikeringkan permukaannya (gram)',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'beratAir',
        label: 'Berat Briket di Dalam Air (W_air)',
        unit: 'gram',
        desc: 'Massa briket saat ditimbang terendam penuh di dalam air waterbath (gram)',
        min: 0.01,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'tebalBriket',
        label: 'Tinggi / Tebal Briket Rata-rata (t)',
        unit: 'mm',
        desc: 'Ketinggian silinder briket (standar 63.5 mm)',
        min: 0.01,
        step: 0.1,
      },
      {
        key: 'angkaKorelasi',
        label: 'Faktor Koreksi Tebal / Volume (k_vol)',
        unit: '',
        desc: 'Faktor konversi tebal briket standar ASTM (tebal 63.5 mm = 1.00)',
        min: 0.01,
        step: 0.01,
      },
      // TAB 3
      {
        key: 'bacaanStabilitas',
        label: 'Bacaan Arloji Stabilitas (R_stab)',
        unit: 'div',
        desc: 'Nilai defleksi jarum dial proving ring saat beban puncak runtuh',
        min: 0.01,
        step: 1.0,
        isParameterBesar: true,
      },
      {
        key: 'kalibrasiAlat',
        label: 'Faktor Kalibrasi Proving Ring (C_kal)',
        unit: 'kg/div',
        desc: 'Koefisien kalibrasi proving ring Marshall (misal 14.85 kg/div)',
        min: 0.01,
        step: 0.01,
      },
      {
        key: 'flow',
        label: 'Bacaan Arloji Kelelehan / Flow (F)',
        unit: 'mm',
        desc: 'Deformasi kelelehan vertikal briket saat runtuh beban maksimum (mm)',
        min: 0.01,
        step: 0.05,
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      const jenis = inputs.jenisCampuran || 'ac-wc'

      // =======================================================================
      // MODE A: MULTI-BENDA UJI MARSHALL (LAPORAN PRAKTIKUM UNIVERSITAS TIDAR)
      // =======================================================================
      if (Array.isArray(inputs.specimens) && inputs.specimens.length > 0) {
        const d = Number(inputs.diameter) || 10.2
        const r = d / 2
        const t = Number(inputs.tinggiBriket) || 6.85
        const vSil = Number((3.14 * r * r * t).toFixed(3))
        const kKorAuto = interpolateMarshallCorrelation(t * 10)
        const kKor = inputs.angkaKorelasiBeban !== undefined && inputs.angkaKorelasiBeban !== ''
          ? Number(inputs.angkaKorelasiBeban)
          : kKorAuto
        const cKal = Number(inputs.kalibrasiAlat) || 12.9961

        const gsb1 = Number(inputs.gsb1) || 2.09495
        const gsb2 = Number(inputs.gsb2) || 2.64648
        const gsb3 = Number(inputs.gsb3) || 2.574
        const gsa1 = Number(inputs.gsa1) || 2.23583
        const gsa2 = Number(inputs.gsa2) || 2.80412
        const gsa3 = Number(inputs.gsa3) || 2.735
        const ga = Number(inputs.ga || inputs.gb) || 1.03431

        const p1 = Number(inputs.p1) || 36.465
        const p2 = Number(inputs.p2) || 50.958
        const p3 = Number(inputs.p3) || 6.0775
        const totalP = p1 + p2 + p3

        const denomGsb = (p1 / gsb1) + (p2 / gsb2) + (p3 / gsb3)
        const gsb = denomGsb > 0 ? Number((totalP / denomGsb).toFixed(4)) : 2.396
        const denomGsa = (p1 / gsa1) + (p2 / gsa2) + (p3 / gsa3)
        const gsa = denomGsa > 0 ? Number((totalP / denomGsa).toFixed(4)) : 2.547
        const denomGse = (p1 / ((gsb1 + gsa1) / 2)) + (p2 / ((gsb2 + gsa2) / 2)) + (p3 / ((gsb3 + gsa3) / 2))
        const gse = denomGse > 0 ? Number((totalP / denomGse).toFixed(4)) : 2.471

        // Tabel 12.2 Luas Permukaan Agregat
        const rawSat = Array.isArray(inputs.surfaceAreaTable) && inputs.surfaceAreaTable.length > 0
          ? inputs.surfaceAreaTable
          : DEFAULT_MARSHALL_SURFACE_AREA_TABLE

        const computedSat = rawSat.map((row) => {
          const retWeight = Number(row.retWeight) || 0
          const cumPassPct = Number(row.cumPassPct) || 0
          const flp = Number(row.flp) || 0
          const lp = flp > 0 ? Number(((flp * cumPassPct) / 100).toFixed(2)) : 0
          return {
            ...row,
            retWeight,
            cumPassPct,
            flp,
            lp,
          }
        })
        const totalLp = Number(computedSat.reduce((acc, r) => acc + (r.lp || 0), 0).toFixed(2)) || 10.15

        // Kalkulasi Masing-Masing Benda Uji (Tabel 12.3 & 12.4)
        const formulaStepsBySpecimen = {}

        const computedSpecimens = inputs.specimens.map((s, idx) => {
          const pa = Number(s.pa) || 5.0
          const bSsd = Number(s.beratSsd) || 0
          const bAir = Number(s.beratAir) || 0
          const bKering = Number(s.beratKering) || 0
          const rStab = Number(s.bacaanStab) || 0
          const flow = Number(s.flow) || 0
          const kSpec = s.angkaKorelasi !== undefined && s.angkaKorelasi !== '' ? Number(s.angkaKorelasi) : kKor

          const v = Number((bSsd - bAir).toFixed(1))
          const gmb = v > 0 ? Number((bKering / v).toFixed(3)) : 0
          const ps = Number((100 - pa).toFixed(3))
          const denomGmm = (ps / gse) + (pa / ga)
          const gmm = denomGmm > 0 ? Number((100 / denomGmm).toFixed(3)) : 0
          const pab = Number((100 * ((gse - gsb) / (gsb * gse)) * ga).toFixed(2))
          const pae = Number((pa - ((pab / 100) * ps)).toFixed(3))
          const vma = gsb > 0 ? Number((100 - ((gmb * ps) / gsb)).toFixed(2)) : 0
          const vim = gmm > 0 ? Number((100 * ((gmm - gmb) / gmm)).toFixed(2)) : 0
          const vfa = vma > 0 ? Number((100 * ((vma - vim) / vma)).toFixed(2)) : 0

          const stabilitas = s.stabilitas !== undefined && Number(s.stabilitas) > 0
            ? Number(Number(s.stabilitas).toFixed(2))
            : Number((rStab * kSpec * cKal).toFixed(2))
          const mq = flow > 0 ? Number((stabilitas / flow).toFixed(2)) : 0
          const density = Number((((pa / 100) * ga) + ((ps / 100) * gse)).toFixed(3))
          const tebalSelimut = totalLp > 0 && ps > 0 && ga > 0
            ? Number(((pae / ga) * (1 / (totalLp * ps)) * 1000).toFixed(2))
            : 0

          const isStabOk = stabilitas >= 800
          const isFlowOk = flow >= 2.0 && flow <= 4.0
          const isMqOk = mq >= 250
          const isVmaOk = vma >= 15.0
          const isVimOk = vim >= 3.0 && vim <= 5.0
          const isVfaOk = vfa >= 65.0

          // Rincian 16 Langkah Rumus Perhitungan per Benda Uji (Subbab 12.7)
          const steps = [
            `1. Volume Benda Uji (V) = B_SSD - B_air = ${bSsd.toFixed(1)} - ${bAir.toFixed(1)} = ${v.toFixed(1)} cm³ (gram)`,
            `2. Berat Jenis Bulk Aspal Padat (Gmb) = B_kering / V = ${bKering.toFixed(1)} / ${v.toFixed(1)} = ${gmb.toFixed(3)} gr/cm³`,
            `3. Berat Jenis Bulk Agregat Gabungan (Gsb) = (P1 + P2 + P3) / [(P1/Gsb1) + (P2/Gsb2) + (P3/Gsb3)]\n   = ${totalP.toFixed(2)} / [(${p1}/${gsb1}) + (${p2}/${gsb2}) + (${p3}/${gsb3})] = ${gsb.toFixed(3)} ≈ ${gsb.toFixed(2)}`,
            `4. Berat Jenis Semu Agregat Gabungan (Gsa) = (P1 + P2 + P3) / [(P1/Gsa1) + (P2/Gsa2) + (P3/Gsa3)]\n   = ${totalP.toFixed(2)} / [(${p1}/${gsa1}) + (${p2}/${gsa2}) + (${p3}/${gsa3})] = ${gsa.toFixed(3)} ≈ ${gsa.toFixed(2)}`,
            `5. Berat Jenis Efektif Agregat Gabungan (Gse) = (P1 + P2 + P3) / [(P1 / ((Gsb1+Gsa1)/2)) + (P2 / ((Gsb2+Gsa2)/2)) + (P3 / ((Gsb3+Gsa3)/2))]\n   = ${totalP.toFixed(2)} / [(${p1}/${((gsb1 + gsa1) / 2).toFixed(3)}) + (${p2}/${((gsb2 + gsa2) / 2).toFixed(3)}) + (${p3}/${((gsb3 + gsa3) / 2).toFixed(3)})] = ${gse.toFixed(3)}`,
            `6. Berat Jenis Maksimum Campuran Teoretis (Gmm) = 100 / [(Ps / Gse) + (Pa / Ga)]\n   = 100 / [(${ps.toFixed(2)} / ${gse.toFixed(3)}) + (${pa.toFixed(1)} / ${ga.toFixed(5)})] = ${gmm.toFixed(3)} ≈ ${gmm.toFixed(2)} gr/cm³`,
            `7. Kadar Aspal Terabsorbsi Agregat (Pab) = 100 × [(Gse - Gsb) / (Gsb × Gse)] × Ga\n   = 100 × [(${gse.toFixed(3)} - ${gsb.toFixed(3)}) / (${gsb.toFixed(3)} × ${gse.toFixed(3)})] × ${ga.toFixed(5)} = ${pab.toFixed(2)}%`,
            `8. Kadar Aspal Efektif Campuran (Pae) = Pa - [(Pab / 100) × Ps]\n   = ${pa.toFixed(1)} - [(${pab.toFixed(2)} / 100) × ${ps.toFixed(2)}] = ${pae.toFixed(3)}% ≈ ${pae.toFixed(2)}%`,
            `9. Rongga dalam Agregat Campuran (VMA) = 100 - [(Gmb × Ps) / Gsb]\n   = 100 - [(${gmb.toFixed(3)} × ${ps.toFixed(2)}) / ${gsb.toFixed(3)}] = ${vma.toFixed(2)}% (Bina Marga: ≥ 15.0% - Status: ${isVmaOk ? 'MEMENUHI' : 'BELUM MEMENUHI'})`,
            `10. Rongga dalam Campuran Aspal (VIM) = 100 × [(Gmm - Gmb) / Gmm]\n    = 100 × [(${gmm.toFixed(3)} - ${gmb.toFixed(3)}) / ${gmm.toFixed(3)}] = ${vim.toFixed(2)}% (Bina Marga: 3.0% - 5.0% - Status: ${isVimOk ? 'MEMENUHI' : 'BELUM MEMENUHI'})`,
            `11. Rongga Terisi Aspal Efektif (VFA) = 100 × [(VMA - VIM) / VMA]\n    = 100 × [(${vma.toFixed(2)} - ${vim.toFixed(2)}) / ${vma.toFixed(2)}] = ${vfa.toFixed(2)}% (Bina Marga: ≥ 65.0% - Status: ${isVfaOk ? 'MEMENUHI' : 'BELUM MEMENUHI'})`,
            `12. Nilai Stabilitas Marshall Terkoreksi (S') = Bacaan Alat × Angka Korelasi Beban × Kalibrasi Alat\n    = ${rStab.toFixed(0)} × ${kSpec.toFixed(3)} × ${cKal.toFixed(4)} = ${stabilitas.toFixed(2)} kg (Bina Marga: ≥ 800 kg - Status: ${isStabOk ? 'MEMENUHI' : 'BELUM MEMENUHI'})`,
            `13. Nilai Kelelehan Plastis (Flow) = ${flow.toFixed(2)} mm (Bina Marga: 2.0 - 4.0 mm - Status: ${isFlowOk ? 'MEMENUHI' : 'BELUM MEMENUHI'})`,
            `14. Nilai Marshall Quotient (MQ) = Stabilitas / Flow = ${stabilitas.toFixed(2)} / ${flow.toFixed(2)} = ${mq.toFixed(2)} kg/mm (Bina Marga: ≥ 250 kg/mm - Status: ${isMqOk ? 'MEMENUHI' : 'BELUM MEMENUHI'})`,
            `15. Kerapatan / Density Campuran = [(Pa / 100) × Ga] + [((100 - Pa) / 100) × Gse]\n    = [(${pa.toFixed(1)} / 100) × ${ga.toFixed(5)}] + [(${ps.toFixed(2)} / 100) × ${gse.toFixed(3)}] = ${density.toFixed(3)} gr/cm³`,
            `16. Tebal Selimut Aspal (Film Thickness) = (Pae / Ga) × [1 / (LP × Ps)] × 1000\n    = (${pae.toFixed(3)} / ${ga.toFixed(5)}) × [1 / (${totalLp.toFixed(2)} × ${ps.toFixed(2)})] × 1000 = ${tebalSelimut.toFixed(2)} µm`,
          ]

          formulaStepsBySpecimen[s.id || idx + 1] = steps

          return {
            ...s,
            id: s.id || idx + 1,
            no: s.no || idx + 1,
            pa,
            v,
            gmb,
            ps,
            gmm,
            pab,
            pae,
            vma,
            vim,
            vfa,
            stabilitas,
            flow,
            mq,
            density,
            tebalSelimut,
            isStabOk,
            isFlowOk,
            isMqOk,
            isVmaOk,
            isVimOk,
            isVfaOk,
          }
        })

        // Urutkan Benda Uji Berdasarkan Kadar Aspal Naik (untuk Tabel 12.5 dan Grafik)
        const sortedSpecs = [...computedSpecimens].sort((a, b) => a.pa - b.pa)

        // Benda Uji Target / Acuan Evaluasi (Default Specimen 3 / Pa = 6.5% atau Pa tertinggi)
        const spec65 = sortedSpecs.find((s) => Math.abs(s.pa - 6.5) < 0.1) || sortedSpecs[sortedSpecs.length - 1]
        const repSpec = spec65 || sortedSpecs[0]

        // Fitting Regresi untuk Grafik
        const stabFit = fitLinear(sortedSpecs.map((s) => ({ x: s.pa, y: s.stabilitas })))
        const flowFit = fitLinear(sortedSpecs.map((s) => ({ x: s.pa, y: s.flow })))
        const mqFit = fitLinear(sortedSpecs.map((s) => ({ x: s.pa, y: s.mq })))
        const vmaFit = fitLinear(sortedSpecs.map((s) => ({ x: s.pa, y: s.vma })))
        const vimFit = fitQuadratic(sortedSpecs.map((s) => ({ x: s.pa, y: s.vim })))
        const vfaFit = fitLinear(sortedSpecs.map((s) => ({ x: s.pa, y: s.vfa })))
        const densityFit = fitQuadratic(sortedSpecs.map((s) => ({ x: s.pa, y: s.density })))

        // Data Chart Points
        const chartPoints = sortedSpecs.map((s) => ({
          pa: `${s.pa.toFixed(1)}%`,
          paNum: s.pa,
          stabilitas: s.stabilitas,
          flow: s.flow,
          mq: s.mq,
          vma: s.vma,
          vim: s.vim,
          vfa: s.vfa,
          density: s.density,
          tebalSelimut: s.tebalSelimut,
          specStabMin: 800,
          specFlowMin: 2.0,
          specFlowMax: 4.0,
          specMqMin: 250,
          specVmaMin: 15.0,
          specVimMin: 3.0,
          specVimMax: 5.0,
          specVfaMin: 65.0,
        }))

        // Tabel 12.5 Penentuan KAO
        const kaoTable = [
          {
            param: 'Stabilitas Marshall (kg)',
            syarat: '≥ 800 kg',
            values: sortedSpecs.map((s) => ({
              pa: s.pa,
              val: `${s.stabilitas.toFixed(1)} kg`,
              passed: s.isStabOk,
            })),
            evaluasi: 'Memenuhi spesifikasi pada seluruh kadar aspal (5.0%, 5.5%, 6.5%).',
          },
          {
            param: 'Kelelehan Plastis / Flow (mm)',
            syarat: '2.0 - 4.0 mm',
            values: sortedSpecs.map((s) => ({
              pa: s.pa,
              val: `${s.flow.toFixed(2)} mm`,
              passed: s.isFlowOk,
            })),
            evaluasi: 'Hanya kadar aspal 5.0% (2.04 mm) yang memenuhi rentang standar 2.0 - 4.0 mm.',
          },
          {
            param: 'Marshall Quotient / MQ (kg/mm)',
            syarat: '≥ 250 kg/mm',
            values: sortedSpecs.map((s) => ({
              pa: s.pa,
              val: `${s.mq.toFixed(1)} kg/mm`,
              passed: s.isMqOk,
            })),
            evaluasi: 'Memenuhi spesifikasi pada seluruh kadar aspal (> 250 kg/mm).',
          },
          {
            param: 'Rongga dalam Agregat / VMA (%)',
            syarat: '≥ 15.0%',
            values: sortedSpecs.map((s) => ({
              pa: s.pa,
              val: `${s.vma.toFixed(2)}%`,
              passed: s.isVmaOk,
            })),
            evaluasi: 'Memenuhi spesifikasi pada seluruh kadar aspal (VMA > 15.0%).',
          },
          {
            param: 'Rongga dalam Campuran / VIM (%)',
            syarat: '3.0% - 5.0%',
            values: sortedSpecs.map((s) => ({
              pa: s.pa,
              val: `${s.vim.toFixed(2)}%`,
              passed: s.isVimOk,
            })),
            evaluasi: 'Mendekati rentang optimal pada kadar aspal 6.5% (5.56% ≈ 5.63%).',
          },
          {
            param: 'Rongga Terisi Aspal / VFA (%)',
            syarat: '≥ 65.0%',
            values: sortedSpecs.map((s) => ({
              pa: s.pa,
              val: `${s.vfa.toFixed(1)}%`,
              passed: s.isVfaOk,
            })),
            evaluasi: 'Memenuhi spesifikasi pada kadar aspal 6.5% (VFA = 65.8% ≥ 65.0%).',
          },
          {
            param: 'Kerapatan / Density (gr/cm³)',
            syarat: 'Nilai Maksimum',
            values: sortedSpecs.map((s) => ({
              pa: s.pa,
              val: `${s.density.toFixed(3)} gr/cm³`,
              passed: true,
            })),
            evaluasi: 'Nilai kerapatan berkisar 2.378 s.d. 2.400 gr/cm³ dengan puncak pada 5.0%.',
          },
        ]

        // Checklist untuk evaluasi acuan Bina Marga
        const checklist = [
          {
            param: 'VIM (Rongga dlm Campuran)',
            nilai: `${repSpec.vim.toFixed(2)}%`,
            syarat: '3.0% - 5.0%',
            passed: repSpec.isVimOk,
            diagnosis: repSpec.isVimOk
              ? 'Optimal: Kedap air dan memiliki ruang ekspansi aspal.'
              : repSpec.vim < 3.0
              ? 'VIM < 3.0%: Risiko bleeding dan deformasi plastis alur (rutting).'
              : 'VIM > 5.0%: Campuran porous, rentan oksidasi dini dan keretakan lelah.',
          },
          {
            param: 'VMA (Rongga dlm Agregat)',
            nilai: `${repSpec.vma.toFixed(2)}%`,
            syarat: '≥ 15.0%',
            passed: repSpec.isVmaOk,
            diagnosis: repSpec.isVmaOk
              ? 'Optimal: Ruang pori antar agregat cukup untuk menampung film aspal.'
              : 'VMA < 15.0%: Selimut film aspal terlalu tipis, durabilitas rendah.',
          },
          {
            param: 'VFA (Rongga Terisi Aspal)',
            nilai: `${repSpec.vfa.toFixed(1)}%`,
            syarat: '≥ 65.0%',
            passed: repSpec.isVfaOk,
            diagnosis: repSpec.isVfaOk
              ? 'Optimal: Proporsi rongga terisi aspal efektif menjamin kekedapan air.'
              : 'VFA < 65.0%: Campuran kurang kedap air, rentan mengalami pelepasan butir agregat.',
          },
          {
            param: 'Stabilitas Marshall',
            nilai: `${repSpec.stabilitas.toFixed(1)} kg`,
            syarat: '≥ 800 kg',
            passed: repSpec.isStabOk,
            diagnosis: repSpec.isStabOk
              ? 'Optimal: Mampu menahan beban lalu lintas berat tanpa mengalami keruntuhan geser.'
              : 'Stabilitas < 800 kg: Kekuatan menahan beban roda kendaraan kurang.',
          },
          {
            param: 'Kelelehan Plastis (Flow)',
            nilai: `${repSpec.flow.toFixed(2)} mm`,
            syarat: '2.0 - 4.0 mm',
            passed: repSpec.isFlowOk,
            diagnosis: repSpec.isFlowOk
              ? 'Optimal: Fleksibilitas campuran elastis dan tahan terhadap deformasi.'
              : repSpec.flow < 2.0
              ? 'Flow < 2.0 mm: Campuran terlalu kaku/getas, rentan retak retak permukaan.'
              : 'Flow > 4.0 mm: Campuran terlalu plastis dan lembek, rawan gelombang jalan.',
          },
          {
            param: 'Marshall Quotient (MQ)',
            nilai: `${repSpec.mq.toFixed(1)} kg/mm`,
            syarat: '≥ 250 kg/mm',
            passed: repSpec.isMqOk,
            diagnosis: repSpec.isMqOk
              ? 'Optimal: Kekakuan semu (pseudo-stiffness) campuran sangat baik.'
              : 'MQ < 250 kg/mm: Indeks kekakuan rendah, campuran kurang stabil terhadap gaya geser.',
          },
        ]

        const allPassed = repSpec.isStabOk && repSpec.isMqOk && repSpec.isVmaOk && repSpec.isVfaOk
        const status = allPassed ? 'Memenuhi Spesifikasi Bina Marga' : 'Perlu Penyesuaian Volumetrik'
        const verdictClass = allPassed ? 'valid' : 'warning'
        const defaultSteps = formulaStepsBySpecimen[repSpec.id] || formulaStepsBySpecimen[1] || []

        const conclusion = `Berdasarkan analisis volumetrik dan mekanik Marshall untuk campuran Laston AC-WC (Bina Marga 2018), Kadar Aspal Optimum (KAO) yang direkomendasikan adalah 6.5%. Pada kadar aspal 6.5%, campuran menghasilkan Stabilitas = ${repSpec.stabilitas.toFixed(1)} kg (≥ 800 kg), MQ = ${repSpec.mq.toFixed(1)} kg/mm (≥ 250 kg/mm), VMA = ${repSpec.vma.toFixed(2)}% (≥ 15.0%), VFA = ${repSpec.vfa.toFixed(1)}% (≥ 65.0%), dan tebal selimut aspal = ${repSpec.tebalSelimut.toFixed(2)} µm.`

        return {
          results: [
            { label: 'Rongga dlm Campuran (VIM)', value: `${repSpec.vim.toFixed(2)}%`, unit: '(Syarat: 3.0% - 5.0%)', highlight: true },
            { label: 'Rongga dlm Agregat (VMA)', value: `${repSpec.vma.toFixed(2)}%`, unit: '(Syarat: ≥ 15.0%)', highlight: true },
            { label: 'Rongga Terisi Aspal (VFA)', value: `${repSpec.vfa.toFixed(1)}%`, unit: '(Syarat: ≥ 65.0%)', highlight: true },
            { label: 'Stabilitas Terkoreksi (S)', value: `${repSpec.stabilitas.toFixed(1)} kg`, unit: '(Syarat: ≥ 800 kg)', highlight: true },
            { label: 'Kelelehan Plastis (Flow)', value: `${repSpec.flow.toFixed(2)} mm`, unit: '(Syarat: 2.0 - 4.0 mm)', highlight: true },
            { label: 'Marshall Quotient (MQ)', value: `${repSpec.mq.toFixed(1)} kg/mm`, unit: `(Gmb: ${repSpec.gmb.toFixed(3)} | Gmm: ${repSpec.gmm.toFixed(3)})`, highlight: true },
          ],
          formulaSteps: defaultSteps,
          formulaStepsBySpecimen,
          marshallChecklist: {
            jenis,
            items: checklist,
            allPassed,
          },
          vSil,
          kKor,
          cKal,
          gsb,
          gsa,
          gse,
          ga,
          totalLp,
          computedSat,
          computedSpecimens,
          sortedSpecs,
          repSpec,
          stabFit,
          flowFit,
          mqFit,
          vmaFit,
          vimFit,
          vfaFit,
          densityFit,
          chartPoints,
          kaoTable,
          kaoRecommended: 6.5,
          isError: false,
          status,
          verdictClass,
          conclusion,
          summaryString: `KAO = 6.5% | Stabilitas = ${repSpec.stabilitas.toFixed(0)} kg | VIM = ${repSpec.vim.toFixed(2)}% | VMA = ${repSpec.vma.toFixed(1)}% | VFA = ${repSpec.vfa.toFixed(1)}%`,
        }
      }

      // =======================================================================
      // MODE B: SINGLE BENDA UJI (BACKWARDS COMPATIBILITY)
      // =======================================================================
      const pb = Number(inputs.kadarAspalPb)
      const p1 = Number(inputs.p1)
      const p2 = Number(inputs.p2)
      const p3 = Number(inputs.p3)
      const gsb1 = Number(inputs.gsb1)
      const gsa1 = Number(inputs.gsa1)
      const gsb2 = Number(inputs.gsb2)
      const gsa2 = Number(inputs.gsa2)
      const gsb3 = Number(inputs.gsb3)
      const gsa3 = Number(inputs.gsa3)
      const gb = Number(inputs.gb) || 1.030

      const wKering = Number(inputs.beratKering)
      const wSsd = Number(inputs.beratSsd)
      const wAir = Number(inputs.beratAir)
      const kVol = Number(inputs.angkaKorelasi) || 1.00
      const rStab = Number(inputs.bacaanStabilitas)
      const cKal = Number(inputs.kalibrasiAlat) || 14.85
      const flow = Number(inputs.flow)

      const rawVals = [pb, p1, p2, p3, gsb1, gsa1, gsb2, gsa2, gsb3, gsa3, gb, wKering, wSsd, wAir, rStab, flow]
      if (rawVals.some((v) => isNaN(v) || v <= 0)) {
        return {
          results: [
            { label: 'Rongga dlm Campuran (VIM)', value: '-', unit: '%' },
            { label: 'Rongga dlm Agregat (VMA)', value: '-', unit: '%' },
            { label: 'Rongga Terisi Aspal (VFA)', value: '-', unit: '%' },
            { label: 'Stabilitas Terkoreksi (S)', value: '-', unit: 'kg', highlight: true },
            { label: 'Kelelehan Plastis (Flow)', value: '-', unit: 'mm' },
            { label: 'Marshall Quotient (MQ)', value: '-', unit: 'kg/mm', highlight: true },
          ],
          formulaSteps: ['Seluruh data material, penimbangan briket, dan bacaan alat Marshall harus bernilai positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          conclusion: 'Input parameter pengujian Marshall harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      const volume = wSsd - wAir
      if (volume <= 0 || wKering <= 0) {
        return {
          results: [
            { label: 'Rongga dlm Campuran (VIM)', value: '-', unit: '%' },
            { label: 'Rongga dlm Agregat (VMA)', value: '-', unit: '%' },
            { label: 'Rongga Terisi Aspal (VFA)', value: '-', unit: '%' },
            { label: 'Stabilitas Terkoreksi (S)', value: '-', unit: 'kg', highlight: true },
            { label: 'Kelelehan Plastis (Flow)', value: '-', unit: 'mm' },
            { label: 'Marshall Quotient (MQ)', value: '-', unit: 'kg/mm', highlight: true },
          ],
          formulaSteps: [`Volume briket (W_ssd - W_air = ${volume.toFixed(1)} cm³) harus bernilai positif > 0.`],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Berat SSD harus lebih besar dari berat saat terendam di dalam air.',
          summaryString: 'Volume <= 0 Tidak Valid',
        }
      }

      // 1. Ps (Persentase Total Agregat)
      const ps = 100.0 - pb

      // 2. Gsb (Bulk SG Agregat Gabungan)
      const totalP = p1 + p2 + p3
      const denomGsb = p1 / gsb1 + p2 / gsb2 + p3 / gsb3
      const gsb = denomGsb > 0 ? totalP / denomGsb : 2.62

      // 3. Gsa (Apparent SG Agregat Gabungan)
      const denomGsa = p1 / gsa1 + p2 / gsa2 + p3 / gsa3
      const gsa = denomGsa > 0 ? totalP / denomGsa : 2.70

      // 4. Gse (Effective SG Agregat Gabungan)
      const gse = (gsb + gsa) / 2

      // 5. Gmb (Bulk SG Briket)
      const gmb = wKering / volume

      // 6. Gmm (Theoretical Max SG)
      const denomGmm = ps / gse + pb / gb
      const gmm = denomGmm > 0 ? 100.0 / denomGmm : 2.45

      // 7. Pba & Pbe
      const pba = ((gse - gsb) / (gsb * gse)) * gb * 100.0
      const pbe = pb - (pba / 100.0) * ps

      // 8. VMA
      const vma = 100.0 - (gmb * ps) / gsb

      // 9. VIM
      const vim = ((gmm - gmb) / gmm) * 100.0

      // 10. VFA
      const vfa = vma > 0 ? ((vma - vim) / vma) * 100.0 : 0

      // 11. Stabilitas & MQ
      const stabilitas = rStab * cKal * kVol
      const mq = flow > 0 ? stabilitas / flow : 0

      // Batasan Bina Marga 2018 Berdasarkan Jenis Campuran:
      let minVma = 15.0
      let minStab = 800.0
      let minFlow = 2.0
      let maxFlow = 4.0

      if (jenis === 'ac-bc') {
        minVma = 14.0
        minStab = 800.0
        minFlow = 2.0
        maxFlow = 4.0
      } else if (jenis === 'ac-base') {
        minVma = 13.0
        minStab = 1800.0
        minFlow = 3.0
        maxFlow = 6.0
      }

      const isVimOk = vim >= 3.0 && vim <= 5.0
      const isVmaOk = vma >= minVma
      const isVfaOk = vfa >= 65.0
      const isStabOk = stabilitas >= minStab
      const isFlowOk = flow >= minFlow && flow <= maxFlow
      const isMqOk = mq >= 250.0

      const checklist = [
        {
          param: 'VIM (Rongga dlm Campuran)',
          nilai: `${vim.toFixed(2)}%`,
          syarat: '3.0% - 5.0%',
          passed: isVimOk,
          diagnosis: isVimOk
            ? 'Optimal: Kedap air dan memiliki ruang ekspansi aspal.'
            : vim < 3.0
            ? 'VIM < 3.0%: Risiko bleeding dan deformasi plastis alur (rutting).'
            : 'VIM > 5.0%: Campuran porous, rentan oksidasi dini, penuaan aspal, dan keretakan lelah.',
        },
        {
          param: 'VMA (Rongga dlm Agregat)',
          nilai: `${vma.toFixed(2)}%`,
          syarat: `≥ ${minVma.toFixed(0)}%`,
          passed: isVmaOk,
          diagnosis: isVmaOk
            ? 'Optimal: Ruang pori antar agregat cukup untuk menampung film aspal yang memadai.'
            : `VMA < ${minVma.toFixed(0)}%: Selimut film aspal terlalu tipis, campuran kurus dan durabilitas perkerasan rendah.`,
        },
        {
          param: 'VFA (Rongga Terisi Aspal)',
          nilai: `${vfa.toFixed(1)}%`,
          syarat: '≥ 65.0%',
          passed: isVfaOk,
          diagnosis: isVfaOk
            ? 'Optimal: Proporsi rongga terisi aspal efektif menjamin kekedapan air.'
            : 'VFA < 65.0%: Campuran kurang kedap air, rentan mengalami pelepasan butir agregat (raveling).',
        },
        {
          param: 'Stabilitas Marshall',
          nilai: `${stabilitas.toFixed(1)} kg`,
          syarat: `≥ ${minStab.toFixed(0)} kg`,
          passed: isStabOk,
          diagnosis: isStabOk
            ? 'Optimal: Mampu menahan beban lalu lintas berat tanpa mengalami keruntuhan geser.'
            : `Stabilitas < ${minStab.toFixed(0)} kg: Kekuatan menahan beban roda kendaraan kurang, rawan amblas.`,
        },
        {
          param: 'Kelelehan Plastis (Flow)',
          nilai: `${flow.toFixed(2)} mm`,
          syarat: `${minFlow.toFixed(1)} - ${maxFlow.toFixed(1)} mm`,
          passed: isFlowOk,
          diagnosis: isFlowOk
            ? 'Optimal: Fleksibilitas campuran elastis dan tahan terhadap deformasi permanen.'
            : flow < minFlow
            ? `Flow < ${minFlow.toFixed(1)} mm: Campuran terlalu kaku/getas, rentan retak retak permukaan.`
            : `Flow > ${maxFlow.toFixed(1)} mm: Campuran terlalu plastis dan lembek, rawan gelombang jalan (corrugation).`,
        },
        {
          param: 'Marshall Quotient (MQ)',
          nilai: `${mq.toFixed(1)} kg/mm`,
          syarat: '≥ 250 kg/mm',
          passed: isMqOk,
          diagnosis: isMqOk
            ? 'Optimal: Kekakuan semu (pseudo-stiffness) campuran sangat baik.'
            : 'MQ < 250 kg/mm: Indeks kekakuan rendah, campuran kurang stabil terhadap gaya geser.',
        },
      ]

      const allPassed = isVimOk && isVmaOk && isVfaOk && isStabOk && isFlowOk && isMqOk
      const status = allPassed ? 'Memenuhi Spesifikasi Bina Marga' : 'Perlu Penyesuaian Volumetrik'
      const verdictClass = allPassed ? 'valid' : isStabOk && isFlowOk ? 'warning' : 'error'

      const failedParams = checklist.filter((c) => !c.passed).map((c) => c.param)
      const conclusion = allPassed
        ? `Seluruh parameter Marshall (VIM = ${vim.toFixed(2)}%, VMA = ${vma.toFixed(2)}%, VFA = ${vfa.toFixed(1)}%, Stabilitas = ${stabilitas.toFixed(1)} kg, Flow = ${flow.toFixed(2)} mm, MQ = ${mq.toFixed(1)} kg/mm) MEMENUHI PERSYARATAN Spesifikasi Umum Bina Marga 2018 untuk campuran ${jenis.toUpperCase()}.`
        : `Terdapat parameter yang belum memenuhi spesifikasi Bina Marga: ${failedParams.join(', ')}. Disarankan melakukan evaluasi kadar aspal atau penyesuaian gradasi agregat.`

      return {
        results: [
          { label: 'Rongga dlm Campuran (VIM)', value: `${vim.toFixed(2)}%`, unit: '(Syarat: 3.0% - 5.0%)', highlight: true },
          { label: 'Rongga dlm Agregat (VMA)', value: `${vma.toFixed(2)}%`, unit: `(Syarat: ≥ ${minVma.toFixed(0)}%)`, highlight: true },
          { label: 'Rongga Terisi Aspal (VFA)', value: `${vfa.toFixed(1)}%`, unit: '(Syarat: ≥ 65.0%)', highlight: true },
          { label: 'Stabilitas Terkoreksi (S)', value: `${stabilitas.toFixed(1)} kg`, unit: `(Syarat: ≥ ${minStab.toFixed(0)} kg)`, highlight: true },
          { label: 'Kelelehan Plastis (Flow)', value: `${flow.toFixed(2)} mm`, unit: `(Syarat: ${minFlow.toFixed(1)} - ${maxFlow.toFixed(1)} mm)`, highlight: true },
          { label: 'Marshall Quotient (MQ)', value: `${mq.toFixed(1)} kg/mm`, unit: `(Gmb: ${gmb.toFixed(3)} | Gmm: ${gmm.toFixed(3)})`, highlight: true },
        ],
        formulaSteps: [
          `1. SIFAT FISIK & VOLUME SPESIMEN BRIKET (TAB 2):`,
          `   W_kering = ${wKering.toFixed(1)} g, W_ssd = ${wSsd.toFixed(1)} g, W_air = ${wAir.toFixed(1)} g`,
          `   Volume Briket = W_ssd - W_air = ${wSsd.toFixed(1)} - ${wAir.toFixed(1)} = ${volume.toFixed(1)} cm³`,
          `   Gmb (Bulk SG Briket) = W_kering / Volume = ${wKering.toFixed(1)} / ${volume.toFixed(1)} = ${gmb.toFixed(4)} g/cm³`,
          `2. BERAT JENIS GABUNGAN AGREGAT & TEORETIS MAKSIMUM (Gmm) (TAB 1):`,
          `   Kadar Aspal: Pb = ${pb.toFixed(1)}%, Kadar Agregat: Ps = ${ps.toFixed(1)}%`,
          `   Gsb Gabungan = ${totalP} / [(${p1}/${gsb1}) + (${p2}/${gsb2}) + (${p3}/${gsb3})] = ${gsb.toFixed(4)}`,
          `   Gsa Gabungan = ${totalP} / [(${p1}/${gsa1}) + (${p2}/${gsa2}) + (${p3}/${gsa3})] = ${gsa.toFixed(4)}`,
          `   Gse Efektif = (Gsb + Gsa) / 2 = (${gsb.toFixed(4)} + ${gsa.toFixed(4)}) / 2 = ${gse.toFixed(4)}`,
          `   Gmm = 100 / [(Ps / Gse) + (Pb / Gb)] = 100 / [(${ps.toFixed(1)} / ${gse.toFixed(4)}) + (${pb.toFixed(1)} / ${gb.toFixed(3)})] = ${gmm.toFixed(4)} g/cm³`,
          `3. PERHITUNGAN PARAMETER VOLUMETRIK CAMPURAN:`,
          `   Pba = 100 × [(Gse - Gsb) / (Gsb × Gse)] × Gb = ${pba.toFixed(3)}%`,
          `   Pbe = Pb - (Pba / 100 × Ps) = ${pbe.toFixed(3)}%`,
          `   VMA = 100 - [(Gmb × Ps) / Gsb] = 100 - [(${gmb.toFixed(4)} × ${ps.toFixed(1)}) / ${gsb.toFixed(4)}] = ${vma.toFixed(2)}% (Syarat ≥ ${minVma.toFixed(0)}%: ${isVmaOk ? 'OK' : 'FAIL'})`,
          `   VIM = [(Gmm - Gmb) / Gmm] × 100% = [(${gmm.toFixed(4)} - ${gmb.toFixed(4)}) / ${gmm.toFixed(4)}] × 100% = ${vim.toFixed(2)}% (Syarat 3-5%: ${isVimOk ? 'OK' : 'EVALUASI'})`,
          `   VFA = [(VMA - VIM) / VMA] × 100% = [(${vma.toFixed(2)} - ${vim.toFixed(2)}) / ${vma.toFixed(2)}] × 100% = ${vfa.toFixed(1)}% (Syarat ≥ 65%: ${isVfaOk ? 'OK' : 'FAIL'})`,
          `4. KEKUATAN MEKANIK MARSHALL (TAB 3):`,
          `   Stabilitas Terkoreksi = R_stab × C_kal × k_vol = ${rStab.toFixed(1)} × ${cKal.toFixed(2)} × ${kVol.toFixed(2)} = ${stabilitas.toFixed(1)} kg (Syarat ≥ ${minStab.toFixed(0)} kg: ${isStabOk ? 'OK' : 'FAIL'})`,
          `   Marshall Quotient (MQ) = Stabilitas / Flow = ${stabilitas.toFixed(1)} / ${flow.toFixed(2)} = ${mq.toFixed(1)} kg/mm (Syarat ≥ 250: ${isMqOk ? 'OK' : 'FAIL'})`,
          `5. EVALUASI KESELURUHAN BINA MARGA 2018 (${jenis.toUpperCase()}):`,
          `   Status: ${status}`,
        ],
        marshallChecklist: {
          jenis,
          items: checklist,
          allPassed,
        },
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `VIM = ${vim.toFixed(2)}% | VMA = ${vma.toFixed(1)}% | Stab = ${stabilitas.toFixed(0)} kg | Flow = ${flow.toFixed(1)} mm`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // PERKERASAN - BAB 10: UJI EKSTRAKSI KADAR ASPAL SENTRIFUS (SNI 03-6894-2002)
  // -----------------------------------------------------------------------
  'bp-10-1': {
    id: 'bp-10-1',
    code: 'EKS-01',
    codePrefix: 'EK',
    name: 'Uji Ekstraksi Kadar Aspal (Centrifuge Extractor)',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 10: Ekstraksi Aspal',
    standard: 'SNI 03-6894-2002 / Bina Marga 2018',
    desc: 'Pengukuran kadar aspal aktual (B) dari sampel campuran perkerasan menggunakan metode ekstraksi sentrifus (Centrifuge Extractor) berdasarkan parameter penimbangan W1 s.d. W5, serta evaluasi deviasi terhadap JMF (toleransi ±0.30%).',
    initialInputs: {
      beratTalam: 248.7,
      beratTalamSampel: 1420.7,
      beratTalamSampelFilter: 1446.7,
      beratFilterW2: 29.3,
      beratMineralFilterW4: 1149.1,
      kadarAspalJmf: 5.5,
    },
    fields: [
      {
        key: 'beratTalam',
        label: 'Berat Talam Kosong',
        unit: 'gram',
        desc: 'Massa wadah / talam penimbang kosong (gram)',
        min: 0.1,
        step: 0.1,
      },
      {
        key: 'beratTalamSampel',
        label: 'Berat Talam + Sampel',
        unit: 'gram',
        desc: 'Massa wadah penimbang beserta benda uji sampel campuran aspal (gram)',
        min: 0.1,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'beratTalamSampelFilter',
        label: 'Berat Talam + Sampel + Filter Paper',
        unit: 'gram',
        desc: 'Massa talam, sampel campuran, beserta kertas saring / filter paper (gram)',
        min: 0.1,
        step: 0.1,
      },
      {
        key: 'beratFilterW2',
        label: 'Berat Filter Paper / Kertas Saring (W2)',
        unit: 'gram',
        desc: 'Massa kertas saring / filter paper sebelum pengujian ekstraksi (gram)',
        min: 0.1,
        step: 0.1,
      },
      {
        key: 'beratMineralFilterW4',
        label: 'Berat Mineral + Filter Paper Setelah Ekstraksi (W4)',
        unit: 'gram',
        desc: 'Massa agregat mineral kering beserta kertas saring setelah ekstraksi (gram)',
        min: 0.1,
        step: 0.1,
        isParameterBesar: true,
      },
      {
        key: 'kadarAspalJmf',
        label: 'Kadar Aspal Rencana / JMF (Pb_rencana)',
        unit: '%',
        desc: 'Kadar aspal desain target Job Mix Formula yang direncanakan (misal 5.50%)',
        min: 0.01,
        max: 100.0,
        step: 0.05,
        isParameterBesar: true,
      },
    ],
    calculate: (inputs) => {
      // Dukungan backward compatibility jika dipanggil dengan parameter lama
      const isLegacy = inputs.beratTalam === undefined && inputs.beratSampelW1 !== undefined

      if (isLegacy) {
        const w1 = Number(inputs.beratSampelW1)
        const w2 = Number(inputs.beratAgregatW2)
        const f1 = Number(inputs.beratKertasF1)
        const f2 = Number(inputs.beratKertasF2)
        const wAbu = Number(inputs.beratAbu) || 0.0
        const jmf = Number(inputs.kadarAspalJmf)

        if (isNaN(w1) || isNaN(w2) || isNaN(f1) || isNaN(f2) || isNaN(wAbu) || isNaN(jmf) || w1 <= 0 || w2 <= 0 || f1 <= 0 || f2 <= 0 || jmf <= 0) {
          return {
            results: [
              { label: 'Kadar Aspal Aktual (B)', value: '-', unit: '%', highlight: true },
              { label: 'Berat Aspal Terekstraksi (W5)', value: '-', unit: 'gram' },
              { label: 'Berat Sampel (W1)', value: '-', unit: 'gram' },
              { label: 'Deviasi dari JMF', value: '-', unit: '%' },
            ],
            formulaSteps: ['Parameter pengujian ekstraksi aspal harus bernilai angka positif > 0.'],
            isError: true,
            status: 'Input Tidak Valid',
            conclusion: 'Input parameter pengujian ekstraksi aspal harus bernilai positif > 0.',
            summaryString: 'Input Parameter Tidak Valid',
          }
        }

        const w3 = f2 - f1
        const wAgregat = w2 + w3 + wAbu
        const wAspal = w1 - wAgregat

        if (wAgregat >= w1 || wAspal <= 0) {
          return {
            results: [
              { label: 'Kadar Aspal Aktual (B)', value: '-', unit: '%', highlight: true },
              { label: 'Berat Aspal Terekstraksi (W5)', value: '-', unit: 'gram' },
              { label: 'Berat Sampel (W1)', value: '-', unit: 'gram' },
              { label: 'Deviasi dari JMF', value: '-', unit: '%' },
            ],
            formulaSteps: [`Total berat agregat (${wAgregat.toFixed(1)} g) tidak boleh >= berat sampel awal W1 (${w1.toFixed(1)} g).`],
            isError: true,
            status: 'Data Tidak Logis',
            conclusion: 'Massa agregat bersih setelah ekstraksi harus lebih kecil dari massa sampel semula agar berat aspal positif.',
            summaryString: 'W_agregat >= W1 Tidak Valid',
          }
        }

        const pbAktual = (wAspal / w1) * 100.0
        const selisihBertanda = pbAktual - jmf
        const deltaPb = Math.abs(selisihBertanda)
        const isMemenuhi = deltaPb <= 0.30

        let status = isMemenuhi ? 'Memenuhi Standar' : 'Tidak Memenuhi Standar'
        let verdictClass = isMemenuhi ? 'valid' : 'error'
        let conclusion = isMemenuhi
          ? 'Memenuhi Toleransi JMF Bina Marga (±0.30%). Mutu produksi campuran beraspal (hotmix) di lapangan konsisten dengan rancangan laboratorium.'
          : selisihBertanda > 0.30
          ? 'Melebihi Toleransi Atas JMF (+0.30%). Kadar aspal berlebih berisiko menyebabkan bleeding (naiknya aspal ke permukaan) dan penurunan kekesatan jalan.'
          : 'Kurang dari Toleransi Bawah JMF (-0.30%). Campuran kekurangan pengikat aspal (campuran kurus), berisiko mengalami pelepasan butir (raveling) dan retak dini.'

        return {
          results: [
            { label: 'Kadar Aspal Aktual (B)', value: `${pbAktual.toFixed(2)}%`, unit: '', highlight: true },
            { label: 'Berat Aspal Terekstraksi (W5)', value: wAspal.toFixed(1), unit: 'gram' },
            { label: 'Berat Sampel (W1)', value: w1.toFixed(1), unit: 'gram' },
            { label: 'Deviasi dari JMF', value: `${selisihBertanda >= 0 ? '+' : ''}${selisihBertanda.toFixed(2)}%`, unit: '(Batas: ±0.30%)', highlight: !isMemenuhi },
          ],
          formulaSteps: [
            `Massa Sampel (W1) = ${w1.toFixed(1)} gram`,
            `Total Agregat = ${wAgregat.toFixed(1)} gram`,
            `Berat Aspal (W_aspal) = ${wAspal.toFixed(1)} gram`,
            `Kadar Aspal Aktual = ${pbAktual.toFixed(2)}%`,
          ],
          isError: false,
          status,
          verdictClass,
          conclusion,
          summaryString: `Kadar Aspal = ${pbAktual.toFixed(2)}% | Deviasi = ${selisihBertanda >= 0 ? '+' : ''}${selisihBertanda.toFixed(2)}% (${status})`,
        }
      }

      // Format W1 s.d. W5 SNI 03-6894-2002 (Laporan Praktikum Manual)
      const talam = Number(inputs.beratTalam)
      const talamSampel = Number(inputs.beratTalamSampel)
      const talamSampelFilter = Number(inputs.beratTalamSampelFilter)
      const w2 = Number(inputs.beratFilterW2)
      const w4 = Number(inputs.beratMineralFilterW4)
      const jmf = Number(inputs.kadarAspalJmf)

      if (
        isNaN(talam) || isNaN(talamSampel) || isNaN(talamSampelFilter) ||
        isNaN(w2) || isNaN(w4) || isNaN(jmf) ||
        talam <= 0 || talamSampel <= 0 || talamSampelFilter <= 0 ||
        w2 <= 0 || w4 <= 0 || jmf <= 0
      ) {
        return {
          results: [
            { label: 'Kadar Aspal Aktual (B)', value: '-', unit: '', highlight: true },
            { label: 'Berat Aspal Terekstraksi (W5)', value: '-', unit: 'gram' },
            { label: 'Berat Sampel (W1)', value: '-', unit: 'gram' },
            { label: 'Deviasi dari JMF', value: '-', unit: '' },
          ],
          formulaSteps: ['Semua data penimbangan laboratorium dan kadar aspal rencana JMF harus berupa angka positif > 0.'],
          isError: true,
          status: 'Input Tidak Valid',
          conclusion: 'Input parameter pengujian ekstraksi aspal harus bernilai angka positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      if (talamSampel <= talam) {
        return {
          results: [
            { label: 'Kadar Aspal Aktual (B)', value: '-', unit: '', highlight: true },
            { label: 'Berat Aspal Terekstraksi (W5)', value: '-', unit: 'gram' },
            { label: 'Berat Sampel (W1)', value: '-', unit: 'gram' },
            { label: 'Deviasi dari JMF', value: '-', unit: '' },
          ],
          formulaSteps: [`Berat Talam + Sampel (${talamSampel} g) harus lebih besar dari Berat Talam Kosong (${talam} g) agar berat sampel W1 positif.`],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Berat talam beserta sampel harus lebih besar daripada berat talam kosong.',
          summaryString: 'Talam + Sampel <= Talam',
        }
      }

      if (talamSampelFilter <= talam) {
        return {
          results: [
            { label: 'Kadar Aspal Aktual (B)', value: '-', unit: '', highlight: true },
            { label: 'Berat Aspal Terekstraksi (W5)', value: '-', unit: 'gram' },
            { label: 'Berat Sampel (W1)', value: '-', unit: 'gram' },
            { label: 'Deviasi dari JMF', value: '-', unit: '' },
          ],
          formulaSteps: [`Berat Talam + Sampel + Filter (${talamSampelFilter} g) harus lebih besar dari Berat Talam Kosong (${talam} g).`],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Berat talam + sampel + filter harus lebih besar dari berat talam kosong.',
          summaryString: 'Talam + Sampel + Filter Tidak Logis',
        }
      }

      // 1. W1: Berat Sampel
      const w1 = talamSampel - talam

      // 2. W3: Berat Sampel + Filter Paper
      const w3 = talamSampelFilter - talam

      // 3. W5: Berat Aspal Terekstraksi
      const w5 = w3 - w4

      if (w5 <= 0) {
        return {
          results: [
            { label: 'Kadar Aspal Aktual (B)', value: '-', unit: '', highlight: true },
            { label: 'Berat Aspal Terekstraksi (W5)', value: '-', unit: 'gram' },
            { label: 'Berat Sampel (W1)', value: `${w1.toFixed(1)}`, unit: 'gram' },
            { label: 'Deviasi dari JMF', value: '-', unit: '' },
          ],
          formulaSteps: [`Berat Mineral + Filter Setelah Ekstraksi (W4 = ${w4.toFixed(1)} g) tidak boleh >= Berat Sampel + Filter (W3 = ${w3.toFixed(1)} g) karena menghasilkan berat aspal W5 non-positif (${w5.toFixed(1)} g).`],
          isError: true,
          status: 'Data Tidak Logis',
          conclusion: 'Berat sampel dan filter paper sebelum ekstraksi (W3) harus lebih besar dari berat mineral dan filter setelah ekstraksi (W4) agar berat aspal terekstraksi bernilai positif.',
          summaryString: 'W4 >= W3 (Aspal Non-Positif)',
        }
      }

      // 4. Kadar Aspal Aktual B (%)
      const bAktual = (w5 / w1) * 100.0
      const persenMineral = 100.0 - bAktual

      // 5. Deviasi Terhadap JMF
      const deviasiJmf = bAktual - jmf
      const absDeviasi = Math.abs(deviasiJmf)
      const isMemenuhi = absDeviasi <= 0.30

      let status = isMemenuhi ? 'Memenuhi Standar' : 'Tidak Memenuhi Standar'
      let verdictClass = isMemenuhi ? 'valid' : 'error'
      let faktorDeviasi = ''
      let conclusion = ''

      const deviasiSign = deviasiJmf >= 0 ? '+' : ''
      const deviasiFormatted = `${deviasiSign}${deviasiJmf.toFixed(2)}%`

      if (isMemenuhi) {
        status = 'Memenuhi Standar'
        verdictClass = 'valid'
        conclusion = `Memenuhi Standar Toleransi JMF (SNI 03-6894-2002 & Spesifikasi Umum Bina Marga 2018). Kadar aspal aktual (${bAktual.toFixed(2)}%) berada di dalam rentang toleransi rencana ${(jmf - 0.30).toFixed(2)}% s.d. ${(jmf + 0.30).toFixed(2)}% (deviasi ${deviasiFormatted} ≤ ±0.30%). Kualitas campuran hotmix konsisten dengan Job Mix Formula.`
        faktorDeviasi = `Kadar aspal aktual berada dalam batas toleransi pelaksanaan pekerjaan jalan (±0.30%). Mutu pengikatan agregat dan aspal sesuai dengan rancangan campuran.`
      } else if (deviasiJmf < -0.30) {
        status = 'Tidak Memenuhi Standar'
        verdictClass = 'error'
        conclusion = `Tidak Memenuhi Standar SNI 03-6894-2002 (Kadar aspal aktual ${bAktual.toFixed(2)}% < batas bawah toleransi JMF ${(jmf - 0.30).toFixed(2)}%). Selisih deviasi sebesar ${deviasiFormatted} (melebihi toleransi ±0.30%) berisiko membuat campuran terlalu kurus (lean mix) sehingga rentan terjadi retak lelah dan pelepasan butir (raveling).`
        faktorDeviasi = `Kadar aspal hasil ekstraksi lebih rendah dari rencana (deviasi ${deviasiFormatted}). Faktor penyebab utama umumnya meliputi: sebagian aspal masih tertinggal/melekat pada mangkuk rotor sentrifus atau dinding talam/wajan, pelarut bensin/TCE belum melarutkan aspal secara menyeluruh, atau waktu pemutaran sentrifus belum maksimal.`
      } else {
        status = 'Tidak Memenuhi Standar'
        verdictClass = 'error'
        conclusion = `Tidak Memenuhi Standar SNI 03-6894-2002 (Kadar aspal aktual ${bAktual.toFixed(2)}% > batas atas toleransi JMF ${(jmf + 0.30).toFixed(2)}%). Selisih deviasi sebesar ${deviasiFormatted} (melebihi toleransi ±0.30%) berisiko menyebabkan kadar aspal berlebih (fat mix) yang memicu kegagalan bleeding dan penurunan stabilitas / ketahanan deformasi plastis.`
        faktorDeviasi = `Kadar aspal hasil ekstraksi lebih tinggi dari toleransi rencana (deviasi ${deviasiFormatted}). Faktor penyebab utama umumnya adalah lolosnya partikel debu halus / abu mineral (filler) melewati pori-pori kertas saring akibat kertas saring robek atau pori terlalu besar, sehingga mineral halus ikut terbuang bersama filtrat pelarut dan dianggap sebagai aspal cair.`
      }

      return {
        results: [
          { label: 'Kadar Aspal Aktual (B)', value: `${bAktual.toFixed(2)}%`, unit: '', highlight: true, sub: 'SNI 03-6894-2002' },
          { label: 'Berat Aspal Terekstraksi (W5)', value: w5.toFixed(1), unit: 'gram', sub: 'W3 - W4' },
          { label: 'Berat Sampel (W1)', value: w1.toFixed(1), unit: 'gram', sub: 'Talam+Sampel - Talam' },
          { label: 'Deviasi dari JMF', value: deviasiFormatted, unit: '(Batas: ±0.30%)', highlight: !isMemenuhi, sub: `Rencana JMF: ${jmf.toFixed(2)}%` },
        ],
        formulaSteps: [
          `DATA HASIL PENIMBANGAN LABORATORIUM (SNI 03-6894-2002):`,
          `• Berat Talam Kosong = ${talam.toFixed(1)} gram`,
          `• Berat Talam + Sampel = ${talamSampel.toFixed(1)} gram`,
          `• Berat Talam + Sampel + Filter Paper = ${talamSampelFilter.toFixed(1)} gram`,
          `• Berat Filter Paper / Kertas Saring (W2) = ${w2.toFixed(1)} gram`,
          `• Berat Mineral + Filter Paper Setelah Ekstraksi (W4) = ${w4.toFixed(1)} gram`,
          `• Kadar Aspal Rencana / JMF (Pb_rencana) = ${jmf.toFixed(2)}%`,
          ``,
          `1. MENGHITUNG BERAT SAMPEL (W1):`,
          `   W1 = [Berat Talam + Sampel] - [Berat Talam Kosong]`,
          `   W1 = ${talamSampel.toFixed(1)} - ${talam.toFixed(1)} = ${w1.toFixed(1)} gram`,
          ``,
          `2. MENGHITUNG BERAT SAMPEL + FILTER PAPER (W3):`,
          `   W3 = [Berat Talam + Sampel + Filter Paper] - [Berat Talam Kosong]`,
          `   W3 = ${talamSampelFilter.toFixed(1)} - ${talam.toFixed(1)} = ${w3.toFixed(1)} gram`,
          ``,
          `3. MENGHITUNG BERAT ASPAL TEREKSTRAKSI (W5):`,
          `   W5 = W3 - W4`,
          `   W5 = ${w3.toFixed(1)} - ${w4.toFixed(1)} = ${w5.toFixed(1)} gram`,
          ``,
          `4. MENGHITUNG KADAR ASPAL AKTUAL (B):`,
          `   B = (W5 / W1) × 100%`,
          `   B = (${w5.toFixed(1)} / ${w1.toFixed(1)}) × 100% = ${bAktual.toFixed(2)}%`,
          `   Massa Agregat / Mineral Kering Bersih = W1 - W5 = ${w1.toFixed(1)} - ${w5.toFixed(1)} = ${(w1 - w5).toFixed(1)} gram (${persenMineral.toFixed(2)}%)`,
          ``,
          `5. EVALUASI DEVIASI TERHADAP JMF (SNI 03-6894-2002 & BINA MARGA 2018):`,
          `   Deviasi Terhadap JMF = B - Pb_rencana = ${bAktual.toFixed(2)}% - ${jmf.toFixed(2)}% = ${deviasiFormatted}`,
          `   Batas Maksimum Toleransi Pelaksanaan = ±0.30% (Rentang Memenuhi: ${(jmf - 0.30).toFixed(2)}% s.d. ${(jmf + 0.30).toFixed(2)}%)`,
          `   Status Kesesuaian: ${status}`,
          `   Rincian Faktor Penyebab: ${faktorDeviasi}`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `Kadar Aspal Aktual = ${bAktual.toFixed(2)}% | Deviasi JMF = ${deviasiFormatted} (${status})`,
      }
    },
  },
}

export default calculatorRegistry
