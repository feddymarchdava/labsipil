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

console.log('--- TESTING BAB 3 MEKANIKA TANAH: STANDARD PROCTOR ITERA ---\n')

const mt31 = calculatorRegistry['mt-3-1']
assert(Boolean(mt31), 'mt-3-1 is registered')
assert(mt31.hasDynamicProctorTable === true, 'mt-3-1 has hasDynamicProctorTable = true')
assert(Array.isArray(mt31.initialInputs.proctorSamples), 'initialInputs.proctorSamples is an array')
assert(mt31.initialInputs.proctorSamples.length === 3, 'initialInputs.proctorSamples has 3 samples (S1, S2, S3)')

// 1. Multi-sample ITERA Proctor Calculation
console.log('\n--- 1. Testing Multi-Sample Standard Proctor (ITERA) ---')
const rMulti = mt31.calculate({ proctorSamples: mt31.initialInputs.proctorSamples })
assert(rMulti.status === 'Valid', 'Status multi-sample normal is Valid')
assert(!rMulti.isError, 'isError is false for normal samples')
assert(rMulti.proctorSamples.length === 3, 'Returns 3 computed samples')

// Check S1
const s1 = rMulti.proctorSamples[0]
console.log('S1:', { avgW: s1.avgW.toFixed(2), wet: s1.gammaWet.toFixed(3), dry: s1.gammaDry.toFixed(3) })
assert(Math.abs(s1.avgW - 12.06) < 0.1, `S1 moisture content ~12.06%, got ${s1.avgW.toFixed(2)}%`)
assert(Math.abs(s1.gammaWet - 1.820) < 0.01, `S1 wet density ~1.820 gr/cm³, got ${s1.gammaWet.toFixed(3)}`)
assert(Math.abs(s1.gammaDry - 1.625) < 0.01, `S1 dry density ~1.625 gr/cm³, got ${s1.gammaDry.toFixed(3)}`)

// Check S2 (Peak)
const s2 = rMulti.proctorSamples[1]
console.log('S2:', { avgW: s2.avgW.toFixed(2), wet: s2.gammaWet.toFixed(3), dry: s2.gammaDry.toFixed(3) })
assert(Math.abs(s2.avgW - 15.07) < 0.1, `S2 moisture content ~15.07%, got ${s2.avgW.toFixed(2)}%`)
assert(Math.abs(s2.gammaWet - 2.012) < 0.01, `S2 wet density ~2.012 gr/cm³, got ${s2.gammaWet.toFixed(3)}`)
assert(Math.abs(s2.gammaDry - 1.749) < 0.01, `S2 dry density ~1.749 gr/cm³, got ${s2.gammaDry.toFixed(3)}`)

// Check S3
const s3 = rMulti.proctorSamples[2]
console.log('S3:', { avgW: s3.avgW.toFixed(2), wet: s3.gammaWet.toFixed(3), dry: s3.gammaDry.toFixed(3) })
assert(Math.abs(s3.avgW - 18.19) < 0.1, `S3 moisture content ~18.19%, got ${s3.avgW.toFixed(2)}%`)
assert(Math.abs(s3.gammaWet - 1.957) < 0.01, `S3 wet density ~1.957 gr/cm³, got ${s3.gammaWet.toFixed(3)}`)
assert(Math.abs(s3.gammaDry - 1.656) < 0.01, `S3 dry density ~1.656 gr/cm³, got ${s3.gammaDry.toFixed(3)}`)

// Check Overall MDD & OMC
assert(Math.abs(rMulti.mdd - 1.749) < 0.02, `MDD is ~1.749 gr/cm³, got ${rMulti.mdd.toFixed(3)}`)
assert(Math.abs(rMulti.omc - 15.2) < 0.5, `OMC is ~15.1 - 15.4%, got ${rMulti.omc.toFixed(2)}%`)
assert(Math.abs(rMulti.avgWet - 1.930) < 0.01, `Average wet density is ~1.930 gr/cm³, got ${rMulti.avgWet.toFixed(3)}`)
assert(rMulti.rekapitulasiTable.length === 3, 'Rekapitulasi table has 3 rows')
assert(rMulti.chartData.length > 3, 'Chart data has points including ZAV')

// 2. Testing Invalid Container Data (M2 <= M3)
console.log('\n--- 2. Testing Invalid Container Data (M2 <= M3) ---')
const badContainers = JSON.parse(JSON.stringify(mt31.initialInputs.proctorSamples))
badContainers[0].containers[0].m2 = 30.0
badContainers[0].containers[0].m3 = 35.0 // M2 <= M3!
const rBadContainer = mt31.calculate({ proctorSamples: badContainers })
assert(rBadContainer.hasInvalidContainer === true, 'hasInvalidContainer is true when M2 <= M3')
assert(rBadContainer.isError === true, 'isError is true when container data is invalid')
assert(rBadContainer.status.includes('Input Tidak Wajar'), 'Status triggers danger review box')

// 3. Fallback Legacy Single-Point Mode
console.log('\n--- 3. Testing Fallback Legacy Single-Point Mode ---')
const r31Legacy = mt31.calculate({ volMold: 943.8, wMold: 2150.0, wMoldTanah: 3980.0, kadarAir: 14.5 })
assert(r31Legacy.status === 'Valid', 'Normal Legacy Proctor has status Valid')
assert(!r31Legacy.isError, 'Normal Legacy Proctor is not error')
assert(r31Legacy.results.find(r => r.label === 'Berat Volume Kering (γ_dry)').value === '1.693', 'Legacy γ_dry = 1.693 gr/cm³')

// 4. Verifikasi mt-3-2 (Sand Cone) Remains Deleted
console.log('\n--- 4. Verifikasi mt-3-2 (Sand Cone Lapangan) Tetap Terhapus ---')
const mt32 = calculatorRegistry['mt-3-2']
assert(mt32 === undefined, 'mt-3-2 is undefined (confirmed deleted)')

if (failures > 0) {
  console.error(`\n💥 TOTAL FAILURES: ${failures}`)
  process.exit(1)
} else {
  console.log('\n🎉 ALL BAB 3 PEMADATAN TANAH TESTS PASSED SUCCESSFULLY (20/20)!')
}
