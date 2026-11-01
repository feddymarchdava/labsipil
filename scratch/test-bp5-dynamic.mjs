import assert from 'node:assert'
import { calculatorRegistry, DEFAULT_FLASH_SAMPLES } from '../src/testCalculatorsData.js'

console.log('=======================================================================')
console.log('VERIFIKASI KOMPREHENSIF UJI TITIK NYALA & TITIK BAKAR (BP-5-1)')
console.log('=======================================================================')

const mod5 = calculatorRegistry['bp-5-1']
assert(mod5 !== undefined, 'Modul bp-5-1 terdaftar di calculatorRegistry')
assert(mod5.hasDynamicFlashSamples === true, 'Modul bp-5-1 memiliki flag hasDynamicFlashSamples: true')
assert(Array.isArray(mod5.initialInputs.samples), 'initialInputs.samples berupa array')
assert(mod5.initialInputs.samples.length === 3, 'initialInputs.samples berisi 3 baris default')

// 1. Uji Kalkulasi Default (3 Sampel Laprak)
console.log('\n--- 1. Uji Kalkulasi 3 Sampel Laprak ---')
const out3 = mod5.calculate(mod5.initialInputs)
assert(!out3.isError, 'Kalkulasi 3 sampel laprak valid')
assert(out3.results.length === 4, 'Menghasilkan 4 kartu ringkasan output')
console.log('Titik Nyala Terkoreksi:', out3.results[0].value)
console.log('Titik Bakar Terkoreksi:', out3.results[1].value)
console.log('Koreksi Barometrik:', out3.results[2].value)
console.log('Selisih Bakar - Nyala:', out3.results[3].value)

assert(out3.results[0].value.includes('324.43 °C (Pelaporan SNI: 324 °C)'), 'Hasil Nyala 324.43 °C (SNI 324 °C)')
assert(out3.results[1].value.includes('345.43 °C (Pelaporan SNI: 345 °C)'), 'Hasil Bakar 345.43 °C (SNI 345 °C)')
assert(out3.results[3].value === '21.0 °C', 'Selisih 21.0 °C')

// Periksa Langkah Rumus
console.log('\nLangkah Rumus:')
out3.formulaSteps.forEach((step, idx) => console.log(`[${idx}] ${step}`))
assert(out3.formulaSteps.some(s => s.includes('Sampel Titik Nyala: [325.0°C, 330.0°C, 315.0°C] (3 Sampel)')), 'Formula step memuat format array sampel titik nyala')
assert(out3.formulaSteps.some(s => s.includes('C_nyala = (325.0 + 330.0 + 315.0) / 3 = 323.33 °C')), 'Formula step memuat C_nyala penjumlahan dan rata-rata')
assert(out3.formulaSteps.some(s => s.includes('Sampel Titik Bakar: [334.0°C, 360.0°C, 339.0°C] (3 Sampel)')), 'Formula step memuat format array sampel titik bakar')
assert(out3.formulaSteps.some(s => s.includes('C_bakar = (334.0 + 360.0 + 339.0) / 3 = 344.33 °C')), 'Formula step memuat C_bakar penjumlahan dan rata-rata')

// 2. Uji Kalkulasi Dinamis 4 Sampel
console.log('\n--- 2. Uji Kalkulasi Dinamis 4 Sampel ---')
const out4 = mod5.calculate({
  samples: [
    { id: 1, flashPoint: 320.0, firePoint: 330.0 },
    { id: 2, flashPoint: 325.0, firePoint: 340.0 },
    { id: 3, flashPoint: 330.0, firePoint: 350.0 },
    { id: 4, flashPoint: 335.0, firePoint: 360.0 },
  ],
  tekananK: 101.3,
  tekananKUnit: 'kPa',
  syaratNyalaMin: 232,
})
assert(!out4.isError, 'Kalkulasi 4 sampel valid')
assert(out4.results[0].value.includes('327.50 °C (Pelaporan SNI: 328 °C)'), 'Hasil Nyala 4 sampel = 327.50 °C (SNI 328 °C)')
assert(out4.results[1].value.includes('345.0 °C (Pelaporan SNI: 345 °C)'), 'Hasil Bakar 4 sampel = 345.0 °C (SNI 345 °C)')
assert(out4.results[3].value === '17.5 °C', 'Selisih 4 sampel = 17.5 °C')
assert(out4.formulaSteps.some(s => s.includes('(4 Sampel)')), 'Langkah rumus dinamis mencantumkan (4 Sampel)')

// 3. Uji 0 Sampel (Empty State)
console.log('\n--- 3. Uji 0 Sampel (Empty State) ---')
const out0 = mod5.calculate({
  samples: [],
  tekananK: 727.0,
  tekananKUnit: 'mmHg',
})
assert(out0.isError === true, 'Kalkulasi 0 sampel menghasilkan isError: true')
assert(out0.status === 'Minimal 1 Sampel', 'Status 0 sampel adalah Minimal 1 Sampel')
assert(out0.results[0].value === 'Minimal 1 Sampel', 'Kartu 1 bernilai Minimal 1 Sampel')
assert(out0.results[1].value === 'Minimal 1 Sampel', 'Kartu 2 bernilai Minimal 1 Sampel')

// 4. Uji Nilai Negatif
console.log('\n--- 4. Uji Nilai Negatif ---')
const outNeg = mod5.calculate({
  samples: [{ id: 1, flashPoint: -325, firePoint: 334 }],
  tekananK: 727.0,
})
assert(outNeg.isError === true, 'Kalkulasi negatif menghasilkan isError: true')
assert(outNeg.status === 'Input Tidak Valid', 'Status negatif adalah Input Tidak Valid')

// 5. Uji Backwards Compatibility (Legacy inputs tanpa array samples)
console.log('\n--- 5. Uji Backwards Compatibility ---')
const outLegacy = mod5.calculate({
  cNyala: 242.0,
  cBakar: 254.0,
  tekananK: 101.3,
  syaratNyalaMin: 232,
})
assert(!outLegacy.isError, 'Kalkulasi legacy valid')
assert(outLegacy.results[0].value.includes('242.0 °C'), 'Hasil legacy benar')

console.log('\n=======================================================================')
console.log('SEMUA PENGUJIAN BP-5-1 DINAMIS 100% SUKSES DAN VALID!')
console.log('=======================================================================')
