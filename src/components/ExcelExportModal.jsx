import { useEffect, useState } from 'react'
import { FileSpreadsheet, X, Check, Download, CheckSquare, Calendar, Layers, CheckCircle2, AlertTriangle } from 'lucide-react'
import { exportLabReport } from '../utils/excelExporter.js'
import { getExportSamples, resolveRecordConfig } from '../utils/excelReportData.js'

export default function ExcelExportModal({ isOpen, ...props }) {
  return isOpen ? <ExcelExportForm {...props} /> : null
}

function ExcelExportForm({ onClose, savedTests = [], calculatorRegistry = {} }) {
  const isDashboardEmpty = !Array.isArray(savedTests) || savedTests.length === 0
  const [selectedRecordId, setSelectedRecordId] = useState(savedTests?.[0]?.id || '')
  const selectedRecord = isDashboardEmpty ? null : savedTests.find((record) => record.id === selectedRecordId) || savedTests[0]
  const activeConfig = resolveRecordConfig(selectedRecord, calculatorRegistry)
  const activeInputs = selectedRecord?.inputs ?? {}
  const availableSamples = getExportSamples(activeConfig?.id, activeInputs)
  const sampleIds = availableSamples.map((sample) => sample.id)
  const [selection, setSelection] = useState(null)
  const selectedSampleIds = selection && selection.recordId === selectedRecord?.id ? selection.ids : sampleIds
  const [metadata, setMetadata] = useState({ tanggal: new Date().toLocaleDateString('sv-SE'), sampelDesc: null })
  const description = metadata.sampelDesc ?? [activeConfig?.category, selectedRecord?.name].filter(Boolean).join(' • ')
  // Opsi Formula Excel
  const [includeFormulas, setIncludeFormulas] = useState(true)

  // Status Download
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  useEffect(() => {
    if (!exportSuccess) return
    const timer = setTimeout(onClose, 1200)
    return () => clearTimeout(timer)
  }, [exportSuccess, onClose])

  const selectRecord = (id) => {
    setSelectedRecordId(id)
    setSelection(null)
    setMetadata((previous) => ({ ...previous, sampelDesc: null }))
  }

  const handleToggleSample = (id) => {
    const ids = selectedSampleIds.includes(id) ? selectedSampleIds.filter((sampleId) => sampleId !== id) : [...selectedSampleIds, id]
    setSelection({ recordId: selectedRecord.id, ids })
  }

  const handleToggleSelectAll = () => {
    const ids = selectedSampleIds.length === sampleIds.length ? [] : sampleIds
    setSelection({ recordId: selectedRecord.id, ids })
  }
  // Eksekusi Download Excel
  const handleExecuteExport = async () => {
    if (isDashboardEmpty || !selectedRecord || !activeConfig) {
      alert('Belum ada data pengujian di Dashboard Utama untuk diekspor.')
      return
    }

    if (availableSamples && availableSamples.length > 0 && selectedSampleIds.length === 0) {
      alert('Pilih minimal satu sampel pengujian untuk disertakan dalam file Excel.')
      return
    }

    try {
      setIsExporting(true)
      await exportLabReport({
        testConfig: activeConfig,
        inputs: activeInputs,
        calcOutput: selectedRecord.calcOutput ?? { conclusion: selectedRecord.conclusion || selectedRecord.notes || selectedRecord.summary },
        metadata: { ...metadata, sampelDesc: description },
        selectedSampleIds: availableSamples.length ? selectedSampleIds : null,
        options: {
          includeFormulas,
        },
      })
      setExportSuccess(true)
    } catch (err) {
      console.error('Gagal mengekspor file Excel:', err)
      alert(`Terjadi kesalahan saat membuat file Excel: ${err.message}`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div
      className="excel-export-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="excel-export-modal-card"
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          maxWidth: '540px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          boxSizing: 'border-box',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-export-title"
      >
        {/* Header Modal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: '1px solid #E2E8F0',
            background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #F8FAFC 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#16A34A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(22, 163, 74, 0.25)',
                flexShrink: 0,
              }}
            >
              <FileSpreadsheet size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3
                id="modal-export-title"
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#0F172A',
                  lineHeight: 1.3,
                }}
              >
                Export Blangko Laboratorium ke Excel
              </h3>
              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: '12px',
                  color: '#64748B',
                  fontWeight: '500',
                }}
              >
                Tabel pengukuran, rumus sel, dan grafik yang tersedia (.xlsx)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Dialog"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#F1F5F9',
              border: 'none',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#E2E8F0')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#F1F5F9')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Modal (Scrollable) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxSizing: 'border-box',
          }}
        >
          {isDashboardEmpty ? (
            /* Kotak Informasi Jika Dashboard Utama Kosong */
            <div
              style={{
                padding: '24px 16px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px dashed #CBD5E1',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#FEF2F2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlertTriangle size={22} />
              </div>
              <div style={{ maxWidth: '400px' }}>
                <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block', marginBottom: '4px' }}>
                  Tidak Ada Data Pengujian di Dashboard Utama
                </strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                  Belum ada data pengujian di Dashboard Utama. Silakan hitung dan simpan hasil pengujian dari modul terlebih dahulu.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* 1. Pemilihan Modul Pengujian (HANYA DARI DATA DASHBOARD UTAMA) */}
              <div
                style={{
                  background: '#F8FAFC',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label
                    htmlFor="select-module"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#1E293B',
                      margin: 0,
                    }}
                  >
                    <Layers size={15} style={{ color: '#2563EB' }} />
                    <span>Pilih Modul Pengujian :</span>
                  </label>
                  {selectedRecord?.standard && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: '#EFF6FF',
                        color: '#1E40AF',
                        border: '1px solid #BFDBFE',
                      }}
                    >
                      {selectedRecord.standard}
                    </span>
                  )}
                </div>

                <select
                  id="select-module"
                  value={selectedRecord?.id || ''}
                  onChange={(e) => selectRecord(e.target.value)}
                  className="excel-export-input"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#0F172A',
                    background: '#FFFFFF',
                    boxSizing: 'border-box',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {savedTests.map((rec) => (
                    <option key={rec.id} value={rec.id}>
                      [{rec.id}] {rec.name} ({rec.standard || 'SNI'})
                    </option>
                  ))}
                </select>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                  <span>Kategori: <strong style={{ color: '#334155' }}>{selectedRecord?.category || '-'}</strong></span>
                  <span>Waktu Input: <strong style={{ color: '#334155' }}>{selectedRecord?.time || '-'}</strong></span>
                </div>
              </div>

              {/* 2. Pemilihan Benda Uji / Sampel (Jika Multi-Sampel) */}
              {availableSamples && availableSamples.length > 0 ? (
                <div
                  style={{
                    background: '#F8FAFC',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#1E293B',
                      }}
                    >
                      <CheckSquare size={15} style={{ color: '#16A34A' }} />
                      <span>Pilih Sampel yang Diexport :</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleSelectAll}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#2563EB',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      {selectedSampleIds.length === availableSamples.length ? 'Batal Pilih Semua' : 'Pilih Semua Sampel'}
                    </button>
                  </div>

                  <div className="excel-export-samples-grid">
                    {availableSamples.map((sample, idx) => {
                      const sId = sample.id ?? idx + 1
                      const isChecked = selectedSampleIds.includes(sId)
                      return (
                        <label
                          key={sId}
                          className={`excel-export-sample-pill ${isChecked ? 'active' : ''}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: isChecked ? '1px solid #86EFAC' : '1px solid #E2E8F0',
                            background: isChecked ? '#F0FDF4' : '#FFFFFF',
                            color: isChecked ? '#15803D' : '#1E293B',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: isChecked ? '600' : '500',
                            transition: 'all 0.15s ease',
                            boxSizing: 'border-box',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSample(sId)}
                            style={{
                              accentColor: '#16A34A',
                              cursor: 'pointer',
                              margin: 0,
                            }}
                          />
                          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {sample.name || `Sampel #${sId}`}
                          </span>
                        </label>
                      )
                    })}
                  </div>

                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Terpilih: <strong style={{ color: '#15803D' }}>{selectedSampleIds.length}</strong> dari {availableSamples.length} sampel pengujian.
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#F0FDF4',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #BBF7D0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '12px',
                    color: '#166534',
                    lineHeight: 1.4,
                  }}
                >
                  <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0 }} />
                  <span>
                    Seluruh baris parameter teknis, formula kalkulasi aktif, dan batas toleransi pengujian akan disertakan secara otomatis.
                  </span>
                </div>
              )}

              {/* 3. Informasi Blangko Pengujian */}
              <div
                style={{
                  background: '#F8FAFC',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#1E293B',
                  }}
                >
                  <Calendar size={15} style={{ color: '#2563EB' }} />
                  <span>Informasi Blangko Pengujian :</span>
                </span>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#475569',
                        marginBottom: '4px',
                      }}
                    >
                      Tanggal Pelaksanaan :
                    </label>
                    <input
                      type="date"
                      value={metadata.tanggal}
                      onChange={(e) => setMetadata({ ...metadata, tanggal: e.target.value })}
                      className="excel-export-input"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#0F172A',
                        background: '#FFFFFF',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#475569',
                        marginBottom: '4px',
                      }}
                    >
                      Deskripsi / Bahan Benda Uji :
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setMetadata({ ...metadata, sampelDesc: e.target.value })}
                      placeholder="misal: Bahan Bangunan • Bab 1: Agregat Halus"
                      className="excel-export-input"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#0F172A',
                        background: '#FFFFFF',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Opsi Ekspor Standar */}
              <div style={{ padding: '0 4px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#475569',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={includeFormulas}
                    onChange={(e) => setIncludeFormulas(e.target.checked)}
                    style={{
                      accentColor: '#2563EB',
                      cursor: 'pointer',
                      margin: 0,
                    }}
                  />
                  <span>Sertakan rumus Excel aktif</span>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Footer Tombol Aksi */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAFC',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="excel-export-btn-cancel"
            style={{
              background: '#F1F5F9',
              color: '#475569',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'background 0.15s ease',
            }}
          >
            {isDashboardEmpty ? 'Tutup' : 'Batal'}
          </button>

          <button
            type="button"
            disabled={isDashboardEmpty || isExporting || (availableSamples && availableSamples.length > 0 && selectedSampleIds.length === 0)}
            onClick={handleExecuteExport}
            className="excel-export-btn-download"
            style={{
              background: isDashboardEmpty ? '#94A3B8' : (exportSuccess ? '#15803D' : (isExporting ? '#94A3B8' : '#16A34A')),
              color: '#FFFFFF',
              padding: '10px 22px',
              borderRadius: '8px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              cursor: (isDashboardEmpty || isExporting) ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              boxShadow: isDashboardEmpty ? 'none' : '0 4px 6px -1px rgba(22, 163, 74, 0.25)',
              transition: 'all 0.15s ease',
            }}
            title={isDashboardEmpty ? 'Belum ada data pengujian tersimpan di Dashboard Utama' : ''}
          >
            {exportSuccess ? (
              <>
                <Check size={16} strokeWidth={3} />
                <span>Berhasil Diexport!</span>
              </>
            ) : isExporting ? (
              <>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid #FFFFFF',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
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
