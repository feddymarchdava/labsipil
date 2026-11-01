import fs from 'fs';
const calc = fs.readFileSync('src/testCalculatorsData.js', 'utf8');
const lines = calc.split('\n');
console.log(lines.slice(4130, 4260).join('\n'));

