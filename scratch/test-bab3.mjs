import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TEST BAB 3: BETON ===\n')

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
// TEST BB-3-1: UJI SLUMP
// -------------------------------------------------------------------------
console.log('--- TEST BB-3-1: SLUMP BETON ---')
const slump = calculatorRegistry['bb-3-1']
assert(slump !== undefined, 'Modul bb-3-1 terdefinisi')

// Check fields config
const hCetakanField = slump.fields.find(f => f.key === 'hCetakan')
assert(hCetakanField && hCetakanField.readOnly === true, 'hCetakan harus readOnly: true')
assert(hCetakanField && hCetakanField.disabled === true, 'hCetakan harus disabled: true')

// Test normal calculation
const slumpNormal = slump.calculate({ hCetakan: 30, hBeton: 19.5 })
assert(slumpNormal.status === 'Valid', 'Slump 10.5 cm harus berstatus Valid')
assert(slumpNormal.results[0].value === '10.5', `Slump harus 10.5 cm, got ${slumpNormal.results[0].value}`)

// Test invalid H1: negative (-19)
const slumpNeg = slump.calculate({ hCetakan: 30, hBeton: -19 })
assert(slumpNeg.isError === true, 'H1 negatif harus isError = true')
assert(slumpNeg.status.includes('Tidak Wajar'), 'H1 negatif harus berstatus Input Tidak Wajar')
assert(slumpNeg.conclusion.toLowerCase().includes('tidak valid'), 'H1 negatif conclusion harus memuat "tidak valid"')

// Test invalid H1: > 30 cm
const slumpTooHigh = slump.calculate({ hCetakan: 30, hBeton: 35 })
assert(slumpTooHigh.isError === true, 'H1 > 30 harus isError = true')
assert(slumpTooHigh.status.includes('Tidak Wajar'), 'H1 > 30 harus berstatus Input Tidak Wajar')

// Test slump < 0
const slumpNegativeVal = slump.calculate({ hCetakan: 30, hBeton: 30.5 })
assert(slumpNegativeVal.isError === true, 'Slump negatif harus isError = true')

// Test non-standard slump (e.g. 5 cm)
const slumpLow = slump.calculate({ hCetakan: 30, hBeton: 25 })
assert(slumpLow.status === 'Perlu Evaluasi', 'Slump 5 cm di luar 10±2 cm harus Perlu Evaluasi')

// -------------------------------------------------------------------------
// TEST BB-3-2: KUAT TEKAN BETON
// -------------------------------------------------------------------------
console.log('\n--- TEST BB-3-2: KUAT TEKAN BETON ---')
const kuatTekan = calculatorRegistry['bb-3-2']
assert(kuatTekan !== undefined, 'Modul bb-3-2 terdefinisi')

// Check umurHari field is select with options 3, 7, 14, 21, 28
const umurField = kuatTekan.fields.find(f => f.key === 'umurHari')
assert(umurField && umurField.type === 'select', 'umurHari harus bertipe select')
const optionValues = umurField.options.map(o => o.value)
assert(JSON.stringify(optionValues) === JSON.stringify([3, 7, 14, 21, 28]), 'Pilihan umur harus 3, 7, 14, 21, 28')

// Test valid 28 days
const kt28 = kuatTekan.calculate({ bebanHancur: 502, targetFc: 25, umurHari: 28 })
assert(kt28.status === 'Valid', 'Kuat tekan 28 hari beban 502 kN harus Valid')
assert(Number(kt28.results[0].value) > 28, 'f\'c aktual > 28 MPa')

// Test umur 7 days with conversion 0.65
const kt7 = kuatTekan.calculate({ bebanHancur: 350, targetFc: 25, umurHari: 7 })
assert(kt7.status === 'Valid', 'Kuat tekan 7 hari dengan beban 350 kN harus Valid')

// Test invalid umur (e.g. -21 hari)
const ktInvalidUmur = kuatTekan.calculate({ bebanHancur: 502, targetFc: 25, umurHari: -21 })
assert(ktInvalidUmur.isError === true, 'Umur -21 hari harus ditolak dan isError = true')

// Test invalid targetFc (negative)
const ktNegTarget = kuatTekan.calculate({ bebanHancur: 502, targetFc: -25, umurHari: 28 })
assert(ktNegTarget.isError === true, 'targetFc negatif harus ditolak')

// Test invalid bebanHancur (0 or negative)
const ktNegP = kuatTekan.calculate({ bebanHancur: -100, targetFc: 25, umurHari: 28 })
assert(ktNegP.isError === true, 'bebanHancur negatif harus ditolak')

// -------------------------------------------------------------------------
// TEST BB-3-3: KUAT LENTUR BALOK
// -------------------------------------------------------------------------
console.log('\n--- TEST BB-3-3: KUAT LENTUR BALOK ---')
const lentur = calculatorRegistry['bb-3-3']
assert(lentur !== undefined, 'Modul bb-3-3 terdefinisi')

// Check min attributes on fields
lentur.fields.forEach(f => {
  assert(f.min !== undefined && f.min >= 0, `Field ${f.key} memiliki min >= 0`)
})

// Test normal 150x150 mm
const lenturNormal = lentur.calculate({ bebanP: 28.5, lebarB: 150, tinggiH: 150, bentangL: 450 })
assert(lenturNormal.status === 'Valid', 'Lentur 150x150 fr 3.80 MPa harus Valid')
assert(lenturNormal.warningMessage === null, 'Lentur 150x150 tidak boleh memiliki warningMessage')

// Test dimension not 150x150 mm
const lenturDimWarning = lentur.calculate({ bebanP: 28.5, lebarB: 200, tinggiH: 150, bentangL: 450 })
assert(lenturDimWarning.status === 'Perlu Evaluasi', 'Dimensi bukan 150x150 harus status Perlu Evaluasi')
assert(lenturDimWarning.warningMessage && lenturDimWarning.warningMessage.includes('Standar SNI 4154:2014 menyarankan dimensi penampang balok 150x150 mm'), 'warningMessage harus berisi saran SNI 4154:2014 150x150 mm')

// Test negative input
const lenturNeg = lentur.calculate({ bebanP: -28.5, lebarB: 150, tinggiH: 150, bentangL: 450 })
assert(lenturNeg.isError === true, 'Beban patah negatif harus ditolak')

console.log('\n=== SUMMARY ===')
if (allPassed) {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!')
} else {
  console.error('💥 SOME TESTS FAILED!')
  process.exit(1)
}
