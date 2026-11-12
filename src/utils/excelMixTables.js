import { comparePassing } from './aggregateGradation.js'
import { BINA_MARGA_2018_R2, LASTON_GRADATION, LASTON_MARSHALL } from './labSpecifications.js'
import { addNote, addTable, formula, guarded, numeric } from './excelReportLayout.js'

const gradingSeries = (table, y, name, color) => ({ table, x: 1, y, name, color, dashed: true, markers: false })
const percentAxis = { label: 'Persen lolos (%)', min: 0, max: 100, step: 20 }

export function writeJmf(ws, inputs, out, refs, charts) {
  if (!out.jmfTable?.rows?.length) return false
  const p = (key) => refs[key] ?? '""'
  const total = p('wTotal')
  const target = p('pbRencana')
  const type = p('jenisCampuran')
  const sieves = [...(out.computedSieves ?? [])].sort((a, b) => b.size - a.size)
  const kind = inputs.jenisCampuran || 'ac-wc'
  const selectedLimits = LASTON_GRADATION[kind] ?? {}
  const bound = (size, index) => {
    const expression = Object.entries(LASTON_GRADATION).reduceRight((next, [name, limits]) =>
      `IF(${type}="${name}",${limits[size]?.[index] ?? '""'},${next})`, '""')
    return formula(expression, selectedLimits[size]?.[index])
  }
  const recovered = sieves.reduce((sum, row) => sum + row.retWeight, 0)
  let sieveTable
  if (sieves.length) {
    let cumulative = 0
    sieveTable = addTable(ws, 'Gradasi agregat gabungan • Bina Marga Tabel 6.3.2.3',
      ['Ayakan', 'Bukaan (mm)', 'Tertahan (g)', 'Kumulatif (g)', 'Lolos (%)', 'Bawah (%)', 'Atas (%)', 'Evaluasi'],
      sieves.map((sieve) => (r, first) => {
        cumulative += sieve.retWeight
        const allMass = `C${first}:C${first + sieves.length - 1}`
        const actual = recovered > 0 && sieve.size > 0 ? Math.max(0, 100 * (1 - cumulative / recovered)) : null
        const limits = selectedLimits[sieve.size] || []
        return [sieve.name, sieve.size, numeric(sieve.retWeight),
          guarded(`AND(COUNT(${allMass})=${sieves.length},MIN(${allMass})>=0)`, `SUM(C${first}:C${r})`, cumulative),
          sieve.size > 0 ? guarded(`AND(ISNUMBER(D${r}),SUM(${allMass})>0)`, `MAX(0,100*(1-D${r}/SUM(${allMass})))`, actual) : null,
          bound(sieve.size, 0), bound(sieve.size, 1),
          sieve.size > 0 ? formula(`IF(NOT(ISNUMBER(E${r})),"Data belum lengkap",IF(COUNT(F${r}:G${r})<2,"Tidak ada batas",IF(OR(E${r}<F${r}-1E-9,E${r}>G${r}+1E-9),"Di luar batas","Memenuhi")))`,
            comparePassing(actual, ...limits).replace(/Di (bawah|atas) batas/, 'Di luar batas')) : 'Pan']
      }), { inputs: [3], widths: [24, 15, 16, 16, 16, 15, 15, 23] })
    const last = sieveTable.last - sieves.filter((sieve) => sieve.size === 0).length
    const sizes = Object.keys(selectedLimits).map(Number).sort((a, b) => a - b)
    const limits = addTable(ws, 'Titik amplop Laston', ['Bukaan (mm)', 'Bawah (%)', 'Atas (%)'],
      sizes.map((size) => [size, bound(size, 0), bound(size, 1)]))
    charts.push({ name: 'Kurva gradasi agregat gabungan Laston', x: { label: 'Bukaan ayakan (mm) • logaritmik', log: true }, y: percentAxis,
      series: [{ table: { ...sieveTable, last }, x: 2, y: 5, name: 'Lolos aktual' }, gradingSeries(limits, 2, 'Batas bawah', '16A34A'), gradingSeries(limits, 3, 'Batas atas', 'EA580C')] })
  }

  const mass = sieveTable?.range(3)
  const size = sieveTable?.range(2)
  const fractions = addTable(ws, 'Neraca massa dan fraksi agregat', ['Parameter', 'Satuan', 'Nilai'], [
    ['Massa agregat rencana', 'g', guarded(`AND(COUNT(${total},${target})=2,${total}>0,${target}>0,${target}<100)`, `${total}*(1-${target}/100)`, out.wAgregatRencana)],
    ['Massa agregat tertahan termasuk pan', 'g', mass ? guarded(`AND(COUNT(${mass})=${sieves.length},MIN(${mass})>=0)`, `SUM(${mass})`, recovered) : null],
    (r, first) => ['Selisih massa tertahan terhadap rencana', 'g', guarded(`COUNT(C${first}:C${first + 1})=2`, `C${first + 1}-C${first}`, mass ? recovered - out.wAgregatRencana : null)],
    ...[['Agregat kasar CA', 'ca', `SUMIF(${size},">=4.75",${mass})`], ['Agregat halus FA', 'fa', `SUMIFS(${mass},${size},"<4.75",${size},">=0.075")`], ['Lolos No. 200 (FF)', 'filler', `SUMIF(${size},"<0.075",${mass})`]]
      .map(([label, key, sum]) => (r, first) => [label, '%', mass
        ? guarded(`AND(ISNUMBER(C${first + 1}),C${first + 1}>0)`, `100*${sum}/C${first + 1}`, out[key])
        : guarded(`AND(ISNUMBER(${p(key)}),${p(key)}>=0,${p(key)}<=100)`, p(key), numeric(inputs[key]))]),
    (r, first) => ['Kadar aspal acuan empiris', '%', guarded(`AND(COUNT(C${first + 3}:C${first + 5},${p('k')})=4,${p('k')}>=0.5,${p('k')}<=1,ABS(SUM(C${first + 3}:C${first + 5})-100)<=0.1)`,
      `0.035*C${first + 3}+0.045*C${first + 4}+0.18*C${first + 5}+${p('k')}`, out.kaaMurni)],
    (r, first) => ['Kadar aspal acuan dibulatkan 0,5%', '%', guarded(`ISNUMBER(C${first + 6})`, `ROUND(2*C${first + 6},0)/2`, out.pb0)],
    (r, first) => ['Pembanding selisih massa praktikum ≤ 0,1%', '',
      mass ? guarded(`AND(COUNT(C${first}:C${first + 2})=3,C${first}>0,C${first + 1}>0)`,
        `IF(ABS(C${first + 2})<=0.001*C${first},"Dalam batas","Periksa neraca massa")`, out.massMismatch ? 'Periksa neraca massa' : 'Dalam batas') : 'Fraksi input langsung'],
  ])
  const aggregate = fractions.ref(3)
  const plan = out.mixDesignTable
  addTable(ws, 'Komposisi pada kadar aspal rencana', ['Fraksi', 'Agregat (%)', 'Massa rencana (g)', 'Campuran (%)'], [
    ...[0, 1, 2].map((i) => (r) => {
      const fraction = fractions.ref(3, 3 + i)
      return [plan[i].fraksi,
        guarded(`ISNUMBER(${fraction})`, fraction, out[['ca', 'fa', 'filler'][i]]),
        guarded(`COUNT(B${r},${aggregate})=2`, `B${r}*${aggregate}/100`, plan[i].berat),
        guarded(`AND(ISNUMBER(C${r}),${total}>0)`, `100*C${r}/${total}`, plan[i].persenCampuran)]
    }),
    ['Aspal', null, guarded(`COUNT(${total},${aggregate})=2`, `${total}-${aggregate}`, out.wAspalRencana),
      guarded(`ISNUMBER(${aggregate})`, target, out.pbRencana)],
    (r, first) => ['Total campuran', guarded(`COUNT(B${first}:B${r - 2})=3`, `SUM(B${first}:B${r - 2})`, out.ca + out.fa + out.filler),
      guarded(`COUNT(C${first}:C${r - 1})=4`, `SUM(C${first}:C${r - 1})`, plan.slice(0, 4).reduce((sum, row) => sum + row.berat, 0)),
      guarded(`COUNT(D${first}:D${r - 1})=4`, `SUM(D${first}:D${r - 1})`, plan.slice(0, 4).reduce((sum, row) => sum + row.persenCampuran, 0))],
  ])
  const pb0 = fractions.ref(3, 7)
  addTable(ws, 'Variasi briket Marshall • rancangan awal', ['Variasi', 'Pb (%)', 'Aspal (g)', 'Agregat (g)', 'CA (g)', 'FA (g)', 'FF (g)', 'Campuran (g)'],
    out.jmfTable.rows.map((row, index) => (r) => [row.nama,
      guarded(`ISNUMBER(${pb0})`, `${pb0}+(${(index - 2) * 0.5})`, row.pb),
      guarded(`AND(ISNUMBER(B${r}),ISNUMBER(${total}),B${r}>0,B${r}<100,${total}>0)`, `${total}*B${r}/100`, row.wAspal),
      guarded(`ISNUMBER(C${r})`, `${total}-C${r}`, row.wAgregat),
      ...[3, 4, 5].map((i) => guarded(`COUNT(D${r},${fractions.ref(3, i)})=2`, `D${r}*${fractions.ref(3, i)}/100`, [row.wCA, row.wFA, row.wFiller][i - 3])),
      guarded(`COUNT(C${r},E${r}:G${r})=4`, `C${r}+SUM(E${r}:G${r})`, row.wTotal),
    ]))
  addNote(ws, 'Acuan dan evaluasi', `Fraksi memakai massa agregat tertahan. Kadar aspal acuan adalah titik awal percobaan Marshall. Ubah jenis Laston di LabSipil dan ekspor ulang untuk mengganti seri ayakan pada grafik. ${BINA_MARGA_2018_R2}`)
  return true
}

export function writeMarshall(ws, inputs, out, refs, charts) {
  const specimens = out.computedSpecimens ?? []
  if (!specimens.length && !out.marshallValues) return false
  const p = (key) => refs[key] ?? '""'
  const kind = inputs.jenisCampuran || 'ac-wc'
  const specification = LASTON_MARSHALL[kind] ?? {}
  const materialRows = specimens.length ? [
    ['Gsb gabungan', out.gsb, ['gsb1', 'gsb2', 'gsb3'].map(p)],
    ['Gsa gabungan', out.gsa, ['gsa1', 'gsa2', 'gsa3'].map(p)],
    ['Gse gabungan (estimasi)', out.gse, [1, 2, 3].map((i) => `(${p('gsb' + i)}+${p('gsa' + i)})/2`)],
  ].map(([label, result, densities]) => {
    const weights = ['p1', 'p2', 'p3'].map(p)
    const denom = weights.map((weight, i) => `${weight}/(${densities[i]})`).join('+')
    const valid = `AND(COUNT(${weights.join(',')})=3,MIN(${weights.join(',')})>=0,SUM(${weights.join(',')})>0,MIN(${densities.join(',')})>0)`
    return [label, guarded(valid, `SUM(${weights.join(',')})/(${denom})`, result)]
  }) : [
    ['Gsb tersimpan', guarded(`AND(ISNUMBER(${p('gsb')}),${p('gsb')}>0)`, p('gsb'), numeric(inputs.gsb))],
    ['Gsa', null],
    ['Gse tersimpan', guarded(`AND(ISNUMBER(${p('gse')}),${p('gse')}>0)`, p('gse'), numeric(inputs.gse))],
  ]
  const binder = specimens.length ? p('ga') : p('gb')
  const materials = addTable(ws, 'Berat jenis bahan dan faktor alat', ['Parameter', 'Nilai'], [
    ...materialRows,
    ['Ga aspal', guarded(`AND(ISNUMBER(${binder}),${binder}>0)`, binder, out.ga ?? numeric(inputs.gb))],
    ['Kalibrasi alat (kgf/div)', guarded(`AND(ISNUMBER(${p('kalibrasiAlat')}),${p('kalibrasiAlat')}>0)`, p('kalibrasiAlat'), out.cKal ?? numeric(inputs.kalibrasiAlat))],
  ])
  const [gsb, , gse, ga, cal] = [0, 1, 2, 3, 4].map((i) => materials.ref(2, i))
  let surface
  if (out.computedSat?.length) {
    surface = addTable(ws, 'Luas permukaan agregat', ['Ayakan', 'Ukuran', 'Tertahan (g)', 'Lolos (%)', 'Faktor LP', 'LP tabel praktikum'],
      out.computedSat.map((row) => (r) => [row.sieve, row.sizeMm, row.retWeight, row.cumPassPct, row.flp,
        guarded(`AND(COUNT(D${r}:E${r})=2,D${r}>=0,D${r}<=100,E${r}>=0)`, `ROUND(D${r}*E${r}/100,2)`, row.lp)]),
      { widths: [25, 16, 17, 16, 16, 23], inputs: [4] })
  }
  const rows = specimens.length ? out.sortedSpecs ?? specimens : [out.marshallValues]
  const measurements = addTable(ws, 'Penimbangan briket dan bacaan alat', ['Benda uji', 'Pa campuran (%)', 'Kering (g)', 'SSD (g)', 'Dalam air (g)', 'Bacaan stabilitas (div)', 'Koreksi tebal', 'Gmm hasil uji', 'Flow (mm)'],
    rows.map((row) => {
      const raw = specimens.length ? inputs.specimens.find((sample) => sample.id === row.id) : null
      return [row.no || 1, row.pa, row.beratKering, row.beratSsd, row.beratAir, row.bacaanStab, row.angkaKorelasi, numeric(raw?.gmmMeasured), row.flow]
    }), { inputs: [2, 3, 4, 5, 6, 7, 8, 9], widths: [18, 13, 16, 16, 17, 22, 16, 20, 15] })

  const volume = addTable(ws, 'Perhitungan volumetrik per benda uji', ['Benda uji', 'Pa (%)', 'Volume (cm³)', 'Gmb', 'Ps (%)', 'Gmm', 'VIM (%)', 'VMA (%)', 'VFA (%)', 'Dasar Gmm'],
    rows.map((row, index) => (r) => {
      const [pa, dry, ssd, air] = [2, 3, 4, 5].map((col) => measurements.ref(col, index))
      const measured = measurements.ref(8, index)
      const valid = `AND(COUNT(${dry},${ssd},${air})=3,${dry}>0,${air}>0,${ssd}>${air},${ssd}>=${dry})`
      const ok = row.beratSsd > row.beratAir && row.beratSsd >= row.beratKering && row.beratKering > 0 && row.beratAir > 0
      const measuredValid = `AND(ISNUMBER(${measured}),${measured}>0,${measured}>=D${r})`
      const gmmEstimate = `100/(E${r}/${gse}+B${r}/${ga})`
      return [row.no || 1, guarded(`AND(ISNUMBER(${pa}),${pa}>0,${pa}<100)`, pa, row.pa),
        guarded(valid, `${ssd}-${air}`, ok ? row.v : null), guarded(`ISNUMBER(C${r})`, `${dry}/C${r}`, ok ? row.gmb : null),
        guarded(`ISNUMBER(B${r})`, `100-B${r}`, row.ps),
        guarded(`AND(COUNT(D${r}:E${r})=2,OR(${measuredValid},AND(ISBLANK(${measured}),COUNT(${gse},${ga})=2,MIN(${gse},${ga})>0)))`,
          `IF(ISBLANK(${measured}),${gmmEstimate},${measured})`, ok ? row.gmm : null),
        guarded(`AND(COUNT(D${r},F${r})=2,F${r}>0,F${r}>=D${r})`, `100*(1-D${r}/F${r})`, ok ? row.vim : null),
        guarded(`AND(COUNT(D${r},E${r},${gsb})=3,${gsb}>0)`, `100-D${r}*E${r}/${gsb}`, ok ? row.vma : null),
        guarded(`AND(COUNT(G${r}:H${r})=2,H${r}>0,G${r}<=H${r})`, `100*(H${r}-G${r})/H${r}`, ok ? row.vfa : null),
        guarded(`ISNUMBER(F${r})`, `IF(ISBLANK(${measured}),"Estimasi","Hasil uji")`, ok && row.gmm != null ? row.hasMeasuredGmm ? 'Hasil uji' : 'Estimasi' : null)]
    }), { widths: [18, 13, 18, 16, 14, 18, 15, 15, 15, 16] })

  const mechanical = addTable(ws, 'Perhitungan mekanik dan selimut aspal', ['Benda uji', 'Pa (%)', 'Stabilitas (kgf)', 'Flow (mm)', 'MQ (kgf/mm)', 'Pab (%)', 'Pae (%)', 'Tebal film (µm)'],
    rows.map((row, index) => (r) => {
      const [read, correction, flow] = [6, 7, 9].map((col) => measurements.ref(col, index))
      const [pa, ps] = [2, 5].map((col) => volume.ref(col, index))
      const lp = surface ? `SUM(${surface.range(6)})` : '0'
      return [row.no || 1, guarded(`ISNUMBER(${pa})`, pa, row.pa),
        guarded(`AND(COUNT(${read},${correction},${cal})=3,MIN(${read},${correction},${cal})>0)`,
          `ROUND(${read}*${correction}*${cal},2)`, row.stabilitas),
        guarded(`AND(ISNUMBER(${flow}),${flow}>0)`, flow, row.flow > 0 ? row.flow : null),
        guarded(`AND(COUNT(C${r}:D${r})=2,D${r}>0)`, `C${r}/D${r}`, row.flow > 0 ? row.mq : null),
        guarded(`AND(COUNT(${gsb},${gse},${ga})=3,MIN(${gsb},${gse},${ga})>0,${gse}>=${gsb})`, `100*(${gse}-${gsb})*${ga}/(${gsb}*${gse})`, row.pab),
        guarded(`COUNT(B${r},F${r},${ps})=3`, `B${r}-F${r}*${ps}/100`, row.pae),
        surface ? guarded(`AND(ISNUMBER(${volume.ref(4, index)}),COUNT(G${r},${ga},${ps})=3,G${r}>=0,MIN(${ga},${ps})>0,${lp}>0)`, `1000*G${r}/(${ga}*${lp}*${ps})`, row.tebalSelimut) : null]
    }), { widths: [18, 13, 18, 16, 19, 16, 16, 19] })

  const measurementsByMetric = [
    ['stabilitas', 'Stabilitas Marshall', 'kgf', mechanical, 3], ['flow', 'Kelelehan (Flow)', 'mm', mechanical, 4], ['mq', 'Marshall Quotient', 'kgf/mm', mechanical, 5],
    ['vma', 'Rongga dalam agregat (VMA)', '%', volume, 8], ['vim', 'Rongga dalam campuran (VIM)', '%', volume, 7], ['vfa', 'Rongga terisi aspal (VFA)', '%', volume, 9],
    ['gmb', 'Berat jenis bulk briket (Gmb)', '', volume, 4], ['tebalSelimut', 'Tebal selimut aspal', 'µm', mechanical, 8],
  ]
  const evaluated = measurementsByMetric.filter(([key]) => LASTON_MARSHALL['ac-wc'][key])
  const type = refs.jenisCampuran ?? '"ac-wc"'
  const limits = addTable(ws, 'Batas Laston • Bina Marga Tabel 6.3.3.1c', ['Parameter', 'Satuan', 'Bawah', 'Atas'],
    evaluated.map(([key, name, unit]) => [name, unit, ...[0, 1].map((index) => formula(
      Object.entries(LASTON_MARSHALL).reduceRight((next, [typeCode, bounds]) =>
        `IF(${type}="${typeCode}",${bounds[key][index] ?? '""'},${next})`, '""'),
      specification[key]?.[index],
    ))]), { widths: [33, 14, 16, 16] })
  addTable(ws, 'Evaluasi nilai terukur per benda uji', ['Benda uji', 'Parameter', 'Nilai', 'Hasil'], rows.flatMap((row, index) =>
    evaluated.map(([key, name, , table, col], limitIndex) => (r) => {
      const [min, max] = specification[key] ?? [null, null]
      const low = limits.ref(3, limitIndex)
      const high = limits.ref(4, limitIndex)
      const cell = table.ref(col, index)
      const value = numeric(ws.getCell(cell).result)
      const needsMeasured = key === 'vim' || key === 'vfa'
      const estimate = needsMeasured ? `IF(${volume.ref(10, index)}="Estimasi","Isi Gmm hasil uji",` : ''
      const estimateEnd = needsMeasured ? ')' : ''
      return [row.no || 1, name, guarded(`ISNUMBER(${cell})`, cell, value),
        formula(`IF(NOT(ISNUMBER(C${r})),"Data belum sah",${estimate}IF(NOT(ISNUMBER(${low})),"Pilih jenis Laston",IF(AND(C${r}>=${low},OR(NOT(ISNUMBER(${high})),C${r}<=${high})),"Memenuhi","Di luar batas"))${estimateEnd})`,
          value === null ? 'Data belum sah' : needsMeasured && !row.hasMeasuredGmm ? 'Isi Gmm hasil uji' : min === null ? 'Pilih jenis Laston' : value >= min && (max == null || value <= max) ? 'Memenuhi' : 'Di luar batas')]
    })), { widths: [18, 32, 18, 22] })

  for (const [key, name, unit, table, col] of measurementsByMetric) {
    const series = [{ table, x: 2, y: col, name: 'Benda uji' }]
    const limitIndex = evaluated.findIndex(([id]) => id === key)
    if (rows.length > 1 && limitIndex >= 0) {
      const [min, max] = specification[key] ?? [null, null]
      const span = addTable(ws, `Titik batas • ${name}`, ['Pa (%)', 'Bawah', 'Atas'], [0, rows.length - 1].map((i) => [
        guarded(`ISNUMBER(${volume.ref(2, i)})`, volume.ref(2, i), rows[i].pa),
        guarded(`ISNUMBER(${limits.ref(3, limitIndex)})`, limits.ref(3, limitIndex), min),
        max == null ? null : guarded(`ISNUMBER(${limits.ref(4, limitIndex)})`, limits.ref(4, limitIndex), max),
      ]))
      series.push(gradingSeries(span, 2, 'Batas bawah', '16A34A'))
      if (max != null) series.push(gradingSeries(span, 3, 'Batas atas', 'EA580C'))
    }
    charts.push({ name, x: { label: 'Kadar aspal Pa (%)' }, y: { label: unit ? `${name} (${unit})` : name }, series })
  }
  addNote(ws, 'Batas penggunaan', `Hasil ini membandingkan parameter yang tersedia untuk Laston ${kind.toUpperCase()}. MQ dilaporkan sebagai indikator. KAO memerlukan rangkaian kadar yang memenuhi syarat dan pengujian lain sesuai spesifikasi. Gmm teoretis menggunakan Gse pada tabel bahan. ${BINA_MARGA_2018_R2}`)
  return true
}
