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

async function testBp1Render() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { calculatorRegistry } = await vite.ssrLoadModule('/src/testCalculatorsData.js');
    const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx');

    const mod1 = calculatorRegistry['bp-1-1'];
    console.log('Testing TestCalculatorPanel bp-1-1 render:');
    const html = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: mod1,
        currentInputs: mod1.initialInputs,
        onInputChange: () => {},
        onResetInputs: () => {},
        onSaveToDashboard: () => {},
        onBackToDashboard: () => {},
      })
    );
    console.log('Successfully rendered bp-1-1!');
    console.log('HTML contains LA title:', html.includes('Uji Keausan Agregat dengan Mesin Abrasi Los Angeles'));
    console.log('HTML contains Keausan 500 Putaran:', html.includes('Keausan Agregat (500 Putaran)'));
    console.log('HTML does NOT contain 100 Putaran:', !html.includes('100 Putaran'));
    console.log('HTML does NOT contain B_100:', !html.includes('B_100'));
    console.log('HTML contains Berat Lolos:', html.includes('Berat Lolos Saringan No. 12'));
    console.log('HTML contains Status Kelayakan:', html.includes('Status Kelayakan Perkerasan'));
    console.log('HTML contains 23.00%:', html.includes('23.00%'));
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await vite.close();
    process.exit(0);
  }
}

testBp1Render();

