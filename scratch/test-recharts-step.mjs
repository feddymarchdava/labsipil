import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'

const data = [
  { depth: 0.0, qc: 0, tw: 0, fs: 0, fr: 0 },
  { depth: 0.2, qc: 5, tw: 7, fs: 0.2, fr: 4.0 },
  { depth: 0.4, qc: 8, tw: 11, fs: 0.3, fr: 3.75 },
]

try {
  const chart = React.createElement(
    LineChart,
    {
      width: 300,
      height: 400,
      layout: 'vertical',
      data: data,
      syncId: 'cpt-sync',
    },
    React.createElement(YAxis, { dataKey: 'depth', reversed: true, domain: [0, 3.0] }),
    React.createElement(XAxis, { type: 'number', domain: [0, 'auto'] }),
    React.createElement(ReferenceLine, { x: 1.5, stroke: 'red', strokeDasharray: '3 3' }),
    React.createElement(Line, { type: 'step', dataKey: 'qc', stroke: '#2563EB' })
  )

  const html = ReactDOMServer.renderToString(chart)
  console.log('Rendering SUCCESS!')
  console.log('HTML length:', html.length)
  console.log('Contains path:', html.includes('<path'))
} catch (err) {
  console.error('Rendering ERROR:', err)
}

