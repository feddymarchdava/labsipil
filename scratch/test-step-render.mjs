import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { LineChart, Line, XAxis, YAxis } from 'recharts'

const data = [
  { depth: 0.0, qc: 0, tw: 0, fs: 0, fr: 0 },
  { depth: 0.2, qc: 5, tw: 7, fs: 0.2, fr: 4.0 },
  { depth: 0.4, qc: 8, tw: 11, fs: 0.3, fr: 3.75 },
  { depth: 0.6, qc: 10, tw: 14, fs: 0.4, fr: 4.0 },
]

function renderChart(type) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(
      'div',
      null,
      React.createElement(
        LineChart,
        {
          width: 400,
          height: 300,
          layout: 'vertical',
          data: data,
        },
        React.createElement(YAxis, { dataKey: 'depth', reversed: true }),
        React.createElement(XAxis, { type: 'number' }),
        React.createElement(Line, { type: type, dataKey: 'qc', stroke: '#2563EB', isAnimationActive: false })
      )
    )
  )
}

for (const t of ['step', 'stepAfter', 'stepBefore', 'linear', 'monotone']) {
  try {
    const html = renderChart(t)
    console.log(`Type "${t}": success, path length in svg:`, html.length)
  } catch (err) {
    console.log(`Type "${t}": error:`, err.message)
  }
}

