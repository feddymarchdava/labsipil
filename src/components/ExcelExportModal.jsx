import React, { useState, useMemo } from 'react'
import { FileSpreadsheet, X, Check, Download, CheckSquare, Square, Building2, User, Calendar, Layers, Sparkles, CheckCircle2, FileCheck } from 'lucide-react'
import { exportModuleWithTemplate, TEMPLATE_REGISTRY } from '../utils/excelExporter'

export default function ExcelExportModal({
  isOpen,
  onClose,
  currentTestConfig,
  currentInputs,
  currentCalcOutput,
  calculatorRegistry = {},
  allModuleInputs = {},
}) {
  if (!isOpen) return null

  // State Pilihan Modul (Default ke modul aktif)
  const [selectedModuleId, setSelectedModuleId] = useState(currentTestConfig?.id || 'bb-1-1')

  // Hitung konfigurasi modul yang sedang dipilih
  const activeConfig = useMemo(() => {
    if (selectedModuleId === currentTestConfig?.id) {
      return currentTestConfig
    }
    return calculatorRegistry[selectedModuleId] || currentTestConfig
  }, [selectedModuleId, currentTestConfig, calculatorRegistry])

  // Hitung input modul yang sedang dipilih
  const activeInputs = useMemo(() => {
    if (selectedModuleId === currentTestConfig?.id) {
      return currentInputs || currentTestConfig?.initialInputs || {}
    }
    return allModuleInputs[selectedModuleId] || activeConfig?.initialInputs || {}
  }, [selectedModuleId, currentTestConfig, currentInputs, allModuleInputs, activeConfig])

  // Hitung output kalkulasi modul yang sedang dipilih
  const activeCalcOutput = useMemo(() => {
    if (selectedModuleId === currentTestConfig?.id && currentCalcOutput) {
      return currentCalcOutput
    }
    try {
      if (typeof activeConfig?.calculate === 'function') {
        return activeConfig.calculate(activeInputs)
      }
    } catch (e) {
      console.warn('Gagal menghitung output modul:', e)
    }
    return {}
  }, [selectedModuleId, currentTestConfig, currentCalcOutput, activeConfig, activeInputs])

  // Daftar sampel yang tersedia pada modul terpilih
  const availableSamples = useMemo(() => {
    if (Array.isArray(activeInputs?.samples) && activeInputs.samples.length > 0) {
      return activeInputs.samples
    }
    if (Array.isArray(activeCalcOutput?.samples) && activeCalcOutput.samples.length > 0) {
      return activeCalcOutput.samples
    }
    return null
  }, [activeInputs, activeCalcOutput])

  // State Sampel Terpilih (Default: pilih semua sampel yang ada)
  const [selectedSampleIds, setSelectedSampleIds] = useState(() => {
    if (availableSamples && availableSamples.length > 0) {
      return availableSamples.map((s, idx) => s.id ?? idx + 1)
    }
    return []
  })

  // Update selectedSampleIds saat berganti modul
  React.useEffect(() => {
    if (availableSamples && availableSamples.length > 0) {
      setSelectedSampleIds(availableSamples.map((s, idx) => s.id ?? idx + 1))
    } else {
      setSelectedSampleIds([])
    }
  }, [selectedModuleId, availableSamples])

  // State Metadata Blangko Laboratorium
  const [metadata, setMetadata] = useState({
    proyek: 'Praktikum Laboratorium Teknik Sipil',
    lokasi: 'Laboratorium Rekayasa Bahan & Geoteknik',
    diujiOleh: 'Tim Mahasiswa / Praktikan',
    diperiksaOleh: 'Asisten Laboratorium',
    tanggal: new Date().toISOString().split('T')[0],
    sampelDesc: activeConfig?.category || 'Contoh Bahan Pengujian Laboratorium',
  })

  // State Opsi Tambahan
  const [includeFormulas, setIncludeFormulas] = useState(true)
  const [includeSignature, setIncludeSignature] = useState(true)
  const [useMasterTemplate, setUseMasterTemplate] = useState(true)

  // Cek ketersediaan master template pada modul terpilih
  const templateInfo = useMemo(() => TEMPLATE_REGISTRY[selectedModuleId], [selectedModuleId])

  // State Loading / Status Download
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  // Toggle Pilihan Sampel
  const handleToggleSample = (sampleId) => {
    setSelectedSampleIds((prev) => {
      if (prev.includes(sampleId)) {
        return prev.filter((id) => id !== sampleId)
      } else {
        return [...prev, sampleId]
      }
    })
  }

  // Toggle Select All Sampel
  const handleToggleSelectAll = () => {
    if (!availableSamples) return
    if (selectedSampleIds.length === availableSamples.length) {
      setSelectedSampleIds([])
    } else {
      setSelectedSampleIds(availableSamples.map((s, idx) => s.id ?? idx + 1))
    }
  }

  // Eksekusi Download Excel
  const handleExecuteExport = async () => {
    if (availableSamples && availableSamples.length > 0 && selectedSampleIds.length === 0) {
      alert('Pilih minimal satu sampel pengujian untuk disertakan dalam blangko Excel.')
      return
    }

    try {
      setIsExporting(true)
      await exportModuleWithTemplate({
        testConfig: activeConfig,
        inputs: activeInputs,
        calcOutput: activeCalcOutput,
        metadata,
        selectedSampleIds,
        options: {
          includeFormulas,
          includeSignature,
          useGeneratedFallback: !useMasterTemplate,
        },
      })
      setExportSuccess(true)
      setTimeout(() => {
        setExportSuccess(false)
        onClose()
      }, 1200)
    } catch (err) {
      console.error('Gagal mengekspor file Excel:', err)
      alert(`Terjadi kesalahan saat membuat file Excel: ${err.message}`)
    } finally {
      setIsExporting(false)
    }
  }

  // Daftar Modul yang Terorganisir untuk Dropdown
  const registryList = useMemo(() => {
    return Object.values(calculatorRegistry || {}).map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      standard: item.standard,
      category: item.category,
      lab: item.lab,
    }))
  }, [calculatorRegistry])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-export-title"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/70 to-teal-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
              <FileSpreadsheet size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3 id="modal-export-title" className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Export Blangko Laboratorium ke Excel
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Format tabel standar SNI/ASTM, border grid, dan rumus formula sel otomatis (.xlsx)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            aria-label="Tutup Dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Modal (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-slate-700 text-xs sm:text-sm">
          
          {/* 1. Pemilihan Modul Pengujian */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="select-module" className="font-bold text-slate-800 flex items-center gap-1.5">
                <Layers size={15} className="text-blue-600" />
                <span>Pilih Modul Pengujian :</span>
              </label>
              {activeConfig?.standard && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {activeConfig.standard}
                </span>
              )}
            </div>

            <select
              id="select-module"
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {registryList.length > 0 ? (
                registryList.map((mod) => (
                  <option key={mod.id} value={mod.id}>
                    {mod.code ? `[${mod.code}] ` : ''}{mod.name} ({mod.standard})
                  </option>
                ))
              ) : (
                <option value={activeConfig?.id || ''}>{activeConfig?.name}</option>
              )}
            </select>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Kategori: <strong className="text-slate-700">{activeConfig?.category || '-'}</strong></span>
              {templateInfo && (
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <FileCheck size={13} className="text-emerald-600" />
                  Template Master Tersedia
                </span>
              )}
            </div>

            {/* Banner Master Template Info */}
            {templateInfo ? (
              <div className="mt-2 p-2.5 rounded-lg bg-emerald-50/90 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start sm:items-center gap-2">
                  <FileCheck size={18} className="text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-emerald-950">Master Blangko Excel Resmi:</span>
                      <span className="text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300">
                        {templateInfo.fileName}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700 leading-tight mt-0.5">
                      {templateInfo.name || 'Format blangko terstandarisasi SNI/ASTM dengan rumus aktif.'}
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-emerald-900 bg-white/80 hover:bg-white px-2.5 py-1.5 rounded-md border border-emerald-200 select-none shrink-0 transition-colors">
                  <input
                    type="checkbox"
                    checked={useMasterTemplate}
                    onChange={(e) => setUseMasterTemplate(e.target.checked)}
                    className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Gunakan Master</span>
                </label>
              </div>
            ) : (
              <div className="mt-2 p-2.5 rounded-lg bg-slate-100/90 border border-slate-200/90 flex items-center gap-2 text-xs text-slate-600">
                <Sparkles size={16} className="text-blue-600 shrink-0" />
                <span>
                  Menggunakan <strong>Generator Blangko Excel Dinamis</strong> dengan kop resmi, batas toleransi, dan formula sel otomatis.
                </span>
              </div>
            )}
          </div>

          {/* 2. Pemilihan Benda Uji / Sampel (Jika Multi-Sampel) */}
          {availableSamples && availableSamples.length > 0 ? (
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckSquare size={15} className="text-emerald-600" />
                  <span>Pilih Sampel / Titik Uji yang Diexport :</span>
                </span>
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                >
                  {selectedSampleIds.length === availableSamples.length ? 'Batal Pilih Semua' : 'Pilih Semua Sampel'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                {availableSamples.map((sample, idx) => {
                  const sId = sample.id ?? idx + 1
                  const isChecked = selectedSampleIds.includes(sId)
                  return (
                    <label
                      key={sId}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleSample(sId)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="truncate flex-1">
                        {sample.name || `Sampel #${sId}`}
                      </span>
                      {sample.w2 && sample.w3 && (
                        <span className="text-[10px] text-slate-400">
                          (W2: {sample.w2}g)
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>
              <p className="text-[11px] text-slate-500">
                Terpilih: <strong className="text-emerald-700">{selectedSampleIds.length}</strong> dari {availableSamples.length} sampel pengujian.
              </p>
            </div>
          ) : (
            <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600 shrink-0" />
              <span>
                Modul ini menyertakan seluruh baris tabel data teknis, formula, serta parameter evaluasi spesifikasi secara otomatis ke dalam blangko Excel.
              </span>
            </div>
          )}

          {/* 3. Metadata Kop Blangko Laboratorium */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-3">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Building2 size={15} className="text-indigo-600" />
              <span>Informasi Kop Blangko Laboratorium :</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Proyek / Praktikum :</label>
                <input
                  type="text"
                  value={metadata.proyek}
                  onChange={(e) => setMetadata({ ...metadata, proyek: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nama Praktikum / Proyek"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Lokasi Pengujian :</label>
                <input
                  type="text"
                  value={metadata.lokasi}
                  onChange={(e) => setMetadata({ ...metadata, lokasi: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Laboratorium Teknik Sipil"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Diuji Oleh (Praktikan) :</label>
                <input
                  type="text"
                  value={metadata.diujiOleh}
                  onChange={(e) => setMetadata({ ...metadata, diujiOleh: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nama Mahasiswa / Tim Praktikan"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Diperiksa Oleh (Asisten/Dosen) :</label>
                <input
                  type="text"
                  value={metadata.diperiksaOleh}
                  onChange={(e) => setMetadata({ ...metadata, diperiksaOleh: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nama Asisten Laboratorium"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Tanggal Pelaksanaan :</label>
                <input
                  type="date"
                  value={metadata.tanggal}
                  onChange={(e) => setMetadata({ ...metadata, tanggal: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Deskripsi Benda Uji :</label>
                <input
                  type="text"
                  value={metadata.sampelDesc}
                  onChange={(e) => setMetadata({ ...metadata, sampelDesc: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Deskripsi contoh bahan"
                />
              </div>
            </div>
          </div>

          {/* 4. Opsi Ekspor Standar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 px-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFormulas}
                onChange={(e) => setIncludeFormulas(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Sertakan Rumus Formula Excel Aktif (SUM, AVERAGE, dll.)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSignature}
                onChange={(e) => setIncludeSignature(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Sertakan Lembar Pengesahan Tanda Tangan</span>
            </label>
          </div>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={isExporting || (availableSamples && availableSamples.length > 0 && selectedSampleIds.length === 0)}
            onClick={handleExecuteExport}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md ${
              exportSuccess
                ? 'bg-emerald-600 shadow-emerald-600/30'
                : isExporting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 shadow-emerald-600/25'
            }`}
          >
            {exportSuccess ? (
              <>
                <Check size={16} strokeWidth={3} />
                <span>Berhasil Diexport!</span>
              </>
            ) : isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menyusun Spreadsheet Excel...</span>
              </>
            ) : (
              <>
                <Download size={16} strokeWidth={2.2} />
                <span>Download File Excel (.xlsx)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
