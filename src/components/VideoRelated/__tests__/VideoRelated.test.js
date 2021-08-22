import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import user from '@testing-library/user-event';

import VideoRelated from '../VideoRelated.component';

describe('VideoRelated UI tests', () => {
  test('renders related video with correct props', () => {
    render(
      <MemoryRouter>
        <VideoRelated
          key="Test key"
          image="Test image"
          title="Test title"
          description="Test description"
        />
      </MemoryRouter>
    );
    const title = screen.getByText(/test title/i);
    expect(title).toBeInTheDocument();
  });

  test('setVideo is called when related video is clicked', () => {
    let testLocation;
    render(
      <MemoryRouter>
        <VideoRelated
          key="Test key"
          videoId="Test id"
          image="Test image"
          title="Test title"
          description="Test description"
        />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );
    const video = screen.getByRole('button');
    user.click(video);
    expect(testLocation.pathname).toBe('/video/Test id');
  });
});
