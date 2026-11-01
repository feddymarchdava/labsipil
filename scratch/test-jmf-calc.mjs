const DEFAULT_JMF_SIEVES = [
  { id: 1, name: '1"', sizeMm: '25 mm', size: 25.0, retWeight: 0.0, specMin: 100.0, specMax: 100.0 },
  { id: 2, name: '3/4"', sizeMm: '19 mm', size: 19.0, retWeight: 0.0, specMin: 100.0, specMax: 100.0 },
  { id: 3, name: '1/2"', sizeMm: '12.5 mm', size: 12.5, retWeight: 56.1, specMin: 90.0, specMax: 100.0 },
  { id: 4, name: '3/8"', sizeMm: '9.5 mm', size: 9.5, retWeight: 129.03, specMin: 77.0, specMax: 90.0 },
  { id: 5, name: 'No. 4', sizeMm: '4.75 mm', size: 4.75, retWeight: 252.45, specMin: 53.0, specMax: 69.0, isBoundaryCA: true },
  { id: 6, name: 'No. 8', sizeMm: '2.36 mm', size: 2.36, retWeight: 201.96, specMin: 33.0, specMax: 53.0 },
  { id: 7, name: 'No. 16', sizeMm: '1.18 mm', size: 1.18, retWeight: 140.25, specMin: 21.0, specMax: 40.0 },
  { id: 8, name: 'No. 30', sizeMm: '0.6 mm', size: 0.6, retWeight: 95.37, specMin: 14.0, specMax: 30.0 },
  { id: 9, name: 'No. 50', sizeMm: '0.3 mm', size: 0.3, retWeight: 72.93, specMin: 9.0, specMax: 22.0 },
  { id: 10, name: 'No. 100', sizeMm: '0.15 mm', size: 0.15, retWeight: 56.1, specMin: 6.0, specMax: 15.0 },
  { id: 11, name: 'No. 200', sizeMm: '0.075 mm', size: 0.075, retWeight: 44.88, specMin: 4.0, specMax: 9.0, isBoundaryFiller: true },
  { id: 12, name: 'Pan', sizeMm: '< 0.075 mm', size: 0.0, retWeight: 72.93, specMin: null, specMax: null, isPan: true },
]

const wTotal = 1200.0
const pbRencana = 6.5
const k = 0.75
const wAspal = (pbRencana / 100) * wTotal
const wAgregat = wTotal - wAspal

console.log('wTotal:', wTotal)
console.log('wAspal:', wAspal)
console.log('wAgregat:', wAgregat)

let runningRet = 0
const computedSieves = DEFAULT_JMF_SIEVES.map((s) => {
  runningRet += Number(s.retWeight) || 0
  const cumRetWeight = runningRet
  const cumRetPct = (cumRetWeight / wAgregat) * 100
  const cumPassPct = Math.max(0, 100 - cumRetPct)
  const isOk = s.specMin !== null && s.specMax !== null
    ? (cumPassPct >= s.specMin - 0.05 && cumPassPct <= s.specMax + 0.05)
    : true
  return {
    ...s,
    cumRetWeight: +(cumRetWeight.toFixed(2)),
    cumRetPct: +(cumRetPct.toFixed(2)),
    cumPassPct: +(cumPassPct.toFixed(2)),
    isOk,
  }
})

console.log('\nSieves:')
computedSieves.forEach((s) => {
  console.log(`${s.name.padEnd(8)}: ret=${s.retWeight}g, cumRet=${s.cumRetWeight}g, %ret=${s.cumRetPct}%, %pass=${s.cumPassPct}%, OK=${s.isOk}`)
})

// CA: Tertahan No. 4 (1" s/d No. 4) -> slice 0..5
const wCA = computedSieves.slice(0, 5).reduce((sum, s) => sum + s.retWeight, 0)
const caPct = (wCA / wAgregat) * 100

// FA: Lolos No. 4 & Tertahan No. 200 (No. 8 s/d No. 200) -> slice 5..11
const wFA = computedSieves.slice(5, 11).reduce((sum, s) => sum + s.retWeight, 0)
const faPct = (wFA / wAgregat) * 100

// Filler: Lolos No. 200 (Pan) -> index 11
const wFiller = computedSieves[11].retWeight
const fillerPct = (wFiller / wAgregat) * 100

console.log('\nFraksi Agregat:')
console.log('CA:', wCA, 'g ->', caPct.toFixed(2), '%')
console.log('FA:', wFA, 'g ->', faPct.toFixed(2), '%')
console.log('Filler:', wFiller, 'g ->', fillerPct.toFixed(2), '%')
console.log('Total Agregat:', (wCA + wFA + wFiller).toFixed(2), 'g ->', (caPct + faPct + fillerPct).toFixed(2), '%')

// KAA
const kaaMurni = 0.035 * caPct + 0.045 * faPct + 0.18 * fillerPct + k
console.log('\nKAA murni:', kaaMurni.toFixed(4), '% -> rounded:', kaaMurni.toFixed(1), '%')

// Tabel 11.4: Mix Design
const caMixPct = (wCA / wTotal) * 100
const faMixPct = (wFA / wTotal) * 100
const fillerMixPct = (wFiller / wTotal) * 100
const aspalMixPct = (wAspal / wTotal) * 100
const totalMixPct = caMixPct + faMixPct + fillerMixPct + aspalMixPct

console.log('\nTabel 11.4 Mix Design:')
console.log('CA:     ', wCA.toFixed(2), 'g | ag:', caPct.toFixed(2), '% | mix:', caMixPct.toFixed(3), '%')
console.log('FA:     ', wFA.toFixed(2), 'g | ag:', faPct.toFixed(2), '% | mix:', faMixPct.toFixed(3), '%')
console.log('Filler: ', wFiller.toFixed(2), 'g | ag:', fillerPct.toFixed(2), '% | mix:', fillerMixPct.toFixed(3), '%')
console.log('Aspal:  ', wAspal.toFixed(2), 'g | ag:', pbRencana.toFixed(2), '% | mix:', aspalMixPct.toFixed(3), '%')
console.log('Total:  ', wTotal.toFixed(2), 'g | ag: 100.00% | mix:', totalMixPct.toFixed(3), '%')

