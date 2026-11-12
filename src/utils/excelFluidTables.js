import { addNote, addTable, guarded, numeric } from './excelReportLayout.js'

export function writeReynolds(ws, inputs, out, charts) {
  if (!inputs.reynoldsRows?.length || !out.recapRows?.length) return false
  const rows = [...out.recapRows].sort((a, b) => (a.qLs ?? Infinity) - (b.qLs ?? Infinity))
  const table = addTable(ws, 'Pengamatan aliran pipa dan perhitungan Reynolds',
    ['Pengujian', 'Waktu (s)', 'Volume (L)', 'Diameter (mm)', 'ν (cSt)', 'Debit (L/s)', 'Kecepatan (m/s)', 'Re', 'Rezim', 'f Darcy (estimasi)', 'log₁₀ Re', 'log₁₀ f', 'Catatan pengamatan'],
    rows.map((point) => (r) => {
      const input = inputs.reynoldsRows.find((row) => row.id === point.id) ?? {}
      return [point.label, numeric(point.t), numeric(point.volume), point.isValid ? point.diameter : numeric(input.diameter), point.isValid ? point.viskositas : numeric(input.viskositas),
        guarded(`AND(COUNT(B${r}:C${r})=2,MIN(B${r}:C${r})>0)`, `C${r}/B${r}`, point.qLs),
        guarded(`AND(COUNT(D${r},F${r})=2,D${r}>0)`, `4*F${r}/1000/(PI()*(D${r}/1000)^2)`, point.v),
        guarded(`AND(COUNT(D${r},E${r},G${r})=3,MIN(D${r}:E${r})>0)`, `G${r}*(D${r}/1000)/(E${r}/1E6)`, point.re),
        guarded(`ISNUMBER(H${r})`, `IF(H${r}<2000,"Laminer",IF(H${r}<=4000,"Transisi","Turbulen"))`, point.isValid ? point.rezim : null),
        guarded(`AND(ISNUMBER(H${r}),H${r}>0,OR(H${r}<2000,AND(H${r}>4000,H${r}<=100000)))`, `IF(H${r}<2000,64/H${r},0.3164/H${r}^0.25)`, point.f),
        guarded(`AND(ISNUMBER(H${r}),H${r}>0)`, `LOG10(H${r})`, point.logRe),
        guarded(`AND(ISNUMBER(J${r}),J${r}>0)`, `LOG10(J${r})`, point.logF), input.visualNote ?? '']
    }), { widths: [27, 13, 13, 16, 13, 16, 17, 15, 14, 17, 14, 14, 34], inputs: [2, 3, 4, 5] })
  const validRows = rows.filter((row) => row.isValid)
  const refIndex = rows.findIndex((row) => row.id === out.recapRows.find((entry) => entry.isValid)?.id)
  const d = table.ref(4, refIndex)
  const nu = table.ref(5, refIndex)
  const series = [{ table, x: 6, y: 8, name: 'Titik hasil uji', line: false }]
  if (validRows.length > 1) {
    const { dM, nuM2s } = rows[refIndex]
    const maxDebit = Math.max(...validRows.map((row) => row.qLs))
    const ref = addTable(ws, 'Re teoritis pada diameter dan viskositas titik acuan', ['Debit (L/s)', 'Re teoritis'], [
      [0, 0],
      (r) => [guarded(`COUNT(${table.range(6)})>0`, `MAX(${table.range(6)})`, maxDebit),
        guarded(`AND(COUNT(${d},${nu},A${r})=3,${d}>0,${nu}>0)`, `4*A${r}/(PI()*${d}/1000*${nu}/1E6*1000)`, 4 * maxDebit / (Math.PI * dM * nuM2s * 1000))],
    ])
    series.push({ table: ref, x: 1, y: 2, name: 'Teori • D dan ν acuan', color: '16A34A', dashed: true, markers: false })
  }
  addNote(ws, 'Batas perhitungan', 'Re < 2000: laminer. 2000–4000: transisi. Re > 4000: turbulen. Estimasi faktor Darcy 64/Re untuk laminer dan Blasius untuk pipa licin pada 4000 < Re ≤ 100.000. Faktor gesek pada transisi tidak ditentukan dari rumus tersebut.')
  charts.push({ name: 'Bilangan Reynolds terhadap debit', x: { label: 'Debit (L/s)', min: 0 }, y: { label: 'Bilangan Reynolds', min: 0 }, series },
    { name: 'Faktor gesek Darcy terhadap Reynolds', x: { label: 'log₁₀ Re' }, y: { label: 'log₁₀ f' }, series: [{ table, x: 11, y: 12, name: 'Estimasi faktor Darcy', line: false }] })
  return true
}
