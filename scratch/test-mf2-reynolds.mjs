import { calculatorRegistry } from '../src/testCalculatorsData.js';
import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

async function runTests() {
  console.log('=== TEST SUITE: MEKANIKA FLUIDA - BILANGAN OSBORNE REYNOLDS (mf-2-1) ===\n');

  const mod = calculatorRegistry['mf-2-1'];
  assert(Boolean(mod), 'mf-2-1 is registered in calculatorRegistry');
  assert(mod.hasDynamicReynoldsTable === true, 'hasDynamicReynoldsTable is true');
  assert(mod.hasDynamicTable === true, 'hasDynamicTable is true');
  assert(Array.isArray(mod.initialInputs?.reynoldsRows), 'initialInputs.reynoldsRows is an array');
  assert(mod.initialInputs.reynoldsRows.length === 5, 'Default has 5 sample rows');

  // Test 1: Default 5-point calculation
  console.log('\n--- Test 1: Kalkulasi Default 5 Titik Praktikum Reynolds ---');
  const res1 = mod.calculate(mod.initialInputs, {});
  assert(!res1.isError, 'Kalkulasi default tidak error');
  assert(res1.verdictClass === 'valid', 'Verdict class kalkulasi adalah valid');
  assert(Boolean(res1.status), `Status kalkulasi adalah: ${res1.status}`);
  assert(res1.recapRows.length === 5, 'Recap rows berisi 5 baris');
  assert(res1.chartData.length === 5, 'Chart data berisi 5 titik pengujian');

  // Check 4 summary cards
  assert(res1.results.length === 4, 'Menghasilkan 4 kartu ringkasan hasil');
  const cardRe = res1.results[0];
  const cardRezim = res1.results[1];
  const cardQ = res1.results[2];
  const cardV = res1.results[3];

  assert(cardRe.label.includes('Reynolds'), `Card 1 adalah Reynolds: ${cardRe.label}`);
  assert(cardRe.value === '926 - 6822', `Card 1 rentang Re 926 - 6822, got ${cardRe.value}`);

  assert(cardRezim.label.includes('Rezim'), `Card 2 adalah Rezim Aliran: ${cardRezim.label}`);
  assert(cardRezim.value.includes('2 Lam') && cardRezim.value.includes('1 Tran') && cardRezim.value.includes('2 Turb'), `Card 2 sebaran rezim: ${cardRezim.value}`);

  assert(cardQ.label.includes('Debit'), `Card 3 adalah Debit Aliran: ${cardQ.label}`);
  assert(cardQ.value === '0.007 - 0.053', `Card 3 rentang debit 0.007 - 0.053, got ${cardQ.value}`);

  assert(cardV.label.includes('Kecepatan'), `Card 4 adalah Kecepatan Aliran: ${cardV.label}`);
  assert(Number(cardV.value) > 0, `Card 4 kecepatan valid: ${cardV.value}`);

  // Test 2: Formula verification on row 1 (Laminer)
  console.log('\n--- Test 2: Verifikasi Rumus Baris 1 (Laminer) ---');
  const row1 = res1.recapRows[0];
  // t=70 s, V=0.5 L = 0.0005 m3, D=11 mm = 0.011 m, nu=0.893e-6 m2/s
  // Q = 0.0005 / 70 = 7.142857e-6 m3/s = 0.00714 L/s
  assert(Math.abs(row1.qLs - 0.00714) < 0.0001, `Debit Q ~ 0.00714 L/s, got ${row1.qLs}`);
  // A = pi * (0.011)^2 / 4 = 9.5033e-5 m2
  // v = Q / A = 7.142857e-6 / 9.5033e-5 = 0.07516 m/s
  assert(Math.abs(row1.v - 0.0752) < 0.001, `Kecepatan v ~ 0.0752 m/s, got ${row1.v}`);
  // Re = (v * D) / nu = (0.07516 * 0.011) / 0.893e-6 = 925.84
  assert(Math.abs(row1.re - 925.8) < 1, `Reynolds Re ~ 925.8, got ${row1.re}`);
  assert(row1.rezim === 'Laminer', `Rezim adalah Laminer: ${row1.rezim}`);
  // f = 64 / Re = 64 / 925.84 = 0.0691
  assert(Math.abs(row1.f - 0.0691) < 0.001, `Koefisien gesek f ~ 0.0691, got ${row1.f}`);
  // log10(f) = log10(0.069126) = -1.1604
  assert(Math.abs(row1.logF - (-1.1604)) < 0.001, `log(f) ~ -1.1604, got ${row1.logF}`);
  // log10(Re) = log10(925.84) = 2.9665
  assert(Math.abs(row1.logRe - 2.9665) < 0.001, `log(Re) ~ 2.9665, got ${row1.logRe}`);

  // Test 3: Formula verification on row 3 (Transisi)
  console.log('\n--- Test 3: Verifikasi Rumus Baris 3 (Transisi) ---');
  const row3 = res1.recapRows[2];
  assert(row3.rezim === 'Transisi', `Baris 3 rezim Transisi (Re=${row3.re}): got ${row3.rezim}`);
  // For transition/turbulent: f = 0.3164 / Re^0.25 (Blasius)
  const fExpected = 0.3164 / Math.pow(row3.re, 0.25);
  assert(Math.abs(row3.f - fExpected) < 0.0001, `Koefisien gesek Blasius tepat: ${row3.f} vs expected ${fExpected}`);

  // Test 4: Formula verification on row 5 (Turbulen)
  console.log('\n--- Test 4: Verifikasi Rumus Baris 5 (Turbulen) ---');
  const row5 = res1.recapRows[4];
  assert(row5.rezim === 'Turbulen', `Baris 5 rezim Turbulen (Re=${row5.re}): got ${row5.rezim}`);
  assert(row5.re > 4000, `Re > 4000: got ${row5.re}`);

  // Test 5: Dynamic row manipulation
  console.log('\n--- Test 5: Manipulasi Baris Dinamis ---');
  const customRows = [
    { id: 101, t: 30, volume: 1.0, diameter: 15, viskositas: 1.0, visualNote: 'Aliran deras' }
  ];
  const resCustom = mod.calculate({ reynoldsRows: customRows }, {});
  assert(resCustom.recapRows.length === 1, 'Custom calculation menghasilkan 1 baris');
  assert(resCustom.results[0].value.includes('-') === false, 'Rentang Re 1 baris menampilkan nilai tunggal');

  // Test 6: SSR Render of TestCalculatorPanel with mf-2-1
  console.log('\n--- Test 6: React SSR Render TestCalculatorPanel ---');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx');
    assert(Boolean(TestCalculatorPanel), 'TestCalculatorPanel component loaded via SSR');

    const html = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: mod,
        currentInputs: mod.initialInputs,
        onInputChange: () => {},
        theme: 'light',
      })
    );

    assert(html.includes('Pengujian Bilangan Osborne Reynolds'), 'HTML contains module title');
    assert(html.includes('Tabel Input Data Pengamatan Dinamis'), 'HTML contains dynamic table heading');
    assert(html.includes('Tambah Baris Pengujian'), 'HTML contains Tambah Baris Pengujian button');
    assert(html.includes('Contoh Standar'), 'HTML contains Contoh Standar button');
    assert(html.includes('Tabel Rekapitulasi Hasil Perhitungan'), 'HTML contains recap table title');
    assert(html.includes('Rezim Aliran'), 'HTML contains rezim aliran column');
    assert(html.includes('Visualisasi Grafik Karakteristik Aliran Osborne Reynolds'), 'HTML contains Reynolds chart title');
    assert(html.includes('LANGKAH RUMUS PERHITUNGAN:'), 'HTML contains calculation steps title');
    assert(html.includes('f = 64 / Re') || html.includes('64 / Re'), 'HTML contains laminar friction formula');
    assert(html.includes('0.3164'), 'HTML contains Blasius formula');

    console.log('✅ HTML render succeeded without errors!');
  } finally {
    await vite.close();
  }

  console.log('\n========================================');
  console.log('🎉 ALL 28 REYNOLDS TESTS PASSED SUCCESSFULLY!');
  console.log('========================================\n');
}

runTests().catch(err => {
  console.error('Unhandled error in test runner:', err);
  process.exit(1);
});
