import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};
global.window = {
  scrollTo: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
};

async function testBp7Render() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { calculatorRegistry } = await vite.ssrLoadModule('/src/testCalculatorsData.js');
    const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx');

    const mod7 = calculatorRegistry['bp-7-1'];
    console.log('Testing TestCalculatorPanel bp-7-1 render:');
    const html = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: mod7,
        currentInputs: mod7.initialInputs,
        onInputChange: () => {},
        onResetInputs: () => {},
        onSaveToDashboard: () => {},
        onBackToDashboard: () => {},
      })
    );
    console.log('Successfully rendered bp-7-1!');
    console.log('HTML contains Saybolt title:', html.includes('Uji Viskositas Saybolt Furol'));
    console.log('HTML contains Bento Mixing:', html.includes('Rentang Suhu Pencampuran (Mixing)'));
    console.log('HTML contains Bento Compaction:', html.includes('Rentang Suhu Pemadatan (Compaction)'));
    console.log('HTML contains Viskositas 135:', html.includes('Viskositas Kinematik pada 135°C'));
    console.log('HTML contains Model Regresi:', html.includes('Model Regresi Semi-Logaritmik'));
    console.log('HTML contains Bina Marga 2018 preset:', html.includes('Bina Marga 2018'));
    console.log('HTML contains Standar Lab preset:', html.includes('Standar Lab'));
    console.log('HTML contains Kustom Manual preset:', html.includes('Kustom Manual'));
    console.log('HTML contains Tambah Titik Uji button:', html.includes('Tambah Titik Uji'));
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await vite.close();
    process.exit(0);
  }
}

testBp7Render();
