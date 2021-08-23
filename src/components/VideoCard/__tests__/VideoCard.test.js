import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import user from '@testing-library/user-event';

import VideoCard from '../VideoCard.component';

describe('VideoCard UI tests', () => {
  test('renders card with correct props', () => {
    render(
      <MemoryRouter>
        <VideoCard
          key="Test key"
          image="Test image"
          title="Test title"
          description="Test description"
        />
      </MemoryRouter>
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('redirects to /video/** route when card is clicked', () => {
    let testLocation;
    render(
      <MemoryRouter>
        <VideoCard
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

  test('redirects to /favorites/** route when card is clicked', () => {
    let testLocation;
    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <VideoCard
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
    expect(testLocation.pathname).toBe('/favorites/Test id');
  });
});
