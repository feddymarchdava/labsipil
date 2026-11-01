import fs from 'fs';
const calc = fs.readFileSync('src/testCalculatorsData.js', 'utf8');
const lines = calc.split('\n');
let start = -1;
lines.forEach((l, i) => {
  if (l.includes("'mt-1-1': {") || l.includes("id: 'mt-1-1'")) {
    console.log('Line ' + (i+1) + ': ' + l.trim());
    if (start === -1 && l.includes("'mt-1-1': {")) start = i;
  }
});
if (start !== -1) {
  console.log(lines.slice(start, start + 100).join('\n'));
}

