import fs from 'fs';

console.log('Preparing to update testCalculatorsData.js...');

let code = fs.readFileSync('src/testCalculatorsData.js', 'utf8');

// 1. Add DEFAULT_BB... constants right before DEFAULT_DUCTILITY_SAMPLES
const defaultConstants = `export const DEFAULT_BB11_SAMPLES = [
  { id: 1, name: 'Benda Uji I', s: 500.0, a: 489.6, b: 664.2, c: 979.2 },
  { id: 2, name: 'Benda Uji II', s: 500.0, a: 479.5, b: 636.1, c: 950.5 },
  { id: 3, name: 'Benda Uji III', s: 500.0, a: 488.5, b: 661.5, c: 979.5 },
]

export const DEFAULT_BB12_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 15.3, w2: 115.3, w3: 111.4 },
  { id: 2, name: 'Benda Uji II', w1: 15.1, w2: 115.1, w3: 111.2 },
  { id: 3, name: 'Benda Uji III', w1: 15.4, w2: 115.4, w3: 111.6 },
]

export const DEFAULT_BB13_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 500.0, w2: 486.2 },
  { id: 2, name: 'Benda Uji II', w1: 500.0, w2: 485.5 },
  { id: 3, name: 'Benda Uji III', w1: 500.0, w2: 487.1 },
]

export const DEFAULT_BB14_SAMPLES = [
  { id: 1, name: 'Benda Uji I', wLepas: 16.85, wPadat: 18.15 },
  { id: 2, name: 'Benda Uji II', wLepas: 16.90, wPadat: 18.20 },
  { id: 3, name: 'Benda Uji III', wLepas: 16.82, wPadat: 18.12 },
]

export const DEFAULT_BB21_SAMPLES = [
  { id: 1, name: 'Benda Uji I', a: 485.4, b: 500.0, c: 268.3 },
  { id: 2, name: 'Benda Uji II', a: 486.6, b: 500.5, c: 271.4 },
  { id: 3, name: 'Benda Uji III', a: 486.1, b: 500.6, c: 276.3 },
]

export const DEFAULT_BB22_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 55.4, w2: 555.4, w3: 545.2 },
  { id: 2, name: 'Benda Uji II', w1: 56.1, w2: 556.1, w3: 546.8 },
  { id: 3, name: 'Benda Uji III', w1: 55.8, w2: 555.8, w3: 546.0 },
]

export const DEFAULT_BB23_SAMPLES = [
  { id: 1, name: 'Benda Uji I', w1: 1000.0, w2: 993.4 },
  { id: 2, name: 'Benda Uji II', w1: 1000.0, w2: 992.8 },
  { id: 3, name: 'Benda Uji III', w1: 1000.0, w2: 994.0 },
]

export const DEFAULT_BB24_SAMPLES = [
  { id: 1, name: 'Benda Uji I', wLepas: 25.14, wPadat: 26.98 },
  { id: 2, name: 'Benda Uji II', wLepas: 25.20, wPadat: 27.05 },
  { id: 3, name: 'Benda Uji III', wLepas: 25.10, wPadat: 26.92 },
]

export const DEFAULT_BB26_SAMPLES = [
  { id: 1, name: 'Benda Uji I', a: 2000.0, b: 808.3 },
  { id: 2, name: 'Benda Uji II', a: 2000.0, b: 820.0 },
  { id: 3, name: 'Benda Uji III', a: 2000.0, b: 812.5 },
]

export const DEFAULT_DUCTILITY_SAMPLES = [`;

if (!code.includes('DEFAULT_BB11_SAMPLES')) {
  code = code.replace('export const DEFAULT_DUCTILITY_SAMPLES = [', defaultConstants);
}

fs.writeFileSync('src/testCalculatorsData.js', code, 'utf8');
console.log('Constants inserted successfully!');

