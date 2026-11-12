import assert from 'node:assert/strict'
import { test } from 'node:test'
import ExcelJS from 'exceljs'
import JSZip from 'jszip'
import { calculatorRegistry } from '../src/testCalculatorsData.js'
import { buildLabWorkbook } from '../src/utils/excelLabGenerator.js'
import { resolveRecordConfig } from '../src/utils/excelReportData.js'
import { calculateIndependentSample, getIndependentSamples, newIndependentSample } from '../src/utils/independentLabSamples.js'

const defaults = (id) => structuredClone(calculatorRegistry[id].initialInputs)

async function report(id, inputs = defaults(id), options = {}) {
  const { buffer } = await buildLabWorkbook({
    testConfig: calculatorRegistry[id], inputs, metadata: { tanggal: '2026-11-11' }, ...options,
  })
  const workbook = await new ExcelJS.Workbook().xlsx.load(buffer)
  const zip = await JSZip.loadAsync(buffer)
  return { sheet: workbook.getWorksheet('Hasil Uji'), zip, workbook }
}

const dataRows = (sheet) => sheet.getRows(1, sheet.rowCount).filter(Boolean)
const chartPaths = (zip) => Object.keys(zip.files).filter((name) => /^xl\/charts\/chart\d+\.xml$/.test(name))

test('mechanical CPT uses instrument areas, excludes the surface, and preserves missing ratios', async () => {
  const id = 'mt-1-1'
  const inputs = {
    pistonArea: 12, coneArea: 10, sleeveArea: 150,
    cptRows: [
      { depth: 0, qc: 0, tw: 0 },
      { depth: 0.2, qc: 20, tw: 35 },
      { depth: 0.4, qc: 0, tw: 5 },
      { depth: 0.6, qc: 30, tw: 45 },
    ],
  }
  const calculate = calculatorRegistry[id].calculate
  const out = calculate(inputs)
  const close = (value, expected) => assert.ok(Math.abs(value - expected) < 1e-9)
  assert.equal(out.isError, false)
  assert.equal(out.measurementCount, 3)
  assert.deepEqual(out.chartData.map((point) => point.depth), [0.2, 0.4, 0.6])
  assert.equal(out.chartData[1].fr, null)
  close(out.cptRows[1].qc, 24)
  close(out.cptRows[1].fs, 1.2)
  close(out.cptRows[1].frictionRatio, 5)
  close(out.totalJhp, 56)
  const incomplete = calculate({ ...inputs, cptRows: inputs.cptRows.map((row, i) => i === 2 ? { ...row, tw: '' } : row) })
  assert.equal(incomplete.isError, true)
  assert.equal(incomplete.cptRows[2].fs, null)
  assert.equal(incomplete.totalJhp, null)
  assert.equal(calculate({ depth: 2, qc: 20, tw: 35 }).totalJhp, null)
  const duplicate = calculate({ ...inputs, cptRows: inputs.cptRows.map((row, i) => i === 2 ? { ...row, depth: 0.2 } : row) })
  assert.equal(duplicate.cptRows[2].isInvalid, true)

  const { sheet, zip } = await report(id, inputs)
  const rows = dataRows(sheet)
  const first = rows.find((row) => row.getCell(1).value === 0.2 && row.getCell(5).formula)
  close(first.getCell(5).result, 24)
  close(first.getCell(6).result, 1.2)
  close(first.getCell(10).result, 5)
  const paths = chartPaths(zip)
  assert.equal(paths.length, 4)
  const charts = await Promise.all(paths.map((path) => zip.file(path).async('string')))
  assert.ok(charts.every((chart) => chart.includes('orientation val="maxMin"') && chart.includes('<c:min val="0"/>')))
  const ratio = charts.find((chart) => chart.includes('Angka banding geser Rf'))
  const ratioCache = ratio.match(/<c:xVal>(.*?)<\/c:xVal>/s)[1]
  assert.match(ratioCache, /<c:ptCount val="3"\/>/)
  assert.doesNotMatch(ratioCache, /<c:pt idx="1">/)
})

test('independent samples each export their own input, calculation and conclusion in one sheet', async () => {
  const cases = [
    ['mt-6-1', { metode: 'falling' }, /^Koefisien permeabilitas k$/, [0.012072197164896359, 0.00014660651709986482]],
    ['mf-1-1', { metode: 'sg' }, /^Massa jenis fluida$|^Berat jenis relatif SG$/, [0.999, 999, 0.85]],
    ['bp-1-1', { beratTertahanB: 4000 }, /^Keausan Los Angeles 500 putaran$/, [23, 20]],
    ['bp-3-1', { t2: 50.6 }, /^Titik lembek rata-rata$/, [50.5, 50.4]],
    ['bp-4-1', { massaC: 40.85 }, /^Berat jenis relatif aspal$/, [1.031, 1.029]],
    ['bp-10-1', { beratMineralFilterW4: 1139.1 }, /^Kadar aspal pada basis kering$/, [100 * 52.2 / 1172, 100 * 62.2 / 1172]],
  ]
  for (const [id, changes, resultLabel, expected] of cases) {
    const config = calculatorRegistry[id]
    const [first] = getIndependentSamples(defaults(id))
    const empty = newIndependentSample(config, first, 2)
    assert.equal(calculateIndependentSample(config, empty).isError, true, id)
    const second = { ...first, ...changes, id: 2, name: 'Sampel 2' }
    const inputs = { samples: [first, second] }
    const { sheet, workbook } = await report(id, inputs)
    assert.equal(workbook.worksheets.length, 1)
    const rows = dataRows(sheet)
    const results = rows.filter((row) => resultLabel.test(row.getCell(1).value) && row.getCell(3).formula)
    assert.equal(results.length, expected.length, id)
    for (const [index, row] of results.entries()) {
      assert.ok(Math.abs(row.getCell(3).result - expected[index]) < 1e-9, id)
    }
    assert.equal(rows.filter((row) => String(row.getCell(1).value).startsWith('Kesimpulan saat ekspor\n')).length, 2, id)
    const secondHeading = rows.find((row) => row.getCell(1).value === 'Sampel 2').number
    const secondResults = results.filter((row) => row.number > secondHeading)
    assert.ok(secondResults.length > 0, id)
    assert.ok(secondResults.every((row) => [...row.getCell(3).formula.matchAll(/\$C\$(\d+)/g)]
      .every(([, ref]) => Number(ref) > secondHeading)), id)
    const selected = dataRows((await report(id, inputs, { selectedSampleIds: [2] })).sheet)
    assert.ok(!selected.some((row) => row.getCell(1).value === 'Sampel 1'), id)
    assert.ok(selected.some((row) => row.getCell(1).value === 'Sampel 2'), id)
  }
})

test('penetration reports compliant examples and keeps every reading from a failed group', async () => {
  const id = 'bp-2-1'
  const example = defaults(id)
  const calculate = calculatorRegistry[id].calculate
  assert.deepEqual(calculate(example).groupResults.map((group) => [group.reported, group.precisionGap]), [[65, 2], [66, 1]])
  assert.equal(calculate(example).isSpecLolos, true)
  const groups = [
    { id: 1, name: 'Ulang', points: [78.6, 65.6, 59.4] },
    { id: 2, name: 'Baik', points: [64, 65, 66] },
  ]
  const inputs = { ...example, groups }
  const { groupResults } = calculate(inputs)
  assert.equal(groupResults[0].evaluation, 'Ulangi uji')
  assert.equal(groupResults[0].reported, null)
  assert.deepEqual(groupResults[0].pointsAnalysis.map((point) => point.value), groups[0].points)
  const rows = dataRows((await report(id, inputs)).sheet)
  const recap = (name) => rows.find((row) => row.getCell(1).value === name && row.getCell(7).formula)
  assert.equal(recap('Ulang').getCell(6).result ?? '', '')
  assert.equal(recap('Ulang').getCell(7).result, 'Ulangi uji')
  assert.equal(recap('Baik').getCell(6).result, 65)
  assert.ok(rows.some((row) => row.getCell(2).value === 78.6))
  for (const [mean, limit] of [[49, 2], [50, 4], [149, 4], [150, 12], [249, 12], [250, 20]]) {
    const result = calculate({ ...example, groups: [{ points: [mean - limit / 2, mean, mean + limit / 2] }] }).groupResults[0]
    assert.equal(result.precisionLimit, limit)
    assert.equal(result.reported, mean)
  }
})

test('all modules export one report sheet with formulas and any native charts', async () => {
  const modules = Object.values(calculatorRegistry)
  assert.equal(modules.length, 41)
  let charts = 0
  for (const { id } of modules) {
    const { sheet, zip, workbook } = await report(id)
    assert.deepEqual(workbook.worksheets.map((worksheet) => worksheet.name), ['Hasil Uji'], id)
    let formulas = 0
    sheet.eachRow((row) => row.eachCell((cell) => {
      if (!cell.formula) return
      formulas++
      assert.doesNotMatch(cell.formula, /NaN|undefined|#REF!/, id)
      if (typeof cell.result === 'number') assert.ok(Number.isFinite(cell.result), id)
    }))
    assert.ok(formulas > 0, id)
    const parts = chartPaths(zip)
    const contentTypes = await zip.file('[Content_Types].xml').async('string')
    if (parts.length) {
      const sheetRelationships = await zip.file('xl/worksheets/_rels/sheet1.xml.rels')?.async('string')
      assert.ok(sheetRelationships?.includes('Target="../drawings/drawing1.xml"'), id)
      const drawing = await zip.file('xl/drawings/drawing1.xml').async('string')
      const positions = [...drawing.matchAll(/<xdr:from>.*?<xdr:row>(\d+)<\/xdr:row>.*?<\/xdr:from>\s*<xdr:to>.*?<xdr:row>(\d+)<\/xdr:row>/gs)]
      const chartHeading = dataRows(sheet).find((row) => row.getCell(1).value === 'Grafik Pengujian')
      assert.ok(chartHeading, id)
      assert.equal(positions.length, parts.length, id)
      let previousBottom = chartHeading.number - 1
      for (const [, top, bottom] of positions) {
        assert.ok(Number(top) > previousBottom && Number(bottom) > Number(top), id)
        previousBottom = Number(bottom)
      }
      assert.ok(contentTypes.includes(
        'PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"',
      ), `${id}: Excel needs the registered drawing content type`)
    }
    for (const path of parts) {
      assert.ok(contentTypes.includes(
        `PartName="/${path}" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"`,
      ), `${id}: Excel needs the registered chart content type for ${path}`)
      const chart = await zip.file(path).async('string')
      const refs = [...chart.matchAll(/<c:f>&apos;Hasil Uji&apos;!\$([A-Z]+)\$(\d+):\$\1\$(\d+)<\/c:f>/g)]
      const series = [...chart.matchAll(/<c:ser>/g)]
      assert.equal(refs.length, series.length * 2, path)
      assert.ok(series.length > 0, path)
      refs.forEach(([, , start, end]) => {
        assert.ok(Number(start) > 1 && Number(end) >= Number(start) && Number(end) <= sheet.rowCount, path)
      })
      charts++
    }
  }
  assert.equal(charts, 23)
})

test('fine aggregate uses saved masses, real Zone II bounds and a log axis without pan', async () => {
  const id = 'bb-1-5'
  const { sheet, zip } = await report(id)
  const rows = dataRows(sheet)
  assert.ok(rows.some((row) => row.getCell(1).value === 'Ringkasan LabSipil saat ekspor'))
  assert.ok(rows.some((row) => row.getCell(1).value === 'Jejak perhitungan saat ekspor'))
  assert.ok(rows.some((row) => String(row.getCell(1).value).startsWith('Kesimpulan saat ekspor\n')))
  const totals = rows.filter((row) => row.getCell(1).value === 'Total massa tertahan')
  assert.deepEqual(totals.map((row) => row.getCell(3).result), [500, 500, 500])
  const comparison = rows.find((row) => row.getCell(2).value === 0.6 && row.getCell(3).value === 35)
  assert.deepEqual([comparison.getCell(4).result, comparison.getCell(5).value, comparison.getCell(6).result],
    [34, 59, 'Di bawah batas'])
  const chart = await zip.file(chartPaths(zip)[0]).async('string')
  assert.match(chart, /<c:logBase val="10"\/>/)
  for (const x of chart.matchAll(/<c:xVal>(.*?)<\/c:xVal>/gs)) {
    assert.doesNotMatch(x[1], /<c:v>0<\/c:v>/)
  }
  assert.equal((chart.match(/<c:crosses val="min"\/>/g) ?? []).length, 2)
})

test('sample selection recomputes passing and values-only mode keeps the native graph', async () => {
  const id = 'bb-1-5'
  const { sheet, zip } = await report(id, defaults(id), {
    selectedSampleIds: [2], options: { includeFormulas: false },
  })
  const rows = dataRows(sheet)
  assert.equal(rows.filter((row) => row.getCell(1).value === 'Total massa tertahan').length, 1)
  assert.ok(rows.some((row) => row.getCell(1).value === 'Massa dan gradasi • Benda Uji II'))
  const pass = rows.find((row) => row.getCell(2).value === 0.3 && row.getCell(3).value === 8)
  assert.ok(Math.abs(pass.getCell(4).value - 13.6) < 1e-9)
  sheet.eachRow((row) => row.eachCell((cell) => assert.equal(cell.formula, undefined)))
  assert.equal(chartPaths(zip).length, 1)
})

test('archived entries with no input keep their own summary and have no substituted data', async () => {
  const { sheet, workbook } = await report('bb-1-5', {}, {
    calcOutput: { results: [{ label: 'MHB arsip', value: '2.95' }] },
  })
  assert.ok(dataRows(sheet).some((row) => String(row.getCell(1).value).startsWith('Rekaman arsip')))
  assert.equal(workbook.worksheets.length, 1)
  assert.ok(dataRows(sheet).some((row) => row.getCell(2).value === 2.95))
  const unknown = { id: 'custom', baseCode: 'BJ', name: 'Uji manual' }
  assert.equal(resolveRecordConfig(unknown, calculatorRegistry).id, 'custom')
})

test('boundary cases in concrete, soil, fluids and pavement use measured values', () => {
  const calculate = (id, inputs) => calculatorRegistry[id].calculate(inputs)
  const concrete = defaults('bb-3-2')
  concrete.tipeSample = 'kubus'
  concrete.sisiMm = 150
  concrete.samples = [{ id: 1, name: 'Kubus', bebanHancur: 450 }]
  assert.equal(Number(calculate('bb-3-2', concrete).results[0].value), 20)

  const oedometer = defaults('mt-5-2')
  assert.ok(calculate('mt-5-2', oedometer).t90 > 0)
  oedometer.oedometerReadings = oedometer.oedometerReadings.map((row) => ({ ...row, h: 2, deltaH: 0 }))
  assert.equal(calculate('mt-5-2', oedometer).cvSec, null)

  const soil = defaults('mt-4-1')
  soil.soilSieves = soil.soilSieves.filter((row) => Number(row.diameter) !== 0.075)
  assert.equal(calculate('mt-4-1', soil).finesPct, null)

  const casagrande = defaults('mt-2-3')
  casagrande.samples = casagrande.samples.slice(0, 1)
  assert.equal(calculate('mt-2-3', casagrande).llValue, null)

  const re = calculate('mf-2-1', { diameterD: 0.02, kecepatanV: 0.15, viskositasNu: 1e-6 })
  assert.equal(re.results[0].numericValue, 3000)
  assert.equal(re.status, 'Transisi')

  const jmf = defaults('bp-8-1')
  jmf.sieves[0].retWeight = 50
  assert.equal(calculate('bp-8-1', jmf).status, 'Perlu Evaluasi')
  const marshall = calculate('bp-9-1', defaults('bp-9-1'))
  assert.equal(marshall.status, 'Perlu Evaluasi')

  const penetration = defaults('bp-2-1')
  penetration.groups = [{ id: 1, name: 'Kelompok 1', points: [60, 61, 70] }]
  const measured = calculate('bp-2-1', penetration)
  assert.equal(measured.totalValidCount, 3)
  assert.equal(measured.isPresisiLolos, false)

  const viscosity = defaults('bp-7-1')
  viscosity.viscosityPoints = viscosity.viscosityPoints.map((point) => ({ ...point, time: 100 }))
  const flat = calculate('bp-7-1', viscosity)
  assert.equal(flat.status, 'Perlu Evaluasi')
  assert.equal(flat.tMixMin, null)

  const extraction = defaults('bp-10-1')
  assert.equal(calculate('bp-10-1', extraction).extraction.corrected, false)
  extraction.beratAirDalamContoh = 2
  extraction.beratMineralDalamEkstrak = 1
  extraction.beratTalamSampelFilter = extraction.beratTalamSampel + extraction.beratFilterW2
  assert.ok(Math.abs(calculate('bp-10-1', extraction).extraction.pb - 100 * 49.2 / 1170) < 1e-9)
})

test('Marshall preserves the recorded masses and evaluates VIM only with measured Gmm', async () => {
  const id = 'bp-9-1'
  const inputs = defaults(id)
  inputs.kalibrasiAlat = 10
  Object.assign(inputs.specimens[0], { gmmMeasured: 2.2, stabilitas: 9999, bacaanStab: 100 })
  const out = calculatorRegistry[id].calculate(inputs)
  const [measured, estimated, invalid] = out.computedSpecimens
  assert.equal(measured.gmm, 2.2)
  assert.equal(measured.isVimOk, true)
  assert.equal(measured.stabilitas, 924)
  assert.equal(estimated.hasMeasuredGmm, false)
  assert.match(estimated.volumetricNote, /Isi Gmm/)
  assert.equal(invalid.beratKering, 1153.6)
  assert.equal(invalid.beratSsd, 1141)
  for (const key of ['v', 'gmb', 'gmm', 'vim', 'vma', 'vfa']) assert.equal(invalid[key], null, key)
  assert.match(out.conclusion, /KAO belum dapat ditetapkan/)

  const rows = dataRows((await report(id, inputs)).sheet)
  const volume = rows.filter((row) => row.getCell(10).formula)
  assert.deepEqual(volume.map((row) => row.getCell(10).result ?? ''), ['Estimasi', 'Hasil uji', ''])
  assert.equal(volume[1].getCell(6).result, measured.gmm)
  assert.equal(volume[1].getCell(7).result, measured.vim)
  for (let col = 6; col <= 9; col++) assert.equal(volume[2].getCell(col).result ?? '', '')
  const stability = rows.find((row) => row.getCell(2).result === 5.5 && row.getCell(3).result === 924)
  assert.match(stability.getCell(3).formula, /ROUND\(.*\*.*\*.*,/)
  const evaluations = rows.filter((row) => row.getCell(2).value === 'Rongga dalam campuran (VIM)' && row.getCell(4).formula)
  assert.deepEqual(evaluations.map((row) => row.getCell(4).result), ['Isi Gmm hasil uji', 'Memenuhi', 'Data belum sah'])
})

test('adding a blank Marshall specimen leaves the curve and existing results intact', async () => {
  const id = 'bp-9-1'
  const inputs = defaults(id)
  const calculate = calculatorRegistry[id].calculate
  const existing = calculate(inputs)
  inputs.specimens.push({ id: 4, no: 4, pa: '', beratKering: '', beratSsd: '', beratAir: '', flow: '', bacaanStab: '' })
  const withBlank = calculate(inputs)
  assert.equal(withBlank.computedSpecimens.at(-1).pa, null)
  assert.equal(withBlank.computedSpecimens.at(-1).beratSsd, null)
  assert.deepEqual(withBlank.chartPoints, existing.chartPoints)
  const selected = await report(id, inputs, { selectedSampleIds: [2] })
  const rows = dataRows(selected.sheet).filter((row) => row.getCell(3).formula && row.getCell(10).formula)
  assert.equal(rows.length, 1)
  assert.equal(rows[0].getCell(2).result, 5)
})

test('nonmonotonic Saybolt readings remain in Excel without publishing work temperatures', async () => {
  const id = 'bp-7-1'
  const inputs = defaults(id)
  const readings = [[120, 149], [140, 216], [160, 43], [180, 82.5]]
  inputs.viscosityPoints = readings.map(([temp, time], i) => ({ id: i + 1, temp, time }))
  const calculate = calculatorRegistry[id].calculate
  const out = calculate(inputs)
  assert.equal(out.status, 'Perlu Evaluasi')
  assert.match(out.conclusion, /140 °C, 180 °C/)
  assert.equal(out.tMixMin, null)
  assert.equal(out.tCompMax, null)
  assert.ok(calculate(defaults(id)).tMixMin > 120)

  const rows = dataRows((await report(id, inputs)).sheet)
  const points = rows.filter((row) => row.getCell(5).formula?.includes('COUNTIFS'))
  assert.deepEqual(points.map((row) => [row.getCell(1).value, row.getCell(2).value]), readings)
  assert.deepEqual(points.map((row) => row.getCell(5).result ?? ''), ['', 'Naik', '', 'Naik'])
  const temperatures = rows.filter((row) => /^(Campur|Padat) • ν/.test(row.getCell(1).value))
  assert.equal(temperatures.length, 4)
  assert.ok(temperatures.every((row) => (row.getCell(3).result ?? '') === '' && row.getCell(4).result === 'Perlu Evaluasi'))
})

test('pavement audit inputs preserve numerical results and flag the failed checks', async () => {
  const losAngeles = { ...defaults('bp-1-1'), beratAwalA: 2000, beratTertahanB: 808.3, jumlahBola: 6 }
  const la = calculatorRegistry['bp-1-1'].calculate(losAngeles)
  assert.equal(la.status, 'Perlu Evaluasi')
  assert.match(la.conclusion, /5[.,]?000|11 bola/)
  const laRows = dataRows((await report('bp-1-1', losAngeles)).sheet)
  const wear = laRows.find((row) => row.getCell(1).value === 'Keausan Los Angeles 500 putaran' && row.getCell(3).formula)
  assert.ok(Math.abs(wear.getCell(3).result - 59.585) < 0.01)

  const softening = { ...defaults('bp-3-1'), t1: 44, t2: 45, pen25: '' }
  const ring = calculateIndependentSample(calculatorRegistry['bp-3-1'], softening)
  assert.ok(!ring.isError)
  const ringRows = dataRows((await report('bp-3-1', softening)).sheet)
  const result = (label) => ringRows.find((row) => row.getCell(1).value === label && row.getCell(3).formula)?.getCell(3).result ?? ''
  assert.equal(result('Titik lembek rata-rata'), 44.5)
  assert.equal(result('Indeks penetrasi PI (indikatif)'), '')
  assert.equal(result('Evaluasi titik lembek'), 'Di bawah batas titik lembek')

  const flash = defaults('bp-5-1')
  const flashOut = calculatorRegistry['bp-5-1'].calculate(flash)
  assert.equal(flashOut.status, 'Perlu Evaluasi')
  assert.match(flashOut.conclusion, /15.0 °C.*26.0 °C/)
  const flashRows = dataRows((await report('bp-5-1', flash)).sheet)
  assert.deepEqual(flashRows.filter((row) => /^Rentang bacaan/.test(row.getCell(1).value)).map((row) => row.getCell(3).result), [15, 26])

  const ductility = { ...defaults('bp-6-1'), satuanInput: 'mm', samples: [1500, 1500, 120].map((value, i) => ({ id: i + 1, value })) }
  const ductilityOut = calculatorRegistry['bp-6-1'].calculate(ductility)
  assert.equal(ductilityOut.dRata, 104)
  assert.equal(ductilityOut.status, 'Perlu Evaluasi')
})

test('the AC-WC envelope keeps the actual sieve opening and flags missing standard sieves', async () => {
  const id = 'bb-2-5'
  const inputs = {
    coarseStandard: 'ac-wc', specimens: ['Agregat gabungan'],
    sieves: [{ size: 19, weights: [0] }, { size: 9.5, weights: [45] }, { size: 0.1, weights: [50] }, { size: 0, weights: [5] }],
  }
  const out = calculatorRegistry[id].calculate(inputs)
  assert.equal(out.status, 'Perlu Evaluasi')
  assert.ok(out.gradation.missingBounds.includes(0.075))
  const { sheet } = await report(id, inputs)
  const rows = dataRows(sheet)
  const check = rows.find((row) => row.getCell(2).value === 9.5 && row.getCell(3).value === 77)
  assert.equal(check.getCell(4).result, 55)
  assert.equal(check.getCell(6).result, 'Di bawah batas')
  assert.ok(rows.some((row) => row.getCell(2).value === 0.1 && row.getCell(6).result === 'Tidak ada batas'))
  assert.ok(rows.some((row) => row.getCell(2).value === 0.075 && row.getCell(6).value === 'Ayakan belum diuji'))
})

test('soil water content and Atterberg limits use dry mass, whole-percent reporting and NP', async () => {
  const calculate = (id, inputs) => calculatorRegistry[id].calculate(inputs)
  const samples = [{ name: 'Cawan 1', w1: 10, w2: 32, w3: 20 }]
  assert.equal(calculate('mt-2-1', { samples }).soilMoisture, 120)
  assert.equal(calculate('mt-2-1', { samples: [{ w1: 10, w2: 20, w3: 20 }] }).soilMoisture, 0)
  assert.equal(calculate('mt-2-1', { samples: [...samples, { w1: 10, w2: '', w3: 20 }] }).soilMoisture, null)
  assert.equal(calculate('mt-2-3', { ketukanN: 30, kadarAirW: 40 }).llValue, null)
  assert.equal(calculate('mt-2-3', { ketukanN: 25, kadarAirW: 40 }).llValue, 40)
  const brokenLL = defaults('mt-2-3')
  brokenLL.samples[1].w2 += 20
  assert.equal(calculate('mt-2-3', brokenLL).llValue, null)
  const id = 'mt-2-4'
  const inputs = { ...defaults(id), ll: 21 }
  assert.equal(calculate(id, inputs).soilPlasticityIndex, 'NP')
  const rows = dataRows((await report(id, inputs)).sheet)
  const pi = rows.find((row) => row.getCell(1).value === 'PI untuk pelaporan')
  assert.equal(pi.getCell(3).result, 'NP')
  assert.match(pi.getCell(3).formula, /ROUND/)
})

test('soil specific gravity applies the table factor to each pycnometer in LabSipil and Excel', async () => {
  const id = 'mt-2-2'
  const inputs = { ...defaults(id), temp: 25.5 }
  const out = calculatorRegistry[id].calculate(inputs)
  const expected = out.soilGsRows.reduce((sum, row) => sum + row.measured, 0) / 2 * 0.99875
  assert.ok(Math.abs(out.soilGsAverage - expected) < 1e-12)
  assert.equal(calculatorRegistry[id].calculate({ ...inputs, temp: 35 }).soilGsAverage, null)
  const rows = dataRows((await report(id, inputs)).sheet)
  const factor = rows.find((row) => row.getCell(1).value === 'Faktor K ke 20 °C')
  assert.equal(factor.getCell(2).result, 0.99875)
  assert.match(factor.getCell(2).formula, /INDEX/)
  assert.equal(rows.find((row) => row.getCell(2).formula?.includes('AVERAGE')).getCell(2).result, out.soilGsAverage)
})

test('Proctor reports the bracketed peak and withholds OMC when the data cannot support it', async () => {
  const id = 'mt-3-1'
  const inputs = defaults(id)
  const calculate = calculatorRegistry[id].calculate
  const out = calculate(inputs)
  assert.ok(Math.abs(out.mdd - 1.875) < 0.001)
  assert.ok(Math.abs(out.omc - 13.09) < 0.02)
  assert.equal(calculate({ ...inputs, proctorSamples: inputs.proctorSamples.slice(0, 3) }).omc, null)
  inputs.proctorSamples[1].moldWithSoil = 4900
  assert.equal(calculate(inputs).proctorSamples[1].aboveZav, true)
  assert.equal(calculate(inputs).mdd, null)
  const rows = dataRows((await report(id, inputs)).sheet)
  assert.ok(rows.some((row) => row.getCell(12).result === 'Di atas ZAV'))
  assert.ok(rows.some((row) => /N\d+-M\d+/.test(row.getCell(7).formula)))
  assert.equal(rows.find((row) => row.getCell(1).value === 'Kadar air optimum (OMC)').getCell(3).value, null)
})

test('direct shear uses calibrated dial force and requires three distinct normal stresses', async () => {
  const id = 'mt-5-1'
  const inputs = { shearInputMode: 'dial', shearCalibration: 0.5, points: defaults(id).points.map((point) =>
    ({ ...point, dialReading: point.shearForce / 0.5 })) }
  const calculate = calculatorRegistry[id].calculate
  assert.equal(calculate(inputs).computedPoints[0].shearForce, 1.5)
  assert.equal(calculate({ ...inputs, shearCalibration: '' }).isError, true)
  assert.equal(calculate({ ...inputs, points: inputs.points.map((point) => ({ ...point, normalLoad: 10 })) }).isError, true)
  const rows = dataRows((await report(id, inputs)).sheet)
  const first = rows.find((row) => row.getCell(9).value === 3 && row.getCell(4).formula)
  assert.equal(first.getCell(4).result, 1.5)
  assert.match(first.getCell(4).formula, /I\d+\*\$C\$/)
})

test('oedometer keeps positive settlement and reverses the exported vertical axis', async () => {
  const id = 'mt-5-2'
  const out = calculatorRegistry[id].calculate(defaults(id))
  assert.ok(Math.abs(out.t90 - 7.23) < 0.01)
  assert.equal(out.sortedReadings[0].deltaH, 0)
  assert.ok(out.sortedReadings.at(-1).deltaH > 0)
  const { zip } = await report(id)
  const chart = await zip.file(chartPaths(zip)[0]).async('string')
  assert.match(chart, /<c:orientation val="maxMin"\/>/)
})
