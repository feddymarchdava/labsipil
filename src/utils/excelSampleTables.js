import { addNote, addTable, column, guarded, numeric } from './excelReportLayout.js'
import { BINA_MARGA_2018_R2, SNI_STEEL_2017, STEEL_TENSION_LIMITS } from './labSpecifications.js'

const water = {
  rows: ['w1', 'w2', 'w3', (r) => `${r(1)}-${r(2)}`, (r) => `${r(2)}-${r(0)}`, (r) => `100*${r(3)}/${r(4)}`],
  valid: (r) => `${r(0)}>=0,${r(2)}>${r(0)},${r(1)}>=${r(2)}`,
}
const loss = {
  rows: ['w1', 'w2', (r) => `${r(0)}-${r(1)}`, (r) => `100*${r(2)}/${r(0)}`],
  valid: (r) => `${r(0)}>0,${r(1)}>=0,${r(1)}<=${r(0)}`,
}
const bulk = {
  rows: [
    'wLepas', (r, p) => `${r(0)}-${p('wBejana')}`, (r, p) => `${r(1)}/${p('vol')}`, (r, p) => `100*(1-${r(2)}/${p('bjBulk')})`,
    'wPadat', (r, p) => `${r(4)}-${p('wBejana')}`, (r, p) => `${r(5)}/${p('vol')}`, (r, p) => `100*(1-${r(6)}/${p('bjBulk')})`,
  ],
  valid: (r, p) => `COUNT(${p('wBejana')},${p('vol')},${p('bjBulk')})=3,${p('wBejana')}>=0,${p('vol')}>0,${p('bjBulk')}>0,${r(0)}>${p('wBejana')},${r(4)}>${p('wBejana')}`,
}

const specs = {
  'bb-1-1': {
    rows: ['a', 's', 'b', 'c',
      (r) => `${r(0)}/(${r(2)}+${r(1)}-${r(3)})`, (r) => `${r(1)}/(${r(2)}+${r(1)}-${r(3)})`,
      (r) => `${r(0)}/(${r(2)}+${r(0)}-${r(3)})`, (r) => `100*(${r(1)}-${r(0)})/${r(0)}`],
    valid: (r) => `${r(0)}>0,${r(1)}>=${r(0)},${r(2)}>0,${r(3)}>${r(2)},${r(2)}+${r(0)}>${r(3)}`,
  },
  'bb-1-2': water,
  'bb-1-3': loss,
  'bb-1-4': bulk,
  'bb-2-1': {
    rows: ['a', 'b', 'c', (r) => `${r(0)}/(${r(1)}-${r(2)})`, (r) => `${r(1)}/(${r(1)}-${r(2)})`,
      (r) => `${r(0)}/(${r(0)}-${r(2)})`, (r) => `100*(${r(1)}-${r(0)})/${r(0)}`],
    valid: (r) => `${r(1)}>=${r(0)},${r(0)}>${r(2)},${r(2)}>0`,
  },
  'bb-2-2': water,
  'bb-2-3': loss,
  'bb-2-4': bulk,
  'bb-2-6': { ...loss, rows: ['a', 'b', ...loss.rows.slice(2)] },
  'bb-3-1': {
    rows: ['tinggiA', 'tinggiB', (r) => `${r(0)}-${r(1)}`, (r) => `10*${r(2)}`, 'bentukSlump'],
    valid: (r) => `${r(0)}>0,${r(1)}>=0,${r(0)}>=${r(1)}`,
  },
  'bb-3-2': {
    rows: ['bebanHancur', (r, p) => `1000*${r(0)}/IF(${p('tipeSample')}="kubus",${p('sisiMm')}^2,PI()*${p('diameterMm')}^2/4)`,
      (r, p) => `${r(1)}/IF(${p('umurHari')}=3,0.4,IF(${p('umurHari')}=7,0.65,IF(${p('umurHari')}=14,0.88,IF(${p('umurHari')}=21,0.95,1))))`],
    valid: (r, p) => `${r(0)}>0,IF(${p('tipeSample')}="kubus",${p('sisiMm')}>0,${p('diameterMm')}>0),OR(${[3, 7, 14, 21, 28].map((age) => `${p('umurHari')}=${age}`).join(',')})`,
  },
  'bb-3-3': {
    rows: ['bebanP', (r) => `1000*${r(0)}`, (r, p) => `${r(1)}*${p('bentangL')}/(${p('lebarB')}*${p('tinggiH')}^2)`],
    valid: (r, p) => `${r(0)}>0,${p('lebarB')}>0,${p('tinggiH')}>0,${p('bentangL')}>0`,
  },
  'bb-4-1': { ...loss, rows: ['mBasah', 'mKering', loss.rows[2], (r) => `100*${r(2)}/${r(1)}`], valid: (r) => `${r(0)}>=${r(1)},${r(1)}>0` },
  'bb-4-2': {
    rows: ['massa', 'panjang', 'lebar', 'tebal', (r) => `${r(1)}*${r(2)}*${r(3)}`, (r) => `${r(0)}/${r(4)}`, (r) => `1000*${r(5)}`],
    valid: (r) => `MIN(${r(0)}:${r(3)})>0`,
  },
  'bb-4-3': {
    rows: ['vm', 'v0', 'mm', 'm0', (r) => `1000*${r(2)}/${r(0)}`, (r) => `1000*${r(3)}/${r(1)}`],
    valid: (r) => `MIN(${r(0)}:${r(3)})>0,${r(0)}>=${r(1)},${r(2)}>=${r(3)}`,
  },
  'bb-4-4': {
    rows: ['bebanP', 'lendutan', (r, p) => `3*${r(0)}*${p('bentangL')}/(2*${p('lebarB')}*${p('tinggiH')}^2)`,
      (r, p) => `${r(0)}*${p('bentangL')}^3/(4*${p('lebarB')}*${p('tinggiH')}^3*${r(1)})`],
    valid: (r, p) => `${r(0)}>0,${r(1)}>0,${p('lebarB')}>0,${p('tinggiH')}>0,${p('bentangL')}>0`,
  },
  'bb-5-1': {
    rows: ['diameter', (r) => `PI()*${r(0)}^2/4`, 'pjgAwal', 'pjgPutus', 'bebanLeleh', 'bebanPutus',
      (r) => `1000*${r(4)}/${r(1)}`, (r) => `1000*${r(5)}/${r(1)}`, (r) => `${r(7)}/${r(6)}`, (r) => `100*(${r(3)}-${r(2)})/${r(2)}`],
    valid: (r) => `${r(0)}>0,${r(2)}>0,${r(3)}>=${r(2)},${r(4)}>0,${r(5)}>=${r(4)}`,
  },
  'mt-2-1': water,
  'mt-2-2': {
    rows: ['w1', 'w2', 'w3', 'w4', (r) => `${r(1)}-${r(0)}`, (r) => `${r(4)}+${r(3)}-${r(2)}`, (r) => `${r(4)}/${r(5)}`],
    valid: (r) => `${r(1)}>${r(0)},${r(3)}>${r(0)},${r(2)}>${r(1)},${r(1)}-${r(0)}+${r(3)}>${r(2)}`,
  },
  'mt-2-4': water,
}

const legacyAliases = {
  'bb-2-6': { a: 'wAwal', b: 'wTertahan12' },
  'mt-2-1': { w1: 'wCawan', w2: 'wBasah', w3: 'wKering' },
  'mt-2-2': { w1: 'wPikno', w2: 'wPiknoTanah', w3: 'wPiknoAirTanah', w4: 'wPiknoAir' },
}

function steelEvaluation(ref, grade, cached) {
  const [diameter, length, fy, fu, ratio, elongation] = [0, 2, 6, 7, 8, 9].map(ref)
  const byGrade = Object.entries(STEEL_TENSION_LIMITS).reduceRight((otherwise, [name, limit]) => {
    const test = `AND(${fy}>=${limit.fy[0]},${fy}<=${limit.fy[1]},${fu}>=${limit.fu},${ratio}>=${limit.ratio})`
    const strain = limit.elongation.reduceRight((next, [min, max, threshold]) => {
      const condition = Number.isFinite(max) ? `AND(${diameter}>=${min},${diameter}<=${max})` : `${diameter}>=${min}`
      return `IF(${condition},IF(${elongation}>=${threshold},"Memenuhi batas uji tarik","Di luar batas uji tarik"),${next})`
    }, '"Perlu evaluasi regangan"')
    return `IF(${grade}="${name}",IF(${test},IF(${length}=200,${strain},"Perlu evaluasi regangan"),"Di luar batas uji tarik"),${otherwise})`
  }, '"Kelas baja belum dipilih"')
  return guarded(`COUNT(${fy},${fu},${ratio},${elongation})=4`, byGrade, cached)
}

export function normalizeSampleInputs(testId, inputs) {
  const spec = specs[testId]
  if (!spec || Array.isArray(inputs.samples)) return inputs
  const aliases = legacyAliases[testId] || {}
  const keys = spec.rows.filter((rule) => typeof rule === 'string' && rule !== 'bentukSlump')
  if (!keys.every((key) => Object.hasOwn(inputs, key) || Object.hasOwn(inputs, aliases[key]))) return inputs
  return { ...inputs, samples: [{ id: 1, name: 'Benda Uji 1', ...Object.fromEntries(keys.map((key) => [key, inputs[key] ?? inputs[aliases[key]]])) }] }
}

export function writeSampleRecap(ws, id, inputs, output, params) {
  const spec = specs[id]
  const recap = output.recapTable
  if (!spec || !recap || !inputs.samples?.length) return false

  const names = inputs.samples.map((sample, index) => sample.name || `Benda Uji ${index + 1}`)
  const rawIndices = spec.rows.flatMap((rule, index) => typeof rule === 'string' && rule !== 'bentukSlump' ? [index] : [])
  const averageCol = names.length + 4
  const firstCol = column(4)
  const lastCol = column(averageCol - 1)
  const param = (key) => params[key] || '0'
  const resultTable = addTable(ws, recap.title,
    ['Parameter', 'Satuan', 'Persamaan', ...names, 'Rata-rata'],
    recap.rows.map((entry, rowIndex) => (row, first) => {
      const rule = spec.rows[rowIndex]
      const samples = inputs.samples.map((sample, i) => {
        const ref = (index) => `${column(i + 4)}${first + index}`
        const cachedIndex = entry.values.length === names.length ? i : recap.headers.slice(-entry.values.length - 1, -1).indexOf(names[i])
        const cached = entry.values[cachedIndex]
        if (typeof rule === 'string') return rule === 'bentukSlump' ? sample[rule] || 'Belum dicatat' : numeric(sample[rule])
        if (id === 'bb-5-1' && rowIndex === 10) return steelEvaluation(ref, param('mutuBaja'), cached)
        if (!rule) return numeric(cached) ?? cached ?? null
        const raw = rawIndices.map(ref).join(',')
        return guarded(`AND(COUNT(${raw})=${rawIndices.length},${spec.valid(ref, param)})`, rule(ref, param), numeric(cached))
      })
      const range = `${firstCol}${row}:${lastCol}${row}`
      const hasNumbers = typeof rule === 'function' || (typeof rule === 'string' && rule !== 'bentukSlump')
      const measurements = samples.filter(Number.isFinite)
      const cachedAverage = typeof rule === 'string'
        ? (measurements.length ? measurements.reduce((sum, value) => sum + value, 0) / measurements.length : null)
        : numeric(entry.average)
      return [entry.label, entry.unit || (entry.values.some((value) => String(value).endsWith('%')) ? '%' : ''), entry.equation,
        ...samples, hasNumbers ? guarded(`COUNT(${range})>0`, `AVERAGE(${range})`, cachedAverage) : null]
    }), { widths: [36, 12, 30], inputs: names.map((_, i) => i + 4) })

  if (id === 'mt-2-4') {
    const pl = resultTable.ref(averageCol, 5)
    const ll = param('ll')
    addTable(ws, 'Indeks plastisitas', ['Parameter', 'Satuan', 'Nilai'], [
      ['Indeks plastisitas (LL − PL)', '%', guarded(`AND(COUNT(${ll},${pl})=2,${ll}>=${pl})`, `${ll}-${pl}`, numeric(output.results[1]?.value))],
      ['Garis A (0,73 × (LL − 20))', '%', guarded(`ISNUMBER(${ll})`, `0.73*(${ll}-20)`, numeric(inputs.ll) === null ? null : 0.73 * (Number(inputs.ll) - 20))],
    ])
  }
  if (id === 'bb-2-1' && params.pairedFineGsb) {
    const coarse = resultTable.ref(averageCol, 3)
    const fine = params.pairedFineGsb
    const difference = numeric(output.results.find(({ label }) => label === 'Selisih BJ Curah Kasar dan Halus')?.value)
    addTable(ws, 'Pembanding BJ agregat untuk campuran beraspal', ['Parameter', 'Nilai'], [
      ['Selisih BJ curah kasar dan halus', guarded(`AND(COUNT(${coarse},${fine})=2,${fine}>0)`, `ABS(${coarse}-${fine})`, difference)],
      ['Selisih maksimum', 0.2],
    ])
    addNote(ws, 'Acuan selisih BJ', BINA_MARGA_2018_R2)
  }
  if (id === 'bb-5-1') {
    addNote(ws, 'Acuan tarik baja', `SNI 2052:2017 Tabel 6 menetapkan batas fy, fu, rasio fu/fy, dan regangan berdasarkan kelas dan diameter. Batas regangan pada L₀ = 200 mm. Modulus E memerlukan data segmen elastis. ${SNI_STEEL_2017}`)
  }
  return true
}
