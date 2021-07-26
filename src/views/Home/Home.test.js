import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './Home.view';

describe('Home UI tests', () => {
  test('renders "React Bootcamp 2021"', () => {
    render(<Home />);
    const title = screen.getByText(/react bootcamp 2021/i);
    expect(title).toBeInTheDocument();
  });
});
