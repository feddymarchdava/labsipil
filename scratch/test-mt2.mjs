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

console.log('--- TESTING BAB 2 MEKANIKA TANAH (SIFAT FISIK TANAH) ---')

// 1. Modul Kadar Air Alami (mt-2-1 / KAT-01)
console.log('\n--- Test 1: mt-2-1 (Kadar Air Alami) ---')
const mt21 = calculatorRegistry['mt-2-1']

// Test normal
const r21Normal = mt21.calculate({ wCawan: 18.2, wBasah: 72.8, wKering: 61.5 })
assert(r21Normal.status === 'Valid', 'Normal moisture gives status Valid')
assert(!r21Normal.isError, 'Normal moisture is not error')
assert(r21Normal.results.find(r => r.label === 'Kadar Air Alami (w)').value === '26.10', 'Moisture calculated correctly (26.10%)')

// Test W2 <= W3 (Tanah Basah <= Kering)
const r21W2LeW3 = mt21.calculate({ wCawan: 18.2, wBasah: 50.0, wKering: 61.5 })
assert(r21W2LeW3.isError === true, 'W2 <= W3 sets isError to true')
assert(r21W2LeW3.status.includes('Tidak Wajar'), 'W2 <= W3 sets status to Tidak Wajar')
assert(r21W2LeW3.results.find(r => r.label === 'Kadar Air Alami (w)').value === '-', 'W2 <= W3 returns - for result')

// Test W3 <= W1 (Tanah Kering <= Cawan Kosong)
const r21W3LeW1 = mt21.calculate({ wCawan: 18.2, wBasah: 72.8, wKering: 15.0 })
assert(r21W3LeW1.isError === true, 'W3 <= W1 sets isError to true')
assert(r21W3LeW1.status.includes('Tidak Wajar'), 'W3 <= W1 sets status to Tidak Wajar')

// Test w > 100%
const r21HighMoisture = mt21.calculate({ wCawan: 18.2, wBasah: 100.0, wKering: 50.0 })
// wWater = 100 - 50 = 50, wDry = 50 - 18.2 = 31.8 -> moisture = 50/31.8 * 100 = 157.23%
assert(r21HighMoisture.status === 'Perlu Evaluasi (Kadar air tidak wajar untuk tanah normal)', 'w > 100% sets status Perlu Evaluasi (Kadar air tidak wajar untuk tanah normal)')
assert(r21HighMoisture.isError === false, 'w > 100% is not blocked with isError true')
assert(r21HighMoisture.warningMessage !== null, 'w > 100% generates warningMessage')
assert(r21HighMoisture.conclusion.includes('100.0%'), 'w > 100% conclusion includes reference to high moisture')

// 2. Modul Berat Jenis Gs (mt-2-2 / BJT-01)
console.log('\n--- Test 2: mt-2-2 (Berat Jenis Tanah Gs) ---')
const mt22 = calculatorRegistry['mt-2-2']

// Test normal
const r22Normal = mt22.calculate({ wPikno: 35.4, wPiknoTanah: 85.4, wPiknoAirTanah: 168.2, wPiknoAir: 137.0 })
// ws = 85.4 - 35.4 = 50, denom = 50 + 137.0 - 168.2 = 18.8 -> gs = 50 / 18.8 = 2.660
assert(r22Normal.status === 'Valid', 'Normal Gs (2.660) gives status Valid')
assert(!r22Normal.isError, 'Normal Gs is not error')
assert(r22Normal.results.find(r => r.label === 'Berat Jenis Butir (Gs)').value === '2.660', 'Gs value calculated correctly (2.660)')

// Test user case: W1 = 35.4, W2 = 17 (W2 < W1)
const r22W2LessW1 = mt22.calculate({ wPikno: 35.4, wPiknoTanah: 17.0, wPiknoAirTanah: 168.2, wPiknoAir: 137.0 })
assert(r22W2LessW1.isError === true, 'W2 < W1 sets isError to true')
assert(r22W2LessW1.status === 'Input Tidak Wajar / Cek Kembali Data', 'W2 < W1 sets status Input Tidak Wajar')
assert(r22W2LessW1.results.find(r => r.label === 'Berat Jenis Butir (Gs)').value === '-', 'W2 < W1 does not display negative Gs')
assert(r22W2LessW1.conclusion.includes('W2 = 17 gr'), 'Conclusion mentions W2 value')

// Test relational: W3 <= W2
const r22W3LeW2 = mt22.calculate({ wPikno: 35.4, wPiknoTanah: 85.4, wPiknoAirTanah: 80.0, wPiknoAir: 137.0 })
assert(r22W3LeW2.isError === true, 'W3 <= W2 sets isError to true')

// Test relational: W4 <= W2
const r22W4LeW2 = mt22.calculate({ wPikno: 35.4, wPiknoTanah: 85.4, wPiknoAirTanah: 168.2, wPiknoAir: 80.0 })
assert(r22W4LeW2.isError === true, 'W4 <= W2 sets isError to true')

// Test Gs outside 2.5 - 2.8 (e.g. Gs = 2.40)
// ws = 50, want denom = 50 / 2.40 = 20.833 -> (50 + 137) - w3 = 20.833 -> w3 = 166.17
const r22LowGs = mt22.calculate({ wPikno: 35.4, wPiknoTanah: 85.4, wPiknoAirTanah: 166.17, wPiknoAir: 137.0 })
assert(r22LowGs.status === 'Perlu Evaluasi', 'Gs < 2.50 sets status to Perlu Evaluasi')
assert(!r22LowGs.isError, 'Gs < 2.50 is not an input syntax error')
assert(r22LowGs.warningMessage !== null, 'Gs < 2.50 sets warningMessage')

// Test Gs > 2.80 (e.g. Gs = 2.94)
// ws = 50, want denom = 50 / 2.94 = 17.0 -> w3 = 170.0
const r22HighGs = mt22.calculate({ wPikno: 35.4, wPiknoTanah: 85.4, wPiknoAirTanah: 170.0, wPiknoAir: 137.0 })
assert(r22HighGs.status === 'Perlu Evaluasi', 'Gs > 2.80 sets status to Perlu Evaluasi')

// 3. Modul Batas Cair LL (mt-2-3 / LL-01)
console.log('\n--- Test 3: mt-2-3 (Batas Cair LL) ---')
const mt23 = calculatorRegistry['mt-2-3']

// Normal (N=22, w=43.5)
const r23Normal = mt23.calculate({ ketukanN: 22, kadarAirW: 43.5 })
assert(r23Normal.status === 'Valid', 'Normal N (22) and w (43.5%) gives status Valid')
assert(!r23Normal.warningMessage, 'Normal Casagrande has no warningMessage')

// Ketukan N < 15
const r23LowN = mt23.calculate({ ketukanN: 12, kadarAirW: 43.5 })
assert(r23LowN.status === 'Perlu Evaluasi', 'N < 15 gives status Perlu Evaluasi')
assert(r23LowN.warningMessage.includes('15 - 35 ketukan'), 'N < 15 warning message mentions 15 - 35 blows')

// Ketukan N > 35
const r23HighN = mt23.calculate({ ketukanN: 40, kadarAirW: 43.5 })
assert(r23HighN.status === 'Perlu Evaluasi', 'N > 35 gives status Perlu Evaluasi')
assert(r23HighN.warningMessage.includes('15 - 35 ketukan'), 'N > 35 warning message mentions 15 - 35 blows')

// Kadar air w > 100%
const r23HighW = mt23.calculate({ ketukanN: 25, kadarAirW: 105.0 })
assert(r23HighW.status === 'Perlu Evaluasi', 'w > 100% gives status Perlu Evaluasi')
assert(r23HighW.warningMessage.includes('100%'), 'w > 100% warning message mentions 100%')

// 4. Modul Batas Plastis & Indeks Plastisitas (mt-2-4 / PL-01)
console.log('\n--- Test 4: mt-2-4 (Batas Plastis & PI) ---')
const mt24 = calculatorRegistry['mt-2-4']

// Normal (LL=42.8, PL=22.4 -> PI=20.4%)
const r24Normal = mt24.calculate({ batasCairLL: 42.8, batasPlastisPL: 22.4 })
assert(r24Normal.status === 'Valid', 'Normal LL (42.8) and PL (22.4) gives status Valid')
assert(!r24Normal.isError, 'Normal LL and PL is not error')
assert(r24Normal.results.find(r => r.label === 'Indeks Plastisitas (PI)').value === '20.40', 'PI calculated correctly (20.40%)')

// User critical case: LL < PL (e.g. LL=8.8, PL=22.4)
const r24LLlessPL = mt24.calculate({ batasCairLL: 8.8, batasPlastisPL: 22.4 })
assert(r24LLlessPL.isError === true, 'LL < PL sets isError to true')
assert(r24LLlessPL.status === 'Input Tidak Wajar / Cek Kembali Data', 'LL < PL sets status Input Tidak Wajar / Cek Kembali Data')
assert(r24LLlessPL.conclusion === 'Data tidak valid: Batas Cair (LL) tidak boleh lebih kecil dari Batas Plastis (PL).', 'LL < PL conclusion matches required error text')
assert(r24LLlessPL.results.find(r => r.label === 'Indeks Plastisitas (PI)').value === '-', 'LL < PL does not display negative PI')

if (failures > 0) {
  console.error(`\n💥 TOTAL FAILURES: ${failures}`)
  process.exit(1)
} else {
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!')
}
