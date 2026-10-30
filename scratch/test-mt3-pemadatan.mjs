import { calculatorRegistry } from '../src/testCalculatorsData.js'

let failures = 0

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`)
    failures++
  } else {
    console.log(`✅ PASS: ${message}`)
  }
}

console.log('--- TESTING BAB 3 MEKANIKA TANAH: PEMADATAN TANAH (PROCTOR & SAND CONE) ---\n')

// 1. Modul Standard Proctor (mt-3-1)
console.log('--- 1. Testing mt-3-1 (Standard Proctor Lab) ---')
const mt31 = calculatorRegistry['mt-3-1']
assert(Boolean(mt31), 'mt-3-1 is registered')

// Check min attributes
const pFields = mt31.fields
assert(pFields.every(f => f.min >= 0.01), 'All mt-3-1 fields have min >= 0.01')

// Normal Proctor
const r31Normal = mt31.calculate({ volMold: 943.8, wMold: 2150.0, wMoldTanah: 3980.0, kadarAir: 14.5 })
assert(r31Normal.status === 'Valid', 'Normal Proctor has status Valid (Green box)')
assert(!r31Normal.isError, 'Normal Proctor is not error')
assert(r31Normal.results.find(r => r.label === 'Berat Volume Kering (γ_dry)').value === '1.693', 'γ_dry = 1.693 gr/cm³')

// Proctor W2 <= W1 (Mold + Tanah <= Mold Kosong)
const r31W2LessW1 = mt31.calculate({ volMold: 943.8, wMold: 2150.0, wMoldTanah: 2000.0, kadarAir: 14.5 })
assert(r31W2LessW1.isError === true, 'W2 <= W1 sets isError = true (Red error)')
assert(r31W2LessW1.status === 'Input Tidak Wajar / Cek Kembali Data', 'W2 <= W1 sets status Input Tidak Wajar')
assert(r31W2LessW1.results.find(r => r.label === 'Berat Volume Kering (γ_dry)').value === '-', 'W2 <= W1 returns - for dry density')

// Proctor Hasil Tidak Wajar γ_dry > 3.0 (misal 6.960 gr/cm³)
const r31ExtremeDensity = mt31.calculate({ volMold: 943.8, wMold: 2150.0, wMoldTanah: 9000.0, kadarAir: 4.0 })
assert(r31ExtremeDensity.isError === true, 'γ_dry > 3.0 sets isError = true')
assert(r31ExtremeDensity.conclusion === 'Hasil tidak wajar. Kepadatan kering melebihi batas fisik tanah normal (maks 2.5 gr/cm³). Periksa kembali volume mold atau berat tanah.', 'γ_dry > 3.0 conclusion matches required text')
assert(r31ExtremeDensity.status === 'Input Tidak Wajar / Cek Kembali Data', 'γ_dry > 3.0 status triggers Red danger box')

// 2. Modul Sand Cone Lapangan (mt-3-2)
console.log('\n--- 2. Testing mt-3-2 (Sand Cone Lapangan) ---')
const mt32 = calculatorRegistry['mt-3-2']
assert(Boolean(mt32), 'mt-3-2 is registered')

// Check min attributes
const scFields = mt32.fields
assert(scFields.every(f => f.min >= 0.01), 'All mt-3-2 fields have min >= 0.01')

// Normal Sand Cone (D >= 95%)
// wPasirAwal: 5820, wPasirSisa: 2760, wCorong: 345 -> wPasirLubang = 2715
// volLubang = 2715 / 1.42 = 1911.97 cm3
// wt = 3850 -> gammaWet = 3850 / 1911.97 = 2.0136 -> gammaDry (w=12%) = 2.0136 / 1.12 = 1.7979
// mdd = 1.80 -> derajat = 1.7979 / 1.80 * 100 = 99.88% >= 95%
const r32Valid = mt32.calculate({
  wPasirAwal: 5820.0,
  wPasirSisa: 2760.0,
  wCorong: 345.0,
  bjPasir: 1.42,
  wGalianBasah: 3850.0,
  kadarAirLap: 12.0,
  mddProctor: 1.80,
})
assert(r32Valid.status === 'Valid', 'D >= 95% sets status Valid (Green box)')
assert(!r32Valid.isError, 'D >= 95% is not error')

// Sand Cone D < 95% (Kuning)
const r32Under = mt32.calculate({
  wPasirAwal: 5820.0,
  wPasirSisa: 2760.0,
  wCorong: 345.0,
  bjPasir: 1.42,
  wGalianBasah: 2650.0,
  kadarAirLap: 13.8,
  mddProctor: 1.69,
})
assert(r32Under.status === 'Perlu Evaluasi', 'D < 95% sets status Perlu Evaluasi (Yellow box)')
assert(!r32Under.isError, 'D < 95% is not error')
assert(Boolean(r32Under.warningMessage), 'D < 95% has warningMessage')

// Relational error: W1 <= W2 + Wc
const r32W1LessW2Wc = mt32.calculate({
  wPasirAwal: 3000.0,
  wPasirSisa: 2760.0,
  wCorong: 345.0,
  bjPasir: 1.42,
  wGalianBasah: 2650.0,
  kadarAirLap: 13.8,
  mddProctor: 1.69,
})
assert(r32W1LessW2Wc.isError === true, 'W1 <= W2 + Wc sets isError = true (Red error)')
assert(r32W1LessW2Wc.status === 'Input Tidak Wajar / Cek Kembali Data', 'W1 <= W2 + Wc sets status Input Tidak Wajar')
assert(r32W1LessW2Wc.conclusion === 'Input tidak valid: Berat awal pasir lebih kecil dari total pasir sisa dan pasir corong.', 'W1 <= W2 + Wc conclusion matches required text')
assert(r32W1LessW2Wc.results.find(r => r.label === 'Derajat Pemadatan Lapangan (D)').value === '-', 'W1 <= W2 + Wc returns - for degree of compaction')
assert(r32W1LessW2Wc.results.find(r => r.label === 'Volume Lubang Galian (V)').value === '-', 'W1 <= W2 + Wc returns - for hole volume (no negative volume)')

if (failures > 0) {
  console.error(`\n💥 TOTAL FAILURES: ${failures}`)
  process.exit(1)
} else {
  console.log('\n🎉 ALL BAB 3 PEMADATAN TANAH TESTS PASSED SUCCESSFULLY!')
}

