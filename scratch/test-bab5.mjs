import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TEST BAB 5: BAJA TULANGAN ===\n')

let allPassed = true
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`)
    allPassed = false
  } else {
    console.log(`✅ PASS: ${message}`)
  }
}

const baja = calculatorRegistry['bb-5-1']
assert(baja !== undefined, 'Modul bb-5-1 terdefinisi')

// Check dropdown Target Mutu Baja
const mutuField = baja.fields.find(f => f.key === 'mutuBaja')
assert(mutuField && mutuField.type === 'select', 'mutuBaja harus bertipe select (dropdown)')
const mutuOptions = mutuField.options.map(o => o.value)
assert(mutuOptions.includes('BjTS 280') && mutuOptions.includes('BjTS 420') && mutuOptions.includes('BjTS 520'), 'Pilihan mutu baja harus mencakup BjTS 280, BjTS 420, BjTS 520')

// 1. TEST VALIDASI L0 < 5 * d
console.log('\n--- 1. TEST VALIDASI L0 < 5 * d ---')
// L0 = 10 mm untuk diameter 32 mm (5 * 32 = 160 mm)
const l0Invalid = baja.calculate({
  mutuBaja: 'BjTS 420',
  diameter: 32,
  pjgAwal: 10,
  bebanLeleh: 350,
  bebanPutus: 480,
  pjgPutus: 15,
})
assert(l0Invalid.isError === true, 'L0 < 5*d harus isError = true')
assert(l0Invalid.conclusion === 'Panjang ukur awal (L0) tidak valid. Standar minimal adalah 5 x Diameter.', 'Pesan error L0 < 5*d harus tepat')

// L0 valid: d = 16 mm, L0 = 80 mm (5 * 16 = 80 mm)
const l0Valid = baja.calculate({
  mutuBaja: 'BjTS 420',
  diameter: 16,
  pjgAwal: 80,
  bebanLeleh: 88,
  bebanPutus: 118,
  pjgPutus: 94,
})
assert(l0Valid.isError !== true, 'L0 >= 5*d tidak boleh error')

// 2. TEST GUARD CLAUSE HASIL ELONGASI > 50%
console.log('\n--- 2. TEST GUARD CLAUSE ELONGASI > 50% ---')
// L0 = 80, Lu = 160 mm -> elongasi = 100%
const elongasiExtreme = baja.calculate({
  mutuBaja: 'BjTS 420',
  diameter: 16,
  pjgAwal: 80,
  bebanLeleh: 88,
  bebanPutus: 118,
  pjgPutus: 160,
})
assert(elongasiExtreme.isError === true, 'Elongasi > 50% harus isError = true')
assert(elongasiExtreme.conclusion === 'Hasil elongasi tidak wajar (> 50%). Periksa kembali input L0 dan Lu.', 'Pesan error elongasi > 50% harus tepat')

// 3. TEST LOGIKA EVALUASI STANDAR (fy & fu di bawah standar)
console.log('\n--- 3. TEST LOGIKA EVALUASI STANDAR SNI 2052:2017 ---')
// fy hanya ~127.4 MPa (misal bebanLeleh: 25.6 kN pada D16 -> fy = 25600 / 201.06 = 127.3 MPa)
const bajaKuatRendah = baja.calculate({
  mutuBaja: 'BjTS 420',
  diameter: 16,
  pjgAwal: 80,
  bebanLeleh: 25.6,
  bebanPutus: 35.0,
  pjgPutus: 92,
})
assert(bajaKuatRendah.status === 'Tidak Memenuhi Standar', 'fy 127.3 MPa untuk BjTS 420 harus berstatus "Tidak Memenuhi Standar"')
assert(!bajaKuatRendah.conclusion.includes('Memenuhi kualifikasi mutu BjTS 420'), 'Kesimpulan TIDAK BOLEH menulis "Memenuhi kualifikasi mutu BjTS 420" jika fy < 420')
assert(bajaKuatRendah.conclusion.includes('TIDAK MEMENUHI standar mutu BjTS 420'), 'Kesimpulan harus menyatakan TIDAK MEMENUHI')
assert(bajaKuatRendah.conclusion.includes('127.3 MPa < 420 MPa'), 'Kesimpulan harus menyebutkan fy < 420 MPa')

// 4. TEST Lolos Mutu BjTS 420
console.log('\n--- 4. TEST LOLOS MUTU BJTS 420 ---')
const bajaLolos = baja.calculate({
  mutuBaja: 'BjTS 420',
  diameter: 16,
  pjgAwal: 80,
  bebanLeleh: 88,
  bebanPutus: 118,
  pjgPutus: 94,
})
assert(bajaLolos.status === 'Valid', 'fy 437.7 MPa & fu 586.9 MPa harus berstatus Valid')
assert(bajaLolos.conclusion.includes('MEMENUHI kualifikasi mutu BjTS 420'), 'Kesimpulan harus menyatakan MEMENUHI mutu BjTS 420')

// 5. TEST Target BjTS 280
console.log('\n--- 5. TEST TARGET BJTS 280 ---')
const bajaBjts280 = baja.calculate({
  mutuBaja: 'BjTS 280',
  diameter: 16,
  pjgAwal: 80,
  bebanLeleh: 60,
  bebanPutus: 80,
  pjgPutus: 92,
})
assert(bajaBjts280.status === 'Valid', 'fy 298.4 MPa & fu 397.9 MPa untuk BjTS 280 harus Valid')

console.log('\n=== SUMMARY ===')
if (allPassed) {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!')
} else {
  console.error('💥 SOME TESTS FAILED!')
  process.exit(1)
}
