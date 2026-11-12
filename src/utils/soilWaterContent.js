import { numeric } from './labInputValues.js'
import { soilMoisture } from './soilCompaction.js'

export function calculateSoilWaterContent(inputs, plastic = false) {
  const samples = inputs.samples ?? (plastic ? [] : [{ w1: inputs.wCawan, w2: inputs.wBasah, w3: inputs.wKering }])
  const rows = samples.map((sample, i) => {
    const [w1, w2, w3] = [sample.w1, sample.w2, sample.w3].map(numeric)
    const w = soilMoisture(w1, w2, w3)
    return { name: sample.name || `Cawan ${i + 1}`, w1, w2, w3, w, ww: w === null ? null : w2 - w3, ws: w === null ? null : w3 - w1 }
  })
  const complete = rows.length > 0 && rows.every((row) => row.w !== null)
  const avg = (key) => complete ? rows.reduce((sum, row) => sum + row[key], 0) / rows.length : null
  const moisture = plastic && !Array.isArray(inputs.samples) ? numeric(inputs.batasPlastisPL) : avg('w')
  const ll = numeric(inputs.ll ?? inputs.batasCairLL)
  const hasPl = plastic && moisture !== null && moisture >= 0
  const hasLl = ll !== null && ll > 0
  const plReport = hasPl ? Math.round(moisture) : null
  const llReport = hasLl ? Math.round(ll) : null
  const pi = hasPl && hasLl && llReport > plReport ? llReport - plReport : null
  const piLabel = pi !== null ? String(pi) : hasPl && hasLl ? 'NP' : '—'
  const aLine = pi !== null ? 0.73 * (llReport - 20) : null
  const chartGroup = pi === null ? '—' : llReport >= 50 ? pi >= aLine ? 'CH' : 'MH'
    : pi < 4 || pi < aLine ? 'ML' : pi <= 7 ? 'CL–ML' : 'CL'
  const fmt = (n) => n?.toFixed(2) ?? '—'
  const hasResult = plastic ? hasPl : complete
  const status = !hasResult ? 'Periksa penimbangan' : plastic && !hasLl ? 'Isi batas cair' : 'Data terhitung'
  const conclusion = !hasResult ? 'Lengkapi semua penimbangan. Massa cawan dengan tanah harus memenuhi W₂ ≥ W₃ > W₁.'
    : !plastic ? `Rata-rata kadar air dari ${rows.length} cawan adalah ${fmt(moisture)}% terhadap massa tanah kering.`
      : !hasLl ? 'Batas plastis sudah dihitung. Masukkan LL dari benda uji yang sama untuk menentukan PI.'
        : pi === null ? 'Laporkan NP karena PL sama dengan atau lebih besar daripada LL setelah pembulatan.'
          : `PL dilaporkan ${plReport}% dan PI ${pi}%. Posisi pada grafik plastisitas adalah ${chartGroup}. Simbol USCS akhir memerlukan data fraksi tanah dan kondisi organik.`
  return {
    soilWaterRows: rows, soilMoisture: moisture, soilPlasticLimit: plReport, soilPlasticityIndex: piLabel, soilALine: aLine,
    status, isError: !hasResult, verdictClass: status === 'Data terhitung' ? 'valid' : 'warning', conclusion,
    summaryString: plastic ? `PL ${plReport ?? '—'}% • PI ${piLabel}` : `Kadar air ${fmt(moisture)}%`,
    results: plastic ? [
      { label: 'Batas Plastis (PL)', value: plReport ?? '—', unit: '%', highlight: true, sub: `Rata-rata sebelum pembulatan: ${fmt(moisture)}%` },
      { label: 'Indeks Plastisitas (PI)', value: piLabel, unit: pi === null ? '' : '%', highlight: true },
      { label: 'Garis-A', value: fmt(aLine), unit: '%' },
      { label: 'Posisi pada Grafik Plastisitas', value: chartGroup },
    ] : [
      { label: 'Kadar Air Rata-rata (w)', value: fmt(moisture), numericValue: moisture, unit: '%', highlight: true },
      { label: 'Massa Air Rata-rata', value: fmt(avg('ww')), unit: 'g' },
      { label: 'Massa Tanah Kering Rata-rata', value: fmt(avg('ws')), unit: 'g' },
      { label: 'Jumlah Cawan Sah', value: rows.filter((row) => row.w !== null).length, unit: 'cawan' },
    ],
    formulaSteps: [
      'Massa air = W₂ − W₃. Massa tanah kering = W₃ − W₁. Kadar air = 100 × massa air / massa tanah kering.',
      ...rows.map((row) => `${row.name}: massa air ${fmt(row.ww)} g, massa tanah kering ${fmt(row.ws)} g, kadar air ${fmt(row.w)}%.`),
      plastic ? 'Bulatkan PL dan LL ke persen terdekat untuk pelaporan. PI = LL − PL jika LL > PL.' : 'Kadar air memakai massa kering sebagai penyebut dan dapat melebihi 100%.',
    ],
    recapTable: rows.length ? {
      title: plastic ? 'Rekap Pengujian Batas Plastis' : 'Rekap Pengujian Kadar Air Tanah',
      headers: ['Parameter Pengujian', 'Simbol / Rumus', ...rows.map(({ name }) => name), 'Rata-rata'],
      rows: [
        ['Cawan kosong', 'W₁ (g)', 'w1'], ['Cawan + tanah basah', 'W₂ (g)', 'w2'], ['Cawan + tanah kering', 'W₃ (g)', 'w3'],
        ['Massa air', 'W₂ − W₃ (g)', 'ww'], ['Massa tanah kering', 'W₃ − W₁ (g)', 'ws'],
        ['Kadar air (%)', '100 × (W₂ − W₃)/(W₃ − W₁)', 'w'],
      ].map(([label, equation, key]) => ({ label, equation, values: rows.map((row) => fmt(row[key])), average: fmt(avg(key)), highlight: key === 'w' })),
    } : null,
  }
}
