import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import user from '@testing-library/user-event';

import Details from '../Details.component';
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

useVideoAPI.default = jest.fn(() => ({ video, redirect: false, fetchError: false }));

describe('Details UI tests', () => {
  test('renders details with correct props', () => {
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/video/testId']}>
          <Route path="/video/:videoId">
            <Details />
          </Route>
        </MemoryRouter>,
        { auth: null },
        jest.fn()
      )
    );
    const title = screen.getByText(/test title/i);
    const description = screen.getByText(/test description/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(useVideoAPI.default).toHaveBeenCalled();
    expect(useVideoAPI.default).toHaveBeenCalledWith('testId');
  });

  test('renders "Add favorite" button if the video is not favorite', () => {
    const dispatch = jest.fn();
    favoritesDB.isFavorite = jest.fn(() => false);
    favoritesDB.addFavorite = jest.fn();
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/video/testId']}>
          <Route path="/video/:videoId">
            <Details />
          </Route>
        </MemoryRouter>,
        { auth: { name: 'test' } },
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
            <Details />
          </Route>
        </MemoryRouter>,
        { auth: { name: 'test' } },
        dispatch
      )
    );
    const favorite = screen.getByRole('button', { name: /remove favorite/i });
    expect(favorite).toBeInTheDocument();
    user.click(favorite);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_FAVORITE', payload: 'testId' });
  });

  test('renders error message if there is a problem fetching data', () => {
    useVideoAPI.default = jest.fn(() => ({
      video: null,
      redirect: false,
      fetchError: true,
    }));
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/video/testId']}>
          <Route path="/video/:videoId">
            <Details />
          </Route>
        </MemoryRouter>,
        { auth: null },
        jest.fn()
      )
    );
    expect(screen.getByText(/error fetching details.../i)).toBeInTheDocument();
  });

  test('redirects to 404 route if video does not exist', () => {
    useVideoAPI.default = jest.fn(() => ({
      video: null,
      redirect: true,
      fetchError: true,
    }));
    render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/video/:videoId']}>
          <Route path="/video/:videoId">
            <Details />
          </Route>
          <Route path="/404">404</Route>
        </MemoryRouter>,
        {},
        jest.fn()
      )
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
