import ExcelJS from 'exceljs'
import { writeAggregateGradation } from './excelAggregateTables.js'
import { writeDuctility, writeFlash, writePenetration, writeViscosity } from './excelAsphaltTables.js'
import { prepareCharts, writeCharts } from './excelCharts.js'
import { writeReynolds } from './excelFluidTables.js'
import { writeJmf, writeMarshall } from './excelMixTables.js'
import { selectExportSamples } from './excelReportData.js'
import { addNote, addSection, addTable, numeric, reportHeader, REPORT_COLUMN_COUNT, sheetSettings } from './excelReportLayout.js'
import { normalizeSampleInputs, writeSampleRecap } from './excelSampleTables.js'
import { writeScalarResults } from './excelScalarTables.js'
import { writeCasagrande, writeCpt, writeDirectShear, writeOedometer, writeProctor, writeSoilSieves, writeSoilSpecificGravity, writeSoilWaterContent } from './excelSoilTables.js'
import { normalizeLegacyLabInputs } from './labInputValues.js'
import { CPT_AREAS } from './cptProfile.js'
import { calculateIndependentSample, getIndependentSamples } from './independentLabSamples.js'

const tableInputs = {
  'bb-1-5': 'sieves', 'bb-2-5': 'sieves', 'mt-1-1': 'cptRows', 'mt-3-1': 'proctorSamples',
  'mt-4-1': 'soilSieves', 'mt-5-1': 'points', 'mt-5-2': 'oedometerReadings', 'mf-2-1': 'reynoldsRows',
  'bp-2-1': 'groups', 'bp-7-1': 'viscosityPoints', 'bp-8-1': 'sieves', 'bp-9-1': 'specimens',
}

const legacyFields = {
  'mt-1-1': ['depth', 'qc', 'tw'],
  'mt-2-3': ['ketukanN', 'kadarAirW'],
  'mt-2-4': ['batasCairLL', 'batasPlastisPL'],
  'mt-3-1': ['volMold', 'wMold', 'wMoldTanah', 'kadarAir'],
  'mt-4-1': ['d10', 'd30', 'd60', 'finesPct'],
  'mt-5-2': ['tinggiAwal', 'angkaPoriAwal', 'deltaH', 'tekananP1', 'tekananP2'],
  'mf-2-1': ['diameterD', 'kecepatanV', 'viskositasNu'],
  'bp-2-1': ['x1', 'x2', 'x3', 'x4', 'x5'],
  'bp-5-1': ['tNyala1', 'tNyala2', 'tNyala3', 'tBakar1', 'tBakar2', 'tBakar3', 'tekananK'],
  'bp-6-1': ['d1', 'd2', 'd3'],
  'bp-7-1': ['suhu1', 'waktu1', 'suhu2', 'waktu2'],
  'bp-8-1': ['wTotal', 'pbRencana', 'k', 'ca', 'fa', 'filler'],
  'bp-9-1': ['kadarAspalPb', 'gsb', 'gse', 'gb', 'beratKering', 'beratSsd', 'beratAir', 'bacaanStabilitas', 'flow', 'angkaKorelasi', 'kalibrasiAlat'],
}

const sampleParamKeys = {
  'bb-2-1': ['pairedFineGsb'],
  'bb-1-3': ['organikScale'], 'bb-1-4': ['wBejana', 'vol', 'bjBulk'], 'bb-2-4': ['wBejana', 'vol', 'bjBulk'],
  'bb-3-2': ['tipeSample', 'diameterMm', 'sisiMm', 'umurHari', 'targetFc'],
  'bb-3-3': ['lebarB', 'tinggiH', 'bentangL'],
  'bb-4-4': ['lebarB', 'tinggiH', 'bentangL'],
  'bb-5-1': ['mutuBaja'], 'mt-2-2': ['temp'], 'mt-2-4': ['ll'],
  'bp-5-1': ['tekananK', 'tekananKUnit', 'syaratNyalaMin'],
  'bp-6-1': ['kelasAspal', 'satuanInput'],
}

const extraFields = {
  depth: ['Kedalaman', 'm'], qc: ['Perlawanan konus qc', 'kgf/cm²'], tw: ['Pembacaan total', 'kgf/cm²'],
  ll: ['Batas cair acuan LL', '%'], temp: ['Suhu pengujian', '°C'], e0: ['Angka pori awal e₀', ''], h0: ['Tinggi awal H₀', 'cm'],
  p1: ['Tekanan awal P₁', 'kPa'], p2: ['Tekanan akhir P₂', 'kPa'], wTotal: ['Massa awal', 'g'],
  diameterPipaD: ['Diameter pipa tegak', 'cm'], diameterSampelD: ['Diameter benda uji', 'cm'],
  headH0: ['Tinggi tekan awal h₀', 'cm'], headH1: ['Tinggi tekan akhir h₁', 'cm'],
  massaPiknoKosong: ['Massa piknometer kosong', 'g'], massaPiknoFluida: ['Massa piknometer berisi fluida', 'g'], volumePikno: ['Volume piknometer', 'mL'],
  jarakS: ['Jarak tempuh bola', 'm'], waktuT: ['Waktu', 's'], diameterD: ['Diameter', 'm'],
  massaJenisBola: ['Massa jenis bola', 'kg/m³'], massaJenisFluida: ['Massa jenis fluida', 'kg/m³'], massaJenisZat: ['Massa jenis zat', 'kg/m³'], massaJenisAir: ['Massa jenis air acuan', 'kg/m³'],
  archDBeaker: ['Diameter beaker', 'satuan geometri'], archDTabung: ['Diameter tabung', 'satuan geometri'],
  archH0: ['Tinggi air awal', 'satuan geometri'], archH1: ['Tinggi air akhir', 'satuan geometri'],
  archMassaJenis: ['Massa jenis fluida', 'kg/m³'], archGravitasi: ['Gravitasi', 'm/s²'], archDimUnit: ['Satuan geometri', ''],
  volumeTercelup: ['Volume tercelup', 'm³'],
  kecepatanV: ['Kecepatan fluida', 'm/s'], viskositasNu: ['Viskositas kinematik ν', 'm²/s'],
  tekananKUnit: ['Satuan tekanan barometer', ''],
  beratSampelW1: ['Massa contoh awal', 'g'], beratAgregatW2: ['Massa agregat kering', 'g'],
  beratKertasF1: ['Massa filter awal', 'g'], beratKertasF2: ['Massa filter akhir', 'g'],
  gsb: ['Berat jenis bulk agregat gabungan Gsb', ''], gse: ['Berat jenis efektif agregat Gse', ''],
  ga: ['Berat jenis aspal Ga', ''], gb: ['Berat jenis aspal Gb', ''], k: ['Konstanta estimasi KAA', ''],
}

function normalizeInputs(id, raw) {
  const inputs = normalizeLegacyLabInputs(id, normalizeSampleInputs(id, raw))
  if (id === 'mt-1-1' && (Array.isArray(inputs.cptRows) || legacyFields[id].some((key) => Object.hasOwn(inputs, key)))) {
    return { ...CPT_AREAS, ...inputs }
  }
  if (id === 'bb-3-2') return { tipeSample: 'silinder', diameterMm: 150, sisiMm: 150, ...inputs }
  if (id === 'bb-5-1') return { ...inputs, mutuBaja: inputs.mutuBaja === 'BjTS 420' ? 'BjTS 420B' : inputs.mutuBaja ?? 'BjTS 420B' }
  if (id === 'bp-8-1') return { jenisCampuran: 'ac-wc', ...inputs }
  if (id === 'bp-10-1') return {
    ...inputs,
    beratAirDalamContoh: inputs.beratAirDalamContoh ?? null,
    beratMineralDalamEkstrak: inputs.beratMineralDalamEkstrak ?? (inputs.beratTalam === undefined ? inputs.beratAbu : null) ?? null,
  }
  if (id === 'mt-2-4' && inputs.samples?.length) return { ...inputs, ll: inputs.ll ?? inputs.batasCairLL }
  if (id === 'bp-5-1' && !inputs.samples?.length && legacyFields[id].every((key) => numeric(inputs[key]) !== null)) {
    return { ...inputs, samples: [1, 2, 3].map((i) => ({ id: i, flashPoint: inputs['tNyala' + i], firePoint: inputs['tBakar' + i] })) }
  }
  if (id === 'bp-6-1' && !inputs.samples?.length && legacyFields[id].every((key) => numeric(inputs[key]) !== null)) {
    return { ...inputs, samples: [1, 2, 3].map((i) => ({ id: i, name: 'Cetakan ' + i, value: inputs['d' + i], isValid: true })) }
  }
  return inputs
}

function fluidKeys(inputs) {
  switch (inputs.metode) {
    case 'sg': return ['massaJenisZat', 'massaJenisAir']
    case 'viskositas': return ['jarakS', 'waktuT', 'diameterD', 'massaJenisBola', 'massaJenisFluida']
    case 'archimedes': return Object.hasOwn(inputs, 'archDBeaker')
      ? ['archDBeaker', 'archDTabung', 'archH0', 'archH1', 'archMassaJenis', 'archGravitasi']
      : ['volumeTercelup', 'massaJenisFluida']
    default: return ['massaPiknoKosong', 'massaPiknoFluida', 'volumePikno']
  }
}

function requiredScalars(config, inputs) {
  if (config.id === 'mf-1-1') return fluidKeys(inputs)
  if (config.id === 'mt-6-1') return inputs.metode === 'falling'
    ? ['diameterPipaD', 'diameterSampelD', 'panjangL', 'waktuT', 'headH0', 'headH1']
    : ['diameterD', 'panjangL', 'volumeQ', 'headH', 'waktuT']
  if (config.id === 'bp-10-1') return inputs.beratTalam === undefined
    ? ['beratSampelW1', 'beratAgregatW2', 'beratKertasF1', 'beratKertasF2']
    : ['beratTalam', 'beratTalamSampel', 'beratFilterW2', 'beratMineralFilterW4']
  if (legacyFields[config.id]) return legacyFields[config.id]
  return (config.fields ?? []).filter((field) => field.type !== 'select' && !field.optional).map((field) => field.key)
}

function hasMeasurements(config, inputs) {
  if (config.id === 'bp-2-1') return Array.isArray(inputs.groups)
    ? inputs.groups.length > 0 : legacyFields[config.id].some((key) => Object.hasOwn(inputs, key))
  const primary = tableInputs[config.id] || (Array.isArray(config.initialInputs?.samples) ? 'samples' : null)
  if (primary && Array.isArray(inputs[primary])) return inputs[primary].length > 0
  if (primary && !legacyFields[config.id]) return false
  const required = requiredScalars(config, inputs)
  return required.length > 0 && required.every((key) => numeric(inputs[key]) !== null)
}

function parameterKeys(config, inputs) {
  if (config.id === 'mt-1-1') return Object.keys(CPT_AREAS)
  if (inputs.samples?.length) return sampleParamKeys[config.id] ?? []
  if (config.id === 'mf-1-1') return ['metode', ...fluidKeys(inputs), 'archDimUnit', ...(!Object.hasOwn(inputs, 'archDBeaker') ? ['archGravitasi'] : [])]
  if (config.id === 'mt-6-1') return ['metode', ...requiredScalars(config, inputs)]
  if (config.id === 'mt-4-1' && inputs.soilSieves?.length) return ['wTotal']
  if (config.id === 'mt-5-1') return ['shearInputMode', 'shearCalibration']
  if (config.id === 'mt-5-2' && inputs.oedometerReadings?.length) return ['h0', 'e0', 'p1', 'p2']
  if (config.id === 'bp-2-1') return ['kelasAspal', 'suhuUji', 'bebanJarum', 'waktuPenetrasi']
  if (config.id === 'bp-7-1') return ['metodeKonversi', 'standarTarget', 'vMixMin', 'vMixMax', 'vCompMin', 'vCompMax', ...(!inputs.viscosityPoints?.length ? legacyFields[config.id] : [])]
  if (config.id === 'bp-8-1') return ['jenisCampuran', 'wTotal', 'pbRencana', 'k', ...(!inputs.sieves?.length ? ['ca', 'fa', 'filler'] : [])]
  if (config.id === 'bp-9-1' && inputs.specimens?.length) return ['jenisCampuran', 'diameter', 'tinggiBriket', 'kalibrasiAlat', 'angkaKorelasiBeban', 'p1', 'p2', 'p3', 'gsb1', 'gsb2', 'gsb3', 'gsa1', 'gsa2', 'gsa3', 'ga']
  if (config.id === 'bp-10-1') return [...requiredScalars(config, inputs), 'beratTalamSampelFilter', 'beratAirDalamContoh', 'beratMineralDalamEkstrak', 'kadarAspalJmf']
  if (tableInputs[config.id] && inputs[tableInputs[config.id]]?.length) return []
  return [...new Set([...(config.fields ?? []).map((field) => field.key), ...(legacyFields[config.id] ?? [])])]
}

function writeParameters(ws, config, inputs) {
  const fields = Object.fromEntries([...(config.getFields?.(inputs) ?? config.fields ?? []), ...(config.commonFields ?? [])].map((field) => [field.key, [field.label, field.unit || '']]))
  const keys = parameterKeys(config, inputs).filter((key) => Object.hasOwn(inputs, key))
  if (!keys.length) return {}
  const table = addTable(ws, 'Parameter pengujian', ['Parameter', 'Satuan', 'Input'], keys.map((key) => {
    const [label, unit] = fields[key] ?? extraFields[key] ?? [key, '']
    const value = inputs[key] === '' ? null : numeric(inputs[key]) ?? inputs[key]
    return [label, key === 'tekananK' ? inputs.tekananKUnit ?? unit : unit, value]
  }), { widths: [38, 16, 25], inputs: [3] })
  return Object.fromEntries(keys.map((key, i) => [key, '$C$' + (table.first + i)]))
}

function flattenInput(input, path = '') {
  if (input === null || typeof input !== 'object') return [[path, numeric(input) ?? input]]
  return Object.entries(input).flatMap(([key, value]) => flattenInput(value, path ? path + ' / ' + key : key))
}

const tableWriters = {
  'bb-1-5': (ws, inputs, out, params, charts) => out.gradation && (writeAggregateGradation(ws, out, charts), true),
  'bb-2-5': (ws, inputs, out, params, charts) => out.gradation && (writeAggregateGradation(ws, out, charts), true),
  'mt-1-1': (ws, inputs, out, params, charts) => writeCpt(ws, inputs, out, params, charts),
  'mt-2-1': (ws, inputs, out, params) => writeSoilWaterContent(ws, out, params, false),
  'mt-2-2': (ws, inputs, out, params) => writeSoilSpecificGravity(ws, inputs, out, params),
  'mt-2-3': (ws, inputs, out, params, charts) => writeCasagrande(ws, inputs, out, charts),
  'mt-2-4': (ws, inputs, out, params) => writeSoilWaterContent(ws, out, params, true),
  'mt-3-1': (ws, inputs, out, params, charts) => writeProctor(ws, out, charts),
  'mt-4-1': (ws, inputs, out, params, charts) => writeSoilSieves(ws, out, params, charts),
  'mt-5-1': writeDirectShear,
  'mt-5-2': (ws, inputs, out, params, charts) => writeOedometer(ws, inputs, out, params, charts),
  'mf-2-1': (ws, inputs, out, params, charts) => writeReynolds(ws, inputs, out, charts),
  'bp-2-1': (ws, inputs, out, params) => writePenetration(ws, out, params),
  'bp-5-1': (ws, inputs, out, params) => writeFlash(ws, inputs, params),
  'bp-6-1': writeDuctility,
  'bp-7-1': writeViscosity,
  'bp-8-1': writeJmf,
  'bp-9-1': writeMarshall,
}

function writeReportResults(sheet, testConfig, source, calcOutput, charts) {
  const id = testConfig.id
  const canCalculate = typeof testConfig.calculate === 'function' && hasMeasurements(testConfig, source)
  const output = canCalculate ? (testConfig.hasIndependentSamples
    ? calculateIndependentSample(testConfig, source) : testConfig.calculate(source)) : calcOutput ?? {}
  const parameters = writeParameters(sheet, testConfig, source)
  const hasTable = canCalculate && (tableWriters[id]?.(sheet, source, output, parameters, charts)
    || writeSampleRecap(sheet, id, source, output, parameters)
    || (!output.isError && writeScalarResults(sheet, id, source, output, parameters)))
  if (!hasTable && Object.keys(source).length > 0) {
    addTable(sheet, 'Data tersimpan', ['Data', 'Nilai'], flattenInput(source), { widths: [42, 45] })
  }

  const steps = output.formulaSteps ?? output.steps
  if (output.results?.length) addTable(sheet, canCalculate ? 'Ringkasan LabSipil saat ekspor' : 'Ringkasan rekaman', ['Parameter', 'Nilai', 'Satuan', 'Keterangan'],
    output.results.map((result) => [result.label, numeric(result.numericValue ?? result.value) ?? result.value, result.unit, result.sub]),
    { widths: [36, 25, 16], lastColumn: REPORT_COLUMN_COUNT })
  if (Array.isArray(steps) && steps.length) addTable(sheet, 'Jejak perhitungan saat ekspor', ['No.', 'Rumus dan substitusi'],
    steps.map((step, i) => [i + 1, String(step)]), { widths: [10, 17], formats: ['0'], lastColumn: REPORT_COLUMN_COUNT })
  if (canCalculate) {
    addNote(sheet, 'Kesimpulan saat ekspor', [output.status, output.conclusion ?? output.summaryString, output.warningMessage].filter(Boolean).join('\n'))
  } else {
    addNote(sheet, 'Rekaman arsip', ['Data pengukuran untuk menghitung ulang tidak lengkap atau modul tidak teridentifikasi.', output.conclusion ?? output.summaryString].filter(Boolean).join('\n'))
  }
}

export async function buildLabWorkbook({ testConfig, inputs = {}, calcOutput = {}, metadata = {}, selectedSampleIds = null, options = {} }) {
  if (!testConfig) throw new Error('Konfigurasi pengujian diperlukan.')
  const id = testConfig.id
  const source = selectExportSamples(id, normalizeInputs(id, inputs ?? {}), selectedSampleIds)
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'LabSipil'
  workbook.calcProperties.fullCalcOnLoad = true
  const sheet = workbook.addWorksheet('Hasil Uji')
  const includeFormulas = options.includeFormulas !== false
  const reportDate = metadata.tanggal || new Date().toISOString().slice(0, 10)

  reportHeader(sheet, testConfig.name || 'Pengujian laboratorium', [
    ['Praktikum', testConfig.lab || testConfig.category || '—'],
    ['Metode / acuan', testConfig.standard || '—'],
    ['Tanggal', reportDate],
    ['Deskripsi benda uji', metadata.sampelDesc || testConfig.category || '—'],
  ])

  const charts = []
  if (testConfig.hasIndependentSamples && source.samples?.length) {
    getIndependentSamples(source).forEach(({ name, ...sample }, index) => {
      addSection(sheet, name || `Sampel ${index + 1}`, REPORT_COLUMN_COUNT)
      writeReportResults(sheet, testConfig, normalizeInputs(id, sample), {}, charts)
    })
  } else {
    writeReportResults(sheet, testConfig, source, calcOutput, charts)
  }
  addNote(sheet, includeFormulas ? 'Cara menggunakan' : 'Mode nilai', includeFormulas
    ? 'Sel input berwarna biru muda. Rumus sel mengikuti perubahan input yang terhubung. Ringkasan naratif dan hasil berlabel “saat ekspor” adalah arsip. Ekspor ulang untuk memperbarui arsip atau mengubah jumlah benda uji dan baris pengamatan.'
    : 'Workbook ini menyimpan nilai saat ekspor. Aktifkan opsi rumus di LabSipil untuk mendapatkan sel perhitungan yang dapat dihitung ulang.')

  if (!includeFormulas) sheet.eachRow((row) => row.eachCell((cell) => {
    if (cell.formula) cell.value = cell.result === '' ? null : cell.result
  }))
  const layout = prepareCharts(sheet, charts)
  sheetSettings(sheet, 2, layout?.lastRow)
  const buffer = await writeCharts(await workbook.xlsx.writeBuffer(), layout)
  const code = String(testConfig.code || id || 'Uji').replace(/[^A-Za-z0-9_-]/g, '_')
  const date = String(reportDate).replace(/[^0-9-]/g, '')
  return { fileName: 'LabSipil_' + code + '_' + date + '.xlsx', buffer }
}
