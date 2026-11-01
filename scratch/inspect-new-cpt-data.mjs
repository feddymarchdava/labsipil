const rows = [
  { depth: 0.0, qc: 0, tw: 0 },
  { depth: 0.2, qc: 5, tw: 7 },
  { depth: 0.4, qc: 8, tw: 11 },
  { depth: 0.6, qc: 10, tw: 14 },
  { depth: 0.8, qc: 15, tw: 20 },
  { depth: 1.0, qc: 22, tw: 30 },
  { depth: 1.2, qc: 35, tw: 46 },
  { depth: 1.4, qc: 40, tw: 52 },
  { depth: 1.6, qc: 18, tw: 23 },
  { depth: 1.8, qc: 15, tw: 19 },
  { depth: 2.0, qc: 20, tw: 25 },
  { depth: 2.2, qc: 45, tw: 56 },
  { depth: 2.4, qc: 65, tw: 80 },
  { depth: 2.6, qc: 85, tw: 103 },
  { depth: 2.8, qc: 110, tw: 132 }
]

let runningJhp = 0
rows.forEach((r, idx) => {
  const d = Math.max(0, r.tw - r.qc)
  const fs = d / 10
  const deltaJhp = idx === 0 ? 0 : d * 2
  runningJhp += deltaJhp
  const fr = r.qc > 0 ? (fs / r.qc) * 100 : 0
  
  let rowSoil = 'Lempung Lunak'
  if (r.qc >= 100 && fr < 1.5) {
    rowSoil = 'Pasir Padat / Tanah Keras'
  } else if (r.qc >= 50 && fr < 2.0) {
    rowSoil = 'Pasir Sedang / Berlanau'
  } else if (fr < 1.0) {
    rowSoil = 'Pasir Kasar / Kerikil'
  } else if (fr < 2.0) {
    rowSoil = 'Pasir Berlanau'
  } else if (fr < 4.0) {
    rowSoil = 'Lanau / Lempung Berlanau'
  } else if (fr < 6.5) {
    rowSoil = 'Lempung Plastis'
  } else {
    rowSoil = 'Lempung Sangat Lunak / Gambut'
  }

  console.log(`z=${r.depth.toFixed(1)}m | qc=${r.qc.toString().padStart(3)} | tw=${r.tw.toString().padStart(3)} | d=${d.toFixed(1)} | fs=${fs.toFixed(2)} | JHP=${runningJhp.toFixed(1).padStart(5)} | FR=${fr.toFixed(2).padStart(5)}% | ${rowSoil}`)
})

