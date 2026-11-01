import fs from 'fs';

const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('hero') || l.includes('stat') || l.includes('Stat') || l.includes('blue') || l.includes('Total') || l.includes('Standar')) {
    if (l.includes('37') || l.includes('42') || l.includes('Modul') || l.includes('Pengujian')) {
      if (i < 1500) {
        console.log(i + 1, l.trim());
      }
    }
  }
});

