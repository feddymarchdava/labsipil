import { getCurveFactory } from 'recharts/es6/shape/Curve.js'
import * as d3Shape from 'd3-shape'

console.log('Curve factory for step:', getCurveFactory('step', 'vertical'))
console.log('Curve factory for step (horizontal):', getCurveFactory('step', 'horizontal'))

