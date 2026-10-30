import { useState, useMemo } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts'
import { formatScientificInText } from './testCalculatorsData'

export default function TestCalculatorPanel({ 
  testConfig, 
  currentInputs,
  onInputChange,
  onResetInputs,
  onSaveToDashboard, 
  onBackToDashboard 
}) {
  const inputs = currentInputs || testConfig.initialInputs
  const [savedNotification, setSavedNotification] = useState(false)
  const [lastSavedId, setLastSavedId] = useState(null)
  const [sieveAlert, setSieveAlert] = useState(null)

  // Daftar seluruh field yang aktif sesuai konfigurasi atau metode yang dipilih
  const allFields = typeof testConfig.getFields === 'function'
    ? testConfig.getFields(inputs)
    : (Array.isArray(testConfig.fields) ? testConfig.fields : [])

  const handleInputChange = (fieldKey, rawValue) => {
    // Jika field readOnly atau disabled, abaikan perubahan
    const fieldDef = allFields.find((f) => f.key === fieldKey)
    if (fieldDef && (fieldDef.readOnly || fieldDef.disabled)) {
      return
    }

    let sanitized = rawValue
    if (typeof sanitized === 'string') {
      // Khusus field skala organik, tidak boleh ada nilai desimal
      if (fieldKey === 'organikScale') {
        if (sanitized.includes('.')) {
          sanitized = sanitized.split('.')[0]
        }
        if (sanitized.includes(',')) {
          sanitized = sanitized.split(',')[0]
        }
      }
    }

    if (onInputChange) {
      onInputChange(fieldKey, sanitized)
    }
    setSavedNotification(false)
  }

  const handleUnitChange = (fieldDef, newUnit) => {
    const unitKey = fieldDef.unitKey || `${fieldDef.key}Unit`
    const prevUnit = inputs[unitKey] || (fieldDef.unitOptions ? fieldDef.unitOptions[0].value : 'liter')

    if (onInputChange) {
      onInputChange(unitKey, newUnit)
    }

    // Konversi nilai volume jika pengguna beralih satuan antara liter dan m³
    if (fieldDef.key === 'vol' && prevUnit !== newUnit) {
      const rawVal = inputs[fieldDef.key]
      const numVal = Number(rawVal)
      if (!isNaN(numVal) && numVal > 0) {
        if (prevUnit === 'liter' && newUnit === 'm3') {
          // Jika nilai saat ini >= 0.05, berarti ditulis dalam liter -> konversi ke m³ (dibagi 1000)
          if (numVal >= 0.05) {
            const converted = +(numVal / 1000).toPrecision(6)
            if (onInputChange) {
              onInputChange(fieldDef.key, converted)
            }
          }
        } else if (prevUnit === 'm3' && newUnit === 'liter') {
          // Jika nilai saat ini < 50, berarti ditulis dalam m³ -> konversi ke liter (dikali 1000)
          if (numVal < 50) {
            const converted = +(numVal * 1000).toPrecision(6)
            if (onInputChange) {
              onInputChange(fieldDef.key, converted)
            }
          }
        }
      }
    }

    // Konversi nilai tinggi alat (A) dan tinggi beton (B) jika pengguna beralih satuan antara cm dan mm
    if ((fieldDef.key === 'tinggiA' || fieldDef.key === 'tinggiB' || unitKey === 'slumpUnit') && prevUnit !== newUnit) {
      const rawA = inputs.tinggiA !== undefined ? inputs.tinggiA : inputs.hCetakan
      const rawB = inputs.tinggiB !== undefined ? inputs.tinggiB : inputs.hBeton
      const numA = Number(rawA)
      const numB = Number(rawB)

      if (prevUnit === 'cm' && newUnit === 'mm') {
        if (!isNaN(numA) && numA > 0) {
          onInputChange('tinggiA', +(numA * 10).toFixed(1))
        }
        if (!isNaN(numB) && numB >= 0) {
          onInputChange('tinggiB', +(numB * 10).toFixed(1))
        }
      } else if (prevUnit === 'mm' && newUnit === 'cm') {
        if (!isNaN(numA) && numA > 0) {
          onInputChange('tinggiA', +(numA / 10).toFixed(1))
        }
        if (!isNaN(numB) && numB >= 0) {
          onInputChange('tinggiB', +(numB / 10).toFixed(1))
        }
      }
    }

    // Konversi nilai dimensi kayu (Panjang, Lebar, Tebal) jika pengguna beralih satuan antara cm dan mm
    if ((fieldDef.key === 'panjang' || fieldDef.key === 'lebar' || fieldDef.key === 'tebal' || unitKey === 'dimUnit') && prevUnit !== newUnit) {
      const p = Number(inputs.panjang)
      const l = Number(inputs.lebar)
      const t = Number(inputs.tebal)

      if (prevUnit === 'cm' && newUnit === 'mm') {
        if (!isNaN(p) && p > 0) onInputChange('panjang', +(p * 10).toFixed(2))
        if (!isNaN(l) && l > 0) onInputChange('lebar', +(l * 10).toFixed(2))
        if (!isNaN(t) && t > 0) onInputChange('tebal', +(t * 10).toFixed(2))
      } else if (prevUnit === 'mm' && newUnit === 'cm') {
        if (!isNaN(p) && p > 0) onInputChange('panjang', +(p / 10).toFixed(2))
        if (!isNaN(l) && l > 0) onInputChange('lebar', +(l / 10).toFixed(2))
        if (!isNaN(t) && t > 0) onInputChange('tebal', +(t / 10).toFixed(2))
      }
    }

    // Konversi nilai dimensi/panjang baja (diameter, pjgAwal, pjgPutus) jika beralih satuan mm, cm, m
    if ((fieldDef.key === 'diameter' || fieldDef.key === 'pjgAwal' || fieldDef.key === 'pjgPutus') && prevUnit !== newUnit) {
      const rawVal = inputs[fieldDef.key]
      const numVal = Number(rawVal)
      if (!isNaN(numVal) && numVal > 0) {
        const factorToMm = { mm: 1, cm: 10, m: 1000 }
        const factorFromMm = { mm: 1, cm: 0.1, m: 0.001 }
        const valInMm = numVal * (factorToMm[prevUnit] || 1)
        const converted = +(valInMm * (factorFromMm[newUnit] || 1)).toPrecision(6)
        if (onInputChange) {
          onInputChange(fieldDef.key, converted)
        }
      }
    }

    // Konversi nilai beban baja (bebanLeleh, bebanPutus) jika beralih satuan kN dan N
    if ((fieldDef.key === 'bebanLeleh' || fieldDef.key === 'bebanPutus') && prevUnit !== newUnit) {
      const rawVal = inputs[fieldDef.key]
      const numVal = Number(rawVal)
      if (!isNaN(numVal) && numVal > 0) {
        if (prevUnit === 'kN' && newUnit === 'N') {
          onInputChange(fieldDef.key, +(numVal * 1000).toFixed(1))
        } else if (prevUnit === 'N' && newUnit === 'kN') {
          onInputChange(fieldDef.key, +(numVal / 1000).toFixed(4))
        }
      }
    }
    setSavedNotification(false)
  }

  const handleKeyDown = (e, fieldKey) => {
    // Blokir pengetikan titik / koma desimal pada skala organik
    if (fieldKey === 'organikScale' && (e.key === '.' || e.key === ',')) {
      e.preventDefault()
    }
    // Cegah input pengetikan minus (-) pada seluruh parameter fisik laboratorium
    if (e.key === '-' || e.key === 'Subtract') {
      e.preventDefault()
    }
  }

  const handleResetInputs = () => {
    if (onResetInputs) {
      onResetInputs()
    }
    setSavedNotification(false)
  }

  // Deteksi jika user memasukkan angka minus pada input biasa
  const negativeFields = allFields.filter((field) => {
    const val = inputs[field.key]
    if (val === undefined || val === null || val === '') return false
    if (typeof val === 'number') return val < 0
    if (typeof val === 'string') {
      const trimmed = val.trim()
      return trimmed.startsWith('-') || (Number(trimmed) < 0 && !isNaN(Number(trimmed)))
    }
    return false
  })

  // Deteksi jika user memasukkan angka melebihi batas maksimum (misal Fines > 100%)
  const exceededFields = allFields.filter((field) => {
    if (field.max === undefined) return false
    const val = inputs[field.key]
    if (val === undefined || val === null || val === '') return false
    const num = Number(val)
    return !isNaN(num) && num > field.max
  })

  // Deteksi jika user memasukkan angka minus pada tabel pasangan data (misal Direct Shear)
  const hasNegativeTableInput = Boolean(
    testConfig.hasDynamicTable &&
    Array.isArray(inputs.points) &&
    inputs.points.some((p) => {
      const s = String(p.sigma !== undefined ? p.sigma : '').trim()
      const t = String(p.tau !== undefined ? p.tau : '').trim()
      return s.startsWith('-') || t.startsWith('-') || (Number(s) < 0 && !isNaN(Number(s))) || (Number(t) < 0 && !isNaN(Number(t)))
    })
  )

  // Deteksi jika user memasukkan angka minus pada tabel saringan dinamis (Agregat Kasar & Halus)
  const hasNegativeSieveInput = Boolean(
    testConfig.hasDynamicSieveTable &&
    Array.isArray(inputs.sieves) &&
    inputs.sieves.some((s) => {
      const w = String(s.weight !== undefined ? s.weight : '').trim()
      const sz = String(s.size !== undefined ? s.size : '').trim()
      return w.startsWith('-') || sz.startsWith('-') || (Number(w) < 0 && !isNaN(Number(w))) || (Number(sz) < 0 && !isNaN(Number(sz)))
    })
  )

  const hasNegativeInput = negativeFields.length > 0 || hasNegativeTableInput || hasNegativeSieveInput
  const hasExceededInput = exceededFields.length > 0

  // Data titik dinamis untuk modul tabel (Direct Shear)
  const currentPoints = testConfig.hasDynamicTable
    ? (Array.isArray(inputs.points) ? inputs.points : (testConfig.initialInputs?.points || []))
    : []

  const handlePointChange = (index, key, val) => {
    const updated = currentPoints.map((pt, idx) => {
      if (idx === index) {
        return { ...pt, [key]: val }
      }
      return pt
    })
    handleInputChange('points', updated)
  }

  const handleAddPoint = () => {
    const nextId = currentPoints.length > 0 
      ? Math.max(...currentPoints.map(p => Number(p.id) || 0)) + 1 
      : 1
    const lastPoint = currentPoints[currentPoints.length - 1]
    const nextSigma = lastPoint && Number(lastPoint.sigma) ? (Number(lastPoint.sigma) + 1.0).toFixed(2) : ''
    const updated = [
      ...currentPoints,
      { id: nextId, sigma: nextSigma, tau: '' },
    ]
    handleInputChange('points', updated)
  }

  const handleRemovePoint = (index) => {
    if (currentPoints.length <= 3) {
      return
    }
    const updated = currentPoints.filter((_, idx) => idx !== index)
    handleInputChange('points', updated)
  }

  // Data saringan dinamis untuk modul analisis gradasi (Agregat Kasar Bab 2 & Halus Bab 1)
  const currentSieves = testConfig.hasDynamicSieveTable
    ? (Array.isArray(inputs.sieves) && inputs.sieves.length > 0 ? inputs.sieves : (testConfig.initialInputs?.sieves || []))
    : []

  const handleSieveChange = (index, key, val) => {
    const updated = currentSieves.map((s, idx) => {
      if (idx === index) {
        return { ...s, [key]: val }
      }
      return s
    })
    handleInputChange('sieves', updated)
    if (sieveAlert) setSieveAlert(null)
  }

  const handleAddSieve = () => {
    const panIndex = currentSieves.findIndex((s) => s.isPan || Number(s.size) === 0 || String(s.label || '').toLowerCase().includes('pan'))
    const nextId = currentSieves.length > 0
      ? Math.max(...currentSieves.map((s) => Number(s.id) || 0)) + 1
      : 1
    const newSieve = {
      id: nextId,
      size: testConfig.isCoarse ? 10.0 : 0.5,
      label: testConfig.isCoarse ? 'Saringan Baru (10 mm)' : 'Saringan Baru (0.5 mm)',
      weight: 0,
    }
    let updated
    if (panIndex !== -1) {
      updated = [
        ...currentSieves.slice(0, panIndex),
        newSieve,
        ...currentSieves.slice(panIndex),
      ]
    } else {
      updated = [...currentSieves, newSieve]
    }
    handleInputChange('sieves', updated)
    if (sieveAlert) setSieveAlert(null)
  }

  const handleRemoveSieve = (index) => {
    const nonPanCount = currentSieves.filter((s) => !s.isPan && Number(s.size) > 0 && !String(s.label || '').toLowerCase().includes('pan')).length
    if (nonPanCount <= 1) {
      setSieveAlert('Minimal harus ada 1 ukuran saringan selain Pan Penampung! Tidak dapat menghapus seluruh saringan.')
      return
    }
    const updated = currentSieves.filter((_, idx) => idx !== index)
    handleInputChange('sieves', updated)
    setSieveAlert(null)
  }

  // Calculate live results
  const rawCalcOutput = testConfig.calculate(inputs)

  // Jika terdeteksi input minus atau melebihi batas max, kosongkan hasil perhitungan dan set alert error
  const calcOutput = hasNegativeInput
    ? {
        results: rawCalcOutput.results.map((res) => ({ ...res, value: '-' })),
        formulaSteps: [
          'Perhitungan dibatalkan: Terdeteksi input nilai negatif pada parameter pengujian.',
        ],
        isError: true,
        hasNegativeError: true,
        status: 'Input Tidak Wajar / Cek Kembali Data',
        conclusion: 'Nilai tidak boleh negatif. Harap periksa kembali input parameter pengujian.',
        summaryString: 'Nilai Tidak Boleh Negatif',
      }
    : hasExceededInput
    ? {
        results: rawCalcOutput.results.map((res) => ({ ...res, value: '-' })),
        formulaSteps: [
          'Perhitungan dibatalkan: Nilai persentase tidak boleh melebihi 100%.',
        ],
        isError: true,
        hasExceededError: true,
        status: 'Nilai Melebihi 100%',
        conclusion: 'Nilai persentase tidak boleh melebihi 100%. Harap periksa kembali input parameter pengujian.',
        summaryString: 'Nilai Persentase Melebihi 100%',
      }
    : rawCalcOutput

  const isInputInvalid = Boolean(
    hasNegativeInput ||
    hasExceededInput ||
    calcOutput.isError || 
    (calcOutput.status && 
      calcOutput.status.toLowerCase().includes('tidak wajar') && 
      !calcOutput.status.toLowerCase().startsWith('perlu evaluasi'))
  )

  const handleSave = () => {
    // Cegah submit jika data input tidak logis, ada angka minus, melebihi max, atau validasi gagal
    if (isInputInvalid || hasNegativeInput || hasExceededInput) {
      return
    }

    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const timeString = `Hari ini, ${hours}:${minutes} WIB`

    const newRecord = {
      testId: testConfig.id,
      codePrefix: testConfig.code ? testConfig.code.split('-')[0] : 'UJ',
      baseCode: testConfig.code,
      name: testConfig.name,
      lab: testConfig.lab,
      category: testConfig.category,
      standard: testConfig.standard,
      summary: calcOutput.summaryString,
      status: calcOutput.status,
      time: timeString,
      inputs: { ...inputs },
      notes: `${calcOutput.conclusion} | ${calcOutput.formulaSteps.join(' | ')}`,
    }

    const savedResult = onSaveToDashboard(newRecord)
    if (savedResult && savedResult.id) {
      setLastSavedId(savedResult.id)
    } else {
      setLastSavedId(testConfig.code)
    }
    setSavedNotification(true)
    setTimeout(() => {
      setSavedNotification(false)
    }, 5000)
  }

  const getVerdictClass = () => {
    if (isInputInvalid) return 'danger'
    if (calcOutput.verdictClass) return calcOutput.verdictClass
    if (calcOutput.status && (
      calcOutput.status.toLowerCase().includes('tidak memenuhi') ||
      (calcOutput.status.toLowerCase().includes('tidak wajar') && !calcOutput.status.toLowerCase().startsWith('perlu evaluasi')) ||
      calcOutput.status.toLowerCase().includes('tidak valid') ||
      calcOutput.status.toLowerCase().includes('error') ||
      calcOutput.status.toLowerCase().includes('gagal') ||
      calcOutput.status.toLowerCase() === 'turbulen'
    )) {
      return 'danger'
    }
    if (
      calcOutput.status === 'Valid' ||
      calcOutput.status === 'Baik' ||
      calcOutput.status === 'Laminer' ||
      (calcOutput.status && (calcOutput.status.startsWith('Memenuhi Standar') || calcOutput.status.toLowerCase().includes('laminer') || calcOutput.status.toLowerCase().includes('baik')))
    ) return 'valid'
    return 'review'
  }

  const getVerdictLabel = () => {
    if (calcOutput.verdictLabel) return calcOutput.verdictLabel
    if (calcOutput.status === 'Input tidak valid' || calcOutput.status === 'Input Tidak Valid') return '✕ Input tidak valid'
    if (calcOutput.status === 'Tidak Memenuhi Standar') return '✕ Tidak Memenuhi Standar'
    if (isInputInvalid) return '✕ Input tidak valid'
    if (calcOutput.status === 'Valid') return '✓ Memenuhi Standar'
    if (calcOutput.status === 'Baik') return '✓ Status: Baik (Akurasi Terkalibrasi)'
    if (calcOutput.status === 'Laminer') return '✓ Rezim Aliran: Laminer'
    if (calcOutput.status === 'Transisi') return '⚠ Rezim Aliran: Transisi'
    if (calcOutput.status === 'Turbulen') return '⚠ Rezim Aliran: Turbulen'
    if (calcOutput.status === 'Perlu Kalibrasi') return '⚠ Status: Perlu Kalibrasi'
    if (calcOutput.status && calcOutput.status.startsWith('Memenuhi Standar')) return `✓ ${calcOutput.status}`
    if (calcOutput.status && calcOutput.status.startsWith('Perlu Evaluasi')) return `⚠ ${calcOutput.status}`
    return `⚠ ${calcOutput.status || 'Perlu Evaluasi'}`
  }

  return (
    <div className="calc-panel-wrapper">
      {/* Header Pengujian */}
      <div className="calc-top-header">
        <div className="calc-top-actions">
          <button 
            type="button" 
            className="btn-back-to-dash" 
            onClick={onBackToDashboard}
            title="Kembali ke Dashboard Utama"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Kembali ke Dashboard Utama</span>
          </button>
        </div>

        <div className="calc-title-section">
          <div className="calc-badges-row">
            <span className="calc-badge-category">{testConfig.category}</span>
            <span className="calc-badge-standard">{testConfig.standard}</span>
            <span className="calc-badge-code">{testConfig.code}</span>
          </div>
          <h2 className="calc-main-title">{testConfig.name}</h2>
          <p className="calc-main-desc">{testConfig.desc}</p>
        </div>
      </div>

      {/* Main Grid: Input Form vs Results Panel */}
      <div className="calc-grid-layout">
        {/* Kolom Kiri: Form Input Parameter (Tinggal Input Angka) */}
        <div className="calc-input-column">
          <div className="calc-card-box">
            <div className="calc-card-header">
              <div className="calc-card-header-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div>
                <h3 className="calc-card-title">Parameter Input Pengujian</h3>
                <span className="calc-card-subtitle">Ketik atau ubah nilai parameter untuk kalkulasi instan:</span>
              </div>
            </div>

            {/* Alert Error Berwarna Merah Jika User Memasukkan Angka Minus Secara Paksa */}
            {hasNegativeInput && (
              <div className="calc-negative-alert-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="calc-negative-alert-content">
                  <strong className="calc-negative-alert-title">Nilai tidak boleh negatif</strong>
                  <p className="calc-negative-alert-desc">
                    {hasNegativeTableInput 
                      ? 'Terdapat nilai negatif pada tabel pasangan data uji tegangan. Hasil kalkulasi dikosongkan hingga parameter diperbaiki.' 
                      : `Input parameter pengujian ${negativeFields.map(f => f.label).join(', ')} bernilai negatif. Hasil kalkulasi dikosongkan hingga parameter diperbaiki.`}
                  </p>
                </div>
              </div>
            )}

            {/* Alert Error Berwarna Merah Jika User Memasukkan Nilai Melebihi Batas Maksimum */}
            {hasExceededInput && !hasNegativeInput && (
              <div className="calc-negative-alert-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="calc-negative-alert-content">
                  <strong className="calc-negative-alert-title">
                    {exceededFields.some(f => f.max === 100 && f.unit === '%')
                      ? 'Nilai persentase tidak boleh melebihi 100%'
                      : 'Nilai input melebihi batas maksimum'}
                  </strong>
                  <p className="calc-negative-alert-desc">
                    {exceededFields.some(f => f.max === 100 && f.unit === '%')
                      ? 'Nilai persentase tidak boleh melebihi 100%. Harap periksa kembali input parameter pengujian.'
                      : `Input parameter ${exceededFields.map(f => f.label).join(', ')} bernilai melebihi batas maksimum (${exceededFields.map(f => f.max).join(', ')}). Hasil kalkulasi dikosongkan hingga parameter diperbaiki.`}
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Table Input (Direct Shear / Pasangan Tegangan Normal & Geser) */}
            {testConfig.hasDynamicTable && (
              <div className="calc-dynamic-table-wrap">
                <div className="calc-table-header-info">
                  <div>
                    <h4 className="calc-table-title">Tabel Pasangan Data Uji Tegangan</h4>
                    <p className="calc-table-hint">
                      Masukkan minimal 3 titik pengujian dengan pasangan data Tegangan Normal (σ) dan Tegangan Geser Runtuh (τ). Parameter kuat geser (Kohesi c dan Sudut Geser Dalam φ) dihitung otomatis melalui regresi linier garis selubung Mohr-Coulomb (τ = c + σ·tan(φ)).
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-add-table-row"
                    onClick={handleAddPoint}
                    title="Tambah titik uji geser baru"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Tambah Titik Uji</span>
                  </button>
                </div>

                <div className="calc-table-responsive">
                  <table className="calc-custom-input-table">
                    <thead>
                      <tr>
                        <th style={{ width: '65px', textAlign: 'center' }}>Titik #</th>
                        <th>Tegangan Normal (σ) <span className="th-unit">kg/cm²</span></th>
                        <th>Tegangan Geser Runtuh (τ) <span className="th-unit">kg/cm²</span></th>
                        <th style={{ width: '65px', textAlign: 'center' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPoints.map((pt, index) => (
                        <tr key={pt.id || index}>
                          <td style={{ textAlign: 'center' }}>
                            <span className="point-badge">#{index + 1}</span>
                          </td>
                          <td>
                            <div className="calc-table-input-cell">
                              <input
                                type="number"
                                min="0.01"
                                step="any"
                                placeholder="0.00"
                                className="calc-table-numeric-input"
                                value={pt.sigma !== undefined ? pt.sigma : ''}
                                onKeyDown={(e) => handleKeyDown(e, 'sigma')}
                                onChange={(e) => handlePointChange(index, 'sigma', e.target.value)}
                              />
                              <span className="calc-table-cell-unit">kg/cm²</span>
                            </div>
                          </td>
                          <td>
                            <div className="calc-table-input-cell">
                              <input
                                type="number"
                                min="0.01"
                                step="any"
                                placeholder="0.00"
                                className="calc-table-numeric-input"
                                value={pt.tau !== undefined ? pt.tau : ''}
                                onKeyDown={(e) => handleKeyDown(e, 'tau')}
                                onChange={(e) => handlePointChange(index, 'tau', e.target.value)}
                              />
                              <span className="calc-table-cell-unit">kg/cm²</span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="btn-remove-table-row"
                              onClick={() => handleRemovePoint(index)}
                              disabled={currentPoints.length <= 3}
                              title={currentPoints.length <= 3 ? 'Direct shear memerlukan minimal 3 baris titik uji' : 'Hapus baris titik uji'}
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pilihan Metode Pengujian (Tabs / Button Group) */}
            {testConfig.methods && (
              <div className="calc-method-selection-wrap">
                <div className="calc-method-tabs-header">
                  <span className="calc-method-tabs-title">{testConfig.methodSelectionTitle || 'Pilih Metode Pengujian'}</span>
                  <span className="calc-method-tabs-subtitle">
                    {testConfig.methodSelectionSubtitle || 'Tentukan metode permeabilitas sesuai karakteristik jenis tanah uji:'}
                  </span>
                </div>
                <div className="calc-method-button-group">
                  {testConfig.methods.map((method) => {
                    const isActive = (inputs.metode || testConfig.initialInputs?.metode || testConfig.methods[0]?.value) === method.value
                    return (
                      <button
                        key={method.value}
                        type="button"
                        className={`calc-method-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleInputChange('metode', method.value)}
                      >
                        <span className="method-indicator" />
                        <div className="method-btn-content">
                          <strong>{method.label}</strong>
                          {method.desc && <small>{method.desc}</small>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Dynamic Sieve Table (Agregat Kasar Bab 2 & Agregat Halus Bab 1) */}
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
            )}

            {allFields && allFields.length > 0 && (
              <div className="calc-fields-list">
                {allFields.map((field) => {
                  const isFieldNegative = (
                    typeof inputs[field.key] === 'number' && inputs[field.key] < 0
                  ) || (
                    typeof inputs[field.key] === 'string' && (
                      inputs[field.key].trim().startsWith('-') || 
                      (Number(inputs[field.key]) < 0 && !isNaN(Number(inputs[field.key])))
                    )
                  )

                  const isFieldExceeded = (
                    field.max !== undefined && 
                    inputs[field.key] !== undefined && 
                    inputs[field.key] !== null && 
                    inputs[field.key] !== '' && 
                    Number(inputs[field.key]) > field.max
                  )

                  return (
                    <div key={field.key} className="calc-field-row">
                      <div className="calc-field-label-wrap">
                        <label htmlFor={`field-${field.key}`} className="calc-field-label">
                          {field.label}
                        </label>
                        {field.desc && (
                          <span className="calc-field-desc">{field.desc}</span>
                        )}
                      </div>
                      <div className="calc-field-right-col">
                        <div className="calc-input-unit-group">
                          {field.type === 'select' ? (
                            <select
                              id={`field-${field.key}`}
                              className="calc-numeric-input calc-select-input input-parameter-besar"
                              value={inputs[field.key] !== undefined ? inputs[field.key] : (field.options?.[0]?.value ?? '')}
                              disabled={field.disabled}
                              onChange={(e) => {
                                const raw = e.target.value
                                const num = Number(raw)
                                handleInputChange(field.key, !isNaN(num) ? num : raw)
                              }}
                            >
                              {field.options && field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              id={`field-${field.key}`}
                              type="number"
                              min={field.min !== undefined ? field.min : 0}
                              max={field.max !== undefined ? field.max : undefined}
                              step={field.step || 'any'}
                              readOnly={field.readOnly}
                              disabled={field.disabled}
                              className={`calc-numeric-input input-parameter-besar ${isFieldNegative || isFieldExceeded ? 'input-error-negative' : ''} ${field.readOnly || field.disabled ? 'input-readonly-field' : ''}`}
                              value={inputs[field.key] !== undefined ? inputs[field.key] : ''}
                              onKeyDown={(e) => handleKeyDown(e, field.key)}
                              onChange={(e) => handleInputChange(field.key, e.target.value)}
                            />
                          )}
                          {field.unitOptions && field.unitOptions.length > 0 ? (
                            <select
                              id={`field-unit-${field.key}`}
                              className="calc-unit-select"
                              value={inputs[field.unitKey || `${field.key}Unit`] || field.unitOptions[0].value}
                              onChange={(e) => handleUnitChange(field, e.target.value)}
                              aria-label={`Pilihan satuan untuk ${field.label}`}
                            >
                              {field.unitOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : field.unit ? (
                            <span className="calc-unit-pill">{field.unit}</span>
                          ) : null}
                        </div>
                        {isFieldExceeded && (
                          <div className="calc-field-inline-error" style={{ color: '#DC2626', fontSize: '0.78rem', fontWeight: 600, marginTop: '4px', textAlign: 'right' }}>
                            {field.max === 100 && field.unit === '%'
                              ? 'Nilai persentase tidak boleh melebihi 100%'
                              : `Nilai tidak boleh melebihi ${field.max}`}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="calc-input-actions">
              <button
                type="button"
                className="btn-calc-reset"
                onClick={handleResetInputs}
                title="Kembalikan angka ke parameter default"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span>Reset Angka Default</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Panel Hasil Perhitungan Otomatis (Real-time) */}
        <div className="calc-output-column">
          {/* Bento Metrik Hasil Utama */}
          <div className="calc-card-box">
            <div className="calc-card-header">
              <div className="calc-card-header-icon success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <h3 className="calc-card-title">Hasil Perhitungan Otomatis</h3>
                <span className="calc-card-subtitle">Output real-time berdasarkan rumus standar teknis:</span>
              </div>
            </div>

            <div className="calc-metrics-grid">
              {calcOutput.results.map((res, idx) => (
                <div 
                  key={idx} 
                  className={`calc-metric-badge ${res.highlight ? 'highlight-box' : ''}`}
                >
                  <span className="calc-metric-label">{res.label}</span>
                  <div className="calc-metric-val-row">
                    <strong className="calc-metric-number">{formatScientificInText(res.value)}</strong>
                    {res.unit && <span className="calc-metric-unit">{res.unit}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Kotak Tahapan Rumus */}
            {calcOutput.formulaSteps && calcOutput.formulaSteps.length > 0 && (
              <div className="calc-formula-box">
                <span className="calc-formula-kicker">LANGKAH RUMUS PERHITUNGAN:</span>
                <ul className="calc-formula-steps-list">
                  {calcOutput.formulaSteps.map((step, sIdx) => (
                    <li key={sIdx}>{formatScientificInText(step)}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Kotak Kesimpulan Standar SNI */}
            <div className={`calc-verdict-box ${getVerdictClass()}`}>
              <div className="calc-verdict-header">
                <span className="calc-verdict-status-pill">
                  {getVerdictLabel()}
                </span>
                <span className="calc-verdict-rule">{testConfig.standard}</span>
              </div>
              <p className="calc-verdict-text">{formatScientificInText(calcOutput.conclusion)}</p>
            </div>

            {/* Peringatan Evaluasi Khusus / Warning Dimensi Standar SNI */}
            {calcOutput.warningMessage && !isInputInvalid && (
              <div className="calc-warning-banner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div className="calc-warning-content">
                  <strong className="calc-warning-title">Peringatan Standar Pengujian SNI</strong>
                  <p className="calc-warning-desc">{formatScientificInText(calcOutput.warningMessage)}</p>
                </div>
              </div>
            )}

            {/* Peringatan Khusus Jika Input Tidak Logis / Validasi Gagal */}
            {isInputInvalid && (
              <div className="calc-error-banner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Input parameter belum logis atau di luar rentang wajar SNI. Tombol simpan dinonaktifkan hingga data diperbaiki.</span>
              </div>
            )}

            {/* Notifikasi Sukses Simpan */}
            {savedNotification && (
              <div className="calc-save-banner">
                <div className="calc-save-banner-text">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Data pengujian <strong>{lastSavedId || testConfig.code}</strong> berhasil disimpan ke Dashboard Utama!</span>
                </div>
              </div>
            )}

            {/* Tombol Aksi Simpan */}
            <div className="calc-actions-footer">
              <button
                type="button"
                className="btn-save-to-dashboard"
                onClick={handleSave}
                disabled={isInputInvalid}
                title={
                  isInputInvalid 
                    ? 'Data input belum valid / tidak logis. Perbaiki nilai input sebelum menyimpan.' 
                    : 'Simpan Hasil ke Dashboard'
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Simpan Hasil ke Dashboard</span>
              </button>

              <button
                type="button"
                className="btn-open-table-direct"
                onClick={onBackToDashboard}
              >
                Ke Dashboard Utama
              </button>
            </div>
          </div>

          {/* Card Panel Baru: Grafik Kurva Gradasi Agregat */}
          {calcOutput.gradationChart && !calcOutput.isError && (
            <GradationCurveChart chartData={calcOutput.gradationChart} />
          )}

          {/* Card Panel Khusus: Perbandingan Debit Aktual vs Teoretis Venturi */}
          {calcOutput.flowComparison && !calcOutput.isError && (
            <FlowComparisonCard data={calcOutput.flowComparison} />
          )}

          {/* Card Panel Terpisah: Hasil Perhitungan Head Loss Venturi & Orifice (Sesuai PDF) */}
          {calcOutput.headLoss && !calcOutput.isError && (
            <HeadLossCard data={calcOutput.headLoss} />
          )}
        </div>
      </div>
    </div>
  )
}

// Standar Pilihan Cepat Ukuran Ayakan ASTM C-33 / SNI
const STANDARD_SIEVE_PRESETS = [
  { label: '2.0" (50.0 mm)', size: 50.0 },
  { label: '1.5" (37.5 mm)', size: 37.5 },
  { label: '1.0" (25.0 mm)', size: 25.0 },
  { label: '3/4" (19.0 mm)', size: 19.0 },
  { label: '1/2" (12.5 mm)', size: 12.5 },
  { label: '3/8" (9.5 mm)', size: 9.5 },
  { label: 'No. 4 (4.75 mm)', size: 4.75 },
  { label: 'No. 8 (2.36 mm)', size: 2.36 },
  { label: 'No. 16 (1.18 mm)', size: 1.18 },
  { label: 'No. 30 (0.60 mm)', size: 0.60 },
  { label: 'No. 50 (0.30 mm)', size: 0.30 },
  { label: 'No. 100 (0.15 mm)', size: 0.15 },
  { label: 'No. 200 (0.075 mm)', size: 0.075 },
]

// Komponen Input Tabel Saringan Dinamis Reusable (Agregat Kasar & Halus)
function DynamicSieveTable({
  sieves,
  isCoarse,
  onSieveChange,
  onAddSieve,
  onRemoveSieve,
  sieveAlert,
  onKeyDown,
}) {
  const nonPanCount = sieves.filter((s) => !s.isPan && Number(s.size) > 0 && !String(s.label || '').toLowerCase().includes('pan')).length
  const totalWeight = sieves.reduce((sum, s) => sum + (s.weight !== undefined && s.weight !== '' ? Number(s.weight) : 0), 0)

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

      <div className="calc-table-header-info">
        <div>
          <h4 className="calc-table-title">
            Tabel Fraksi Saringan Agregat {isCoarse ? 'Kasar' : 'Halus'}
          </h4>
          <p className="calc-table-hint">
            Tentukan ukuran saringan (mm) dan massa tertahan (gram). Anda dapat menambah atau mengurangi susunan saringan pengujian sesuai kebutuhan praktikum.
          </p>
        </div>
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

      <div className="calc-table-responsive">
        <table className="calc-custom-input-table">
          <thead>
            <tr>
              <th style={{ width: '55px', textAlign: 'center' }}>No.</th>
              <th>Label Saringan</th>
              <th style={{ width: '160px' }}>
                Ukuran Saringan <span className="th-unit">mm</span>
              </th>
              <th style={{ width: '170px' }}>
                Berat Tertahan <span className="th-unit">gram</span>
              </th>
              <th style={{ width: '65px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sieves.map((sieve, index) => {
              const isPan = sieve.isPan || Number(sieve.size) === 0 || String(sieve.label || '').toLowerCase().includes('pan')

              return (
                <tr key={sieve.id || index} className={isPan ? 'sieve-pan-row' : ''}>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`point-badge ${isPan ? 'point-badge-pan' : ''}`}>
                      {isPan ? 'Pan' : `#${index + 1}`}
                    </span>
                  </td>
                  <td>
                    {isPan ? (
                      <div className="sieve-pan-label-wrap">
                        <strong className="sieve-pan-title">Pan Penampung (Dasar)</strong>
                        <span className="sieve-pan-subtitle">Fraksi butiran paling halus lolos ayakan terbawah</span>
                      </div>
                    ) : (
                      <div className="sieve-label-input-group">
                        <input
                          type="text"
                          className="calc-table-text-input"
                          placeholder="Label Saringan (misal 3/4&quot;)"
                          value={sieve.label || ''}
                          onChange={(e) => onSieveChange(index, 'label', e.target.value)}
                        />
                        <select
                          className="calc-sieve-preset-select"
                          value=""
                          onChange={(e) => {
                            const preset = STANDARD_SIEVE_PRESETS.find((p) => p.label === e.target.value)
                            if (preset) {
                              onSieveChange(index, 'label', preset.label)
                              onSieveChange(index, 'size', preset.size)
                            }
                          }}
                          title="Pilih ukuran standar ASTM / SNI"
                        >
                          <option value="" disabled>Pilih Standar</option>
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
                            onSieveChange(index, 'size', val === '' ? '' : parseFloat(val) || 0)
                          }}
                        />
                        <span className="calc-table-cell-unit">mm</span>
                      </div>
                    )}
                  </td>
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
        </table>
      </div>

      {/* Sieve Table Footer Summary */}
      <div className="calc-sieve-table-footer">
        <span className="sieve-summary-badge">
          Total Baris: <strong>{nonPanCount} Saringan + 1 Pan</strong>
        </span>
        <span className="sieve-total-mass-badge">
          Total Massa Benda Uji (ΣW): <strong>{totalWeight.toFixed(1)} gram</strong>
        </span>
      </div>
    </div>
  )
}

// Custom Tooltip Recharts yang elegan dan responsif
function CustomGradationTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload
    const actualVal = dataPoint.actualPassing
    const ba = dataPoint.upperBound
    const bb = dataPoint.lowerBound
    const ok = (ba === undefined || actualVal <= ba) && (bb === undefined || actualVal >= bb)

    return (
      <div className="chart-custom-tooltip">
        <div className="tooltip-title">
          Ayakan {dataPoint.sieveLabel} ({dataPoint.sieveName})
        </div>
        <div className="tooltip-row">
          <span className="tooltip-dot" style={{ backgroundColor: '#2563EB' }} />
          <span>Lolos Aktual: <strong>{actualVal.toFixed(1)}%</strong></span>
        </div>
        {ba !== undefined && (
          <div className="tooltip-row">
            <span className="tooltip-dot" style={{ backgroundColor: '#EA580C' }} />
            <span>Batas Atas (BA): <strong>{ba}%</strong></span>
          </div>
        )}
        {bb !== undefined && (
          <div className="tooltip-row">
            <span className="tooltip-dot" style={{ backgroundColor: '#16A34A' }} />
            <span>Batas Bawah (BB): <strong>{bb}%</strong></span>
          </div>
        )}
        <div className={`tooltip-status ${ok ? 'status-ok' : 'status-bad'}`}>
          {ok ? '✓ Memenuhi Spesifikasi' : actualVal > ba ? '⚠ Melebihi Batas Atas' : '⚠ Di Bawah Batas Bawah'}
        </div>
      </div>
    )
  }
  return null
}

function GradationCurveChart({ chartData }) {
  const {
    isCoarse,
    chartTitle,
    chartSubtitle,
    specLabel,
    zoneLabel,
    zoneFullName,
    nominalOptions,
    defaultNominalKey,
    allBounds,
    sieves,
    sieveLabels,
    sieveNames,
    actualPassing,
    upperBound: defaultUpperBound,
    lowerBound: defaultLowerBound,
  } = chartData

  // State dropdown pilihan Ukuran Nominal Maksimum (ASTM C-33 / SNI)
  const [selectedNominalKey, setSelectedNominalKey] = useState(
    defaultNominalKey || (isCoarse ? '19 mm' : '')
  )

  // Batas atas dan bawah yang aktif (bisa berganti secara dinamis saat dropdown diubah)
  const activeBounds = useMemo(() => {
    if (allBounds && selectedNominalKey && allBounds[selectedNominalKey]) {
      return allBounds[selectedNominalKey]
    }
    return {
      label: specLabel || zoneLabel || 'Standar',
      ba: defaultUpperBound,
      bb: defaultLowerBound,
    }
  }, [allBounds, selectedNominalKey, specLabel, zoneLabel, defaultUpperBound, defaultLowerBound])

  const activeUpperBound = activeBounds.ba
  const activeLowerBound = activeBounds.bb
  const currentSpecLabel = activeBounds.label || selectedNominalKey || specLabel || zoneLabel

  // Evaluasi kepatuhan terhadap amplop batas standar aktif
  const isAllWithinBounds = useMemo(() => {
    return actualPassing.every((val, idx) => {
      const ba = activeUpperBound[idx] ?? 100
      const bb = activeLowerBound[idx] ?? 0
      return val <= ba && val >= bb
    })
  }, [actualPassing, activeUpperBound, activeLowerBound])

  // Data terstruktur untuk LineChart Recharts (diurutkan kecil ke besar)
  const chartDataPoints = useMemo(() => {
    return sieves.map((sieve, idx) => {
      const val = actualPassing[idx]
      const ba = activeUpperBound ? activeUpperBound[idx] : undefined
      const bb = activeLowerBound ? activeLowerBound[idx] : undefined
      const ok = (ba === undefined || val <= ba) && (bb === undefined || val >= bb)
      return {
        size: sieve,
        sieveSize: sieve,
        sieveLabel: sieveLabels[idx],
        sieveName: sieveNames[idx],
        actualPassing: val,
        upperBound: ba,
        lowerBound: bb,
        status: ok ? 'Memenuhi' : val > ba ? 'Melebihi BA' : 'Di Bawah BB',
      }
    })
  }, [sieves, sieveLabels, sieveNames, actualPassing, activeUpperBound, activeLowerBound])

  return (
    <div className="calc-card-box calc-chart-card">
      <div className="calc-card-header">
        <div className="calc-card-header-icon chart-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <div className="calc-card-header-text">
          <h3 className="calc-card-title">{chartTitle || 'Grafik Kurva Gradasi Agregat'}</h3>
          <span className="calc-card-subtitle">
            {chartSubtitle || `Distribusi Butiran & Amplop Batas Spesifikasi ASTM C-33 / SNI (${currentSpecLabel || zoneFullName})`}
          </span>
        </div>
        <span className={`calc-chart-badge ${isAllWithinBounds ? 'status-ok' : 'status-eval'}`}>
          {isAllWithinBounds ? '✓ Masuk Amplop Standar' : '⚠ Perlu Evaluasi Standar'}
        </span>
      </div>

      {/* Kontrol Pilihan Ukuran Nominal Maksimum (ASTM C-33) jika modul agregat kasar */}
      {isCoarse && nominalOptions && (
        <div className="calc-chart-controls-bar">
          <div className="nominal-dropdown-group">
            <label htmlFor="nominalSelect" className="nominal-select-label">
              Ukuran Nominal Maksimum (ASTM C-33 / SNI):
            </label>
            <select
              id="nominalSelect"
              value={selectedNominalKey}
              onChange={(e) => setSelectedNominalKey(e.target.value)}
              className="nominal-select-dropdown"
            >
              {nominalOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <span className="nominal-badge-info">
            Spesifikasi Terpilih: <strong>ASTM C-33 ({currentSpecLabel})</strong>
          </span>
        </div>
      )}

      {/* Visual Chart Container Recharts (Kurva S Logaritmik) */}
      <div className="calc-chart-recharts-wrap">
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={chartDataPoints}
            margin={{ top: 15, right: 30, left: 15, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="size"
              type="number"
              scale="log"
              domain={['auto', 'auto']}
              ticks={sieves}
              tickFormatter={(val) => {
                const pt = chartDataPoints.find((p) => Math.abs((p.size ?? p.sieveSize) - val) < 0.05)
                return pt ? pt.sieveLabel : val
              }}
              stroke="#64748B"
              fontSize={11}
              fontWeight={600}
              tickLine={{ stroke: '#CBD5E1' }}
            >
              <Label
                value="Ukuran Lubang Ayakan Standar (mm) — Skala Logaritmik"
                offset={-15}
                position="insideBottom"
                fill="#334155"
                fontWeight={700}
                fontSize={12}
              />
            </XAxis>
            <YAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="#64748B"
              fontSize={11}
              fontWeight={600}
              tickLine={{ stroke: '#CBD5E1' }}
            >
              <Label
                value="Persen Lolos (%)"
                angle={-90}
                position="insideLeft"
                offset={0}
                style={{ textAnchor: 'middle', fill: '#334155', fontWeight: 700, fontSize: 12 }}
              />
            </YAxis>
            <Tooltip content={<CustomGradationTooltip />} />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '0.82rem' }}
            />
            {/* Garis Batas Atas (Oranye Putus-putus) */}
            <Line
              type="monotone"
              name={isCoarse ? `Batas Atas (BA) - ASTM C-33 (${currentSpecLabel})` : `Batas Atas (BA) - SNI (${currentSpecLabel})`}
              dataKey="upperBound"
              stroke="#EA580C"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: '#EA580C', stroke: '#FFFFFF', strokeWidth: 1.5 }}
            />
            {/* Garis Batas Bawah (Hijau Putus-putus) */}
            <Line
              type="monotone"
              name={isCoarse ? `Batas Bawah (BB) - ASTM C-33 (${currentSpecLabel})` : `Batas Bawah (BB) - SNI (${currentSpecLabel})`}
              dataKey="lowerBound"
              stroke="#16A34A"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: '#16A34A', stroke: '#FFFFFF', strokeWidth: 1.5 }}
            />
            {/* Garis Sampel Aktual Pengujian (Biru Solid) */}
            <Line
              type="monotone"
              name="Sampel Pengujian (% Lolos Aktual)"
              dataKey="actualPassing"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5, fill: '#2563EB', stroke: '#FFFFFF', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#1D4ED8', stroke: '#DBEAFE', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabel Rincian Data Fraksi Ayakan Standar */}
      <div className="calc-chart-table-wrap">
        <table className="calc-chart-table">
          <thead>
            <tr>
              <th>Ukuran Ayakan</th>
              <th style={{ textAlign: 'center' }}>Batas Bawah (BB)</th>
              <th style={{ textAlign: 'center' }}>Lolos Aktual</th>
              <th style={{ textAlign: 'center' }}>Batas Atas (BA)</th>
              <th style={{ textAlign: 'center' }}>Evaluasi Standar</th>
            </tr>
          </thead>
          <tbody>
            {chartDataPoints.map((pt) => {
              const val = pt.actualPassing
              const bb = pt.lowerBound
              const ba = pt.upperBound
              const ok = val >= bb && val <= ba

              return (
                <tr key={pt.sieveLabel}>
                  <td>
                    <strong>{pt.sieveLabel}</strong>{' '}
                    <span style={{ color: '#64748B', fontSize: '0.75rem' }}>({pt.sieveName})</span>
                  </td>
                  <td style={{ textAlign: 'center', color: '#16A34A', fontWeight: '700' }}>
                    {bb}%
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`chip-passing ${ok ? 'pass-ok' : 'pass-out'}`}>
                      {val.toFixed(1)}%
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', color: '#EA580C', fontWeight: '700' }}>
                    {ba}%
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge-eval ${ok ? 'badge-ok' : 'badge-warn'}`}>
                      {ok ? 'Memenuhi' : val > ba ? 'Melebihi BA' : 'Di Bawah BB'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HeadLossCard({ data }) {
  if (!data) return null

  const lossRatio = data.venturiLoss > 0 ? (data.orificeLoss / data.venturiLoss).toFixed(1) : '-'

  return (
    <div className="calc-card-box head-loss-card" style={{ marginTop: '1.25rem' }}>
      <div className="calc-card-header">
        <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <div>
          <h3 className="calc-card-title">Kalkulator Head Loss Aliran (Venturi vs Orifice)</h3>
          <span className="calc-card-subtitle">
            Evaluasi kehilangan energi relatif terhadap head dinamis pipa sesuai Laporan Praktikum (PDF)
          </span>
        </div>
      </div>

      {/* Grid 4 Kartu Metrik Head Loss */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.85rem', marginTop: '0.5rem' }}>
        {/* Metric 1: Head Loss Venturi */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #BBF7D0',
            backgroundColor: '#F0FDF4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#166534', letterSpacing: '0.05em' }}>
              Head Loss Venturi
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '9999px', backgroundColor: '#DCFCE7', color: '#15803D' }}>
              Loss Rendah
            </span>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#15803D', lineHeight: 1.1 }}>
              {data.venturiLoss.toFixed(4)}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#475569', fontFamily: 'monospace' }}>
              (A - C) / [0.167 × (A - B)]
            </span>
          </div>
          <div style={{ paddingTop: '0.45rem', borderTop: '1px solid #DCFCE7', fontSize: '0.72rem', color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
            <span>Kehilangan (A - C):</span>
            <strong style={{ color: '#15803D' }}>{data.deltaAC.toFixed(1)} mm</strong>
          </div>
        </div>

        {/* Metric 2: Head Loss Orifice */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #FED7AA',
            backgroundColor: '#FFF7ED',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#9A3412', letterSpacing: '0.05em' }}>
              Head Loss Orifice
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '9999px', backgroundColor: '#FFEDD5', color: '#C2410C' }}>
              Loss Tinggi
            </span>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#C2410C', lineHeight: 1.1 }}>
              {data.orificeLoss.toFixed(4)}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#475569', fontFamily: 'monospace' }}>
              [0.83 × (E - F)] / [0.167 × (A - B)]
            </span>
          </div>
          <div style={{ paddingTop: '0.45rem', borderTop: '1px solid #FED7AA', fontSize: '0.72rem', color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
            <span>Kehilangan (0.83 × Δh):</span>
            <strong style={{ color: '#C2410C' }}>{data.lossOrificeMm.toFixed(1)} mm</strong>
          </div>
        </div>

        {/* Metric 3: Head Dinamis Acuan */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#334155', letterSpacing: '0.05em' }}>
              Head Dinamis Acuan
            </span>
            <span style={{ fontSize: '0.65rem', color: '#64748B' }}>Pipa Utama</span>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0F172A', lineHeight: 1.1 }}>
              {data.dynamicHead.toFixed(2)} <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#64748B' }}>mm</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#475569', fontFamily: 'monospace' }}>
              0.167 × (A - B)
            </span>
          </div>
          <div style={{ paddingTop: '0.45rem', borderTop: '1px solid #E2E8F0', fontSize: '0.72rem', color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
            <span>Beda Tinggi (A - B):</span>
            <strong style={{ color: '#0F172A' }}>{data.dhVenturiMm.toFixed(1)} mm</strong>
          </div>
        </div>

        {/* Metric 4: Rasio Head Loss */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #C7D2FE',
            backgroundColor: '#EEF2FF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#3730A3', letterSpacing: '0.05em' }}>
              Disipasi Energi
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '9999px', backgroundColor: '#E0E7FF', color: '#4338CA' }}>
              Orifice vs Venturi
            </span>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#4338CA', lineHeight: 1.1 }}>
              {lossRatio} <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#6366F1' }}>× lipat</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#475569' }}>
              Faktor rasio kehilangan Orifice
            </span>
          </div>
          <div style={{ paddingTop: '0.45rem', borderTop: '1px solid #C7D2FE', fontSize: '0.72rem', color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
            <span>Beda Tinggi (E - F):</span>
            <strong style={{ color: '#4338CA' }}>{data.dhOrificeMm.toFixed(1)} mm</strong>
          </div>
        </div>
      </div>

      {/* Ringkasan Pembacaan Tabung Manometer */}
      <div style={{ padding: '0.85rem 1rem', backgroundColor: '#F8FAFC', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>
          Data Pembacaan Tabung Piezometer Manometer Terbaca (Satuan mm):
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.5rem', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Manometer A</span>
            <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{data.manoA} mm</strong>
            <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block' }}>Inlet Venturi</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Manometer B</span>
            <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{data.manoB} mm</strong>
            <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block' }}>Leher Venturi</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Manometer C</span>
            <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{data.manoC} mm</strong>
            <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block' }}>Outlet Venturi</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Manometer E</span>
            <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{data.manoE} mm</strong>
            <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block' }}>Inlet Orifice</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Manometer F</span>
            <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{data.manoF} mm</strong>
            <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block' }}>Vena Contracta</span>
          </div>
        </div>
      </div>

      {/* Box Catatan Analisis Hidraulika */}
      <div style={{ padding: '0.85rem 1rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#1E3A8A', lineHeight: '1.5', marginTop: '0.5rem' }}>
        <strong style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem', color: '#1E40AF', fontWeight: '700' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Analisis Hidraulika Laporan Praktikum (PDF):
        </strong>
        <p style={{ margin: 0 }}>
          Tabung Venturi memiliki kehilangan tinggi tekan relatif yang sangat kecil ({data.venturiLoss.toFixed(3)}) dibandingkan pelat Orifice ({data.orificeLoss.toFixed(3)}). Hal ini dikarenakan bagian divergen pipa Venturi dirancang dengan sudut ekspansi bertahap (5°–7°) yang memungkinkan terjadinya pemulihan tekanan (<em>pressure recovery</em>) hingga 85–90%. Sebaliknya, pelat Orifice menimbulkan kontraksi mendadak dan turbulensi olakan (<em>eddies</em>) sekunder di hilir vena contracta yang mendisipasikan sebagian besar energi tekanan fluida menjadi panas.
        </p>
      </div>
    </div>
  )
}

function FlowComparisonCard({ data }) {
  if (!data) return null

  return (
    <div className="calc-card-box flow-comparison-card" style={{ marginTop: '1.25rem' }}>
      <div className="calc-card-header">
        <div className="calc-card-header-icon" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div>
          <h3 className="calc-card-title">Perbandingan Debit: Aktual (Volumetrik) vs Teoretis (Venturi)</h3>
          <span className="calc-card-subtitle">
            Komparasi langsung debit volumetrik tangki ukur hidraulika terhadap rumus Bernoulli Venturi Meter
          </span>
        </div>
      </div>

      {/* Komparasi Berdampingan (Side-by-Side) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
        {/* Kolom 1: Debit Aktual (Volumetrik) */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '0.875rem',
            border: '2px solid #93C5FD',
            backgroundColor: '#EFF6FF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#1E40AF', letterSpacing: '0.05em' }}>
                Debit Aktual (Volumetrik)
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: '#DBEAFE', color: '#1D4ED8' }}>
                Tangki Ukur
              </span>
            </div>
            <div style={{ margin: '0.5rem 0' }}>
              <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#1D4ED8', lineHeight: 1 }}>
                {data.qAktualKgS.toFixed(3)}{' '}
                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#3B82F6' }}>kg/s</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginTop: '0.35rem' }}>
                Setara dengan <strong>{data.qAktualLpm.toFixed(2)} L/min</strong> ({data.qAktualKgS.toFixed(3)} L/s)
              </span>
            </div>
          </div>
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #BFDBFE', fontSize: '0.75rem', color: '#334155' }}>
            <span>Metode: Q = V / t = {data.v} L / {data.t} s</span>
          </div>
        </div>

        {/* Kolom 2: Debit Teoretis (Venturi) */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '0.875rem',
            border: '2px solid #C4B5FD',
            backgroundColor: '#F5F3FF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#5B21B6', letterSpacing: '0.05em' }}>
                Debit Teoretis (Venturi)
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: '#EDE9FE', color: '#6D28D9' }}>
                Persamaan Bernoulli
              </span>
            </div>
            <div style={{ margin: '0.5rem 0' }}>
              <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#6D28D9', lineHeight: 1 }}>
                {data.qTeoretisKgS.toFixed(3)}{' '}
                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#8B5CF6' }}>kg/s</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginTop: '0.35rem' }}>
                Setara dengan <strong>{data.qTeoretisLpm.toFixed(2)} L/min</strong> pada Δh = {data.deltaHMm.toFixed(1)} mm
              </span>
            </div>
          </div>
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #DDD6FE', fontSize: '0.75rem', color: '#334155' }}>
            <span>Parameter: D1 = {data.d1Mm} mm, D2 = {data.d2Mm} mm, Cd = {data.cd}</span>
          </div>
        </div>
      </div>

      {/* Baris Hasil Evaluasi Selisih */}
      <div
        style={{
          marginTop: '0.85rem',
          padding: '0.9rem 1.15rem',
          borderRadius: '0.75rem',
          border: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            Δ
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: '600' }}>
              Selisih Debit Mutlak (|Q_teoretis - Q_aktual|):
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#0F172A' }}>
              {data.selisihDebit.toFixed(3)} kg/s
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: '600' }}>
              Persentase Deviasi Relatif:
            </span>
            <strong style={{ fontSize: '1.1rem', color: data.deviasiPct <= 10 ? '#16A34A' : '#D97706' }}>
              {data.deviasiPct.toFixed(2)}%
            </strong>
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: '700',
              padding: '0.25rem 0.6rem',
              borderRadius: '9999px',
              backgroundColor: data.deviasiPct <= 10 ? '#DCFCE7' : '#FEF3C7',
              color: data.deviasiPct <= 10 ? '#15803D' : '#B45309',
            }}
          >
            {data.deviasiPct <= 10 ? 'Presisi Tinggi' : 'Deviasi Moderat'}
          </span>
        </div>
      </div>
    </div>
  )
}
