import fs from 'fs';
const panel = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');
const lines = panel.split('\n');
console.log('=== LINES 700-760 ===');
console.log(lines.slice(700, 765).join('\n'));
console.log('=== LINES 1665-1700 ===');
console.log(lines.slice(1665, 1700).join('\n'));

