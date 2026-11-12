const number = (value) => value == null || value === '' || !Number.isFinite(Number(value)) ? null : Number(value)

export function calculateBinderExtraction(inputs) {
  const legacy = inputs.beratTalam === undefined && inputs.beratSampelW1 !== undefined
  const keys = legacy
    ? ['beratSampelW1', 'beratAgregatW2', 'beratKertasF1', 'beratKertasF2']
    : ['beratTalam', 'beratTalamSampel', 'beratFilterW2', 'beratMineralFilterW4']
  const [a, b, c, d] = keys.map((key) => number(inputs[key]))
  const water = number(inputs.beratAirDalamContoh)
  const mineral = number(inputs.beratMineralDalamEkstrak ?? (legacy ? inputs.beratAbu : null))
  const jmf = number(inputs.kadarAspalJmf)
  const sample = legacy ? a : b - a
  const aggregate = legacy ? b + d - c : d - c
  const dry = sample - (water ?? 0)
  const binder = dry - aggregate - (mineral ?? 0)
  const valid = [a, b, c, d].every((mass) => mass !== null && mass >= 0)
    && d >= c && sample > 0 && dry > 0 && aggregate > 0 && binder >= 0 && (water ?? 0) >= 0 && (mineral ?? 0) >= 0
  const filterBalance = !legacy && number(inputs.beratTalamSampelFilter) !== null ? number(inputs.beratTalamSampelFilter) - b - c : null
  const balanced = filterBalance === null || Math.abs(filterBalance) <= 1e-6
  const corrected = water !== null && mineral !== null
  const pb = valid ? 100 * binder / dry : null
  const deviation = valid && jmf > 0 && jmf < 100 ? pb - jmf : null
  const within = deviation !== null && Math.abs(deviation) <= 0.3 + 1e-9
  const status = !valid ? 'Data penimbangan belum sah'
    : !corrected || !balanced || deviation === null ? 'Perlu Evaluasi'
      : within ? 'Dalam toleransi JMF' : 'Di luar toleransi JMF'
  const conclusion = !valid ? 'Periksa massa contoh, agregat, dan selisih massa. Massa contoh kering harus positif dan minimal sebesar massa agregat dan mineral yang dipulihkan.'
    : [
        !corrected ? 'Angka ini estimasi karena massa air atau mineral ekstrak belum dicatat.' : 'Kadar dihitung pada basis campuran kering.',
        !balanced ? `Massa sampel dan filter berbeda ${Math.abs(filterBalance).toFixed(2)} g dari jumlah penimbangan terpisah. Periksa neraca massa.` : '',
        'Pembanding pelaksanaan Bina Marga 2018 Revisi 2 adalah ±0,30 poin persentase terhadap JMF. Pelaporan metode SNI 03-6894-2002 memakai rata-rata uji duplo.',
      ].filter(Boolean).join(' ')

  return {
    extraction: { legacy, valid, sample, water, mineral, dry, aggregate, binder, pb, deviation, filterBalance, corrected, jmf },
    results: [
      { label: corrected ? 'Kadar Aspal (B)' : 'Estimasi Kadar Aspal (B)', value: valid ? pb.toFixed(2) : '—', unit: '%', highlight: true },
      { label: 'Massa Aspal Terhitung', value: valid ? binder.toFixed(2) : '—', unit: 'g' },
      { label: 'Massa Contoh Awal', value: valid ? sample.toFixed(2) : '—', unit: 'g' },
      { label: 'Selisih Neraca Massa Filter', value: filterBalance === null ? '—' : filterBalance.toFixed(2), unit: 'g' },
      { label: 'Deviasi dari JMF', value: deviation?.toFixed(2) ?? '—', unit: 'poin %' },
    ],
    formulaSteps: [
      'Massa contoh kering = massa contoh awal − massa air.',
      'Massa mineral total = massa agregat kering + massa mineral dalam larutan ekstrak.',
      'Kadar aspal = (massa contoh kering − massa mineral total) / massa contoh kering × 100%.',
      valid ? `Kadar aspal ${corrected ? 'terkoreksi' : 'estimasi'} = ${binder.toFixed(2)} / ${dry.toFixed(2)} × 100% = ${pb.toFixed(2)}%.` : conclusion,
    ],
    isError: !valid,
    status,
    verdictClass: !valid ? 'error' : status === 'Dalam toleransi JMF' ? 'valid' : 'warning',
    conclusion,
    summaryString: valid ? `B = ${pb.toFixed(2)}% • ${status}` : status,
  }
}
