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

console.log('--- TESTING BAB 4 MEKANIKA TANAH: ANALISIS SARINGAN BUTIRAN TANAH (mt-4-1) ---\n')
const mt41 = calculatorRegistry['mt-4-1']
assert(Boolean(mt41), 'mt-4-1 is registered in calculatorRegistry')

// 1. Test Well-graded Sand (SW)
console.log('\n--- 1. Testing SW (Well-graded) ---')
const rSW = mt41.calculate({ d10: 0.12, d30: 0.38, d60: 0.95, finesPct: 8.5 })
assert(rSW.status === 'Valid', 'SW status must be Valid (Green box)')
assert(!rSW.isError, 'SW is not an error')
assert(rSW.results.find(r => r.label === 'Koefisien Keseragaman (Cu)').value === '7.92', 'Cu = 7.92')
assert(rSW.results.find(r => r.label === 'Koefisien Kelengkungan (Cc)').value === '1.27', 'Cc = 1.27')
assert(rSW.conclusion.includes('Distribusi butiran lengkap dan kompak saat dipadatkan.'), 'SW conclusion includes compaction compactness text')

// 2. Test Poorly Graded Sand (SP)
console.log('\n--- 2. Testing SP (Poorly Graded) ---')
const rSP = mt41.calculate({ d10: 0.20, d30: 0.30, d60: 0.60, finesPct: 5.0 })
assert(rSP.status === 'Perlu Evaluasi', 'SP status must be Perlu Evaluasi (Yellow box, not green)')
assert(!rSP.isError, 'SP is not an input syntax error')
assert(rSP.conclusion === 'Tanah memiliki gradasi buruk (Poorly Graded). Distribusi ukuran butir tidak merata, kurang ideal untuk timbunan struktural.', 'SP conclusion matches requested text exactly')
assert(!rSP.conclusion.includes('Distribusi butiran lengkap dan kompak saat dipadatkan'), 'SP conclusion DOES NOT include "Distribusi butiran lengkap dan kompak saat dipadatkan"')
assert(Boolean(rSP.warningMessage), 'SP has warningMessage')

// 3. Test D30 = 0
console.log('\n--- 3. Testing D30 = 0 ---')
const rD30Zero = mt41.calculate({ d10: 0.12, d30: 0, d60: 0.95, finesPct: 8.5 })
assert(rD30Zero.isError === true, 'D30 = 0 sets isError = true')
assert(rD30Zero.status === 'Input Tidak Wajar / Cek Kembali Data', 'D30 = 0 status is Input Tidak Wajar')
assert(rD30Zero.conclusion === 'Data tidak valid: Pastikan D10 < D30 < D60 dan tidak ada nilai 0.', 'D30 = 0 conclusion matches required error string')
assert(rD30Zero.results.find(r => r.label === 'Koefisien Keseragaman (Cu)').value === '-', 'D30 = 0 Cu returns -')
assert(rD30Zero.results.find(r => r.label === 'Koefisien Kelengkungan (Cc)').value === '-', 'D30 = 0 Cc returns -')

// 4. Test D10 = 0 or D60 = 0
console.log('\n--- 4. Testing D10 = 0 and D60 = 0 ---')
const rD10Zero = mt41.calculate({ d10: 0, d30: 0.38, d60: 0.95, finesPct: 8.5 })
assert(rD10Zero.isError === true, 'D10 = 0 sets isError = true')
assert(rD10Zero.conclusion === 'Data tidak valid: Pastikan D10 < D30 < D60 dan tidak ada nilai 0.', 'D10 = 0 conclusion matches required error string')

const rD60Zero = mt41.calculate({ d10: 0.12, d30: 0.38, d60: 0, finesPct: 8.5 })
assert(rD60Zero.isError === true, 'D60 = 0 sets isError = true')
assert(rD60Zero.conclusion === 'Data tidak valid: Pastikan D10 < D30 < D60 dan tidak ada nilai 0.', 'D60 = 0 conclusion matches required error string')

// 5. Test Order violation D10 >= D30 (e.g. D10 = 0.50, D30 = 0.38)
console.log('\n--- 5. Testing Order Violation D10 >= D30 ---')
const rOrder1 = mt41.calculate({ d10: 0.50, d30: 0.38, d60: 0.95, finesPct: 8.5 })
assert(rOrder1.isError === true, 'D10 >= D30 sets isError = true')
assert(rOrder1.conclusion === 'Data tidak valid: Pastikan D10 < D30 < D60 dan tidak ada nilai 0.', 'D10 >= D30 conclusion matches required error string')

// 6. Test Order violation D30 >= D60 (e.g. D30 = 0.98, D60 = 0.95)
console.log('\n--- 6. Testing Order Violation D30 >= D60 ---')
const rOrder2 = mt41.calculate({ d10: 0.12, d30: 0.98, d60: 0.95, finesPct: 8.5 })
assert(rOrder2.isError === true, 'D30 >= D60 sets isError = true')
assert(rOrder2.conclusion === 'Data tidak valid: Pastikan D10 < D30 < D60 dan tidak ada nilai 0.', 'D30 >= D60 conclusion matches required error string')

// 7. Check field min attributes
console.log('\n--- 7. Checking field attributes ---')
const d10Field = mt41.fields.find(f => f.key === 'd10')
const d30Field = mt41.fields.find(f => f.key === 'd30')
const d60Field = mt41.fields.find(f => f.key === 'd60')
assert(d10Field && d10Field.min > 0, 'd10 has min > 0')
assert(d30Field && d30Field.min > 0, 'd30 has min > 0')
assert(d60Field && d60Field.min > 0, 'd60 has min > 0')

if (failures > 0) {
  console.error(`\n💥 TOTAL FAILURES: ${failures}`)
  process.exit(1)
} else {
  console.log('\n🎉 ALL MT-4-1 TESTS PASSED SUCCESSFULLY!')
}

