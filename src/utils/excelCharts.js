import JSZip from 'jszip'
import { addSection, column, REPORT_COLUMN_COUNT } from './excelReportLayout.js'

const drawingNs = 'http://schemas.openxmlformats.org/drawingml/2006/main'
const chartNs = 'http://schemas.openxmlformats.org/drawingml/2006/chart'
const spreadsheetDrawingNs = 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing'
const relationshipNs = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
const packageNs = 'http://schemas.openxmlformats.org/package/2006/relationships'
const chartHeightRows = 23
const chartSpacingRows = 2

const xml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[character])

const solid = (color) => `<a:solidFill><a:srgbClr val="${color}"/></a:solidFill>`
const chartLine = (color, width = 12700, dashed = false) => `<a:ln w="${width}">${solid(color)}${dashed ? '<a:prstDash val="dash"/>' : ''}</a:ln>`
const font = (size, color = '475569') => `<c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="${size}">${solid(color)}</a:defRPr></a:pPr><a:endParaRPr lang="id-ID"/></a:p></c:txPr>`

function title(value, size) {
  return `<c:title><c:tx><c:rich><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="${size}" b="1">${solid('0F172A')}</a:defRPr></a:pPr><a:r><a:t>${xml(value)}</a:t></a:r></a:p></c:rich></c:tx><c:overlay val="0"/></c:title>`
}

function numberRef(table, col, entries) {
  const sheetName = `'${table.sheet.name.replace(/'/g, "''")}'`
  const letter = column(col)
  const reference = `${sheetName}!$${letter}$${table.first}:$${letter}$${table.last}`
  const points = entries.map((v, idx) => v === null ? '' : `<c:pt idx="${idx}"><c:v>${v}</c:v></c:pt>`).join('')
  return `<c:numRef><c:f>${xml(reference)}</c:f><c:numCache><c:formatCode>General</c:formatCode><c:ptCount val="${entries.length}"/>${points}</c:numCache></c:numRef>`
}

function numberAt(table, row, col) {
  const value = table.sheet.getCell(row, col).value
  const numeric = typeof value === 'object' ? value?.result : value
  return typeof numeric === 'number' && Number.isFinite(numeric) ? numeric : null
}

function seriesXml(series, index, axes) {
  const { table, x, y, name, color = '2563EB', dashed = false, markers = true, line = true, smooth = false } = series
  const xs = []
  const ys = []
  for (let r = table.first; r <= table.last; r++) {
    const vx = numberAt(table, r, x)
    const vy = numberAt(table, r, y)
    const valid = vx !== null && vy !== null && (!axes.x.log || vx > 0) && (!axes.y.log || vy > 0)
    xs.push(valid ? vx : null)
    ys.push(valid ? vy : null)
  }
  if (xs.every((value) => value === null)) return ''

  return `<c:ser><c:idx val="${index}"/><c:order val="${index}"/><c:tx><c:v>${xml(name)}</c:v></c:tx>
    <c:spPr>${line ? chartLine(color, dashed ? 15875 : 28575, dashed) : '<a:ln><a:noFill/></a:ln>'}</c:spPr>
    <c:marker><c:symbol val="${markers ? 'circle' : 'none'}"/>${markers ? `<c:size val="5"/><c:spPr>${solid(color)}<a:ln>${solid('FFFFFF')}</a:ln></c:spPr>` : ''}</c:marker>
    <c:xVal>${numberRef(table, x, xs)}</c:xVal><c:yVal>${numberRef(table, y, ys)}</c:yVal><c:smooth val="${smooth ? 1 : 0}"/></c:ser>`
}

function axisXml(axis, id, crossId, position) {
  const { label, log = false, reverse = false, min, max, step, format = '0.###' } = axis
  return `<c:valAx><c:axId val="${id}"/><c:scaling>${log ? '<c:logBase val="10"/>' : ''}<c:orientation val="${reverse ? 'maxMin' : 'minMax'}"/>${max != null ? `<c:max val="${max}"/>` : ''}${min != null ? `<c:min val="${min}"/>` : ''}</c:scaling>
    <c:delete val="0"/><c:axPos val="${position}"/><c:majorGridlines><c:spPr>${chartLine('E2E8F0')}</c:spPr></c:majorGridlines>
    ${title(label, 1000)}<c:numFmt formatCode="${xml(format)}" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/>
    <c:tickLblPos val="low"/><c:spPr>${chartLine('94A3B8')}</c:spPr>${font(950)}
    <c:crossAx val="${crossId}"/><c:crosses val="min"/><c:crossBetween val="midCat"/>${step ? `<c:majorUnit val="${step}"/>` : ''}</c:valAx>`
}

function makeChart({ name, x, y, series }) {
  const plot = series.map((data, index) => seriesXml(data, index, { x, y })).filter(Boolean)
  if (!plot.length) return null
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<c:chartSpace xmlns:c="${chartNs}" xmlns:a="${drawingNs}" xmlns:r="${relationshipNs}">
  <c:lang val="id-ID"/><c:chart>${title(name, 1400)}<c:autoTitleDeleted val="0"/>
    <c:plotArea><c:layout/><c:scatterChart><c:scatterStyle val="lineMarker"/>${plot.join('')}
      <c:axId val="100"/><c:axId val="200"/></c:scatterChart>
      ${axisXml(x, 100, 200, 'b')}${axisXml(y, 200, 100, 'l')}
    </c:plotArea>
    <c:legend><c:legendPos val="b"/><c:layout/><c:overlay val="0"/>${font(950)}</c:legend>
    <c:plotVisOnly val="1"/><c:dispBlanksAs val="gap"/><c:showDLblsOverMax val="0"/>
  </c:chart><c:spPr>${solid('FFFFFF')}${chartLine('CBD5E1')}</c:spPr>${font(1000)}
</c:chartSpace>`
}

const relationships = (links) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${packageNs}">${links.join('')}</Relationships>`
const relationship = (id, type, target) => `<Relationship Id="rId${id}" Type="${relationshipNs}/${type}" Target="${target}"/>`
const override = (part, type) => `<Override PartName="/${part}" ContentType="application/vnd.openxmlformats-officedocument.${type}+xml"/>`

function anchor(id, top, bottom) {
  return `<xdr:twoCellAnchor editAs="oneCell">
    <xdr:from><xdr:col>0</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${top}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from>
    <xdr:to><xdr:col>${REPORT_COLUMN_COUNT}</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${bottom}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:to>
    <xdr:graphicFrame macro=""><xdr:nvGraphicFramePr><xdr:cNvPr id="${id}" name="Grafik ${id}"/><xdr:cNvGraphicFramePr/></xdr:nvGraphicFramePr>
      <xdr:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/></xdr:xfrm>
      <a:graphic><a:graphicData uri="${chartNs}"><c:chart xmlns:c="${chartNs}" r:id="rId${id}"/></a:graphicData></a:graphic>
    </xdr:graphicFrame><xdr:clientData/></xdr:twoCellAnchor>`
}

export function prepareCharts(sheet, charts) {
  const plots = charts.map(makeChart).filter(Boolean)
  if (!plots.length) return null
  const heading = addSection(sheet, 'Grafik Pengujian', REPORT_COLUMN_COUNT)
  const firstChartRow = heading + 2
  const lastRow = firstChartRow + plots.length * chartHeightRows + (plots.length - 1) * chartSpacingRows
  return { sheetId: sheet.id, plots, firstChartRow, lastRow }
}

export async function writeCharts(buffer, layout) {
  if (!layout) return buffer
  const { sheetId, plots, firstChartRow } = layout
  const zip = await JSZip.loadAsync(buffer)
  const drawing = 'xl/drawings/drawing1.xml'
  const sheet = `xl/worksheets/sheet${sheetId}.xml`
  const drawingRelationships = []
  const contentTypes = [override(drawing, 'drawing')]
  const anchors = plots.map((chart, index) => {
    const id = index + 1
    const part = `xl/charts/chart${id}.xml`
    zip.file(part, chart)
    contentTypes.push(override(part, 'drawingml.chart'))
    drawingRelationships.push(relationship(id, 'chart', `../charts/chart${id}.xml`))
    const top = firstChartRow - 1 + index * (chartHeightRows + chartSpacingRows)
    return anchor(id, top, top + chartHeightRows)
  })

  zip.file(drawing, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr xmlns:xdr="${spreadsheetDrawingNs}" xmlns:a="${drawingNs}" xmlns:r="${relationshipNs}">${anchors.join('')}</xdr:wsDr>`)
  zip.file('xl/drawings/_rels/drawing1.xml.rels', relationships(drawingRelationships))
  zip.file(`xl/worksheets/_rels/sheet${sheetId}.xml.rels`, relationships([relationship(1, 'drawing', '../drawings/drawing1.xml')]))
  const sheetXml = await zip.file(sheet).async('string')
  zip.file(sheet, sheetXml.replace('</worksheet>', `<drawing xmlns:r="${relationshipNs}" r:id="rId1"/></worksheet>`))
  const manifest = await zip.file('[Content_Types].xml').async('string')
  zip.file('[Content_Types].xml', manifest.replace('</Types>', `${contentTypes.join('')}</Types>`))
  return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' })
}
