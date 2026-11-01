// Prototype test for multi-sample BB modules
import assert from 'assert';

console.log('Testing prototype math for multi-sample BB modules...');

// Modul 1: bb-1-1
const samples_bb11 = [
  { id: 1, name: 'Benda Uji I', s: 500.0, a: 489.6, b: 664.2, c: 979.2 },
  { id: 2, name: 'Benda Uji II', s: 500.0, a: 479.5, b: 636.1, c: 950.5 },
  { id: 3, name: 'Benda Uji III', s: 500.0, a: 488.5, b: 661.5, c: 979.5 },
];

const results_bb11 = samples_bb11.map(s => {
  const den = s.b + s.s - s.c;
  const denApp = s.b + s.a - s.c;
  const sd = s.a / den;
  const ss = s.s / den;
  const sa = s.a / denApp;
  const sw = ((s.s - s.a) / s.a) * 100;
  return { sd, ss, sa, sw };
});

const avg_sd_11 = results_bb11.reduce((sum, r) => sum + r.sd, 0) / results_bb11.length;
const avg_ss_11 = results_bb11.reduce((sum, r) => sum + r.ss, 0) / results_bb11.length;
const avg_sa_11 = results_bb11.reduce((sum, r) => sum + r.sa, 0) / results_bb11.length;
const avg_sw_11 = results_bb11.reduce((sum, r) => sum + r.sw, 0) / results_bb11.length;

console.log('bb-1-1 averages:', {
  sd: avg_sd_11.toFixed(3),
  ss: avg_ss_11.toFixed(3),
  sa: avg_sa_11.toFixed(3),
  sw: avg_sw_11.toFixed(2) + '%'
});

assert.strictEqual(avg_sd_11.toFixed(3), '2.638');
assert.strictEqual(avg_ss_11.toFixed(3), '2.715');
assert.strictEqual(avg_sa_11.toFixed(3), '2.858');
assert.strictEqual(avg_sw_11.toFixed(2), '2.92');

// Modul 6: bb-2-1
const samples_bb21 = [
  { id: 1, name: 'Benda Uji I', a: 485.4, b: 500.0, c: 268.3 },
  { id: 2, name: 'Benda Uji II', a: 486.6, b: 500.5, c: 271.4 },
  { id: 3, name: 'Benda Uji III', a: 486.1, b: 500.6, c: 276.3 },
];

const results_bb21 = samples_bb21.map(s => {
  const den = s.b - s.c;
  const denApp = s.a - s.c;
  const sd = s.a / den;
  const ss = s.b / den;
  const sa = s.a / denApp;
  const sw = ((s.b - s.a) / s.a) * 100;
  return { sd, ss, sa, sw };
});

const avg_sd_21 = results_bb21.reduce((sum, r) => sum + r.sd, 0) / results_bb21.length;
const avg_ss_21 = results_bb21.reduce((sum, r) => sum + r.ss, 0) / results_bb21.length;
const avg_sa_21 = results_bb21.reduce((sum, r) => sum + r.sa, 0) / results_bb21.length;
const avg_sw_21 = results_bb21.reduce((sum, r) => sum + r.sw, 0) / results_bb21.length;

console.log('bb-2-1 averages:', {
  sd: avg_sd_21.toFixed(3),
  ss: avg_ss_21.toFixed(3),
  sa: avg_sa_21.toFixed(3),
  sw: avg_sw_21.toFixed(2) + '%'
});

assert.strictEqual(avg_sd_21.toFixed(3), '2.129');
assert.strictEqual(avg_ss_21.toFixed(3), '2.191');
assert.strictEqual(avg_sa_21.toFixed(3), '2.271');
assert.strictEqual(avg_sw_21.toFixed(2), '2.95');

// Modul 11: bb-2-6
const samples_bb26 = [
  { id: 1, name: 'Benda Uji I', a: 2000.0, b: 808.3 },
  { id: 2, name: 'Benda Uji II', a: 2000.0, b: 820.0 },
  { id: 3, name: 'Benda Uji III', a: 2000.0, b: 812.5 },
];

const results_bb26 = samples_bb26.map(s => {
  const loss = s.a - s.b;
  const k = (loss / s.a) * 100;
  return { loss, k };
});

const avg_k_26 = results_bb26.reduce((sum, r) => sum + r.k, 0) / results_bb26.length;
console.log('bb-2-6 average keausan:', avg_k_26.toFixed(2) + '%');
assert.strictEqual(avg_k_26.toFixed(2), '59.32');

console.log('ALL PROTO MATH TESTS PASSED!');

