import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App.component';

describe('App UI tests', () => {
  test('renders "React Bootcamp 2021"', () => {
    render(<App />);
    const title = screen.getByText(/react bootcamp 2021/i);
    expect(title).toBeInTheDocument();
  });
});
