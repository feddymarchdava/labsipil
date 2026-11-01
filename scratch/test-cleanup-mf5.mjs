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
  console.log('=== TEST SUITE: PEMBERSIHAN TOTAL KALIBRASI FLOWMETER (FLM-01 / mf-5-1) ===\n');

  // 1. Registry check
  console.log('--- 1. Cek Registry Kalkulator ---');
  assert(!('mf-5-1' in calculatorRegistry), 'mf-5-1 TIDAK ADA di calculatorRegistry');
  assert(!('FLM-01' in calculatorRegistry), 'FLM-01 TIDAK ADA di calculatorRegistry');
  assert(!('flm-01' in calculatorRegistry), 'flm-01 TIDAK ADA di calculatorRegistry');
  assert(!('mf-3-1' in calculatorRegistry), 'mf-3-1 TIDAK ADA di calculatorRegistry');

  const fluidaKeys = Object.keys(calculatorRegistry).filter(k => k.startsWith('mf-'));
  assert(fluidaKeys.length === 3, `Jumlah modul Mekanika Fluida di registry tepat 3 (got ${fluidaKeys.length}: ${fluidaKeys.join(', ')})`);
  assert(fluidaKeys.includes('mf-1-1'), 'mf-1-1 (Sifat Fluida) aktif');
  assert(fluidaKeys.includes('mf-2-1'), 'mf-2-1 (Osborne Reynolds) aktif');
  assert(fluidaKeys.includes('mf-4-1'), 'mf-4-1 (Ambang Tajam) aktif');

  const totalModules = Object.keys(calculatorRegistry).length;
  assert(totalModules === 42, `Total modul di registry tepat 42 (got ${totalModules})`);

  // 2. Sidebar groups check
  console.log('\n--- 2. Cek Sidebar Groups ---');
  const fluidaGroup = sidebarGroups.find(g => g.groupId === 'fluida');
  assert(Boolean(fluidaGroup), 'Group fluida ditemukan di sidebarGroups');
  assert(fluidaGroup.chapters.length === 3, `Jumlah bab fluida adalah 3 (got ${fluidaGroup.chapters.length})`);

  const chap1 = fluidaGroup.chapters[0];
  const chap2 = fluidaGroup.chapters[1];
  const chap3 = fluidaGroup.chapters[2];

  assert(chap1.chapterId === 'mf-bab1' && chap1.title.includes('Bab 1'), 'Bab 1 adalah Sifat Fluida');
  assert(chap2.chapterId === 'mf-bab2' && chap2.title.includes('Bab 2'), 'Bab 2 adalah Osborne Reynolds');
  assert(chap3.chapterId === 'mf-bab3' && chap3.title.includes('Bab 3') && chap3.title.includes('Ambang Tajam'), 'Bab 3 adalah Aliran Ambang Tajam');

  const allSidebarTestIds = fluidaGroup.chapters.flatMap(c => c.items.map(i => i.id));
  assert(!allSidebarTestIds.includes('mf-5-1'), 'ID mf-5-1 tidak ada di sidebar fluida');
  assert(!allSidebarTestIds.includes('mf-3-1'), 'ID mf-3-1 tidak ada di sidebar fluida');
  assert(allSidebarTestIds.includes('mf-4-1'), 'ID mf-4-1 ada di sidebar fluida');

  // 3. File content check in App.jsx
  console.log('\n--- 3. Cek Kode Sumber App.jsx ---');
  const appCode = fs.readFileSync('src/App.jsx', 'utf8');
  assert(!appCode.includes('mf-5-1'), 'src/App.jsx tidak memuat string "mf-5-1"');
  assert(!appCode.includes('FLM-01'), 'src/App.jsx tidak memuat kode "FLM-01"');
  assert(!appCode.includes('Kalibrasi Flowmeter'), 'src/App.jsx tidak memuat judul "Kalibrasi Flowmeter"');
  assert(!appCode.includes("'mf-bab4'"), 'src/App.jsx tidak memuat referensi bab4 fluida');
  assert(!appCode.includes("'mf-bab5'"), 'src/App.jsx tidak memuat referensi bab5 fluida');

  // 4. File content check in TestCalculatorPanel.jsx
  console.log('\n--- 4. Cek Kode Sumber TestCalculatorPanel.jsx ---');
  const panelCode = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');
  assert(!panelCode.includes('FlowComparisonCard'), 'TestCalculatorPanel.jsx tidak memuat FlowComparisonCard');
  assert(!panelCode.includes('HeadLossCard'), 'TestCalculatorPanel.jsx tidak memuat HeadLossCard');
  assert(!panelCode.toLowerCase().includes('venturi'), 'TestCalculatorPanel.jsx tidak memuat kata "venturi"');
  assert(!panelCode.toLowerCase().includes('orifice'), 'TestCalculatorPanel.jsx tidak memuat kata "orifice"');

  // 5. File content check in testCalculatorsData.js
  console.log('\n--- 5. Cek Kode Sumber testCalculatorsData.js ---');
  const dataCode = fs.readFileSync('src/testCalculatorsData.js', 'utf8');
  assert(!dataCode.includes("'mf-5-1'"), 'src/testCalculatorsData.js tidak memuat key "mf-5-1"');
  assert(!dataCode.includes('FLM-01'), 'src/testCalculatorsData.js tidak memuat kode "FLM-01"');
  assert(!dataCode.includes('Kalibrasi Flowmeter'), 'src/testCalculatorsData.js tidak memuat judul Kalibrasi Flowmeter');

  // 6. SSR Render verification of remaining fluida calculators
  console.log('\n--- 6. SSR Render Semua Modul Mekanika Fluida Tersisa ---');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx');
    assert(Boolean(TestCalculatorPanel), 'TestCalculatorPanel module loaded via SSR');

    // Test render mf-1-1
    const html1 = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: calculatorRegistry['mf-1-1'],
        currentInputs: calculatorRegistry['mf-1-1'].initialInputs,
        theme: 'light',
      })
    );
    assert(html1.includes('Sifat Fluida') || html1.includes('Archimedes'), 'mf-1-1 renders cleanly');

    // Test render mf-2-1
    const html2 = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: calculatorRegistry['mf-2-1'],
        currentInputs: calculatorRegistry['mf-2-1'].initialInputs,
        theme: 'light',
      })
    );
    assert(html2.includes('Osborne Reynolds'), 'mf-2-1 renders cleanly');

    // Test render mf-4-1
    const html4 = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: calculatorRegistry['mf-4-1'],
        currentInputs: calculatorRegistry['mf-4-1'].initialInputs,
        theme: 'light',
      })
    );
    assert(html4.includes('Ambang Tajam'), 'mf-4-1 renders cleanly');

    // Test render App Landing Page
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
    const appHtml = ReactDOMServer.renderToString(React.createElement(App));
    assert(!appHtml.includes('Kalibrasi Flowmeter'), 'App Landing Page rendered without Kalibrasi Flowmeter');
    assert(!appHtml.toLowerCase().includes('venturi'), 'App Landing Page rendered without venturi');

    console.log('✅ Semua modul fluida tersisa dan Landing Page dirender 100% mulus!');
  } finally {
    await vite.close();
  }

  console.log('\n======================================================');
  console.log('🎉 SEMUA TES PEMBERSIHAN MODUL FLM-01 BERHASIL 100%!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('Unhandled error in test runner:', err);
  process.exit(1);
});

