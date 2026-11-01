import fs from 'fs';

console.log('Applying replacements into src/testCalculatorsData.js...');

let content = fs.readFileSync('src/testCalculatorsData.js', 'utf8');

const bb1Replacement = fs.readFileSync('scratch/bb1-replacement.js', 'utf8').trimEnd();
const bb2Replacement = fs.readFileSync('scratch/bb2-replacement.js', 'utf8').trimEnd();

// Find start and end indices using string markers
const bab1Marker = '  // -----------------------------------------------------------------------\n  // BAB I: AGREGAT HALUS';
const bab2Marker = '  // -----------------------------------------------------------------------\n  // BAB II: AGREGAT KASAR';
const bab3Marker = '  // -----------------------------------------------------------------------\n  // BAB III: BETON';

const idxBab1 = content.indexOf(bab1Marker);
const idxBab2 = content.indexOf(bab2Marker);
const idxBab3 = content.indexOf(bab3Marker);

if (idxBab1 === -1 || idxBab2 === -1 || idxBab3 === -1) {
  throw new Error(`Markers not found! idxBab1: ${idxBab1}, idxBab2: ${idxBab2}, idxBab3: ${idxBab3}`);
}

const beforeBab1 = content.slice(0, idxBab1);
const afterBab3 = content.slice(idxBab3);

const newContent = beforeBab1 + bb1Replacement + '\n\n' + bb2Replacement + '\n\n' + afterBab3;

fs.writeFileSync('src/testCalculatorsData.js', newContent, 'utf8');
console.log('Replacements applied successfully!');

