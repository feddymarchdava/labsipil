import fs from 'fs';

console.log('Inspecting TestCalculatorPanel.jsx...');

const panelContent = fs.readFileSync('src/TestCalculatorPanel.jsx', 'utf8');

// Check import location
const importMarker = "  interpolateMarshallCorrelation,\n} from './testCalculatorsData'";
console.log('Import marker found:', panelContent.includes(importMarker));

// Check hasNegativeInput location
const hasNegativeMarker = "const hasNegativeInput = negativeFields.length > 0";
console.log('hasNegativeMarker found:', panelContent.includes(hasNegativeMarker));

// Check branch location
const branchMarker = "      ) : testConfig.hasDynamicFlashSamples ? (";
console.log('branchMarker found:', panelContent.includes(branchMarker));

// Check standard output column recapTable insertion point
const recapMarker = "{/* Kotak Tahapan Rumus */}";
console.log('recapMarker found:', panelContent.includes(recapMarker));

