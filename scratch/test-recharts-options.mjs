import React from 'react'
import { renderToString } from 'react-dom/server'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts'

const data = [
  { temp: 115, viskositasRegresi: 1000, viskositasUji: null },
  { temp: 120, viskositasRegresi: 734, viskositasUji: 734 },
  { temp: 125, viskositasRegresi: 530, viskositasUji: null },
  { temp: 130, viskositasRegresi: 410, viskositasUji: null },
  { temp: 135, viskositasRegresi: 356, viskositasUji: 356 },
  { temp: 140, viskositasRegresi: 280, viskositasUji: null },
  { temp: 145, viskositasRegresi: 220, viskositasUji: null },
  { temp: 150, viskositasRegresi: 176, viskositasUji: 176 },
  { temp: 155, viskositasRegresi: 140, viskositasUji: null },
  { temp: 160, viskositasRegresi: 110, viskositasUji: null },
  { temp: 165, viskositasRegresi: 91, viskositasUji: 91 },
  { temp: 170, viskositasRegresi: 70, viskositasUji: null },
]

// Test 1: type="number" with domain and ticks
const html1 = renderToString(
  React.createElement(
    LineChart,
    { width: 600, height: 340, data, margin: { top: 20, right: 30, left: 75, bottom: 25 } },
    React.createElement(CartesianGrid, { strokeDasharray: '3 3' }),
    React.createElement(
      XAxis,
      {
        dataKey: 'temp',
        type: 'number',
        domain: [110, 175],
        ticks: [115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170],
        unit: '°C',
        stroke: '#64748B',
        tick: { fontSize: 11, fill: '#64748B' },
      },
      React.createElement(Label, { value: 'Suhu Pengujian (°C)', offset: -12, position: 'insideBottom', fill: '#475569', fontSize: 11 })
    ),
    React.createElement(
      YAxis,
      {
        stroke: '#64748B',
        tick: { fontSize: 11, fill: '#64748B' },
        domain: [0, 'auto'],
      },
      React.createElement(Label, { value: 'Viskositas Kinematik (cSt)', angle: -90, position: 'insideLeft', offset: -55, fill: '#475569', fontSize: 11, style: { textAnchor: 'middle' } })
    ),
    React.createElement(Line, { type: 'monotone', dataKey: 'viskositasRegresi', stroke: '#2563EB', isAnimationActive: false }),
    React.createElement(Line, { type: 'monotone', dataKey: 'viskositasUji', stroke: '#DC2626', strokeWidth: 0, dot: { r: 5, fill: '#DC2626' }, isAnimationActive: false })
  )
)

console.log('Render 1 success, html length:', html1.length)
console.log('Contains 115°C:', html1.includes('115°C'))
console.log('Contains 120°C:', html1.includes('120°C'))
console.log('Contains Viskositas Kinematik:', html1.includes('Viskositas Kinematik (cSt)'))

