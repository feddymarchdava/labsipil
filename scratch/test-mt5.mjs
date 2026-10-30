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

console.log('--- TESTING BAB 5 MEKANIKA TANAH: DIRECT SHEAR & KONSOLIDASI ---\n')

// 1. Modul Direct Shear Test (mt-5-1)
console.log('--- 1. Testing mt-5-1 (Direct Shear Test) ---')
const mt51 = calculatorRegistry['mt-5-1']
assert(Boolean(mt51), 'mt-5-1 is registered')
assert(mt51.hasDynamicTable === true, 'mt-5-1 hasDynamicTable is true')
assert(mt51.fields.length === 0, 'mt-5-1 fields has no obsolete c, phi, P fields')

// Normal regression with initial 3 points
const r51Normal = mt51.calculate({
  points: [
    { id: 1, sigma: 0.50, tau: 0.48 },
    { id: 2, sigma: 1.00, tau: 0.76 },
    { id: 3, sigma: 2.00, tau: 1.30 },
  ],
})
assert(r51Normal.status === 'Valid', 'Normal direct shear status is Valid')
assert(!r51Normal.isError, 'Normal direct shear is not error')
const cVal = Number(r51Normal.results.find(r => r.label === 'Kohesi Tanah (c)').value)
const phiVal = r51Normal.results.find(r => r.label === 'Sudut Geser Dalam (ϕ)').value
assert(cVal > 0.15 && cVal < 0.25, `Kohesi c from intercept is ~0.21, got ${cVal}`)
assert(phiVal.includes('28.6'), `Sudut geser phi from arctan(slope) is ~28.6°, got ${phiVal}`)

// Test with 4 points
const r51FourPoints = mt51.calculate({
  points: [
    { id: 1, sigma: 0.50, tau: 0.48 },
    { id: 2, sigma: 1.00, tau: 0.76 },
    { id: 3, sigma: 1.50, tau: 1.03 },
    { id: 4, sigma: 2.00, tau: 1.30 },
  ],
})
assert(r51FourPoints.status === 'Valid', 'Direct shear with 4 points calculates cleanly')
assert(!r51FourPoints.isError, '4 points is not error')

// Test fewer than 3 points
const r51TwoPoints = mt51.calculate({
  points: [
    { id: 1, sigma: 0.50, tau: 0.48 },
    { id: 2, sigma: 1.00, tau: 0.76 },
  ],
})
assert(r51TwoPoints.isError === true, '< 3 points triggers isError = true')
assert(r51TwoPoints.status === 'Input Tidak Wajar / Cek Kembali Data', '< 3 points triggers Input Tidak Wajar')
assert(r51TwoPoints.results.find(r => r.label === 'Kohesi Tanah (c)').value === '-', '< 3 points returns -')

// Test slope <= 0 (unphysical negative shear response)
const r51NegativeSlope = mt51.calculate({
  points: [
    { id: 1, sigma: 0.50, tau: 1.50 },
    { id: 2, sigma: 1.00, tau: 1.00 },
    { id: 3, sigma: 2.00, tau: 0.50 },
  ],
})
assert(r51NegativeSlope.isError === true, 'Slope <= 0 triggers isError = true')
assert(r51NegativeSlope.conclusion.includes('slope ≤ 0'), 'Slope <= 0 conclusion mentions slope <= 0')

// 2. Modul Konsolidasi Oedometer (mt-5-2)
console.log('\n--- 2. Testing mt-5-2 (Konsolidasi Oedometer) ---')
const mt52 = calculatorRegistry['mt-5-2']
assert(Boolean(mt52), 'mt-5-2 is registered')

// Check field min attributes
assert(mt52.fields.every(f => f.min >= 0.01), 'All mt-5-2 fields have min >= 0.01')

// Normal Konsolidasi (Cc < 1.0)
const r52Normal = mt52.calculate({
  tinggiAwal: 20.0,
  angkaPoriAwal: 0.85,
  deltaH: 1.45,
  tekananP1: 50.0,
  tekananP2: 100.0,
})
assert(r52Normal.status === 'Valid', 'Normal konsolidasi status is Valid (Green box)')
assert(!r52Normal.isError, 'Normal konsolidasi is not error')
const ccVal = Number(r52Normal.results.find(r => r.label === 'Indeks Kompresi (Cc)').value)
assert(ccVal > 0.40 && ccVal < 0.50, `Cc is ~0.446, got ${ccVal}`)

// Validasi P2 <= P1
const r52P2LessP1 = mt52.calculate({
  tinggiAwal: 20.0,
  angkaPoriAwal: 0.85,
  deltaH: 1.45,
  tekananP1: 100.0,
  tekananP2: 50.0,
})
assert(r52P2LessP1.isError === true, 'P2 <= P1 triggers isError = true (Red box)')
assert(r52P2LessP1.status === 'Input Tidak Wajar / Cek Kembali Data', 'P2 <= P1 status is Input Tidak Wajar')
assert(r52P2LessP1.results.find(r => r.label === 'Indeks Kompresi (Cc)').value === '-', 'P2 <= P1 returns -')

// Validasi Penurunan (ΔH) >= Tinggi Awal (H0)
const r52DhGreaterH0 = mt52.calculate({
  tinggiAwal: 20.0,
  angkaPoriAwal: 0.85,
  deltaH: 22.0,
  tekananP1: 50.0,
  tekananP2: 100.0,
})
assert(r52DhGreaterH0.isError === true, 'ΔH >= H0 triggers isError = true (Red box)')
assert(r52DhGreaterH0.status === 'Input Tidak Wajar / Cek Kembali Data', 'ΔH >= H0 status is Input Tidak Wajar')
assert(r52DhGreaterH0.results.find(r => r.label === 'Indeks Kompresi (Cc)').value === '-', 'ΔH >= H0 returns -')

// Logika Status: Cc > 1.0 (Kuning "Perlu Evaluasi")
const r52HighCc = mt52.calculate({
  tinggiAwal: 20.0,
  angkaPoriAwal: 2.50,
  deltaH: 4.0,
  tekananP1: 50.0,
  tekananP2: 100.0,
})
assert(r52HighCc.status === 'Perlu Evaluasi', 'Cc > 1.0 triggers status Perlu Evaluasi (Yellow box)')
assert(!r52HighCc.isError, 'Cc > 1.0 is not an input syntax error')
assert(r52HighCc.conclusion.includes('Nilai Cc > 1.0 mengindikasikan tanah dengan kompresibilitas sangat tinggi (organik/gambut).'), 'Cc > 1.0 conclusion matches required text exactly')
assert(Boolean(r52HighCc.warningMessage), 'Cc > 1.0 generates warningMessage')

if (failures > 0) {
  console.error(`\n💥 TOTAL FAILURES: ${failures}`)
  process.exit(1)
} else {
  console.log('\n🎉 ALL BAB 5 TESTS PASSED SUCCESSFULLY!')
}

