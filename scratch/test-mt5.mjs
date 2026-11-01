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

// Test Multi-Point Direct Shear dengan Beban P, Gaya Geser F, dan Luas A
const r51MultiLoad = mt51.calculate({
  points: [
    { id: 1, area: 31.17, normalLoad: 3.17, shearForce: 1.50 },
    { id: 2, area: 31.17, normalLoad: 6.325, shearForce: 2.35 },
    { id: 3, area: 31.17, normalLoad: 12.65, shearForce: 4.05 },
  ],
})
assert(r51MultiLoad.status === 'Valid', 'Multi-point P, F, A calculation status is Valid')
assert(!r51MultiLoad.isError, 'Multi-point calculation is not error')
const cMulti = Number(r51MultiLoad.results.find(r => r.label === 'Kohesi Tanah (c)').value)
const phiMulti = r51MultiLoad.results.find(r => r.label === 'Sudut Geser Dalam (ϕ)').value
const r2Multi = Number(r51MultiLoad.results.find(r => r.label === 'Koefisien Determinasi (R²)').value)
assert(cMulti >= 0.019 && cMulti <= 0.023, `Kohesi c from P, F is ~0.021 kg/cm², got ${cMulti}`)
assert(phiMulti.includes('15.0') || phiMulti.includes('15.1'), `Sudut geser phi from P, F is ~15.1°, got ${phiMulti}`)
assert(r2Multi >= 0.99, `R² is > 0.99, got ${r2Multi}`)
assert(r51MultiLoad.chartPoints && r51MultiLoad.chartPoints.length === 5, 'chartPoints has origin, 3 test points, and extension (length 5)')
assert(r51MultiLoad.computedPoints && r51MultiLoad.computedPoints.length === 3, 'computedPoints has 3 items')

// Test Negative Load in Direct Shear
const r51NegLoad = mt51.calculate({
  points: [
    { id: 1, area: 31.17, normalLoad: -3.17, shearForce: 1.50 },
    { id: 2, area: 31.17, normalLoad: 6.325, shearForce: 2.35 },
    { id: 3, area: 31.17, normalLoad: 12.65, shearForce: 4.05 },
  ],
})
assert(r51NegLoad.isError === true, 'Negative load triggers isError = true')
assert(r51NegLoad.status === 'Input Tidak Wajar / Cek Kembali Data', 'Negative load status is Input Tidak Wajar')

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

// 3. Testing Dynamic Oedometer Taylor Method
console.log('\n--- 3. Testing Dynamic Oedometer Taylor Method ---')
const r52DynInit = mt52.calculate(mt52.initialInputs)
assert(r52DynInit.status === 'Valid', 'Dynamic Oedometer status is Valid')
assert(!r52DynInit.isError, 'Dynamic Oedometer is not error')
assert(r52DynInit.results.length === 4, 'Dynamic Oedometer menghasilkan tepat 4 kartu ringkasan hasil utama')
assert(r52DynInit.results[0].label.includes('Koefisien Konsolidasi'), 'Card 1 adalah Koefisien Konsolidasi (Cv)')
assert(r52DynInit.results[1].label.includes('Waktu t90'), 'Card 2 adalah Waktu t90')
assert(r52DynInit.results[2].label.includes('Tinggi Jalur Pengaliran'), 'Card 3 adalah Tinggi Jalur Pengaliran (Ht)')
assert(r52DynInit.results[3].label.includes('Indeks Kompresi'), 'Card 4 adalah Indeks Kompresi (Cc)')
assert(r52DynInit.t90 > 6.0 && r52DynInit.t90 < 8.5, `t90 is ~7.23 min, got ${r52DynInit.t90.toFixed(2)}`)
assert(r52DynInit.ht > 0.90 && r52DynInit.ht < 1.00, `Ht is ~0.964 cm, got ${r52DynInit.ht.toFixed(3)}`)
assert(r52DynInit.cvSec > 0.0010 && r52DynInit.cvSec < 0.0030, `Cv is ~0.00181 cm²/s, got ${r52DynInit.cvSec}`)
assert(r52DynInit.cc > 0.40 && r52DynInit.cc < 0.50, `Cc is ~0.446, got ${r52DynInit.cc.toFixed(3)}`)
assert(Array.isArray(r52DynInit.chartDataPoints) && r52DynInit.chartDataPoints.length === 14, 'Chart data has 14 reading points')

// Testing Custom User Input Data dengan Tebal H (cm) sesuai contoh prompt
const r52CustomThickness = mt52.calculate({
  e0: 0.85,
  p1: 100.0,
  p2: 200.0,
  h0: 2.0,
  oedometerReadings: [
    { t: 0, h: 1.9202 },
    { t: 0.25, h: 1.9074 },
    { t: 1.0, h: 1.8950 },
    { t: 2.25, h: 1.8830 },
    { t: 4.0, h: 1.8720 },
    { t: 6.25, h: 1.8620 },
    { t: 9.0, h: 1.8530 },
    { t: 12.25, h: 1.8450 },
    { t: 16.0, h: 1.8380 },
    { t: 20.25, h: 1.8320 },
    { t: 40.0, h: 1.8250 },
    { t: 120.0, h: 1.8190 },
    { t: 400.0, h: 1.8150 },
    { t: 1440.0, h: 1.8130 },
  ],
})
assert(r52CustomThickness.status === 'Valid', 'Custom thickness H readings status is Valid')
assert(!r52CustomThickness.isError, 'Custom thickness H readings is not error')
assert(r52CustomThickness.ht > 0.90 && r52CustomThickness.ht < 0.95, `Custom Ht is ~0.933 cm, got ${r52CustomThickness.ht.toFixed(3)}`)
assert(r52CustomThickness.t90 > 10.0 && r52CustomThickness.t90 < 13.0, `Custom t90 is ~11.66 min, got ${r52CustomThickness.t90.toFixed(2)}`)
assert(r52CustomThickness.cvSec > 0.0008 && r52CustomThickness.cvSec < 0.0015, `Custom Cv is ~0.00105 cm²/s, got ${r52CustomThickness.cvSec}`)

// Negative Time in Table
const r52NegTime = mt52.calculate({
  e0: 0.85,
  p1: 50.0,
  p2: 100.0,
  h0: 2.0,
  oedometerReadings: [
    { id: 1, t: -1.0, h: 2.0, deltaH: 0.0 },
  ],
})
assert(r52NegTime.isError === true, 'Negative time in table triggers error')

// P2 <= P1 in Dynamic Mode
const r52DynP2Less = mt52.calculate({
  e0: 0.85,
  p1: 100.0,
  p2: 50.0,
  h0: 2.0,
  oedometerReadings: mt52.initialInputs.oedometerReadings,
})
assert(r52DynP2Less.isError === true, 'P2 <= P1 in dynamic table triggers error')

if (failures > 0) {
  console.error(`\n💥 TOTAL FAILURES: ${failures}`)
  process.exit(1)
} else {
  console.log('\n🎉 ALL BAB 5 TESTS PASSED SUCCESSFULLY!')
}

