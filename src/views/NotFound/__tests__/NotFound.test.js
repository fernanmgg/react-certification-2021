import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NotFound from '../NotFound.view';

describe('NotFound UI tests', () => {
  test('renders "route not found" message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const text = screen.getByText(/route not found/i);
    expect(text).toBeInTheDocument();
  });
});
