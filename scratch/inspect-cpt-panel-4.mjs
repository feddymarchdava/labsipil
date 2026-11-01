import fs from 'fs';
const panel = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');
const lines = panel.split('\n');
console.log(lines.slice(3950, 4150).join('\n'));

