import assert from 'node:assert'
import { calculatorRegistry } from '../src/testCalculatorsData.js'

console.log('Testing JMF Module bp-8-1 with Default Laprak Universitas Tidar...')
const mod = calculatorRegistry['bp-8-1']
assert(mod !== undefined, 'Modul bp-8-1 terdaftar')
assert(mod.hasDynamicJmfMixDesign === true, 'Flag hasDynamicJmfMixDesign aktif')

const out = mod.calculate(mod.initialInputs)
console.log('Calculation success:', !out.isError)
console.log('KAA:', out.kaaMurni, '% -> Pb0:', out.pb0, '%')
console.log('Fraksi CA:', out.ca, '%, FA:', out.fa, '%, Filler:', out.filler, '%')
console.log('W_aspal:', out.wAspalRencana, 'g, W_agregat:', out.wAgregatRencana, 'g')

assert(out.ca === 39.0, 'CA = 39.0%')
assert(out.fa === 54.5, 'FA = 54.5%')
assert(out.filler === 6.5, 'Filler = 6.5%')
assert(out.wAspalRencana === 78.0, 'W_aspal = 78.0 gram')
assert(out.wAgregatRencana === 1122.0, 'W_agregat = 1122.0 gram')
assert(Math.abs(out.kaaMurni - 5.7375) < 1e-4, 'KAA murni = 5.7375%')
assert(out.allSpecOk === true, 'Semua ayakan memenuhi spesifikasi AC-WC Bina Marga 2018')
assert(out.mixDesignTable.length === 5, 'Tabel 11.4 memiliki 5 baris komposisi')
assert(out.mixDesignTable[0].persenCampuran === 36.465, 'CA terhadap campuran = 36.465%')
assert(out.mixDesignTable[1].persenCampuran === 50.958, 'FA terhadap campuran = 50.958%')
assert(out.mixDesignTable[2].persenCampuran === 6.078, 'Filler terhadap campuran = 6.078%')
assert(out.mixDesignTable[3].persenCampuran === 6.5, 'Aspal terhadap campuran = 6.5%')
assert(out.computedSieves.length === 12, 'Terdapat 12 baris ayakan')
assert(out.computedSieves[4].cumPassPct === 61.0, 'Lolos No. 4 = 61.0%')
assert(out.computedSieves[10].cumPassPct === 6.5, 'Lolos No. 200 = 6.5%')

console.log('ALL JMF MODULE ASSERTIONS PASSED 100%!')

