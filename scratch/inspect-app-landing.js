import fs from 'fs';

const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (
    l.includes('Mekanika Fluida') ||
    l.includes('42') ||
    l.includes('Standar') ||
    l.includes('ASTM D5242') ||
    l.includes('Ambang Tajam') ||
    l.includes('Regulasi') ||
    l.includes('Statistik') ||
    l.includes('Modul')
  ) {
    if (l.includes('Mekanika Fluida (5') || l.includes('42 ') || l.includes('42 Modul') || l.includes('37') || l.includes('ASTM D5242') || l.includes('Regulasi')) {
      console.log(i + 1, l.trim());
    }
  }
});

