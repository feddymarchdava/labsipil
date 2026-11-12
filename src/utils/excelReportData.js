import { aggregateSpecimens, aggregateWeight } from './aggregateGradation.js'

export function resolveRecordConfig(record, registry) {
  if (!record) return null
  const exactId = [record.moduleId, record.testId, record.testConfig?.id].find((id) => id && Object.hasOwn(registry, id))
  if (exactId) return registry[exactId]
  const name = typeof record.name === 'string' ? record.name.trim().toLowerCase() : null
  const candidates = Object.values(registry).filter((config) => config.code === record.baseCode || config.name.toLowerCase() === name)
  return candidates.length === 1 ? candidates[0] : {
    id: record.moduleId || record.testId || record.id,
    code: record.baseCode || record.id,
    name: record.name,
    standard: record.standard,
    lab: record.lab,
    category: record.category,
  }
}

function sampleGroup(id, inputs) {
  if (['bb-1-5', 'bb-2-5'].includes(id) && inputs.sieves?.length) return 'aggregate'
  if (id === 'bp-9-1' && inputs.specimens?.length) return 'specimens'
  if (id === 'mt-3-1' && inputs.proctorSamples?.length) return 'proctorSamples'
  if (id === 'bp-2-1' && inputs.groups?.length) return 'groups'
  return Array.isArray(inputs.samples) && inputs.samples.length ? 'samples' : null
}

export function getExportSamples(id, inputs) {
  const group = sampleGroup(id, inputs)
  if (!group) return []
  if (group === 'aggregate') return aggregateSpecimens(inputs).map((name, i) => ({ id: i + 1, name }))
  return inputs[group].map((sample, i) => ({ id: sample.id ?? i + 1, name: sample.name || `Benda Uji ${sample.no ?? i + 1}` }))
}

export function selectExportSamples(id, inputs, selectedIds) {
  if (selectedIds == null) return inputs
  const group = sampleGroup(id, inputs)
  if (!group) return inputs
  const samples = getExportSamples(id, inputs)
  const selected = new Set(selectedIds.map(String))
  const indexes = samples.flatMap((sample, i) => selected.has(String(sample.id)) ? [i] : [])
  if (!indexes.length) throw new Error('Pilih minimal satu benda uji yang tersedia.')
  if (indexes.length === samples.length) return inputs
  if (group !== 'aggregate') return { ...inputs, [group]: indexes.map((i) => inputs[group][i]) }
  return {
    ...inputs,
    specimens: indexes.map((i) => samples[i].name),
    sieves: inputs.sieves.map((sieve) => ({
      ...sieve,
      weights: indexes.map((i) => aggregateWeight(sieve, i)),
    })),
  }
}
