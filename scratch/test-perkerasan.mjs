// scratch/test-perkerasan.mjs
// Automated verification test suite for all 10 Asphalt / Pavement Modules
import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=======================================================================')
console.log('VERIFIKASI INTEGRASI 10 MODUL PRAKTIKUM BAHAN PERKERASAN')
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

// 1. Modul bp-1-1 (Los Angeles)
console.log('--- 1. Uji Keausan Agregat (Los Angeles) [bp-1-1] ---')
const mod1 = calculatorRegistry['bp-1-1']
assert(mod1 !== undefined, 'Modul bp-1-1 terdaftar di calculatorRegistry')
const out1 = mod1.calculate({ beratAwalA: 5000.0, beratTertahanB: 3850.0 })
assert(!out1.isError, 'bp-1-1 kalkulasi valid tanpa error')
assert(out1.results.some(r => r.value === '23.00%'), `Keausan = 23.00% sesuai target ((5000-3850)/5000)*100`)
assert(out1.status === 'Memenuhi Standar', 'Status memenuhi standar Bina Marga (< 40%)')

// 2. Modul bp-2-1 (Penetrasi Aspal & Outlier)
console.log('\n--- 2. Uji Penetrasi Aspal & Filter Outlier [bp-2-1] ---')
const mod2 = calculatorRegistry['bp-2-1']
assert(mod2 !== undefined, 'Modul bp-2-1 terdaftar di calculatorRegistry')
const out2 = mod2.calculate({ p1: 64.0, p2: 66.0, p3: 65.0, suhuUji: 25.0, bebanJarum: 100.0, waktuUji: 5.0 })
assert(!out2.isError, 'bp-2-1 kalkulasi valid')
assert(out2.results.some(r => r.label.includes('Bersih Outlier') && r.value === '65.0'), 'Penetrasi akhir = 65.0 dmm')
assert(out2.results.some(r => r.label.includes('Standar Deviasi') && r.value === '1.00'), 'Standar deviasi S = 1.00 dmm')

// 3. Modul bp-3-1 (Titik Lembek & PI)
console.log('\n--- 3. Uji Titik Lembek & Indeks Penetrasi (PI) [bp-3-1] ---')
const mod3 = calculatorRegistry['bp-3-1']
assert(mod3 !== undefined, 'Modul bp-3-1 terdaftar di calculatorRegistry')
const out3 = mod3.calculate({ titikLembek: 49.5, penetrasi25: 65.0 })
assert(!out3.isError, 'bp-3-1 kalkulasi valid')
const piRes = out3.results.find(r => r.label.includes('Indeks Penetrasi'))
assert(piRes && Number(piRes.value) === -0.697, `Nilai PI = -0.697 (-1 <= PI <= 1)`)
assert(out3.status === 'Memenuhi Standar', 'Status PI ideal')

// 4. Modul bp-4-1 (Berat Jenis Aspal Keras)
console.log('\n--- 4. Uji Berat Jenis Aspal Keras [bp-4-1] ---')
const mod4 = calculatorRegistry['bp-4-1']
assert(mod4 !== undefined, 'Modul bp-4-1 terdaftar di calculatorRegistry')
const out4 = mod4.calculate({ massaA: 31.25, massaB: 56.40, massaC: 43.80, massaD: 56.75 })
assert(!out4.isError, 'bp-4-1 kalkulasi valid')
const bjRes = out4.results.find(r => r.label.includes('Berat Jenis'))
assert(bjRes && Number(bjRes.value) === 1.029, `Berat Jenis BJ = 1.029 g/cm³ (>= 1.000)`)
assert(out4.status === 'Memenuhi Standar', 'Status BJ memenuhi')

// 5. Modul bp-5-1 (Titik Nyala & Bakar)
console.log('\n--- 5. Uji Titik Nyala & Bakar Cleveland [bp-5-1] ---')
const mod5 = calculatorRegistry['bp-5-1']
assert(mod5 !== undefined, 'Modul bp-5-1 terdaftar di calculatorRegistry')
const out5 = mod5.calculate({ titikNyala: 285.0, titikBakar: 310.0, tekananBarometer: 101.3 })
assert(!out5.isError, 'bp-5-1 kalkulasi valid')
const nyalaRes = out5.results.find(r => r.label.includes('Titik Nyala'))
assert(nyalaRes && Number(nyalaRes.value) === 285.0, `Titik Nyala terkoreksi = 285.0°C (>= 232°C)`)

// 6. Modul bp-6-1 (Daktilitas Aspal)
console.log('\n--- 6. Uji Daktilitas Aspal [bp-6-1] ---')
const mod6 = calculatorRegistry['bp-6-1']
assert(mod6 !== undefined, 'Modul bp-6-1 terdaftar di calculatorRegistry')
const out6 = mod6.calculate({ regangan1: 125.0, regangan2: 130.0, regangan3: 128.0 })
assert(!out6.isError, 'bp-6-1 kalkulasi valid')
const dakRes = out6.results.find(r => r.label.includes('Daktilitas'))
assert(dakRes && Number(dakRes.value) === 127.7, `Daktilitas rata-rata = 127.7 cm (>= 100 cm)`)

// 7. Modul bp-7-1 (Saybolt Furol & Suhu Regresi)
console.log('\n--- 7. Uji Viskositas Saybolt Furol [bp-7-1] ---')
const mod7 = calculatorRegistry['bp-7-1']
assert(mod7 !== undefined, 'Modul bp-7-1 terdaftar di calculatorRegistry')
const out7 = mod7.calculate({ suhu1: 135.0, waktuSsf1: 95.0, suhu2: 160.0, waktuSsf2: 40.0 })
assert(!out7.isError, 'bp-7-1 kalkulasi valid')
assert(out7.results.some(r => r.label.includes('Pencampuran')), 'Hasil menghasilkan rentang suhu pencampuran')
assert(out7.results.some(r => r.label.includes('Pemadatan')), 'Hasil menghasilkan rentang suhu pemadatan')

// 8. Modul bp-8-1 (Job Mix Formula JMF)
console.log('\n--- 8. Job Mix Formula (JMF) [bp-8-1] ---')
const mod8 = calculatorRegistry['bp-8-1']
assert(mod8 !== undefined, 'Modul bp-8-1 terdaftar di calculatorRegistry')
const out8 = mod8.calculate({ ca: 52.0, fa: 41.5, filler: 6.5, k: 0.75 })
assert(!out8.isError, 'bp-8-1 kalkulasi valid')
const kaaRes = out8.results.find(r => r.label.includes('Kadar Aspal Awal'))
assert(kaaRes && kaaRes.value === '5.61%', `Kadar Aspal Awal KAA = 5.61%`)

// 9. Modul bp-9-1 (Uji Marshall Test - Target PDF: VIM = 5.624%)
console.log('\n--- 9. Uji Marshall Test [bp-9-1] ---')
const mod9 = calculatorRegistry['bp-9-1']
assert(mod9 !== undefined, 'Modul bp-9-1 terdaftar di calculatorRegistry')
assert(Array.isArray(mod9.fieldTabs) && mod9.fieldTabs.length === 3, 'Form Marshall memiliki 3 tab field (Data Berat, Data Material, Data Alat)')
const out9 = mod9.calculate({
  beratKering: 1153.6,
  beratSsd: 1158.2,
  beratAir: 662.4,
  kadarAspalPa: 5.8,
  persenAgregatPs: 94.2,
  gsb: 2.620,
  gse: 2.6968,
  ga: 1.030,
  bacaanStabilitas: 265.0,
  flow: 3.2,
  angkaKorelasi: 1.00,
  kalibrasiAlat: 3.82,
})
assert(!out9.isError, 'bp-9-1 kalkulasi valid')
const vimRes = out9.results.find(r => r.label.includes('VIM'))
assert(vimRes && vimRes.value === '5.624%', `VIM terhitung PERSIS = 5.624% (sesuai data dummy PDF Laporan: ${vimRes ? vimRes.value : 'N/A'})`)
const stabRes = out9.results.find(r => r.label.includes('Stabilitas Marshall'))
assert(stabRes && Number(stabRes.value) === 1012.3, `Stabilitas Marshall = 1012.3 kg`)
const flowRes = out9.results.find(r => r.label.includes('Flow'))
assert(flowRes && Number(flowRes.value) === 3.2, `Flow = 3.20 mm`)
const mqRes = out9.results.find(r => r.label.includes('Marshall Quotient'))
assert(mqRes && Number(mqRes.value) === 316.3, `MQ = 316.3 kg/mm`)

// 10. Modul bp-10-1 (Ekstraksi Aspal)
console.log('\n--- 10. Uji Ekstraksi Aspal [bp-10-1] ---')
const mod10 = calculatorRegistry['bp-10-1']
assert(mod10 !== undefined, 'Modul bp-10-1 terdaftar di calculatorRegistry')
const out10 = mod10.calculate({ beratSampelW1: 1000.0, beratAgregatW2: 943.0, kadarAspalJmf: 5.8 })
assert(!out10.isError, 'bp-10-1 kalkulasi valid')
const ektRes = out10.results.find(r => r.label.includes('Kadar Aspal Aktual'))
assert(ektRes && ektRes.value === '5.70%', `Kadar Aspal Aktual = 5.70% (deviasi 0.10% <= 0.30%)`)
assert(out10.status === 'Memenuhi Standar', 'Status memenuhi toleransi JMF Bina Marga')

console.log('\n=======================================================================')
console.log(`HASIL AKHIR VERIFIKASI: ${passCount} LULUS, ${failCount} GAGAL`)
console.log('=======================================================================')

if (failCount > 0) {
  process.exit(1)
} else {
  console.log('SEMUA 10 MODUL PRAKTIKUM BAHAN PERKERASAN 100% LOLOS UJI DAN TERVERIFIKASI!')
}
