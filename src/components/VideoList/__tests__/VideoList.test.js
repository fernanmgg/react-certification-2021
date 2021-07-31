import React from 'react';
import { render, screen } from '@testing-library/react';

import VideoList from '../VideoList.component';
import { mockedVideos } from '../VideoList.mock';

describe('VideoList UI tests', () => {
  test('renders video cards', () => {
    render(<VideoList videos={mockedVideos} loading={false} error={false} />);
    const title1 = screen.getByText(/test title 1/i);
    const title2 = screen.getByText(/test title 2/i);
    const title3 = screen.getByText(/test title 3/i);
    const description1 = screen.getByText(/test description 1/i);
    const description2 = screen.getByText(/test description 2/i);
    const description3 = screen.getByText(/test description 3/i);
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(title3).toBeInTheDocument();
    expect(description1).toBeInTheDocument();
    expect(description2).toBeInTheDocument();
    expect(description3).toBeInTheDocument();
  });

  test('renders message if there are no videos', () => {
    render(<VideoList videos={[]} loading={false} error={false} />);
    const text = screen.queryByText(/search for videos.../i);
    expect(text).toBeInTheDocument();
  });

  test('renders message if there are no related videos', () => {
    render(<VideoList videos={[]} loading={false} error={false} related />);
    const text = screen.queryByText(/related videos.../i);
    expect(text).toBeInTheDocument();
  });

  test('renders message if the content is loading', () => {
    render(<VideoList videos={[]} loading error={false} />);
    const text = screen.queryByText(/loading.../i);
    expect(text).toBeInTheDocument();
  });

  test('renders message if there is an error', () => {
    render(<VideoList videos={[]} loading={false} error />);
    const text = screen.queryByText(/error getting videos. try again later.../i);
    expect(text).toBeInTheDocument();
  });
});
