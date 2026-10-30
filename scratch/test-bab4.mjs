import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TEST BAB 4: KAYU ===\n')

let allPassed = true
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`)
    allPassed = false
  } else {
    console.log(`✅ PASS: ${message}`)
  }
}

// -------------------------------------------------------------------------
// TEST BB-4-1: KADAR AIR KAYU
// -------------------------------------------------------------------------
console.log('--- TEST BB-4-1: KADAR AIR KAYU ---')
const kadarAir = calculatorRegistry['bb-4-1']
assert(kadarAir !== undefined, 'Modul bb-4-1 terdefinisi')

// Test normal
const kaNormal = kadarAir.calculate({ mBasah: 128.4, mKering: 112.6 })
assert(kaNormal.status === 'Valid', 'Kadar air w = 14.03% harus Valid')
assert(Number(kaNormal.results[0].value) === 14.03, `Nilai kadar air 14.03%, got ${kaNormal.results[0].value}`)

// Test mb <= mk (massa basah <= massa kering)
const kaWrongMass = kadarAir.calculate({ mBasah: 100, mKering: 112.6 })
assert(kaWrongMass.isError === true, 'mb < mk harus isError = true')
assert(kaWrongMass.status.includes('Tidak Wajar'), 'mb < mk harus status Input Tidak Wajar')
assert(kaWrongMass.conclusion === 'Input tidak valid: Massa basah tidak boleh lebih kecil dari massa kering.', 'Pesan error mb <= mk harus tepat')

const kaEqualMass = kadarAir.calculate({ mBasah: 100, mKering: 100 })
assert(kaEqualMass.isError === true, 'mb == mk harus isError = true')
assert(kaEqualMass.conclusion === 'Input tidak valid: Massa basah tidak boleh lebih kecil dari massa kering.', 'Pesan error mb == mk harus tepat')

// Test input 0 or negative
const kaZero = kadarAir.calculate({ mBasah: 0, mKering: 100 })
assert(kaZero.isError === true, 'mb = 0 harus ditolak')

// Test moisture > 30%
const kaHigh = kadarAir.calculate({ mBasah: 150, mKering: 100 }) // 50%
assert(kaHigh.status === 'Perlu Evaluasi', 'Kadar air > 30% harus berstatus Perlu Evaluasi')

// Test moisture 25% (antara 20% dan 30%)
const kaMedium = kadarAir.calculate({ mBasah: 125, mKering: 100 }) // 25%
assert(kaMedium.status === 'Perlu Evaluasi', 'Kadar air 25% harus berstatus Perlu Evaluasi')

// -------------------------------------------------------------------------
// TEST BB-4-2: KERAPATAN KAYU
// -------------------------------------------------------------------------
console.log('\n--- TEST BB-4-2: KERAPATAN KAYU ---')
const kerapatan = calculatorRegistry['bb-4-2']
assert(kerapatan !== undefined, 'Modul bb-4-2 terdefinisi')

// Check fields have min: 0.01
kerapatan.fields.forEach(f => {
  assert(f.min !== undefined && f.min >= 0.01, `Field ${f.key} memiliki min >= 0.01`)
})

// Test normal (0.2 - 1.28 gr/cm3)
const krpNormal = kerapatan.calculate({ massa: 185, panjang: 10, lebar: 5, tebal: 5 }) // vol 250, rho 0.74
assert(krpNormal.status === 'Valid', 'Kerapatan 0.74 gr/cm3 harus Valid')
assert(krpNormal.results[1].value === '0.740', `Nilai kerapatan 0.740 gr/cm3, got ${krpNormal.results[1].value}`)

// Test input 0 or negative
const krpZero = kerapatan.calculate({ massa: 185, panjang: 0, lebar: 5, tebal: 5 })
assert(krpZero.isError === true, 'Panjang 0 harus ditolak')
assert(krpZero.results[1].value === '-', 'Hasil harus dikosongkan jika input 0')

const krpNeg = kerapatan.calculate({ massa: -185, panjang: 10, lebar: 5, tebal: 5 })
assert(krpNeg.isError === true, 'Massa negatif harus ditolak')

// Test kerapatan < 0.2 gr/cm3
const krpLow = kerapatan.calculate({ massa: 25, panjang: 10, lebar: 5, tebal: 5 }) // 0.10 gr/cm3
assert(krpLow.status === 'Perlu Evaluasi', 'Kerapatan < 0.2 gr/cm3 harus Perlu Evaluasi')

// Test kerapatan > 1.28 gr/cm3
const krpHigh = kerapatan.calculate({ massa: 400, panjang: 10, lebar: 5, tebal: 5 }) // 1.60 gr/cm3
assert(krpHigh.status === 'Perlu Evaluasi', 'Kerapatan > 1.28 gr/cm3 harus Perlu Evaluasi')

// -------------------------------------------------------------------------
// TEST BB-4-3: BERAT JENIS & KELAS KUAT KAYU
// -------------------------------------------------------------------------
console.log('\n--- TEST BB-4-3: BERAT JENIS & KELAS KUAT KAYU ---')
const bjKayu = calculatorRegistry['bb-4-3']
assert(bjKayu !== undefined, 'Modul bb-4-3 terdefinisi')

// Check bjUkur field has min: 0.01
const bjField = bjKayu.fields.find(f => f.key === 'bjUkur')
assert(bjField && bjField.min >= 0.01, 'bjUkur memiliki min >= 0.01')

// Test BJ <= 0
const bjZero = bjKayu.calculate({ bjUkur: 0, kadarAir: 14 })
assert(bjZero.isError === true, 'BJ = 0 harus isError = true')
assert(bjZero.conclusion.includes('Input Berat Jenis tidak valid'), 'Pesan error BJ 0 harus "Input Berat Jenis tidak valid"')

const bjNeg = bjKayu.calculate({ bjUkur: -0.5, kadarAir: 14 })
assert(bjNeg.isError === true, 'BJ negatif harus isError = true')
assert(bjNeg.conclusion.includes('Input Berat Jenis tidak valid'), 'Pesan error BJ negatif harus "Input Berat Jenis tidak valid"')

// Test BJ < 0.1
const bjTooLow = bjKayu.calculate({ bjUkur: 0.05, kadarAir: 14 })
assert(bjTooLow.isError === true, 'BJ < 0.1 harus isError = true')
assert(bjTooLow.status.includes('Tidak Wajar'), 'BJ < 0.1 harus status Input Tidak Wajar')

// Test Kelas Kuat V (0.1 <= BJ < 0.3)
const bjKelasV = bjKayu.calculate({ bjUkur: 0.25, kadarAir: 15 }) // G15 = 0.25 -> Kelas Kuat V
assert(bjKelasV.status === 'Perlu Evaluasi', 'Kelas Kuat V HARUS berstatus Perlu Evaluasi (BUKAN hijau Valid)')
assert(bjKelasV.results[1].value.includes('Kelas Kuat V'), 'Hasil klasifikasi harus Kelas Kuat V')

// Test Kelas Kuat II (BJ 0.68)
const bjKelasII = bjKayu.calculate({ bjUkur: 0.68, kadarAir: 14 })
assert(bjKelasII.status === 'Valid', 'Kelas Kuat II harus Valid')

// -------------------------------------------------------------------------
// TEST BB-4-4: KUAT LENTUR BALOK KAYU (MOE & MOR)
// -------------------------------------------------------------------------
console.log('\n--- TEST BB-4-4: KUAT LENTUR BALOK KAYU ---')
const lenturKayu = calculatorRegistry['bb-4-4']
assert(lenturKayu !== undefined, 'Modul bb-4-4 terdefinisi')

// Test standard 50x50 mm
const lentur50x50 = lenturKayu.calculate({ bebanP: 8200, lendutan: 6.2, lebarB: 50, tinggiH: 50, bentangL: 1000 })
assert(lentur50x50.status === 'Valid', 'Penampang 50x50 mm harus Valid')
assert(lentur50x50.warningMessage === null, 'Penampang 50x50 mm tidak boleh ada warningMessage')

// Test standard 50x100 mm
const lentur50x100 = lenturKayu.calculate({ bebanP: 8200, lendutan: 6.2, lebarB: 50, tinggiH: 100, bentangL: 1000 })
assert(lentur50x100.status === 'Valid', 'Penampang 50x100 mm harus Valid')
assert(lentur50x100.warningMessage === null, 'Penampang 50x100 mm tidak boleh ada warningMessage')

// Test non-standard dimension (e.g. 50x70 mm)
const lenturNonStd = lenturKayu.calculate({ bebanP: 8200, lendutan: 6.2, lebarB: 50, tinggiH: 70, bentangL: 1000 })
assert(lenturNonStd.status === 'Perlu Evaluasi', 'Penampang 50x70 mm harus Perlu Evaluasi')
assert(lenturNonStd.warningMessage && lenturNonStd.warningMessage.includes('SNI 7973:2013 umumnya menggunakan penampang 50x50 mm atau 50x100 mm'), 'warningMessage harus memuat pesan SNI 7973:2013 50x50 mm atau 50x100 mm')

// Test negative input
const lenturNeg = lenturKayu.calculate({ bebanP: -8200, lendutan: 6.2, lebarB: 50, tinggiH: 50, bentangL: 1000 })
assert(lenturNeg.isError === true, 'Beban lentur negatif harus ditolak')

console.log('\n=== SUMMARY ===')
if (allPassed) {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!')
} else {
  console.error('💥 SOME TESTS FAILED!')
  process.exit(1)
}

