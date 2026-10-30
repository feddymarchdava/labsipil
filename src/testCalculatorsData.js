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
          { id: 'bb-1-1', title: 'Berat Jenis & Penyerapan Air', standard: 'SNI 1970:2008' },
          { id: 'bb-1-2', title: 'Kadar Air Agregat Halus', standard: 'SNI 1971:2011' },
          { id: 'bb-1-3', title: 'Kandungan Lumpur & Organik', standard: 'SNI 03-4142-1996' },
          { id: 'bb-1-4', title: 'Bobot Isi & Rongga Udara', standard: 'SNI 03-4804-1998' },
          { id: 'bb-1-5', title: 'Gradasi Agregat Halus', standard: 'SNI 03-1968-1990' },
        ],
      },
      {
        chapterId: 'bb-bab2',
        title: 'Bab 2: Agregat Kasar',
        items: [
          { id: 'bb-2-1', title: 'Berat Jenis & Penyerapan Air Kasar', standard: 'SNI 1969:2008' },
          { id: 'bb-2-2', title: 'Kadar Air Agregat Kasar', standard: 'SNI 1971:2011' },
          { id: 'bb-2-3', title: 'Kandungan Lumpur Kasar', standard: 'SNI 03-4142-1996' },
          { id: 'bb-2-4', title: 'Bobot Isi & Rongga Udara Kasar', standard: 'SNI 03-4804-1998' },
          { id: 'bb-2-5', title: 'Gradasi Agregat Kasar', standard: 'SNI 03-1968-1990' },
          { id: 'bb-2-6', title: 'Keausan Los Angeles', standard: 'SNI 2417:2008' },
        ],
      },
      {
        chapterId: 'bb-bab3',
        title: 'Bab 3: Beton',
        items: [
          { id: 'bb-3-1', title: 'Uji Slump Beton', standard: 'SNI 1972:2008' },
          { id: 'bb-3-2', title: 'Kuat Tekan Beton', standard: 'SNI 1974:2011' },
          { id: 'bb-3-3', title: 'Kuat Lentur Beton', standard: 'SNI 4154:2014' },
        ],
      },
      {
        chapterId: 'bb-bab4',
        title: 'Bab 4: Kayu',
        items: [
          { id: 'bb-4-1', title: 'Kadar Air Kayu', standard: 'ASTM D2395-17' },
          { id: 'bb-4-2', title: 'Kerapatan Kayu', standard: 'ASTM D2395-17' },
          { id: 'bb-4-3', title: 'Berat Jenis Kayu', standard: 'ASTM D2395-17' },
          { id: 'bb-4-4', title: 'Kuat Lentur Kayu', standard: 'SNI 7973:2013' },
        ],
      },
      {
        chapterId: 'bb-bab5',
        title: 'Bab 5: Baja',
        items: [
          { id: 'bb-5-1', title: 'Kuat Tarik Baja', standard: 'SNI 8369:2017' },
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
          { id: 'mt-1-2', title: 'Pengeboran Tanah / Boring', standard: 'SNI 8460:2017' },
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
          { id: 'mt-3-2', title: 'Sand Cone Lapangan', standard: 'SNI 2828:2011' },
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
          { id: 'mf-1-1', title: 'Sifat Fluida (Densitas, Viskositas, Archimedes, SG)', standard: 'ASTM D1475 / ASTM D445 / SNI ISO 2811' },
        ],
      },
      {
        chapterId: 'mf-bab2',
        title: 'Bab 2: Osborne Reynolds',
        items: [
          { id: 'mf-2-1', title: 'Bilangan Osborne Reynolds', standard: 'ASTM D5242' },
        ],
      },
      {
        chapterId: 'mf-bab3',
        title: 'Bab 3: Flow Measurement (Venturi & Orifice)',
        items: [
          { id: 'mf-3-1', title: 'Flow Measurement (Venturi & Orifice)', standard: 'SNI 03-2414-1991 / ASTM D5242' },
        ],
      },
      {
        chapterId: 'mf-bab4',
        title: 'Bab 4: Aliran Ambang Tajam (Sharp Crested Weir)',
        items: [
          { id: 'mf-4-1', title: 'Aliran Ambang Tajam (Sharp Crested Weir)', standard: 'ASTM D5242 / SNI 03-2414-1991' },
        ],
      },
      {
        chapterId: 'mf-bab5',
        title: 'Bab 5: Kalibrasi Flowmeter',
        items: [
          { id: 'mf-5-1', title: 'Kalibrasi Flowmeter & Akurasi Debit', standard: 'Standar Kalibrasi Hidraulika' },
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

// =========================================================================
// REGISTRY PARAMETER & RUMUS PERHITUNGAN UNTUK 31 MODUL PENGUJIAN
// =========================================================================
export const calculatorRegistry = {
  // -----------------------------------------------------------------------
  // BAB I: AGREGAT HALUS
  // -----------------------------------------------------------------------
  'bb-1-1': {
    id: 'bb-1-1',
    code: 'BJ-01',
    name: 'Pengujian Berat Jenis & Penyerapan Air Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 1970:2008',
    desc: 'Menghitung Berat Jenis Curah Kering (Sd), Berat Jenis Curah SSD (Ss), Berat Jenis Semu (Sa), dan Penyerapan Air (Sw) agregat halus/pasir.',
    initialInputs: {
      a: 490.5,
      b: 685.0,
      s: 500.0,
      c: 994.2,
    },
    fields: [
      { key: 'a', label: 'Berat Benda Uji Kering Oven (A)', unit: 'gram', desc: 'Massa contoh pasir kering oven setelah dikeringkan pada suhu (110 ± 5)°C sampai berat tetap', min: 0 },
      { key: 'b', label: 'Berat Piknometer Berisi Air (B)', unit: 'gram', desc: 'Massa piknometer diisi air murni sampai tanda batas tera pada suhu 25°C', min: 0 },
      { key: 's', label: 'Berat Benda Uji Kondisi SSD (S)', unit: 'gram', desc: 'Massa contoh pasir dalam kondisi jenuh kering permukaan (SSD standar 500 gr)', min: 0 },
      { key: 'c', label: 'Berat Piknometer + Benda Uji SSD + Air (C)', unit: 'gram', desc: 'Massa total piknometer berisi benda uji SSD dan air sampai tanda batas tera', min: 0 },
    ],
    calculate: (inputs) => {
      const a = Number(inputs.a ?? inputs.bk ?? 0)
      const b = Number(inputs.b ?? 0)
      const s = Number(inputs.s ?? 500)
      const c = Number(inputs.c ?? inputs.bt ?? 0)

      // 1. Validasi nilai input non-positif
      if (a <= 0 || b <= 0 || s <= 0 || c <= 0) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Curah SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter massa (A, B, S, C) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian tidak boleh bernilai 0 atau negatif. Silakan lengkapi data pembacaan timbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Validasi hubungan massa fisik (Weight Relationships)
      // C tidak boleh <= B (Piknometer + pasir + air pasti lebih berat dari piknometer + air saja)
      if (c <= b) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Curah SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: C (${c} gr) ≤ B (${b} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Nilai C (${c} gr) tidak boleh lebih kecil atau sama dengan B (${b} gr). Piknometer berisi pasir dan air pasti lebih berat daripada piknometer berisi air saja.`,
          summaryString: 'Input Tidak Logis (C ≤ B)',
        }
      }

      // A tidak boleh > S (Berat kering oven tidak boleh melebihi kondisi SSD)
      if (a > s) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Curah SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: A (${a} gr) > S (${s} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat kering oven A (${a} gr) tidak boleh melebihi berat kondisi SSD S (${s} gr). Pengeringan oven mengurangi atau menyamakan massa sampel.`,
          summaryString: 'Input Tidak Logis (A > S)',
        }
      }

      const denom = b + s - c
      const denomApp = b + a - c

      // Batas fisis volume air yang terdesak (Penyebut harus > 0)
      if (denom <= 0 || denomApp <= 0) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Curah SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Penyebut volume air terdesak (B + S - C) = ${b} + ${s} - ${c} = ${denom.toFixed(2)} [<= 0, TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Nilai C (${c} gr) melampaui batas fisis kapasitas piknometer (B + S = ${(b + s).toFixed(1)} gr). Periksa kembali penimbangan piknometer.`,
          summaryString: 'Input Tidak Logis (Penyebut <= 0)',
        }
      }

      const sd = a / denom
      const ss = s / denom
      const sa = a / denomApp
      const sw = ((s - a) / a) * 100

      // Batasan standar spesifikasi teknis SNI 1970:2008:
      // - Berat Jenis Curah Kering (Sd): 2.50 - 2.70
      // - Penyerapan Air (Sw): Maksimal 3.0%
      const isSdOk = sd >= 2.50 && sd <= 2.70
      const isSwOk = sw >= 0 && sw <= 3.00
      const isValid = isSdOk && isSwOk

      return {
        results: [
          { label: 'Berat Jenis Curah Kering (Sd)', value: sd.toFixed(3), unit: '', highlight: true },
          { label: 'Berat Jenis Curah SSD (Ss)', value: ss.toFixed(3), unit: '' },
          { label: 'Berat Jenis Semu (Sa)', value: sa.toFixed(3), unit: '' },
          { label: 'Penyerapan Air (Sw)', value: sw.toFixed(2), unit: '%', highlight: true },
        ],
        formulaSteps: [
          `Berat Jenis Curah Kering (Sd) = A / (B + S - C) = ${a} / (${b} + ${s} - ${c}) = ${sd.toFixed(3)}`,
          `Berat Jenis Curah SSD (Ss) = S / (B + S - C) = ${s} / (${b} + ${s} - ${c}) = ${ss.toFixed(3)}`,
          `Berat Jenis Semu (Sa) = A / (B + A - C) = ${a} / (${b} + ${a} - ${c}) = ${sa.toFixed(3)}`,
          `Penyerapan Air (Sw) = ((S - A) / A) * 100% = ((${s} - ${a}) / ${a}) * 100% = ${sw.toFixed(2)}%`,
        ],
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Memenuhi spesifikasi SNI 1970:2008 (Berat Jenis Curah Kering Sd = ${sd.toFixed(3)} [standar 2.50 - 2.70] dan Penyerapan Air Sw = ${sw.toFixed(2)}% [maks 3.0%]). Agregat halus layak digunakan untuk campuran beton struktural.`
          : `Penyerapan Air Sw (${sw.toFixed(2)}%) atau BJ Curah Kering Sd (${sd.toFixed(3)}) berada di luar rentang standar SNI 1970:2008 (syarat teknis: Sd 2.50 - 2.70 dan Sw ≤ 3.0%).`,
        summaryString: `Sd = ${sd.toFixed(3)}, Ss = ${ss.toFixed(3)}, Sa = ${sa.toFixed(3)}, Sw = ${sw.toFixed(2)}% (${isValid ? 'Memenuhi SNI 1970:2008' : 'Perlu Evaluasi'})`,
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
    desc: 'Menghitung persentase kandungan air bebas yang terkandung di dalam pori dan permukaan butiran pasir.',
    initialInputs: {
      w1: 25.4,
      w2: 135.8,
      w3: 131.2,
    },
    fields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan / wadah timbang bersih', min: 0 },
      { key: 'w2', label: 'Berat Cawan + Contoh Pasir Basah (W2)', unit: 'gram', desc: 'Massa sebelum dimasukkan ke dalam oven', min: 0 },
      { key: 'w3', label: 'Berat Cawan + Contoh Pasir Kering (W3)', unit: 'gram', desc: 'Massa setelah dikeringkan oven 110°C konstan', min: 0 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.w1 || 0)
      const w2 = Number(inputs.w2 || 0)
      const w3 = Number(inputs.w3 || 0)

      // 1. Validasi input massa non-positif
      if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
        return {
          results: [
            { label: 'Berat Air Teruapkan (W2 - W3)', value: '-', unit: 'gram' },
            { label: 'Berat Contoh Pasir Kering (W3 - W1)', value: '-', unit: 'gram' },
            { label: 'Kadar Air Agregat (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter massa (W1, W2, W3) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter penimbangan tidak boleh 0 atau negatif. Silakan lengkapi pembacaan timbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Validasi hubungan massa fisik (Weight Relationships)
      // W2 harus > W1 dan W3 harus > W1
      if (w2 <= w1 || w3 <= w1) {
        return {
          results: [
            { label: 'Berat Air Teruapkan (W2 - W3)', value: '-', unit: 'gram' },
            { label: 'Berat Contoh Pasir Kering (W3 - W1)', value: '-', unit: 'gram' },
            { label: 'Kadar Air Agregat (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) atau W3 (${w3} gr) ≤ W1 (${w1} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat cawan + pasir (W2 = ${w2} gr, W3 = ${w3} gr) harus lebih besar dari berat cawan kosong (W1 = ${w1} gr).`,
          summaryString: 'Input Tidak Logis (W2/W3 ≤ W1)',
        }
      }

      // W2 harus >= W3 (Pasir basah sebelum oven tidak boleh lebih ringan dari pasir setelah dikeringkan)
      if (w2 < w3) {
        return {
          results: [
            { label: 'Berat Air Teruapkan (W2 - W3)', value: '-', unit: 'gram' },
            { label: 'Berat Contoh Pasir Kering (W3 - W1)', value: '-', unit: 'gram' },
            { label: 'Kadar Air Agregat (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) < W3 (${w3} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: W2 (${w2} gr) tidak boleh lebih kecil dari W3 (${w3} gr). Sampel pasir basah sebelum di-oven tidak boleh lebih ringan daripada setelah dikeringkan.`,
          summaryString: 'Input Tidak Logis (W2 < W3)',
        }
      }

      const waterWeight = w2 - w3
      const dryWeight = w3 - w1
      if (dryWeight <= 0) {
        return {
          results: [
            { label: 'Berat Air Teruapkan (W2 - W3)', value: waterWeight.toFixed(2), unit: 'gram' },
            { label: 'Berat Contoh Pasir Kering (W3 - W1)', value: '0.00', unit: 'gram' },
            { label: 'Kadar Air Agregat (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Berat pasir kering (W3 - W1) harus lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Berat pasir kering oven (W3 - W1) bernilai 0. Periksa kembali penimbangan sampel.',
          summaryString: 'Berat Kering Oven = 0',
        }
      }

      const moisture = (waterWeight / dryWeight) * 100

      // Evaluasi Standar SNI 1971:2011:
      // - Jika hasil > 15%, ubah status menjadi "Input Tidak Wajar / Cek Kembali Data" dengan warna merah.
      // - Jika > 10% dan <= 15%, status "Perlu Evaluasi" (kuning).
      // - Jika <= 10%, status "Valid" (hijau).
      if (moisture > 15.0) {
        return {
          results: [
            { label: 'Berat Air Teruapkan (W2 - W3)', value: waterWeight.toFixed(2), unit: 'gram' },
            { label: 'Berat Contoh Pasir Kering (W3 - W1)', value: dryWeight.toFixed(2), unit: 'gram' },
            { label: 'Kadar Air Agregat (w)', value: moisture.toFixed(2), unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Berat Air = W2 - W3 = ${w2} - ${w3} = ${waterWeight.toFixed(2)} gr`,
            `Berat Pasir Kering = W3 - W1 = ${w3} - ${w1} = ${dryWeight.toFixed(2)} gr`,
            `Kadar Air (w) = (Berat Air / Berat Pasir Kering) × 100% = (${waterWeight.toFixed(2)} / ${dryWeight.toFixed(2)}) × 100% = ${moisture.toFixed(2)}%`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Kadar air agregat sebesar ${moisture.toFixed(2)}% (> 15.0%) tergolong nilai ekstrem yang tidak wajar untuk pasir normal di laboratorium/lapangan. Periksa kembali pembacaan timbangan atau kondisi sampel basah.`,
          summaryString: `Kadar Air = ${moisture.toFixed(2)}% (Input Tidak Wajar > 15%)`,
        }
      }

      const isMoistureHigh = moisture > 10.0
      const status = isMoistureHigh ? 'Perlu Evaluasi' : 'Valid'
      const conclusion = isMoistureHigh
        ? `Kadar air pasir sebesar ${moisture.toFixed(2)}% berada di atas rata-rata normal (rentang umum: 3% - 10%). Diperlukan koreksi volume air pencampur beton yang signifikan pada mix design.`
        : `Kadar air pasir sebesar ${moisture.toFixed(2)}% memenuhi batas normal SNI 1971:2011 (≤ 10.0%). Data valid dan siap digunakan sebagai faktor koreksi air pencampur beton.`

      return {
        results: [
          { label: 'Berat Air Teruapkan (W2 - W3)', value: waterWeight.toFixed(2), unit: 'gram' },
          { label: 'Berat Contoh Pasir Kering (W3 - W1)', value: dryWeight.toFixed(2), unit: 'gram' },
          { label: 'Kadar Air Agregat (w)', value: moisture.toFixed(2), unit: '%', highlight: true },
        ],
        formulaSteps: [
          `Berat Air = W2 - W3 = ${w2} - ${w3} = ${waterWeight.toFixed(2)} gr`,
          `Berat Pasir Kering = W3 - W1 = ${w3} - ${w1} = ${dryWeight.toFixed(2)} gr`,
          `Kadar Air (w) = (Berat Air / Berat Pasir Kering) × 100% = (${waterWeight.toFixed(2)} / ${dryWeight.toFixed(2)}) × 100% = ${moisture.toFixed(2)}%`,
        ],
        isError: false,
        status,
        conclusion,
        summaryString: `Kadar Air (w) = ${moisture.toFixed(2)}% (${status === 'Valid' ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
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
    desc: 'Menentukan persentase partikel lolos ayakan No. 200 (lumpur pencucian) dan kejernihan larutan NaOH terhadap zat organik.',
    initialInputs: {
      w1: 500.0,
      w2: 486.5,
      organikScale: 2,
    },
    fields: [
      { key: 'w1', label: 'Berat Contoh Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa pasir kering oven mula-mula', min: 0 },
      { key: 'w2', label: 'Berat Contoh Kering Tertahan Ayakan #200 (W2)', unit: 'gram', desc: 'Massa pasir kering oven setelah dicuci bersih pada ayakan 0.075 mm', min: 0 },
      { key: 'organikScale', label: 'Warna Larutan Organik (Skala Standar Gardner 1 - 5)', unit: 'Skala', desc: '1=Sangat jernih, 2=Kuning muda, 3=Standar acuan, 4=Cokelat, 5=Cokelat tua', min: 1, max: 5, step: 1 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.w1 || 0)
      const w2 = Number(inputs.w2 || 0)
      const rawScale = inputs.organikScale !== undefined ? inputs.organikScale : 2
      const scale = Number(rawScale)

      // 1. Validasi massa awal W1
      if (w1 <= 0 || w2 < 0) {
        return {
          results: [
            { label: 'Kandungan Lumpur Pasir', value: '-', unit: '%', highlight: true },
            { label: 'Skala Warna Organik NaOH', value: '-', unit: 'Gardner', highlight: true },
            { label: 'Batas Maksimal Lumpur SNI', value: '5.00', unit: '%' },
          ],
          formulaSteps: ['Massa pasir kering awal (W1) harus bernilai lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Massa contoh pasir kering sebelum dicuci (W1) harus lebih besar dari 0 gram.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Validasi hubungan massa fisik: W2 tidak boleh > W1
      if (w2 > w1) {
        return {
          results: [
            { label: 'Kandungan Lumpur Pasir', value: '-', unit: '%', highlight: true },
            { label: 'Skala Warna Organik NaOH', value: `No. ${scale}`, unit: 'Gardner', highlight: true },
            { label: 'Batas Maksimal Lumpur SNI', value: '5.00', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) > W1 (${w1} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: W2 (${w2} gr) tidak boleh lebih besar dari W1 (${w1} gr). Contoh pasir setelah pencucian lumpur tidak mungkin bertambah berat.`,
          summaryString: 'Input Tidak Logis (W2 > W1)',
        }
      }

      // 3. Validasi input skala organik: Harus integer dan bernilai 1 - 5
      const isScaleInteger = Number.isInteger(scale)
      const isScaleInRange = scale >= 1 && scale <= 5
      if (!isScaleInteger || !isScaleInRange) {
        return {
          results: [
            { label: 'Kandungan Lumpur Pasir', value: '-', unit: '%', highlight: true },
            { label: 'Skala Warna Organik NaOH', value: `${rawScale} (Tidak Valid)`, unit: 'Gardner', highlight: true },
            { label: 'Batas Maksimal Lumpur SNI', value: '5.00', unit: '%' },
          ],
          formulaSteps: [
            `Validasi Skala Organik: ${rawScale} tidak memenuhi syarat integer 1 - 5`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Skala warna zat organik harus berupa bilangan bulat (integer) bernilai antara 1 sampai 5 sesuai standar pelat warna Gardner / SNI 2816:2014.',
          summaryString: 'Skala Organik Tidak Valid (Harus 1-5)',
        }
      }

      const lumpurLoss = w1 - w2
      const lumpurPct = (lumpurLoss / w1) * 100
      const isLumpurOk = lumpurPct <= 5.0
      const isOrganikOk = scale <= 3
      const isValid = isLumpurOk && isOrganikOk

      return {
        results: [
          { label: 'Kandungan Lumpur Pasir', value: lumpurPct.toFixed(2), unit: '%', highlight: true },
          { label: 'Skala Warna Organik NaOH', value: `No. ${scale}`, unit: 'Gardner', highlight: true },
          { label: 'Batas Maksimal Lumpur SNI', value: '5.00', unit: '%' },
        ],
        formulaSteps: [
          `Kehilangan Akibat Cuci = W1 - W2 = ${w1} - ${w2} = ${lumpurLoss.toFixed(2)} gr`,
          `Kadar Lumpur = ((W1 - W2) / W1) × 100% = (${lumpurLoss.toFixed(2)} / ${w1}) × 100% = ${lumpurPct.toFixed(2)}%`,
          `Evaluasi Warna Zat Organik = Skala No. ${scale} (Standar batas aman: Plat No. 1 - 3)`,
        ],
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Kadar lumpur ${lumpurPct.toFixed(2)}% (≤ 5.0%) dan warna zat organik pelat No. ${scale} (≤ No. 3). Pasir bersih dan memenuhi syarat SNI 03-4142-1996 / SNI 2816:2014 untuk beton struktural.`
          : `Kadar lumpur (${lumpurPct.toFixed(2)}%) atau zat organik (No. ${scale}) melebihi batas toleransi SNI (syarat standar: kadar lumpur ≤ 5.0% dan zat organik ≤ pelat No. 3). Agregat harus dicuci ulang sebelum digunakan.`,
        summaryString: `Lumpur = ${lumpurPct.toFixed(2)}%, Organik No. ${scale} (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
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
    desc: 'Menghitung berat per satuan volume pasir dalam kondisi lepas dan padat/tumbuk serta rongga udara di antaranya.',
    initialInputs: {
      wBejana: 3.25,
      vol: 3.00,
      volUnit: 'liter',
      wLepas: 7.60,
      wPadat: 8.20,
      bjBulk: 2.57,
    },
    fields: [
      { key: 'wBejana', label: 'Berat Bejana Takaran (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0 },
      { 
        key: 'vol', 
        label: 'Volume Bejana Takaran (V)', 
        unit: 'liter',
        unitKey: 'volUnit',
        unitOptions: [
          { value: 'liter', label: 'liter' },
          { value: 'm3', label: 'm³' }
        ],
        desc: 'Volume terukur wadah silinder logam', 
        min: 0.000001,
        step: 'any'
      },
      { key: 'wLepas', label: 'Berat Bejana + Pasir Kondisi Lepas (W2)', unit: 'kg', desc: 'Pasir dituang bebas dengan corong tanpa pemadatan', min: 0 },
      { key: 'wPadat', label: 'Berat Bejana + Pasir Kondisi Padat (W3)', unit: 'kg', desc: 'Pasir dipadatkan dengan penusukan 25 kali tiap lapisan', min: 0 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Pasir (BJ)', unit: '', desc: 'Data berat jenis curah (bulk sp. gr)', min: 0.1 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.wBejana || 0)
      const rawV = Number(inputs.vol || 0)
      const volUnit = inputs.volUnit || 'liter'
      const w2 = Number(inputs.wLepas || 0)
      const w3 = Number(inputs.wPadat || 0)
      const bj = Number(inputs.bjBulk || 0)

      // Konversi otomatis volume ke liter jika pengguna memilih satuan m³:
      // 1 m³ = 1000 liter
      const v = volUnit === 'm3' ? rawV * 1000 : rawV

      // 1. Validasi Volume: Cegah Volume <= 0
      if (rawV <= 0) {
        return {
          results: [
            { label: 'Bobot Isi Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Kondisi Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Kondisi Padat', value: '-', unit: '%' },
          ],
          formulaSteps: [`Volume bejana takaran (V) harus lebih besar dari 0 ${volUnit === 'm3' ? 'm³' : 'liter'}.`],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Volume harus lebih besar dari 0. Periksa kapasitas volume bejana takaran kalibrasi.',
          summaryString: 'Volume Bejana Tak Valid (<= 0)',
        }
      }

      // Validasi nilai massa dan BJ
      if (w1 <= 0 || w2 <= 0 || w3 <= 0 || bj <= 0) {
        return {
          results: [
            { label: 'Bobot Isi Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Kondisi Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Kondisi Padat', value: '-', unit: '%' },
          ],
          formulaSteps: ['Semua parameter massa (W1, W2, W3) dan Berat Jenis (BJ) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter bobot isi tidak boleh bernilai 0 atau negatif. Silakan lengkapi data penimbangan.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Validasi hubungan massa fisik:
      // W2 > W1, W3 > W1, dan W3 >= W2
      if (w2 <= w1 || w3 <= w1) {
        return {
          results: [
            { label: 'Bobot Isi Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Kondisi Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Kondisi Padat', value: '-', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} kg) atau W3 (${w3} kg) ≤ W1 (${w1} kg) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat bejana + pasir (W2 = ${w2} kg, W3 = ${w3} kg) harus lebih besar dari berat bejana kosong W1 (${w1} kg).`,
          summaryString: 'Input Tidak Logis (W2/W3 ≤ W1)',
        }
      }

      if (w3 < w2) {
        return {
          results: [
            { label: 'Bobot Isi Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Kondisi Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Kondisi Padat', value: '-', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: Kondisi padat W3 (${w3} kg) < kondisi lepas W2 (${w2} kg) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat bejana + pasir kondisi padat W3 (${w3} kg) tidak boleh lebih ringan dari kondisi lepas W2 (${w2} kg). Pemadatan seharusnya meningkatkan kerapatan massa.`,
          summaryString: 'Input Tidak Logis (W3 < W2)',
        }
      }

      const biLepas = (w2 - w1) / v
      const biPadat = (w3 - w1) / v

      // Rongga udara (%) = (1 - (BI / BJ)) * 100%
      const ronggaLepas = (1 - (biLepas / bj)) * 100
      const ronggaPadat = (1 - (biPadat / bj)) * 100

      const isM3 = volUnit === 'm3'
      const conversionStep = isM3
        ? `Konversi Satuan Volume: V = ${rawV} m³ × 1000 = ${v} liter`
        : null

      // Validasi anomali rongga udara ekstrem (misal mendekati 100% atau negatif)
      if (ronggaPadat >= 90.0 || ronggaPadat <= 0.0) {
        return {
          results: [
            { label: 'Bobot Isi Lepas', value: biLepas.toFixed(3), unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Padat', value: biPadat.toFixed(3), unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Kondisi Lepas', value: ronggaLepas.toFixed(2), unit: '%' },
            { label: 'Rongga Udara Kondisi Padat', value: ronggaPadat.toFixed(2), unit: '%' },
          ],
          formulaSteps: [
            ...(conversionStep ? [conversionStep] : []),
            `Bobot Isi Padat = (W3 - W1) / V = (${w3} - ${w1}) / ${v} = ${biPadat.toFixed(3)} kg/L`,
            `Rongga Udara Padat = (1 - (BI Padat / BJ)) × 100% = ${ronggaPadat.toFixed(2)}% [EKSTREM/TIDAK WAJAR]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Hasil perhitungan rongga udara (${ronggaPadat.toFixed(2)}%) tidak wajar. Jangan gunakan data ini untuk analisis campuran beton. Periksa kembali pembacaan timbangan atau berat jenis curah (BJ).`,
          summaryString: `Rongga Udara Tidak Wajar (${ronggaPadat.toFixed(1)}%)`,
        }
      }

      // Standar SNI 03-4804-1998:
      // - Bobot Isi Pasir: 1.2 kg/L - 1.7 kg/L (1.20 <= BI <= 1.70)
      // - Rongga Udara: 30% - 45% (30.0 <= Rongga <= 45.0)
      const isBiOk = biPadat >= 1.20 && biPadat <= 1.70
      const isRonggaOk = ronggaPadat >= 30.0 && ronggaPadat <= 45.0
      const isValid = isBiOk && isRonggaOk

      return {
        results: [
          { label: 'Bobot Isi Lepas', value: biLepas.toFixed(3), unit: 'kg/L', highlight: true },
          { label: 'Bobot Isi Padat', value: biPadat.toFixed(3), unit: 'kg/L', highlight: true },
          { label: 'Rongga Udara Kondisi Lepas', value: ronggaLepas.toFixed(2), unit: '%' },
          { label: 'Rongga Udara Kondisi Padat', value: ronggaPadat.toFixed(2), unit: '%' },
        ],
        formulaSteps: [
          ...(conversionStep ? [conversionStep] : []),
          `Bobot Isi Lepas = (W2 - W1) / V = (${w2} - ${w1}) / ${v} = ${biLepas.toFixed(3)} kg/L (${(biLepas * 1000).toFixed(0)} kg/m³)`,
          `Bobot Isi Padat = (W3 - W1) / V = (${w3} - ${w1}) / ${v} = ${biPadat.toFixed(3)} kg/L (${(biPadat * 1000).toFixed(0)} kg/m³)`,
          `Rongga Udara Lepas = (1 - (BI Lepas / BJ)) × 100% = (1 - (${biLepas.toFixed(3)} / ${bj})) × 100% = ${ronggaLepas.toFixed(2)}%`,
          `Rongga Udara Padat = (1 - (BI Padat / BJ)) × 100% = (1 - (${biPadat.toFixed(3)} / ${bj})) × 100% = ${ronggaPadat.toFixed(2)}%`,
        ],
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Bobot isi pasir padat sebesar ${biPadat.toFixed(3)} kg/L (standar: 1.20 - 1.70 kg/L) dengan rongga udara ${ronggaPadat.toFixed(2)}% (standar: 30% - 45%). Memenuhi spesifikasi teknis SNI 03-4804-1998.`
          : `Bobot isi pasir padat (${biPadat.toFixed(3)} kg/L) atau rongga udara (${ronggaPadat.toFixed(2)}%) berada di luar rentang standar SNI 03-4804-1998 (syarat teknis: BI 1.20 - 1.70 kg/L dan Rongga 30% - 45%).`,
        summaryString: `BI Padat = ${biPadat.toFixed(2)} kg/L, Rongga = ${ronggaPadat.toFixed(1)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-1-5': {
    id: 'bb-1-5',
    code: 'GR-01',
    name: 'Analisis Gradasi & Modulus Kehalusan Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 03-1968-1990',
    desc: 'Pemetaan distribusi butiran pasir dan perhitungan Fineness Modulus (FM) untuk klasifikasi zona gradasi.',
    hasDynamicSieveTable: true,
    isCoarse: false,
    initialInputs: {
      sieves: [
        { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weight: 0 },
        { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weight: 20 },
        { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weight: 60 },
        { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weight: 110 },
        { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weight: 140 },
        { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weight: 100 },
        { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weight: 50 },
        { id: 8, size: 0,     label: 'Pan Penampung',     weight: 20, isPan: true },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      // 1. Ekstraksi data saringan dinamis (dengan fallback data statis lama jika ada)
      const rawSieves = Array.isArray(inputs.sieves) && inputs.sieves.length > 0
        ? inputs.sieves
        : [
            { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weight: Number(inputs.s95 || 0) },
            { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weight: Number(inputs.s475 || 20) },
            { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weight: Number(inputs.s236 || 60) },
            { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weight: Number(inputs.s118 || 110) },
            { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weight: Number(inputs.s060 || 140) },
            { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weight: Number(inputs.s030 || 100) },
            { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weight: Number(inputs.s015 || 50) },
            { id: 8, size: 0,     label: 'Pan Penampung',     weight: Number(inputs.pan || 20), isPan: true },
          ]

      const nonPanSieves = rawSieves.filter(
        (s) => !s.isPan && Number(s.size) > 0 && !String(s.label || '').toLowerCase().includes('pan')
      )

      if (nonPanSieves.length === 0) {
        return {
          results: [
            { label: 'Total Massa Contoh', value: '-', unit: 'gram' },
            { label: 'Fineness Modulus (FM)', value: '-', unit: '', highlight: true },
            { label: 'Klasifikasi Zona Ayakan', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: ['Minimal harus ada 1 ukuran saringan selain Pan Penampung.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Minimal harus ada 1 ukuran saringan yang digunakan untuk pengujian gradasi.',
          summaryString: 'Saringan Kosong',
        }
      }

      // Validasi: Cek jika ada input massa negatif
      const hasNegative = rawSieves.some((s) => {
        const w = s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0
        return w < 0
      })
      if (hasNegative) {
        return {
          results: [
            { label: 'Total Massa Contoh', value: '-', unit: 'gram' },
            { label: 'Fineness Modulus (FM)', value: '-', unit: '', highlight: true },
            { label: 'Klasifikasi Zona Ayakan', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Pembacaan massa tertahan ayakan tidak boleh bernilai minus.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input data tidak logis: Pembacaan massa tertahan ayakan tidak boleh bernilai negatif.',
          summaryString: 'Input Massa Ayakan Negatif',
        }
      }

      // Total berat seluruh fraksi termasuk Pan (ΣW)
      const total = rawSieves.reduce((sum, s) => {
        const w = s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0
        return sum + w
      }, 0)

      if (total <= 0) {
        return {
          results: [
            { label: 'Total Massa Contoh', value: '0.0', unit: 'gram' },
            { label: 'Fineness Modulus (FM)', value: '-', unit: '', highlight: true },
            { label: 'Klasifikasi Zona Ayakan', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: ['Total berat benda uji pasir harus lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Total berat tertahan pada ayakan harus lebih besar dari 0 gram. Silakan masukkan data penimbangan fraksi ayakan.',
          summaryString: 'Data Ayakan Kosong (0 gr)',
        }
      }

      // 2. Simulasi Pengayakan Fisik: Urutkan ayakan dari ukuran terbesar ke terkecil (Descending)
      const sortedDesc = [...nonPanSieves].sort((a, b) => Number(b.size) - Number(a.size))

      let cumulative = 0
      const sieveCalculations = sortedDesc.map((s) => {
        const w = s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0
        cumulative += w
        const cumRetainedPct = (cumulative / total) * 100
        // Rumus Persen Lolos Kumulatif: ((Total Berat - Berat Tertahan Kumulatif) / Total Berat) * 100
        const cumPassingPct = Math.max(0, Math.min(100, ((total - cumulative) / total) * 100))
        return {
          ...s,
          size: Number(s.size),
          weight: w,
          cumRetained: cumulative,
          cumRetainedPct,
          cumPassingPct,
          cumPassingRounded: Number(cumPassingPct.toFixed(1)),
        }
      })

      // Hitung Fineness Modulus (FM) berdasarkan ayakan standar SNI / ASTM:
      // Standar seri ayakan pasir: [9.5 mm, 4.75 mm, 2.36 mm, 1.18 mm, 0.60 mm, 0.30 mm, 0.15 mm]
      const standardSizes = [9.5, 4.75, 2.36, 1.18, 0.60, 0.30, 0.15]
      let sumCumPct = 0
      let matchedCount = 0

      standardSizes.forEach((stdSz) => {
        const matched = sieveCalculations.find((s) => Math.abs(s.size - stdSz) / stdSz < 0.12)
        if (matched) {
          sumCumPct += matched.cumRetainedPct
          matchedCount++
        }
      })

      // Jika ayakan standar tidak lengkap/custom, gunakan akumulasi saringan aktif
      const fm = matchedCount > 0
        ? sumCumPct / 100
        : sieveCalculations.reduce((acc, s) => acc + s.cumRetainedPct, 0) / 100

      let zoneNum
      let zone
      if (fm < 2.3) {
        zoneNum = 4
        zone = 'Zona IV (Pasir Sangat Halus)'
      } else if (fm < 2.6) {
        zoneNum = 3
        zone = 'Zona III (Pasir Agak Halus)'
      } else if (fm <= 3.1) {
        zoneNum = 2
        zone = 'Zona II (Pasir Agak Kasar / Ideal Beton)'
      } else {
        zoneNum = 1
        zone = 'Zona I (Pasir Kasar)'
      }

      // Tabel Spesifikasi Batas SNI (Batas Atas / BA dan Batas Bawah / BB)
      // Koordinat standar: [0.15, 0.3, 0.6, 1.18, 2.36, 4.75, 9.5] mm
      const SNI_ZONE_LOOKUP = {
        1: { 0.15: [0, 10], 0.30: [5, 20], 0.60: [15, 34], 1.18: [30, 70], 2.36: [60, 95], 4.75: [90, 100], 9.5: [100, 100] },
        2: { 0.15: [0, 10], 0.30: [8, 30], 0.60: [35, 59], 1.18: [55, 90], 2.36: [75, 100], 4.75: [90, 100], 9.5: [100, 100] },
        3: { 0.15: [0, 10], 0.30: [12, 40], 0.60: [60, 79], 1.18: [75, 100], 2.36: [85, 100], 4.75: [90, 100], 9.5: [100, 100] },
        4: { 0.15: [0, 15], 0.30: [15, 50], 0.60: [80, 100], 1.18: [90, 100], 2.36: [95, 100], 4.75: [95, 100], 9.5: [100, 100] },
      }

      // 3. S-Curve Recharts: Urutkan dari ukuran terkecil ke terbesar (Ascending)
      const sortedAsc = [...sieveCalculations].sort((a, b) => a.size - b.size)
      const sieves = sortedAsc.map((s) => s.size)
      const sieveLabels = sortedAsc.map((s) => `${s.size} mm`)
      const sieveNames = sortedAsc.map((s) => s.label || `${s.size} mm`)
      const actualPassing = sortedAsc.map((s) => s.cumPassingRounded)

      // Hitung batas amplop untuk setiap saringan aktif berdasarkan zona terpilih
      const activeZoneLookup = SNI_ZONE_LOOKUP[zoneNum]
      const baList = []
      const bbList = []
      sortedAsc.forEach((s) => {
        const matchedKey = Object.keys(activeZoneLookup).find((k) => Math.abs(Number(k) - s.size) < 0.05)
        if (matchedKey) {
          const [bb, ba] = activeZoneLookup[matchedKey]
          bbList.push(bb)
          baList.push(ba)
        } else {
          if (s.size > 9.5) {
            bbList.push(100)
            baList.push(100)
          } else if (s.size < 0.15) {
            bbList.push(0)
            baList.push(10)
          } else {
            bbList.push(0)
            baList.push(100)
          }
        }
      })

      const isWithinBounds = actualPassing.every(
        (val, idx) => val <= baList[idx] && val >= bbList[idx]
      )

      // Batasan SNI 03-1968-1990: Modulus Kehalusan Butir (FM) pasir normal adalah 2.2 - 3.2
      const isValid = fm >= 2.20 && fm <= 3.20

      return {
        results: [
          { label: 'Total Massa Contoh', value: total.toFixed(1), unit: 'gram' },
          { label: 'Fineness Modulus (FM)', value: fm.toFixed(2), unit: '', highlight: true },
          { label: 'Klasifikasi Zona Ayakan', value: zone, unit: '', highlight: true },
        ],
        formulaSteps: [
          `Total Massa Pengujian (ΣW) = ${total.toFixed(1)} gram (termasuk Pan)`,
          `Fineness Modulus (FM) = Σ(% Tertahan Kumulatif Ayakan Standar) / 100 = ${sumCumPct.toFixed(1)} / 100 = ${fm.toFixed(2)}`,
          `Penentuan Zona: FM ${fm.toFixed(2)} berada dalam klasifikasi ${zone}`,
          `Distribusi Persentase Lolos Kumulatif (Rumus: (Total - Berat Tertahan Kum.) / Total × 100%):`,
          ...sieveCalculations.map(
            (s) => `• ${s.label}: Berat = ${s.weight}g ➔ Tertahan Kum. = ${s.cumRetained.toFixed(1)}g (${s.cumRetainedPct.toFixed(1)}%) ➔ Lolos = ${s.cumPassingPct.toFixed(1)}%`
          ),
        ],
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
        conclusion: isValid
          ? `Nilai Fineness Modulus (FM) = ${fm.toFixed(2)} tergolong dalam ${zone}. Memenuhi spesifikasi standar SNI 03-1968-1990 untuk agregat halus beton struktural (rentang 2.20 - 3.20).`
          : `Nilai Fineness Modulus (FM) = ${fm.toFixed(2)} berada di luar rentang SNI 03-1968-1990 (syarat FM beton: 2.20 - 3.20). Pasir ${fm < 2.2 ? 'terlalu halus' : 'terlalu kasar'} sehingga perlu pencampuran pasir lain.`,
        summaryString: `FM = ${fm.toFixed(2)} (${zone}, ${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // BAB II: AGREGAT KASAR
  // -----------------------------------------------------------------------
  'bb-2-1': {
    id: 'bb-2-1',
    code: 'BJK-01',
    name: 'Pengujian Berat Jenis & Penyerapan Air Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 1969:2008',
    desc: 'Menghitung parameter jenis berat jenis curah kering, jenuh permukaan (SSD), semu, dan daya serap air batu pecah/kerikil.',
    initialInputs: {
      a: 475.5,
      b: 500.0,
      c: 318.0,
    },
    fields: [
      { key: 'a', label: 'Berat Agregat dalam Keadaan Kering Oven (A)', unit: 'gram', desc: 'Massa benda uji kering oven setelah suhu 110°C', min: 0.01 },
      { key: 'b', label: 'Berat Agregat dalam Keadaan SSD (B)', unit: 'gram', desc: 'Massa benda uji dalam kondisi jenuh kering permukaan', min: 0.01 },
      { key: 'c', label: 'Berat Benda Uji dalam Air (C)', unit: 'gram', desc: 'Massa benda uji ditimbang di dalam keranjang kawat terendam air', min: 0.01 },
    ],
    calculate: (inputs) => {
      // Dukung notasi baru a, b, c serta kompatibilitas riwayat lama bk, bssd, bj
      const a = Number(inputs.a !== undefined ? inputs.a : (inputs.bk || 0))
      const b = Number(inputs.b !== undefined ? inputs.b : (inputs.bssd || 0))
      const c = Number(inputs.c !== undefined ? inputs.c : (inputs.bj || 0))

      // 1. Validasi input minus (Nilai tidak boleh negatif)
      if (a < 0 || b < 0 || c < 0) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Jenuh Kering Permukaan / SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu / Apparent (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Absorpsi)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Periksa kembali input parameter penimbangan (A, B, C).'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai tidak boleh negatif. Semua parameter penimbangan harus bernilai positif.',
          summaryString: 'Nilai Tidak Boleh Negatif',
        }
      }

      // Validasi input non-positif / 0
      if (a <= 0 || b <= 0 || c <= 0) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Jenuh Kering Permukaan / SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu / Apparent (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Absorpsi)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Semua parameter berat (A, B, C) harus lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter berat tidak boleh 0 atau kosong. Lengkapi data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Validasi hubungan massa fisik (Weight Relationships):
      // - Nilai B (SSD) harus selalu lebih besar dari A (Kering Oven)
      if (b <= a) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Jenuh Kering Permukaan / SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu / Apparent (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Absorpsi)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: B (${b} gr) ≤ A (${a} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Nilai Berat Kondisi SSD (B = ${b} gr) harus selalu lebih besar dari Berat Kering Oven (A = ${a} gr). Agregat dalam kondisi jenuh kering permukaan selalu lebih berat akibat menyerap air.`,
          summaryString: 'Input Tidak Logis (B ≤ A)',
        }
      }

      // - Nilai C harus lebih kecil dari A dan B (gaya apung Archimedes di air)
      if (c >= b || c >= a) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Jenuh Kering Permukaan / SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu / Apparent (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Absorpsi)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: C (${c} gr) ≥ B (${b} gr) atau A (${a} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat di dalam air (C = ${c} gr) tidak boleh lebih besar atau sama dengan berat di udara (A = ${a} gr, B = ${b} gr).`,
          summaryString: 'Input Tidak Logis (C ≥ Udara)',
        }
      }

      const denom = b - c
      const denomApp = a - c

      if (denom <= 0 || denomApp <= 0) {
        return {
          results: [
            { label: 'Berat Jenis Curah Kering (Sd)', value: '-', unit: '', highlight: true },
            { label: 'Berat Jenis Jenuh Kering Permukaan / SSD (Ss)', value: '-', unit: '' },
            { label: 'Berat Jenis Semu / Apparent (Sa)', value: '-', unit: '' },
            { label: 'Penyerapan Air (Absorpsi)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Penyebut volume air yang terdesak harus lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Perhitungan volume air yang terdesak tidak valid. Periksa kembali penimbangan.',
          summaryString: 'Volume Terdesak Tak Valid',
        }
      }

      const bulk = a / denom
      const ssd = b / denom
      const apparent = a / denomApp
      const absorpsi = ((b - a) / a) * 100

      // Batasan SNI 1969:2008:
      // Absorpsi agregat kasar batu pecah wajar: Absorpsi ≤ 2.50% dan BJ Curah Sd ≥ 2.45
      const isAbsorpsiOk = absorpsi >= 0 && absorpsi <= 2.50
      const isBulkOk = bulk >= 2.45
      const isValid = isAbsorpsiOk && isBulkOk

      return {
        results: [
          { label: 'Berat Jenis Curah Kering (Sd)', value: bulk.toFixed(3), unit: '', highlight: true },
          { label: 'Berat Jenis Jenuh Kering Permukaan / SSD (Ss)', value: ssd.toFixed(3), unit: '' },
          { label: 'Berat Jenis Semu / Apparent (Sa)', value: apparent.toFixed(3), unit: '' },
          { label: 'Penyerapan Air (Absorpsi)', value: absorpsi.toFixed(2), unit: '%', highlight: true },
        ],
        formulaSteps: [
          `Berat Jenis Curah Kering (Sd) = A / (B - C) = ${a} / (${b} - ${c}) = ${bulk.toFixed(3)}`,
          `Berat Jenis Jenuh Kering Permukaan / SSD (Ss) = B / (B - C) = ${b} / (${b} - ${c}) = ${ssd.toFixed(3)}`,
          `Berat Jenis Semu / Apparent (Sa) = A / (A - C) = ${a} / (${a} - ${c}) = ${apparent.toFixed(3)}`,
          `Penyerapan Air (Absorpsi) = ((B - A) / A) × 100% = ((${b} - ${a}) / ${a}) × 100% = ${absorpsi.toFixed(2)}%`,
        ],
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Agregat kasar memenuhi spesifikasi SNI 1969:2008 (Absorpsi ${absorpsi.toFixed(2)}% ≤ 2.50% dan BJ Curah Sd ${bulk.toFixed(3)} ≥ 2.45). Agregat layak digunakan untuk campuran beton struktural.`
          : `Hasil pengujian agregat kasar: BJ Curah Kering (Sd) = ${bulk.toFixed(3)} dan Penyerapan Air = ${absorpsi.toFixed(2)}%. ${absorpsi > 2.50 ? 'Nilai penyerapan air melebihi batas standar maksimal 2.50%, perhatikan kebutuhan air campuran beton.' : 'BJ Curah di bawah batas minimum 2.45.'}`,
        summaryString: `Sd = ${bulk.toFixed(3)}, Ss = ${ssd.toFixed(3)}, Abs = ${absorpsi.toFixed(2)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
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
    desc: 'Menghitung kandungan kelembapan air bebas pada batu pecah untuk koreksi batching plant beton.',
    initialInputs: {
      w1: 150.0,
      w2: 1650.0,
      w3: 1625.0,
    },
    fields: [
      { key: 'w1', label: 'Berat Wadah Timbang (W1)', unit: 'gram', desc: 'Massa wadah bersih', min: 0.01 },
      { key: 'w2', label: 'Berat Wadah + Agregat Basah (W2)', unit: 'gram', desc: 'Massa agregat kasar kondisi lapangan', min: 0.01 },
      { key: 'w3', label: 'Berat Wadah + Agregat Kering (W3)', unit: 'gram', desc: 'Massa setelah dikeringkan oven 110°C', min: 0.01 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.w1 || 0)
      const w2 = Number(inputs.w2 || 0)
      const w3 = Number(inputs.w3 || 0)

      // 1. Validasi input minus (Nilai tidak boleh negatif)
      if (w1 < 0 || w2 < 0 || w3 < 0) {
        return {
          results: [
            { label: 'Berat Air Menguap', value: '-', unit: 'gram' },
            { label: 'Berat Agregat Kering', value: '-', unit: 'gram' },
            { label: 'Kadar Air Agregat Kasar', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Periksa kembali input parameter penimbangan.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai tidak boleh negatif. Semua parameter penimbangan harus bernilai positif.',
          summaryString: 'Nilai Tidak Boleh Negatif',
        }
      }

      // Validasi input non-positif / 0
      if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
        return {
          results: [
            { label: 'Berat Air Menguap', value: '-', unit: 'gram' },
            { label: 'Berat Agregat Kering', value: '-', unit: 'gram' },
            { label: 'Kadar Air Agregat Kasar', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Semua parameter massa (W1, W2, W3) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter penimbangan tidak boleh 0 atau kosong. Silakan lengkapi pembacaan timbangan.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Validasi hubungan massa fisik (Weight Relationships):
      // W2 harus > W1 dan W3 harus > W1
      if (w2 <= w1 || w3 <= w1) {
        return {
          results: [
            { label: 'Berat Air Menguap', value: '-', unit: 'gram' },
            { label: 'Berat Agregat Kering', value: '-', unit: 'gram' },
            { label: 'Kadar Air Agregat Kasar', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) atau W3 (${w3} gr) ≤ W1 (${w1} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat wadah + agregat (W2 = ${w2} gr, W3 = ${w3} gr) harus lebih besar dari berat wadah kosong (W1 = ${w1} gr).`,
          summaryString: 'Input Tidak Logis (W2/W3 ≤ W1)',
        }
      }

      // W2 harus >= W3 (Batu pecah basah tidak boleh lebih ringan dari batu pecah setelah di-oven)
      if (w2 < w3) {
        return {
          results: [
            { label: 'Berat Air Menguap', value: '-', unit: 'gram' },
            { label: 'Berat Agregat Kering', value: '-', unit: 'gram' },
            { label: 'Kadar Air Agregat Kasar', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) < W3 (${w3} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: W2 (${w2} gr) tidak boleh lebih kecil dari W3 (${w3} gr). Sampel agregat basah sebelum di-oven tidak boleh lebih ringan daripada setelah dikeringkan.`,
          summaryString: 'Input Tidak Logis (W2 < W3)',
        }
      }

      const water = w2 - w3
      const dry = w3 - w1
      if (dry <= 0) {
        return {
          results: [
            { label: 'Berat Air Menguap', value: water.toFixed(1), unit: 'gram' },
            { label: 'Berat Agregat Kering', value: '0.0', unit: 'gram' },
            { label: 'Kadar Air Agregat Kasar', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: ['Berat agregat kering (W3 - W1) harus lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Berat agregat kering oven (W3 - W1) bernilai 0. Periksa kembali penimbangan sampel.',
          summaryString: 'Berat Kering Oven = 0',
        }
      }

      const moisture = (water / dry) * 100

      // 3. Evaluasi Standar SNI 1971:2011:
      // - Batas wajar batu pecah adalah 0.5% - 2.5%.
      // - Jika hasil > 2.5%, status HARUS "Perlu Evaluasi" (kuning).
      // - Jika hasil > 10.0%, status "Input Tidak Wajar / Cek Kembali Data" (merah).
      if (moisture > 10.0) {
        return {
          results: [
            { label: 'Berat Air Menguap', value: water.toFixed(1), unit: 'gram' },
            { label: 'Berat Agregat Kering', value: dry.toFixed(1), unit: 'gram' },
            { label: 'Kadar Air Agregat Kasar', value: moisture.toFixed(2), unit: '%', highlight: true },
          ],
          formulaSteps: [
            `Kadar Air (w) = ((W2 - W3) / (W3 - W1)) × 100% = (${water.toFixed(1)} / ${dry.toFixed(1)}) × 100% = ${moisture.toFixed(2)}%`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Kadar air agregat kasar sebesar ${moisture.toFixed(2)}% (> 10.0%) tergolong nilai ekstrem yang tidak wajar untuk batu pecah di laboratorium. Periksa kembali pembacaan timbangan atau kondisi sampel basah.`,
          summaryString: `Kadar Air Kasar = ${moisture.toFixed(2)}% (Input Tidak Wajar > 10%)`,
        }
      }

      const isHigh = moisture > 2.50
      const status = isHigh ? 'Perlu Evaluasi' : 'Valid'
      const conclusion = isHigh
        ? `Kadar air agregat kasar sebesar ${moisture.toFixed(2)}% melebihi batas wajar batu pecah normal (maksimal 2.5%). Memerlukan penyesuaian koreksi volume air pencampur beton yang teliti pada mix design.`
        : `Kadar air agregat kasar terukur ${moisture.toFixed(2)}%. Masuk dalam rentang wajar agregat batu pecah (0.5% - 2.5%) sesuai standar SNI 1971:2011.`

      return {
        results: [
          { label: 'Berat Air Menguap', value: water.toFixed(1), unit: 'gram' },
          { label: 'Berat Agregat Kering', value: dry.toFixed(1), unit: 'gram' },
          { label: 'Kadar Air Agregat Kasar', value: moisture.toFixed(2), unit: '%', highlight: true },
        ],
        formulaSteps: [
          `Kadar Air (w) = ((W2 - W3) / (W3 - W1)) × 100% = (${water.toFixed(1)} / ${dry.toFixed(1)}) × 100% = ${moisture.toFixed(2)}%`,
        ],
        isError: false,
        status,
        conclusion,
        summaryString: `Kadar Air Kasar (w) = ${moisture.toFixed(2)}% (${status === 'Valid' ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
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
    desc: 'Menghitung fraksi lempung/debu halus yang lolos ayakan No. 200 akibat pencucian pada batu pecah.',
    initialInputs: {
      w1: 2500.0,
      w2: 2482.0,
    },
    fields: [
      { key: 'w1', label: 'Berat Kering Sebelum Dicuci (W1)', unit: 'gram', desc: 'Massa contoh kerikil kering oven awal', min: 0.01 },
      { key: 'w2', label: 'Berat Kering Setelah Dicuci Ayakan #200 (W2)', unit: 'gram', desc: 'Massa kering oven setelah dicuci bersih', min: 0 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.w1 || 0)
      const w2 = Number(inputs.w2 || 0)

      // 1. Validasi input minus
      if (w1 < 0 || w2 < 0) {
        return {
          results: [
            { label: 'Berat Lumpur Lolos Ayakan #200', value: '-', unit: 'gram' },
            { label: 'Kandungan Lumpur Kasar', value: '-', unit: '%', highlight: true },
            { label: 'Batas Syarat SNI 03-4142', value: '1.00', unit: '%' },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Massa benda uji tidak boleh bernilai minus.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai tidak boleh negatif. Massa benda uji tidak boleh bernilai minus.',
          summaryString: 'Nilai Tidak Boleh Negatif',
        }
      }

      // Validasi massa awal W1
      if (w1 <= 0) {
        return {
          results: [
            { label: 'Berat Lumpur Lolos Ayakan #200', value: '-', unit: 'gram' },
            { label: 'Kandungan Lumpur Kasar', value: '-', unit: '%', highlight: true },
            { label: 'Batas Syarat SNI 03-4142', value: '1.00', unit: '%' },
          ],
          formulaSteps: ['Berat kering oven sebelum dicuci (W1) harus bernilai lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Massa contoh kerikil kering sebelum dicuci (W1) harus lebih besar dari 0 gram.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Validasi hubungan berat: W2 tidak boleh > W1
      if (w2 > w1) {
        return {
          results: [
            { label: 'Berat Lumpur Lolos Ayakan #200', value: '-', unit: 'gram' },
            { label: 'Kandungan Lumpur Kasar', value: '-', unit: '%', highlight: true },
            { label: 'Batas Syarat SNI 03-4142', value: '1.00', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} gr) > W1 (${w1} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: W2 (${w2} gr) tidak boleh lebih besar dari W1 (${w1} gr). Kerikil setelah dicuci lumpurnya tidak mungkin bertambah berat.`,
          summaryString: 'Input Tidak Logis (W2 > W1)',
        }
      }

      const loss = w1 - w2
      const pct = (loss / w1) * 100
      const isValid = pct <= 1.0

      return {
        results: [
          { label: 'Berat Lumpur Lolos Ayakan #200', value: loss.toFixed(1), unit: 'gram' },
          { label: 'Kandungan Lumpur Kasar', value: pct.toFixed(2), unit: '%', highlight: true },
          { label: 'Batas Syarat SNI 03-4142', value: '1.00', unit: '%' },
        ],
        formulaSteps: [
          `Berat Lumpur Lolos = W1 - W2 = ${w1} - ${w2} = ${loss.toFixed(1)} gr`,
          `Kadar Lumpur = ((W1 - W2) / W1) × 100% = ((${w1} - ${w2}) / ${w1}) × 100% = ${pct.toFixed(2)}%`,
        ],
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Kadar lumpur ${pct.toFixed(2)}% memenuhi spesifikasi SNI 03-4142-1996 (≤ 1.0% untuk beton struktural). Agregat bersih dan siap dipakai tanpa cuci ulang.`
          : `Kadar lumpur ${pct.toFixed(2)}% melebihi batas 1.0%. Agregat wajib dicuci agar ikatan pasta semen dengan batu tidak melemah.`,
        summaryString: `Lumpur Kasar = ${pct.toFixed(2)}% (${isValid ? 'Memenuhi SNI ≤ 1%' : 'Melebihi Batas'})`,
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
    desc: 'Menghitung bobot isi lepas dan padat serta persentase volume antar butir kerikil.',
    initialInputs: {
      wBejana: 8.5,
      vol: 10.0,
      volUnit: 'liter',
      wLepas: 23.2,
      wPadat: 25.1,
      bjBulk: 2.59,
    },
    fields: [
      { key: 'wBejana', label: 'Berat Bejana Takaran (W1)', unit: 'kg', desc: 'Massa bejana logam kosong', min: 0.01 },
      { 
        key: 'vol', 
        label: 'Volume Bejana Takaran (V)', 
        unit: 'liter',
        unitKey: 'volUnit',
        unitOptions: [
          { value: 'liter', label: 'liter' },
          { value: 'm3', label: 'm³' }
        ],
        desc: 'Volume kapasitas bejana takaran', 
        min: 0.000001,
        step: 'any'
      },
      { key: 'wLepas', label: 'Berat Bejana + Kerikil Lepas (W2)', unit: 'kg', desc: 'Kerikil dituang bebas dari ketinggian 5 cm', min: 0.01 },
      { key: 'wPadat', label: 'Berat Bejana + Kerikil Padat (W3)', unit: 'kg', desc: 'Kerikil dipadatkan dengan tusukan batang baja', min: 0.01 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Kerikil (BJ)', unit: '', desc: 'Berat jenis curah agregat kasar', min: 0.01 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.wBejana || 0)
      const rawV = Number(inputs.vol || 0)
      const volUnit = inputs.volUnit || 'liter'
      const w2 = Number(inputs.wLepas || 0)
      const w3 = Number(inputs.wPadat || 0)
      const bj = Number(inputs.bjBulk || 0)

      // Konversi otomatis volume ke liter jika memilih m³:
      // 1 m³ = 1000 liter
      const v = volUnit === 'm3' ? rawV * 1000 : rawV

      // 1. Validasi input minus (Nilai tidak boleh negatif)
      if (w1 < 0 || rawV < 0 || w2 < 0 || w3 < 0 || bj < 0) {
        return {
          results: [
            { label: 'Bobot Isi Kasar Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Kasar Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Padat', value: '-', unit: '%' },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Periksa kembali input parameter penimbangan.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai tidak boleh negatif. Semua parameter penimbangan harus bernilai positif.',
          summaryString: 'Nilai Tidak Boleh Negatif',
        }
      }

      // 2. Validasi Volume: Jika Volume (V) <= 0, return error "Volume harus lebih besar dari 0"
      if (rawV <= 0) {
        return {
          results: [
            { label: 'Bobot Isi Kasar Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Kasar Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Padat', value: '-', unit: '%' },
          ],
          formulaSteps: [`Volume bejana takaran (V) harus lebih besar dari 0 ${volUnit === 'm3' ? 'm³' : 'liter'}.`],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Volume harus lebih besar dari 0. Periksa kapasitas volume bejana takaran kalibrasi.',
          summaryString: 'Volume Bejana Tak Valid (<= 0)',
        }
      }

      // Validasi nilai massa dan BJ > 0
      if (w1 <= 0 || w2 <= 0 || w3 <= 0 || bj <= 0) {
        return {
          results: [
            { label: 'Bobot Isi Kasar Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Kasar Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Padat', value: '-', unit: '%' },
          ],
          formulaSteps: ['Semua parameter massa (W1, W2, W3) dan Berat Jenis (BJ) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter bobot isi tidak boleh bernilai 0 atau kosong. Silakan lengkapi data penimbangan.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 3. Validasi hubungan massa fisik: W2 > W1 dan W3 > W1
      if (w2 <= w1 || w3 <= w1) {
        return {
          results: [
            { label: 'Bobot Isi Kasar Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Kasar Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Padat', value: '-', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W2 (${w2} kg) atau W3 (${w3} kg) ≤ W1 (${w1} kg) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat bejana + kerikil (W2 = ${w2} kg, W3 = ${w3} kg) harus lebih besar dari berat bejana kosong W1 (${w1} kg).`,
          summaryString: 'Input Tidak Logis (W2/W3 ≤ W1)',
        }
      }

      if (w3 < w2) {
        return {
          results: [
            { label: 'Bobot Isi Kasar Lepas', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Kasar Padat', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Lepas', value: '-', unit: '%' },
            { label: 'Rongga Udara Padat', value: '-', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: Kondisi padat W3 (${w3} kg) < kondisi lepas W2 (${w2} kg) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat bejana + kerikil kondisi padat W3 (${w3} kg) tidak boleh lebih ringan dari kondisi lepas W2 (${w2} kg). Pemadatan seharusnya meningkatkan kerapatan massa.`,
          summaryString: 'Input Tidak Logis (W3 < W2)',
        }
      }

      const biLepas = (w2 - w1) / v
      const biPadat = (w3 - w1) / v
      const ronggaLepas = (1 - (biLepas / bj)) * 100
      const ronggaPadat = (1 - (biPadat / bj)) * 100

      const isM3 = volUnit === 'm3'
      const conversionStep = isM3
        ? `Konversi Satuan Volume: V = ${rawV} m³ × 1000 = ${v} liter`
        : null

      if (ronggaPadat >= 90.0 || ronggaPadat <= 0.0) {
        return {
          results: [
            { label: 'Bobot Isi Kasar Lepas', value: biLepas.toFixed(3), unit: 'kg/L', highlight: true },
            { label: 'Bobot Isi Kasar Padat', value: biPadat.toFixed(3), unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Lepas', value: ronggaLepas.toFixed(2), unit: '%' },
            { label: 'Rongga Udara Padat', value: ronggaPadat.toFixed(2), unit: '%' },
          ],
          formulaSteps: [
            ...(conversionStep ? [conversionStep] : []),
            `Bobot Isi Padat = (W3 - W1) / V = (${w3} - ${w1}) / ${v} = ${biPadat.toFixed(3)} kg/L`,
            `Rongga Udara Padat = (1 - (BI Padat / BJ)) × 100% = ${ronggaPadat.toFixed(2)}% [EKSTREM/TIDAK WAJAR]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Hasil perhitungan rongga udara (${ronggaPadat.toFixed(2)}%) tidak wajar. Periksa kembali massa kerikil atau nilai berat jenis curah (BJ).`,
          summaryString: `Rongga Udara Tidak Wajar (${ronggaPadat.toFixed(1)}%)`,
        }
      }

      // Standar SNI 03-4804-1998:
      // Bobot Isi Kasar Padat normal: 1.40 - 1.80 kg/L, Rongga: 30% - 45%
      const isBiOk = biPadat >= 1.40 && biPadat <= 1.80
      const isRonggaOk = ronggaPadat >= 30.0 && ronggaPadat <= 45.0
      const isValid = isBiOk && isRonggaOk

      return {
        results: [
          { label: 'Bobot Isi Kasar Lepas', value: biLepas.toFixed(3), unit: 'kg/L', highlight: true },
          { label: 'Bobot Isi Kasar Padat', value: biPadat.toFixed(3), unit: 'kg/L', highlight: true },
          { label: 'Rongga Udara Lepas', value: ronggaLepas.toFixed(2), unit: '%' },
          { label: 'Rongga Udara Padat', value: ronggaPadat.toFixed(2), unit: '%' },
        ],
        formulaSteps: [
          ...(conversionStep ? [conversionStep] : []),
          `Bobot Isi Lepas = (${w2} - ${w1}) / ${v} = ${biLepas.toFixed(3)} kg/L (${(biLepas * 1000).toFixed(0)} kg/m³)`,
          `Bobot Isi Padat = (${w3} - ${w1}) / ${v} = ${biPadat.toFixed(3)} kg/L (${(biPadat * 1000).toFixed(0)} kg/m³)`,
          `Rongga Udara Lepas = (1 - (${biLepas.toFixed(3)} / ${bj})) × 100% = ${ronggaLepas.toFixed(2)}%`,
          `Rongga Udara Padat = (1 - (${biPadat.toFixed(3)} / ${bj})) × 100% = ${ronggaPadat.toFixed(2)}%`,
        ],
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Bobot isi kerikil padat ${biPadat.toFixed(3)} kg/L (standar: 1.40 - 1.80 kg/L) dengan rongga udara ${ronggaPadat.toFixed(2)}% (standar: 30% - 45%). Memenuhi kriteria agregat normal konstruksi beton SNI 03-4804-1998.`
          : `Bobot isi kerikil padat (${biPadat.toFixed(3)} kg/L) atau rongga udara (${ronggaPadat.toFixed(2)}%) berada di luar rentang standar SNI 03-4804-1998 (syarat teknis: BI 1.40 - 1.80 kg/L dan Rongga 30% - 45%).`,
        summaryString: `BI Kasar Padat = ${biPadat.toFixed(2)} kg/L, Rongga = ${ronggaPadat.toFixed(1)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-5': {
    id: 'bb-2-5',
    code: 'GRK-01',
    name: 'Analisis Gradasi Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 03-1968-1990',
    desc: 'Menghitung distribusi ukuran nominal maksimum butiran kerikil dan persentase lolos ayakan.',
    hasDynamicSieveTable: true,
    isCoarse: true,
    initialInputs: {
      sieves: [
        { id: 1,  size: 37.5, label: '1.5" (37.5 mm)', weight: 0 },
        { id: 2,  size: 25.0, label: '1.0" (25.0 mm)', weight: 150 },
        { id: 3,  size: 19.0, label: '3/4" (19.0 mm)', weight: 850 },
        { id: 4,  size: 12.5, label: '1/2" (12.5 mm)', weight: 1200 },
        { id: 5,  size: 9.5,  label: '3/8" (9.5 mm)', weight: 1450 },
        { id: 6,  size: 4.75, label: 'No. 4 (4.75 mm)', weight: 320 },
        { id: 7,  size: 2.36, label: 'No. 8 (2.36 mm)', weight: 0 },
        { id: 8,  size: 1.18, label: 'No. 16 (1.18 mm)', weight: 0 },
        { id: 9,  size: 0.60, label: 'No. 30 (0.60 mm)', weight: 0 },
        { id: 10, size: 0.30, label: 'No. 50 (0.30 mm)', weight: 0 },
        { id: 11, size: 0.15, label: 'No. 100 (0.15 mm)', weight: 0 },
        { id: 12, size: 0,    label: 'Pan Penampung', weight: 30, isPan: true },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      // 1. Ekstraksi data saringan dinamis (dengan fallback data lama jika ada)
      const rawSieves = Array.isArray(inputs.sieves) && inputs.sieves.length > 0
        ? inputs.sieves
        : [
            { id: 1,  size: 37.5, label: '1.5" (37.5 mm)', weight: Number(inputs.s375 || 0) },
            { id: 2,  size: 25.0, label: '1.0" (25.0 mm)', weight: Number(inputs.s250 || 150) },
            { id: 3,  size: 19.0, label: '3/4" (19.0 mm)', weight: Number(inputs.s190 || 850) },
            { id: 4,  size: 12.5, label: '1/2" (12.5 mm)', weight: Number(inputs.s125 || 1200) },
            { id: 5,  size: 9.5,  label: '3/8" (9.5 mm)', weight: Number(inputs.s95 || 1450) },
            { id: 6,  size: 4.75, label: 'No. 4 (4.75 mm)', weight: Number(inputs.s475 || 320) },
            { id: 7,  size: 2.36, label: 'No. 8 (2.36 mm)', weight: Number(inputs.s236 || 0) },
            { id: 8,  size: 1.18, label: 'No. 16 (1.18 mm)', weight: Number(inputs.s118 || 0) },
            { id: 9,  size: 0.60, label: 'No. 30 (0.60 mm)', weight: Number(inputs.s060 || 0) },
            { id: 10, size: 0.30, label: 'No. 50 (0.30 mm)', weight: Number(inputs.s030 || 0) },
            { id: 11, size: 0.15, label: 'No. 100 (0.15 mm)', weight: Number(inputs.s015 || 0) },
            { id: 12, size: 0,    label: 'Pan Penampung', weight: Number(inputs.pan || 30), isPan: true },
          ]

      const nonPanSieves = rawSieves.filter(
        (s) => !s.isPan && Number(s.size) > 0 && !String(s.label || '').toLowerCase().includes('pan')
      )

      if (nonPanSieves.length === 0) {
        return {
          results: [
            { label: 'Total Massa Contoh Uji', value: '-', unit: 'gram' },
            { label: 'Ukuran Nominal Maksimum', value: '-', unit: '', highlight: true },
            { label: 'Lolos Ayakan No. 4', value: '-', unit: '%' },
          ],
          formulaSteps: ['Minimal harus ada 1 ukuran saringan selain Pan Penampung.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Minimal harus ada 1 ukuran saringan yang digunakan untuk pengujian gradasi.',
          summaryString: 'Saringan Kosong',
        }
      }

      // Validasi: Massa tertahan tidak boleh minus
      const hasNegative = rawSieves.some((s) => {
        const w = s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0
        return w < 0
      })
      if (hasNegative) {
        return {
          results: [
            { label: 'Total Massa Contoh Uji', value: '-', unit: 'gram' },
            { label: 'Ukuran Nominal Maksimum', value: '-', unit: '', highlight: true },
            { label: 'Lolos Ayakan No. 4', value: '-', unit: '%' },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Massa tertahan pada setiap ayakan tidak boleh bernilai minus.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai tidak boleh negatif. Pembacaan massa tertahan ayakan tidak boleh bernilai negatif.',
          summaryString: 'Nilai Tidak Boleh Negatif',
        }
      }

      // Hitung Total Massa (ΣW) seluruh berat tertahan termasuk Pan
      const total = rawSieves.reduce((sum, s) => {
        const w = s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0
        return sum + w
      }, 0)

      if (total <= 0) {
        return {
          results: [
            { label: 'Total Massa Contoh Uji', value: '0', unit: 'gram' },
            { label: 'Ukuran Nominal Maksimum', value: '-', unit: '', highlight: true },
            { label: 'Lolos Ayakan No. 4', value: '-', unit: '%' },
          ],
          formulaSteps: ['Total berat benda uji kerikil harus lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Total berat tertahan pada ayakan harus lebih besar dari 0 gram. Silakan masukkan data penimbangan fraksi ayakan.',
          summaryString: 'Data Ayakan Kosong (0 gr)',
        }
      }

      // 2. Simulasi Pengayakan Fisik: Urutkan ayakan dari ukuran terbesar ke terkecil (Descending)
      const sortedDesc = [...nonPanSieves].sort((a, b) => Number(b.size) - Number(a.size))

      let cumulative = 0
      const sieveCalculations = sortedDesc.map((s) => {
        const w = s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0
        cumulative += w
        const cumRetainedPct = (cumulative / total) * 100
        // Rumus Persen Lolos Kumulatif: ((Total Berat - Berat Tertahan Kumulatif) / Total Berat) * 100
        const cumPassingPct = Math.max(0, Math.min(100, ((total - cumulative) / total) * 100))
        return {
          ...s,
          size: Number(s.size),
          weight: w,
          cumRetained: cumulative,
          cumRetainedPct,
          cumPassingPct,
          cumPassingRounded: Number(cumPassingPct.toFixed(1)),
        }
      })

      // Cari persentase lolos ayakan No. 4 (~4.75 mm)
      const no4Sieve = sieveCalculations.find((s) => Math.abs(s.size - 4.75) < 0.1)
      const lolosPct = no4Sieve
        ? no4Sieve.cumPassingRounded
        : (sieveCalculations.filter((s) => s.size <= 4.75)[0]?.cumPassingRounded ?? 0)

      // Deteksi otomatis Ukuran Nominal Maksimum berdasarkan distribusi berat
      let detectedNominalKey = '19 mm'
      let nominalMax = '19.0 mm (3/4")'
      const firstSignificant = sieveCalculations.find((s) => s.cumRetainedPct >= 5)
      if (firstSignificant) {
        if (firstSignificant.size >= 30) {
          detectedNominalKey = '37.5 mm'
          nominalMax = '37.5 mm (1.5")'
        } else if (firstSignificant.size >= 22) {
          detectedNominalKey = '25 mm'
          nominalMax = '25.0 mm (1.0")'
        } else if (firstSignificant.size >= 16) {
          detectedNominalKey = '19 mm'
          nominalMax = '19.0 mm (3/4")'
        } else {
          detectedNominalKey = '12.5 mm'
          nominalMax = '12.5 mm (1/2")'
        }
      }

      // Standar agregat kasar beton SNI 03-1968-1990: Lolos Ayakan No. 4 maks 10.0%
      const isValid = lolosPct >= 0 && lolosPct <= 10.0

      // 3. S-Curve Recharts: Urutkan dari ukuran terkecil ke terbesar (Ascending)
      const sortedAsc = [...sieveCalculations].sort((a, b) => a.size - b.size)
      const sieves = sortedAsc.map((s) => s.size)
      const sieveLabels = sortedAsc.map((s) => `${s.size} mm`)
      const sieveNames = sortedAsc.map((s) => s.label || `${s.size} mm`)
      const actualPassing = sortedAsc.map((s) => s.cumPassingRounded)

      // Lookup Spesifikasi Amplop Batas Standar ASTM C-33 / SNI 03-1968-1990
      const ASTM_C33_COARSE_LOOKUP = {
        '37.5 mm': { 37.5: [95, 100], 25.0: [100, 100], 19.0: [35, 70], 12.5: [35, 70], 9.5: [10, 40], 4.75: [0, 5], 2.36: [0, 5], 1.18: [0, 3], 0.60: [0, 2], 0.30: [0, 1], 0.15: [0, 1] },
        '25 mm':   { 37.5: [100, 100], 25.0: [95, 100], 19.0: [100, 100], 12.5: [25, 60], 9.5: [25, 60], 4.75: [0, 10], 2.36: [0, 5], 1.18: [0, 3], 0.60: [0, 2], 0.30: [0, 1], 0.15: [0, 1] },
        '19 mm':   { 37.5: [100, 100], 25.0: [100, 100], 19.0: [90, 100], 12.5: [40, 75], 9.5: [20, 55], 4.75: [0, 10], 2.36: [0, 5], 1.18: [0, 3], 0.60: [0, 2], 0.30: [0, 1], 0.15: [0, 1] },
        '12.5 mm': { 37.5: [100, 100], 25.0: [100, 100], 19.0: [100, 100], 12.5: [90, 100], 9.5: [40, 70], 4.75: [0, 15], 2.36: [0, 5], 1.18: [0, 5], 0.60: [0, 2], 0.30: [0, 1], 0.15: [0, 1] },
      }

      // Bangun allBounds untuk opsi dropdown nominal ASTM C-33
      const allBounds = {}
      const nominalLabels = {
        '37.5 mm': '37.5 mm (1.5")',
        '25 mm': '25.0 mm (1.0")',
        '19 mm': '19.0 mm (3/4")',
        '12.5 mm': '12.5 mm (1/2")',
      }

      Object.keys(ASTM_C33_COARSE_LOOKUP).forEach((nomKey) => {
        const lookup = ASTM_C33_COARSE_LOOKUP[nomKey]
        const baList = []
        const bbList = []
        sortedAsc.forEach((s) => {
          const matchedKey = Object.keys(lookup).find((k) => Math.abs(Number(k) - s.size) < 0.05)
          if (matchedKey) {
            const [bb, ba] = lookup[matchedKey]
            bbList.push(bb)
            baList.push(ba)
          } else {
            if (s.size > 37.5) {
              bbList.push(100)
              baList.push(100)
            } else if (s.size < 0.15) {
              bbList.push(0)
              baList.push(1)
            } else {
              bbList.push(0)
              baList.push(100)
            }
          }
        })
        allBounds[nomKey] = {
          label: nominalLabels[nomKey],
          ba: baList,
          bb: bbList,
        }
      })

      const activeBounds = allBounds[detectedNominalKey] || allBounds['19 mm']
      const isWithinBounds = actualPassing.every(
        (val, idx) => val <= activeBounds.ba[idx] && val >= activeBounds.bb[idx]
      )

      return {
        results: [
          { label: 'Total Massa Contoh Uji', value: total.toFixed(0), unit: 'gram' },
          { label: 'Ukuran Nominal Maksimum', value: nominalMax, unit: '', highlight: true },
          { label: 'Lolos Ayakan No. 4', value: `${lolosPct.toFixed(2)}%`, unit: '%' },
        ],
        formulaSteps: [
          `Total Massa Pengujian (ΣW) = ${total.toFixed(0)} gram (termasuk Pan)`,
          `Persentase Lolos Ayakan No. 4 (4.75 mm) = ${lolosPct.toFixed(2)}% (Syarat SNI maks 10.0%: ${isValid ? 'Memenuhi' : 'Melebihi Batas'})`,
          `Ukuran Agregat Nominal Maksimum Terdeteksi = ${nominalMax}`,
          `Distribusi Persentase Lolos Kumulatif (Rumus: (Total - Berat Tertahan Kum.) / Total × 100%):`,
          ...sieveCalculations.map(
            (s) => `• ${s.label}: Berat = ${s.weight}g ➔ Tertahan Kum. = ${s.cumRetained.toFixed(0)}g (${s.cumRetainedPct.toFixed(1)}%) ➔ Lolos = ${s.cumPassingPct.toFixed(1)}%`
          ),
        ],
        gradationChart: {
          isCoarse: true,
          chartTitle: 'Grafik Kurva Gradasi Agregat Kasar',
          chartSubtitle: `Distribusi Butiran Kerikil & Amplop Batas Spesifikasi ASTM C-33 / SNI 03-1968 (${nominalMax})`,
          specLabel: nominalMax,
          zoneLabel: nominalMax,
          nominalMax,
          defaultNominalKey: detectedNominalKey,
          nominalOptions: [
            { key: '37.5 mm', label: '37.5 mm (1.5")' },
            { key: '25 mm', label: '25.0 mm (1.0")' },
            { key: '19 mm', label: '19.0 mm (3/4")' },
            { key: '12.5 mm', label: '12.5 mm (1/2")' },
          ],
          allBounds,
          sieves,
          sieveLabels,
          sieveNames,
          actualPassing,
          upperBound: activeBounds.ba,
          lowerBound: activeBounds.bb,
          isWithinBounds,
        },
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Gradasi kerikil memiliki ukuran butir nominal maksimum ${nominalMax} dengan persentase lolos ayakan No. 4 sebesar ${lolosPct.toFixed(2)}% (≤ 10%). Memenuhi spesifikasi SNI 03-1968-1990 dan ASTM C-33 untuk agregat kasar beton.`
          : `Persentase lolos ayakan No. 4 sebesar ${lolosPct.toFixed(2)}% melebihi batas toleransi 10%. Kerikil mengandung terlalu banyak fraksi halus yang dapat memicu pemborosan semen.`,
        summaryString: `Ukuran Butir Maks = ${nominalMax}, Lolos #4 = ${lolosPct.toFixed(1)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
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
    desc: 'Menentukan ketahanan batu pecah/kerikil terhadap disintegrasi mekanis menggunakan mesin abrasi Los Angeles 500 putaran.',
    initialInputs: {
      wAwal: 5000.0,
      wTertahan12: 3820.0,
    },
    fields: [
      { key: 'wAwal', label: 'Berat Contoh Bersih Semula (A)', unit: 'gram', desc: 'Standar berat contoh grading (biasanya 5000 gr)', min: 0.01 },
      { key: 'wTertahan12', label: 'Berat Tertahan Ayakan No. 12 Setelah Putaran (B)', unit: 'gram', desc: 'Massa benda uji tertahan ayakan 1.70 mm setelah 500 putaran bola baja', min: 0 },
    ],
    calculate: (inputs) => {
      const a = Number(inputs.wAwal || 0)
      const b = Number(inputs.wTertahan12 || 0)

      // 1. Validasi input minus
      if (a < 0 || b < 0) {
        return {
          results: [
            { label: 'Massa Hancur Lolos Ayakan #12', value: '-', unit: 'gram' },
            { label: 'Nilai Keausan Los Angeles', value: '-', unit: '%', highlight: true },
            { label: 'Batas Maksimum Keausan SNI', value: '40.00', unit: '%' },
          ],
          formulaSteps: ['Nilai tidak boleh negatif. Massa benda uji tidak boleh bernilai minus.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai tidak boleh negatif. Massa benda uji tidak boleh bernilai minus.',
          summaryString: 'Nilai Tidak Boleh Negatif',
        }
      }

      if (a <= 0) {
        return {
          results: [
            { label: 'Massa Hancur Lolos Ayakan #12', value: '-', unit: 'gram' },
            { label: 'Nilai Keausan Los Angeles', value: '-', unit: '%', highlight: true },
            { label: 'Batas Maksimum Keausan SNI', value: '40.00', unit: '%' },
          ],
          formulaSteps: ['Berat awal contoh uji (A) harus bernilai lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Berat awal contoh uji (A) harus bernilai lebih besar dari 0 gram.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // 2. Hubungan massa: B tidak boleh > A
      if (b > a) {
        return {
          results: [
            { label: 'Massa Hancur Lolos Ayakan #12', value: '-', unit: 'gram' },
            { label: 'Nilai Keausan Los Angeles', value: '-', unit: '%', highlight: true },
            { label: 'Batas Maksimum Keausan SNI', value: '40.00', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: B (${b} gr) > A (${a} gr) [TIDAK LOGIS]`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak logis: Berat tertahan ayakan No. 12 (B = ${b} gr) tidak boleh lebih besar dari berat awal (A = ${a} gr). Benda uji yang diuji abrasi tidak mungkin bertambah berat.`,
          summaryString: 'Input Tidak Logis (B > A)',
        }
      }

      const loss = a - b
      const abrasi = (loss / a) * 100
      const isValid = abrasi <= 40.0

      return {
        results: [
          { label: 'Massa Hancur Lolos Ayakan #12', value: loss.toFixed(1), unit: 'gram' },
          { label: 'Nilai Keausan Los Angeles', value: abrasi.toFixed(2), unit: '%', highlight: true },
          { label: 'Batas Maksimum Keausan SNI', value: '40.00', unit: '%' },
        ],
        formulaSteps: [
          `Berat Hancur = A - B = ${a} - ${b} = ${loss.toFixed(1)} gr`,
          `Nilai Keausan = ((A - B) / A) × 100% = (${loss.toFixed(1)} / ${a}) × 100% = ${abrasi.toFixed(2)}%`,
        ],
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        conclusion: isValid 
          ? `Nilai abrasi ${abrasi.toFixed(2)}% memenuhi syarat SNI 2417:2008 (≤ 40%). Batu pecah memiliki ketahanan mekanis sangat tinggi terhadap gerusan roda dan beban lalulintas.`
          : `Nilai abrasi ${abrasi.toFixed(2)}% melebihi batas 40%. Batu pecah terlalu rapuh dan mudah hancur.`,
        summaryString: `Keausan Abrasi = ${abrasi.toFixed(2)}% (${isValid ? 'Memenuhi SNI ≤ 40%' : 'Perlu Evaluasi'})`,
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
    standard: 'SNI 4154:2014 / ASTM C78',
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
    standard: 'ASTM D2395-17',
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
    standard: 'ASTM D2395-17',
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
    standard: 'ASTM D2395-17 / Sudarminto 1983',
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
    standard: 'SNI 7973:2013',
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
    standard: 'SNI 8369:2017 / SNI 2052:2017',
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
    name: 'Pengujian Penetrasi Konus Sondir (CPT)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 1: Penyelidikan Lapangan',
    standard: 'SNI 2827:2008',
    desc: 'Menghitung nilai perlawanan konus (qc), hambatan lekat (fs), dan friction ratio (FR) untuk profil stratigrafi tanah.',
    initialInputs: {
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

  'mt-1-2': {
    id: 'mt-1-2',
    code: 'SPT-01',
    name: 'Pengeboran Inti & Uji Penetrasi Standar (N-SPT)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 1: Penyelidikan Lapangan',
    standard: 'SNI 8460:2017 / ASTM D1586',
    desc: 'Menghitung nilai pukulan N-SPT dari split barrel sampler untuk estimasi kepadatan relatif dan daya dukung pondasi dalam.',
    initialInputs: {
      depth: 6.0,
      n1: 4,
      n2: 8,
      n3: 11,
    },
    fields: [
      { key: 'depth', label: 'Kedalaman Pengeboran (z)', unit: 'meter', desc: 'Elevasi dasar lubang bor', min: 0.1, step: 0.5 },
      { key: 'n1', label: 'Pukulan Penetrasi Pertama 15 cm (N1)', unit: 'Pukulan', desc: 'Interval dudukan awal penumbukan (seating drive)', min: 0, step: 1 },
      { key: 'n2', label: 'Pukulan Penetrasi Kedua 15 cm (N2)', unit: 'Pukulan', desc: 'Interval pertama perhitungan N-SPT', min: 0, step: 1 },
      { key: 'n3', label: 'Pukulan Penetrasi Ketiga 15 cm (N3)', unit: 'Pukulan', desc: 'Interval kedua perhitungan N-SPT', min: 0, step: 1 },
    ],
    calculate: (inputs) => {
      const z = Number(inputs.depth || 0)
      const n2 = Number(inputs.n2 || 0)
      const n3 = Number(inputs.n3 || 0)

      const rawSum = n2 + n3
      const isRefusal = rawSum >= 50
      const nSpt = isRefusal ? 50 : rawSum

      let konsistensi
      if (nSpt < 4) konsistensi = 'Sangat Lunak (Very Soft)'
      else if (nSpt <= 8) konsistensi = 'Lunak (Soft)'
      else if (nSpt <= 15) konsistensi = 'Kaku Sedang (Medium Stiff)'
      else if (nSpt <= 30) konsistensi = 'Sangat Kaku / Padat (Stiff to Dense)'
      else konsistensi = 'Keras / Sangat Padat (Hard / Very Dense)'

      let status = 'Valid'
      let warningMessage = null

      // Warning kuning jika N3 = 0 (indikasi data lapangan tidak wajar)
      if (n3 === 0) {
        status = 'Perlu Evaluasi'
        warningMessage = 'Nilai N3 = 0 tidak wajar untuk data lapangan. Pastikan alat tidak mengalami kegagalan.'
      }

      const nSptDisplay = isRefusal ? '50 (Refusal / Mencapai Batas Maksimum)' : nSpt.toFixed(0)

      const formulaSteps = [
        `N-SPT dihitung dari jumlah pukulan 30 cm penetrasi terakhir (N2 + N3):`,
        `N-SPT = N2 + N3 = ${n2} + ${n3} = ${rawSum} Pukulan / 30 cm`,
      ]

      if (isRefusal) {
        formulaSteps.push(`Kriteria Refusal tercapai (N2 + N3 = ${rawSum} >= 50). Berdasarkan standar SNI 8460:2017 / ASTM D1586, nilai N-SPT ditetapkan maksimum 50 (Refusal / Mencapai Batas Maksimum).`)
      }

      formulaSteps.push(`Klasifikasi Konsistensi Tanah: ${konsistensi}`)

      const conclusion = isRefusal
        ? `Nilai N-SPT = 50 (Refusal / Mencapai Batas Maksimum) pada kedalaman ${z} m menunjukkan lapisan tanah keras dengan konsistensi ${konsistensi}.`
        : `Nilai N-SPT = ${nSpt} pada kedalaman ${z} m menunjukkan tanah dengan konsistensi ${konsistensi}.`

      const summaryString = isRefusal
        ? `N-SPT = 50 (Refusal / Mencapai Batas Maksimum) pada ${z}m (${konsistensi})`
        : `N-SPT = ${nSpt} pada ${z}m (${konsistensi})`

      return {
        results: [
          { 
            label: 'Nilai N-SPT (N2 + N3)', 
            value: nSptDisplay, 
            unit: isRefusal ? '' : 'Pukulan', 
            highlight: true 
          },
          { label: 'Konsistensi Tanah', value: konsistensi, unit: '', highlight: true },
          { label: 'Kedalaman Pengeboran', value: z.toFixed(1), unit: 'meter' },
        ],
        formulaSteps,
        status,
        warningMessage,
        conclusion,
        summaryString,
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
    desc: 'Menghitung rasio berat air pori terhadap partikel padat butiran tanah alami.',
    initialInputs: {
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
      const w1 = Number(inputs.wCawan || 0)
      const w2 = Number(inputs.wBasah || 0)
      const w3 = Number(inputs.wKering || 0)

      // Guard clause: Validasi kelengkapan data input > 0
      if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
        return {
          results: [
            { label: 'Berat Air Pori (Ww)', value: '-', unit: 'gram' },
            { label: 'Berat Butir Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Kadar Air Alami (w)', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter massa (W1, W2, W3) harus bernilai lebih besar dari 0 gr.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter penimbangan tidak boleh 0 atau kosong. Masukkan nilai W1, W2, dan W3 dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // Validasi relasional fisik: W2 (Basah) > W3 (Kering) > W1 (Cawan)
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
          conclusion: `Input tidak valid: Berat Cawan + Tanah Kering (W3 = ${w3} gr) harus lebih besar dari Berat Cawan Kosong (W1 = ${w1} gr). Massa butiran tanah kering (Ws = W3 - W1) harus bernilai positif.`,
          summaryString: 'Input Tidak Logis (W3 <= W1)',
        }
      }

      const wWater = w2 - w3
      const wDry = w3 - w1
      const moisture = (wWater / wDry) * 100

      // Logika status: Jika hasil > 100%, status JANGAN hijau. Ubah menjadi kuning "Perlu Evaluasi (Kadar air tidak wajar untuk tanah normal)"
      const isHighMoisture = moisture > 100.0
      const status = isHighMoisture ? 'Perlu Evaluasi (Kadar air tidak wajar untuk tanah normal)' : 'Valid'

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
    desc: 'Menentukan rasio kerapatan partikel padat tanah terhadap air destilasi menggunakan labu piknometer.',
    initialInputs: {
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
      const w1 = Number(inputs.wPikno || 0)
      const w2 = Number(inputs.wPiknoTanah || 0)
      const w3 = Number(inputs.wPiknoAirTanah || 0)
      const w4 = Number(inputs.wPiknoAir || 0)

      // Guard clause: Input tidak boleh 0 atau negatif
      if (w1 <= 0 || w2 <= 0 || w3 <= 0 || w4 <= 0) {
        return {
          results: [
            { label: 'Berat Butiran Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Berat Jenis Butir (Gs)', value: '-', unit: '', highlight: true },
            { label: 'Estimasi Tipe Mineral', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter massa piknometer (W1, W2, W3, W4) harus bernilai lebih besar dari 0 gr.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai W1, W2, W3, dan W4 dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // Validasi Relasional 1: W2 harus > W1 (Cegah W2 <= W1 dan nilai Gs minus)
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
            'Ws = W2 - W1 harus bernilai positif (tidak boleh nol atau negatif).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak valid: Berat Piknometer + Tanah Kering (W2 = ${w2} gr) tidak boleh lebih kecil atau sama dengan Berat Piknometer Kosong (W1 = ${w1} gr). Massa butiran tanah kering (Ws) tidak boleh bernilai negatif atau nol.`,
          summaryString: 'Input Tidak Valid (W2 <= W1)',
        }
      }

      // Validasi Relasional 2: W3 harus > W2
      if (w3 <= w2) {
        return {
          results: [
            { label: 'Berat Butiran Kering (Ws)', value: '-', unit: 'gram' },
            { label: 'Berat Jenis Butir (Gs)', value: '-', unit: '', highlight: true },
            { label: 'Estimasi Tipe Mineral', value: 'Data Tidak Valid (W3 ≤ W2)', unit: '', highlight: true },
          ],
          formulaSteps: [
            `Evaluasi Hubungan Berat: W3 (${w3} gr) ≤ W2 (${w2} gr) [TIDAK LOGIS]`,
            'Berat Piknometer + Air + Tanah (W3) harus lebih besar dari Berat Piknometer + Tanah Kering (W2) karena penambahan air destilasi.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: `Input data tidak valid: Berat Piknometer + Air + Tanah (W3 = ${w3} gr) harus lebih besar dari Berat Piknometer + Tanah Kering (W2 = ${w2} gr). Piknometer yang telah ditambahkan air destilasi pasti memiliki massa lebih besar.`,
          summaryString: 'Input Tidak Valid (W3 <= W2)',
        }
      }

      // Validasi Relasional 3: W4 harus > W2
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
          conclusion: `Input data tidak valid: Berat Piknometer + Air Penuh (W4 = ${w4} gr) harus lebih besar dari Berat Piknometer + Tanah Kering (W2 = ${w2} gr). Kapasitas air piknometer harus melebihi massa sampel tanah uji.`,
          summaryString: 'Input Tidak Valid (W4 <= W2)',
        }
      }

      const ws = w2 - w1
      const denom = (ws + w4) - w3

      // Validasi fisis volume air terdesak: denom harus > 0
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
          conclusion: `Input data tidak valid: Volume air yang terdesak oleh butiran tanah ((Ws + W4) - W3 = ${denom.toFixed(1)} gr) bernilai nol atau negatif. Periksa kembali penimbangan W3 dan W4 serta pastikan udara pori telah dikeluarkan sempurna.`,
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

      // Logika Status: Nilai Gs wajar adalah 2.5 - 2.8. Jika di luar itu, status "Perlu Evaluasi"
      const isValid = gs >= 2.50 && gs <= 2.80

      const conclusion = isValid
        ? `Nilai berat jenis butir tanah Gs = ${gs.toFixed(3)} masuk rentang standar tanah normal (2.50 - 2.80). Sampel diestimasikan sebagai ${jenis}.`
        : `Nilai berat jenis butir tanah Gs = ${gs.toFixed(3)} berada di luar rentang wajar tanah normal (2.50 - 2.80). ${gs < 2.50 ? 'Nilai terlalu rendah, terindikasi mengandung bahan organik tinggi atau pembacaan penimbangan kurang teliti.' : 'Nilai sangat tinggi, terindikasi mengandung mineral berat (besi/laterit) atau masih terperangkap gelembung udara dalam piknometer.'} Lakukan evaluasi atau uji ulang.`

      const warningMessage = !isValid
        ? `Perlu Evaluasi: Nilai Gs = ${gs.toFixed(3)} berada di luar batas wajar tanah normal (2.50 - 2.80). Pastikan gelembung udara telah hilang sempurna selama proses vakum/pemanasan.`
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
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
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
    desc: 'Menghitung kadar air saat alur tanah pada cawan Casagrande merapat sepanjang 12.7 mm pada 25 ketukan.',
    initialInputs: {
      ketukanN: 22,
      kadarAirW: 43.5,
    },
    fields: [
      { key: 'ketukanN', label: 'Jumlah Ketukan Cawan Casagrande (N)', unit: 'Ketukan', min: 1, desc: 'Rentang standar uji 15 - 35 ketukan' },
      { key: 'kadarAirW', label: 'Kadar Air Terukur Pada Titik Uji (w)', unit: '%', min: 0.01, desc: 'Kadar air tanah saat alur merapat 1/2 inch' },
    ],
    calculate: (inputs) => {
      const n = Number(inputs.ketukanN || 0)
      const w = Number(inputs.kadarAirW || 0)

      if (n <= 0 || w <= 0) {
        return {
          results: [
            { label: 'Nilai Batas Cair (LL)', value: '-', unit: '%', highlight: true },
            { label: 'Jumlah Ketukan Uji', value: '-', unit: 'Ketukan' },
          ],
          formulaSteps: [
            'Jumlah ketukan (N) dan kadar air titik uji (w) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai jumlah ketukan (N) dan kadar air (w) dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // Formula Single Point Casagrande: LL = w * (N / 25)^0.121
      const ll = w * Math.pow(n / 25, 0.121)

      // Warning kuning jika N di luar rentang 15-35 atau jika w > 100%
      const isNOutOfRange = n < 15 || n > 35
      const isMoistureHigh = w > 100.0
      const hasWarning = isNOutOfRange || isMoistureHigh

      let warningMessage = null
      if (isNOutOfRange && isMoistureHigh) {
        warningMessage = `Jumlah ketukan N (${n}) berada di luar rentang standar Casagrande (15 - 35 ketukan) dan kadar air titik uji w (${w.toFixed(2)}%) melebihi 100%. Data titik uji memerlukan evaluasi ketelitian atau uji ulang.`
      } else if (isNOutOfRange) {
        warningMessage = `Jumlah ketukan N (${n}) berada di luar rentang standar metode satu titik Casagrande (15 - 35 ketukan sesuai SNI 1967:2008 / ASTM D4318). Sesuaikan kebasahan pasta tanah agar merapat dalam 15-35 ketukan.`
      } else if (isMoistureHigh) {
        warningMessage = `Kadar air titik uji w = ${w.toFixed(2)}% melebihi 100%, tergolong sangat tinggi untuk tanah normal. Verifikasi kembali penimbangan dan oven pengeringan.`
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
        status: hasWarning ? 'Perlu Evaluasi' : 'Valid',
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
    desc: 'Menghitung batas plastis (PL), Indeks Plastisitas (PI = LL - PL), dan klasifikasi plastisitas A-line USCS.',
    initialInputs: {
      batasCairLL: 42.8,
      batasPlastisPL: 22.4,
    },
    fields: [
      { key: 'batasCairLL', label: 'Nilai Batas Cair (LL)', unit: '%', min: 0.01, desc: 'Hasil pengujian Casagrande' },
      { key: 'batasPlastisPL', label: 'Kadar Air Batas Plastis (PL)', unit: '%', min: 0.01, desc: 'Kadar air saat silinder tanah digulung retak pada diameter 3.2 mm' },
    ],
    calculate: (inputs) => {
      const ll = Number(inputs.batasCairLL || 0)
      const pl = Number(inputs.batasPlastisPL || 0)

      // Guard clause: Kelengkapan input
      if (ll <= 0 || pl <= 0) {
        return {
          results: [
            { label: 'Batas Plastis (PL)', value: '-', unit: '%' },
            { label: 'Indeks Plastisitas (PI)', value: '-', unit: '%', highlight: true },
            { label: 'Garis-A USCS (0.73(LL-20))', value: '-', unit: '%' },
            { label: 'Klasifikasi Sistem USCS', value: '-', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Nilai Batas Cair (LL) dan Batas Plastis (PL) harus bernilai lebih besar dari 0%.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Masukkan nilai Batas Cair (LL) dan Batas Plastis (PL) dengan benar.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // Validasi Relasional: Nilai Batas Cair (LL) HARUS >= Nilai Batas Plastis (PL)
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
    desc: 'Menghitung berat volume basah, berat volume kering (dry density), serta menentukan kadar air optimum (OMC) dan MDD.',
    initialInputs: {
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

  'mt-3-2': {
    id: 'mt-3-2',
    code: 'SC-01',
    name: 'Pengujian Kepadatan Lapangan Sand Cone',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 3: Pemadatan Tanah',
    standard: 'SNI 2828:2011 / ASTM D1556',
    desc: 'Menghitung kepadatan lapangan menggunakan pasir Ottawa standar dan mengevaluasi derajat pemadatan terhadap MDD Proctor.',
    initialInputs: {
      wPasirAwal: 5820.0,
      wPasirSisa: 2760.0,
      wCorong: 345.0,
      bjPasir: 1.42,
      wGalianBasah: 2650.0,
      kadarAirLap: 13.8,
      mddProctor: 1.69,
    },
    fields: [
      { key: 'wPasirAwal', label: 'Berat Botol + Corong + Pasir Awal (W1)', unit: 'gram', min: 0.01, desc: 'Massa apparatus sebelum pengujian lapangan' },
      { key: 'wPasirSisa', label: 'Berat Botol + Corong + Pasir Sisa (W2)', unit: 'gram', min: 0.01, desc: 'Massa setelah mengisi lubang galian dan corong' },
      { key: 'wCorong', label: 'Berat Pasir Dalam Corong (Wc)', unit: 'gram', min: 0.01, desc: 'Kalibrasi berat pasir yang tertinggal di kerucut corong' },
      { key: 'bjPasir', label: 'Kerapatan Pasir Kalibrasi (γ_sand)', unit: 'gr/cm³', min: 0.01, desc: 'Standar pasir Ottawa = 1.42 gr/cm³' },
      { key: 'wGalianBasah', label: 'Berat Tanah Basah Galian Lubang (W_t)', unit: 'gram', min: 0.01, desc: 'Total massa tanah basah yang digali dari lubang uji' },
      { key: 'kadarAirLap', label: 'Kadar Air Tanah Lapangan (w)', unit: '%', min: 0.01, desc: 'Persentase kelembapan tanah hasil galian' },
      { key: 'mddProctor', label: 'Kerapatan Kering Maksimum Lab (MDD)', unit: 'gr/cm³', min: 0.01, desc: 'Nilai MDD hasil uji Standard Proctor laboratorium' },
    ],
    calculate: (inputs) => {
      const w1 = inputs.wPasirAwal !== undefined && inputs.wPasirAwal !== '' ? Number(inputs.wPasirAwal) : 0
      const w2 = inputs.wPasirSisa !== undefined && inputs.wPasirSisa !== '' ? Number(inputs.wPasirSisa) : 0
      const wc = inputs.wCorong !== undefined && inputs.wCorong !== '' ? Number(inputs.wCorong) : 0
      const bjPasir = inputs.bjPasir !== undefined && inputs.bjPasir !== '' ? Number(inputs.bjPasir) : 0
      const wt = inputs.wGalianBasah !== undefined && inputs.wGalianBasah !== '' ? Number(inputs.wGalianBasah) : 0
      const w = inputs.kadarAirLap !== undefined && inputs.kadarAirLap !== '' ? Number(inputs.kadarAirLap) : 0
      const mdd = inputs.mddProctor !== undefined && inputs.mddProctor !== '' ? Number(inputs.mddProctor) : 0

      // Guard clause: Nilai input harus > 0
      if (w1 <= 0 || w2 <= 0 || wc <= 0 || bjPasir <= 0 || wt <= 0 || w < 0 || mdd <= 0) {
        return {
          results: [
            { label: 'Volume Lubang Galian (V)', value: '-', unit: 'cm³' },
            { label: 'Kerapatan Kering Lapangan (γ_d)', value: '-', unit: 'gr/cm³', highlight: true },
            { label: 'Derajat Pemadatan Lapangan (D)', value: '-', unit: '%', highlight: true },
            { label: 'Syarat Minimum Pemadatan', value: '≥ 95.00', unit: '%' },
          ],
          formulaSteps: [
            'Semua parameter pengujian sand cone (W1, W2, Wc, γ_sand, Wt, MDD) harus bernilai lebih besar dari 0.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian tidak boleh 0 atau kosong. Lengkapi data penimbangan pasir apparatus, tanah galian, dan MDD acuan.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      // Validasi Relasional: W1 (Botol + Pasir Awal) HARUS lebih besar dari (W2 + Wc)
      // Jika W1 <= (W2 + Wc), berat pasir di lubang akan minus atau nol
      if (w1 <= (w2 + wc)) {
        return {
          results: [
            { label: 'Volume Lubang Galian (V)', value: '-', unit: 'cm³' },
            { label: 'Kerapatan Kering Lapangan (γ_d)', value: '-', unit: 'gr/cm³', highlight: true },
            { label: 'Derajat Pemadatan Lapangan (D)', value: '-', unit: '%', highlight: true },
            { label: 'Syarat Minimum Pemadatan', value: '≥ 95.00', unit: '%' },
          ],
          formulaSteps: [
            `Evaluasi Keseimbangan Massa Pasir: W1 (${w1} gr) ≤ (W2 + Wc = ${w2} + ${wc} = ${(w2 + wc).toFixed(1)} gr) [TIDAK LOGIS]`,
            'Berat pasir yang mengisi lubang uji = (W1 - W2) - Wc tidak boleh bernilai nol atau negatif.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input tidak valid: Berat awal pasir lebih kecil dari total pasir sisa dan pasir corong.',
          summaryString: 'Input Tidak Valid (W1 <= W2 + Wc)',
        }
      }

      const wPasirLubang = (w1 - w2) - wc
      const volLubang = wPasirLubang / bjPasir
      const gammaWet = wt / volLubang
      const gammaDry = gammaWet / (1 + w / 100)
      const derajat = (gammaDry / mdd) * 100

      // Logika status derajat pemadatan (D >= 95% = Hijau, D < 95% = Kuning)
      const isValid = derajat >= 95.0
      const status = isValid ? 'Valid' : 'Perlu Evaluasi'

      const conclusion = isValid 
        ? `Derajat pemadatan lapangan D = ${derajat.toFixed(2)}% memenuhi spesifikasi Bina Marga/SNI (D ≥ 95%). Lapisan subgrade/base padat sempurna.`
        : `Derajat pemadatan D = ${derajat.toFixed(2)}% di bawah syarat 95%. Perlu pemadatan ulang dengan tandem/pneumatic roller.`

      const warningMessage = !isValid
        ? `Perlu Evaluasi: Derajat pemadatan lapangan D = ${derajat.toFixed(2)}% belum memenuhi standar minimum 95.00% terhadap MDD lab (${mdd.toFixed(2)} gr/cm³).`
        : null

      return {
        results: [
          { label: 'Volume Lubang Galian (V)', value: volLubang.toFixed(1), unit: 'cm³' },
          { label: 'Kerapatan Kering Lapangan (γ_d)', value: gammaDry.toFixed(3), unit: 'gr/cm³', highlight: true },
          { label: 'Derajat Pemadatan Lapangan (D)', value: derajat.toFixed(2), unit: '%', highlight: true },
          { label: 'Syarat Minimum Pemadatan', value: '≥ 95.00', unit: '%' },
        ],
        formulaSteps: [
          `Berat Pasir Lubang = (W1 - W2) - Wc = (${w1} - ${w2}) - ${wc} = ${wPasirLubang.toFixed(1)} gr`,
          `Volume Lubang = Berat Pasir / γ_sand = ${wPasirLubang.toFixed(1)} / ${bjPasir} = ${volLubang.toFixed(1)} cm³`,
          `γ_d Lapangan = (Wt / V) / (1 + w/100) = ${gammaDry.toFixed(3)} gr/cm³`,
          `Derajat Kepadatan (D) = (γ_d Lapangan / MDD Lab) × 100% = (${gammaDry.toFixed(3)} / ${mdd}) × 100% = ${derajat.toFixed(2)}%`,
        ],
        isError: false,
        status,
        conclusion,
        warningMessage,
        summaryString: `Derajat Kepadatan = ${derajat.toFixed(2)}% (${isValid ? 'Lolos ≥ 95%' : 'Perlu Evaluasi < 95%'})`,
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
    desc: 'Menghitung koefisien keseragaman Cu, kelengkungan Cc, dan klasifikasi tanah berbutir kasar/halus.',
    initialInputs: {
      d10: 0.12,
      d30: 0.38,
      d60: 0.95,
      finesPct: 8.5,
    },
    fields: [
      { key: 'd10', label: 'Ukuran Butir Efektif D10 (10% Lolos)', unit: 'mm', min: 0.001, desc: 'Diameter ayakan saat persentase lolos komulatif 10%' },
      { key: 'd30', label: 'Ukuran Butir D30 (30% Lolos)', unit: 'mm', min: 0.001, desc: 'Diameter ayakan saat persentase lolos komulatif 30%' },
      { key: 'd60', label: 'Ukuran Butir D60 (60% Lolos)', unit: 'mm', min: 0.001, desc: 'Diameter ayakan saat persentase lolos komulatif 60%' },
      { key: 'finesPct', label: 'Persen Butiran Lolos Ayakan #200 (Fines)', unit: '%', min: 0, max: 100, desc: 'Fraksi lempung/lanau lolos ayakan 0.075 mm' },
    ],
    calculate: (inputs) => {
      const d10 = inputs.d10 !== undefined && inputs.d10 !== '' ? Number(inputs.d10) : 0
      const d30 = inputs.d30 !== undefined && inputs.d30 !== '' ? Number(inputs.d30) : 0
      const d60 = inputs.d60 !== undefined && inputs.d60 !== '' ? Number(inputs.d60) : 0
      const fines = inputs.finesPct !== undefined && inputs.finesPct !== '' ? Number(inputs.finesPct) : 0

      // 1. VALIDASI INPUT RELASIONAL (D10, D30, D60 HARUS > 0 dan D10 < D30 < D60)
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

      // 2. VALIDASI FRAKSI HALUS (FINES > 100% TIDAK BOLEH)
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

      // 3. LOGIKA KLASIFIKASI USCS:
      // JIKA Fines > 50%: Klasifikasikan sebagai Lanau/Lempung (Silt/Clay). Jangan pernah sebut "Pasir".
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
        // JIKA Fines <= 50%: Cek nilai Cu dan Cc untuk menentukan SW atau SP
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
    initialInputs: {
      points: [
        { id: 1, sigma: 0.50, tau: 0.48 },
        { id: 2, sigma: 1.00, tau: 0.76 },
        { id: 3, sigma: 2.00, tau: 1.30 },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      // Ambil data pasangan titik (sigma, tau) dari input tabel dinamis
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
            { id: 1, sigma: 0.50, tau: 0.48 },
            { id: 2, sigma: 1.00, tau: 0.76 },
            { id: 3, sigma: 2.00, tau: 1.30 },
          ]
        }
      }

      // Validasi pasangan titik: filter titik yang terisi angka valid > 0
      const validPoints = rawPoints.filter((pt) => {
        if (!pt) return false
        const s = pt.sigma !== undefined && pt.sigma !== '' ? Number(pt.sigma) : NaN
        const t = pt.tau !== undefined && pt.tau !== '' ? Number(pt.tau) : NaN
        return !isNaN(s) && !isNaN(t) && s > 0 && t > 0
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
            `Jumlah titik uji valid saat ini: ${validPoints.length} titik. Masukkan minimal 3 pasangan nilai Tegangan Normal (σ) dan Tegangan Geser Runtuh (τ) > 0.`,
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Data belum lengkap: Masukkan minimal 3 pasangan data Tegangan Normal (σ) dan Tegangan Geser (τ) bernilai lebih besar dari 0.',
          summaryString: 'Direct Shear: Minimal 3 Titik Uji',
        }
      }

      // Hitung regresi linier y = mx + c (tau = m * sigma + c)
      const n = validPoints.length
      let sumX = 0
      let sumY = 0
      for (const pt of validPoints) {
        sumX += Number(pt.sigma)
        sumY += Number(pt.tau)
      }
      const meanX = sumX / n
      const meanY = sumY / n

      let ssXX = 0
      let ssXY = 0
      let ssYY = 0
      for (const pt of validPoints) {
        const dx = Number(pt.sigma) - meanX
        const dy = Number(pt.tau) - meanY
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
          conclusion: 'Input tidak valid: Nilai tegangan normal (σ) pada seluruh titik uji identik. Gunakan beban vertikal bertingkat (misal: 0.5, 1.0, 2.0 kg/cm²).',
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

      const pointSteps = validPoints.map((pt, i) => `Titik #${i + 1}: σ = ${Number(pt.sigma).toFixed(2)}, τ = ${Number(pt.tau).toFixed(2)}`).join(' | ')

      return {
        results: [
          { label: 'Kohesi Tanah (c)', value: c.toFixed(3), unit: 'kg/cm²', highlight: true },
          { label: 'Sudut Geser Dalam (ϕ)', value: `${phiDeg.toFixed(2)}°`, unit: '', highlight: true },
          { label: 'Kemiringan Garis (tan ϕ)', value: slope.toFixed(3), unit: '' },
          { label: 'Koefisien Determinasi (R²)', value: r2.toFixed(3), unit: '', highlight: true },
        ],
        formulaSteps: [
          `Data Uji Direct Shear (${n} Titik): ${pointSteps}`,
          `Persamaan Garis Regresi Mohr-Coulomb: τ = c + σ × tan(ϕ)`,
          `Kohesi (c) = Nilai Intercept sumbu-Y = ${c.toFixed(3)} kg/cm² (${(c * 98.07).toFixed(1)} kPa)`,
          `Slope (m) = tan(ϕ) = ${slope.toFixed(3)}`,
          `Sudut Geser Dalam (ϕ) = arctan(slope) = arctan(${slope.toFixed(3)}) = ${phiDeg.toFixed(2)}°`,
          `Koefisien Determinasi Regresi R² = ${r2.toFixed(4)}`,
        ],
        isError: false,
        status: 'Valid',
        conclusion: `Berdasarkan analisis regresi linier ${n} titik uji geser langsung, diperoleh parameter kuat geser tanah: Kohesi c = ${c.toFixed(3)} kg/cm² (${(c * 98.1).toFixed(1)} kPa) dan Sudut Geser Dalam ϕ = ${phiDeg.toFixed(2)}° (R² = ${r2.toFixed(3)}). Parameter ini siap digunakan untuk perhitungan daya dukung Terzaghi dan kestabilan lereng.`,
        summaryString: `c = ${c.toFixed(3)} kg/cm², ϕ = ${phiDeg.toFixed(1)}° (R² = ${r2.toFixed(3)})`,
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
    desc: 'Menghitung indeks pemampatan kompresi (Cc) dan penurunan konsolidasi primer tanah lempung jenuh.',
    initialInputs: {
      tinggiAwal: 20.0,
      angkaPoriAwal: 0.85,
      deltaH: 1.45,
      tekananP1: 50.0,
      tekananP2: 100.0,
    },
    fields: [
      { key: 'tinggiAwal', label: 'Tinggi Benda Uji Semula (H0)', unit: 'mm', min: 0.01, desc: 'Tinggi cincin oedometer standar = 20 mm' },
      { key: 'angkaPoriAwal', label: 'Angka Pori Awal Tanah (e0)', unit: '', min: 0.01, desc: 'Rasio volume pori terhadap volume butir tanah' },
      { key: 'deltaH', label: 'Penurunan Konsolidasi Total (ΔH)', unit: 'mm', min: 0.01, desc: 'Perubahan tinggi jarum dial setelah 24 jam pembebanan' },
      { key: 'tekananP1', label: 'Beban Tekanan Pertama (P1)', unit: 'kPa', min: 0.01, desc: 'Tegangan efektif awal' },
      { key: 'tekananP2', label: 'Beban Tekanan Kedua (P2)', unit: 'kPa', min: 0.01, desc: 'Tegangan efektif akhir siklus pengujian' },
    ],
    calculate: (inputs) => {
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

      // Logika Status: Jika Indeks Kompresi (Cc) > 1.0, ubah status menjadi KUNING "Perlu Evaluasi" dengan teks:
      // "Nilai Cc > 1.0 mengindikasikan tanah dengan kompresibilitas sangat tinggi (organik/gambut)."
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
      pipaA: 0.85,
      luasSampelA: 44.18,
      headH0: 50.0,
      headH1: 20.0,
    },
    getFields: (inputs) => {
      const isFalling = (inputs?.metode || 'constant') === 'falling'
      if (isFalling) {
        return [
          { key: 'pipaA', label: 'Diameter Pipa (a)', unit: 'cm²', desc: 'Luas penampang pipa tegak standpipe (a)', min: 0.01, step: 'any' },
          { key: 'panjangL', label: 'Panjang Sampel (L)', unit: 'cm', desc: 'Tinggi atau panjang contoh tanah uji', min: 0.01, step: 'any' },
          { key: 'luasSampelA', label: 'Luas Sampel (A)', unit: 'cm²', desc: 'Luas penampang contoh tanah uji', min: 0.01, step: 'any' },
          { key: 'headH0', label: 'Tinggi Awal (h0)', unit: 'cm', desc: 'Beda tinggi muka air awal sebelum pengaliran', min: 0.01, step: 'any' },
          { key: 'headH1', label: 'Tinggi Akhir (h1)', unit: 'cm', desc: 'Beda tinggi muka air akhir setelah waktu t', min: 0.01, step: 'any' },
          { key: 'waktuT', label: 'Waktu (t)', unit: 'detik', desc: 'Durasi penurunan muka air dari h0 ke h1', min: 0.01, step: 'any' },
        ]
      }
      return [
        { key: 'diameterD', label: 'Diameter Sampel Permeameter (D)', unit: 'cm', desc: 'Diameter silinder tanah uji', min: 0.01, step: 'any' },
        { key: 'panjangL', label: 'Panjang Sampel Tanah (L)', unit: 'cm', desc: 'Jarak tempuh aliran air hidrolik', min: 0.01, step: 'any' },
        { key: 'volumeQ', label: 'Volume Air Tertampung (Q)', unit: 'cm³', desc: 'Debit air di gelas ukur penampung', min: 0.01, step: 'any' },
        { key: 'headH', label: 'Beda Tinggi Tekanan Hidrolik (h)', unit: 'cm', desc: 'Beda tinggi muka air inlet dan outlet', min: 0.01, step: 'any' },
        { key: 'waktuT', label: 'Waktu Pengaliran (t)', unit: 'detik', desc: 'Durasi stopwatch pengumpulan air', min: 0.01, step: 'any' },
      ]
    },
    fields: [
      { key: 'diameterD', label: 'Diameter Sampel Permeameter (D)', unit: 'cm', desc: 'Diameter silinder tanah uji', min: 0.01, step: 'any' },
      { key: 'panjangL', label: 'Panjang Sampel Tanah (L)', unit: 'cm', desc: 'Jarak tempuh aliran air hidrolik', min: 0.01, step: 'any' },
      { key: 'volumeQ', label: 'Volume Air Tertampung (Q)', unit: 'cm³', desc: 'Debit air di gelas ukur penampung', min: 0.01, step: 'any' },
      { key: 'headH', label: 'Beda Tinggi Tekanan Hidrolik (h)', unit: 'cm', desc: 'Beda tinggi muka air inlet dan outlet', min: 0.01, step: 'any' },
      { key: 'waktuT', label: 'Waktu Pengaliran (t)', unit: 'detik', desc: 'Durasi stopwatch pengumpulan air', min: 0.01, step: 'any' },
    ],
    calculate: (inputs) => {
      const isFalling = (inputs?.metode || 'constant') === 'falling'

      // Logika Klasifikasi Tanah Sesuai Koefisien Permeabilitas k (cm/s):
      // * Jika k > 1.0: "Kerikil Bersih"
      // * Jika 1.0 >= k > 0.01: "Pasir Kasar"
      // * Jika 0.01 >= k > 0.001: "Pasir Halus"
      // * Jika 0.001 >= k > 0.00001: "Lanau"
      // * Jika k <= 0.00001: "Lempung"
      const classifyPermeability = (kVal) => {
        if (kVal > 1.0) {
          return {
            tipe: 'Kerikil Bersih',
            sifat: 'Rembesan sangat cepat / permeabilitas sangat tinggi',
          }
        }
        if (kVal > 0.01) {
          return {
            tipe: 'Pasir Kasar',
            sifat: 'Rembesan cepat / permeabilitas tinggi',
          }
        }
        if (kVal > 0.001) {
          return {
            tipe: 'Pasir Halus',
            sifat: 'Rembesan sedang / permeabilitas moderat',
          }
        }
        if (kVal > 0.00001) {
          return {
            tipe: 'Lanau',
            sifat: 'Rembesan rendah / permeabilitas rendah',
          }
        }
        return {
          tipe: 'Lempung',
          sifat: 'Rembesan sangat lambat / kedap air (impervious)',
        }
      }

      if (isFalling) {
        const a = Number(inputs.pipaA !== undefined ? inputs.pipaA : (inputs.a !== undefined ? inputs.a : 0.85))
        const l = Number(inputs.panjangL !== undefined ? inputs.panjangL : (inputs.L !== undefined ? inputs.L : 12.0))
        const A = Number(inputs.luasSampelA !== undefined ? inputs.luasSampelA : (inputs.A !== undefined ? inputs.A : 44.18))
        const h0 = Number(inputs.headH0 !== undefined ? inputs.headH0 : (inputs.h0 !== undefined ? inputs.h0 : 50.0))
        const h1 = Number(inputs.headH1 !== undefined ? inputs.headH1 : (inputs.h1 !== undefined ? inputs.h1 : 20.0))
        const t = Number(inputs.waktuT !== undefined ? inputs.waktuT : (inputs.t !== undefined ? inputs.t : 120.0))

        if (a <= 0 || l <= 0 || A <= 0 || h0 <= 0 || h1 <= 0 || t <= 0) {
          return {
            results: [
              { label: 'Metode Pengujian', value: 'Metode Falling Head' },
              { label: 'Koefisien Permeabilitas (k)', value: '-', unit: 'cm/s', highlight: true },
              { label: 'Klasifikasi Jenis Tanah', value: 'Nilai Input Harus > 0', unit: '', highlight: true },
            ],
            formulaSteps: [
              'Semua parameter pengujian Falling Head (a, L, A, h0, h1, t) harus bernilai lebih besar dari 0 (min. 0.01) untuk mencegah error pembagian dengan nol.',
            ],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Nilai parameter input tidak valid: Semua parameter (Diameter Pipa a, Panjang L, Luas Sampel A, h0, h1, Waktu t) harus lebih besar dari 0.',
            summaryString: 'Nilai input harus > 0',
          }
        }

        // Validasi relasional Falling Head: h0 HARUS > h1
        if (h0 <= h1) {
          return {
            results: [
              { label: 'Metode Pengujian', value: 'Metode Falling Head' },
              { label: 'Tinggi Awal (h0)', value: `${h0} cm` },
              { label: 'Tinggi Akhir (h1)', value: `${h1} cm` },
              { label: 'Koefisien Permeabilitas (k)', value: '-', unit: 'cm/s', highlight: true },
              { label: 'Klasifikasi Jenis Tanah', value: 'Data Tidak Valid', unit: '', highlight: true },
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
        const { tipe, sifat } = classifyPermeability(k)

        return {
          results: [
            { label: 'Metode Pengujian', value: 'Metode Falling Head' },
            { label: 'Rasio Head Hidrolik (h0/h1)', value: ratio.toFixed(3), unit: '' },
            { label: 'Koefisien Permeabilitas (k)', value: formatScientific(k, 3), unit: 'cm/s', highlight: true },
            { label: 'Klasifikasi Jenis Tanah', value: tipe, unit: '', highlight: true },
            { label: 'Karakteristik Rembesan', value: sifat, unit: '' },
          ],
          formulaSteps: [
            'Metode: Falling Head (Muka Air Berubah-ubah / Turun)',
            `Rasio Head Hidrolik: h0 / h1 = ${h0} / ${h1} = ${ratio.toFixed(4)}`,
            `Logaritma Natural: ln(h0 / h1) = ln(${ratio.toFixed(4)}) = ${lnRatio.toFixed(4)}`,
            'Rumus Permeabilitas: k = (a × L / (A × t)) × ln(h0 / h1)',
            `Perhitungan: k = ((${a} × ${l}) / (${A} × ${t})) × ${lnRatio.toFixed(4)} = ${formatScientific(k, 3)} cm/s`,
            `Klasifikasi Jenis Tanah: ${tipe} (${sifat})`,
          ],
          status: 'Valid',
          conclusion: `Koefisien permeabilitas terukur k = ${formatScientific(k, 3)} cm/s (${tipe}). Karakteristik: ${sifat}. Hasil pengujian memenuhi kaidah permeabilitas falling head untuk tanah butir halus.`,
          summaryString: `k = ${formatScientific(k, 2)} cm/s (${tipe})`,
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
            { label: 'Metode Pengujian', value: 'Metode Constant Head' },
            { label: 'Koefisien Permeabilitas (k)', value: '-', unit: 'cm/s', highlight: true },
            { label: 'Klasifikasi Jenis Tanah', value: 'Nilai Input Harus > 0', unit: '', highlight: true },
          ],
          formulaSteps: [
            'Semua parameter pengujian Constant Head (D, L, Q, h, t) harus bernilai lebih besar dari 0 (min. 0.01) untuk mencegah error pembagian dengan nol.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Nilai parameter input tidak valid: Semua parameter (Diameter D, Panjang L, Volume Q, Beda Tinggi h, Waktu t) harus lebih besar dari 0.',
          summaryString: 'Nilai input harus > 0',
        }
      }

      const area = (Math.PI / 4) * d * d
      const denom = area * h * t
      const k = (q * l) / denom
      const { tipe, sifat } = classifyPermeability(k)

      // Validasi Kesesuaian Metode Constant Head:
      // Jika k < 0.001 cm/s, berikan peringatan KUNING (Perlu Evaluasi)
      const isTooFineForConstantHead = k < 0.001
      const status = isTooFineForConstantHead ? 'Perlu Evaluasi' : 'Valid'
      const warningMessage = isTooFineForConstantHead
        ? 'Nilai k terlalu kecil. Metode Constant Head kurang akurat untuk tanah halus. Disarankan menggunakan metode Falling Head.'
        : undefined

      const conclusion = isTooFineForConstantHead
        ? `Peringatan: Nilai k terukur (${formatScientific(k, 3)} cm/s) terlalu kecil untuk metode Constant Head. Metode Constant Head kurang akurat untuk tanah halus (${tipe}). Disarankan menggunakan metode Falling Head sesuai standar SNI 2435:2008.`
        : `Koefisien permeabilitas terukur k = ${formatScientific(k, 3)} cm/s (${tipe}). Karakteristik: ${sifat}. Hasil memenuhi standar pengujian Constant Head untuk tanah butir kasar.`

      return {
        results: [
          { label: 'Metode Pengujian', value: 'Metode Constant Head' },
          { label: 'Luas Penampang Contoh (A)', value: area.toFixed(2), unit: 'cm²' },
          { label: 'Koefisien Permeabilitas (k)', value: formatScientific(k, 3), unit: 'cm/s', highlight: true },
          { label: 'Klasifikasi Jenis Tanah', value: tipe, unit: '', highlight: true },
          { label: 'Karakteristik Rembesan', value: sifat, unit: '' },
        ],
        formulaSteps: [
          'Metode: Constant Head (Muka Air Konstan)',
          `Luas Penampang Sampel: A = (π/4) × D² = (π/4) × ${d}² = ${area.toFixed(2)} cm²`,
          'Hukum Darcy: k = (Q × L) / (A × h × t)',
          `Perhitungan: k = (${q} × ${l}) / (${area.toFixed(2)} × ${h} × ${t}) = ${formatScientific(k, 3)} cm/s`,
          `Klasifikasi Jenis Tanah: ${tipe} (${sifat})`,
        ],
        status,
        ...(warningMessage ? { warningMessage } : {}),
        conclusion,
        summaryString: `k = ${formatScientific(k, 2)} cm/s (${tipe})`,
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
    standard: 'ASTM D1475 / ASTM D445 / SNI ISO 2811',
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
      archMassaJenis: 1000.0,
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
        return [
          { key: 'archMassaJenis', label: 'Massa Jenis Fluida (ρ)', unit: 'kg/m³', desc: 'Massa jenis zat cair tempat benda tercelup (air = 1000 kg/m³)', min: 0.01, step: 'any' },
          { key: 'volumeTercelup', label: 'Volume Benda Tercelup (V)', unit: 'm³', desc: 'Volume bagian benda yang tercelup fluida (1 Liter = 0.001 m³)', min: 0.0001, step: 'any' },
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
        const rho = Number(inputs.archMassaJenis || 1000.0)
        const v = Number(inputs.volumeTercelup || 0.005)

        if (rho <= 0 || v <= 0) {
          return {
            results: [
              { label: 'Gaya Apung (Fa)', value: '-', unit: 'N', highlight: true },
              { label: 'Massa Fluida Terdesak', value: '-', unit: 'kg' },
            ],
            formulaSteps: ['Massa jenis fluida dan volume tercelup harus lebih besar dari 0.'],
            isError: true,
            status: 'Input Tidak Wajar / Cek Kembali Data',
            conclusion: 'Massa jenis fluida dan volume bagian tercelup harus bernilai positif > 0.',
            summaryString: 'Input Archimedes Tidak Valid',
          }
        }

        // Rumus: Fa = ρ * 9.81 * V
        const fa = rho * 9.81 * v
        const mTerdesak = rho * v

        return {
          results: [
            { label: 'Gaya Apung Upthrust (Fa)', value: fa.toFixed(2), unit: 'Newton', highlight: true },
            { label: 'Massa Fluida Terdesak', value: mTerdesak.toFixed(3), unit: 'kg' },
            { label: 'Volume Fluida Terdesak', value: (v * 1000).toFixed(2), unit: 'Liter', highlight: true },
            { label: 'Massa Jenis Fluida (ρ)', value: rho.toFixed(1), unit: 'kg/m³' },
          ],
          formulaSteps: [
            `Massa Jenis Cairan: ρ = ${rho.toFixed(1)} kg/m³`,
            `Volume Benda Tercelup: V = ${v} m³ (${(v * 1000).toFixed(2)} Liter)`,
            `Massa Fluida yang Dipindahkan = ρ × V = ${rho.toFixed(1)} × ${v} = ${mTerdesak.toFixed(3)} kg`,
            `Hukum Archimedes: Fa = ρ × g × V = ${rho.toFixed(1)} × 9.81 × ${v} = ${fa.toFixed(2)} N`,
          ],
          isError: false,
          status: 'Valid',
          verdictClass: 'valid',
          conclusion: `Benda yang tercelup mengalami gaya apung ke atas (Fa) sebesar ${fa.toFixed(2)} N, setara dengan berat fluida yang terdesak (${mTerdesak.toFixed(3)} kg). Sesuai dengan Hukum Archimedes.`,
          summaryString: `Fa = ${fa.toFixed(2)} N, V = ${(v * 1000).toFixed(1)} L`,
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
    standard: 'ASTM D5242 / Standar Hidraulika',
    desc: 'Menghitung bilangan Reynolds (Re) untuk mengidentifikasi rezim aliran pipa: Laminer (Re < 2000), Transisi (2000 ≤ Re ≤ 4000), atau Turbulen (Re > 4000).',
    initialInputs: {
      diameterD: 0.025,
      kecepatanV: 0.065,
      viskositasNu: 0.000001004,
    },
    fields: [
      { key: 'diameterD', label: 'Diameter Dalam Pipa (D)', unit: 'meter', desc: 'Diameter penampang dalam pipa alir (contoh: 0.025 m = 25 mm)', min: 0.001, step: 'any' },
      { key: 'kecepatanV', label: 'Kecepatan Aliran Rata-rata (v)', unit: 'm/s', desc: 'Kecepatan aliran fluida di dalam penampang pipa', min: 0.001, step: 'any' },
      { key: 'viskositasNu', label: 'Viskositas Kinematik (ν)', unit: 'm²/s', desc: 'Viskositas kinematik fluida (air pada 20°C: 1.004 × 10⁻⁶ m²/s)', min: 0.00000001, step: 'any' },
    ],
    calculate: (inputs) => {
      const d = Number(inputs.diameterD || 0.025)
      const v = Number(inputs.kecepatanV || 0.065)
      const nu = Number(inputs.viskositasNu || 0.000001004)

      if (d <= 0 || v <= 0 || nu <= 0) {
        return {
          results: [
            { label: 'Bilangan Reynolds (Re)', value: '-', unit: '', highlight: true },
            { label: 'Rezim Aliran', value: '-', unit: '', highlight: true },
            { label: 'Kecepatan Kritis Laminer', value: '-', unit: 'm/s' },
          ],
          formulaSteps: ['Diameter pipa, kecepatan aliran, dan viskositas kinematik harus lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input data tidak valid: Semua parameter (D, v, ν) harus bernilai positif > 0.',
          summaryString: 'Input Reynolds Tidak Valid',
        }
      }

      // Rumus: Re = (v * D) / ν
      const re = (v * d) / nu
      const vKritisLaminer = (2000 * nu) / d
      const vKritisTurbulen = (4000 * nu) / d

      let status = 'Laminer'
      let verdictClass = 'valid'
      let conclusion = ''

      if (re < 2000) {
        status = 'Laminer'
        verdictClass = 'valid'
        conclusion = `Aliran fluida berada dalam rezim Laminer (Re = ${re.toFixed(0)} < 2000). Garis alir fluida bergerak sejajar (streamline), tidak terjadi percampuran transversal, dan filamen zat warna terlihat lurus stabil.`
      } else if (re <= 4000) {
        status = 'Transisi'
        verdictClass = 'review'
        conclusion = `Aliran fluida berada dalam zona Kritis / Transisi (2000 ≤ Re = ${re.toFixed(0)} ≤ 4000). Aliran mulai berfluktuasi tidak stabil antara sifat laminer dan turbulen, filamen zat warna mulai bergelombang.`
      } else {
        status = 'Turbulen'
        verdictClass = 'danger'
        conclusion = `Aliran fluida berada dalam rezim Turbulen (Re = ${re.toFixed(0)} > 4000). Terjadi pusaran olakan (eddies) dan difusi momentum transversal kuat, menyebabkan zat warna langsung bercampur baur merata ke seluruh penampang pipa.`
      }

      return {
        results: [
          { label: 'Bilangan Reynolds (Re)', value: re.toFixed(0), unit: '', highlight: true },
          { label: 'Rezim Karakteristik Aliran', value: status, unit: '', highlight: true },
          { label: 'Batas Kecepatan Laminer (Re=2000)', value: vKritisLaminer.toFixed(4), unit: 'm/s' },
          { label: 'Batas Kecepatan Turbulen (Re=4000)', value: vKritisTurbulen.toFixed(4), unit: 'm/s' },
        ],
        formulaSteps: [
          `Diameter Pipa: D = ${d} m, Kecepatan: v = ${v} m/s`,
          `Viskositas Kinematik: ν = ${formatScientific(nu, 3)} m²/s`,
          `Bilangan Reynolds: Re = (v × D) / ν = (${v} × ${d}) / ${formatScientific(nu, 3)} = ${re.toFixed(1)}`,
          `Kriteria Klasifikasi Rezim: Re < 2000 (Laminer), 2000-4000 (Transisi), > 4000 (Turbulen)`,
          `Kesimpulan Status: Re = ${re.toFixed(0)} ➔ Rezim ${status}`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion,
        summaryString: `Re = ${re.toFixed(0)} (${status})`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA FLUIDA - BAB III: FLOW MEASUREMENT (VENTURI & ORIFICE)
  // -----------------------------------------------------------------------
  'mf-3-1': {
    id: 'mf-3-1',
    code: 'VNT-01',
    codePrefix: 'VN',
    name: 'Pengujian Flow Measurement (Venturi & Orifice)',
    lab: 'Mekanika Fluida',
    category: 'Mekanika Fluida • Bab 3: Flow Measurement',
    standard: 'SNI 03-2414-1991 / ASTM D5242',
    desc: 'Pengukuran debit aliran fluida (Q), laju aliran massa empiris (Mass Flow), dan evaluasi kehilangan energi (Head Loss) pada tabung venturi dan pelat orifice.',
    initialInputs: {
      manoA: 350,
      manoB: 170,
      manoC: 330,
      manoE: 340,
      manoF: 190,
      massaJenisFluida: 1000,
      diameterD1: 0.050,
      diameterD2: 0.025,
      koefisienCd: 0.98,
      deltaH: 0.18,
    },
    fields: [
      { key: 'manoA', label: 'Manometer A (mm) - Inlet Venturi', unit: 'mm', desc: 'Tinggi muka cairan piezometer A pada bagian hulu inlet pipa venturi', min: 0, step: 'any' },
      { key: 'manoB', label: 'Manometer B (mm) - Leher Venturi', unit: 'mm', desc: 'Tinggi muka cairan piezometer B pada leher sempit venturi (throat, syarat: A > B)', min: 0, step: 'any' },
      { key: 'manoC', label: 'Manometer C (mm) - Outlet Venturi', unit: 'mm', desc: 'Tinggi muka cairan piezometer C pada hilir venturi setelah pemulihan tekanan', min: 0, step: 'any' },
      { key: 'manoE', label: 'Manometer E (mm) - Inlet Orifice', unit: 'mm', desc: 'Tinggi muka cairan piezometer E pada bagian hulu sebelum pelat orifice', min: 0, step: 'any' },
      { key: 'manoF', label: 'Manometer F (mm) - Vena Contracta Orifice', unit: 'mm', desc: 'Tinggi muka cairan piezometer F pada leher sempit setelah pelat orifice (syarat: E > F)', min: 0, step: 'any' },
      { key: 'massaJenisFluida', label: 'Massa Jenis Fluida (ρ)', unit: 'kg/m³', desc: 'Kerapatan fluida pengalir (standar air murni: 1000 kg/m³)', min: 1, step: 'any' },
      { key: 'diameterD1', label: 'Diameter Pipa Masuk (D1)', unit: 'meter', desc: 'Diameter penampang inlet pipa utama (misal 50 mm = 0.050 m)', min: 0.001, step: 'any' },
      { key: 'diameterD2', label: 'Diameter Leher / Throat (D2)', unit: 'meter', desc: 'Diameter penampang sempit leher venturi (harus < D1, misal 25 mm = 0.025 m)', min: 0.001, step: 'any' },
      { key: 'koefisienCd', label: 'Koefisien Debit (Cd)', unit: '', desc: 'Faktor koreksi debit akibat gesekan (standar venturi: 0.96 - 0.99, orifice: 0.60 - 0.65)', min: 0.01, step: 'any' },
    ],
    calculate: (inputs) => {
      const manoA = Number(inputs.manoA !== undefined ? inputs.manoA : 350)
      const manoB = Number(inputs.manoB !== undefined ? inputs.manoB : 170)
      const manoC = Number(inputs.manoC !== undefined ? inputs.manoC : 330)
      const manoE = Number(inputs.manoE !== undefined ? inputs.manoE : 340)
      const manoF = Number(inputs.manoF !== undefined ? inputs.manoF : 190)
      const rho = Number(inputs.massaJenisFluida !== undefined ? inputs.massaJenisFluida : (inputs.rho || 1000))
      const d1 = Number(inputs.diameterD1 || 0.050)
      const d2 = Number(inputs.diameterD2 || 0.025)
      const cd = Number(inputs.koefisienCd || 0.98)

      // Beda tinggi manometer venturi (A - B) dalam mm:
      let dhVenturiMm = manoA - manoB
      if (inputs.manoA === undefined && inputs.manoB === undefined && inputs.deltaH !== undefined) {
        dhVenturiMm = Number(inputs.deltaH) * 1000
      }
      const dhVenturiM = dhVenturiMm / 1000

      // Beda tinggi manometer orifice (E - F) dalam mm:
      let dhOrificeMm = manoE - manoF
      if (inputs.manoE === undefined && inputs.manoF === undefined && inputs.deltaH !== undefined) {
        dhOrificeMm = Number(inputs.deltaH) * 1000
      }

      // Validasi input parameter dasar
      if (manoA <= 0 || manoB < 0 || manoC < 0 || manoE < 0 || manoF < 0 || rho <= 0 || d1 <= 0 || d2 <= 0 || cd <= 0) {
        return {
          results: [
            { label: 'Debit Aliran (Q)', value: '-', unit: 'm³/s', highlight: true },
            { label: 'Mass Flow Empiris Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Mass Flow Empiris Orifice', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Head Loss Venturi', value: '-', unit: '' },
            { label: 'Head Loss Orifice', value: '-', unit: '' },
          ],
          formulaSteps: ['Semua parameter Manometer (A, B, C, E, F), massa jenis fluida (ρ), diameter pipa, dan koefisien Cd harus bernilai positif > 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter pengujian harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      // Validasi Manometer A > B (Beda tinggi venturi)
      if (manoA <= manoB) {
        return {
          results: [
            { label: 'Debit Aliran (Q)', value: '-', unit: 'm³/s', highlight: true },
            { label: 'Mass Flow Empiris Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Mass Flow Empiris Orifice', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Head Loss Venturi', value: '-', unit: '' },
            { label: 'Head Loss Orifice', value: '-', unit: '' },
          ],
          formulaSteps: [
            `Tinggi Manometer A (${manoA} mm) <= Manometer B (${manoB} mm).`,
            'Beda tinggi piezometer inlet-leher venturi harus positif (A > B) agar terjadi pengaliran fluida ke leher berkecepatan tinggi.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Manometer A (inlet venturi) harus lebih tinggi dari Manometer B (leher venturi) agar beda tinggi Δh positif (A > B).',
          summaryString: 'Manometer A Harus > B',
        }
      }

      // Validasi Manometer E > F (Beda tinggi orifice)
      if (manoE <= manoF) {
        return {
          results: [
            { label: 'Debit Aliran (Q)', value: '-', unit: 'm³/s', highlight: true },
            { label: 'Mass Flow Empiris Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Mass Flow Empiris Orifice', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Head Loss Venturi', value: '-', unit: '' },
            { label: 'Head Loss Orifice', value: '-', unit: '' },
          ],
          formulaSteps: [
            `Tinggi Manometer E (${manoE} mm) <= Manometer F (${manoF} mm).`,
            'Beda tinggi hulu-hilir pelat orifice harus positif (E > F).',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Manometer E (hulu orifice) harus lebih tinggi dari Manometer F (vena contracta) agar beda tinggi Δh positif (E > F).',
          summaryString: 'Manometer E Harus > F',
        }
      }

      // Validasi D2 < D1
      if (d2 >= d1) {
        return {
          results: [
            { label: 'Debit Aliran (Q)', value: '-', unit: 'm³/s', highlight: true },
            { label: 'Mass Flow Empiris Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Mass Flow Empiris Orifice', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Head Loss Venturi', value: '-', unit: '' },
            { label: 'Head Loss Orifice', value: '-', unit: '' },
          ],
          formulaSteps: [
            `Diameter leher D2 (${d2} m) >= diameter pipa D1 (${d1} m).`,
            'Penyebut rumus akar bernilai imajiner / tidak terdefinisi.',
          ],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Diameter leher venturi (D2) harus lebih kecil dari diameter pipa utama (D1) agar timbul kontraksi dan beda tekanan.',
          summaryString: 'D2 Harus < D1',
        }
      }

      // 1. Perhitungan Teoretis Bernoulli (Venturi Meter)
      // A1 = π/4 * D1²; A2 = π/4 * D2²; Q = Cd * (A2 * sqrt(2 * 9.81 * Δh)) / sqrt(1 - (A2/A1)²)
      const a1 = (Math.PI / 4) * Math.pow(d1, 2)
      const a2 = (Math.PI / 4) * Math.pow(d2, 2)
      const ratioA = a2 / a1
      const pembilang = a2 * Math.sqrt(2 * 9.81 * dhVenturiM)
      const penyebut = Math.sqrt(1 - Math.pow(ratioA, 2))
      const qM3s = cd * (pembilang / penyebut)
      const qLiterS = qM3s * 1000
      const qLpm = qLiterS * 60

      // 2. Kalkulator Mass Flow Empiris Sesuai Panduan Praktikum (PDF)
      // Rumus Mass Flow Venturi (kg/s) = 0.962 * sqrt(Delta_h_mm) * (rho / 1000)
      // Rumus Mass Flow Orifice (kg/s) = 0.906 * sqrt(Delta_h_mm) * (rho / 1000)
      const massFlowVenturi = 0.962 * Math.sqrt(dhVenturiMm) * (rho / 1000)
      const massFlowOrifice = 0.906 * Math.sqrt(dhOrificeMm) * (rho / 1000)

      // 3. Kalkulator Head Loss Sesuai Panduan Praktikum (PDF)
      // Head Loss Venturi = (A - C) / (0.167 * (A - B)). (Jika A=C, hasilnya 0).
      // Head Loss Orifice = (0.83 * (E - F)) / (0.167 * (A - B)).
      const deltaAC = manoA - manoC
      const dynamicHeadRef = 0.167 * dhVenturiMm
      const headLossVenturi = manoA === manoC ? 0 : deltaAC / dynamicHeadRef
      const headLossOrifice = (0.83 * dhOrificeMm) / dynamicHeadRef

      const headLoss = {
        venturiLoss: headLossVenturi,
        orificeLoss: headLossOrifice,
        manoA,
        manoB,
        manoC,
        manoE,
        manoF,
        dhVenturiMm,
        dhOrificeMm,
        deltaAC,
        dynamicHead: dynamicHeadRef,
        lossVenturiMm: deltaAC,
        lossOrificeMm: 0.83 * dhOrificeMm,
        massFlowVenturi,
        massFlowOrifice,
        rho,
      }

      return {
        results: [
          { label: 'Debit Aliran Aktual Venturi (Q)', value: formatScientific(qM3s, 4), unit: 'm³/s', highlight: true },
          { label: 'Debit Aliran Aktual Venturi (Q)', value: qLiterS.toFixed(3), unit: 'Liter/detik', highlight: true },
          { label: 'Mass Flow Empiris Venturi', value: massFlowVenturi.toFixed(3), unit: 'kg/s', highlight: true },
          { label: 'Mass Flow Empiris Orifice', value: massFlowOrifice.toFixed(3), unit: 'kg/s', highlight: true },
          { label: 'Head Loss Venturi (Rasio)', value: headLossVenturi.toFixed(4), unit: '' },
          { label: 'Head Loss Orifice (Rasio)', value: headLossOrifice.toFixed(4), unit: '' },
          { label: 'Beda Tinggi Venturi (A - B)', value: dhVenturiMm.toFixed(1), unit: 'mm' },
          { label: 'Beda Tinggi Orifice (E - F)', value: dhOrificeMm.toFixed(1), unit: 'mm' },
          { label: 'Kapasitas Aliran', value: qLpm.toFixed(1), unit: 'L/min' },
          { label: 'Rasio Diameter (D2/D1)', value: (d2 / d1).toFixed(3), unit: '' },
        ],
        headLoss,
        formulaSteps: [
          `Luas Penampang Pipa: A1 = (π/4) × D1² = (π/4) × ${d1}² = ${formatScientific(a1, 4)} m²`,
          `Luas Penampang Leher: A2 = (π/4) × D2² = (π/4) × ${d2}² = ${formatScientific(a2, 4)} m²`,
          `Beda Tinggi Manometer Venturi: Δh_v = A - B = ${manoA} - ${manoB} = ${dhVenturiMm.toFixed(1)} mm (${dhVenturiM.toFixed(3)} m)`,
          `Beda Tinggi Manometer Orifice: Δh_o = E - F = ${manoE} - ${manoF} = ${dhOrificeMm.toFixed(1)} mm`,
          `Persamaan Venturi Bernoulli: Q = Cd × [A2 × √(2·g·Δh_v)] / √[1 - (A2/A1)²]`,
          `Q = ${cd} × [${formatScientific(a2, 4)} × ${Math.sqrt(2 * 9.81 * dhVenturiM).toFixed(3)}] / √[1 - ${Math.pow(ratioA, 2).toFixed(4)}] = ${formatScientific(qM3s, 4)} m³/s (${qLiterS.toFixed(3)} L/s)`,
          `Mass Flow Empiris Venturi: ṁ_v = 0.962 × √(Δh_v_mm) × (ρ/1000) = 0.962 × √(${dhVenturiMm.toFixed(1)}) × (${rho}/1000) = ${massFlowVenturi.toFixed(3)} kg/s`,
          `Mass Flow Empiris Orifice: ṁ_o = 0.906 × √(Δh_o_mm) × (ρ/1000) = 0.906 × √(${dhOrificeMm.toFixed(1)}) × (${rho}/1000) = ${massFlowOrifice.toFixed(3)} kg/s`,
          `Head Loss Venturi: HL_v = (A - C) / [0.167 × (A - B)] = (${manoA} - ${manoC}) / [0.167 × ${dhVenturiMm.toFixed(1)}] = ${deltaAC.toFixed(1)} / ${dynamicHeadRef.toFixed(2)} = ${headLossVenturi.toFixed(4)}`,
          `Head Loss Orifice: HL_o = [0.83 × (E - F)] / [0.167 × (A - B)] = [0.83 × ${dhOrificeMm.toFixed(1)}] / ${dynamicHeadRef.toFixed(2)} = ${(0.83 * dhOrificeMm).toFixed(2)} / ${dynamicHeadRef.toFixed(2)} = ${headLossOrifice.toFixed(4)}`,
        ],
        isError: false,
        status: 'Valid',
        verdictClass: 'valid',
        conclusion: `Debit pengaliran fluida melalui venturi meter terukur sebesar ${qLiterS.toFixed(3)} L/s (${formatScientific(qM3s, 3)} m³/s). Mass Flow empiris: Venturi = ${massFlowVenturi.toFixed(3)} kg/s, Orifice = ${massFlowOrifice.toFixed(3)} kg/s. Evaluasi Head Loss: Venturi = ${headLossVenturi.toFixed(3)} (loss rendah/pemulihan tekanan baik), Orifice = ${headLossOrifice.toFixed(3)} (loss tinggi akibat pusaran vena contracta). Perhitungan memenuhi SNI 03-2414-1991 / ASTM D5242 dan panduan praktikum hidraulika.`,
        summaryString: `Q = ${qLiterS.toFixed(3)} L/s | ṁ_v = ${massFlowVenturi.toFixed(2)} kg/s | HL_v = ${headLossVenturi.toFixed(2)}`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA FLUIDA - BAB IV: ALIRAN AMBANG TAJAM (WEIR)
  // -----------------------------------------------------------------------
  'mf-4-1': {
    id: 'mf-4-1',
    code: 'AMB-01',
    codePrefix: 'AT',
    name: 'Pengujian Aliran Ambang Tajam (Sharp Crested Weir)',
    lab: 'Mekanika Fluida',
    category: 'Mekanika Fluida • Bab 4: Ambang Tajam',
    standard: 'ASTM D5242 / SNI 03-2414-1991',
    desc: 'Pengukuran debit aliran saluran terbuka melalui mercu peluap ambang tajam segiempat (sharp crested weir).',
    initialInputs: {
      tinggiH: 0.085,
      lebarB: 0.30,
      koefisienCd: 0.60,
    },
    fields: [
      { key: 'tinggiH', label: 'Tinggi Air di Atas Mercu (H)', unit: 'meter', desc: 'Head tinggi muka air di atas mercu ambang diukur dari puncak mercu', min: 0.001, step: 'any' },
      { key: 'lebarB', label: 'Lebar Mercu Ambang (B)', unit: 'meter', desc: 'Lebar bentang bukaan mercu ambang tajam segiempat', min: 0.001, step: 'any' },
      { key: 'koefisienCd', label: 'Koefisien Debit (Cd)', unit: '', desc: 'Koefisien pengaliran ambang tajam (default: 0.60, rentang standar: 0.58 - 0.62)', min: 0.01, step: 'any' },
    ],
    calculate: (inputs) => {
      const h = Number(inputs.tinggiH || 0.085)
      const b = Number(inputs.lebarB || 0.30)
      const cd = Number(inputs.koefisienCd || 0.60)

      if (h <= 0 || b <= 0 || cd <= 0) {
        return {
          results: [
            { label: 'Debit Aliran (Q)', value: '-', unit: 'm³/s', highlight: true },
            { label: 'Debit Aliran', value: '-', unit: 'Liter/detik', highlight: true },
            { label: 'Tinggi Head Mercu', value: '-', unit: 'cm' },
          ],
          formulaSteps: ['Tinggi head air (H), lebar mercu (B), dan koefisien Cd harus lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Semua parameter input ambang tajam harus bernilai positif > 0.',
          summaryString: 'Input Ambang Tajam Tidak Valid',
        }
      }

      // Rumus: Q = Cd * (2/3) * B * sqrt(2 * 9.81) * H^(3/2)
      const sqrt2g = Math.sqrt(2 * 9.81) // ~4.4294469
      const hPow15 = Math.pow(h, 1.5)
      const qM3s = cd * (2 / 3) * b * sqrt2g * hPow15
      const qLiterS = qM3s * 1000
      const qM3h = qM3s * 3600

      return {
        results: [
          { label: 'Debit Aliran Peluap (Q)', value: qM3s.toFixed(4), unit: 'm³/s', highlight: true },
          { label: 'Debit Aliran Peluap (Q)', value: qLiterS.toFixed(2), unit: 'Liter/detik', highlight: true },
          { label: 'Tinggi Head di Mercu (H)', value: (h * 100).toFixed(1), unit: 'cm' },
          { label: 'Kapasitas Debit Per Jam', value: qM3h.toFixed(2), unit: 'm³/jam' },
        ],
        formulaSteps: [
          `Tinggi Head Mercu: H = ${h} m (${(h * 100).toFixed(1)} cm) ➔ H^(1.5) = ${hPow15.toFixed(5)}`,
          `Lebar Bukaan Mercu: B = ${b} m, Koefisien Debit: Cd = ${cd}`,
          `Konstanta Gravitasi: √(2·g) = √(2 × 9.81) = ${sqrt2g.toFixed(4)}`,
          `Faktor Pengali: (2/3) × √(2·g) = ${(2/3 * sqrt2g).toFixed(4)}`,
          `Persamaan Ambang Tajam: Q = Cd × (2/3) × B × √(2·g) × H^(3/2)`,
          `Q = ${cd} × (2/3) × ${b} × ${sqrt2g.toFixed(4)} × ${hPow15.toFixed(5)} = ${qM3s.toFixed(4)} m³/s`,
          `Konversi Satuan: Q = ${qLiterS.toFixed(2)} Liter/detik (${qM3h.toFixed(2)} m³/jam)`,
        ],
        isError: false,
        status: 'Valid',
        verdictClass: 'valid',
        conclusion: `Debit pengaliran saluran terbuka melalui ambang tajam segiempat terhitung sebesar ${qM3s.toFixed(4)} m³/s (${qLiterS.toFixed(2)} L/s) pada head mercu H = ${(h * 100).toFixed(1)} cm. Sesuai standar hidraulika ASTM D5242 / SNI 03-2414-1991.`,
        summaryString: `Q = ${qLiterS.toFixed(2)} L/s (${qM3s.toFixed(4)} m³/s)`,
      }
    },
  },

  // -----------------------------------------------------------------------
  // MEKANIKA FLUIDA - BAB V: KALIBRASI FLOWMETER (FLOW MEASUREMENT)
  // -----------------------------------------------------------------------
  'mf-5-1': {
    id: 'mf-5-1',
    code: 'FLM-01',
    codePrefix: 'FM',
    name: 'Kalibrasi Flowmeter & Flow Measurement (Venturi & Head Loss)',
    lab: 'Mekanika Fluida',
    category: 'Mekanika Fluida • Bab 5: Kalibrasi Flowmeter',
    standard: 'SNI 03-2414-1991 / Standar Kalibrasi Hidraulika',
    desc: 'Pengukuran komparatif debit volumetrik aktual (V/t) vs debit teoretis Bernoulli Venturi (kg/s), kalibrasi rotameter, serta evaluasi kehilangan energi (Head Loss) Venturi & Orifice sesuai Laporan Praktikum (PDF).',
    initialInputs: {
      volumeAktual: 10.0,
      waktuT: 25.0,
      debitTerbaca: 24.5,
      deltaH: 180,
      diameterD1: 50,
      diameterD2: 25,
      koefisienCd: 0.98,
      manoA: 350,
      manoB: 170,
      manoC: 330,
      manoE: 340,
      manoF: 190,
    },
    fields: [
      { key: 'volumeAktual', label: 'Volume Aktual Tertampung (V)', unit: 'Liter', desc: 'Volume air aktual yang ditampung pada tangki ukur hidraulika', min: 0.01, step: 'any' },
      { key: 'waktuT', label: 'Waktu Pengaliran (t)', unit: 'detik', desc: 'Waktu pengumpulan volume V menggunakan stopwatch presisi', min: 0.01, step: 'any' },
      { key: 'debitTerbaca', label: 'Debit Terbaca Flowmeter (Q_baca)', unit: 'L/min', desc: 'Nilai laju alir yang terbaca pada skala rotameter/flowmeter', min: 0.01, step: 'any' },
      { key: 'deltaH', label: 'Beda Tinggi Manometer Venturi (Δh)', unit: 'mm', desc: 'Beda tinggi muka cairan piezometer antara inlet dan throat (A - B) dalam mm', min: 0.1, step: 'any' },
      { key: 'diameterD1', label: 'Diameter Pipa 1 (D1)', unit: 'mm', desc: 'Diameter penampang pipa masuk (inlet) dalam milimeter (contoh: 50 mm)', min: 1, step: 'any' },
      { key: 'diameterD2', label: 'Diameter Leher (D2)', unit: 'mm', desc: 'Diameter penampang sempit leher venturi (throat) dalam milimeter (contoh: 25 mm)', min: 1, step: 'any' },
      { key: 'koefisienCd', label: 'Koefisien Discharge (Cd)', unit: '', desc: 'Faktor koreksi debit akibat gesekan venturi (standar praktikum: 0.96 - 0.99)', min: 0.01, step: 'any' },
      { key: 'manoA', label: 'Manometer A (mm) - Inlet Venturi', unit: 'mm', desc: 'Tinggi muka air piezometer tabung A sebelum venturi', min: 0, step: 'any' },
      { key: 'manoB', label: 'Manometer B (mm) - Leher Venturi', unit: 'mm', desc: 'Tinggi muka air piezometer tabung B pada leher venturi (syarat: A > B)', min: 0, step: 'any' },
      { key: 'manoC', label: 'Manometer C (mm) - Outlet Venturi', unit: 'mm', desc: 'Tinggi muka air piezometer tabung C pada hilir venturi', min: 0, step: 'any' },
      { key: 'manoE', label: 'Manometer E (mm) - Inlet Orifice', unit: 'mm', desc: 'Tinggi muka air piezometer tabung E sebelum pelat orifice', min: 0, step: 'any' },
      { key: 'manoF', label: 'Manometer F (mm) - Vena Contracta Orifice', unit: 'mm', desc: 'Tinggi muka air piezometer tabung F setelah pelat orifice (syarat: E > F)', min: 0, step: 'any' },
    ],
    calculate: (inputs) => {
      const v = Number(inputs.volumeAktual || 10.0)
      const t = Number(inputs.waktuT || 25.0)
      const qBaca = Number(inputs.debitTerbaca || 24.5)

      const manoA = Number(inputs.manoA !== undefined ? inputs.manoA : 350)
      const manoB = Number(inputs.manoB !== undefined ? inputs.manoB : 170)
      const manoC = Number(inputs.manoC !== undefined ? inputs.manoC : 330)
      const manoE = Number(inputs.manoE !== undefined ? inputs.manoE : 340)
      const manoF = Number(inputs.manoF !== undefined ? inputs.manoF : 190)

      const d1Mm = Number(inputs.diameterD1 || 50)
      const d2Mm = Number(inputs.diameterD2 || 25)
      const cd = Number(inputs.koefisienCd || 0.98)

      // Beda tinggi manometer venturi: prioritaskan deltaH jika diinput eksplisit, atau A - B
      let dhVenturiMm = Number(inputs.deltaH !== undefined ? inputs.deltaH : (manoA - manoB || 180))
      if (dhVenturiMm <= 0 && manoA > manoB) {
        dhVenturiMm = manoA - manoB
      }
      const dhVenturiM = dhVenturiMm / 1000

      // Beda tinggi orifice: E - F
      const dhOrificeMm = manoE - manoF

      // Validasi Input Dasar
      if (v <= 0 || t <= 0 || qBaca <= 0 || d1Mm <= 0 || d2Mm <= 0 || cd <= 0 || dhVenturiMm <= 0 || manoA <= 0) {
        return {
          results: [
            { label: 'Debit Aktual Volumetrik', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Debit Teoretis Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Selisih Debit', value: '-', unit: 'kg/s' },
            { label: 'Head Loss Venturi', value: '-', unit: '' },
            { label: 'Head Loss Orifice', value: '-', unit: '' },
          ],
          formulaSteps: ['Semua input volume, waktu, debit flowmeter, diameter pipa, dan manometer harus bernilai positif > 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Input parameter harus bernilai positif > 0.',
          summaryString: 'Input Parameter Tidak Valid',
        }
      }

      // Validasi Manometer A > B
      if (manoA <= manoB) {
        return {
          results: [
            { label: 'Debit Aktual Volumetrik', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Debit Teoretis Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Status Manometer', value: 'A <= B', unit: '' },
          ],
          formulaSteps: [`Tinggi Manometer A (${manoA} mm) <= Manometer B (${manoB} mm). Piezometer inlet harus lebih tinggi dari leher (A > B).`],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Manometer A (inlet venturi) harus lebih tinggi dari Manometer B (leher venturi).',
          summaryString: 'Manometer A Harus > B',
        }
      }

      // Validasi Manometer E > F
      if (manoE <= manoF) {
        return {
          results: [
            { label: 'Debit Aktual Volumetrik', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Debit Teoretis Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Status Manometer', value: 'E <= F', unit: '' },
          ],
          formulaSteps: [`Tinggi Manometer E (${manoE} mm) <= Manometer F (${manoF} mm). Piezometer hulu orifice harus lebih tinggi dari vena contracta (E > F).`],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Manometer E (inlet orifice) harus lebih tinggi dari Manometer F (vena contracta orifice).',
          summaryString: 'Manometer E Harus > F',
        }
      }

      // Validasi D2 < D1
      if (d2Mm >= d1Mm) {
        return {
          results: [
            { label: 'Debit Aktual Volumetrik', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Debit Teoretis Venturi', value: '-', unit: 'kg/s', highlight: true },
            { label: 'Status Dimensi', value: 'D2 >= D1', unit: '' },
          ],
          formulaSteps: [`Diameter leher D2 (${d2Mm} mm) >= diameter pipa D1 (${d1Mm} mm). Leher venturi harus lebih sempit dari pipa masuk.`],
          isError: true,
          status: 'Input Tidak Wajar / Cek Kembali Data',
          conclusion: 'Diameter leher venturi (D2) harus lebih kecil dari diameter pipa masuk (D1).',
          summaryString: 'D2 Harus < D1',
        }
      }

      // 1. DEBIT AKTUAL VOLUMETRIK
      // Q_aktual (kg/s) = (V / t) karena 1 Liter air = 1 kg
      const qAktualKgS = v / t
      const qAktualLpm = (v / t) * 60
      const errorPct = ((qBaca - qAktualLpm) / qAktualLpm) * 100
      const absError = Math.abs(errorPct)

      // 2. KALKULATOR VENTURI & ORIFICE TEORETIS (SESUAI RUMUS PDF)
      // Rumus Q (kg/s) = Cd * A2 * sqrt(2 * 9.81 * (Δh/1000) / (1 - (A2/A1)^2)) * 1000
      const d1M = d1Mm / 1000
      const d2M = d2Mm / 1000
      const a1 = (Math.PI / 4) * Math.pow(d1M, 2)
      const a2 = (Math.PI / 4) * Math.pow(d2M, 2)
      const ratioA = a2 / a1
      const penyebut = 1 - Math.pow(ratioA, 2)
      const pembilang = 2 * 9.81 * dhVenturiM
      const termSqrt = Math.sqrt(pembilang / penyebut)
      const qTeoretisKgS = cd * a2 * termSqrt * 1000
      const qTeoretisLpm = qTeoretisKgS * 60

      // 3. PERBANDINGAN DEBIT
      const selisihDebit = Math.abs(qAktualKgS - qTeoretisKgS)
      const deviasiPct = (selisihDebit / qTeoretisKgS) * 100

      // 4. KALKULATOR HEAD LOSS (SESUAI PDF)
      // Head Loss Venturi = (A - C) / (0.167 * (A - B)). (Jika A=C, hasilnya 0).
      // Head Loss Orifice = (0.83 * (E - F)) / (0.167 * (A - B)).
      const deltaAC = manoA - manoC
      const dynamicHeadRef = 0.167 * (manoA - manoB)
      const headLossVenturi = manoA === manoC ? 0 : deltaAC / dynamicHeadRef
      const headLossOrifice = (0.83 * dhOrificeMm) / dynamicHeadRef

      const isBaik = absError <= 5.0
      const status = isBaik ? 'Baik' : 'Perlu Kalibrasi'
      const verdictClass = isBaik ? 'valid' : 'review'

      const flowComparison = {
        qAktualKgS,
        qAktualLpm,
        qAktualLs: qAktualKgS,
        qTeoretisKgS,
        qTeoretisLpm,
        selisihDebit,
        deviasiPct,
        v,
        t,
        deltaHMm: dhVenturiMm,
        d1Mm,
        d2Mm,
        cd,
      }

      const headLoss = {
        venturiLoss: headLossVenturi,
        orificeLoss: headLossOrifice,
        manoA,
        manoB,
        manoC,
        manoE,
        manoF,
        dhVenturiMm,
        dhOrificeMm,
        deltaAC,
        dynamicHead: dynamicHeadRef,
        lossVenturiMm: deltaAC,
        lossOrificeMm: 0.83 * dhOrificeMm,
      }

      return {
        results: [
          { label: 'Debit Aktual Volumetrik (Q_akt)', value: qAktualKgS.toFixed(3), unit: 'kg/s', highlight: true },
          { label: 'Debit Teoretis Venturi (Q_teor)', value: qTeoretisKgS.toFixed(3), unit: 'kg/s', highlight: true },
          { label: 'Selisih Debit |Q_teor - Q_akt|', value: selisihDebit.toFixed(3), unit: 'kg/s', highlight: true },
          { label: 'Deviasi Debit Aktual vs Teoretis', value: `${deviasiPct.toFixed(2)}%`, unit: '' },
          { label: 'Debit Aktual Volumetrik', value: qAktualLpm.toFixed(2), unit: 'L/min' },
          { label: 'Debit Terbaca Flowmeter', value: qBaca.toFixed(2), unit: 'L/min' },
          { label: 'Error Pembacaan Flowmeter', value: `${errorPct >= 0 ? '+' : ''}${errorPct.toFixed(2)}%`, unit: '', highlight: true },
          { label: 'Head Loss Venturi', value: headLossVenturi.toFixed(4), unit: '' },
          { label: 'Head Loss Orifice', value: headLossOrifice.toFixed(4), unit: '' },
          { label: 'Status Kalibrasi Flowmeter', value: status, unit: '', highlight: true },
        ],
        flowComparison,
        headLoss,
        formulaSteps: [
          `1. DEBIT AKTUAL VOLUMETRIK (TANGKI UKUR):`,
          `   Volume: V = ${v.toFixed(2)} L, Waktu: t = ${t.toFixed(2)} detik`,
          `   Q_aktual = V / t = ${v.toFixed(2)} / ${t.toFixed(2)} = ${qAktualKgS.toFixed(3)} kg/s (${qAktualLpm.toFixed(2)} L/min)`,
          `2. DEBIT TEORETIS VENTURI (PERSAMAAN BERNOULLI PDF):`,
          `   D1 = ${d1Mm} mm (A1 = ${formatScientific(a1, 4)} m²), D2 = ${d2Mm} mm (A2 = ${formatScientific(a2, 4)} m²), Cd = ${cd}`,
          `   Beda Tinggi: Δh = ${dhVenturiMm.toFixed(1)} mm ➔ Δh/1000 = ${dhVenturiM.toFixed(3)} m`,
          `   Q_teoretis (kg/s) = Cd × A2 × √[2·g·(Δh/1000) / (1 - (A2/A1)²)] × 1000`,
          `   Q_teoretis = ${cd} × ${formatScientific(a2, 4)} × √[${pembilang.toFixed(4)} / ${penyebut.toFixed(4)}] × 1000 = ${qTeoretisKgS.toFixed(3)} kg/s (${qTeoretisLpm.toFixed(2)} L/min)`,
          `3. PERBANDINGAN DEBIT AKTUAL VS TEORETIS:`,
          `   Selisih Debit = |Q_aktual - Q_teoretis| = |${qAktualKgS.toFixed(3)} - ${qTeoretisKgS.toFixed(3)}| = ${selisihDebit.toFixed(3)} kg/s`,
          `   Deviasi Relatif = (${selisihDebit.toFixed(3)} / ${qTeoretisKgS.toFixed(3)}) × 100% = ${deviasiPct.toFixed(2)}%`,
          `4. EVALUASI AKURASI FLOWMETER / ROTAMETER:`,
          `   Q_terbaca = ${qBaca.toFixed(2)} L/min vs Q_aktual = ${qAktualLpm.toFixed(2)} L/min ➔ Error = ${errorPct >= 0 ? '+' : ''}${errorPct.toFixed(2)}% (Status: ${status})`,
          `5. EVALUASI HEAD LOSS (RUGI TEKAN SESUAI PDF):`,
          `   Head Dinamis Acuan: 0.167 × (A - B) = 0.167 × ${(manoA - manoB).toFixed(1)} = ${dynamicHeadRef.toFixed(2)} mm`,
          `   Head Loss Venturi: (A - C) / [0.167 × (A - B)] = (${manoA} - ${manoC}) / ${dynamicHeadRef.toFixed(2)} = ${headLossVenturi.toFixed(4)}`,
          `   Head Loss Orifice: [0.83 × (E - F)] / [0.167 × (A - B)] = [0.83 × ${dhOrificeMm.toFixed(1)}] / ${dynamicHeadRef.toFixed(2)} = ${headLossOrifice.toFixed(4)}`,
        ],
        isError: false,
        status,
        verdictClass,
        conclusion: `Debit aktual volumetrik tangki terukur sebesar ${qAktualKgS.toFixed(3)} kg/s (${qAktualLpm.toFixed(2)} L/min), sedangkan Debit teoretis Venturi terhitung sebesar ${qTeoretisKgS.toFixed(3)} kg/s (selisih ${selisihDebit.toFixed(3)} kg/s, deviasi ${deviasiPct.toFixed(2)}%). Error pembacaan flowmeter ${absError.toFixed(2)}% (${status}). Head Loss Venturi = ${headLossVenturi.toFixed(3)} dan Orifice = ${headLossOrifice.toFixed(3)}. Hasil memenuhi SNI 03-2414-1991 dan panduan praktikum hidraulika.`,
        summaryString: `Q_akt = ${qAktualKgS.toFixed(3)} kg/s | Q_teor = ${qTeoretisKgS.toFixed(3)} kg/s | HL_v = ${headLossVenturi.toFixed(2)}`,
      }
    },
  },
}
