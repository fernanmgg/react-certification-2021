import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import VideoCard from '../VideoCard.component';
import { wrapWithVideoContext } from '../../../state/testing';

describe('VideoCard UI tests', () => {
  test('renders card with correct props', () => {
    render(
      wrapWithVideoContext(
        <VideoCard
          key="Test key"
          image="Test image"
          title="Test title"
          description="Test description"
        />,
        {},
        jest.fn()
      )
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('setVideo is called when card is clicked', () => {
    const dispatch = jest.fn();
    render(
      wrapWithVideoContext(
        <VideoCard
          key="Test key"
          videoId="Test id"
          image="Test image"
          title="Test title"
          description="Test description"
        />,
        {},
        dispatch
      )
    );
    const video = screen.getByRole('button');
    user.click(video);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_VIDEO',
      payload: {
        videoId: 'Test id',
        title: 'Test title',
        description: 'Test description',
      },
    });
  });
});
