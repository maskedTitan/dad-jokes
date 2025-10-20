import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Basic smoke test - just ensure the app renders without errors
  });
});
