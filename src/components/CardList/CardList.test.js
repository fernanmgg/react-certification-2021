import React from 'react';
import { render, screen } from '@testing-library/react';

import CardList from './CardList.component';
import * as youtubeAPI from '../../utils/youtubeAPI';
import { mockedVideos } from './CardList.test.mock';

youtubeAPI.getVideos = jest.fn();

describe('CardList UI tests', () => {
  test('renders video cards', () => {
    youtubeAPI.getVideos.mockReturnValue(mockedVideos);
    render(<CardList />);
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
    youtubeAPI.getVideos.mockReturnValue([]);
    render(<CardList />);
    const text = screen.getByText(/no videos found/i);
    expect(text).toBeInTheDocument();
  });
});
