import { cptDepthScale, CPT_STANDARD } from './cptProfile.js'
import { PROCTOR_EXAMPLE_SOURCE } from './soilCompaction.js'
import { SOIL_GS_FACTORS, SOIL_GS_SOURCE, soilGsTemperatureFactor } from './soilSpecificGravity.js'
import { addNote, addTable, formula, guarded, numeric } from './excelReportLayout.js'

const percentage = { label: 'Persen lolos (%)', min: 0, max: 100, step: 20 }
const reference = { color: '16A34A', dashed: true, markers: false }

export function writeCpt(ws, inputs, out, params, charts) {
  const readings = out.cptRows ?? []
  if (!readings.length) return false
  const profile = Array.isArray(inputs.cptRows)
  const [ap, ac, as] = ['pistonArea', 'coneArea', 'sleeveArea'].map((key) => params[key])
  const validAreas = `AND(COUNT(${ap},${ac},${as})=3,MIN(${ap},${ac},${as})>0)`
  const table = addTable(ws, 'Pembacaan dan perhitungan sondir',
    ['Kedalaman (m)', 'Cw (kgf/cm²)', 'Tw (kgf/cm²)', 'Tw − Cw (kgf/cm²)', 'qc (kgf/cm²)', 'fs (kgf/cm²)', 'Interval (cm)', 'Δ JHP (kgf/cm)', 'JHP (kgf/cm)', 'Rf (%)'],
    readings.map((point, i) => (r, first) => {
      const previous = i ? `A${r - 1}` : '0'
      const ascending = i ? `OR(NOT(ISNUMBER(${previous})),${previous}<0,A${r}>${previous})` : 'TRUE'
      const valid = `AND(COUNT(A${r}:C${r})=3,A${r}>0,B${r}>=0,C${r}>=B${r},${ascending},${validAreas})`
      const surface = i === 0 ? `AND(COUNT(A${r}:C${r})=3,SUM(A${r}:C${r})=0,A${r}=0,B${r}=0,C${r}=0,${validAreas})` : 'FALSE'
      return [
        point.depth, point.cw, point.tw,
        guarded(valid, `C${r}-B${r}`, point.friction),
        guarded(`ISNUMBER(D${r})`, `B${r}*${ap}/${ac}`, point.qc),
        guarded(`ISNUMBER(D${r})`, `D${r}*${ap}/${as}`, point.fs),
        profile ? guarded(`AND(ISNUMBER(F${r}),ISNUMBER(${previous}),${previous}>=0)`, `(A${r}-${previous})*100`, point.interval) : null,
        profile ? formula(`IF(${surface},0,IF(COUNT(F${r}:G${r})=2,F${r}*G${r},""))`, point.deltaJhp) : null,
        profile ? guarded(`COUNT(H${first}:H${r})=${i + 1}`, `SUM(H${first}:H${r})`, point.jumlahHambatanPelekat) : null,
        guarded(`AND(COUNT(E${r}:F${r})=2,E${r}>0)`, `100*F${r}/E${r}`, point.frictionRatio),
      ]
    }), { inputs: [1, 2, 3], widths: [17, 16, 16, 17, 16, 16, 15, 17, 17, 12],
      formats: ['0.00', '0.00', '0.00', '0.00', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00'] })
  addNote(ws, 'Pembacaan dan kalibrasi', `Cw dan Tw adalah pembacaan manometer. Masukkan luas alat yang sesuai. Rf tidak dihitung jika qc nol. JHP memakai jarak pembacaan dalam cm dan tidak dihitung pada arsip satu titik. Interval nominal 20 cm. ${CPT_STANDARD}`)
  const y = { label: 'Kedalaman (m)', reverse: true, min: 0, ...cptDepthScale(out.chartData), format: '0.0' }
  const chartTable = readings[0].surface ? { ...table, first: table.first + 1 } : table
  for (const [col, label, color] of [
    [5, 'Perlawanan konus qc (kgf/cm²)', '2563EB'],
    [6, 'Geser lokal fs (kgf/cm²)', 'EA580C'],
    [10, 'Angka banding geser Rf (%)', '16A34A'],
    [9, 'JHP kumulatif (kgf/cm)', 'B45309'],
  ]) {
    charts.push({ name: `Profil sondir: ${label}`, x: { label, min: 0 }, y, series: [{ table: chartTable, x: col, y: 1, name: label, color }] })
  }
  return true
}

export function writeCasagrande(ws, inputs, out, charts) {
  if (!inputs.samples?.length) return false
  const readings = [...inputs.samples].sort((a, b) => Number(a.n) - Number(b.n))
  const validPoints = []
  const table = addTable(ws, 'Titik pengamatan Casagrande', ['Titik', 'Ketukan N', 'Cawan (g)', 'Basah + cawan (g)', 'Kering + cawan (g)', 'Kadar air (%)', 'log₁₀ N', 'N berbeda'],
    readings.map((point) => (r, first) => {
      const [n, w1, w2, w3] = [point.n, point.w1, point.w2, point.w3].map(numeric)
      const valid = Number.isInteger(n) && n > 0 && w1 > 0 && w3 > w1 && w2 > w3
      const w = valid ? (w2 - w3) / (w3 - w1) * 100 : null
      const firstOfCount = valid && !validPoints.some((point) => point.n === n)
      if (valid) validPoints.push({ n, w })
      return [point.name, n, w1, w2, w3,
        guarded(`AND(COUNT(B${r}:E${r})=4,B${r}=INT(B${r}),B${r}>0,C${r}>0,E${r}>C${r},D${r}>E${r})`, `100*(D${r}-E${r})/(E${r}-C${r})`, w),
        guarded(`ISNUMBER(F${r})`, `LOG10(B${r})`, valid ? Math.log10(n) : null),
        guarded(`ISNUMBER(F${r})`, `IF(COUNTIF(B$${first}:B${r},B${r})=1,1,0)`, valid ? Number(firstOfCount) : null)]
    }), { inputs: [2, 3, 4, 5], widths: [28, 14, 17, 20, 20, 17, 17, 14] })

  const n = table.range(2)
  const water = table.range(6)
  const logN = table.range(7)
  const minN = validPoints[0]?.n
  const maxN = validPoints.at(-1)?.n
  const regress = validPoints.length >= 2 && maxN > minN
  const fit = `AND(COUNT(${water})>=2,MAX(${logN})>MIN(${logN}))`
  const slope = out.regressionSlope ?? null
  const intercept = out.regressionIntercept ?? null
  const summary = addTable(ws, 'Regresi semi-logaritmik', ['Parameter', 'Satuan', 'Nilai'], [
    ['Kemiringan b', '', guarded(fit, `SLOPE(${water},${logN})`, slope)],
    ['Intersep a', '%', guarded(fit, `INTERCEPT(${water},${logN})`, intercept)],
    ['Koefisien determinasi R²', '', guarded(`AND(${fit},MAX(${water})>MIN(${water}))`, `RSQ(${water},${logN})`, regress ? numeric(out.r2) : null)],
    ['Batas cair pada 25 ketukan', '%', null],
    ['Indeks aliran |b|', '', null],
    (r, first) => ['LL untuk pelaporan', '%', guarded(`ISNUMBER(C${first + 3})`, `ROUND(C${first + 3},0)`, out.llValue == null ? null : Math.round(out.llValue))],
  ])
  const b = summary.ref(3)
  const a = summary.ref(3, 1)
  const ll = summary.ref(3, 3)
  const llValid = out.llValue != null
  const r2 = summary.ref(3, 2)
  ws.getCell(ll).value = guarded(`AND(COUNT(${water})=${readings.length},SUM(${table.range(8)})>=3,MIN(${n})>=15,MIN(${n})<25,MAX(${n})<=35,MAX(${n})>25,COUNT(${b},${r2})=2,${b}<0,${r2}>=0.95)`, `${a}+${b}*LOG10(25)`, out.llValue)
  ws.getCell(summary.ref(3, 4)).value = guarded(`ISNUMBER(${b})`, `ABS(${b})`, regress ? Math.abs(slope) : null)

  const curve = addTable(ws, 'Titik kurva regresi dan acuan', ['Ketukan N', 'Garis regresi (%)', 'LL (%)'], [
    ['Minimum', minN], ['N = 25', 25], ['Maksimum', maxN],
  ].map(([label, value], i) => [
    i === 0 ? guarded(`COUNT(${n})>0`, `MIN(${n})`, value) : i === 2 ? guarded(`COUNT(${n})>0`, `MAX(${n})`, value) : 25,
    guarded(`ISNUMBER(${b})`, `${a}+${b}*LOG10(${i === 0 ? `MIN(${n})` : i === 2 ? `MAX(${n})` : '25'})`, regress && value > 0 ? intercept + slope * Math.log10(value) : null),
    label === 'N = 25' ? guarded(`ISNUMBER(${ll})`, ll, llValid ? out.llValue : null) : null,
  ]))
  addNote(ws, 'Acuan multipoint', 'Gunakan sedikitnya tiga titik berbeda dalam rentang 15–35 ketukan, mengapit 25 ketukan. R² ≥ 0,95 adalah cek mutu kurva praktikum. Kadar air berbasis massa kering dan dapat melebihi 100%.')
  charts.push({ name: 'Kurva aliran Casagrande', x: { label: 'Jumlah ketukan N • logaritmik', log: true }, y: { label: 'Kadar air basis kering (%)' },
    series: [{ table, x: 2, y: 6, name: 'Titik uji', line: false }, { table: curve, x: 1, y: 2, name: 'Regresi semi-log', ...reference }, { table: curve, x: 1, y: 3, name: 'LL pada N=25', color: 'EA580C', line: false }] })
  return true
}

export function writeProctor(ws, out, charts) {
  const samples = out.proctorSamples
  if (!samples?.length) return false
  const ordered = [...samples].sort((a, b) => a.avgW - b.avgW)
  const containers = ordered.flatMap((sample) => sample.containers.map((c) => ({ ...c, sample: sample.name })))
  const moisture = addTable(ws, 'Kontainer penentuan kadar air', ['Benda uji', 'Kontainer', 'M₁ kosong (g)', 'M₂ basah (g)', 'M₃ kering (g)', 'Kadar air (%)'],
    containers.map((c) => (r) => [c.sample, c.label, c.m1, c.m2, c.m3,
      guarded(`AND(COUNT(C${r}:E${r})=3,C${r}>=0,E${r}>C${r},D${r}>=E${r})`, `100*(D${r}-E${r})/(E${r}-C${r})`, c.isInvalid || c.m3 <= c.m1 ? null : c.wPct)]),
    { inputs: [3, 4, 5], widths: [30, 22] })
  let containerIndex = 0
  const table = addTable(ws, 'Rekap kepadatan dan garis tanpa rongga udara',
    ['Benda uji', 'Diameter (cm)', 'Tinggi (cm)', 'Massa bersih lama', 'Gs', 'Volume (cm³)', 'Massa basah (g)', 'Kadar air (%)', 'ρ basah (g/cm³)', 'ρ kering (g/cm³)', 'ZAV (g/cm³)', 'Cek fisik', 'Cetakan kosong (g)', 'Cetakan + tanah (g)'],
    ordered.map((s) => (r) => {
      const start = containerIndex
      containerIndex += s.containers.length
      const range = s.containers.length ? `${moisture.ref(6, start)}:${moisture.ref(6, containerIndex - 1)}` : null
      return [s.name, s.diameterMold, s.heightMold, s.massMoldSoil, s.gs,
        guarded(`AND(COUNT(B${r}:C${r})=2,MIN(B${r}:C${r})>0)`, `PI()*B${r}^2*C${r}/4`, s.volumeMold),
        s.separateTare ? guarded(`AND(COUNT(M${r}:N${r})=2,M${r}>0,N${r}>M${r})`, `N${r}-M${r}`, s.massSoilGram)
          : guarded(`AND(ISNUMBER(D${r}),D${r}>0)`, `IF(D${r}<10,1000*D${r},D${r})`, s.massSoilGram),
        range ? guarded(`COUNT(${range})=${s.containers.length}`, `AVERAGE(${range})`, s.avgW) : null,
        guarded(`COUNT(F${r}:G${r})=2`, `G${r}/F${r}`, s.gammaWet > 0 ? s.gammaWet : null),
        guarded(`COUNT(H${r}:I${r})=2`, `I${r}/(1+H${r}/100)`, s.gammaDry),
        guarded(`AND(ISNUMBER(H${r}),ISNUMBER(E${r}),E${r}>0)`, `E${r}/(1+H${r}/100*E${r})`, s.gammaZav),
        guarded(`COUNT(J${r}:K${r})=2`, `IF(J${r}>K${r}+1E-9,"Di atas ZAV","Di bawah / pada ZAV")`,
          s.gammaDry === null || s.gammaZav === null ? null : s.aboveZav ? 'Di atas ZAV' : 'Di bawah / pada ZAV'),
        s.moldTare, s.moldWithSoil]
    }), { inputs: [2, 3, 4, 5, 13, 14], widths: [30, 16, 16, 19, 12, 17, 18, 17, 19, 19, 17, 24, 20, 22] })
  addTable(ws, 'Puncak dari evaluasi kurva LabSipil saat ekspor', ['Parameter', 'Satuan', 'Nilai'], [
    ['Kerapatan kering maksimum (MDD)', 'g/cm³', out.mdd],
    ['Kadar air optimum (OMC)', '%', out.omc],
  ])
  addNote(ws, 'Kondisi pembacaan', `Massa basah adalah massa tanah bersih dalam gram. Kolom massa bersih lama mempertahankan konversi data lama di bawah 10 dari kg. Puncak ditahan jika data melewati ZAV atau puncak belum terapit. Setelah mengedit data, hitung ulang puncak di LabSipil. Acuan contoh kurva: ${PROCTOR_EXAMPLE_SOURCE}`)
  charts.push({ name: 'Pemadatan Proctor • kadar air dan kerapatan kering', x: { label: 'Kadar air (%)' }, y: { label: 'Kerapatan (g/cm³)' },
    series: [{ table, x: 8, y: 10, name: 'Kerapatan kering terukur' }, { table, x: 8, y: 11, name: 'Tanpa rongga udara (ZAV)', ...reference }] })
  return true
}

export function writeSoilWaterContent(ws, out, params, plastic) {
  const rows = out.soilWaterRows
  if (!rows?.length) return false
  const table = addTable(ws, 'Massa cawan dan kadar air', ['Cawan', 'Kosong (g)', 'Basah + cawan (g)', 'Kering + cawan (g)', 'Massa air (g)', 'Tanah kering (g)', 'Kadar air (%)'],
    rows.map((row) => (r) => {
      const valid = `AND(COUNT(B${r}:D${r})=3,B${r}>=0,D${r}>B${r},C${r}>=D${r})`
      return [row.name, row.w1, row.w2, row.w3, guarded(valid, `C${r}-D${r}`, row.ww),
        guarded(valid, `D${r}-B${r}`, row.ws), guarded(valid, `100*E${r}/F${r}`, row.w)]
    }), { inputs: [2, 3, 4] })
  const water = table.range(7)
  const ll = params.ll ?? '""'
  addTable(ws, 'Rekap kadar air', ['Parameter', 'Satuan', 'Nilai'], [
    ['Kadar air rata-rata', '%', guarded(`COUNT(${water})=${rows.length}`, `AVERAGE(${water})`, out.soilMoisture)],
    ...(plastic ? [
      (r, first) => ['PL untuk pelaporan', '%', guarded(`ISNUMBER(C${first})`, `ROUND(C${first},0)`, out.soilPlasticLimit)],
      (r, first) => ['PI untuk pelaporan', '', guarded(`AND(ISNUMBER(C${first + 1}),ISNUMBER(${ll}),${ll}>0)`,
        `IF(ROUND(${ll},0)>C${first + 1},ROUND(${ll},0)-C${first + 1},"NP")`, out.soilPlasticityIndex === '—' ? null : numeric(out.soilPlasticityIndex) ?? out.soilPlasticityIndex)],
    ] : []),
  ])
  return true
}

export function writeSoilSpecificGravity(ws, inputs, out, params) {
  const rows = out.soilGsRows
  if (!rows?.length) return false
  const temp = params.temp ?? '20'
  const factors = `{${SOIL_GS_FACTORS.join(',')}}`
  const lower = `INDEX(${factors},1,INT(${temp})-17)`
  const upper = `INDEX(${factors},1,ROUNDUP(${temp},0)-17)`
  const factor = addTable(ws, 'Koreksi suhu berat jenis', ['Parameter', 'Nilai'], [
    ['Faktor K ke 20 °C', guarded(`AND(ISNUMBER(${temp}),${temp}>=18,${temp}<=30)`,
      `${lower}+(${temp}-INT(${temp}))*(${upper}-${lower})`, soilGsTemperatureFactor(Object.hasOwn(inputs, 'temp') ? inputs.temp : 20))],
  ]).ref(2)
  const table = addTable(ws, 'Penimbangan piknometer', ['Piknometer', 'W₁ (g)', 'W₂ (g)', 'W₃ (g)', 'W₄ (g)', 'Massa tanah (g)', 'Air terdesak (g)', 'Gs pada T', 'Gs pada 20 °C'],
    rows.map((row) => (r) => [row.name, row.w1, row.w2, row.w3, row.w4,
      guarded(`AND(COUNT(B${r}:C${r})=2,B${r}>0,C${r}>B${r})`, `C${r}-B${r}`, row.ws),
      guarded(`AND(COUNT(D${r}:F${r})=3,D${r}>C${r},E${r}>B${r},F${r}+E${r}>D${r})`, `F${r}+E${r}-D${r}`, row.displaced),
      guarded(`ISNUMBER(G${r})`, `F${r}/G${r}`, row.measured),
      guarded(`COUNT(H${r},${factor})=2`, `H${r}*${factor}`, row.gs)]),
    { inputs: [2, 3, 4, 5] })
  const range = table.range(9)
  addTable(ws, 'Rata-rata hasil piknometer', ['Parameter', 'Nilai'], [
    ['Rata-rata Gs pada 20 °C', guarded(`COUNT(${range})=${rows.length}`, `AVERAGE(${range})`, out.soilGsAverage)],
  ])
  addNote(ws, 'Acuan SNI 1964:2008', `W₃ dan W₄ memakai suhu yang sama. Koreksi berdasarkan Tabel 1 dengan interpolasi linier antarsuhu. ${SOIL_GS_SOURCE}`)
  return true
}

export function writeSoilSieves(ws, out, params, charts) {
  const sieves = out.calculatedSieves
  if (!sieves?.length) return false
  const mass = params.wTotal ?? '0'
  const data = [...sieves, ...(out.calculatedPan ? [out.calculatedPan] : [])]
  const table = addTable(ws, 'Gradasi tanah • penimbangan dan distribusi', ['Ayakan', 'Diameter (mm)', 'Tertahan (g)', 'Tertahan (%)', 'Kumulatif (%)', 'Lolos (%)'],
    data.map((sieve) => (r, first) => {
      const valid = `AND(ISNUMBER(${mass}),${mass}>0,ISNUMBER(C${r}),C${r}>=0)`
      const range = `C${first}:C${r}`
      return [sieve.sieveNo, sieve.isPan ? null : sieve.diameter, sieve.retainedWeight,
        guarded(valid, `100*C${r}/${mass}`, sieve.retainedPct),
        guarded(`AND(${valid},COUNT(${range})=${r - first + 1},MIN(${range})>=0)`, `100*SUM(${range})/${mass}`, sieve.cumRetainedPct),
        sieve.isPan ? null : guarded(`ISNUMBER(E${r})`, `MAX(0,100-E${r})`, sieve.cumPassingPct)]
    }), { inputs: [3] })

  const last = table.first + sieves.length - 1
  const passing = `F${table.first}:F${last}`
  const diameter = `B${table.first}:B${last}`
  const diameters = addTable(ws, 'Diameter efektif • interpolasi logaritmik', ['Target lolos (%)', 'Baris atas', 'Diameter (mm)'],
    [[10, out.d10], [30, out.d30], [60, out.d60]].map(([target, cached]) => (r) => {
      const bracket = sieves.findLastIndex((sieve) => sieve.cumPassingPct >= target)
      const index = `B${r}`
      const upper = `INDEX(${passing},${index})`
      const lower = `INDEX(${passing},${index}+1)`
      const d1 = `INDEX(${diameter},${index})`
      const d2 = `INDEX(${diameter},${index}+1)`
      const bracketed = target <= sieves[0].cumPassingPct && target >= sieves.at(-1).cumPassingPct
      return [target, guarded(`AND(COUNT(${passing})=${sieves.length},A${r}>=MIN(${passing}),A${r}<=MAX(${passing}))`, `MATCH(A${r},${passing},-1)`, bracketed ? bracket + 1 : null),
        guarded(`ISNUMBER(${index})`, `IF(ABS(${upper}-A${r})<1E-9,${d1},10^(LOG10(${d1})+(A${r}-${upper})/(${lower}-${upper})*(LOG10(${d2})-LOG10(${d1}))))`, bracketed ? cached : null)]
    }), { widths: [23, 15, 18] })
  const [d10, d30, d60] = [0, 1, 2].map((i) => diameters.ref(3, i))
  const grams = table.range(3)
  const n4 = sieves.findIndex((s) => Math.abs(s.diameter - 4.75) < 0.001)
  const n200 = sieves.findIndex((s) => Math.abs(s.diameter - 0.075) < 0.0001)
  addTable(ws, 'Neraca massa dan parameter gradasi', ['Parameter', 'Satuan', 'Nilai'], [
    ['Total tertahan + pan', 'g', guarded(`COUNT(${grams})=${data.length}`, `SUM(${grams})`, out.totalWithPan)],
    ['Selisih massa absolut', 'g', guarded(`AND(${mass}>0,COUNT(${grams})=${data.length})`, `ABS(${mass}-SUM(${grams}))`, out.massLoss)],
    ['Selisih terhadap massa awal', '%', guarded(`AND(${mass}>0,COUNT(${grams})=${data.length})`, `100*ABS(${mass}-SUM(${grams}))/${mass}`, out.massLossPct)],
    ['Kerikil tertahan No. 4', '%', n4 < 0 ? null : guarded(`ISNUMBER(${table.ref(6, n4)})`, `100-${table.ref(6, n4)}`, out.gravelPct)],
    ['Butiran lolos No. 200', '%', n200 < 0 ? null : guarded(`ISNUMBER(${table.ref(6, n200)})`, table.ref(6, n200), out.finesPct)],
    ['Koefisien keseragaman Cu', '', guarded(`AND(COUNT(${d10},${d60})=2,${d10}>0)`, `${d60}/${d10}`, out.d10 >= sieves.at(-1).diameter ? out.cu : null)],
    ['Koefisien kelengkungan Cc', '', guarded(`AND(COUNT(${d10},${d30},${d60})=3,MIN(${d10},${d60})>0)`, `${d30}^2/(${d10}*${d60})`, out.d10 >= sieves.at(-1).diameter ? out.cc : null)],
  ])
  addNote(ws, 'Batas interpretasi', 'D10, D30, dan D60 hanya diperoleh di antara titik ukur. Pan tidak memiliki diameter. USCS untuk material dengan butir halus memerlukan data plastisitas. Terapkan toleransi selisih massa yang dipersyaratkan metode atau laboratorium.')
  charts.push({ name: 'Kurva distribusi ukuran butir tanah', x: { label: 'Diameter ayakan (mm) • logaritmik', log: true }, y: percentage,
    series: [{ table: { ...table, last }, x: 2, y: 6, name: 'Lolos aktual' }] })
  return true
}

export function writeDirectShear(ws, inputs, out, params, charts) {
  const points = out.computedPoints
  if (!points?.length) return false
  const fromDial = inputs.shearInputMode === 'dial'
  const calibration = params.shearCalibration ?? '""'
  const table = addTable(ws, 'Tegangan normal dan tegangan geser puncak',
    ['Titik', 'Luas (cm²)', 'Beban normal (kgf)', 'Gaya geser (kgf)', 'σ (kgf/cm²)', 'τ (kgf/cm²)', 'σ (kPa)', 'τ (kPa)', 'Bacaan puncak (div)', 'Tingkat σ berbeda'],
    points.map((p, i) => (r, first) => [
      p.pointNum, p.area, p.normalLoad,
      fromDial ? guarded(`AND(COUNT(I${r},${calibration})=2,MIN(I${r},${calibration})>0)`, `I${r}*${calibration}`, p.shearForce) : p.shearForce,
      p.raw ? guarded(`AND(COUNT(B${r}:C${r})=2,MIN(B${r}:C${r})>0)`, `C${r}/B${r}`, p.sigma) : p.sigma,
      p.raw ? guarded(`AND(COUNT(B${r},D${r})=2,MIN(B${r},D${r})>0)`, `D${r}/B${r}`, p.tau) : p.tau,
      guarded(`ISNUMBER(E${r})`, `98.0665*E${r}`, p.sigma === null ? null : p.sigma * 98.0665),
      guarded(`ISNUMBER(F${r})`, `98.0665*F${r}`, p.tau === null ? null : p.tau * 98.0665),
      p.dial, guarded(`ISNUMBER(E${r})`, `--(COUNTIF(E$${first}:E${r},E${r})=1)`,
        p.sigma === null ? null : Number(!points.slice(0, i).some((previous) => previous.sigma === p.sigma))),
    ]), { inputs: fromDial ? [2, 3, 9] : [2, 3, 4, 5, 6], widths: [13, 17, 21, 19, 18, 18, 17, 17, 23, 20] })
  const sigma = table.range(5)
  const tau = table.range(6)
  const valid = `AND(COUNT(${sigma})=${points.length},COUNT(${tau})=${points.length},SUM(${table.range(10)})>=3,MIN(${sigma},${tau})>0)`
  const fit = out.shearFit
  const summary = addTable(ws, 'Selubung keruntuhan Mohr–Coulomb', ['Parameter', 'Satuan', 'Nilai'], [
    ['Kemiringan tan φ', '', guarded(valid, `SLOPE(${tau},${sigma})`, fit?.slope)],
    ['Intersep regresi c', 'kgf/cm²', guarded(valid, `INTERCEPT(${tau},${sigma})`, fit?.c)],
    ['Sudut geser φ', '°', guarded(valid, `DEGREES(ATAN(SLOPE(${tau},${sigma})))`, fit?.phiDeg)],
    ['R²', '', guarded(valid, `IF(MAX(${tau})=MIN(${tau}),1,RSQ(${tau},${sigma}))`, fit?.r2)],
  ])
  const slope = summary.ref(3)
  const c = summary.ref(3, 1)
  const maxSigma = Math.max(0, ...points.map((point) => point.sigma)) || null
  const line = addTable(ws, 'Garis regresi', ['σ (kgf/cm²)', 'τ estimasi (kgf/cm²)'], [
    [0, guarded(`ISNUMBER(${c})`, c, fit?.c)],
    (r) => [guarded(`COUNT(${sigma})>0`, `MAX(${sigma})`, maxSigma),
      guarded(`COUNT(${slope},${c},A${r})=3`, `${c}+${slope}*A${r}`, fit && maxSigma !== null ? fit.c + fit.slope * maxSigma : null)],
  ])
  charts.push({ name: 'Kuat geser langsung • σ dan τ', x: { label: 'Tegangan normal σ (kgf/cm²)' }, y: { label: 'Tegangan geser τ (kgf/cm²)' },
    series: [{ table, x: 5, y: 6, name: 'Titik uji', line: false }, { table: line, x: 1, y: 2, name: 'Regresi Mohr–Coulomb', ...reference }] })
  return true
}

export function writeOedometer(ws, inputs, out, params, charts) {
  const readings = out.sortedReadings
  if (!readings?.length) return false
  const table = addTable(ws, 'Pembacaan penurunan konsolidasi', ['Waktu (menit)', 'Tinggi (cm)', 'Penurunan (cm)', '√t (√menit)', 'Selisih dari garis Taylor (cm)', 'Titik potong pada segmen (√menit)'],
    readings.map((reading) => (r, first) => {
      const raw = inputs.oedometerReadings?.find((item) => item.id === reading.id)
      const hasHeight = numeric(raw?.h) !== null
      const h0 = r === first ? params.h0 ?? '""' : `$B$${first}`
      const height = hasHeight ? numeric(raw.h) : r === first ? guarded(`ISNUMBER(${h0})`, h0, reading.h)
        : guarded(`AND(COUNT(C${r},${h0})=2,C${r}>=0,${h0}>C${r})`, `${h0}-C${r}`, reading.h)
      const settlement = hasHeight || r === first
        ? guarded(`AND(COUNT(B${r},$B$${first})=2,B${r}>0,$B$${first}>=B${r})`, `$B$${first}-B${r}`, reading.deltaH)
        : numeric(raw?.deltaH)
      return [reading.t, height, settlement, guarded(`AND(ISNUMBER(A${r}),A${r}>=0)`, `SQRT(A${r})`, reading.sqrtT)]
    }), { inputs: [1, 2, 3], widths: [21, 17, 19, 21, 19, 20] })
  const [hFirst, hLast] = [table.ref(2), table.ref(2, readings.length - 1)]
  const section = addTable(ws, 'Hasil pengolahan Taylor', ['Parameter', 'Satuan', 'Nilai'], [
    ['Jalur drainase ganda Hdr', 'cm', guarded(`AND(COUNT(${hFirst},${hLast})=2,MIN(${hFirst},${hLast})>0)`, `(${hFirst}+${hLast})/4`, out.ht)],
    ['Jumlah titik awal untuk garis singgung', 'titik', out.initialReadingCount],
    ['Kemiringan awal', 'cm/√menit', null],
    ['Intersep awal', 'cm', null],
    ['√t90 dari titik potong Taylor', '√menit', null],
    (r, first) => ['Waktu t90', 'menit', guarded(`ISNUMBER(C${first + 4})`, `C${first + 4}^2`, out.t90)],
    (r, first) => ['Koefisien konsolidasi Cv', 'cm²/s', guarded(`AND(COUNT(C${first},C${first + 5})=2,C${first + 5}>0)`, `0.848*C${first}^2/(60*C${first + 5})`, out.cvSec)],
    ['Kemiringan e–log tegangan pada P1–P2', '', guarded(`AND(COUNT(${hFirst},${hLast},${params.p1 ?? '""'},${params.p2 ?? '""'},${params.e0 ?? '""'})=5,${hFirst}>=${hLast},${hLast}>0,${params.p1 ?? 0}>0,${params.p2 ?? 0}>${params.p1 ?? 0},${params.e0 ?? 0}>=0)`,
      `(${hFirst}-${hLast})/${hFirst}*(1+${params.e0 ?? 0})/LOG10(${params.p2 ?? 0}/${params.p1 ?? 0})`, out.cc)],
  ], { inputs: [3] })
  const [count, slope, intercept, root] = [1, 2, 3, 4].map((i) => section.ref(3, i))
  const xRange = `D${table.first}:INDEX(${table.range(4)},${count})`
  const yRange = `C${table.first}:INDEX(${table.range(3)},${count})`
  const fit = `AND(ISNUMBER(${count}),${count}=INT(${count}),${count}>=2,${count}<=${readings.length},A${table.first}=0,COUNT(${table.range(3)},${table.range(4)})=${2 * readings.length})`
  ws.getCell(slope).value = formula(`IFERROR(IF(${fit},SLOPE(${yRange},${xRange}),""),"")`, out.slope1)
  ws.getCell(intercept).value = formula(`IFERROR(IF(${fit},INTERCEPT(${yRange},${xRange}),""),"")`, out.d0)
  ws.getCell(root).value = guarded(`COUNT(${table.range(6)})>0`, `MIN(${table.range(6)})`, out.sqrtT90)
  readings.forEach((reading, i) => {
    const r = table.first + i
    const next = r + 1
    ws.getCell(r, 5).value = guarded(`AND(COUNT(${slope},${intercept},C${r},D${r})=4,${slope}>0)`,
      `C${r}-(${intercept}+${slope}/1.15*D${r})`, out.slope1 > 0 ? reading.deltaH - (out.d0 + out.slope2 * reading.sqrtT) : null)
    if (i >= readings.length - 1) return
    ws.getCell(r, 6).value = guarded(
      `AND(${i + 1}>=${count},COUNT(E${r}:E${next})=2,E${r}>=0,E${next}<=0,E${r}<>E${next},D${next}>D${r},D${r}>0)`,
      `D${r}+(D${next}-D${r})*E${r}/(E${r}-E${next})`, out.segmentIntersections[i],
    )
  })
  if (Number.isFinite(out.slope1) && out.slope1 > 0) {
    const lineEnd = Math.min(readings.at(-1).sqrtT, 1.3 * (out.sqrtT90 ?? readings[out.initialReadingCount - 1].sqrtT))
    const line = addTable(ws, 'Garis singgung awal dan garis Taylor', ['√t (√menit)', 'Garis awal (cm)', 'Garis Taylor (cm)'],
      [0, lineEnd].map((t, i) => (r) => [
        i === 0 ? 0 : formula(`IFERROR(IF(ISNUMBER(${slope}),MIN(MAX(${table.range(4)}),1.3*IF(ISNUMBER(${root}),${root},INDEX(${table.range(4)},${count}))),""),"")`, t),
        guarded(`AND(COUNT(${slope},${intercept},A${r})=3,${slope}>0)`, `${intercept}+${slope}*A${r}`, out.d0 + out.slope1 * t),
        guarded(`AND(COUNT(${slope},${intercept},A${r})=3,${slope}>0)`, `${intercept}+${slope}/1.15*A${r}`, out.d0 + out.slope2 * t),
      ]))
    charts.push({ name: 'Konsolidasi • metode akar waktu Taylor', x: { label: 'Akar waktu (√menit)' }, y: { label: 'Penurunan (cm)', reverse: true, min: 0 },
      series: [{ table, x: 4, y: 3, name: 'Pembacaan uji' }, { table: line, x: 1, y: 2, name: 'Garis awal', ...reference }, { table: line, x: 1, y: 3, name: 'Garis Taylor', color: 'EA580C', dashed: true, markers: false }] })
  } else {
    charts.push({ name: 'Konsolidasi • kurva penurunan', x: { label: 'Akar waktu (√menit)' }, y: { label: 'Penurunan (cm)', reverse: true, min: 0 },
      series: [{ table, x: 4, y: 3, name: 'Pembacaan uji' }] })
  }
  addNote(ws, 'Penentuan t90', 'Periksa jumlah titik pada segmen awal yang lurus. Waktu harus dimulai dari nol dan tetap berurutan. Cv memakai faktor waktu 0,848 dan asumsi drainase ganda. Kemiringan e–log tegangan mewakili Cc bila kedua beban berada pada garis kompresi virgin. https://www.fhwa.dot.gov/engineering/geotech/pubs/010549.pdf')
  return true
}
