import { calculatorRegistry } from '../src/testCalculatorsData.js';

const rawRows = [
  { id: 1, depth: 0.00, qc: 0, tw: 0 },
  { id: 2, depth: 0.20, qc: 5, tw: 7 },
  { id: 3, depth: 0.40, qc: 5, tw: 7 },
  { id: 4, depth: 0.60, qc: 6, tw: 7 },
  { id: 5, depth: 0.80, qc: 10, tw: 15 },
  { id: 6, depth: 1.00, qc: 20, tw: 25 },
  { id: 7, depth: 1.20, qc: 15, tw: 20 },
  { id: 8, depth: 1.40, qc: 10, tw: 15 },
  { id: 9, depth: 1.60, qc: 10, tw: 15 },
  { id: 10, depth: 1.80, qc: 10, tw: 15 },
  { id: 11, depth: 2.00, qc: 10, tw: 15 },
  { id: 12, depth: 2.20, qc: 9, tw: 14 },
  { id: 13, depth: 2.40, qc: 10, tw: 15 },
  { id: 14, depth: 2.60, qc: 10, tw: 15 },
  { id: 15, depth: 2.80, qc: 10, tw: 16 },
];

let hasInvalidRow = false;
let runningJhp = 0;
const computedRows = rawRows.map((row, idx) => {
  const depth = Number(row.depth || 0);
  const qc = Number(row.qc || 0);
  const tw = Number(row.tw || 0);
  const isInvalid = tw < qc;
  if (isInvalid) hasInvalidRow = true;

  const friction = isInvalid ? 0 : Math.max(0, tw - qc);
  const hambatanSetempat = Number((friction / 10).toFixed(3));
  
  let deltaZCm = 20;
  if (idx > 0) {
    const prevDepth = Number(rawRows[idx - 1].depth || 0);
    const diff = depth - prevDepth;
    if (diff > 0) deltaZCm = diff * 100;
  } else {
    deltaZCm = 0;
  }
  const deltaJhp = isInvalid ? 0 : (idx === 0 && depth === 0 ? 0 : Number((hambatanSetempat * deltaZCm).toFixed(2)));
  if (!isInvalid) {
    runningJhp = Number((runningJhp + deltaJhp).toFixed(2));
  }
  const jumlahHambatanPelekat = runningJhp;
  const frictionRatio = qc > 0 ? Number(((hambatanSetempat / qc) * 100).toFixed(2)) : 0;

  return {
    id: row.id,
    depth,
    qc,
    tw,
    friction,
    hambatanSetempat,
    deltaJhp,
    jumlahHambatanPelekat,
    frictionRatio,
    isInvalid,
  };
});

console.log('Row 2 JHP:', computedRows[1].jumlahHambatanPelekat, 'Expected: 4');
console.log('Row 3 JHP:', computedRows[2].jumlahHambatanPelekat, 'Expected: 8');
console.log('Final JHP:', computedRows[14].jumlahHambatanPelekat, 'Expected: 122');

