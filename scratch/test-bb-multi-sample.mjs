import assert from 'assert';
import { calculatorRegistry } from '../src/testCalculatorsData.js';

console.log('=======================================================================');
console.log('VERIFIKASI INTEGRASI 11 MODUL MULTI-SAMPEL DINAMIS BAB 1 & BAB 2');
console.log('=======================================================================');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    throw err;
  }
}

// 1. bb-1-1
test('bb-1-1 terdaftar dengan hasMultiSample: true', () => {
  const mod = calculatorRegistry['bb-1-1'];
  assert(mod, 'bb-1-1 harus terdaftar');
  assert.strictEqual(mod.hasMultiSample, true);
  assert.strictEqual(mod.standard, 'SNI 1970:2016');
});

test('bb-1-1 kalkulasi default 3 sampel sesuai Tabel 3.2 Laprak', () => {
  const mod = calculatorRegistry['bb-1-1'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-1-1 tidak error');
  assert.strictEqual(out.results.length, 4, '4 Bento Cards');
  assert.strictEqual(out.results[0].value, '2.638', 'BJ Curah Kering Rata-rata = 2.638');
  assert.strictEqual(out.results[1].value, '2.715', 'BJ SSD Rata-rata = 2.715');
  assert.strictEqual(out.results[2].value, '2.858', 'BJ Semu Rata-rata = 2.858');
  assert.strictEqual(out.results[3].value, '2.92', 'Penyerapan Air Sw Rata-rata = 2.92%');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
  assert.strictEqual(out.recapTable.headers.length, 6, 'Headers: Param, Persamaan, BU I, BU II, BU III, Rata-rata');
  assert.strictEqual(out.recapTable.rows.length, 8, '8 baris parameter Tabel 3.2');
  assert.strictEqual(out.status, 'Valid');
  assert.strictEqual(out.verdictClass, 'valid');
});

// 2. bb-1-2
test('bb-1-2 terdaftar dengan hasMultiSample: true', () => {
  const mod = calculatorRegistry['bb-1-2'];
  assert(mod, 'bb-1-2 harus terdaftar');
  assert.strictEqual(mod.hasMultiSample, true);
});

test('bb-1-2 kalkulasi default 3 sampel kadar air agregat halus', () => {
  const mod = calculatorRegistry['bb-1-2'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-1-2 tidak error');
  assert.strictEqual(out.results[0].value, '4.02', 'Kadar Air Rata-rata = 4.02%');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
  assert.strictEqual(out.status, 'Valid');
});

// 3. bb-1-3
test('bb-1-3 terdaftar dengan hasMultiSample: true & organikScale', () => {
  const mod = calculatorRegistry['bb-1-3'];
  assert(mod, 'bb-1-3 harus terdaftar');
  assert.strictEqual(mod.hasMultiSample, true);
  assert.strictEqual(mod.initialInputs.organikScale, 2);
});

test('bb-1-3 kalkulasi default 3 sampel kandungan lumpur & zat organik', () => {
  const mod = calculatorRegistry['bb-1-3'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-1-3 tidak error');
  assert.strictEqual(out.results[0].value, '2.75', 'Kadar Lumpur Rata-rata = 2.75%');
  assert.strictEqual(out.results[1].value, 'Plat No. 2', 'Skala Organik Plat No. 2');
  assert.strictEqual(out.status, 'Valid');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
});

// 4. bb-1-4
test('bb-1-4 terdaftar dengan hasMultiSample: true & bobot isi pasir', () => {
  const mod = calculatorRegistry['bb-1-4'];
  assert(mod, 'bb-1-4 harus terdaftar');
  assert.strictEqual(mod.hasMultiSample, true);
});

test('bb-1-4 kalkulasi default bobot isi pasir lepas & padat', () => {
  const mod = calculatorRegistry['bb-1-4'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-1-4 tidak error');
  assert.strictEqual(out.results[0].value, '1.581', 'BI Padat Rata-rata = 1.581 kg/L');
  assert.strictEqual(out.results[1].value, '39.20', 'Rongga Padat Rata-rata = 39.20%');
  assert.strictEqual(out.results[2].value, '1.443', 'BI Lepas Rata-rata = 1.443 kg/L');
  assert.strictEqual(out.results[3].value, '44.50', 'Rongga Lepas Rata-rata = 44.50%');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
});

// 5. bb-1-5
test('bb-1-5 gradasi multi-benda uji pasir', () => {
  const mod = calculatorRegistry['bb-1-5'];
  assert(mod, 'bb-1-5 harus terdaftar');
  assert.strictEqual(mod.hasDynamicSieveTable, true);
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-1-5 tidak error');
  assert(out.results[1].value, 'FM terhitung');
  assert(out.recapTable, 'Tabel rekapitulasi multi-benda uji saringan pasir');
  assert(out.gradationChart, 'Grafik kurva gradasi tersedia');
});

// 6. bb-2-1
test('bb-2-1 terdaftar dengan hasMultiSample: true', () => {
  const mod = calculatorRegistry['bb-2-1'];
  assert(mod, 'bb-2-1 harus terdaftar');
  assert.strictEqual(mod.hasMultiSample, true);
  assert.strictEqual(mod.standard, 'SNI 1969:2016');
});

test('bb-2-1 kalkulasi default 3 sampel sesuai Tabel 4.1 & 4.2 Laprak', () => {
  const mod = calculatorRegistry['bb-2-1'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-2-1 tidak error');
  assert.strictEqual(out.results.length, 4, '4 Bento Cards');
  assert.strictEqual(out.results[0].value, '2.129', 'BJ Curah Kering Rata-rata = 2.129');
  assert.strictEqual(out.results[1].value, '2.191', 'BJ SSD Rata-rata = 2.191');
  assert.strictEqual(out.results[2].value, '2.271', 'BJ Semu Rata-rata = 2.271');
  assert.strictEqual(out.results[3].value, '2.95', 'Penyerapan Air Sw Rata-rata = 2.95%');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
  assert.strictEqual(out.recapTable.headers.length, 6);
  assert.strictEqual(out.recapTable.rows.length, 7);
  assert.strictEqual(out.status, 'Valid');
});

// 7. bb-2-2
test('bb-2-2 kalkulasi default 3 sampel kadar air agregat kasar', () => {
  const mod = calculatorRegistry['bb-2-2'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-2-2 tidak error');
  assert.strictEqual(out.results[0].value, '1.99', 'Kadar Air Rata-rata = 1.99%');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
  assert.strictEqual(out.status, 'Valid');
});

// 8. bb-2-3
test('bb-2-3 kalkulasi default 3 sampel kandungan lumpur agregat kasar', () => {
  const mod = calculatorRegistry['bb-2-3'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-2-3 tidak error');
  assert.strictEqual(out.results[0].value, '0.66', 'Kadar Lumpur Rata-rata = 0.66% <= 1.0%');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
  assert.strictEqual(out.status, 'Valid');
});

// 9. bb-2-4
test('bb-2-4 kalkulasi default bobot isi kerikil lepas & padat', () => {
  const mod = calculatorRegistry['bb-2-4'];
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-2-4 tidak error');
  assert.strictEqual(out.results[0].value, '1.564', 'BI Padat Rata-rata = 1.564 kg/L');
  assert.strictEqual(out.results[2].value, '1.434', 'BI Lepas Rata-rata = 1.434 kg/L');
  assert(out.recapTable, 'Tabel rekapitulasi tersedia');
});

// 10. bb-2-5
test('bb-2-5 gradasi multi-benda uji kerikil', () => {
  const mod = calculatorRegistry['bb-2-5'];
  assert(mod, 'bb-2-5 harus terdaftar');
  assert.strictEqual(mod.hasDynamicSieveTable, true);
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-2-5 tidak error');
  assert(out.recapTable, 'Tabel rekapitulasi gradasi kerikil');
  assert(out.gradationChart, 'Grafik kurva gradasi kerikil');
});

// 11. bb-2-6
test('bb-2-6 keausan Los Angeles multi-sampel dinamis', () => {
  const mod = calculatorRegistry['bb-2-6'];
  assert(mod, 'bb-2-6 harus terdaftar');
  assert.strictEqual(mod.hasMultiSample, true);
  const out = mod.calculate(mod.initialInputs);
  assert(!out.isError, 'bb-2-6 tidak error');
  assert.strictEqual(out.results[0].value, '59.32', 'Nilai Keausan LA = 59.32%');
  assert.strictEqual(out.results[3].value, 'Tidak Memenuhi', 'Status Tidak Memenuhi (> 40%)');
  assert.strictEqual(out.verdictClass, 'error');
  assert(out.recapTable, 'Tabel rekapitulasi keausan tersedia');
});

console.log('=======================================================================');
console.log(`SEMUA ${passed} UJI MULTI-SAMPEL BAB 1 & BAB 2 BERHASIL 100%!`);
console.log('=======================================================================');

