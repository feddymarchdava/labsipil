import fs from 'fs';
import path from 'path';

function searchInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'scratch') {
        searchInDir(full);
      }
    } else if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      ['42', '37 Standar', 'Standar Regulasi', 'Mekanika Fluida (5', 'Ambang Tajam'].forEach(term => {
        if (content.includes(term)) {
          console.log("Found '" + term + "' in " + full);
        }
      });
    }
  }
}

searchInDir('.');

