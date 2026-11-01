import fs from 'fs';

const content = fs.readFileSync('src/testCalculatorsData.js', 'utf8');
const lines = content.split('\n');

function findModule(id) {
  const start = lines.findIndex(l => l.includes("'" + id + "': {") || l.includes('"' + id + '": {'));
  if (start === -1) return null;
  let end = start + 1;
  let braces = 1;
  while (end < lines.length && braces > 0) {
    const l = lines[end];
    braces += (l.match(/\{/g) || []).length;
    braces -= (l.match(/\}/g) || []).length;
    end++;
  }
  return { start: start + 1, end, length: end - start };
}

const list = ['bb-1-1', 'bb-1-2', 'bb-1-3', 'bb-1-4', 'bb-1-5', 'bb-2-1', 'bb-2-2', 'bb-2-3', 'bb-2-4', 'bb-2-5', 'bb-2-6', 'bp-1-1'];
list.forEach(id => {
  const res = findModule(id);
  console.log(id, res);
});

