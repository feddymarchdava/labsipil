import fs from 'fs';

console.log('Writing apply-panel-part2.js...');

let code = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');

// 1. Enhanced DynamicSieveTable
const newDynamicSieveTable = `function DynamicSieveTable({
  sieves,
  isCoarse,
  onSieveChange,
  onAddSieve,
  onRemoveSieve,
  sieveAlert,
  onKeyDown,
  specimens = ['Benda Uji I', 'Benda Uji II', 'Benda Uji III'],
  onSpecimenAdd,
  onSpecimenRemove,
  onSieveWeightChange,
}) {
  const nonPanCount = sieves.filter((s) => !s.isPan).length
  const isMultiSpecimen = Array.isArray(specimens) && specimens.length > 0 && typeof onSieveWeightChange === 'function'

  // Hitung total massa per spesimen atau single
  const specimenTotals = isMultiSpecimen
    ? specimens.map((_, k) =>
        sieves.reduce((sum, s) => {
          const w = Array.isArray(s.weights) ? Number(s.weights[k] ?? 0) : Number(s.weight ?? 0)
          return sum + (w > 0 ? w : 0)
        }, 0)
      )
    : [sieves.reduce((sum, s) => sum + (s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0), 0)]

  const avgTotalWeight = specimenTotals.reduce((a, b) => a + b, 0) / (specimenTotals.length || 1)

  return (
    <div className="calc-dynamic-table-wrap calc-sieve-table-wrap">
      {/* Alert Error jika user mencoba menghapus seluruh saringan */}
      {sieveAlert && (
        <div className="calc-negative-alert-box" style={{ marginBottom: '1rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div className="calc-negative-alert-content">
            <strong className="calc-negative-alert-title">Tidak dapat menghapus saringan</strong>
            <p className="calc-negative-alert-desc">{sieveAlert}</p>
          </div>
        </div>
      )}

      <div className="calc-table-header-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h4 className="calc-table-title">
            Tabel Fraksi Saringan Agregat {isCoarse ? 'Kasar' : 'Halus'}
          </h4>
          <p className="calc-table-hint">
            Tentukan ukuran saringan (mm) dan massa tertahan (gram). Mendukung multi-benda uji (Benda Uji I, II, III) sesuai laporan praktikum.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {isMultiSpecimen && onSpecimenAdd && (
            <button
              type="button"
              className="btn-add-table-row"
              onClick={onSpecimenAdd}
              style={{ background: '#0284C7', color: '#fff', border: 'none', padding: '0.45rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              title="Tambah kolom benda uji baru (misal Benda Uji IV)"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Tambah Benda Uji</span>
            </button>
          )}
          <button
            type="button"
            className="btn-add-table-row"
            onClick={onAddSieve}
            title="Tambah ukuran saringan baru"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Tambah Saringan</span>
          </button>
        </div>
      </div>

      <div className="calc-table-responsive" style={{ overflowX: 'auto' }}>
        <table className="calc-custom-input-table">
          <thead>
            <tr>
              <th style={{ width: '45px', textAlign: 'center' }}>No.</th>
              <th style={{ minWidth: '160px' }}>Label Saringan (Standar SNI)</th>
              <th style={{ width: '100px', minWidth: '90px' }}>
                Ukuran <span className="th-unit">mm</span>
              </th>
              {isMultiSpecimen ? (
                <>
                  {specimens.map((name, k) => (
                    <th key={k} style={{ minWidth: '115px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <span>{name} <span className="th-unit">g</span></span>
                        {specimens.length > 1 && onSpecimenRemove && (
                          <button
                            type="button"
                            onClick={() => onSpecimenRemove(k)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px', display: 'inline-flex' }}
                            title={\`Hapus kolom \${name}\`}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  <th style={{ minWidth: '95px', textAlign: 'right', background: '#EFF6FF', color: '#1D4ED8' }}>
                    Rata-rata <span className="th-unit">g</span>
                  </th>
                </>
              ) : (
                <th style={{ width: '140px', minWidth: '130px' }}>
                  Berat Tertahan <span className="th-unit">gram</span>
                </th>
              )}
              <th style={{ width: '50px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sieves.map((sieve, index) => {
              const isPan = Boolean(sieve.isPan)
              const matchedPreset = STANDARD_SIEVE_PRESETS.find(
                (p) => p.label === sieve.label || Math.abs(p.size - Number(sieve.size)) < 0.01
              )

              const weightsList = Array.isArray(sieve.weights)
                ? sieve.weights
                : (isMultiSpecimen ? specimens.map(() => sieve.weight || 0) : [sieve.weight || 0])
              const rowAvgWeight = weightsList.length > 0
                ? weightsList.reduce((a, b) => a + Number(b || 0), 0) / weightsList.length
                : 0

              return (
                <tr key={sieve.id || index} className={isPan ? 'sieve-pan-row' : ''}>
                  <td style={{ textAlign: 'center' }}>
                    <span className={\`point-badge \${isPan ? 'point-badge-pan' : ''}\`}>
                      {isPan ? 'Pan' : \`#\${index + 1}\`}
                    </span>
                  </td>
                  <td>
                    {isPan ? (
                      <div className="sieve-pan-label-wrap">
                        <strong className="sieve-pan-title">Pan Penampung (Dasar)</strong>
                        <span className="sieve-pan-subtitle">Fraksi butiran paling halus</span>
                      </div>
                    ) : (
                      <div className="sieve-label-select-wrap">
                        <select
                          className="calc-sieve-preset-select"
                          value={matchedPreset ? matchedPreset.label : 'custom'}
                          onChange={(e) => {
                            const chosenVal = e.target.value
                            const chosenPreset = STANDARD_SIEVE_PRESETS.find((p) => p.label === chosenVal)
                            if (chosenPreset) {
                              onSieveChange(index, {
                                label: chosenPreset.label,
                                size: chosenPreset.size,
                              })
                            }
                          }}
                          title="Pilih ukuran standar ASTM / SNI"
                        >
                          {!matchedPreset && (
                            <option value="custom">
                              {sieve.label || \`Kustom (\${sieve.size} mm)\`}
                            </option>
                          )}
                          {STANDARD_SIEVE_PRESETS.map((p) => (
                            <option key={p.label} value={p.label}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </td>
                  <td>
                    {isPan ? (
                      <div className="sieve-pan-size-text">- Dasar -</div>
                    ) : (
                      <div className="calc-table-input-cell">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          placeholder="mm"
                          className="calc-table-numeric-input"
                          value={sieve.size !== undefined ? sieve.size : ''}
                          onKeyDown={(e) => onKeyDown(e, 'size')}
                          onChange={(e) => {
                            const val = e.target.value
                            const numVal = val === '' ? '' : parseFloat(val) || 0
                            const matched = STANDARD_SIEVE_PRESETS.find((p) => Math.abs(p.size - numVal) < 0.01)
                            onSieveChange(index, {
                              size: numVal,
                              label: matched ? matched.label : (val === '' ? '' : \`\${val} mm\`),
                            })
                          }}
                        />
                        <span className="calc-table-cell-unit">mm</span>
                      </div>
                    )}
                  </td>
                  {isMultiSpecimen ? (
                    <>
                      {specimens.map((name, k) => {
                        const curW = weightsList[k] !== undefined ? weightsList[k] : ''
                        return (
                          <td key={k}>
                            <div className="calc-table-input-cell">
                              <input
                                type="number"
                                min="0"
                                step="any"
                                placeholder="0.0"
                                className="calc-table-numeric-input"
                                value={curW}
                                onKeyDown={(e) => onKeyDown(e, \`weight_\${k}\`)}
                                onChange={(e) => {
                                  onSieveWeightChange(index, k, e.target.value)
                                }}
                                style={{ textAlign: 'right' }}
                              />
                            </div>
                          </td>
                        )
                      })}
                      <td style={{ textAlign: 'right', fontWeight: 600, background: '#EFF6FF', color: '#1D4ED8', fontVariantNumeric: 'tabular-nums' }}>
                        {rowAvgWeight.toFixed(1)} g
                      </td>
                    </>
                  ) : (
                    <td>
                      <div className="calc-table-input-cell">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          placeholder="0.0"
                          className="calc-table-numeric-input"
                          value={sieve.weight !== undefined ? sieve.weight : ''}
                          onKeyDown={(e) => onKeyDown(e, 'weight')}
                          onChange={(e) => {
                            const val = e.target.value
                            onSieveChange(index, 'weight', val === '' ? '' : Math.max(0, parseFloat(val) || 0))
                          }}
                        />
                        <span className="calc-table-cell-unit">gram</span>
                      </div>
                    </td>
                  )}
                  <td style={{ textAlign: 'center' }}>
                    {isPan ? (
                      <span className="sieve-pan-lock-icon" title="Pan penampung permanen">
                        🔒
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn-remove-table-row"
                        onClick={() => onRemoveSieve(index)}
                        title="Hapus baris saringan ini"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
          {isMultiSpecimen && (
            <tfoot>
              <tr style={{ background: '#F1F5F9', fontWeight: 600, borderTop: '2px solid #CBD5E1' }}>
                <td colSpan={3} style={{ textAlign: 'right', padding: '8px 10px', color: '#1E293B' }}>
                  Total Massa (ΣW):
                </td>
                {specimens.map((_, k) => (
                  <td key={k} style={{ textAlign: 'right', padding: '8px 10px', color: '#0369A1', fontVariantNumeric: 'tabular-nums' }}>
                    {(specimenTotals[k] || 0).toFixed(1)} g
                  </td>
                ))}
                <td style={{ textAlign: 'right', padding: '8px 10px', color: '#1D4ED8', background: '#DBEAFE', fontVariantNumeric: 'tabular-nums' }}>
                  {avgTotalWeight.toFixed(1)} g
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Sieve Table Footer Summary */}
      <div className="calc-sieve-table-footer">
        <span className="sieve-summary-badge">
          Total Baris: <strong>{nonPanCount} Saringan + 1 Pan</strong>
        </span>
        <span className="sieve-total-mass-badge">
          Rata-rata Massa Benda Uji (ΣW): <strong>{avgTotalWeight.toFixed(1)} gram</strong>
        </span>
      </div>
    </div>
  )
}`;

// Replace DynamicSieveTable function
const sieveStartMarker = 'function DynamicSieveTable({';
const sieveEndMarker = '// Custom Tooltip Recharts yang elegan dan responsif';
const idxSieveStart = code.indexOf(sieveStartMarker);
const idxSieveEnd = code.indexOf(sieveEndMarker);

if (idxSieveStart === -1 || idxSieveEnd === -1) {
  throw new Error('Sieve markers not found!');
}

code = code.slice(0, idxSieveStart) + newDynamicSieveTable + '\n\n' + code.slice(idxSieveEnd);

// 2. Add DynamicMultiSampleSection component before DynamicFlashPointSection
const dynamicMultiSectionCode = `// =========================================================================
// SECTION DINAMIS: MULTI-SAMPEL AGREGAT HALUS & KASAR (BAB 1 & BAB 2)
// =========================================================================
function DynamicMultiSampleSection({
  testConfig,
  inputs,
  calcOutput,
  currentMultiSamples,
  onSampleChange,
  onAddSample,
  onRemoveSample,
  onResetSamples,
  onInputChange,
  isInputInvalid,
  hasNegativeInput,
  hasExceededInput,
  onSave,
  onBack,
  savedNotification,
  lastSavedId,
  getVerdictClass,
  getVerdictLabel,
  handleKeyDown,
}) {
  const [showFormulaSteps, setShowFormulaSteps] = useState(true)
  const formulaSteps = calcOutput.formulaSteps || []
  const recapTable = calcOutput.recapTable || null
  const totalCount = currentMultiSamples.length
  const isZeroSamples = totalCount === 0

  // Common inputs if any
  const commonFields = testConfig.commonFields || []

  // Sample fields
  const sampleFields = testConfig.sampleFields || []

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Box */}
      <div className="calc-header-box" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span className="calc-badge-code" style={{ background: '#0284C7', color: '#fff', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {testConfig.code}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>
                {testConfig.standard}
              </span>
              <span style={{ fontSize: '0.75rem', background: '#E0F2FE', color: '#0369A1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                Multi-Sampel Dinamis
              </span>
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>
              {testConfig.name}
            </h1>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#475569', maxWidth: '850px', lineHeight: 1.5 }}>
              {testConfig.desc}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={\`calc-verdict-badge \${getVerdictClass(calcOutput.verdictClass)}\`}>
              {getVerdictLabel(calcOutput.status)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grid 4 Kartu Bento Output Pengujian (Highlight Rata-rata) */}
      <div className="calc-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {calcOutput.results.slice(0, 4).map((res, idx) => {
          const borders = ['#0284C7', '#10B981', '#6366F1', '#F59E0B']
          const borderCol = borders[idx % borders.length]
          return (
            <div 
              key={idx} 
              className={\`calc-bento-card \${res.highlight ? 'highlight' : ''}\`}
              style={{ borderLeft: \`4px solid \${borderCol}\` }}
            >
              <div className="calc-bento-label">{res.label}</div>
              <div className="calc-bento-value" style={{ color: isZeroSamples ? '#DC2626' : borderCol, fontSize: isZeroSamples ? '1.2rem' : '1.35rem' }}>
                {formatScientificInText(res.value)} {res.unit ? <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#64748B' }}>{res.unit}</span> : null}
              </div>
              <div className="calc-bento-sub">
                {res.sub || (isZeroSamples ? 'Tambahkan minimal 1 sampel pengujian' : 'Rata-rata dari seluruh sampel')}
              </div>
            </div>
          )
        })}
      </div>

      {/* 3. Two-Column Layout */}
      <div className="calc-grid-layout">
        {/* Kolom Kiri: Parameter Input & Tabel Sampel Dinamis */}
        <div className="calc-input-column">
          {/* Parameter Acuan / Umum jika ada */}
          {commonFields.length > 0 && (
            <div className="calc-card-box" style={{ marginBottom: '1rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
              <div className="calc-card-header" style={{ marginBottom: '1rem' }}>
                <div className="calc-card-header-icon">
                  <Info size={18} />
                </div>
                <div>
                  <h3 className="calc-card-title">Parameter Acuan & Wadah Takaran</h3>
                  <span className="calc-card-subtitle">Konstanta dan kalibrasi bejana pengujian:</span>
                </div>
              </div>
              <div className="calc-fields-stack" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {commonFields.map((field) => (
                  <div key={field.key} className="calc-input-field-group">
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                      {field.label} {field.unit && <span style={{ color: '#64748B', fontWeight: 400 }}>({field.unit})</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        className="calc-select-field"
                        value={inputs[field.key] !== undefined ? inputs[field.key] : ''}
                        onChange={(e) => onInputChange(field.key, Number(e.target.value) || e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="calc-input-with-unit" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="number"
                          step={field.step || 'any'}
                          min={field.min ?? 0}
                          className="calc-input-field"
                          value={inputs[field.key] !== undefined ? inputs[field.key] : ''}
                          onChange={(e) => onInputChange(field.key, e.target.value === '' ? '' : Number(e.target.value))}
                          onKeyDown={(e) => handleKeyDown(e, field.key)}
                          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                        />
                        {field.unit && <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>{field.unit}</span>}
                      </div>
                    )}
                    {field.desc && (
                      <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem', display: 'block' }}>
                        {field.desc}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daftar Benda Uji Dinamis */}
          <div className="calc-card-box" style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Daftar Benda Uji / Sampel Pengujian</span>
                  <span style={{ fontSize: '0.75rem', background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                    {totalCount} Benda Uji
                  </span>
                </h3>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                  Ketik nilai penimbangan tiap sampel. Hasil per sampel dan rata-rata terupdate otomatis.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onResetSamples}
                  className="btn-reset-inputs"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', padding: '0.45rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}
                  title="Kembalikan data sampel ke default laporan praktikum"
                >
                  <RotateCcw size={14} />
                  <span>Reset Laprak</span>
                </button>
                <button
                  type="button"
                  onClick={onAddSample}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#0284C7', color: '#fff', border: 'none', padding: '0.45rem 0.85rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
                  title="Tambah baris sampel / cetakan baru"
                >
                  <Plus size={15} />
                  <span>Tambah Sampel</span>
                </button>
              </div>
            </div>

            {/* Tabel Baris Sampel Dinamis */}
            <div className="calc-table-responsive" style={{ overflowX: 'auto' }}>
              <table className="calc-custom-input-table" style={{ width: '100%', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    <th style={{ width: '110px', textAlign: 'center', padding: '8px 10px' }}>Benda Uji</th>
                    {sampleFields.map((f) => (
                      <th key={f.key} style={{ minWidth: '110px', padding: '8px 10px' }}>
                        {f.label} {f.unit && <span className="th-unit">{f.unit}</span>}
                      </th>
                    ))}
                    <th style={{ width: '50px', textAlign: 'center', padding: '8px 10px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMultiSamples.map((sample, idx) => (
                    <tr key={sample.id || idx}>
                      <td style={{ textAlign: 'center', padding: '6px 8px' }}>
                        <span className="point-badge" style={{ fontWeight: 600, fontSize: '0.8rem', background: '#EFF6FF', color: '#1D4ED8', padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                          {sample.name || \`Sampel \${idx + 1}\`}
                        </span>
                      </td>
                      {sampleFields.map((f) => (
                        <td key={f.key} style={{ padding: '6px 8px' }}>
                          <div className="calc-table-input-cell" style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                              type="number"
                              step={f.step || 'any'}
                              min={f.min ?? 0}
                              className="calc-table-numeric-input"
                              value={sample[f.key] !== undefined ? sample[f.key] : ''}
                              onChange={(e) => onSampleChange(sample.id, f.key, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, f.key)}
                              placeholder="0.0"
                              style={{ width: '100%', padding: '4px 6px', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #CBD5E1', textAlign: 'right' }}
                            />
                            {f.unit && <span className="calc-table-cell-unit" style={{ marginLeft: '4px', fontSize: '0.75rem', color: '#64748B' }}>{f.unit}</span>}
                          </div>
                        </td>
                      ))}
                      <td style={{ textAlign: 'center', padding: '6px 8px' }}>
                        <button
                          type="button"
                          className="btn-remove-table-row"
                          onClick={() => onRemoveSample(sample.id)}
                          disabled={totalCount <= 1}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: totalCount <= 1 ? '#CBD5E1' : '#EF4444',
                            cursor: totalCount <= 1 ? 'not-allowed' : 'pointer',
                            padding: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title={totalCount <= 1 ? 'Minimal 1 sampel pengujian aktif' : 'Hapus baris sampel ini'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Footer Rata-rata Input */}
                {totalCount > 1 && (
                  <tfoot>
                    <tr style={{ background: '#F1F5F9', fontWeight: 600, borderTop: '2px solid #CBD5E1' }}>
                      <td style={{ textAlign: 'center', padding: '6px 8px', color: '#1E293B' }}>
                        Rata-rata Input
                      </td>
                      {sampleFields.map((f) => {
                        const vals = currentMultiSamples.map(s => Number(s[f.key] ?? 0)).filter(v => v > 0)
                        const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
                        return (
                          <td key={f.key} style={{ textAlign: 'right', padding: '6px 8px', color: '#0369A1' }}>
                            {avg.toFixed(1)} {f.unit}
                          </td>
                        )
                      })}
                      <td style={{ textAlign: 'center', padding: '6px 8px', color: '#64748B' }}>
                        -
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Rekapitulasi Laporan, Langkah Rumus & Verdict */}
        <div className="calc-output-column">
          {/* Tabel Rekapitulasi Perbandingan Benda Uji */}
          {recapTable && (
            <div className="calc-card-box" style={{ marginBottom: '1.25rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>📋</span>
                  <span>{recapTable.title || 'Tabel Rekapitulasi Perbandingan Benda Uji'}</span>
                </h3>
                <span style={{ fontSize: '0.75rem', background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                  Format Laprak Resmi
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="calc-custom-input-table" style={{ width: '100%', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC' }}>
                      {recapTable.headers.map((h, hIdx) => {
                        const isLast = hIdx === recapTable.headers.length - 1
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
                    {recapTable.rows.map((row, rIdx) => (
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

          {/* Kotak Langkah Rumus Perhitungan */}
          {formulaSteps.length > 0 && (
            <div className="calc-card-box" style={{ marginBottom: '1.25rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
              <div 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setShowFormulaSteps(!showFormulaSteps)}
              >
                <span className="calc-formula-kicker" style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0369A1' }}>
                  LANGKAH RUMUS PERHITUNGAN ({formulaSteps.length} Langkah):
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  {showFormulaSteps ? 'Sembunyikan ▲' : 'Tampilkan ▼'}
                </span>
              </div>
              {showFormulaSteps && (
                <ul className="calc-formula-steps-list" style={{ margin: '0.75rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.825rem', lineHeight: 1.6, color: '#334155' }}>
                  {formulaSteps.map((step, sIdx) => (
                    <li key={sIdx} style={{ marginBottom: '0.35rem' }}>
                      {formatScientificInText(step)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Kotak Kesimpulan & Evaluasi Standar SNI */}
          <div className={\`calc-verdict-box \${getVerdictClass(calcOutput.verdictClass)}\`} style={{ marginBottom: '1.25rem' }}>
            <div className="calc-verdict-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="calc-verdict-status-pill">
                {getVerdictLabel(calcOutput.status)}
              </span>
              <span className="calc-verdict-rule">{testConfig.standard}</span>
            </div>
            <p className="calc-verdict-text" style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>
              {formatScientificInText(calcOutput.conclusion)}
            </p>
          </div>

          {/* Alert Error jika ada input minus */}
          {hasNegativeInput && (
            <div className="calc-negative-alert-box" style={{ marginBottom: '1rem' }}>
              <AlertTriangle size={18} />
              <span>Input tidak boleh bernilai negatif. Harap perbaiki angka penimbangan.</span>
            </div>
          )}

          {/* Notifikasi Sukses Simpan */}
          {savedNotification && (
            <div className="calc-save-banner" style={{ marginBottom: '1rem' }}>
              <div className="calc-save-banner-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={18} />
                <span>Data pengujian <strong>{lastSavedId || testConfig.code}</strong> berhasil disimpan ke Dashboard!</span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="calc-actions-footer" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-save-to-dashboard"
              onClick={onSave}
              disabled={isInputInvalid || hasNegativeInput}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#059669', color: '#fff', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '6px', cursor: (isInputInvalid || hasNegativeInput) ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
            >
              <Save size={16} />
              <span>Simpan Hasil ke Dashboard</span>
            </button>
            <button
              type="button"
              className="btn-open-table-direct"
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', color: '#334155', border: '1px solid #CBD5E1', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}
            >
              <ArrowLeft size={16} />
              <span>Ke Dashboard Utama</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
`;

const flashSectionMarker = 'function DynamicFlashPointSection';
const idxFlash = code.indexOf(flashSectionMarker);
if (idxFlash === -1) {
  throw new Error('Flash marker not found!');
}

if (!code.includes('function DynamicMultiSampleSection')) {
  code = code.slice(0, idxFlash) + dynamicMultiSectionCode + '\n\n' + code.slice(idxFlash);
}

fs.writeFileSync('src/TestCalculatorPanel.jsx', code, 'utf8');
console.log('Part 2 updates written to TestCalculatorPanel.jsx!');

