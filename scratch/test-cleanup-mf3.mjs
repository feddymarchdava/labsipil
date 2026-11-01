import { calculatorRegistry, sidebarGroups } from '../src/testCalculatorsData.js';
import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

async function runTests() {
  console.log('=== TEST SUITE: PEMBERSIHAN TOTAL MODUL FLOW MEASUREMENT (mf-3-1) ===\n');

  // 1. Registry check
  console.log('--- 1. Cek Registry Kalkulator ---');
  assert(!('mf-3-1' in calculatorRegistry), 'mf-3-1 TIDAK ADA di calculatorRegistry');
  assert(Boolean(calculatorRegistry['mf-1-1']), 'mf-1-1 tetap ada');
  assert(Boolean(calculatorRegistry['mf-2-1']), 'mf-2-1 tetap ada');
  assert(Boolean(calculatorRegistry['mf-4-1']), 'mf-4-1 tetap ada');
  assert(Boolean(calculatorRegistry['mf-5-1']), 'mf-5-1 tetap ada');
  assert(calculatorRegistry['mf-4-1'].category === 'Mekanika Fluida • Bab 3: Ambang Tajam', 'mf-4-1 disesuaikan ke Bab 3: Ambang Tajam');
  assert(calculatorRegistry['mf-5-1'].category === 'Mekanika Fluida • Bab 4: Kalibrasi Flowmeter', 'mf-5-1 disesuaikan ke Bab 4: Kalibrasi Flowmeter');

  // 2. Sidebar groups check
  console.log('\n--- 2. Cek Sidebar Groups ---');
  const fluidaGroup = sidebarGroups.find(g => g.groupId === 'fluida');
  assert(Boolean(fluidaGroup), 'Group fluida ditemukan di sidebarGroups');
  assert(fluidaGroup.chapters.length === 4, `Jumlah bab fluida adalah 4 (got ${fluidaGroup.chapters.length})`);

  const chap1 = fluidaGroup.chapters[0];
  const chap2 = fluidaGroup.chapters[1];
  const chap3 = fluidaGroup.chapters[2];
  const chap4 = fluidaGroup.chapters[3];

  assert(chap1.chapterId === 'mf-bab1' && chap1.title.includes('Bab 1'), 'Bab 1 adalah Sifat Fluida');
  assert(chap2.chapterId === 'mf-bab2' && chap2.title.includes('Bab 2'), 'Bab 2 adalah Osborne Reynolds');
  assert(chap3.chapterId === 'mf-bab3' && chap3.title.includes('Bab 3') && chap3.title.includes('Ambang Tajam'), 'Bab 3 adalah Aliran Ambang Tajam');
  assert(chap4.chapterId === 'mf-bab4' && chap4.title.includes('Bab 4') && chap4.title.includes('Kalibrasi Flowmeter'), 'Bab 4 adalah Kalibrasi Flowmeter');

  const allSidebarTestIds = fluidaGroup.chapters.flatMap(c => c.items.map(i => i.id));
  assert(!allSidebarTestIds.includes('mf-3-1'), 'ID mf-3-1 tidak ada di sidebar fluida');
  assert(allSidebarTestIds.includes('mf-4-1'), 'ID mf-4-1 ada di sidebar fluida');
  assert(allSidebarTestIds.includes('mf-5-1'), 'ID mf-5-1 ada di sidebar fluida');

  // 3. File content check in App.jsx
  console.log('\n--- 3. Cek Kode Sumber App.jsx ---');
  const appCode = fs.readFileSync('src/App.jsx', 'utf8');
  assert(!appCode.includes('mf-3-1'), 'src/App.jsx tidak memuat string "mf-3-1"');
  assert(!appCode.includes('Flow Measurement (Venturi & Orifice)'), 'src/App.jsx tidak memuat judul "Flow Measurement (Venturi & Orifice)"');
  assert(!appCode.includes("'mf-bab5'"), 'src/App.jsx tidak memuat referensi bab5 fluida');

  // 4. File content check in testCalculatorsData.js
  console.log('\n--- 4. Cek Kode Sumber testCalculatorsData.js ---');
  const dataCode = fs.readFileSync('src/testCalculatorsData.js', 'utf8');
  assert(!dataCode.includes("'mf-3-1'"), 'src/testCalculatorsData.js tidak memuat key "mf-3-1"');
  assert(!dataCode.includes('Flow Measurement (Venturi & Orifice)'), 'src/testCalculatorsData.js tidak memuat judul lama');

  // 5. SSR Render test of App.jsx
  console.log('\n--- 5. SSR Render App Component ---');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
    assert(Boolean(App), 'App module loaded via SSR');

    const html = ReactDOMServer.renderToString(React.createElement(App));
    assert(!html.includes('Flow Measurement (Venturi & Orifice)'), 'Rendered HTML Landing Page tidak mengandung "Flow Measurement (Venturi & Orifice)"');
    assert(html.includes('Bab 3') && html.includes('Ambang Tajam'), 'Rendered HTML memuat Bab 3 Ambang Tajam');
    assert(appCode.includes('Bab 4: Kalibrasi Flowmeter'), 'src/App.jsx memuat tab Bab 4: Kalibrasi Flowmeter');
    assert(appCode.includes('Kalibrasi Flowmeter & Akurasi Debit'), 'src/App.jsx memuat modul Kalibrasi Flowmeter & Akurasi Debit');
    console.log('✅ HTML render succeeded cleanly without error!');
  } finally {
    await vite.close();
  }

  console.log('\n======================================================');
  console.log('🎉 SEMUA TES PEMBERSIHAN MODUL MF-3-1 BERHASIL 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('Unhandled error in test runner:', err);
  process.exit(1);
});
