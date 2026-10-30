import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TEST BAB 5: KALIBRASI FLOWMETER (FLOW MEASUREMENT) ===\n')

const testConfig = calculatorRegistry['mf-5-1']
if (!testConfig) {
  console.error('❌ FAIL: Modul mf-5-1 tidak ditemukan di calculatorRegistry')
  process.exit(1)
}

console.log('✅ Modul mf-5-1 ditemukan:', testConfig.name)
console.log('Input fields count:', testConfig.fields.length)

// 1. Test Default Inputs
console.log('\n--- 1. Test Default Inputs ---')
const res1 = testConfig.calculate(testConfig.initialInputs)
console.log('Status:', res1.status)
console.log('Results:')
res1.results.forEach(r => console.log(`  - ${r.label}: ${r.value} ${r.unit || ''}`))

// Assertions for res1
const qAkt = res1.results.find(r => r.label.includes('Debit Aktual Volumetrik (Q_akt)'))
const qTeor = res1.results.find(r => r.label.includes('Debit Teoretis Venturi (Q_teor)'))
const selisih = res1.results.find(r => r.label.includes('Selisih Debit'))
const hlVenturi = res1.results.find(r => r.label.includes('Head Loss Venturi'))
const hlOrifice = res1.results.find(r => r.label.includes('Head Loss Orifice'))

if (!qAkt || !qTeor || !selisih || !hlVenturi || !hlOrifice) {
  console.error('❌ FAIL: Label hasil tidak lengkap!')
  process.exit(1)
}

console.log('\nVerifying calculations:')
console.log(`Q Aktual: ${qAkt.value} kg/s (Expected: 0.400)`)
console.log(`Q Teoretis: ${qTeor.value} kg/s (Expected: 0.934)`)
console.log(`Selisih: ${selisih.value} kg/s (Expected: 0.534)`)
console.log(`Head Loss Venturi: ${hlVenturi.value} (Expected: ~0.6653)`)
console.log(`Head Loss Orifice: ${hlOrifice.value} (Expected: ~4.1417)`)

if (Math.abs(Number(qAkt.value) - 0.400) > 0.005) {
  console.error('❌ FAIL: Q Aktual tidak akurat')
  process.exit(1)
}
if (Math.abs(Number(qTeor.value) - 0.934) > 0.005) {
  console.error('❌ FAIL: Q Teoretis tidak akurat')
  process.exit(1)
}
if (Math.abs(Number(selisih.value) - 0.534) > 0.005) {
  console.error('❌ FAIL: Selisih Debit tidak akurat')
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
console.log('✅ PASS: Semua perhitungan default Bab 5 akurat!')

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

// 4. Test Invalid D2 >= D1
console.log('\n--- 4. Test Invalid D2 >= D1 ---')
const res4 = testConfig.calculate({
  ...testConfig.initialInputs,
  diameterD1: 25,
  diameterD2: 30,
})
if (!res4.isError || !res4.status.includes('Tidak Wajar')) {
  console.error('❌ FAIL: D2 >= D1 harus menghasilkan error')
  process.exit(1)
}
console.log('✅ PASS: D2 >= D1 berhasil ditolak dengan benar!')

// 5. Test flowComparison & headLoss properties
console.log('\n--- 5. Test flowComparison & headLoss objects ---')
if (!res1.flowComparison || !res1.headLoss) {
  console.error('❌ FAIL: flowComparison atau headLoss object tidak terpasang')
  process.exit(1)
}
console.log('flowComparison:', {
  qAktualKgS: res1.flowComparison.qAktualKgS,
  qTeoretisKgS: res1.flowComparison.qTeoretisKgS,
  selisihDebit: res1.flowComparison.selisihDebit,
  deviasiPct: res1.flowComparison.deviasiPct,
})
console.log('headLoss:', {
  venturiLoss: res1.headLoss.venturiLoss,
  orificeLoss: res1.headLoss.orificeLoss,
})
console.log('✅ PASS: Sub-kalkulator data structures terpasang sempurna!')

console.log('\n🎉 ALL BAB 5 TESTS PASSED SUCCESSFULLY!')
