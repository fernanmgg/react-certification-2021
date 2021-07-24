import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App.component';

describe('App UI tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders header', () => {
    const text = screen.getByText(/dark mode/i);
    expect(text).toBeInTheDocument();
  });

  test('renders home view', () => {
    const text = screen.getByText(/react bootcamp 2021/i);
    expect(text).toBeInTheDocument();
  });
});
