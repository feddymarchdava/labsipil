import fs from 'fs'

const code = fs.readFileSync('./src/TestCalculatorPanel.jsx', 'utf8')
const lines = code.split('\n')

lines.forEach((l, i) => {
  if (l.includes('hasDynamic') && l.includes('?')) {
    console.log(i + 1, l.trim())
  }
})
