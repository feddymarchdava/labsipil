import ExcelJS from 'exceljs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TEMPLATES_DIR = path.resolve(__dirname, '../public/excel-templates')

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
  // Baris 1: Kop Institusi
  ws.mergeCells(1, 1, 1, totalCols)
  const c1 = ws.getCell(1, 1)
  c1.value = 'LABORATORIUM TEKNIK SIPIL - LEMBAR KERJA PRAKTIKUM'
  c1.font = { name: 'Arial', size: 13, bold: true, color: { argb: COLORS.WHITE } }
  c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.NAVY_HEADER } }
  c1.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getRow(1).height = 26

  // Baris 2: Sub-Kop
  ws.mergeCells(2, 1, 2, totalCols)
  const c2 = ws.getCell(2, 1)
  c2.value = 'LabSipil Engineering Platform • Standar Laboratorium Resmi'
  c2.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FFE2E8F0' } }
  c2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.BLUE_SUBHEADER } }
  c2.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getRow(2).height = 18

  ws.getRow(3).height = 6

  // Baris 4: Judul Blangko Modul
  ws.mergeCells(4, 1, 4, totalCols)
  const c4 = ws.getCell(4, 1)
  c4.value = `BLANGKO UJI: ${title.toUpperCase()} (${standard})`
  c4.font = { name: 'Arial', size: 10.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
  c4.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.LIGHT_BLUE } }
  c4.alignment = { horizontal: 'center', vertical: 'middle' }
  c4.border = {
    top: { style: 'medium', color: { argb: COLORS.BLUE_SUBHEADER } },
    bottom: { style: 'medium', color: { argb: COLORS.BLUE_SUBHEADER } },
    left: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
    right: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
  }
  ws.getRow(4).height = 24

  // Baris 5-7: Informasi Metadata Proyek
  const midCol = Math.max(3, Math.floor(totalCols / 2))
  const metaLeft = [
    { label: 'Proyek / Mata Kuliah', key: 'proyek', defaultVal: 'Praktikum Laboratorium Teknik Sipil' },
    { label: 'Lokasi Pengujian', key: 'lokasi', defaultVal: 'Laboratorium Rekayasa Sipil' },
    { label: 'Benda Uji / Sampel', key: 'sampel', defaultVal: subtitle || '-' },
  ]
  const metaRight = [
    { label: 'Diuji Oleh (Praktikan)', key: 'diuji', defaultVal: 'Tim Mahasiswa / Praktikan' },
    { label: 'Diperiksa Oleh (Asisten)', key: 'diperiksa', defaultVal: 'Asisten Laboratorium' },
    { label: 'Tanggal Pelaksanaan', key: 'tanggal', defaultVal: new Date().toISOString().split('T')[0] },
  ]

  metaLeft.forEach((item, idx) => {
    const r = 5 + idx
    ws.getRow(r).height = 18

    ws.getCell(r, 1).value = item.label
    ws.getCell(r, 1).font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
    ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
    ws.getCell(r, 1).border = BORDER_THIN

    ws.mergeCells(r, 2, r, midCol)
    const valL = ws.getCell(r, 2)
    valL.value = `:  ${item.defaultVal}`
    valL.font = { name: 'Arial', size: 8.5, color: { argb: COLORS.DARK_TEXT } }
    valL.border = BORDER_THIN

    const rCol = midCol + 1
    ws.getCell(r, rCol).value = metaRight[idx].label
    ws.getCell(r, rCol).font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
    ws.getCell(r, rCol).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
    ws.getCell(r, rCol).border = BORDER_THIN

    if (rCol + 1 <= totalCols) {
      ws.mergeCells(r, rCol + 1, r, totalCols)
      const valR = ws.getCell(r, rCol + 1)
      valR.value = `:  ${metaRight[idx].defaultVal}`
      valR.font = { name: 'Arial', size: 8.5, color: { argb: COLORS.DARK_TEXT } }
      valR.border = BORDER_THIN
    }
  })

  ws.getRow(8).height = 10
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
  evalC.value = '[Template Kesimpulan]: Hasil pengujian memenuhi seluruh persyaratan spesifikasi standar teknis yang berlaku.'
  evalC.font = { name: 'Arial', size: 9, color: { argb: COLORS.DARK_TEXT } }
  evalC.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } }
  evalC.alignment = { horizontal: 'left', vertical: 'top', wrapText: true }
  evalC.border = BORDER_THIN
  ws.getRow(currRow).height = 22
  ws.getRow(currRow + 1).height = 22
  currRow += 2

  currRow++ // blank

  // Tanda Tangan
  const midCol = Math.max(3, Math.floor(totalCols / 2))
  ws.mergeCells(currRow, midCol + 1, currRow, totalCols)
  ws.getCell(currRow, midCol + 1).value = `Laboratorium Teknik Sipil, ${new Date().toISOString().split('T')[0]}`
  ws.getCell(currRow, midCol + 1).font = { name: 'Arial', size: 8.5, italic: true }
  ws.getCell(currRow, midCol + 1).alignment = { horizontal: 'center' }

  ws.mergeCells(currRow + 1, 1, currRow + 1, midCol)
  ws.getCell(currRow + 1, 1).value = 'Diuji oleh (Praktikan):'
  ws.getCell(currRow + 1, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(currRow + 1, 1).alignment = { horizontal: 'center' }

  ws.mergeCells(currRow + 1, midCol + 1, currRow + 1, totalCols)
  ws.getCell(currRow + 1, midCol + 1).value = 'Diperiksa & Disetujui oleh:'
  ws.getCell(currRow + 1, midCol + 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(currRow + 1, midCol + 1).alignment = { horizontal: 'center' }

  ws.getRow(currRow + 2).height = 18
  ws.getRow(currRow + 3).height = 18

  ws.mergeCells(currRow + 4, 1, currRow + 4, midCol)
  ws.getCell(currRow + 4, 1).value = '( Tim Mahasiswa / Praktikan )'
  ws.getCell(currRow + 4, 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(currRow + 4, 1).alignment = { horizontal: 'center' }

  ws.mergeCells(currRow + 4, midCol + 1, currRow + 4, totalCols)
  ws.getCell(currRow + 4, midCol + 1).value = '( Asisten Laboratorium )'
  ws.getCell(currRow + 4, midCol + 1).font = { name: 'Arial', size: 9, bold: true }
  ws.getCell(currRow + 4, midCol + 1).alignment = { horizontal: 'center' }
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

  ws.getRow(9).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(9, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  // 5 baris slot sampel template awal
  for (let i = 1; i <= 5; i++) {
    const r = 9 + i
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

    // Rumus Ww = W2 - W3
    ws.getCell(r, 6).value = { formula: `D${r}-E${r}`, result: 0 }
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // Rumus Ws = W3 - W1
    ws.getCell(r, 7).value = { formula: `E${r}-C${r}`, result: 0 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    // Rumus w = (Ww / Ws) * 100
    ws.getCell(r, 8).value = { formula: `IF(G${r}>0, (F${r}/G${r})*100, 0)`, result: 0 }
    ws.getCell(r, 8).numFmt = '#,##0.00'
    ws.getCell(r, 8).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  }

  // Baris Rata-rata
  const avgRow = 15
  ws.getRow(avgRow).height = 22
  ws.mergeCells(avgRow, 1, avgRow, 7)
  const lbl = ws.getCell(avgRow, 1)
  lbl.value = 'KADAR AIR RATA-RATA (w_rata) :'
  lbl.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lbl.alignment = { horizontal: 'right', vertical: 'middle' }

  const valAvg = ws.getCell(avgRow, 8)
  valAvg.value = { formula: `AVERAGE(H10:H14)`, result: 0 }
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

// 2. TEMPLATE GRADASI / ANALISIS SARINGAN (gradasi-template.xlsx)
async function createGradasiTemplate() {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Blangko Analisis Saringan', { views: [{ showGridLines: true }] })
  const totalCols = 7

  applyCommonHeader(ws, 'Pengujian Analisis Saringan Agregat', 'Gradasi Butiran', 'SNI ASTM C136:2012 / ASTM C136', totalCols)

  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Nomor Saringan\nASTM' },
    { col: 3, text: 'Ukuran Lubang\n[mm]' },
    { col: 4, text: 'Berat Tertahan\n[gram]' },
    { col: 5, text: 'Persen Tertahan\n[%]' },
    { col: 6, text: 'Kumulatif Tertahan\n[%]' },
    { col: 7, text: 'Persen Lolos\n[%]' },
  ]

  ws.getRow(9).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(9, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  const sievesPreset = [
    { name: '3/8" (9.5 mm)', size: 9.5, defW: 0 },
    { name: 'No. 4 (4.75 mm)', size: 4.75, defW: 25 },
    { name: 'No. 8 (2.36 mm)', size: 2.36, defW: 60 },
    { name: 'No. 16 (1.18 mm)', size: 1.18, defW: 120 },
    { name: 'No. 30 (0.60 mm)', size: 0.6, defW: 145 },
    { name: 'No. 50 (0.30 mm)', size: 0.3, defW: 110 },
    { name: 'No. 100 (0.15 mm)', size: 0.15, defW: 30 },
    { name: 'Pan', size: 0, defW: 10 },
  ]

  const totalRow = 10 + sievesPreset.length

  sievesPreset.forEach((s, idx) => {
    const r = 10 + idx
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = s.name
    ws.getCell(r, 2).alignment = { horizontal: 'center' }
    ws.getCell(r, 2).font = { name: 'Arial', size: 9, bold: true }

    ws.getCell(r, 3).value = s.size
    ws.getCell(r, 3).numFmt = '#,##0.000'
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
    ws.getCell(r, 7).value = { formula: `100-F${r}`, result: 100 }
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
  lblT.value = 'JUMLAH TOTAL (SUM) :'
  lblT.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lblT.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lblT.alignment = { horizontal: 'right', vertical: 'middle' }

  const valTotW = ws.getCell(totalRow, 4)
  valTotW.value = { formula: `SUM(D10:D${totalRow - 1})`, result: 500 }
  valTotW.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  valTotW.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  valTotW.numFmt = '#,##0.00'
  valTotW.alignment = { horizontal: 'right', vertical: 'middle' }

  const valTotPct = ws.getCell(totalRow, 5)
  valTotPct.value = { formula: `SUM(E10:E${totalRow - 1})`, result: 100 }
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

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(totalRow, c).border = BORDER_DOUBLE_BOTTOM
  }

  ws.columns = [
    { width: 6 },
    { width: 22 },
    { width: 18 },
    { width: 22 },
    { width: 20 },
    { width: 22 },
    { width: 20 },
  ]

  applyCommonFooter(ws, totalRow + 1, totalCols)

  const filePath = path.join(TEMPLATES_DIR, 'gradasi-template.xlsx')
  await wb.xlsx.writeFile(filePath)
  console.log('Template created:', filePath)
}

// 3. TEMPLATE BERAT JENIS (berat-jenis-template.xlsx)
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

  ws.getRow(9).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(9, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  for (let i = 1; i <= 3; i++) {
    const r = 9 + i
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

    // Formula Sd = A / (B + S - C)
    ws.getCell(r, 7).value = { formula: `D${r}/(E${r}+C${r}-F${r})`, result: 2.65 }
    ws.getCell(r, 7).numFmt = '#,##0.000'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    // Formula Ss = S / (B + S - C)
    ws.getCell(r, 8).value = { formula: `C${r}/(E${r}+C${r}-F${r})`, result: 2.7 }
    ws.getCell(r, 8).numFmt = '#,##0.000'
    ws.getCell(r, 8).alignment = { horizontal: 'right' }

    // Formula Sw = ((S - A) / A) * 100
    ws.getCell(r, 9).value = { formula: `((C${r}-D${r})/D${r})*100`, result: 2.04 }
    ws.getCell(r, 9).numFmt = '#,##0.00'
    ws.getCell(r, 9).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  }

  const avgRow = 13
  ws.getRow(avgRow).height = 22
  ws.mergeCells(avgRow, 1, avgRow, 6)
  const lbl = ws.getCell(avgRow, 1)
  lbl.value = 'RATA-RATA KESELURUHAN (AVERAGE) :'
  lbl.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lbl.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 7).value = { formula: `AVERAGE(G10:G12)`, result: 2.65 }
  ws.getCell(avgRow, 7).numFmt = '#,##0.000'
  ws.getCell(avgRow, 7).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 7).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 8).value = { formula: `AVERAGE(H10:H12)`, result: 2.7 }
  ws.getCell(avgRow, 8).numFmt = '#,##0.000'
  ws.getCell(avgRow, 8).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 8).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 9).value = { formula: `AVERAGE(I10:I12)`, result: 2.04 }
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

// 4. TEMPLATE KUAT TARIK BAJA (kuat-tarik-template.xlsx)
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

  ws.getRow(9).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(9, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  for (let i = 1; i <= 3; i++) {
    const r = 9 + i
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = i
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = `Spesimen Baja #${i} (D16)`
    ws.getCell(r, 2).alignment = { horizontal: 'left' }

    ws.getCell(r, 3).value = 16
    ws.getCell(r, 3).numFmt = '#,##0.0'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    // Luas Penampang Ao = 0.25 * PI * d^2
    ws.getCell(r, 4).value = { formula: `0.25*PI()*C${r}^2`, result: 201.06 }
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = 85.5
    ws.getCell(r, 5).numFmt = '#,##0.0'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    ws.getCell(r, 6).value = 115.2
    ws.getCell(r, 6).numFmt = '#,##0.0'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // fy = (Py * 1000) / Ao
    ws.getCell(r, 7).value = { formula: `(E${r}*1000)/D${r}`, result: 425.24 }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    // fu = (Pu * 1000) / Ao
    ws.getCell(r, 8).value = { formula: `(F${r}*1000)/D${r}`, result: 572.96 }
    ws.getCell(r, 8).numFmt = '#,##0.00'
    ws.getCell(r, 8).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }
  }

  const avgRow = 13
  ws.getRow(avgRow).height = 22
  ws.mergeCells(avgRow, 1, avgRow, 6)
  const lbl = ws.getCell(avgRow, 1)
  lbl.value = 'RATA-RATA KUAT TARIK (AVERAGE) :'
  lbl.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  lbl.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 7).value = { formula: `AVERAGE(G10:G12)`, result: 425.24 }
  ws.getCell(avgRow, 7).numFmt = '#,##0.00'
  ws.getCell(avgRow, 7).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(avgRow, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(avgRow, 7).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(avgRow, 8).value = { formula: `AVERAGE(H10:H12)`, result: 572.96 }
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

// 5. TEMPLATE SONDIR CPT (sondir-cpt-template.xlsx)
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

  ws.getRow(9).height = 28
  headers.forEach((h) => {
    const c = ws.getCell(9, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  for (let i = 0; i <= 10; i++) {
    const r = 10 + i
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

    // fs = (D - C) / 10
    ws.getCell(r, 5).value = { formula: `MAX(0, (D${r}-C${r})/10)`, result: 0.5 + i * 0.3 }
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    // Tf
    if (i === 0) {
      ws.getCell(r, 6).value = { formula: `E${r}*20`, result: 10 }
    } else {
      ws.getCell(r, 6).value = { formula: `F${r - 1}+(E${r}*20)`, result: 0 }
    }
    ws.getCell(r, 6).numFmt = '#,##0.0'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // FR = (fs / qc) * 100
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

  applyCommonFooter(ws, 22, totalCols)

  const filePath = path.join(TEMPLATES_DIR, 'sondir-cpt-template.xlsx')
  await wb.xlsx.writeFile(filePath)
  console.log('Template created:', filePath)
}

async function run() {
  console.log('Generating master civil engineering Excel templates into:', TEMPLATES_DIR)
  await createWaterContentTemplate()
  await createGradasiTemplate()
  await createBeratJenisTemplate()
  await createKuatTarikTemplate()
  await createSondirCptTemplate()
  console.log('All master Excel templates successfully generated!')
}

run().catch((err) => {
  console.error('Error generating templates:', err)
  process.exit(1)
})
