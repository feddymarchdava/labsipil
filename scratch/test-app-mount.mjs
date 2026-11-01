import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Mock browser globals
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

async function testAppWithMt51() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { calculatorRegistry } = await vite.ssrLoadModule('/src/testCalculatorsData.js');
    const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx');

    console.log('Testing TestCalculatorPanel mt-5-1 render:');
    const html = ReactDOMServer.renderToString(
      React.createElement(TestCalculatorPanel, {
        testConfig: calculatorRegistry['mt-5-1'],
        currentInputs: calculatorRegistry['mt-5-1'].initialInputs,
        onInputChange: () => {},
        onResetInputs: () => {},
        onSaveToDashboard: () => {},
        onBackToDashboard: () => {},
      })
    );
    console.log('Successfully rendered TestCalculatorPanel mt-5-1!');
    console.log('HTML contains Direct Shear title:', html.includes('Pengujian Kuat Geser Langsung'));
    console.log('HTML contains Mohr-Coulomb curve:', html.includes('Garis Keruntuhan Mohr-Coulomb'));
    console.log('HTML contains formula steps:', html.includes('LANGKAH RUMUS PERHITUNGAN'));
    console.log('HTML contains Kohesi card:', html.includes('Kohesi Tanah (c)'));
    console.log('HTML contains Sudut Geser card:', html.includes('Sudut Geser Dalam (ϕ)'));
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await vite.close();
  }
}

testAppWithMt51();
