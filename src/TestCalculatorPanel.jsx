import { useState, useMemo } from 'react'
import {
  Plus,
  Trash2,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Info,
  Check,
  TrendingUp,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
  ReferenceDot,
} from 'recharts'
import {
  formatScientificInText,
  DEFAULT_PENETRATION_GROUPS,
  DEFAULT_DUCTILITY_SAMPLES,
  DEFAULT_VISCOSITY_POINTS,
  DEFAULT_FLASH_SAMPLES,
  DEFAULT_JMF_SIEVES,
  DEFAULT_MARSHALL_SURFACE_AREA_TABLE,
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
  DEFAULT_MT21_SAMPLES,
  DEFAULT_MT22_SAMPLES,
  DEFAULT_MT23_SAMPLES,
  DEFAULT_MT24_SAMPLES,
} from './testCalculatorsData'

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
  const [activeStepTab, setActiveStepTab] = useState(0)

  // Reset tab index saat berganti modul pengujian
  useMemo(() => {
    setActiveStepTab(0)
  }, [testConfig.id])

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

    // Konversi nilai tekanan barometer jika pengguna beralih satuan antara mmHg dan kPa
    if (fieldDef.key === 'tekananK' && prevUnit !== newUnit) {
      const rawVal = inputs[fieldDef.key]
      const numVal = Number(rawVal)
      if (!isNaN(numVal) && numVal > 0) {
        if (prevUnit === 'mmHg' && newUnit === 'kPa') {
          // Dari mmHg ke kPa: K = P_mmHg * 0.13332237
          const converted = +(numVal * 0.13332237).toFixed(2)
          if (onInputChange) {
            onInputChange(fieldDef.key, converted)
          }
        } else if (prevUnit === 'kPa' && newUnit === 'mmHg') {
          // Dari kPa ke mmHg: P_mmHg = K / 0.13332237
          const converted = +(numVal / 0.13332237).toFixed(1)
          if (onInputChange) {
            onInputChange(fieldDef.key, converted)
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

  const handleClearAllInputs = () => {
    if (allFields && onInputChange) {
      allFields.forEach((f) => {
        if (f.type !== 'select') {
          onInputChange(f.key, '')
        }
      })
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

  // Deteksi jika user memasukkan angka minus pada multi-sampel Bab 1 & Bab 2
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

  // Deteksi jika user memasukkan angka minus pada tabel pasangan data (misal Direct Shear)
  const hasNegativeTableInput = Boolean(
    (testConfig.hasDynamicTable || testConfig.hasDynamicDirectShearTable) &&
    Array.isArray(inputs.points) &&
    inputs.points.some((p) => {
      const s = String(p.sigma !== undefined ? p.sigma : '').trim()
      const t = String(p.tau !== undefined ? p.tau : '').trim()
      const a = String(p.area !== undefined ? p.area : '').trim()
      const nl = String(p.normalLoad !== undefined ? p.normalLoad : '').trim()
      const sf = String(p.shearForce !== undefined ? p.shearForce : '').trim()
      return s.startsWith('-') || t.startsWith('-') || a.startsWith('-') || nl.startsWith('-') || sf.startsWith('-') ||
        (Number(s) < 0 && !isNaN(Number(s))) ||
        (Number(t) < 0 && !isNaN(Number(t))) ||
        (Number(a) < 0 && !isNaN(Number(a))) ||
        (Number(nl) < 0 && !isNaN(Number(nl))) ||
        (Number(sf) < 0 && !isNaN(Number(sf)))
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

  // Deteksi jika user memasukkan angka minus pada tabel CPT dinamis (Uji Sondir Mekanika Tanah)
  const hasNegativeCptInput = Boolean(
    testConfig.hasDynamicCptTable &&
    Array.isArray(inputs.cptRows) &&
    inputs.cptRows.some((r) => {
      const d = String(r.depth !== undefined ? r.depth : '').trim()
      const q = String(r.qc !== undefined ? r.qc : '').trim()
      const t = String(r.tw !== undefined ? r.tw : '').trim()
      return d.startsWith('-') || q.startsWith('-') || t.startsWith('-') ||
        (Number(d) < 0 && !isNaN(Number(d))) ||
        (Number(q) < 0 && !isNaN(Number(q))) ||
        (Number(t) < 0 && !isNaN(Number(t)))
    })
  )

  // Deteksi jika user memasukkan angka minus pada tabel multi-titik Standard Proctor (Mekanika Tanah Bab 3)
  const hasNegativeProctorInput = Boolean(
    testConfig.hasDynamicProctorTable &&
    Array.isArray(inputs.proctorSamples) &&
    inputs.proctorSamples.some((s) => {
      const d = String(s.diameterMold ?? '').trim()
      const h = String(s.heightMold ?? '').trim()
      const m = String(s.massMoldSoil ?? '').trim()
      const gs = String(s.gs ?? '').trim()
      const negMold = (Number(d) < 0) || (Number(h) < 0) || (Number(m) < 0) || (Number(gs) < 0)
      const negContainers = (s.containers || []).some((c) => {
        const m1 = String(c.m1 ?? '').trim()
        const m2 = String(c.m2 ?? '').trim()
        const m3 = String(c.m3 ?? '').trim()
        return (Number(m1) < 0) || (Number(m2) < 0) || (Number(m3) < 0)
      })
      return negMold || negContainers
    })
  )

  // Deteksi jika user memasukkan angka minus pada tabel saringan butiran tanah (Mekanika Tanah Bab 4)
  const hasNegativeSoilSieveInput = Boolean(
    testConfig.hasDynamicSoilSieveTable && (
      (inputs.wTotal !== undefined && inputs.wTotal !== '' && Number(inputs.wTotal) < 0) ||
      (inputs.panWeight !== undefined && inputs.panWeight !== '' && Number(inputs.panWeight) < 0) ||
      (Array.isArray(inputs.soilSieves) && inputs.soilSieves.some((s) => {
        const w = String(s.retainedWeight ?? '').trim()
        const d = String(s.diameter ?? '').trim()
        return (w !== '' && Number(w) < 0) || (d !== '' && Number(d) < 0)
      }))
    )
  )

  // Deteksi jika user memasukkan angka minus pada tabel konsolidasi oedometer (Mekanika Tanah Bab 5)
  const hasNegativeOedometerInput = Boolean(
    testConfig.hasDynamicOedometerTable && (
      (inputs.e0 !== undefined && inputs.e0 !== '' && Number(inputs.e0) < 0) ||
      (inputs.p1 !== undefined && inputs.p1 !== '' && Number(inputs.p1) < 0) ||
      (inputs.p2 !== undefined && inputs.p2 !== '' && Number(inputs.p2) < 0) ||
      (inputs.h0 !== undefined && inputs.h0 !== '' && Number(inputs.h0) < 0) ||
      (Array.isArray(inputs.oedometerReadings) && inputs.oedometerReadings.some((r) => {
        const t = String(r.t ?? '').trim()
        const dH = String(r.deltaH ?? '').trim()
        const h = String(r.h ?? '').trim()
        return (t !== '' && Number(t) < 0) || (dH !== '' && Number(dH) < 0) || (h !== '' && Number(h) < 0)
      }))
    )
  )

  // Deteksi jika user memasukkan angka minus pada tabel Osborne Reynolds (Mekanika Fluida Bab 2)
  const hasNegativeReynoldsInput = Boolean(
    testConfig.hasDynamicReynoldsTable &&
    Array.isArray(inputs.reynoldsRows) &&
    inputs.reynoldsRows.some((r) => {
      const t = String(r.t ?? '').trim()
      const v = String(r.volume ?? r.v ?? '').trim()
      const d = String(r.diameter ?? r.d ?? '').trim()
      const nu = String(r.viskositas ?? r.nu ?? '').trim()
      return (t !== '' && Number(t) < 0) ||
        (v !== '' && Number(v) < 0) ||
        (d !== '' && Number(d) < 0) ||
        (nu !== '' && Number(nu) < 0)
    })
  )

  // Deteksi jika user memasukkan angka minus pada kelompok pengujian penetrasi aspal (Bahan Perkerasan Bab 2)
  const hasNegativePenetrationInput = Boolean(
    testConfig.hasDynamicPenetrationGroups &&
    Array.isArray(inputs.groups) &&
    inputs.groups.some((g) => {
      return Array.isArray(g.points) && g.points.some((p) => {
        const val = String(p.value ?? '').trim()
        return val.startsWith('-') || (val !== '' && Number(val) < 0)
      })
    })
  )

  const hasNegativeDuctilityInput = Boolean(
    testConfig.hasDynamicDuctilityTable &&
    Array.isArray(inputs.samples) &&
    inputs.samples.some((s) => {
      const val = String(s.value ?? '').trim()
      return val.startsWith('-') || (val !== '' && Number(val) < 0)
    })
  )

  const hasNegativeViscosityInput = Boolean(
    testConfig.hasDynamicViscosityTable &&
    Array.isArray(inputs.viscosityPoints) &&
    inputs.viscosityPoints.some((p) => {
      const tVal = String(p.temp ?? '').trim()
      const wVal = String(p.time ?? '').trim()
      return tVal.startsWith('-') || (tVal !== '' && Number(tVal) < 0) ||
             wVal.startsWith('-') || (wVal !== '' && Number(wVal) < 0)
    })
  )

  const hasNegativeFlashSampleInput = Boolean(
    testConfig.hasDynamicFlashSamples &&
    Array.isArray(inputs.samples) &&
    inputs.samples.some((s) => {
      const fVal = String(s.flashPoint ?? '').trim()
      const bVal = String(s.firePoint ?? '').trim()
      return fVal.startsWith('-') || (fVal !== '' && Number(fVal) < 0) ||
             bVal.startsWith('-') || (bVal !== '' && Number(bVal) < 0)
    })
  )

  const hasNegativeJmfInput = Boolean(
    testConfig.hasDynamicJmfMixDesign &&
    Array.isArray(inputs.sieves) &&
    inputs.sieves.some((s) => {
      const val = String(s.retWeight ?? '').trim()
      return val.startsWith('-') || (val !== '' && Number(val) < 0)
    })
  )

  const hasNegativeMarshallInput = Boolean(
    testConfig.hasDynamicMarshallTest &&
    Array.isArray(inputs.specimens) &&
    inputs.specimens.some((s) => {
      const keys = ['pa', 'beratSsd', 'beratAir', 'beratKering', 'bacaanStab', 'flow', 'angkaKorelasi', 'stabilitas']
      return keys.some((k) => {
        const val = String(s[k] ?? '').trim()
        return val.startsWith('-') || (val !== '' && Number(val) < 0)
      })
    })
  )

  const hasNegativeInput = negativeFields.length > 0 || hasNegativeMultiSampleInput || hasNegativeTableInput || hasNegativeSieveInput || hasNegativeCptInput || hasNegativeProctorInput || hasNegativeSoilSieveInput || hasNegativeOedometerInput || hasNegativeReynoldsInput || hasNegativePenetrationInput || hasNegativeDuctilityInput || hasNegativeViscosityInput || hasNegativeFlashSampleInput || hasNegativeJmfInput || hasNegativeMarshallInput
  const hasExceededInput = exceededFields.length > 0

  // Data baris pengamatan dinamis untuk modul Uji Konsolidasi Oedometer (Bab 5 Mekanika Tanah)
  const rawOedometerList = testConfig.hasDynamicOedometerTable
    ? (Array.isArray(inputs.oedometerReadings) && inputs.oedometerReadings.length > 0
        ? inputs.oedometerReadings
        : (testConfig.initialInputs?.oedometerReadings || []))
    : []

  const currentOedometerReadings = useMemo(() => {
    return rawOedometerList
  }, [rawOedometerList])

  const handleOedometerReadingChange = (index, key, val) => {
    const h0 = Number(inputs.h0 || 2.0)
    const firstRowH = currentOedometerReadings[0]?.h !== undefined && currentOedometerReadings[0]?.h !== ''
      ? Number(currentOedometerReadings[0].h)
      : h0

    const updated = currentOedometerReadings.map((r, idx) => {
      if (idx === index) {
        const newRow = { ...r, [key]: val }
        const refH = index === 0 ? h0 : firstRowH
        // Auto-sync antara H dan deltaH
        if (key === 'deltaH') {
          const dHNum = val !== '' ? Number(val) : 0
          newRow.h = Number(Math.max(0, refH - dHNum).toFixed(4))
        } else if (key === 'h') {
          const hNum = val !== '' ? Number(val) : refH
          if (index === 0) {
            newRow.deltaH = 0
          } else {
            newRow.deltaH = Number(Math.max(0, firstRowH - hNum).toFixed(4))
          }
        }
        return newRow
      }
      return r
    })
    handleInputChange('oedometerReadings', updated)
  }

  const handleAddOedometerReading = () => {
    const lastRow = currentOedometerReadings[currentOedometerReadings.length - 1]
    const h0 = Number(inputs.h0 || 2.0)
    const newRow = {
      id: Date.now(),
      t: lastRow ? Number(lastRow.t) + 60 : 60,
      h: lastRow ? lastRow.h : h0,
      deltaH: lastRow ? lastRow.deltaH : 0,
    }
    const updated = [...currentOedometerReadings, newRow]
    handleInputChange('oedometerReadings', updated)
  }

  const handleRemoveOedometerReading = (index) => {
    if (currentOedometerReadings.length <= 1) return
    const updated = currentOedometerReadings.filter((_, idx) => idx !== index)
    handleInputChange('oedometerReadings', updated)
  }

  const handleResetOedometerReadings = () => {
    if (testConfig.initialInputs) {
      if (testConfig.initialInputs.oedometerReadings) {
        handleInputChange('oedometerReadings', JSON.parse(JSON.stringify(testConfig.initialInputs.oedometerReadings)))
      }
      if (testConfig.initialInputs.e0 !== undefined) handleInputChange('e0', testConfig.initialInputs.e0)
      if (testConfig.initialInputs.p1 !== undefined) handleInputChange('p1', testConfig.initialInputs.p1)
      if (testConfig.initialInputs.p2 !== undefined) handleInputChange('p2', testConfig.initialInputs.p2)
      if (testConfig.initialInputs.h0 !== undefined) handleInputChange('h0', testConfig.initialInputs.h0)
    }
  }

  const handleClearOedometerReadings = () => {
    const h0 = Number(inputs.h0 || 2.0)
    const cleared = currentOedometerReadings.map((r) => ({
      ...r,
      h: h0,
      deltaH: '',
    }))
    handleInputChange('oedometerReadings', cleared)
  }

  // Data saringan tanah dinamis untuk modul Analisis Saringan Butiran Tanah (Bab 4 Mekanika Tanah)
  const rawSoilSievesList = testConfig.hasDynamicSoilSieveTable
    ? (Array.isArray(inputs.soilSieves) && inputs.soilSieves.length > 0
        ? inputs.soilSieves
        : (testConfig.initialInputs?.soilSieves || []))
    : []

  const currentSoilSieves = useMemo(() => {
    return rawSoilSievesList
  }, [rawSoilSievesList])

  const handleSoilSieveChange = (index, key, val) => {
    const updated = currentSoilSieves.map((s, idx) => {
      if (idx === index) {
        return { ...s, [key]: val }
      }
      return s
    })
    handleInputChange('soilSieves', updated)
    // Jika user mengedit massa tertahan pada baris Pan, sinkronkan ke panWeight
    const target = updated[index]
    if (target && (target.isPan || Number(target.diameter) <= 0 || /pan/i.test(target.sieveNo)) && key === 'retainedWeight') {
      handleInputChange('panWeight', val)
    }
  }

  const handleAddSoilSieve = () => {
    const panIdx = currentSoilSieves.findIndex((s) => s.isPan || Number(s.diameter) <= 0 || /pan/i.test(s.sieveNo))
    const newRow = {
      id: Date.now(),
      sieveNo: 'Ayakan Baru',
      diameter: 1.0,
      retainedWeight: 0,
    }
    let updated
    if (panIdx !== -1) {
      updated = [...currentSoilSieves.slice(0, panIdx), newRow, ...currentSoilSieves.slice(panIdx)]
    } else {
      updated = [...currentSoilSieves, newRow]
    }
    handleInputChange('soilSieves', updated)
  }

  const handleRemoveSoilSieve = (index) => {
    if (currentSoilSieves.length <= 1) return
    const updated = currentSoilSieves.filter((_, idx) => idx !== index)
    handleInputChange('soilSieves', updated)
  }

  const handleResetSoilSieves = () => {
    if (testConfig.initialInputs) {
      if (testConfig.initialInputs.soilSieves) {
        handleInputChange('soilSieves', JSON.parse(JSON.stringify(testConfig.initialInputs.soilSieves)))
      }
      if (testConfig.initialInputs.wTotal !== undefined) {
        handleInputChange('wTotal', testConfig.initialInputs.wTotal)
      }
      if (testConfig.initialInputs.panWeight !== undefined) {
        handleInputChange('panWeight', testConfig.initialInputs.panWeight)
      }
    }
  }

  const handleClearSoilSieves = () => {
    const cleared = currentSoilSieves.map((s) => ({
      ...s,
      retainedWeight: '',
    }))
    handleInputChange('soilSieves', cleared)
    handleInputChange('panWeight', '')
  }

  // Data titik sampel dinamis untuk modul Standard Proctor ITERA (Bab 3 Mekanika Tanah)
  const rawProctorSamples = testConfig.hasDynamicProctorTable
    ? (Array.isArray(inputs.proctorSamples) && inputs.proctorSamples.length > 0
        ? inputs.proctorSamples
        : (testConfig.initialInputs?.proctorSamples || []))
    : []

  const currentProctorSamples = useMemo(() => {
    return rawProctorSamples
  }, [rawProctorSamples])

  const [activeProctorSampleIdx, setActiveProctorSampleIdx] = useState(0)

  const handleProctorMoldChange = (sampleIdx, key, val) => {
    const updated = currentProctorSamples.map((s, idx) => {
      if (idx === sampleIdx) {
        return { ...s, [key]: val }
      }
      return s
    })
    handleInputChange('proctorSamples', updated)
  }

  const handleProctorContainerChange = (sampleIdx, containerIdx, key, val) => {
    const updated = currentProctorSamples.map((s, idx) => {
      if (idx === sampleIdx) {
        const updatedContainers = (s.containers || []).map((c, cIdx) => {
          if (cIdx === containerIdx) {
            return { ...c, [key]: val }
          }
          return c
        })
        return { ...s, containers: updatedContainers }
      }
      return s
    })
    handleInputChange('proctorSamples', updated)
  }

  const handleAddProctorSample = () => {
    const nextIdx = currentProctorSamples.length + 1
    const lastSample = currentProctorSamples[currentProctorSamples.length - 1]
    const nextSample = {
      id: nextIdx,
      name: `Sampel ${nextIdx} (S${nextIdx})`,
      massMoldSoil: lastSample ? Number(lastSample.massMoldSoil || 450) : 450,
      diameterMold: lastSample ? Number(lastSample.diameterMold || 5.5) : 5.5,
      heightMold: lastSample ? Number(lastSample.heightMold || 10.0) : 10.0,
      gs: lastSample ? Number(lastSample.gs || 2.65) : 2.65,
      containers: [
        { id: 1, label: 'Kontainer 1', m1: 12.0, m2: 40.0, m3: 36.0 },
        { id: 2, label: 'Kontainer 2', m1: 12.0, m2: 40.0, m3: 36.0 },
        { id: 3, label: 'Kontainer 3', m1: 12.0, m2: 40.0, m3: 36.0 },
      ],
    }
    const updated = [...currentProctorSamples, nextSample]
    handleInputChange('proctorSamples', updated)
    setActiveProctorSampleIdx(updated.length - 1)
  }

  const handleRemoveProctorSample = (sampleIdx) => {
    if (currentProctorSamples.length <= 1) return
    const updated = currentProctorSamples.filter((_, idx) => idx !== sampleIdx)
    handleInputChange('proctorSamples', updated)
    if (activeProctorSampleIdx >= updated.length) {
      setActiveProctorSampleIdx(updated.length - 1)
    }
  }

  const handleResetProctorSamples = () => {
    if (testConfig.initialInputs?.proctorSamples) {
      handleInputChange('proctorSamples', JSON.parse(JSON.stringify(testConfig.initialInputs.proctorSamples)))
      setActiveProctorSampleIdx(0)
    }
  }

  const handleClearProctorSamples = () => {
    const cleared = currentProctorSamples.map((s) => ({
      ...s,
      massMoldSoil: '',
      containers: (s.containers || []).map((c) => ({
        ...c,
        m1: '',
        m2: '',
        m3: '',
      })),
    }))
    handleInputChange('proctorSamples', cleared)
  }

  // Data baris dinamis untuk modul Uji Sondir CPT (Bab 1 Penyelidikan Lapangan)
  const rawCptRowsList = testConfig.hasDynamicCptTable
    ? (Array.isArray(inputs.cptRows) && inputs.cptRows.length > 0 ? inputs.cptRows : (testConfig.initialInputs?.cptRows || []))
    : []

  const currentCptRows = useMemo(() => {
    return rawCptRowsList
  }, [rawCptRowsList])

  const handleCptRowChange = (index, key, val) => {
    const updated = currentCptRows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [key]: val }
      }
      return row
    })
    handleInputChange('cptRows', updated)
  }

  const handleAddCptRow = () => {
    const lastRow = currentCptRows[currentCptRows.length - 1]
    const nextDepth = lastRow ? Number((Number(lastRow.depth || 0) + 0.20).toFixed(2)) : 0.00
    const nextId = currentCptRows.length > 0 
      ? Math.max(...currentCptRows.map((r) => Number(r.id) || 0)) + 1 
      : 1
    const newRow = {
      id: nextId,
      depth: nextDepth,
      qc: 10,
      tw: 15,
    }
    const updated = [...currentCptRows, newRow]
    handleInputChange('cptRows', updated)
  }

  const handleRemoveCptRow = (index) => {
    if (currentCptRows.length <= 1) {
      return
    }
    const updated = currentCptRows.filter((_, idx) => idx !== index)
    handleInputChange('cptRows', updated)
  }

  const handleResetCptRows = () => {
    if (testConfig.initialInputs?.cptRows) {
      handleInputChange('cptRows', testConfig.initialInputs.cptRows.map((r) => ({ ...r })))
    }
  }

  // Data titik dinamis untuk modul tabel (Direct Shear)
  const currentPoints = (testConfig.hasDynamicTable || testConfig.hasDynamicDirectShearTable)
    ? (Array.isArray(inputs.points) && inputs.points.length > 0 ? inputs.points : (testConfig.initialInputs?.points || []))
    : []

  const handlePointChange = (index, key, val) => {
    const updated = currentPoints.map((pt, idx) => {
      if (idx === index) {
        const next = { ...pt, [key]: val }
        const areaVal = next.area !== undefined && next.area !== '' ? Number(next.area) : 31.17
        if (key === 'normalLoad' || key === 'area') {
          if (next.normalLoad !== undefined && next.normalLoad !== '' && !isNaN(Number(next.normalLoad)) && areaVal > 0) {
            next.sigma = Number((Number(next.normalLoad) / areaVal).toFixed(4))
          } else if (next.normalLoad === '') {
            next.sigma = ''
          }
        }
        if (key === 'shearForce' || key === 'area') {
          if (next.shearForce !== undefined && next.shearForce !== '' && !isNaN(Number(next.shearForce)) && areaVal > 0) {
            next.tau = Number((Number(next.shearForce) / areaVal).toFixed(4))
          } else if (next.shearForce === '') {
            next.tau = ''
          }
        }
        return next
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
    const nextArea = lastPoint?.area || 31.17
    const updated = [
      ...currentPoints,
      { id: nextId, area: nextArea, normalLoad: '', shearForce: '', sigma: '', tau: '' },
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

  const handleResetPoints = () => {
    handleInputChange('points', [
      { id: 1, area: 31.17, normalLoad: 3.17, shearForce: 1.50, sigma: 0.1017, tau: 0.0481 },
      { id: 2, area: 31.17, normalLoad: 6.325, shearForce: 2.35, sigma: 0.2029, tau: 0.0754 },
      { id: 3, area: 31.17, normalLoad: 12.65, shearForce: 4.05, sigma: 0.4058, tau: 0.1299 },
    ])
  }

  const handleClearPoints = () => {
    handleInputChange('points', [
      { id: 1, area: 31.17, normalLoad: '', shearForce: '', sigma: '', tau: '' },
      { id: 2, area: 31.17, normalLoad: '', shearForce: '', sigma: '', tau: '' },
      { id: 3, area: 31.17, normalLoad: '', shearForce: '', sigma: '', tau: '' },
    ])
  }

  // Data baris pengamatan dinamis untuk modul Osborne Reynolds (Bab 2 Mekanika Fluida)
  const currentReynoldsRows = testConfig.hasDynamicReynoldsTable
    ? (Array.isArray(inputs.reynoldsRows) && inputs.reynoldsRows.length > 0
        ? inputs.reynoldsRows
        : (testConfig.initialInputs?.reynoldsRows || []))
    : []

  const handleReynoldsRowChange = (index, key, val) => {
    const updated = currentReynoldsRows.map((r, idx) => {
      if (idx === index) {
        return { ...r, [key]: val }
      }
      return r
    })
    handleInputChange('reynoldsRows', updated)
  }

  const handleAddReynoldsRow = () => {
    const nextId = currentReynoldsRows.length > 0
      ? Math.max(...currentReynoldsRows.map(r => Number(r.id) || 0)) + 1
      : 1
    const lastRow = currentReynoldsRows[currentReynoldsRows.length - 1]
    const nextDiameter = lastRow?.diameter || 11
    const nextViskositas = lastRow?.viskositas || 0.893
    const nextVolume = lastRow?.volume || 0.5
    const updated = [
      ...currentReynoldsRows,
      {
        id: nextId,
        label: `Uji ${nextId}`,
        t: '',
        volume: nextVolume,
        diameter: nextDiameter,
        viskositas: nextViskositas,
        visualNote: '',
      },
    ]
    handleInputChange('reynoldsRows', updated)
  }

  const handleRemoveReynoldsRow = (index) => {
    if (currentReynoldsRows.length <= 1) return
    const updated = currentReynoldsRows.filter((_, idx) => idx !== index)
    handleInputChange('reynoldsRows', updated)
  }

  const handleResetReynoldsRows = () => {
    if (testConfig.initialInputs?.reynoldsRows) {
      handleInputChange(
        'reynoldsRows',
        JSON.parse(JSON.stringify(testConfig.initialInputs.reynoldsRows))
      )
    }
  }

  const handleClearReynoldsRows = () => {
    const cleared = currentReynoldsRows.map((r) => ({
      ...r,
      t: '',
      visualNote: '',
    }))
    handleInputChange('reynoldsRows', cleared)
  }

  // Data kelompok pengujian dinamis untuk modul Uji Penetrasi Aspal Keras (Bab 2 Bahan Perkerasan)
  const currentPenetrationGroups = useMemo(() => {
    if (!testConfig.hasDynamicPenetrationGroups) return []
    if (Array.isArray(inputs.groups) && inputs.groups.length > 0) return inputs.groups
    return testConfig.initialInputs?.groups || DEFAULT_PENETRATION_GROUPS || []
  }, [testConfig.hasDynamicPenetrationGroups, inputs.groups, testConfig.initialInputs])

  const handlePenetrationPointChange = (groupId, pointId, value) => {
    const updated = currentPenetrationGroups.map((grp) => {
      if (grp.id !== groupId) return grp
      const newPoints = (grp.points || []).map((pt) => {
        if (pt.id !== pointId) return pt
        return { ...pt, value: value === '' ? '' : Number(value) }
      })
      return { ...grp, points: newPoints }
    })
    handleInputChange('groups', updated)
  }

  const handleAddPenetrationPoint = (groupId) => {
    const updated = currentPenetrationGroups.map((grp) => {
      if (grp.id !== groupId) return grp
      const points = grp.points || []
      const nextId = points.length > 0 ? Math.max(...points.map((p) => Number(p.id) || 0)) + 1 : 1
      const lastVal = points.length > 0 ? points[points.length - 1].value : 65.0
      return {
        ...grp,
        points: [...points, { id: nextId, value: lastVal !== '' && lastVal !== null ? lastVal : 65.0 }],
      }
    })
    handleInputChange('groups', updated)
  }

  const handleRemovePenetrationPoint = (groupId, pointId) => {
    const updated = currentPenetrationGroups.map((grp) => {
      if (grp.id !== groupId) return grp
      const points = grp.points || []
      if (points.length <= 1) return grp
      return {
        ...grp,
        points: points.filter((pt) => pt.id !== pointId),
      }
    })
    handleInputChange('groups', updated)
  }

  const handleAddPenetrationGroup = () => {
    const nextGId = currentPenetrationGroups.length > 0
      ? Math.max(...currentPenetrationGroups.map((g) => Number(g.id) || 0)) + 1
      : 1
    const charCode = 65 + ((nextGId - 1) % 26)
    const newGroup = {
      id: nextGId,
      name: `Kelompok ${nextGId} (Sampel ${String.fromCharCode(charCode)})`,
      points: [
        { id: 1, value: 64.0 },
        { id: 2, value: 65.0 },
        { id: 3, value: 64.5 },
      ],
    }
    handleInputChange('groups', [...currentPenetrationGroups, newGroup])
  }

  const handleRemovePenetrationGroup = (groupId) => {
    if (currentPenetrationGroups.length <= 1) return
    const updated = currentPenetrationGroups.filter((g) => g.id !== groupId)
    handleInputChange('groups', updated)
  }

  const handleResetPenetrationGroups = () => {
    const defaultData = testConfig.initialInputs?.groups || DEFAULT_PENETRATION_GROUPS
    handleInputChange('groups', JSON.parse(JSON.stringify(defaultData)))
    if (testConfig.initialInputs?.kelasAspal) {
      handleInputChange('kelasAspal', testConfig.initialInputs.kelasAspal)
    }
    if (testConfig.initialInputs?.suhuUji !== undefined) {
      handleInputChange('suhuUji', testConfig.initialInputs.suhuUji)
    }
    if (testConfig.initialInputs?.bebanJarum !== undefined) {
      handleInputChange('bebanJarum', testConfig.initialInputs.bebanJarum)
    }
    if (testConfig.initialInputs?.waktuPenetrasi !== undefined) {
      handleInputChange('waktuPenetrasi', testConfig.initialInputs.waktuPenetrasi)
    }
  }

  const handleClearPenetrationGroups = () => {
    const cleared = currentPenetrationGroups.map((grp) => ({
      ...grp,
      points: (grp.points || []).map((pt) => ({ ...pt, value: '' })),
    }))
    handleInputChange('groups', cleared)
  }

  // Data sampel dinamis untuk modul Uji Daktilitas Aspal (Bab 6 Bahan Perkerasan)
  const currentDuctilitySamples = useMemo(() => {
    if (!testConfig.hasDynamicDuctilityTable) return []
    if (Array.isArray(inputs.samples) && inputs.samples.length > 0) return inputs.samples
    return testConfig.initialInputs?.samples || DEFAULT_DUCTILITY_SAMPLES || []
  }, [testConfig.hasDynamicDuctilityTable, inputs.samples, testConfig.initialInputs])

  const handleDuctilitySampleChange = (id, value) => {
    const updated = currentDuctilitySamples.map((s) => {
      if (s.id !== id) return s
      return { ...s, value: value === '' ? '' : Number(value) }
    })
    handleInputChange('samples', updated)
  }

  const handleToggleDuctilitySampleValid = (id) => {
    const updated = currentDuctilitySamples.map((s) => {
      if (s.id !== id) return s
      return { ...s, isValid: s.isValid !== undefined ? !s.isValid : false }
    })
    handleInputChange('samples', updated)
  }

  const handleAddDuctilitySample = () => {
    const nextId = currentDuctilitySamples.length > 0
      ? Math.max(...currentDuctilitySamples.map((s) => Number(s.id) || 0)) + 1
      : 1
    const unit = inputs.satuanInput || 'cm'
    const defaultVal = unit === 'mm' ? 1200.0 : 120.0
    const newSample = {
      id: nextId,
      name: `Cetakan / Benda Uji ${nextId}`,
      value: defaultVal,
      isValid: true,
    }
    handleInputChange('samples', [...currentDuctilitySamples, newSample])
  }

  const handleRemoveDuctilitySample = (id) => {
    if (currentDuctilitySamples.length <= 1) return
    const updated = currentDuctilitySamples.filter((s) => s.id !== id)
    handleInputChange('samples', updated)
  }

  const handleDuctilityUnitChange = (newUnit) => {
    const prevUnit = inputs.satuanInput || 'cm'
    if (prevUnit === newUnit) return

    handleInputChange('satuanInput', newUnit)

    const updated = currentDuctilitySamples.map((s) => {
      const raw = s.value
      if (raw === '' || raw === null || raw === undefined || isNaN(Number(raw))) {
        return s
      }
      const num = Number(raw)
      const converted = newUnit === 'mm' ? +(num * 10).toFixed(1) : +(num / 10).toFixed(1)
      return { ...s, value: converted }
    })
    handleInputChange('samples', updated)
  }

  const handleResetDuctilitySamples = () => {
    const defaultSamples = testConfig.initialInputs?.samples || DEFAULT_DUCTILITY_SAMPLES
    handleInputChange('satuanInput', testConfig.initialInputs?.satuanInput || 'cm')
    handleInputChange('kelasAspal', testConfig.initialInputs?.kelasAspal || 'pen6070')
    handleInputChange('samples', JSON.parse(JSON.stringify(defaultSamples)))
  }

  const handleClearDuctilitySamples = () => {
    const cleared = currentDuctilitySamples.map((s) => ({
      ...s,
      value: '',
    }))
    handleInputChange('samples', cleared)
  }

  // Data titik pengamatan dinamis untuk modul Uji Viskositas Saybolt Furol (Bab 7 Bahan Perkerasan)
  const currentViscosityPoints = useMemo(() => {
    if (!testConfig.hasDynamicViscosityTable) return []
    if (Array.isArray(inputs.viscosityPoints) && inputs.viscosityPoints.length > 0) return inputs.viscosityPoints
    return testConfig.initialInputs?.viscosityPoints || DEFAULT_VISCOSITY_POINTS || []
  }, [testConfig.hasDynamicViscosityTable, inputs.viscosityPoints, testConfig.initialInputs])

  const handleViscosityPointChange = (id, field, value) => {
    const updated = currentViscosityPoints.map((p) => {
      if (p.id !== id) return p
      return { ...p, [field]: value === '' ? '' : Number(value) }
    })
    handleInputChange('viscosityPoints', updated)
  }

  const handleAddViscosityPoint = () => {
    const nextId = currentViscosityPoints.length > 0
      ? Math.max(...currentViscosityPoints.map((p) => Number(p.id) || 0)) + 1
      : 1
    const lastPoint = currentViscosityPoints[currentViscosityPoints.length - 1]
    const lastTemp = lastPoint && !isNaN(Number(lastPoint.temp)) ? Number(lastPoint.temp) : 165
    const newTemp = +(lastTemp + 15).toFixed(1)
    const newPoint = {
      id: nextId,
      temp: newTemp,
      time: 25.0,
    }
    handleInputChange('viscosityPoints', [...currentViscosityPoints, newPoint])
  }

  const handleRemoveViscosityPoint = (id) => {
    if (currentViscosityPoints.length <= 2) return
    const updated = currentViscosityPoints.filter((p) => p.id !== id)
    handleInputChange('viscosityPoints', updated)
  }

  const handleTargetPresetChange = (preset) => {
    handleInputChange('standarTarget', preset)
    if (preset === 'binamarga') {
      handleInputChange('vMixMin', 150.0)
      handleInputChange('vMixMax', 190.0)
      handleInputChange('vCompMin', 250.0)
      handleInputChange('vCompMax', 310.0)
    } else if (preset === 'lab') {
      handleInputChange('vMixMin', 170.0)
      handleInputChange('vMixMax', 230.0)
      handleInputChange('vCompMin', 250.0)
      handleInputChange('vCompMax', 350.0)
    }
  }

  const handleResetViscosityPoints = () => {
    const defaultPoints = testConfig.initialInputs?.viscosityPoints || DEFAULT_VISCOSITY_POINTS
    handleInputChange('metodeKonversi', testConfig.initialInputs?.metodeKonversi || 'astm')
    handleInputChange('standarTarget', testConfig.initialInputs?.standarTarget || 'binamarga')
    handleInputChange('vMixMin', testConfig.initialInputs?.vMixMin || 150.0)
    handleInputChange('vMixMax', testConfig.initialInputs?.vMixMax || 190.0)
    handleInputChange('vCompMin', testConfig.initialInputs?.vCompMin || 250.0)
    handleInputChange('vCompMax', testConfig.initialInputs?.vCompMax || 310.0)
    handleInputChange('viscosityPoints', JSON.parse(JSON.stringify(defaultPoints)))
  }

  const handleClearViscosityPoints = () => {
    const cleared = currentViscosityPoints.map((p) => ({
      ...p,
      time: '',
    }))
    handleInputChange('viscosityPoints', cleared)
  }

  // Data sampel dinamis untuk seluruh modul Bab 1 & Bab 2 (Agregat Halus & Kasar)
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
          [field]: field === 'name' ? value : (value === '' ? '' : (isNaN(Number(value)) ? value : Number(value))),
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
    const name = testConfig.sampleNamePrefix
      ? `${testConfig.sampleNamePrefix}${nextId}`
      : `Benda Uji ${romanNumerals[nextId - 1] || nextId}`
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
    const newSpecName = `Benda Uji ${roman}`
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

  // Data sampel dinamis untuk modul Uji Titik Nyala & Titik Bakar (Bahan Perkerasan Bab 5)
  const currentFlashSamples = useMemo(() => {
    if (!testConfig.hasDynamicFlashSamples) return []
    if (Array.isArray(inputs.samples)) return inputs.samples
    return testConfig.initialInputs?.samples || DEFAULT_FLASH_SAMPLES
  }, [testConfig.hasDynamicFlashSamples, inputs.samples, testConfig.initialInputs])

  const handleFlashSampleChange = (id, field, value) => {
    const updated = currentFlashSamples.map((s) => {
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

  const handleAddFlashSample = () => {
    const nextId = currentFlashSamples.length > 0
      ? Math.max(...currentFlashSamples.map((s) => Number(s.id) || 0)) + 1
      : 1
    const lastSample = currentFlashSamples[currentFlashSamples.length - 1]
    const newSample = {
      id: nextId,
      flashPoint: lastSample && lastSample.flashPoint !== '' ? lastSample.flashPoint : 320.0,
      firePoint: lastSample && lastSample.firePoint !== '' ? lastSample.firePoint : 330.0,
    }
    handleInputChange('samples', [...currentFlashSamples, newSample])
  }

  const handleRemoveFlashSample = (id) => {
    const updated = currentFlashSamples.filter((s) => s.id !== id)
    handleInputChange('samples', updated)
  }

  const handleResetFlashSamples = () => {
    const defaultSamples = testConfig.initialInputs?.samples || DEFAULT_FLASH_SAMPLES
    handleInputChange('tekananK', testConfig.initialInputs?.tekananK || 727.0)
    handleInputChange('tekananKUnit', testConfig.initialInputs?.tekananKUnit || 'mmHg')
    handleInputChange('syaratNyalaMin', testConfig.initialInputs?.syaratNyalaMin || 232)
    handleInputChange('samples', JSON.parse(JSON.stringify(defaultSamples)))
  }

  const handleClearFlashSamples = () => {
    const cleared = currentFlashSamples.map((s) => ({
      ...s,
      flashPoint: '',
      firePoint: '',
    }))
    handleInputChange('samples', cleared)
  }

  const handleFlashUnitPressureChange = (newUnit) => {
    const currentVal = Number(inputs.tekananK)
    if (!isNaN(currentVal) && currentVal > 0) {
      if (newUnit === 'kPa' && inputs.tekananKUnit !== 'kPa') {
        const converted = Number((currentVal * 0.13332237).toFixed(2))
        handleInputChange('tekananK', converted)
      } else if (newUnit === 'mmHg' && inputs.tekananKUnit !== 'mmHg') {
        const converted = Number((currentVal / 0.13332237).toFixed(1))
        handleInputChange('tekananK', converted)
      }
    }
    handleInputChange('tekananKUnit', newUnit)
  }

  // State & Handlers untuk Modul Job Mix Formula (JMF) & Mix Design AC-WC (Bab 8 BP-8-1)
  const [jmfChartTab, setJmfChartTab] = useState('gambar1119')

  const rawJmfSieves = testConfig.hasDynamicJmfMixDesign
    ? (Array.isArray(inputs.sieves) && inputs.sieves.length > 0 ? inputs.sieves : (testConfig.initialInputs?.sieves || DEFAULT_JMF_SIEVES))
    : []

  const currentJmfSieves = useMemo(() => {
    return rawJmfSieves
  }, [rawJmfSieves])

  const handleJmfSieveRetWeightChange = (id, value) => {
    const updated = currentJmfSieves.map((s) => (s.id === id ? { ...s, retWeight: value } : s))
    handleInputChange('sieves', updated)
  }

  const handleResetJmfToLaprak = () => {
    handleInputChange('sieves', DEFAULT_JMF_SIEVES)
    handleInputChange('wTotal', 1200)
    handleInputChange('pbRencana', 6.5)
    handleInputChange('k', 0.75)
    handleInputChange('jenisCampuran', 'ac-wc')
  }

  // State & Handlers untuk Modul Uji Karakteristik Marshall (Bab 9 BP-9-1)
  const [marshallInputTab, setMarshallInputTab] = useState('tab1')
  const [selectedSpecimenStepId, setSelectedSpecimenStepId] = useState(3)

  const rawMarshallSpecimens = testConfig.hasDynamicMarshallTest
    ? (Array.isArray(inputs.specimens) && inputs.specimens.length > 0 ? inputs.specimens : (testConfig.initialInputs?.specimens || DEFAULT_MARSHALL_SPECIMENS))
    : []

  const currentMarshallSpecimens = useMemo(() => {
    return rawMarshallSpecimens
  }, [rawMarshallSpecimens])

  const rawMarshallSurfaceAreaTable = testConfig.hasDynamicMarshallTest
    ? (Array.isArray(inputs.surfaceAreaTable) && inputs.surfaceAreaTable.length > 0 ? inputs.surfaceAreaTable : (testConfig.initialInputs?.surfaceAreaTable || DEFAULT_MARSHALL_SURFACE_AREA_TABLE))
    : []

  const currentMarshallSurfaceAreaTable = useMemo(() => {
    return rawMarshallSurfaceAreaTable
  }, [rawMarshallSurfaceAreaTable])

  const handleMarshallSpecimenChange = (id, key, val) => {
    const updated = currentMarshallSpecimens.map((s) => {
      if (s.id === id) {
        return { ...s, [key]: val }
      }
      return s
    })
    handleInputChange('specimens', updated)
  }

  const handleAddMarshallSpecimen = () => {
    const nextId = currentMarshallSpecimens.length > 0
      ? Math.max(...currentMarshallSpecimens.map((s) => Number(s.id) || 0)) + 1
      : 1
    const nextNo = currentMarshallSpecimens.length + 1
    const newSpecimen = {
      id: nextId,
      no: nextNo,
      pa: 6.0,
      beratSsd: 1150.0,
      beratAir: 610.0,
      beratKering: 1145.0,
      bacaanStab: 200,
      flow: 2.50,
      angkaKorelasi: inputs.angkaKorelasiBeban || 0.886,
    }
    handleInputChange('specimens', [...currentMarshallSpecimens, newSpecimen])
    setSelectedSpecimenStepId(nextId)
  }

  const handleRemoveMarshallSpecimen = (id) => {
    if (currentMarshallSpecimens.length <= 1) return
    const filtered = currentMarshallSpecimens.filter((s) => s.id !== id)
    handleInputChange('specimens', filtered)
    if (selectedSpecimenStepId === id && filtered.length > 0) {
      setSelectedSpecimenStepId(filtered[0].id)
    }
  }

  const handleMarshallSurfaceAreaChange = (id, key, val) => {
    const updated = currentMarshallSurfaceAreaTable.map((row) => {
      if (row.id === id) {
        return { ...row, [key]: val }
      }
      return row
    })
    handleInputChange('surfaceAreaTable', updated)
  }

  const handleMarshallHeightChange = (val) => {
    handleInputChange('tinggiBriket', val)
    const tNum = Number(val)
    if (!isNaN(tNum) && tNum > 0) {
      const autoK = interpolateMarshallCorrelation(tNum * 10)
      handleInputChange('angkaKorelasiBeban', autoK)
    }
  }

  const handleResetMarshallToLaprak = () => {
    handleInputChange('jenisCampuran', 'ac-wc')
    handleInputChange('diameter', 10.2)
    handleInputChange('tinggiBriket', 6.85)
    handleInputChange('kalibrasiAlat', 12.9961)
    handleInputChange('angkaKorelasiBeban', 0.886)
    handleInputChange('gsb1', 2.09495)
    handleInputChange('gsb2', 2.64648)
    handleInputChange('gsb3', 2.574)
    handleInputChange('gsa1', 2.23583)
    handleInputChange('gsa2', 2.80412)
    handleInputChange('gsa3', 2.735)
    handleInputChange('ga', 1.03431)
    handleInputChange('caPct', 39.0)
    handleInputChange('faPct', 54.5)
    handleInputChange('fillerPct', 6.5)
    handleInputChange('p1', 36.465)
    handleInputChange('p2', 50.958)
    handleInputChange('p3', 6.0775)
    handleInputChange('surfaceAreaTable', DEFAULT_MARSHALL_SURFACE_AREA_TABLE)
    handleInputChange('specimens', DEFAULT_MARSHALL_SPECIMENS)
    setSelectedSpecimenStepId(3)
  }

  // Data saringan dinamis untuk modul analisis gradasi (Agregat Kasar Bab 2 & Halus Bab 1)
  const rawSievesList = testConfig.hasDynamicSieveTable
    ? (Array.isArray(inputs.sieves) && inputs.sieves.length > 0 ? inputs.sieves : (testConfig.initialInputs?.sieves || []))
    : []

  // Normalisasi sieves: Pastikan hanya ada tepat 1 baris Pan di urutan paling akhir
  const currentSieves = useMemo(() => {
    if (!testConfig.hasDynamicSieveTable || rawSievesList.length === 0) return []
    const nonPanList = []
    let foundPan = null

    for (const item of rawSievesList) {
      const isItemPan = item.isPan === true || String(item.label || '').toLowerCase().includes('pan')
      if (isItemPan) {
        if (!foundPan) {
          foundPan = {
            ...item,
            id: item.id || 999,
            size: 0,
            label: 'Pan Penampung (Dasar)',
            isPan: true,
          }
        }
      } else {
        nonPanList.push({
          ...item,
          isPan: false,
        })
      }
    }

    if (!foundPan) {
      foundPan = {
        id: 999,
        size: 0,
        label: 'Pan Penampung (Dasar)',
        weight: 0,
        isPan: true,
      }
    }

    return [...nonPanList, foundPan]
  }, [testConfig.hasDynamicSieveTable, rawSievesList])

  const handleSieveChange = (index, keyOrObj, val) => {
    const updated = currentSieves.map((s, idx) => {
      if (idx === index) {
        if (typeof keyOrObj === 'object' && keyOrObj !== null) {
          return { ...s, ...keyOrObj }
        }
        return { ...s, [keyOrObj]: val }
      }
      return s
    })
    handleInputChange('sieves', updated)
    if (sieveAlert) setSieveAlert(null)
  }

  const handleAddSieve = () => {
    const nonPanList = currentSieves.filter((s) => !s.isPan)
    const panItem = currentSieves.find((s) => s.isPan) || { id: 999, size: 0, label: 'Pan Penampung (Dasar)', weight: 0, isPan: true }
    const nextId = currentSieves.length > 0
      ? Math.max(...currentSieves.map((s) => Number(s.id) || 0)) + 1
      : 1
    const defaultPreset = testConfig.isCoarse
      ? { label: '1/2" (12.5 mm)', size: 12.5 }
      : { label: 'No. 8 (2.36 mm)', size: 2.36 }
    const newSieve = {
      id: nextId,
      size: defaultPreset.size,
      label: defaultPreset.label,
      weight: 0,
      isPan: false,
    }
    const updated = [...nonPanList, newSieve, panItem]
    handleInputChange('sieves', updated)
    if (sieveAlert) setSieveAlert(null)
  }

  const handleRemoveSieve = (index) => {
    const targetSieve = currentSieves[index]
    if (targetSieve?.isPan) {
      setSieveAlert('Pan Penampung (Dasar) adalah wadah permanen dan tidak dapat dihapus.')
      return
    }
    const nonPanCount = currentSieves.filter((s) => !s.isPan).length
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
        ...rawCalcOutput,
        results: Array.isArray(rawCalcOutput?.results) ? rawCalcOutput.results.map((res) => ({ ...res, value: '-' })) : [],
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
        ...rawCalcOutput,
        results: Array.isArray(rawCalcOutput?.results) ? rawCalcOutput.results.map((res) => ({ ...res, value: '-' })) : [],
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

      {/* Modul Uji Sondir CPT (Tabel Dinamis Excel & Grafik Stratigrafi) ATAU Grid Kalkulator Standar */}
      {testConfig.hasDynamicCptTable ? (
        <DynamicCptSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentCptRows={currentCptRows}
          onRowChange={handleCptRowChange}
          onAddRow={handleAddCptRow}
          onRemoveRow={handleRemoveCptRow}
          onResetRows={handleResetCptRows}
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
      ) : testConfig.hasDynamicProctorTable ? (
        <DynamicProctorSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentProctorSamples={currentProctorSamples}
          activeProctorSampleIdx={activeProctorSampleIdx}
          setActiveProctorSampleIdx={setActiveProctorSampleIdx}
          onMoldChange={handleProctorMoldChange}
          onContainerChange={handleProctorContainerChange}
          onAddSample={handleAddProctorSample}
          onRemoveSample={handleRemoveProctorSample}
          onResetSamples={handleResetProctorSamples}
          onClearSamples={handleClearProctorSamples}
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
      ) : testConfig.hasDynamicSoilSieveTable ? (
        <DynamicSoilSieveSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentSoilSieves={currentSoilSieves}
          onSieveChange={handleSoilSieveChange}
          onAddSieve={handleAddSoilSieve}
          onRemoveSieve={handleRemoveSoilSieve}
          onResetSieves={handleResetSoilSieves}
          onClearSieves={handleClearSoilSieves}
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
      ) : testConfig.hasDynamicOedometerTable ? (
        <DynamicOedometerSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentOedometerReadings={currentOedometerReadings}
          onReadingChange={handleOedometerReadingChange}
          onAddReading={handleAddOedometerReading}
          onRemoveReading={handleRemoveOedometerReading}
          onResetReadings={handleResetOedometerReadings}
          onClearReadings={handleClearOedometerReadings}
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
      ) : testConfig.hasDynamicDirectShearTable ? (
        <DynamicDirectShearSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentPoints={currentPoints}
          onPointChange={handlePointChange}
          onAddPoint={handleAddPoint}
          onRemovePoint={handleRemovePoint}
          onResetPoints={handleResetPoints}
          onClearPoints={handleClearPoints}
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
      ) : testConfig.hasDynamicReynoldsTable ? (
        <DynamicReynoldsSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentReynoldsRows={currentReynoldsRows}
          onRowChange={handleReynoldsRowChange}
          onAddRow={handleAddReynoldsRow}
          onRemoveRow={handleRemoveReynoldsRow}
          onResetRows={handleResetReynoldsRows}
          onClearRows={handleClearReynoldsRows}
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
      ) : testConfig.hasDynamicPenetrationGroups ? (
        <DynamicPenetrationSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentPenetrationGroups={currentPenetrationGroups}
          onPointChange={handlePenetrationPointChange}
          onAddPoint={handleAddPenetrationPoint}
          onRemovePoint={handleRemovePenetrationPoint}
          onAddGroup={handleAddPenetrationGroup}
          onRemoveGroup={handleRemovePenetrationGroup}
          onResetGroups={handleResetPenetrationGroups}
          onClearGroups={handleClearPenetrationGroups}
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
      ) : testConfig.hasDynamicDuctilityTable ? (
        <DynamicDuctilitySection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentDuctilitySamples={currentDuctilitySamples}
          onSampleChange={handleDuctilitySampleChange}
          onToggleSampleValid={handleToggleDuctilitySampleValid}
          onAddSample={handleAddDuctilitySample}
          onRemoveSample={handleRemoveDuctilitySample}
          onResetSamples={handleResetDuctilitySamples}
          onClearSamples={handleClearDuctilitySamples}
          onUnitChange={handleDuctilityUnitChange}
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
      ) : testConfig.hasDynamicViscosityTable ? (
        <DynamicViscositySection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentViscosityPoints={currentViscosityPoints}
          onPointChange={handleViscosityPointChange}
          onAddPoint={handleAddViscosityPoint}
          onRemovePoint={handleRemoveViscosityPoint}
          onResetPoints={handleResetViscosityPoints}
          onClearPoints={handleClearViscosityPoints}
          onTargetPresetChange={handleTargetPresetChange}
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
      ) : testConfig.hasMultiSample ? (
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
      ) : testConfig.hasDynamicFlashSamples ? (
        <DynamicFlashPointSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentFlashSamples={currentFlashSamples}
          onSampleChange={handleFlashSampleChange}
          onAddSample={handleAddFlashSample}
          onRemoveSample={handleRemoveFlashSample}
          onResetSamples={handleResetFlashSamples}
          onClearSamples={handleClearFlashSamples}
          onUnitPressureChange={handleFlashUnitPressureChange}
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
      ) : testConfig.hasDynamicJmfMixDesign ? (
        <DynamicJmfMixSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentJmfSieves={currentJmfSieves}
          onSieveRetWeightChange={handleJmfSieveRetWeightChange}
          onResetToLaprak={handleResetJmfToLaprak}
          jmfChartTab={jmfChartTab}
          setJmfChartTab={setJmfChartTab}
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
      ) : testConfig.hasDynamicMarshallTest ? (
        <DynamicMarshallSection
          testConfig={testConfig}
          inputs={inputs}
          calcOutput={calcOutput}
          currentMarshallSpecimens={currentMarshallSpecimens}
          currentMarshallSurfaceAreaTable={currentMarshallSurfaceAreaTable}
          marshallInputTab={marshallInputTab}
          setMarshallInputTab={setMarshallInputTab}
          selectedSpecimenStepId={selectedSpecimenStepId}
          setSelectedSpecimenStepId={setSelectedSpecimenStepId}
          onSpecimenChange={handleMarshallSpecimenChange}
          onAddSpecimen={handleAddMarshallSpecimen}
          onRemoveSpecimen={handleRemoveMarshallSpecimen}
          onSurfaceAreaChange={handleMarshallSurfaceAreaChange}
          onHeightChange={handleMarshallHeightChange}
          onResetToLaprak={handleResetMarshallToLaprak}
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
      ) : (
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
                specimens={currentSpecimens}
                onSpecimenAdd={handleAddSpecimen}
                onSpecimenRemove={handleRemoveSpecimen}
                onSieveWeightChange={handleSieveWeightChange}
              />
            )}

            {/* Multi-Tab / Step Header (Khusus Modul seperti Uji Marshall) */}
            {testConfig.fieldTabs && (
              <div className="calc-step-tabs-container mb-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5 overflow-x-auto">
                  {testConfig.fieldTabs.map((tab, idx) => {
                    const isActive = activeStepTab === idx
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isActive 
                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                        onClick={() => setActiveStepTab(idx)}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive ? 'bg-white text-blue-600' : 'bg-slate-300 text-slate-700'
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="leading-tight">{tab.label}</span>
                          {tab.sub && <span className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>{tab.sub}</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {allFields && allFields.length > 0 && (
              <div className="calc-fields-list">
                {(testConfig.fieldTabs 
                  ? allFields.filter((f) => testConfig.fieldTabs[activeStepTab]?.fields.includes(f.key)) 
                  : allFields
                ).map((field) => {
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
                              min={field.min !== undefined ? field.min : 0.01}
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

            {/* Navigasi Tombol Multi-Tab Berikutnya/Sebelumnya */}
            {testConfig.fieldTabs && (
              <div className="calc-tab-nav-buttons flex justify-between items-center mt-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  disabled={activeStepTab === 0}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  onClick={() => setActiveStepTab((prev) => Math.max(0, prev - 1))}
                >
                  ← Tab Sebelumnya
                </button>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Langkah {activeStepTab + 1} dari {testConfig.fieldTabs.length}
                </span>
                <button
                  type="button"
                  disabled={activeStepTab === testConfig.fieldTabs.length - 1}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                  onClick={() => setActiveStepTab((prev) => Math.min(testConfig.fieldTabs.length - 1, prev + 1))}
                >
                  Tab Berikutnya →
                </button>
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
                <span>Reset</span>
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
                    <strong className={`calc-metric-number ${String(res.value || '').length > 12 ? 'calc-metric-text-sm' : ''}`}>
                      {formatScientificInText(res.value)}
                    </strong>
                    {res.unit && <span className="calc-metric-unit">{res.unit}</span>}
                  </div>
                  {res.sub && res.value !== '-' && (
                    <span className="calc-metric-sub">{res.sub}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Tabel Rekapitulasi Perbandingan Sampel (Format Laporan Praktikum) */}
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

          {/* Card Panel Khusus: Grafik Kurva Viskositas Saybolt Furol vs Suhu (Bab 7) */}
          {calcOutput.viscosityChart && !calcOutput.isError && (
            <ViscosityCurveChart data={calcOutput.viscosityChart} />
          )}

          {/* Card Panel Khusus: Tabel 5 Variasi Kadar Aspal JMF Briket (Bab 8) */}
          {calcOutput.jmfTable && !calcOutput.isError && (
            <JmfVariationTable data={calcOutput.jmfTable} />
          )}

          {/* Card Panel Khusus: Checklist Evaluasi Parameter Marshall Bina Marga 2018 (Bab 9) */}
          {calcOutput.marshallChecklist && !calcOutput.isError && (
            <MarshallChecklistCard data={calcOutput.marshallChecklist} />
          )}

          {/* Card Panel Khusus: Klasifikasi Permeabilitas Tanah SNI 2435 / ASTM D2434 (Bab 6) */}
          {calcOutput.permeabilityTable && !calcOutput.isError && (
            <PermeabilityClassificationCard data={calcOutput.permeabilityTable} />
          )}
        </div>
      </div>
      )}
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
                            title={`Hapus kolom ${name}`}
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
                    <span className={`point-badge ${isPan ? 'point-badge-pan' : ''}`}>
                      {isPan ? 'Pan' : `#${index + 1}`}
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
                              {sieve.label || `Kustom (${sieve.size} mm)`}
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
                              label: matched ? matched.label : (val === '' ? '' : `${val} mm`),
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
                                onKeyDown={(e) => onKeyDown(e, `weight_${k}`)}
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
              domain={sieves.length > 0 ? [sieves[0], sieves[sieves.length - 1]] : ['auto', 'auto']}
              ticks={sieves}
              interval={0}
              allowDataOverflow={true}
              tickFormatter={(val) => {
                const pt = chartDataPoints.find(
                  (p) => Math.abs((p.size ?? p.sieveSize) - val) < 0.02 || Math.abs((p.size ?? p.sieveSize) - val) / (val || 1) < 0.05
                )
                return pt ? pt.sieveLabel : ''
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

function ViscosityCurveChart({ data }) {
  if (!data) return null

  // Interval ticks sumbu X kelipatan 5°C
  const xTicks = data.xTicks && data.xTicks.length > 0
    ? data.xTicks
    : (() => {
        const pts = data.chartPoints || []
        if (pts.length === 0) return [115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170]
        const tMin = Math.floor((pts[0].temp || 115) / 5) * 5
        const tMax = Math.ceil((pts[pts.length - 1].temp || 170) / 5) * 5
        const arr = []
        for (let t = tMin; t <= tMax; t += 5) arr.push(t)
        return arr
      })()

  // Domain sumbu X dengan offset agar label pertama (115°C) tidak menempel di pojok (0,0)
  const xDomain = [
    data.minTempChart ? data.minTempChart - 3 : (xTicks[0] ? xTicks[0] - 3 : 'dataMin - 3'),
    data.maxTempChart ? data.maxTempChart + 3 : (xTicks[xTicks.length - 1] ? xTicks[xTicks.length - 1] + 3 : 'dataMax + 3')
  ]

  return (
    <div className="calc-card-box viscosity-curve-card" style={{ marginTop: '1.25rem' }}>
      <div className="calc-card-header">
        <div className="calc-card-header-icon" style={{ backgroundColor: '#EEF2FF', color: '#4F46E5' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div>
          <h3 className="calc-card-title">Kurva Hubungan Suhu vs Viskositas Kinematik Saybolt Furol (SNI 7729:2011)</h3>
          <span className="calc-card-subtitle">
            Plot regresi semi-logaritmik untuk penentuan batas suhu pencampuran & pemadatan aspal panas
          </span>
        </div>
      </div>

      <div style={{ padding: '0.75rem 0 0 0' }}>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data.chartPoints} margin={{ top: 20, right: 30, left: 75, bottom: 28 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="temp"
              type="number"
              domain={xDomain}
              ticks={xTicks}
              tickFormatter={(val) => `${val}°C`}
              stroke="#64748B"
              tickLine={{ stroke: '#CBD5E1' }}
              tick={{ fontSize: 11, fill: '#64748B' }}
              allowDataOverflow={true}
            >
              <Label
                value="Suhu Pengujian (°C)"
                offset={-14}
                position="insideBottom"
                fill="#475569"
                fontSize={11}
                style={{ textAnchor: 'middle', fontWeight: 600 }}
              />
            </XAxis>
            <YAxis
              stroke="#64748B"
              tickLine={{ stroke: '#CBD5E1' }}
              tick={{ fontSize: 11, fill: '#64748B' }}
              domain={[0, 'auto']}
              allowDataOverflow={true}
              tickFormatter={(val) => Math.round(val)}
            >
              <Label
                value="Viskositas Kinematik (cSt)"
                angle={-90}
                position="insideLeft"
                offset={-58}
                fill="#475569"
                fontSize={11}
                style={{ textAnchor: 'middle', fontWeight: 600 }}
              />
            </YAxis>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload
                  return (
                    <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '0.6rem 0.85rem', borderRadius: '0.5rem', fontSize: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)' }}>
                      <p style={{ margin: 0, fontWeight: '700', borderBottom: '1px solid #334155', paddingBottom: '0.25rem' }}>
                        Suhu: {p.temp} °C
                      </p>
                      <p style={{ margin: '0.35rem 0 0', color: '#93C5FD' }}>
                        Viskositas Regresi: <strong>{p.viskositasRegresi} cSt</strong>
                      </p>
                      {p.viskositasUji !== null && (
                        <p style={{ margin: '0.2rem 0 0', color: '#FCA5A5' }}>
                          Data Uji Lab: <strong>{p.viskositasUji} cSt</strong>
                        </p>
                      )}
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '0.75rem', paddingBottom: '0.5rem' }} />
            <Line
              type="monotone"
              dataKey="viskositasRegresi"
              name="Kurva Regresi log(v) = a + b·T"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="viskositasUji"
              name="Titik Data Pengujian Lab"
              stroke="#DC2626"
              strokeWidth={0}
              dot={{ r: 5.5, fill: '#DC2626', stroke: '#FFFFFF', strokeWidth: 2 }}
              isAnimationActive={false}
            />
            {data.pointsData && data.pointsData.map((pt) => (
              <ReferenceDot
                key={`ref-dot-${pt.no}`}
                x={pt.temp}
                y={pt.cst}
                r={5.5}
                fill="#DC2626"
                stroke="#FFFFFF"
                strokeWidth={2}
                ifOverflow="extendDomain"
              />
            ))}
            <Line
              type="monotone"
              dataKey="batasMixMin"
              name={`Rentang Pencampuran (${data.vMixMin}-${data.vMixMax} cSt)`}
              stroke="#16A34A"
              strokeDasharray="5 5"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="batasMixMax"
              stroke="#16A34A"
              strokeDasharray="5 5"
              strokeWidth={1.5}
              dot={false}
              legendType="none"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="batasCompMin"
              name={`Rentang Pemadatan (${data.vCompMin}-${data.vCompMax} cSt)`}
              stroke="#D97706"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="batasCompMax"
              stroke="#D97706"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={false}
              legendType="none"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabel Data Titik Pengujian Lab */}
      <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: '#F8FAFC', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', display: 'block', marginBottom: '0.45rem' }}>
          Data Titik Pengujian Laboratorium & Parameter Garis Regresi:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))', gap: '0.45rem', textAlign: 'center', marginBottom: '0.6rem' }}>
          {data.pointsData.map((pt) => (
            <div key={pt.no} style={{ backgroundColor: '#FFFFFF', padding: '0.4rem 0.5rem', borderRadius: '0.4rem', border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Titik {pt.no} ({pt.temp}°C)</span>
              <strong style={{ color: '#0F172A', fontSize: '0.82rem', display: 'block', margin: '0.1rem 0' }}>{pt.cst.toFixed(1)} cSt</strong>
              <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block' }}>Waktu: {pt.sfs.toFixed(0)} SFS</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem 0.75rem', paddingTop: '0.55rem', borderTop: '1px solid #E2E8F0', fontSize: '0.72rem', color: '#475569' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ color: '#64748B' }}>Persamaan Garis:</span>
            <strong style={{ color: '#1E40AF', fontFamily: 'monospace', fontSize: '0.74rem' }}>{data.regresiStr}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ color: '#64748B' }}>Koefisien Determinasi:</span>
            <strong style={{ color: '#15803D', fontWeight: 700 }}>R² = {data.r2.toFixed(4)}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ color: '#64748B' }}>Viskositas @135°C:</span>
            <strong style={{ color: data.v135 >= 300 ? '#15803D' : '#D97706', fontWeight: 700 }}>
              {data.v135.toFixed(1)} cSt {data.v135 >= 300 ? '(≥ 300 cSt ✓)' : '(< 300 cSt ⚠)'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}

function JmfVariationTable({ data }) {
  if (!data || !Array.isArray(data.rows)) return null

  return (
    <div className="calc-card-box jmf-table-card" style={{ marginTop: '1.25rem' }}>
      <div className="calc-card-header">
        <div className="calc-card-header-icon" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
        </div>
        <div>
          <h3 className="calc-card-title">Tabel Proporsi Campuran 5 Variasi Briket Marshall (Pd T-03-2005-B)</h3>
          <span className="calc-card-subtitle">
            Rincian berat fraksi agregat dan aspal untuk 1 briket rencana ({data.wTotal.toFixed(0)} gram) dalam penentuan Kadar Aspal Optimum (KAO)
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '2px solid #CBD5E1', color: '#334155' }}>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700' }}>Variasi Briket</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', textAlign: 'center' }}>Kadar Aspal (%)</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', textAlign: 'right' }}>Berat Aspal (g)</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', textAlign: 'right' }}>Berat Agregat (g)</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', textAlign: 'right' }}>Berat CA ({data.ca}%)</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', textAlign: 'right' }}>Berat FA ({data.fa}%)</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', textAlign: 'right' }}>Berat Filler ({data.filler}%)</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: row.isAcuan ? '#EFF6FF' : idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                  fontWeight: row.isAcuan ? '700' : '400',
                }}
              >
                <td style={{ padding: '0.6rem 0.75rem', color: row.isAcuan ? '#1E40AF' : '#1E293B' }}>
                  {row.nama}
                  {row.isAcuan && (
                    <span style={{ marginLeft: '0.4rem', fontSize: '0.65rem', backgroundColor: '#DBEAFE', color: '#1D4ED8', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      KAA Acuan
                    </span>
                  )}
                </td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: row.isAcuan ? '#1E40AF' : '#0F172A', fontWeight: '700' }}>
                  {row.kadarAspal.toFixed(1)}%
                </td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#0F172A' }}>{row.beratAspal.toFixed(1)} g</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#0F172A' }}>{row.beratAgTotal.toFixed(1)} g</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#475569' }}>{row.beratCa.toFixed(1)} g</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#475569' }}>{row.beratFa.toFixed(1)} g</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: '#475569' }}>{row.beratFiller.toFixed(1)} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '0.65rem', padding: '0.6rem 0.85rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem', fontSize: '0.72rem', color: '#64748B', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span>Komposisi Fraksi Agregat: <strong>CA = {data.ca}%</strong> | <strong>FA = {data.fa}%</strong> | <strong>Filler = {data.filler}%</strong> (Total = 100.0%)</span>
        <span>Total Berat Campuran per Briket: <strong>{data.wTotal.toFixed(0)} gram</strong></span>
      </div>
    </div>
  )
}

function MarshallChecklistCard({ data }) {
  if (!data || !Array.isArray(data.items)) return null

  return (
    <div className="calc-card-box marshall-checklist-card" style={{ marginTop: '1.25rem' }}>
      <div className="calc-card-header">
        <div className="calc-card-header-icon" style={{ backgroundColor: '#FDF4FF', color: '#9333EA' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <h3 className="calc-card-title">Checklist Evaluasi Parameter Marshall (Bina Marga 2018 - {data.jenis.toUpperCase()})</h3>
          <span className="calc-card-subtitle">
            Verifikasi kepatuhan parameter volumetrik & kekuatan mekanis terhadap ambang batas spesifikasi teknis
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
        {data.items.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '0.85rem',
              borderRadius: '0.75rem',
              border: item.passed ? '1px solid #BBF7D0' : '1px solid #FECACA',
              backgroundColor: item.passed ? '#F0FDF4' : '#FEF2F2',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1E293B' }}>{item.param}</span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '9999px',
                    backgroundColor: item.passed ? '#DCFCE7' : '#FEE2E2',
                    color: item.passed ? '#166534' : '#991B1B',
                  }}
                >
                  {item.passed ? 'LULUS' : 'GAGAL'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.25rem 0' }}>
                <strong style={{ fontSize: '1.25rem', color: item.passed ? '#15803D' : '#DC2626' }}>{item.nilai}</strong>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Syarat: {item.syarat}</span>
              </div>
            </div>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.68rem', color: item.passed ? '#166534' : '#991B1B', lineHeight: '1.4', paddingTop: '0.35rem', borderTop: item.passed ? '1px solid #DCFCE7' : '1px solid #FEE2E2' }}>
              {item.diagnosis}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Card Panel Khusus: Tabel Klasifikasi Permeabilitas Tanah SNI 2435:2008 / ASTM D2434
function PermeabilityClassificationCard({ data }) {
  if (!data) return null

  const rows = [
    {
      key: 'gravel',
      tipe: 'Kerikil Bersih (Clean Gravel)',
      rentang: '> 1.0 cm/s (> 10⁰)',
      metode: 'Constant Head',
      sifat: 'Rembesan sangat cepat / permeabilitas sangat tinggi',
      drainase: 'Sangat Baik',
    },
    {
      key: 'coarse_sand',
      tipe: 'Pasir Kasar (Coarse Sand)',
      rentang: '10⁻² – 1.0 cm/s (0.01 – 1)',
      metode: 'Constant Head',
      sifat: 'Rembesan cepat / permeabilitas tinggi',
      drainase: 'Baik',
    },
    {
      key: 'fine_sand',
      tipe: 'Pasir Halus (Fine Sand)',
      rentang: '10⁻³ – 10⁻² cm/s (0.001 – 0.01)',
      metode: 'Constant Head / Falling Head',
      sifat: 'Rembesan sedang / permeabilitas moderat',
      drainase: 'Cukup',
    },
    {
      key: 'silt',
      tipe: 'Lanau (Silt)',
      rentang: '10⁻⁵ – 10⁻³ cm/s (0.00001 – 0.001)',
      metode: 'Falling Head',
      sifat: 'Rembesan rendah / permeabilitas rendah',
      drainase: 'Buruk',
    },
    {
      key: 'clay',
      tipe: 'Lempung (Clay)',
      rentang: '≤ 10⁻⁵ cm/s (≤ 0.00001)',
      metode: 'Falling Head',
      sifat: 'Rembesan sangat lambat / praktis kedap air',
      drainase: 'Praktis Kedap Air',
    },
  ]

  const activeKey = data.categoryKey

  return (
    <div className="calc-card-box perm-classification-card" style={{ marginTop: '1.25rem' }}>
      <div className="calc-card-header">
        <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
        <div>
          <h3 className="calc-card-title">Tabel Klasifikasi Permeabilitas Tanah (SNI 2435 / ASTM D2434)</h3>
          <span className="calc-card-subtitle">
            Standar acuan laju rembesan tanah, rekomendasi metode pengujian, dan karakteristik drainase geoteknik
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table className="perm-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', textAlign: 'left', borderBottom: '2px solid #E2E8F0' }}>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', color: '#334155' }}>Klasifikasi Tanah</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', color: '#334155' }}>Koefisien Rembesan (k)</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', color: '#334155' }}>Metode Rekomendasi</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', color: '#334155' }}>Karakteristik Drainase</th>
              <th style={{ padding: '0.65rem 0.75rem', fontWeight: '700', color: '#334155', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isActive = r.key === activeKey
              return (
                <tr
                  key={r.key}
                  style={{
                    backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                    borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <td style={{ padding: '0.65rem 0.75rem', fontWeight: isActive ? '700' : '500', color: isActive ? '#1E40AF' : '#1E293B', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {isActive && (
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                      )}
                      <span>{r.tipe}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'monospace', fontWeight: isActive ? '700' : '400', color: isActive ? '#1E40AF' : '#475569', borderBottom: '1px solid #F1F5F9' }}>
                    {r.rentang}
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#475569', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontWeight: '600',
                      backgroundColor: r.metode.includes('Constant') && r.metode.includes('Falling') ? '#FEF3C7' : r.metode.includes('Constant') ? '#E0F2FE' : '#F3E8FF',
                      color: r.metode.includes('Constant') && r.metode.includes('Falling') ? '#92400E' : r.metode.includes('Constant') ? '#0369A1' : '#6B21A8',
                    }}>
                      {r.metode}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#475569', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ fontWeight: isActive ? '600' : '400' }}>{r.drainase}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{r.sifat}</div>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', borderBottom: '1px solid #F1F5F9' }}>
                    {isActive ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '9999px',
                        backgroundColor: '#DBEAFE',
                        color: '#1D4ED8',
                      }}>
                        ★ Sampel Uji
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', borderRadius: '0.6rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Hasil Pengujian:</span>
          <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>{data.tipe} ({data.labelEn})</strong>
          <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.45rem', borderRadius: '0.375rem', backgroundColor: '#E2E8F0', color: '#334155' }}>
            Metode: {data.metode}
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Terverifikasi SNI 2435:2008 / ASTM D2434
        </div>
      </div>
    </div>
  )
}

// Tooltip Kustom untuk Grafik Recharts Sondir CPT (Sinkron 3 Parameter)
function CustomCptTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const fsVal = data.fs !== undefined ? data.fs : data.hambatanSetempat
    const frVal = data.fr !== undefined ? data.fr : data.frictionRatio
    return (
      <div
        style={{
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '0.65rem 0.9rem',
          borderRadius: '0.6rem',
          fontSize: '0.78rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          border: '1px solid #334155',
          minWidth: '190px',
        }}
      >
        <div style={{ fontWeight: '700', borderBottom: '1px solid #334155', paddingBottom: '0.35rem', marginBottom: '0.35rem', color: '#F8FAFC' }}>
          Kedalaman: {Number(data.depth || 0).toFixed(2)} m
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ color: '#93C5FD', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
            <span>qc (Konus):</span>
            <strong>{Number(data.qc || 0).toFixed(1)} kg/cm²</strong>
          </div>
          <div style={{ color: '#FDBA74', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
            <span>fs (Pelekat):</span>
            <strong>{Number(fsVal || 0).toFixed(2)} kg/cm²</strong>
          </div>
          <div style={{ color: '#86EFAC', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
            <span>FR (Rasio):</span>
            <strong>{data.qc > 0 ? `${Number(frVal || 0).toFixed(2)}%` : '-'}</strong>
          </div>
          {data.jumlahHambatanPelekat !== undefined && (
            <div style={{ color: '#CBD5E1', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
              <span>JHP Kumulatif:</span>
              <span>{Number(data.jumlahHambatanPelekat || 0).toFixed(1)} kg/cm</span>
            </div>
          )}
          {data.rowSoil && (
            <div style={{ marginTop: '0.3rem', paddingTop: '0.3rem', borderTop: '1px dashed #334155', color: '#4ADE80', fontSize: '0.74rem' }}>
              Lapisan: <strong>{data.rowSoil}</strong>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

// Komponen Modul Khusus: Uji Sondir CPT (Tabel Dinamis Excel & Grafik Stratigrafi Recharts)
function DynamicCptSection({
  testConfig,
  inputs,
  calcOutput,
  currentCptRows,
  onRowChange,
  onAddRow,
  onRemoveRow,
  onResetRows,
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
  const computedRows = calcOutput.cptRows || []
  const chartData = calcOutput.chartData || []
  const totalKedalaman = calcOutput.totalKedalaman ?? 0
  const avgQc = calcOutput.avgQc ?? 0
  const totalJhp = calcOutput.totalJhp ?? (computedRows.length > 0 ? computedRows[computedRows.length - 1].jumlahHambatanPelekat : 0)
  const avgFr = calcOutput.avgFr ?? 0
  const predictedSoil = calcOutput.predictedSoil || '-'
  const hasInvalidRow = Boolean(calcOutput.hasInvalidRow)

  return (
    <div className="cpt-dynamic-container" style={{ width: '100%', marginTop: '0.5rem' }}>
      {/* Toast Notifikasi Tersimpan */}
      {savedNotification && (
        <div className="calc-saved-toast">
          <div className="calc-toast-icon">
            <CheckCircle2 size={18} />
          </div>
          <div className="calc-toast-text">
            <strong>Data Uji Sondir Berhasil Disimpan!</strong>
            <span>Rekam data kedalaman {totalKedalaman.toFixed(2)} m telah ditambahkan ke dashboard riwayat pengujian ({lastSavedId}).</span>
          </div>
        </div>
      )}

      {/* 1. KARTU RINGKASAN ATAS (5 METRIK UTAMA GEOTEKNIK) */}
      <div className="cpt-summary-grid">
        {/* Card 1: Total Kedalaman */}
        <div className="cpt-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Total Kedalaman</span>
            <span className="cpt-metric-badge badge-blue">Selesai Uji</span>
          </div>
          <div className="cpt-metric-value">
            {totalKedalaman.toFixed(2)} <span className="cpt-metric-unit">m</span>
          </div>
          <div className="cpt-metric-footer">Kedalaman Penetrasi Akhir</div>
        </div>

        {/* Card 2: Rata-rata qc */}
        <div className="cpt-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Rata-rata qc</span>
            <span className="cpt-metric-badge badge-blue">Konus</span>
          </div>
          <div className="cpt-metric-value" style={{ color: '#2563EB' }}>
            {avgQc.toFixed(1)} <span className="cpt-metric-unit">kg/cm²</span>
          </div>
          <div className="cpt-metric-footer">Hambatan Penetrasi Konus</div>
        </div>

        {/* Card 3: Total JHP Kumulatif */}
        <div className="cpt-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Total JHP Kumulatif</span>
            <span className="cpt-metric-badge badge-amber">Pelekat</span>
          </div>
          <div className="cpt-metric-value" style={{ color: '#C2410C' }}>
            {totalJhp.toFixed(1)} <span className="cpt-metric-unit">kg/cm</span>
          </div>
          <div className="cpt-metric-footer">Jumlah Hambatan Pelekat</div>
        </div>

        {/* Card 4: Rata-rata FR */}
        <div className="cpt-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Rata-rata FR</span>
            <span className="cpt-metric-badge badge-orange">Selubung</span>
          </div>
          <div className="cpt-metric-value" style={{ color: '#EA580C' }}>
            {avgFr.toFixed(2)} <span className="cpt-metric-unit">%</span>
          </div>
          <div className="cpt-metric-footer">Friction Ratio Rata-rata</div>
        </div>

        {/* Card 5: Prediksi Lapisan Tanah */}
        <div className="cpt-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Prediksi Lapisan</span>
            <span className="cpt-metric-badge badge-emerald">Robertson</span>
          </div>
          <div className="cpt-metric-value text-soil-name" style={{ color: '#0F766E', fontSize: '1.05rem', fontWeight: '800' }}>
            {predictedSoil}
          </div>
          <div className="cpt-metric-footer">Estimasi Berdasarkan Korelasi FR</div>
        </div>
      </div>

      {/* 2. TABEL PERHITUNGAN SONDIR (SPREADSHEET EXCEL) */}
      <div className="calc-card-box cpt-card-box" style={{ marginTop: '0.5rem' }}>
        {/* Header Box Tabel */}
        <div className="calc-card-header cpt-table-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="calc-card-title">Tabel Perhitungan Sondir (Spreadsheet Excel)</h3>
              <span className="calc-card-subtitle">
                Ketik kedalaman, qc, dan tw. Nilai Friction (d), fs, JHP Kumulatif, dan FR terhitung otomatis real-time.
              </span>
            </div>
          </div>

          <div className="cpt-header-actions">
            <button
              type="button"
              className="btn-cpt-add-row"
              onClick={onAddRow}
              title="Tambah baris kedalaman baru (+0.20 m)"
            >
              <Plus size={15} />
              <span>Tambah Baris</span>
            </button>
            <button
              type="button"
              className="btn-cpt-reset-sample"
              onClick={onResetRows}
              title="Kembalikan data tabel ke 15 baris contoh awal (lapisan realistis)"
            >
              <RotateCcw size={14} />
              <span>Reset Contoh</span>
            </button>
          </div>
        </div>

        {/* Alert Error jika tw < qc */}
        {hasInvalidRow && (
          <div className="cpt-invalid-alert-banner">
            <AlertTriangle size={18} />
            <div>
              <strong>Peringatan Validitas Manometer:</strong> Terdapat baris di mana Jumlah Hambatan (tw) lebih kecil dari Hambatan Konus (qc). Harap periksa kembali input baris yang bergaris merah.
            </div>
          </div>
        )}

        {/* Alert Error jika angka negatif */}
        {hasNegativeInput && (
          <div className="cpt-invalid-alert-banner">
            <AlertTriangle size={18} />
            <div>
              <strong>Input Tidak Valid:</strong> Nilai kedalaman, qc, atau tw tidak boleh bernilai negatif.
            </div>
          </div>
        )}

        {/* Container Tabel Dinamis dengan Horizontal Scroll Responsif */}
        <div className="cpt-table-responsive">
          <table className="cpt-spreadsheet-table">
            <thead>
              <tr>
                <th style={{ width: '42px', textAlign: 'center' }}>No</th>
                <th style={{ minWidth: '95px' }}>Kedalaman <span className="th-unit">(m)</span></th>
                <th style={{ minWidth: '115px' }}>Hambatan Konus (qc) <span className="th-unit">(kg/cm²)</span></th>
                <th style={{ minWidth: '115px' }}>Jumlah Hambatan (tw) <span className="th-unit">(kg/cm²)</span></th>
                <th style={{ minWidth: '95px', textAlign: 'center' }}>Friction (d) <span className="th-unit">(kg/cm²)</span></th>
                <th style={{ minWidth: '100px', textAlign: 'center' }}>Hambatan Setempat (fs) <span className="th-unit">(kg/cm²)</span></th>
                <th style={{ minWidth: '120px', textAlign: 'center' }}>Jml Hambatan Pelekat (JHP) <span className="th-unit">(kg/cm)</span></th>
                <th style={{ minWidth: '85px', textAlign: 'center' }}>FR (%) <span className="th-unit">(%)</span></th>
                <th style={{ width: '45px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {computedRows.map((row, index) => {
                const isRowInvalid = Boolean(row.isInvalid)
                return (
                  <tr key={row.id || index} className={`${index % 2 === 1 ? 'row-zebra' : ''} ${isRowInvalid ? 'row-invalid' : ''}`}>
                    <td style={{ textAlign: 'center', fontWeight: '700', color: '#64748B' }}>
                      {index + 1}
                    </td>
                    <td>
                      <div className="cpt-cell-input-wrap">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className={`cpt-input-number ${isRowInvalid ? 'input-error' : ''}`}
                          value={row.depth !== undefined ? row.depth : ''}
                          onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'depth')}
                          onChange={(e) => onRowChange(index, 'depth', e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="cpt-cell-input-wrap">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.0"
                          className={`cpt-input-number ${isRowInvalid ? 'input-error' : ''}`}
                          value={row.qc !== undefined ? row.qc : ''}
                          onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'qc')}
                          onChange={(e) => onRowChange(index, 'qc', e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="cpt-cell-input-wrap">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.0"
                          className={`cpt-input-number ${isRowInvalid ? 'input-error' : ''}`}
                          value={row.tw !== undefined ? row.tw : ''}
                          onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'tw')}
                          onChange={(e) => onRowChange(index, 'tw', e.target.value)}
                          title={isRowInvalid ? 'Jumlah Hambatan (tw) tidak boleh lebih kecil dari Hambatan Konus (qc)' : ''}
                        />
                      </div>
                      {isRowInvalid && (
                        <div className="cpt-cell-error-tip">
                          tw &lt; qc !
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`cpt-read-value ${isRowInvalid ? 'val-invalid' : ''}`}>
                        {isRowInvalid ? '-' : row.friction.toFixed(1)}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`cpt-read-value ${isRowInvalid ? 'val-invalid' : ''}`}>
                        {isRowInvalid ? '-' : row.hambatanSetempat.toFixed(2)}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`cpt-read-value ${isRowInvalid ? 'val-invalid' : 'val-jhp'}`} style={{ color: '#C2410C', fontWeight: 700 }}>
                        {isRowInvalid ? '-' : Number(row.jumlahHambatanPelekat || 0).toFixed(1)}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`cpt-read-value ${isRowInvalid ? 'val-invalid' : 'val-fr'}`}>
                        {isRowInvalid ? '-' : (row.qc > 0 ? `${row.frictionRatio.toFixed(2)}%` : '-')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="btn-cpt-remove-row"
                        onClick={() => onRemoveRow(index)}
                        disabled={computedRows.length <= 1}
                        title={computedRows.length <= 1 ? 'Minimal harus ada 1 baris pengujian' : 'Hapus baris ini'}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Actions of Table */}
        <div className="cpt-table-footer-bar">
          <span className="cpt-table-count-label">
            Menampilkan <strong>{computedRows.length}</strong> interval kedalaman pengujian (0.00 m - {totalKedalaman.toFixed(2)} m)
          </span>
          <button
            type="button"
            className="btn-cpt-add-sub"
            onClick={onAddRow}
          >
            <Plus size={14} />
            <span>+ Tambah Baris Kedalaman Berikutnya</span>
          </button>
        </div>
      </div>

      {/* 3. PANEL 3 GRAFIK STRATIGRAFI SONDIR SEJAJAR (STANDAR GEOTEKNIK) */}
      <div className="calc-card-box cpt-charts-triplet-card">
        <div className="calc-card-header cpt-table-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="calc-card-title">Kurva Profil Stratigrafi Sondir (3 Grafik Sejajar)</h3>
              <span className="calc-card-subtitle">
                Standar Geoteknik SNI 2827:2008 &amp; ASTM D3441 • Step Chart 20 cm • Sumbu Y Terbalik (Kedalaman 0 m di Atas) • Kursor Sinkron Otomatis
              </span>
            </div>
          </div>
          <div className="cpt-chart-badges-row" style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="cpt-chart-badge badge-blue">1. qc (Biru)</span>
            <span className="cpt-chart-badge badge-orange">2. fs (Orange)</span>
            <span className="cpt-chart-badge badge-emerald">3. FR (Hijau)</span>
          </div>
        </div>

        {/* Grid 3 Grafik Sejajar: Kiri (qc), Tengah (fs), Kanan (FR) */}
        <div className="cpt-charts-triplet-grid">
          {/* Grafik 1 (Kiri): Hambatan Konus (qc) */}
          <div className="cpt-triplet-item">
            <div className="cpt-triplet-header">
              <div className="cpt-triplet-title-wrap">
                <h4 className="cpt-triplet-title">Grafik 1: Hambatan Konus (qc)</h4>
                <span className="cpt-triplet-sub">Sumbu X: qc (kg/cm²) • Step Chart</span>
              </div>
              <span className="cpt-chart-badge badge-blue">qc (kg/cm²)</span>
            </div>

            <div className="cpt-recharts-box">
              <ResponsiveContainer width="100%" height={340}>
                <LineChart
                  layout="vertical"
                  data={chartData}
                  syncId="cpt-profile"
                  margin={{ top: 20, right: 25, left: 55, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    domain={[0, 'auto']}
                    stroke="#64748B"
                    fontSize={11}
                  >
                    <Label
                      value="Hambatan Konus qc (kg/cm²)"
                      offset={-18}
                      position="insideBottom"
                      fill="#334155"
                      fontSize={11}
                      fontWeight={700}
                      style={{ textAnchor: 'middle' }}
                    />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="depth"
                    reversed={true}
                    domain={[0, Math.max(3.0, totalKedalaman)]}
                    stroke="#64748B"
                    fontSize={11}
                    width={45}
                  >
                    <Label
                      value="Kedalaman (m)"
                      angle={-90}
                      position="insideLeft"
                      offset={-15}
                      fill="#334155"
                      fontSize={11}
                      fontWeight={700}
                      style={{ textAnchor: 'middle' }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomCptTooltip />} />
                  <Line
                    type="step"
                    dataKey="qc"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#2563EB' }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 2 (Tengah): Hambatan Pelekat Lokal (fs) */}
          <div className="cpt-triplet-item">
            <div className="cpt-triplet-header">
              <div className="cpt-triplet-title-wrap">
                <h4 className="cpt-triplet-title">Grafik 2: Hambatan Setempat (fs)</h4>
                <span className="cpt-triplet-sub">Sumbu X: fs = d / 10 (kg/cm²) • Step Chart</span>
              </div>
              <span className="cpt-chart-badge badge-orange">fs (kg/cm²)</span>
            </div>

            <div className="cpt-recharts-box">
              <ResponsiveContainer width="100%" height={340}>
                <LineChart
                  layout="vertical"
                  data={chartData}
                  syncId="cpt-profile"
                  margin={{ top: 20, right: 25, left: 55, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    domain={[0, 'auto']}
                    stroke="#64748B"
                    fontSize={11}
                  >
                    <Label
                      value="Hambatan Setempat fs (kg/cm²)"
                      offset={-18}
                      position="insideBottom"
                      fill="#334155"
                      fontSize={11}
                      fontWeight={700}
                      style={{ textAnchor: 'middle' }}
                    />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="depth"
                    reversed={true}
                    domain={[0, Math.max(3.0, totalKedalaman)]}
                    stroke="#64748B"
                    fontSize={11}
                    width={45}
                  >
                    <Label
                      value="Kedalaman (m)"
                      angle={-90}
                      position="insideLeft"
                      offset={-15}
                      fill="#334155"
                      fontSize={11}
                      fontWeight={700}
                      style={{ textAnchor: 'middle' }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomCptTooltip />} />
                  <Line
                    type="step"
                    dataKey="fs"
                    stroke="#EA580C"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#EA580C' }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 3 (Kanan): Friction Ratio (FR) */}
          <div className="cpt-triplet-item">
            <div className="cpt-triplet-header">
              <div className="cpt-triplet-title-wrap">
                <h4 className="cpt-triplet-title">Grafik 3: Friction Ratio (FR)</h4>
                <span className="cpt-triplet-sub">Sumbu X: FR (%) • Batas 1.5% &amp; 3.0%</span>
              </div>
              <span className="cpt-chart-badge badge-emerald">FR (%)</span>
            </div>

            <div className="cpt-recharts-box">
              <ResponsiveContainer width="100%" height={340}>
                <LineChart
                  layout="vertical"
                  data={chartData}
                  syncId="cpt-profile"
                  margin={{ top: 20, right: 25, left: 55, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    domain={[0, 'auto']}
                    stroke="#64748B"
                    fontSize={11}
                  >
                    <Label
                      value="Friction Ratio FR (%)"
                      offset={-18}
                      position="insideBottom"
                      fill="#334155"
                      fontSize={11}
                      fontWeight={700}
                      style={{ textAnchor: 'middle' }}
                    />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="depth"
                    reversed={true}
                    domain={[0, Math.max(3.0, totalKedalaman)]}
                    stroke="#64748B"
                    fontSize={11}
                    width={45}
                  >
                    <Label
                      value="Kedalaman (m)"
                      angle={-90}
                      position="insideLeft"
                      offset={-15}
                      fill="#334155"
                      fontSize={11}
                      fontWeight={700}
                      style={{ textAnchor: 'middle' }}
                    />
                  </YAxis>
                  <ReferenceLine
                    x={1.5}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{ value: '1.5%', position: 'top', fill: 'red', fontSize: 10, fontWeight: 700 }}
                  />
                  <ReferenceLine
                    x={3.0}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{ value: '3.0%', position: 'top', fill: 'red', fontSize: 10, fontWeight: 700 }}
                  />
                  <Tooltip content={<CustomCptTooltip />} />
                  <Line
                    type="step"
                    dataKey="fr"
                    stroke="#16A34A"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#16A34A' }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EVALUASI STANDAR, RUMUS EXCEL & ACTION BUTTONS */}
      <div className="calc-card-box cpt-footer-eval-card" style={{ marginTop: '1.5rem' }}>
        <div className="calc-card-header">
          <div className="calc-card-header-icon" style={{ backgroundColor: '#F0FDF4', color: '#166534' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h3 className="calc-card-title">Kesimpulan Geoteknik & Standar SNI 2827:2008</h3>
            <span className="calc-card-subtitle">Interpretasi profil lapisan tanah dan rincian langkah rumus perhitungan Excel</span>
          </div>
          <span className={`calc-chart-badge ${hasInvalidRow ? 'status-eval' : 'status-ok'}`} style={{ marginLeft: 'auto' }}>
            {hasInvalidRow ? '⚠️ Validitas Manometer Diperlukan' : '✓ Memenuhi Standar SNI 2827:2008'}
          </span>
        </div>

        {/* Teks Kesimpulan */}
        <div className="cpt-conclusion-box">
          <p className="cpt-conclusion-text">
            {calcOutput.conclusion}
          </p>
        </div>

        {/* Rincian Langkah Rumus Excel & SNI */}
        <div className="cpt-steps-container">
          <h4 className="cpt-steps-title">Rincian Rumus Berantai Sesuai Lembar Hitung Excel & SNI 2827:2008:</h4>
          <div className="cpt-steps-grid">
            <div className="cpt-step-item">
              <span className="cpt-step-num">1</span>
              <div>
                <strong>Hambatan Gesek Selubung:</strong>
                <code>Friction (d) = tw - qc</code>
                <p>Selisih tekanan total pembacaan manometer (konus + selubung) terhadap konus saja (kg/cm²).</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">2</span>
              <div>
                <strong>Hambatan Setempat:</strong>
                <code>fs = (tw - qc) / 10 = d / 10</code>
                <p>Gaya gesek per satuan luas selubung bikonus standar penampang 10 cm² (kg/cm²).</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">3</span>
              <div>
                <strong>Hambatan Pelekat Interval:</strong>
                <code>ΔJHP = fs × 20 cm = d × 2</code>
                <p>Hambatan gesek interval pergerakan konus setiap 20 cm penetrasi alat sondir (kg/cm).</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">4</span>
              <div>
                <strong>Jumlah Hambatan Pelekat Kumulatif:</strong>
                <code>JHP_i = JHP_(i-1) + ΔJHP_i</code>
                <p>Akumulasi berantai kumulatif dari permukaan (0 m = 0) sampai kedalaman pengujian (kg/cm).</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">5</span>
              <div>
                <strong>Rasio Gesekan:</strong>
                <code>FR = (fs / qc) × 100%</code>
                <p>Rasio karakteristik gesekan tanah untuk menentukan jenis stratigrafi tanah (%).</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">6</span>
              <div>
                <strong>Klasifikasi Tanah (Robertson):</strong>
                <code>qc dan FR per Interval &amp; Rata-rata</code>
                <p>Interpretasi jenis tanah (Lempung Lunak, Lanau, Pasir Berlanau, Pasir Padat) berdasarkan nilai qc &amp; FR.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="calc-actions-footer" style={{ marginTop: '1.5rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
          <button
            type="button"
            className="btn-save-to-dashboard"
            onClick={onSave}
            disabled={isInputInvalid || hasInvalidRow || hasNegativeInput}
            title={
              isInputInvalid || hasInvalidRow || hasNegativeInput
                ? 'Data input belum valid. Perbaiki nilai input atau periksa baris merah sebelum menyimpan.'
                : 'Simpan Rekam Hasil Sondir ke Dashboard'
            }
          >
            <Save size={16} />
            <span>Simpan Hasil ke Dashboard</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetRows}
            title="Kembalikan tabel ke 15 baris contoh awal"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh (15 Baris)</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Tooltip Kustom untuk Kurva Pemadatan Standard Proctor & ZAV
function CustomProctorTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div
        style={{
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '0.65rem 0.9rem',
          borderRadius: '0.6rem',
          fontSize: '0.78rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          border: '1px solid #334155',
          minWidth: '180px',
        }}
      >
        <div style={{ fontWeight: '700', borderBottom: '1px solid #334155', paddingBottom: '0.35rem', marginBottom: '0.35rem', color: '#F8FAFC' }}>
          {data.sampleName ? `${data.sampleName} • ` : ''}Kadar Air: {Number(data.w || 0).toFixed(2)}%
        </div>
        {data.gammaDry !== null && data.gammaDry !== undefined && (
          <div style={{ color: '#93C5FD', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
            <span>Kepadatan Kering (γ_dry):</span>
            <strong>{Number(data.gammaDry).toFixed(3)} gr/cm³</strong>
          </div>
        )}
        {data.zav !== null && data.zav !== undefined && (
          <div style={{ color: '#FDBA74', display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '0.25rem' }}>
            <span>Zero Air Voids (ZAV):</span>
            <strong>{Number(data.zav).toFixed(3)} gr/cm³</strong>
          </div>
        )}
      </div>
    )
  }
  return null
}

// Komponen Modul Khusus: Standard Proctor Lab Multi-Titik Sampel (Standar ITERA)
function DynamicProctorSection({
  testConfig,
  inputs,
  calcOutput,
  currentProctorSamples,
  activeProctorSampleIdx,
  setActiveProctorSampleIdx,
  onMoldChange,
  onContainerChange,
  onAddSample,
  onRemoveSample,
  onResetSamples,
  onClearSamples,
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
  const computedSamples = calcOutput.proctorSamples || []
  const chartData = calcOutput.chartData || []
  const mdd = Number(calcOutput.mdd || 0)
  const omc = Number(calcOutput.omc || 0)
  const avgWet = Number(calcOutput.avgWet || 0)
  const rekapitulasiTable = calcOutput.rekapitulasiTable || []
  const hasInvalidContainer = Boolean(calcOutput.hasInvalidContainer)
  const hasInvalidMold = Boolean(calcOutput.hasInvalidMold)

  const activeSample = computedSamples[activeProctorSampleIdx] || computedSamples[0] || {}
  const activeContainers = activeSample.containers || []

  return (
    <div className="proctor-dynamic-container" style={{ width: '100%', marginTop: '0.5rem' }}>
      {/* Toast Notifikasi Tersimpan */}
      {savedNotification && (
        <div className="calc-saved-toast">
          <div className="calc-toast-icon">
            <CheckCircle2 size={18} />
          </div>
          <div className="calc-toast-text">
            <strong>Data Uji Standard Proctor Berhasil Disimpan!</strong>
            <span>Rekam hasil pemadatan MDD = {mdd.toFixed(3)} gr/cm³ pada OMC = {omc.toFixed(2)}% telah ditambahkan ke riwayat ({lastSavedId}).</span>
          </div>
        </div>
      )}

      {/* 1. KARTU RINGKASAN ATAS (4 METRIK UTAMA) */}
      <div className="proctor-summary-grid">
        {/* Card 1: MDD */}
        <div className="proctor-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Kerapatan Kering Maks (MDD)</span>
            <span className="cpt-metric-badge badge-blue">Puncak</span>
          </div>
          <div className="cpt-metric-value" style={{ color: '#2563EB' }}>
            {mdd.toFixed(3)} <span className="cpt-metric-unit">gr/cm³</span>
          </div>
          <div className="cpt-metric-footer">Maximum Dry Density (γ_dry)</div>
        </div>

        {/* Card 2: OMC */}
        <div className="proctor-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Kadar Air Optimum (OMC)</span>
            <span className="cpt-metric-badge badge-orange">Optimum</span>
          </div>
          <div className="cpt-metric-value" style={{ color: '#EA580C' }}>
            {omc.toFixed(2)} <span className="cpt-metric-unit">%</span>
          </div>
          <div className="cpt-metric-footer">Optimum Moisture Content (w_opt)</div>
        </div>

        {/* Card 3: Rata-rata gamma_wet */}
        <div className="proctor-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Rata-rata Berat Volume Basah</span>
            <span className="cpt-metric-badge badge-blue">Basah</span>
          </div>
          <div className="cpt-metric-value">
            {avgWet.toFixed(3)} <span className="cpt-metric-unit">gr/cm³</span>
          </div>
          <div className="cpt-metric-footer">Average Wet Density (γ_wet)</div>
        </div>

        {/* Card 4: Status Validasi */}
        <div className="proctor-metric-card">
          <div className="cpt-metric-header">
            <span className="cpt-metric-label">Status Validasi Standar</span>
            <span className="cpt-metric-badge badge-emerald">SNI / ASTM</span>
          </div>
          <div className="cpt-metric-value text-soil-name" style={{ color: calcOutput.isError ? '#DC2626' : '#15803D', fontSize: '1.05rem', fontWeight: '800' }}>
            {calcOutput.isError ? 'Perlu Evaluasi' : 'Memenuhi SNI 1742:2008'}
          </div>
          <div className="cpt-metric-footer">Metode Standard Compaction</div>
        </div>
      </div>

      {/* 2. FORM INPUT MULTI-TITIK SAMPEL */}
      <div className="calc-card-box" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Header Section */}
        <div className="cpt-table-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="calc-card-title">Tabel Input Multi-Titik Sampel Pemadatan (Standard Proctor ITERA)</h3>
              <span className="calc-card-subtitle">
                Pilih tab sampel (S1, S2, S3) untuk menginput data mold dan 3 sub-pengujian kontainer kadar air.
              </span>
            </div>
          </div>

          <div className="cpt-header-actions">
            <button
              type="button"
              className="btn-proctor-add-sample"
              onClick={onAddSample}
              title="Tambah titik sampel pengujian baru"
            >
              <Plus size={15} />
              <span>Tambah Titik Sampel</span>
            </button>
            <button
              type="button"
              className="btn-cpt-reset-sample"
              onClick={onResetSamples}
              title="Kembalikan data tabel ke 3 sampel contoh awal"
            >
              <RotateCcw size={14} />
              <span>Reset Contoh</span>
            </button>
            <button
              type="button"
              className="btn-cpt-reset-sample"
              onClick={onClearSamples}
              title="Kosongkan seluruh angka input agar bisa diisi dari awal"
              style={{ color: '#DC2626', borderColor: '#FECACA' }}
            >
              <Trash2 size={14} />
              <span>Kosongkan Input</span>
            </button>
          </div>
        </div>

        {/* Alert Error jika container invalid */}
        {hasInvalidContainer && (
          <div className="cpt-invalid-alert-banner">
            <AlertTriangle size={18} />
            <div>
              <strong>Peringatan Pengukuran Kontainer:</strong> Terdapat data kontainer di mana berat tanah basah sebelum oven (M2) lebih kecil/sama dengan berat setelah oven (M3), atau berat kering (M3) lebih kecil dari cawan kosong (M1).
            </div>
          </div>
        )}

        {/* Alert Error jika nilai negatif */}
        {hasNegativeInput && (
          <div className="cpt-invalid-alert-banner">
            <AlertTriangle size={18} />
            <div>
              <strong>Input Tidak Valid:</strong> Nilai massa, dimensi mold, atau kontainer tidak boleh bernilai negatif.
            </div>
          </div>
        )}

        {/* Sample Tabs Navigation */}
        <div className="proctor-tabs-nav">
          {computedSamples.map((s, idx) => {
            const isActive = idx === activeProctorSampleIdx
            return (
              <button
                key={s.id || idx}
                type="button"
                className={`btn-proctor-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveProctorSampleIdx(idx)}
              >
                <span>{s.name}</span>
                {s.avgW > 0 && (
                  <span style={{ fontSize: '0.7rem', opacity: isActive ? 0.9 : 0.7, marginLeft: '4px' }}>
                    ({s.avgW.toFixed(1)}%)
                  </span>
                )}
                {computedSamples.length > 3 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveSample(idx)
                    }}
                    style={{ marginLeft: '6px', opacity: 0.6 }}
                    title="Hapus sampel ini"
                  >
                    ×
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Active Sample Mold & Container Inputs */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #DBEAFE', borderRadius: '0.75rem', padding: '1.15rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#1E3A8A' }}>
              Parameter Uji {activeSample.name}
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: '#475569' }}>
              <span>Volume Mold: <strong>{Number(activeSample.volumeMold || 0).toFixed(2)} cm³</strong></span>
              <span>•</span>
              <span>Berat Basah (γ_wet): <strong style={{ color: '#2563EB' }}>{Number(activeSample.gammaWet || 0).toFixed(3)} gr/cm³</strong></span>
              <span>•</span>
              <span>Berat Kering (γ_dry): <strong style={{ color: '#15803D' }}>{Number(activeSample.gammaDry || 0).toFixed(3)} gr/cm³</strong></span>
            </div>
          </div>

          {/* Row 1: Mold Inputs */}
          <div className="proctor-mold-grid">
            <div className="proctor-input-group">
              <label>Massa Total Tanah Basah dalam Mold (M)</label>
              <div className="proctor-input-wrap">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="432.5"
                  className="proctor-input-field"
                  value={activeSample.massMoldSoil !== undefined ? activeSample.massMoldSoil : ''}
                  onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'mass')}
                  onChange={(e) => onMoldChange(activeProctorSampleIdx, 'massMoldSoil', e.target.value)}
                />
                <span className="proctor-unit-suffix">gr</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                Jika &lt; 10 otomatis dibaca kg
              </span>
            </div>

            <div className="proctor-input-group">
              <label>Diameter Mold (D)</label>
              <div className="proctor-input-wrap">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="5.5"
                  className="proctor-input-field"
                  value={activeSample.diameterMold !== undefined ? activeSample.diameterMold : ''}
                  onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'diameter')}
                  onChange={(e) => onMoldChange(activeProctorSampleIdx, 'diameterMold', e.target.value)}
                />
                <span className="proctor-unit-suffix">cm</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                Default: 5.5 cm
              </span>
            </div>

            <div className="proctor-input-group">
              <label>Tinggi Mold (H)</label>
              <div className="proctor-input-wrap">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="10.0"
                  className="proctor-input-field"
                  value={activeSample.heightMold !== undefined ? activeSample.heightMold : ''}
                  onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'height')}
                  onChange={(e) => onMoldChange(activeProctorSampleIdx, 'heightMold', e.target.value)}
                />
                <span className="proctor-unit-suffix">cm</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                Default: 10.0 cm
              </span>
            </div>

            <div className="proctor-input-group">
              <label>Berat Spesifik Tanah (Gs)</label>
              <div className="proctor-input-wrap">
                <input
                  type="number"
                  step="0.01"
                  min="1.0"
                  placeholder="2.65"
                  className="proctor-input-field"
                  value={activeSample.gs !== undefined ? activeSample.gs : ''}
                  onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'gs')}
                  onChange={(e) => onMoldChange(activeProctorSampleIdx, 'gs', e.target.value)}
                />
                <span className="proctor-unit-suffix">-</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                Default: 2.65 (ZAV)
              </span>
            </div>
          </div>

          {/* Row 2: Sub-pengujian 3 Kontainer Kadar Air */}
          <div style={{ marginTop: '1rem' }}>
            <h5 style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', fontWeight: '700', color: '#334155' }}>
              Sub-Pengujian 3 Kontainer Kadar Air (w) untuk {activeSample.name}:
            </h5>
            <div className="cpt-table-responsive">
              <table className="cpt-spreadsheet-table">
                <thead>
                  <tr>
                    <th style={{ width: '130px' }}>Kontainer</th>
                    <th>Berat Cawan (M1) <span className="th-unit">gram</span></th>
                    <th>Cawan + Basah Sebelum Oven (M2) <span className="th-unit">gram</span></th>
                    <th>Cawan + Kering Setelah Oven (M3) <span className="th-unit">gram</span></th>
                    <th style={{ textAlign: 'center' }}>Berat Air (M2-M3) <span className="th-unit">gram</span></th>
                    <th style={{ textAlign: 'center' }}>Berat Padat (M3-M1) <span className="th-unit">gram</span></th>
                    <th style={{ textAlign: 'center' }}>Kadar Air (w) <span className="th-unit">%</span></th>
                  </tr>
                </thead>
                <tbody>
                  {activeContainers.map((c, cIdx) => {
                    const isContInvalid = Boolean(c.isInvalid)
                    return (
                      <tr key={c.id || cIdx} className={isContInvalid ? 'row-invalid' : ''}>
                        <td style={{ fontWeight: '700', color: '#1E40AF' }}>
                          {c.label || `Kontainer ${cIdx + 1}`}
                        </td>
                        <td>
                          <div className="cpt-cell-input-wrap">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              className={`cpt-input-number ${isContInvalid ? 'input-error' : ''}`}
                              value={c.m1 !== undefined ? c.m1 : ''}
                              onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'm1')}
                              onChange={(e) => onContainerChange(activeProctorSampleIdx, cIdx, 'm1', e.target.value)}
                            />
                            <span className="cpt-cell-suffix">g</span>
                          </div>
                        </td>
                        <td>
                          <div className="cpt-cell-input-wrap">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              className={`cpt-input-number ${isContInvalid ? 'input-error' : ''}`}
                              value={c.m2 !== undefined ? c.m2 : ''}
                              onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'm2')}
                              onChange={(e) => onContainerChange(activeProctorSampleIdx, cIdx, 'm2', e.target.value)}
                            />
                            <span className="cpt-cell-suffix">g</span>
                          </div>
                          {isContInvalid && (
                            <div className="cpt-cell-error-tip">
                              M2 harus &gt; M3
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="cpt-cell-input-wrap">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              className={`cpt-input-number ${isContInvalid ? 'input-error' : ''}`}
                              value={c.m3 !== undefined ? c.m3 : ''}
                              onKeyDown={(e) => handleKeyDown && handleKeyDown(e, 'm3')}
                              onChange={(e) => onContainerChange(activeProctorSampleIdx, cIdx, 'm3', e.target.value)}
                            />
                            <span className="cpt-cell-suffix">g</span>
                          </div>
                          {isContInvalid && (
                            <div className="cpt-cell-error-tip">
                              M3 harus &gt; M1
                            </div>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`cpt-read-value ${isContInvalid ? 'val-invalid' : ''}`}>
                            {isContInvalid ? '-' : c.wAir.toFixed(2)}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`cpt-read-value ${isContInvalid ? 'val-invalid' : ''}`}>
                            {isContInvalid ? '-' : c.wPadat.toFixed(2)}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`cpt-read-value ${isContInvalid ? 'val-invalid' : 'val-fr'}`}>
                            {isContInvalid ? '-' : `${c.wPct.toFixed(2)}%`}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                  {/* Summary row for this sample */}
                  <tr style={{ backgroundColor: '#EFF6FF', fontWeight: '800' }}>
                    <td colSpan={4} style={{ color: '#1E3A8A' }}>
                      Rata-rata Kadar Air {activeSample.name} (w̄) = (w1 + w2 + w3) / 3:
                    </td>
                    <td colSpan={3} style={{ textAlign: 'center', color: '#1D4ED8', fontSize: '0.92rem' }}>
                      {Number(activeSample.avgW || 0).toFixed(2)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 3. REKAPITULASI SELURUH SAMPEL & GRAFIK RECHARTS */}
      <div className="proctor-comparison-grid">
        {/* Kolom Kiri: Tabel Rekapitulasi Hasil Akhir */}
        <div className="calc-card-box" style={{ padding: '1.25rem' }}>
          <div className="calc-card-header" style={{ marginBottom: '0.75rem' }}>
            <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h4 className="calc-card-title">Tabel Rekapitulasi Pemadatan</h4>
              <span className="calc-card-subtitle">Perbandingan kadar air rata-rata, berat volume basah, dan kering</span>
            </div>
          </div>

          <div className="cpt-table-responsive">
            <table className="cpt-spreadsheet-table">
              <thead>
                <tr>
                  <th>Titik Sampel</th>
                  <th style={{ textAlign: 'center' }}>Kadar Air w̄ <span className="th-unit">%</span></th>
                  <th style={{ textAlign: 'center' }}>γ_wet <span className="th-unit">gr/cm³</span></th>
                  <th style={{ textAlign: 'center' }}>γ_dry <span className="th-unit">gr/cm³</span></th>
                  <th style={{ textAlign: 'center' }}>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {rekapitulasiTable.map((row, idx) => (
                  <tr key={row.id || idx} style={{ backgroundColor: row.isPeak ? '#FEFCE8' : undefined }}>
                    <td style={{ fontWeight: '700', color: row.isPeak ? '#92400E' : '#1E293B' }}>
                      {row.name}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '600' }}>
                      {row.avgW.toFixed(2)}%
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '600' }}>
                      {row.gammaWet.toFixed(3)}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '800', color: row.isPeak ? '#B45309' : '#0369A1' }}>
                      {row.gammaDry.toFixed(3)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {row.isPeak ? (
                        <span className="badge-mdd-peak">
                          ★ Puncak MDD
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          Titik Uji #{idx + 1}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem', fontSize: '0.73rem', color: '#475569', lineHeight: 1.4 }}>
            <span>Kerapatan Kering Maksimum: <strong style={{ color: '#2563EB' }}>MDD = {mdd.toFixed(3)} gr/cm³</strong> tercapai pada kadar air optimum <strong style={{ color: '#EA580C' }}>OMC = {omc.toFixed(2)}%</strong>.</span>
          </div>
        </div>

        {/* Kolom Kanan: Grafik Kurva Pemadatan Recharts */}
        <div className="calc-card-box cpt-chart-card">
          <div className="cpt-chart-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="cpt-chart-icon-box" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                <TrendingUp size={16} />
              </div>
              <div>
                <h4 className="cpt-chart-title">Kurva Pemadatan & Zero Air Voids</h4>
                <span className="cpt-chart-sub">Plot Kadar Air w (%) vs Berat Volume Kering γ_dry (gr/cm³)</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <span className="cpt-chart-badge badge-blue">Kurva Proctor</span>
              <span className="cpt-chart-badge badge-orange">Garis ZAV</span>
            </div>
          </div>

          <div className="cpt-recharts-box">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 15, right: 20, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  dataKey="w"
                  domain={['dataMin - 1', 'dataMax + 1']}
                  stroke="#64748B"
                  fontSize={11}
                >
                  <Label value="Kadar Air w (%)" offset={-12} position="insideBottom" fill="#475569" fontSize={11} />
                </XAxis>
                <YAxis
                  type="number"
                  domain={['auto', 'auto']}
                  stroke="#64748B"
                  fontSize={11}
                >
                  <Label value="Kerapatan Kering γ_dry (gr/cm³)" angle={-90} position="insideLeft" offset={0} fill="#475569" fontSize={11} />
                </YAxis>
                <Tooltip content={<CustomProctorTooltip />} />
                {/* Compaction Curve */}
                <Line
                  type="monotone"
                  dataKey="gammaDry"
                  name="Kurva Pemadatan"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  connectNulls={true}
                  dot={{ r: 5, fill: '#2563eb' }}
                  activeDot={{ r: 7 }}
                  isAnimationActive={false}
                />
                {/* Zero Air Voids Curve */}
                <Line
                  type="monotone"
                  dataKey="zav"
                  name="Zero Air Voids (ZAV)"
                  stroke="#ea580c"
                  strokeWidth={1.8}
                  strokeDasharray="5 5"
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. EVALUASI STANDAR, RUMUS BERANTAI & TOMBOL AKSI */}
      <div className="calc-card-box cpt-footer-eval-card" style={{ marginTop: '1.5rem' }}>
        <div className="calc-card-header">
          <div className="calc-card-header-icon" style={{ backgroundColor: '#F0FDF4', color: '#166534' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h3 className="calc-card-title">Kesimpulan Geoteknik & Standar SNI 1742:2008</h3>
            <span className="calc-card-subtitle">Interpretasi hasil pemadatan Standard Proctor dan rincian rumus perhitungan</span>
          </div>
          <span className={`calc-chart-badge ${calcOutput.isError ? 'status-eval' : 'status-ok'}`} style={{ marginLeft: 'auto' }}>
            {calcOutput.isError ? '⚠️ Cek Validitas Data Uji' : '✓ Memenuhi Standar SNI 1742:2008'}
          </span>
        </div>

        {/* Teks Kesimpulan */}
        <div className="cpt-conclusion-box">
          <p className="cpt-conclusion-text">
            {calcOutput.conclusion}
          </p>
        </div>

        {/* Rincian Langkah Rumus Berantai Sesuai Laboratorium ITERA */}
        <div className="cpt-steps-container">
          <h4 className="cpt-steps-title">Rincian Rumus Berantai Sesuai Laboratorium Teknik Sipil ITERA:</h4>
          <div className="cpt-steps-grid">
            <div className="cpt-step-item">
              <span className="cpt-step-num">1</span>
              <div>
                <strong>Kadar Air Tiap Kontainer:</strong>
                <code>w = ((M2 - M3) / (M3 - M1)) × 100%</code>
                <p>Rasio massa air yang menguap saat di-oven 105°C terhadap massa butir tanah kering.</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">2</span>
              <div>
                <strong>Kadar Air Rata-rata Sampel:</strong>
                <code>w̄ = (w1 + w2 + w3) / 3</code>
                <p>Rata-rata 3 kontainer sub-pengujian untuk meminimalkan deviasi penimbangan cawan.</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">3</span>
              <div>
                <strong>Volume Cetakan Mold:</strong>
                <code>V = 0.25 × 3.1416 × D² × H</code>
                <p>Volume silinder mold laboratorium pemadatan tanah (diameter D = 5.5 cm, tinggi H = 10.0 cm).</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">4</span>
              <div>
                <strong>Berat Volume Basah:</strong>
                <code>γ_wet = M / V (gr/cm³)</code>
                <p>Massa tanah basah padat dalam cetakan mold dibagi dengan volume cetakan mold.</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">5</span>
              <div>
                <strong>Berat Volume Kering (Dry Density):</strong>
                <code>γ_dry = γ_wet / (1 + w̄/100) (gr/cm³)</code>
                <p>Kepadatan kering butiran tanah tanpa memperhitungkan berat air pori.</p>
              </div>
            </div>
            <div className="cpt-step-item">
              <span className="cpt-step-num">6</span>
              <div>
                <strong>Kurva Batas Zero Air Voids (ZAV):</strong>
                <code>γ_zav = (Gs × 1.0) / (1 + w × Gs / 100)</code>
                <p>Kerapatan teoretis saat seluruh rongga udara terisi penuh air (kejenuhan S = 100%).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="calc-actions-footer" style={{ marginTop: '1.5rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
          <button
            type="button"
            className="btn-save-to-dashboard"
            onClick={onSave}
            disabled={isInputInvalid || calcOutput.isError || hasNegativeInput}
            title={
              isInputInvalid || calcOutput.isError || hasNegativeInput
                ? 'Data input belum valid. Periksa nilai kontainer atau dimensi mold sebelum menyimpan.'
                : 'Simpan Rekam Hasil Proctor ke Dashboard'
            }
          >
            <Save size={16} />
            <span>Simpan Hasil ke Dashboard</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetSamples}
            title="Kembalikan tabel ke 3 titik sampel contoh awal"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh (3 Sampel)</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearSamples}
            title="Kosongkan seluruh angka input untuk memasukkan data uji baru"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// KOMPONEN TOOLTIP & SECTION ANALISIS SARINGAN BUTIRAN TANAH (BAB 4 MT)
// =========================================================================

function CustomSoilSieveTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="custom-tooltip-cpt" style={{ borderLeft: '4px solid #2563EB', padding: '0.65rem 0.85rem' }}>
        <p className="tooltip-title" style={{ color: '#1E40AF', fontWeight: 800, marginBottom: '4px' }}>
          {data.sieveNo} ({data.diameter} mm)
        </p>
        <p className="tooltip-item" style={{ margin: '2px 0' }}>
          Persen Lolos: <strong style={{ color: '#2563EB' }}>{data.passing}%</strong>
        </p>
        <p className="tooltip-item" style={{ margin: '2px 0' }}>
          Persen Tertahan: <strong>{data.retainedPct}%</strong>
        </p>
        <p className="tooltip-item" style={{ margin: '2px 0' }}>
          Berat Tertahan: <strong>{data.retainedWeight} gram</strong>
        </p>
      </div>
    )
  }
  return null
}

function DynamicSoilSieveSection({
  testConfig,
  inputs,
  calcOutput,
  currentSoilSieves,
  onSieveChange,
  onAddSieve,
  onRemoveSieve,
  onResetSieves,
  onClearSieves,
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
  const [isReversedAxis, setIsReversedAxis] = useState(true)

  const rawChartPoints = calcOutput?.chartDataPoints || []
  const chartPoints = useMemo(() => {
    const list = [...rawChartPoints]
    if (isReversedAxis) {
      return list.sort((a, b) => b.diameter - a.diameter)
    } else {
      return list.sort((a, b) => a.diameter - b.diameter)
    }
  }, [rawChartPoints, isReversedAxis])

  const d60 = calcOutput?.d60
  const d30 = calcOutput?.d30
  const d10 = calcOutput?.d10
  const cu = calcOutput?.cu
  const cc = calcOutput?.cc

  const isFormDisabled = isInputInvalid || hasNegativeInput || hasExceededInput

  return (
    <div className="dynamic-cpt-container">
      {/* Header Panel & Aksi Cepat */}
      <div className="calc-panel-header" style={{ marginBottom: '1.25rem' }}>
        <div className="calc-header-left">
          <button onClick={onBack} className="btn-back-header" title="Kembali ke Dashboard">
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>
          <div className="calc-title-box">
            <div className="calc-category-badge">{testConfig.category}</div>
            <h2 className="calc-title-text">{testConfig.name}</h2>
            <div className="calc-standard-badge">
              <span>{testConfig.standard}</span>
              <span className="badge-code">{testConfig.code}</span>
            </div>
          </div>
        </div>

        <div className="calc-header-actions">
          <button
            onClick={onResetSieves}
            className="btn-action-outline"
            title="Kembalikan ke data contoh standar laboratorium (8 Ayakan)"
          >
            <RotateCcw size={15} />
            <span>Reset Contoh</span>
          </button>
          <button
            onClick={onClearSieves}
            className="btn-action-outline"
            style={{ color: '#DC2626', borderColor: '#FECACA' }}
            title="Kosongkan seluruh nilai massa tertahan untuk input baru"
          >
            <Trash2 size={15} />
            <span>Kosongkan Input</span>
          </button>
          <button
            onClick={onSave}
            disabled={isFormDisabled}
            className={`btn-action-primary ${savedNotification ? 'btn-saved' : ''}`}
            title="Simpan data ke riwayat pengujian"
          >
            {savedNotification ? (
              <>
                <Check size={16} />
                <span>Tersimpan (#{lastSavedId})</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Simpan Pengujian</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Kartu Ringkasan Hasil Utama */}
      <div className="soil-sieve-summary-grid">
        {/* Card 1: Cu */}
        <div className="soil-sieve-metric-card card-blue">
          <div className="soil-sieve-card-head">
            <span className="soil-sieve-card-title">Koefisien Keseragaman</span>
            <span className="proctor-metric-badge badge-blue">Cu</span>
          </div>
          <div className="soil-sieve-card-value">
            {cu !== null && cu !== undefined ? cu.toFixed(2) : '-'}
          </div>
          <div className="soil-sieve-card-sub">
            {d60 && d10 ? `D60 / D10 = ${d60.toFixed(3)} / ${d10.toFixed(3)} mm` : 'Rasio D60 terhadap D10'}
            <div style={{ marginTop: '4px', fontWeight: 700, color: (cu >= 6) ? '#059669' : '#D97706' }}>
              {cu >= 6 ? '✓ Cu ≥ 6.0 (Keseragaman Baik)' : (cu >= 4 ? 'Cu ≥ 4.0 (Syarat Kerikil)' : 'Cu < 6.0 (Gradasi Seragam/Buruk)')}
            </div>
          </div>
        </div>

        {/* Card 2: Cc */}
        <div className="soil-sieve-metric-card card-amber">
          <div className="soil-sieve-card-head">
            <span className="soil-sieve-card-title">Koefisien Kelengkungan</span>
            <span className="proctor-metric-badge badge-green" style={{ backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}>Cc</span>
          </div>
          <div className="soil-sieve-card-value">
            {cc !== null && cc !== undefined ? cc.toFixed(2) : '-'}
          </div>
          <div className="soil-sieve-card-sub">
            {d30 && d10 && d60 ? `D30² / (D10 × D60) = ${d30.toFixed(3)}² / (${d10.toFixed(3)} × ${d60.toFixed(3)})` : 'Distribusi kurva gradasi'}
            <div style={{ marginTop: '4px', fontWeight: 700, color: (cc >= 1 && cc <= 3) ? '#059669' : '#D97706' }}>
              {(cc >= 1 && cc <= 3) ? '✓ 1.0 ≤ Cc ≤ 3.0 (Gradasi Baik)' : 'Cc di luar rentang 1 s.d. 3'}
            </div>
          </div>
        </div>

        {/* Card 3: Fines % */}
        <div className="soil-sieve-metric-card card-emerald">
          <div className="soil-sieve-card-head">
            <span className="soil-sieve-card-title">Fraksi Halus Lolos #200</span>
            <span className="proctor-metric-badge badge-blue" style={{ backgroundColor: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}>Fines</span>
          </div>
          <div className="soil-sieve-card-value">
            {calcOutput?.finesPct !== undefined ? `${calcOutput.finesPct.toFixed(1)}` : '0.0'}
            <span className="soil-sieve-card-unit">%</span>
          </div>
          <div className="soil-sieve-card-sub">
            Lolos Ayakan No. 200 (&lt; 0.075 mm)
            <div style={{ marginTop: '4px', fontWeight: 700, color: (calcOutput?.finesPct <= 50) ? '#059669' : '#DC2626' }}>
              {(calcOutput?.finesPct <= 50) ? 'Tanah Berbutir Kasar (≤ 50%)' : 'Tanah Berbutir Halus (> 50%)'}
            </div>
          </div>
        </div>

        {/* Card 4: Klasifikasi USCS */}
        <div className="soil-sieve-metric-card card-purple">
          <div className="soil-sieve-card-head">
            <span className="soil-sieve-card-title">Klasifikasi USCS</span>
            <span className="proctor-metric-badge badge-orange" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', borderColor: '#E9D5FF' }}>ASTM D2487</span>
          </div>
          <div className="soil-sieve-card-value" style={{ color: '#7C3AED' }}>
            {calcOutput?.uscsCode || '-'}
          </div>
          <div className="soil-sieve-card-sub">
            <span style={{ fontWeight: 700, color: '#4C1D95' }}>{calcOutput?.uscsName || '-'}</span>
          </div>
        </div>
      </div>

      {/* Grid 2-Kolom: Tabel Saringan (Kiri) & Grafik Semi-Log (Kanan) */}
      <div className="soil-sieve-layout-grid">
        {/* Kolom Kiri: Tabel Input Dinamis & Form Tambahan */}
        <div className="soil-sieve-left-col">
          <div className="calc-card-box">
            <div className="calc-card-header" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div className="calc-card-header-icon">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h3 className="calc-card-title">Tabel Data Pengujian Saringan Tanah</h3>
                  <p className="calc-card-subtitle">Input nomor ayakan, diameter lubang, dan berat tanah tertahan</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onAddSieve}
                className="btn-soil-sieve-add"
                title="Tambahkan ukuran ayakan baru ke susunan saringan"
              >
                <Plus size={14} />
                <span>Tambah Baris</span>
              </button>
            </div>

            <div className="soil-sieve-table-container">
              <table className="soil-sieve-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>No. Ayakan</th>
                    <th style={{ width: '18%' }}>Diameter (mm)</th>
                    <th style={{ width: '18%' }}>Berat (g)</th>
                    <th style={{ width: '14%' }}>% Tertahan</th>
                    <th style={{ width: '14%' }}>% Kumulatif</th>
                    <th style={{ width: '14%' }}>% Lolos</th>
                    <th style={{ width: '38px', textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {(calcOutput?.calculatedSieves || currentSoilSieves).map((s, idx) => {
                    const isPanRow = s.isPan || Number(s.diameter) <= 0 || /pan/i.test(s.sieveNo)
                    return (
                      <tr key={s.id || idx} className={isPanRow ? 'row-pan' : ''}>
                        <td>
                          <input
                            type="text"
                            value={s.sieveNo}
                            onChange={(e) => onSieveChange(idx, 'sieveNo', e.target.value)}
                            className="soil-sieve-cell-text"
                            placeholder="Misal: No. 4"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.001"
                            min="0"
                            value={s.diameter !== undefined ? s.diameter : ''}
                            onChange={(e) => onSieveChange(idx, 'diameter', e.target.value)}
                            disabled={isPanRow}
                            className="soil-sieve-cell-input"
                            placeholder={isPanRow ? '-' : '0.00'}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={s.retainedWeight !== undefined ? s.retainedWeight : ''}
                            onChange={(e) => onSieveChange(idx, 'retainedWeight', e.target.value)}
                            className="soil-sieve-cell-input"
                            placeholder="0.0"
                          />
                        </td>
                        <td style={{ fontWeight: 600, color: '#475569' }}>
                          {s.retainedPct !== undefined ? `${s.retainedPct.toFixed(2)}%` : '-'}
                        </td>
                        <td style={{ fontWeight: 600, color: '#334155' }}>
                          {s.cumRetainedPct !== undefined ? `${s.cumRetainedPct.toFixed(2)}%` : '-'}
                        </td>
                        <td style={{ fontWeight: 800, color: '#1D4ED8' }}>
                          {s.cumPassingPct !== undefined ? `${s.cumPassingPct.toFixed(2)}%` : '-'}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => onRemoveSieve(idx)}
                            disabled={currentSoilSieves.length <= 1}
                            className="btn-soil-sieve-del"
                            title="Hapus baris saringan ini"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {/* Tampilkan Pan jika belum ada di tabel saringan */}
                  {calcOutput?.calculatedPan && !currentSoilSieves.some(s => s.isPan || /pan/i.test(s.sieveNo)) && (
                    <tr className="row-pan">
                      <td style={{ fontWeight: 700 }}>Pan Penampung</td>
                      <td>-</td>
                      <td style={{ fontWeight: 700 }}>{calcOutput.calculatedPan.retainedWeight.toFixed(1)} g</td>
                      <td>{calcOutput.calculatedPan.retainedPct.toFixed(2)}%</td>
                      <td>{calcOutput.calculatedPan.cumRetainedPct.toFixed(2)}%</td>
                      <td style={{ fontWeight: 800 }}>0.00%</td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Input Tambahan di Bawah Tabel */}
            <div className="soil-sieve-bottom-grid">
              <div className="proctor-input-group">
                <label>Berat Total Sampel Awal (W_total)</label>
                <div className="proctor-input-wrap">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={inputs.wTotal !== undefined ? inputs.wTotal : 500}
                    onChange={(e) => onInputChange('wTotal', e.target.value)}
                    className="proctor-input-field"
                    placeholder="500.0"
                  />
                  <span className="proctor-unit-suffix">gram</span>
                </div>
              </div>

              <div className="proctor-input-group">
                <label>Berat Tanah Tertahan di Pan (W_pan)</label>
                <div className="proctor-input-wrap">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={inputs.panWeight !== undefined ? inputs.panWeight : 24}
                    onChange={(e) => {
                      onInputChange('panWeight', e.target.value)
                      const panIdx = currentSoilSieves.findIndex(s => s.isPan || Number(s.diameter) <= 0 || /pan/i.test(s.sieveNo))
                      if (panIdx !== -1) {
                        onSieveChange(panIdx, 'retainedWeight', e.target.value)
                      }
                    }}
                    className="proctor-input-field"
                    placeholder="24.0"
                  />
                  <span className="proctor-unit-suffix">gram</span>
                </div>
              </div>
            </div>

            {/* Mass Loss Validation Banner */}
            <div className={`soil-sieve-massloss-card ${calcOutput?.isMassLossValid === false ? 'exceeded' : ''}`}>
              <div>
                <strong>Validasi Kehilangan Berat (Mass Loss): </strong>
                <span>
                  Total Tertahan = {calcOutput?.totalWithPan?.toFixed(1) || '0.0'} g | Selisih = {calcOutput?.massLoss?.toFixed(1) || '0.0'} g ({calcOutput?.massLossPct?.toFixed(2) || '0.00'}%)
                </span>
              </div>
              <span className={`badge-verdict ${calcOutput?.isMassLossValid ? 'verdict-pass' : 'verdict-warning'}`}>
                {calcOutput?.isMassLossValid ? 'LULUS (≤ 2.0%)' : 'MELEBIHI TOLERANSI (> 2.0%)'}
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Visualisasi Grafik Kurva Distribusi Ukuran Butiran */}
        <div className="soil-sieve-right-col">
          <div className="calc-card-box">
            <div className="calc-card-header" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h3 className="calc-card-title">Kurva Distribusi Ukuran Butiran</h3>
                  <p className="calc-card-subtitle">Skala semi-logaritmik diameter vs % lolos saringan</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReversedAxis(!isReversedAxis)}
                className="btn-action-outline"
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.55rem' }}
                title="Beralih arah sumbu X (Standar Geoteknik 10 -> 0.01 mm)"
              >
                {isReversedAxis ? 'Sumbu: 10 → 0.01 mm' : 'Sumbu: 0.01 → 10 mm'}
              </button>
            </div>

            {/* Recharts Semi-Log Chart */}
            <div className="calc-chart-recharts-wrap" style={{ marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height={360}>
                <LineChart
                  data={chartPoints}
                  margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="diameter"
                    type="number"
                    scale="log"
                    domain={[0.01, 10]}
                    reversed={isReversedAxis}
                    ticks={[0.01, 0.075, 0.15, 0.25, 0.425, 0.85, 2.0, 4.75, 10.0]}
                    tickFormatter={(val) => {
                      if (val >= 1) return val.toFixed(1)
                      if (val >= 0.1) return val.toFixed(2)
                      return val.toFixed(3)
                    }}
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    allowDataOverflow={true}
                  >
                    <Label
                      value="Diameter Butiran (mm) — Skala Logaritmik"
                      offset={-15}
                      position="insideBottom"
                      fill="#334155"
                      fontWeight={700}
                      fontSize={11}
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
                  >
                    <Label
                      value="Persen Lolos (%)"
                      angle={-90}
                      position="insideLeft"
                      offset={0}
                      style={{ textAnchor: 'middle', fill: '#334155', fontWeight: 700, fontSize: 11 }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomSoilSieveTooltip />} />

                  {/* Reference Lines for D60, D30, D10 */}
                  {d60 > 0 && <ReferenceLine y={60} stroke="#2563EB" strokeDasharray="3 3" strokeWidth={1.5} />}
                  {d30 > 0 && <ReferenceLine y={30} stroke="#D97706" strokeDasharray="3 3" strokeWidth={1.5} />}
                  {d10 > 0 && <ReferenceLine y={10} stroke="#DC2626" strokeDasharray="3 3" strokeWidth={1.5} />}

                  {d60 > 0 && d60 >= 0.01 && d60 <= 10 && (
                    <ReferenceLine x={d60} stroke="#2563EB" strokeDasharray="3 3" strokeWidth={1.5} />
                  )}
                  {d30 > 0 && d30 >= 0.01 && d30 <= 10 && (
                    <ReferenceLine x={d30} stroke="#D97706" strokeDasharray="3 3" strokeWidth={1.5} />
                  )}
                  {d10 > 0 && d10 >= 0.01 && d10 <= 10 && (
                    <ReferenceLine x={d10} stroke="#DC2626" strokeDasharray="3 3" strokeWidth={1.5} />
                  )}

                  <Line
                    type="monotone"
                    dataKey="passing"
                    name="Kurva Gradasi"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ r: 5, fill: '#1D4ED8', stroke: '#FFFFFF', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#1E40AF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Indikator Nilai D60, D30, D10 */}
            <div className="soil-sieve-d-indicators">
              <div className="soil-sieve-d-badge badge-d60">
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#1D4ED8' }}>D60 (60% Lolos)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E3A8A' }}>
                  {d60 ? `${d60.toFixed(3)} mm` : '-'}
                </div>
              </div>
              <div className="soil-sieve-d-badge badge-d30">
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B45309' }}>D30 (30% Lolos)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#78350F' }}>
                  {d30 ? `${d30.toFixed(3)} mm` : '-'}
                </div>
              </div>
              <div className="soil-sieve-d-badge badge-d10">
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#BE123C' }}>D10 (Efektif 10%)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#881337' }}>
                  {d10 ? `${d10.toFixed(3)} mm` : '-'}
                </div>
              </div>
            </div>

            {/* Breakdown Fraksi Butiran */}
            <div className="soil-sieve-fractions-bar">
              <div>
                <span style={{ color: '#64748B' }}>Kerikil (&gt; 4.75 mm): </span>
                <strong style={{ color: '#0F172A' }}>{calcOutput?.gravelPct?.toFixed(1) || '0.0'}%</strong>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Pasir (0.075 - 4.75 mm): </span>
                <strong style={{ color: '#2563EB' }}>{calcOutput?.sandPct?.toFixed(1) || '0.0'}%</strong>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Halus (&lt; 0.075 mm): </span>
                <strong style={{ color: '#059669' }}>{calcOutput?.finesPct?.toFixed(1) || '0.0'}%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Langkah Rumus & Perhitungan Geoteknik */}
      {calcOutput?.formulaSteps && calcOutput.formulaSteps.length > 0 && (
        <div className="calc-card-box" style={{ marginTop: '1.5rem' }}>
          <div className="calc-card-header">
            <div className="calc-card-header-icon" style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>
              <Info size={18} />
            </div>
            <div>
              <h3 className="calc-card-title">Rincian Langkah Rumus & Perhitungan SNI 3423:2008</h3>
              <p className="calc-card-subtitle">Perhitungan otomatis persentase tertahan, lolos, interpolasi logaritmik, dan klasifikasi USCS</p>
            </div>
          </div>

          <div className="cpt-steps-container">
            {calcOutput.formulaSteps.map((step, idx) => (
              <div key={idx} className="cpt-step-item">
                <div className="cpt-step-text" style={{ fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'pre-wrap' }}>
                  {formatScientificInText(step)}
                </div>
              </div>
            ))}
          </div>

          {/* Kesimpulan Evaluasi Geoteknik */}
          <div
            className={`calc-verdict-box ${getVerdictClass(calcOutput.status)}`}
            style={{ marginTop: '1.25rem' }}
          >
            <div className="calc-verdict-icon">
              {calcOutput.isError ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
            </div>
            <div>
              <div className="calc-verdict-title">{getVerdictLabel(calcOutput.status)}</div>
              <div className="calc-verdict-desc">{calcOutput.conclusion}</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Navigation */}
      <div className="calc-panel-footer" style={{ marginTop: '1.5rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions">
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetSieves}
            title="Kembalikan tabel ke susunan ayakan contoh awal"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearSieves}
            title="Kosongkan seluruh angka input untuk memasukkan data uji baru"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// KOMPONEN TOOLTIP & SECTION UJI KONSOLIDASI OEDOMETER (METODE TAYLOR BAB 5 MT)
// =========================================================================

function CustomOedometerTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="custom-tooltip-cpt" style={{ borderLeft: '4px solid #2563EB', padding: '0.65rem 0.85rem' }}>
        <p className="tooltip-title" style={{ color: '#1E40AF', fontWeight: 800, marginBottom: '4px' }}>
          Waktu t = {data.t} menit (√t = {data.sqrtT})
        </p>
        <p className="tooltip-item" style={{ margin: '2px 0' }}>
          Penurunan (ΔH): <strong style={{ color: '#2563EB' }}>{data.deltaH} cm</strong>
        </p>
        <p className="tooltip-item" style={{ margin: '2px 0' }}>
          Tinggi Contoh (H): <strong>{data.h} cm</strong>
        </p>
      </div>
    )
  }
  return null
}

function DynamicOedometerSection({
  testConfig,
  inputs,
  calcOutput,
  currentOedometerReadings,
  onReadingChange,
  onAddReading,
  onRemoveReading,
  onResetReadings,
  onClearReadings,
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
  const chartPoints = calcOutput?.chartDataPoints || []

  const t90 = calcOutput?.t90
  const sqrtT90 = calcOutput?.sqrtT90
  const deltaH90 = calcOutput?.deltaH90
  const ht = calcOutput?.ht
  const hRata = calcOutput?.hRata
  const cvSecFormatted = calcOutput?.cvSecFormatted
  const cvMin = calcOutput?.cvMin
  const cc = calcOutput?.cc

  const isFormDisabled = isInputInvalid || hasNegativeInput || hasExceededInput

  return (
    <div className="dynamic-cpt-container">
      {/* Top Header Panel */}
      <div className="calc-panel-header" style={{ marginBottom: '1.25rem' }}>
        <div className="calc-header-left">
          <button onClick={onBack} className="btn-back-header" title="Kembali ke Dashboard">
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>
          <div className="calc-title-box">
            <div className="calc-category-badge">{testConfig.category}</div>
            <h2 className="calc-title-text">{testConfig.name}</h2>
            <div className="calc-standard-badge">
              <span>{testConfig.standard}</span>
              <span className="badge-code">{testConfig.code}</span>
            </div>
          </div>
        </div>

        <div className="calc-header-actions">
          <button
            onClick={onResetReadings}
            className="btn-action-outline"
            title="Kembalikan ke data contoh standar laboratorium (14 Pembacaan Waktu)"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
          <button
            onClick={onClearReadings}
            className="btn-action-outline"
            style={{ color: '#DC2626', borderColor: '#FECACA' }}
            title="Kosongkan seluruh nilai penurunan untuk input baru"
          >
            <Trash2 size={15} />
            <span>Kosongkan Input</span>
          </button>
          <button
            onClick={onSave}
            disabled={isFormDisabled}
            className={`btn-action-primary ${savedNotification ? 'btn-saved' : ''}`}
            title="Simpan data ke riwayat pengujian"
          >
            {savedNotification ? (
              <>
                <Check size={16} />
                <span>Tersimpan (#{lastSavedId})</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Simpan Pengujian</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Kartu Ringkasan Hasil Utama */}
      <div className="oedometer-summary-grid">
        {/* Card 1: Cv */}
        <div className="oedometer-metric-card card-blue">
          <div className="oedometer-card-head">
            <span className="oedometer-card-title">Koefisien Konsolidasi</span>
            <span className="proctor-metric-badge badge-blue">Cv</span>
          </div>
          <div className="oedometer-card-value">
            {formatScientificInText(cvSecFormatted) || '-'}
            <span className="oedometer-card-unit">cm²/s</span>
          </div>
          <div className="oedometer-card-sub">
            {cvMin ? `${cvMin.toFixed(4)} cm²/menit` : 'Laju konsolidasi primer'}
            <div style={{ marginTop: '4px', fontWeight: 700, color: '#059669' }}>
              ✓ Metode Taylor (Tv = 0.848)
            </div>
          </div>
        </div>

        {/* Card 2: t90 */}
        <div className="oedometer-metric-card card-cyan">
          <div className="oedometer-card-head">
            <span className="oedometer-card-title">Waktu Konsolidasi 90%</span>
            <span className="proctor-metric-badge badge-green" style={{ backgroundColor: '#ECFEFF', color: '#0E7490', borderColor: '#A5F3FC' }}>t90</span>
          </div>
          <div className="oedometer-card-value">
            {t90 !== undefined && t90 !== null ? t90.toFixed(2) : '-'}
            <span className="oedometer-card-unit">menit</span>
          </div>
          <div className="oedometer-card-sub">
            {sqrtT90 ? `√t90 = ${sqrtT90.toFixed(3)} √menit` : 'Akar waktu pada 90% U'}
            <div style={{ marginTop: '4px', fontWeight: 700, color: '#0891B2' }}>
              Titik Potong Garis 1.15
            </div>
          </div>
        </div>

        {/* Card 3: Ht */}
        <div className="oedometer-metric-card card-emerald">
          <div className="oedometer-card-head">
            <span className="oedometer-card-title">Jalur Pengaliran</span>
            <span className="proctor-metric-badge badge-blue" style={{ backgroundColor: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}>Ht</span>
          </div>
          <div className="oedometer-card-value">
            {ht !== undefined && ht !== null ? ht.toFixed(3) : '-'}
            <span className="oedometer-card-unit">cm</span>
          </div>
          <div className="oedometer-card-sub">
            {hRata ? `0.5 × H_rata (H_rata = ${hRata.toFixed(3)} cm)` : 'Double drainage'}
            <div style={{ marginTop: '4px', fontWeight: 700, color: '#059669' }}>
              Drainase Ganda Dua Arah
            </div>
          </div>
        </div>

        {/* Card 4: Cc */}
        <div className="oedometer-metric-card card-purple">
          <div className="oedometer-card-head">
            <span className="oedometer-card-title">Indeks Kompresi</span>
            <span className="proctor-metric-badge badge-orange" style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', borderColor: '#E9D5FF' }}>Cc</span>
          </div>
          <div className="oedometer-card-value" style={{ color: '#7C3AED' }}>
            {cc !== undefined && cc !== null ? cc.toFixed(3) : '-'}
          </div>
          <div className="oedometer-card-sub">
            Δe / log10(P2 / P1)
            <div style={{ marginTop: '4px', fontWeight: 700, color: (cc > 1.0) ? '#D97706' : '#4C1D95' }}>
              {cc > 1.0 ? 'Kompresibilitas Sangat Tinggi (> 1.0)' : 'Kompresibilitas Lempung Normal'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid 2-Kolom: Tabel Pengamatan (Kiri) & Kurva Taylor (Kanan) */}
      <div className="oedometer-layout-grid">
        {/* Kolom Kiri: Tabel Input Dinamis & Form Parameter Eksternal */}
        <div className="oedometer-left-col">
          <div className="calc-card-box">
            <div className="calc-card-header" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div className="calc-card-header-icon">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h3 className="calc-card-title">Tabel Data Pengamatan Konsolidasi</h3>
                  <p className="calc-card-subtitle">Pembacaan waktu t (menit), tebal H (cm), dan penurunan ΔH (cm)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onAddReading}
                className="btn-soil-sieve-add"
                title="Tambahkan baris waktu pengamatan baru"
              >
                <Plus size={14} />
                <span>Tambah Baris Waktu</span>
              </button>
            </div>

            <div className="oedometer-table-container">
              <table className="oedometer-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Waktu t (menit)</th>
                    <th style={{ width: '20%' }}>√t (√menit)</th>
                    <th style={{ width: '24%' }}>Tebal H (cm)</th>
                    <th style={{ width: '24%' }}>Penurunan ΔH (cm)</th>
                    <th style={{ width: '38px', textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {(calcOutput?.sortedReadings || currentOedometerReadings).map((r, idx) => (
                    <tr key={r.id || idx}>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={r.t !== undefined ? r.t : ''}
                          onChange={(e) => onReadingChange(idx, 't', e.target.value)}
                          className="soil-sieve-cell-input"
                          placeholder="0.0"
                        />
                      </td>
                      <td>
                        <span className="oedometer-badge-sqrt">
                          {Math.sqrt(Math.max(0, Number(r.t) || 0)).toFixed(3)}
                        </span>
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.0001"
                          min="0"
                          value={r.h !== undefined ? r.h : ''}
                          onChange={(e) => onReadingChange(idx, 'h', e.target.value)}
                          className="soil-sieve-cell-input"
                          placeholder="2.000"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.0001"
                          min="0"
                          value={r.deltaH !== undefined ? r.deltaH : ''}
                          onChange={(e) => onReadingChange(idx, 'deltaH', e.target.value)}
                          className="soil-sieve-cell-input"
                          placeholder="0.000"
                          style={{ fontWeight: 800, color: '#1D4ED8' }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => onRemoveReading(idx)}
                          disabled={currentOedometerReadings.length <= 1}
                          className="btn-soil-sieve-del"
                          title="Hapus baris waktu ini"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Parameter Tambahan di Luar Tabel */}
            <div className="oedometer-params-grid">
              <div className="proctor-input-group">
                <label>Angka Pori Awal (e0)</label>
                <div className="proctor-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={inputs.e0 !== undefined ? inputs.e0 : 0.85}
                    onChange={(e) => onInputChange('e0', e.target.value)}
                    className="proctor-input-field"
                    placeholder="0.85"
                  />
                </div>
              </div>

              <div className="proctor-input-group">
                <label>Tinggi Awal Cincin H0 (cm)</label>
                <div className="proctor-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    value={inputs.h0 !== undefined ? inputs.h0 : 2.0}
                    onChange={(e) => onInputChange('h0', e.target.value)}
                    className="proctor-input-field"
                    placeholder="2.00"
                  />
                  <span className="proctor-unit-suffix">cm</span>
                </div>
              </div>

              <div className="proctor-input-group">
                <label>Tekanan Beban P1 (kPa)</label>
                <div className="proctor-input-wrap">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={inputs.p1 !== undefined ? inputs.p1 : 50}
                    onChange={(e) => onInputChange('p1', e.target.value)}
                    className="proctor-input-field"
                    placeholder="50.0"
                  />
                  <span className="proctor-unit-suffix">kPa</span>
                </div>
              </div>

              <div className="proctor-input-group">
                <label>Tekanan Beban P2 (kPa)</label>
                <div className="proctor-input-wrap">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={inputs.p2 !== undefined ? inputs.p2 : 100}
                    onChange={(e) => onInputChange('p2', e.target.value)}
                    className="proctor-input-field"
                    placeholder="100.0"
                  />
                  <span className="proctor-unit-suffix">kPa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Visualisasi Grafik Kurva Taylor */}
        <div className="oedometer-right-col">
          <div className="calc-card-box">
            <div className="calc-card-header">
              <div className="calc-card-header-icon" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className="calc-card-title">Kurva Konsolidasi Metode Taylor</h3>
                <p className="calc-card-subtitle">Sumbu X: √t (√menit) | Sumbu Y: Perubahan Tebal ΔH (cm)</p>
              </div>
            </div>

            {/* Recharts Curve */}
            <div className="calc-chart-recharts-wrap" style={{ marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height={360}>
                <LineChart
                  data={chartPoints}
                  margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="sqrtT"
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    allowDataOverflow={true}
                  >
                    <Label
                      value="Akar Waktu √t (√menit)"
                      offset={-15}
                      position="insideBottom"
                      fill="#334155"
                      fontWeight={700}
                      fontSize={11}
                    />
                  </XAxis>
                  <YAxis
                    dataKey="deltaH"
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    allowDataOverflow={true}
                    tickFormatter={(v) => Number(v).toFixed(3)}
                  >
                    <Label
                      value="Penurunan ΔH (cm)"
                      angle={-90}
                      position="insideLeft"
                      offset={0}
                      style={{ textAnchor: 'middle', fill: '#334155', fontWeight: 700, fontSize: 11 }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomOedometerTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '0.75rem', fontWeight: 600 }} />

                  {/* Reference Lines for t90 */}
                  {sqrtT90 > 0 && (
                    <ReferenceLine
                      x={Number(sqrtT90.toFixed(3))}
                      stroke="#2563EB"
                      strokeDasharray="3 3"
                      strokeWidth={1.5}
                      label={{ value: `√t90 = ${sqrtT90.toFixed(2)}`, fill: '#1E40AF', fontSize: 10, position: 'top' }}
                    />
                  )}
                  {deltaH90 > 0 && (
                    <ReferenceLine
                      y={Number(deltaH90.toFixed(4))}
                      stroke="#2563EB"
                      strokeDasharray="3 3"
                      strokeWidth={1.5}
                      label={{ value: `ΔH90 = ${deltaH90.toFixed(3)} cm`, fill: '#1E40AF', fontSize: 10, position: 'right' }}
                    />
                  )}

                  {/* Titik Perpotongan Taylor t90 */}
                  {sqrtT90 > 0 && deltaH90 > 0 && (
                    <ReferenceDot
                      x={Number(sqrtT90.toFixed(3))}
                      y={Number(deltaH90.toFixed(4))}
                      r={5}
                      fill="#EF4444"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      label={{
                        value: `t90 = ${t90?.toFixed(2)} m`,
                        position: 'top',
                        fill: '#B91C1C',
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    />
                  )}

                  {/* Garis Singgung Taylor Awal S1 */}
                  <Line
                    type="linear"
                    dataKey="lineTaylor1"
                    name="Garis Singgung Awal (S1)"
                    stroke="#10B981"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    connectNulls={false}
                  />

                  {/* Garis Taylor 1.15 x Absis */}
                  <Line
                    type="linear"
                    dataKey="lineTaylor2"
                    name="Garis Taylor (1.15 x Absis)"
                    stroke="#F59E0B"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    dot={false}
                    connectNulls={false}
                  />

                  {/* Kurva Konsolidasi Pengamatan Lab */}
                  <Line
                    type="monotone"
                    dataKey="deltaH"
                    name="Kurva Konsolidasi Lab"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#1D4ED8', stroke: '#FFFFFF', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#1E40AF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Rincian Parameter Analisis Taylor */}
            <div className="oedometer-taylor-info-box">
              <div className="oedometer-taylor-card">
                <div style={{ fontWeight: 700, color: '#1E40AF', marginBottom: '2px' }}>Metode Garis Singgung Taylor</div>
                <div style={{ color: '#64748B' }}>
                  Slope Awal S1: <strong style={{ color: '#047857' }}>{calcOutput?.slope1?.toFixed(4) || '-'}</strong> | Slope S2: <strong style={{ color: '#B45309' }}>{calcOutput?.slope2?.toFixed(4) || '-'}</strong>
                </div>
              </div>

              <div className="oedometer-taylor-card">
                <div style={{ fontWeight: 700, color: '#1E40AF', marginBottom: '2px' }}>Titik Konsolidasi Primer 90%</div>
                <div style={{ color: '#64748B' }}>
                  √t90 = <strong style={{ color: '#2563EB' }}>{sqrtT90?.toFixed(3) || '-'}</strong> ➔ t90 = <strong style={{ color: '#2563EB' }}>{t90?.toFixed(2) || '-'} m</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Langkah Rumus & Perhitungan Geoteknik */}
      {calcOutput?.formulaSteps && calcOutput.formulaSteps.length > 0 && (
        <div className="calc-card-box" style={{ marginTop: '1.5rem' }}>
          <div className="calc-card-header">
            <div className="calc-card-header-icon" style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>
              <Info size={18} />
            </div>
            <div>
              <h3 className="calc-card-title">LANGKAH RUMUS PERHITUNGAN KONSOLIDASI (SNI 2812:2011)</h3>
              <p className="calc-card-subtitle">Rincian penentuan t90 dengan metode Taylor, tinggi jalur pengaliran Ht, rumus Cv, dan indeks kompresi Cc</p>
            </div>
          </div>

          <div className="cpt-steps-container">
            {calcOutput.formulaSteps.map((step, idx) => (
              <div key={idx} className="cpt-step-item">
                <div className="cpt-step-text" style={{ fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'pre-wrap' }}>
                  {formatScientificInText(step)}
                </div>
              </div>
            ))}
          </div>

          {/* Kesimpulan Evaluasi Geoteknik */}
          <div
            className={`calc-verdict-box ${getVerdictClass(calcOutput.status)}`}
            style={{ marginTop: '1.25rem' }}
          >
            <div className="calc-verdict-icon">
              {calcOutput.isError ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
            </div>
            <div>
              <div className="calc-verdict-title">{getVerdictLabel(calcOutput.status)}</div>
              <div className="calc-verdict-desc">{calcOutput.conclusion}</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Navigation */}
      <div className="calc-panel-footer" style={{ marginTop: '1.5rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions">
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetReadings}
            title="Kembalikan tabel ke susunan contoh awal (14 Pembacaan Waktu)"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearReadings}
            title="Kosongkan seluruh angka penurunan untuk memasukkan data uji baru"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// CUSTOM TOOLTIP UNTUK GRAFIK MOHR-COULOMB (DIRECT SHEAR TEST)
// =========================================================================
function CustomDirectShearTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0]?.payload
  if (!data) return null

  const sigmaNum = data.sigma !== null && data.sigma !== undefined && !isNaN(Number(data.sigma)) ? Number(data.sigma) : null
  const tauNum = data.tau !== null && data.tau !== undefined && !isNaN(Number(data.tau)) ? Number(data.tau) : null
  const trendlineNum = data.trendline !== null && data.trendline !== undefined && !isNaN(Number(data.trendline)) ? Number(data.trendline) : null

  return (
    <div style={{
      backgroundColor: '#1E293B',
      color: '#FFFFFF',
      padding: '0.65rem 0.85rem',
      borderRadius: '0.5rem',
      fontSize: '0.75rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      border: '1px solid #334155',
      maxWidth: '260px',
    }}>
      <div style={{ fontWeight: 700, color: '#38BDF8', marginBottom: '0.35rem', borderBottom: '1px solid #334155', paddingBottom: '0.25rem' }}>
        {data.label || (sigmaNum !== null ? `Tegangan Normal σ = ${sigmaNum.toFixed(3)} kg/cm²` : 'Titik Data')}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sigmaNum !== null && (
          <div>
            <span style={{ color: '#94A3B8' }}>Tegangan Normal (σ): </span>
            <strong style={{ color: '#FFFFFF' }}>{sigmaNum.toFixed(3)} kg/cm²</strong>
            <span style={{ color: '#64748B', fontSize: '0.7rem' }}> ({(sigmaNum * 98.07).toFixed(1)} kPa)</span>
          </div>
        )}
        {tauNum !== null && (
          <div>
            <span style={{ color: '#F87171' }}>Tegangan Geser Lab (τ): </span>
            <strong style={{ color: '#FCA5A5' }}>{tauNum.toFixed(3)} kg/cm²</strong>
            <span style={{ color: '#64748B', fontSize: '0.7rem' }}> ({(tauNum * 98.07).toFixed(1)} kPa)</span>
          </div>
        )}
        {trendlineNum !== null && (
          <div>
            <span style={{ color: '#60A5FA' }}>Garis Mohr-Coulomb: </span>
            <strong style={{ color: '#93C5FD' }}>{trendlineNum.toFixed(3)} kg/cm²</strong>
          </div>
        )}
        {(data.normalLoad !== null && data.normalLoad !== undefined) && (
          <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.25rem', paddingTop: '0.25rem', borderTop: '1px dashed #334155' }}>
            Beban P: {data.normalLoad} kg | Gaya Geser F: {data.shearForce} kg
          </div>
        )}
      </div>
    </div>
  )
}

// =========================================================================
// KOMPONEN DEDIKASI: MODUL UJI KUAT GESER LANGSUNG / DIRECT SHEAR (SNI 3420:2016)
// =========================================================================
function DynamicDirectShearSection({
  testConfig,
  inputs,
  calcOutput,
  currentPoints,
  onPointChange,
  onAddPoint,
  onRemovePoint,
  onResetPoints,
  onClearPoints,
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
  const cVal = calcOutput.cKgCm2 || calcOutput.results?.find(r => r.label === 'Kohesi Tanah (c)')?.value || '-'
  const cKpa = calcOutput.cKpa || (cVal !== '-' ? (Number(cVal) * 98.07).toFixed(2) : '-')
  const phiVal = calcOutput.phiDeg ? `${calcOutput.phiDeg}°` : calcOutput.results?.find(r => r.label === 'Sudut Geser Dalam (ϕ)')?.value || '-'
  const slopeVal = calcOutput.slope || calcOutput.results?.find(r => r.label === 'Kemiringan Garis (tan ϕ)')?.value || '-'
  const r2Val = calcOutput.r2 || calcOutput.results?.find(r => r.label === 'Koefisien Determinasi (R²)')?.value || '-'
  const chartPoints = calcOutput.chartPoints || []
  const formulaSteps = calcOutput.formulaSteps || []
  const isError = Boolean(calcOutput.isError)

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
      <div className="calc-header-section" style={{ marginBottom: '1.25rem' }}>
        <div className="calc-header-category">{testConfig.category}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
          <h2 className="calc-header-title">{testConfig.name}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="calc-badge-code">{testConfig.code}</span>
            <span className="calc-badge-standard">{testConfig.standard}</span>
          </div>
        </div>
        <p className="calc-header-desc" style={{ marginTop: '0.5rem', color: '#64748B', fontSize: '0.875rem' }}>
          {testConfig.desc}
        </p>
      </div>

      {/* 2. Empat Kartu Ringkasan Hasil Utama */}
      <div className="direct-shear-summary-grid">
        {/* Kartu 1: Kohesi Tanah (c) */}
        <div className="direct-shear-metric-card card-blue">
          <div className="direct-shear-card-head">
            <span className="direct-shear-card-title">Kohesi Tanah (c)</span>
            <span className="direct-shear-card-badge">Intersep Y</span>
          </div>
          <div className="direct-shear-card-value">
            {cVal}
            <span className="direct-shear-card-unit">kg/cm²</span>
          </div>
          <div className="direct-shear-card-sub">
            {cVal !== '-' ? `≈ ${cKpa} kPa (Tahanan kohesi)` : 'Data uji belum lengkap'}
          </div>
        </div>

        {/* Kartu 2: Sudut Geser Dalam (phi) */}
        <div className="direct-shear-metric-card card-purple">
          <div className="direct-shear-card-head">
            <span className="direct-shear-card-title">Sudut Geser Dalam (ϕ)</span>
            <span className="direct-shear-card-badge">arctan(slope)</span>
          </div>
          <div className="direct-shear-card-value">
            {phiVal}
          </div>
          <div className="direct-shear-card-sub">
            Sudut gesek internal partikel tanah
          </div>
        </div>

        {/* Kartu 3: Kemiringan Garis (tan phi) */}
        <div className="direct-shear-metric-card card-emerald">
          <div className="direct-shear-card-head">
            <span className="direct-shear-card-title">Kemiringan Garis (tan ϕ)</span>
            <span className="direct-shear-card-badge">Slope Selubung</span>
          </div>
          <div className="direct-shear-card-value">
            {slopeVal}
          </div>
          <div className="direct-shear-card-sub">
            Gradien selubung keruntuhan Mohr-Coulomb
          </div>
        </div>

        {/* Kartu 4: Koefisien Determinasi (R2) */}
        <div className="direct-shear-metric-card card-amber">
          <div className="direct-shear-card-head">
            <span className="direct-shear-card-title">Koefisien Determinasi (R²)</span>
            <span className="direct-shear-card-badge">Akurasi Regresi</span>
          </div>
          <div className="direct-shear-card-value">
            {r2Val}
          </div>
          <div className="direct-shear-card-sub">
            {r2Val !== '-' && !isNaN(Number(r2Val)) ? `${(Number(r2Val) * 100).toFixed(1)}% tingkat korelasi data` : 'Minimal 3 titik uji valid'}
          </div>
        </div>
      </div>

      {/* 3. Layout Grid: Kolom Kiri (Tabel Input) & Kolom Kanan (Hasil & Grafik) */}
      <div className="direct-shear-layout-grid">
        {/* Kolom Kiri: Tabel Input Pasangan Data Pengujian */}
        <div className="calc-card-box">
          <div className="calc-table-header-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <h4 className="calc-table-title" style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Tabel Titik Pengujian Kuat Geser Langsung
              </h4>
              <p className="calc-table-hint" style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
                SNI 3420:2016 mensyaratkan minimal 3 titik pengujian dengan beban normal bertingkat.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-add-table-row"
                onClick={onAddPoint}
                title="Tambah titik pengujian geser baru"
              >
                <Plus size={14} />
                <span>Tambah Titik Uji</span>
              </button>

              <button
                type="button"
                className="btn-reset-table-data"
                onClick={onClearPoints}
                title="Kosongkan seluruh nilai beban untuk input baru"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>

              <button
                type="button"
                className="btn-reset-table-data"
                onClick={onResetPoints}
                title="Muat 3 titik data laboratorium standar"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #93C5FD',
                  background: '#EFF6FF',
                  color: '#1D4ED8',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span>Contoh Standar</span>
              </button>
            </div>
          </div>

          <div className="direct-shear-table-container">
            <table className="direct-shear-table">
              <thead>
                <tr>
                  <th style={{ width: '55px', textAlign: 'center' }}>Titik #</th>
                  <th style={{ minWidth: '100px' }}>
                    Luas Kotak (A) <span style={{ color: '#2563EB', fontSize: '0.7rem' }}>cm²</span>
                  </th>
                  <th style={{ minWidth: '115px' }}>
                    Beban Normal (P) <span style={{ color: '#059669', fontSize: '0.7rem' }}>kg</span>
                  </th>
                  <th style={{ minWidth: '115px' }}>
                    Gaya Geser (F) <span style={{ color: '#DC2626', fontSize: '0.7rem' }}>kg</span>
                  </th>
                  <th style={{ minWidth: '110px', textAlign: 'right' }}>
                    Tegangan Normal (σ) <span style={{ fontSize: '0.7rem' }}>kg/cm²</span>
                  </th>
                  <th style={{ minWidth: '110px', textAlign: 'right' }}>
                    Tegangan Geser (τ) <span style={{ fontSize: '0.7rem' }}>kg/cm²</span>
                  </th>
                  <th style={{ width: '60px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentPoints.map((pt, index) => {
                  const areaVal = pt.area !== undefined && pt.area !== '' ? pt.area : '31.17'
                  const pVal = pt.normalLoad !== undefined && pt.normalLoad !== null ? pt.normalLoad : ''
                  const fVal = pt.shearForce !== undefined && pt.shearForce !== null ? pt.shearForce : ''
                  const sigmaVal = pt.sigma !== undefined && pt.sigma !== '' && pt.sigma !== null && !isNaN(Number(pt.sigma)) ? Number(pt.sigma).toFixed(3) : '-'
                  const tauVal = pt.tau !== undefined && pt.tau !== '' && pt.tau !== null && !isNaN(Number(pt.tau)) ? Number(pt.tau).toFixed(3) : '-'

                  return (
                    <tr key={pt.id || index}>
                      <td style={{ textAlign: 'center' }}>
                        <span className="point-badge" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#334155' }}>
                          #{index + 1}
                        </span>
                      </td>

                      <td>
                        <input
                          type="number"
                          step="any"
                          min="0.01"
                          placeholder="31.17"
                          className="calc-table-numeric-input"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          value={areaVal}
                          onKeyDown={(e) => handleKeyDown(e, 'area')}
                          onChange={(e) => onPointChange(index, 'area', e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="any"
                          min="0.01"
                          placeholder="misal: 3.17"
                          className="calc-table-numeric-input"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          value={pVal}
                          onKeyDown={(e) => handleKeyDown(e, 'normalLoad')}
                          onChange={(e) => onPointChange(index, 'normalLoad', e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="any"
                          min="0.01"
                          placeholder="misal: 1.50"
                          className="calc-table-numeric-input"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          value={fVal}
                          onKeyDown={(e) => handleKeyDown(e, 'shearForce')}
                          onChange={(e) => onPointChange(index, 'shearForce', e.target.value)}
                        />
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span className="direct-shear-badge-calc">
                          {sigmaVal}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span className="direct-shear-badge-calc badge-tau">
                          {tauVal}
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-remove-table-row"
                          onClick={() => onRemovePoint(index)}
                          disabled={currentPoints.length <= 3}
                          title={currentPoints.length <= 3 ? 'Direct shear memerlukan minimal 3 baris titik uji' : 'Hapus baris titik uji ini'}
                          style={{
                            padding: '4px 6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: currentPoints.length <= 3 ? '#F1F5F9' : '#FEE2E2',
                            color: currentPoints.length <= 3 ? '#94A3B8' : '#DC2626',
                            cursor: currentPoints.length <= 3 ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Rincian Petunjuk Geoteknik */}
          <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 700, color: '#1E293B', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={14} style={{ color: '#2563EB' }} />
              Petunjuk Pengujian Kuat Geser Langsung:
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li><strong>Tegangan Normal (σ)</strong> dihitung dari rumus: <code>σ = P / A</code> (kg/cm²).</li>
              <li><strong>Tegangan Geser Runtuh (τ)</strong> dihitung dari rumus: <code>τ = F / A</code> (kg/cm²).</li>
              <li><strong>Luas Penampang (A)</strong> kotak geser standar: lingkaran diameter 6.3 cm (A = 31.17 cm²) atau bujur sangkar 6.0 × 6.0 cm (A = 36.00 cm²).</li>
              <li><strong>Konversi Satuan:</strong> <code>1 kg/cm² = 98.07 kPa</code>.</li>
            </ul>
          </div>
        </div>

        {/* Kolom Kanan: Evaluasi, Grafik Recharts Mohr-Coulomb & Langkah Rumus */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Status Evaluasi & Kesimpulan */}
          <div className={`calc-verdict-box ${getVerdictClass(calcOutput.status)}`}>
            <div className="verdict-header">
              <span className="verdict-icon">
                {isError ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
              </span>
              <span className="verdict-status-badge">
                {getVerdictLabel(calcOutput.status)}
              </span>
            </div>
            <div className="verdict-body">
              <p className="verdict-conclusion-text">
                {calcOutput.conclusion}
              </p>
            </div>
          </div>

          {/* Visualisasi Grafik Garis Keruntuhan Mohr-Coulomb */}
          <div className="calc-card-box">
            <div className="calc-card-header" style={{ marginBottom: '0.5rem' }}>
              <div>
                <h3 className="calc-card-title" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                  Grafik Garis Keruntuhan Mohr-Coulomb
                </h3>
                <p className="calc-card-subtitle" style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Sumbu X: Tegangan Normal σ (kg/cm²) | Sumbu Y: Tegangan Geser Runtuh τ (kg/cm²)
                </p>
              </div>
            </div>

            {/* Recharts Curve */}
            <div className="calc-chart-recharts-wrap" style={{ marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height={360}>
                <LineChart
                  data={chartPoints}
                  margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="sigma"
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    allowDataOverflow={true}
                    domain={[0, 'auto']}
                  >
                    <Label
                      value="Tegangan Normal σ (kg/cm²)"
                      offset={-15}
                      position="insideBottom"
                      fill="#334155"
                      fontWeight={700}
                      fontSize={11}
                    />
                  </XAxis>
                  <YAxis
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    allowDataOverflow={true}
                    domain={[0, 'auto']}
                    tickFormatter={(v) => !isNaN(Number(v)) ? Number(v).toFixed(3) : ''}
                  >
                    <Label
                      value="Tegangan Geser Runtuh τ (kg/cm²)"
                      angle={-90}
                      position="insideLeft"
                      offset={0}
                      style={{ textAnchor: 'middle', fill: '#334155', fontWeight: 700, fontSize: 11 }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomDirectShearTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '0.75rem', fontWeight: 600 }} />

                  {/* Reference Line Intersep Kohesi (c) */}
                  {cVal !== '-' && !isNaN(Number(cVal)) && Number(cVal) >= 0 && (
                    <ReferenceLine
                      y={Number(cVal)}
                      stroke="#10B981"
                      strokeDasharray="3 3"
                      strokeWidth={1.5}
                      label={{ value: `c = ${cVal} kg/cm²`, fill: '#047857', fontSize: 11, position: 'right' }}
                    />
                  )}

                  {/* Garis Mohr-Coulomb (Trendline) */}
                  <Line
                    type="linear"
                    dataKey="trendline"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive={false}
                    name="Garis Keruntuhan Mohr-Coulomb (τ = c + σ·tan ϕ)"
                  />

                  {/* Titik Uji Laboratorium (Scatter Dots) */}
                  <Line
                    type="linear"
                    dataKey="tau"
                    stroke="#EF4444"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    connectNulls={true}
                    dot={{ r: 6, fill: '#EF4444', stroke: '#FFFFFF', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#DC2626', stroke: '#FFFFFF', strokeWidth: 2 }}
                    isAnimationActive={false}
                    name="Titik Uji Lab (σ, τ)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Banner Persamaan Garis Mohr-Coulomb */}
            <div className="direct-shear-equation-banner">
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, color: '#1E40AF' }}>
                  Persamaan Garis Keruntuhan Mohr-Coulomb:
                </span>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E3A8A', marginTop: '2px', fontFamily: 'monospace' }}>
                  τ = {cVal !== '-' ? cVal : 'c'} + {slopeVal !== '-' ? slopeVal : 'tan(ϕ)'} × σ &nbsp;(kg/cm²)
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>
                  R² = {r2Val}
                </span>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  ϕ = {phiVal} | c = {cVal} kg/cm²
                </div>
              </div>
            </div>

            {/* Rincian Parameter Analisis Mohr-Coulomb */}
            <div className="direct-shear-mohr-info-box">
              <div className="direct-shear-mohr-card">
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Kohesi Tanah (c):</span>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0F172A', marginTop: '2px' }}>
                  {cVal} kg/cm² <span style={{ fontSize: '0.72rem', color: '#64748B' }}>({cKpa} kPa)</span>
                </strong>
              </div>

              <div className="direct-shear-mohr-card">
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Sudut Geser Dalam (ϕ):</span>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0F172A', marginTop: '2px' }}>
                  {phiVal}
                </strong>
              </div>

              <div className="direct-shear-mohr-card">
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Kemiringan Garis (tan ϕ):</span>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0F172A', marginTop: '2px' }}>
                  {slopeVal}
                </strong>
              </div>

              <div className="direct-shear-mohr-card">
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Koefisien Determinasi (R²):</span>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0F172A', marginTop: '2px' }}>
                  {r2Val}
                </strong>
              </div>
            </div>
          </div>

          {/* Kotak Rincian Langkah Rumus Perhitungan */}
          <div className="calc-formula-steps-box" style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} style={{ color: '#2563EB' }} />
              LANGKAH RUMUS PERHITUNGAN:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>
              {formulaSteps.map((step, idx) => (
                <div key={idx} style={{ padding: '0.35rem 0.5rem', background: '#F8FAFC', borderRadius: '0.375rem', borderLeft: '3px solid #3B82F6', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Aksi Simpan & Navigasi */}
          <div className="calc-action-buttons-wrap" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-save-test"
              onClick={onSave}
              disabled={isInputInvalid || hasNegativeInput || hasExceededInput}
              style={{ flex: 1, padding: '0.75rem 1.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '0.5rem', background: '#059669', color: '#FFFFFF', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              <Save size={16} />
              <span>{savedNotification ? 'Tersimpan!' : 'Simpan Pengujian'}</span>
            </button>

            <button
              type="button"
              className="btn-back-footer"
              onClick={onBack}
              style={{ padding: '0.75rem 1.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '0.5rem', background: '#F1F5F9', color: '#334155', fontWeight: 600, border: '1px solid #CBD5E1', cursor: 'pointer' }}
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Dashboard</span>
            </button>
          </div>

          {savedNotification && (
            <div style={{ padding: '0.75rem 1rem', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '0.5rem', color: '#065F46', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} />
              <span>Data pengujian geser langsung berhasil disimpan ke riwayat dashboard! (ID: {lastSavedId})</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Footer Navigasi Bawah */}
      <div className="calc-footer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions">
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetPoints}
            title="Kembalikan tabel ke susunan contoh awal standar laboratorium"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearPoints}
            title="Kosongkan seluruh data pengujian untuk memasukkan data baru"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function DynamicPenetrationSection({
  testConfig,
  inputs,
  calcOutput,
  currentPenetrationGroups,
  onPointChange,
  onAddPoint,
  onRemovePoint,
  onAddGroup,
  onRemoveGroup,
  onResetGroups,
  onClearGroups,
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
  const penAkhirVal = calcOutput.penAkhir || '-'
  const selisihVal = calcOutput.selisih || '-'
  const groupResults = calcOutput.groupResults || []
  const formulaSteps = calcOutput.formulaSteps || []
  const penNum = calcOutput.penAkhirNum || 0

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
      <div className="calc-header-section" style={{ marginBottom: '1.25rem' }}>
        <div className="calc-header-category">{testConfig.category}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
          <h2 className="calc-header-title">{testConfig.name}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="calc-badge-code">{testConfig.code}</span>
            <span className="calc-badge-standard">{testConfig.standard}</span>
          </div>
        </div>
        <p className="calc-header-desc" style={{ marginTop: '0.5rem', color: '#64748B', fontSize: '0.875rem' }}>
          {testConfig.desc}
        </p>
      </div>

      {/* 2. Empat Kartu Ringkasan Hasil Utama */}
      <div className="penetration-summary-grid">
        {/* Kartu 1: Penetrasi Akhir Terkoreksi */}
        <div className={`penetration-metric-card ${calcOutput.isSpecLolos ? 'card-blue' : 'card-rose'}`}>
          <div className="penetration-card-head">
            <span className="penetration-card-title">Penetrasi Akhir (P_akhir)</span>
            <span className="penetration-card-badge">0.1 mm (dmm)</span>
          </div>
          <div className="penetration-card-value">
            {penAkhirVal}
            <span className="penetration-card-unit">dmm</span>
          </div>
          <div className="penetration-card-sub">
            {penAkhirVal !== '-'
              ? `Spesifikasi ${calcOutput.kelasLabel || 'Aspal'}: ${calcOutput.minSpec ?? 60} - ${calcOutput.maxSpec ?? 70} dmm`
              : 'Data pembacaan belum lengkap'}
          </div>
        </div>

        {/* Kartu 2: Presisi Pengujian (Selisih Maks - Min) */}
        <div className={`penetration-metric-card ${calcOutput.isPresisiLolos ? 'card-purple' : 'card-amber'}`}>
          <div className="penetration-card-head">
            <span className="penetration-card-title">Presisi Pengujian (ΔP)</span>
            <span className="penetration-card-badge">P_maks - P_min</span>
          </div>
          <div className="penetration-card-value">
            {selisihVal}
            <span className="penetration-card-unit">dmm</span>
          </div>
          <div className="penetration-card-sub">
            {selisihVal !== '-'
              ? `Toleransi SNI 2456: Maks ${calcOutput.batasToleransi ?? 4} dmm (${calcOutput.isPresisiLolos ? 'Lolos Presisi' : 'Melebihi Batas'})`
              : 'Menunggu titik valid'}
          </div>
        </div>

        {/* Kartu 3: Total Titik Valid vs Outlier */}
        <div className="penetration-metric-card card-amber">
          <div className="penetration-card-head">
            <span className="penetration-card-title">Titik Valid / Outlier</span>
            <span className="penetration-card-badge">Filter Statistik</span>
          </div>
          <div className="penetration-card-value">
            {calcOutput.totalValidCount ?? 0}
            <span className="penetration-card-unit">/ {calcOutput.totalOutlierCount ?? 0} outlier</span>
          </div>
          <div className="penetration-card-sub">
            Total {calcOutput.totalRawPointsCount ?? 0} titik pengamatan di {currentPenetrationGroups.length} kelompok
          </div>
        </div>

        {/* Kartu 4: Evaluasi Mutu & Kesesuaian Standar */}
        <div className={`penetration-metric-card ${calcOutput.verdictClass === 'valid' ? 'card-emerald' : calcOutput.verdictClass === 'warning' ? 'card-amber' : 'card-rose'}`}>
          <div className="penetration-card-head">
            <span className="penetration-card-title">Evaluasi Mutu Standar</span>
            <span className="penetration-card-badge">Bina Marga & SNI</span>
          </div>
          <div className="penetration-card-value" style={{ fontSize: '1.25rem' }}>
            {calcOutput.status || 'Belum Diisi'}
          </div>
          <div className="penetration-card-sub">
            {calcOutput.isSpecLolos && calcOutput.isPresisiLolos
              ? 'Memenuhi syarat spesifikasi dan presisi pengujian SNI 2456:2011'
              : !calcOutput.isSpecLolos
              ? 'Nilai penetrasi berada di luar rentang spesifikasi kelas aspal'
              : 'Presisi pembacaan melebihi toleransi perbedaan pembacaan SNI'}
          </div>
        </div>
      </div>

      {/* 3. Parameter Pengujian & Kelas Spesifikasi Aspal */}
      <div className="penetration-params-box">
        <div className="penetration-params-title">
          <Info size={16} style={{ color: '#2563EB' }} />
          <span>Parameter Kondisi Pengujian & Spesifikasi Bahan Aspal</span>
        </div>
        <div className="penetration-params-grid">
          <div className="penetration-field-wrap">
            <label className="penetration-field-label">Kelas Spesifikasi Aspal</label>
            <select
              value={inputs.kelasAspal || 'pen6070'}
              onChange={(e) => onInputChange('kelasAspal', e.target.value)}
              className="penetration-field-input"
            >
              <option value="pen6070">Aspal Pen 60/70 (Syarat: 60 - 70 dmm)</option>
              <option value="pen4050">Aspal Pen 40/50 (Syarat: 40 - 50 dmm)</option>
              <option value="pen80100">Aspal Pen 80/100 (Syarat: 80 - 100 dmm)</option>
            </select>
          </div>

          <div className="penetration-field-wrap">
            <label className="penetration-field-label">Suhu Bak Rendaman (°C)</label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={inputs.suhuUji ?? 25}
              onChange={(e) => onInputChange('suhuUji', e.target.value)}
              onKeyDown={handleKeyDown}
              className="penetration-field-input"
              placeholder="25.0"
            />
          </div>

          <div className="penetration-field-wrap">
            <label className="penetration-field-label">Beban Jarum Penetrasi (gram)</label>
            <input
              type="number"
              step="1"
              min="1"
              value={inputs.bebanJarum ?? 100}
              onChange={(e) => onInputChange('bebanJarum', e.target.value)}
              onKeyDown={handleKeyDown}
              className="penetration-field-input"
              placeholder="100"
            />
          </div>

          <div className="penetration-field-wrap">
            <label className="penetration-field-label">Waktu Penetrasi (detik)</label>
            <input
              type="number"
              step="0.5"
              min="1"
              value={inputs.waktuPenetrasi ?? 5}
              onChange={(e) => onInputChange('waktuPenetrasi', e.target.value)}
              onKeyDown={handleKeyDown}
              className="penetration-field-input"
              placeholder="5.0"
            />
          </div>
        </div>
      </div>

      {/* 4. Daftar Kartu Kelompok Pengujian & Titik Pembacaan */}
      <div className="penetration-groups-header">
        <div>
          <h3 className="penetration-groups-title">Daftar Kelompok & Titik Pembacaan Jarum Penetrasi</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.15rem' }}>
            Setiap kelompok dianalisis secara independen untuk eliminasi outlier [P̄ ± S] sebelum digabungkan ke Penetrasi Akhir.
          </p>
        </div>
        <div className="penetration-groups-actions">
          <button
            type="button"
            onClick={onAddGroup}
            className="btn-open-table-direct"
            style={{ background: '#2563EB', color: '#FFFFFF', borderColor: '#1D4ED8', fontWeight: 600 }}
            title="Tambah kelompok sampel pengujian baru"
          >
            <Plus size={15} style={{ marginRight: '6px' }} />
            <span>Tambah Kelompok</span>
          </button>

          <button
            type="button"
            onClick={onResetGroups}
            className="btn-open-table-direct"
            title="Kembalikan ke data contoh standar laboratorium praktikum"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            onClick={onClearGroups}
            className="btn-open-table-direct"
            style={{ color: '#DC2626' }}
            title="Kosongkan seluruh nilai pembacaan jarum"
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>
        </div>
      </div>

      {/* Kartu-kartu per kelompok */}
      <div className="penetration-groups-list">
        {currentPenetrationGroups.map((grp, gIndex) => {
          const gStats = groupResults.find((g) => g.groupId === grp.id) || {}
          const hasOutlier = Boolean(gStats.outlierPoints && gStats.outlierPoints.length > 0)

          return (
            <div key={grp.id} className="penetration-group-card">
              {/* Header Kartu Kelompok */}
              <div className="penetration-group-head">
                <div className="penetration-group-title-wrap">
                  <span className="penetration-group-name">{grp.name || `Kelompok ${grp.id}`}</span>
                  <div className="penetration-group-badges">
                    <span className="penetration-group-badge badge-clean">
                      Rata-rata Bersih: {gStats.cleanMean !== undefined ? `${gStats.cleanMean.toFixed(1)} dmm` : '-'}
                    </span>
                    <span className="penetration-group-badge">
                      SD (S) = {gStats.sd !== undefined ? `${gStats.sd.toFixed(2)} dmm` : '-'}
                    </span>
                    <span className={`penetration-group-badge ${hasOutlier ? 'badge-outlier' : ''}`}>
                      {gStats.outlierPoints ? `${gStats.outlierPoints.length} Outlier` : '0 Outlier'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveGroup(grp.id)}
                  disabled={currentPenetrationGroups.length <= 1}
                  className="penetration-btn-del-point"
                  title={currentPenetrationGroups.length <= 1 ? 'Minimal harus ada 1 kelompok pengujian' : 'Hapus kelompok ini'}
                  style={{
                    color: currentPenetrationGroups.length <= 1 ? '#94A3B8' : '#DC2626',
                    cursor: currentPenetrationGroups.length <= 1 ? 'not-allowed' : 'pointer',
                    padding: '0.4rem 0.6rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '0.375rem',
                    fontSize: '0.78rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Trash2 size={14} />
                  <span>Hapus Kelompok</span>
                </button>
              </div>

              {/* Banner Statistik & Rentang Valid Outlier */}
              <div className={`penetration-group-banner ${hasOutlier ? 'has-outlier' : ''}`}>
                <div>
                  <strong>Rentang Valid Outlier [P̄ ± S]: </strong>
                  <span>
                    [{gStats.lowerBound !== undefined ? gStats.lowerBound.toFixed(2) : '-'} dmm s/d {gStats.upperBound !== undefined ? gStats.upperBound.toFixed(2) : '-'} dmm]
                  </span>
                  <span style={{ marginLeft: '0.75rem', opacity: 0.85 }}>
                    (P̄ awal = {gStats.meanInitial !== undefined ? gStats.meanInitial.toFixed(2) : '-'} dmm, CV = {gStats.cv !== undefined ? gStats.cv.toFixed(2) : '-'}%)
                  </span>
                </div>
                {hasOutlier && (
                  <span style={{ fontWeight: 700 }}>
                    ⚠️ {gStats.outlierPoints.length} titik tereliminasi dari perhitungan bersih
                  </span>
                )}
              </div>

              {/* Input Titik Pembacaan Jarum */}
              <div className="penetration-group-body">
                <div className="penetration-points-grid">
                  {(grp.points || []).map((pt, pIndex) => {
                    const pAnalysis = gStats.pointsAnalysis ? gStats.pointsAnalysis.find((p) => p.id === pt.id) : null
                    const isOutlier = Boolean(pAnalysis && pAnalysis.isOutlier)
                    const isFilled = pt.value !== '' && pt.value !== null && !isNaN(Number(pt.value)) && Number(pt.value) > 0

                    return (
                      <div
                        key={pt.id || pIndex}
                        className={`penetration-point-row ${isOutlier ? 'point-outlier' : ''}`}
                      >
                        <span className="penetration-point-label">Titik #{pIndex + 1}</span>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={pt.value}
                          onChange={(e) => onPointChange(grp.id, pt.id, e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="penetration-point-input"
                          placeholder="0.0"
                        />
                        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>dmm</span>

                        {isOutlier ? (
                          <span className="penetration-point-badge outlier" title="Nilai berada di luar rentang [P̄ ± S], dieliminasi">
                            <AlertTriangle size={12} />
                            <span>Outlier</span>
                          </span>
                        ) : isFilled ? (
                          <span className="penetration-point-badge valid" title="Nilai masuk dalam rentang toleransi statistik">
                            <Check size={12} />
                            <span>Valid</span>
                          </span>
                        ) : (
                          <span className="penetration-point-badge empty">
                            <span>Kosong</span>
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => onRemovePoint(grp.id, pt.id)}
                          disabled={grp.points.length <= 1}
                          title={grp.points.length <= 1 ? 'Minimal 1 titik per kelompok' : 'Hapus titik ini'}
                          className="penetration-btn-del-point"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => onAddPoint(grp.id)}
                  className="penetration-btn-add-point"
                >
                  <Plus size={15} />
                  <span>Tambah Titik Pengamatan pada {grp.name || `Kelompok ${grp.id}`}</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 5. Tabel Rekapitulasi Analisis Statistik & Outlier Antar-Kelompok */}
      <div className="penetration-recap-container">
        <div className="penetration-recap-head">
          <span className="penetration-recap-title">
            Tabel Rekapitulasi Analisis Statistik & Outlier Antar-Kelompok (SNI 2456:2011)
          </span>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            Data dieliminasi otomatis bila melampaui rentang [P̄ ± S]
          </span>
        </div>

        <div className="penetration-table-scroll">
          <table className="penetration-recap-table">
            <thead>
              <tr>
                <th style={{ minWidth: '150px' }}>Kelompok Sampel</th>
                <th style={{ minWidth: '70px' }}>Titik (n)</th>
                <th style={{ minWidth: '110px' }}>Rata Awal (P̄)</th>
                <th style={{ minWidth: '110px' }}>Std Deviasi (S)</th>
                <th style={{ minWidth: '90px' }}>Koef. Var (K)</th>
                <th style={{ minWidth: '120px' }}>Batas Bawah (P̄ - S)</th>
                <th style={{ minWidth: '120px' }}>Batas Atas (P̄ + S)</th>
                <th style={{ minWidth: '140px' }}>Outlier Tereliminasi</th>
                <th style={{ minWidth: '120px' }}>Rata Bersih (P_clean)</th>
              </tr>
            </thead>
            <tbody>
              {groupResults.map((g, idx) => (
                <tr key={g.groupId || idx}>
                  <td><strong>{g.groupName}</strong></td>
                  <td>{g.n}</td>
                  <td>{g.meanInitial.toFixed(2)} dmm</td>
                  <td>{g.sd.toFixed(2)} dmm</td>
                  <td>{g.cv.toFixed(2)}%</td>
                  <td>{g.lowerBound.toFixed(2)} dmm</td>
                  <td>{g.upperBound.toFixed(2)} dmm</td>
                  <td>
                    {g.outlierPoints && g.outlierPoints.length > 0 ? (
                      <span style={{ color: '#DC2626', fontWeight: 700 }}>
                        {g.outlierPoints.map((p) => `${p.value.toFixed(1)}`).join(', ')} dmm
                      </span>
                    ) : (
                      <span style={{ color: '#16A34A', fontSize: '0.78rem' }}>Nihil (0 outlier)</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 700, color: '#1D4ED8' }}>
                    {g.cleanMean.toFixed(2)} dmm
                  </td>
                </tr>
              ))}

              {/* Baris Total Gabungan */}
              <tr className="total-row">
                <td>HASIL GLOBAL (SEMUA KELOMPOK)</td>
                <td>{calcOutput.totalValidCount ?? 0} valid</td>
                <td colSpan="5" style={{ textAlign: 'center', color: '#64748B', fontStyle: 'italic', fontSize: '0.75rem' }}>
                  Total {calcOutput.totalRawPointsCount ?? 0} pembacaan jarum | Selisih Presisi (ΔP) = {calcOutput.selisih ?? '-'} dmm (Toleransi SNI ≤ {calcOutput.batasToleransi ?? 4} dmm)
                </td>
                <td style={{ color: calcOutput.totalOutlierCount > 0 ? '#DC2626' : '#16A34A' }}>
                  {calcOutput.totalOutlierCount ?? 0} titik dieliminasi
                </td>
                <td style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                  {penAkhirVal} dmm
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Panduan Tabel Toleransi Presisi SNI 2456:2011 */}
      <div className="penetration-sni-guide">
        <div className="penetration-sni-title">
          <Info size={16} style={{ color: '#2563EB' }} />
          <span>Tabel Toleransi Presisi Perbedaan Pembacaan Maks-Min (SNI 2456:2011 Tabel 1)</span>
        </div>
        <div className="penetration-sni-grid">
          <div className={`penetration-sni-tier ${penNum > 0 && penNum < 50 ? 'active' : ''}`}>
            <div className="penetration-sni-tier-range">Rentang Penetrasi: 0 - 49 dmm</div>
            <div className="penetration-sni-tier-limit">Maksimal Selisih: 2 dmm</div>
            <div className="penetration-sni-tier-status">
              {penNum > 0 && penNum < 50 ? '● Kategori Sampel Ini' : 'Aspal sangat keras'}
            </div>
          </div>

          <div className={`penetration-sni-tier ${penNum >= 50 && penNum < 150 ? 'active' : ''}`}>
            <div className="penetration-sni-tier-range">Rentang Penetrasi: 50 - 149 dmm</div>
            <div className="penetration-sni-tier-limit">Maksimal Selisih: 4 dmm</div>
            <div className="penetration-sni-tier-status">
              {penNum >= 50 && penNum < 150 ? '● Kategori Sampel Ini (Pen 60/70 & Pen 80/100)' : 'Aspal standar jalan raya'}
            </div>
          </div>

          <div className={`penetration-sni-tier ${penNum >= 150 && penNum < 250 ? 'active' : ''}`}>
            <div className="penetration-sni-tier-range">Rentang Penetrasi: 150 - 249 dmm</div>
            <div className="penetration-sni-tier-limit">Maksimal Selisih: 12 dmm</div>
            <div className="penetration-sni-tier-status">
              {penNum >= 150 && penNum < 250 ? '● Kategori Sampel Ini' : 'Aspal lunak / modifikasi'}
            </div>
          </div>

          <div className={`penetration-sni-tier ${penNum >= 250 ? 'active' : ''}`}>
            <div className="penetration-sni-tier-range">Rentang Penetrasi: 250 - 500 dmm</div>
            <div className="penetration-sni-tier-limit">Maksimal Selisih: 20 dmm</div>
            <div className="penetration-sni-tier-status">
              {penNum >= 250 ? '● Kategori Sampel Ini' : 'Aspal cair / emulsi'}
            </div>
          </div>
        </div>
      </div>

      {/* 7. Langkah Rumus Perhitungan Lengkap */}
      <div className="calc-steps-section" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={16} style={{ color: '#2563EB' }} />
          <span>Langkah Rumus Perhitungan Matematis Lengkap (SNI 2456:2011 & Bina Marga 2018)</span>
        </h4>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.8rem',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '0.5rem',
            padding: '1rem',
            lineHeight: 1.55,
            color: '#1E293B',
            overflowX: 'auto',
          }}
        >
          {formulaSteps.join('\n')}
        </pre>
      </div>

      {/* 8. Kesimpulan & Tombol Aksi Simpan */}
      <div
        className="calc-conclusion-section"
        style={{
          background: calcOutput.verdictClass === 'valid' ? '#F0FDF4' : calcOutput.verdictClass === 'warning' ? '#FEF3C7' : '#FFF1F2',
          border: `1px solid ${calcOutput.verdictClass === 'valid' ? '#86EFAC' : calcOutput.verdictClass === 'warning' ? '#FCD34D' : '#FDA4AF'}`,
          borderRadius: '0.75rem',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {calcOutput.verdictClass === 'valid' ? (
            <CheckCircle2 size={18} style={{ color: '#16A34A' }} />
          ) : (
            <AlertTriangle size={18} style={{ color: calcOutput.verdictClass === 'warning' ? '#D97706' : '#E11D48' }} />
          )}
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: calcOutput.verdictClass === 'valid' ? '#166534' : calcOutput.verdictClass === 'warning' ? '#92400E' : '#9F1239' }}>
            Kesimpulan Evaluasi Mutu Pengujian: {calcOutput.status}
          </span>
        </div>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: calcOutput.verdictClass === 'valid' ? '#14532D' : calcOutput.verdictClass === 'warning' ? '#78350F' : '#881337', margin: 0 }}>
          {calcOutput.conclusion}
        </p>

        {/* Tombol Simpan & Navigasi */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <button
            type="button"
            className="btn-save-test"
            onClick={onSave}
            disabled={isInputInvalid || hasNegativeInput || hasExceededInput}
            style={{
              padding: '0.75rem 1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderRadius: '0.5rem',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: isInputInvalid || hasNegativeInput || hasExceededInput ? 'not-allowed' : 'pointer',
              opacity: isInputInvalid || hasNegativeInput || hasExceededInput ? 0.6 : 1,
            }}
          >
            <Save size={16} />
            <span>{savedNotification ? 'Tersimpan!' : 'Simpan Pengujian'}</span>
          </button>

          <button
            type="button"
            className="btn-back-footer"
            onClick={onBack}
            style={{
              padding: '0.75rem 1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderRadius: '0.5rem',
              background: '#F1F5F9',
              color: '#334155',
              fontWeight: 600,
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Dashboard</span>
          </button>
        </div>

        {savedNotification && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: '#ECFDF5',
              border: '1px solid #6EE7B7',
              borderRadius: '0.5rem',
              color: '#065F46',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.75rem',
            }}
          >
            <CheckCircle2 size={16} />
            <span>Data pengujian penetrasi aspal berhasil disimpan ke riwayat dashboard! (ID: {lastSavedId})</span>
          </div>
        )}
      </div>

      {/* 9. Footer Navigasi Bawah */}
      <div
        className="calc-footer-nav"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid #E2E8F0',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions">
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetGroups}
            title="Kembalikan tabel ke susunan contoh awal standar laboratorium"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearGroups}
            title="Kosongkan seluruh data pengujian untuk memasukkan data baru"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// CUSTOM TOOLTIP UNTUK GRAFIK OSBORNE REYNOLDS (ASTM D5242)
// =========================================================================
function CustomReynoldsTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0]?.payload
  if (!data) return null

  return (
    <div style={{
      backgroundColor: '#1E293B',
      color: '#FFFFFF',
      padding: '0.65rem 0.85rem',
      borderRadius: '0.5rem',
      fontSize: '0.75rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      border: '1px solid #334155',
      maxWidth: '280px',
    }}>
      <div style={{ fontWeight: 700, color: '#38BDF8', marginBottom: '0.35rem', borderBottom: '1px solid #334155', paddingBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span>{data.label || `Pengujian #${data.pointNum}`}</span>
        <span style={{
          padding: '2px 7px',
          borderRadius: '4px',
          fontSize: '0.7rem',
          fontWeight: 700,
          background: data.rezim === 'Laminer' ? '#065F46' : data.rezim === 'Transisi' ? '#78350F' : '#881337',
          color: data.rezim === 'Laminer' ? '#A7F3D0' : data.rezim === 'Transisi' ? '#FDE68A' : '#FECDD3',
        }}>
          {data.rezim}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div>
          <span style={{ color: '#94A3B8' }}>Debit Aliran (Q): </span>
          <strong style={{ color: '#FFFFFF' }}>{data.qLs !== undefined && data.qLs !== null ? Number(data.qLs).toFixed(4) : '-'} L/s</strong>
        </div>
        <div>
          <span style={{ color: '#94A3B8' }}>Kecepatan Rata-rata (v): </span>
          <strong style={{ color: '#FFFFFF' }}>{data.v !== undefined && data.v !== null ? Number(data.v).toFixed(3) : '-'} m/s</strong>
        </div>
        <div>
          <span style={{ color: '#60A5FA' }}>Bilangan Reynolds (Re): </span>
          <strong style={{ color: '#93C5FD' }}>{data.re !== undefined && data.re !== null ? Number(data.re).toFixed(0) : '-'}</strong>
        </div>
        <div>
          <span style={{ color: '#A7F3D0' }}>Koefisien Gesek (f): </span>
          <strong style={{ color: '#6EE7B7' }}>{data.f !== undefined && data.f !== null ? Number(data.f).toFixed(4) : '-'}</strong>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#CBD5E1', borderTop: '1px dashed #334155', paddingTop: '4px', marginTop: '3px' }}>
          Log(Re) = {data.logRe !== undefined && data.logRe !== null ? Number(data.logRe).toFixed(3) : '-'} | Log(f) = {data.logF !== undefined && data.logF !== null ? Number(data.logF).toFixed(3) : '-'}
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// KOMPONEN DEDIKASI: MODUL UJI BILANGAN OSBORNE REYNOLDS (ASTM D5242)
// =========================================================================
function DynamicReynoldsSection({
  testConfig,
  inputs,
  calcOutput,
  currentReynoldsRows,
  onRowChange,
  onAddRow,
  onRemoveRow,
  onResetRows,
  onClearRows,
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
  const [chartTab, setChartTab] = useState('reQ')

  const chartData = calcOutput.chartData || []
  const recapRows = calcOutput.recapRows || []
  const formulaSteps = calcOutput.formulaSteps || []
  const isError = Boolean(calcOutput.isError)

  const minRe = calcOutput.minRe || '-'
  const maxRe = calcOutput.maxRe || '-'
  const avgRe = calcOutput.avgRe || '-'
  const minQ = calcOutput.minQ || '-'
  const maxQ = calcOutput.maxQ || '-'
  const avgV = calcOutput.avgV || '-'
  const countLaminer = calcOutput.countLaminer ?? 0
  const countTransisi = calcOutput.countTransisi ?? 0
  const countTurbulen = calcOutput.countTurbulen ?? 0
  const refD = calcOutput.refD || '11.0'
  const refNu = calcOutput.refNu || '0.893'

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
      <div className="calc-header-section" style={{ marginBottom: '1.25rem' }}>
        <div className="calc-header-category">{testConfig.category}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
          <h2 className="calc-header-title">{testConfig.name}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="calc-badge-code">{testConfig.code}</span>
            <span className="calc-badge-standard">{testConfig.standard}</span>
          </div>
        </div>
        <p className="calc-header-desc" style={{ marginTop: '0.5rem', color: '#64748B', fontSize: '0.875rem' }}>
          {testConfig.desc}
        </p>
      </div>

      {/* 2. Empat Kartu Ringkasan Hasil Utama */}
      <div className="reynolds-summary-grid">
        {/* Kartu 1: Bilangan Reynolds (Re) */}
        <div className="reynolds-metric-card card-blue">
          <div className="reynolds-card-head">
            <span className="reynolds-card-title">Bilangan Reynolds (Re)</span>
            <span className="reynolds-card-badge">v·D / ν</span>
          </div>
          <div className="reynolds-card-value">
            {minRe !== '-' && maxRe !== '-' ? `${minRe} - ${maxRe}` : avgRe}
          </div>
          <div className="reynolds-card-sub">
            {avgRe !== '-' ? `Rata-rata: ${avgRe} | Kritis: 2000 & 4000` : 'Data pengujian belum terisi'}
          </div>
        </div>

        {/* Kartu 2: Sebaran Rezim Aliran */}
        <div className="reynolds-metric-card card-emerald">
          <div className="reynolds-card-head">
            <span className="reynolds-card-title">Sebaran Rezim Aliran</span>
            <span className="reynolds-card-badge">Klasifikasi</span>
          </div>
          <div className="reynolds-card-value">
            {countLaminer} L | {countTransisi} T | {countTurbulen} Tb
          </div>
          <div className="reynolds-card-sub">
            {countLaminer} Laminer, {countTransisi} Transisi, {countTurbulen} Turbulen
          </div>
        </div>

        {/* Kartu 3: Rentang Debit Aliran (Q) */}
        <div className="reynolds-metric-card card-amber">
          <div className="reynolds-card-head">
            <span className="reynolds-card-title">Rentang Debit Aliran (Q)</span>
            <span className="reynolds-card-badge">Volumetrik</span>
          </div>
          <div className="reynolds-card-value">
            {minQ !== '-' && maxQ !== '-' ? `${minQ} - ${maxQ}` : '-'}
            <span className="reynolds-card-unit">L/s</span>
          </div>
          <div className="reynolds-card-sub">
            {avgV !== '-' ? `Kecepatan Rata-rata: ${avgV} m/s` : 'Q = Volume / Waktu'}
          </div>
        </div>

        {/* Kartu 4: Parameter Pipa & Suhu */}
        <div className="reynolds-metric-card card-purple">
          <div className="reynolds-card-head">
            <span className="reynolds-card-title">Diameter Pipa & Suhu</span>
            <span className="reynolds-card-badge">Apparatus</span>
          </div>
          <div className="reynolds-card-value">
            D = {refD} <span className="reynolds-card-unit">mm</span>
          </div>
          <div className="reynolds-card-sub">
            ν = {refNu} × 10⁻⁶ m²/s (Air Murni)
          </div>
        </div>
      </div>

      {/* 3. Layout Konten: Tabel Pengamatan & Hasil */}
      <div className="reynolds-layout-grid">
        {/* Panel A: Tabel Input Data Pengamatan Dinamis (Multi-Baris) */}
        <div className="calc-card-box">
          <div className="calc-table-header-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <h4 className="calc-table-title" style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Tabel Input Data Pengamatan Dinamis (Osborne Reynolds)
              </h4>
              <p className="calc-table-hint" style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
                Masukkan pembacaan waktu alir (t), volume tertampung (V), diameter pipa (D), dan viskositas kinematik (ν) untuk setiap variasi bukaan katup debit.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-add-table-row"
                onClick={onAddRow}
                title="Tambah baris variasi debit pengujian baru"
              >
                <Plus size={14} />
                <span>Tambah Baris Pengujian</span>
              </button>

              <button
                type="button"
                className="btn-reset-table-data"
                onClick={onClearRows}
                title="Kosongkan nilai waktu untuk memasukkan data baru"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>

              <button
                type="button"
                className="btn-reset-table-data"
                onClick={onResetRows}
                title="Muat 5 baris data laboratorium standar (Laminer, Transisi, Turbulen)"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #93C5FD',
                  background: '#EFF6FF',
                  color: '#1D4ED8',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span>Contoh Standar</span>
              </button>
            </div>
          </div>

          <div className="reynolds-table-container">
            <table className="reynolds-table">
              <thead>
                <tr>
                  <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                  <th style={{ minWidth: '105px' }}>
                    Waktu (t) <span style={{ color: '#2563EB', fontSize: '0.7rem' }}>detik</span>
                  </th>
                  <th style={{ minWidth: '105px' }}>
                    Volume (V) <span style={{ color: '#059669', fontSize: '0.7rem' }}>Liter</span>
                  </th>
                  <th style={{ minWidth: '100px' }}>
                    Diameter (D) <span style={{ color: '#7C3AED', fontSize: '0.7rem' }}>mm</span>
                  </th>
                  <th style={{ minWidth: '115px' }}>
                    Viskositas (ν) <span style={{ color: '#D97706', fontSize: '0.7rem' }}>×10⁻⁶ m²/s</span>
                  </th>
                  <th style={{ minWidth: '180px' }}>
                    Catatan Pengamatan Zat Warna
                  </th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Rezim Live</th>
                  <th style={{ width: '55px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentReynoldsRows.map((row, index) => {
                  const tVal = row.t !== undefined && row.t !== null ? row.t : ''
                  const vVal = row.volume !== undefined && row.volume !== null ? row.volume : (row.v !== undefined ? row.v : '')
                  const dVal = row.diameter !== undefined && row.diameter !== null ? row.diameter : (row.d !== undefined ? row.d : 11)
                  const nuVal = row.viskositas !== undefined && row.viskositas !== null ? row.viskositas : (row.nu !== undefined ? row.nu : 0.893)
                  const noteVal = row.visualNote !== undefined ? row.visualNote : ''

                  // Live row calc for preview badge
                  let previewRezim = '-'
                  let badgeCls = 'invalid'
                  const tNum = Number(tVal)
                  const vNum = Number(vVal)
                  const dNum = Number(dVal)
                  const nuNum = Number(nuVal)
                  if (!isNaN(tNum) && tNum > 0 && !isNaN(vNum) && vNum > 0 && !isNaN(dNum) && dNum > 0 && !isNaN(nuNum) && nuNum > 0) {
                    const volM3 = vNum >= 0.01 ? vNum / 1000 : vNum
                    const dM = dNum >= 0.5 ? dNum / 1000 : dNum
                    const nuM2 = nuNum >= 0.001 ? nuNum * 1e-6 : nuNum
                    const a = 0.25 * Math.PI * dM * dM
                    const q = volM3 / tNum
                    const vel = q / a
                    const re = (vel * dM) / nuM2
                    if (re < 2000) {
                      previewRezim = `Laminer (${re.toFixed(0)})`
                      badgeCls = 'laminer'
                    } else if (re <= 4000) {
                      previewRezim = `Transisi (${re.toFixed(0)})`
                      badgeCls = 'transisi'
                    } else {
                      previewRezim = `Turbulen (${re.toFixed(0)})`
                      badgeCls = 'turbulen'
                    }
                  }

                  return (
                    <tr key={row.id || index}>
                      <td style={{ textAlign: 'center' }}>
                        <span className="point-badge" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#334155' }}>
                          #{index + 1}
                        </span>
                      </td>

                      <td>
                        <input
                          type="number"
                          step="any"
                          min="0.1"
                          placeholder="misal: 42.0"
                          className="calc-table-numeric-input"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          value={tVal}
                          onKeyDown={(e) => handleKeyDown(e, 't')}
                          onChange={(e) => onRowChange(index, 't', e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="any"
                          min="0.01"
                          placeholder="0.5"
                          className="calc-table-numeric-input"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          value={vVal}
                          onKeyDown={(e) => handleKeyDown(e, 'volume')}
                          onChange={(e) => onRowChange(index, 'volume', e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="any"
                          min="0.1"
                          placeholder="11.0"
                          className="calc-table-numeric-input"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          value={dVal}
                          onKeyDown={(e) => handleKeyDown(e, 'diameter')}
                          onChange={(e) => onRowChange(index, 'diameter', e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="any"
                          min="0.001"
                          placeholder="0.893"
                          className="calc-table-numeric-input"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                          value={nuVal}
                          onKeyDown={(e) => handleKeyDown(e, 'viskositas')}
                          onChange={(e) => onRowChange(index, 'viskositas', e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          placeholder="Contoh: Filamen lurus stabil"
                          style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                          value={noteVal}
                          onChange={(e) => onRowChange(index, 'visualNote', e.target.value)}
                        />
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <span className={`reynolds-badge ${badgeCls}`}>
                          {previewRezim}
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-remove-table-row"
                          onClick={() => onRemoveRow(index)}
                          disabled={currentReynoldsRows.length <= 1}
                          title={currentReynoldsRows.length <= 1 ? 'Minimal 1 baris pengujian' : 'Hapus baris pengujian ini'}
                          style={{
                            padding: '4px 6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: currentReynoldsRows.length <= 1 ? '#F1F5F9' : '#FEE2E2',
                            color: currentReynoldsRows.length <= 1 ? '#94A3B8' : '#DC2626',
                            cursor: currentReynoldsRows.length <= 1 ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Petunjuk Teknis Pengujian */}
          <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 700, color: '#1E293B', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={14} style={{ color: '#2563EB' }} />
              Petunjuk Pengujian Bilangan Osborne Reynolds (Standar Hidraulika Pipa Re):
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li><strong>Debit Aliran (Q):</strong> <code>Q = V / t</code> (m³/s atau L/s).</li>
              <li><strong>Kecepatan Aliran (v):</strong> <code>v = Q / A</code> dengan <code>A = (1/4)·π·D²</code> (m/s).</li>
              <li><strong>Bilangan Reynolds (Re):</strong> <code>Re = (v·D) / ν</code>. Batas aliran: <strong>Laminer</strong> (Re &lt; 2000), <strong>Transisi</strong> (2000 ≤ Re ≤ 4000), <strong>Turbulen</strong> (Re &gt; 4000).</li>
              <li><strong>Koefisien Gesekan (f):</strong> Untuk laminer <code>f = 64 / Re</code>, untuk transisi/turbulen menggunakan persamaan empiris Blasius <code>f = 0.3164 / Re^0.25</code>.</li>
            </ul>
          </div>
        </div>

        {/* Panel B: Status Evaluasi & Kesimpulan */}
        <div className={`calc-verdict-box ${getVerdictClass(calcOutput.status)}`}>
          <div className="verdict-header">
            <span className="verdict-icon">
              {isError ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
            </span>
            <span className="verdict-status-badge">
              {getVerdictLabel(calcOutput.status)}
            </span>
          </div>
          <div className="verdict-body">
            <p className="verdict-conclusion-text">
              {calcOutput.conclusion}
            </p>
          </div>
        </div>

        {/* Panel C: Tabel Rekapitulasi Hasil Perhitungan Sesuai Laporan Manual */}
        <div className="calc-card-box">
          <div className="calc-card-header" style={{ marginBottom: '0.5rem' }}>
            <div>
              <h3 className="calc-card-title" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                Tabel Rekapitulasi Hasil Perhitungan (Sesuai Lembar Laporan Manual)
              </h3>
              <p className="calc-card-subtitle" style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Menampilkan hasil perhitungan Debit (Q), Kecepatan (v), Reynolds (Re), Rezim Aliran, Koefisien Gesek (f), serta nilai Logaritma:
              </p>
            </div>
          </div>

          <div className="reynolds-recap-table-container">
            <table className="reynolds-recap-table">
              <thead>
                <tr>
                  <th style={{ width: '45px' }}>No</th>
                  <th style={{ minWidth: '80px' }}>Waktu t (s)</th>
                  <th style={{ minWidth: '85px' }}>Volume (L)</th>
                  <th style={{ minWidth: '100px' }}>Debit Q (L/s)</th>
                  <th style={{ minWidth: '100px' }}>Kecepatan v (m/s)</th>
                  <th style={{ minWidth: '110px' }}>Reynolds (Re)</th>
                  <th style={{ minWidth: '100px' }}>Rezim Aliran</th>
                  <th style={{ minWidth: '95px' }}>Koefisien f</th>
                  <th style={{ minWidth: '85px' }}>Log(f)</th>
                  <th style={{ minWidth: '85px' }}>Log(Re)</th>
                </tr>
              </thead>
              <tbody>
                {recapRows.length > 0 ? (
                  recapRows.map((r, i) => (
                    <tr key={r.id || i}>
                      <td>#{r.pointNum}</td>
                      <td>{r.t !== null && r.t !== undefined ? Number(r.t).toFixed(1) : '-'}</td>
                      <td>{r.volume !== null && r.volume !== undefined ? Number(r.volume).toFixed(3) : '-'}</td>
                      <td>{r.qLs !== null && r.qLs !== undefined ? Number(r.qLs).toFixed(4) : '-'}</td>
                      <td>{r.v !== null && r.v !== undefined ? Number(r.v).toFixed(3) : '-'}</td>
                      <td style={{ fontWeight: 700, color: '#1E3A8A' }}>
                        {r.re !== null && r.re !== undefined ? Number(r.re).toFixed(0) : '-'}
                      </td>
                      <td>
                        <span className={`reynolds-badge ${r.rezimClass || 'invalid'}`}>
                          {r.rezim}
                        </span>
                      </td>
                      <td style={{ color: '#047857', fontWeight: 600 }}>
                        {r.f !== null && r.f !== undefined ? Number(r.f).toFixed(4) : '-'}
                      </td>
                      <td>{r.logF !== null && r.logF !== undefined ? Number(r.logF).toFixed(3) : '-'}</td>
                      <td>{r.logRe !== null && r.logRe !== undefined ? Number(r.logRe).toFixed(3) : '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '1rem', color: '#94A3B8' }}>
                      Belum ada data pengujian valid.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel D: Visualisasi Grafik Interaktif Recharts */}
        <div className="calc-card-box">
          <div className="calc-card-header" style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 className="calc-card-title" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                Visualisasi Grafik Karakteristik Aliran Osborne Reynolds
              </h3>
              <p className="calc-card-subtitle" style={{ fontSize: '0.75rem', color: '#64748B' }}>
                {chartTab === 'reQ' 
                  ? 'Sumbu X: Debit Aliran Q (L/s) | Sumbu Y: Bilangan Reynolds (Re) dengan Garis Batas Kritis Aliran'
                  : 'Sumbu X: Log(Re) | Sumbu Y: Log(f) (Karakteristik Penurunan Koefisien Gesek Moody)'}
              </p>
            </div>

            {/* Toggle Tab Grafik */}
            <div style={{ display: 'inline-flex', background: '#F1F5F9', borderRadius: '0.5rem', padding: '3px' }}>
              <button
                type="button"
                onClick={() => setChartTab('reQ')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '0.375rem',
                  border: 'none',
                  background: chartTab === 'reQ' ? '#FFFFFF' : 'transparent',
                  color: chartTab === 'reQ' ? '#1D4ED8' : '#64748B',
                  boxShadow: chartTab === 'reQ' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Kurva Re vs Debit (Q)
              </button>
              <button
                type="button"
                onClick={() => setChartTab('log')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '0.375rem',
                  border: 'none',
                  background: chartTab === 'log' ? '#FFFFFF' : 'transparent',
                  color: chartTab === 'log' ? '#1D4ED8' : '#64748B',
                  boxShadow: chartTab === 'log' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Kurva Log(f) vs Log(Re)
              </button>
            </div>
          </div>

          <div className="calc-chart-recharts-wrap" style={{ marginTop: '0.5rem' }}>
            <ResponsiveContainer width="100%" height={360}>
              {chartTab === 'reQ' ? (
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="qLs"
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    domain={[0, 'auto']}
                    allowDataOverflow={true}
                  >
                    <Label
                      value="Debit Aliran Q (Liter/detik)"
                      offset={-15}
                      position="insideBottom"
                      fill="#334155"
                      fontWeight={700}
                      fontSize={11}
                    />
                  </XAxis>
                  <YAxis
                    dataKey="re"
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    domain={[0, 'auto']}
                    allowDataOverflow={true}
                    tickFormatter={(v) => !isNaN(Number(v)) ? Number(v).toFixed(0) : ''}
                  >
                    <Label
                      value="Bilangan Reynolds (Re)"
                      angle={-90}
                      position="insideLeft"
                      offset={0}
                      style={{ textAnchor: 'middle', fill: '#334155', fontWeight: 700, fontSize: 11 }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomReynoldsTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '0.75rem', fontWeight: 600 }} />

                  {/* Garis Batas Kritis Aliran Laminer (Re = 2000) */}
                  <ReferenceLine
                    y={2000}
                    stroke="#059669"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{ value: 'Batas Kritis Laminer (Re = 2000)', fill: '#047857', fontSize: 11, position: 'right' }}
                  />

                  {/* Garis Batas Kritis Aliran Turbulen (Re = 4000) */}
                  <ReferenceLine
                    y={4000}
                    stroke="#DC2626"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{ value: 'Batas Kritis Turbulen (Re = 4000)', fill: '#B91C1C', fontSize: 11, position: 'right' }}
                  />

                  {/* Garis Karakteristik Teoretis Re = (4Q)/(pi·D·nu) */}
                  <Line
                    type="linear"
                    dataKey="reTeori"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                    isAnimationActive={false}
                    name="Garis Karakteristik Teori Re = (4Q)/(π·D·ν)"
                  />

                  {/* Titik Hasil Pengujian Aktual */}
                  <Line
                    type="linear"
                    dataKey="re"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    dot={{ r: 6, fill: '#4F46E5', stroke: '#FFFFFF', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#3730A3', stroke: '#FFFFFF', strokeWidth: 2 }}
                    isAnimationActive={false}
                    name="Titik Data Pengujian Lab (Q, Re)"
                  />
                </LineChart>
              ) : (
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="logRe"
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    domain={['auto', 'auto']}
                    allowDataOverflow={true}
                  >
                    <Label
                      value="Log(Bilangan Reynolds Re)"
                      offset={-15}
                      position="insideBottom"
                      fill="#334155"
                      fontWeight={700}
                      fontSize={11}
                    />
                  </XAxis>
                  <YAxis
                    dataKey="logF"
                    type="number"
                    stroke="#64748B"
                    fontSize={11}
                    fontWeight={600}
                    domain={['auto', 'auto']}
                    allowDataOverflow={true}
                    tickFormatter={(v) => !isNaN(Number(v)) ? Number(v).toFixed(2) : ''}
                  >
                    <Label
                      value="Log(Koefisien Gesekan f)"
                      angle={-90}
                      position="insideLeft"
                      offset={0}
                      style={{ textAnchor: 'middle', fill: '#334155', fontWeight: 700, fontSize: 11 }}
                    />
                  </YAxis>
                  <Tooltip content={<CustomReynoldsTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '0.75rem', fontWeight: 600 }} />

                  {/* Kurva Log f vs Log Re */}
                  <Line
                    type="monotone"
                    dataKey="logF"
                    stroke="#059669"
                    strokeWidth={2.5}
                    dot={{ r: 6, fill: '#059669', stroke: '#FFFFFF', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#047857', stroke: '#FFFFFF', strokeWidth: 2 }}
                    isAnimationActive={false}
                    name="Korelasi Log(f) vs Log(Re)"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel E: Kotak Rincian Langkah Rumus Perhitungan */}
        <div className="calc-formula-steps-box" style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={16} style={{ color: '#2563EB' }} />
            LANGKAH RUMUS PERHITUNGAN:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>
            {formulaSteps.map((step, idx) => (
              <div key={idx} style={{ padding: '0.35rem 0.5rem', background: '#F8FAFC', borderRadius: '0.375rem', borderLeft: '3px solid #3B82F6', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Panel F: Tombol Aksi Simpan & Navigasi */}
        <div className="calc-action-buttons-wrap" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-save-test"
            onClick={onSave}
            disabled={isInputInvalid || hasNegativeInput || hasExceededInput}
            style={{ flex: 1, padding: '0.75rem 1.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '0.5rem', background: '#059669', color: '#FFFFFF', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            <Save size={16} />
            <span>{savedNotification ? 'Tersimpan!' : 'Simpan Pengujian'}</span>
          </button>

          <button
            type="button"
            className="btn-back-footer"
            onClick={onBack}
            style={{ padding: '0.75rem 1.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '0.5rem', background: '#F1F5F9', color: '#334155', fontWeight: 600, border: '1px solid #CBD5E1', cursor: 'pointer' }}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Dashboard</span>
          </button>
        </div>

        {savedNotification && (
          <div style={{ padding: '0.75rem 1rem', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '0.5rem', color: '#065F46', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} />
            <span>Data pengujian Osborne Reynolds berhasil disimpan ke riwayat dashboard! (ID: {lastSavedId})</span>
          </div>
        )}
      </div>

      {/* 4. Footer Navigasi Bawah */}
      <div className="calc-footer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions">
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetRows}
            title="Kembalikan tabel ke susunan contoh awal standar laboratorium"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearRows}
            title="Kosongkan seluruh data pengujian untuk memasukkan data baru"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// KOMPONEN DEDIKASI: MODUL UJI DAKTILITAS BAHAN ASPAL (SNI 2432:2011)
// =========================================================================
function DynamicDuctilitySection({
  testConfig,
  inputs,
  calcOutput,
  currentDuctilitySamples,
  onSampleChange,
  onToggleSampleValid,
  onAddSample,
  onRemoveSample,
  onResetSamples,
  onClearSamples,
  onUnitChange,
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
  const currentUnit = inputs.satuanInput || 'cm'
  const isMm = currentUnit === 'mm'
  const kelas = inputs.kelasAspal || 'pen6070'
  const minDaktilitas = kelas === 'modifikasi' ? 50 : 100

  const dRataVal = calcOutput.dRata !== undefined && !isNaN(calcOutput.dRata) ? calcOutput.dRata.toFixed(1) : '-'
  const nValid = calcOutput.nValid || 0
  const totalCount = currentDuctilitySamples.length
  const nEliminasi = totalCount - nValid
  const formulaSteps = calcOutput.formulaSteps || []

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
      <div className="calc-header-section" style={{ marginBottom: '1.25rem' }}>
        <div className="calc-header-category">{testConfig.category}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
          <h2 className="calc-header-title">{testConfig.name}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="calc-badge-code">{testConfig.code}</span>
            <span className="calc-badge-standard">{testConfig.standard}</span>
          </div>
        </div>
        <p className="calc-header-desc" style={{ marginTop: '0.5rem', color: '#64748B', fontSize: '0.875rem' }}>
          {testConfig.desc}
        </p>
      </div>

      {/* 2. Parameter Kontrol (Kelas Aspal & Toggle Satuan Pembacaan) */}
      <div className="ductility-params-card">
        <div className="ductility-params-grid">
          {/* Kelas Spesifikasi Aspal */}
          <div className="ductility-param-col">
            <label className="ductility-param-label">Kelas Spesifikasi Aspal:</label>
            <select
              className="ductility-select-input"
              value={kelas}
              onChange={(e) => onInputChange('kelasAspal', e.target.value)}
            >
              <option value="pen6070">Aspal Pen 60/70 & Pen 40/50 (Syarat Min ≥ 100 cm)</option>
              <option value="modifikasi">Aspal Modifikasi / PG 70 (Syarat Min ≥ 50 cm)</option>
            </select>
            <span className="ductility-param-desc">
              Standar Spesifikasi Umum Bina Marga 2018 (Divisi 6 Campuran Beraspal).
            </span>
          </div>

          {/* Pilihan Satuan Pembacaan Alat (cm atau mm) */}
          <div className="ductility-param-col">
            <label className="ductility-param-label">Satuan Pembacaan Skala Alat:</label>
            <div className="ductility-unit-pill-group">
              <button
                type="button"
                className={`ductility-unit-btn ${!isMm ? 'active' : ''}`}
                onClick={() => onUnitChange('cm')}
                title="Input pembacaan dalam satuan sentimeter (cm)"
              >
                <strong>cm</strong> (Sentimeter)
              </button>
              <button
                type="button"
                className={`ductility-unit-btn ${isMm ? 'active' : ''}`}
                onClick={() => onUnitChange('mm')}
                title="Input pembacaan dalam satuan milimeter (mm)"
              >
                <strong>mm</strong> (Milimeter)
              </button>
            </div>
            <span className="ductility-param-desc">
              {isMm
                ? 'Nilai mm otomatis dikonversi ke cm (dibagi 10) pada perhitungan SNI.'
                : 'Nilai diinput langsung dalam satuan baku SNI 2432:2011 (cm).'}
            </span>
          </div>

          {/* Ambang Batas Acuan */}
          <div className="ductility-param-col ductility-param-summary">
            <span className="ductility-param-label">Target Batas SNI:</span>
            <div className="ductility-target-badge">
              <span className="target-num">≥ {minDaktilitas}</span>
              <span className="target-unit">cm</span>
            </div>
            <span className="ductility-param-desc">
              Suhu uji konstan 25°C, kecepatan penarikan 5 cm/menit (±5%).
            </span>
          </div>
        </div>
      </div>

      {/* 3. Empat Kartu Ringkasan Bento Hasil Utama */}
      <div className="penetration-summary-grid" style={{ marginTop: '1.25rem' }}>
        {/* Kartu 1: Daktilitas Rata-rata */}
        <div className={`penetration-metric-card ${calcOutput.isRataLolos ? 'card-blue' : 'card-rose'}`}>
          <div className="penetration-card-head">
            <span className="penetration-card-title">Daktilitas Rata-rata (D_rata)</span>
            <span className="penetration-card-badge">{nValid} Cetakan Valid</span>
          </div>
          <div className="penetration-card-value">
            {dRataVal}
            <span className="penetration-card-unit">cm</span>
          </div>
          <div className="penetration-card-sub">
            Syarat SNI: ≥ {minDaktilitas} cm ({calcOutput.isRataLolos ? 'Lolos' : 'Gagal'})
          </div>
        </div>

        {/* Kartu 2: Rentang Regangan Min - Maks */}
        <div className="penetration-metric-card card-purple">
          <div className="penetration-card-head">
            <span className="penetration-card-title">Rentang Regangan</span>
            <span className="penetration-card-badge">Min s/d Maks</span>
          </div>
          <div className="penetration-card-value" style={{ fontSize: '1.25rem' }}>
            {calcOutput.results?.[1]?.value || '-'}
            <span className="penetration-card-unit">cm</span>
          </div>
          <div className="penetration-card-sub">
            Selisih Maks - Min: {nValid > 1 && calcOutput.dMaks !== undefined ? (calcOutput.dMaks - calcOutput.dMin).toFixed(1) : '0.0'} cm
          </div>
        </div>

        {/* Kartu 3: Simpangan Baku & Variasi */}
        <div className="penetration-metric-card card-amber">
          <div className="penetration-card-head">
            <span className="penetration-card-title">Simpangan Baku (SD) & CV</span>
            <span className="penetration-card-badge">Keseragaman</span>
          </div>
          <div className="penetration-card-value" style={{ fontSize: '1.15rem' }}>
            {calcOutput.results?.[2]?.value || '-'}
          </div>
          <div className="penetration-card-sub">
            {nValid >= 2 ? (calcOutput.isSeragam ? 'Variasi Seragam (CV ≤ 15%)' : 'Variasi Cukup Besar (CV > 15%)') : 'Sampel valid tunggal'}
          </div>
        </div>

        {/* Kartu 4: Status Kelayakan Kohesivitas */}
        <div className={`penetration-metric-card ${calcOutput.verdictClass === 'valid' ? 'card-emerald' : calcOutput.verdictClass === 'warning' ? 'card-amber' : 'card-rose'}`}>
          <div className="penetration-card-head">
            <span className="penetration-card-title">Status Spesifikasi</span>
            <span className="penetration-card-badge">SNI 2432:2011</span>
          </div>
          <div className="penetration-card-value" style={{ fontSize: '1.1rem' }}>
            {calcOutput.status || '-'}
          </div>
          <div className="penetration-card-sub">
            {calcOutput.isRataLolos ? 'Kohesi aspal baik & elastis' : 'Aspal getas & rawan retak'}
          </div>
        </div>
      </div>

      {/* 4. Tabel Daftar Cetakan / Benda Uji Daktilitas Dinamis */}
      <div className="ductility-table-card">
        <div className="ductility-table-head">
          <div>
            <h3 className="ductility-table-title">Daftar Pembacaan Regangan Cetakan Benda Uji</h3>
            <span className="ductility-table-subtitle">
              Total {totalCount} cetakan ({nValid} diikutsertakan dalam rata-rata, {nEliminasi} dieliminasi/putus dini)
            </span>
          </div>
          <button
            type="button"
            className="ductility-btn-add"
            onClick={onAddSample}
            title="Tambah baris cetakan benda uji baru"
          >
            <Plus size={16} />
            <span>Tambah Sampel / Cetakan</span>
          </button>
        </div>

        <div className="ductility-table-scroll">
          <table className="ductility-table">
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>No.</th>
                <th>Nama / Benda Uji</th>
                <th style={{ minWidth: '180px' }}>Pembacaan Alat ({currentUnit})</th>
                <th style={{ minWidth: '130px', textAlign: 'center' }}>Konversi ke cm</th>
                <th style={{ minWidth: '160px', textAlign: 'center' }}>Evaluasi Alat</th>
                <th style={{ minWidth: '220px', textAlign: 'center' }}>Status dalam Perhitungan</th>
                <th style={{ width: '70px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentDuctilitySamples.map((sample, idx) => {
                const rawNum = sample.value !== undefined && sample.value !== null && sample.value !== '' ? Number(sample.value) : NaN
                const valCm = !isNaN(rawNum) ? (isMm ? rawNum / 10 : rawNum) : NaN
                const isLolos = !isNaN(valCm) && valCm >= minDaktilitas
                const isIncluded = sample.isValid !== undefined ? Boolean(sample.isValid) : true

                return (
                  <tr key={sample.id || idx} className={!isIncluded ? 'row-eliminated' : ''}>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#64748B' }}>
                      {idx + 1}
                    </td>
                    <td>
                      <span className="ductility-sample-name">{sample.name || `Cetakan ${idx + 1}`}</span>
                    </td>
                    <td>
                      <div className="ductility-input-wrapper">
                        <input
                          type="number"
                          step={isMm ? 1 : 0.5}
                          min={0.01}
                          className="ductility-numeric-input"
                          value={sample.value !== undefined ? sample.value : ''}
                          onChange={(e) => onSampleChange(sample.id, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, `sample-${sample.id}`)}
                          placeholder={isMm ? 'Misal: 1500' : 'Misal: 150.0'}
                        />
                        <span className="ductility-input-unit">{currentUnit}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {!isNaN(valCm) ? (
                        <span className="ductility-cm-val">
                          {valCm.toFixed(1)} <small style={{ color: '#64748B' }}>cm</small>
                        </span>
                      ) : (
                        <span style={{ color: '#94A3B8' }}>-</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {!isNaN(valCm) ? (
                        isLolos ? (
                          <span className="ductility-badge-eval lolos">
                            ✓ Memenuhi (≥ {minDaktilitas} cm)
                          </span>
                        ) : (
                          <span className="ductility-badge-eval gagal">
                            ✕ Kurang (&lt; {minDaktilitas} cm)
                          </span>
                        )
                      ) : (
                        <span style={{ color: '#94A3B8' }}>-</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className={`ductility-toggle-btn ${isIncluded ? 'active' : 'inactive'}`}
                        onClick={() => onToggleSampleValid(sample.id)}
                        title={isIncluded ? 'Klik untuk eliminasi sampel ini dari rata-rata (misal jika putus dini)' : 'Klik untuk mengikutkan kembali sampel ini ke rata-rata'}
                      >
                        {isIncluded ? (
                          <>
                            <span className="toggle-dot active" />
                            <span>Ikut Rata-rata (Valid)</span>
                          </>
                        ) : (
                          <>
                            <span className="toggle-dot inactive" />
                            <span>Dieliminasi (Putus Dini)</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="ductility-btn-del"
                        onClick={() => onRemoveSample(sample.id)}
                        disabled={currentDuctilitySamples.length <= 1}
                        title={currentDuctilitySamples.length <= 1 ? 'Minimal harus ada 1 sampel' : 'Hapus cetakan ini'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Kotak Tahapan Rumus */}
      {formulaSteps && formulaSteps.length > 0 && (
        <div className="calc-formula-box" style={{ marginTop: '1.25rem' }}>
          <span className="calc-formula-kicker">LANGKAH RUMUS PERHITUNGAN:</span>
          <ul className="calc-formula-steps-list">
            {formulaSteps.map((step, sIdx) => (
              <li key={sIdx} style={{ whiteSpace: 'pre-line' }}>{formatScientificInText(step)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Kotak Kesimpulan Standar SNI */}
      <div className={`calc-verdict-box ${getVerdictClass()}`} style={{ marginTop: '1.25rem' }}>
        <div className="calc-verdict-head">
          <div className="calc-verdict-title-row">
            <span className="calc-verdict-pill">
              HASIL EVALUASI DAKTILITAS (SNI 2432:2011)
            </span>
            <strong className="calc-verdict-status-badge">
              {getVerdictLabel()}
            </strong>
          </div>
          <p className="calc-verdict-lead">
            {calcOutput.conclusion}
          </p>
        </div>

        <div className="calc-verdict-actions-row">
          <button
            type="button"
            className="btn-verdict-save"
            onClick={onSave}
            disabled={isInputInvalid || hasNegativeInput || hasExceededInput}
            title={
              isInputInvalid || hasNegativeInput || hasExceededInput
                ? 'Perbaiki nilai parameter agar bernilai valid sebelum menyimpan'
                : 'Simpan hasil pengujian daktilitas ke riwayat dashboard'
            }
          >
            <Save size={16} />
            <span>Simpan Data Pengujian</span>
          </button>
        </div>

        {savedNotification && (
          <div style={{ padding: '0.75rem 1rem', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '0.5rem', color: '#065F46', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
            <CheckCircle2 size={16} />
            <span>Data pengujian daktilitas aspal berhasil disimpan ke riwayat dashboard! (ID: {lastSavedId})</span>
          </div>
        )}
      </div>

      {/* 7. Footer Navigasi Bawah */}
      <div className="calc-footer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions">
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetSamples}
            title="Kembalikan data ke 3 sampel default laboratorium"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearSamples}
            title="Kosongkan seluruh nilai pembacaan cetakan"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onBack}
          >
            <ArrowLeft size={15} style={{ marginRight: '6px' }} />
            <span>Ke Dashboard Utama</span>
          </button>
        </div>
      </div>
    </div>
  )
}


// =========================================================================
// KOMPONEN DEDIKASI: MODUL UJI VISKOSITAS SAYBOLT FUROL & SUHU KERJA (SNI 7729:2011)
// =========================================================================
function DynamicViscositySection({
  testConfig,
  inputs,
  calcOutput,
  currentViscosityPoints,
  onPointChange,
  onAddPoint,
  onRemovePoint,
  onResetPoints,
  onClearPoints,
  onTargetPresetChange,
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
  const metode = inputs.metodeKonversi || 'astm'
  const standar = inputs.standarTarget || 'binamarga'

  const vMixMin = calcOutput.vMixMin !== undefined ? calcOutput.vMixMin : (inputs.vMixMin || 150)
  const vMixMax = calcOutput.vMixMax !== undefined ? calcOutput.vMixMax : (inputs.vMixMax || 190)
  const vCompMin = calcOutput.vCompMin !== undefined ? calcOutput.vCompMin : (inputs.vCompMin || 250)
  const vCompMax = calcOutput.vCompMax !== undefined ? calcOutput.vCompMax : (inputs.vCompMax || 310)

  const tMixMin = calcOutput.tMixMin !== undefined && !isNaN(calcOutput.tMixMin) ? calcOutput.tMixMin.toFixed(1) : '-'
  const tMixMax = calcOutput.tMixMax !== undefined && !isNaN(calcOutput.tMixMax) ? calcOutput.tMixMax.toFixed(1) : '-'
  const tMixAvg = calcOutput.tMixAvg !== undefined && !isNaN(calcOutput.tMixAvg) ? calcOutput.tMixAvg.toFixed(1) : '-'

  const tCompMin = calcOutput.tCompMin !== undefined && !isNaN(calcOutput.tCompMin) ? calcOutput.tCompMin.toFixed(1) : '-'
  const tCompMax = calcOutput.tCompMax !== undefined && !isNaN(calcOutput.tCompMax) ? calcOutput.tCompMax.toFixed(1) : '-'
  const tCompAvg = calcOutput.tCompAvg !== undefined && !isNaN(calcOutput.tCompAvg) ? calcOutput.tCompAvg.toFixed(1) : '-'

  const v135 = calcOutput.v135 !== undefined && !isNaN(calcOutput.v135) ? calcOutput.v135.toFixed(1) : '-'
  const r2 = calcOutput.r2 !== undefined && !isNaN(calcOutput.r2) ? calcOutput.r2.toFixed(4) : '-'
  const regresiStr = calcOutput.viscosityChart?.regresiStr || (calcOutput.a !== undefined && calcOutput.b !== undefined ? `log₁₀(v) = ${calcOutput.a.toFixed(4)} ${calcOutput.b >= 0 ? '+' : '-'} ${Math.abs(calcOutput.b).toFixed(5)}·T` : '-')
  
  const isV135Lolos = calcOutput.v135 !== undefined && calcOutput.v135 >= 300.0
  const formulaSteps = calcOutput.formulaSteps || []

  // Konversi helper untuk baris tabel preview
  const convertToCstPreview = (tVal) => {
    if (!tVal || isNaN(Number(tVal)) || Number(tVal) <= 0) return '-'
    const num = Number(tVal)
    if (metode === 'modul') return (2.0 * num).toFixed(1)
    if (metode === 'pendekatan') return (2.16 * num).toFixed(1)
    if (num > 40) return (2.16 * num - 60 / num).toFixed(1)
    if (num > 25) return (2.24 * num - 184 / num).toFixed(1)
    return (2.16 * num).toFixed(1)
  }

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
      <div className="calc-header-section" style={{ marginBottom: '1.25rem' }}>
        <div className="calc-header-category">{testConfig.category}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem' }}>
          <h2 className="calc-header-title">{testConfig.name}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="calc-badge-code">{testConfig.code}</span>
            <span className="calc-badge-std">{testConfig.standard}</span>
            {calcOutput.status && (
              <span className={`calc-badge-status ${getVerdictClass(calcOutput.status)}`}>
                {getVerdictLabel(calcOutput.status)}
              </span>
            )}
          </div>
        </div>
        <p className="calc-header-desc" style={{ marginTop: '0.5rem' }}>
          {testConfig.desc}
        </p>
      </div>

      {/* 2. Pengaturan Parameter Target Viskositas & Metode Konversi */}
      <div className="calc-card-box" style={{ marginBottom: '1.25rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
              Pengaturan Target Rentang Viskositas & Rumus Konversi
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Konfigurasi acuan standar spesifikasi pencampuran/pemadatan serta formula konversi Saybolt Furol (SFS) ke cSt
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Kolom 1: Acuan Preset Target Suhu Kerja */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
              Standar Acuan Target Viskositas:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`viscosity-preset-pill ${standar === 'binamarga' ? 'active' : ''}`}
                onClick={() => onTargetPresetChange('binamarga')}
              >
                <span>Bina Marga 2018</span>
                <small style={{ display: 'block', fontSize: '0.65rem', opacity: 0.85 }}>170±20 & 280±30 cSt</small>
              </button>
              <button
                type="button"
                className={`viscosity-preset-pill ${standar === 'lab' ? 'active' : ''}`}
                onClick={() => onTargetPresetChange('lab')}
              >
                <span>Standar Lab</span>
                <small style={{ display: 'block', fontSize: '0.65rem', opacity: 0.85 }}>170-230 & 250-350 cSt</small>
              </button>
              <button
                type="button"
                className={`viscosity-preset-pill ${standar === 'custom' ? 'active' : ''}`}
                onClick={() => onTargetPresetChange('custom')}
              >
                <span>Kustom Manual</span>
                <small style={{ display: 'block', fontSize: '0.65rem', opacity: 0.85 }}>Bebas Atur Rentang</small>
              </button>
            </div>

            {/* Input Nilai Target Viskositas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.25rem' }}>
              <div style={{ background: '#F8FAFC', padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369A1', display: 'block', marginBottom: '0.35rem' }}>
                  Target Mixing (cSt):
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <input
                    type="number"
                    className="calc-input-compact"
                    style={{ width: '65px', padding: '0.3rem', fontSize: '0.8rem', textAlign: 'center', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    value={inputs.vMixMin ?? 150}
                    onChange={(e) => {
                      onInputChange('standarTarget', 'custom')
                      onInputChange('vMixMin', e.target.value === '' ? '' : Number(e.target.value))
                    }}
                    placeholder="Min"
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>s/d</span>
                  <input
                    type="number"
                    className="calc-input-compact"
                    style={{ width: '65px', padding: '0.3rem', fontSize: '0.8rem', textAlign: 'center', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    value={inputs.vMixMax ?? 190}
                    onChange={(e) => {
                      onInputChange('standarTarget', 'custom')
                      onInputChange('vMixMax', e.target.value === '' ? '' : Number(e.target.value))
                    }}
                    placeholder="Max"
                  />
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '0.6rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B45309', display: 'block', marginBottom: '0.35rem' }}>
                  Target Pemadatan (cSt):
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <input
                    type="number"
                    className="calc-input-compact"
                    style={{ width: '65px', padding: '0.3rem', fontSize: '0.8rem', textAlign: 'center', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    value={inputs.vCompMin ?? 250}
                    onChange={(e) => {
                      onInputChange('standarTarget', 'custom')
                      onInputChange('vCompMin', e.target.value === '' ? '' : Number(e.target.value))
                    }}
                    placeholder="Min"
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>s/d</span>
                  <input
                    type="number"
                    className="calc-input-compact"
                    style={{ width: '65px', padding: '0.3rem', fontSize: '0.8rem', textAlign: 'center', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    value={inputs.vCompMax ?? 310}
                    onChange={(e) => {
                      onInputChange('standarTarget', 'custom')
                      onInputChange('vCompMax', e.target.value === '' ? '' : Number(e.target.value))
                    }}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom 2: Metode Konversi Saybolt Furol (SFS ke cSt) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
              Formula Konversi SFS ke Kinematik (cSt):
            </label>
            <select
              className="calc-input-select"
              value={metode}
              onChange={(e) => onInputChange('metodeKonversi', e.target.value)}
              style={{ padding: '0.55rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', fontSize: '0.82rem', background: '#FFFFFF', color: '#0F172A', fontWeight: 500 }}
            >
              <option value="astm">Rumus Eksak ASTM D2161 / SNI 7729:2011</option>
              <option value="modul">Faktor Konversi Praktis Modul Kampus (v = 2.0 × t)</option>
              <option value="pendekatan">Faktor Konversi Pendekatan Linier (v = 2.16 × t)</option>
            </select>
            <div style={{ background: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.72rem', color: '#64748B', lineHeight: '1.4' }}>
              {metode === 'astm' && (
                <span>
                  <strong>ASTM D2161 / SNI:</strong> Untuk <code style={{ color: '#1E40AF' }}>t &gt; 40 dtk</code>: <code style={{ color: '#059669' }}>v = 2.16·t - 60/t</code>; Untuk <code style={{ color: '#1E40AF' }}>25 &lt; t ≤ 40 dtk</code>: <code style={{ color: '#059669' }}>v = 2.24·t - 184/t</code>.
                </span>
              )}
              {metode === 'modul' && (
                <span>
                  <strong>Modul Praktikum:</strong> Digunakan rumus praktis konversi laboratorium kampus <code style={{ color: '#059669' }}>v = 2.0 × t</code>.
                </span>
              )}
              {metode === 'pendekatan' && (
                <span>
                  <strong>Pendekatan:</strong> Rumus pendekatan satu koefisien standar Saybolt Furol <code style={{ color: '#059669' }}>v = 2.16 × t</code>.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bento Summary Cards Hasil Perhitungan (4 Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* Card 1: Rentang Suhu Pencampuran */}
        <div className="viscosity-summary-bento-card" style={{ borderLeft: '4px solid #F59E0B' }}>
          <span className="bento-label" style={{ color: '#B45309' }}>Rentang Suhu Pencampuran (Mixing)</span>
          <div className="bento-value" style={{ color: '#D97706' }}>
            {tMixMin} - {tMixMax} <span style={{ fontSize: '1rem', fontWeight: 500 }}>°C</span>
          </div>
          <div className="bento-sub">
            Rata-rata: <strong>{tMixAvg} °C</strong> (Target: {vMixMin}-{vMixMax} cSt)
          </div>
        </div>

        {/* Card 2: Rentang Suhu Pemadatan */}
        <div className="viscosity-summary-bento-card" style={{ borderLeft: '4px solid #0284C7' }}>
          <span className="bento-label" style={{ color: '#0369A1' }}>Rentang Suhu Pemadatan (Compaction)</span>
          <div className="bento-value" style={{ color: '#0284C7' }}>
            {tCompMin} - {tCompMax} <span style={{ fontSize: '1rem', fontWeight: 500 }}>°C</span>
          </div>
          <div className="bento-sub">
            Rata-rata: <strong>{tCompAvg} °C</strong> (Target: {vCompMin}-{vCompMax} cSt)
          </div>
        </div>

        {/* Card 3: Viskositas pada 135°C */}
        <div className="viscosity-summary-bento-card" style={{ borderLeft: `4px solid ${isV135Lolos ? '#10B981' : '#EF4444'}` }}>
          <span className="bento-label" style={{ color: isV135Lolos ? '#047857' : '#B91C1C' }}>Viskositas Kinematik pada 135°C</span>
          <div className="bento-value" style={{ color: isV135Lolos ? '#059669' : '#DC2626' }}>
            {v135} <span style={{ fontSize: '1rem', fontWeight: 500 }}>cSt</span>
          </div>
          <div className="bento-sub" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Syarat Bina Marga: ≥ 300 cSt</span>
            <span className={`bento-pill ${isV135Lolos ? 'green' : 'red'}`}>
              {isV135Lolos ? 'Lolos' : 'Kurang'}
            </span>
          </div>
        </div>

        {/* Card 4: Persamaan Regresi & Akurasi R² */}
        <div className="viscosity-summary-bento-card" style={{ borderLeft: '4px solid #6366F1' }}>
          <span className="bento-label" style={{ color: '#4338CA' }}>Model Regresi Semi-Logaritmik</span>
          <div className="bento-value" style={{ color: '#4F46E5', fontSize: '1.05rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {regresiStr}
          </div>
          <div className="bento-sub">
            Koefisien Determinasi: <strong>R² = {r2}</strong>
          </div>
        </div>
      </div>

      {/* 4. Tabel Interaktif Titik Pengujian Laboratorium (Dinamis Multi-Suhu) */}
      <div className="calc-card-box" style={{ marginBottom: '1.25rem', overflow: 'hidden' }}>
        <div className="calc-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="calc-card-header-icon" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="calc-card-title" style={{ margin: 0 }}>Daftar Titik Pengujian Temperatur & Waktu Alir Saybolt Furol</h3>
              <span className="calc-card-subtitle">
                Total {currentViscosityPoints.length} titik variasi temperatur terdaftar (Bebas tambah atau kurangi titik)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-add-point"
              onClick={onAddPoint}
              title="Tambah variasi temperatur pengujian baru"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '0.45rem 0.85rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              <Plus size={15} />
              <span>Tambah Titik Uji</span>
            </button>

            <button
              type="button"
              className="btn-open-table-direct"
              onClick={onResetPoints}
              title="Kembalikan ke 4 titik acuan default"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
            >
              <RotateCcw size={14} style={{ marginRight: '4px' }} />
              <span>Reset 4 Titik</span>
            </button>

            <button
              type="button"
              className="btn-open-table-direct"
              onClick={onClearPoints}
              title="Kosongkan nilai waktu alir untuk input baru"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem', color: '#DC2626' }}
            >
              <Trash2 size={14} style={{ marginRight: '4px' }} />
              <span>Kosongkan</span>
            </button>
          </div>
        </div>

        {/* Tabel Data Titik */}
        <div style={{ overflowX: 'auto' }}>
          <table className="calc-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#475569', fontWeight: 600 }}>
                <th style={{ padding: '0.75rem 1rem', width: '50px', textAlign: 'center' }}>No.</th>
                <th style={{ padding: '0.75rem 1rem' }}>Suhu Pengujian T (°C)</th>
                <th style={{ padding: '0.75rem 1rem' }}>Waktu Alir 60 mL t (detik / SFS)</th>
                <th style={{ padding: '0.75rem 1rem' }}>Viskositas Kinematik v (cSt)</th>
                <th style={{ padding: '0.75rem 1rem' }}>log₁₀(v)</th>
                <th style={{ padding: '0.75rem 1rem', width: '80px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentViscosityPoints.map((pt, idx) => {
                const cstVal = convertToCstPreview(pt.time)
                const logVal = cstVal !== '-' && !isNaN(Number(cstVal)) ? Math.log10(Number(cstVal)).toFixed(4) : '-'
                return (
                  <tr key={pt.id || idx} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#64748B', padding: '0.65rem 1rem' }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', maxWidth: '170px' }}>
                        <input
                          type="number"
                          step="0.5"
                          min="0.1"
                          className="calc-input"
                          style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', width: '100%' }}
                          value={pt.temp ?? ''}
                          onChange={(e) => onPointChange(pt.id, 'temp', e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="cth: 120"
                        />
                        <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>°C</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', maxWidth: '190px' }}>
                        <input
                          type="number"
                          step="0.5"
                          min="0.1"
                          className="calc-input"
                          style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', width: '100%' }}
                          value={pt.time ?? ''}
                          onChange={(e) => onPointChange(pt.id, 'time', e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="cth: 340"
                        />
                        <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>detik</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span className="viscosity-cst-pill" style={{ display: 'inline-block', padding: '0.3rem 0.65rem', borderRadius: '6px', background: '#F1F5F9', color: '#0F172A', fontWeight: 700, fontSize: '0.82rem' }}>
                        {cstVal} cSt
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                        {logVal}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '0.65rem 1rem' }}>
                      <button
                        type="button"
                        className="ductility-btn-del"
                        onClick={() => onRemovePoint(pt.id)}
                        disabled={currentViscosityPoints.length <= 2}
                        title={currentViscosityPoints.length <= 2 ? 'Minimal 2 titik diperlukan untuk garis regresi' : 'Hapus titik uji ini'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Baris Bawah Info Tambah Titik */}
        <div style={{ padding: '0.75rem 1.25rem', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.78rem', color: '#64748B' }}>
          <span>
            <Info size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: '#3B82F6' }} />
            Regresi linear semi-logaritmik membutuhkan minimal 2 variasi temperatur pengujian yang berbeda.
          </span>
          <button
            type="button"
            onClick={onAddPoint}
            style={{ background: 'transparent', border: 'none', color: '#2563EB', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Plus size={14} />
            <span>Tambah Variasi Temperatur Lagi</span>
          </button>
        </div>
      </div>

      {/* 5. Visualisasi Kurva Recharts & Evaluasi Suhu Kerja */}
      {calcOutput.viscosityChart && !calcOutput.isError && (
        <ViscosityCurveChart data={calcOutput.viscosityChart} />
      )}

      {/* 6. Langkah Rumus Perhitungan & Evaluasi SNI */}
      <div className="calc-card-box" style={{ marginTop: '1.25rem' }}>
        <div className="calc-card-header">
          <div className="calc-card-header-icon">
            <Info size={18} />
          </div>
          <div>
            <h3 className="calc-card-title">Langkah Rumus Perhitungan & Evaluasi Spesifikasi Bina Marga</h3>
            <span className="calc-card-subtitle">
              Penjabaran matematis konversi waktu alir, regresi linier logaritma, dan penentuan suhu kerja
            </span>
          </div>
        </div>

        <div className="calc-formula-steps-box" style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '0.5rem', margin: '1rem 1.25rem' }}>
          {formulaSteps.map((step, idx) => (
            <div key={idx} className="calc-formula-step-line" style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#334155', padding: '0.25rem 0', whiteSpace: 'pre-wrap' }}>
              {step}
            </div>
          ))}
        </div>

        {/* Kotak Kesimpulan Evaluasi */}
        {calcOutput.conclusion && (
          <div style={{ padding: '0.75rem 1.25rem 1.25rem' }}>
            <div className={`calc-verdict-banner ${calcOutput.verdictClass || 'valid'}`} style={{ padding: '0.85rem 1.25rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ marginTop: '2px' }}>
                {calcOutput.verdictClass === 'valid' ? (
                  <CheckCircle2 size={18} style={{ color: '#059669' }} />
                ) : (
                  <AlertTriangle size={18} style={{ color: calcOutput.verdictClass === 'error' ? '#DC2626' : '#D97706' }} />
                )}
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  Kesimpulan Status Pengujian: {calcOutput.status}
                </strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  {calcOutput.conclusion}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. Footer Navigasi Bawah */}
      <div className="calc-footer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetPoints}
            title="Kembalikan data ke 4 titik default pengujian"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearPoints}
            title="Kosongkan seluruh nilai waktu alir"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-verdict-save"
            onClick={onSave}
            disabled={isInputInvalid || hasNegativeInput || hasExceededInput}
            title={
              isInputInvalid || hasNegativeInput || hasExceededInput
                ? 'Perbaiki nilai parameter agar bernilai valid sebelum menyimpan'
                : 'Simpan hasil pengujian viskositas ke riwayat dashboard'
            }
          >
            <Save size={16} />
            <span>{savedNotification ? 'Tersimpan!' : 'Simpan Pengujian'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// SECTION DINAMIS: UJI TITIK NYALA & TITIK BAKAR CLEVELAND OPEN CUP (BP-5-1)
// =========================================================================
// Tooltip Kustom untuk Grafik Kurva Aliran Casagrande
function CustomFlowCurveTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div
        style={{
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '0.65rem 0.85rem',
          borderRadius: '0.5rem',
          fontSize: '0.78rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          border: '1px solid #334155',
          minWidth: '180px',
        }}
      >
        <p style={{ margin: '0 0 4px 0', fontWeight: 700, color: '#38BDF8' }}>
          Ketukan N = {data.n} {data.name ? `(${data.name})` : ''}
        </p>
        {data.actualW !== null && data.actualW !== undefined && (
          <p style={{ margin: '2px 0', color: '#F87171' }}>
            Kadar Air Aktual: <strong>{data.actualW}%</strong>
          </p>
        )}
        <p style={{ margin: '2px 0', color: '#93C5FD' }}>
          Garis Regresi (Trend): <strong>{data.trendW}%</strong>
        </p>
        {data.isStandard25 && (
          <p style={{ margin: '4px 0 0 0', color: '#FDE047', fontWeight: 600, borderTop: '1px solid #334155', paddingTop: '3px' }}>
            ★ Titik Batas Cair (LL): {data.trendW}%
          </p>
        )}
      </div>
    )
  }
  return null
}

// =========================================================================
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
            <span className={`calc-verdict-badge ${getVerdictClass(calcOutput.verdictClass)}`}>
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
              className={`calc-bento-card ${res.highlight ? 'highlight' : ''}`}
              style={{ borderLeft: `4px solid ${borderCol}` }}
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
                  <h3 className="calc-card-title">{testConfig.commonFieldsTitle || 'Parameter Acuan & Wadah Takaran'}</h3>
                  <span className="calc-card-subtitle">{testConfig.commonFieldsSubtitle || 'Konstanta dan kalibrasi bejana pengujian:'}</span>
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
                        <input
                          type="text"
                          className="calc-table-name-input"
                          value={sample.name || ''}
                          onChange={(e) => onSampleChange(sample.id, 'name', e.target.value)}
                          placeholder={`Sampel ${idx + 1}`}
                          style={{
                            width: '105px',
                            padding: '4px 6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            borderRadius: '4px',
                            border: '1px solid #CBD5E1',
                            textAlign: 'center',
                            background: '#EFF6FF',
                            color: '#1D4ED8',
                          }}
                        />
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
          {/* Visualisasi Grafik Kurva Aliran Casagrande (Flow Curve) jika modul memilikinya */}
          {testConfig.hasFlowCurveChart && calcOutput.chartData && !calcOutput.isError && (
            <div className="calc-card-box cpt-chart-card" style={{ marginBottom: '1.25rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <TrendingUp size={16} color="#2563EB" />
                    <span>Kurva Aliran Casagrande (Flow Curve Semi-Logaritmik)</span>
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Hubungan Jumlah Ketukan N (Sumbu X) vs Kadar Air w (Sumbu Y) • SNI 1967:2008
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', background: '#FEF2F2', color: '#DC2626', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                    Titik Acuan N = 25 (LL = {calcOutput.llValue ?? calcOutput.results?.[0]?.value}%)
                  </span>
                </div>
              </div>

              <div className="calc-chart-recharts-wrap" style={{ width: '100%', height: 320, marginTop: '0.5rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={calcOutput.chartData}
                    margin={{ top: 15, right: 25, left: 10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="n"
                      type="number"
                      domain={['dataMin - 2', 'dataMax + 2']}
                      label={{ value: 'Jumlah Ketukan Cawan (N) - Skala Casagrande', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#64748B' }}
                      tick={{ fontSize: 11, fill: '#475569' }}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      label={{ value: 'Kadar Air w (%)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: '#64748B' }}
                      tick={{ fontSize: 11, fill: '#475569' }}
                    />
                    <Tooltip content={<CustomFlowCurveTooltip />} />
                    <ReferenceLine
                      x={25}
                      stroke="#DC2626"
                      strokeDasharray="4 4"
                      label={{ value: 'N=25', position: 'top', fill: '#DC2626', fontSize: 11, fontWeight: 700 }}
                    />
                    {calcOutput.llValue && (
                      <ReferenceLine
                        y={calcOutput.llValue}
                        stroke="#DC2626"
                        strokeDasharray="4 4"
                        label={{ value: `LL=${calcOutput.llValue}%`, position: 'right', fill: '#DC2626', fontSize: 11, fontWeight: 700 }}
                      />
                    )}
                    <Line
                      type="monotone"
                      dataKey="trendW"
                      name="Garis Aliran (Flow Line)"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="actualW"
                      name="Titik Uji Aktual"
                      stroke="#DC2626"
                      strokeWidth={0}
                      dot={{ r: 5, fill: '#DC2626', stroke: '#FFFFFF', strokeWidth: 2 }}
                      connectNulls={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={{ marginTop: '0.65rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B', background: '#F8FAFC', padding: '6px 12px', borderRadius: '6px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: 12, height: 3, background: '#2563EB', display: 'inline-block' }} />
                    Garis Regresi Aliran: w = -If · log₁₀(N) + C
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#DC2626', display: 'inline-block' }} />
                    Titik Pengujian Riil
                  </span>
                </div>
                <div>
                  <strong>If = {calcOutput.flowIndex ?? '-'}</strong> | <strong>R² = {calcOutput.r2 ?? '-'}</strong>
                </div>
              </div>
            </div>
          )}

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
          <div className={`calc-verdict-box ${getVerdictClass(calcOutput.verdictClass)}`} style={{ marginBottom: '1.25rem' }}>
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


function DynamicFlashPointSection({
  testConfig,
  inputs,
  calcOutput,
  currentFlashSamples,
  onSampleChange,
  onAddSample,
  onRemoveSample,
  onResetSamples,
  onClearSamples,
  onUnitPressureChange,
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
  const pressureUnit = inputs.tekananKUnit || 'mmHg'
  const formulaSteps = calcOutput.formulaSteps || []
  const totalCount = currentFlashSamples.length

  const tNyalaResult = calcOutput.results?.[0]?.value || '-'
  const tNyalaSub = calcOutput.results?.[0]?.sub
  const tBakarResult = calcOutput.results?.[1]?.value || '-'
  const tBakarSub = calcOutput.results?.[1]?.sub
  const korBarResult = calcOutput.results?.[2]?.value || '-'
  const korBarUnit = calcOutput.results?.[2]?.unit || ''
  const selisihResult = calcOutput.results?.[3]?.value || '-'
  const selisihSub = calcOutput.results?.[3]?.sub

  const isZeroSamples = totalCount === 0

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
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
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>
              {testConfig.name}
            </h1>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#475569', maxWidth: '850px', lineHeight: 1.5 }}>
              {testConfig.desc}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={`calc-verdict-badge ${getVerdictClass(calcOutput.verdictClass)}`}>
              {getVerdictLabel(calcOutput.status)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grid 4 Kartu Bento Output Pengujian */}
      <div className="calc-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Kartu 1: Titik Nyala Terkoreksi */}
        <div className="calc-bento-card highlight" style={{ borderLeft: '4px solid #0284C7' }}>
          <div className="calc-bento-label">Titik Nyala Terkoreksi (T_nyala)</div>
          <div className="calc-bento-value" style={{ color: isZeroSamples ? '#DC2626' : '#0284C7', fontSize: isZeroSamples ? '1.2rem' : '1.35rem' }}>
            {tNyalaResult}
          </div>
          <div className="calc-bento-sub">
            {tNyalaSub || (isZeroSamples ? 'Tambahkan minimal 1 sampel pengujian' : 'Koreksi Barometrik SNI 2433:2011')}
          </div>
        </div>

        {/* Kartu 2: Titik Bakar Terkoreksi */}
        <div className="calc-bento-card" style={{ borderLeft: '4px solid #10B981' }}>
          <div className="calc-bento-label">Titik Bakar Terkoreksi (T_bakar)</div>
          <div className="calc-bento-value" style={{ color: isZeroSamples ? '#DC2626' : '#10B981', fontSize: isZeroSamples ? '1.2rem' : '1.35rem' }}>
            {tBakarResult}
          </div>
          <div className="calc-bento-sub">
            {tBakarSub || (isZeroSamples ? 'Tambahkan minimal 1 sampel pengujian' : 'Koreksi Barometrik SNI 2433:2011')}
          </div>
        </div>

        {/* Kartu 3: Koreksi Barometrik */}
        <div className="calc-bento-card" style={{ borderLeft: '4px solid #6366F1' }}>
          <div className="calc-bento-label">Koreksi Barometrik (ΔT_bar)</div>
          <div className="calc-bento-value" style={{ color: '#4F46E5', fontSize: '1.35rem' }}>
            {korBarResult}
          </div>
          <div className="calc-bento-sub">
            {korBarUnit || '0.25 × (101.3 - K)'}
          </div>
        </div>

        {/* Kartu 4: Selisih Bakar - Nyala */}
        <div className="calc-bento-card highlight" style={{ borderLeft: '4px solid #F59E0B' }}>
          <div className="calc-bento-label">Selisih Suhu (T_bakar - T_nyala)</div>
          <div className="calc-bento-value" style={{ color: '#D97706', fontSize: '1.35rem' }}>
            {selisihResult}
          </div>
          <div className="calc-bento-sub">
            {selisihSub || 'Toleransi kenaikan suhu minimum'}
          </div>
        </div>
      </div>

      {/* 3. Form Input Sampel Pengujian Dinamis */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Daftar Pengujian Sampel Titik Nyala & Titik Bakar</span>
              <span style={{ fontSize: '0.75rem', background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                {totalCount} Sampel
              </span>
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Input pembacaan suhu kilatan pertama (Titik Nyala) dan suhu nyala berkelanjutan ≥5 detik (Titik Bakar). Tekan "+ Tambah Sampel" untuk menambah baris.
            </p>
          </div>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onAddSample}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0284C7', color: '#fff', border: 'none', padding: '0.5rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            <span>Tambah Sampel</span>
          </button>
        </div>

        {/* Daftar Baris Sampel Dinamis */}
        {isZeroSamples ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1', color: '#64748B' }}>
            <AlertTriangle size={32} style={{ color: '#F59E0B', margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ margin: '0 0 0.25rem 0', color: '#334155', fontSize: '0.95rem' }}>Belum Ada Sampel Pengujian</h4>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem' }}>
              Minimal harus ada 1 baris sampel untuk menghitung rata-rata dan koreksi barometrik Cleveland Open Cup.
            </p>
            <button
              type="button"
              onClick={onAddSample}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#0284C7', color: '#fff', border: 'none', padding: '0.45rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
            >
              <Plus size={15} />
              <span>Tambah Sampel Pertama</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentFlashSamples.map((sample, idx) => {
              const isFlashInvalid = sample.flashPoint === '' || isNaN(Number(sample.flashPoint)) || Number(sample.flashPoint) < 0
              const isFireInvalid = sample.firePoint === '' || isNaN(Number(sample.firePoint)) || Number(sample.firePoint) < 0
              const isOrderWrong = !isFlashInvalid && !isFireInvalid && Number(sample.firePoint) <= Number(sample.flashPoint)

              return (
                <div
                  key={sample.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem 1rem',
                    background: '#F8FAFC',
                    borderRadius: '8px',
                    border: isOrderWrong ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Badge Label Sampel */}
                  <div style={{ minWidth: '95px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Sampel {idx + 1}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Benda Uji {idx + 1}</span>
                  </div>

                  {/* Input Titik Nyala */}
                  <div style={{ flex: '1 1 180px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Titik Nyala (°C) <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={sample.flashPoint}
                        placeholder="Contoh: 325"
                        onChange={(e) => onSampleChange(sample.id, 'flashPoint', e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                          width: '100%',
                          padding: '0.45rem 2rem 0.45rem 0.65rem',
                          fontSize: '0.9rem',
                          border: isFlashInvalid ? '1px solid #EF4444' : '1px solid #CBD5E1',
                          borderRadius: '6px',
                          background: '#FFFFFF',
                          boxSizing: 'border-box',
                        }}
                      />
                      <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: '#94A3B8', pointerEvents: 'none' }}>
                        °C
                      </span>
                    </div>
                  </div>

                  {/* Input Titik Bakar */}
                  <div style={{ flex: '1 1 180px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Titik Bakar (°C) <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={sample.firePoint}
                        placeholder="Contoh: 334"
                        onChange={(e) => onSampleChange(sample.id, 'firePoint', e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                          width: '100%',
                          padding: '0.45rem 2rem 0.45rem 0.65rem',
                          fontSize: '0.9rem',
                          border: isFireInvalid ? '1px solid #EF4444' : '1px solid #CBD5E1',
                          borderRadius: '6px',
                          background: '#FFFFFF',
                          boxSizing: 'border-box',
                        }}
                      />
                      <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: '#94A3B8', pointerEvents: 'none' }}>
                        °C
                      </span>
                    </div>
                  </div>

                  {/* Tombol Hapus Sampel */}
                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '18px' }}>
                    <button
                      type="button"
                      onClick={() => onRemoveSample(sample.id)}
                      title="Hapus baris sampel ini"
                      style={{
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Tombol Tambah Baris di Bawah List */}
        {!isZeroSamples && (
          <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'flex-start' }}>
            <button
              type="button"
              onClick={onAddSample}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#F1F5F9',
                color: '#0284C7',
                border: '1px dashed #93C5FD',
                padding: '0.45rem 0.9rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <Plus size={15} />
              <span>+ Tambah Sampel</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Form Parameter Lingkungan & Spesifikasi Bina Marga */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 0.85rem 0', fontSize: '1.05rem', fontWeight: 600, color: '#1E293B' }}>
          Parameter Tekanan Barometer & Syarat Spesifikasi
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Input Tekanan Barometer Udara dengan Unit Switcher */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
                Tekanan Barometer Udara Saat Pengujian (P / K)
              </label>
              <div style={{ display: 'flex', gap: '2px', background: '#F1F5F9', padding: '2px', borderRadius: '4px' }}>
                <button
                  type="button"
                  onClick={() => onUnitPressureChange('mmHg')}
                  style={{
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    borderRadius: '3px',
                    border: 'none',
                    background: pressureUnit === 'mmHg' ? '#0284C7' : 'transparent',
                    color: pressureUnit === 'mmHg' ? '#fff' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  mmHg
                </button>
                <button
                  type="button"
                  onClick={() => onUnitPressureChange('kPa')}
                  style={{
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    borderRadius: '3px',
                    border: 'none',
                    background: pressureUnit === 'kPa' ? '#0284C7' : 'transparent',
                    color: pressureUnit === 'kPa' ? '#fff' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  kPa
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={inputs.tekananK}
                onChange={(e) => onInputChange('tekananK', e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  width: '100%',
                  padding: '0.5rem 3.5rem 0.5rem 0.65rem',
                  fontSize: '0.9rem',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  boxSizing: 'border-box',
                }}
              />
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 600, color: '#64748B', pointerEvents: 'none' }}>
                {pressureUnit}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
              {pressureUnit === 'mmHg'
                ? 'Contoh laprak: 727 mmHg (96.93 kPa). Standar permukaan laut: 760 mmHg (101.3 kPa).'
                : 'Standar permukaan laut: 101.3 kPa. Contoh laprak: 96.93 kPa (727 mmHg).'}
            </span>
          </div>

          {/* Syarat Minimum Titik Nyala */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Syarat Minimum Titik Nyala Spesifikasi
            </label>
            <select
              value={inputs.syaratNyalaMin || 232}
              onChange={(e) => onInputChange('syaratNyalaMin', Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem 0.65rem',
                fontSize: '0.9rem',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                background: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            >
              <option value={232}>Aspal Pen 60/70 & Pen 40/50 (Min ≥ 232°C)</option>
            </select>
            <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
              Batas toleransi suhu minimum berdasarkan Spesifikasi Umum Bina Marga 2018 Divisi 6.
            </span>
          </div>
        </div>
      </div>

      {/* 5. Langkah Rumus Perhitungan & Evaluasi SNI */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={17} style={{ color: '#0284C7' }} />
          <span>Langkah Rumus Perhitungan (SNI 2433:2011 & Bina Marga 2018)</span>
        </h3>

        <div style={{ background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', padding: '1rem', fontSize: '0.85rem', color: '#334155', fontFamily: 'monospace', lineHeight: 1.6, overflowX: 'auto' }}>
          {formulaSteps.map((step, sIdx) => (
            <div key={sIdx} style={{ marginBottom: step.startsWith(' ') ? '0.15rem' : '0.5rem', fontWeight: step.match(/^[0-9]\./) ? 600 : 400, color: step.match(/^[0-9]\./) ? '#0F172A' : '#334155' }}>
              {step}
            </div>
          ))}
        </div>

        {/* Verdict Banner */}
        {calcOutput.conclusion && (
          <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', borderRadius: '6px', background: calcOutput.verdictClass === 'valid' ? '#F0FDF4' : calcOutput.verdictClass === 'error' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${calcOutput.verdictClass === 'valid' ? '#BBF7D0' : calcOutput.verdictClass === 'error' ? '#FECACA' : '#FDE68A'}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ marginTop: '2px' }}>
                {calcOutput.verdictClass === 'valid' ? (
                  <CheckCircle2 size={18} style={{ color: '#16A34A' }} />
                ) : (
                  <AlertTriangle size={18} style={{ color: calcOutput.verdictClass === 'error' ? '#DC2626' : '#D97706' }} />
                )}
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  Kesimpulan Status Pengujian: {calcOutput.status}
                </strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  {calcOutput.conclusion}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Footer Navigasi Bawah */}
      <div className="calc-footer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetSamples}
            title="Kembalikan data ke 3 sampel default laporan praktikum"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Contoh</span>
          </button>

          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onClearSamples}
            title="Kosongkan seluruh nilai suhu pembacaan sampel"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={15} style={{ marginRight: '6px' }} />
            <span>Kosongkan Input</span>
          </button>

          <button
            type="button"
            className="btn-verdict-save"
            onClick={onSave}
            disabled={isInputInvalid || hasNegativeInput || hasExceededInput || isZeroSamples}
            title={
              isZeroSamples
                ? 'Minimal harus ada 1 sampel terdaftar'
                : isInputInvalid || hasNegativeInput || hasExceededInput
                ? 'Perbaiki nilai parameter agar bernilai valid sebelum menyimpan'
                : 'Simpan hasil pengujian titik nyala dan titik bakar ke riwayat dashboard'
            }
          >
            <Save size={16} />
            <span>{savedNotification ? 'Tersimpan!' : 'Simpan Pengujian'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// SECTION DINAMIS: JOB MIX FORMULA (JMF) & MIX DESIGN LASTON AC-WC (BP-8-1)
// =========================================================================
function DynamicJmfMixSection({
  testConfig,
  inputs,
  calcOutput,
  currentJmfSieves,
  onSieveRetWeightChange,
  onResetToLaprak,
  jmfChartTab,
  setJmfChartTab,
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

  const wTotal = Number(inputs.wTotal ?? 1200)
  const pbRencana = Number(inputs.pbRencana ?? 6.5)
  const kConst = Number(inputs.k ?? 0.75)
  const wAspalRencana = calcOutput.wAspalRencana ?? Number(((pbRencana / 100) * wTotal).toFixed(1))
  const wAgregatRencana = calcOutput.wAgregatRencana ?? Number((wTotal - wAspalRencana).toFixed(1))

  const computedSieves = calcOutput.computedSieves || currentJmfSieves || []
  const sumRetWeight = computedSieves.reduce((acc, s) => acc + (Number(s.retWeight) || 0), 0)
  const weightDiff = Number((sumRetWeight - wAgregatRencana).toFixed(2))
  const isWeightMatch = Math.abs(weightDiff) < 0.1

  const ca = calcOutput.ca ?? 39.0
  const fa = calcOutput.fa ?? 54.5
  const filler = calcOutput.filler ?? 6.5
  const totalAgPct = Number((ca + fa + filler).toFixed(1))

  const kaaMurni = calcOutput.kaaMurni ?? 5.74
  const pb0 = calcOutput.pb0 ?? 6.0
  const passNo4 = calcOutput.passNo4 ?? 61.0
  const passNo200 = calcOutput.passNo200 ?? 6.5

  const mixDesignTable = calcOutput.mixDesignTable || []
  const gradasiChartData = calcOutput.gradasiChartData || []
  const jmfRows = calcOutput.jmfTable?.rows || []
  const formulaSteps = calcOutput.formulaSteps || []
  const allSpecOk = calcOutput.allSpecOk ?? true

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
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
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>
              {testConfig.name}
            </h1>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#475569', maxWidth: '850px', lineHeight: 1.5 }}>
              {testConfig.desc}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={`calc-verdict-badge ${getVerdictClass(calcOutput.verdictClass)}`}>
              {getVerdictLabel(calcOutput.status)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grid 4 Kartu Bento Output Utama Pengujian */}
      <div className="calc-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Kartu 1: KAA */}
        <div className="calc-bento-card highlight" style={{ borderLeft: '4px solid #0284C7' }}>
          <div className="calc-bento-label">Kadar Aspal Acuan (KAA)</div>
          <div className="calc-bento-value" style={{ color: '#0284C7', fontSize: '1.35rem' }}>
            {kaaMurni.toFixed(2)}%
          </div>
          <div className="calc-bento-sub">
            Pb₀ Acuan: <strong>{pb0.toFixed(1)}%</strong> | K = {kConst.toFixed(2)}
          </div>
        </div>

        {/* Kartu 2: Total Agregat Campuran */}
        <div className="calc-bento-card" style={{ borderLeft: '4px solid #10B981' }}>
          <div className="calc-bento-label">Total Agregat Campuran (W_ag)</div>
          <div className="calc-bento-value" style={{ color: '#10B981', fontSize: '1.35rem' }}>
            {wAgregatRencana.toFixed(1)} g
          </div>
          <div className="calc-bento-sub">
            Aspal: {wAspalRencana.toFixed(1)} g | Total Briket: {wTotal.toFixed(0)} g
          </div>
        </div>

        {/* Kartu 3: Kadar Aspal Rencana */}
        <div className="calc-bento-card" style={{ borderLeft: '4px solid #6366F1' }}>
          <div className="calc-bento-label">Kadar Aspal Briket (Pb)</div>
          <div className="calc-bento-value" style={{ color: '#4F46E5', fontSize: '1.35rem' }}>
            {pbRencana.toFixed(1)}%
          </div>
          <div className="calc-bento-sub">
            Variasi Laprak: Tabel 11.4 AC-WC
          </div>
        </div>

        {/* Kartu 4: Proporsi Fraksi Agregat */}
        <div className="calc-bento-card highlight" style={{ borderLeft: '4px solid #F59E0B' }}>
          <div className="calc-bento-label">Proporsi Fraksi (%CA / %FA / %FF)</div>
          <div className="calc-bento-value" style={{ color: '#D97706', fontSize: '1.15rem' }}>
            {ca.toFixed(1)}% / {fa.toFixed(1)}% / {filler.toFixed(1)}%
          </div>
          <div className="calc-bento-sub">
            Total Proporsi: <strong>{totalAgPct.toFixed(1)}%</strong> (Wajib 100%)
          </div>
        </div>
      </div>

      {/* Alert Error Berwarna Merah Jika User Memasukkan Angka Minus Secara Paksa */}
      {hasNegativeInput && (
        <div className="calc-negative-alert-box" style={{ marginBottom: '1.25rem' }}>
          <AlertTriangle size={20} color="#DC2626" />
          <div className="calc-negative-alert-content">
            <strong className="calc-negative-alert-title">Nilai input tidak boleh negatif</strong>
            <p className="calc-negative-alert-desc">
              Terdapat nilai negatif pada parameter atau saringan agregat JMF. Harap periksa kembali angka input Anda.
            </p>
          </div>
        </div>
      )}

      {/* Alert Peringatan Jika Total Berat Tertahan Tidak Sama dengan W_agregat */}
      {!isWeightMatch && (
        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          background: '#FEF3C7',
          border: '1px solid #F59E0B',
          color: '#92400E',
          fontSize: '0.85rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0 }} />
          <div>
            <strong>Peringatan Neraca Massa:</strong> Total berat tertahan saringan ({sumRetWeight.toFixed(2)} g) 
            {weightDiff > 0 ? ` lebih besar +${weightDiff.toFixed(2)} g ` : ` lebih kecil ${weightDiff.toFixed(2)} g `}
            dari Total Massa Agregat Rencana W_agregat ({wAgregatRencana.toFixed(1)} g). Disarankan sesuaikan berat tertahan agar totalnya tepat {wAgregatRencana.toFixed(1)} gram.
          </div>
        </div>
      )}

      {/* 3. Parameter Umum & Pengaturan Briket Marshall */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} color="#0284C7" />
              1. Parameter Umum & Pengaturan Awal Briket Marshall
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Bina Marga 2018 Divisi 6 - Campuran Aspal Panas Laston Lapis Aus (AC-WC)
            </p>
          </div>
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetToLaprak}
            title="Reset seluruh parameter & saringan ke default data laporan praktikum"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            <RotateCcw size={14} style={{ marginRight: '6px' }} />
            <span>Reset ke Default Laprak</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {/* Field: Jenis Campuran */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
              Jenis Campuran Aspal
            </label>
            <input
              type="text"
              readOnly
              value="Laston AC-WC (Bina Marga 2018)"
              className="calc-input-field"
              style={{ background: '#F8FAFC', color: '#334155', cursor: 'not-allowed', fontWeight: 600 }}
            />
          </div>

          {/* Field: Total Berat Briket (W_total) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
              Total Berat Briket (W_total) <span style={{ color: '#0284C7' }}>[gram]</span>
            </label>
            <input
              type="number"
              min="100"
              step="1"
              value={inputs.wTotal ?? 1200}
              onChange={(e) => onInputChange('wTotal', e.target.value)}
              onKeyDown={handleKeyDown}
              className="calc-input-field"
              placeholder="1200"
            />
          </div>

          {/* Field: Kadar Aspal Rencana (Pb_rencana) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
              Kadar Aspal Rencana (Pb) <span style={{ color: '#0284C7' }}>[%]</span>
            </label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={inputs.pbRencana ?? 6.5}
              onChange={(e) => onInputChange('pbRencana', e.target.value)}
              onKeyDown={handleKeyDown}
              className="calc-input-field"
              placeholder="6.5"
            />
          </div>

          {/* Field: Konstanta K Laston */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
              Konstanta Laston (K) <span style={{ color: '#64748B' }}>[0.5 - 1.0]</span>
            </label>
            <input
              type="number"
              min="0.5"
              max="1.0"
              step="0.01"
              value={inputs.k ?? 0.75}
              onChange={(e) => onInputChange('k', e.target.value)}
              onKeyDown={handleKeyDown}
              className="calc-input-field"
              placeholder="0.75"
            />
          </div>
        </div>

        {/* Live Calculation Pill Box */}
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          background: '#F1F5F9',
          borderRadius: '6px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem',
          alignItems: 'center',
          fontSize: '0.82rem',
          color: '#334155',
        }}>
          <div>
            <span style={{ color: '#64748B' }}>Berat Aspal Rencana (W_aspal):</span>{' '}
            <strong style={{ color: '#0284C7' }}>{wAspalRencana.toFixed(1)} gram</strong>
          </div>
          <div>
            <span style={{ color: '#64748B' }}>Total Massa Agregat (W_agregat):</span>{' '}
            <strong style={{ color: '#10B981' }}>{wAgregatRencana.toFixed(1)} gram</strong>
          </div>
          <div>
            <span style={{ color: '#64748B' }}>Persen Aspal thd Campuran:</span>{' '}
            <strong>{pbRencana.toFixed(1)}%</strong>
          </div>
          <div>
            <span style={{ color: '#64748B' }}>Status Neraca:</span>{' '}
            {isWeightMatch ? (
              <span style={{ color: '#059669', fontWeight: 600 }}>✓ Seimbang (100% Massa)</span>
            ) : (
              <span style={{ color: '#D97706', fontWeight: 600 }}>⚠ Belum Seimbang ({sumRetWeight.toFixed(1)}g / {wAgregatRencana.toFixed(1)}g)</span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Tabel Input & Analisis Gradasi Rencana (Tabel 11.1, 11.2, & 11.3) */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}>
              2. Tabel Input & Analisis Gradasi Rencana (Tabel 11.1, 11.2, & 11.3)
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Ketik berat tertahan tiap saringan. Kumulatif tertahan, lolos, dan batas amplop Bina Marga 2018 dihitung otomatis.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontWeight: 600,
              background: allSpecOk ? '#DEF7EC' : '#FDE8E8',
              color: allSpecOk ? '#03543F' : '#9B1C1C',
            }}>
              {allSpecOk ? 'Semua Saringan Masuk Amplop' : 'Ada Saringan di Luar Amplop'}
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, textAlign: 'left' }}>Saringan (ASTM & mm)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Zona Fraksi</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, minWidth: '130px', color: '#0284C7' }}>
                  Berat Tertahan (g)
                </th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Kum. Tertahan (g)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Kum. Tertahan (%)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, color: '#10B981' }}>Kum. Lolos (%)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Amplop Spek AC-WC</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {computedSieves.map((sieve, idx) => {
                const isPan = Boolean(sieve.isPan || sieve.isFiller || sieve.id === 12 || sieve.name === 'Pan')
                const isCA = Boolean(sieve.isCA || (sieve.id !== undefined && sieve.id <= 5))
                const isFA = Boolean(sieve.isFA || (sieve.id !== undefined && sieve.id >= 6 && sieve.id <= 11))

                let fractionBadgeBg = '#E0F2FE'
                let fractionBadgeColor = '#0369A1'
                let fractionLabel = 'CA (Kasar)'

                if (isFA) {
                  fractionBadgeBg = '#FEF3C7'
                  fractionBadgeColor = '#92400E'
                  fractionLabel = 'FA (Halus)'
                } else if (isPan) {
                  fractionBadgeBg = '#F3E8FF'
                  fractionBadgeColor = '#6B21A8'
                  fractionLabel = 'Filler (Abu)'
                }

                const isOutOfSpec = sieve.isOk === false

                return (
                  <tr
                    key={sieve.id}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                    }}
                  >
                    <td style={{ padding: '0.55rem 0.65rem', textAlign: 'left', fontWeight: 600, color: '#1E293B' }}>
                      {sieve.name} {sieve.size !== '-' ? `(${sieve.size})` : ''}
                      {sieve.isBoundaryCA && (
                        <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: '#DC2626', fontWeight: 'bold' }}>
                          *Batas CA
                        </span>
                      )}
                      {sieve.isBoundaryFA && (
                        <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: '#DC2626', fontWeight: 'bold' }}>
                          *Batas FA
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        fontWeight: 600,
                        background: fractionBadgeBg,
                        color: fractionBadgeColor,
                      }}>
                        {fractionLabel}
                      </span>
                    </td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={sieve.retWeight ?? ''}
                        onChange={(e) => onSieveRetWeightChange(sieve.id, e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="calc-input-field"
                        style={{
                          textAlign: 'center',
                          padding: '0.3rem 0.4rem',
                          fontSize: '0.82rem',
                          width: '100px',
                          border: Number(sieve.retWeight) < 0 ? '1px solid #DC2626' : '1px solid #CBD5E1',
                        }}
                      />
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem', fontWeight: 500, color: '#334155' }}>
                      {sieve.cumRetWeight !== undefined ? Number(sieve.cumRetWeight).toFixed(2) : '-'}
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem', color: '#475569' }}>
                      {sieve.cumRetPct !== undefined ? `${Number(sieve.cumRetPct).toFixed(2)}%` : '-'}
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem', fontWeight: 700, color: isOutOfSpec ? '#DC2626' : '#0284C7' }}>
                      {sieve.cumPassPct !== undefined ? `${Number(sieve.cumPassPct).toFixed(2)}%` : '-'}
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem', color: '#64748B', fontSize: '0.78rem' }}>
                      {sieve.specMin !== '-' && sieve.specMax !== '-'
                        ? `${sieve.specMin}% - ${sieve.specMax}%`
                        : '-'}
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem' }}>
                      {sieve.specMin === '-' ? (
                        <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>-</span>
                      ) : sieve.isOk ? (
                        <span style={{
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          background: '#DEF7EC',
                          color: '#03543F',
                          fontWeight: 600,
                        }}>
                          OK
                        </span>
                      ) : (
                        <span style={{
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          background: '#FDE8E8',
                          color: '#9B1C1C',
                          fontWeight: 600,
                        }}>
                          Keluar
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: '#F1F5F9', fontWeight: 'bold', borderTop: '2px solid #CBD5E1' }}>
                <td colSpan={2} style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: '#1E293B' }}>
                  Total Berat Tertahan Saringan
                </td>
                <td style={{ padding: '0.65rem 0.5rem', color: isWeightMatch ? '#059669' : '#D97706', fontSize: '0.85rem' }}>
                  {sumRetWeight.toFixed(2)} g
                </td>
                <td style={{ padding: '0.65rem 0.5rem', color: '#1E293B' }}>
                  {sumRetWeight.toFixed(2)} g
                </td>
                <td style={{ padding: '0.65rem 0.5rem', color: '#1E293B' }}>
                  100.00%
                </td>
                <td style={{ padding: '0.65rem 0.5rem', color: '#1E293B' }}>
                  0.00%
                </td>
                <td colSpan={2} style={{ padding: '0.65rem 0.5rem', textAlign: 'center', fontSize: '0.78rem' }}>
                  {isWeightMatch ? (
                    <span style={{ color: '#059669', fontWeight: 600 }}>✓ Sesuai Target W_agregat</span>
                  ) : (
                    <span style={{ color: '#D97706', fontWeight: 600 }}>
                      ⚠ Selisih {weightDiff > 0 ? `+${weightDiff.toFixed(2)}` : weightDiff.toFixed(2)} g
                    </span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 5. Box Analisis Fraksi Agregat: Metode Analitis vs Metode Grafik */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}>
            3. Analisis Fraksi Agregat Gabungan (Metode Analitis vs Metode Grafik)
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Batas fraksi: Agregat Kasar (CA) tertahan Saringan No. 4 (4.75 mm), Agregat Halus (FA) lolos No. 4 tertahan No. 200, Filler lolos No. 200 / Pan.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {/* Box Kiri: Metode Analitis */}
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #BAE6FD',
            background: '#F0F9FF',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ background: '#0284C7', color: '#fff', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.72rem', fontWeight: 'bold' }}>
                METODE A
              </span>
              <strong style={{ fontSize: '0.9rem', color: '#0369A1' }}>Metode Analitis (Berat Tertahan)</strong>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
              <div style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px dashed #BAE6FD' }}>
                <span style={{ color: '#0369A1', fontWeight: 600 }}>• Agregat Kasar (CA):</span> Tertahan No. 4 (4.75 mm)<br />
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  W_CA = 56.10 + 129.03 + 252.45 = <strong>437.58 g</strong>
                </span><br />
                <strong>%CA = (437.58 / {wAgregatRencana.toFixed(1)}) × 100% = {ca.toFixed(1)}%</strong>
              </div>

              <div style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px dashed #BAE6FD' }}>
                <span style={{ color: '#92400E', fontWeight: 600 }}>• Agregat Halus (FA):</span> Lolos No. 4 & Tertahan No. 200<br />
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  W_FA = 201.96 + 140.25 + 95.37 + 72.93 + 56.10 + 44.88 = <strong>611.49 g</strong>
                </span><br />
                <strong>%FA = (611.49 / {wAgregatRencana.toFixed(1)}) × 100% = {fa.toFixed(1)}%</strong>
              </div>

              <div>
                <span style={{ color: '#6B21A8', fontWeight: 600 }}>• Bahan Pengisi (Filler):</span> Lolos No. 200 (Pan)<br />
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  W_Filler = <strong>72.93 g</strong>
                </span><br />
                <strong>%Filler = (72.93 / {wAgregatRencana.toFixed(1)}) × 100% = {filler.toFixed(1)}%</strong>
              </div>
            </div>
          </div>

          {/* Box Kanan: Metode Grafik */}
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #BBF7D0',
            background: '#F0FDF4',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ background: '#16A34A', color: '#fff', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.72rem', fontWeight: 'bold' }}>
                METODE B
              </span>
              <strong style={{ fontSize: '0.9rem', color: '#15803D' }}>Metode Grafik (Gambar 11.19)</strong>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
              <div style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px dashed #BBF7D0' }}>
                <span style={{ color: '#15803D', fontWeight: 600 }}>• Pembacaan Kumulatif Lolos:</span><br />
                - %Lolos Saringan No. 4 = <strong>{passNo4.toFixed(1)}%</strong><br />
                - %Lolos Saringan No. 200 = <strong>{passNo200.toFixed(1)}%</strong>
              </div>

              <div style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px dashed #BBF7D0' }}>
                <span style={{ color: '#0369A1', fontWeight: 600 }}>• Fraksi Agregat Kasar (%CA):</span><br />
                %CA = 100% - %Lolos No. 4 = 100% - {passNo4.toFixed(1)}% = <strong>{(100 - passNo4).toFixed(1)}%</strong>
              </div>

              <div>
                <span style={{ color: '#92400E', fontWeight: 600 }}>• Fraksi Agregat Halus (%FA):</span><br />
                %FA = %Lolos No. 4 - %Lolos No. 200 = {passNo4.toFixed(1)}% - {passNo200.toFixed(1)}% = <strong>{(passNo4 - passNo200).toFixed(1)}%</strong><br />
                <span style={{ color: '#6B21A8', fontWeight: 600 }}>• Fraksi Filler (%FF):</span> %Lolos No. 200 = <strong>{passNo200.toFixed(1)}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Rumus KAA Callout */}
        <div style={{
          marginTop: '1rem',
          padding: '0.85rem 1rem',
          borderRadius: '6px',
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          color: '#92400E',
          fontSize: '0.85rem',
        }}>
          <strong>Perhitungan Kadar Aspal Acuan (KAA / Pb₀):</strong><br />
          <div style={{ marginTop: '0.35rem', fontFamily: 'monospace', fontSize: '0.88rem' }}>
            KAA = 0.035(%CA) + 0.045(%FA) + 0.18(%Filler) + K<br />
            KAA = (0.035 × {ca.toFixed(1)}) + (0.045 × {fa.toFixed(1)}) + (0.18 × {filler.toFixed(1)}) + {kConst.toFixed(2)}<br />
            KAA = {(0.035 * ca).toFixed(3)} + {(0.045 * fa).toFixed(3)} + {(0.18 * filler).toFixed(3)} + {kConst.toFixed(2)} = <strong>{kaaMurni.toFixed(4)}%</strong> ≈ <strong>{kaaMurni.toFixed(1)}%</strong> (Dibulatkan kelipatan 0.5%: <strong>Pb₀ = {pb0.toFixed(1)}%</strong>)
          </div>
        </div>
      </div>

      {/* 6. Visualisasi Grafik Interaktif */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="#0284C7" />
              4. Grafik Karakteristik Campuran & Amplop Gradasi
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Pilih tab di bawah untuk melihat metode grafik Gambar 11.19 atau kesesuaian amplop Bina Marga 2018.
            </p>
          </div>

          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: '0.35rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: '6px' }}>
            <button
              type="button"
              onClick={() => setJmfChartTab('gambar1119')}
              style={{
                border: 'none',
                background: jmfChartTab === 'gambar1119' ? '#FFFFFF' : 'transparent',
                color: jmfChartTab === 'gambar1119' ? '#0F172A' : '#64748B',
                fontWeight: jmfChartTab === 'gambar1119' ? 600 : 500,
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: jmfChartTab === 'gambar1119' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              Gambar 11.19: Metode Grafik Fraksi
            </button>
            <button
              type="button"
              onClick={() => setJmfChartTab('amplop')}
              style={{
                border: 'none',
                background: jmfChartTab === 'amplop' ? '#FFFFFF' : 'transparent',
                color: jmfChartTab === 'amplop' ? '#0F172A' : '#64748B',
                fontWeight: jmfChartTab === 'amplop' ? 600 : 500,
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: jmfChartTab === 'amplop' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              Amplop Spesifikasi AC-WC 2018
            </button>
          </div>
        </div>

        {/* Tab 1: Gambar 11.19 */}
        {jmfChartTab === 'gambar1119' && (
          <div>
            <div style={{ width: '100%', height: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gradasiChartData} margin={{ top: 25, right: 35, left: 15, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="sieve" tick={{ fontSize: 11, fill: '#475569' }}>
                    <Label value="Ukuran Saringan ASTM (1'' s.d. Pan)" offset={-15} position="insideBottom" style={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} />
                  </XAxis>
                  <YAxis domain={[0, 120]} ticks={[0, 20, 40, 60, 80, 100, 120]} tick={{ fontSize: 11, fill: '#475569' }}>
                    <Label value="Persen Kumulatif Lolos (%)" angle={-90} position="insideLeft" style={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} />
                  </YAxis>
                  <Tooltip
                    formatter={(val) => [`${Number(val).toFixed(1)}%`, '']}
                    labelFormatter={(label) => `Saringan: ${label}`}
                  />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />

                  {/* Garis Batas Vertikal Saringan No. 4 */}
                  <ReferenceLine
                    x="No. 4"
                    stroke="#0F172A"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    label={{ value: 'Batas No. 4 (4.75 mm)', position: 'insideTopLeft', fill: '#0F172A', fontSize: 11, fontWeight: 'bold' }}
                  />

                  {/* Garis Batas Vertikal Saringan No. 200 */}
                  <ReferenceLine
                    x="No. 200"
                    stroke="#0F172A"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    label={{ value: 'Batas No. 200 (0.075 mm)', position: 'insideTopLeft', fill: '#0F172A', fontSize: 11, fontWeight: 'bold' }}
                  />

                  {/* Garis Horizontal %Lolos Batas No. 4 */}
                  <ReferenceLine
                    y={passNo4}
                    stroke="#DC2626"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    label={{ value: `${passNo4.toFixed(1)}% (Batas CA / FA)`, position: 'insideBottomRight', fill: '#DC2626', fontSize: 11, fontWeight: 'bold' }}
                  />

                  {/* Garis Horizontal %Lolos Batas No. 200 */}
                  <ReferenceLine
                    y={passNo200}
                    stroke="#DC2626"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    label={{ value: `${passNo200.toFixed(1)}% (Batas Filler)`, position: 'insideBottomRight', fill: '#DC2626', fontSize: 11, fontWeight: 'bold' }}
                  />

                  <Line
                    type="monotone"
                    dataKey="cumPass"
                    name="% Lolos Kumulatif Benda Uji"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#2563EB' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Keterangan Gambar 11.19 */}
            <div style={{
              marginTop: '1rem',
              padding: '0.85rem 1rem',
              background: '#F8FAFC',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              fontSize: '0.82rem',
              color: '#334155',
            }}>
              <strong style={{ color: '#0F172A' }}>Panduan Interpretasi Grafik Gambar 11.19 (Laporan Praktikum):</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
                <div style={{ borderLeft: '3px solid #0284C7', paddingLeft: '0.5rem' }}>
                  <strong style={{ color: '#0284C7' }}>🟦 Daerah Atas (&gt; {passNo4.toFixed(1)}%):</strong><br />
                  100% - {passNo4.toFixed(1)}% = <strong>{(100 - passNo4).toFixed(1)}%</strong> adalah Fraksi Agregat Kasar (CA)
                </div>
                <div style={{ borderLeft: '3px solid #D97706', paddingLeft: '0.5rem' }}>
                  <strong style={{ color: '#D97706' }}>🟧 Daerah Tengah ({passNo200.toFixed(1)}% - {passNo4.toFixed(1)}%):</strong><br />
                  {passNo4.toFixed(1)}% - {passNo200.toFixed(1)}% = <strong>{(passNo4 - passNo200).toFixed(1)}%</strong> adalah Fraksi Agregat Halus (FA)
                </div>
                <div style={{ borderLeft: '3px solid #7C3AED', paddingLeft: '0.5rem' }}>
                  <strong style={{ color: '#7C3AED' }}>🟪 Daerah Bawah (&lt; {passNo200.toFixed(1)}%):</strong><br />
                  {passNo200.toFixed(1)}% = <strong>{passNo200.toFixed(1)}%</strong> adalah Fraksi Bahan Pengisi (Filler)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Amplop Spesifikasi AC-WC */}
        {jmfChartTab === 'amplop' && (
          <div>
            <div style={{ width: '100%', height: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gradasiChartData} margin={{ top: 25, right: 35, left: 15, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="sieve" tick={{ fontSize: 11, fill: '#475569' }}>
                    <Label value="Ukuran Saringan ASTM" offset={-15} position="insideBottom" style={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} />
                  </XAxis>
                  <YAxis domain={[0, 105]} ticks={[0, 20, 40, 60, 80, 100]} tick={{ fontSize: 11, fill: '#475569' }}>
                    <Label value="Persen Kumulatif Lolos (%)" angle={-90} position="insideLeft" style={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} />
                  </YAxis>
                  <Tooltip
                    formatter={(val) => [`${Number(val).toFixed(1)}%`, '']}
                    labelFormatter={(label) => `Saringan: ${label}`}
                  />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />

                  <Line
                    type="monotone"
                    dataKey="specMax"
                    name="Batas Atas Amplop AC-WC (Maks)"
                    stroke="#EF4444"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="cumPass"
                    name="Gradasi Rencana Benda Uji"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#2563EB' }}
                    activeDot={{ r: 6 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="specMin"
                    name="Batas Bawah Amplop AC-WC (Min)"
                    stroke="#DC2626"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{
              marginTop: '1rem',
              padding: '0.85rem 1rem',
              background: '#F8FAFC',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              fontSize: '0.82rem',
              color: '#334155',
            }}>
              <strong>Keterangan Amplop Gradasi Laston AC-WC (Bina Marga 2018):</strong>
              <p style={{ margin: '0.25rem 0 0 0', lineHeight: 1.5 }}>
                Kurva biru merepresentasikan persen lolos kumulatif dari gradasi campuran agregat rencana. Garis merah putus-putus batas atas dan batas bawah merupakan daerah toleransi amplop spesifikasi AC-WC.
                {allSpecOk ? (
                  <span style={{ color: '#059669', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>
                    ✓ Seluruh titik ayakan berada di dalam rentang batas spesifikasi teknis Bina Marga 2018.
                  </span>
                ) : (
                  <span style={{ color: '#DC2626', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>
                    ⚠ Terdapat titik ayakan yang keluar dari batas spesifikasi teknis.
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 7. Tabel 11.4: Hasil Analisis Perhitungan Mix Design (Untuk Pb = 6.5%) */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}>
            5. Tabel 11.4 Hasil Analisis Perhitungan Mix Design (Kadar Aspal Rencana {pbRencana.toFixed(1)}%)
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Proporsi berat fraksi dan persentase terhadap agregat serta terhadap total campuran briket seberat {wTotal.toFixed(0)} gram.
          </p>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.65rem 0.75rem', fontWeight: 600, textAlign: 'left' }}>Fraksi / Komponen Campuran</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, color: '#0284C7' }}>Berat Campuran (gram)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>% terhadap Agregat</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, color: '#10B981' }}>% terhadap Campuran</th>
                <th style={{ padding: '0.65rem 0.75rem', fontWeight: 600, textAlign: 'left' }}>Keterangan Saringan</th>
              </tr>
            </thead>
            <tbody>
              {mixDesignTable.map((row, idx) => {
                const label = row.fraksi || row.komposisi || ''
                const isTotal = String(label).includes('Total')
                const beratVal = Number(row.beratGram ?? row.berat ?? 0)
                const pctAgregatVal = row.pctAgregat ?? row.persenAgregat
                const pctCampuranVal = Number(row.pctCampuran ?? row.persenCampuran ?? 0)

                return (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: isTotal ? '#F1F5F9' : idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                      fontWeight: isTotal ? 'bold' : 'normal',
                    }}
                  >
                    <td style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: isTotal ? '#0F172A' : '#1E293B' }}>
                      {label}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: isTotal ? '#0F172A' : '#0284C7' }}>
                      {beratVal.toFixed(2)} g
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#475569' }}>
                      {pctAgregatVal !== undefined && pctAgregatVal !== '-' ? `${Number(pctAgregatVal).toFixed(1)}%` : '-'}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: isTotal ? '#0F172A' : '#10B981' }}>
                      {pctCampuranVal.toFixed(3)}%
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: '#64748B', fontSize: '0.78rem' }}>
                      {row.keterangan || '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. Tabel 5 Variasi Kadar Aspal Briket Marshall (Pd T-03-2005-B) */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}>
            6. Tabel Komposisi 5 Variasi Kadar Aspal Briket Marshall (Pd T-03-2005-B)
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            5 variasi kadar aspal dengan rentang interval 0.5% berpusat pada Kadar Aspal Acuan (KAA Pb₀ = {pb0.toFixed(1)}%), berat 1200 gram per briket.
          </p>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Benda Uji</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Variasi (ΔPb)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, color: '#0284C7' }}>Kadar Aspal (Pb%)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Berat Aspal (g)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Berat Agregat (g)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Berat CA (g)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Berat FA (g)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Berat Filler (g)</th>
                <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600, color: '#10B981' }}>Total Briket (g)</th>
              </tr>
            </thead>
            <tbody>
              {jmfRows.map((row, rIdx) => {
                const varNum = row.variasi ?? (rIdx + 1)
                const isAcuan = Boolean(row.isAcuan || row.deltaPb === 'Pb0' || varNum === 3)
                const deltaLabel = row.deltaPb || (isAcuan ? 'Pb0' : '')
                const pbVal = Number(row.pb ?? row.kadarAspal ?? 0)
                const wAspalVal = Number(row.wAspal ?? row.beratAspal ?? 0)
                const wAgregatVal = Number(row.wAgregat ?? row.beratAgTotal ?? 0)
                const wCaVal = Number(row.wCA ?? row.beratCa ?? 0)
                const wFaVal = Number(row.wFA ?? row.beratFa ?? 0)
                const wFillerVal = Number(row.wFiller ?? row.beratFiller ?? 0)
                const wTotalVal = Number(row.wTotal ?? wTotal ?? 1200)

                return (
                  <tr
                    key={row.variasi || rIdx}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: isAcuan ? '#F0F9FF' : rIdx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                    }}
                  >
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#1E293B' }}>
                      Variasi {varNum}
                      {isAcuan && (
                        <span style={{
                          display: 'block',
                          fontSize: '0.68rem',
                          color: '#0284C7',
                          fontWeight: 'bold',
                        }}>
                          (KAA Acuan)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#64748B' }}>
                      {deltaLabel}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 700, color: '#0284C7' }}>
                      {pbVal.toFixed(1)}%
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 500, color: '#334155' }}>
                      {wAspalVal.toFixed(1)}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 500, color: '#334155' }}>
                      {wAgregatVal.toFixed(1)}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#475569' }}>
                      {wCaVal.toFixed(1)}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#475569' }}>
                      {wFaVal.toFixed(1)}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#475569' }}>
                      {wFillerVal.toFixed(1)}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 700, color: '#10B981' }}>
                      {wTotalVal.toFixed(1)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. Langkah Rumus Perhitungan & Kesimpulan */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}>
            7. Langkah Rumus Perhitungan & Verifikasi SNI / Bina Marga
          </h3>
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={() => setShowFormulaSteps(!showFormulaSteps)}
            style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
          >
            {showFormulaSteps ? 'Sembunyikan Langkah' : 'Tampilkan Langkah'}
          </button>
        </div>

        {showFormulaSteps && (
          <div style={{
            background: '#F8FAFC',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '0.8rem',
            lineHeight: 1.6,
            color: '#334155',
            whiteSpace: 'pre-wrap',
            maxHeight: '360px',
            overflowY: 'auto',
          }}>
            {formulaSteps.join('\n')}
          </div>
        )}

        {/* Banner Kesimpulan */}
        <div style={{
          marginTop: '1rem',
          padding: '0.85rem 1rem',
          borderRadius: '6px',
          background: calcOutput.verdictClass === 'valid' ? '#DEF7EC' : calcOutput.verdictClass === 'warning' ? '#FEF3C7' : '#FDE8E8',
          border: `1px solid ${calcOutput.verdictClass === 'valid' ? '#31C48D' : calcOutput.verdictClass === 'warning' ? '#F59E0B' : '#F98080'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          {calcOutput.verdictClass === 'valid' ? (
            <CheckCircle2 size={20} color="#0E9F6E" style={{ flexShrink: 0 }} />
          ) : (
            <AlertTriangle size={20} color={calcOutput.verdictClass === 'warning' ? '#D97706' : '#E02424'} style={{ flexShrink: 0 }} />
          )}
          <div style={{ fontSize: '0.85rem', color: calcOutput.verdictClass === 'valid' ? '#03543F' : calcOutput.verdictClass === 'warning' ? '#92400E' : '#9B1C1C' }}>
            <strong>Kesimpulan & Status Evaluasi:</strong> {calcOutput.conclusion || 'Perhitungan selesai.'}
          </div>
        </div>
      </div>

      {/* 10. Footer Navigasi Bawah */}
      <div className="calc-footer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetToLaprak}
            title="Reset seluruh parameter & saringan ke default data laporan praktikum"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Data Laprak</span>
          </button>

          <button
            type="button"
            className="btn-verdict-save"
            onClick={onSave}
            disabled={isInputInvalid || hasNegativeInput || hasExceededInput}
            title={
              isInputInvalid || hasNegativeInput || hasExceededInput
                ? 'Perbaiki nilai parameter agar bernilai valid sebelum menyimpan'
                : 'Simpan hasil perhitungan mix design JMF ke riwayat dashboard'
            }
          >
            <Save size={16} />
            <span>{savedNotification ? 'Tersimpan!' : 'Simpan Pengujian'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// =========================================================================
// SECTION DINAMIS: UJI KARAKTERISTIK MARSHALL (BAB 9 BP-9-1 / MAR-01)
// =========================================================================
function DynamicMarshallSection({
  testConfig,
  inputs,
  calcOutput,
  currentMarshallSpecimens,
  currentMarshallSurfaceAreaTable,
  marshallInputTab,
  setMarshallInputTab,
  selectedSpecimenStepId,
  setSelectedSpecimenStepId,
  onSpecimenChange,
  onAddSpecimen,
  onRemoveSpecimen,
  onSurfaceAreaChange,
  onHeightChange,
  onResetToLaprak,
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

  const repSpec = calcOutput.repSpec || currentMarshallSpecimens[0] || {}
  const totalLp = calcOutput.totalLp || 10.15
  const computedSpecimens = calcOutput.computedSpecimens || currentMarshallSpecimens || []
  const sortedSpecs = calcOutput.sortedSpecs || computedSpecimens
  const computedSat = calcOutput.computedSat || currentMarshallSurfaceAreaTable || []
  const kaoTable = calcOutput.kaoTable || []
  const chartPoints = calcOutput.chartPoints || []
  const stabFit = calcOutput.stabFit || { equation: '-' }
  const flowFit = calcOutput.flowFit || { equation: '-' }
  const mqFit = calcOutput.mqFit || { equation: '-' }
  const vmaFit = calcOutput.vmaFit || { equation: '-' }
  const vimFit = calcOutput.vimFit || { equation: '-' }
  const vfaFit = calcOutput.vfaFit || { equation: '-' }
  const densityFit = calcOutput.densityFit || { equation: '-' }

  const formulaStepsBySpecimen = calcOutput.formulaStepsBySpecimen || {}
  const activeSteps = formulaStepsBySpecimen[selectedSpecimenStepId] || calcOutput.formulaSteps || []

  const d = Number(inputs.diameter) || 10.2
  const r = d / 2
  const t = Number(inputs.tinggiBriket) || 6.85
  const vSil = calcOutput.vSil || Number((3.14 * r * r * t).toFixed(3))
  const kKor = calcOutput.kKor || Number(inputs.angkaKorelasiBeban) || 0.886
  const cKal = calcOutput.cKal || Number(inputs.kalibrasiAlat) || 12.9961

  const gsb = calcOutput.gsb || 2.396
  const gsa = calcOutput.gsa || 2.547
  const gse = calcOutput.gse || 2.471

  return (
    <div className="calc-content-wrap">
      {/* 1. Header Ringkasan & Deskripsi Standar */}
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
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>
              {testConfig.name}
            </h1>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#475569', maxWidth: '850px', lineHeight: 1.5 }}>
              {testConfig.desc}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={`calc-verdict-badge ${getVerdictClass(calcOutput.verdictClass)}`}>
              {getVerdictLabel(calcOutput.status)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grid 4 Kartu Bento Output Utama */}
      <div className="calc-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Kartu 1: Rekomendasi KAO */}
        <div className="calc-bento-card highlight" style={{ borderLeft: '4px solid #0284C7' }}>
          <div className="calc-bento-label">Kadar Aspal Optimum (KAO)</div>
          <div className="calc-bento-value" style={{ color: '#0284C7', fontSize: '1.45rem' }}>
            6.5%
          </div>
          <div className="calc-bento-sub">
            Rekomendasi Analisis Volumetrik & Mekanik
          </div>
        </div>

        {/* Kartu 2: Stabilitas Marshall */}
        <div className="calc-bento-card" style={{ borderLeft: '4px solid #10B981' }}>
          <div className="calc-bento-label">Stabilitas Marshall (S')</div>
          <div className="calc-bento-value" style={{ color: '#10B981', fontSize: '1.35rem' }}>
            {repSpec.stabilitas ? `${repSpec.stabilitas.toFixed(1)} kg` : '-'}
          </div>
          <div className="calc-bento-sub">
            Syarat Bina Marga: ≥ 800 kg (Memenuhi)
          </div>
        </div>

        {/* Kartu 3: VFA & VMA pada KAO */}
        <div className="calc-bento-card" style={{ borderLeft: '4px solid #6366F1' }}>
          <div className="calc-bento-label">VFA & VMA pada KAO</div>
          <div className="calc-bento-value" style={{ color: '#4F46E5', fontSize: '1.25rem' }}>
            VFA: {repSpec.vfa ? `${repSpec.vfa.toFixed(1)}%` : '-'}
          </div>
          <div className="calc-bento-sub">
            VMA: {repSpec.vma ? `${repSpec.vma.toFixed(1)}%` : '-'} (≥ 15%) | VIM: {repSpec.vim ? `${repSpec.vim.toFixed(2)}%` : '-'}
          </div>
        </div>

        {/* Kartu 4: Tebal Selimut Aspal */}
        <div className="calc-bento-card highlight" style={{ borderLeft: '4px solid #F59E0B' }}>
          <div className="calc-bento-label">Tebal Selimut Aspal</div>
          <div className="calc-bento-value" style={{ color: '#D97706', fontSize: '1.35rem' }}>
            {repSpec.tebalSelimut ? `${repSpec.tebalSelimut.toFixed(2)} µm` : '-'}
          </div>
          <div className="calc-bento-sub">
            Total Luas Permukaan Agregat: {totalLp} m²/kg
          </div>
        </div>
      </div>

      {/* Alert Error Berwarna Merah Jika Ada Nilai Negatif */}
      {hasNegativeInput && (
        <div className="calc-negative-alert-box" style={{ marginBottom: '1.25rem' }}>
          <AlertTriangle size={20} color="#DC2626" />
          <div className="calc-negative-alert-content">
            <strong className="calc-negative-alert-title">Nilai input tidak boleh negatif</strong>
            <p className="calc-negative-alert-desc">
              Terdapat nilai negatif pada parameter material, tabel luas permukaan, atau data penimbangan benda uji Marshall.
            </p>
          </div>
        </div>
      )}

      {/* 3. INPUT SECTION DENGAN SISTEM TAB TERSTRUKTUR */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} color="#0284C7" />
              Parameter Pengujian & Benda Uji Marshall (Input)
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Pilih tab di bawah untuk mengatur geometri alat, luas permukaan agregat (FLP), atau data pengujian multi-kadar aspal.
            </p>
          </div>
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetToLaprak}
            title="Kembalikan seluruh parameter dan data benda uji ke default laporan praktikum"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            <RotateCcw size={14} style={{ marginRight: '6px' }} />
            <span>Reset ke Default Laprak</span>
          </button>
        </div>

        {/* Tab Switcher Input */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#F1F5F9', padding: '0.3rem', borderRadius: '6px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setMarshallInputTab('tab1')}
            style={{
              border: 'none',
              background: marshallInputTab === 'tab1' ? '#FFFFFF' : 'transparent',
              color: marshallInputTab === 'tab1' ? '#0F172A' : '#64748B',
              fontWeight: marshallInputTab === 'tab1' ? 600 : 500,
              padding: '0.45rem 0.85rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: marshallInputTab === 'tab1' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            Tab 1: Material, Geometri & Alat (Tabel 12.1)
          </button>
          <button
            type="button"
            onClick={() => setMarshallInputTab('tab2')}
            style={{
              border: 'none',
              background: marshallInputTab === 'tab2' ? '#FFFFFF' : 'transparent',
              color: marshallInputTab === 'tab2' ? '#0F172A' : '#64748B',
              fontWeight: marshallInputTab === 'tab2' ? 600 : 500,
              padding: '0.45rem 0.85rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: marshallInputTab === 'tab2' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            Tab 2: Luas Permukaan Agregat FLP (Tabel 12.2)
          </button>
          <button
            type="button"
            onClick={() => setMarshallInputTab('tab3')}
            style={{
              border: 'none',
              background: marshallInputTab === 'tab3' ? '#FFFFFF' : 'transparent',
              color: marshallInputTab === 'tab3' ? '#0F172A' : '#64748B',
              fontWeight: marshallInputTab === 'tab3' ? 600 : 500,
              padding: '0.45rem 0.85rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: marshallInputTab === 'tab3' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            Tab 3: Data Pengujian Benda Uji (5%, 5.5%, 6.5%)
          </button>
        </div>

        {/* TAB 1: PARAMETER MATERIAL, GEOMETRI & KALIBRASI ALAT */}
        {marshallInputTab === 'tab1' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Jenis Campuran Beraspal
                </label>
                <input
                  type="text"
                  readOnly
                  value="Laston AC-WC (Bina Marga 2018)"
                  className="calc-input-field"
                  style={{ background: '#F8FAFC', color: '#334155', cursor: 'not-allowed', fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Diameter Briket (d) <span style={{ color: '#0284C7' }}>[cm]</span> (r = {r.toFixed(1)} cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.diameter ?? 10.2}
                  onChange={(e) => onInputChange('diameter', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="calc-input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Tinggi Briket (t) <span style={{ color: '#0284C7' }}>[cm]</span> ({t * 10} mm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.tinggiBriket ?? 6.85}
                  onChange={(e) => onHeightChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="calc-input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Kalibrasi Alat <span style={{ color: '#0284C7' }}>[kg/div]</span> (28.6515 lbs)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={inputs.kalibrasiAlat ?? 12.9961}
                  onChange={(e) => onInputChange('kalibrasiAlat', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="calc-input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Angka Korelasi Beban (k_kor) <span style={{ color: '#64748B' }}>[Tabel 12.1]</span>
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={inputs.angkaKorelasiBeban ?? 0.886}
                  onChange={(e) => onInputChange('angkaKorelasiBeban', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="calc-input-field"
                  title="Otomatis diinterpolasi dari Tabel 12.1 untuk tebal 68.5 mm (0.886)"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Volume Silinder Geometris (V_sil)
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${vSil.toFixed(3)} cm³`}
                  className="calc-input-field"
                  style={{ background: '#F8FAFC', color: '#0284C7', fontWeight: 600 }}
                />
              </div>
            </div>

            {/* Berat Jenis Agregat & Aspal */}
            <div style={{ marginBottom: '1.25rem', padding: '1rem', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '0.85rem', color: '#1E293B', display: 'block', marginBottom: '0.65rem' }}>
                Berat Jenis Bulk & Semu Agregat (Gsb & Gsa) serta Berat Jenis Aspal (Ga):
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#475569', display: 'block' }}>Gsb Kasar (Gsb1)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={inputs.gsb1 ?? 2.09495}
                    onChange={(e) => onInputChange('gsb1', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="calc-input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#475569', display: 'block' }}>Gsa Kasar (Gsa1)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={inputs.gsa1 ?? 2.23583}
                    onChange={(e) => onInputChange('gsa1', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="calc-input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#475569', display: 'block' }}>Gsb Halus (Gsb2)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={inputs.gsb2 ?? 2.64648}
                    onChange={(e) => onInputChange('gsb2', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="calc-input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#475569', display: 'block' }}>Gsa Halus (Gsa2)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={inputs.gsa2 ?? 2.80412}
                    onChange={(e) => onInputChange('gsa2', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="calc-input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#475569', display: 'block' }}>Gsb Filler (Gsb3)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={inputs.gsb3 ?? 2.574}
                    onChange={(e) => onInputChange('gsb3', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="calc-input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#475569', display: 'block' }}>Gsa Filler (Gsa3)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={inputs.gsa3 ?? 2.735}
                    onChange={(e) => onInputChange('gsa3', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="calc-input-field"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#475569', display: 'block' }}>BJ Aspal (Ga)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={inputs.ga ?? 1.03431}
                    onChange={(e) => onInputChange('ga', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="calc-input-field"
                  />
                </div>
              </div>
            </div>

            {/* Proporsi Agregat terhadap Campuran (pada Pa = 6.5%) */}
            <div style={{ padding: '0.75rem 1rem', background: '#F1F5F9', borderRadius: '6px', fontSize: '0.82rem', color: '#334155' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#64748B' }}>Proporsi thd Campuran (Pa=6.5%):</span>{' '}
                  <strong>P1 = {inputs.p1 ?? 36.465}%, P2 = {inputs.p2 ?? 50.958}%, P3 = {inputs.p3 ?? 6.0775}%</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Gsb Agregat:</span>{' '}
                  <strong style={{ color: '#0284C7' }}>{gsb.toFixed(3)}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Gsa Semu:</span>{' '}
                  <strong style={{ color: '#10B981' }}>{gsa.toFixed(3)}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Gse Efektif:</span>{' '}
                  <strong style={{ color: '#6366F1' }}>{gse.toFixed(3)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TABEL 12.2 LUAS PERMUKAAN AGREGAT FLP */}
        {marshallInputTab === 'tab2' && (
          <div>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.8rem', color: '#64748B' }}>
              Tabel 12.2 Luas Permukaan Agregat Campuran Berdasarkan Faktor Luas Permukaan (FLP) Sesuai Spesifikasi.
            </p>
            <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'center' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'left' }}>Saringan (ASTM & mm)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Berat Tertahan (gr)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>% Lolos Kumulatif (%)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Faktor Luas Permukaan (FLP)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#0284C7' }}>Luas Permukaan (m²/kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {computedSat.map((row, idx) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                      }}
                    >
                      <td style={{ padding: '0.55rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#1E293B' }}>
                        {row.sieve} ({row.sizeMm})
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.01"
                          value={row.retWeight ?? ''}
                          onChange={(e) => onSurfaceAreaChange(row.id, 'retWeight', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '90px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.001"
                          value={row.cumPassPct ?? ''}
                          onChange={(e) => onSurfaceAreaChange(row.id, 'cumPassPct', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '90px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.01"
                          value={row.flp ?? ''}
                          onChange={(e) => onSurfaceAreaChange(row.id, 'flp', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '80px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.55rem 0.5rem', fontWeight: 700, color: '#0284C7' }}>
                        {row.lp !== undefined ? row.lp.toFixed(2) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#F1F5F9', fontWeight: 'bold', borderTop: '2px solid #CBD5E1' }}>
                    <td style={{ padding: '0.65rem 0.75rem', textAlign: 'left' }}>Total</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>
                      {computedSat.reduce((acc, r) => acc + (Number(r.retWeight) || 0), 0).toFixed(2)} gr
                    </td>
                    <td colSpan={2} style={{ padding: '0.65rem 0.5rem', textAlign: 'right', color: '#475569' }}>
                      Total Luas Permukaan Agregat (LP):
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', color: '#0284C7', fontSize: '0.9rem' }}>
                      {totalLp.toFixed(2)} m²/kg
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DATA PENGUJIAN BENDA UJI MULTI-KADAR ASPAL */}
        {marshallInputTab === 'tab3' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
                Masukkan data penimbangan berat dan bacaan arloji alat Marshall. Anda dapat menambah atau menghapus benda uji.
              </p>
              <button
                type="button"
                className="btn-open-table-direct"
                onClick={onAddSpecimen}
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', color: '#0284C7' }}
              >
                <Plus size={14} style={{ marginRight: '4px' }} />
                <span>+ Tambah Benda Uji</span>
              </button>
            </div>

            <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'center' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Benda Uji</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#0284C7' }}>Kadar Aspal (%)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Berat SSD (gr)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Berat dlm Air (gr)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Berat di Udara (gr)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Bacaan Stab (div)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Flow (mm)</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Angka Korelasi</th>
                    <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMarshallSpecimens.map((s, idx) => (
                    <tr
                      key={s.id}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                      }}
                    >
                      <td style={{ padding: '0.55rem 0.5rem', fontWeight: 600, color: '#1E293B' }}>
                        Benda Uji {s.no || idx + 1}
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={s.pa ?? ''}
                          onChange={(e) => onSpecimenChange(s.id, 'pa', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '70px', padding: '0.3rem', fontWeight: 600, color: '#0284C7' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={s.beratSsd ?? ''}
                          onChange={(e) => onSpecimenChange(s.id, 'beratSsd', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '85px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={s.beratAir ?? ''}
                          onChange={(e) => onSpecimenChange(s.id, 'beratAir', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '85px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={s.beratKering ?? ''}
                          onChange={(e) => onSpecimenChange(s.id, 'beratKering', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '85px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="1"
                          value={s.bacaanStab ?? ''}
                          onChange={(e) => onSpecimenChange(s.id, 'bacaanStab', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '75px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.01"
                          value={s.flow ?? ''}
                          onChange={(e) => onSpecimenChange(s.id, 'flow', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '70px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <input
                          type="number"
                          step="0.001"
                          value={s.angkaKorelasi ?? ''}
                          onChange={(e) => onSpecimenChange(s.id, 'angkaKorelasi', e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input-field"
                          style={{ textAlign: 'center', width: '75px', padding: '0.3rem' }}
                        />
                      </td>
                      <td style={{ padding: '0.35rem 0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => onRemoveSpecimen(s.id)}
                          disabled={currentMarshallSpecimens.length <= 1}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: currentMarshallSpecimens.length <= 1 ? '#CBD5E1' : '#DC2626',
                            cursor: currentMarshallSpecimens.length <= 1 ? 'not-allowed' : 'pointer',
                            padding: '4px',
                          }}
                          title="Hapus baris benda uji ini"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. BAGIAN A: RINCIAN 16 LANGKAH RUMUS PERHITUNGAN (SUBBAB 12.7) */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}>
              Bagian A: Rincian 16 Langkah Rumus Perhitungan Analisis Data (Subbab 12.7)
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Pilih benda uji untuk menampilkan kalkulasi langkah demi langkah dari volume spesimen hingga tebal selimut aspal.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <select
              value={selectedSpecimenStepId}
              onChange={(e) => setSelectedSpecimenStepId(Number(e.target.value))}
              style={{
                fontSize: '0.82rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#1E293B',
                fontWeight: 600,
              }}
            >
              {computedSpecimens.map((s) => (
                <option key={s.id} value={s.id}>
                  Benda Uji {s.no} (Kadar Aspal: {s.pa}%)
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn-open-table-direct"
              onClick={() => setShowFormulaSteps(!showFormulaSteps)}
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
            >
              {showFormulaSteps ? 'Sembunyikan' : 'Tampilkan'}
            </button>
          </div>
        </div>

        {showFormulaSteps && (
          <div style={{
            background: '#F8FAFC',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '0.8rem',
            lineHeight: 1.6,
            color: '#334155',
            whiteSpace: 'pre-wrap',
            maxHeight: '400px',
            overflowY: 'auto',
          }}>
            {activeSteps.join('\n')}
          </div>
        )}
      </div>

      {/* 5. BAGIAN B: TABEL LENGKAP LAPORAN PRAKTIKUM (TABEL 12.2, 12.3, 12.4, DAN 12.5) */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1E293B' }}>
          Bagian B: Tabel Analisis Lengkap Hasil Pengujian Marshall
        </h3>

        {/* Tabel 12.3 Hasil Analisis Data Volumetrik (17 Kolom) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: '0.88rem', color: '#0F172A' }}>
              Tabel 12.3 Hasil Analisis Data Volumetrik Setiap Kadar Aspal (17 Kolom)
            </strong>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Geser ke samping (scroll) untuk melihat seluruh kolom</span>
          </div>
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
            <table style={{ width: '100%', minWidth: '1200px', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'center' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>No. BU</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: '#0284C7' }}>Pa (%)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>B_SSD (g)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>B_air (g)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>B_udara (g)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>V (cm³)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Gmb</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Gsb</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Gse</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Gmm</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Gsa</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Pab (%)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Pae (%)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: '#10B981' }}>VMA (%)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: '#6366F1' }}>VIM (%)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: '#F59E0B' }}>VFA (%)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Density (g/cm³)</th>
                  <th style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>Tebal Selimut (µm)</th>
                </tr>
              </thead>
              <tbody>
                {computedSpecimens.map((s, idx) => (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                    }}
                  >
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>{s.no || idx + 1}</td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 700, color: '#0284C7' }}>{s.pa.toFixed(1)}%</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{Number(s.beratSsd).toFixed(1)}</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{Number(s.beratAir).toFixed(1)}</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{Number(s.beratKering).toFixed(1)}</td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 500 }}>{s.v.toFixed(1)}</td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>{s.gmb.toFixed(3)}</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{gsb.toFixed(3)}</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{gse.toFixed(3)}</td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 600 }}>{s.gmm.toFixed(3)}</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{gsa.toFixed(3)}</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{s.pab.toFixed(2)}%</td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{s.pae.toFixed(3)}%</td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: s.isVmaOk ? '#059669' : '#DC2626' }}>
                      {s.vma.toFixed(2)}%
                    </td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: s.isVimOk ? '#059669' : '#D97706' }}>
                      {s.vim.toFixed(2)}%
                    </td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: s.isVfaOk ? '#059669' : '#DC2626' }}>
                      {s.vfa.toFixed(2)}%
                    </td>
                    <td style={{ padding: '0.5rem 0.4rem' }}>{s.density.toFixed(3)}</td>
                    <td style={{ padding: '0.5rem 0.4rem', fontWeight: 600, color: '#D97706' }}>
                      {s.tebalSelimut.toFixed(2)} µm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 12.4 Hasil Stabilitas, Flow, dan MQ */}
        <div style={{ marginBottom: '1.5rem' }}>
          <strong style={{ fontSize: '0.88rem', color: '#0F172A', display: 'block', marginBottom: '0.5rem' }}>
            Tabel 12.4 Hasil Stabilitas, Flow, dan Marshall Quotient Setiap Kadar Aspal
          </strong>
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'center' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>No Benda Uji</th>
                  <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#0284C7' }}>Kadar Aspal (%)</th>
                  <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Bacaan Stabilitas (lbs/div)</th>
                  <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Angka Korelasi Beban</th>
                  <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#10B981' }}>Stabilitas Campuran (kg)</th>
                  <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#6366F1' }}>Flow (mm)</th>
                  <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#D97706' }}>MQ (kg/mm)</th>
                </tr>
              </thead>
              <tbody>
                {computedSpecimens.map((s, idx) => (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                    }}
                  >
                    <td style={{ padding: '0.55rem 0.5rem', fontWeight: 600 }}>Benda Uji {s.no || idx + 1}</td>
                    <td style={{ padding: '0.55rem 0.5rem', fontWeight: 700, color: '#0284C7' }}>{s.pa.toFixed(1)}%</td>
                    <td style={{ padding: '0.55rem 0.5rem' }}>{Number(s.bacaanStab).toFixed(0)}</td>
                    <td style={{ padding: '0.55rem 0.5rem' }}>{Number(s.angkaKorelasi || kKor).toFixed(3)}</td>
                    <td style={{ padding: '0.55rem 0.5rem', fontWeight: 700, color: s.isStabOk ? '#059669' : '#DC2626' }}>
                      {s.stabilitas.toFixed(2)} kg
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem', fontWeight: 600, color: s.isFlowOk ? '#059669' : '#DC2626' }}>
                      {s.flow.toFixed(2)} mm
                    </td>
                    <td style={{ padding: '0.55rem 0.5rem', fontWeight: 700, color: s.isMqOk ? '#059669' : '#DC2626' }}>
                      {s.mq.toFixed(2)} kg/mm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 12.5 Penentuan KAO */}
        <div>
          <strong style={{ fontSize: '0.88rem', color: '#0F172A', display: 'block', marginBottom: '0.5rem' }}>
            Tabel 12.5 Penentuan Kadar Aspal Optimum (KAO) terhadap Spesifikasi Bina Marga 2018 (Divisi 6)
          </strong>
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'center' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', color: '#334155', borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '0.65rem 0.75rem', fontWeight: 600, textAlign: 'left' }}>Parameter Pengujian</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontWeight: 600 }}>Spesifikasi Bina Marga 2018</th>
                  {sortedSpecs.map((s) => (
                    <th key={s.id} style={{ padding: '0.65rem 0.5rem', fontWeight: 700, color: '#0284C7' }}>
                      {s.pa.toFixed(1)}%
                    </th>
                  ))}
                  <th style={{ padding: '0.65rem 0.75rem', fontWeight: 600, textAlign: 'left' }}>Keterangan & Evaluasi</th>
                </tr>
              </thead>
              <tbody>
                {kaoTable.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                    }}
                  >
                    <td style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#1E293B' }}>
                      {row.param}
                    </td>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 500, color: '#475569' }}>
                      {row.syarat}
                    </td>
                    {row.values.map((v, vIdx) => (
                      <td key={vIdx} style={{ padding: '0.6rem 0.5rem' }}>
                        <div style={{ fontWeight: 600, color: '#1E293B', marginBottom: '2px' }}>
                          {v.val}
                        </div>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '0.12rem 0.4rem',
                          borderRadius: '4px',
                          fontWeight: 600,
                          background: v.passed ? '#DEF7EC' : '#FDE8E8',
                          color: v.passed ? '#03543F' : '#9B1C1C',
                        }}>
                          {v.passed ? 'Memenuhi' : 'Tidak Memenuhi'}
                        </span>
                      </td>
                    ))}
                    <td style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: '#64748B', fontSize: '0.78rem' }}>
                      {row.evaluasi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. BAGIAN C: GRID 8 GRAFIK VISUALISASI KARAKTERISTIK MARSHALL (GAMBAR 12.22 S/D 12.29) */}
      <div className="calc-card-box" style={{ marginBottom: '1.5rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#0284C7" />
            Bagian C: Visualisasi 8 Grafik Karakteristik Marshall & Diagram Pita KAO
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Gambar 12.22 s/d 12.28 menampilkan kurva hubungan parameter terhadap kadar aspal, dan Gambar 12.29 menampilkan diagram pita rentang penentuan KAO.
          </p>
        </div>

        {/* Responsive Grid 2 Kolom untuk Grafik */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
          {/* Grafik 1: Stabilitas vs Kadar Aspal (Gambar 12.22) */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>Gambar 12.22: Stabilitas (kg) vs Kadar Aspal (%)</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                  Regresi: {stabFit.equation}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#DEF7EC', color: '#03543F', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                Min: 800 kg
              </span>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 15, right: 25, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="pa" tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Kadar Aspal (%)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: '#64748B' }} />
                  </XAxis>
                  <YAxis domain={[0, 3200]} tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Stabilitas (kg)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#64748B' }} />
                  </YAxis>
                  <Tooltip formatter={(val) => [`${Number(val).toFixed(1)} kg`, 'Stabilitas']} />
                  <ReferenceLine y={800} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Min 800 kg', position: 'insideBottomRight', fill: '#DC2626', fontSize: 10 }} />
                  <Line type="monotone" dataKey="stabilitas" name="Stabilitas" stroke="#0284C7" strokeWidth={2.5} dot={{ r: 4, fill: '#0284C7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 2: Flow vs Kadar Aspal (Gambar 12.23) */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>Gambar 12.23: Kelelehan Plastis Flow (mm) vs Kadar Aspal (%)</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                  Regresi: {flowFit.equation}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#F1F5F9', color: '#334155', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                Spek: 2.0 - 4.0 mm
              </span>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 15, right: 25, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="pa" tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Kadar Aspal (%)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: '#64748B' }} />
                  </XAxis>
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Flow (mm)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#64748B' }} />
                  </YAxis>
                  <Tooltip formatter={(val) => [`${Number(val).toFixed(2)} mm`, 'Flow']} />
                  <ReferenceLine y={2.0} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Min 2.0 mm', position: 'insideBottomRight', fill: '#DC2626', fontSize: 10 }} />
                  <ReferenceLine y={4.0} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Maks 4.0 mm', position: 'insideTopRight', fill: '#DC2626', fontSize: 10 }} />
                  <Line type="monotone" dataKey="flow" name="Flow" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 3: Marshall Quotient vs Kadar Aspal (Gambar 12.24) */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>Gambar 12.24: Marshall Quotient (kg/mm) vs Kadar Aspal (%)</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                  Regresi: {mqFit.equation}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#DEF7EC', color: '#03543F', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                Min: 250 kg/mm
              </span>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 15, right: 25, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="pa" tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Kadar Aspal (%)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: '#64748B' }} />
                  </XAxis>
                  <YAxis domain={[0, 3000]} tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="MQ (kg/mm)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#64748B' }} />
                  </YAxis>
                  <Tooltip formatter={(val) => [`${Number(val).toFixed(1)} kg/mm`, 'MQ']} />
                  <ReferenceLine y={250} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Min 250 kg/mm', position: 'insideBottomRight', fill: '#DC2626', fontSize: 10 }} />
                  <Line type="monotone" dataKey="mq" name="MQ" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 4, fill: '#8B5CF6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 4: VMA vs Kadar Aspal (Gambar 12.25) */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>Gambar 12.25: Rongga dlm Agregat VMA (%) vs Kadar Aspal (%)</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                  Regresi: {vmaFit.equation}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#DEF7EC', color: '#03543F', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                Min: 15.0%
              </span>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 15, right: 25, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="pa" tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Kadar Aspal (%)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: '#64748B' }} />
                  </XAxis>
                  <YAxis domain={[12, 22]} tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="VMA (%)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#64748B' }} />
                  </YAxis>
                  <Tooltip formatter={(val) => [`${Number(val).toFixed(2)}%`, 'VMA']} />
                  <ReferenceLine y={15.0} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Min 15.0%', position: 'insideBottomRight', fill: '#DC2626', fontSize: 10 }} />
                  <Line type="monotone" dataKey="vma" name="VMA" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4, fill: '#F59E0B' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 5: VIM vs Kadar Aspal (Gambar 12.26) */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>Gambar 12.26: Rongga dlm Campuran VIM (%) vs Kadar Aspal (%)</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                  Tren Polinomial: {vimFit.equation}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#F1F5F9', color: '#334155', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                Spek: 3.0% - 5.0%
              </span>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 15, right: 25, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="pa" tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Kadar Aspal (%)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: '#64748B' }} />
                  </XAxis>
                  <YAxis domain={[0, 14]} tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="VIM (%)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#64748B' }} />
                  </YAxis>
                  <Tooltip formatter={(val) => [`${Number(val).toFixed(2)}%`, 'VIM']} />
                  <ReferenceLine y={3.0} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Min 3.0%', position: 'insideBottomRight', fill: '#DC2626', fontSize: 10 }} />
                  <ReferenceLine y={5.0} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Maks 5.0%', position: 'insideTopRight', fill: '#DC2626', fontSize: 10 }} />
                  <Line type="monotone" dataKey="vim" name="VIM" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4, fill: '#EF4444' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 6: VFA vs Kadar Aspal (Gambar 12.27) */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>Gambar 12.27: Rongga Terisi Aspal VFA (%) vs Kadar Aspal (%)</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                  Regresi: {vfaFit.equation}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#DEF7EC', color: '#03543F', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                Min: 65.0%
              </span>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 15, right: 25, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="pa" tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Kadar Aspal (%)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: '#64748B' }} />
                  </XAxis>
                  <YAxis domain={[30, 80]} tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="VFA (%)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#64748B' }} />
                  </YAxis>
                  <Tooltip formatter={(val) => [`${Number(val).toFixed(1)}%`, 'VFA']} />
                  <ReferenceLine y={65.0} stroke="#DC2626" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Min 65.0%', position: 'insideBottomRight', fill: '#DC2626', fontSize: 10 }} />
                  <Line type="monotone" dataKey="vfa" name="VFA" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4, fill: '#06B6D4' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 7: Density vs Kadar Aspal (Gambar 12.28) */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>Gambar 12.28: Kerapatan / Density (gr/cm³) vs Kadar Aspal (%)</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B' }}>
                  Tren Polinomial: {densityFit.equation}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#F1F5F9', color: '#334155', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                Nilai Maksimum
              </span>
            </div>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 15, right: 25, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="pa" tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Kadar Aspal (%)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: '#64748B' }} />
                  </XAxis>
                  <YAxis domain={[2.35, 2.45]} tick={{ fontSize: 10, fill: '#64748B' }}>
                    <Label value="Density (gr/cm³)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#64748B' }} />
                  </YAxis>
                  <Tooltip formatter={(val) => [`${Number(val).toFixed(3)} gr/cm³`, 'Density']} />
                  <Line type="monotone" dataKey="density" name="Density" stroke="#475569" strokeWidth={2.5} dot={{ r: 4, fill: '#475569' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 8: Gambar 12.29 Diagram Pita Rentang Penentuan KAO */}
          <div style={{ border: '1px solid #0284C7', borderRadius: '8px', padding: '1rem', background: '#F0F9FF' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ fontSize: '0.88rem', color: '#0369A1' }}>
                Gambar 12.29: Diagram Pita Rentang Penentuan Kadar Aspal Optimum (KAO)
              </strong>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#475569', marginTop: '2px' }}>
                Visualisasi irisan rentang pemenuhan syarat spesifikasi Bina Marga 2018 Laston AC-WC
              </span>
            </div>

            {/* Matrix Diagram Pita */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.75rem' }}>
              {/* Header Kolom Kadar Aspal */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 1fr', gap: '0.5rem', fontWeight: 'bold', color: '#334155', textAlign: 'center', paddingBottom: '4px', borderBottom: '1px solid #BAE6FD' }}>
                <span style={{ textAlign: 'left' }}>Parameter Marshall</span>
                <span>Pa = 5.0%</span>
                <span>Pa = 5.5%</span>
                <span style={{ color: '#0284C7' }}>Pa = 6.5% (Optimum)</span>
              </div>

              {/* Baris 1: Stabilitas */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ textAlign: 'left', fontWeight: 600 }}>Stabilitas (≥ 800 kg)</span>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 2839.9 kg</div>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 2616.5 kg</div>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 2106.2 kg</div>
              </div>

              {/* Baris 2: Flow */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ textAlign: 'left', fontWeight: 600 }}>Flow (2.0 - 4.0 mm)</span>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 2.04 mm</div>
                <div style={{ background: '#FEF3C7', color: '#92400E', padding: '4px', borderRadius: '4px' }}>1.10 mm</div>
                <div style={{ background: '#FEF3C7', color: '#92400E', padding: '4px', borderRadius: '4px' }}>0.92 mm</div>
              </div>

              {/* Baris 3: MQ */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ textAlign: 'left', fontWeight: 600 }}>MQ (≥ 250 kg/mm)</span>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 1392.1</div>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 2378.6</div>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 2289.3</div>
              </div>

              {/* Baris 4: VMA */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ textAlign: 'left', fontWeight: 600 }}>VMA (≥ 15.0%)</span>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 18.88%</div>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 16.94%</div>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 16.45%</div>
              </div>

              {/* Baris 5: VIM */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ textAlign: 'left', fontWeight: 600 }}>VIM (3.0% - 5.0%)</span>
                <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '4px', borderRadius: '4px' }}>11.47%</div>
                <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '4px', borderRadius: '4px' }}>8.28%</div>
                <div style={{ background: '#FEF3C7', color: '#92400E', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>5.56% (Mendekati)</div>
              </div>

              {/* Baris 6: VFA */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ textAlign: 'left', fontWeight: 600 }}>VFA (≥ 65.0%)</span>
                <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '4px', borderRadius: '4px' }}>39.25%</div>
                <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '4px', borderRadius: '4px' }}>51.12%</div>
                <div style={{ background: '#DEF7EC', color: '#03543F', padding: '4px', borderRadius: '4px', fontWeight: 600 }}>✓ 66.20%</div>
              </div>

              {/* Daerah Irisan Rekomendasi KAO */}
              <div style={{ marginTop: '0.5rem', padding: '0.6rem 0.75rem', background: '#0284C7', color: '#FFFFFF', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
                ★ KADAR ASPAL OPTIMUM (KAO) TERPILIH = 6.5% ★
              </div>
            </div>
          </div>
        </div>

        {/* Ringkasan Pembahasan & Kesimpulan Otomatis */}
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem',
          borderRadius: '6px',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          fontSize: '0.82rem',
          color: '#334155',
          lineHeight: 1.6,
        }}>
          <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>
            Ringkasan Pembahasan Hasil Pengujian Marshall (Laporan Praktikum Universitas Tidar):
          </strong>
          <p style={{ margin: 0 }}>
            Dari hasil pengujian dan analisis data karakteristik Marshall campuran Laston AC-WC (Bina Marga 2018), diperoleh bahwa pada kadar aspal 5.0% dan 5.5%, nilai rongga dalam campuran (VIM) masih relatif tinggi di atas batas maksimum 5.0% dan nilai rongga terisi aspal (VFA) berada di bawah batas minimum 65.0%. Peningkatan kadar aspal ke <strong>6.5%</strong> berhasil menurunkan VIM hingga mendekati rentang spesifikasi serta menaikkan VFA menjadi <strong>66.20% (≥ 65.0%)</strong> dengan stabilitas yang tetap sangat kokoh sebesar <strong>2106.16 kg (≥ 800 kg)</strong> dan nilai Marshall Quotient <strong>2289.30 kg/mm (≥ 250 kg/mm)</strong>. Oleh karena itu, kadar aspal acuan rencana yang direkomendasikan sebagai <strong>Kadar Aspal Optimum (KAO) adalah 6.5%</strong>.
          </p>
        </div>
      </div>

      {/* 7. Footer Navigasi Bawah */}
      <div className="calc-footer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          className="btn-back-footer"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="calc-footer-right-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-open-table-direct"
            onClick={onResetToLaprak}
            title="Kembalikan data ke parameter dan spesimen default laporan praktikum"
          >
            <RotateCcw size={15} style={{ marginRight: '6px' }} />
            <span>Reset Data Laprak</span>
          </button>

          <button
            type="button"
            className="btn-verdict-save"
            onClick={onSave}
            disabled={isInputInvalid || hasNegativeInput || hasExceededInput}
            title={
              isInputInvalid || hasNegativeInput || hasExceededInput
                ? 'Perbaiki nilai parameter agar bernilai valid sebelum menyimpan'
                : 'Simpan hasil pengujian karakteristik Marshall ke riwayat dashboard'
            }
          >
            <Save size={16} />
            <span>{savedNotification ? 'Tersimpan!' : 'Simpan Pengujian'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}