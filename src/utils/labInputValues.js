export function numeric(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value !== 'string' || !/^[+-]?(?:\d+(?:[.,]\d+)?|\.\d+)(?:e[+-]?\d+)?%?$/i.test(value.trim())) return null
  const parsed = Number(value.trim().replace(',', '.').replace(/%$/, ''))
  return Number.isFinite(parsed) ? parsed : null
}

export function normalizeLegacyLabInputs(id, inputs) {
  if (id === 'mt-3-1' && !inputs.proctorSamples?.length && numeric(inputs.kadarAir) === null) {
    const [w1, w2, w3] = [inputs.w1, inputs.w2, inputs.w3].map(numeric)
    if ([w1, w2, w3].every(Number.isFinite) && w2 >= w3 && w3 > w1) {
      return { ...inputs, kadarAir: 100 * (w2 - w3) / (w3 - w1) }
    }
  }
  if (id === 'bp-9-1' && !inputs.specimens?.length) {
    return {
      ...inputs,
      kadarAspalPb: inputs.kadarAspalPb ?? inputs.kadarAspalPa,
      gb: inputs.gb ?? inputs.ga,
    }
  }
  return inputs
}
