const fill = (argb) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } })

const navy = 'FF1E3A8A'
const ink = 'FF0F172A'
const blue = 'FF1D4ED8'
const line = { style: 'thin', color: { argb: 'FFE2E8F0' } }

export const REPORT_COLUMN_COUNT = 6

export { numeric } from './labInputValues.js'

export function formula(expression, result) {
  return { formula: expression, result: typeof result === 'number' && !Number.isFinite(result) ? '' : result ?? '' }
}

export function guarded(condition, expression, result) {
  return formula(`IF(${condition},${expression},"")`, result)
}

export function column(index) {
  let letters = ''
  for (let i = index; i > 0; i = Math.floor((i - 1) / 26)) {
    letters = String.fromCharCode(65 + (i - 1) % 26) + letters
  }
  return letters
}

export function reportHeader(ws, name, details) {
  const cols = REPORT_COLUMN_COUNT
  ws.getColumn(1).width = 29
  ws.mergeCells(1, 1, 1, cols)
  const brand = ws.getCell('A1')
  brand.value = 'LabSipil • Laporan Pengujian'
  brand.fill = fill(navy)
  brand.font = { name: 'Calibri', size: 12, color: { argb: 'FFFFFFFF' }, bold: true }
  brand.alignment = { indent: 1, vertical: 'middle' }
  ws.getRow(1).height = 27

  ws.mergeCells(2, 1, 2, cols)
  const title = ws.getCell('A2')
  title.value = name
  title.fill = fill('FFEFF6FF')
  title.font = { name: 'Calibri', size: 15, bold: true, color: { argb: navy } }
  title.alignment = { indent: 1, wrapText: true, vertical: 'middle' }
  ws.getRow(2).height = Math.max(30, textHeight(name, 65))

  details.forEach(([label, value], i) => {
    const row = i + 3
    ws.mergeCells(row, 2, row, cols)
    ws.getCell(row, 1).value = label
    ws.getCell(row, 1).font = { name: 'Calibri', size: 10, bold: true, color: { argb: ink } }
    const cell = ws.getCell(row, 2)
    cell.value = value
    cell.font = { name: 'Calibri', size: 10, color: { argb: ink } }
    cell.alignment = { wrapText: true, vertical: 'middle' }
    ws.getRow(row).height = Math.max(19, textHeight(value, 55))
  })
}

export function addSection(ws, title, lastColumn) {
  const heading = ws.rowCount + (ws.rowCount ? 2 : 1)
  ws.mergeCells(heading, 1, heading, lastColumn)
  const section = ws.getCell(heading, 1)
  section.value = title
  section.fill = fill(navy)
  section.font = { name: 'Calibri', size: 11, color: { argb: 'FFFFFFFF' }, bold: true }
  section.alignment = { vertical: 'middle', indent: 1, wrapText: true }
  ws.getRow(heading).height = 25
  return heading
}

export function addTable(ws, title, headers, rows, { widths = [], inputs = [], formats = [], lastColumn = headers.length } = {}) {
  const heading = addSection(ws, title, lastColumn)
  const first = heading + 2
  const header = ws.getRow(first - 1)
  const mergeLastCell = (row) => {
    if (lastColumn > headers.length) ws.mergeCells(row, headers.length, row, lastColumn)
  }
  mergeLastCell(header.number)
  const cellWidths = headers.map((label, i) => {
    const col = ws.getColumn(i + 1)
    col.width = Math.max(col.isCustomWidth ? col.width : 0, widths[i] ?? (i === 0 ? 32 : 17))
    const cell = header.getCell(i + 1)
    cell.value = label
    cell.fill = fill('FFEFF6FF')
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: navy } }
    cell.alignment = { vertical: 'middle', horizontal: i === 0 ? 'left' : 'center', wrapText: true }
    cell.border = { bottom: line }
    if (i + 1 !== headers.length || lastColumn === headers.length) return col.width
    return ws.columns.slice(i, lastColumn).reduce((width, column) => width + (column.width ?? 9), 0)
  })
  header.height = Math.max(26, ...headers.map((label, i) => textHeight(label, cellWidths[i])))

  rows.forEach((source, index) => {
    const r = first + index
    const row = ws.getRow(r)
    mergeLastCell(r)
    const values = typeof source === 'function' ? source(r, first) : source
    let height = 19
    headers.forEach((_, i) => {
      const cell = row.getCell(i + 1)
      const inputValue = values[i]
      const value = typeof inputValue === 'number' && !Number.isFinite(inputValue) ? null : inputValue ?? null
      const calculated = typeof value === 'object' && value?.formula
      const displayed = calculated ? value.result : value
      const input = inputs.includes(i + 1) && !calculated
      cell.value = value
      cell.font = { name: 'Calibri', size: 10, color: { argb: input ? blue : ink } }
      cell.fill = fill(input ? 'FFEFF6FF' : index % 2 === 0 ? 'FFFFFFFF' : 'FFF8FAFC')
      cell.border = { bottom: line }
      cell.alignment = { vertical: 'middle', horizontal: typeof displayed === 'number' ? 'right' : 'left', wrapText: true }
      if (formats[i]) cell.numFmt = formats[i]
      else if (typeof displayed === 'number') cell.numFmt = '0.00####'
      if (typeof displayed === 'string') height = Math.max(height, textHeight(displayed, cellWidths[i]))
    })
    row.height = height
  })

  const last = first + rows.length - 1
  return {
    sheet: ws,
    first,
    last,
    ref: (col, index = 0) => `${column(col)}${first + index}`,
    range: (col) => `${column(col)}${first}:${column(col)}${last}`,
  }
}

function textHeight(value, width) {
  const chars = Math.max(8, Math.floor(width * 0.9))
  const lines = String(value).split('\n').reduce((sum, part) => sum + Math.max(1, Math.ceil(part.length / chars)), 0)
  return Math.min(220, 5 + lines * 14)
}

export function addNote(ws, label, message) {
  if (!message) return
  const row = ws.rowCount + 2
  const cols = Math.max(4, ws.columnCount)
  ws.mergeCells(row, 1, row, cols)
  const cell = ws.getCell(row, 1)
  cell.value = `${label}\n${message}`
  cell.font = { name: 'Calibri', size: 10, color: { argb: ink } }
  cell.fill = fill('FFF1F5F9')
  cell.alignment = { vertical: 'middle', wrapText: true, indent: 1 }
  ws.getRow(row).height = textHeight(cell.value, Array.from({ length: cols }, (_, i) => ws.getColumn(i + 1).width ?? 9).reduce((a, b) => a + b))
}

export function sheetSettings(ws, freezeRows = 0, printLastRow = ws.rowCount) {
  ws.views = [{ showGridLines: false, zoomScale: 95, ...(freezeRows ? { state: 'frozen', ySplit: freezeRows } : {}) }]
  ws.pageSetup = {
    paperSize: 9,
    orientation: ws.columns.reduce((width, col) => width + (col.width ?? 9), 0) > 105 ? 'landscape' : 'portrait',
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    printArea: `A1:${column(ws.columnCount)}${printLastRow}`,
  }
}
