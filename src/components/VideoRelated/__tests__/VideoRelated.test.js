import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import VideoRelated from '../VideoRelated.component';

describe('VideoRelated UI tests', () => {
  test('renders related video with correct props', () => {
    render(
      <VideoRelated
        key="Test key"
        image="Test image"
        title="Test title"
        description="Test description"
      />
    );
    const title = screen.getByText(/test title/i);
    expect(title).toBeInTheDocument();
  });

  test('setVideo is called when related video is clicked', () => {
    const setVideo = jest.fn();
    render(
      <VideoRelated
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
