import React from 'react';
import { render, screen } from '@testing-library/react';

import Favorites from '../Favorites.view';
import { wrapWithVideoContext } from '../../../state/testing';

describe('Favorites UI tests', () => {
  test('renders "Test\'s Favorite Videos"', () => {
    render(
      wrapWithVideoContext(
        <Favorites />,
        { auth: { name: 'Test' }, favorites: [] },
        jest.fn()
      )
    );
    const title = screen.getByText(/test's favorite videos/i);
    expect(title).toBeInTheDocument();
  });
});
