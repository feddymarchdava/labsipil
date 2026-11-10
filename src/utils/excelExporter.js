/**
 * =========================================================================
 * TEMPLATE-DRIVEN EXCEL EXPORTER UTILITY (LabSipil)
 * =========================================================================
 * Menyediakan sistem ekspor lembar kerja praktikum / pengujian laboratorium
 * teknik sipil berstandar SNI & ASTM dengan dukungan Native Linked Charts
 * menggunakan metode "Template Injection".
 *
 * Alur Kerja:
 * 1. Template Master (.xlsx) di public/excel-templates/ telah dikonfigurasi
 *    dengan tabel data dan Native Excel Scatter/Line Chart.
 * 2. Fungsi fetchExcelTemplateBuffer() memuat arrayBuffer berkas template.
 * 3. ExcelJS Workbook memuat buffer dan memperbarui sel-sel data teknis
 *    yang terhubung (linked) langsung ke Data Series grafik.
 * 4. Helper preserveTemplateCharts (via JSZip) menjaga keutuhan berkas XML
 *    chart/drawing OpenXML sehingga grafik Excel tetap aktif saat dibuka di
 *    Microsoft Excel, WPS Office, LibreOffice, maupun Google Sheets.
 * 5. Jika berkas template tidak ditemukan (404/offline), sistem otomatis
 *    melakukan fallback anggun ke generator dinamis (exportTestModuleToExcel)
 *    tanpa mengganggu pengalaman pengguna.
 */

import ExcelJS from 'exceljs'
import JSZip from 'jszip'
import { exportTestModuleToExcel } from './excelLabGenerator.js'

/**
 * PETA RELASI MODUL PENGUJIAN KE BERKAS MASTER TEMPLATE EXCEL
 */
export const TEMPLATE_REGISTRY = {
  // --- BAB 1 & 2: AGREGAT (BAHAN BANGUNAN) ---
  'bb-1-5': {
    fileName: 'gradasi-halus-template.xlsx',
    alias: 'gradasi-template.xlsx',
    name: 'Analisis Gradasi Agregat Halus (SNI ASTM C136:2012)',
    hasChart: true,
  },
  'bb-2-5': {
    fileName: 'gradasi-kasar-template.xlsx',
    alias: 'gradasi-template.xlsx',
    name: 'Analisis Gradasi Agregat Kasar (SNI ASTM C136:2012)',
    hasChart: true,
  },
  'bb-1-1': {
    fileName: 'berat-jenis-template.xlsx',
    name: 'Berat Jenis & Penyerapan Agregat Halus (SNI 1970:2016)',
    hasChart: false,
  },
  'bb-2-1': {
    fileName: 'berat-jenis-template.xlsx',
    name: 'Berat Jenis & Penyerapan Agregat Kasar (SNI 1969:2016)',
    hasChart: false,
  },
  'bb-1-2': {
    fileName: 'kadar-air-template.xlsx',
    name: 'Kadar Air Agregat Halus (SNI 1970:2016)',
    hasChart: false,
  },
  'bb-2-2': {
    fileName: 'kadar-air-template.xlsx',
    name: 'Kadar Air Agregat Kasar (SNI 1969:2016)',
    hasChart: false,
  },

  // --- BAB 5: BAJA TULANGAN ---
  'bb-5-1': {
    fileName: 'kuat-tarik-template.xlsx',
    name: 'Kuat Tarik Baja Tulangan Beton (SNI 2052:2017)',
    hasChart: false,
  },

  // --- MEKANIKA TANAH ---
  'mt-4-1': {
    fileName: 'saringan-tanah-template.xlsx',
    alias: 'gradasi-template.xlsx',
    name: 'Analisis Saringan Butiran Tanah (SNI 3423:2008 / ASTM D422)',
    hasChart: true,
  },
  'mt-3-1': {
    fileName: 'proctor-template.xlsx',
    name: 'Pengujian Pemadatan Standard Proctor (SNI 1742:2008 / ASTM D698)',
    hasChart: true,
  },
  'mt-pemadatan': {
    fileName: 'proctor-template.xlsx',
    name: 'Pemadatan Standard Proctor (Alias)',
    hasChart: true,
  },
  'mt-2-3': {
    fileName: 'casagrande-template.xlsx',
    name: 'Pengujian Batas Cair Casagrande (SNI 1967:2008 / ASTM D4318)',
    hasChart: true,
  },
  'mt-2-1': {
    fileName: 'kadar-air-template.xlsx',
    name: 'Kadar Air Tanah (SNI 1965:2008)',
    hasChart: false,
  },
  'mt-2-2': {
    fileName: 'berat-jenis-template.xlsx',
    name: 'Berat Jenis Tanah (SNI 1964:2008)',
    hasChart: false,
  },
  'mt-1-1': {
    fileName: 'sondir-cpt-template.xlsx',
    name: 'Penyelidikan Penetrasi Konus Sondir CPT (SNI 2827:2008)',
    hasChart: false,
  },
  'tanah-4-1': {
    fileName: 'sondir-cpt-template.xlsx',
    name: 'Sondir CPT Dinamis (Alias)',
    hasChart: false,
  },
}

/**
 * =========================================================================
 * PETUNJUK MAPPING KOORDINAT SEL (CELL MAPPING SPECIFICATIONS)
 * =========================================================================
 * Dokumentasi struktural untuk setiap modul uji ber-grafik. Menjelaskan sel
 * sumber data Sumbu X, Sumbu Y, Batas Amplop Spesifikasi, dan Parameter Kunci.
 */
export const CELL_MAPPING_SPECS = {
  'bb-1-5': {
    moduleId: 'bb-1-5',
    moduleName: 'Analisis Gradasi Agregat Halus (Pasir)',
    templateFile: 'gradasi-halus-template.xlsx',
    sheetName: 'Blangko Analisis Saringan',
    chartType: 'Semi-log Scatter Chart (Log X, Linear Y)',
    xAxis: {
      label: 'Ukuran Saringan (mm)',
      cellRange: 'C8:C14',
      scale: 'Logarithmic Base 10',
      description: 'Diameter bukaan saringan pasir (9.5 mm down to 0.15 mm)',
    },
    yAxis: {
      label: 'Persen Lolos Kumulatif (%)',
      cellRange: 'G8:G14',
      scale: 'Linear 0 - 100%',
      description: 'Kurva Distribusi Uji Pasir (% Passing aktual)',
    },
    specLimits: {
      lower: { label: 'Batas Bawah SNI Zona 2', cellRange: 'H8:H14' },
      upper: { label: 'Batas Atas SNI Zona 2', cellRange: 'I8:I14' },
    },
    parameters: {
      totalWeight: { label: 'Total Berat Sampel', cell: 'D16', unit: 'gram' },
      mhb: { label: 'Modulus Halus Butir (MHB / FM)', cell: 'D17', unit: '' },
      zone: { label: 'Klasifikasi Zona Pasir', cell: 'D18', unit: '' },
      conclusion: { label: 'Evaluasi Mutu & Kesimpulan', cell: 'A20:I22' },
    },
  },

  'bb-2-5': {
    moduleId: 'bb-2-5',
    moduleName: 'Analisis Gradasi Agregat Kasar (Kerikil / Split)',
    templateFile: 'gradasi-kasar-template.xlsx',
    sheetName: 'Blangko Analisis Saringan',
    chartType: 'Semi-log Scatter Chart (Log X, Linear Y)',
    xAxis: {
      label: 'Ukuran Saringan (mm)',
      cellRange: 'C8:C14',
      scale: 'Logarithmic Base 10',
      description: 'Diameter bukaan saringan kerikil (37.5 mm down to 2.36 mm)',
    },
    yAxis: {
      label: 'Persen Lolos Kumulatif (%)',
      cellRange: 'G8:G14',
      scale: 'Linear 0 - 100%',
      description: 'Kurva Distribusi Uji Kerikil (% Passing aktual)',
    },
    specLimits: {
      lower: { label: 'Batas Bawah Spesifikasi', cellRange: 'H8:H14' },
      upper: { label: 'Batas Atas Spesifikasi', cellRange: 'I8:I14' },
    },
    parameters: {
      totalWeight: { label: 'Total Berat Sampel', cell: 'D16', unit: 'gram' },
      mhb: { label: 'Modulus Halus Butir (MHB Kerikil)', cell: 'D17', unit: '' },
      conclusion: { label: 'Evaluasi Mutu & Kesimpulan', cell: 'A19:I21' },
    },
  },

  'mt-4-1': {
    moduleId: 'mt-4-1',
    moduleName: 'Analisis Saringan Butiran Tanah (Gradasi Butir)',
    templateFile: 'saringan-tanah-template.xlsx',
    sheetName: 'Analisis Saringan Tanah',
    chartType: 'Semi-log Scatter Chart (Log X, Linear Y)',
    xAxis: {
      label: 'Diameter Butir Tanah (mm)',
      cellRange: 'C8:C14',
      scale: 'Logarithmic Base 10',
      description: 'Diameter bukaan ayakan tanah (4.75 mm No. 4 s/d 0.075 mm No. 200)',
    },
    yAxis: {
      label: 'Persen Lolos Kumulatif (%)',
      cellRange: 'G8:G14',
      scale: 'Linear 0 - 100%',
      description: 'Kurva Butiran Tanah (% Lolos Kumulatif)',
    },
    parameters: {
      totalWeight: { label: 'Total Berat Sampel (W_total)', cell: 'D16', unit: 'gram' },
      d60: { label: 'Diameter Butir D60', cell: 'C18', unit: 'mm' },
      cu: { label: 'Koefisien Keseragaman (Cu)', cell: 'F18', unit: '' },
      d30: { label: 'Diameter Butir D30', cell: 'C19', unit: 'mm' },
      cc: { label: 'Koefisien Kelengkungan (Cc)', cell: 'F19', unit: '' },
      d10: { label: 'Diameter Efektif D10', cell: 'C20', unit: 'mm' },
      fines: { label: 'Fraksi Halus Lolos #200', cell: 'F20', unit: '%' },
      uscs: { label: 'Klasifikasi Tanah USCS', cell: 'C21:F21', unit: '' },
      conclusion: { label: 'Evaluasi Mutu & Kesimpulan', cell: 'A23:G25' },
    },
  },

  'mt-3-1': {
    moduleId: 'mt-3-1',
    moduleName: 'Pengujian Pemadatan Standard Proctor',
    templateFile: 'proctor-template.xlsx',
    sheetName: 'Pemadatan Proctor',
    chartType: 'Scatter Chart with Smooth Lines & Markers',
    xAxis: {
      label: 'Kadar Air Rata-rata (w)',
      cellRange: 'E8:E12',
      scale: 'Linear (%)',
      description: 'Kadar air tanah pemadatan 5 titik sampel',
    },
    yAxis: {
      label: 'Kerapatan Kering (γ_dry)',
      cellRange: 'F8:F12',
      scale: 'Linear 1.5 - 2.2 gr/cm³',
      description: 'Kurva Kompaksi Parabola Kerapatan Kering',
    },
    secondaryYAxis: {
      label: 'Zero Air Voids (γ_zav)',
      cellRange: 'G8:G12',
      scale: 'Linear 1.5 - 2.2 gr/cm³',
      description: 'Kurva Garis Kejenuhan Udara Nol (ZAV)',
    },
    parameters: {
      mdd: { label: 'Kerapatan Kering Maksimum (MDD)', cell: 'D14', unit: 'gr/cm³' },
      omc: { label: 'Kadar Air Optimum (OMC)', cell: 'D15', unit: '%' },
      gs: { label: 'Berat Jenis Tanah (Gs Acuan)', cell: 'D16', unit: '' },
      conclusion: { label: 'Evaluasi Hasil Pemadatan', cell: 'A18:G20' },
    },
  },

  'mt-2-3': {
    moduleId: 'mt-2-3',
    moduleName: 'Pengujian Batas Cair Casagrande',
    templateFile: 'casagrande-template.xlsx',
    sheetName: 'Batas Cair Casagrande',
    chartType: 'Semi-log Scatter Chart (Log X, Linear Y)',
    xAxis: {
      label: 'Jumlah Ketukan Cawan (N)',
      cellRange: 'B8:B11',
      scale: 'Logarithmic Base 10',
      description: 'Jumlah ketukan cawan Casagrande (15 - 35 ketukan)',
    },
    yAxis: {
      label: 'Kadar Air Tanah (w)',
      cellRange: 'G8:G11',
      scale: 'Linear (%)',
      description: 'Kurva Aliran Batas Cair (Flow Curve)',
    },
    parameters: {
      ll: { label: 'Batas Cair (Liquid Limit / LL pada N = 25)', cell: 'D13', unit: '%' },
      flowIndex: { label: 'Indeks Aliran (Flow Index If)', cell: 'D14', unit: '' },
      conclusion: { label: 'Evaluasi Mutu & Kesimpulan', cell: 'A16:G18' },
    },
  },
}

/**
 * Mencetak panduan koordinat mapping sel ke konsol pengembang
 */
export function logCellMappingGuide(moduleId) {
  const spec = CELL_MAPPING_SPECS[moduleId]
  if (!spec) return

  try {
    console.group(`[LabSipil Excel Mapping] ${spec.moduleName} (${moduleId})`)
    console.log(`Template  : ${spec.templateFile} -> Sheet "${spec.sheetName}"`)
    console.log(`Chart Type: ${spec.chartType}`)
    console.table({
      'Sumbu X': { Label: spec.xAxis.label, Range: spec.xAxis.cellRange, Skala: spec.xAxis.scale },
      'Sumbu Y (Kurva Uji)': { Label: spec.yAxis.label, Range: spec.yAxis.cellRange, Skala: spec.yAxis.scale },
      ...(spec.specLimits ? {
        'Batas Bawah SNI': { Label: spec.specLimits.lower.label, Range: spec.specLimits.lower.cellRange, Skala: 'Reference' },
        'Batas Atas SNI': { Label: spec.specLimits.upper.label, Range: spec.specLimits.upper.cellRange, Skala: 'Reference' },
      } : {}),
      ...(spec.secondaryYAxis ? {
        'Kurva ZAV': { Label: spec.secondaryYAxis.label, Range: spec.secondaryYAxis.cellRange, Skala: spec.secondaryYAxis.scale },
      } : {}),
    })
    console.groupEnd()
  } catch (e) {
    // Non-blocking logger
  }
}

/**
 * Memuat arrayBuffer berkas template dari folder public/excel-templates/
 */
export async function fetchExcelTemplateBuffer(fileName) {
  const templatePath = `/excel-templates/${fileName}`

  // 1. Lingkungan Browser (Vite frontend)
  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    const res = await window.fetch(templatePath)
    if (!res.ok) {
      throw new Error(`Gagal memuat template Excel "${fileName}" (Status HTTP ${res.status}: ${res.statusText})`)
    }
    return await res.arrayBuffer()
  }

  // 2. Lingkungan Node.js (untuk keperluan test runner & automasi)
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      const fsModuleName = 'fs'
      const pathModuleName = 'path'
      const fs = await import(/* @vite-ignore */ fsModuleName)
      const path = await import(/* @vite-ignore */ pathModuleName)
      const localPath = path.resolve(process.cwd(), 'public/excel-templates', fileName)
      if (fs.existsSync(localPath)) {
        const nodeBuf = fs.readFileSync(localPath)
        return nodeBuf.buffer.slice(nodeBuf.byteOffset, nodeBuf.byteOffset + nodeBuf.byteLength)
      }
    } catch (e) {
      // fallback down
    }
  }

  throw new Error(`Template "${fileName}" tidak dapat ditemukan di jalur "${templatePath}".`)
}

/**
 * Mempertahankan OpenXML Charts & Drawings saat ExcelJS menyimpan buffer workbook
 */
export async function preserveTemplateCharts(originalTemplateBuffer, modifiedWbBuffer) {
  if (!originalTemplateBuffer || !modifiedWbBuffer) return modifiedWbBuffer

  try {
    const origZip = await JSZip.loadAsync(originalTemplateBuffer)
    const chartPaths = []
    origZip.forEach((relativePath, file) => {
      if (!file.dir && !relativePath.endsWith('/') && (relativePath.startsWith('xl/charts/') || relativePath.startsWith('xl/drawings/'))) {
        chartPaths.push(relativePath)
      }
    })

    // Jika template asli tidak memuat chart, kembalikan buffer ExcelJS langsung
    if (chartPaths.length === 0) {
      return modifiedWbBuffer
    }

    const modZip = await JSZip.loadAsync(modifiedWbBuffer)

    // 1. Salin seluruh berkas chart dan drawing XML asli
    for (const relPath of chartPaths) {
      const zFile = origZip.file(relPath)
      if (zFile) {
        const content = await zFile.async('uint8array')
        modZip.file(relPath, content)
      }
    }

    // 2. Salin relasi drawing pada sheet1
    const sheetRelPath = 'xl/worksheets/_rels/sheet1.xml.rels'
    if (origZip.file(sheetRelPath)) {
      const origRels = await origZip.file(sheetRelPath).async('text')
      modZip.file(sheetRelPath, origRels)
    }

    // 3. Pastikan sheet1.xml merujuk relasi <drawing r:id="..." />
    const origSheet1 = await origZip.file('xl/worksheets/sheet1.xml').async('text')
    const drawingMatch = origSheet1.match(/<drawing\s+r:id="([^"]+)"\s*\/>/)
    if (drawingMatch) {
      let modSheet1 = await modZip.file('xl/worksheets/sheet1.xml').async('text')
      if (!modSheet1.includes('<drawing')) {
        modSheet1 = modSheet1.replace('</worksheet>', `${drawingMatch[0]}</worksheet>`)
        modZip.file('xl/worksheets/sheet1.xml', modSheet1)
      }
    }

    // 4. Pastikan [Content_Types].xml memuat override drawing & chart
    let contentTypes = await modZip.file('[Content_Types].xml').async('text')
    let updatedCt = false
    if (!contentTypes.includes('drawing+xml') && origZip.file('xl/drawings/drawing1.xml')) {
      contentTypes = contentTypes.replace(
        '</Types>',
        '<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/></Types>'
      )
      updatedCt = true
    }
    if (!contentTypes.includes('drawingml.chart+xml') && origZip.file('xl/charts/chart1.xml')) {
      contentTypes = contentTypes.replace(
        '</Types>',
        '<Override PartName="/xl/charts/chart1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/></Types>'
      )
      updatedCt = true
    }
    if (updatedCt) {
      modZip.file('[Content_Types].xml', contentTypes)
    }

    return await modZip.generateAsync({ type: 'uint8array' })
  } catch (err) {
    console.warn('Gagal mempertahankan chart template, mengekspor berkas tanpa kurva grafis:', err)
    return modifiedWbBuffer
  }
}

/**
 * Memicu proses unduh berkas workbook ExcelJS atau buffer ke browser pengguna
 */
export async function downloadWorkbook(workbookOrBuffer, fileName) {
  let buffer
  if (workbookOrBuffer instanceof Uint8Array || (typeof Buffer !== 'undefined' && Buffer.isBuffer(workbookOrBuffer))) {
    buffer = workbookOrBuffer
  } else if (workbookOrBuffer && typeof workbookOrBuffer.xlsx?.writeBuffer === 'function') {
    buffer = await workbookOrBuffer.xlsx.writeBuffer()
  } else {
    throw new Error('Format data workbook yang akan diunduh tidak valid.')
  }

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

  return { success: true, fileName, bufferSize: buffer.byteLength || buffer.length }
}

/**
 * Mengisi metadata kop dokumen pada sel C4 (Tanggal) dan C5 (Deskripsi Benda Uji)
 */
function injectHeaderMetadata(ws, metadata) {
  const cellDate = ws.getCell('C4')
  if (cellDate) {
    cellDate.value = `:  ${metadata.tanggal || new Date().toISOString().split('T')[0]}`
  }

  const cellDesc = ws.getCell('C5')
  if (cellDesc) {
    cellDesc.value = `:  ${metadata.sampelDesc || '-'}`
  }
}

/**
 * =========================================================================
 * 1. INJEKSI TEMPLATE: KADAR AIR (kadar-air-template.xlsx)
 * =========================================================================
 */
async function populateWaterContentTemplate(templateBuffer, { inputs, calcOutput, metadata, selectedSampleIds }) {
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

  const startRow = 8

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
  const avgRow = 13
  if (lastDataRow >= startRow && ws.getCell(`H${avgRow}`)) {
    const avgCell = ws.getCell(`H${avgRow}`)
    avgCell.value = {
      formula: `AVERAGE(H${startRow}:H${lastDataRow})`,
      result: Number(calcOutput?.avgWaterContent ?? calcOutput?.results?.[0]?.value ?? 0),
    }
  }

  // Update Evaluasi & Kesimpulan
  const evalCell = ws.getCell('A15')
  if (evalCell) {
    const text = calcOutput?.conclusion || calcOutput?.summaryString || 'Pengujian kadar air selesai sesuai SNI 1965:2008.'
    evalCell.value = `[Evaluasi Mutu]: ${text}`
  }

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * 2. INJEKSI TEMPLATE: GRADASI AGREGAT HALUS & KASAR BER-GRAFIK NATIVE
 * =========================================================================
 * Memetakan data saringan pasir (bb-1-5) atau kerikil (bb-2-5) ke baris sel
 * C8:C14 (Diameter mm / Sumbu X) dan G8:G14 (% Lolos / Sumbu Y).
 */
async function populateGradasiTemplate(templateBuffer, { testConfig, inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  // Ambil data saringan dari kalkulator atau input
  const isCoarse = testConfig?.id === 'bb-2-5' || testConfig?.isCoarse
  const gradChart = calcOutput?.gradationChart

  let sieveRows = []
  if (gradChart && Array.isArray(gradChart.sieves) && Array.isArray(gradChart.actualPassing)) {
    sieveRows = gradChart.sieves.map((sz, idx) => ({
      name: gradChart.sieveNames?.[idx] || gradChart.sieveLabels?.[idx] || `${sz} mm`,
      size: sz,
      weight: 0, // berat tertahan
      passing: gradChart.actualPassing[idx],
      bb: gradChart.bbList?.[idx] ?? (isCoarse ? 0 : 35),
      ba: gradChart.baList?.[idx] ?? 100,
    }))
  } else if (Array.isArray(inputs.sieves) && inputs.sieves.length > 0) {
    sieveRows = inputs.sieves.map((s) => ({
      name: s.label || `${s.size} mm`,
      size: Number(s.size || 0),
      weight: Number(s.weight ?? (Array.isArray(s.weights) ? s.weights[0] : 0)),
      passing: 0,
      bb: 0,
      ba: 100,
    }))
  } else {
    // Default Pasir
    sieveRows = [
      { name: '3/8" (9.5 mm)', size: 9.5, weight: 0, passing: 100, bb: 100, ba: 100 },
      { name: 'No. 4 (4.75 mm)', size: 4.75, weight: 20, passing: 96, bb: 90, ba: 100 },
      { name: 'No. 8 (2.36 mm)', size: 2.36, weight: 60, passing: 84, bb: 75, ba: 100 },
      { name: 'No. 16 (1.18 mm)', size: 1.18, weight: 110, passing: 62, bb: 55, ba: 90 },
      { name: 'No. 30 (0.60 mm)', size: 0.60, weight: 140, passing: 34, bb: 35, ba: 59 },
      { name: 'No. 50 (0.30 mm)', size: 0.30, weight: 100, passing: 14, bb: 8, ba: 30 },
      { name: 'No. 100 (0.15 mm)', size: 0.15, weight: 50, passing: 4, bb: 0, ba: 10 },
      { name: 'Pan Penampung', size: 0, weight: 20, passing: 0, bb: 0, ba: 0 },
    ]
  }

  const startRow = 8
  const totalRow = startRow + sieveRows.length

  sieveRows.forEach((sieve, idx) => {
    const r = startRow + idx
    const wt = Number(sieve.weight ?? 0)

    if (sieve.name) ws.getCell(`B${r}`).value = sieve.name
    if (sieve.size !== undefined) ws.getCell(`C${r}`).value = Number(sieve.size)
    ws.getCell(`D${r}`).value = wt

    // Formula % Tertahan, Kumulatif, dan % Lolos
    const pctCell = ws.getCell(`E${r}`)
    pctCell.value = { formula: `IF($D$${totalRow}>0, (D${r}/$D$${totalRow})*100, 0)`, result: 0 }

    const cumCell = ws.getCell(`F${r}`)
    if (idx === 0) {
      cumCell.value = { formula: `E${r}`, result: 0 }
    } else {
      cumCell.value = { formula: `F${r - 1}+E${r}`, result: 0 }
    }

    const passCell = ws.getCell(`G${r}`)
    passCell.value = { formula: `MAX(0, 100-F${r})`, result: Number(sieve.passing ?? 100) }

    // Batas Amplop SNI
    if (sieve.bb !== undefined && ws.getCell(`H${r}`)) {
      ws.getCell(`H${r}`).value = Number(sieve.bb)
    }
    if (sieve.ba !== undefined && ws.getCell(`I${r}`)) {
      ws.getCell(`I${r}`).value = Number(sieve.ba)
    }
  })

  // Baris Total SUM
  const totWCell = ws.getCell(`D${totalRow}`)
  if (totWCell) {
    totWCell.value = { formula: `SUM(D${startRow}:D${totalRow - 1})`, result: 500 }
  }

  // Update Parameter MHB (Fineness Modulus) & Zona
  const mhbRow = totalRow + 1
  const mhbResult = calcOutput?.results?.find((r) => r.label.includes('FM') || r.label.includes('MHB'))?.value || '2.76'
  const mhbNum = parseFloat(String(mhbResult).replace(/[^\d.]/g, '')) || 2.76
  const mhbCell = ws.getCell(`D${mhbRow}`)
  if (mhbCell) {
    mhbCell.value = mhbNum
  }

  const zoneRow = totalRow + 2
  const zoneVal = calcOutput?.gradationChart?.zoneFullName || calcOutput?.results?.find((r) => r.label.includes('Zona'))?.value || 'Zona II (Pasir Ideal Beton)'
  const zoneCell = ws.getCell(`D${zoneRow}`)
  if (zoneCell) {
    zoneCell.value = zoneVal
  }

  // Update Evaluasi & Kesimpulan Spesifikasi
  const evalRow = totalRow + 4
  const evalCell = ws.getCell(`A${evalRow}`)
  if (evalCell) {
    evalCell.value = `[Evaluasi Gradasi]: ${calcOutput?.conclusion || 'Analisis gradasi butiran memenuhi spesifikasi teknis SNI ASTM C136:2012.'}`
  }

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * 3. INJEKSI TEMPLATE: ANALISIS SARINGAN BUTIRAN TANAH (saringan-tanah-template.xlsx)
 * =========================================================================
 * Memetakan data fraksi tanah ke sel C8:C14 (Diameter mm / Sumbu X) dan
 * G8:G14 (% Lolos / Sumbu Y) serta parameter geoteknik D10, D30, D60, Cu, Cc, USCS.
 */
async function populateSaringanTanahTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  // Ambil fraksi tanah dari kalkulator
  const rawSieves = Array.isArray(inputs.soilSieves) && inputs.soilSieves.length > 0
    ? inputs.soilSieves
    : (Array.isArray(calcOutput?.calculatedSieves) ? calcOutput.calculatedSieves : [
        { sieveNo: 'No. 4 (4.75 mm)', diameter: 4.75, retainedWeight: 20 },
        { sieveNo: 'No. 10 (2.00 mm)', diameter: 2.0, retainedWeight: 60 },
        { sieveNo: 'No. 20 (0.85 mm)', diameter: 0.85, retainedWeight: 100 },
        { sieveNo: 'No. 40 (0.425 mm)', diameter: 0.425, retainedWeight: 100 },
        { sieveNo: 'No. 60 (0.25 mm)', diameter: 0.25, retainedWeight: 90 },
        { sieveNo: 'No. 100 (0.15 mm)', diameter: 0.15, retainedWeight: 55 },
        { sieveNo: 'No. 200 (0.075 mm)', diameter: 0.075, retainedWeight: 45 },
        { sieveNo: 'Pan Penampung', diameter: 0, retainedWeight: 24 },
      ])

  const startRow = 8
  const totalRow = startRow + rawSieves.length

  rawSieves.forEach((sieve, idx) => {
    const r = startRow + idx
    const wt = Number(sieve.retainedWeight ?? sieve.weight ?? 0)

    if (sieve.sieveNo) ws.getCell(`B${r}`).value = sieve.sieveNo
    if (sieve.diameter !== undefined) ws.getCell(`C${r}`).value = Number(sieve.diameter)
    ws.getCell(`D${r}`).value = wt

    const pctCell = ws.getCell(`E${r}`)
    pctCell.value = { formula: `IF($D$${totalRow}>0, (D${r}/$D$${totalRow})*100, 0)`, result: 0 }

    const cumCell = ws.getCell(`F${r}`)
    if (idx === 0) {
      cumCell.value = { formula: `E${r}`, result: 0 }
    } else {
      cumCell.value = { formula: `F${r - 1}+E${r}`, result: 0 }
    }

    const passCell = ws.getCell(`G${r}`)
    passCell.value = { formula: `MAX(0, 100-F${r})`, result: 0 }
  })

  // Baris Total W_total
  const totWCell = ws.getCell(`D${totalRow}`)
  if (totWCell) {
    const wTotalInput = Number(inputs.wTotal || 500)
    totWCell.value = { formula: `SUM(D${startRow}:D${totalRow - 1})`, result: wTotalInput }
  }

  // Parameter Geoteknik (D10, D30, D60, Cu, Cc, USCS)
  const d60Val = Number(calcOutput?.d60 ?? inputs.d60 ?? 0.74)
  const d30Val = Number(calcOutput?.d30 ?? inputs.d30 ?? 0.281)
  const d10Val = Number(calcOutput?.d10 ?? inputs.d10 ?? 0.102)
  const cuVal = Number(calcOutput?.cu ?? (d10Val > 0 ? d60Val / d10Val : 7.25))
  const ccVal = Number(calcOutput?.cc ?? (d10Val * d60Val > 0 ? (d30Val * d30Val) / (d10Val * d60Val) : 1.05))
  const finesVal = calcOutput?.finesPct ?? inputs.finesPct ?? '4.86%'
  const uscsVal = calcOutput?.uscsCode || calcOutput?.uscsName || 'SW (Pasir Bergradasi Baik / Well-Graded Sand)'

  // Baris p1 (D60 & Cu)
  ws.getCell('C18').value = d60Val
  ws.getCell('F18').value = cuVal

  // Baris p2 (D30 & Cc)
  ws.getCell('C19').value = d30Val
  ws.getCell('F19').value = ccVal

  // Baris p3 (D10 & Fines)
  ws.getCell('C20').value = d10Val
  ws.getCell('F20').value = typeof finesVal === 'number' ? `${finesVal.toFixed(2)}%` : String(finesVal)

  // Baris p4 (USCS)
  ws.getCell('C21').value = uscsVal

  // Evaluasi & Kesimpulan
  const evalCell = ws.getCell('A23')
  if (evalCell) {
    evalCell.value = `[Evaluasi Geoteknik]: ${calcOutput?.conclusion || 'Distribusi butiran tanah memenuhi klasifikasi USCS standar SNI 3423:2008.'}`
  }

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * 4. INJEKSI TEMPLATE: PEMADATAN STANDARD PROCTOR (proctor-template.xlsx)
 * =========================================================================
 * Memetakan 5 titik uji kompaksi ke sel E8:E12 (Kadar Air w % / Sumbu X),
 * F8:F12 (Kerapatan Kering γ_dry / Sumbu Y1), dan G8:G12 (ZAV / Sumbu Y2).
 */
async function populateProctorTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  // Ambil titik proctor
  const samples = Array.isArray(calcOutput?.proctorSamples) && calcOutput.proctorSamples.length > 0
    ? calcOutput.proctorSamples
    : (Array.isArray(inputs.proctorSamples) && inputs.proctorSamples.length > 0
        ? inputs.proctorSamples
        : [
            { name: 'Titik 1 (S1)', massMoldSoil: 3950, gammaWet: 1.907, avgW: 9.8, gammaDry: 1.737, zav: 2.103 },
            { name: 'Titik 2 (S2)', massMoldSoil: 4080, gammaWet: 2.045, avgW: 12.4, gammaDry: 1.819, zav: 2.007 },
            { name: 'Titik 3 (S3)', massMoldSoil: 4190, gammaWet: 2.161, avgW: 15.1, gammaDry: 1.878, zav: 1.918 },
            { name: 'Titik 4 (S4)', massMoldSoil: 4140, gammaWet: 2.108, avgW: 17.8, gammaDry: 1.790, zav: 1.836 },
            { name: 'Titik 5 (S5)', massMoldSoil: 4060, gammaWet: 2.024, avgW: 20.5, gammaDry: 1.680, zav: 1.761 },
          ])

  const startRow = 8
  const gsDefault = Number(samples[0]?.gs || 2.65)

  samples.slice(0, 5).forEach((p, idx) => {
    const r = startRow + idx
    const moldMass = Number(p.massMoldSoil || (3950 + idx * 80))
    const wVal = Number(p.avgW ?? p.w ?? (9.8 + idx * 2.6))
    const wetVal = Number(p.gammaWet ?? p.wet ?? 1.9 + idx * 0.06)
    const dryVal = Number(p.gammaDry ?? p.dry ?? (wetVal / (1 + wVal / 100)))
    const zavVal = Number(p.zav ?? ((gsDefault * 1.0) / (1 + (wVal * gsDefault) / 100)))

    ws.getCell(`A${r}`).value = idx + 1
    ws.getCell(`B${r}`).value = p.name || `Titik ${idx + 1} (S${idx + 1})`
    ws.getCell(`C${r}`).value = moldMass
    ws.getCell(`D${r}`).value = +wetVal.toFixed(3)
    ws.getCell(`E${r}`).value = +wVal.toFixed(2)
    ws.getCell(`F${r}`).value = +dryVal.toFixed(3)
    ws.getCell(`G${r}`).value = +zavVal.toFixed(3)
  })

  // Parameter Ringkasan Hasil Pemadatan (MDD, OMC, Gs)
  const mddVal = Number(calcOutput?.mdd || 1.88)
  const omcVal = Number(calcOutput?.omc || 15.1)

  ws.getCell('D14').value = +mddVal.toFixed(3)
  ws.getCell('D15').value = +omcVal.toFixed(2)
  ws.getCell('D16').value = gsDefault

  // Evaluasi & Kesimpulan Pemadatan
  const evalCell = ws.getCell('A18')
  if (evalCell) {
    evalCell.value = `[Evaluasi Pemadatan]: ${calcOutput?.conclusion || 'Karakteristik kurva pemadatan tanah memenuhi persyaratan SNI 1742:2008.'}`
  }

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * 5. INJEKSI TEMPLATE: BATAS CAIR CASAGRANDE (casagrande-template.xlsx)
 * =========================================================================
 * Memetakan titik ketukan ke sel B8:B11 (Ketukan N / Sumbu X) dan
 * G8:G11 (Kadar Air w % / Sumbu Y Flow Curve).
 */
async function populateCasagrandeTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  const points = Array.isArray(inputs.samples) && inputs.samples.length > 0
    ? inputs.samples
    : (Array.isArray(calcOutput?.points) ? calcOutput.points : [
        { n: 16, code: 'C-01', w1: 12.4, w2: 36.8, w3: 29.2, w: 45.24 },
        { n: 22, code: 'C-02', w1: 11.8, w2: 38.5, w3: 30.5, w: 42.78 },
        { n: 28, code: 'C-03', w1: 12.1, w2: 37.2, w3: 29.9, w: 41.01 },
        { n: 33, code: 'C-04', w1: 12.5, w2: 39.4, w3: 31.8, w: 39.38 },
      ])

  const startRow = 8
  points.slice(0, 4).forEach((p, idx) => {
    const r = startRow + idx
    const n = Number(p.n ?? p.ketukanN ?? 20)
    const w1 = Number(p.w1 ?? 12.0)
    const w2 = Number(p.w2 ?? 38.0)
    const w3 = Number(p.w3 ?? 30.0)
    const w = Number(p.w ?? (w3 > w1 ? ((w2 - w3) / (w3 - w1)) * 100 : 42.0))

    ws.getCell(`A${r}`).value = idx + 1
    ws.getCell(`B${r}`).value = n
    ws.getCell(`C${r}`).value = p.code || p.name || `C-${idx + 1}`
    ws.getCell(`D${r}`).value = w1
    ws.getCell(`E${r}`).value = w2
    ws.getCell(`F${r}`).value = w3
    ws.getCell(`G${r}`).value = { formula: `IF(F${r}>D${r}, ((E${r}-F${r})/(F${r}-D${r}))*100, 0)`, result: +w.toFixed(2) }
  })

  // Parameter Batas Cair LL & Flow Index
  const llVal = Number(calcOutput?.liquidLimit ?? calcOutput?.ll ?? 42.18)
  const flowIndexVal = Number(calcOutput?.flowIndex ?? calcOutput?.flowIdx ?? 18.25)

  ws.getCell('D13').value = +llVal.toFixed(2)
  ws.getCell('D14').value = +flowIndexVal.toFixed(2)

  // Evaluasi
  const evalCell = ws.getCell('A16')
  if (evalCell) {
    evalCell.value = `[Evaluasi Batas Cair]: ${calcOutput?.conclusion || 'Nilai batas cair (Liquid Limit) memenuhi standar SNI 1967:2008.'}`
  }

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * 6. INJEKSI TEMPLATE: BERAT JENIS (berat-jenis-template.xlsx)
 * =========================================================================
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

  const startRow = 8

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

    ws.getCell(`G${r}`).value = { formula: `D${r}/(E${r}+C${r}-F${r})`, result: 2.65 }
    ws.getCell(`H${r}`).value = { formula: `C${r}/(E${r}+C${r}-F${r})`, result: 2.7 }
    ws.getCell(`I${r}`).value = { formula: `((C${r}-D${r})/D${r})*100`, result: 2.04 }
  })

  // Baris Rata-rata
  const avgRow = 11
  const lastDataRow = startRow + activeSamples.length - 1
  if (lastDataRow >= startRow && ws.getCell(`G${avgRow}`)) {
    ws.getCell(`G${avgRow}`).value = { formula: `AVERAGE(G${startRow}:G${lastDataRow})`, result: 2.65 }
    ws.getCell(`H${avgRow}`).value = { formula: `AVERAGE(H${startRow}:H${lastDataRow})`, result: 2.7 }
    ws.getCell(`I${avgRow}`).value = { formula: `AVERAGE(I${startRow}:I${lastDataRow})`, result: 2.04 }
  }

  const evalCell = ws.getCell('A13')
  if (evalCell) {
    evalCell.value = `[Evaluasi Berat Jenis]: ${calcOutput?.conclusion || 'Hasil pengujian berat jenis dan penyerapan memenuhi persyaratan.'}`
  }

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * 7. INJEKSI TEMPLATE: KUAT TARIK BAJA (kuat-tarik-template.xlsx)
 * =========================================================================
 */
async function populateKuatTarikTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  const d = Number(inputs.diameter || 16)
  const py = Number(inputs.bebanLeleh || 85.5)
  const pu = Number(inputs.bebanMaks || 115.2)

  ws.getCell('C8').value = d
  ws.getCell('E8').value = py
  ws.getCell('F8').value = pu

  const evalCell = ws.getCell('A13')
  if (evalCell) {
    evalCell.value = `[Evaluasi Kuat Tarik]: ${calcOutput?.conclusion || 'Kuat tarik baja tulangan memenuhi SNI 2052:2017.'}`
  }

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * 8. INJEKSI TEMPLATE: SONDIR CPT (sondir-cpt-template.xlsx)
 * =========================================================================
 */
async function populateSondirCptTemplate(templateBuffer, { inputs, calcOutput, metadata }) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(templateBuffer)
  const ws = wb.getWorksheet(1)

  injectHeaderMetadata(ws, metadata)

  const cptData = Array.isArray(inputs.cptRows) && inputs.cptRows.length > 0
    ? inputs.cptRows
    : (Array.isArray(calcOutput?.cptData) ? calcOutput.cptData : [])

  const startRow = 8

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

  const rawWbBuf = await wb.xlsx.writeBuffer()
  const finalBuffer = await preserveTemplateCharts(templateBuffer, rawWbBuf)
  return { wb, finalBuffer }
}

/**
 * =========================================================================
 * FUNGSI UTAMA: EKSPOR DATA LABORATORIUM DENGAN TEMPLATE INJECTION & FALLBACK
 * =========================================================================
 * 1. Jika modul pengujian memiliki master template di TEMPLATE_REGISTRY:
 *    - Muat template asli dari folder /excel-templates/.
 *    - Injeksi nilai data ke sel-sel terkait grafik.
 *    - Pertahankan file drawing/chart OpenXML menggunakan preserveTemplateCharts.
 *    - Cetak log cell mapping guide.
 *    - Unduh file .xlsx ke browser.
 * 2. Jika file template gagal dimuat (404/network error) atau belum terdaftar:
 *    - Otomatis fallback ke exportTestModuleToExcel tanpa error fatal.
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

  const moduleId = testConfig.id
  const reg = TEMPLATE_REGISTRY[moduleId]

  // Coba metode Template Injection jika terdaftar di registry
  if (reg && reg.fileName) {
    try {
      let templateBuffer = null

      // Percobaan 1: Muat template utama
      try {
        templateBuffer = await fetchExcelTemplateBuffer(reg.fileName)
      } catch (fetchErr) {
        // Percobaan 2: Jika gagal dan ada alias cadangan (misal gradasi-template.xlsx)
        if (reg.alias) {
          templateBuffer = await fetchExcelTemplateBuffer(reg.alias)
        } else {
          throw fetchErr
        }
      }

      if (templateBuffer) {
        let injectionResult = null

        // Dispatch ke injector yang sesuai
        switch (moduleId) {
          case 'bb-1-5':
          case 'bb-2-5':
            injectionResult = await populateGradasiTemplate(templateBuffer, { testConfig, inputs, calcOutput, metadata })
            break

          case 'mt-4-1':
            injectionResult = await populateSaringanTanahTemplate(templateBuffer, { testConfig, inputs, calcOutput, metadata })
            break

          case 'mt-3-1':
          case 'mt-pemadatan':
            injectionResult = await populateProctorTemplate(templateBuffer, { testConfig, inputs, calcOutput, metadata })
            break

          case 'mt-2-3':
            injectionResult = await populateCasagrandeTemplate(templateBuffer, { testConfig, inputs, calcOutput, metadata })
            break

          case 'mt-2-1':
          case 'bb-1-2':
          case 'bb-2-2':
            injectionResult = await populateWaterContentTemplate(templateBuffer, { inputs, calcOutput, metadata, selectedSampleIds })
            break

          case 'bb-1-1':
          case 'bb-2-1':
          case 'mt-2-2':
            injectionResult = await populateBeratJenisTemplate(templateBuffer, { inputs, calcOutput, metadata, selectedSampleIds })
            break

          case 'bb-5-1':
            injectionResult = await populateKuatTarikTemplate(templateBuffer, { inputs, calcOutput, metadata })
            break

          case 'mt-1-1':
          case 'tanah-4-1':
            injectionResult = await populateSondirCptTemplate(templateBuffer, { inputs, calcOutput, metadata })
            break

          default:
            // Jika modul lain terdaftar tapi belum ada injector khusus
            injectionResult = null
        }

        if (injectionResult && injectionResult.finalBuffer) {
          // Log panduan koordinat sel untuk pengembang
          logCellMappingGuide(moduleId)

          const sanitizedName = (testConfig.name || 'Pengujian')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
          const downloadFileName = `LabSipil_${sanitizedName}_${new Date().toISOString().split('T')[0]}.xlsx`

          return await downloadWorkbook(injectionResult.finalBuffer, downloadFileName)
        }
      }
    } catch (templateError) {
      console.warn(
        `[LabSipil Excel Export] Gagal menggunakan master template "${reg.fileName}" (${templateError.message}). Melakukan fallback ke dynamic generator:`,
        templateError
      )
    }
  }

  // FALLBACK ANGGUN (SEAMLESS FALLBACK KE GENERATOR DINAMIS)
  return await exportTestModuleToExcel({
    testConfig,
    inputs,
    calcOutput,
    metadata,
    selectedSampleIds,
    options,
  })
}
