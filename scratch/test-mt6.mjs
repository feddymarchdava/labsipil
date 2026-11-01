import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== TEST SUITE: Bab 6 Permeabilitas Tanah (mt-6-1) ===\n')

const config = calculatorRegistry['mt-6-1']
if (!config) {
  console.error('ERROR: mt-6-1 not found in calculatorRegistry')
  process.exit(1)
}

let passCount = 0
let failCount = 0

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`)
    passCount++
  } else {
    console.error(`[FAIL] ${message}`)
    failCount++
  }
}

function parseScientific(str) {
  if (typeof str === 'number') return str
  const SUPERSCRIPTS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' }
  const normalized = String(str)
    .replace(/\s*×\s*10/, 'e')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, ch => SUPERSCRIPTS[ch] || ch)
  return Number(normalized)
}

// 1. Check methods config & fields
assert(Array.isArray(config.methods) && config.methods.length === 2, 'Metode memiliki 2 opsi: Constant Head & Falling Head')
assert(config.methods[0].value === 'constant' && config.methods[1].value === 'falling', 'Method values are constant and falling')

const constantFields = config.getFields({ metode: 'constant' })
const fallingFields = config.getFields({ metode: 'falling' })

assert(constantFields.length === 5, 'Constant Head memiliki 5 field input (D, L, Q, h, t)')
assert(constantFields.every(f => f.min === 0.01), 'Semua input Constant Head memiliki min="0.01"')

assert(fallingFields.length === 6, 'Falling Head memiliki 6 field input (d, L, D, h0, h1, t)')
assert(fallingFields.every(f => f.min === 0.01), 'Semua input Falling Head memiliki min="0.01"')
assert(fallingFields.some(f => f.key === 'diameterPipaD'), 'Falling Head memiliki field diameterPipaD (d)')
assert(fallingFields.some(f => f.key === 'diameterSampelD'), 'Falling Head memiliki field diameterSampelD (D)')

// 2. Test Constant Head Default Input
const defConstant = config.calculate({ metode: 'constant' })
assert(!defConstant.isError, 'Default Constant Head calculation succeeds without error')
assert(defConstant.status === 'Valid', 'Default Constant Head status is Valid')
assert(defConstant.results.length === 4, 'Constant Head menghasilkan tepat 4 output card ringkasan')
assert(defConstant.results[0].label.includes('Koefisien Permeabilitas'), 'Card 1 adalah Koefisien Permeabilitas (k)')
assert(defConstant.results[1].label.includes('Luas Penampang Sampel'), 'Card 2 adalah Luas Penampang Sampel (A)')
assert(defConstant.results[2].label.includes('Metode Pengujian Aktif'), 'Card 3 adalah Metode Pengujian Aktif')
assert(defConstant.results[3].label.includes('Klasifikasi Jenis Tanah'), 'Card 4 adalah Klasifikasi Jenis Tanah')

const kItem = defConstant.results.find(r => r.label.includes('Koefisien Permeabilitas'))
const jenisItem = defConstant.results.find(r => r.label.includes('Klasifikasi Jenis Tanah'))
console.log(`  Default Constant Head k = ${kItem.value} cm/s, jenis = ${jenisItem.value}`)
assert(jenisItem.value === 'Pasir Kasar', 'Default k (approx 0.012 cm/s) diklasifikasikan sebagai Pasir Kasar')

// 3. User Problem Check: k = 0.348 cm/s MUST BE "Pasir Kasar", NOT "Kerikil Bersih"
// Calculate Q to get k approx 0.348
// k = (Q * L) / (A * h * t) => Q = k * A * h * t / L
const areaDef = (Math.PI / 4) * 7.5 * 7.5
const targetQ = (0.348 * areaDef * 45 * 120) / 12
const res348 = config.calculate({
  metode: 'constant',
  diameterD: 7.5,
  panjangL: 12.0,
  volumeQ: targetQ,
  headH: 45.0,
  waktuT: 120.0,
})
const k348Item = res348.results.find(r => r.label.includes('Koefisien Permeabilitas'))
const jenis348Item = res348.results.find(r => r.label.includes('Klasifikasi Jenis Tanah'))
console.log(`  Target k = 0.348 cm/s -> calculated k = ${k348Item.value}, jenis = ${jenis348Item.value}`)
assert(jenis348Item.value === 'Pasir Kasar', 'k = 0.348 cm/s diklasifikasikan dengan benar sebagai Pasir Kasar (BUKAN Kerikil Bersih)')

// 4. Test Soil Classification Thresholds
// > 1.0 : Kerikil Bersih
const qGravel = (2.0 * areaDef * 45 * 120) / 12
const resGravel = config.calculate({
  metode: 'constant',
  diameterD: 7.5,
  panjangL: 12.0,
  volumeQ: qGravel,
  headH: 45.0,
  waktuT: 120.0,
})
assert(resGravel.results.find(r => r.label.includes('Klasifikasi Jenis Tanah')).value === 'Kerikil Bersih', 'k > 1.0 diklasifikasikan sebagai Kerikil Bersih')

// 0.01 >= k > 0.001 : Pasir Halus
const qFineSand = (0.005 * areaDef * 45 * 120) / 12
const resFineSand = config.calculate({
  metode: 'constant',
  diameterD: 7.5,
  panjangL: 12.0,
  volumeQ: qFineSand,
  headH: 45.0,
  waktuT: 120.0,
})
assert(resFineSand.results.find(r => r.label.includes('Klasifikasi Jenis Tanah')).value === 'Pasir Halus', '0.001 < k <= 0.01 diklasifikasikan sebagai Pasir Halus')

// 5. Test Constant Head Warning when k < 0.001 cm/s
// When k < 0.001, status MUST be "Perlu Evaluasi" with specific warning
const qSilt = (0.0005 * areaDef * 45 * 120) / 12
const resSilt = config.calculate({
  metode: 'constant',
  diameterD: 7.5,
  panjangL: 12.0,
  volumeQ: qSilt,
  headH: 45.0,
  waktuT: 120.0,
})
assert(resSilt.status === 'Perlu Evaluasi', 'Constant Head dengan k < 0.001 menghasilkan status Perlu Evaluasi (Kuning)')
assert(resSilt.warningMessage && resSilt.warningMessage.includes('Metode Constant Head kurang akurat untuk tanah halus'), 'Warning banner menyarankan metode Falling Head')
assert(resSilt.results.find(r => r.label.includes('Klasifikasi Jenis Tanah')).value === 'Lanau', '0.00001 < k <= 0.001 diklasifikasikan sebagai Lanau')

// Clay <= 0.00001
const qClay = (0.000005 * areaDef * 45 * 120) / 12
const resClay = config.calculate({
  metode: 'constant',
  diameterD: 7.5,
  panjangL: 12.0,
  volumeQ: qClay,
  headH: 45.0,
  waktuT: 120.0,
})
assert(resClay.results.find(r => r.label.includes('Klasifikasi Jenis Tanah')).value === 'Lempung', 'k <= 0.00001 diklasifikasikan sebagai Lempung')

// 6. Test Falling Head Method Calculation (Legacy area inputs)
// Formula: k = (a * L / (A * t)) * ln(h0 / h1)
const resFalling = config.calculate({
  metode: 'falling',
  pipaA: 0.85,
  panjangL: 12.0,
  luasSampelA: 44.18,
  headH0: 50.0,
  headH1: 20.0,
  waktuT: 120.0,
})
assert(!resFalling.isError, 'Falling Head kalkulasi berhasil tanpa error')
assert(resFalling.status === 'Valid', 'Falling Head valid menghasilkan status Valid')
assert(resFalling.results.length === 4, 'Falling Head menghasilkan tepat 4 output card ringkasan')
const expectedKFalling = ((0.85 * 12.0) / (44.18 * 120.0)) * Math.log(50.0 / 20.0)
const kFallingItem = resFalling.results.find(r => r.label.includes('Koefisien Permeabilitas'))
const actualKFalling = kFallingItem.numericValue ?? parseScientific(kFallingItem.value)
assert(Math.abs(actualKFalling - expectedKFalling) < 1e-6, `Falling Head k akurat sesuai rumus (expected: ${expectedKFalling.toExponential(3)}, actual: ${actualKFalling.toExponential(3)})`)

// 6b. Test Falling Head with Diameters (d = 1.04 cm, D = 7.5 cm)
const resFallingDiameters = config.calculate({
  metode: 'falling',
  diameterPipaD: 1.04,
  panjangL: 12.0,
  diameterSampelD: 7.5,
  headH0: 50.0,
  headH1: 20.0,
  waktuT: 120.0,
})
assert(!resFallingDiameters.isError, 'Falling Head dengan parameter diameter d & D berhasil dihitung')
const aCalc = (Math.PI / 4) * 1.04 * 1.04
const ACalc = (Math.PI / 4) * 7.5 * 7.5
const expectedKDiameters = ((aCalc * 12.0) / (ACalc * 120.0)) * Math.log(50.0 / 20.0)
const kDiaItem = resFallingDiameters.results.find(r => r.label.includes('Koefisien Permeabilitas'))
const actualKDiameters = kDiaItem.numericValue ?? parseScientific(kDiaItem.value)
assert(Math.abs(actualKDiameters - expectedKDiameters) < 1e-6, `Falling Head k dengan diameter akurat (expected: ${expectedKDiameters.toExponential(3)}, actual: ${actualKDiameters.toExponential(3)})`)
assert(resFallingDiameters.results.find(r => r.label.includes('Luas Penampang Sampel')).value === ACalc.toFixed(2), 'Luas penampang sampel A terhitung akurat dari diameter')

// 7. Test Falling Head Relational Error: h0 <= h1
const resFallingError = config.calculate({
  metode: 'falling',
  pipaA: 0.85,
  panjangL: 12.0,
  luasSampelA: 44.18,
  headH0: 20.0,
  headH1: 50.0,
  waktuT: 120.0,
})
assert(resFallingError.isError === true, 'Falling head h0 < h1 memicu isError: true')
assert(resFallingError.status === 'Input Tidak Wajar / Cek Kembali Data', 'Falling head h0 < h1 status adalah Input Tidak Wajar / Cek Kembali Data')

const resFallingEqual = config.calculate({
  metode: 'falling',
  pipaA: 0.85,
  panjangL: 12.0,
  luasSampelA: 44.18,
  headH0: 30.0,
  headH1: 30.0,
  waktuT: 120.0,
})
assert(resFallingEqual.isError === true, 'Falling head h0 == h1 memicu isError: true')

// 8. Test Zero / Negative inputs in Constant Head
const resZeroConst = config.calculate({
  metode: 'constant',
  diameterD: 0,
  panjangL: 12.0,
  volumeQ: 240.0,
  headH: 45.0,
  waktuT: 120.0,
})
assert(resZeroConst.isError === true, 'Constant head dengan diameter 0 memicu isError: true')

// 9. Test Zero / Negative inputs in Falling Head
const resZeroFalling = config.calculate({
  metode: 'falling',
  pipaA: 0,
  panjangL: 12.0,
  luasSampelA: 44.18,
  headH0: 50.0,
  headH1: 20.0,
  waktuT: 120.0,
})
assert(resZeroFalling.isError === true, 'Falling head dengan pipaA 0 memicu isError: true')

const resZeroFallingDia = config.calculate({
  metode: 'falling',
  diameterPipaD: 0,
  panjangL: 12.0,
  diameterSampelD: 7.5,
  headH0: 50.0,
  headH1: 20.0,
  waktuT: 120.0,
})
assert(resZeroFallingDia.isError === true, 'Falling head dengan diameterPipaD 0 memicu isError: true')

console.log(`\n========================================`)
console.log(`Summary: ${passCount} PASSED, ${failCount} FAILED`)
console.log(`========================================`)

if (failCount > 0) {
  process.exit(1)
}

