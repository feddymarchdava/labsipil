import { calculatorRegistry, sidebarGroups } from '../src/testCalculatorsData.js'

console.log('=== TEST PENGHAPUSAN MODUL BAB 3 MEKANIKA FLUIDA (AMBANG TAJAM) ===\n')

let passCount = 0
let failCount = 0

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`)
    passCount++
  } else {
    console.error(`❌ FAIL: ${message}`)
    failCount++
  }
}

// 1. Verifikasi calculatorRegistry
console.log('--- 1. Verifikasi calculatorRegistry ---')
assert(calculatorRegistry['mf-4-1'] === undefined, "Modul 'mf-4-1' (Ambang Tajam) sudah DIHAPUS TOTAL dari calculatorRegistry (undefined)")
assert(Boolean(calculatorRegistry['mf-1-1']), "Modul 'mf-1-1' (Sifat Fluida) tetap aktif")
assert(Boolean(calculatorRegistry['mf-2-1']), "Modul 'mf-2-1' (Osborne Reynolds) tetap aktif")

// 2. Verifikasi sidebarGroups Sidebar
console.log('\n--- 2. Verifikasi Struktur Sidebar (sidebarGroups) ---')
const fluidaGroup = sidebarGroups.find(g => g.groupId === 'fluida')
assert(Boolean(fluidaGroup), "Group 'fluida' ditemukan di sidebarGroups")
assert(fluidaGroup.chapters.length === 2, `Group fluida hanya memiliki 2 bab (got ${fluidaGroup.chapters.length})`)

const chapterIds = fluidaGroup.chapters.map(c => c.chapterId)
assert(chapterIds.includes('mf-bab1'), "Bab 1 'mf-bab1' aktif")
assert(chapterIds.includes('mf-bab2'), "Bab 2 'mf-bab2' aktif")
assert(!chapterIds.includes('mf-bab3'), "Bab 3 'mf-bab3' sudah DIHAPUS dari sidebar")

const allFluidaItemIds = fluidaGroup.chapters.flatMap(c => c.items.map(i => i.id))
assert(allFluidaItemIds.length === 2, `Total item modul fluida di sidebar tepat 2 (got ${allFluidaItemIds.length})`)
assert(allFluidaItemIds.includes('mf-1-1'), "Item 'mf-1-1' ada di sidebar")
assert(allFluidaItemIds.includes('mf-2-1'), "Item 'mf-2-1' ada di sidebar")
assert(!allFluidaItemIds.includes('mf-4-1'), "Item 'mf-4-1' sudah tidak ada di sidebar")

console.log(`\n=== SUMMARY: ${passCount} PASSED, ${failCount} FAILED ===`)
if (failCount > 0) process.exit(1)
