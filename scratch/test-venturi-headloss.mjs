import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TEST FLOW MEASUREMENT (VENTURI & ORIFICE) WITH HEAD LOSS & MASS FLOW ===\n')

const testConfig = calculatorRegistry['mf-3-1']
if (!testConfig) {
  console.error('❌ FAIL: Modul mf-3-1 tidak ditemukan di calculatorRegistry')
  process.exit(1)
}

console.log('✅ Modul mf-3-1 ditemukan:', testConfig.name)
console.log('Input fields count:', testConfig.fields.length)

// 1. Test Default Inputs
console.log('\n--- 1. Test Default Inputs ---')
const res1 = testConfig.calculate(testConfig.initialInputs)
console.log('Status:', res1.status)
console.log('Results:')
res1.results.forEach(r => console.log(`  - ${r.label}: ${r.value} ${r.unit || ''}`))

// Assertions for res1
const venturiQ = res1.results.find(r => r.label.includes('Debit Aliran Aktual Venturi (Q)') && r.unit === 'Liter/detik')
const mfVenturi = res1.results.find(r => r.label.includes('Mass Flow Empiris Venturi'))
const mfOrifice = res1.results.find(r => r.label.includes('Mass Flow Empiris Orifice'))
const hlVenturi = res1.results.find(r => r.label.includes('Head Loss Venturi'))
const hlOrifice = res1.results.find(r => r.label.includes('Head Loss Orifice'))

if (!venturiQ || !mfVenturi || !mfOrifice || !hlVenturi || !hlOrifice) {
  console.error('❌ FAIL: Label hasil tidak lengkap!')
  process.exit(1)
}

console.log('\nVerifying calculations:')
console.log(`Mass Flow Venturi: ${mfVenturi.value} kg/s (Expected: ~12.907)`)
console.log(`Mass Flow Orifice: ${mfOrifice.value} kg/s (Expected: ~11.096)`)
console.log(`Head Loss Venturi: ${hlVenturi.value} (Expected: ~0.6653)`)
console.log(`Head Loss Orifice: ${hlOrifice.value} (Expected: ~4.1417)`)

if (Math.abs(Number(mfVenturi.value) - 12.907) > 0.01) {
  console.error('❌ FAIL: Mass Flow Venturi tidak akurat')
  process.exit(1)
}
if (Math.abs(Number(mfOrifice.value) - 11.096) > 0.01) {
  console.error('❌ FAIL: Mass Flow Orifice tidak akurat')
  process.exit(1)
}
if (Math.abs(Number(hlVenturi.value) - 0.6653) > 0.01) {
  console.error('❌ FAIL: Head Loss Venturi tidak akurat')
  process.exit(1)
}
if (Math.abs(Number(hlOrifice.value) - 4.1417) > 0.01) {
  console.error('❌ FAIL: Head Loss Orifice tidak akurat')
  process.exit(1)
}
console.log('✅ PASS: Semua perhitungan default akurat!')

// 2. Test A = C (Head loss venturi = 0)
console.log('\n--- 2. Test A = C ---')
const res2 = testConfig.calculate({
  ...testConfig.initialInputs,
  manoA: 350,
  manoC: 350,
})
const hlVenturiZero = res2.results.find(r => r.label.includes('Head Loss Venturi'))
console.log(`Head Loss Venturi when A=C: ${hlVenturiZero.value} (Expected: 0.0000)`)
if (Number(hlVenturiZero.value) !== 0) {
  console.error('❌ FAIL: Head Loss Venturi harus 0 saat A=C')
  process.exit(1)
}
console.log('✅ PASS: Head Loss Venturi = 0 saat A=C!')

// 3. Test Invalid A <= B
console.log('\n--- 3. Test Invalid A <= B ---')
const res3 = testConfig.calculate({
  ...testConfig.initialInputs,
  manoA: 150,
  manoB: 200,
})
if (!res3.isError || !res3.status.includes('Tidak Wajar')) {
  console.error('❌ FAIL: A <= B harus menghasilkan error')
  process.exit(1)
}
console.log('✅ PASS: A <= B berhasil ditolak dengan benar!')

// 4. Test Invalid E <= F
console.log('\n--- 4. Test Invalid E <= F ---')
const res4 = testConfig.calculate({
  ...testConfig.initialInputs,
  manoE: 100,
  manoF: 200,
})
if (!res4.isError || !res4.status.includes('Tidak Wajar')) {
  console.error('❌ FAIL: E <= F harus menghasilkan error')
  process.exit(1)
}
console.log('✅ PASS: E <= F berhasil ditolak dengan benar!')

// 5. Test Custom Density (rho = 800)
console.log('\n--- 5. Test Custom Density (rho = 800) ---')
const res5 = testConfig.calculate({
  ...testConfig.initialInputs,
  massaJenisFluida: 800,
})
const mfVenturi800 = res5.results.find(r => r.label.includes('Mass Flow Empiris Venturi'))
const expectedMf800 = 0.962 * Math.sqrt(180) * 0.8
console.log(`Mass Flow Venturi with rho=800: ${mfVenturi800.value} (Expected: ${expectedMf800.toFixed(3)})`)
if (Math.abs(Number(mfVenturi800.value) - expectedMf800) > 0.01) {
  console.error('❌ FAIL: Mass flow dengan rho custom tidak sesuai')
  process.exit(1)
}
console.log('✅ PASS: Mass Flow dengan rho custom sesuai!')

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!')
