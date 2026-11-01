import fs from 'fs';

console.log('Reading TestCalculatorPanel.jsx...');
let code = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');

// 1. Update imports
const oldImports = `  DEFAULT_MARSHALL_SURFACE_AREA_TABLE,
  DEFAULT_MARSHALL_SPECIMENS,
  interpolateMarshallCorrelation,
} from './testCalculatorsData'`;

const newImports = `  DEFAULT_MARSHALL_SURFACE_AREA_TABLE,
  DEFAULT_MARSHALL_SPECIMENS,
  interpolateMarshallCorrelation,
  DEFAULT_BB11_SAMPLES,
  DEFAULT_BB12_SAMPLES,
  DEFAULT_BB13_SAMPLES,
  DEFAULT_BB14_SAMPLES,
  DEFAULT_BB21_SAMPLES,
  DEFAULT_BB22_SAMPLES,
  DEFAULT_BB23_SAMPLES,
  DEFAULT_BB24_SAMPLES,
  DEFAULT_BB26_SAMPLES,
} from './testCalculatorsData'`;

if (!code.includes('DEFAULT_BB11_SAMPLES')) {
  code = code.replace(oldImports, newImports);
}

// 2. Add hasNegativeMultiSampleInput
const targetNeg = `  // Deteksi jika user memasukkan angka minus pada tabel pasangan data (misal Direct Shear)`;
const multiSampleNeg = `  // Deteksi jika user memasukkan angka minus pada multi-sampel Bab 1 & Bab 2
  const hasNegativeMultiSampleInput = Boolean(
    testConfig.hasMultiSample &&
    Array.isArray(inputs.samples) &&
    inputs.samples.some((s) => {
      return Object.entries(s).some(([k, val]) => {
        if (k === 'id' || k === 'name') return false
        const str = String(val !== undefined ? val : '').trim()
        return str.startsWith('-') || (Number(str) < 0 && !isNaN(Number(str)))
      })
    })
  )

  // Deteksi jika user memasukkan angka minus pada tabel pasangan data (misal Direct Shear)`;

if (!code.includes('hasNegativeMultiSampleInput')) {
  code = code.replace(targetNeg, multiSampleNeg);
}

// Update hasNegativeInput definition
const oldHasNeg = `const hasNegativeInput = negativeFields.length > 0 || hasNegativeTableInput || hasNegativeSieveInput`;
const newHasNeg = `const hasNegativeInput = negativeFields.length > 0 || hasNegativeMultiSampleInput || hasNegativeTableInput || hasNegativeSieveInput`;
if (!code.includes('hasNegativeMultiSampleInput || hasNegativeTableInput')) {
  code = code.replace(oldHasNeg, newHasNeg);
}

// 3. Add handlers for multi-sample and multi-specimen sieves
const targetHandlers = `  // Data sampel dinamis untuk modul Uji Titik Nyala & Titik Bakar (Bahan Perkerasan Bab 5)`;
const multiSampleHandlers = `  // Data sampel dinamis untuk seluruh modul Bab 1 & Bab 2 (Agregat Halus & Kasar)
  const currentMultiSamples = useMemo(() => {
    if (!testConfig.hasMultiSample) return []
    if (Array.isArray(inputs.samples)) return inputs.samples
    return testConfig.initialInputs?.samples || []
  }, [testConfig.hasMultiSample, inputs.samples, testConfig.initialInputs])

  const handleMultiSampleChange = (id, field, value) => {
    const updated = currentMultiSamples.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          [field]: value === '' ? '' : (isNaN(Number(value)) ? value : Number(value)),
        }
      }
      return s
    })
    handleInputChange('samples', updated)
  }

  const handleAddMultiSample = () => {
    const nextId = currentMultiSamples.length > 0
      ? Math.max(...currentMultiSamples.map((s) => Number(s.id) || 0)) + 1
      : 1
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
    const name = \`Benda Uji \${romanNumerals[nextId - 1] || nextId}\`
    const last = currentMultiSamples[currentMultiSamples.length - 1] || {}
    const newSample = { ...last, id: nextId, name }
    handleInputChange('samples', [...currentMultiSamples, newSample])
  }

  const handleRemoveMultiSample = (id) => {
    if (currentMultiSamples.length <= 1) return
    const updated = currentMultiSamples.filter((s) => s.id !== id)
    handleInputChange('samples', updated)
  }

  const handleResetMultiSamples = () => {
    if (testConfig.initialInputs) {
      Object.entries(testConfig.initialInputs).forEach(([k, val]) => {
        handleInputChange(k, typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val)
      })
    }
  }

  // Multi-benda uji saringan agregat (bb-1-5 & bb-2-5)
  const currentSpecimens = useMemo(() => {
    if (!testConfig.hasDynamicSieveTable) return []
    if (Array.isArray(inputs.specimens) && inputs.specimens.length > 0) return inputs.specimens
    if (Array.isArray(testConfig.initialInputs?.specimens)) return testConfig.initialInputs.specimens
    return ['Benda Uji I', 'Benda Uji II', 'Benda Uji III']
  }, [testConfig.hasDynamicSieveTable, inputs.specimens, testConfig.initialInputs])

  const handleSieveWeightChange = (sieveIndex, specIndex, val) => {
    const numVal = val === '' ? '' : Math.max(0, parseFloat(val) || 0)
    const updated = currentSieves.map((s, idx) => {
      if (idx === sieveIndex) {
        const weights = Array.isArray(s.weights)
          ? [...s.weights]
          : currentSpecimens.map(() => s.weight || 0)
        while (weights.length < currentSpecimens.length) {
          weights.push(weights[weights.length - 1] || 0)
        }
        weights[specIndex] = numVal
        const avg = weights.reduce((a, b) => a + Number(b || 0), 0) / weights.length
        return { ...s, weights, weight: Number(avg.toFixed(1)) }
      }
      return s
    })
    handleInputChange('sieves', updated)
  }

  const handleAddSpecimen = () => {
    const nextIdx = currentSpecimens.length + 1
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][nextIdx - 1] || nextIdx
    const newSpecName = \`Benda Uji \${roman}\`
    const updatedSpecimens = [...currentSpecimens, newSpecName]
    const updatedSieves = currentSieves.map((s) => {
      const weights = Array.isArray(s.weights) ? [...s.weights] : [s.weight || 0]
      const lastW = weights[weights.length - 1] ?? (s.weight || 0)
      weights.push(lastW)
      return { ...s, weights }
    })
    handleInputChange('specimens', updatedSpecimens)
    handleInputChange('sieves', updatedSieves)
  }

  const handleRemoveSpecimen = (specIndex) => {
    if (currentSpecimens.length <= 1) return
    const updatedSpecimens = currentSpecimens.filter((_, idx) => idx !== specIndex)
    const updatedSieves = currentSieves.map((s) => {
      if (Array.isArray(s.weights)) {
        const weights = s.weights.filter((_, idx) => idx !== specIndex)
        const avg = weights.reduce((a, b) => a + Number(b || 0), 0) / weights.length
        return { ...s, weights, weight: Number(avg.toFixed(1)) }
      }
      return s
    })
    handleInputChange('specimens', updatedSpecimens)
    handleInputChange('sieves', updatedSieves)
  }

  // Data sampel dinamis untuk modul Uji Titik Nyala & Titik Bakar (Bahan Perkerasan Bab 5)`;

if (!code.includes('handleMultiSampleChange')) {
  code = code.replace(targetHandlers, multiSampleHandlers);
}

// 4. Update DynamicSieveTable call to pass specimen props
const oldSieveCall = `            {/* Dynamic Sieve Table (Agregat Kasar Bab 2 & Agregat Halus Bab 1) */}
            {testConfig.hasDynamicSieveTable && (
              <DynamicSieveTable
                sieves={currentSieves}
                isCoarse={Boolean(testConfig.isCoarse)}
                onSieveChange={handleSieveChange}
                onAddSieve={handleAddSieve}
                onRemoveSieve={handleRemoveSieve}
                sieveAlert={sieveAlert}
                onKeyDown={handleKeyDown}
              />
            )}`;

const newSieveCall = `            {/* Dynamic Sieve Table (Agregat Kasar Bab 2 & Agregat Halus Bab 1) */}
            {testConfig.hasDynamicSieveTable && (
              <DynamicSieveTable
                sieves={currentSieves}
                isCoarse={Boolean(testConfig.isCoarse)}
                onSieveChange={handleSieveChange}
                onAddSieve={handleAddSieve}
                onRemoveSieve={handleRemoveSieve}
                sieveAlert={sieveAlert}
                onKeyDown={handleKeyDown}
                specimens={currentSpecimens}
                onSpecimenAdd={handleAddSpecimen}
                onSpecimenRemove={handleRemoveSpecimen}
                onSieveWeightChange={handleSieveWeightChange}
              />
            )}`;

if (code.includes(oldSieveCall)) {
  code = code.replace(oldSieveCall, newSieveCall);
}

// 5. Add DynamicMultiSampleSection to switch
const branchFlash = `      ) : testConfig.hasDynamicFlashSamples ? (`
const branchMulti = `      ) : testConfig.hasMultiSample ? (
        <DynamicMultiSampleSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentMultiSamples={currentMultiSamples}
          onSampleChange={handleMultiSampleChange}
          onAddSample={handleAddMultiSample}
          onRemoveSample={handleRemoveMultiSample}
          onResetSamples={handleResetMultiSamples}
          onInputChange={handleInputChange}
          isInputInvalid={isInputInvalid}
          hasNegativeInput={hasNegativeInput}
          hasExceededInput={hasExceededInput}
          onSave={handleSave}
          onBack={onBackToDashboard}
          savedNotification={savedNotification}
          lastSavedId={lastSavedId}
          getVerdictClass={getVerdictClass}
          getVerdictLabel={getVerdictLabel}
          handleKeyDown={handleKeyDown}
        />
      ) : testConfig.hasDynamicFlashSamples ? (`

if (!code.includes('DynamicMultiSampleSection')) {
  code = code.replace(branchFlash, branchMulti);
}

// 6. In standard calc-output-column, render recapTable
const targetRecap = `            {/* Kotak Tahapan Rumus */}`;
const addRecap = `            {/* Tabel Rekapitulasi Perbandingan Sampel (Format Laporan Praktikum) */}
            {calcOutput.recapTable && (
              <div className="calc-recap-table-box" style={{ marginTop: '1.25rem', marginBottom: '1.25rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>📋</span>
                    <span>{calcOutput.recapTable.title || 'Tabel Rekapitulasi Perbandingan Benda Uji'}</span>
                  </h4>
                  <span style={{ fontSize: '0.75rem', background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                    Format Standar Laprak
                  </span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="calc-custom-input-table" style={{ width: '100%', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC' }}>
                        {calcOutput.recapTable.headers.map((h, hIdx) => {
                          const isLast = hIdx === calcOutput.recapTable.headers.length - 1
                          return (
                            <th 
                              key={hIdx} 
                              style={{ 
                                textAlign: hIdx === 0 || hIdx === 1 ? 'left' : 'right',
                                padding: '8px 10px',
                                borderBottom: '2px solid #CBD5E1',
                                background: isLast ? '#EFF6FF' : undefined,
                                color: isLast ? '#1D4ED8' : '#334155',
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {h}
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {calcOutput.recapTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} style={{ background: row.highlight ? '#F0FDF4' : rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                          <td style={{ padding: '8px 10px', fontWeight: row.highlight ? 600 : 500, color: row.highlight ? '#15803D' : '#334155' }}>
                            {row.label}
                          </td>
                          <td style={{ padding: '8px 10px', color: '#64748B', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                            {row.equation}
                          </td>
                          {row.values.map((v, vIdx) => (
                            <td key={vIdx} style={{ padding: '8px 10px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                              {v}
                            </td>
                          ))}
                          <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, background: row.highlight ? '#DCFCE7' : '#EFF6FF', color: row.highlight ? '#166534' : '#1D4ED8', fontVariantNumeric: 'tabular-nums' }}>
                            {row.average}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Kotak Tahapan Rumus */}`;

if (!code.includes('calcOutput.recapTable &&') && code.includes(targetRecap)) {
  code = code.replace(targetRecap, addRecap);
}

fs.writeFileSync('src/TestCalculatorPanel.jsx', code, 'utf8');
console.log('Part 1 updates written to TestCalculatorPanel.jsx!');

