import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import user from '@testing-library/user-event';

import VideoCard from '../VideoCard.component';
import { wrapWithVideoContext } from '../../../state/testing';
import * as favoritesDB from '../../../utils/favoritesDB';

describe('VideoCard UI tests', () => {
  test('renders card with correct props', () => {
    render(
      wrapWithVideoContext(
        <MemoryRouter>
          <VideoCard
            key="test key"
            image="test image"
            title="test title"
            description="test description"
          />
        </MemoryRouter>,
        { auth: null }
      )
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('renders "Add favorite" button if the video is not favorite', () => {
    const addFav = jest.fn();
    favoritesDB.isFavorite = jest.fn(() => false);
    favoritesDB.addFavorite = jest.fn();
    render(
      wrapWithVideoContext(
        <MemoryRouter>
          <VideoCard
            key="test key"
            videoId="test id"
            image="test image"
            title="test title"
            description="test description"
          />
        </MemoryRouter>,
        { auth: { name: 'test' } },
        { addFav }
      )
    );
    const favorite = screen.getByRole('button', { name: /add favorite/i });
    expect(favorite).toBeInTheDocument();
    user.click(favorite);
    expect(addFav).toHaveBeenCalledTimes(1);
    expect(addFav).toHaveBeenCalledWith('test id');
  });

  test('renders "Remove favorite" button if the video is favorite', () => {
    const remFav = jest.fn();
    favoritesDB.isFavorite = jest.fn(() => true);
    favoritesDB.removeFavorite = jest.fn();
    render(
      wrapWithVideoContext(
        <MemoryRouter>
          <VideoCard
            key="test key"
            videoId="test id"
            image="test image"
            title="test title"
            description="test description"
          />
        </MemoryRouter>,
        { auth: { name: 'test' } },
        { remFav }
      )
    );
    const favorite = screen.getByRole('button', { name: /remove favorite/i });
    expect(favorite).toBeInTheDocument();
    user.click(favorite);
    expect(remFav).toHaveBeenCalledTimes(1);
    expect(remFav).toHaveBeenCalledWith('test id');
  });

  test('redirects to /video/** route when card is clicked', () => {
    let testLocation;
    render(
      wrapWithVideoContext(
        <MemoryRouter>
          <VideoCard
            key="test key"
            videoId="test id"
            image="test image"
            title="test title"
            description="test description"
          />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>,
        { auth: null }
      )
    );
    const video = screen.getByRole('button');
    user.click(video);
    expect(testLocation.pathname).toBe('/video/test id');
  });

  test('redirects to /favorites/** route when card is clicked', () => {
    let testLocation;
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/favorites']}>
          <VideoCard
            key="test key"
            videoId="test id"
            image="test image"
            title="test title"
            description="test description"
          />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>,
        { auth: null }
      )
    );
    const video = screen.getByRole('button');
    user.click(video);
    expect(testLocation.pathname).toBe('/favorites/test id');
  });
});
