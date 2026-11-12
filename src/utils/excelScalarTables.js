import { ASPHALT_SOFTENING_MIN, BINA_MARGA_2018_R2, LA_BALLS, SNI_ASPHALT_GRADES } from './labSpecifications.js'
import { addNote, addTable, formula, guarded, numeric } from './excelReportLayout.js'

export function writeScalarResults(ws, id, inputs, out, refs) {
  const p = (key) => refs[key] ?? '""'
  const n = (key) => numeric(inputs[key])
  const value = (i) => numeric(out.results?.[i]?.numericValue ?? out.results?.[i]?.value)
  const positive = (...keys) => `AND(COUNT(${keys.map(p).join(',')})=${keys.length},MIN(${keys.map(p).join(',')})>0)`
  let rows

  switch (id) {
    case 'mt-6-1': {
      const falling = inputs.metode === 'falling'
      const diameterKey = falling ? 'diameterSampelD' : 'diameterD'
      const diameter = p(diameterKey)
      const l = p('panjangL')
      const time = p('waktuT')
      const [q, h, tube, h0, h1] = ['volumeQ', 'headH', 'diameterPipaD', 'headH0', 'headH1'].map(p)
      rows = [
        ['Luas penampang sampel', 'cm²', guarded(`AND(ISNUMBER(${diameter}),${diameter}>0)`, `PI()*${diameter}^2/4`, Math.PI * n(diameterKey) ** 2 / 4)],
        (r, first) => ['Koefisien permeabilitas k', 'cm/s', falling
          ? guarded(`AND(${positive('panjangL', 'diameterPipaD', 'waktuT', 'headH0', 'headH1')},ISNUMBER(C${first}),${h0}>${h1})`, `PI()*${tube}^2*${l}/(4*C${first}*${time})*LN(${h0}/${h1})`, value(0))
          : guarded(`AND(${positive('panjangL', 'volumeQ', 'headH', 'waktuT')},ISNUMBER(C${first}))`, `${q}*${l}/(C${first}*${h}*${time})`, value(0))],
      ]
      break
    }
    case 'mf-1-1': {
      if (inputs.metode === 'sg') {
        rows = [['Berat jenis relatif SG', '', guarded(positive('massaJenisZat', 'massaJenisAir'), `${p('massaJenisZat')}/${p('massaJenisAir')}`, value(0))]]
      } else if (inputs.metode === 'viskositas') {
        const [s, t, d, ball, fluid] = ['jarakS', 'waktuT', 'diameterD', 'massaJenisBola', 'massaJenisFluida'].map(p)
        const nu = value(2) === null ? null : 9.81 * n('diameterD') ** 2 / (18 * (n('jarakS') / n('waktuT'))) * (n('massaJenisBola') / n('massaJenisFluida') - 1)
        rows = [
          ['Kecepatan terminal u', 'm/s', guarded(positive('jarakS', 'waktuT'), `${s}/${t}`, value(0))],
          (r, first) => ['Viskositas kinematik dari Stokes (estimasi)', 'm²/s', guarded(`AND(${positive('diameterD', 'massaJenisBola', 'massaJenisFluida')},${ball}>${fluid},ISNUMBER(C${first}))`, `9.81*${d}^2/(18*C${first})*(${ball}/${fluid}-1)`, nu)],
          (r, first) => ['Viskositas kinematik dari Stokes (estimasi)', 'cSt', guarded(`ISNUMBER(C${first + 1})`, `C${first + 1}*1E6`, nu === null ? null : nu * 1e6)],
          (r, first) => ['Re bola • cek kondisi Stokes', '', guarded(`AND(COUNT(C${first}:C${first + 1})=2,C${first + 1}>0)`, `C${first}*${d}/C${first + 1}`, nu > 0 ? (n('jarakS') / n('waktuT')) * n('diameterD') / nu : null)],
        ]
        addNote(ws, 'Batas model', 'Persamaan Stokes mengasumsikan aliran merayap di sekitar bola (Re jauh di bawah 1) dan kecepatan terminal. Periksa Re bola dan pengaruh dinding tabung sebelum memakai estimasi.')
      } else if (inputs.metode === 'archimedes' && refs.archDBeaker) {
        const [d, tube, h0, h1, rho, g, unit] = ['archDBeaker', 'archDTabung', 'archH0', 'archH1', 'archMassaJenis', 'archGravitasi', 'archDimUnit'].map(p)
        const scale = `IF(${unit}="cm",0.01,IF(${unit}="m",1,0.001))`
        const scaleNumber = inputs.archDimUnit === 'cm' ? 0.01 : inputs.archDimUnit === 'm' ? 1 : 0.001
        const area = Math.PI / 4 * (n('archDBeaker') ** 2 - n('archDTabung') ** 2) * scaleNumber ** 2
        const deltaH = (n('archH1') - n('archH0')) * scaleNumber
        rows = [
          ['Luas permukaan efektif (beaker − tabung)', 'm²', guarded(`AND(${positive('archDBeaker', 'archDTabung')},${d}>${tube})`, `PI()/4*(${d}^2-${tube}^2)*${scale}^2`, area > 0 ? area : null)],
          ['Kenaikan tinggi muka air', 'm', guarded(`AND(COUNT(${h0},${h1})=2,${h0}>=0,${h1}>=${h0})`, `(${h1}-${h0})*${scale}`, deltaH >= 0 ? deltaH : null)],
          (r, first) => ['Volume terdesak dari geometri alat', 'm³', guarded(`COUNT(C${first}:C${first + 1})=2`, `C${first}*C${first + 1}`, value(0) === null ? null : area * deltaH)],
          (r, first) => ['Gaya apung', 'N', guarded(`AND(${positive('archMassaJenis', 'archGravitasi')},ISNUMBER(C${first + 2}))`, `${rho}*${g}*C${first + 2}`, value(0))],
        ]
      } else if (inputs.metode === 'archimedes') {
        const g = refs.archGravitasi ?? '9.81'
        rows = [['Gaya apung', 'N', guarded(positive('massaJenisFluida', 'volumeTercelup'), `${p('massaJenisFluida')}*${g}*${p('volumeTercelup')}`, value(0))]]
      } else {
        const empty = p('massaPiknoKosong')
        const full = p('massaPiknoFluida')
        const vol = p('volumePikno')
        rows = [
          ['Massa fluida bersih', 'g', guarded(`AND(COUNT(${empty},${full})=2,${empty}>=0,${full}>${empty})`, `${full}-${empty}`, value(0))],
          (r, first) => ['Massa jenis fluida', 'g/cm³', guarded(`AND(${positive('volumePikno')},ISNUMBER(C${first}))`, `C${first}/${vol}`, value(2))],
          (r, first) => ['Massa jenis fluida', 'kg/m³', guarded(`ISNUMBER(C${first + 1})`, `C${first + 1}*1000`, value(1))],
          (r, first) => ['Berat jenis relatif terhadap 1000 kg/m³', '', guarded(`ISNUMBER(C${first + 2})`, `C${first + 2}/1000`, value(3))],
        ]
      }
      break
    }
    case 'mf-2-1': {
      const [d, v, nu] = ['diameterD', 'kecepatanV', 'viskositasNu'].map(p)
      const re = n('diameterD') > 0 && n('kecepatanV') >= 0 && n('viskositasNu') > 0 ? n('diameterD') * n('kecepatanV') / n('viskositasNu') : null
      rows = [
        ['Bilangan Reynolds dari kecepatan tersimpan', '', guarded(`AND(${positive('diameterD', 'viskositasNu')},ISNUMBER(${v}),${v}>=0)`, `${v}*${d}/${nu}`, re)],
        (r, first) => ['Rezim aliran', '', guarded(`ISNUMBER(C${first})`, `IF(C${first}<2000,"Laminer",IF(C${first}<=4000,"Transisi","Turbulen"))`, re === null ? null : re < 2000 ? 'Laminer' : re <= 4000 ? 'Transisi' : 'Turbulen')],
      ]
      addNote(ws, 'Data lama', 'Kecepatan langsung digunakan untuk menghitung Re. Rekaman ini tidak menyimpan volume dan waktu pengamatan debit.')
      break
    }
    case 'mt-3-1': {
      const [v, mold, filled, water] = ['volMold', 'wMold', 'wMoldTanah', 'kadarAir'].map(p)
      rows = [
        ['Kerapatan basah', 'g/cm³', guarded(`AND(${positive('volMold', 'wMold', 'wMoldTanah')},${filled}>${mold})`, `(${filled}-${mold})/${v}`, value(0))],
        (r, first) => ['Kerapatan kering pada titik uji', 'g/cm³', guarded(`AND(ISNUMBER(C${first}),ISNUMBER(${water}),${water}>=0)`, `C${first}/(1+${water}/100)`, value(1))],
      ]
      addNote(ws, 'Titik tunggal', 'Satu titik pemadatan memberikan kerapatan pada kadar air yang dicatat. Kurva pemadatan dan OMC memerlukan beberapa titik.')
      break
    }
    case 'mt-2-3': {
      const [nBlows, w] = ['ketukanN', 'kadarAirW'].map(p)
      rows = [['Estimasi LL metode satu titik', '%', guarded(`AND(${positive('ketukanN', 'kadarAirW')},${nBlows}=INT(${nBlows}),${nBlows}>=22,${nBlows}<=28)`, `${w}*(${nBlows}/25)^0.121`, out.llValue)]]
      addNote(ws, 'Data lama', 'Estimasi satu titik memakai 22–28 ketukan. SNI 1967:2008 Cara B memerlukan pembacaan ulang sesuai prosedur.')
      break
    }
    case 'mt-2-4': {
      const [ll, pl] = ['batasCairLL', 'batasPlastisPL'].map(p)
      rows = [['Indeks plastisitas LL − PL', '', guarded(`AND(COUNT(${ll},${pl})=2,${ll}>0,${pl}>=0)`,
        `IF(ROUND(${ll},0)>ROUND(${pl},0),ROUND(${ll},0)-ROUND(${pl},0),"NP")`,
        out.soilPlasticityIndex === '—' ? null : numeric(out.soilPlasticityIndex) ?? out.soilPlasticityIndex)]]
      break
    }
    case 'mt-4-1': {
      const [d10, d30, d60] = ['d10', 'd30', 'd60'].map(p)
      const valid = `AND(${positive('d10', 'd30', 'd60')},${d10}<${d30},${d30}<${d60})`
      rows = [
        ['Koefisien keseragaman Cu', '', guarded(valid, `${d60}/${d10}`, value(0))],
        ['Koefisien kelengkungan Cc', '', guarded(valid, `${d30}^2/(${d10}*${d60})`, value(1))],
      ]
      break
    }
    case 'mt-5-2': {
      const [h0, e0, dh, p1, p2] = ['tinggiAwal', 'angkaPoriAwal', 'deltaH', 'tekananP1', 'tekananP2'].map(p)
      rows = [
        ['Regangan aksial', '%', guarded(`AND(${positive('tinggiAwal', 'deltaH')},${dh}<${h0})`, `100*${dh}/${h0}`, value(0))],
        (r, first) => ['Perubahan angka pori Δe', '', guarded(`AND(ISNUMBER(C${first}),ISNUMBER(${e0}),${e0}>=0)`, `C${first}/100*(1+${e0})`, value(1))],
        (r, first) => ['Indeks kompresi Cc', '', guarded(`AND(ISNUMBER(C${first + 1}),${positive('tekananP1', 'tekananP2')},${p2}>${p1})`, `C${first + 1}/LOG10(${p2}/${p1})`, value(2))],
      ]
      break
    }
    case 'bp-1-1': {
      const [a, b] = ['beratAwalA', 'beratTertahanB'].map(p)
      const valid = `AND(COUNT(${a},${b})=2,${a}>0,${b}>=0,${b}<=${a})`
      const grade = p('gradasiTipe')
      const expectedBalls = Object.entries(LA_BALLS).reduceRight((next, [key, count]) =>
        `IF(${grade}="${key}",${count},${next})`, '""')
      const balls = p('jumlahBola')
      rows = [
        ['Massa lolos ayakan No. 12', 'g', guarded(valid, `${a}-${b}`, value(1))],
        (r, first) => ['Keausan Los Angeles 500 putaran', '%', guarded(`ISNUMBER(C${first})`, `100*C${first}/${a}`, value(0))],
        ['Batas maksimum 500 putaran (Bina Marga 2018 Rev. 2)', '%', guarded(`OR(${p('jenisCampuran')}="sma",${p('jenisCampuran')}="umum")`, `IF(${p('jenisCampuran')}="sma",30,40)`, inputs.jenisCampuran === 'sma' ? 30 : inputs.jenisCampuran === 'umum' ? 40 : null)],
        (r, first) => ['Evaluasi konfigurasi dan keausan', '', guarded(`COUNT(C${first + 1}:C${first + 2})=2`,
          `IF(AND(ISNUMBER(${balls}),${balls}=${expectedBalls},ABS(${a}-5000)<=10),IF(C${first + 1}<=C${first + 2},"Memenuhi Standar","Tidak Layak"),"Perlu Evaluasi")`, out.status)],
      ]
      break
    }
    case 'bp-3-1': {
      const [t1, t2, pen] = ['t1', 't2', 'pen25'].map(p)
      const a = value(2)
      const softening = positive('t1', 't2')
      const kind = refs.kelasAspal ?? '"pen6070"'
      const bound = Object.entries(ASPHALT_SOFTENING_MIN).reduceRight((next, [key, min]) =>
        `IF(${kind}="${key}",${min},${next})`, '""')
      rows = [
        ['Titik lembek rata-rata', '°C', guarded(`AND(${softening},ABS(${t1}-${t2})<=1.000000001)`, `AVERAGE(${t1},${t2})`, value(0))],
        ['Selisih dua pembacaan', '°C', guarded(softening, `ABS(${t1}-${t2})`, value(3))],
        (r, first) => ['Kepekaan suhu A', '', guarded(`AND(ISNUMBER(C${first}),C${first}>25,${positive('pen25')},${pen}<=500)`, `LOG10(800/${pen})/(C${first}-25)`, a)],
        (r, first) => ['Indeks penetrasi PI (indikatif)', '', guarded(`AND(ISNUMBER(C${first + 2}),ABS(1+50*C${first + 2})>1E-9)`, `(20-500*C${first + 2})/(1+50*C${first + 2})`, value(1))],
        ['Batas titik lembek kelas acuan', '°C', formula(bound, ASPHALT_SOFTENING_MIN[inputs.kelasAspal ?? 'pen6070'])],
        (r, first) => ['Evaluasi titik lembek', '', guarded(softening,
          `IF(NOT(ISNUMBER(C${first})),"Ulangi uji",IF(NOT(ISNUMBER(C${first + 4})),"Titik lembek dilaporkan",IF(C${first}>=C${first + 4},"Mencapai batas titik lembek","Di bawah batas titik lembek")))`, out.status)],
      ]
      addNote(ws, 'Acuan', `Bandingkan titik lembek dengan kelas aspal yang diuji. PI dilaporkan jika ada nilai Pen25 yang sah. ${SNI_ASPHALT_GRADES}`)
      break
    }
    case 'bp-4-1': {
      const [a, b, c, d, rho] = ['massaA', 'massaB', 'massaC', 'massaD', 'rhoW'].map(p)
      const displaced = n('massaB') - n('massaA') - n('massaD') + n('massaC')
      rows = [
        ['Massa aspal', 'g', guarded(`AND(COUNT(${a},${c})=2,${c}>${a})`, `${c}-${a}`, value(2))],
        ['Massa air terdesak', 'g', guarded(`AND(COUNT(${a},${b},${c},${d})=4,${d}>=${c},${b}-${a}>${d}-${c})`, `(${b}-${a})-(${d}-${c})`, displaced > 0 ? displaced : null)],
        (r, first) => ['Volume air terdesak', 'cm³', guarded(`AND(ISNUMBER(C${first + 1}),${positive('rhoW')})`, `C${first + 1}/${rho}`, displaced > 0 && n('rhoW') > 0 ? displaced / n('rhoW') : null)],
        (r, first) => ['Berat jenis relatif aspal', '', guarded(`COUNT(C${first}:C${first + 1})=2`, `C${first}/C${first + 1}`, value(0))],
        (r, first) => ['Massa jenis aspal', 'g/cm³', guarded(`AND(ISNUMBER(C${first + 3}),${positive('rhoW')})`, `C${first + 3}*${rho}`, value(1))],
      ]
      addNote(ws, 'Acuan', `Berat jenis relatif aspal Pen 60/70 ≥ 1,0. Bina Marga 2018 Revisi 2, Tabel 6.3.2.5. ${BINA_MARGA_2018_R2}`)
      break
    }
    case 'bp-10-1': {
      const data = out.extraction
      if (!data) return false
      const water = p('beratAirDalamContoh')
      const mineral = p('beratMineralDalamEkstrak')
      const target = p('kadarAspalJmf')
      const raw = (data.legacy ? ['beratSampelW1', 'beratAgregatW2', 'beratKertasF1', 'beratKertasF2']
        : ['beratTalam', 'beratTalamSampel', 'beratFilterW2', 'beratMineralFilterW4']).map(p)
      const [a, b, c, d] = raw
      const valid = 'AND(COUNT(' + raw.join(',') + ')=4,MIN(' + raw.join(',') + ')>=0,' + d + '>=' + c + ')'
      const withFilter = p('beratTalamSampelFilter')
      const bind = (r, first) => 'AND(COUNT(C' + first + ':C' + (first + 2) + ')=3,C' + (first + 2) + '>=C' + (first + 1) + '+SUM(' + mineral + '),OR(ISBLANK(' + mineral + '),AND(ISNUMBER(' + mineral + '),' + mineral + '>=0)))'
      rows = [
        ['Massa contoh awal W₁', 'g', guarded(valid, data.legacy ? a : b + '-' + a, data.valid ? data.sample : null)],
        ['Massa agregat kering W₃', 'g', guarded(valid, data.legacy ? b + '+' + d + '-' + c : d + '-' + c, data.valid ? data.aggregate : null)],
        (r, first) => ['Massa contoh kering W₁ − W₂', 'g', guarded('AND(ISNUMBER(C' + first + '),OR(ISBLANK(' + water + '),AND(ISNUMBER(' + water + '),' + water + '>=0)),C' + first + '>SUM(' + water + '))', 'C' + first + '-SUM(' + water + ')', data.valid ? data.dry : null)],
        (r, first) => ['Massa aspal setelah koreksi yang tersedia', 'g', guarded(bind(r, first), 'C' + (first + 2) + '-C' + (first + 1) + '-SUM(' + mineral + ')', data.valid ? data.binder : null)],
        (r, first) => ['Kadar aspal pada basis kering', '%', guarded('AND(COUNT(C' + (first + 2) + ':C' + (first + 3) + ')=2,C' + (first + 2) + '>0)', '100*C' + (first + 3) + '/C' + (first + 2), data.pb)],
        ['Selisih massa filter dari dua penimbangan', 'g', !data.legacy && refs.beratTalamSampelFilter
          ? guarded('COUNT(' + [withFilter, b, c].join(',') + ')=3', withFilter + '-' + b + '-' + c, data.filterBalance) : null],
        (r, first) => ['Deviasi kadar dari JMF', 'poin %', guarded('AND(ISNUMBER(C' + (first + 4) + '),ISNUMBER(' + target + '),' + target + '>0,' + target + '<100)', 'C' + (first + 4) + '-' + target, data.deviation)],
        (r, first) => {
          const gap = 'C' + (first + 5)
          const delta = 'C' + (first + 6)
          return ['Evaluasi kadar', '', guarded('ISNUMBER(C' + (first + 4) + ')', 'IF(COUNT(' + [water, mineral, delta].join(',') + ')<3,"Perlu Evaluasi",IF(IF(ISNUMBER(' + gap + '),ABS(' + gap + ')>1E-6,FALSE),"Perlu Evaluasi",IF(ABS(' + delta + ')<=0.300000001,"Dalam toleransi JMF","Di luar toleransi JMF")))', out.status)]
        },
      ]
      addNote(ws, 'Neraca massa dan toleransi', 'SNI 03-6894-2002 menghitung kadar dari (W₁ − W₂ − W₃ − W₄) / (W₁ − W₂). Jika massa air atau mineral dalam ekstrak kosong, kadar masih berupa estimasi. Toleransi JMF ±0,30 poin persentase, Bina Marga 2018 Revisi 2 Tabel 6.3.3.2. ' + BINA_MARGA_2018_R2)
      break
    }
    default: return false
  }

  addTable(ws, 'Perhitungan', ['Parameter', 'Satuan', 'Nilai'], rows, { widths: [43, 16, 24], formats: [null, null, '0.00000####'] })
  return true
}
