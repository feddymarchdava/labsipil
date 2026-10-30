import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TEST BAB 1 MEKANIKA TANAH: SONDIR & SPT ===\n')

let passed = 0
let failed = 0

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`)
    passed++
  } else {
    console.error(`❌ FAIL: ${message}`)
    failed++
  }
}

// =========================================================================
// 1. TEST UJI SONDIR / CPT (mt-1-1)
// =========================================================================
console.log('--- TEST MT-1-1: UJI SONDIR / CPT ---')
const cpt = calculatorRegistry['mt-1-1']
assert(cpt !== undefined, 'Modul mt-1-1 terdefinisi')

// Check fields min attribute
const qcField = cpt.fields.find(f => f.key === 'qc')
assert(qcField && qcField.min === 0.01, 'Field qc memiliki min="0.01"')

// Check Normal Calculation
const normCalc = cpt.calculate({ depth: 8.4, qc: 145.0, tw: 175.0 })
assert(normCalc.status === 'Valid', 'Status normal harus Valid')
assert(!normCalc.isError, 'isError harus false pada input normal')
const frVal = normCalc.results.find(r => r.label === 'Friction Ratio (FR)')
assert(frVal && Math.abs(parseFloat(frVal.value) - 2.07) < 0.05, `FR harus ~2.07%, got ${frVal?.value}`)

// Check qc = 0 (Guard clause)
const zeroQc = cpt.calculate({ depth: 8.4, qc: 0, tw: 175.0 })
assert(zeroQc.isError === true, 'qc = 0 harus memicu isError = true')
assert(zeroQc.status === 'Input Tidak Wajar / Cek Kembali Data', `Status qc = 0 harus Input Tidak Wajar, got ${zeroQc.status}`)
const frZero = zeroQc.results.find(r => r.label === 'Friction Ratio (FR)')
assert(frZero && frZero.value === 'Error: qc tidak boleh 0', `FR qc = 0 harus 'Error: qc tidak boleh 0', got ${frZero?.value}`)
assert(zeroQc.conclusion.toLowerCase().includes('tidak boleh 0'), 'Kesimpulan qc = 0 harus memuat pesan error qc tidak boleh 0')

// Check qc < 5 (< 5 kg/cm2, Lempung Sangat Lunak)
const lowQc = cpt.calculate({ depth: 2.0, qc: 3.5, tw: 8.0 })
assert(lowQc.status === 'Perlu Evaluasi', `Status qc < 5 harus 'Perlu Evaluasi' (kuning), got ${lowQc.status}`)
assert(!lowQc.conclusion.toLowerCase().includes('sangat kokoh'), 'Kesimpulan qc < 5 TIDAK BOLEH menulis "sangat kokoh"')
assert(
  lowQc.conclusion.includes('Tanah tergolong Lempung Sangat Lunak dengan daya dukung sangat rendah. Tidak cocok untuk pondasi dangkal.'),
  'Kesimpulan qc < 5 harus memuat teks standar lempung sangat lunak tidak cocok untuk pondasi dangkal'
)

// Check tw < qc (illogical)
const illTw = cpt.calculate({ depth: 5.0, qc: 50.0, tw: 30.0 })
assert(illTw.isError === true, 'tw < qc harus memicu isError = true')
assert(illTw.status === 'Input Tidak Wajar / Cek Kembali Data', 'tw < qc harus Input Tidak Wajar')

// =========================================================================
// 2. TEST UJI SPT (mt-1-2)
// =========================================================================
console.log('\n--- TEST MT-1-2: UJI SPT ---')
const spt = calculatorRegistry['mt-1-2']
assert(spt !== undefined, 'Modul mt-1-2 terdefinisi')

// Check Normal SPT
const normSpt = spt.calculate({ depth: 6.0, n1: 4, n2: 8, n3: 11 })
assert(normSpt.status === 'Valid', 'Status SPT normal harus Valid')
assert(!normSpt.warningMessage, 'SPT normal tidak boleh ada warningMessage')
const nSptVal = normSpt.results.find(r => r.label === 'Nilai N-SPT (N2 + N3)')
assert(nSptVal && nSptVal.value === '19', `N-SPT harus 19, got ${nSptVal?.value}`)

// Check Refusal (N2 + N3 >= 50)
const refusalSpt = spt.calculate({ depth: 15.0, n1: 20, n2: 30, n3: 25 })
const refNSpt = refusalSpt.results.find(r => r.label === 'Nilai N-SPT (N2 + N3)')
assert(refNSpt && refNSpt.value.includes('50'), `N-SPT Refusal harus 50, got ${refNSpt?.value}`)
assert(refNSpt && refNSpt.value.includes('(Refusal / Mencapai Batas Maksimum)'), `N-SPT value harus menyertakan teks Refusal, got ${refNSpt?.value}`)
assert(refusalSpt.conclusion.includes('(Refusal / Mencapai Batas Maksimum)'), 'Kesimpulan Refusal harus memuat (Refusal / Mencapai Batas Maksimum)')

// Check Warning if N3 = 0
const zeroN3 = spt.calculate({ depth: 6.0, n1: 4, n2: 8, n3: 0 })
assert(zeroN3.status === 'Perlu Evaluasi', `N3 = 0 harus berstatus 'Perlu Evaluasi' (kuning), got ${zeroN3.status}`)
assert(zeroN3.warningMessage !== null && zeroN3.warningMessage !== undefined, 'N3 = 0 harus memiliki warningMessage')
assert(
  zeroN3.warningMessage === 'Nilai N3 = 0 tidak wajar untuk data lapangan. Pastikan alat tidak mengalami kegagalan.',
  `warningMessage harus persis sesuai permintaan, got: ${zeroN3.warningMessage}`
)

console.log(`\n=== SUMMARY: ${passed} PASSED, ${failed} FAILED ===`)
if (failed > 0) process.exit(1)
