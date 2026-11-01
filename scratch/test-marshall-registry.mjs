// scratch/test-marshall-registry.mjs
import { calculatorRegistry, DEFAULT_MARSHALL_SPECIMENS, DEFAULT_MARSHALL_SURFACE_AREA_TABLE } from '../src/testCalculatorsData.js'

const mod = calculatorRegistry['bp-9-1']
console.log('Testing default laprak calculation...')
const res = mod.calculate(mod.initialInputs)

console.log('isError:', res.isError)
console.log('results count:', res.results.length)
console.log('Results:')
res.results.forEach(r => console.log(` - ${r.label}: ${r.value} ${r.unit}`))

console.log('Specimens count in res:', res.computedSpecimens?.length)
if (res.computedSpecimens) {
  res.computedSpecimens.forEach(s => {
    console.log(`BU ${s.no} (Pa=${s.pa}%): V=${s.v}, Gmb=${s.gmb}, Gmm=${s.gmm}, VMA=${s.vma}%, VIM=${s.vim}%, VFA=${s.vfa}%, Stab=${s.stabilitas}kg, Flow=${s.flow}mm, MQ=${s.mq}, Density=${s.density}, TebalSelimut=${s.tebalSelimut}um`)
  })
}

console.log('KAO Recommended:', res.kaoRecommended)
console.log('Formula steps count:', res.formulaSteps?.length)

