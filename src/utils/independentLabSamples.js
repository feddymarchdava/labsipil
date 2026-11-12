import { numeric } from './labInputValues.js'

export function getIndependentSamples(inputs) {
  if (inputs.samples?.length) return inputs.samples
  const { samples: _samples, ...values } = inputs
  return [{ ...values, id: 1, name: 'Sampel 1' }]
}

export function newIndependentSample(config, activeSample, id) {
  const values = Object.fromEntries(Object.entries(config.initialInputs).map(([key, value]) => [
    key,
    value === '' || (typeof value === 'number' && !['rhoW', 'archGravitasi'].includes(key)) ? '' : activeSample[key] ?? value,
  ]))
  return { ...values, id, name: `Sampel ${id}` }
}

export function calculateIndependentSample(config, sample) {
  const fields = config.getFields?.(sample) ?? config.fields ?? []
  const invalid = fields.some((field) => {
    if (field.type === 'select') return false
    if (field.optional && (sample[field.key] == null || sample[field.key] === '')) return false
    const value = numeric(sample[field.key])
    return value === null || value < 0
  })
  if (!invalid) return config.calculate(sample)
  return {
    isError: true,
    status: 'Input Belum Lengkap',
    conclusion: 'Isi semua pengukuran untuk metode yang dipilih dengan angka yang sah.',
    results: [],
  }
}
