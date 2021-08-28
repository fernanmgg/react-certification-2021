import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import 'jest-styled-components';

import VideoDetails from '../VideoDetails.view';
import * as useVideoAPI from '../../../utils/hooks/useVideoAPI';
import * as useVideoListAPI from '../../../utils/hooks/useVideoListAPI';
import { wrapWithVideoContext } from '../../../state/testing';

describe('VideoDetails UI tests', () => {
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
    useVideoListAPI.default = jest.fn(() => ({
      videos: [],
      loading: false,
      error: false,
    }));
    const { asFragment } = render(
      wrapWithVideoContext(
        <MemoryRouter initialEntries={['/video/testId']}>
          <Route path="/video/:videoId">
            <VideoDetails />
          </Route>
        </MemoryRouter>,
        { auth: null },
        jest.fn()
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
