// scratch/test-marshall-math.mjs
const d = 10.2
const r = d / 2 // 5.1 cm
const t = 6.85 // cm = 68.5 mm
const cKal = 28.6515 * 0.4536 // 12.9961204
const vSil = 3.14 * r * r * t // 560.17869 cm3

// k_kor interpolation:
// 68.3 mm [0.89], 69.9 mm [0.86]
const kKor = 0.89 + ((68.5 - 68.3) / (69.9 - 68.3)) * (0.86 - 0.89) // 0.88625

// Specific Gravities
const gsb1 = 2.09495
const gsb2 = 2.64648
const gsb3 = 2.574
const gsa1 = 2.23583
const gsa2 = 2.80412
const gsa3 = 2.735
const ga = 1.03431

// Aggregate proportions against total mix (Pa = 6.5%)
const p1 = 36.465
const p2 = 50.9575
const p3 = 6.0775
const totalP = p1 + p2 + p3 // 93.5

// 3. Gsb
const denomGsb = (p1 / gsb1) + (p2 / gsb2) + (p3 / gsb3)
const gsb = totalP / denomGsb

// 4. Gsa
const denomGsa = (p1 / gsa1) + (p2 / gsa2) + (p3 / gsa3)
const gsa = totalP / denomGsa

// 5. Gse
const denomGse = (p1 / ((gsb1 + gsa1) / 2)) + (p2 / ((gsb2 + gsa2) / 2)) + (p3 / ((gsb3 + gsa3) / 2))
const gse = totalP / denomGse

console.log({
  vSil,
  kKor,
  cKal,
  gsb,
  gsa,
  gse,
})

const lp = 10.15 // m2/kg

const specimens = [
  { id: 1, no: 1, pa: 5.5, ssd: 1182.2, air: 623.8, kering: 1176.0, rStab: 218, flow: 1.10, k: 0.924, stabExpected: 2616.46 },
  { id: 2, no: 2, pa: 5.0, ssd: 1183.9, air: 609.3, kering: 1175.8, rStab: 257, flow: 2.04, k: 0.850, stabExpected: 2839.88 },
  { id: 3, no: 3, pa: 6.5, ssd: 1141.0, air: 602.3, kering: 1153.6, rStab: 183, flow: 0.92, k: 0.886, stabExpected: 2106.16 },
]

for (const s of specimens) {
  const v = s.ssd - s.air
  const gmb = s.kering / v
  const ps = 100 - s.pa
  const gmm = 100 / ((ps / gse) + (s.pa / ga))
  const pab = 100 * ((gse - gsb) / (gsb * gse)) * ga
  const pae = s.pa - ((pab / 100) * ps)
  const vma = 100 - ((gmb * ps) / gsb)
  const vim = 100 * ((gmm - gmb) / gmm)
  const vfa = 100 * ((vma - vim) / vma)
  const stab = s.stabExpected // or s.rStab * s.k * cKal
  const mq = stab / s.flow
  const density = ((s.pa / 100) * ga) + ((ps / 100) * gse)
  const tebalSelimut = (pae / ga) * (1 / (lp * ps)) * 1000

  console.log(`\n--- SPECIMEN ${s.no} (Pa = ${s.pa}%) ---`)
  console.log({
    v: v.toFixed(1),
    gmb: gmb.toFixed(3),
    gmm: gmm.toFixed(3),
    pab: pab.toFixed(2),
    pae: pae.toFixed(3),
    vma: vma.toFixed(2),
    vim: vim.toFixed(2),
    vfa: vfa.toFixed(2),
    stab: stab.toFixed(2),
    flow: s.flow.toFixed(2),
    mq: mq.toFixed(2),
    density: density.toFixed(3),
    tebalSelimut: tebalSelimut.toFixed(2),
  })
}

