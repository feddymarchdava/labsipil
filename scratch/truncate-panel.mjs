import fs from 'fs'

const path = 'k:/Materi Mata Kuliah/Semester 5/Aplikasi Komputer/LabSipil/src/TestCalculatorPanel.jsx'
const content = fs.readFileSync(path, 'utf8')
const lines = content.split('\n')
console.log('Total lines currently:', lines.length)

// Find the line where the first DynamicMarshallSection ends
let endIdx = -1
for (let i = 11000; i < 12500; i++) {
  if (lines[i] && lines[i].trim() === '}' && lines[i-1] && lines[i-1].trim() === ')' && lines[i-2] && lines[i-2].includes('</div>')) {
    endIdx = i
    break
  }
}

console.log('Found endIdx at line:', endIdx + 1)
if (endIdx > 0) {
  const truncated = lines.slice(0, endIdx + 1).join('\n')
  fs.writeFileSync(path, truncated, 'utf8')
  console.log('Successfully truncated file to', endIdx + 1, 'lines.')
}

