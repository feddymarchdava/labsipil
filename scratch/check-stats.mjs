import fs from 'fs';

const code = fs.readFileSync('src/App.jsx', 'utf8');
const start = code.indexOf('const labModulesData = {');
const end = code.indexOf('function renderModuleIcon(');
const slice = code.slice(start, end).replace(/const /g, 'var ');

const runner = `
${slice}
console.log('totalAllModulesCount:', totalAllModulesCount);
console.log('uniqueStandardsCount:', allUniqueStandardsList.length);
console.log('allUniqueStandardsList:', allUniqueStandardsList);
dynamicStandardCategories.forEach(cat => {
  console.log('[' + cat.num + '] ' + cat.title + ' (' + cat.standards.length + ' stds, ' + cat.modules.length + ' mods)');
  console.log('    standards: ' + cat.standards.join(', '));
});
`;

eval(runner);
