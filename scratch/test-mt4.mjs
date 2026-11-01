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

// 8. Test Dynamic Soil Sieve Initial Inputs (SW - Well Graded Sand)
console.log('\n--- 8. Testing Dynamic Soil Sieve Initial Inputs ---')
const rDynInit = mt41.calculate(mt41.initialInputs)
assert(rDynInit.status === 'Valid', 'Dynamic init status is Valid')
assert(!rDynInit.isError, 'Dynamic init is not error')
assert(rDynInit.isMassLossValid === true, 'Mass loss is valid (<= 2%)')
assert(rDynInit.massLossPct < 2.0, 'Mass loss percentage < 2.0%')
assert(rDynInit.cu !== null && rDynInit.cu >= 6.0, `Cu >= 6.0 (Actual: ${rDynInit.cu?.toFixed(2)})`)
assert(rDynInit.cc !== null && rDynInit.cc >= 1.0 && rDynInit.cc <= 3.0, `1 <= Cc <= 3 (Actual: ${rDynInit.cc?.toFixed(2)})`)
assert(rDynInit.uscsCode.includes('SW'), `USCS code is SW (Actual: ${rDynInit.uscsCode})`)
assert(Array.isArray(rDynInit.chartDataPoints) && rDynInit.chartDataPoints.length === 7, 'chartDataPoints has 7 sieve points')

// 9. Test Mass Loss Exceeded (> 2.0%)
console.log('\n--- 9. Testing Mass Loss Exceeded (> 2.0%) ---')
const rLossExceeded = mt41.calculate({
  wTotal: 500.0,
  panWeight: 10.0,
  soilSieves: [
    { id: 1, sieveNo: 'No. 4', diameter: 4.75, retainedWeight: 20.0 },
    { id: 2, sieveNo: 'No. 10', diameter: 2.00, retainedWeight: 60.0 },
    { id: 3, sieveNo: 'No. 20', diameter: 0.850, retainedWeight: 100.0 },
    { id: 4, sieveNo: 'No. 40', diameter: 0.425, retainedWeight: 100.0 },
    { id: 5, sieveNo: 'No. 60', diameter: 0.250, retainedWeight: 90.0 },
    { id: 6, sieveNo: 'No. 100', diameter: 0.150, retainedWeight: 55.0 },
    { id: 7, sieveNo: 'No. 200', diameter: 0.075, retainedWeight: 45.0 },
    { id: 8, sieveNo: 'Pan', diameter: 0, retainedWeight: 10.0, isPan: true },
  ], // Total = 380g, Loss = 120g (24%)
})
assert(rLossExceeded.isMassLossValid === false, 'Mass loss is flagged invalid')
assert(rLossExceeded.isError === true, 'isError is true when mass loss > 2%')
assert(rLossExceeded.status === 'Perlu Evaluasi', 'Status is Perlu Evaluasi')

// 10. Test Fine-Grained Soil (> 50% passing #200)
console.log('\n--- 10. Testing Fine-Grained Soil (> 50% Fines) ---')
const rFine = mt41.calculate({
  wTotal: 500.0,
  panWeight: 280.0,
  soilSieves: [
    { id: 1, sieveNo: 'No. 4', diameter: 4.75, retainedWeight: 10.0 },
    { id: 2, sieveNo: 'No. 200', diameter: 0.075, retainedWeight: 210.0 },
    { id: 3, sieveNo: 'Pan', diameter: 0, retainedWeight: 280.0, isPan: true },
  ],
})
assert(rFine.finesPct > 50, 'Fines > 50%')
assert(rFine.uscsCode === 'Fine-Grained', 'Classified as Fine-Grained')

// 11. Test Negative Input in Sieve Table
console.log('\n--- 11. Testing Negative Input in Sieve Table ---')
const rNegSieve = mt41.calculate({
  wTotal: 500.0,
  soilSieves: [
    { id: 1, sieveNo: 'No. 4', diameter: 4.75, retainedWeight: -5.0 },
  ],
})
assert(rNegSieve.isError === true, 'Negative retained weight triggers error')
assert(rNegSieve.status === 'Input Tidak Wajar / Cek Kembali Data', 'Status is Input Tidak Wajar')

if (failures > 0) {
  console.error(`\n💥 TOTAL FAILURES: ${failures}`)
  process.exit(1)
} else {
  console.log('\n🎉 ALL MT-4-1 TESTS PASSED SUCCESSFULLY!')
}

