import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Content from '../Content.view';
import { wrapWithVideoContext } from '../../../state/testing';

describe('Content UI tests', () => {
  test('renders Home view by default', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(<Content />, { search: '' }, jest.fn())}
      </MemoryRouter>
    );
    const text = screen.getByText(/react bootcamp 2021/i);
    expect(text).toBeInTheDocument();
  });
});
