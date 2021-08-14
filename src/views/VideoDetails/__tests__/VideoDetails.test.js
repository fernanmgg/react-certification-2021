import React from 'react';
import { render, screen } from '@testing-library/react';

import VideoDetails from '../VideoDetails.view';
import * as useVideoAPI from '../../../utils/hooks/useVideoAPI';

useVideoAPI.default = jest.fn(() => ({ videos: [], loading: false, error: false }));

describe('VideoDetails UI tests', () => {
  test('renders details with correct props', () => {
    const video = {
      videoId: 'Test id',
      title: 'Test title',
      description: 'Test description',
    };
    render(<VideoDetails video={video} />);
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(useVideoAPI.default).toHaveBeenCalled();
    expect(useVideoAPI.default).toHaveBeenCalledWith('Test id', true);
  });
});
