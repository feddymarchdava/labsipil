import fs from 'fs';
const panel = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');
const lines = panel.split('\n');
console.log(lines.slice(3770, 3950).join('\n'));

