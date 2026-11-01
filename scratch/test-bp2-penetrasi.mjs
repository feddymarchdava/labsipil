// scratch/test-bp2-penetrasi.mjs
// Comprehensive test suite for Uji Penetrasi Aspal Keras (Bab 2 Bahan Perkerasan - bp-2-1)
import { calculatorRegistry, DEFAULT_PENETRATION_GROUPS } from '../src/testCalculatorsData.js'
import { createServer } from 'vite'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`)
    process.exit(1)
  }
  console.log(`✅ PASS: ${message}`)
}

async function runTests() {
  console.log('=== TEST SUITE: MODUL UJI PENETRASI ASPAL KERAS (bp-2-1 - SNI 2456:2011) ===\n')

  // 1. Registry verification
  console.log('--- 1. Cek Registry Kalkulator ---')
  const bp21 = calculatorRegistry['bp-2-1']
  assert(bp21 !== undefined, 'Modul bp-2-1 terdaftar di calculatorRegistry')
  assert(bp21.hasDynamicTable === true, 'bp-2-1 hasDynamicTable bernilai true')
  assert(bp21.hasDynamicPenetrationGroups === true, 'bp-2-1 hasDynamicPenetrationGroups bernilai true')
  assert(Array.isArray(bp21.initialInputs?.groups), 'bp-2-1 initialInputs.groups adalah array')
  assert(bp21.initialInputs.groups.length >= 1, 'bp-2-1 memiliki minimal 1 kelompok default')
  assert(Array.isArray(DEFAULT_PENETRATION_GROUPS), 'DEFAULT_PENETRATION_GROUPS diekspor sebagai array')

  // 2. User prompt explicit calculation test
  console.log('\n--- 2. Verifikasi Sampel Prompt Pengguna (Kelompok 1: 78.6, 65.6, 59.4) ---')
  const outUser = bp21.calculate({
    kelasAspal: 'pen6070',
    suhuUji: 25,
    bebanJarum: 100,
    waktuPenetrasi: 5,
    groups: [
      {
        id: 1,
        name: 'Kelompok 1 (Sampel A)',
        points: [
          { id: 1, value: 78.6 },
          { id: 2, value: 65.6 },
          { id: 3, value: 59.4 },
        ],
      },
    ],
  })

  assert(!outUser.isError, 'Kalkulasi tidak error')
  const g1 = outUser.groupResults[0]
  assert(g1 !== undefined, 'Hasil analisis kelompok 1 tersedia')
  console.log(`   Rata-rata Awal: ${g1.meanInitial.toFixed(2)} dmm (Target: ~67.87)`)
  assert(Math.abs(g1.meanInitial - 67.87) < 0.02, `Rata-rata awal ~67.87 dmm (got ${g1.meanInitial.toFixed(2)})`)

  console.log(`   Simpangan Baku (S): ${g1.sd.toFixed(2)} dmm (Target: ~9.80)`)
  assert(Math.abs(g1.sd - 9.80) < 0.02, `Standar deviasi sampel ~9.80 dmm (got ${g1.sd.toFixed(2)})`)

  console.log(`   Rentang Valid: [${g1.lowerBound.toFixed(2)} s/d ${g1.upperBound.toFixed(2)}] dmm`)
  assert(Math.abs(g1.lowerBound - 58.07) < 0.02, `Batas Bawah ~58.07 dmm (got ${g1.lowerBound.toFixed(2)})`)
  assert(Math.abs(g1.upperBound - 77.67) < 0.02, `Batas Atas ~77.67 dmm (got ${g1.upperBound.toFixed(2)})`)

  console.log(`   Outlier tereliminasi:`, g1.outlierPoints.map(p => p.value))
  assert(g1.outlierPoints.length === 1, 'Tepat 1 titik terdeteksi sebagai outlier')
  assert(g1.outlierPoints[0].value === 78.6, 'Titik 78.6 tereliminasi sebagai outlier (> 77.67)')

  console.log(`   Titik bersih:`, g1.cleanPoints.map(p => p.value))
  assert(g1.cleanPoints.length === 2, 'Tersisa 2 titik bersih yang lolos seleksi')
  assert(Math.abs(g1.cleanMean - 62.50) < 0.01, `Rata-rata bersih kelompok 1 = 62.50 dmm (got ${g1.cleanMean.toFixed(2)})`)

  assert(outUser.penAkhir === '62.5', `Penetrasi akhir global = 62.5 dmm (got ${outUser.penAkhir})`)
  assert(outUser.selisih === '6.2', `Selisih bacaan maks - min = 6.2 dmm (got ${outUser.selisih})`)
  assert(outUser.batasToleransi === 4, `Batas toleransi SNI untuk P_akhir 62.5 dmm adalah 4 dmm`)
  assert(outUser.isPresisiLolos === false, 'Presisi melebihi toleransi (6.2 > 4)')

  // 3. Multi-group test (All Valid)
  console.log('\n--- 3. Verifikasi Multi-Kelompok (Semua Lolos Standar) ---')
  const outMulti = bp21.calculate({
    kelasAspal: 'pen6070',
    groups: [
      {
        id: 1,
        name: 'Kelompok 1 (Sampel A)',
        points: [
          { id: 1, value: 64.0 },
          { id: 2, value: 65.0 },
          { id: 3, value: 64.5 },
        ],
      },
      {
        id: 2,
        name: 'Kelompok 2 (Sampel B)',
        points: [
          { id: 1, value: 65.5 },
          { id: 2, value: 66.0 },
          { id: 3, value: 65.0 },
        ],
      },
    ],
  })

  assert(!outMulti.isError, 'Kalkulasi multi-kelompok valid')
  assert(outMulti.groupResults.length === 2, '2 kelompok diproses')
  assert(outMulti.totalOutlierCount === 0, '0 outlier terdeteksi')
  assert(outMulti.totalValidCount === 6, 'Semua 6 titik valid')
  assert(outMulti.penAkhir === '65.0', `P_akhir = 65.0 dmm (got ${outMulti.penAkhir})`)
  assert(outMulti.selisih === '2.0', `Selisih Maks - Min = 2.0 dmm (got ${outMulti.selisih})`)
  assert(outMulti.isPresisiLolos === true, 'Presisi lolos toleransi (2.0 <= 4)')
  assert(outMulti.isSpecLolos === true, 'Spesifikasi lolos (65.0 in [60, 70])')
  assert(outMulti.status === 'Memenuhi Standar', 'Status kelayakan: Memenuhi Standar')

  // 4. SNI 2456:2011 Tolerance Tiers Test
  console.log('\n--- 4. Verifikasi 4 Tingkat Toleransi Presisi SNI 2456:2011 ---')
  // Tier 1: 0 - 49 => batas = 2
  const t1 = bp21.calculate({
    kelasAspal: 'pen4050',
    groups: [{ id: 1, points: [{ id: 1, value: 45.0 }, { id: 2, value: 46.0 }] }],
  })
  assert(t1.batasToleransi === 2, `Tier 0-49 dmm memiliki batas toleransi 2 dmm (got ${t1.batasToleransi})`)

  // Tier 2: 50 - 149 => batas = 4
  const t2 = bp21.calculate({
    kelasAspal: 'pen6070',
    groups: [{ id: 1, points: [{ id: 1, value: 65.0 }, { id: 2, value: 66.0 }] }],
  })
  assert(t2.batasToleransi === 4, `Tier 50-149 dmm memiliki batas toleransi 4 dmm (got ${t2.batasToleransi})`)

  // Tier 3: 150 - 249 => batas = 12
  const t3 = bp21.calculate({
    kelasAspal: 'pen80100',
    groups: [{ id: 1, points: [{ id: 1, value: 180.0 }, { id: 2, value: 185.0 }] }],
  })
  assert(t3.batasToleransi === 12, `Tier 150-249 dmm memiliki batas toleransi 12 dmm (got ${t3.batasToleransi})`)

  // Tier 4: 250 - 500 => batas = 20
  const t4 = bp21.calculate({
    kelasAspal: 'pen80100',
    groups: [{ id: 1, points: [{ id: 1, value: 300.0 }, { id: 2, value: 310.0 }] }],
  })
  assert(t4.batasToleransi === 20, `Tier 250-500 dmm memiliki batas toleransi 20 dmm (got ${t4.batasToleransi})`)

  // 5. Backwards Compatibility with legacy inputs { x1..x5 }
  console.log('\n--- 5. Verifikasi Kompatibilitas Mundur (Legacy inputs x1..x5) ---')
  const legacyOut = bp21.calculate({
    kelasAspal: 'pen6070',
    x1: 64.0, x2: 66.0, x3: 65.0, x4: 67.0, x5: 63.0,
  })
  assert(!legacyOut.isError, 'Legacy input diproses tanpa error')
  assert(legacyOut.results.length === 4, 'Menghasilkan 4 kartu ringkasan')
  assert(legacyOut.penAkhir === '65.0', `Legacy P_akhir = 65.0 dmm (got ${legacyOut.penAkhir})`)

  // 6. SSR Render of TestCalculatorPanel with DynamicPenetrationSection
  console.log('\n--- 6. React SSR Render TestCalculatorPanel (DynamicPenetrationSection) ---')
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx')
  assert(typeof TestCalculatorPanel === 'function', 'TestCalculatorPanel berhasil dimuat via SSR')

  const html = ReactDOMServer.renderToString(
    React.createElement(TestCalculatorPanel, {
      testConfig: bp21,
      currentInputs: bp21.initialInputs,
      onInputChange: () => {},
      onResetInputs: () => {},
      onSaveToDashboard: () => ({ id: 'TEST-BP21' }),
      onBackToDashboard: () => {},
    })
  )

  assert(html.includes('Uji Penetrasi Aspal Keras'), 'HTML merender judul modul penetrasi')
  assert(html.includes('penetration-summary-grid'), 'HTML memuat grid 4 kartu ringkasan penetrasi')
  assert(html.includes('Daftar Kelompok &amp; Titik Pembacaan Jarum Penetrasi') || html.includes('Daftar Kelompok & Titik Pembacaan'), 'HTML memuat judul kelompok penetrasi')
  assert(html.includes('Tambah Kelompok'), 'HTML memuat tombol Tambah Kelompok')
  assert(html.includes('Tambah Titik Pengamatan'), 'HTML memuat tombol Tambah Titik')
  assert(html.includes('Tabel Rekapitulasi Analisis Statistik'), 'HTML memuat tabel rekapitulasi antar-kelompok')
  assert(html.includes('Tabel Toleransi Presisi Perbedaan Pembacaan') || html.includes('Standar Toleransi Presisi'), 'HTML memuat panduan toleransi SNI')
  assert(html.includes('Langkah Rumus Perhitungan Matematis Lengkap'), 'HTML memuat kotak formula steps')
  assert(html.includes('Simpan Pengujian'), 'HTML memuat tombol Simpan Pengujian')

  console.log('✅ HTML render DynamicPenetrationSection berhasil 100% mulus!')
  await vite.close()

  console.log('\n=======================================================================')
  console.log('🎉 SEMUA TES MODUL UJI PENETRASI ASPAL KERAS (bp-2-1) BERHASIL 100%!')
  console.log('=======================================================================')
}

runTests().catch((err) => {
  console.error('Fatal Test Runner Error:', err)
  process.exit(1)
})
