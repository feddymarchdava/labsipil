  // -----------------------------------------------------------------------
  // BAB I: AGREGAT HALUS (MULTI-SAMPEL DINAMIS)
  // -----------------------------------------------------------------------
  'bb-1-1': {
    id: 'bb-1-1',
    code: 'BJ-01',
    name: 'Pengujian Berat Jenis & Penyerapan Air Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 1970:2016',
    desc: 'Menghitung Berat Jenis Curah Kering (Sd), Berat Jenis Jenuh Kering Permukaan / SSD (Ss), Berat Jenis Semu (Sa), dan Penyerapan Air (Sw) pasir menggunakan metode piknometer multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 's', label: 'Berat SSD (S)', unit: 'gram', desc: 'Massa benda uji SSD (standar 500 gr)', min: 0.1 },
      { key: 'a', label: 'Berat Kering Oven (A)', unit: 'gram', desc: 'Massa benda uji kering oven 110°C', min: 0.1 },
      { key: 'b', label: 'Piknometer + Air (B)', unit: 'gram', desc: 'Massa piknometer berisi air pada 25°C', min: 0.1 },
      { key: 'c', label: 'Piknometer + SSD + Air (C)', unit: 'gram', desc: 'Massa piknometer + contoh SSD + air', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB11_SAMPLES)),
    },
    fields: [
      { key: 's', label: 'Berat Benda Uji Kondisi SSD (S)', unit: 'gram', desc: 'Massa contoh pasir SSD standar 500 gr', min: 0 },
      { key: 'a', label: 'Berat Benda Uji Kering Oven (A)', unit: 'gram', desc: 'Massa contoh pasir kering oven setelah 110°C', min: 0 },
      { key: 'b', label: 'Berat Piknometer Berisi Air (B)', unit: 'gram', desc: 'Massa piknometer diisi air murni 25°C', min: 0 },
      { key: 'c', label: 'Berat Piknometer + Benda Uji SSD + Air (C)', unit: 'gram', desc: 'Massa total piknometer + contoh SSD + air', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            s: inputs.s !== undefined ? inputs.s : 500,
            a: inputs.a !== undefined ? inputs.a : (inputs.bk || 489.6),
            b: inputs.b !== undefined ? inputs.b : 664.2,
            c: inputs.c !== undefined ? inputs.c : (inputs.bt || 979.2),
          }]

      // Validasi dan pemrosesan per sampel
      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const sm = Number(s.s ?? 500)
        const a = Number(s.a ?? 0)
        const b = Number(s.b ?? 0)
        const c = Number(s.c ?? 0)

        if (a <= 0 || b <= 0 || sm <= 0 || c <= 0) {
          errors.push(`${idLabel}: Semua nilai massa (A, B, S, C) harus lebih besar dari 0 gram.`)
          return
        }
        if (c <= b) {
          errors.push(`${idLabel}: Nilai C (${c} g) tidak logis (harus lebih besar dari B = ${b} g).`)
          return
        }
        if (a > sm) {
          errors.push(`${idLabel}: Berat kering oven A (${a} g) tidak boleh melebihi berat kondisi SSD S (${sm} g).`)
          return
        }
        const den = b + sm - c
        const denApp = b + a - c
        if (den <= 0 || denApp <= 0) {
          errors.push(`${idLabel}: Nilai kapasitas piknometer tidak fisis (B + S - C = ${den.toFixed(2)} <= 0).`)
          return
        }

        const sd = a / den
        const ss = sm / den
        const sa = a / denApp
        const sw = ((sm - a) / a) * 100

        validSamples.push({
          id: s.id || idx + 1,
          name: idLabel,
          s: sm,
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
            { label: 'BJ Curah SSD (Ss) Rata-rata', value: '-', unit: '' },
            { label: 'BJ Semu (Sa) Rata-rata', value: '-', unit: '' },
            { label: 'Penyerapan Air (Sw) Rata-rata', value: '-', unit: '%', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa yang valid > 0.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan piknometer laboratorium.',
          summaryString: 'Input Belum Lengkap / Tidak Wajar',
        }
      }

      const n = validSamples.length
      const avgA = validSamples.reduce((sum, r) => sum + r.a, 0) / n
      const avgS = validSamples.reduce((sum, r) => sum + r.s, 0) / n
      const avgB = validSamples.reduce((sum, r) => sum + r.b, 0) / n
      const avgC = validSamples.reduce((sum, r) => sum + r.c, 0) / n
      const avgSd = validSamples.reduce((sum, r) => sum + r.sd, 0) / n
      const avgSs = validSamples.reduce((sum, r) => sum + r.ss, 0) / n
      const avgSa = validSamples.reduce((sum, r) => sum + r.sa, 0) / n
      const avgSw = validSamples.reduce((sum, r) => sum + r.sw, 0) / n

      // Evaluasi SNI 1970:2016
      // - BJ Curah Kering (Sd): 2.50 - 2.70
      // - Penyerapan Air (Sw): Maksimal 3.0%
      const isSdOk = avgSd >= 2.50 && avgSd <= 2.75
      const isSwOk = avgSw >= 0 && avgSw <= 3.00
      const isValid = isSdOk && isSwOk

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Sd = ${r.a.toFixed(1)} / (${r.b.toFixed(1)} + ${r.s.toFixed(1)} - ${r.c.toFixed(1)}) = ${r.sd.toFixed(3)} | Ss = ${r.ss.toFixed(3)} | Sa = ${r.sa.toFixed(3)} | Sw = ((${r.s.toFixed(1)} - ${r.a.toFixed(1)}) / ${r.a.toFixed(1)}) × 100% = ${r.sw.toFixed(2)}%`
        ),
        `Rata-rata BJ Curah (Sd) = (${validSamples.map(r => r.sd.toFixed(3)).join(' + ')}) / ${n} = ${avgSd.toFixed(3)}`,
        `Rata-rata BJ SSD (Ss) = (${validSamples.map(r => r.ss.toFixed(3)).join(' + ')}) / ${n} = ${avgSs.toFixed(3)}`,
        `Rata-rata BJ Semu (Sa) = (${validSamples.map(r => r.sa.toFixed(3)).join(' + ')}) / ${n} = ${avgSa.toFixed(3)}`,
        `Rata-rata Penyerapan Air (Sw) = (${validSamples.map(r => r.sw.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgSw.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Perbandingan Benda Uji (Tabel 3.2 Laporan Praktikum)',
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
            label: 'Berat Benda Uji Kondisi SSD (S)',
            equation: 'S',
            unit: 'gram',
            values: validSamples.map(s => s.s.toFixed(1)),
            average: avgS.toFixed(2),
          },
          {
            label: 'Berat Piknometer + Air (B)',
            equation: 'B',
            unit: 'gram',
            values: validSamples.map(s => s.b.toFixed(1)),
            average: avgB.toFixed(2),
          },
          {
            label: 'Berat Piknometer + SSD + Air (C)',
            equation: 'C',
            unit: 'gram',
            values: validSamples.map(s => s.c.toFixed(1)),
            average: avgC.toFixed(2),
          },
          {
            label: 'Berat Jenis Curah Kering (Bulk)',
            equation: 'Sd = A / (B + S - C)',
            unit: '',
            values: validSamples.map(s => s.sd.toFixed(3)),
            average: avgSd.toFixed(3),
            highlight: true,
          },
          {
            label: 'Berat Jenis Curah SSD',
            equation: 'Ss = S / (B + S - C)',
            unit: '',
            values: validSamples.map(s => s.ss.toFixed(3)),
            average: avgSs.toFixed(3),
          },
          {
            label: 'Berat Jenis Semu (Apparent)',
            equation: 'Sa = A / (B + A - C)',
            unit: '',
            values: validSamples.map(s => s.sa.toFixed(3)),
            average: avgSa.toFixed(3),
          },
          {
            label: 'Penyerapan Air (Absorption)',
            equation: 'Sw = ((S - A) / A) × 100%',
            unit: '%',
            values: validSamples.map(s => s.sw.toFixed(2) + '%'),
            average: avgSw.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Memenuhi spesifikasi SNI 1970:2016 (Rata-rata BJ Curah Kering Sd = ${avgSd.toFixed(3)} [standar 2.50 - 2.70] dan Penyerapan Air Sw = ${avgSw.toFixed(2)}% [maks 3.0%]). Agregat halus layak digunakan untuk campuran beton struktural maupun perkerasan jalan.`
        : `Rata-rata Penyerapan Air Sw (${avgSw.toFixed(2)}%) atau BJ Curah Sd (${avgSd.toFixed(3)}) berada di luar rentang standar SNI 1970:2016 (syarat teknis: Sd 2.50 - 2.70 dan Sw ≤ 3.0%). Perhatikan koreksi air pencampur beton.`

      return {
        results: [
          { label: 'BJ Curah Kering (Sd) Rata-rata', value: avgSd.toFixed(3), unit: '', highlight: true, sub: 'Standar SNI: 2.50 - 2.70' },
          { label: 'BJ Curah SSD (Ss) Rata-rata', value: avgSs.toFixed(3), unit: '', sub: 'Kondisi Jenuh Kering Permukaan' },
          { label: 'BJ Semu (Sa) Rata-rata', value: avgSa.toFixed(3), unit: '', sub: 'Massa jenis butiran padat' },
          { label: 'Penyerapan Air (Sw) Rata-rata', value: avgSw.toFixed(2), unit: '%', highlight: true, sub: 'Standar SNI: Maksimum 3.00%' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Sd = ${avgSd.toFixed(3)}, Ss = ${avgSs.toFixed(3)}, Sa = ${avgSa.toFixed(3)}, Sw = ${avgSw.toFixed(2)}% (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-1-2': {
    id: 'bb-1-2',
    code: 'KA-01',
    name: 'Pengujian Kadar Air Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 1971:2011',
    desc: 'Menghitung persentase kandungan air bebas di dalam pori dan permukaan butiran pasir melalui pengeringan oven multi-sampel dinamis.',
    hasMultiSample: true,
    sampleFields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0.1 },
      { key: 'w2', label: 'Cawan + Pasir Basah (W2)', unit: 'gram', desc: 'Massa sebelum masuk oven', min: 0.1 },
      { key: 'w3', label: 'Cawan + Pasir Kering (W3)', unit: 'gram', desc: 'Massa setelah oven 110°C konstan', min: 0.1 },
    ],
    initialInputs: {
      samples: JSON.parse(JSON.stringify(DEFAULT_BB12_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Cawan Kosong (W1)', unit: 'gram', desc: 'Massa cawan timbang bersih', min: 0 },
      { key: 'w2', label: 'Berat Cawan + Contoh Pasir Basah (W2)', unit: 'gram', desc: 'Massa sebelum masuk oven', min: 0 },
      { key: 'w3', label: 'Berat Cawan + Contoh Pasir Kering (W3)', unit: 'gram', desc: 'Massa setelah oven 110°C', min: 0 },
    ],
    calculate: (inputs) => {
      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 15.3,
            w2: inputs.w2 !== undefined ? inputs.w2 : 115.3,
            w3: inputs.w3 !== undefined ? inputs.w3 : 111.4,
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
          errors.push(`${idLabel}: Massa cawan + pasir harus lebih besar dari cawan kosong W1.`)
          return
        }
        if (w2 < w3) {
          errors.push(`${idLabel}: Pasir basah (W2 = ${w2} g) tidak boleh lebih ringan dari pasir kering (W3 = ${w3} g).`)
          return
        }

        const water = w2 - w3
        const dry = w3 - w1
        if (dry <= 0) {
          errors.push(`${idLabel}: Massa pasir kering bernilai 0.`)
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
            { label: 'Berat Pasir Kering Rata-rata', value: '-', unit: 'gram' },
            { label: 'Status Evaluasi SNI', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data penimbangan valid.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: errors.join(' ') || 'Silakan lengkapi pembacaan data penimbangan cawan laboratorium.',
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

      const isHigh = avgMoisture > 10.0
      const isExtreme = avgMoisture > 15.0
      let status = 'Valid'
      let verdictClass = 'valid'
      if (isExtreme) {
        status = 'Input Tidak Wajar'
        verdictClass = 'error'
      } else if (isHigh) {
        status = 'Perlu Evaluasi'
        verdictClass = 'warning'
      }

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Air = ${r.w2.toFixed(1)} - ${r.w3.toFixed(1)} = ${r.water.toFixed(2)} g | Kering = ${r.w3.toFixed(1)} - ${r.w1.toFixed(1)} = ${r.dry.toFixed(2)} g | w = (${r.water.toFixed(2)} / ${r.dry.toFixed(2)}) × 100% = ${r.moisture.toFixed(2)}%`
        ),
        `Rata-rata Kadar Air (w) = (${validSamples.map(r => r.moisture.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgMoisture.toFixed(2)}%`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kadar Air Agregat Halus (Format Laporan Praktikum)',
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
            label: 'Berat Cawan + Pasir Basah (W2)',
            equation: 'W2',
            unit: 'gram',
            values: validSamples.map(s => s.w2.toFixed(1)),
            average: avgW2.toFixed(2),
          },
          {
            label: 'Berat Cawan + Pasir Kering Oven (W3)',
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
            label: 'Berat Pasir Kering Oven',
            equation: 'W3 - W1',
            unit: 'gram',
            values: validSamples.map(s => s.dry.toFixed(2)),
            average: avgDry.toFixed(2),
          },
          {
            label: 'Kadar Air Pasir (w)',
            equation: '((W2 - W3) / (W3 - W1)) × 100%',
            unit: '%',
            values: validSamples.map(s => s.moisture.toFixed(2) + '%'),
            average: avgMoisture.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = status === 'Valid'
        ? `Rata-rata kadar air pasir sebesar ${avgMoisture.toFixed(2)}% memenuhi batas normal SNI 1971:2011 (≤ 10.0%). Data valid dan siap digunakan sebagai faktor koreksi takaran air pencampur beton.`
        : isExtreme
        ? `Kadar air pasir sebesar ${avgMoisture.toFixed(2)}% tergolong nilai ekstrem (> 15.0%). Periksa kembali pembacaan timbangan atau kondisi sampel basah.`
        : `Kadar air pasir sebesar ${avgMoisture.toFixed(2)}% berada di atas rentang umum (3% - 10%). Diperlukan koreksi volume air pencampur beton yang signifikan pada job mix beton.`

      return {
        results: [
          { label: 'Kadar Air (w) Rata-rata', value: avgMoisture.toFixed(2), unit: '%', highlight: true, sub: 'Rentang umum pasir: 3% - 10%' },
          { label: 'Berat Air Teruapkan Rata-rata', value: avgWater.toFixed(2), unit: 'gram', sub: 'Massa air hilang selama pengovenan' },
          { label: 'Berat Pasir Kering Rata-rata', value: avgDry.toFixed(2), unit: 'gram', sub: 'Massa agregat padat kering' },
          { label: 'Status Evaluasi SNI', value: status, unit: '', highlight: true, sub: 'SNI 1971:2011' },
        ],
        formulaSteps,
        recapTable,
        isError: isExtreme,
        status,
        verdictClass,
        conclusion,
        summaryString: `Kadar Air (w) = ${avgMoisture.toFixed(2)}% (${status})`,
      }
    },
  },

  'bb-1-3': {
    id: 'bb-1-3',
    code: 'LP-01',
    name: 'Pengujian Kandungan Lumpur & Zat Organik Pasir',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 03-4142-1996 / SNI 2816:2014',
    desc: 'Menentukan persentase partikel lolos ayakan No. 200 (lumpur pencucian) multi-sampel dinamis dan kejernihan larutan NaOH terhadap zat organik.',
    hasMultiSample: true,
    commonFields: [
      {
        key: 'organikScale',
        label: 'Warna Larutan Organik NaOH (Skala Standar Gardner 1 - 5)',
        type: 'select',
        unit: 'Skala',
        desc: 'Pengujian kolorimetri larutan NaOH 3% setelah 24 jam (SNI 2816:2014)',
        options: [
          { value: 1, label: 'Plat No. 1 - Jernih / Kuning Sangat Pucat (Aman)' },
          { value: 2, label: 'Plat No. 2 - Kuning Muda (Aman / Default Laprak)' },
          { value: 3, label: 'Plat No. 3 - Standar Acuan Kuning Jerami (Batas Maksimum)' },
          { value: 4, label: 'Plat No. 4 - Cokelat Kemerahan (Perlu Evaluasi)' },
          { value: 5, label: 'Plat No. 5 - Cokelat Tua / Hitam Pekat (Tidak Layak)' },
        ],
      },
    ],
    sampleFields: [
      { key: 'w1', label: 'Berat Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa pasir kering oven mula-mula', min: 0.1 },
      { key: 'w2', label: 'Berat Kering Setelah Cuci #200 (W2)', unit: 'gram', desc: 'Massa pasir kering setelah dicuci ayakan No. 200', min: 0.1 },
    ],
    initialInputs: {
      organikScale: 2,
      samples: JSON.parse(JSON.stringify(DEFAULT_BB13_SAMPLES)),
    },
    fields: [
      { key: 'w1', label: 'Berat Contoh Kering Sebelum Cuci (W1)', unit: 'gram', desc: 'Massa pasir kering oven mula-mula', min: 0 },
      { key: 'w2', label: 'Berat Contoh Kering Tertahan Ayakan #200 (W2)', unit: 'gram', desc: 'Massa pasir kering oven setelah dicuci bersih ayakan 0.075 mm', min: 0 },
      { key: 'organikScale', label: 'Warna Larutan Organik (Skala Standar Gardner 1 - 5)', unit: 'Skala', desc: '1=Sangat jernih, 2=Kuning muda, 3=Standar acuan, 4=Cokelat, 5=Cokelat tua', min: 1, max: 5, step: 1 },
    ],
    calculate: (inputs) => {
      const rawScale = inputs.organikScale !== undefined ? inputs.organikScale : 2
      const scale = Number(rawScale)

      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            w1: inputs.w1 !== undefined ? inputs.w1 : 500,
            w2: inputs.w2 !== undefined ? inputs.w2 : 486.2,
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
          errors.push(`${idLabel}: W2 (${w2} g) tidak boleh lebih besar dari W1 (${w1} g). Benda uji yang dicuci tidak mungkin bertambah berat.`)
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
            { label: 'Kandungan Lumpur Pasir Rata-rata', value: '-', unit: '%', highlight: true },
            { label: 'Skala Warna Zat Organik', value: `Plat No. ${scale}`, unit: 'Gardner', highlight: true },
            { label: 'Batas Maksimal Lumpur SNI', value: '5.00', unit: '%' },
            { label: 'Status Kelayakan Mutu', value: 'Input Tidak Valid', unit: '', highlight: true },
          ],
          formulaSteps: errors.length > 0 ? errors : ['Semua sampel uji harus memiliki data massa valid.'],
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

      const isLumpurOk = avgLumpur <= 5.0
      const isOrganikOk = scale <= 3
      const isValid = isLumpurOk && isOrganikOk

      const formulaSteps = [
        `Jumlah Benda Uji Aktif = ${n} Sampel`,
        ...validSamples.map((r) => 
          `${r.name}: Kehilangan Cuci = ${r.w1.toFixed(1)} - ${r.w2.toFixed(1)} = ${r.loss.toFixed(1)} g | Lumpur = ((${r.w1.toFixed(1)} - ${r.w2.toFixed(1)}) / ${r.w1.toFixed(1)}) × 100% = ${r.pct.toFixed(2)}%`
        ),
        `Rata-rata Kadar Lumpur Pasir = (${validSamples.map(r => r.pct.toFixed(2) + '%').join(' + ')}) / ${n} = ${avgLumpur.toFixed(2)}%`,
        `Evaluasi Warna Zat Organik NaOH = Plat No. ${scale} (Standar Acuan Aman: Plat No. 1 - 3)`,
      ]

      const recapTable = {
        title: 'Tabel Rekapitulasi Kandungan Lumpur Agregat Halus (Format Laporan Praktikum)',
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
            label: 'Kadar Lumpur Pasir (%)',
            equation: '((W1 - W2) / W1) × 100%',
            unit: '%',
            values: validSamples.map(s => s.pct.toFixed(2) + '%'),
            average: avgLumpur.toFixed(2) + '%',
            highlight: true,
          },
        ],
      }

      const conclusion = isValid
        ? `Rata-rata kadar lumpur ${avgLumpur.toFixed(2)}% (≤ 5.0%) dan warna zat organik Plat No. ${scale} (≤ No. 3). Pasir bersih dan memenuhi syarat SNI 03-4142-1996 / SNI 2816:2014 untuk beton struktural.`
        : `Kadar lumpur (${avgLumpur.toFixed(2)}%) atau zat organik (No. ${scale}) melebihi batas toleransi SNI (syarat standar: kadar lumpur ≤ 5.0% dan zat organik ≤ Plat No. 3). Agregat harus dicuci ulang sebelum digunakan.`

      return {
        results: [
          { label: 'Kandungan Lumpur Pasir Rata-rata', value: avgLumpur.toFixed(2), unit: '%', highlight: true, sub: 'Syarat SNI 03-4142: Maks 5.00%' },
          { label: 'Skala Warna Zat Organik', value: `Plat No. ${scale}`, unit: 'Gardner', highlight: true, sub: 'Syarat SNI 2816: Maks Plat No. 3' },
          { label: 'Berat Lumpur Rata-rata', value: avgLoss.toFixed(2), unit: 'gram', sub: 'Massa partikel lolos ayakan #200' },
          { label: 'Status Kelayakan Mutu', value: isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi', unit: '', highlight: true, sub: 'SNI 03-4142 & SNI 2816' },
        ],
        formulaSteps,
        recapTable,
        isError: false,
        status: isValid ? 'Valid' : 'Perlu Evaluasi',
        verdictClass: isValid ? 'valid' : 'warning',
        conclusion,
        summaryString: `Lumpur = ${avgLumpur.toFixed(2)}%, Organik No. ${scale} (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },

  'bb-1-4': {
    id: 'bb-1-4',
    code: 'BI-01',
    name: 'Pengujian Bobot Isi & Rongga Udara Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 03-4804-1998',
    desc: 'Menghitung berat per satuan volume pasir dalam kondisi lepas dan padat/tumbuk serta persentase rongga udara multi-sampel dinamis.',
    hasMultiSample: true,
    commonFields: [
      { key: 'wBejana', label: 'Berat Wadah Silinder Kosong (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0.01 },
      { key: 'vol', label: 'Volume Wadah Silinder (V)', unit: 'liter', desc: 'Kapasitas volume terukur wadah silinder logam', min: 0.001 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Pasir (Gs)', unit: '', desc: 'Nilai Berat Jenis Curah Kering dari pengujian BJ-01', min: 0.1 },
    ],
    sampleFields: [
      { key: 'wLepas', label: 'Wadah + Pasir Lepas (W2)', unit: 'kg', desc: 'Dituang bebas tanpa pemadatan', min: 0.1 },
      { key: 'wPadat', label: 'Wadah + Pasir Padat (W3)', unit: 'kg', desc: 'Dipadatkan dengan penusukan rodding 3 lapis', min: 0.1 },
    ],
    initialInputs: {
      wBejana: 3.25,
      vol: 9.43,
      bjBulk: 2.60,
      samples: JSON.parse(JSON.stringify(DEFAULT_BB14_SAMPLES)),
    },
    fields: [
      { key: 'wBejana', label: 'Berat Bejana Takaran (W1)', unit: 'kg', desc: 'Massa wadah bejana kalibrasi kosong', min: 0 },
      { key: 'vol', label: 'Volume Bejana Takaran (V)', unit: 'liter', desc: 'Volume terukur wadah silinder logam', min: 0.000001 },
      { key: 'wLepas', label: 'Berat Bejana + Pasir Kondisi Lepas (W2)', unit: 'kg', desc: 'Pasir dituang bebas dengan corong tanpa pemadatan', min: 0 },
      { key: 'wPadat', label: 'Berat Bejana + Pasir Kondisi Padat (W3)', unit: 'kg', desc: 'Pasir dipadatkan dengan penusukan 25 kali tiap lapisan', min: 0 },
      { key: 'bjBulk', label: 'Berat Jenis Curah Pasir (BJ)', unit: '', desc: 'Data berat jenis curah (bulk sp. gr)', min: 0.1 },
    ],
    calculate: (inputs) => {
      const w1 = Number(inputs.wBejana || 3.25)
      const v = Number(inputs.vol || 9.43)
      const bj = Number(inputs.bjBulk || 2.60)

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
          conclusion: 'Input parameter wadah dan berat jenis pasir harus lebih besar dari 0.',
          summaryString: 'Parameter Wadah / BJ Tidak Valid',
        }
      }

      const rawSamples = Array.isArray(inputs.samples) && inputs.samples.length > 0
        ? inputs.samples
        : [{
            id: 1,
            name: 'Benda Uji I',
            wLepas: inputs.wLepas !== undefined ? inputs.wLepas : 16.85,
            wPadat: inputs.wPadat !== undefined ? inputs.wPadat : 18.15,
          }]

      const validSamples = []
      const errors = []

      rawSamples.forEach((s, idx) => {
        const idLabel = s.name || `Benda Uji ${idx + 1}`
        const wL = Number(s.wLepas ?? 0)
        const wP = Number(s.wPadat ?? 0)

        if (wL <= w1 || wP <= w1) {
          errors.push(`${idLabel}: Berat wadah + pasir (Lepas = ${wL} kg, Padat = ${wP} kg) harus lebih besar dari berat wadah kosong W1 (${w1} kg).`)
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

      // Standar SNI 03-4804-1998:
      // - Bobot Isi Pasir Padat: 1.20 - 1.70 kg/L
      // - Rongga Udara: 30% - 45%
      const isBiOk = avgBiP >= 1.20 && avgBiP <= 1.75
      const isRonggaOk = avgRonggaP >= 30.0 && avgRonggaP <= 45.0
      const isValid = isBiOk && isRonggaOk

      const formulaSteps = [
        `Parameter Acuan: Wadah Kosong (W1) = ${w1} kg | Volume (V) = ${v} L | Berat Jenis Pasir (Gs) = ${bj}`,
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
        title: 'Tabel Rekapitulasi Bobot Isi & Rongga Udara Agregat Halus',
        headers: ['Kondisi Pengujian & Parameter', 'Persamaan Rumus', ...validSamples.map(s => s.name), 'Rata-rata'],
        rows: [
          {
            label: 'Berat Wadah + Pasir Lepas (W2)',
            equation: 'W2',
            unit: 'kg',
            values: validSamples.map(s => s.wLepas.toFixed(2)),
            average: avgWL.toFixed(2),
          },
          {
            label: 'Berat Bersih Pasir Lepas',
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
            label: 'Berat Wadah + Pasir Padat (W3)',
            equation: 'W3',
            unit: 'kg',
            values: validSamples.map(s => s.wPadat.toFixed(2)),
            average: avgWP.toFixed(2),
          },
          {
            label: 'Berat Bersih Pasir Padat',
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
        ? `Rata-rata bobot isi pasir padat sebesar ${avgBiP.toFixed(3)} kg/L (standar: 1.20 - 1.70 kg/L) dengan rongga udara ${avgRonggaP.toFixed(2)}% (standar: 30% - 45%). Memenuhi spesifikasi teknis SNI 03-4804-1998 untuk perencanaan campuran beton.`
        : `Rata-rata bobot isi padat (${avgBiP.toFixed(3)} kg/L) atau rongga udara (${avgRonggaP.toFixed(2)}%) berada di luar rentang standar SNI 03-4804-1998 (syarat teknis: BI 1.20 - 1.70 kg/L dan Rongga 30% - 45%).`

      return {
        results: [
          { label: 'Bobot Isi Padat Rata-rata', value: avgBiP.toFixed(3), unit: 'kg/L', highlight: true, sub: 'Standar SNI: 1.20 - 1.70 kg/L' },
          { label: 'Rongga Udara Padat Rata-rata', value: avgRonggaP.toFixed(2), unit: '%', highlight: true, sub: 'Standar SNI: 30.0% - 45.0%' },
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

  'bb-1-5': {
    id: 'bb-1-5',
    code: 'GR-01',
    name: 'Analisis Gradasi & Modulus Kehalusan Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1: Agregat Halus',
    standard: 'SNI 03-1968-1990',
    desc: 'Pemetaan distribusi butiran pasir dan perhitungan Fineness Modulus (FM) multi-benda uji untuk klasifikasi zona gradasi.',
    hasDynamicSieveTable: true,
    isCoarse: false,
    initialInputs: {
      specimens: ['Benda Uji I', 'Benda Uji II', 'Benda Uji III'],
      sieves: [
        { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [0.0, 0.0, 0.0], weight: 0.0 },
        { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [20.0, 22.0, 18.0], weight: 20.0 },
        { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 58.0, 62.0], weight: 60.0 },
        { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weights: [110.0, 112.0, 108.0], weight: 110.0 },
        { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weights: [140.0, 138.0, 142.0], weight: 140.0 },
        { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weights: [100.0, 102.0, 98.0], weight: 100.0 },
        { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weights: [50.0, 48.0, 52.0], weight: 50.0 },
        { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weights: [20.0, 20.0, 20.0], weight: 20.0, isPan: true },
      ],
    },
    fields: [],
    calculate: (inputs) => {
      const rawSieves = Array.isArray(inputs.sieves) && inputs.sieves.length > 0
        ? inputs.sieves
        : [
            { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weights: [0.0, 0.0, 0.0], weight: 0 },
            { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weights: [20.0, 22.0, 18.0], weight: 20 },
            { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weights: [60.0, 58.0, 62.0], weight: 60 },
            { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weights: [110.0, 112.0, 108.0], weight: 110 },
            { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weights: [140.0, 138.0, 142.0], weight: 140 },
            { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weights: [100.0, 102.0, 98.0], weight: 100 },
            { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weights: [50.0, 48.0, 52.0], weight: 50 },
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
            { label: 'Klasifikasi Zona Ayakan', value: '-', unit: '', highlight: true },
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

      // Hitung per spesimen
      const sortedDesc = [...nonPanSieves].sort((a, b) => Number(b.size) - Number(a.size))
      const standardSizes = [9.5, 4.75, 2.36, 1.18, 0.60, 0.30, 0.15]

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

        const fm = total > 0
          ? (matchedCount > 0 ? sumCumPct / 100 : rows.reduce((acc, s) => acc + s.cumRetainedPct, 0) / 100)
          : 0

        return { name, total, rows, fm, sumCumPct }
      })

      const avgTotal = specimenResults.reduce((s, r) => s + r.total, 0) / numSpecimens
      const avgFm = specimenResults.reduce((s, r) => s + r.fm, 0) / numSpecimens

      if (avgTotal <= 0) {
        return {
          results: [
            { label: 'Total Massa Contoh (Rata-rata)', value: '0.0', unit: 'gram' },
            { label: 'Fineness Modulus (FM) Rata-rata', value: '-', unit: '', highlight: true },
            { label: 'Klasifikasi Zona Ayakan', value: '-', unit: '', highlight: true },
            { label: 'Status SNI 03-1968', value: 'Input Kosong', unit: '' },
          ],
          formulaSteps: ['Total berat benda uji pasir harus lebih besar dari 0 gram.'],
          isError: true,
          status: 'Input Tidak Wajar / Cek Data',
          verdictClass: 'error',
          conclusion: 'Total berat tertahan pada ayakan harus lebih besar dari 0 gram. Silakan masukkan data penimbangan fraksi ayakan.',
          summaryString: 'Data Ayakan Kosong (0 gr)',
        }
      }

      let zoneNum
      let zone
      if (avgFm < 2.3) {
        zoneNum = 4
        zone = 'Zona IV (Pasir Sangat Halus)'
      } else if (avgFm < 2.6) {
        zoneNum = 3
        zone = 'Zona III (Pasir Agak Halus)'
      } else if (avgFm <= 3.1) {
        zoneNum = 2
        zone = 'Zona II (Pasir Agak Kasar / Ideal Beton)'
      } else {
        zoneNum = 1
        zone = 'Zona I (Pasir Kasar)'
      }

      const SNI_ZONE_LOOKUP = {
        1: { 0.15: [0, 10], 0.30: [5, 20], 0.60: [15, 34], 1.18: [30, 70], 2.36: [60, 95], 4.75: [90, 100], 9.5: [100, 100] },
        2: { 0.15: [0, 10], 0.30: [8, 30], 0.60: [35, 59], 1.18: [55, 90], 2.36: [75, 100], 4.75: [90, 100], 9.5: [100, 100] },
        3: { 0.15: [0, 10], 0.30: [12, 40], 0.60: [60, 79], 1.18: [75, 100], 2.36: [85, 100], 4.75: [90, 100], 9.5: [100, 100] },
        4: { 0.15: [0, 15], 0.30: [15, 50], 0.60: [80, 100], 1.18: [90, 100], 2.36: [95, 100], 4.75: [95, 100], 9.5: [100, 100] },
      }

      // Hitung rata-rata passing untuk Recharts
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

      const activeZoneLookup = SNI_ZONE_LOOKUP[zoneNum]
      const baList = []
      const bbList = []
      sortedAsc.forEach((s) => {
        let bb = 0
        let ba = 100
        const matchedKey = Object.keys(activeZoneLookup).find((k) => Math.abs(Number(k) - Number(s.size)) < 0.15)
        if (matchedKey) {
          [bb, ba] = activeZoneLookup[matchedKey]
        } else if (Number(s.size) >= 9.5) {
          bb = 100
          ba = 100
        } else if (Number(s.size) >= 4.75) {
          bb = zoneNum === 4 ? 95 : 90
          ba = 100
        } else if (Number(s.size) < 0.15) {
          bb = 0
          ba = 10
        } else {
          bb = 0
          ba = 100
        }
        bbList.push(bb)
        baList.push(ba)
      })

      const isWithinBounds = actualPassing.every((val, idx) => val <= baList[idx] && val >= bbList[idx])
      const isValid = avgFm >= 2.20 && avgFm <= 3.20

      // Tabel Rekapitulasi Gradasi
      const recapTable = {
        title: 'Tabel Rekapitulasi Gradasi & MHB Multi-Benda Uji (Format Laporan Praktikum)',
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
          (sr) => `${sr.name}: Total = ${sr.total.toFixed(1)} g | MHB = ${sr.sumCumPct.toFixed(1)} / 100 = ${sr.fm.toFixed(2)}`
        ),
        `Rata-rata Fineness Modulus (FM) = (${specimenResults.map(sr => sr.fm.toFixed(2)).join(' + ')}) / ${numSpecimens} = ${avgFm.toFixed(2)}`,
        `Klasifikasi Zona Gradasi = ${zone}`,
      ]

      const conclusion = isValid
        ? `Nilai rata-rata Fineness Modulus (FM) = ${avgFm.toFixed(2)} tergolong dalam ${zone}. Memenuhi spesifikasi standar SNI 03-1968-1990 untuk agregat halus beton struktural (rentang standar FM: 2.20 - 3.20).`
        : `Nilai Fineness Modulus (FM) = ${avgFm.toFixed(2)} berada di luar rentang standar SNI 03-1968-1990 (syarat FM beton: 2.20 - 3.20). Pasir ${avgFm < 2.2 ? 'terlalu halus' : 'terlalu kasar'} sehingga perlu pencampuran gradasi pasir lain.`

      return {
        results: [
          { label: 'Total Massa Contoh (Rata-rata)', value: avgTotal.toFixed(1), unit: 'gram', sub: `${numSpecimens} Benda Uji` },
          { label: 'Fineness Modulus (FM) Rata-rata', value: avgFm.toFixed(2), unit: '', highlight: true, sub: 'Syarat SNI: 2.20 - 3.20' },
          { label: 'Klasifikasi Zona Ayakan', value: zone, unit: '', highlight: true, sub: 'SNI 03-1968-1990' },
          { label: 'MHB per Benda Uji', value: specimenResults.map(sr => sr.fm.toFixed(2)).join(' | '), unit: '', sub: 'Distribusi MHB sampel' },
        ],
        formulaSteps,
        recapTable,
        gradationChart: {
          isCoarse: false,
          chartTitle: 'Grafik Kurva Gradasi Agregat Halus',
          chartSubtitle: `Distribusi Butiran Pasir & Amplop Batas Spesifikasi SNI 03-1968 (${zone})`,
          zoneNum,
          zoneLabel: `Zona ${zoneNum}`,
          zoneFullName: zone,
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
        summaryString: `FM = ${avgFm.toFixed(2)}, ${zone} (${isValid ? 'Memenuhi Standar' : 'Perlu Evaluasi'})`,
      }
    },
  },
