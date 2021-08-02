import React from 'react';
import { render, screen } from '@testing-library/react';

import VideoDetails from '../VideoDetails.view';
import * as useFetch from '../../../utils/hooks/useFetch';

useFetch.default = jest.fn(() => ({ videos: [], loading: false, error: false }));

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
    expect(useFetch.default).toHaveBeenCalledTimes(1);
    expect(useFetch.default).toHaveBeenCalledWith('Test id', true);
  });
});
