import React from 'react';
import { render, screen } from '@testing-library/react';

import Content from '../Content.view';
import { wrapWithVideoContext } from '../../../state/testing';

describe('Content UI tests', () => {
  test('renders Home view if video is null', () => {
    render(wrapWithVideoContext(<Content />, { search: '', video: null }, jest.fn()));
    const text = screen.getByText(/react bootcamp 2021/i);
    expect(text).toBeInTheDocument();
  });

  test('renders VideoDetails view if video is set', () => {
    const video = {
      videoId: 'Test id',
      title: 'Test title',
      description: 'Test description',
    };
    render(wrapWithVideoContext(<Content />, { video }, jest.fn()));
    const title = screen.getByText(/test title/i);
    expect(title).toBeInTheDocument();
  });
});
