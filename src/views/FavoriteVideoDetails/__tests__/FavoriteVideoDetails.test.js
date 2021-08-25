import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import user from '@testing-library/user-event';

import FavoriteVideoDetails from '../FavoriteVideoDetails.view';
import * as useVideoAPI from '../../../utils/hooks/useVideoAPI';
import { wrapWithVideoContext } from '../../../state/testing';
import * as favoritesDB from '../../../utils/favoritesDB';

const video = {
  snippet: {
    title: 'test title',
    description: 'test description',
    thumbnails: {
      medium: {
        url: 'test',
      },
    },
  },
};

useVideoAPI.default = jest.fn(() => ({ video }));

describe('FavoriteVideoDetails UI tests', () => {
  test('renders details with correct props', () => {
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/favorites/Test id']}>
          <Route path="/favorites/:videoId">
            <FavoriteVideoDetails />
          </Route>
        </MemoryRouter>,
        { auth: { name: 'test' }, favorites: [] },
        jest.fn()
      )
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(useVideoAPI.default).toHaveBeenCalled();
    expect(useVideoAPI.default).toHaveBeenCalledWith('Test id');
  });

  test('renders "Add favorite" button if the video is not favorite', () => {
    const dispatch = jest.fn();
    favoritesDB.isFavorite = jest.fn(() => false);
    favoritesDB.addFavorite = jest.fn();
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/video/testId']}>
          <Route path="/video/:videoId">
            <FavoriteVideoDetails />
          </Route>
        </MemoryRouter>,
        { auth: { name: 'test' }, favorites: [] },
        dispatch
      )
    );
    const favorite = screen.getByRole('button', { name: /add favorite/i });
    expect(favorite).toBeInTheDocument();
    user.click(favorite);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_FAVORITE', payload: 'testId' });
  });

  test('renders "Remove favorite" button if the video is favorite', () => {
    const dispatch = jest.fn();
    favoritesDB.isFavorite = jest.fn(() => true);
    favoritesDB.removeFavorite = jest.fn();
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/video/testId']}>
          <Route path="/video/:videoId">
            <FavoriteVideoDetails />
          </Route>
        </MemoryRouter>,
        { auth: { name: 'test' }, favorites: [] },
        dispatch
      )
    );
    const favorite = screen.getByRole('button', { name: /remove favorite/i });
    expect(favorite).toBeInTheDocument();
    user.click(favorite);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_FAVORITE', payload: 'testId' });
  });
});
