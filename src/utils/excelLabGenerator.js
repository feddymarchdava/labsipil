/**
 * =========================================================================
 * MODUL GENERATOR EXCEL STANDAR LABORATORIUM TEKNIK SIPIL (EXCELJS)
 * =========================================================================
 * Menghasilkan berkas spreadsheet (.xlsx) formal sesuai format blangko resmi
 * pengujian laboratorium Teknik Sipil (SNI / ASTM / Bina Marga 2018).
 * Dilengkapi kop dokumen, formatting tabel, grid border, warna header,
 * rumus formula sel Excel asli (dynamic formulas), dan lembar pengesahan.
 */

import ExcelJS from 'exceljs'

// Palet Warna Standar Rekayasa Sipil (Civil Engineering Lab Palette)
const COLORS = {
  NAVY_HEADER: 'FF1E3A8A',    // Biru Navy Kop Resmi
  BLUE_SUBHEADER: 'FF2563EB', // Biru Aksen Sub-Kop
  TABLE_HEADER: 'FF1E40AF',   // Biru Header Tabel
  TABLE_SUBHEADER: 'FF3B82F6',// Biru Muda Header Bertingkat
  ZEBRA_ROW: 'FFF8FAFC',      // Latar Baris Genap
  SUMMARY_ROW: 'FFECFDF5',    // Hijau Lembut Rata-rata / Total
  SUMMARY_TEXT: 'FF065F46',   // Teks Hijau Gelap Total
  BORDER_GRID: 'FFCBD5E1',    // Garis Grid Tipis (Slate 300)
  BORDER_HEADER: 'FF94A3B8',  // Garis Header Sedang (Slate 400)
  WHITE: 'FFFFFFFF',          // Putih Murni
  DARK_TEXT: 'FF0F172A',      // Slate 900
  MUTED_TEXT: 'FF64748B',     // Slate 500
  PASS_BG: 'FFDEF7EC',        // Hijau Lolos Spesifikasi
  PASS_TEXT: 'FF03543F',
  FAIL_BG: 'FFFDE8E8',        // Merah Tidak Memenuhi
  FAIL_TEXT: 'FF9B1C1C',
}

// Gaya Border
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

/**
 * Menerapkan styling kop dokumen resmi laboratorium teknik sipil pada baris 1 s.d. 8
 */
function applyLabDocumentHeader(ws, testConfig, metadata, totalCols = 8) {
  // Baris 1: Judul Utama Lembaga
  ws.mergeCells(1, 1, 1, totalCols)
  const titleCell = ws.getCell(1, 1)
  titleCell.value = 'LABORATORIUM TEKNIK SIPIL - PENGOLAHAN DATA PENGUJIAN'
  titleCell.font = { name: 'Arial', size: 13, bold: true, color: { argb: COLORS.WHITE } }
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.NAVY_HEADER } }
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getRow(1).height = 26

  // Baris 2: Sub-judul Aplikasi & Sistem
  ws.mergeCells(2, 1, 2, totalCols)
  const subCell = ws.getCell(2, 1)
  subCell.value = 'Aplikasi Komputer Teknik Sipil (LabSipil) • Standar SNI / ASTM / Bina Marga'
  subCell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FFE2E8F0' } }
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.BLUE_SUBHEADER } }
  subCell.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getRow(2).height = 18

  // Baris 3: Pemisah
  ws.getRow(3).height = 6

  // Baris 4: Judul Modul Pengujian Terpilih
  ws.mergeCells(4, 1, 4, totalCols)
  const modCell = ws.getCell(4, 1)
  modCell.value = `BLANGKO UJI: ${testConfig.name ? testConfig.name.toUpperCase() : 'PENGUJIAN LABORATORIUM'} (${testConfig.standard || 'SNI'})`
  modCell.font = { name: 'Arial', size: 10.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
  modCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } }
  modCell.alignment = { horizontal: 'center', vertical: 'middle' }
  modCell.border = {
    top: { style: 'medium', color: { argb: COLORS.BLUE_SUBHEADER } },
    bottom: { style: 'medium', color: { argb: COLORS.BLUE_SUBHEADER } },
    left: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
    right: { style: 'thin', color: { argb: COLORS.BORDER_GRID } },
  }
  ws.getRow(4).height = 24

  // Baris 5-7: Informasi Metadata Proyek (Grid 2 Kolom Kiri & Kanan)
  const midCol = Math.max(3, Math.floor(totalCols / 2))

  const metaItemsLeft = [
    { label: 'Proyek / Mata Kuliah', value: metadata.proyek || 'Praktikum Laboratorium Teknik Sipil' },
    { label: 'Lokasi Pengujian', value: metadata.lokasi || 'Laboratorium Bahan & Geoteknik' },
    { label: 'Benda Uji / Deskripsi', value: metadata.sampelDesc || testConfig.category || '-' },
  ]

  const metaItemsRight = [
    { label: 'Diuji Oleh (Praktikan)', value: metadata.diujiOleh || 'Tim Mahasiswa / Praktikan' },
    { label: 'Diperiksa Oleh (Asisten)', value: metadata.diperiksaOleh || 'Asisten Laboratorium' },
    { label: 'Tanggal Pelaksanaan', value: metadata.tanggal || new Date().toISOString().split('T')[0] },
  ]

  metaItemsLeft.forEach((item, idx) => {
    const rowNum = 5 + idx
    ws.getRow(rowNum).height = 18

    // Kiri: Label
    ws.getCell(rowNum, 1).value = item.label
    ws.getCell(rowNum, 1).font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
    ws.getCell(rowNum, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
    ws.getCell(rowNum, 1).border = BORDER_THIN

    // Kiri: Value (Merge col 2 s.d. midCol)
    ws.mergeCells(rowNum, 2, rowNum, midCol)
    const valCellL = ws.getCell(rowNum, 2)
    valCellL.value = `:  ${item.value}`
    valCellL.font = { name: 'Arial', size: 8.5, color: { argb: COLORS.DARK_TEXT } }
    valCellL.border = BORDER_THIN

    // Kanan: Label
    const rStartCol = midCol + 1
    ws.getCell(rowNum, rStartCol).value = metaItemsRight[idx].label
    ws.getCell(rowNum, rStartCol).font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.DARK_TEXT } }
    ws.getCell(rowNum, rStartCol).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
    ws.getCell(rowNum, rStartCol).border = BORDER_THIN

    // Kanan: Value (Merge col rStartCol+1 s.d. totalCols)
    if (rStartCol + 1 <= totalCols) {
      ws.mergeCells(rowNum, rStartCol + 1, rowNum, totalCols)
      const valCellR = ws.getCell(rowNum, rStartCol + 1)
      valCellR.value = `:  ${metaItemsRight[idx].value}`
      valCellR.font = { name: 'Arial', size: 8.5, color: { argb: COLORS.DARK_TEXT } }
      valCellR.border = BORDER_THIN
    }
  })

  // Baris 8: Spasi Kosong Pemisah Sebelum Tabel Utama
  ws.getRow(8).height = 10
}

/**
 * Menerapkan blok evaluasi mutu, kesimpulan, dan lembar pengesahan tanda tangan
 */
function applyLabFooterSection(ws, startRow, calcOutput, metadata, totalCols = 8) {
  let currRow = startRow + 1

  // Kotak Kesimpulan & Evaluasi Mutu
  ws.mergeCells(currRow, 1, currRow, totalCols)
  const evalHeaderCell = ws.getCell(currRow, 1)
  evalHeaderCell.value = 'EVALUASI HASIL PENGUJIAN & KESIMPULAN STANDAR'
  evalHeaderCell.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.WHITE } }
  evalHeaderCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.NAVY_HEADER } }
  evalHeaderCell.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 }
  ws.getRow(currRow).height = 20
  currRow++

  // Isi Kesimpulan
  ws.mergeCells(currRow, 1, currRow + 1, totalCols)
  const evalTextCell = ws.getCell(currRow, 1)
  const conclusionText = calcOutput?.conclusion || calcOutput?.summaryString || 'Hasil pengujian telah selesai dihitung sesuai standar acuan.'
  const statusText = calcOutput?.status ? `[Status: ${calcOutput.status}] ` : ''
  evalTextCell.value = `${statusText}${conclusionText}`
  evalTextCell.font = { name: 'Arial', size: 9, color: { argb: COLORS.DARK_TEXT } }
  evalTextCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } }
  evalTextCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true }
  evalTextCell.border = BORDER_THIN
  ws.getRow(currRow).height = 22
  ws.getRow(currRow + 1).height = 22
  currRow += 2

  // Spasi sebelum Tanda Tangan
  currRow++

  // Kolom Tanda Tangan Formal
  const midCol = Math.max(3, Math.floor(totalCols / 2))
  const signRow = currRow

  // Tanggal & Tempat
  ws.mergeCells(signRow, midCol + 1, signRow, totalCols)
  const dateCell = ws.getCell(signRow, midCol + 1)
  dateCell.value = `${metadata.lokasi || 'Laboratorium'}, ${metadata.tanggal || new Date().toISOString().split('T')[0]}`
  dateCell.font = { name: 'Arial', size: 8.5, italic: true }
  dateCell.alignment = { horizontal: 'center' }

  // Label Pihak Penguji & Pemeriksa
  ws.mergeCells(signRow + 1, 1, signRow + 1, midCol)
  const ttdL = ws.getCell(signRow + 1, 1)
  ttdL.value = 'Diuji oleh (Praktikan):'
  ttdL.font = { name: 'Arial', size: 9, bold: true }
  ttdL.alignment = { horizontal: 'center' }

  ws.mergeCells(signRow + 1, midCol + 1, signRow + 1, totalCols)
  const ttdR = ws.getCell(signRow + 1, midCol + 1)
  ttdR.value = 'Diperiksa & Disetujui oleh:'
  ttdR.font = { name: 'Arial', size: 9, bold: true }
  ttdR.alignment = { horizontal: 'center' }

  // Area Kosong Tanda Tangan
  ws.getRow(signRow + 2).height = 18
  ws.getRow(signRow + 3).height = 18

  // Nama Terang
  ws.mergeCells(signRow + 4, 1, signRow + 4, midCol)
  const nameL = ws.getCell(signRow + 4, 1)
  nameL.value = `( ${metadata.diujiOleh || '..............................................'} )`
  nameL.font = { name: 'Arial', size: 9, bold: true }
  nameL.alignment = { horizontal: 'center' }

  ws.mergeCells(signRow + 4, midCol + 1, signRow + 4, totalCols)
  const nameR = ws.getCell(signRow + 4, midCol + 1)
  nameR.value = `( ${metadata.diperiksaOleh || '..............................................'} )`
  nameR.font = { name: 'Arial', size: 9, bold: true }
  nameR.alignment = { horizontal: 'center' }

  // Jabatan / Keterangan
  ws.mergeCells(signRow + 5, 1, signRow + 5, midCol)
  const roleL = ws.getCell(signRow + 5, 1)
  roleL.value = 'Praktikan Laboratorium'
  roleL.font = { name: 'Arial', size: 8, color: { argb: COLORS.MUTED_TEXT } }
  roleL.alignment = { horizontal: 'center' }

  ws.mergeCells(signRow + 5, midCol + 1, signRow + 5, totalCols)
  const roleR = ws.getCell(signRow + 5, midCol + 1)
  roleR.value = 'Asisten / Kepala Laboratorium'
  roleR.font = { name: 'Arial', size: 8, color: { argb: COLORS.MUTED_TEXT } }
  roleR.alignment = { horizontal: 'center' }
}

/**
 * 1. GENERATOR BLANGKO KADAR AIR TANAH (SNI 1965:2008)
 */
function buildWaterContentSheet(wb, testConfig, inputs, calcOutput, metadata, selectedSampleIds) {
  const ws = wb.addWorksheet('Kadar Air (SNI 1965-2008)', { views: [{ showGridLines: true }] })
  const totalCols = 8

  applyLabDocumentHeader(ws, testConfig, metadata, totalCols)

  // Header Tabel Pengujian
  const headerRow = 9
  ws.getRow(headerRow).height = 28
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

  headers.forEach((h) => {
    const c = ws.getCell(headerRow, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  // Filter sampel berdasarkan pilihan pengguna di modal
  const allSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
    ? inputs.samples
    : (Array.isArray(calcOutput?.samples) ? calcOutput.samples : [])

  const activeSamples = selectedSampleIds && selectedSampleIds.length > 0
    ? allSamples.filter((s, idx) => selectedSampleIds.includes(s.id ?? idx + 1))
    : allSamples

  let r = headerRow + 1
  const startDataRow = r

  activeSamples.forEach((item, idx) => {
    ws.getRow(r).height = 20
    const w1 = Number(item.w1 ?? 0)
    const w2 = Number(item.w2 ?? 0)
    const w3 = Number(item.w3 ?? 0)

    // Kolom 1: No
    const c1 = ws.getCell(r, 1)
    c1.value = idx + 1
    c1.alignment = { horizontal: 'center' }

    // Kolom 2: Kode Cawan
    const c2 = ws.getCell(r, 2)
    c2.value = item.name || `Cawan C-${idx + 1}`
    c2.alignment = { horizontal: 'left' }

    // Kolom 3: W1
    const c3 = ws.getCell(r, 3)
    c3.value = w1
    c3.numFmt = '#,##0.00'
    c3.alignment = { horizontal: 'right' }

    // Kolom 4: W2
    const c4 = ws.getCell(r, 4)
    c4.value = w2
    c4.numFmt = '#,##0.00'
    c4.alignment = { horizontal: 'right' }

    // Kolom 5: W3
    const c5 = ws.getCell(r, 5)
    c5.value = w3
    c5.numFmt = '#,##0.00'
    c5.alignment = { horizontal: 'right' }

    // Kolom 6: Ww = W2 - W3 (Formula Excel Dinamis)
    const c6 = ws.getCell(r, 6)
    c6.value = { formula: `D${r}-E${r}`, result: +(w2 - w3).toFixed(2) }
    c6.numFmt = '#,##0.00'
    c6.alignment = { horizontal: 'right' }

    // Kolom 7: Ws = W3 - W1 (Formula Excel Dinamis)
    const c7 = ws.getCell(r, 7)
    c7.value = { formula: `E${r}-C${r}`, result: +(w3 - w1).toFixed(2) }
    c7.numFmt = '#,##0.00'
    c7.alignment = { horizontal: 'right' }

    // Kolom 8: w = (Ww / Ws) * 100 (Formula Excel Dinamis)
    const c8 = ws.getCell(r, 8)
    const calcW = w3 > w1 ? +(((w2 - w3) / (w3 - w1)) * 100).toFixed(2) : 0
    c8.value = { formula: `IF(G${r}>0, (F${r}/G${r})*100, 0)`, result: calcW }
    c8.numFmt = '#,##0.00'
    c8.alignment = { horizontal: 'right' }

    // Border & zebra fill
    for (let c = 1; c <= totalCols; c++) {
      const cell = ws.getCell(r, c)
      cell.border = BORDER_THIN
      if (idx % 2 === 1) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
      }
    }

    r++
  })

  const endDataRow = r - 1

  // Baris Rata-rata Otomatis dengan Formula Excel AVERAGE
  ws.getRow(r).height = 22
  ws.mergeCells(r, 1, r, 7)
  const avgLabel = ws.getCell(r, 1)
  avgLabel.value = 'KADAR AIR RATA-RATA (w_rata) :'
  avgLabel.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  avgLabel.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  avgLabel.alignment = { horizontal: 'right', vertical: 'middle' }

  const avgVal = ws.getCell(r, 8)
  avgVal.value = { formula: `AVERAGE(H${startDataRow}:H${endDataRow})`, result: calcOutput?.avgWaterContent ?? calcOutput?.results?.[0]?.value ?? 0 }
  avgVal.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  avgVal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  avgVal.numFmt = '#,##0.00'
  avgVal.alignment = { horizontal: 'right', vertical: 'middle' }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(r, c).border = BORDER_DOUBLE_BOTTOM
  }

  // Lebar Kolom yang Ergonomis
  ws.columns = [
    { width: 6 },  // No
    { width: 22 }, // Kode Cawan
    { width: 20 }, // W1
    { width: 22 }, // W2
    { width: 22 }, // W3
    { width: 22 }, // Ww
    { width: 24 }, // Ws
    { width: 18 }, // w (%)
  ]

  applyLabFooterSection(ws, r + 1, calcOutput, metadata, totalCols)
}

/**
 * 2. GENERATOR BLANGKO BERAT JENIS AGREGAT / TANAH (SNI 1970 / SNI 1969 / SNI 1964)
 */
function buildSpecificGravitySheet(wb, testConfig, inputs, calcOutput, metadata, selectedSampleIds) {
  const ws = wb.addWorksheet('Berat Jenis (SNI 1970-2016)', { views: [{ showGridLines: true }] })
  const totalCols = 9

  applyLabDocumentHeader(ws, testConfig, metadata, totalCols)

  const headerRow = 9
  ws.getRow(headerRow).height = 28
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

  headers.forEach((h) => {
    const c = ws.getCell(headerRow, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  const allSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
    ? inputs.samples
    : (Array.isArray(calcOutput?.samples) ? calcOutput.samples : [])

  const activeSamples = selectedSampleIds && selectedSampleIds.length > 0
    ? allSamples.filter((s, idx) => selectedSampleIds.includes(s.id ?? idx + 1))
    : allSamples

  let r = headerRow + 1
  const startDataRow = r

  activeSamples.forEach((item, idx) => {
    ws.getRow(r).height = 20
    const sVal = Number(item.s ?? 500)
    const aVal = Number(item.a ?? 0)
    const bVal = Number(item.b ?? 0)
    const cVal = Number(item.c ?? 0)

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = item.name || `Benda Uji ${idx + 1}`
    ws.getCell(r, 2).alignment = { horizontal: 'left' }

    ws.getCell(r, 3).value = sVal
    ws.getCell(r, 3).numFmt = '#,##0.00'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = aVal
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    ws.getCell(r, 5).value = bVal
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    ws.getCell(r, 6).value = cVal
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // Formula BJ Curah = A / (B + S - C)
    const den = bVal + sVal - cVal
    const calcSd = den > 0 ? +(aVal / den).toFixed(3) : 0
    ws.getCell(r, 7).value = { formula: `D${r}/(E${r}+C${r}-F${r})`, result: calcSd }
    ws.getCell(r, 7).numFmt = '#,##0.000'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    // Formula BJ SSD = S / (B + S - C)
    const calcSs = den > 0 ? +(sVal / den).toFixed(3) : 0
    ws.getCell(r, 8).value = { formula: `C${r}/(E${r}+C${r}-F${r})`, result: calcSs }
    ws.getCell(r, 8).numFmt = '#,##0.000'
    ws.getCell(r, 8).alignment = { horizontal: 'right' }

    // Formula Penyerapan Sw = ((S - A) / A) * 100
    const calcSw = aVal > 0 ? +(((sVal - aVal) / aVal) * 100).toFixed(2) : 0
    ws.getCell(r, 9).value = { formula: `((C${r}-D${r})/D${r})*100`, result: calcSw }
    ws.getCell(r, 9).numFmt = '#,##0.00'
    ws.getCell(r, 9).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      const cell = ws.getCell(r, c)
      cell.border = BORDER_THIN
      if (idx % 2 === 1) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
      }
    }

    r++
  })

  const endDataRow = r - 1

  // Baris Rata-rata
  ws.getRow(r).height = 22
  ws.mergeCells(r, 1, r, 6)
  const avgLabel = ws.getCell(r, 1)
  avgLabel.value = 'RATA-RATA KESELURUHAN (AVERAGE) :'
  avgLabel.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  avgLabel.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  avgLabel.alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(r, 7).value = { formula: `AVERAGE(G${startDataRow}:G${endDataRow})`, result: 0 }
  ws.getCell(r, 7).numFmt = '#,##0.000'
  ws.getCell(r, 7).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(r, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(r, 7).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(r, 8).value = { formula: `AVERAGE(H${startDataRow}:H${endDataRow})`, result: 0 }
  ws.getCell(r, 8).numFmt = '#,##0.000'
  ws.getCell(r, 8).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(r, 8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(r, 8).alignment = { horizontal: 'right', vertical: 'middle' }

  ws.getCell(r, 9).value = { formula: `AVERAGE(I${startDataRow}:I${endDataRow})`, result: 0 }
  ws.getCell(r, 9).numFmt = '#,##0.00'
  ws.getCell(r, 9).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  ws.getCell(r, 9).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  ws.getCell(r, 9).alignment = { horizontal: 'right', vertical: 'middle' }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(r, c).border = BORDER_DOUBLE_BOTTOM
  }

  ws.columns = [
    { width: 6 },  // No
    { width: 22 }, // Benda Uji
    { width: 18 }, // S
    { width: 18 }, // A
    { width: 20 }, // B
    { width: 22 }, // C
    { width: 20 }, // Sd
    { width: 18 }, // Ss
    { width: 20 }, // Sw (%)
  ]

  applyLabFooterSection(ws, r + 1, calcOutput, metadata, totalCols)
}

/**
 * 3. GENERATOR BLANGKO ANALISIS SARINGAN AGREGAT / TANAH (ASTM C136 / SNI 03-1968-1990)
 */
function buildSieveAnalysisSheet(wb, testConfig, inputs, calcOutput, metadata) {
  const ws = wb.addWorksheet('Analisis Saringan', { views: [{ showGridLines: true }] })
  const totalCols = 7

  applyLabDocumentHeader(ws, testConfig, metadata, totalCols)

  const headerRow = 9
  ws.getRow(headerRow).height = 28
  const headers = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Nomor Saringan\nASTM' },
    { col: 3, text: 'Ukuran Lubang\n[mm]' },
    { col: 4, text: 'Berat Tertahan\n[gram]' },
    { col: 5, text: 'Persen Tertahan\n[%]' },
    { col: 6, text: 'Kumulatif Tertahan\n[%]' },
    { col: 7, text: 'Persen Lolos\n[%]' },
  ]

  headers.forEach((h) => {
    const c = ws.getCell(headerRow, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  // Dapatkan baris saringan dari hasil kalkulasi
  const sieveRows = calcOutput?.sieveRows || calcOutput?.tableData || [
    { name: '3/8"', size: 9.5, weight: inputs.sieve_3_8 ?? 0 },
    { name: 'No. 4', size: 4.75, weight: inputs.sieve_4 ?? 25 },
    { name: 'No. 8', size: 2.36, weight: inputs.sieve_8 ?? 60 },
    { name: 'No. 16', size: 1.18, weight: inputs.sieve_16 ?? 120 },
    { name: 'No. 30', size: 0.6, weight: inputs.sieve_30 ?? 145 },
    { name: 'No. 50', size: 0.3, weight: inputs.sieve_50 ?? 110 },
    { name: 'No. 100', size: 0.15, weight: inputs.sieve_100 ?? 30 },
    { name: 'Pan', size: 0, weight: inputs.sieve_pan ?? 10 },
  ]

  let r = headerRow + 1
  const startDataRow = r

  // Total berat awal untuk rumus percentage
  const totalWeight = sieveRows.reduce((acc, row) => acc + Number(row.weight || 0), 0) || 500
  const totalRow = startDataRow + sieveRows.length

  sieveRows.forEach((row, idx) => {
    ws.getRow(r).height = 19
    const wt = Number(row.weight || 0)

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = row.name || row.sieve || `Saringan ${idx + 1}`
    ws.getCell(r, 2).alignment = { horizontal: 'center', vertical: 'middle' }
    ws.getCell(r, 2).font = { name: 'Arial', size: 9, bold: true }

    ws.getCell(r, 3).value = Number(row.size ?? 0)
    ws.getCell(r, 3).numFmt = '#,##0.000'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = wt
    ws.getCell(r, 4).numFmt = '#,##0.00'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    // Formula Persen Tertahan = (Berat / TotalBerat) * 100
    const pct = totalWeight > 0 ? (wt / totalWeight) * 100 : 0
    ws.getCell(r, 5).value = { formula: `(D${r}/$D$${totalRow})*100`, result: +pct.toFixed(2) }
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    // Formula Kumulatif Tertahan
    if (idx === 0) {
      ws.getCell(r, 6).value = { formula: `E${r}`, result: +pct.toFixed(2) }
    } else {
      ws.getCell(r, 6).value = { formula: `F${r - 1}+E${r}`, result: 0 }
    }
    ws.getCell(r, 6).numFmt = '#,##0.00'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // Formula Persen Lolos = 100 - Kumulatif Tertahan
    ws.getCell(r, 7).value = { formula: `100-F${r}`, result: 100 - pct }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    for (let c = 1; c <= totalCols; c++) {
      const cell = ws.getCell(r, c)
      cell.border = BORDER_THIN
      if (idx % 2 === 1) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
      }
    }

    r++
  })

  // Baris Total Berat & Persentase
  ws.getRow(r).height = 22
  ws.mergeCells(r, 1, r, 3)
  const totalLabel = ws.getCell(r, 1)
  totalLabel.value = 'JUMLAH TOTAL (SUM) :'
  totalLabel.font = { name: 'Arial', size: 9, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  totalLabel.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  totalLabel.alignment = { horizontal: 'right', vertical: 'middle' }

  // Total Berat Tertahan = SUM(...)
  const cTotW = ws.getCell(r, 4)
  cTotW.value = { formula: `SUM(D${startDataRow}:D${r - 1})`, result: totalWeight }
  cTotW.numFmt = '#,##0.00'
  cTotW.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  cTotW.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  cTotW.alignment = { horizontal: 'right', vertical: 'middle' }

  // Total % Tertahan = SUM(...)
  const cTotPct = ws.getCell(r, 5)
  cTotPct.value = { formula: `SUM(E${startDataRow}:E${r - 1})`, result: 100 }
  cTotPct.numFmt = '#,##0.00'
  cTotPct.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.SUMMARY_TEXT } }
  cTotPct.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }
  cTotPct.alignment = { horizontal: 'right', vertical: 'middle' }

  // Kolom 6 & 7 di baris total
  ws.getCell(r, 6).value = '-'
  ws.getCell(r, 6).alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell(r, 6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }

  ws.getCell(r, 7).value = '-'
  ws.getCell(r, 7).alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell(r, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.SUMMARY_ROW } }

  for (let c = 1; c <= totalCols; c++) {
    ws.getCell(r, c).border = BORDER_DOUBLE_BOTTOM
  }

  ws.columns = [
    { width: 6 },  // No
    { width: 22 }, // Saringan
    { width: 18 }, // Bukaan mm
    { width: 22 }, // Berat Tertahan (g)
    { width: 20 }, // % Tertahan
    { width: 22 }, // Kumulatif Tertahan
    { width: 20 }, // % Lolos
  ]

  applyLabFooterSection(ws, r + 1, calcOutput, metadata, totalCols)
}

/**
 * 4. GENERATOR BLANGKO PENYELIDIKAN TANAH SONDIR / CPT (SNI 2827:2008)
 */
function buildCptSondirSheet(wb, testConfig, inputs, calcOutput, metadata) {
  const ws = wb.addWorksheet('Sondir CPT (SNI 2827-2008)', { views: [{ showGridLines: true }] })
  const totalCols = 8

  applyLabDocumentHeader(ws, testConfig, metadata, totalCols)

  const headerRow = 9
  ws.getRow(headerRow).height = 28
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

  headers.forEach((h) => {
    const c = ws.getCell(headerRow, h.col)
    c.value = h.text
    c.font = { name: 'Arial', size: 8, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    c.border = BORDER_THIN
  })

  const cptData = Array.isArray(inputs.cptRows) && inputs.cptRows.length > 0
    ? inputs.cptRows
    : (Array.isArray(calcOutput?.cptData) ? calcOutput.cptData : [])

  let r = headerRow + 1
  const startDataRow = r

  cptData.forEach((row, idx) => {
    ws.getRow(r).height = 19
    const depth = Number(row.depth ?? (idx * 0.2))
    const qc = Number(row.qc ?? 0)
    const qfs = Number(row.qfs ?? (qc + (row.fs ? row.fs * 10 : 0)))

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = depth
    ws.getCell(r, 2).numFmt = '#,##0.00'
    ws.getCell(r, 2).alignment = { horizontal: 'center' }

    ws.getCell(r, 3).value = qc
    ws.getCell(r, 3).numFmt = '#,##0.0'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }

    ws.getCell(r, 4).value = qfs
    ws.getCell(r, 4).numFmt = '#,##0.0'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }

    // Formula fs = (qfs - qc) / 10
    const fsVal = (qfs - qc) / 10
    ws.getCell(r, 5).value = { formula: `MAX(0, (D${r}-C${r})/10)`, result: +fsVal.toFixed(2) }
    ws.getCell(r, 5).numFmt = '#,##0.00'
    ws.getCell(r, 5).alignment = { horizontal: 'right' }

    // Formula Tf = Tf_prev + (fs * 20)
    if (idx === 0) {
      ws.getCell(r, 6).value = { formula: `E${r}*20`, result: +(fsVal * 20).toFixed(1) }
    } else {
      ws.getCell(r, 6).value = { formula: `F${r - 1}+(E${r}*20)`, result: 0 }
    }
    ws.getCell(r, 6).numFmt = '#,##0.0'
    ws.getCell(r, 6).alignment = { horizontal: 'right' }

    // Formula FR = (fs / qc) * 100
    const frVal = qc > 0 ? (fsVal / qc) * 100 : 0
    ws.getCell(r, 7).value = { formula: `IF(C${r}>0, (E${r}/C${r})*100, 0)`, result: +frVal.toFixed(2) }
    ws.getCell(r, 7).numFmt = '#,##0.00'
    ws.getCell(r, 7).alignment = { horizontal: 'right' }

    // Deskripsi Lapisan Tanah
    const soilType = row.soilType || (qc < 10 ? 'Lempung Sangat Lunak' : qc < 30 ? 'Lempung Sedang' : qc < 60 ? 'Lanau Berpasir' : 'Pasir Padat')
    ws.getCell(r, 8).value = soilType
    ws.getCell(r, 8).alignment = { horizontal: 'left' }
    ws.getCell(r, 8).font = { name: 'Arial', size: 8 }

    for (let c = 1; c <= totalCols; c++) {
      const cell = ws.getCell(r, c)
      cell.border = BORDER_THIN
      if (idx % 2 === 1) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
      }
    }

    r++
  })

  ws.columns = [
    { width: 6 },  // No
    { width: 16 }, // Kedalaman
    { width: 24 }, // qc
    { width: 26 }, // qc+fs
    { width: 22 }, // fs
    { width: 22 }, // Tf
    { width: 20 }, // FR (%)
    { width: 26 }, // Jenis Tanah
  ]

  applyLabFooterSection(ws, r + 1, calcOutput, metadata, totalCols)
}

/**
 * 5. GENERATOR UNIVERSAL UNTUK SELURUH MODUL PENGUJIAN LAINNYA
 */
function buildUniversalSheet(wb, testConfig, inputs, calcOutput, metadata, selectedSampleIds) {
  const sheetTitle = (testConfig.code || testConfig.id || 'Hasil Uji').substring(0, 31)
  const ws = wb.addWorksheet(sheetTitle, { views: [{ showGridLines: true }] })
  const totalCols = 6

  applyLabDocumentHeader(ws, testConfig, metadata, totalCols)

  let r = 9

  // Bagian A: Tabel Multi-Sampel Dinamis (jika modul memiliki samples)
  const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
    ? inputs.samples
    : (Array.isArray(calcOutput?.samples) ? calcOutput.samples : null)

  if (rawSamples && rawSamples.length > 0) {
    const activeSamples = selectedSampleIds && selectedSampleIds.length > 0
      ? rawSamples.filter((s, idx) => selectedSampleIds.includes(s.id ?? idx + 1))
      : rawSamples

    ws.mergeCells(r, 1, r, totalCols)
    ws.getCell(r, 1).value = 'A. DATA BENDA UJI / TITIK PENGUJIAN LABORATORIUM'
    ws.getCell(r, 1).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.WHITE } }
    ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
    ws.getRow(r).height = 20
    r++

    // Ambil keys dari sample pertama
    const sampleKeys = Object.keys(activeSamples[0] || {}).filter((k) => k !== 'id' && typeof activeSamples[0][k] !== 'object')
    const sampleColsCount = Math.min(totalCols - 1, sampleKeys.length)

    // Header Baris Sampel
    ws.getRow(r).height = 24
    ws.getCell(r, 1).value = 'No.'
    ws.getCell(r, 1).font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_SUBHEADER } }
    ws.getCell(r, 1).alignment = { horizontal: 'center', vertical: 'middle' }
    ws.getCell(r, 1).border = BORDER_THIN

    sampleKeys.slice(0, sampleColsCount).forEach((key, kIdx) => {
      const c = ws.getCell(r, kIdx + 2)
      c.value = key.toUpperCase()
      c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_SUBHEADER } }
      c.alignment = { horizontal: 'center', vertical: 'middle' }
      c.border = BORDER_THIN
    })
    r++

    activeSamples.forEach((s, sIdx) => {
      ws.getRow(r).height = 19
      ws.getCell(r, 1).value = sIdx + 1
      ws.getCell(r, 1).alignment = { horizontal: 'center' }
      ws.getCell(r, 1).border = BORDER_THIN

      sampleKeys.slice(0, sampleColsCount).forEach((key, kIdx) => {
        const val = s[key]
        const cell = ws.getCell(r, kIdx + 2)
        cell.value = typeof val === 'number' ? +val.toFixed(2) : (val ?? '-')
        cell.alignment = { horizontal: typeof val === 'number' ? 'right' : 'left' }
        cell.border = BORDER_THIN
        if (sIdx % 2 === 1) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.ZEBRA_ROW } }
        }
      })
      r++
    })

    r++ // Spasi pemisah
  }

  // Bagian B: Parameter Input Utama
  ws.mergeCells(r, 1, r, totalCols)
  ws.getCell(r, 1).value = 'B. PARAMETER INPUT PENGUJIAN'
  ws.getCell(r, 1).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.WHITE } }
  ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
  ws.getRow(r).height = 20
  r++

  const fields = Array.isArray(testConfig.fields) ? testConfig.fields : []
  fields.forEach((f, idx) => {
    ws.getRow(r).height = 19

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }
    ws.getCell(r, 1).border = BORDER_THIN

    ws.mergeCells(r, 2, r, 3)
    ws.getCell(r, 2).value = f.label || f.key
    ws.getCell(r, 2).font = { name: 'Arial', size: 8.5 }
    ws.getCell(r, 2).border = BORDER_THIN

    const val = inputs[f.key]
    ws.getCell(r, 4).value = typeof val === 'number' ? val : (val ?? '-')
    ws.getCell(r, 4).numFmt = typeof val === 'number' ? '#,##0.00' : '@'
    ws.getCell(r, 4).alignment = { horizontal: 'right' }
    ws.getCell(r, 4).font = { name: 'Arial', size: 8.5, bold: true }
    ws.getCell(r, 4).border = BORDER_THIN

    ws.mergeCells(r, 5, r, 6)
    ws.getCell(r, 5).value = f.unit || '-'
    ws.getCell(r, 5).font = { name: 'Arial', size: 8.5, italic: true, color: { argb: COLORS.MUTED_TEXT } }
    ws.getCell(r, 5).alignment = { horizontal: 'left' }
    ws.getCell(r, 5).border = BORDER_THIN

    r++
  })

  r++ // Spasi

  // Bagian C: Hasil Perhitungan Laboratorium & Evaluasi SNI
  ws.mergeCells(r, 1, r, totalCols)
  ws.getCell(r, 1).value = 'C. REKAPITULASI HASIL PERHITUNGAN & PERSYARATAN MUTU'
  ws.getCell(r, 1).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: COLORS.WHITE } }
  ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_HEADER } }
  ws.getRow(r).height = 20
  r++

  // Header Tabel Hasil
  ws.getRow(r).height = 22
  const resHeaders = [
    { col: 1, text: 'No.' },
    { col: 2, text: 'Parameter Hasil Pengujian' },
    { col: 3, text: 'Nilai Terhitung' },
    { col: 4, text: 'Satuan' },
    { col: 5, text: 'Syarat Spesifikasi SNI/ASTM' },
    { col: 6, text: 'Evaluasi' },
  ]
  resHeaders.forEach((rh) => {
    const c = ws.getCell(r, rh.col)
    c.value = rh.text
    c.font = { name: 'Arial', size: 8.5, bold: true, color: { argb: COLORS.WHITE } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.TABLE_SUBHEADER } }
    c.alignment = { horizontal: 'center', vertical: 'middle' }
    c.border = BORDER_THIN
  })
  r++

  const results = Array.isArray(calcOutput?.results) ? calcOutput.results : []
  results.forEach((res, idx) => {
    ws.getRow(r).height = 20

    ws.getCell(r, 1).value = idx + 1
    ws.getCell(r, 1).alignment = { horizontal: 'center' }

    ws.getCell(r, 2).value = res.label || '-'
    ws.getCell(r, 2).alignment = { horizontal: 'left' }

    const numVal = Number(res.value)
    ws.getCell(r, 3).value = !isNaN(numVal) ? numVal : (res.value ?? '-')
    ws.getCell(r, 3).numFmt = !isNaN(numVal) ? '#,##0.00' : '@'
    ws.getCell(r, 3).alignment = { horizontal: 'right' }
    ws.getCell(r, 3).font = { name: 'Arial', size: 9, bold: true }

    ws.getCell(r, 4).value = res.unit || '-'
    ws.getCell(r, 4).alignment = { horizontal: 'center' }

    ws.getCell(r, 5).value = res.spec || '-'
    ws.getCell(r, 5).alignment = { horizontal: 'left' }

    const isPassed = res.passed !== false
    ws.getCell(r, 6).value = isPassed ? 'MEMENUHI' : 'TIDAK MEMENUHI'
    ws.getCell(r, 6).alignment = { horizontal: 'center' }
    ws.getCell(r, 6).font = { name: 'Arial', size: 8, bold: true, color: { argb: isPassed ? COLORS.PASS_TEXT : COLORS.FAIL_TEXT } }
    ws.getCell(r, 6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isPassed ? COLORS.PASS_BG : COLORS.FAIL_BG } }

    for (let c = 1; c <= totalCols; c++) {
      ws.getCell(r, c).border = BORDER_THIN
    }

    r++
  })

  ws.columns = [
    { width: 6 },  // No
    { width: 34 }, // Parameter
    { width: 18 }, // Nilai
    { width: 12 }, // Satuan
    { width: 28 }, // Syarat
    { width: 20 }, // Evaluasi
  ]

  applyLabFooterSection(ws, r + 1, calcOutput, metadata, totalCols)
}

/**
 * FUNGSI UTAMA EKSPOR EXCEL MODULAR
 * Menerima parameter modul, inputs, output perhitungan, metadata kop, dan list sampel terpilih.
 * Menghasilkan file download .xlsx di peramban secara otomatis.
 */
export async function exportTestModuleToExcel({
  testConfig,
  inputs,
  calcOutput,
  metadata = {},
  selectedSampleIds = null,
  options = {},
}) {
  if (!testConfig) {
    throw new Error('Konfigurasi pengujian (testConfig) tidak ditemukan.')
  }

  const wb = new ExcelJS.Workbook()
  wb.creator = 'LabSipil Engineering SaaS'
  wb.lastModifiedBy = metadata.diujiOleh || 'Praktikan LabSipil'
  wb.created = new Date()
  wb.modified = new Date()

  const testId = testConfig.id || ''

  // Routing Pemilihan Template Blangko Berdasarkan Modul
  if (testId === 'mt-2-1' || testId === 'bb-1-2' || testId === 'kadar-air' || testConfig.name?.toLowerCase().includes('kadar air')) {
    buildWaterContentSheet(wb, testConfig, inputs, calcOutput, metadata, selectedSampleIds)
  } else if (testId === 'bb-1-1' || testId === 'bb-2-1' || testId === 'mt-2-2' || testConfig.name?.toLowerCase().includes('berat jenis')) {
    buildSpecificGravitySheet(wb, testConfig, inputs, calcOutput, metadata, selectedSampleIds)
  } else if (testId === 'bb-1-5' || testId === 'bb-2-5' || testId === 'mt-1-2' || testConfig.name?.toLowerCase().includes('saringan') || testConfig.name?.toLowerCase().includes('gradasi')) {
    buildSieveAnalysisSheet(wb, testConfig, inputs, calcOutput, metadata)
  } else if (testId === 'mt-1-1' || testId === 'tanah-4-1' || testConfig.hasDynamicCptTable || testConfig.name?.toLowerCase().includes('sondir')) {
    buildCptSondirSheet(wb, testConfig, inputs, calcOutput, metadata)
  } else {
    // Modul Lainnya (Universal Handler dengan Rekap Multi-Sampel & Hasil SNI)
    buildUniversalSheet(wb, testConfig, inputs, calcOutput, metadata, selectedSampleIds)
  }

  // Tulis ke Buffer dan picu pengunduhan file di browser
  const buffer = await wb.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  // Format Nama Berkas yang Bersih & Rapi
  const cleanCode = (testConfig.code || testConfig.id || 'Uji').replace(/[^a-zA-Z0-9_-]/g, '_')
  const cleanDate = (metadata.tanggal || new Date().toISOString().split('T')[0]).replace(/[^a-zA-Z0-9_-]/g, '-')
  const fileName = `Blangko_${cleanCode}_${cleanDate}.xlsx`

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)

  return { success: true, fileName }
}
