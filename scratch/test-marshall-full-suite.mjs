import assert from 'assert'
import {
  calculatorRegistry,
  DEFAULT_MARSHALL_SPECIMENS,
  DEFAULT_MARSHALL_SURFACE_AREA_TABLE,
  interpolateMarshallCorrelation,
} from '../src/testCalculatorsData.js'

console.log('=======================================================================')
console.log('TEST SUITE: UJI KARAKTERISTIK MARSHALL (BAB 9 BP-9-1 / MAR-01)')
console.log('=======================================================================')

const mod = calculatorRegistry['bp-9-1']
assert(mod !== undefined, 'Modul bp-9-1 terdaftar di calculatorRegistry')
assert(mod.hasDynamicMarshallTest === true, 'Modul bp-9-1 memiliki flag hasDynamicMarshallTest: true')

// Test 1: Interpolasi Angka Korelasi Beban
console.log('\n--- 1. Uji Interpolasi Angka Korelasi Beban (Tabel 12.1) ---')
assert.strictEqual(interpolateMarshallCorrelation(68.5), 0.886, 'Interpolasi 68.5 mm = 0.886')
assert.strictEqual(interpolateMarshallCorrelation(63.5), 0.96, 'Interpolasi 63.5 mm = 0.96')
assert.strictEqual(interpolateMarshallCorrelation(25.4), 5.56, 'Batas bawah 25.4 mm = 5.56')
assert.strictEqual(interpolateMarshallCorrelation(76.2), 0.76, 'Batas atas 76.2 mm = 0.76')
console.log('[PASS] Seluruh interpolasi Tabel 12.1 valid')

// Test 2: Perhitungan Default Laporan Praktikum (Universitas Tidar)
console.log('\n--- 2. Uji Perhitungan Default Laporan Praktikum (Universitas Tidar) ---')
const out = mod.calculate(mod.initialInputs)
assert(!out.isError, 'Kalkulasi default laprak bebas error')
assert.strictEqual(out.vSil, 559.449, 'Volume silinder geometris terhitung presisi')
assert.strictEqual(out.kKor, 0.886, 'Angka korelasi beban default = 0.886')
assert.strictEqual(out.cKal, 12.9961, 'Kalibrasi proving ring = 12.9961 kg/div')
assert(Math.abs(out.gsb - 2.396) < 0.005, `Gsb terhitung ${out.gsb} mendekati 2.40`)
assert(Math.abs(out.gsa - 2.547) < 0.005, `Gsa terhitung ${out.gsa} mendekati 2.55`)
assert(Math.abs(out.gse - 2.471) < 0.005, `Gse terhitung ${out.gse} mendekati 2.471`)
assert.strictEqual(out.totalLp, 10.15, 'Total Luas Permukaan Agregat = 10.15 m²/kg')
console.log('[PASS] Parameter material, geometri, dan luas permukaan 100% valid')

// Test 3: Hasil 3 Benda Uji (Tabel 12.3 & Tabel 12.4)
console.log('\n--- 3. Uji Sifat Volumetrik & Mekanik 3 Benda Uji (Tabel 12.3 & 12.4) ---')
const specs = out.computedSpecimens
assert.strictEqual(specs.length, 3, 'Terdapat tepat 3 benda uji terhitung')

// BU 1: 5.5%
const bu1 = specs.find(s => s.pa === 5.5)
assert(bu1 !== undefined, 'Benda Uji 1 (5.5%) ditemukan')
assert.strictEqual(bu1.v, 558.4, 'BU 1: Volume = 558.4 cm³')
assert.strictEqual(bu1.gmb, 2.106, 'BU 1: Gmb = 2.106 gr/cm³')
assert.strictEqual(bu1.vma, 16.94, 'BU 1: VMA = 16.94%')
assert.strictEqual(bu1.vim, 8.28, 'BU 1: VIM = 8.28%')
assert.strictEqual(bu1.vfa, 51.12, 'BU 1: VFA = 51.12%')
assert.strictEqual(bu1.stabilitas, 2616.46, 'BU 1: Stabilitas = 2616.46 kg')
assert.strictEqual(bu1.flow, 1.10, 'BU 1: Flow = 1.10 mm')
assert.strictEqual(bu1.mq, 2378.60, 'BU 1: MQ = 2378.60 kg/mm')
assert.strictEqual(bu1.density, 2.393, 'BU 1: Density = 2.393 gr/cm³')
assert.strictEqual(bu1.tebalSelimut, 4.29, 'BU 1: Tebal Selimut = 4.29 µm')
console.log('[PASS] BU 1 (5.5%) 100% identik laporan praktikum')

// BU 2: 5.0%
const bu2 = specs.find(s => s.pa === 5.0)
assert(bu2 !== undefined, 'Benda Uji 2 (5.0%) ditemukan')
assert.strictEqual(bu2.v, 574.6, 'BU 2: Volume = 574.6 cm³')
assert.strictEqual(bu2.gmb, 2.046, 'BU 2: Gmb = 2.046 gr/cm³')
assert.strictEqual(bu2.vma, 18.88, 'BU 2: VMA = 18.88%')
assert.strictEqual(bu2.vim, 11.47, 'BU 2: VIM = 11.47%')
assert.strictEqual(bu2.vfa, 39.25, 'BU 2: VFA = 39.25%')
assert.strictEqual(bu2.stabilitas, 2839.88, 'BU 2: Stabilitas = 2839.88 kg')
assert.strictEqual(bu2.flow, 2.04, 'BU 2: Flow = 2.04 mm')
assert.strictEqual(bu2.mq, 1392.10, 'BU 2: MQ = 1392.10 kg/mm')
assert.strictEqual(bu2.density, 2.400, 'BU 2: Density = 2.400 gr/cm³')
assert.strictEqual(bu2.tebalSelimut, 3.76, 'BU 2: Tebal Selimut = 3.76 µm')
console.log('[PASS] BU 2 (5.0%) 100% identik laporan praktikum')

// BU 3: 6.5%
const bu3 = specs.find(s => s.pa === 6.5)
assert(bu3 !== undefined, 'Benda Uji 3 (6.5%) ditemukan')
assert.strictEqual(bu3.v, 538.7, 'BU 3: Volume = 538.7 cm³')
assert.strictEqual(bu3.gmb, 2.141, 'BU 3: Gmb = 2.141 gr/cm³')
assert.strictEqual(bu3.vma, 16.45, 'BU 3: VMA = 16.45%')
assert.strictEqual(bu3.vim, 5.56, 'BU 3: VIM = 5.56%')
assert.strictEqual(bu3.vfa, 66.20, 'BU 3: VFA = 66.20%')
assert.strictEqual(bu3.stabilitas, 2106.16, 'BU 3: Stabilitas = 2106.16 kg')
assert.strictEqual(bu3.flow, 0.92, 'BU 3: Flow = 0.92 mm')
assert.strictEqual(bu3.mq, 2289.30, 'BU 3: MQ = 2289.30 kg/mm')
assert.strictEqual(bu3.density, 2.378, 'BU 3: Density = 2.378 gr/cm³')
assert.strictEqual(bu3.tebalSelimut, 5.36, 'BU 3: Tebal Selimut = 5.36 µm')
console.log('[PASS] BU 3 (6.5%) 100% identik laporan praktikum')

// Test 4: Rincian 16 Langkah Rumus Perhitungan (Subbab 12.7)
console.log('\n--- 4. Uji 16 Langkah Rumus Perhitungan per Benda Uji ---')
assert(out.formulaStepsBySpecimen !== undefined, 'formulaStepsBySpecimen tersedia')
const stepsBu3 = out.formulaStepsBySpecimen[3]
assert(Array.isArray(stepsBu3) && stepsBu3.length === 16, 'BU 3 memiliki tepat 16 langkah hitung terdaftar')
assert(stepsBu3[0].includes('Volume Benda Uji (V) = B_SSD - B_air = 1141.0 - 602.3 = 538.7 cm³'), 'Langkah 1: Volume')
assert(stepsBu3[1].includes('(Gmb) = B_kering / V = 1153.6 / 538.7 = 2.141'), 'Langkah 2: Gmb')
assert(stepsBu3[8].includes('VMA'), 'Langkah 9: VMA')
assert(stepsBu3[9].includes('VIM'), 'Langkah 10: VIM')
assert(stepsBu3[10].includes('VFA'), 'Langkah 11: VFA')
assert(stepsBu3[11].includes('2106.16 kg'), 'Langkah 12: Stabilitas 2106.16 kg')
assert(stepsBu3[13].includes('(MQ) = Stabilitas / Flow = 2106.16 / 0.92 = 2289.30 kg/mm'), 'Langkah 14: MQ 2289.30 kg/mm')
assert(stepsBu3[15].includes('5.36 µm'), 'Langkah 16: Tebal Selimut 5.36 µm')
console.log('[PASS] 16 langkah hitung terformat presisi')

// Test 5: Tabel 12.5 Penentuan KAO
console.log('\n--- 5. Uji Tabel 12.5 Penentuan KAO ---')
assert(Array.isArray(out.kaoTable) && out.kaoTable.length === 7, 'Tabel 12.5 memuat tepat 7 parameter evaluasi')
assert.strictEqual(out.kaoRecommended, 6.5, 'KAO rekomendasi adalah 6.5%')
console.log('[PASS] Tabel 12.5 dan rekomendasi KAO valid')

// Test 6: Fitting Regresi & Data 8 Grafik
console.log('\n--- 6. Uji Kurva Tren & Data 8 Grafik ---')
assert(out.chartPoints.length === 3, 'chartPoints memiliki 3 titik kadar aspal')
assert(out.stabFit.equation.includes('y ='), 'Kurva regresi stabilitas tersedia')
assert(out.vimFit.equation.includes('f(x) ='), 'Kurva polinomial VIM tersedia')
assert(out.densityFit.equation.includes('f(x) ='), 'Kurva polinomial Density tersedia')
console.log('[PASS] Fitting regresi dan polinomial valid')

// Test 7: Uji Penambahan dan Pengurangan Baris Dinamis
console.log('\n--- 7. Uji Tambah & Kurangi Benda Uji Dinamis ---')
const dynamicOut = mod.calculate({
  ...mod.initialInputs,
  specimens: [
    ...DEFAULT_MARSHALL_SPECIMENS,
    {
      id: 4,
      no: 4,
      pa: 7.0,
      beratSsd: 1140.0,
      beratAir: 605.0,
      beratKering: 1135.0,
      bacaanStab: 170,
      flow: 3.50,
      angkaKorelasi: 0.886,
    },
  ],
})
assert(!dynamicOut.isError, 'Kalkulasi dinamis 4 benda uji berhasil')
assert.strictEqual(dynamicOut.computedSpecimens.length, 4, 'Terdapat 4 benda uji terhitung')
assert(dynamicOut.chartPoints.length === 4, 'chartPoints dinamis memuat 4 titik')
console.log('[PASS] Benda uji dinamis berhasil dihitung')

console.log('\n=======================================================================')
console.log('SEMUA TEST UJI MARSHALL (BAB 9 BP-9-1) 100% LULUS DAN TERVERIFIKASI!')
console.log('=======================================================================')
