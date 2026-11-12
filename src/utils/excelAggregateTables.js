import { comparePassing, nominalSieveSize } from './aggregateGradation.js'
import { addNote, addTable, formula, guarded } from './excelReportLayout.js'

export function writeAggregateGradation(ws, output, charts) {
  const { detailRows, specimenData, bounds, specLabel, source } = output.gradation
  if (!detailRows.length) return

  const tables = specimenData.map((specimen) => {
    const table = addTable(ws, `Massa dan gradasi • ${specimen.name}`,
      ['Ayakan', 'Bukaan (mm)', 'Tertahan (g)', 'Tertahan (%)', 'Kumulatif (%)', 'Lolos (%)'],
      [
        ...detailRows.map((sieve, i) => (row, first) => {
          const source = specimen.rows[i]
          const last = first + detailRows.length - 1
          const total = `$C$${last + 1}`
          const valid = `AND(ISNUMBER(${total}),${total}>0)`
          return [sieve.label, sieve.pan ? null : sieve.size, source.weight,
            guarded(valid, `C${row}/${total}*100`, source.retained),
            guarded(valid, `SUM(C$${first}:C${row})/${total}*100`, source.cumRetained),
            guarded(valid, `MAX(0,100-E${row})`, source.passing)]
        }),
        (row, first) => {
          const range = `C${first}:C${row - 1}`
          const allWeights = specimen.rows.every((sieve) => sieve.weight != null && sieve.weight >= 0)
          return ['Total massa tertahan', null, guarded(`AND(COUNT(${range})=${detailRows.length},MIN(${range})>=0)`, `SUM(${range})`, allWeights ? specimen.total : null)]
        },
      ], { inputs: [3] })
    return table
  })

  addTable(ws, 'Modulus halus butir (MHB) • seri ayakan tersedia', ['Benda uji', 'MHB', 'Rumus'], specimenData.map((specimen, i) => {
    const table = tables[i]
    const refs = detailRows.flatMap((sieve, index) => sieve.fmSieve ? [table.ref(5, index)] : [])
    return [specimen.name, refs.length ? guarded(`COUNT(${refs.join(',')})=${refs.length}`, `SUM(${refs.join(',')})/100`, specimen.fm) : null,
      'Σ tertahan kumulatif seri MHB / 100']
  }), { widths: [30, 18, 35] })

  const positiveSieves = detailRows.map((sieve, index) => ({ ...sieve, index })).filter((sieve) => !sieve.pan && sieve.size > 0).reverse()
  const missing = bounds.filter(([size]) => !positiveSieves.some((sieve) => nominalSieveSize(sieve.size) === size))
  const comparison = [...positiveSieves, ...missing.map(([size, lower, upper]) => ({ label: 'Ayakan acuan belum diuji', size, lower, upper }))]
    .sort((a, b) => a.size - b.size)
  const recap = addTable(ws, `Evaluasi persen lolos • ${specLabel}`,
    ['Ayakan', 'Bukaan (mm)', 'Bawah (%)', 'Rata-rata lolos (%)', 'Atas (%)', 'Evaluasi'],
    comparison.map((sieve) => (r) => {
      const refs = tables.map((table) => table.ref(6, sieve.index)).join(',')
      const actual = sieve.index === undefined ? null : guarded(`COUNT(${refs})=${tables.length}`, `AVERAGE(${refs})`, sieve.actual)
      const status = sieve.index === undefined ? 'Ayakan belum diuji' : comparePassing(sieve.actual, sieve.lower, sieve.upper)
      const evaluation = `IF(NOT(ISNUMBER(D${r})),"Data belum lengkap",IF(COUNT(C${r},E${r})<2,"Tidak ada batas",IF(D${r}<C${r}-1E-9,"Di bawah batas",IF(D${r}>E${r}+1E-9,"Di atas batas","Memenuhi"))))`
      return [sieve.label, sieve.size, sieve.lower, actual, sieve.upper, sieve.index === undefined ? status : formula(evaluation, status)]
    }), { widths: [30, 14, 14, 20, 14, 24] })

  const boundTable = addTable(ws, `Titik batas grafik • ${specLabel}`, ['Bukaan (mm)', 'Bawah (%)', 'Atas (%)'],
    bounds.slice().reverse().map(([size, min, max]) => [size, min, max]))
  addNote(ws, 'Dasar evaluasi', `SNI ASTM C136:2012 adalah metode uji. Amplop pembanding ${specLabel}: ${source}\nMHB memakai seri ayakan yang diukur. Massa awal sebelum pengayakan belum dicatat. Untuk mengubah ukuran atau seri ayakan, lakukan di LabSipil dan ekspor ulang.`)

  charts.push({
    name: `Kurva gradasi • ${specLabel}`,
    x: { label: 'Bukaan ayakan (mm) • logaritmik', log: true },
    y: { label: 'Persen lolos (%)', min: 0, max: 100, step: 20 },
    series: [
      { table: recap, x: 2, y: 4, name: 'Rata-rata lolos aktual' },
      { table: boundTable, x: 1, y: 2, name: 'Batas bawah', color: '16A34A', dashed: true },
      { table: boundTable, x: 1, y: 3, name: 'Batas atas', color: 'EA580C', dashed: true },
    ],
  })
}
