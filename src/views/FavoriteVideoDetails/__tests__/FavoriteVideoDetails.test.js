import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import 'jest-styled-components';

import FavoriteVideoDetails from '../FavoriteVideoDetails.view';
import * as useVideoAPI from '../../../utils/hooks/useVideoAPI';
import { wrapWithVideoContext } from '../../../state/testing';
import * as favoritesDB from '../../../utils/favoritesDB';

describe('FavoriteVideoDetails UI tests', () => {
  test('renders correctly', () => {
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
    favoritesDB.isFavorite = jest.fn(() => false);
    favoritesDB.getFavoritesInfo = jest.fn(() => []);
    const { asFragment } = render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/favorites/testId']}>
          <Route path="/favorites/:videoId">
            <FavoriteVideoDetails />
          </Route>
        </MemoryRouter>,
        { auth: { name: 'test' }, favorites: [] }
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
