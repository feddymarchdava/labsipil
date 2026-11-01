import assert from 'assert';

console.log('Testing Sieve Multi-Specimen Math for bb-1-5 and bb-2-5...');

const specimens = ['Benda Uji I', 'Benda Uji II', 'Benda Uji III'];
const sieves_fine = [
  { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [0.0, 0.0, 0.0] },
  { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [20.0, 22.0, 18.0] },
  { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 58.0, 62.0] },
  { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weights: [110.0, 112.0, 108.0] },
  { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weights: [140.0, 138.0, 142.0] },
  { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weights: [100.0, 102.0, 98.0] },
  { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weights: [50.0, 48.0, 52.0] },
  { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], isPan: true },
];

// Calculate per specimen
const specResults = specimens.map((name, k) => {
  const total = sieves_fine.reduce((sum, s) => sum + (s.weights ? (s.weights[k] || 0) : s.weight || 0), 0);
  let cum = 0;
  const nonPan = sieves_fine.filter(s => !s.isPan).sort((a, b) => b.size - a.size);
  const rows = nonPan.map(s => {
    const w = s.weights ? (s.weights[k] || 0) : s.weight || 0;
    cum += w;
    const cumRetPct = (cum / total) * 100;
    const cumPassPct = Math.max(0, Math.min(100, ((total - cum) / total) * 100));
    return { size: s.size, label: s.label, w, cum, cumRetPct, cumPassPct };
  });

  const stdSizes = [9.5, 4.75, 2.36, 1.18, 0.60, 0.30, 0.15];
  let sumCum = 0;
  stdSizes.forEach(std => {
    const m = rows.find(r => Math.abs(r.size - std) / std < 0.12);
    if (m) sumCum += m.cumRetPct;
  });
  const fm = sumCum / 100;
  return { name, total, rows, fm };
});

console.log('Specimen results:');
specResults.forEach(sr => {
  console.log(sr.name, 'Total:', sr.total, 'FM:', sr.fm.toFixed(2));
});

const avgFm = specResults.reduce((s, r) => s + r.fm, 0) / specResults.length;
console.log('Average FM:', avgFm.toFixed(2));
assert(avgFm >= 2.3 && avgFm <= 3.1, 'Average FM within sand range');

console.log('Sieve Multi-Specimen Test PASSED!');

