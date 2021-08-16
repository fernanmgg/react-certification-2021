import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import VideoRelated from '../VideoRelated.component';
import { wrapWithVideoContext } from '../../../state/testing';

describe('VideoRelated UI tests', () => {
  test('renders related video with correct props', () => {
    render(
      wrapWithVideoContext(
        <VideoRelated
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
    expect(title).toBeInTheDocument();
  });

  test('setVideo is called when related video is clicked', () => {
    const dispatch = jest.fn();
    render(
      wrapWithVideoContext(
        <VideoRelated
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
