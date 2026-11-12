import { BINA_MARGA_2018_R2 } from './labSpecifications.js'
import { PENETRATION_GRADES, PENETRATION_PRECISION } from './asphaltPenetration.js'
import { addNote, addTable, formula, guarded, numeric } from './excelReportLayout.js'

const average = (values) => values.reduce((sum, value) => sum + value, 0) / values.length

export function writePenetration(ws, out, params) {
  if (!out.groupResults?.length) return false
  const groups = out.groupResults.map((group) => {
    const table = addTable(ws, group.groupName, ['Titik', 'Penetrasi (0,1 mm)'],
      group.pointsAnalysis.map((point) => [point.id, numeric(point.rawValue) ?? point.rawValue]),
      { inputs: [2], widths: [16, 22] })
    return { group, table }
  })
  const [temperature, load, time] = [params.suhuUji ?? 25, params.bebanJarum ?? 100, params.waktuPenetrasi ?? 5]
  const type = params.kelasAspal ?? '"pen6070"'
  const specLimit = (i) => Object.entries(PENETRATION_GRADES).reduceRight(
    (otherwise, [key, limits]) => `IF(${type}="${key}",${limits[i]},${otherwise})`, '0',
  )
  const lower = specLimit(0)
  const upper = specLimit(1)
  const precision = (cell) => PENETRATION_PRECISION.slice(0, -1).reduceRight(
    (otherwise, [, max, limit]) => `IF(ROUND(${cell},0)<=${max},${limit},${otherwise})`,
    PENETRATION_PRECISION.at(-1)[2],
  )
  addTable(ws, 'Rekap per kelompok • semua pembacaan', ['Kelompok', 'Bacaan sah', 'Rata-rata (0,1 mm)', 'Selisih (0,1 mm)', 'Batas selisih', 'Hasil bulat (0,1 mm)', 'Evaluasi'],
    groups.map(({ group, table }) => (r) => {
      const range = table.range(2)
      const total = group.pointsAnalysis.length
      const complete = total > 0 && group.n === total
      const valid = `AND(B${r}>0,B${r}=${total})`
      return [group.groupName,
        total ? formula(`COUNT(${range})-COUNTIF(${range},"<0")-COUNTIF(${range},">500")`, group.n) : 0,
        total ? guarded(valid, `AVERAGE(${range})`, complete ? group.meanInitial : null) : null,
        total ? guarded(`AND(${valid},B${r}>1)`, `MAX(${range})-MIN(${range})`, complete ? group.precisionGap : null) : null,
        guarded(`ISNUMBER(C${r})`, precision(`C${r}`), complete ? group.precisionLimit : null),
        guarded(`AND(B${r}>=3,COUNT(C${r},D${r},E${r})=3,D${r}<=E${r}+1E-9)`, `ROUND(C${r},0)`, group.reported),
        formula(`IF(OR(B${r}<3,B${r}<>${total}),"Lengkapi / periksa bacaan",IF(NOT(ISNUMBER(F${r})),"Ulangi uji",IF(NOT(AND(${temperature}=25,${load}=100,${time}=5)),"Kondisi uji berbeda",IF(${lower}=0,"Pilih kelas yang berlaku",IF(AND(F${r}>=${lower},F${r}<=${upper}),"Masuk rentang kelas","Di luar rentang kelas")))))`, group.evaluation)]
    }), { widths: [30, 14, 21, 18, 16, 20, 29] })
  addNote(ws, 'Evaluasi hasil penetrasi', `SNI 2456:2011 Tabel 2: laporkan rata-rata bulat dari ≥ 3 bacaan per kelompok dengan selisih dalam batas. Ulangi uji bila melebihi batas. Kelas mengacu pada SNI 8135:2015 pada 25 °C, 100 g, 5 s. Pen 60/70 juga tercantum pada Tipe I dalam Bina Marga 2018 Revisi 2: ${BINA_MARGA_2018_R2}`)
  return true
}

export function writeFlash(ws, inputs, params) {
  if (!inputs.samples?.length) return false
  const pressure = numeric(inputs.tekananK)
  const unit = inputs.tekananKUnit ?? (pressure > 300 ? 'mmHg' : 'kPa')
  const kpa = pressure > 0 ? pressure * (unit === 'mmHg' ? 0.13332237 : 1) : null
  const correction = kpa === null ? null : 0.25 * (101.3 - kpa)
  const pressureCell = params.tekananK ?? '""'
  const unitCell = params.tekananKUnit ?? `"${unit}"`
  const barometer = addTable(ws, 'Koreksi tekanan barometer', ['Parameter', 'Satuan', 'Nilai'], [
    ['Tekanan aktual', 'kPa', guarded(`AND(ISNUMBER(${pressureCell}),${pressureCell}>0,OR(${unitCell}="mmHg",${unitCell}="kPa"))`, `${pressureCell}*IF(${unitCell}="mmHg",0.13332237,1)`, kpa)],
    (r, first) => ['Koreksi 0,25 × (101,3 − P)', '°C', guarded(`ISNUMBER(C${first})`, `0.25*(101.3-C${first})`, correction)],
  ])
  const delta = barometer.ref(3, 1)
  const valid = []
  const table = addTable(ws, 'Cleveland Open Cup • pembacaan per sampel', ['Sampel', 'Nyala terukur (°C)', 'Bakar terukur (°C)', 'Nyala terkoreksi (°C)', 'Bakar terkoreksi (°C)'],
    inputs.samples.map((sample, i) => (r) => {
      const flash = numeric(sample.flashPoint)
      const fire = numeric(sample.firePoint)
      const paired = flash >= 79 && flash <= 400 && fire > flash && fire <= 400 && correction !== null
      const condition = `AND(COUNT(B${r}:C${r})=2,B${r}>=79,B${r}<=400,C${r}>B${r},C${r}<=400,ISNUMBER(${delta}))`
      if (paired) valid.push([flash, fire])
      return [sample.name || `Sampel ${i + 1}`, flash, fire,
        guarded(condition, `B${r}+${delta}`, paired ? flash + correction : null),
        guarded(condition, `C${r}+${delta}`, paired ? fire + correction : null)]
    }), { inputs: [2, 3], widths: [25, 20, 20, 22, 22] })
  const summary = addTable(ws, 'Rekap suhu terkoreksi', ['Parameter', 'Satuan', 'Nilai'], [
    ...[4, 5].map((col, i) => [i === 0 ? 'Titik nyala rata-rata' : 'Titik bakar rata-rata', '°C',
      guarded(`COUNT(${table.range(col)})=${inputs.samples.length}`, `AVERAGE(${table.range(col)})`, valid.length === inputs.samples.length ? average(valid.map((row) => row[i])) + correction : null)]),
    ...[2, 3].map((col, i) => [i === 0 ? 'Rentang bacaan nyala' : 'Rentang bacaan bakar', '°C',
      guarded(`COUNT(${table.range(col + 2)})=${inputs.samples.length}`, `MAX(${table.range(col)})-MIN(${table.range(col)})`,
        valid.length === inputs.samples.length ? Math.max(...valid.map((row) => row[i])) - Math.min(...valid.map((row) => row[i])) : null)]),
  ])
  const flash = summary.ref(3)
  const [flashSpread, fireSpread] = [summary.ref(3, 2), summary.ref(3, 3)]
  const allPaired = valid.length === inputs.samples.length
  const needsReview = [0, 1].some((i) => Math.max(...valid.map((row) => row[i])) - Math.min(...valid.map((row) => row[i])) > 8)
  const customThreshold = numeric(inputs.syaratNyalaMin)
  const threshold = customThreshold > 0 ? customThreshold : 232
  const thresholdCell = params.syaratNyalaMin
  const meanFlash = allPaired ? average(valid.map(([t]) => t)) + correction : null
  addTable(ws, 'Evaluasi titik nyala', ['Rerata bulat (°C)', 'Batas (°C)', 'Hasil'], [(r) => [
    guarded(`ISNUMBER(${flash})`, `ROUND(${flash},0)`, meanFlash === null ? null : Math.round(meanFlash)),
    thresholdCell ? formula(`IF(AND(ISNUMBER(${thresholdCell}),${thresholdCell}>0),${thresholdCell},232)`, threshold) : threshold,
    guarded(`ISNUMBER(${flash})`, `IF(MAX(${flashSpread},${fireSpread})>8,"Perlu Evaluasi",IF(${flash}>=B${r},"Mencapai batas","Di bawah batas"))`,
      allPaired ? needsReview ? 'Perlu Evaluasi' : meanFlash >= threshold ? 'Mencapai batas' : 'Di bawah batas' : null),
  ]])
  addNote(ws, 'Batas acuan', `Periksa pengulangan bila rentang nyala atau bakar melebihi 8 °C pada kondisi uji yang sama. Batas titik nyala Pen 60/70 adalah 232 °C. ${BINA_MARGA_2018_R2}`)
  return true
}

export function writeDuctility(ws, inputs, out, params) {
  if (!inputs.samples?.length) return false
  const scale = params.satuanInput ? `IF(${params.satuanInput}="mm",0.1,1)` : '1'
  const table = addTable(ws, 'Pembacaan daktilitas', ['Cetakan', 'Nilai input', 'Satuan input', 'Digunakan', 'Daktilitas (cm)'],
    inputs.samples.map((sample, i) => (r) => {
      const value = numeric(sample.value)
      const active = sample.isValid !== false
      return [sample.name || `Cetakan ${i + 1}`, value, params.satuanInput ? guarded(`ISTEXT(${params.satuanInput})`, params.satuanInput, inputs.satuanInput) : 'cm', active ? 'Ya' : 'Tidak',
        guarded(`AND(D${r}="Ya",ISNUMBER(B${r}),B${r}>0)`, `B${r}*${scale}`, active && value > 0 ? value * (inputs.satuanInput === 'mm' ? 0.1 : 1) : null)]
    }), { inputs: [2, 4], widths: [30, 17, 17, 17, 17] })
  const range = table.range(5)
  const type = params.kelasAspal ?? '"pen6070"'
  addTable(ws, 'Rekap cetakan aktif', ['Parameter', 'Satuan', 'Nilai'], [
    ['Jumlah hasil', '', guarded('TRUE', `COUNT(${range})`, out.nValid ?? 0)],
    ['Daktilitas rata-rata', 'cm', guarded(`COUNT(${range})>0`, `AVERAGE(${range})`, out.dRata)],
    ['Simpangan baku', 'cm', guarded(`COUNT(${range})>1`, `STDEV(${range})`, out.nValid > 1 ? out.sd : null)],
    ['Batas Pen 60/70 pada 25 °C', 'cm', guarded(`${type}="pen6070"`, '100', (inputs.kelasAspal ?? 'pen6070') === 'pen6070' ? 100 : null)],
    (r, first) => ['Evaluasi rerata tiga benda uji', '', formula(
      `IF(C${first}<>3,"Perlu tiga benda uji",IF(C${first + 2}>0.15*C${first + 1},"Perlu Evaluasi",IF(NOT(ISNUMBER(C${first + 3})),"Dilaporkan",IF(C${first + 1}>=C${first + 3},"Mencapai batas Pen 60/70","Di bawah batas Pen 60/70"))))`,
      out.nValid !== 3 ? 'Perlu tiga benda uji' : out.cv > 15 ? 'Perlu Evaluasi' : (inputs.kelasAspal ?? 'pen6070') !== 'pen6070' ? 'Dilaporkan' : out.status,
    )],
  ])
  addNote(ws, 'Acuan', `Pelaporan SNI 2432:2011 memakai tiga benda uji. Batas Pen 60/70 ≥ 100 cm pada 25 °C. Tabel 6.3.2.5 tidak menetapkan batas ini untuk aspal modifikasi segar. ${BINA_MARGA_2018_R2}`)
  return true
}

export function writeViscosity(ws, inputs, out, params, charts) {
  const points = out.points
  if (!points?.length) return false
  const method = params.metodeKonversi ?? '"astm"'
  const table = addTable(ws, 'Pengamatan Saybolt Furol', ['Suhu (°C)', 'Waktu (SFS)', 'ν estimasi (cSt)', 'log₁₀ ν', 'Periksa tren'],
    [...points].sort((a, b) => a.t - b.t).map((point) => (r, first) => [point.t, point.w,
      guarded(`AND(COUNT(A${r}:B${r})=2,A${r}>0,B${r}>0)`, `IF(${method}="modul",2*B${r},IF(${method}="pendekatan",2.16*B${r},IF(B${r}>40,2.16*B${r}-60/B${r},IF(B${r}>25,2.24*B${r}-184/B${r},2.16*B${r}))))`, point.v),
      guarded(`AND(ISNUMBER(C${r}),C${r}>0)`, `LOG10(C${r})`, point.y),
      guarded(`ISNUMBER(D${r})`, `IF(COUNTIFS(A$${first}:A$${first + points.length - 1},"<"&A${r},C$${first}:C$${first + points.length - 1},">0",C$${first}:C$${first + points.length - 1},"<"&C${r})>0,"Naik","")`,
        points.some((other) => other.t < point.t && other.v < point.v) ? 'Naik' : null),
    ]), { inputs: [1, 2], widths: [18, 18, 22, 17, 17] })
  const temp = table.range(1)
  const logV = table.range(4)
  const canFit = `AND(COUNT(${logV})=${points.length},COUNT(${logV})>=2,MAX(${temp})>MIN(${temp}))`
  const usable = (first) => `AND(COUNT(C${first}:C${first + 2})=3,C${first + 1}<-1E-9,C${first + 2}>=0.95,MIN(${temp})>=120,MAX(${temp})<=240,COUNTIF(${table.range(5)},"Naik")=0)`
  const fit = addTable(ws, 'Model log₁₀ ν = a + b·T', ['Parameter', 'Satuan', 'Nilai'], [
    ['Intersep a', '', guarded(canFit, `INTERCEPT(${logV},${temp})`, out.a)],
    ['Kemiringan b', '1/°C', guarded(canFit, `SLOPE(${logV},${temp})`, out.b)],
    ['R²', '', guarded(`AND(${canFit},MAX(${logV})>MIN(${logV}))`, `RSQ(${logV},${temp})`, out.r2)],
    (r, first) => ['ν pada 135 °C (estimasi)', 'cSt', guarded(`AND(${usable(first)},MIN(${temp})<=135,MAX(${temp})>=135)`, `10^(C${first}+C${first + 1}*135)`, out.v135)],
  ])
  const [a, b] = [fit.ref(3), fit.ref(3, 1)]
  const targets = addTable(ws, 'Suhu kerja dari target viskositas', ['Proses', 'Target (cSt)', 'Suhu estimasi (°C)', 'Rentang pengamatan'], [
    ['Campur • ν maksimum', out.vMixMax, out.tMixMin], ['Campur • ν minimum', out.vMixMin, out.tMixMax],
    ['Padat • ν maksimum', out.vCompMax, out.tCompMin], ['Padat • ν minimum', out.vCompMin, out.tCompMax],
  ].map(([label, viscosity, temperature], i) => (r, first) => {
    const [low, high] = (i < 2 ? ['vMixMin', 'vMixMax'] : ['vCompMin', 'vCompMax']).map((key) => params[key])
    const target = inputs.standarTarget === 'custom' && low && high
      ? guarded(`AND(COUNT(${low},${high})=2,MIN(${low},${high})>0)`, `${i % 2 ? 'MIN' : 'MAX'}(${low},${high})`, viscosity) : viscosity
    const pair = first + 2 * Math.floor(i / 2)
    const start = `(LOG10(B${pair})-${a})/${b}`
    const end = `(LOG10(B${pair + 1})-${a})/${b}`
    const condition = `IF(AND(${usable(fit.first)},COUNT(B${pair}:B${pair + 1})=2,MIN(B${pair}:B${pair + 1})>0),AND(${start}>=MIN(${temp})-1E-9,${end}<=MAX(${temp})+1E-9),FALSE)`
    return [label, target, guarded(condition, `(LOG10(B${r})-${a})/${b}`, temperature),
      formula(`IF(ISNUMBER(C${r}),"Interpolasi","Perlu Evaluasi")`, temperature === null ? 'Perlu Evaluasi' : 'Interpolasi')]
  }), { widths: [30, 17, 21, 22] })

  const range = out.viscosityChart.chartPoints
  const graph = addTable(ws, 'Kurva model dan batas proses', ['Suhu (°C)', 'Regresi (cSt)', 'Campur bawah', 'Campur atas', 'Padat bawah', 'Padat atas'],
    range.map((point) => (r) => [point.temp, guarded(`COUNT(${a},${b})=2`, `10^(${a}+${b}*A${r})`, 10 ** (out.a + out.b * point.temp)),
      ...[1, 0, 3, 2].map((index) => guarded(`ISNUMBER(${targets.ref(2, index)})`, targets.ref(2, index), [out.vMixMax, out.vMixMin, out.vCompMax, out.vCompMin][index]))]))
  addNote(ws, 'Metode dan batas model', `Konversi SFS→cSt dan suhu kerja merupakan estimasi. Tabel Bina Marga 6.3.2.5 menggunakan hasil uji viskositas kinematik ASTM D2170 untuk evaluasi 135 °C. ${BINA_MARGA_2018_R2}`)
  charts.push({ name: 'Saybolt Furol • suhu dan viskositas kinematik', x: { label: 'Temperatur (°C)' }, y: { label: 'Viskositas estimasi (cSt) • logaritmik', log: true }, series: [
    { table, x: 1, y: 3, name: 'Titik uji', line: false },
    { table: graph, x: 1, y: 2, name: 'Kurva regresi', markers: false },
    ...[[3, 'Campur bawah', '16A34A'], [4, 'Campur atas', '16A34A'], [5, 'Padat bawah', 'EA580C'], [6, 'Padat atas', 'EA580C']]
      .map(([y, name, color]) => ({ table: graph, x: 1, y, name, color, dashed: true, markers: false })),
  ] })
  return true
}
