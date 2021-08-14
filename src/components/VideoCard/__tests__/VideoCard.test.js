import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import VideoCard from '../VideoCard.component';

describe('VideoCard UI tests', () => {
  test('renders card with correct props', () => {
    render(
      <VideoCard
        key="Test key"
        image="Test image"
        title="Test title"
        description="Test description"
      />
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('setVideo is called when card is clicked', () => {
    const setVideo = jest.fn();
    render(
      <VideoCard
        key="Test key"
        videoId="Test id"
        image="Test image"
        title="Test title"
        description="Test description"
        setVideo={setVideo}
      />
    );
    const video = screen.getByRole('button');
    user.click(video);
    expect(setVideo).toHaveBeenCalledTimes(1);
    expect(setVideo).toHaveBeenCalledWith({
      videoId: 'Test id',
      title: 'Test title',
      description: 'Test description',
    });
  });
});
