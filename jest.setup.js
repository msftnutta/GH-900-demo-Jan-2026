// Add custom jest matchers from jest-dom
require('@testing-library/jest-dom');

// Mock the DOM elements that are used in the tests
global.document.getElementById = jest.fn((id) => {
  const elements = {
    'current-date': { textContent: '' },
    'current-time': { textContent: '' },
    'timezone': { textContent: '' },
    'weather-container': { style: { display: 'none' } },
    'loading': { style: { display: 'block' } },
    'error-message': { style: { display: 'none' } }
  };
  return elements[id] || { textContent: '', style: { display: 'none' } };
});
