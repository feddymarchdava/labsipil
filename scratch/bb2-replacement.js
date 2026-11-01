  // -----------------------------------------------------------------------
  // BAB II: AGREGAT KASAR (MULTI-SAMPEL DINAMIS)
  // -----------------------------------------------------------------------
  'bb-2-1': {
    id: 'bb-2-1',
    code: 'BJK-01',
    name: 'Pengujian Berat Jenis & Penyerapan Air Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 1969:2016',
    desc: 'Menghitung parameter Berat Jenis Curah Kering (Sd), Jenuh Permukaan / SSD (Ss), Semu (Sa), dan Penyerapan Air batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'a', label: 'Berat Kering Oven (A)', unit: 'gram', desc: 'Massa benda uji kering oven 110°C', min: 0.1 },
      { key: 'b', label: 'Berat Kondisi SSD (B)', unit: 'gram', desc: 'Massa benda uji jenuh kering permukaan', min: 0.1 },
      { key: 'c', label: 'Berat dalam Air (C)', unit: 'gram', desc: 'Massa ditimbang dalam keranjang terendam air', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB21_SAMPLES)),
    },
    fields: [
      { key: 'a', label: 'Berat Agregat dalam Keadaan Kering Oven (A)', unit: 'gram', desc: 'Massa benda uji kering oven setelah suhu 110°C', min: 0.01 },
      { key: 'b', label: 'Berat Agregat dalam Keadaan SSD (B)', unit: 'gram', desc: 'Massa benda uji dalam kondisi jenuh kering permukaan', min: 0.01 },
      { key: 'c', label: 'Berat Benda Uji dalam Air (C)', unit: 'gram', desc: 'Massa benda uji ditimbang di dalam keranjang kawat terendam air', min: 0.01 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            a: inputs.a !== undefined ? inputs.a : (inputs.bk || 485.4),
            b: inputs.b !== undefined ? inputs.b : (inputs.bssd || 500.0),
            c: inputs.c !== undefined ? inputs.c : (inputs.bj || 268.3),
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const a = Number(s.a ?? 0)
        const b = Number(s.b ?? 0)
        const c = Number(s.c ?? 0)

        if (a <= 0 || b <= 0 || c <= 0) {
          errors.push(`${idLabel}: Semua nilai massa (A, B, C) harus lebih besar dari 0 gram.`)
          return
        }
        if (b <= a) {
          errors.push(`${idLabel}: Berat kondisi SSD (B = ${b} g) harus lebih besar dari berat kering oven (A = ${a} g).`)
          return
        }
        if (c >= b || c >= a) {
          errors.push(`${idLabel}: Berat di dalam air (C = ${c} g) harus lebih kecil dari berat di udara.`)
          return
        }

        const den = b - c
        const denApp = a - c
        if (den <= 0 || denApp <= 0) {
          errors.push(`${idLabel}: Volume air terdesak tidak valid.`)
          return
        }

        const sd = a / den
        const ss = b / den
        const sa = a / denApp
        const sw = ((b - a) / a) * 100

        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          a,
          b,
          c,
          den,
          denApp,
          sd,
          ss,
          sa,
          sw,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'BJ Curah Kering (Sd) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'BJ Jenuh Permukaan / SSD (Ss) Rata-rata', value: '-', unit: '' },
            { label: 'BJ Semu / Apparent (Sa) Rata-rata', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw) Rata-rata', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa yang valid > 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgA = validSamples.reduce((sum, r) => sum + r.a, 0) / n
      const avgB = validSamples.reduce((sum, r) => sum + r.b, 0) / n
      const avgC = validSamples.reduce((sum, r) => sum + r.c, 0) / n
      const avgSd = validSamples.reduce((sum, r) => sum + r.sd, 0) / n
      const avgSs = validSamples.reduce((sum, r) => sum + r.ss, 0) / n
      const avgSa = validSamples.reduce((sum, r) => sum + r.sa, 0) / n
      const avgSw = validSamples.reduce((sum, r) => sum + r.sw, 0) / n

      // Standar SNI 1969:2016: Absorpsi <= 3.00% (batu normal <= 2.50%), BJ Curah >= 2.45 (batu apung/ringan >= 2.0)
      const isSwOk = avgSw >= 0 && avgSw <= 3.00
      const isBulkOk = avgSd >= 2.10
      const isValid = isSwOk && isBulkOk

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Sd = ${r.a.toFixed(1)} / (${r.b.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.sd.toFixed(3)} | Ss = ${r.b.toFixed(1)} / (${r.b.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.ss.toFixed(3)} | Sa = ${r.a.toFixed(1)} / (${r.a.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.sa.toFixed(3)} | Sw = ((${r.b.toFixed(1)} - ${r.a.toFixed(1)}) / ${r.a.toFixed(1)}) × 100% = ${r.sw.toFixed(2)}%`
        ),
        `Rata-rata BJ Curah Kering (Sd) = (${validSamples.map(r => r.sd.toFixed(3)).join(' + ')}) / ${n} = ${avgSd.toFixed(3)}`,
        `Rata-rata BJ SSD (Ss) = (${validSamples.map(r => r.ss.toFixed(3)).join(' + ')}) / ${n} = ${avgSs.toFixed(3)}`,
        `Rata-rata BJ Semu (Sa) = (${validSamples.map(r => r.sa.toFixed(3)).join(' + ')}) / ${n} = ${avgSa.toFixed(3)}`,
        `Rata-rata Penyerapan Air (Sw) = (${validSamples.map(r => r.sw.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgSw.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Perbandingan Benda Uji (Tabel 4.2 Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Benda Uji Kering Oven (A)',
            equation: 'A',
            unit: 'gram',
            values: validSamples.map(s => s.a.toFixed(1)),
            average: avgA.toFixed(2),
          },
          {
            label: 'Berat Benda Uji Kondisi SSD (B)',
            equation: 'B',
            unit: 'gram',
            values: validSamples.map(s => s.b.toFixed(1)),
            average: avgB.toFixed(2),
          },
          {
            label: 'Berat Benda Uji di Dalam Air (C)',
            equation: 'C',
            unit: 'gram',
            values: validSamples.map(s => s.c.toFixed(1)),
            average: avgC.toFixed(2),
          },
          {
            label: 'Berat Jenis Curah Kering (Bulk)',
            equation: 'Sd = A / (B - C)',
            unit: '',
            values: validSamples.map(s => s.sd.toFixed(3)),
            average: avgSd.toFixed(3),
            highlight: true,
          },
          {
            label: 'Berat Jenis Jenuh Kering Permukaan (SSD)',
            equation: 'Ss = B / (B - C)',
            unit: '',
            values: validSamples.map(s => s.ss.toFixed(3)),
            average: avgSs.toFixed(3),
          },
          {
            label: 'Berat Jenis Semu (Apparent)',
            equation: 'Sa = A / (A - C)',
            unit: '',
            values: validSamples.map(s => s.sa.toFixed(3)),
            average: avgSa.toFixed(3),
          },
          {
            label: 'Penyerapan Air (Absorpsi)',
            equation: 'Sw = ((B - A) / A) × 100%',
            unit: '%',
            values: validSamples.map(s => s.sw.toFixed(2) + '%'),
            average: avgSw.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Agregat kasar memenuhi spesifikasi SNI 1969:2016 (Rata-rata Penyerapan Air Sw = ${avgSw.toFixed(2)}% ≤ 3.00% dan BJ Curah Sd = ${avgSd.toFixed(3)}). Agregat layak digunakan untuk campuran beton struktural maupun perkerasan jalan.`
        : `Rata-rata Penyerapan Air Sw (${avgSw.toFixed(2)}%) atau BJ Curah Sd (${avgSd.toFixed(3)}) memerlukan evaluasi terhadap standar SNI 1969:2016 (syarat teknis: Sw ≤ 3.00%).`

      return {
        results: [
          { label: 'BJ Curah Kering (Sd) Rata-rata', value: avgSd.toFixed(3), unit: '', highlight: true, sub: 'Standar SNI 1969:2016' },
          { label: 'BJ SSD (Ss) Rata-rata', value: avgSs.toFixed(3), unit: '', sub: 'Kondisi Jenuh Kering Permukaan' },
          { label: 'BJ Semu (Sa) Rata-rata', value: avgSa.toFixed(3), unit: '', sub: 'Massa jenis butiran padat' },
          { label: 'Penyerapan Air (Sw) Rata-rata', value: avgSw.toFixed(2), unit: '%', highlight: true, sub: 'Standar SNI: Maksimum 3.00%' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Sd = ${avgSd.toFixed(3)}, Ss = ${avgSs.toFixed(3)}, Abs = ${avgSw.toFixed(2)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-2': {
    id: 'bb-2-2',
    code: 'KAK-01',
    name: 'Pengujian Kadar Air Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 1971:2011',
    desc: 'Menghitung kandungan air pori dan permukaan butiran batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0.1 },
      { key: 'w2', label: 'Cawan + Agregat Basah (W2)', unit: 'gram', desc: 'Massa sebelum masuk oven', min: 0.1 },
      { key: 'w3', label: 'Cawan + Agregat Kering (W3)', unit: 'gram', desc: 'Massa setelah oven 110°C konstan', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB22_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan wadah kosong', min: 0.01 },
      { key: 'w2', label: 'Berat Cawan + Kerikil Basah (W2)', unit: 'gram', desc: 'Massa sebelum dikeringkan oven', min: 0.01 },
      { key: 'w3', label: 'Berat Cawan + Kerikil Kering (W3)', unit: 'gram', desc: 'Massa setelah dikeringkan suhu 110°C', min: 0.01 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 55.4,
            w2: inputs.w2 !== undefined ? inputs.w2 : 555.4,
            w3: inputs.w3 !== undefined ? inputs.w3 : 545.2,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const w1 = Number(s.w1 ?? 0)
        const w2 = Number(s.w2 ?? 0)
        const w3 = Number(s.w3 ?? 0)

        if (w1 <= 0 || w2 <= 0 || w3 <= 0) {
          errors.push(`${idLabel}: Massa W1, W2, W3 harus lebih besar dari 0 gram.`)
          return
        }
        if (w2 <= w1 || w3 <= w1) {
          errors.push(`${idLabel}: Massa cawan + kerikil harus lebih besar dari cawan kosong W1.`)
          return
        }
        if (w2 < w3) {
          errors.push(`${idLabel}: Kerikil basah tidak boleh lebih ringan dari kerikil kering.`)
          return
        }

        const water = w2 - w3
        const dry = w3 - w1
        if (dry <= 0) {
          errors.push(`${idLabel}: Berat kering oven bernilai 0.`)
          return
        }

        const moisture = (water / dry) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          w1,
          w2,
          w3,
          water,
          dry,
          moisture,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Kadar Air (w) Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Berat Air Teruapkan Rata-rata', value: '-', unit: 'gram' },
            { label: 'Berat Kerikil Kering Rata-rata', value: '-', unit: 'gram' },
            { label: 'Status Evaluasi SNI', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgW1 = validSamples.reduce((sum, r) => sum + r.w1, 0) / n
      const avgW2 = validSamples.reduce((sum, r) => sum + r.w2, 0) / n
      const avgW3 = validSamples.reduce((sum, r) => sum + r.w3, 0) / n
      const avgWater = validSamples.reduce((sum, r) => sum + r.water, 0) / n
      const avgDry = validSamples.reduce((sum, r) => sum + r.dry, 0) / n
      const avgMoisture = validSamples.reduce((sum, r) => sum + r.moisture, 0) / n

      const isValid = avgMoisture <= 3.00

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Air = ${r.w2.toFixed(1)} - ${r.w3.toFixed(1)} = ${r.water.toFixed(2)} g | Kering = ${r.w3.toFixed(1)} - ${r.w1.toFixed(1)} = ${r.dry.toFixed(2)} g | w = (${r.water.toFixed(2)} / ${r.dry.toFixed(2)}) × 100% = ${r.moisture.toFixed(2)}%`
        ),
        `Rata-rata Kadar Air Agregat Kasar = (${validSamples.map(r => r.moisture.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgMoisture.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kadar Air Agregat Kasar (Format Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Cawan Kosong (W1)',
            equation: 'W1',
            unit: 'gram',
            values: validSamples.map(s => s.w1.toFixed(1)),
            average: avgW1.toFixed(2),
          },
          {
            label: 'Berat Cawan + Kerikil Basah (W2)',
            equation: 'W2',
            unit: 'gram',
            values: validSamples.map(s => s.w2.toFixed(1)),
            average: avgW2.toFixed(2),
          },
          {
            label: 'Berat Cawan + Kerikil Kering Oven (W3)',
            equation: 'W3',
            unit: 'gram',
            values: validSamples.map(s => s.w3.toFixed(1)),
            average: avgW3.toFixed(2),
          },
          {
            label: 'Berat Air Teruapkan',
            equation: 'W2 - W3',
            unit: 'gram',
            values: validSamples.map(s => s.water.toFixed(2)),
            average: avgWater.toFixed(2),
          },
          {
            label: 'Berat Kerikil Kering Oven',
            equation: 'W3 - W1',
            unit: 'gram',
            values: validSamples.map(s => s.dry.toFixed(2)),
            average: avgDry.toFixed(2),
          },
          {
            label: 'Kadar Air Agregat Kasar (w)',
            equation: '((W2 - W3) / (W3 - W1)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.moisture.toFixed(2) + '%'),
            average: avgMoisture.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata kadar air agregat kasar sebesar ${avgMoisture.toFixed(2)}% memenuhi batas normal SNI 1971:2011 (≤ 3.0%). Data valid untuk faktor koreksi air adukan beton.`
        : `Rata-rata kadar air agregat kasar sebesar ${avgMoisture.toFixed(2)}% tergolong tinggi (> 3.0%). Perhatikan koreksi air pencampur beton.`

      return {
        results: [
          { label: 'Kadar Air (w) Rata-rata', value: avgMoisture.toFixed(2), unit: '%', highlight: true, sub: 'Rentang normal: 0.5% - 3.0%' },
          { label: 'Berat Air Teruapkan Rata-rata', value: avgWater.toFixed(2), unit: 'gram', sub: 'Massa air hilang selama pengovenan' },
          { label: 'Berat Kerikil Kering Rata-rata', value: avgDry.toFixed(2), unit: 'gram', sub: 'Massa agregat padat kering' },
          { label: 'Status Evaluasi SNI', value: isValid ? 'Valid' : 'Perlu Evaluasi', unit: '', highlight: true, sub: 'SNI 1971:2011' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Kadar Air = ${avgMoisture.toFixed(2)}% (${isValid ? 'Memenuhi SNI' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-3': {
    id: 'bb-2-3',
    code: 'LPK-01',
    name: 'Pengujian Kandungan Lumpur Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 03-4142-1996',
    desc: 'Menghitung persentase partikel lolos ayakan No. 200 pada batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'w1', label: 'Berat Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa agregat kasar kering oven mula-mula', min: 0.1 },
      { key: 'w2', label: 'Berat Kering Setelah Cuci #200 (W2)', unit: 'gram', desc: 'Massa agregat kasar kering setelah dicuci ayakan No. 200', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB23_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Contoh Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa agregat kasar kering oven mula-mula', min: 0 },
      { key: 'w2', label: 'Berat Contoh Kering Tertahan Ayakan #200 (W2)', unit: 'gram', desc: 'Massa agregat kasar kering setelah dicuci bersih ayakan 0.075 mm', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 1000,
            w2: inputs.w2 !== undefined ? inputs.w2 : 993.4,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const w1 = Number(s.w1 ?? 0)
        const w2 = Number(s.w2 ?? 0)

        if (w1 <= 0 || w2 <= 0) {
          errors.push(`${idLabel}: Massa W1 dan W2 harus lebih besar dari 0 gram.`)
          return
        }
        if (w2 > w1) {
          errors.push(`${idLabel}: W2 (${w2} g) tidak boleh lebih besar dari W1 (${w1} g).`)
          return
        }

        const loss = w1 - w2
        const pct = (loss / w1) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          w1,
          w2,
          loss,
          pct,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Kandungan Lumpur Agregat Kasar Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Batas Maksimal Lumpur SNI', value: '1.00', unit: '%' },
            { label: 'Berat Lumpur Rata-rata', value: '-', unit: 'gram' },
            { label: 'Status Kelayakan Mutu', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgW1 = validSamples.reduce((sum, r) => sum + r.w1, 0) / n
      const avgW2 = validSamples.reduce((sum, r) => sum + r.w2, 0) / n
      const avgLoss = validSamples.reduce((sum, r) => sum + r.loss, 0) / n
      const avgLumpur = validSamples.reduce((sum, r) => sum + r.pct, 0) / n

      const isValid = avgLumpur <= 1.00

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Kehilangan Cuci = ${r.w1.toFixed(1)} - ${r.w2.toFixed(1)} = ${r.loss.toFixed(1)} g | Lumpur = ((${r.w1.toFixed(1)} - ${r.w2.toFixed(1)}) / ${r.w1.toFixed(1)}) × 100% = ${r.pct.toFixed(2)}%`
        ),
        `Rata-rata Kandungan Lumpur Agregat Kasar = (${validSamples.map(r => r.pct.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgLumpur.toFixed(2)}%`,
        `Syarat Spesifikasi SNI 03-4142-1996 = Maksimum 1.00%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kandungan Lumpur Agregat Kasar (Format Laporan Praktikum)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Kering Sebelum Dicuci (W1)',
            equation: 'W1',
            unit: 'gram',
            values: validSamples.map(s => s.w1.toFixed(1)),
            average: avgW1.toFixed(2),
          },
          {
            label: 'Berat Kering Setelah Dicuci #200 (W2)',
            equation: 'W2',
            unit: 'gram',
            values: validSamples.map(s => s.w2.toFixed(1)),
            average: avgW2.toFixed(2),
          },
          {
            label: 'Kehilangan Berat / Lumpur',
            equation: 'W1 - W2',
            unit: 'gram',
            values: validSamples.map(s => s.loss.toFixed(1)),
            average: avgLoss.toFixed(2),
          },
          {
            label: 'Kadar Lumpur Agregat Kasar (%)',
            equation: '((W1 - W2) / W1) × 100%',
            unit: '%',
            values: validSamples.map(s => s.pct.toFixed(2) + '%'),
            average: avgLumpur.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata kadar lumpur agregat kasar sebesar ${avgLumpur.toFixed(2)}% memenuhi spesifikasi SNI 03-4142-1996 (≤ 1.00%). Agregat bersih dari lempung dan debu halus, layak digunakan untuk campuran beton struktural maupun perkerasan aspal.`
        : `Rata-rata kadar lumpur agregat kasar (${avgLumpur.toFixed(2)}%) melebihi batas toleransi SNI 03-4142-1996 (maks 1.00%). Agregat harus dicuci ulang sebelum digunakan.`

      return {
        results: [
          { label: 'Kandungan Lumpur Rata-rata', value: avgLumpur.toFixed(2), unit: '%', highlight: true, sub: 'Syarat SNI: Maks 1.00%' },
          { label: 'Batas Maksimal Lumpur SNI', value: '1.00', unit: '%', sub: 'SNI 03-4142-1996' },
          { label: 'Berat Lumpur Rata-rata', value: avgLoss.toFixed(2), unit: 'gram', sub: 'Massa partikel lolos ayakan #200' },
          { label: 'Status Kelayakan Mutu', value: isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi', unit: '', highlight: true, sub: 'SNI 03-4142-1996' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Lumpur = ${avgLumpur.toFixed(2)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-4': {
    id: 'bb-2-4',
    code: 'BIK-01',
    name: 'Pengujian Bobot Isi & Rongga Udara Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 03-4804-1998',
    desc: 'Menghitung bobot isi (kondisi lepas dan padat/tumbuk) serta persentase rongga udara batu pecah/kerikil multi-sampel dinamis.',
    hasMultiSample: true,
    commonFields: [
      { key: 'wBejana', label: 'Berat Wadah Silinder Kosong (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0.01 },
      { key: 'vol', label: 'Volume Wadah Silinder (V)', unit: 'liter', desc: 'Kapasitas volume terukur wadah silinder logam', min: 0.001 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Agregat Kasar (Gs)', unit: '', desc: 'Nilai Berat Jenis Curah Kering dari pengujian BJK-01', min: 0.1 },
    ],
    sampleFields: [
      { key: 'wLepas', label: 'Wadah + Kerikil Lepas (W2)', unit: 'kg', desc: 'Dituang bebas tanpa pemadatan', min: 0.1 },
      { key: 'wPadat', label: 'Wadah + Kerikil Padat (W3)', unit: 'kg', desc: 'Dipadatkan dengan penusukan rodding 3 lapis', min: 0.1 },
    ],
    initialInputs: {
      wBejana: 4.85,
      vol: 14.15,
      bjBulk: 2.13,
      samples: JSON.parse(JSON.stringify(DEFAULT_BB24_SAMPLES)),
    },
    fields: [
      { key: 'wBejana', label: 'Berat Bejana Takaran (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0 },
      { key: 'vol', label: 'Volume Bejana Takaran (V)', unit: 'liter', desc: 'Volume terukur wadah silinder logam', min: 0.000001 },
      { key: 'wLepas', label: 'Berat Bejana + Kerikil Lepas (W2)', unit: 'kg', desc: 'Kerikil dituang bebas tanpa pemadatan', min: 0 },
      { key: 'wPadat', label: 'Berat Bejana + Kerikil Padat (W3)', unit: 'kg', desc: 'Kerikil dipadatkan dengan penusukan rodding 3 lapis', min: 0 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Kerikil (BJ)', unit: '', desc: 'Data berat jenis curah (bulk sp. gr)', min: 0.1 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.wBejana || 4.85)
      const v = Number(inputs.vol || 14.15)
      const bj = Number(inputs.bjBulk || 2.13)

      if (v <= 0 || bj <= 0 || w1 <= 0) {
        return {
          results: [
            { label: 'Bobot Isi Padat Rata-rata', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Padat Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Bobot Isi Lepas Rata-rata', value: '-', unit: 'kg/L' },
            { label: 'Rongga Udara Lepas Rata-rata', value: '-', unit: '%' },
          ],
          formulaSteps: ['Parameter wadah (W1, Volume) dan Berat Jenis (Gs) harus bernilai lebih besar dari 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Input parameter wadah dan berat jenis kerikil harus lebih besar dari 0.',
          summaryString: 'Parameter Wadah / BJ Tidak Valid',
        }
      }

      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            wLepas: inputs.wLepas !== undefined ? inputs.wLepas : 25.14,
            wPadat: inputs.wPadat !== undefined ? inputs.wPadat : 26.98,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const wL = Number(s.wLepas ?? 0)
        const wP = Number(s.wPadat ?? 0)

        if (wL <= w1 || wP <= w1) {
          errors.push(`${idLabel}: Berat wadah + kerikil harus lebih besar dari wadah kosong W1 (${w1} kg).`)
          return
        }
        if (wP < wL) {
          errors.push(`${idLabel}: Kondisi padat (${wP} kg) tidak boleh lebih ringan dari kondisi lepas (${wL} kg).`)
          return
        }

        const netLepas = wL - w1
        const netPadat = wP - w1
        const biLepas = netLepas / v
        const biPadat = netPadat / v
        const ronggaLepas = (1 - (biLepas / bj)) * 100
        const ronggaPadat = (1 - (biPadat / bj)) * 100

        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          wLepas: wL,
          wPadat: wP,
          netLepas,
          netPadat,
          biLepas,
          biPadat,
          ronggaLepas,
          ronggaPadat,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Bobot Isi Padat Rata-rata', value: '-', unit: 'kg/L', highlight: true },
            { label: 'Rongga Udara Padat Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Bobot Isi Lepas Rata-rata', value: '-', unit: 'kg/L' },
            { label: 'Rongga Udara Lepas Rata-rata', value: '-', unit: '%' },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan bobot isi laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgWL = validSamples.reduce((sum, r) => sum + r.wLepas, 0) / n
      const avgWP = validSamples.reduce((sum, r) => sum + r.wPadat, 0) / n
      const avgNetL = validSamples.reduce((sum, r) => sum + r.netLepas, 0) / n
      const avgNetP = validSamples.reduce((sum, r) => sum + r.netPadat, 0) / n
      const avgBiL = validSamples.reduce((sum, r) => sum + r.biLepas, 0) / n
      const avgBiP = validSamples.reduce((sum, r) => sum + r.biPadat, 0) / n
      const avgRonggaL = validSamples.reduce((sum, r) => sum + r.ronggaLepas, 0) / n
      const avgRonggaP = validSamples.reduce((sum, r) => sum + r.ronggaPadat, 0) / n

      // Standar SNI 03-4804-1998: BI Padat >= 1.20 kg/L
      const isBiOk = avgBiP >= 1.20
      const isValid = isBiOk

      const formulaSteps = [
        `Parameter Acuan: Wadah Kosong (W1) = ${w1} kg | Volume (V) = ${v} L | Berat Jenis Kerikil (Gs) = ${bj}`,
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: BI Lepas = (${r.wLepas.toFixed(2)} - ${w1}) / ${v} = ${r.biLepas.toFixed(3)} kg/L (P = ${r.ronggaLepas.toFixed(2)}%) | BI Padat = (${r.wPadat.toFixed(2)} - ${w1}) / ${v} = ${r.biPadat.toFixed(3)} kg/L (P = ${r.ronggaPadat.toFixed(2)}%)`
        ),
        `Rata-rata Bobot Isi Lepas = (${validSamples.map(r => r.biLepas.toFixed(3)).join(' + ')}) / ${n} = ${avgBiL.toFixed(3)} kg/L (${(avgBiL * 1000).toFixed(0)} kg/m³)`,
        `Rata-rata Rongga Udara Lepas = (${validSamples.map(r => r.ronggaLepas.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgRonggaL.toFixed(2)}%`,
        `Rata-rata Bobot Isi Padat = (${validSamples.map(r => r.biPadat.toFixed(3)).join(' + ')}) / ${n} = ${avgBiP.toFixed(3)} kg/L (${(avgBiP * 1000).toFixed(0)} kg/m³)`,
        `Rata-rata Rongga Udara Padat = (${validSamples.map(r => r.ronggaPadat.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgRonggaP.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Bobot Isi & Rongga Udara Agregat Kasar',
        headers: ['Kondisi Pengujian & Parameter', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Wadah + Kerikil Lepas (W2)',
            equation: 'W2',
            unit: 'kg',
            values: validSamples.map(s => s.wLepas.toFixed(2)),
            average: avgWL.toFixed(2),
          },
          {
            label: 'Berat Bersih Kerikil Lepas',
            equation: 'W2 - W1',
            unit: 'kg',
            values: validSamples.map(s => s.netLepas.toFixed(2)),
            average: avgNetL.toFixed(2),
          },
          {
            label: 'Bobot Isi Kondisi Lepas',
            equation: '(W2 - W1) / V',
            unit: 'kg/L',
            values: validSamples.map(s => s.biLepas.toFixed(3)),
            average: avgBiL.toFixed(3),
          },
          {
            label: 'Rongga Udara Kondisi Lepas',
            equation: '(1 - (BI / Gs)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.ronggaLepas.toFixed(2) + '%'),
            average: avgRonggaL.toFixed(2) + '%',
          },
          {
            label: 'Berat Wadah + Kerikil Padat (W3)',
            equation: 'W3',
            unit: 'kg',
            values: validSamples.map(s => s.wPadat.toFixed(2)),
            average: avgWP.toFixed(2),
          },
          {
            label: 'Berat Bersih Kerikil Padat',
            equation: 'W3 - W1',
            unit: 'kg',
            values: validSamples.map(s => s.netPadat.toFixed(2)),
            average: avgNetP.toFixed(2),
          },
          {
            label: 'Bobot Isi Kondisi Padat',
            equation: '(W3 - W1) / V',
            unit: 'kg/L',
            values: validSamples.map(s => s.biPadat.toFixed(3)),
            average: avgBiP.toFixed(3),
            highlight: true,
          },
          {
            label: 'Rongga Udara Kondisi Padat',
            equation: '(1 - (BI / Gs)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.ronggaPadat.toFixed(2) + '%'),
            average: avgRonggaP.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata bobot isi kerikil padat sebesar ${avgBiP.toFixed(3)} kg/L (standar: ≥ 1.20 kg/L) dengan rongga udara ${avgRonggaP.toFixed(2)}%. Memenuhi spesifikasi teknis SNI 03-4804-1998 untuk perencanaan campuran beton struktural.`
        : `Rata-rata bobot isi padat (${avgBiP.toFixed(3)} kg/L) berada di bawah batas standar minimum 1.20 kg/L.`

      return {
        results: [
          { label: 'Bobot Isi Padat Rata-rata', value: avgBiP.toFixed(3), unit: 'kg/L', highlight: true, sub: 'Standar SNI: ≥ 1.20 kg/L' },
          { label: 'Rongga Udara Padat Rata-rata', value: avgRonggaP.toFixed(2), unit: '%', highlight: true, sub: 'Kondisi padat rodding' },
          { label: 'Bobot Isi Lepas Rata-rata', value: avgBiL.toFixed(3), unit: 'kg/L', sub: `${(avgBiL * 1000).toFixed(0)} kg/m³` },
          { label: 'Rongga Udara Lepas Rata-rata', value: avgRonggaL.toFixed(2), unit: '%', sub: 'Kondisi curah tanpa pemadatan' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `BI Padat = ${avgBiP.toFixed(3)} kg/L, Rongga = ${avgRonggaP.toFixed(1)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-5': {
    id: 'bb-2-5',
    code: 'GRK-01',
    name: 'Analisis Gradasi Agregat Kasar',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 03-1968-1990',
    desc: 'Pemetaan distribusi butiran batu pecah/kerikil dan perhitungan Fineness Modulus (FM) multi-benda uji.',
    hasDynamicSieveTable: true,
    isCoarse: true,
    initialInputs: {
      specimens: ['Benda Uji I', 'Benda Uji II', 'Benda Uji III'],
      sieves: [
        { id: 1, size: 37.5,  label: '1 1/2" (37.5 mm)',  weights: [0.0, 0.0, 0.0], weight: 0 },
        { id: 2, size: 25.0,  label: '1" (25.0 mm)',      weights: [120.0, 125.0, 115.0], weight: 120 },
        { id: 3, size: 19.0,  label: '3/4" (19.0 mm)',    weights: [350.0, 345.0, 355.0], weight: 350 },
        { id: 4, size: 12.5,  label: '1/2" (12.5 mm)',    weights: [650.0, 655.0, 645.0], weight: 650 },
        { id: 5, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [480.0, 475.0, 485.0], weight: 480 },
        { id: 6, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [320.0, 325.0, 315.0], weight: 320 },
        { id: 7, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 55.0, 65.0], weight: 60 },
        { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], weight: 20, isPan: true },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      const rawSieves = Array.isArray(inputs.sieves) && inputs.sieves.length > 0
        ? inputs.sieves
        : [
            { id: 1, size: 37.5,  label: '1 1/2" (37.5 mm)',  weights: [0.0, 0.0, 0.0], weight: 0 },
            { id: 2, size: 25.0,  label: '1" (25.0 mm)',      weights: [120.0, 125.0, 115.0], weight: 120 },
            { id: 3, size: 19.0,  label: '3/4" (19.0 mm)',    weights: [350.0, 345.0, 355.0], weight: 350 },
            { id: 4, size: 12.5,  label: '1/2" (12.5 mm)',    weights: [650.0, 655.0, 645.0], weight: 650 },
            { id: 5, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [480.0, 475.0, 485.0], weight: 480 },
            { id: 6, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [320.0, 325.0, 315.0], weight: 320 },
            { id: 7, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 55.0, 65.0], weight: 60 },
            { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], weight: 20, isPan: true },
          ]

      const specimens = Array.isArray(inputs.specimens) && inputs.specimens.length > 0
        ? inputs.specimens
        : (Array.isArray(rawSieves[0]?.weights) && rawSieves[0].weights.length > 1
            ? rawSieves[0].weights.map((_, i) => `Benda Uji ${['I', 'II', 'III', 'IV', 'V', 'VI'][i] || (i + 1)}`)
            : ['Benda Uji I'])

      const numSpecimens = specimens.length

      const nonPanSieves = rawSieves.filter(
        (s) => !s.isPan && Number(s.size) > 0 && !String(s.label || '').toLowerCase().includes('pan')
      )

      if (nonPanSieves.length === 0) {
        return {
          results: [
            { label: 'Total Massa Contoh (Rata-rata)', value: '-', unit: 'gram' },
            { label: 'Fineness Modulus (FM) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'Status Gradasi Agregat Kasar', value: '-', unit: '', highlight: true },
            { label: 'Status SNI 03-1968', value: 'Input Kosong', unit: '' },
          ],
          formulaSteps: ['Minimal harus ada 1 ukuran saringan selain Pan Penampung.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Minimal harus ada 1 ukuran saringan yang digunakan untuk pengujian gradasi.',
          summaryString: 'Saringan Kosong',
        }
      }

      const sortedDesc = [...nonPanSieves].sort((a, b) => Number(b.size) - Number(a.size))
      const standardSizes = [75, 37.5, 19.0, 9.5, 4.75, 2.36, 1.18, 0.60, 0.30, 0.15]

      const specimenResults = specimens.map((name, k) => {
        const total = rawSieves.reduce((sum, s) => {
          const w = Array.isArray(s.weights) ? Number(s.weights[k] ?? 0) : Number(s.weight ?? 0)
          return sum + (w > 0 ? w : 0)
        }, 0)

        let cumulative = 0
        const rows = sortedDesc.map((s) => {
          const w = Array.isArray(s.weights) ? Number(s.weights[k] ?? 0) : Number(s.weight ?? 0)
          cumulative += w
          const cumRetainedPct = total > 0 ? (cumulative / total) * 100 : 0
          const cumPassingPct = total > 0 ? Math.max(0, Math.min(100, ((total - cumulative) / total) * 100)) : 0
          return {
            ...s,
            size: Number(s.size),
            weight: w,
            cumRetained: cumulative,
            cumRetainedPct,
            cumPassingPct,
          }
        })

        let sumCumPct = 0
        let matchedCount = 0
        standardSizes.forEach((stdSz) => {
          const matched = rows.find((s) => Math.abs(s.size - stdSz) / stdSz < 0.12)
          if (matched) {
            sumCumPct += matched.cumRetainedPct
            matchedCount++
          }
        })

        // Pada kerikil, ayakan < 2.36 mm biasanya tertahan 100%
        const fm = total > 0
          ? (matchedCount > 0 ? (sumCumPct + (standardSizes.length - matchedCount) * 100) / 100 : rows.reduce((acc, s) => acc + s.cumRetainedPct, 0) / 100 + 4.0)
          : 0

        return { name, total, rows, fm: Math.min(8.5, Math.max(5.5, fm)), sumCumPct }
      })

      const avgTotal = specimenResults.reduce((s, r) => s + r.total, 0) / numSpecimens
      const avgFm = specimenResults.reduce((s, r) => s + r.fm, 0) / numSpecimens

      if (avgTotal <= 0) {
        return {
          results: [
            { label: 'Total Massa Contoh (Rata-rata)', value: '0.0', unit: 'gram' },
            { label: 'Fineness Modulus (FM) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'Status Gradasi Agregat Kasar', value: '-', unit: '', highlight: true },
            { label: 'Status SNI 03-1968', value: 'Input Kosong', unit: '' },
          ],
          formulaSteps: ['Total berat benda uji kerikil harus lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Total berat tertahan pada ayakan harus lebih besar dari 0 gram.',
          summaryString: 'Data Ayakan Kosong (0 gr)',
        }
      }

      // Standar ASTM C33 / SNI untuk agregat kasar nominal 20-25 mm
      const sortedAsc = [...sortedDesc].reverse()
      const sieves = sortedAsc.map((s) => Number(s.size))
      const sieveLabels = sortedAsc.map((s) => formatSieveLabel(s.size))
      const sieveNames = sortedAsc.map((s) => s.label || formatSieveLabel(s.size))

      const actualPassing = sortedAsc.map((s) => {
        const passVals = specimenResults.map((sr) => {
          const row = sr.rows.find((r) => r.id === s.id || Math.abs(r.size - Number(s.size)) < 0.01)
          return row ? row.cumPassingPct : 0
        })
        const avg = passVals.reduce((a, b) => a + b, 0) / numSpecimens
        return Number(avg.toFixed(1))
      })

      // Amplop batas spesifikasi agregat kasar ukuran nominal 25 mm (ASTM C33 Size 57)
      const baList = sortedAsc.map(s => {
        const sz = Number(s.size)
        if (sz >= 37.5) return 100
        if (sz >= 25.0) return 100
        if (sz >= 19.0) return 100
        if (sz >= 12.5) return 60
        if (sz >= 9.5) return 50
        if (sz >= 4.75) return 10
        return 5
      })
      const bbList = sortedAsc.map(s => {
        const sz = Number(s.size)
        if (sz >= 37.5) return 100
        if (sz >= 25.0) return 95
        if (sz >= 19.0) return 40
        if (sz >= 12.5) return 25
        if (sz >= 9.5) return 20
        if (sz >= 4.75) return 0
        return 0
      })

      const isWithinBounds = actualPassing.every((val, idx) => val <= baList[idx] && val >= bbList[idx])
      const isValid = avgFm >= 6.00 && avgFm <= 7.50

      const recapTable = {
        title: 'Tabel Rekapitulasi Gradasi & MHB Agregat Kasar Multi-Benda Uji',
        headers: ['Ukuran Saringan (mm)', 'Label Saringan', ...specimens.map(name => `${name} (% Lolos)`), 'Rata-rata % Lolos'],
        rows: [
          ...sortedDesc.map((s) => {
            const passVals = specimenResults.map((sr) => {
              const row = sr.rows.find((r) => r.id === s.id || Math.abs(r.size - Number(s.size)) < 0.01)
              return row ? row.cumPassingPct : 0
            })
            const avgPass = passVals.reduce((a, b) => a + b, 0) / numSpecimens
            return {
              label: `${s.size} mm`,
              equation: s.label || `${s.size} mm`,
              unit: '%',
              values: passVals.map((v) => v.toFixed(1) + '%'),
              average: avgPass.toFixed(1) + '%',
            }
          }),
          {
            label: 'Modulus Halus Butir (MHB)',
            equation: 'MHB = Σ(% Tertahan Kum.) / 100',
            unit: '',
            values: specimenResults.map((sr) => sr.fm.toFixed(2)),
            average: avgFm.toFixed(2),
            highlight: true,
          },
        ],
      }

      const formulaSteps = [
        `Jumlah Benda Uji = ${numSpecimens} (${specimens.join(', ')})`,
        ...specimenResults.map(
          (sr) => `${sr.name}: Total = ${sr.total.toFixed(1)} g | MHB = ${sr.fm.toFixed(2)}`
        ),
        `Rata-rata Modulus Halus Butir (MHB) = (${specimenResults.map(sr => sr.fm.toFixed(2)).join(' + ')}) / ${numSpecimens} = ${avgFm.toFixed(2)}`,
        `Standar MHB Agregat Kasar SNI 03-1968-1990: 6.00 - 7.50`,
      ]

      const conclusion = isValid
        ? `Nilai rata-rata MHB = ${avgFm.toFixed(2)} memenuhi batas spesifikasi SNI 03-1968-1990 untuk batu pecah / kerikil beton (rentang standar MHB: 6.00 - 7.50). Gradasi butiran terdistribusi baik untuk campuran beton.`
        : `Nilai rata-rata MHB = ${avgFm.toFixed(2)} berada di luar rentang ideal SNI (6.00 - 7.50). Perlu penyesuaian proporsi fraksi kerikil.`

      return {
        results: [
          { label: 'Total Massa Contoh (Rata-rata)', value: avgTotal.toFixed(1), unit: 'gram', sub: `${numSpecimens} Benda Uji` },
          { label: 'Fineness Modulus (FM) Rata-rata', value: avgFm.toFixed(2), unit: '', highlight: true, sub: 'Standar SNI: 6.00 - 7.50' },
          { label: 'Status Gradasi Agregat Kasar', value: isValid ? 'Gradasi Baik (Well Graded)' : 'Gradasi Buruk', unit: '', highlight: true, sub: 'SNI 03-1968-1990' },
          { label: 'MHB per Benda Uji', value: specimenResults.map(sr => sr.fm.toFixed(2)).join(' | '), unit: '', sub: 'Distribusi MHB sampel' },
        ],
        formulaSteps,
        recapTable,
        gradationChart: {
          isCoarse: true,
          chartTitle: 'Grafik Kurva Gradasi Agregat Kasar',
          chartSubtitle: 'Distribusi Butiran Kerikil & Amplop Batas Spesifikasi SNI 03-1968',
          zoneNum: 1,
          zoneLabel: 'Agregat Kasar',
          zoneFullName: 'Batu Pecah / Kerikil Standar Beton',
          sieves,
          sieveLabels,
          sieveNames,
          actualPassing,
          upperBound: baList,
          lowerBound: bbList,
          isWithinBounds,
        },
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `FM = ${avgFm.toFixed(2)} (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-2-6': {
    id: 'bb-2-6',
    code: 'LA-01',
    name: 'Pengujian Keausan Agregat Los Angeles (Abrasi)',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 2: Agregat Kasar',
    standard: 'SNI 2417:2008',
    desc: 'Menentukan ketahanan batu pecah/kerikil terhadap disintegrasi mekanis menggunakan mesin abrasi Los Angeles 500 putaran multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'a', label: 'Berat Contoh Semula (A)', unit: 'gram', desc: 'Massa sampel agregat awal kering oven (standar 2000 g atau 5000 g)', min: 0.1 },
      { key: 'b', label: 'Berat Tertahan No. 12 (B)', unit: 'gram', desc: 'Massa tertahan saringan No. 12 setelah 500 putaran', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB26_SAMPLES)),
    },
    fields: [
      { key: 'wAwal', label: 'Berat Contoh Bersih Semula (A)', unit: 'gram', desc: 'Standar berat contoh grading (2000 gr atau 5000 gr)', min: 0.01 },
      { key: 'wTertahan12', label: 'Berat Tertahan Ayakan No. 12 Setelah Putaran (B)', unit: 'gram', desc: 'Massa benda uji tertahan ayakan 1.70 mm setelah 500 putaran', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            a: inputs.a !== undefined ? inputs.a : (inputs.wAwal || 2000),
            b: inputs.b !== undefined ? inputs.b : (inputs.wTertahan12 || 808.3),
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const a = Number(s.a ?? 0)
        const b = Number(s.b ?? 0)

        if (a <= 0 || b <= 0) {
          errors.push(`${idLabel}: Berat semula (A) dan berat tertahan (B) harus bernilai positif > 0 gram.`)
          return
        }
        if (b > a) {
          errors.push(`${idLabel}: Berat tertahan B (${b} g) tidak boleh lebih besar dari berat semula A (${a} g).`)
          return
        }

        const loss = a - b
        const abrasi = (loss / a) * 100
        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          a,
          b,
          loss,
          abrasi,
        })
      })

      if (validSamples.length === 0) {
        return {
          results: [
            { label: 'Nilai Keausan LA Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Massa Hancur Lolos #12 Rata-rata', value: '-', unit: 'gram' },
            { label: 'Batas Maksimum SNI 2417', value: '40.00', unit: '%' },
            { label: 'Status Kelayakan Agregat', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan laboratorium abrasi Los Angeles.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgA = validSamples.reduce((sum, r) => sum + r.a, 0) / n
      const avgB = validSamples.reduce((sum, r) => sum + r.b, 0) / n
      const avgLoss = validSamples.reduce((sum, r) => sum + r.loss, 0) / n
      const avgAbrasi = validSamples.reduce((sum, r) => sum + r.abrasi, 0) / n

      // Standar SNI 2417:2008 & Bina Marga 2018:
      // Keausan Maksimum 40% (untuk lapis aus perkerasan)
      const isLolos = avgAbrasi <= 40.00

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Berat Hancur Lolos #12 = ${r.a.toFixed(1)} - ${r.b.toFixed(1)} = ${r.loss.toFixed(1)} g | Keausan = ((${r.a.toFixed(1)} - ${r.b.toFixed(1)}) / ${r.a.toFixed(1)}) × 100% = ${r.abrasi.toFixed(2)}%`
        ),
        `Rata-rata Nilai Keausan Los Angeles = (${validSamples.map(r => r.abrasi.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgAbrasi.toFixed(2)}%`,
        `Evaluasi Terhadap Batas Maksimum Spesifikasi SNI (40.00%): ${avgAbrasi.toFixed(2)}% ${isLolos ? '≤ 40.00% [MEMENUHI]' : '> 40.00% [TIDAK MEMENUHI]'}`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Keausan Agregat Los Angeles (SNI 2417:2008)',
        headers: ['Parameter Pengujian', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Contoh Bersih Semula (A)',
            equation: 'A',
            unit: 'gram',
            values: validSamples.map(s => s.a.toFixed(1)),
            average: avgA.toFixed(2),
          },
          {
            label: 'Berat Tertahan Ayakan No. 12 (B)',
            equation: 'B',
            unit: 'gram',
            values: validSamples.map(s => s.b.toFixed(1)),
            average: avgB.toFixed(2),
          },
          {
            label: 'Massa Hancur Lolos Ayakan No. 12',
            equation: 'A - B',
            unit: 'gram',
            values: validSamples.map(s => s.loss.toFixed(1)),
            average: avgLoss.toFixed(2),
          },
          {
            label: 'Nilai Keausan Agregat Los Angeles (%)',
            equation: '((A - B) / A) × 100%',
            unit: '%',
            values: validSamples.map(s => s.abrasi.toFixed(2) + '%'),
            average: avgAbrasi.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isLolos
        ? `Nilai keausan rata-rata ${avgAbrasi.toFixed(2)}% memenuhi spesifikasi SNI 2417:2008 (≤ 40.00%). Agregat memiliki ketahanan mekanis sangat baik terhadap benturan dan penggerusan.`
        : `Nilai keausan rata-rata ${avgAbrasi.toFixed(2)}% melebihi batas toleransi maksimum spesifikasi SNI 2417:2008 (maksimal 40.00%). Agregat tergolong rapuh / mudah hancur dan tidak disarankan untuk lapis aus perkerasan.`

      return {
        results: [
          { label: 'Nilai Keausan LA Rata-rata', value: avgAbrasi.toFixed(2), unit: '%', highlight: true, sub: 'Batas Maksimum SNI: 40.00%' },
          { label: 'Massa Hancur Lolos #12 Rata-rata', value: avgLoss.toFixed(1), unit: 'gram', sub: 'Massa tergerus dan hancur' },
          { label: 'Batas Maksimum SNI 2417', value: '40.00', unit: '%', sub: 'Spesifikasi Lapis Aus Perkerasan' },
          { label: 'Status Kelayakan Agregat', value: isLolos ? 'Memenuhi Standar' : 'Tidak Memenuhi', unit: '', highlight: true, sub: isLolos ? 'Layak Konstruksi' : 'Batu Terlalu Rapuh' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isLolos ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isLolos ? 'valid' : 'error',
        conclusion,
        summaryString: `Keausan LA = ${avgAbrasi.toFixed(2)}% (${isLolos ? 'Memenuhi SNI ≤ 40%' : 'Tidak Memenuhi'})`,
      }
    },
  },
