import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TESTING BAB 2 MULTI-SAMPLE CALCULATORS ===\n')

let passCount = 0
let failCount = 0

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`)
    passCount++
  } else {
    console.error(`❌ FAIL: ${message}`)
    failCount++
  }
}

// 1. mt-2-1
console.log('--- Test mt-2-1 (Kadar Air Alami Multi-Sampel) ---')
const mt21 = calculatorRegistry['mt-2-1']
assert(mt21.hasMultiSample === true, 'mt-2-1 has hasMultiSample: true')
assert(mt21.sampleFields.length === 3, 'mt-2-1 has 3 sample fields (w1, w2, w3)')
const out21 = mt21.calculate(mt21.initialInputs)
assert(!out21.isError, 'mt21 default inputs produce no error')
assert(out21.status === 'Valid', 'mt21 status is Valid')
assert(out21.results[0].value === '25.49', `mt21 avg moisture is 25.49% (got ${out21.results[0].value})`)
assert(out21.results[1].value === '10.87', `mt21 avg Ww is 10.87 g (got ${out21.results[1].value})`)
assert(out21.results[2].value === '42.63', `mt21 avg Ws is 42.63 g (got ${out21.results[2].value})`)
assert(out21.recapTable !== null, 'mt21 has recapTable')
assert(out21.recapTable.headers.length === 6, 'mt21 recapTable has 6 columns (Param, Rumus, 3 samples, Rata-rata)')
assert(out21.recapTable.rows.length === 6, 'mt21 recapTable has 6 rows')

// 2. mt-2-2
console.log('\n--- Test mt-2-2 (Berat Jenis Tanah Gs Multi-Sampel) ---')
const mt22 = calculatorRegistry['mt-2-2']
assert(mt22.hasMultiSample === true, 'mt-2-2 has hasMultiSample: true')
assert(mt22.commonFields.length === 1, 'mt-2-2 has commonFields (temp)')
assert(mt22.sampleFields.length === 4, 'mt-2-2 has 4 sample fields (w1, w2, w3, w4)')
const out22 = mt22.calculate(mt22.initialInputs)
assert(!out22.isError, 'mt22 default inputs produce no error')
assert(out22.status === 'Valid', 'mt22 status is Valid')
assert(out22.results[0].value === '2.660', `mt22 avg Gs is 2.660 (got ${out22.results[0].value})`)
assert(out22.results[1].value === 'Lempung Anorganik Normal', `mt22 mineral is Lempung Anorganik Normal (got ${out22.results[1].value})`)
assert(out22.recapTable !== null, 'mt22 has recapTable')
assert(out22.recapTable.rows.find(r => r.highlight)?.average === '2.660', 'mt22 highlighted row average is 2.660')

// 3. mt-2-3
console.log('\n--- Test mt-2-3 (Batas Cair Casagrande Multi-Titik & Flow Curve) ---')
const mt23 = calculatorRegistry['mt-2-3']
assert(mt23.hasMultiSample === true, 'mt-2-3 has hasMultiSample: true')
assert(mt23.hasFlowCurveChart === true, 'mt-2-3 has hasFlowCurveChart: true')
assert(mt23.sampleFields.length === 4, 'mt-2-3 has 4 sample fields (n, w1, w2, w3)')
const out23 = mt23.calculate(mt23.initialInputs)
assert(!out23.isError, 'mt23 default inputs produce no error')
assert(out23.status === 'Valid', 'mt23 status is Valid')
assert(out23.results[0].value === '42.18', `mt23 LL is 42.18% (got ${out23.results[0].value})`)
assert(out23.flowIndex === 18.46, `mt23 flowIndex is 18.46 (got ${out23.flowIndex})`)
assert(out23.r2 >= 0.99, `mt23 R2 >= 0.99 (got ${out23.r2})`)
assert(Array.isArray(out23.chartData), 'mt23 produces chartData array')
assert(out23.chartData.length > 10, 'mt23 chartData has smooth points')
assert(out23.recapTable !== null, 'mt23 has recapTable')

// 4. mt-2-4
console.log('\n--- Test mt-2-4 (Batas Plastis & Indeks Plastisitas PI) ---')
const mt24 = calculatorRegistry['mt-2-4']
assert(mt24.hasMultiSample === true, 'mt-2-4 has hasMultiSample: true')
assert(mt24.commonFields.length === 1, 'mt-2-4 has commonFields (ll)')
assert(mt24.sampleFields.length === 3, 'mt-2-4 has 3 sample fields (w1, w2, w3)')
const out24 = mt24.calculate(mt24.initialInputs)
assert(!out24.isError, 'mt24 default inputs produce no error')
assert(out24.status === 'Valid', 'mt24 status is Valid')
assert(out24.results[0].value === '22.48', `mt24 avg PL is 22.48% (got ${out24.results[0].value})`)
assert(out24.results[1].value === '19.70', `mt24 PI is 19.70% (got ${out24.results[1].value})`)
assert(out24.results[2].value === '16.19', `mt24 A-Line is 16.19% (got ${out24.results[2].value})`)
assert(out24.results[3].value.includes('CL'), `mt24 classification includes CL (got ${out24.results[3].value})`)
assert(out24.recapTable !== null, 'mt24 has recapTable')

// Test relational error: LL < PL in mt-2-4
const out24Err = mt24.calculate({ ...mt24.initialInputs, ll: 20.0 })
assert(out24Err.isError === true, 'mt24 with LL=20 < PL=22.48 isError is true')
assert(out24Err.conclusion.includes('tidak boleh lebih kecil'), 'mt24 error message mentions LL < PL')

console.log(`\n=== SUMMARY: ${passCount} PASSED, ${failCount} FAILED ===`)
if (failCount > 0) process.exit(1)
