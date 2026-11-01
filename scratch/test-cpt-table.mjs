import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== VERIFIKASI LOGIKA TABEL DINAMIS & RUMUS EXCEL UJI SONDIR (CPT) ===\n')

const cptConfig = calculatorRegistry['mt-1-1']
if (!cptConfig) {
  console.error('❌ FAIL: Modul mt-1-1 tidak ditemukan di calculatorRegistry!')
  process.exit(1)
}

console.log('1. Verifikasi Konfigurasi Modul:')
console.log('  - id:', cptConfig.id)
console.log('  - standard:', cptConfig.standard)
console.log('  - hasDynamicCptTable:', cptConfig.hasDynamicCptTable)
if (!cptConfig.hasDynamicCptTable) throw new Error('hasDynamicCptTable harus bernilai true!')
if (!Array.isArray(cptConfig.initialInputs.cptRows)) throw new Error('initialInputs.cptRows harus berupa array!')
if (cptConfig.initialInputs.cptRows.length !== 15) throw new Error('initialInputs.cptRows harus memiliki 15 baris!')
console.log('  ✅ PASS: Konfigurasi default 15 baris sesuai spesifikasi.')

console.log('\n2. Verifikasi Perhitungan Default (15 Baris):')
const calc1 = cptConfig.calculate({ cptRows: cptConfig.initialInputs.cptRows })
console.log('  - Total Kedalaman:', calc1.totalKedalaman, 'm')
console.log('  - Rata-rata qc:', calc1.avgQc.toFixed(2), 'kg/cm²')
console.log('  - Rata-rata FR:', calc1.avgFr.toFixed(2), '%')
console.log('  - Prediksi Lapisan Tanah:', calc1.predictedSoil)
console.log('  - Status:', calc1.status)
console.log('  - isError:', calc1.isError)

if (calc1.totalKedalaman !== 2.80) throw new Error(`Total kedalaman harus 2.80, got ${calc1.totalKedalaman}`)
if (calc1.isError) throw new Error('Data default 15 baris tidak boleh menghasilkan error!')
if (calc1.status !== 'Valid') throw new Error(`Status default harus Valid, got ${calc1.status}`)
if (calc1.chartData.length !== 15) throw new Error(`chartData harus berisi 15 titik, got ${calc1.chartData.length}`)
console.log('  ✅ PASS: Perhitungan default 15 baris berhasil dan valid!')

console.log('\n3. Verifikasi Logika Baris Excel:')
// Baris 1: depth 0.00, qc 0, tw 0 -> friction 0, fs 0, FR 0
const r1 = calc1.cptRows[0]
console.log('  - Baris 1 (qc=0, tw=0):', { friction: r1.friction, jhp: r1.jumlahHambatanPelekat, fs: r1.hambatanSetempat, fr: r1.frictionRatio })
if (r1.friction !== 0 || r1.frictionRatio !== 0) throw new Error('qc=0 harus menghasilkan FR 0!')

// Baris 2: depth 0.20, qc 5, tw 7 -> friction 2, jhp 4, fs 0.2, FR (0.2/5)*100 = 4%
const r2 = calc1.cptRows[1]
console.log('  - Baris 2 (qc=5, tw=7):', { friction: r2.friction, jhp: r2.jumlahHambatanPelekat, fs: r2.hambatanSetempat, fr: r2.frictionRatio })
if (r2.friction !== 2) throw new Error(`Friction baris 2 harus 2, got ${r2.friction}`)
if (r2.jumlahHambatanPelekat !== 4) throw new Error(`JHP baris 2 harus 4, got ${r2.jumlahHambatanPelekat}`)
if (r2.hambatanSetempat !== 0.2) throw new Error(`fs baris 2 harus 0.2, got ${r2.hambatanSetempat}`)
if (r2.frictionRatio !== 4.0) throw new Error(`FR baris 2 harus 4.0%, got ${r2.frictionRatio}`)
console.log('  ✅ PASS: Rumus Excel per baris akurat 100%!')

console.log('\n4. Verifikasi Validasi tw < qc:')
const invalidRows = [
  { id: 1, depth: 0.00, qc: 0, tw: 0 },
  { id: 2, depth: 0.20, qc: 15, tw: 10 }, // tw < qc !
]
const calcInvalid = cptConfig.calculate({ cptRows: invalidRows })
console.log('  - hasInvalidRow:', calcInvalid.hasInvalidRow)
console.log('  - isError:', calcInvalid.isError)
console.log('  - status:', calcInvalid.status)
console.log('  - Baris 2 isInvalid:', calcInvalid.cptRows[1].isInvalid)
if (!calcInvalid.hasInvalidRow) throw new Error('tw < qc harus terdeteksi hasInvalidRow!')
if (!calcInvalid.isError) throw new Error('tw < qc harus memicu isError = true!')
if (!calcInvalid.cptRows[1].isInvalid) throw new Error('Baris ke-2 harus ditandai isInvalid!')
console.log('  ✅ PASS: Validasi tw < qc terdeteksi dan memicu alert error dengan benar!')

console.log('\n=== SEMUA 4 KATEGORI PENGUJIAN CPT LOLOS 100%! ===')

