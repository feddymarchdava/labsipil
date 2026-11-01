import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('=== VERIFIKASI LENGKAP PENGUJIAN PENETRASI KONUS SONDIR (CPT) DENGAN 3 GRAFIK SEJAJAR ===\n')

const testConfig = calculatorRegistry['mt-1-1']
if (!testConfig) {
  console.error('❌ FAIL: mt-1-1 tidak ditemukan di calculatorRegistry')
  process.exit(1)
}

console.log('1. Verifikasi Initial Data Realistis Lapangan (15 Baris):')
const initialRows = testConfig.initialInputs.cptRows
console.log(`- Jumlah baris: ${initialRows.length}`)
console.log(`- Rentang kedalaman: ${initialRows[0].depth} m s/d ${initialRows[initialRows.length - 1].depth} m`)
if (initialRows.length !== 15) throw new Error('Initial rows bukan 15')
if (initialRows[0].depth !== 0 || initialRows[14].depth !== 2.8) throw new Error('Rentang kedalaman tidak sesuai')

const expectedRows = [
  { depth: 0.0, qc: 0, tw: 0 },
  { depth: 0.2, qc: 5, tw: 7 },
  { depth: 0.4, qc: 8, tw: 11 },
  { depth: 0.6, qc: 10, tw: 14 },
  { depth: 0.8, qc: 15, tw: 20 },
  { depth: 1.0, qc: 22, tw: 30 },
  { depth: 1.2, qc: 35, tw: 46 },
  { depth: 1.4, qc: 40, tw: 52 },
  { depth: 1.6, qc: 18, tw: 23 },
  { depth: 1.8, qc: 15, tw: 19 },
  { depth: 2.0, qc: 20, tw: 25 },
  { depth: 2.2, qc: 45, tw: 56 },
  { depth: 2.4, qc: 65, tw: 80 },
  { depth: 2.6, qc: 85, tw: 103 },
  { depth: 2.8, qc: 110, tw: 132 },
]

expectedRows.forEach((exp, idx) => {
  const cur = initialRows[idx]
  if (cur.depth !== exp.depth || cur.qc !== exp.qc || cur.tw !== exp.tw) {
    throw new Error(`Row ${idx} mismatch: expected ${JSON.stringify(exp)}, got ${JSON.stringify(cur)}`)
  }
})
console.log('✅ PASS: Data awal 15 baris realistis sesuai permintaan (soft, stiff, clay, dense sand).\n')

console.log('2. Verifikasi Akumulasi Kumulatif JHP & fs (SNI 2827:2008):')
const output = testConfig.calculate({ cptRows: initialRows })
const computed = output.cptRows

let expectedRunningJhp = 0
computed.forEach((row, i) => {
  const d = Math.max(0, row.tw - row.qc)
  const delta = i === 0 ? 0 : d * 2
  expectedRunningJhp += delta
  if (Math.abs(row.jumlahHambatanPelekat - expectedRunningJhp) > 0.001) {
    throw new Error(`Mismatch JHP pada row ${i}: got ${row.jumlahHambatanPelekat}, expected ${expectedRunningJhp}`)
  }
  const expectedFs = d / 10
  if (Math.abs(row.hambatanSetempat - expectedFs) > 0.001) {
    throw new Error(`Mismatch fs pada row ${i}: got ${row.hambatanSetempat}, expected ${expectedFs}`)
  }
  console.log(`   z = ${row.depth.toFixed(1)} m | qc = ${row.qc.toString().padStart(3)} | tw = ${row.tw.toString().padStart(3)} | d = ${row.friction.toFixed(1).padStart(4)} | fs = ${row.hambatanSetempat.toFixed(2)} | JHP = ${row.jumlahHambatanPelekat.toFixed(1).padStart(5)} | FR = ${row.frictionRatio.toFixed(2).padStart(5)}% | ${row.rowSoil}`)
})

console.log(`\n- Total JHP Akhir: ${output.totalJhp.toFixed(1)} kg/cm`)
if (output.totalJhp !== 250.0) {
  throw new Error(`Total JHP akhir salah: got ${output.totalJhp}, expected 250.0`)
}
console.log('✅ PASS: Perhitungan JHP kumulatif dan fs = d/10 akurat 100%.\n')

console.log('3. Verifikasi chartData (qc, fs, fr):')
output.chartData.forEach((cd, idx) => {
  if (cd.fs === undefined) throw new Error(`Row ${idx} missing fs in chartData`)
  if (cd.fr === undefined) throw new Error(`Row ${idx} missing fr in chartData`)
  if (cd.qc === undefined) throw new Error(`Row ${idx} missing qc in chartData`)
  if (cd.depth === undefined) throw new Error(`Row ${idx} missing depth in chartData`)
})
console.log(`- Seluruh 15 titik chartData memiliki properti depth, qc, fs, dan fr.`)
console.log('✅ PASS: chartData siap untuk 3 grafik Recharts.\n')

console.log('=== SEMUA VERIFIKASI SONDIR CPT 3 GRAFIK BERHASIL SEMPURNA (100% PASS)! ===')
