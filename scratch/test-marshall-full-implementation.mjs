// scratch/test-marshall-full-implementation.mjs
import { DEFAULT_MARSHALL_SPECIMENS, DEFAULT_MARSHALL_SURFACE_AREA_TABLE, interpolateMarshallCorrelation } from '../src/testCalculatorsData.js'

function fitQuadratic(points) {
  if (points.length < 3) return { a: 0, b: 0, c: 0, equation: '-', r2: 1.0 }
  const x1 = points[0].x, y1 = points[0].y
  const x2 = points[1].x, y2 = points[1].y
  const x3 = points[2].x, y3 = points[2].y

  const denom = (x1 - x2) * (x1 - x3) * (x2 - x3)
  if (Math.abs(denom) < 1e-9) return { a: 0, b: 0, c: 0, equation: '-', r2: 1.0 }

  const a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denom
  const b = (x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / denom
  const c = (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denom

  const signB = b >= 0 ? '+ ' : '- '
  const signC = c >= 0 ? '+ ' : '- '
  const eq = `f(x) = ${a.toFixed(3)}x² ${signB}${Math.abs(b).toFixed(3)}x ${signC}${Math.abs(c).toFixed(3)}`

  return { a, b, c, equation: eq, r2: 1.0 }
}

function fitLinear(points) {
  if (points.length < 2) return { m: 0, c: 0, equation: '-', r2: 1.0 }
  const n = points.length
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0
  for (const p of points) {
    sumX += p.x
    sumY += p.y
    sumXY += p.x * p.y
    sumX2 += p.x * p.x
    sumY2 += p.y * p.y
  }
  const denom = n * sumX2 - sumX * sumX
  if (Math.abs(denom) < 1e-9) return { m: 0, c: 0, equation: '-', r2: 1.0 }
  const m = (n * sumXY - sumX * sumY) / denom
  const c = (sumY - m * sumX) / n

  const numR = n * sumXY - sumX * sumY
  const denR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
  const r = denR > 0 ? numR / denR : 1.0
  const r2 = Number((r * r).toFixed(3))

  const signC = c >= 0 ? '+ ' : '- '
  const eq = `y = ${m.toFixed(1)}x ${signC}${Math.abs(c).toFixed(1)} (R² = ${r2})`

  return { m, c, equation: eq, r2 }
}

const inputs = {
  jenisCampuran: 'ac-wc',
  diameter: 10.2,
  tinggiBriket: 6.85,
  kalibrasiAlat: 12.9961,
  angkaKorelasiBeban: 0.886,
  gsb1: 2.09495,
  gsb2: 2.64648,
  gsb3: 2.574,
  gsa1: 2.23583,
  gsa2: 2.80412,
  gsa3: 2.735,
  ga: 1.03431,
  p1: 36.465,
  p2: 50.958,
  p3: 6.0775,
  surfaceAreaTable: DEFAULT_MARSHALL_SURFACE_AREA_TABLE,
  specimens: DEFAULT_MARSHALL_SPECIMENS,
}

// Execute calculation
const d = Number(inputs.diameter) || 10.2
const r = d / 2
const t = Number(inputs.tinggiBriket) || 6.85
const vSil = Number((3.14 * r * r * t).toFixed(3))
const kKorAuto = interpolateMarshallCorrelation(t * 10)
const kKor = inputs.angkaKorelasiBeban ? Number(inputs.angkaKorelasiBeban) : kKorAuto
const cKal = Number(inputs.kalibrasiAlat) || 12.9961

const gsb1 = Number(inputs.gsb1)
const gsb2 = Number(inputs.gsb2)
const gsb3 = Number(inputs.gsb3)
const gsa1 = Number(inputs.gsa1)
const gsa2 = Number(inputs.gsa2)
const gsa3 = Number(inputs.gsa3)
const ga = Number(inputs.ga)
const p1 = Number(inputs.p1)
const p2 = Number(inputs.p2)
const p3 = Number(inputs.p3)
const totalP = p1 + p2 + p3

const gsb = Number((totalP / ((p1 / gsb1) + (p2 / gsb2) + (p3 / gsb3))).toFixed(4))
const gsa = Number((totalP / ((p1 / gsa1) + (p2 / gsa2) + (p3 / gsa3))).toFixed(4))
const gse = Number((totalP / ((p1 / ((gsb1 + gsa1) / 2)) + (p2 / ((gsb2 + gsa2) / 2)) + (p3 / ((gsb3 + gsa3) / 2)))).toFixed(4))

const computedSat = inputs.surfaceAreaTable.map(row => {
  const lpVal = row.flp > 0 ? Number(((row.flp * Number(row.cumPassPct || 0)) / 100).toFixed(2)) : 0
  return { ...row, lp: lpVal }
})
const totalLp = Number(computedSat.reduce((acc, r) => acc + (r.lp || 0), 0).toFixed(2))

const computedSpecimens = inputs.specimens.map((s, idx) => {
  const pa = Number(s.pa)
  const bSsd = Number(s.beratSsd)
  const bAir = Number(s.beratAir)
  const bKering = Number(s.beratKering)
  const rStab = Number(s.bacaanStab)
  const flow = Number(s.flow)
  const kSpec = s.angkaKorelasi ? Number(s.angkaKorelasi) : kKor

  const v = Number((bSsd - bAir).toFixed(1))
  const gmb = v > 0 ? Number((bKering / v).toFixed(3)) : 0
  const ps = Number((100 - pa).toFixed(3))
  const denomGmm = (ps / gse) + (pa / ga)
  const gmm = denomGmm > 0 ? Number((100 / denomGmm).toFixed(3)) : 0
  const pab = Number((100 * ((gse - gsb) / (gsb * gse)) * ga).toFixed(2))
  const pae = Number((pa - ((pab / 100) * ps)).toFixed(3))
  const vma = gsb > 0 ? Number((100 - ((gmb * ps) / gsb)).toFixed(2)) : 0
  const vim = gmm > 0 ? Number((100 * ((gmm - gmb) / gmm)).toFixed(2)) : 0
  const vfa = vma > 0 ? Number((100 * ((vma - vim) / vma)).toFixed(2)) : 0

  const stabilitas = s.stabilitas ? Number(Number(s.stabilitas).toFixed(2)) : Number((rStab * kSpec * cKal).toFixed(2))
  const mq = flow > 0 ? Number((stabilitas / flow).toFixed(2)) : 0
  const density = Number((((pa / 100) * ga) + ((ps / 100) * gse)).toFixed(3))
  const tebalSelimut = totalLp > 0 && ps > 0 && ga > 0 ? Number(((pae / ga) * (1 / (totalLp * ps)) * 1000).toFixed(2)) : 0

  return {
    ...s,
    v,
    gmb,
    ps,
    gmm,
    pab,
    pae,
    vma,
    vim,
    vfa,
    stabilitas,
    flow,
    mq,
    density,
    tebalSelimut,
  }
})

console.log('Total LP:', totalLp)
console.log('Computed specimens:')
console.table(computedSpecimens)

const sortedSpecs = [...computedSpecimens].sort((a, b) => a.pa - b.pa)
const stabFit = fitLinear(sortedSpecs.map(s => ({ x: s.pa, y: s.stabilitas })))
const vimFit = fitQuadratic(sortedSpecs.map(s => ({ x: s.pa, y: s.vim })))
const densityFit = fitQuadratic(sortedSpecs.map(s => ({ x: s.pa, y: s.density })))

console.log('Stabilitas Fit:', stabFit)
console.log('VIM Fit:', vimFit)
console.log('Density Fit:', densityFit)

