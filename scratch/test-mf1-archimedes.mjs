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
  console.log('=== TEST SUITE: MEKANIKA FLUIDA - HUKUM ARCHIMEDES (mf-1-1) ===\n');

  const mod = calculatorRegistry['mf-1-1'];
  assert(Boolean(mod), 'mf-1-1 is registered in calculatorRegistry');

  // Check methods
  const archMethod = mod.methods.find(m => m.value === 'archimedes');
  assert(Boolean(archMethod), 'Metode archimedes tersedia di mf-1-1');

  // Check fields
  const fields = mod.getFields({ metode: 'archimedes' });
  const fieldKeys = fields.map(f => f.key);
  assert(fieldKeys.includes('archDBeaker'), 'Field Diameter Beaker (archDBeaker) tersedia');
  assert(fieldKeys.includes('archDTabung'), 'Field Diameter Tabung Beban (archDTabung) tersedia');
  assert(fieldKeys.includes('archH0'), 'Field Tinggi Air Awal (archH0) tersedia');
  assert(fieldKeys.includes('archH1'), 'Field Tinggi Air Akhir (archH1) tersedia');
  assert(fieldKeys.includes('archMassaJenis'), 'Field Massa Jenis (archMassaJenis) tersedia');
  assert(fieldKeys.includes('archGravitasi'), 'Field Gravitasi (archGravitasi) tersedia');

  // Test 1: Standard input in mm (example from manual practical report)
  console.log('\n--- Test 1: Laporan Praktikum Manual (D=100mm, d=69mm, h0=78mm, h1=123mm) ---');
  const input1 = {
    metode: 'archimedes',
    archDBeaker: 100,
    archDTabung: 69,
    archH0: 78,
    archH1: 123,
    archMassaJenis: 1000.0,
    archGravitasi: 9.81,
    archDimUnit: 'mm',
  };
  const res1 = mod.calculate(input1);
  assert(!res1.isError, 'Kalkulasi standar tidak error');
  assert(res1.status === 'Valid', 'Status kalkulasi adalah Valid');
  assert(res1.results.length === 4, 'Menghasilkan tepat 4 kartu ringkasan hasil utama');

  // Check 4 cards
  const c1 = res1.results[0];
  const c2 = res1.results[1];
  const c3 = res1.results[2];
  const c4 = res1.results[3];

  assert(c1.label.includes('Fa') || c1.label.includes('Gaya Apung'), `Card 1 adalah Gaya Apung: ${c1.label}`);
  assert(c1.unit === 'Newton', `Card 1 unit adalah Newton: ${c1.unit}`);
  assert(Math.abs(Number(c1.value) - 1.816) < 0.01, `Gaya Apung Fa ~ 1.816 N, got ${c1.value}`);

  assert(c2.label.includes('ΔV') || c2.label.includes('Volume'), `Card 2 adalah Peningkatan Volume: ${c2.label}`);
  assert(c2.unit === 'm³', `Card 2 unit adalah m³: ${c2.unit}`);
  assert(c2.value.includes('1.85') && c2.value.includes('10⁻⁴'), `Volume ΔV ~ 1.85 × 10⁻⁴ m³, got ${c2.value}`);

  assert(c3.label.includes('Luas') && c3.label.includes('Efektif'), `Card 3 adalah Luas Efektif: ${c3.label}`);
  assert(c3.unit === 'm²', `Card 3 unit adalah m²: ${c3.unit}`);
  assert(c3.value.includes('4.11') && c3.value.includes('10⁻³'), `Luas Efektif ~ 4.11 × 10⁻³ m², got ${c3.value}`);

  assert(c4.label.includes('Δh') || c4.label.includes('Tinggi Air'), `Card 4 adalah Selisih Tinggi Air: ${c4.label}`);
  assert(Number(c4.value) === 45.0, `Selisih tinggi air Δh = 45.0 mm, got ${c4.value}`);

  // Formula steps
  assert(res1.formulaSteps.length >= 8, `Langkah rumus perhitungan lengkap (panjang: ${res1.formulaSteps.length})`);
  assert(res1.formulaSteps.some(s => s.includes('A_beaker')), 'Langkah rumus mencakup perhitungan A_beaker');
  assert(res1.formulaSteps.some(s => s.includes('A_tabung')), 'Langkah rumus mencakup perhitungan A_tabung');
  assert(res1.formulaSteps.some(s => s.includes('A_efektif')), 'Langkah rumus mencakup perhitungan A_efektif');
  assert(res1.formulaSteps.some(s => s.includes('Δh')), 'Langkah rumus mencakup perhitungan Δh');
  assert(res1.formulaSteps.some(s => s.includes('ΔV')), 'Langkah rumus mencakup perhitungan ΔV');
  assert(res1.formulaSteps.some(s => s.includes('Fa')), 'Langkah rumus mencakup perhitungan Fa');

  // Test 2: Input in cm (D=10cm, d=6.9cm, h0=7.8cm, h1=12.3cm)
  console.log('\n--- Test 2: Input dalam Satuan cm ---');
  const input2 = {
    metode: 'archimedes',
    archDBeaker: 10,
    archDTabung: 6.9,
    archH0: 7.8,
    archH1: 12.3,
    archMassaJenis: 1000.0,
    archGravitasi: 9.81,
    archDimUnit: 'cm',
  };
  const res2 = mod.calculate(input2);
  assert(!res2.isError, 'Kalkulasi satuan cm tidak error');
  assert(Math.abs(Number(res2.results[0].value) - 1.816) < 0.01, `Gaya Apung Fa dalam cm tetap ~ 1.816 N, got ${res2.results[0].value}`);
  assert(Number(res2.results[3].value) === 45.0, `Selisih tinggi air tetap 45.0 mm, got ${res2.results[3].value}`);

  // Test 3: Validation d >= D
  console.log('\n--- Test 3: Validasi Geometri (d >= D) ---');
  const input3 = {
    metode: 'archimedes',
    archDBeaker: 60,
    archDTabung: 70, // d > D
    archH0: 78,
    archH1: 123,
    archMassaJenis: 1000.0,
    archGravitasi: 9.81,
    archDimUnit: 'mm',
  };
  const res3 = mod.calculate(input3);
  assert(res3.isError === true, 'd > D memicu isError: true');
  assert(res3.status === 'Input Tidak Wajar / Cek Kembali Data', 'Status d > D adalah Input Tidak Wajar');
  assert(res3.results[0].value === '-', 'Card Fa bernilai - saat d > D');

  // Test 4: Validation h1 <= h0
  console.log('\n--- Test 4: Validasi Ketinggian Air (h1 <= h0) ---');
  const input4 = {
    metode: 'archimedes',
    archDBeaker: 100,
    archDTabung: 69,
    archH0: 100,
    archH1: 90, // h1 < h0
    archMassaJenis: 1000.0,
    archGravitasi: 9.81,
    archDimUnit: 'mm',
  };
  const res4 = mod.calculate(input4);
  assert(res4.isError === true, 'h1 < h0 memicu isError: true');
  assert(res4.status === 'Input Tidak Wajar / Cek Kembali Data', 'Status h1 < h0 adalah Input Tidak Wajar');
  assert(res4.results[0].value === '-', 'Card Fa bernilai - saat h1 < h0');

  // Test 5: Fallback when inputs empty
  console.log('\n--- Test 5: Input Kosong / Default Fallback ---');
  const res5 = mod.calculate({ metode: 'archimedes' });
  assert(!res5.isError, 'Input kosong fallback ke default tanpa error');
  assert(Math.abs(Number(res5.results[0].value) - 1.816) < 0.01, 'Fa default ~ 1.816 N');

  // Test 6: SSR Render of TestCalculatorPanel
  console.log('\n--- Test 6: SSR Render TestCalculatorPanel dengan metode Archimedes ---');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx');
    const html = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: mod,
        currentInputs: {
          metode: 'archimedes',
          archDBeaker: 100,
          archDTabung: 69,
          archH0: 78,
          archH1: 123,
          archMassaJenis: 1000.0,
          archGravitasi: 9.81,
          archDimUnit: 'mm',
        },
        onInputChange: () => {},
        onResetInputs: () => {},
        onSaveToDashboard: () => {},
        onBackToDashboard: () => {},
      })
    );
    assert(html.length > 5000, `TestCalculatorPanel berhasil dirender (length: ${html.length})`);
    assert(html.includes('Diameter Gelas Beaker'), 'Render memuat input Diameter Gelas Beaker');
    assert(html.includes('Diameter Tabung / Beban'), 'Render memuat input Diameter Tabung / Beban');
    assert(html.includes('Gaya Apung / Upthrust (Fa)'), 'Render memuat card Gaya Apung / Upthrust (Fa)');
    assert(html.includes('Peningkatan Volume Air (ΔV)'), 'Render memuat card Peningkatan Volume Air (ΔV)');
    assert(html.includes('Luas Permukaan Air Efektif'), 'Render memuat card Luas Permukaan Air Efektif');
    assert(html.includes('Selisih Tinggi Air (Δh)'), 'Render memuat card Selisih Tinggi Air (Δh)');
  } finally {
    await vite.close();
  }

  console.log('\n🎉 ALL ARCHIMEDES TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
