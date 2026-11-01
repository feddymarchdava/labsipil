// Test script for Bab 2 Soil Physics math
console.log('Testing Bab 2 math...')

// 1. mt-2-1 Kadar Air
const samples21 = [
  { w1: 15.4, w2: 68.2, w3: 57.6 },
  { w1: 16.1, w2: 70.5, w3: 59.4 },
  { w1: 15.8, w2: 69.1, w3: 58.2 },
]
const res21 = samples21.map(s => {
  const ww = s.w2 - s.w3
  const ws = s.w3 - s.w1
  const w = (ww / ws) * 100
  return { ww, ws, w }
})
const avgW = res21.reduce((a, b) => a + b.w, 0) / res21.length
console.log('mt-2-1 avgW:', avgW.toFixed(2), '%')

// 2. mt-2-2 Berat Jenis
const samples22 = [
  { w1: 34.8, w2: 84.8, w3: 167.4, w4: 136.2 },
  { w1: 35.2, w2: 85.2, w3: 168.0, w4: 136.8 },
  { w1: 35.0, w2: 85.0, w3: 167.7, w4: 136.5 },
]
const res22 = samples22.map(s => {
  const ws = s.w2 - s.w1
  const denom = (ws + s.w4) - s.w3
  const gs = ws / denom
  return { ws, denom, gs }
})
const avgGs = res22.reduce((a, b) => a + b.gs, 0) / res22.length
console.log('mt-2-2 avgGs:', avgGs.toFixed(3))

// 3. mt-2-3 Casagrande Flow Curve
const samples23 = [
  { n: 16, w1: 14.2, w2: 44.8, w3: 35.2 },
  { n: 21, w1: 14.5, w2: 45.1, w3: 35.8 },
  { n: 28, w1: 14.0, w2: 43.8, w3: 35.1 },
  { n: 34, w1: 14.4, w2: 43.6, w3: 35.3 },
]
const res23 = samples23.map(s => {
  const ww = s.w2 - s.w3
  const ws = s.w3 - s.w1
  const w = (ww / ws) * 100
  return { n: s.n, logN: Math.log10(s.n), w }
})

const nPts = res23.length
const sumX = res23.reduce((a, b) => a + b.logN, 0)
const sumY = res23.reduce((a, b) => a + b.w, 0)
const meanX = sumX / nPts
const meanY = sumY / nPts

let num = 0
let den = 0
res23.forEach(p => {
  num += (p.logN - meanX) * (p.w - meanY)
  den += Math.pow(p.logN - meanX, 2)
})
const slope = num / den
const intercept = meanY - slope * meanX
const ll = slope * Math.log10(25) + intercept

// R2
let ssTot = 0
let ssRes = 0
res23.forEach(p => {
  const yPred = slope * p.logN + intercept
  ssTot += Math.pow(p.w - meanY, 2)
  ssRes += Math.pow(p.w - yPred, 2)
})
const r2 = 1 - ssRes / ssTot

console.log('mt-2-3 Casagrande slope:', slope.toFixed(4), 'intercept:', intercept.toFixed(4))
console.log('mt-2-3 LL at N=25:', ll.toFixed(2), '%')
console.log('mt-2-3 R2:', r2.toFixed(4))

// 4. mt-2-4 Batas Plastis & PI
const samples24 = [
  { w1: 12.3, w2: 24.8, w3: 22.5 },
  { w1: 12.5, w2: 25.2, w3: 22.9 },
  { w1: 12.1, w2: 24.5, w3: 22.2 },
]
const res24 = samples24.map(s => {
  const ww = s.w2 - s.w3
  const ws = s.w3 - s.w1
  const pl = (ww / ws) * 100
  return { ww, ws, pl }
})
const avgPl = res24.reduce((a, b) => a + b.pl, 0) / res24.length
const pi = ll - avgPl
const aLine = 0.73 * (ll - 20)
console.log('mt-2-4 avgPl:', avgPl.toFixed(2), '%')
console.log('mt-2-4 PI:', pi.toFixed(2), '%')
console.log('mt-2-4 A-Line:', aLine.toFixed(2), '%')
console.log('Test completed successfully!')

