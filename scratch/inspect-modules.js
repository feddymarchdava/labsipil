const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');
const slice = lines.slice(117, 711).join('\n').replace('const labModulesData =', 'var labModulesData =');
eval(slice);

for (const [catKey, catVal] of Object.entries(labModulesData)) {
  console.log('=== ' + catKey + ' ===');
  for (const [subKey, subVal] of Object.entries(catVal)) {
    console.log('  -- ' + subKey + ' (' + subVal.length + ' items) --');
    subVal.forEach(m => console.log('     [' + m.id + '] ' + m.code + ' | ' + m.title + ' | badge: ' + m.badge));
  }
}

