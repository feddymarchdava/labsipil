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

let runningJhp = 0;
const computed = rawRows.map((r, i) => {
  const friction = Math.max(0, r.tw - r.qc);
  const fs = friction / 10;
  const deltaJhp = friction * 2;
  runningJhp += deltaJhp;
  const jhp = runningJhp;
  const fr = r.qc > 0 ? (fs / r.qc) * 100 : 0;
  return { depth: r.depth, qc: r.qc, tw: r.tw, friction, fs, deltaJhp, jhp, fr: fr.toFixed(2) };
});

console.table(computed);

