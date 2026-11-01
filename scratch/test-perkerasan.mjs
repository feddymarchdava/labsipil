// scratch/test-perkerasan.mjs
// Automated verification test suite for all 10 Asphalt / Pavement Modules
import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=======================================================================')
console.log('VERIFIKASI INTEGRASI LENGKAP 10 MODUL PRAKTIKUM BAHAN PERKERASAN')
console.log('=======================================================================\n')

let passCount = 0
let failCount = 0

function assert(condition, message) {
  if (condition) {
    passCount++
    console.log(`[PASS] ${message}`)
  } else {
    failCount++
    console.error(`[FAIL] ${message}`)
  }
}

// -----------------------------------------------------------------------------
// 1. Modul bp-1-1 (Los Angeles Abrasion)
// -----------------------------------------------------------------------------
console.log('--- 1. Uji Keausan Agregat Mesin Los Angeles [bp-1-1] ---')
const mod1 = calculatorRegistry['bp-1-1']
assert(mod1 !== undefined, 'Modul bp-1-1 terdaftar di calculatorRegistry')
assert(mod1.fields.every(f => f.key !== 'beratTertahanB100'), 'Field 100 putaran (beratTertahanB100) sudah dihapus')
assert(!('beratTertahanB100' in mod1.initialInputs), 'beratTertahanB100 sudah dihapus dari initialInputs')

const out1 = mod1.calculate({
  gradasiTipe: 'B',
  jenisCampuran: 'umum',
  beratAwalA: 5000.0,
  beratTertahanB: 3850.0,
})
assert(!out1.isError, 'bp-1-1 kalkulasi default valid tanpa error')
assert(out1.results.length === 3, `bp-1-1 menghasilkan 3 kartu ringkasan output (terdapat: ${out1.results.length})`)
assert(out1.results[0].value === '23.00%', 'Kartu 1: Keausan 500 putaran = 23.00%')
assert(out1.results[1].value === '1150.0', 'Kartu 2: Berat lolos = 1150.0 gram')
assert(out1.results[2].value === 'Memenuhi Standar', 'Kartu 3: Status kelayakan = Memenuhi Standar')
assert(out1.verdictClass === 'valid', 'verdictClass = valid (Hijau)')
assert(out1.formulaSteps.every(s => !s.includes('100 Putaran') && !s.includes('B_100')), 'Teks rumus tidak mengandung 100 putaran')

// Uji jika keausan melebihi batas maksimum (Misal 44% > 40%) -> Status: Tidak Layak (Merah)
const out1Fail = mod1.calculate({
  gradasiTipe: 'B',
  jenisCampuran: 'umum',
  beratAwalA: 5000.0,
  beratTertahanB: 2800.0, // Keausan = ((5000 - 2800) / 5000) * 100 = 44.00%
})
assert(out1Fail.verdictClass === 'error' && out1Fail.status === 'Tidak Layak', 'bp-1-1 merah (Tidak Layak) jika keausan melebihi batas maksimum')

// -----------------------------------------------------------------------------
// 2. Modul bp-2-1 (Penetrasi Aspal Keras)
// -----------------------------------------------------------------------------
console.log('\n--- 2. Uji Penetrasi Aspal Keras [bp-2-1] ---')
const mod2 = calculatorRegistry['bp-2-1']
assert(mod2 !== undefined, 'Modul bp-2-1 terdaftar di calculatorRegistry')
const out2 = mod2.calculate({
  kelasAspal: 'pen6070',
  x1: 64.0, x2: 66.0, x3: 65.0, x4: 67.0, x5: 63.0,
})
assert(!out2.isError, 'bp-2-1 kalkulasi default valid')
assert(out2.results.length === 4, 'bp-2-1 menghasilkan 4 kartu ringkasan output')
assert(out2.results[0].value === '65.0', 'Kartu 1: Penetrasi Akhir = 65.0 dmm')
assert(out2.results[3].value === '2.0' || out2.results[3].value === '4.0', 'Kartu 4: Selisih Presisi SNI terhitung valid')

// -----------------------------------------------------------------------------
// 3. Modul bp-3-1 (Titik Lembek & PI)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Uji Titik Lembek & Indeks Penetrasi (PI) [bp-3-1] ---')
const mod3 = calculatorRegistry['bp-3-1']
assert(mod3 !== undefined, 'Modul bp-3-1 terdaftar di calculatorRegistry')
const out3 = mod3.calculate({
  t1: 50.2, t2: 50.8, pen25: 65.0, kelasAspal: 'pen6070',
})
assert(!out3.isError, 'bp-3-1 kalkulasi valid')
assert(out3.results.length === 4, 'bp-3-1 menghasilkan 4 kartu ringkasan output')
assert(out3.results[0].value === '50.5', 'Kartu 1: T_RB = 50.5 °C')
assert(out3.results[1].value === '-0.44', 'Kartu 2: PI = -0.44')

// -----------------------------------------------------------------------------
// 4. Modul bp-4-1 (Berat Jenis Aspal Keras Piknometer)
// -----------------------------------------------------------------------------
console.log('\n--- 4. Uji Berat Jenis Aspal Keras dengan Piknometer [bp-4-1] ---')
const mod4 = calculatorRegistry['bp-4-1']
assert(mod4 !== undefined, 'Modul bp-4-1 terdaftar di calculatorRegistry')
const out4 = mod4.calculate({
  massaA: 24.50, massaB: 49.42, massaC: 39.85, massaD: 49.88, rhoW: 0.9970,
})
assert(!out4.isError, 'bp-4-1 kalkulasi valid')
assert(out4.results.length === 4, 'bp-4-1 menghasilkan 4 kartu ringkasan output')
assert(out4.results[0].value === '1.031', 'Kartu 1: BJ = 1.031')
assert(out4.results[1].value === '1.028', 'Kartu 2: Densitas = 1.028 gr/cm³')

// -----------------------------------------------------------------------------
// 5. Modul bp-5-1 (Titik Nyala & Bakar Cleveland)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Uji Titik Nyala & Titik Bakar Cleveland Open Cup [bp-5-1] ---')
const mod5 = calculatorRegistry['bp-5-1']
assert(mod5 !== undefined, 'Modul bp-5-1 terdaftar di calculatorRegistry')
const out5 = mod5.calculate({
  cNyala: 242.0, cBakar: 254.0, tekananK: 101.3, syaratNyalaMin: 232,
})
assert(!out5.isError, 'bp-5-1 kalkulasi valid')
assert(out5.results.length === 4, 'bp-5-1 menghasilkan 4 kartu ringkasan output')
assert(out5.results[0].value.includes('242.0 °C (Pelaporan SNI: 242 °C)'), 'Kartu 1: Titik nyala terkoreksi 242.0 °C (SNI: 242 °C)')
assert(out5.results[3].value === '12.0 °C', 'Kartu 4: Selisih bakar-nyala = 12.0 °C')

// Uji sampel data default laprak (3 sampel titik nyala, 3 sampel titik bakar, tekanan 727 mmHg)
const out5Laprak = mod5.calculate(mod5.initialInputs)
assert(!out5Laprak.isError, 'bp-5-1 data laprak kalkulasi valid')
assert(out5Laprak.results[0].value.includes('324.43 °C (Pelaporan SNI: 324 °C)'), 'Kartu 1 Laprak: 324.43 °C (SNI: 324 °C)')
assert(out5Laprak.results[1].value.includes('345.43 °C (Pelaporan SNI: 345 °C)'), 'Kartu 2 Laprak: 345.43 °C (SNI: 345 °C)')
assert(out5Laprak.results[3].value === '21.0 °C', 'Kartu 4 Laprak: Selisih bakar-nyala = 21.0 °C')
assert(out5Laprak.formulaSteps.some(s => s.includes('Sampel Titik Nyala: [325.0°C, 330.0°C, 315.0°C] (3 Sampel)')), 'Formula step laprak memuat format array sampel titik nyala')
assert(out5Laprak.formulaSteps.some(s => s.includes('C_nyala = (325.0 + 330.0 + 315.0) / 3 = 323.33 °C')), 'Formula step laprak memuat C_nyala rata-rata')

// Uji sampel dinamis 4 titik
const out5Dynamic4 = mod5.calculate({
  samples: [
    { id: 1, flashPoint: 320.0, firePoint: 330.0 },
    { id: 2, flashPoint: 325.0, firePoint: 340.0 },
    { id: 3, flashPoint: 330.0, firePoint: 350.0 },
    { id: 4, flashPoint: 335.0, firePoint: 360.0 },
  ],
  tekananK: 101.3,
  tekananKUnit: 'kPa',
})
assert(!out5Dynamic4.isError, 'bp-5-1 kalkulasi dinamis 4 sampel valid')
assert(out5Dynamic4.results[0].value.includes('327.50 °C'), 'Kartu 1 dinamis 4 sampel: 327.50 °C')
assert(out5Dynamic4.formulaSteps.some(s => s.includes('(4 Sampel)')), 'Langkah rumus dinamis mencantumkan (4 Sampel)')

// Uji validasi 0 sampel
const out5Empty = mod5.calculate({ samples: [], tekananK: 727.0 })
assert(out5Empty.isError === true, 'bp-5-1 0 sampel menghasilkan isError: true')
assert(out5Empty.status === 'Minimal 1 Sampel', 'bp-5-1 0 sampel berstatus Minimal 1 Sampel')
assert(out5Empty.results[0].value === 'Minimal 1 Sampel', 'Kartu 1 kosong menampilkan Minimal 1 Sampel')

// -----------------------------------------------------------------------------
// 6. Modul bp-6-1 (Daktilitas Aspal - SNI 2432:2011)
// -----------------------------------------------------------------------------
console.log('\n--- 6. Uji Daktilitas Aspal (SNI 2432:2011) [bp-6-1] ---')
const mod6 = calculatorRegistry['bp-6-1']
assert(mod6 !== undefined, 'Modul bp-6-1 terdaftar di calculatorRegistry')
assert(mod6.fields.some(f => f.key === 'kelasAspal' && f.type === 'select'), 'Field kelasAspal bertipe select')
assert(mod6.fields.filter(f => ['d1', 'd2', 'd3'].includes(f.key)).length === 3, 'Terdapat 3 field bacaan regangan d1, d2, d3')

const out6 = mod6.calculate({
  kelasAspal: 'pen6070',
  d1: 118.0,
  d2: 122.0,
  d3: 120.0,
})
assert(!out6.isError, 'bp-6-1 kalkulasi default valid')
assert(out6.results.length === 4, `bp-6-1 menghasilkan 4 kartu ringkasan output (terdapat: ${out6.results.length})`)
assert(out6.results[0].label === 'Daktilitas Rata-rata (D_rata)' && out6.results[0].value === '120.0', 'Kartu 1: Daktilitas Rata-rata = 120.0 cm')
assert(out6.results[1].label === 'Rentang Regangan (Min - Maks)' && out6.results[1].value === '118.0 s/d 122.0', 'Kartu 2: Rentang regangan = 118.0 s/d 122.0 cm')
assert(out6.results[2].label === 'Simpangan Baku & Variasi' && out6.results[2].value.includes('2.00 cm (1.67%)'), 'Kartu 3: SD = 2.00 cm & CV = 1.67%')
assert(out6.results[3].label === 'Status Kohesivitas Aspal' && out6.results[3].value === 'Memenuhi Standar', 'Kartu 4: Status = Memenuhi Standar')
assert(out6.verdictClass === 'valid', 'verdictClass = valid (Hijau)')

// Test variasi daktilitas jika ada sampel < 100 cm tapi rata-rata >= 100 cm
const out6Warning = mod6.calculate({
  kelasAspal: 'pen6070',
  d1: 95.0,
  d2: 125.0,
  d3: 120.0, // D_rata = 113.3 >= 100, tapi d1 < 100
})
assert(out6Warning.verdictClass === 'warning' && out6Warning.status === 'Perlu Evaluasi', 'bp-6-1 kuning (Perlu Evaluasi) jika salah satu cetakan < 100 cm')

// Test gagal daktilitas < 100 cm
const out6Fail = mod6.calculate({
  kelasAspal: 'pen6070',
  d1: 80.0,
  d2: 85.0,
  d3: 82.0, // D_rata = 82.3 < 100
})
assert(out6Fail.verdictClass === 'error' && out6Fail.status === 'Tidak Layak', 'bp-6-1 merah (Tidak Layak) jika D_rata < 100 cm')

// Test multi-sampel dinamis laprak: satuan mm dan eliminasi sampel putus dini (1500 mm, 1500 mm, 120 mm)
const out6Laprak = mod6.calculate({
  kelasAspal: 'pen6070',
  satuanInput: 'mm',
  samples: [
    { id: 1, name: 'Benda Uji I', value: 1500, isValid: true },
    { id: 2, name: 'Benda Uji II', value: 1500, isValid: true },
    { id: 3, name: 'Benda Uji III (Putus Dini)', value: 120, isValid: false },
  ],
})
assert(!out6Laprak.isError, 'bp-6-1 multi-sampel laprak valid')
assert(out6Laprak.nValid === 2, 'Hanya 2 sampel valid dihitung')
assert(out6Laprak.results[0].value === '150.0', 'D_rata dari sampel valid = 150.0 cm')
assert(out6Laprak.results[1].value === '150.0 s/d 150.0', 'Rentang regangan = 150.0 s/d 150.0 cm')
assert(out6Laprak.results[3].value === 'Memenuhi Standar', 'Status kelayakan = Memenuhi Standar')
assert(out6Laprak.formulaSteps.some(s => s.includes('1500.0 mm ➔ 150.0 cm')), 'Langkah rumus memuat konversi mm ke cm')
assert(out6Laprak.formulaSteps.some(s => s.includes('Dieliminasi / Benda Uji Gagal / Putus Dini')), 'Langkah rumus memuat status eliminasi benda uji gagal')

// -----------------------------------------------------------------------------
// 7. Modul bp-7-1 (Viskositas Saybolt Furol - SNI 7729:2011)
// -----------------------------------------------------------------------------
console.log('\n--- 7. Uji Viskositas Saybolt Furol & Suhu Kerja (SNI 7729:2011) [bp-7-1] ---')
const mod7 = calculatorRegistry['bp-7-1']
assert(mod7 !== undefined, 'Modul bp-7-1 terdaftar di calculatorRegistry')
assert(mod7.fields.some(f => f.key === 'metodeKonversi' && f.type === 'select'), 'Field metodeKonversi bertipe select')
assert(mod7.fields.some(f => f.key === 'standarTarget' && f.type === 'select'), 'Field standarTarget bertipe select')

const out7 = mod7.calculate({
  metodeKonversi: 'astm',
  standarTarget: 'binamarga',
  suhu1: 120.0,
  waktu1: 340.0,
  suhu2: 135.0,
  waktu2: 165.0,
  suhu3: 150.0,
  waktu3: 82.0,
  suhu4: 165.0,
  waktu4: 43.0,
})
assert(!out7.isError, 'bp-7-1 kalkulasi default valid')
assert(out7.results.length === 4, `bp-7-1 menghasilkan 4 kartu ringkasan output (terdapat: ${out7.results.length})`)
assert(out7.results[0].label.includes('Rentang Suhu Pencampuran') && out7.results[0].value.includes('°C'), 'Kartu 1: Rentang suhu pencampuran terhitung')
assert(out7.results[1].label.includes('Rentang Suhu Pemadatan') && out7.results[1].value.includes('°C'), 'Kartu 2: Rentang suhu pemadatan terhitung')
assert(out7.results[2].label.includes('Viskositas Kinematik pada 135°C') && out7.results[2].value.includes('cSt'), 'Kartu 3: Viskositas pada 135°C terhitung')
assert(out7.results[3].label.includes('Persamaan Regresi') && out7.results[3].unit.includes('R²'), 'Kartu 4: Persamaan regresi & R²')
assert(out7.viscosityChart !== undefined, 'bp-7-1 menyertakan data viscosityChart untuk rendering grafik')
assert(out7.viscosityChart.chartPoints.length > 0, 'viscosityChart memiliki titik kurva chartPoints')
assert(out7.viscosityChart.v135 >= 300.0, `v135 terhitung = ${out7.viscosityChart.v135.toFixed(1)} cSt (>= 300 cSt Bina Marga)`)
assert(out7.verdictClass === 'valid', 'verdictClass = valid (Hijau)')

// Test dynamic points (5 titik pengujian)
const out7Dynamic5 = mod7.calculate({
  metodeKonversi: 'astm',
  standarTarget: 'binamarga',
  viscosityPoints: [
    { id: 1, temp: 120.0, time: 340.0 },
    { id: 2, temp: 135.0, time: 165.0 },
    { id: 3, temp: 150.0, time: 82.0 },
    { id: 4, temp: 165.0, time: 43.0 },
    { id: 5, temp: 180.0, time: 24.0 },
  ],
})
assert(!out7Dynamic5.isError, 'bp-7-1 kalkulasi dinamis 5 titik valid')
assert(out7Dynamic5.viscosityChart.pointsData.length === 5, 'viscosityChart memuat 5 titik pengujian')
assert(out7Dynamic5.r2 > 0.98, 'Korelasi R2 sangat kuat > 0.98')

// Test custom target viscosity
const out7Custom = mod7.calculate({
  metodeKonversi: 'astm',
  standarTarget: 'custom',
  vMixMin: 160.0,
  vMixMax: 200.0,
  vCompMin: 260.0,
  vCompMax: 320.0,
  viscosityPoints: [
    { id: 1, temp: 120.0, time: 340.0 },
    { id: 2, temp: 140.0, time: 130.0 },
    { id: 3, temp: 160.0, time: 55.0 },
  ],
})
assert(!out7Custom.isError, 'bp-7-1 kalkulasi custom target valid')
assert(out7Custom.vMixMin === 160 && out7Custom.vMixMax === 200, 'Target viskositas mixing custom sesuai input')
assert(out7Custom.vCompMin === 260 && out7Custom.vCompMax === 320, 'Target viskositas pemadatan custom sesuai input')

// -----------------------------------------------------------------------------
// 8. Modul bp-8-1 (Job Mix Formula KAA - Pd T-03-2005-B)
// -----------------------------------------------------------------------------
console.log('\n--- 8. Job Mix Formula (JMF) – Kadar Aspal Acuan [bp-8-1] ---')
const mod8 = calculatorRegistry['bp-8-1']
assert(mod8 !== undefined, 'Modul bp-8-1 terdaftar di calculatorRegistry')
assert(mod8.fields.some(f => f.key === 'jenisCampuran' && f.type === 'select'), 'Field jenisCampuran bertipe select')
assert(mod8.fields.some(f => f.key === 'wTotal'), 'Field wTotal tersedia (default 1200g)')

const out8 = mod8.calculate({
  jenisCampuran: 'ac-wc',
  ca: 54.0,
  fa: 40.0,
  filler: 6.0,
  k: 0.75,
  wTotal: 1200.0,
})
assert(!out8.isError, 'bp-8-1 kalkulasi default valid')
assert(out8.results.length === 4, `bp-8-1 menghasilkan 4 kartu ringkasan output (terdapat: ${out8.results.length})`)
assert(out8.results[0].value.includes('5.52%') && out8.results[0].value.includes('5.5%'), 'Kartu 1: KAA murni = 5.52% -> Dibulatkan: 5.5%')
assert(out8.results[1].value === '100.0%', 'Kartu 2: Total agregat = 100.0%')
assert(out8.results[2].value === '4.5% | 5.0% | 5.5% | 6.0% | 6.5%', 'Kartu 3: 5 variasi = 4.5% s.d. 6.5%')
assert(out8.results[3].value === '66.0 gram', 'Kartu 4: Berat aspal pada KAA = 66.0 gram')
assert(out8.jmfTable !== undefined, 'bp-8-1 menyertakan data jmfTable untuk tabel variasi briket')
assert(out8.jmfTable.rows.length === 5, 'jmfTable memiliki tepat 5 baris variasi kadar aspal')
assert(out8.jmfTable.rows[2].isAcuan === true, 'Variasi ke-3 ditandai sebagai KAA Acuan')
assert(out8.jmfTable.rows[2].beratAspal === 66.0, 'Berat aspal pada acuan = 66.0 gram')
assert(out8.jmfTable.rows[2].beratAgTotal === 1134.0, 'Berat agregat total pada acuan = 1134.0 gram')
assert(out8.verdictClass === 'valid', 'verdictClass = valid (Hijau)')

// Test proporsi agregat gagal != 100%
const out8Error = mod8.calculate({
  jenisCampuran: 'ac-wc',
  ca: 55.0,
  fa: 40.0,
  filler: 6.0, // total = 101%
  k: 0.75,
  wTotal: 1200.0,
})
assert(out8Error.verdictClass === 'error' && out8Error.status === 'Tidak Valid', 'bp-8-1 merah (Tidak Valid) jika total agregat != 100%')

// Test JMF Laprak Universitas Tidar (Tabel 11.1 s/d 11.4)
const out8Laprak = mod8.calculate(mod8.initialInputs)
assert(!out8Laprak.isError, 'bp-8-1 data laprak valid')
assert(out8Laprak.ca === 39.0, 'Fraksi CA = 39.0%')
assert(out8Laprak.fa === 54.5, 'Fraksi FA = 54.5%')
assert(out8Laprak.filler === 6.5, 'Fraksi Filler = 6.5%')
assert(out8Laprak.wAspalRencana === 78.0, 'W_aspal rencana = 78.0 g')
assert(out8Laprak.wAgregatRencana === 1122.0, 'W_agregat rencana = 1122.0 g')
assert(Math.abs(out8Laprak.kaaMurni - 5.7375) < 1e-4, 'KAA = 5.7375%')
assert(out8Laprak.mixDesignTable.length === 5, 'Tabel 11.4 memiliki 5 baris')
assert(out8Laprak.mixDesignTable[0].persenCampuran === 36.465, 'CA terhadap campuran = 36.465%')
assert(out8Laprak.allSpecOk === true, 'Seluruh ayakan memenuhi spek AC-WC Bina Marga 2018')

// -----------------------------------------------------------------------------
// 9. Modul bp-9-1 (Uji Marshall Test - SNI 06-2489-1991)
// -----------------------------------------------------------------------------
console.log('\n--- 9. Uji Karakteristik Marshall (SNI 06-2489-1991) [bp-9-1] ---')
const mod9 = calculatorRegistry['bp-9-1']
assert(mod9 !== undefined, 'Modul bp-9-1 terdaftar di calculatorRegistry')
assert(Array.isArray(mod9.fieldTabs) && mod9.fieldTabs.length === 3, 'Form Marshall memiliki 3 tab navigasi terstruktur')

const out9 = mod9.calculate({
  jenisCampuran: 'ac-wc',
  kadarAspalPb: 5.8,
  p1: 54.0, p2: 40.0, p3: 6.0,
  gsb1: 2.620, gsa1: 2.710,
  gsb2: 2.580, gsa2: 2.690,
  gsb3: 2.700, gsa3: 2.750,
  gb: 1.030,
  beratKering: 1192.0,
  beratSsd: 1198.0,
  beratAir: 685.0,
  tebalBriket: 63.5,
  angkaKorelasi: 1.00,
  bacaanStabilitas: 68.0,
  kalibrasiAlat: 14.85,
  flow: 3.20,
})
assert(!out9.isError, 'bp-9-1 kalkulasi default valid')
assert(out9.results.length === 6, `bp-9-1 menghasilkan 6 kartu ringkasan output utama (terdapat: ${out9.results.length})`)
assert(out9.results[0].label.includes('VIM'), 'Kartu 1: VIM')
assert(out9.results[1].label.includes('VMA'), 'Kartu 2: VMA')
assert(out9.results[2].label.includes('VFA'), 'Kartu 3: VFA')
assert(out9.results[3].label.includes('Stabilitas Terkoreksi'), 'Kartu 4: Stabilitas Terkoreksi')
assert(out9.results[4].label.includes('Flow'), 'Kartu 5: Kelelehan Plastis Flow')
assert(out9.results[5].label.includes('Marshall Quotient'), 'Kartu 6: Marshall Quotient MQ')
assert(out9.marshallChecklist !== undefined, 'bp-9-1 menyertakan data marshallChecklist untuk evaluasi Bina Marga 2018')
assert(out9.marshallChecklist.items.length === 6, 'marshallChecklist memiliki tepat 6 parameter evaluasi')
assert(out9.marshallChecklist.allPassed === true, 'Seluruh parameter Marshall default memenuhi spesifikasi')
assert(out9.verdictClass === 'valid', 'verdictClass = valid (Hijau)')

// -----------------------------------------------------------------------------
// 10. Modul bp-10-1 (Ekstraksi Aspal Sentrifus - SNI 03-6894-2002 W1 s.d. W5)
// -----------------------------------------------------------------------------
console.log('\n--- 10. Uji Ekstraksi Kadar Aspal Sentrifus (SNI 03-6894-2002) [bp-10-1] ---')
const mod10 = calculatorRegistry['bp-10-1']
assert(mod10 !== undefined, 'Modul bp-10-1 terdaftar di calculatorRegistry')
assert(mod10.fields.some(f => f.key === 'beratTalam'), 'Field beratTalam tersedia')
assert(mod10.fields.some(f => f.key === 'beratTalamSampel'), 'Field beratTalamSampel tersedia')
assert(mod10.fields.some(f => f.key === 'beratTalamSampelFilter'), 'Field beratTalamSampelFilter tersedia')
assert(mod10.fields.some(f => f.key === 'beratFilterW2'), 'Field beratFilterW2 tersedia')
assert(mod10.fields.some(f => f.key === 'beratMineralFilterW4'), 'Field beratMineralFilterW4 tersedia')
assert(mod10.fields.some(f => f.key === 'kadarAspalJmf'), 'Field kadarAspalJmf tersedia')

// Test 10.1: Kalkulasi Default Laporan Praktikum Manual (SNI 03-6894-2002)
const out10 = mod10.calculate(mod10.initialInputs)
assert(!out10.isError, 'bp-10-1 kalkulasi default valid')
assert(out10.results.length === 4, `bp-10-1 menghasilkan 4 kartu ringkasan output (terdapat: ${out10.results.length})`)
assert(out10.results[0].value === '4.17%', `Kartu 1: Kadar aspal aktual = 4.17% (terdapat: ${out10.results[0].value})`)
assert(out10.results[1].value === '48.9', `Kartu 2: Berat aspal W5 = 48.9 gram (terdapat: ${out10.results[1].value})`)
assert(out10.results[2].value === '1172.0', `Kartu 3: Berat sampel W1 = 1172.0 gram (terdapat: ${out10.results[2].value})`)
assert(out10.results[3].value === '-1.33%', `Kartu 4: Deviasi JMF = -1.33% (terdapat: ${out10.results[3].value})`)
assert(out10.verdictClass === 'error' && out10.status === 'Tidak Memenuhi Standar', 'bp-10-1 merah jika deviasi > ±0.30%')
assert(out10.formulaSteps.some(s => s.includes('W1 = 1420.7 - 248.7 = 1172.0 gram')), 'Langkah 1 hitung W1 valid')
assert(out10.formulaSteps.some(s => s.includes('W3 = 1446.7 - 248.7 = 1198.0 gram')), 'Langkah 2 hitung W3 valid')
assert(out10.formulaSteps.some(s => s.includes('W5 = 1198.0 - 1149.1 = 48.9 gram')), 'Langkah 3 hitung W5 valid')
assert(out10.formulaSteps.some(s => s.includes('B = (48.9 / 1172.0) × 100% = 4.17%')), 'Langkah 4 hitung B aktual valid')

// Test 10.2: Kondisi Memenuhi Standar (Deviasi <= ±0.30%)
const out10Memenuhi = mod10.calculate({
  ...mod10.initialInputs,
  kadarAspalJmf: 4.20,
})
assert(out10Memenuhi.verdictClass === 'valid' && out10Memenuhi.status === 'Memenuhi Standar', 'bp-10-1 hijau (Memenuhi Standar) jika |deviasi| <= 0.30%')
assert(out10Memenuhi.results[3].value === '-0.03%', 'Deviasi -0.03% terhitung presisi')

// Test 10.3: Kondisi Kelebihan Kadar Aspal (Deviasi > +0.30%)
const out10Kelebihan = mod10.calculate({
  ...mod10.initialInputs,
  kadarAspalJmf: 3.50,
})
assert(out10Kelebihan.verdictClass === 'error' && out10Kelebihan.status === 'Tidak Memenuhi Standar', 'bp-10-1 merah jika deviasi > +0.30%')
assert(out10Kelebihan.conclusion.includes('bleeding'), 'Kesimpulan mengidentifikasi risiko bleeding jika kadar aspal berlebih')

console.log('\n=======================================================================')
console.log(`HASIL AKHIR VERIFIKASI: ${passCount} LULUS, ${failCount} GAGAL`)
console.log('=======================================================================')

if (failCount > 0) {
  process.exit(1)
} else {
  console.log('SEMUA 10 MODUL PRAKTIKUM BAHAN PERKERASAN 100% LOLOS UJI DAN TERVERIFIKASI!')
}
