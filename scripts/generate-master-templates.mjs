import ExcelJS from 'exceljs'
import JSZip from 'jszip'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TEMPLATES_DIR = path.resolve(__dirname, '../public/excel-templates')

if (!fs.existsSync(TEMPLATES_DIR)) {
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true })
}

const COLORS = {
  NAVY_HEADER: 'FF1E3A8A',
  BLUE_SUBHEADER: 'FF2563EB',
  TABLE_HEADER: 'FF1E40AF',
  TABLE_SUBHEADER: 'FF3B82F6',
  ZEBRA_ROW: 'FFF8FAFC',
  SUMMARY_ROW: 'FFECFDF5',
  SUMMARY_TEXT: 'FF065F46',
  BORDER_GRID: 'FFCBD5E1',
  BORDER_HEADER: 'FF94A3B8',
  WHITE: 'FFFFFFFF',
  DARK_TEXT: 'FF0F172A',
  MUTED_TEXT: 'FF64748B',
  LIGHT_BLUE: 'FFEFF6FF',
}

const BORDER_THIN = {
  top: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
  left: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
  bottom: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
  right: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
}

const BORDER_DOUBLE_BOTTOM = {
  top: { style: 'thin', color: { argb: COLORS.BORDER_HEADER } },
  left: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
  bottom: { style: 'double', color: { argb: COLORS.DARK_TEXT } },
  right: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
}

function applyCommonHeader(ws, title, subtitle, standard, totalCols = 8) {
  // Baris 1: Banner Platform Resmi
  ws.mergeCells(1, 1, 1, totalCols)
  const c1 = ws.getCell(1, 1)
  c1.value = 'LabSipil Engineering Platform'
  c1.font = { name: 'Arial', size: 10, bold: true, color: { argb: COLORS.WHITE } }
  c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
  c1.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getRow(1).height = 24

  // Baris 2: Judul Blangko Modul
  ws.mergeCells(2, 1, 2, totalCols)
  const c2 = ws.getCell(2, 1)
  c2.value = `${title.toUpperCase()} (${standard})`
  c2.font = { name: 'Arial', size: 11, bold: true, color: { argb: COLORS.DARK_TEXT } }
  c2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.LIGHT_BLUE } }
  c2.alignment = { horizontal: 'center', vertical: 'middle' }
  c2.border = {
    top: { style: 'medium', color: { argb: COLORS.BLUE_SUBHEADER } },
    bottom: { style: 'medium', color: { argb: COLORS.BLUE_SUBHEADER } },
    left: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
    right: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
  }
  ws.getRow(2).height = 26

  // Baris 3: Pemisah Tipis
  ws.getRow(3).height = 6

  // Baris 4: Tanggal Pelaksanaan
  ws.getRow(4).height = 20
  ws.mergeCells(4, 1, 4, 2)
  const lblDate = ws.getCell(4, 1)
  lblDate.value = 'Tanggal Pelaksanaan'
  lblDate.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
  lblDate.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
  lblDate.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 }
  lblDate.border = BORDER_THIN

  ws.mergeCells(4, 3, 4, totalCols)
  const valDate = ws.getCell(4, 3)
  valDate.value = `:  ${new Date().toISOString().split('T')[0]}`
  valDate.font = { name: 'Arial', size: 8.5, color: { argb: COLORS.DARK_TEXT } }
  valDate.alignment = { horizontal: 'left', vertical: 'middle' }
  valDate.border = BORDER_THIN

  // Baris 5: Deskripsi / Bahan Benda Uji
  ws.getRow(5).height = 20
  ws.mergeCells(5, 1, 5, 2)
  const lblDesc = ws.getCell(5, 1)
  lblDesc.value = 'Deskripsi / Bahan Benda Uji'
  lblDesc.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
  lblDesc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
  lblDesc.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 }
  lblDesc.border = BORDER_THIN

  ws.mergeCells(5, 3, 5, totalCols)
  const valDesc = ws.getCell(5, 3)
  valDesc.value = `:  ${subtitle || 'Contoh Bahan Pengujian Laboratorium'}`
  valDesc.font = { name: 'Arial', size: 8.5, color: { argb: COLORS.DARK_TEXT } }
  valDesc.alignment = { horizontal: 'left', vertical: 'middle' }
  valDesc.border = BORDER_THIN

  // Baris 6: Spasi Pemisah
  ws.getRow(6).height = 8
}

function applyCommonFooter(ws, startRow, totalCols = 8) {
  let currRow = startRow + 1

  // Kotak Kesimpulan
  ws.mergeCells(currRow, 1, currRow, totalCols)
  const evalH = ws.getCell(currRow, 1)
  evalH.value = 'EVALUASI HASIL PENGUJIAN & KESIMPULAN SPESIFIKASI'
  evalH.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.WHITE } }
  evalH.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.NAVY_HEADER } }
  evalH.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 }
  ws.getRow(currRow).height = 20
  currRow++

  ws.mergeCells(currRow, 1, currRow + 1, totalCols)
  const evalC = ws.getCell(currRow, 1)
  evalC.value = 'Hasil pengujian telah selesai dihitung dan sesuai dengan parameter spesifikasi teknis.'
  evalC.font = { name: 'Arial', size: 9, color: { argb: COLORS.DARK_TEXT } }
  evalC.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } }
  evalC.alignment = { horizontal: 'left', vertical: 'top', wrapText: true }
  evalC.border = BORDER_THIN
  ws.getRow(currRow).height = 22
  ws.getRow(currRow + 1).height = 22
  currRow += 2
}

function escapeXml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * HELPER: Menginjeksi OpenXML Scatter / Line Chart ke dalam workbook buffer
 */
async function embedNativeChart(wb, {
  sheetName = 'Sheet1',
  chartTitle = 'Kurva Pengujian',
  xTitle = 'Sumbu X',
  yTitle = 'Sumbu Y',
  isLogX = true,
  yMin = undefined,
  yMax = undefined,
  fromCol = 9,  // Kolom J
  fromRow = 3,  // Baris 4
  toCol = 18,   // Kolom S
  toRow = 23,   // Baris 24
  series = [],
}) {
  const wbBuf = await wb.xlsx.writeBuffer()
  const zip = await JSZip.loadAsync(wbBuf)

  const safeChartTitle = escapeXml(chartTitle)
  const safeXTitle = escapeXml(xTitle)
  const safeYTitle = escapeXml(yTitle)

  const seriesXml = series.map((s, idx) => `
    <c:ser>
      <c:idx val="${idx}"/>
      <c:order val="${idx}"/>
      <c:tx><c:v>${escapeXml(s.name)}</c:v></c:tx>
      <c:spPr>
        <a:ln w="${s.lineWidth || 25400}">
          <a:solidFill><a:srgbClr val="${s.color || '2563EB'}"/></a:solidFill>
          ${s.dash ? '<a:prstDash val="dash"/>' : ''}
        </a:ln>
      </c:spPr>
      <c:marker>
        <c:symbol val="${s.marker || 'circle'}"/>
        <c:size val="${s.markerSize || 5}"/>
        <c:spPr>
          <a:solidFill><a:srgbClr val="${s.color || '2563EB'}"/></a:solidFill>
        </c:spPr>
      </c:marker>
      <c:xVal>
        <c:numRef><c:f>'${sheetName}'!${s.xRef}</c:f></c:numRef>
      </c:xVal>
      <c:yVal>
        <c:numRef><c:f>'${sheetName}'!${s.yRef}</c:f></c:numRef>
      </c:yVal>
      <c:smooth val="${s.smooth ? 1 : 0}"/>
    </c:ser>
  `).join('\n')

  const drawingXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <xdr:twoCellAnchor editAs="oneCell">
    <xdr:from><xdr:col>${fromCol}</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${fromRow}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from>
    <xdr:to><xdr:col>${toCol}</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${toRow}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:to>
    <xdr:graphicFrame macro="">
      <xdr:nvGraphicFramePr>
        <xdr:cNvPr id="2" name="Chart 1"/>
        <xdr:cNvGraphicFramePr/>
      </xdr:nvGraphicFramePr>
      <xdr:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/></xdr:xfrm>
      <a:graphic>
        <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">
          <c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId1"/>
        </a:graphicData>
      </a:graphic>
    </xdr:graphicFrame>
    <xdr:clientData/>
  </xdr:twoCellAnchor>
</xdr:wsDr>`

  const drawingRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="../charts/chart1.xml"/>
</Relationships>`

  const chartXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <c:date1904 val="0"/>
  <c:lang val="id-ID"/>
  <c:roundedCorners val="0"/>
  <c:chart>
    <c:title>
      <c:tx>
        <c:rich>
          <a:bodyPr/>
          <a:lstStyle/>
          <a:p>
            <a:pPr><a:defRPr/></a:pPr>
            <a:r>
              <a:rPr b="1" sz="1100"/>
              <a:t>${safeChartTitle}</a:t>
            </a:r>
          </a:p>
        </c:rich>
      </c:tx>
      <c:layout/>
      <c:overlay val="0"/>
    </c:title>
    <c:autoTitleDeleted val="0"/>
    <c:plotArea>
      <c:layout/>
      <c:scatterChart>
        <c:scatterStyle val="lineMarker"/>
        ${seriesXml}
        <c:axId val="11111111"/>
        <c:axId val="22222222"/>
      </c:scatterChart>
      <c:valAx>
        <c:axId val="11111111"/>
        <c:scaling>
          ${isLogX ? '<c:logBase val="10"/>' : ''}
          <c:orientation val="minMax"/>
        </c:scaling>
        <c:delete val="0"/>
        <c:axPos val="b"/>
        <c:majorGridlines/>
        <c:title>
          <c:tx><c:rich><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr sz="900"/><a:t>${safeXTitle}</a:t></a:r></a:p></c:rich></c:tx>
        </c:title>
        <c:numFmt formatCode="General" sourceLinked="1"/>
        <c:majorTickMark val="out"/>
        <c:minorTickMark val="none"/>
        <c:tickLblPos val="nextTo"/>
        <c:crossAx val="22222222"/>
        <c:crosses val="autoZero"/>
      </c:valAx>
      <c:valAx>
        <c:axId val="22222222"/>
        <c:scaling>
          <c:orientation val="minMax"/>
          ${yMin !== undefined ? `<c:min val="${yMin}"/>` : ''}
          ${yMax !== undefined ? `<c:max val="${yMax}"/>` : ''}
        </c:scaling>
        <c:delete val="0"/>
        <c:axPos val="l"/>
        <c:majorGridlines/>
        <c:title>
          <c:tx><c:rich><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr sz="900"/><a:t>${safeYTitle}</a:t></a:r></a:p></c:rich></c:tx>
        </c:title>
        <c:numFmt formatCode="General" sourceLinked="1"/>
        <c:majorTickMark val="out"/>
        <c:minorTickMark val="none"/>
        <c:tickLblPos val="nextTo"/>
        <c:crossAx val="11111111"/>
        <c:crosses val="autoZero"/>
      </c:valAx>
    </c:plotArea>
    <c:legend>
      <c:legendPos val="b"/>
      <c:layout/>
    </c:legend>
    <c:plotVisOnly val="1"/>
  </c:chart>
</c:chartSpace>`

  zip.file('xl/drawings/drawing1.xml', drawingXml)
  zip.file('xl/drawings/_rels/drawing1.xml.rels', drawingRels)
  zip.file('xl/charts/chart1.xml', chartXml)

  zip.file(
    'xl/worksheets/_rels/sheet1.xml.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdDrawing1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/>
</Relationships>`
  )

  let sheet1 = await zip.file('xl/worksheets/sheet1.xml').async('text')
  sheet1 = sheet1.replace('</worksheet>', '<drawing r:id="rIdDrawing1"/></worksheet>')
  zip.file('xl/worksheets/sheet1.xml', sheet1)

  let contentTypes = await zip.file('[Content_Types].xml').async('text')
  contentTypes = contentTypes.replace(
    '</Types>',
    '<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/><Override PartName="/xl/charts/chart1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/></Types>'
  )
  zip.file('[Content_Types].xml', contentTypes)

  return await zip.generateAsync({ type: 'nodebuffer' })
}

// 1. TEMPLATE KADAR AIR (kadar-air-template.xlsx)
async function createWaterContentTemplate() {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Blangko Kadar Air', { views: [{ showGridLines: true }] })
  const totalCols = 8

  applyCommonHeader(ws, 'Pengujian Kadar Air Tanah', 'Sifat Fisik Tanah', 'SNI 1965:2008 / ASTM D2216', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Nomor / Kode Cawan' },
    { col: 3, text: 'Berat Cawan Kosong (W1)\n[gram]' },
    { col: 4, text: 'Cawan + Tanah Basah (W2)\n[gram]' },
    { col: 5, text: 'Cawan + Tanah Kering (W3)\n[gram]' },
    { col: 6, text: 'Berat Air (Ww = W2 - W3)\n[gram]' },
    { col: 7, text: 'Berat Tanah Kering (Ws = W3 - W1)\n[gram]' },
    { col: 8, text: 'Kadar Air Tanah (w)\n[%]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  for (let i = 1; i <= 5; i++) {
    const r = 7 + i
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = i
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = `Cawan C-${i}`
    ws.getCell(r, 2).alignment = { horizontal: 'left' }

    ws.getCell(r, 3).value = 0
    ws.getCell(r, 3).numFmt = '#,##0.00'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = 0
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = 0
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    ws.getCell(r, 6).value = { formula: `D${r}-E${r}`, result: 0 }
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    ws.getCell(r, 7).value = { formula: `E${r}-C${r}`, result: 0 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    ws.getCell(r, 8).value = { formula: `IF(G${r}>0, (F${r}/G${r})*100, 0)`, result: 0 }
    ws.getCell(r, 8).numFmt = '#,##0.00'
    ws.getCell(r, 8).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  }

  const avgRow = 13
  ws.getRow(avgRow).height = 22
  ws.mergeCells(avgRow, 1, avgRow, 7)
  const lbl = ws.getCell(avgRow, 1)
  lbl.value = 'KADAR AIR RATA-RATA (w_rata) :'
  lbl.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lbl.alignment = { horizontal: 'right', vertical: 'middle' }

  const valAvg = ws.getCell(avgRow, 8)
  valAvg.value = { formula: `AVERAGE(H8:H12)`, result: 0 }
  valAvg.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  valAvg.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  valAvg.numFmt = '#,##0.00'
  valAvg.alignment = { horizontal: 'right', vertical: 'middle' }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(avgRow, c).border = BORDER_DOUBLE_BOTTOM
  }

  ws.columns = [
    { width: 6 },
    { width: 22 },
    { width: 20 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
    { width: 24 },
    { width: 18 },
  ]

  applyCommonFooter(ws, avgRow + 1, totalCols)

  const filePath = path.join(TEMPLATES_DIR, 'kadar-air-template.xlsx')
  await wb.xlsx.writeFile(filePath)
  console.log('Template created:', filePath)
}

// 2. TEMPLATE GRADASI AGREGAT HALUS (gradasi-halus-template.xlsx) + EMBEDDED CHART
async function createGradasiHalusTemplate() {
  const wb = new ExcelJS.Workbook()
  const sheetName = 'Blangko Analisis Saringan'
  const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] })
  const totalCols = 9

  applyCommonHeader(ws, 'Analisis Gradasi Agregat Halus', 'Bahan Bangunan • Bab 1: Agregat Halus', 'SNI ASTM C136:2012', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Nomor Saringan\nASTM' },
    { col: 3, text: 'Ukuran Lubang\n[mm]' },
    { col: 4, text: 'Berat Tertahan\n[gram]' },
    { col: 5, text: 'Persen Tertahan\n[%]' },
    { col: 6, text: 'Kumulatif Tertahan\n[%]' },
    { col: 7, text: 'Persen Lolos\n[%]' },
    { col: 8, text: 'Batas Bawah\nSNI [%]' },
    { col: 9, text: 'Batas Atas\nSNI [%]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  // Standar 7 Fraksi Pasir + Pan
  const sievesPreset = [
    { name: '3/8" (9.5 mm)', size: 9.5, defW: 0, bb: 100, ba: 100 },
    { name: 'No. 4 (4.75 mm)', size: 4.75, defW: 20, bb: 90, ba: 100 },
    { name: 'No. 8 (2.36 mm)', size: 2.36, defW: 60, bb: 75, ba: 100 },
    { name: 'No. 16 (1.18 mm)', size: 1.18, defW: 110, bb: 55, ba: 90 },
    { name: 'No. 30 (0.60 mm)', size: 0.6, defW: 140, bb: 35, ba: 59 },
    { name: 'No. 50 (0.30 mm)', size: 0.3, defW: 100, bb: 8, ba: 30 },
    { name: 'No. 100 (0.15 mm)', size: 0.15, defW: 50, bb: 0, ba: 10 },
    { name: 'Pan Penampung', size: 0, defW: 20, bb: 0, ba: 0 },
  ]

  const totalRow = 8 + sievesPreset.length

  sievesPreset.forEach((s, idx) => {
    const r = 8 + idx
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = s.name
    ws.getCell(r, 2).alignment = { horizontal: 'left' }
    ws.getCell(r, 2).font = { name: 'Arial', size: 8.5, bold: true }

    ws.getCell(r, 3).value = s.size
    ws.getCell(r, 3).numFmt = '#,##0.00'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = s.defW
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    // Persen Tertahan
    ws.getCell(r, 5).value = { formula: `IF($D$${totalRow}>0, (D${r}/$D$${totalRow})*100, 0)`, result: 0 }
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    // Kumulatif Tertahan
    if (idx === 0) {
      ws.getCell(r, 6).value = { formula: `E${r}`, result: 0 }
    } else {
      ws.getCell(r, 6).value = { formula: `F${r - 1}+E${r}`, result: 0 }
    }
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // Persen Lolos
    ws.getCell(r, 7).value = { formula: `MAX(0, 100-F${r})`, result: 100 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    // Batas Spesifikasi SNI Zona 2
    ws.getCell(r, 8).value = s.bb
    ws.getCell(r, 8).numFmt = '#,##0.0'
    ws.getCell(r, 8).alignment = { horizontal: 'center' }

    ws.getCell(r, 9).value = s.ba
    ws.getCell(r, 9).numFmt = '#,##0.0'
    ws.getCell(r, 9).alignment = { horizontal: 'center' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  })

  // Baris Total
  ws.getRow(totalRow).height = 22
  ws.mergeCells(totalRow, 1, totalRow, 3)
  const lblT = ws.getCell(totalRow, 1)
  lblT.value = 'JUMLAH TOTAL (SUM) :'
  lblT.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lblT.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lblT.alignment = { horizontal: 'right', vertical: 'middle' }

  const valTotW = ws.getCell(totalRow, 4)
  valTotW.value = { formula: `SUM(D8:D${totalRow - 1})`, result: 500 }
  valTotW.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  valTotW.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  valTotW.numFmt = '#,##0.00'
  valTotW.alignment = { horizontal: 'right', vertical: 'middle' }

  const valTotPct = ws.getCell(totalRow, 5)
  valTotPct.value = { formula: `SUM(E8:E${totalRow - 1})`, result: 100 }
  valTotPct.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  valTotPct.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  valTotPct.numFmt = '#,##0.00'
  valTotPct.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(totalRow, 6).value = '-'
  ws.getCell(totalRow, 6).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 7).value = '-'
  ws.getCell(totalRow, 7).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 8).value = '-'
  ws.getCell(totalRow, 8).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 9).value = '-'
  ws.getCell(totalRow, 9).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 9).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(totalRow, c).border = BORDER_DOUBLE_BOTTOM
  }

  // Baris Parameter MHB & Zona
  const mhbRow = totalRow + 1
  ws.getRow(mhbRow).height = 20
  ws.mergeCells(mhbRow, 1, mhbRow, 3)
  ws.getCell(mhbRow, 1).value = 'Modulus Halus Butir (MHB / FM) :'
  ws.getCell(mhbRow, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(mhbRow, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(mhbRow, 4).value = { formula: `SUM(F8:F14)/100`, result: 2.76 }
  ws.getCell(mhbRow, 4).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.NAVY_HEADER } }
  ws.getCell(mhbRow, 4).numFmt = '#,##0.00'
  ws.getCell(mhbRow, 4).alignment = { horizontal: 'right', vertical: 'middle' }

  const zoneRow = totalRow + 2
  ws.getRow(zoneRow).height = 20
  ws.mergeCells(zoneRow, 1, zoneRow, 3)
  ws.getCell(zoneRow, 1).value = 'Klasifikasi Zona Pasir :'
  ws.getCell(zoneRow, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(zoneRow, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(zoneRow, 4).value = 'Zona II (Pasir Agak Kasar / Ideal Beton)'
  ws.getCell(zoneRow, 4).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(zoneRow, 4).alignment = { horizontal: 'left', vertical: 'middle' }

  ws.columns = [
    { width: 6 },
    { width: 22 },
    { width: 18 },
    { width: 20 },
    { width: 18 },
    { width: 20 },
    { width: 18 },
    { width: 16 },
    { width: 16 },
  ]

  applyCommonFooter(ws, zoneRow + 1, totalCols)

  // Embed Native Scatter Chart (Semi-log)
  const finalBuffer = await embedNativeChart(wb, {
    sheetName,
    chartTitle: 'KURVA GRADASI AGREGAT HALUS (SNI ASTM C136:2012)',
    xTitle: 'Ukuran Lubang Ayakan (mm) [Skala Logaritmik]',
    yTitle: 'Persen Lolos Kumulatif (%)',
    isLogX: true,
    yMin: 0,
    yMax: 100,
    fromCol: 10, // Col K
    fromRow: 3,  // Baris 4
    toCol: 20,   // Col U
    toRow: 24,   // Baris 25
    series: [
      {
        name: 'Kurva Gradasi Uji Pasir',
        xRef: '$C$8:$C$14',
        yRef: '$G$8:$G$14',
        color: '1E40AF',
        lineWidth: 25400,
        marker: 'circle',
        markerSize: 5,
        smooth: false,
      },
      {
        name: 'Batas Bawah SNI (Zona II)',
        xRef: '$C$8:$C$14',
        yRef: '$H$8:$H$14',
        color: 'DC2626',
        lineWidth: 18000,
        dash: true,
        marker: 'none',
        smooth: false,
      },
      {
        name: 'Batas Atas SNI (Zona II)',
        xRef: '$C$8:$C$14',
        yRef: '$I$8:$I$14',
        color: '16A34A',
        lineWidth: 18000,
        dash: true,
        marker: 'none',
        smooth: false,
      },
    ],
  })

  const filePath = path.join(TEMPLATES_DIR, 'gradasi-halus-template.xlsx')
  fs.writeFileSync(filePath, finalBuffer)
  console.log('Template created with Native Chart:', filePath)

  // Also duplicate to gradasi-template.xlsx for backward compatibility
  const legacyPath = path.join(TEMPLATES_DIR, 'gradasi-template.xlsx')
  fs.writeFileSync(legacyPath, finalBuffer)
  console.log('Legacy alias updated:', legacyPath)
}

// 3. TEMPLATE GRADASI AGREGAT KASAR (gradasi-kasar-template.xlsx) + EMBEDDED CHART
async function createGradasiKasarTemplate() {
  const wb = new ExcelJS.Workbook()
  const sheetName = 'Blangko Analisis Saringan'
  const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] })
  const totalCols = 9

  applyCommonHeader(ws, 'Analisis Gradasi Agregat Kasar', 'Bahan Bangunan • Bab 2: Agregat Kasar', 'SNI ASTM C136:2012', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Nomor Saringan\nASTM' },
    { col: 3, text: 'Ukuran Lubang\n[mm]' },
    { col: 4, text: 'Berat Tertahan\n[gram]' },
    { col: 5, text: 'Persen Tertahan\n[%]' },
    { col: 6, text: 'Kumulatif Tertahan\n[%]' },
    { col: 7, text: 'Persen Lolos\n[%]' },
    { col: 8, text: 'Batas Bawah\nSNI [%]' },
    { col: 9, text: 'Batas Atas\nSNI [%]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  // Standar Fraksi Kerikil (Maks 37.5 mm)
  const sievesPreset = [
    { name: '1 1/2" (37.5 mm)', size: 37.5, defW: 0, bb: 100, ba: 100 },
    { name: '1" (25.0 mm)', size: 25.0, defW: 250, bb: 95, ba: 100 },
    { name: '3/4" (19.0 mm)', size: 19.0, defW: 850, bb: 35, ba: 70 },
    { name: '1/2" (12.5 mm)', size: 12.5, defW: 1100, bb: 10, ba: 30 },
    { name: '3/8" (9.5 mm)', size: 9.5, defW: 900, bb: 0, ba: 10 },
    { name: 'No. 4 (4.75 mm)', size: 4.75, defW: 600, bb: 0, ba: 5 },
    { name: 'No. 8 (2.36 mm)', size: 2.36, defW: 200, bb: 0, ba: 2 },
    { name: 'Pan Penampung', size: 0, defW: 100, bb: 0, ba: 0 },
  ]

  const totalRow = 8 + sievesPreset.length

  sievesPreset.forEach((s, idx) => {
    const r = 8 + idx
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = s.name
    ws.getCell(r, 2).alignment = { horizontal: 'left' }
    ws.getCell(r, 2).font = { name: 'Arial', size: 8.5, bold: true }

    ws.getCell(r, 3).value = s.size
    ws.getCell(r, 3).numFmt = '#,##0.00'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = s.defW
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = { formula: `IF($D$${totalRow}>0, (D${r}/$D$${totalRow})*100, 0)`, result: 0 }
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    if (idx === 0) {
      ws.getCell(r, 6).value = { formula: `E${r}`, result: 0 }
    } else {
      ws.getCell(r, 6).value = { formula: `F${r - 1}+E${r}`, result: 0 }
    }
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    ws.getCell(r, 7).value = { formula: `MAX(0, 100-F${r})`, result: 100 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    ws.getCell(r, 8).value = s.bb
    ws.getCell(r, 8).numFmt = '#,##0.0'
    ws.getCell(r, 8).alignment = { horizontal: 'center' }

    ws.getCell(r, 9).value = s.ba
    ws.getCell(r, 9).numFmt = '#,##0.0'
    ws.getCell(r, 9).alignment = { horizontal: 'center' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  })

  // Baris Total
  ws.getRow(totalRow).height = 22
  ws.mergeCells(totalRow, 1, totalRow, 3)
  const lblT = ws.getCell(totalRow, 1)
  lblT.value = 'JUMLAH TOTAL (SUM) :'
  lblT.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lblT.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lblT.alignment = { horizontal: 'right', vertical: 'middle' }

  const valTotW = ws.getCell(totalRow, 4)
  valTotW.value = { formula: `SUM(D8:D${totalRow - 1})`, result: 4000 }
  valTotW.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  valTotW.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  valTotW.numFmt = '#,##0.00'
  valTotW.alignment = { horizontal: 'right', vertical: 'middle' }

  const valTotPct = ws.getCell(totalRow, 5)
  valTotPct.value = { formula: `SUM(E8:E${totalRow - 1})`, result: 100 }
  valTotPct.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  valTotPct.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  valTotPct.numFmt = '#,##0.00'
  valTotPct.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(totalRow, 6).value = '-'
  ws.getCell(totalRow, 6).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 7).value = '-'
  ws.getCell(totalRow, 7).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 8).value = '-'
  ws.getCell(totalRow, 8).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 9).value = '-'
  ws.getCell(totalRow, 9).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 9).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(totalRow, c).border = BORDER_DOUBLE_BOTTOM
  }

  // Parameter MHB
  const mhbRow = totalRow + 1
  ws.getRow(mhbRow).height = 20
  ws.mergeCells(mhbRow, 1, mhbRow, 3)
  ws.getCell(mhbRow, 1).value = 'Modulus Halus Butir (MHB Kerikil) :'
  ws.getCell(mhbRow, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(mhbRow, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(mhbRow, 4).value = { formula: `SUM(F8:F14)/100`, result: 6.85 }
  ws.getCell(mhbRow, 4).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.NAVY_HEADER } }
  ws.getCell(mhbRow, 4).numFmt = '#,##0.00'
  ws.getCell(mhbRow, 4).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.columns = [
    { width: 6 },
    { width: 22 },
    { width: 18 },
    { width: 20 },
    { width: 18 },
    { width: 20 },
    { width: 18 },
    { width: 16 },
    { width: 16 },
  ]

  applyCommonFooter(ws, mhbRow + 1, totalCols)

  // Embed Native Scatter Chart
  const finalBuffer = await embedNativeChart(wb, {
    sheetName,
    chartTitle: 'KURVA GRADASI AGREGAT KASAR (SNI ASTM C136:2012)',
    xTitle: 'Ukuran Lubang Ayakan (mm) [Skala Logaritmik]',
    yTitle: 'Persen Lolos Kumulatif (%)',
    isLogX: true,
    yMin: 0,
    yMax: 100,
    fromCol: 10,
    fromRow: 3,
    toCol: 20,
    toRow: 24,
    series: [
      {
        name: 'Kurva Gradasi Uji Kerikil',
        xRef: '$C$8:$C$14',
        yRef: '$G$8:$G$14',
        color: '1E40AF',
        lineWidth: 25400,
        marker: 'circle',
        markerSize: 5,
        smooth: false,
      },
      {
        name: 'Batas Bawah Spesifikasi',
        xRef: '$C$8:$C$14',
        yRef: '$H$8:$H$14',
        color: 'DC2626',
        lineWidth: 18000,
        dash: true,
        marker: 'none',
        smooth: false,
      },
      {
        name: 'Batas Atas Spesifikasi',
        xRef: '$C$8:$C$14',
        yRef: '$I$8:$I$14',
        color: '16A34A',
        lineWidth: 18000,
        dash: true,
        marker: 'none',
        smooth: false,
      },
    ],
  })

  const filePath = path.join(TEMPLATES_DIR, 'gradasi-kasar-template.xlsx')
  fs.writeFileSync(filePath, finalBuffer)
  console.log('Template created with Native Chart:', filePath)
}

// 4. TEMPLATE ANALISIS SARINGAN BUTIRAN TANAH (saringan-tanah-template.xlsx) + EMBEDDED CHART
async function createSaringanTanahTemplate() {
  const wb = new ExcelJS.Workbook()
  const sheetName = 'Analisis Saringan Tanah'
  const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] })
  const totalCols = 7

  applyCommonHeader(ws, 'Analisis Saringan Butiran Tanah', 'Mekanika Tanah • Bab 4: Analisis Butiran', 'SNI 3423:2008 / ASTM D422', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Nomor Ayakan\nASTM' },
    { col: 3, text: 'Diameter Butir (d)\n[mm]' },
    { col: 4, text: 'Berat Tertahan\n[gram]' },
    { col: 5, text: 'Persen Tertahan\n[%]' },
    { col: 6, text: 'Kumulatif Tertahan\n[%]' },
    { col: 7, text: 'Persen Lolos\n[%]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  const sievesPreset = [
    { name: 'No. 4 (4.75 mm)', size: 4.75, defW: 20 },
    { name: 'No. 10 (2.00 mm)', size: 2.0, defW: 60 },
    { name: 'No. 20 (0.85 mm)', size: 0.85, defW: 100 },
    { name: 'No. 40 (0.425 mm)', size: 0.425, defW: 100 },
    { name: 'No. 60 (0.25 mm)', size: 0.25, defW: 90 },
    { name: 'No. 100 (0.15 mm)', size: 0.15, defW: 55 },
    { name: 'No. 200 (0.075 mm)', size: 0.075, defW: 45 },
    { name: 'Pan Penampung', size: 0, defW: 24 },
  ]

  const totalRow = 8 + sievesPreset.length

  sievesPreset.forEach((s, idx) => {
    const r = 8 + idx
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = s.name
    ws.getCell(r, 2).alignment = { horizontal: 'left' }
    ws.getCell(r, 2).font = { name: 'Arial', size: 8.5, bold: true }

    ws.getCell(r, 3).value = s.size
    ws.getCell(r, 3).numFmt = '#,##0.000'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = s.defW
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = { formula: `IF($D$${totalRow}>0, (D${r}/$D$${totalRow})*100, 0)`, result: 0 }
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    if (idx === 0) {
      ws.getCell(r, 6).value = { formula: `E${r}`, result: 0 }
    } else {
      ws.getCell(r, 6).value = { formula: `F${r - 1}+E${r}`, result: 0 }
    }
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    ws.getCell(r, 7).value = { formula: `MAX(0, 100-F${r})`, result: 100 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  })

  // Baris Total
  ws.getRow(totalRow).height = 22
  ws.mergeCells(totalRow, 1, totalRow, 3)
  const lblT = ws.getCell(totalRow, 1)
  lblT.value = 'BERAT TOTAL SAMPEL (W_total) :'
  lblT.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lblT.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lblT.alignment = { horizontal: 'right', vertical: 'middle' }

  const valTotW = ws.getCell(totalRow, 4)
  valTotW.value = { formula: `SUM(D8:D${totalRow - 1})`, result: 494 }
  valTotW.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  valTotW.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  valTotW.numFmt = '#,##0.00'
  valTotW.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(totalRow, 5).value = { formula: `SUM(E8:E${totalRow - 1})`, result: 100 }
  ws.getCell(totalRow, 5).numFmt = '#,##0.00'
  ws.getCell(totalRow, 5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 6).value = '-'
  ws.getCell(totalRow, 6).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(totalRow, 7).value = '-'
  ws.getCell(totalRow, 7).alignment = { horizontal: 'center' }
  ws.getCell(totalRow, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(totalRow, c).border = BORDER_DOUBLE_BOTTOM
  }

  // Kotak Parameter Geoteknik (D10, D30, D60, Cu, Cc, USCS)
  const p1 = totalRow + 2
  ws.getRow(p1).height = 20
  ws.getCell(`B${p1}`).value = 'Ukuran Butir D60 :'
  ws.getCell(`B${p1}`).font = { name: 'Arial', size: 8.5, bold: true }
  ws.getCell(`C${p1}`).value = 0.74
  ws.getCell(`C${p1}`).numFmt = '#,##0.000'
  ws.getCell(`E${p1}`).value = 'Koefisien Keseragaman (Cu) :'
  ws.getCell(`E${p1}`).font = { name: 'Arial', size: 8.5, bold: true }
  ws.getCell(`F${p1}`).value = 7.25
  ws.getCell(`F${p1}`).numFmt = '#,##0.00'

  const p2 = totalRow + 3
  ws.getRow(p2).height = 20
  ws.getCell(`B${p2}`).value = 'Ukuran Butir D30 :'
  ws.getCell(`B${p2}`).font = { name: 'Arial', size: 8.5, bold: true }
  ws.getCell(`C${p2}`).value = 0.281
  ws.getCell(`C${p2}`).numFmt = '#,##0.000'
  ws.getCell(`E${p2}`).value = 'Koefisien Kelengkungan (Cc) :'
  ws.getCell(`E${p2}`).font = { name: 'Arial', size: 8.5, bold: true }
  ws.getCell(`F${p2}`).value = 1.05
  ws.getCell(`F${p2}`).numFmt = '#,##0.00'

  const p3 = totalRow + 4
  ws.getRow(p3).height = 20
  ws.getCell(`B${p3}`).value = 'Ukuran Efektif D10 :'
  ws.getCell(`B${p3}`).font = { name: 'Arial', size: 8.5, bold: true }
  ws.getCell(`C${p3}`).value = 0.102
  ws.getCell(`C${p3}`).numFmt = '#,##0.000'
  ws.getCell(`E${p3}`).value = 'Fraksi Halus Lolos #200 :'
  ws.getCell(`E${p3}`).font = { name: 'Arial', size: 8.5, bold: true }
  ws.getCell(`F${p3}`).value = '4.86%'
  ws.getCell(`F${p3}`).alignment = { horizontal: 'right' }

  const p4 = totalRow + 5
  ws.getRow(p4).height = 22
  ws.getCell(`B${p4}`).value = 'Klasifikasi USCS :'
  ws.getCell(`B${p4}`).font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.TABLE_HEADER } }
  ws.mergeCells(`C${p4}:F${p4}`)
  ws.getCell(`C${p4}`).value = 'SW (Pasir Bergradasi Baik / Well-Graded Sand)'
  ws.getCell(`C${p4}`).font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.NAVY_HEADER } }

  ws.columns = [
    { width: 6 },
    { width: 22 },
    { width: 18 },
    { width: 20 },
    { width: 18 },
    { width: 20 },
    { width: 18 },
  ]

  applyCommonFooter(ws, p4 + 1, totalCols)

  // Embed Native Scatter Chart (Semi-log)
  const finalBuffer = await embedNativeChart(wb, {
    sheetName,
    chartTitle: 'KURVA DISTRIBUSI BUTIRAN TANAH (GRAIN SIZE DISTRIBUTION)',
    xTitle: 'Diameter Butir Tanah (mm) [Skala Logaritmik]',
    yTitle: 'Persen Lolos Kumulatif (%)',
    isLogX: true,
    yMin: 0,
    yMax: 100,
    fromCol: 8,  // Kolom I
    fromRow: 3,  // Baris 4
    toCol: 18,  // Kolom S
    toRow: 24,  // Baris 25
    series: [
      {
        name: 'Kurva Butiran Tanah',
        xRef: '$C$8:$C$14',
        yRef: '$G$8:$G$14',
        color: '2563EB',
        lineWidth: 25400,
        marker: 'circle',
        markerSize: 5,
        smooth: false,
      },
    ],
  })

  const filePath = path.join(TEMPLATES_DIR, 'saringan-tanah-template.xlsx')
  fs.writeFileSync(filePath, finalBuffer)
  console.log('Template created with Native Chart:', filePath)
}

// 5. TEMPLATE PEMADATAN PROCTOR (proctor-template.xlsx) + EMBEDDED CHART
async function createProctorTemplate() {
  const wb = new ExcelJS.Workbook()
  const sheetName = 'Pemadatan Proctor'
  const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] })
  const totalCols = 7

  applyCommonHeader(ws, 'Pengujian Pemadatan Standard Proctor', 'Mekanika Tanah • Bab 3: Pemadatan Tanah', 'SNI 1742:2008 / ASTM D698', totalCols)

  const headers = [
    { col: 1, text: 'Titik' },
    { col: 2, text: 'Identifikasi Benda Uji' },
    { col: 3, text: 'Massa Basah + Mold\n[gram]' },
    { col: 4, text: 'Kerapatan Basah (γ_wet)\n[gr/cm³]' },
    { col: 5, text: 'Kadar Air Rata-rata (w)\n[%]' },
    { col: 6, text: 'Kerapatan Kering (γ_dry)\n[gr/cm³]' },
    { col: 7, text: 'Zero Air Voids (γ_zav)\n[gr/cm³]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  // 5 Titik Pemadatan Standar
  const pointsPreset = [
    { name: 'Titik 1 (S1)', moldSoil: 3950, wet: 1.907, w: 9.8, dry: 1.737, zav: 2.103 },
    { name: 'Titik 2 (S2)', moldSoil: 4080, wet: 2.045, w: 12.4, dry: 1.819, zav: 2.007 },
    { name: 'Titik 3 (S3)', moldSoil: 4190, wet: 2.161, w: 15.1, dry: 1.878, zav: 1.918 },
    { name: 'Titik 4 (S4)', moldSoil: 4140, wet: 2.108, w: 17.8, dry: 1.790, zav: 1.836 },
    { name: 'Titik 5 (S5)', moldSoil: 4060, wet: 2.024, w: 20.5, dry: 1.680, zav: 1.761 },
  ]

  pointsPreset.forEach((p, idx) => {
    const r = 8 + idx
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = p.name
    ws.getCell(r, 2).alignment = { horizontal: 'left' }
    ws.getCell(r, 2).font = { name: 'Arial', size: 8.5, bold: true }

    ws.getCell(r, 3).value = p.moldSoil
    ws.getCell(r, 3).numFmt = '#,##0.0'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = p.wet
    ws.getCell(r, 4).numFmt = '#,##0.000'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = p.w
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    ws.getCell(r, 6).value = p.dry
    ws.getCell(r, 6).numFmt = '#,##0.000'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    ws.getCell(r, 7).value = p.zav
    ws.getCell(r, 7).numFmt = '#,##0.000'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  })

  // Parameter Ringkasan Hasil Pemadatan
  const pRow1 = 14
  ws.getRow(pRow1).height = 20
  ws.mergeCells(pRow1, 1, pRow1, 3)
  ws.getCell(pRow1, 1).value = 'Kerapatan Kering Maksimum (MDD) :'
  ws.getCell(pRow1, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(pRow1, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(pRow1, 4).value = 1.88
  ws.getCell(pRow1, 4).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.TABLE_HEADER } }
  ws.getCell(pRow1, 4).numFmt = '#,##0.000'
  ws.getCell(pRow1, 5).value = 'gr/cm³'

  const pRow2 = 15
  ws.getRow(pRow2).height = 20
  ws.mergeCells(pRow2, 1, pRow2, 3)
  ws.getCell(pRow2, 1).value = 'Kadar Air Optimum (OMC) :'
  ws.getCell(pRow2, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(pRow2, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(pRow2, 4).value = 15.1
  ws.getCell(pRow2, 4).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.TABLE_HEADER } }
  ws.getCell(pRow2, 4).numFmt = '#,##0.00'
  ws.getCell(pRow2, 5).value = '%'

  const pRow3 = 16
  ws.getRow(pRow3).height = 20
  ws.mergeCells(pRow3, 1, pRow3, 3)
  ws.getCell(pRow3, 1).value = 'Berat Jenis Tanah (Gs Acuan) :'
  ws.getCell(pRow3, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(pRow3, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(pRow3, 4).value = 2.65
  ws.getCell(pRow3, 4).font = { name: 'Arial', size: 9.5, bold: true }
  ws.getCell(pRow3, 4).numFmt = '#,##0.00'

  ws.columns = [
    { width: 6 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
  ]

  applyCommonFooter(ws, 17, totalCols)

  // Embed Native Scatter Chart (Parabolic Compaction Curve)
  const finalBuffer = await embedNativeChart(wb, {
    sheetName,
    chartTitle: 'KURVA PEMADATAN STANDARD PROCTOR & ZERO AIR VOIDS (ZAV)',
    xTitle: 'Kadar Air Tanah (w) [%]',
    yTitle: 'Kerapatan Kering (γ_dry) [gr/cm³]',
    isLogX: false,
    yMin: 1.5,
    yMax: 2.2,
    fromCol: 8,  // Kolom I
    fromRow: 3,  // Baris 4
    toCol: 18,  // Kolom S
    toRow: 24,  // Baris 25
    series: [
      {
        name: 'Kurva Kompaksi (γ_dry)',
        xRef: '$E$8:$E$12',
        yRef: '$F$8:$F$12',
        color: '1E40AF',
        lineWidth: 25400,
        marker: 'circle',
        markerSize: 6,
        smooth: true,
      },
      {
        name: 'Kurva Kejenuhan 100% (ZAV)',
        xRef: '$E$8:$E$12',
        yRef: '$G$8:$G$12',
        color: 'DC2626',
        lineWidth: 18000,
        dash: true,
        marker: 'none',
        smooth: true,
      },
    ],
  })

  const filePath = path.join(TEMPLATES_DIR, 'proctor-template.xlsx')
  fs.writeFileSync(filePath, finalBuffer)
  console.log('Template created with Native Chart:', filePath)
}

// 6. TEMPLATE BATAS CAIR CASAGRANDE (casagrande-template.xlsx) + EMBEDDED CHART
async function createCasagrandeTemplate() {
  const wb = new ExcelJS.Workbook()
  const sheetName = 'Batas Cair Casagrande'
  const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] })
  const totalCols = 7

  applyCommonHeader(ws, 'Pengujian Batas Cair Casagrande', 'Mekanika Tanah • Bab 2: Sifat Fisik Tanah', 'SNI 1967:2008 / ASTM D4318', totalCols)

  const headers = [
    { col: 1, text: 'Titik' },
    { col: 2, text: 'Jumlah Ketukan\n(N)' },
    { col: 3, text: 'Nomor / Kode\nCawan' },
    { col: 4, text: 'Berat Cawan (W1)\n[gram]' },
    { col: 5, text: 'Cawan + Basah (W2)\n[gram]' },
    { col: 6, text: 'Cawan + Kering (W3)\n[gram]' },
    { col: 7, text: 'Kadar Air (w)\n[%]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  const pointsPreset = [
    { n: 16, code: 'C-01', w1: 12.4, w2: 36.8, w3: 29.2, w: 45.24 },
    { n: 22, code: 'C-02', w1: 11.8, w2: 38.5, w3: 30.5, w: 42.78 },
    { n: 28, code: 'C-03', w1: 12.1, w2: 37.2, w3: 29.9, w: 41.01 },
    { n: 33, code: 'C-04', w1: 12.5, w2: 39.4, w3: 31.8, w: 39.38 },
  ]

  pointsPreset.forEach((p, idx) => {
    const r = 8 + idx
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = p.n
    ws.getCell(r, 2).numFmt = '#,##0'
    ws.getCell(r, 2).alignment = { horizontal: 'center' }
    ws.getCell(r, 2).font = { name: 'Arial', size: 9, bold: true }

    ws.getCell(r, 3).value = p.code
    ws.getCell(r, 3).alignment = { horizontal: 'left' }

    ws.getCell(r, 4).value = p.w1
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = p.w2
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    ws.getCell(r, 6).value = p.w3
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // w = ((W2 - W3)/(W3 - W1)) * 100
    ws.getCell(r, 7).value = { formula: `IF(F${r}>D${r}, ((E${r}-F${r})/(F${r}-D${r}))*100, 0)`, result: p.w }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  })

  // Parameter Hasil Batas Cair
  const pRow1 = 13
  ws.getRow(pRow1).height = 20
  ws.mergeCells(pRow1, 1, pRow1, 3)
  ws.getCell(pRow1, 1).value = 'Batas Cair (Liquid Limit / LL pada N = 25) :'
  ws.getCell(pRow1, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(pRow1, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(pRow1, 4).value = 42.18
  ws.getCell(pRow1, 4).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.TABLE_HEADER } }
  ws.getCell(pRow1, 4).numFmt = '#,##0.00'
  ws.getCell(pRow1, 5).value = '%'

  const pRow2 = 14
  ws.getRow(pRow2).height = 20
  ws.mergeCells(pRow2, 1, pRow2, 3)
  ws.getCell(pRow2, 1).value = 'Indeks Aliran (Flow Index If) :'
  ws.getCell(pRow2, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(pRow2, 1).alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getCell(pRow2, 4).value = 18.25
  ws.getCell(pRow2, 4).font = { name: 'Arial', size: 9.5, bold: true }
  ws.getCell(pRow2, 4).numFmt = '#,##0.00'

  ws.columns = [
    { width: 6 },
    { width: 18 },
    { width: 18 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
    { width: 18 },
  ]

  applyCommonFooter(ws, 15, totalCols)

  // Embed Native Scatter Chart (Flow Curve Semi-log)
  const finalBuffer = await embedNativeChart(wb, {
    sheetName,
    chartTitle: 'KURVA ALIRAN BATAS CAIR CASAGRANDE (FLOW CURVE)',
    xTitle: 'Jumlah Ketukan Cawan (N) [Skala Logaritmik]',
    yTitle: 'Kadar Air Tanah (w) [%]',
    isLogX: true,
    yMin: 30,
    yMax: 55,
    fromCol: 8,
    fromRow: 3,
    toCol: 18,
    toRow: 22,
    series: [
      {
        name: 'Kurva Aliran Uji Casagrande',
        xRef: '$B$8:$B$11',
        yRef: '$G$8:$G$11',
        color: '2563EB',
        lineWidth: 25400,
        marker: 'circle',
        markerSize: 6,
        smooth: false,
      },
    ],
  })

  const filePath = path.join(TEMPLATES_DIR, 'casagrande-template.xlsx')
  fs.writeFileSync(filePath, finalBuffer)
  console.log('Template created with Native Chart:', filePath)
}

// 7. TEMPLATE BERAT JENIS (berat-jenis-template.xlsx)
async function createBeratJenisTemplate() {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Blangko Berat Jenis', { views: [{ showGridLines: true }] })
  const totalCols = 9

  applyCommonHeader(ws, 'Pengujian Berat Jenis & Penyerapan Agregat', 'Sifat Fisik Agregat', 'SNI 1970:2016 / SNI 1969:2016', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Benda Uji / Sampel' },
    { col: 3, text: 'Berat SSD (S)\n[gram]' },
    { col: 4, text: 'Berat Kering (A)\n[gram]' },
    { col: 5, text: 'Piknometer + Air (B)\n[gram]' },
    { col: 6, text: 'Pikno + SSD + Air (C)\n[gram]' },
    { col: 7, text: 'BJ Curah / Bulk (Sd)\n[A / (B + S - C)]' },
    { col: 8, text: 'BJ SSD (Ss)\n[S / (B + S - C)]' },
    { col: 9, text: 'Penyerapan Air (Sw)\n[%]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  for (let i = 1; i <= 3; i++) {
    const r = 7 + i
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = i
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = `Benda Uji ${i}`
    ws.getCell(r, 2).alignment = { horizontal: 'left' }

    ws.getCell(r, 3).value = 500
    ws.getCell(r, 3).numFmt = '#,##0.00'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = 490
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = 665
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    ws.getCell(r, 6).value = 980
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    ws.getCell(r, 7).value = { formula: `D${r}/(E${r}+C${r}-F${r})`, result: 2.65 }
    ws.getCell(r, 7).numFmt = '#,##0.000'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    ws.getCell(r, 8).value = { formula: `C${r}/(E${r}+C${r}-F${r})`, result: 2.7 }
    ws.getCell(r, 8).numFmt = '#,##0.000'
    ws.getCell(r, 8).alignment = { horizontal: 'right' }

    ws.getCell(r, 9).value = { formula: `((C${r}-D${r})/D${r})*100`, result: 2.04 }
    ws.getCell(r, 9).numFmt = '#,##0.00'
    ws.getCell(r, 9).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  }

  const avgRow = 11
  ws.getRow(avgRow).height = 22
  ws.mergeCells(avgRow, 1, avgRow, 6)
  const lbl = ws.getCell(avgRow, 1)
  lbl.value = 'RATA-RATA KESELURUHAN (AVERAGE) :'
  lbl.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lbl.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 7).value = { formula: `AVERAGE(G8:G10)`, result: 2.65 }
  ws.getCell(avgRow, 7).numFmt = '#,##0.000'
  ws.getCell(avgRow, 7).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 7).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 8).value = { formula: `AVERAGE(H8:H10)`, result: 2.7 }
  ws.getCell(avgRow, 8).numFmt = '#,##0.000'
  ws.getCell(avgRow, 8).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 8).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 9).value = { formula: `AVERAGE(I8:I10)`, result: 2.04 }
  ws.getCell(avgRow, 9).numFmt = '#,##0.00'
  ws.getCell(avgRow, 9).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 9).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 9).alignment = { horizontal: 'right', vertical: 'middle' }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(avgRow, c).border = BORDER_DOUBLE_BOTTOM
  }

  ws.columns = [
    { width: 6 },
    { width: 22 },
    { width: 18 },
    { width: 18 },
    { width: 20 },
    { width: 22 },
    { width: 20 },
    { width: 18 },
    { width: 20 },
  ]

  applyCommonFooter(ws, avgRow + 1, totalCols)

  const filePath = path.join(TEMPLATES_DIR, 'berat-jenis-template.xlsx')
  await wb.xlsx.writeFile(filePath)
  console.log('Template created:', filePath)
}

// 8. TEMPLATE KUAT TARIK BAJA (kuat-tarik-template.xlsx)
async function createKuatTarikTemplate() {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Uji Kuat Tarik Baja', { views: [{ showGridLines: true }] })
  const totalCols = 8

  applyCommonHeader(ws, 'Pengujian Kuat Tarik Baja Beton', 'Baja Tulangan Beton', 'SNI 2052:2017', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Identifikasi Benda Uji' },
    { col: 3, text: 'Diameter Nominal (d)\n[mm]' },
    { col: 4, text: 'Luas Penampang (Ao)\n[mm²]' },
    { col: 5, text: 'Beban Leleh (Py)\n[kN]' },
    { col: 6, text: 'Beban Maksimum (Pu)\n[kN]' },
    { col: 7, text: 'Tegangan Leleh (fy)\n[MPa]' },
    { col: 8, text: 'Kuat Tarik (fu)\n[MPa]' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  for (let i = 1; i <= 3; i++) {
    const r = 7 + i
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = i
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = `Spesimen Baja #${i} (D16)`
    ws.getCell(r, 2).alignment = { horizontal: 'left' }

    ws.getCell(r, 3).value = 16
    ws.getCell(r, 3).numFmt = '#,##0.0'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = { formula: `0.25*PI()*C${r}^2`, result: 201.06 }
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = 85.5
    ws.getCell(r, 5).numFmt = '#,##0.0'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    ws.getCell(r, 6).value = 115.2
    ws.getCell(r, 6).numFmt = '#,##0.0'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    ws.getCell(r, 7).value = { formula: `(E${r}*1000)/D${r}`, result: 425.24 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    ws.getCell(r, 8).value = { formula: `(F${r}*1000)/D${r}`, result: 572.96 }
    ws.getCell(r, 8).numFmt = '#,##0.00'
    ws.getCell(r, 8).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  }

  const avgRow = 11
  ws.getRow(avgRow).height = 22
  ws.mergeCells(avgRow, 1, avgRow, 6)
  const lbl = ws.getCell(avgRow, 1)
  lbl.value = 'RATA-RATA KUAT TARIK (AVERAGE) :'
  lbl.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lbl.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 7).value = { formula: `AVERAGE(G8:G10)`, result: 425.24 }
  ws.getCell(avgRow, 7).numFmt = '#,##0.00'
  ws.getCell(avgRow, 7).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 7).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 8).value = { formula: `AVERAGE(H8:H10)`, result: 572.96 }
  ws.getCell(avgRow, 8).numFmt = '#,##0.00'
  ws.getCell(avgRow, 8).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 8).alignment = { horizontal: 'right', vertical: 'middle' }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(avgRow, c).border = BORDER_DOUBLE_BOTTOM
  }

  ws.columns = [
    { width: 6 },
    { width: 26 },
    { width: 22 },
    { width: 22 },
    { width: 20 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
  ]

  applyCommonFooter(ws, avgRow + 1, totalCols)

  const filePath = path.join(TEMPLATES_DIR, 'kuat-tarik-template.xlsx')
  await wb.xlsx.writeFile(filePath)
  console.log('Template created:', filePath)
}

// 9. TEMPLATE SONDIR CPT (sondir-cpt-template.xlsx)
async function createSondirCptTemplate() {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Hasil Uji Sondir CPT', { views: [{ showGridLines: true }] })
  const totalCols = 8

  applyCommonHeader(ws, 'Pengujian Penetrasi Konus Statis (Sondir CPT)', 'Penyelidikan Geoteknik Lapangan', 'SNI 2827:2008 / ASTM D3441', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Kedalaman (z)\n[meter]' },
    { col: 3, text: 'Perlawanan Konus (qc)\n[kg/cm²]' },
    { col: 4, text: 'Jumlah Perlawanan (qc+fs)\n[kg/cm²]' },
    { col: 5, text: 'Hambatan Pelekat (fs)\n[kg/cm²]' },
    { col: 6, text: 'Total Hambatan (Tf)\n[kg/cm]' },
    { col: 7, text: 'Rasio Gesekan (FR)\n[%]' },
    { col: 8, text: 'Klasifikasi Lapisan Tanah\n(SBT Robertson)' },
  ]

  ws.getRow(7).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(7, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  for (let i = 0; i <= 10; i++) {
    const r = 8 + i
    ws.getRow(r).height = 19
    const depth = +(i * 0.2).toFixed(1)

    ws.getCell(r, 1).value = i + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = depth
    ws.getCell(r, 2).numFmt = '#,##0.00'
    ws.getCell(r, 2).alignment = { horizontal: 'center' }

    ws.getCell(r, 3).value = 10 + i * 5
    ws.getCell(r, 3).numFmt = '#,##0.0'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = 15 + i * 8
    ws.getCell(r, 4).numFmt = '#,##0.0'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = { formula: `MAX(0, (D${r}-C${r})/10)`, result: 0.5 + i * 0.3 }
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    if (i === 0) {
      ws.getCell(r, 6).value = { formula: `E${r}*20`, result: 10 }
    } else {
      ws.getCell(r, 6).value = { formula: `F${r - 1}+(E${r}*20)`, result: 0 }
    }
    ws.getCell(r, 6).numFmt = '#,##0.0'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    ws.getCell(r, 7).value = { formula: `IF(C${r}>0, (E${r}/C${r})*100, 0)`, result: 5 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    ws.getCell(r, 8).value = i < 3 ? 'Lempung Lunak' : i < 6 ? 'Lanau Berpasir' : 'Pasir Padat'
    ws.getCell(r, 8).alignment = { horizontal: 'left' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  }

  ws.columns = [
    { width: 6 },
    { width: 16 },
    { width: 24 },
    { width: 26 },
    { width: 22 },
    { width: 22 },
    { width: 20 },
    { width: 26 },
  ]

  applyCommonFooter(ws, 19, totalCols)

  const filePath = path.join(TEMPLATES_DIR, 'sondir-cpt-template.xlsx')
  await wb.xlsx.writeFile(filePath)
  console.log('Template created:', filePath)
}

async function run() {
  console.log('Generating master civil engineering Excel templates into:', TEMPLATES_DIR)
  await createWaterContentTemplate()
  await createGradasiHalusTemplate()
  await createGradasiKasarTemplate()
  await createSaringanTanahTemplate()
  await createProctorTemplate()
  await createCasagrandeTemplate()
  await createBeratJenisTemplate()
  await createKuatTarikTemplate()
  await createSondirCptTemplate()
  console.log('ALL civil engineering master Excel templates successfully generated with native charts!')
}

run().catch((err) => {
  console.error('Error generating templates:', err)
  process.exit(1)
})
