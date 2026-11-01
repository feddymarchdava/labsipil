import fs from 'fs';
const css = fs.readFileSync('src/App.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('cpt-') || l.includes('cpt_') || l.includes('cptTable') || l.includes('th-unit')) {
    console.log('CSS line ' + (i+1) + ': ' + l.trim());
  }
});

