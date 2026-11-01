// scratch/test-marshall-full-calc.mjs
import { interpolateMarshallCorrelation } from '../src/testCalculatorsData.js'

console.log('Interpolation for 68.5mm:', interpolateMarshallCorrelation(68.5))
console.log('Interpolation for 63.5mm:', interpolateMarshallCorrelation(63.5))
console.log('Interpolation for 70.0mm:', interpolateMarshallCorrelation(70.0))

