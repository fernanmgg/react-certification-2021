import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';

import VideoDetails from '../VideoDetails.view';
import * as useVideoAPI from '../../../utils/hooks/useVideoAPI';
import * as useVideoListAPI from '../../../utils/hooks/useVideoListAPI';

useVideoAPI.default = jest.fn(() => ({
  video: { title: 'Test title', description: 'Test description' },
}));
useVideoListAPI.default = jest.fn(() => ({ videos: [], loading: false, error: false }));

describe('VideoDetails UI tests', () => {
  test('renders details with correct props', () => {
    render(
      <MemoryRouter initialEntries={['/video/Test id']}>
        <Route path="/video/:videoId">
          <VideoDetails />
        </Route>
      </MemoryRouter>
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(useVideoAPI.default).toHaveBeenCalled();
    expect(useVideoAPI.default).toHaveBeenCalledWith('Test id');
    expect(useVideoListAPI.default).toHaveBeenCalled();
    expect(useVideoListAPI.default).toHaveBeenCalledWith('Test id', true);
  });
});
