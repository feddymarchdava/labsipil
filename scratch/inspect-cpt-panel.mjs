import fs from 'fs';
const panel = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');
const lines = panel.split('\n');
lines.forEach((l, i) => {
  if (l.includes('hasDynamicCptTable') || l.includes('cptRows') || l.includes('Hambatan Konus')) {
    console.log('Line ' + (i+1) + ': ' + l.trim());
  }
});

