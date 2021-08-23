import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';

import FavoriteVideoDetails from '../FavoriteVideoDetails.view';
import * as useVideoAPI from '../../../utils/hooks/useVideoAPI';
import { wrapWithVideoContext } from '../../../state/testing';

useVideoAPI.default = jest.fn(() => ({
  video: { title: 'Test title', description: 'Test description' },
}));

describe('FavoriteVideoDetails UI tests', () => {
  test('renders details with correct props', () => {
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/favorites/Test id']}>
          <Route path="/favorites/:videoId">
            <FavoriteVideoDetails />
          </Route>
        </MemoryRouter>,
        { favorites: [] },
        jest.fn()
      )
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(useVideoAPI.default).toHaveBeenCalled();
    expect(useVideoAPI.default).toHaveBeenCalledWith('Test id');
  });
});
