import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

async function testRender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { calculatorRegistry } = await vite.ssrLoadModule('/src/testCalculatorsData.js');
    const { default: TestCalculatorPanel } = await vite.ssrLoadModule('/src/TestCalculatorPanel.jsx');

    const testConfig = calculatorRegistry['mt-5-1'];
    console.log('Loaded mt-5-1 config:', Boolean(testConfig));

    // Test case 1: with default initialInputs
    console.log('\n--- Test 1: default initialInputs ---');
    try {
      const html1 = ReactDOMServer.renderToString(
        React.createElement(TestCalculatorPanel, {
          testConfig,
          currentInputs: testConfig.initialInputs,
          onInputChange: () => {},
          onResetInputs: () => {},
          onSaveToDashboard: () => {},
          onBackToDashboard: () => {},
        })
      );
      console.log('Test 1 success, html length:', html1.length);
    } catch (err) {
      console.error('Test 1 failed:', err);
    }

    // Test case 2: with empty inputs (or localStorage empty object)
    console.log('\n--- Test 2: empty object {} ---');
    try {
      const html2 = ReactDOMServer.renderToString(
        React.createElement(TestCalculatorPanel, {
          testConfig,
          currentInputs: {},
          onInputChange: () => {},
          onResetInputs: () => {},
          onSaveToDashboard: () => {},
          onBackToDashboard: () => {},
        })
      );
      console.log('Test 2 success, html length:', html2.length);
    } catch (err) {
      console.error('Test 2 failed:', err);
    }

    // Test case 3: with legacy localStorage inputs (sigma1, tau1, etc.)
    console.log('\n--- Test 3: legacy stored inputs { sigma1, tau1... } ---');
    try {
      const html3 = ReactDOMServer.renderToString(
        React.createElement(TestCalculatorPanel, {
          testConfig,
          currentInputs: {
            sigma1: '0.5',
            tau1: '0.3',
            sigma2: '1.0',
            tau2: '0.6',
            sigma3: '1.5',
            tau3: '0.9',
          },
          onInputChange: () => {},
          onResetInputs: () => {},
          onSaveToDashboard: () => {},
          onBackToDashboard: () => {},
        })
      );
      console.log('Test 3 success, html length:', html3.length);
    } catch (err) {
      console.error('Test 3 failed:', err);
    }

    // Test case 4: with empty points [{ area: 31.17, normalLoad: '', shearForce: '' }]
    console.log('\n--- Test 4: empty points ---');
    try {
      const html4 = ReactDOMServer.renderToString(
        React.createElement(TestCalculatorPanel, {
          testConfig,
          currentInputs: {
            points: [
              { id: 1, area: 31.17, normalLoad: '', shearForce: '', sigma: '', tau: '' },
              { id: 2, area: 31.17, normalLoad: '', shearForce: '', sigma: '', tau: '' },
              { id: 3, area: 31.17, normalLoad: '', shearForce: '', sigma: '', tau: '' },
            ],
          },
          onInputChange: () => {},
          onResetInputs: () => {},
          onSaveToDashboard: () => {},
          onBackToDashboard: () => {},
        })
      );
      console.log('Test 4 success, html length:', html4.length);
    } catch (err) {
      console.error('Test 4 failed:', err);
    }

    // Test case 5: with null or undefined currentInputs
    console.log('\n--- Test 5: null currentInputs ---');
    try {
      const html5 = ReactDOMServer.renderToString(
        React.createElement(TestCalculatorPanel, {
          testConfig,
          currentInputs: null,
          onInputChange: () => {},
          onResetInputs: () => {},
          onSaveToDashboard: () => {},
          onBackToDashboard: () => {},
        })
      );
      console.log('Test 5 success, html length:', html5.length);
    } catch (err) {
      console.error('Test 5 failed:', err);
    }

  } finally {
    await vite.close();
  }
}

testRender();

