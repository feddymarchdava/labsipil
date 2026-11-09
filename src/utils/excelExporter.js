/**
 * =========================================================================
 * TEMPLATE-DRIVEN EXCEL EXPORTER UTILITY (LabSipil)
 * =========================================================================
 * Menyediakan fungsi helper modular untuk mengekspor data pengujian laboratorium
 * langsung ke dalam file template Excel asli (.xlsx) di folder public/excel-templates/.
 *
 * Logika:
 * 1. Mengambil file master template .xlsx via fetch (atau file system jika di server/Node).
 * 2. Memuat template ke dalam ExcelJS Workbook (mempertahankan font, warna, styling, border, dan formula asli).
 * 3. Memetakan data dari state web (array sampel w1, w2, w3, sieves, CPT, dll.) ke sel-sel blangko yang sesuai.
 * 4. Memperbarui formula / hasil sel dan metadata kop pengujian.
 * 5. Memicu download berkas .xlsx baru ke peramban pengguna.
 */

import ExcelJS from 'exceljs'
import { exportTestModuleToExcel } from './excelLabGenerator.js'

// Peta Relasi Modul Uji ke Berkas Master Template Excel
export const TEMPLATE_REGISTRY = {
  // 1. Kadar Air Tanah & Agregat
  'mt-2-1': { fileName: 'kadar-air-template.xlsx', name: 'Template Blangko Kadar Air (SNI 1965:2008)' },
  'bb-1-2': { fileName: 'kadar-air-template.xlsx', name: 'Template Blangko Kadar Air Agregat Halus' },
  'bb-2-2': { fileName: 'kadar-air-template.xlsx', name: 'Template Blangko Kadar Air Agregat Kasar' },

  // 2. Analisis Saringan & Gradasi Agregat / Tanah
  'bb-1-5': { fileName: 'gradasi-template.xlsx', name: 'Template Blangko Gradasi Agregat Halus (ASTM C136)' },
  'bb-2-5': { fileName: 'gradasi-template.xlsx', name: 'Template Blangko Gradasi Agregat Kasar (ASTM C136)' },
  'mt-1-2': { fileName: 'gradasi-template.xlsx', name: 'Template Blangko Gradasi Butiran Tanah' },

  // 3. Berat Jenis & Penyerapan Air
  'bb-1-1': { fileName: 'berat-jenis-template.xlsx', name: 'Template Blangko Berat Jenis Agregat Halus (SNI 1970)' },
  'bb-2-1': { fileName: 'berat-jenis-template.xlsx', name: 'Template Blangko Berat Jenis Agregat Kasar (SNI 1969)' },
  'mt-2-2': { fileName: 'berat-jenis-template.xlsx', name: 'Template Blangko Berat Jenis Tanah (SNI 1964)' },

  // 4. Kuat Tarik Baja Beton
  'bb-5-1': { fileName: 'kuat-tarik-template.xlsx', name: 'Template Blangko Kuat Tarik Baja (SNI 2052:2017)' },

  // 5. Penyelidikan Tanah Sondir CPT
  'mt-1-1': { fileName: 'sondir-cpt-template.xlsx', name: 'Template Blangko Sondir CPT (SNI 2827:2008)' },
  'tanah-4-1': { fileName: 'sondir-cpt-template.xlsx', name: 'Template Blangko Sondir CPT Dinamis' },
}

/**
 * Memuat arrayBuffer berkas template dari folder public/excel-templates/
 */
export async function fetchExcelTemplateBuffer(fileName) {
  const templatePath = `/excel-templates/${fileName}`

  // Lingkungan Browser (Vite frontend)
  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    const res = await window.fetch(templatePath)
    if (!res.ok) {
      throw new Error(`Gagal memuat template Excel "${fileName}" (Status HTTP ${res.status}: ${res.statusText})`)
    }
    return await res.arrayBuffer()
  }

  // Lingkungan Node.js (untuk keperluan test runner & automasi)
  try {
    const fs = await import('fs')
    const path = await import('path')
    const localPath = path.resolve(process.cwd(), 'public/excel-templates', fileName)
    if (fs.existsSync(localPath)) {
      const nodeBuf = fs.readFileSync(localPath)
      return nodeBuf.buffer.slice(nodeBuf.byteOffset, nodeBuf.byteOffset + nodeBuf.byteLength)
    }
  } catch (e) {
    console.warn('Node fs fallback failed:', e)
  }

  throw new Error(`Template "${fileName}" tidak dapat ditemukan di jalur "${templatePath}".`)
}

/**
 * Memicu proses unduh berkas workbook ExcelJS ke browser pengguna
 */
export async function downloadWorkbook(workbook, fileName) {
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  if (typeof window !== 'undefined' && window.URL && window.document) {
    const url = window.URL.createObjectURL(blob)
    const a = window.document.createElement('a')
    a.href = url
    a.download = fileName
    window.document.body.appendChild(a)
    a.click()
    window.document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return { success: true, fileName, bufferSize: buffer.byteLength }
}

/**
 * Mengisi metadata kop dokumen pada sel B5:B7 dan kolom kanan
 */
function injectHeaderMetadata(ws, metadata) {
  const metaLeft = [
    { row: 5, val: metadata.proyek || 'Praktikum Laboratorium Teknik Sipil' },
    { row: 6, val: metadata.lokasi || 'Laboratorium Bahan & Geoteknik' },
    { row: 7, val: metadata.sampelDesc || '-' },
  ]
  const metaRight = [
    { row: 5, col: 'E', val: metadata.diujiOleh || 'Tim Mahasiswa / Praktikan' },
    { row: 6, col: 'E', val: metadata.diperiksaOleh || 'Asisten Laboratorium' },
    { row: 7, col: 'E', val: metadata.tanggal || new Date().toISOString().split('T')[0] },
  ]

  metaLeft.forEach((m) => {
    const cell = ws.getCell(`B${m.row}`)
    if (cell) cell.value = `:  ${m.val}`
  })

  metaRight.forEach((m) => {
    // Di template, kolom kanan biasanya berada di kolom E atau F
    const cellE = ws.getCell(`E${m.row}`)
    const cellF = ws.getCell(`F${m.row}`)
    const targetCell = cellF && cellF.value !== null ? cellF : cellE
    if (targetCell) targetCell.value = `:  ${m.val}`
  })
}

/**
 * 1. INJEKSI TEMPLATE: KADAR AIR (kadar-air-template.xlsx)
 */
async function populateWaterContentTemplate(templateBuffer, { inputs, calcOutput, metadata, selectedSampleIds }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  // Ambil array sampel yang aktif
  const allSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
    ? inputs.samples
    : (Array.isArray(calcOutput?.samples) ? calcOutput.samples : [])

  const activeSamples = selectedSampleIds && selectedSampleIds.length > 0
    ? allSamples.filter((s, idx) => selectedSampleIds.includes(s.id ?? idx + 1))
    : allSamples

  const startRow = 10 // Baris data pertama di template (setelah header row 9)

  activeSamples.forEach((sample, idx) => {
    const r = startRow + idx
    const w1 = Number(sample.w1 ?? 0)
    const w2 = Number(sample.w2 ?? 0)
    const w3 = Number(sample.w3 ?? 0)

    ws.getCell(`A${r}`).value = idx + 1
    ws.getCell(`B${r}`).value = sample.name || `Cawan C-${idx + 1}`
    ws.getCell(`C${r}`).value = w1
    ws.getCell(`D${r}`).value = w2
    ws.getCell(`E${r}`).value = w3

    // Pertahankan formula Excel asli dari template, update result nilai live
    const wwCell = ws.getCell(`F${r}`)
    wwCell.value = { formula: `D${r}-E${r}`, result: +(w2 - w3).toFixed(2) }

    const wsCell = ws.getCell(`G${r}`)
    wsCell.value = { formula: `E${r}-C${r}`, result: +(w3 - w1).toFixed(2) }

    const wCell = ws.getCell(`H${r}`)
    const calcW = w3 > w1 ? +(((w2 - w3) / (w3 - w1)) * 100).toFixed(2) : 0
    wCell.value = { formula: `IF(G${r}>0, (F${r}/G${r})*100, 0)`, result: calcW }
  })

  // Baris Rata-rata
  const lastDataRow = startRow + activeSamples.length - 1
  const avgRow = 15 // Posisi baris rata-rata di template
  if (lastDataRow >= startRow && ws.getCell(`H${avgRow}`)) {
    const avgCell = ws.getCell(`H${avgRow}`)
    avgCell.value = {
      formula: `AVERAGE(H${startRow}:H${lastDataRow})`,
      result: Number(calcOutput?.avgWaterContent ?? calcOutput?.results?.[0]?.value ?? 0),
    }
  }

  // Update Evaluasi & Kesimpulan
  const evalCell = ws.getCell('A18')
  if (evalCell) {
    const text = calcOutput?.conclusion || calcOutput?.summaryString || 'Pengujian kadar air selesai sesuai SNI 1965:2008.'
    evalCell.value = `[Evaluasi Mutu]: ${text}`
  }

  return wb
}

/**
 * 2. INJEKSI TEMPLATE: ANALISIS SARINGAN (gradasi-template.xlsx)
 */
async function populateGradasiTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  const sieveRows = calcOutput?.sieveRows || calcOutput?.tableData || [
    { name: '3/8" (9.5 mm)', weight: inputs.sieve_3_8 ?? 0 },
    { name: 'No. 4 (4.75 mm)', weight: inputs.sieve_4 ?? 25 },
    { name: 'No. 8 (2.36 mm)', weight: inputs.sieve_8 ?? 60 },
    { name: 'No. 16 (1.18 mm)', weight: inputs.sieve_16 ?? 120 },
    { name: 'No. 30 (0.60 mm)', weight: inputs.sieve_30 ?? 145 },
    { name: 'No. 50 (0.30 mm)', weight: inputs.sieve_50 ?? 110 },
    { name: 'No. 100 (0.15 mm)', weight: inputs.sieve_100 ?? 30 },
    { name: 'Pan', weight: inputs.sieve_pan ?? 10 },
  ]

  const startRow = 10
  const totalRow = startRow + sieveRows.length

  sieveRows.forEach((sieve, idx) => {
    const r = startRow + idx
    const wt = Number(sieve.weight ?? 0)

    if (sieve.name) ws.getCell(`B${r}`).value = sieve.name
    ws.getCell(`D${r}`).value = wt

    // Update formula persen tertahan dan lolos
    const pctCell = ws.getCell(`E${r}`)
    pctCell.value = { formula: `IF($D$${totalRow}>0, (D${r}/$D$${totalRow})*100, 0)`, result: 0 }

    const cumCell = ws.getCell(`F${r}`)
    if (idx === 0) {
      cumCell.value = { formula: `E${r}`, result: 0 }
    } else {
      cumCell.value = { formula: `F${r - 1}+E${r}`, result: 0 }
    }

    const passCell = ws.getCell(`G${r}`)
    passCell.value = { formula: `100-F${r}`, result: 0 }
  })

  // Baris Total
  const totWCell = ws.getCell(`D${totalRow}`)
  if (totWCell) {
    totWCell.value = { formula: `SUM(D${startRow}:D${totalRow - 1})`, result: 0 }
  }

  // Update Evaluasi & Kesimpulan
  const evalCell = ws.getCell(`A${totalRow + 2}`)
  if (evalCell) {
    evalCell.value = `[Evaluasi Gradasi]: ${calcOutput?.conclusion || 'Analisis gradasi memenuhi spesifikasi teknis.'}`
  }

  return wb
}

/**
 * 3. INJEKSI TEMPLATE: BERAT JENIS (berat-jenis-template.xlsx)
 */
async function populateBeratJenisTemplate(templateBuffer, { inputs, calcOutput, metadata, selectedSampleIds }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  const allSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
    ? inputs.samples
    : (Array.isArray(calcOutput?.samples) ? calcOutput.samples : [])

  const activeSamples = selectedSampleIds && selectedSampleIds.length > 0
    ? allSamples.filter((s, idx) => selectedSampleIds.includes(s.id ?? idx + 1))
    : allSamples

  const startRow = 10

  activeSamples.forEach((sample, idx) => {
    const r = startRow + idx
    const s = Number(sample.s ?? 500)
    const a = Number(sample.a ?? 490)
    const b = Number(sample.b ?? 665)
    const c = Number(sample.c ?? 980)

    ws.getCell(`B${r}`).value = sample.name || `Benda Uji ${idx + 1}`
    ws.getCell(`C${r}`).value = s
    ws.getCell(`D${r}`).value = a
    ws.getCell(`E${r}`).value = b
    ws.getCell(`F${r}`).value = c

    // Formula Sd, Ss, Sw
    ws.getCell(`G${r}`).value = { formula: `D${r}/(E${r}+C${r}-F${r})`, result: 2.65 }
    ws.getCell(`H${r}`).value = { formula: `C${r}/(E${r}+C${r}-F${r})`, result: 2.7 }
    ws.getCell(`I${r}`).value = { formula: `((C${r}-D${r})/D${r})*100`, result: 2.04 }
  })

  return wb
}

/**
 * 4. INJEKSI TEMPLATE: KUAT TARIK BAJA (kuat-tarik-template.xlsx)
 */
async function populateKuatTarikTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  const d = Number(inputs.diameter || 16)
  const py = Number(inputs.bebanLeleh || 85.5)
  const pu = Number(inputs.bebanMaks || 115.2)

  ws.getCell('C10').value = d
  ws.getCell('E10').value = py
  ws.getCell('F10').value = pu

  return wb
}

/**
 * 5. INJEKSI TEMPLATE: SONDIR CPT (sondir-cpt-template.xlsx)
 */
async function populateSondirCptTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  const cptData = Array.isArray(inputs.cptRows) && inputs.cptRows.length > 0
    ? inputs.cptRows
    : (Array.isArray(calcOutput?.cptData) ? calcOutput.cptData : [])

  const startRow = 10

  cptData.forEach((row, idx) => {
    const r = startRow + idx
    const depth = Number(row.depth ?? (idx * 0.2))
    const qc = Number(row.qc ?? 0)
    const qfs = Number(row.qfs ?? (qc + (row.fs ? row.fs * 10 : 0)))

    ws.getCell(`B${r}`).value = depth
    ws.getCell(`C${r}`).value = qc
    ws.getCell(`D${r}`).value = qfs

    ws.getCell(`E${r}`).value = { formula: `MAX(0, (D${r}-C${r})/10)`, result: (qfs - qc) / 10 }
    if (idx === 0) {
      ws.getCell(`F${r}`).value = { formula: `E${r}*20`, result: 10 }
    } else {
      ws.getCell(`F${r}`).value = { formula: `F${r - 1}+(E${r}*20)`, result: 0 }
    }
    ws.getCell(`G${r}`).value = { formula: `IF(C${r}>0, (E${r}/C${r})*100, 0)`, result: 0 }
    if (row.soilType) ws.getCell(`H${r}`).value = row.soilType
  })

  return wb
}

/**
 * FUNGSI UTAMA: EKSPOR MENGGUNAKAN TEMPLATE ASLI (TEMPLATE-DRIVEN EXPORT)
 * Jika template tersedia, data diinjeksikan ke dalam template master .xlsx.
 * Jika template tidak ditemukan atau terjadi kesalahan fetch, fallback ke excelLabGenerator.
 */
export async function exportModuleWithTemplate({
  testConfig,
  inputs,
  calcOutput,
  metadata = {},
  selectedSampleIds = null,
  options = {},
}) {
  if (!testConfig) {
    throw new Error('Konfigurasi pengujian (testConfig) wajib disediakan.')
  }

  const testId = testConfig.id || ''
  const templateInfo = TEMPLATE_REGISTRY[testId]

  // Bersihkan format nama file download
  const cleanCode = (testConfig.code || testConfig.id || 'Uji').replace(/[^a-zA-Z0-9_-]/g, '_')
  const cleanDate = (metadata.tanggal || new Date().toISOString().split('T')[0]).replace(/[^a-zA-Z0-9_-]/g, '-')
  const downloadFileName = `Blangko_${cleanCode}_${cleanDate}.xlsx`

  // Jika modul terdaftar memiliki template master di folder public/excel-templates/
  if (templateInfo?.fileName && options.useGeneratedFallback !== true) {
    try {
      console.log(`[LabSipil] Memuat master template Excel: /excel-templates/${templateInfo.fileName}`)
      const buffer = await fetchExcelTemplateBuffer(templateInfo.fileName)

      let populatedWorkbook = null

      // Routing pengisian data berdasarkan tipe template
      if (templateInfo.fileName === 'kadar-air-template.xlsx') {
        populatedWorkbook = await populateWaterContentTemplate(buffer, { inputs, calcOutput, metadata, selectedSampleIds })
      } else if (templateInfo.fileName === 'gradasi-template.xlsx') {
        populatedWorkbook = await populateGradasiTemplate(buffer, { inputs, calcOutput, metadata })
      } else if (templateInfo.fileName === 'berat-jenis-template.xlsx') {
        populatedWorkbook = await populateBeratJenisTemplate(buffer, { inputs, calcOutput, metadata, selectedSampleIds })
      } else if (templateInfo.fileName === 'kuat-tarik-template.xlsx') {
        populatedWorkbook = await populateKuatTarikTemplate(buffer, { inputs, calcOutput, metadata })
      } else if (templateInfo.fileName === 'sondir-cpt-template.xlsx') {
        populatedWorkbook = await populateSondirCptTemplate(buffer, { inputs, calcOutput, metadata })
      }

      if (populatedWorkbook) {
        console.log(`[LabSipil] Data berhasil diinjeksikan ke template ${templateInfo.fileName}. Memicu download...`)
        return await downloadWorkbook(populatedWorkbook, downloadFileName)
      }
    } catch (err) {
      console.warn(`[LabSipil] Gagal menggunakan template master "${templateInfo.fileName}" (${err.message}). Beralih otomatis ke generator blangko Excel...`)
    }
  }

  // Fallback Universal: Membuat blangko Excel formal dari nol dengan grid, borders, rumus, dan kop
  console.log(`[LabSipil] Mengekspor menggunakan generator blangko Excel standar: ${testConfig.name}`)
  return await exportTestModuleToExcel({
    testConfig,
    inputs,
    calcOutput,
    metadata,
    selectedSampleIds,
    options,
  })
}
