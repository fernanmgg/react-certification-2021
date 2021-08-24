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
        { auth: null },
        jest.fn()
      )
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('renders "Add favorite" button if the video is not favorite', () => {
    const dispatch = jest.fn();
    favoritesDB.isFavorite = jest.fn(() => false);
    const video = {
      id: { videoId: 'test id' },
      snippet: {
        title: 'test title',
        description: 'test description',
        thumbnails: { medium: { url: 'test image' } },
      },
    };
    render(
      wrapWithVideoContext(
        <MemoryRouter>
          <VideoCard
            key="test key"
            videoId={video.id.videoId}
            image={video.snippet.thumbnails.medium.url}
            title={video.snippet.title}
            description={video.snippet.description}
          />
        </MemoryRouter>,
        { auth: { name: 'test' } },
        dispatch
      )
    );
    const favorite = screen.getByRole('button', { name: /add favorite/i });
    expect(favorite).toBeInTheDocument();
    user.click(favorite);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_FAVORITE',
      payload: { name: 'test', video },
    });
  });

  test('renders "Remove favorite" button if the video is favorite', () => {
    const dispatch = jest.fn();
    favoritesDB.isFavorite = jest.fn(() => true);
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
        dispatch
      )
    );
    const favorite = screen.getByRole('button', { name: /remove favorite/i });
    expect(favorite).toBeInTheDocument();
    user.click(favorite);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FAVORITE',
      payload: { name: 'test', videoId: 'test id' },
    });
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
        { auth: null },
        jest.fn()
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
        { auth: null },
        jest.fn()
      )
    );
    const video = screen.getByRole('button');
    user.click(video);
    expect(testLocation.pathname).toBe('/favorites/test id');
  });
});
