import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import _ from 'lodash';

import Header from '../Header.component';
import { wrapWithVideoContext, wrapWithThemeContext } from '../../../state/testing';

describe('Header UI tests', () => {
  test('renders drawer and login buttons, search input and theme checkbox', () => {
    render(
      wrapWithVideoContext(wrapWithThemeContext(<Header />), { search: '' }, jest.fn())
    );
    const drawer = screen.getByRole('button', { name: /drawer/i });
    const login = screen.getAllByRole('button', { name: /login/i });
    const search = screen.getByRole('textbox', { name: /search/i });
    const theme = screen.getAllByText(/dark mode/i);
    expect(drawer).toBeInTheDocument();
    expect(login).toHaveLength(2);
    expect(search).toBeInTheDocument();
    expect(theme).toHaveLength(2);
  });

  test('calls setSearch after typing', () => {
    _.debounce = jest.fn((fn) => fn);
    const dispatch = jest.fn();
    render(
      wrapWithVideoContext(wrapWithThemeContext(<Header />), { search: '' }, dispatch)
    );
    const search = screen.getByRole('textbox', { name: /search/i });
    user.type(search, '1');
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toStrictEqual({
      type: 'SET_SEARCH',
      payload: '1',
    });
    expect(dispatch.mock.calls[1][0]).toStrictEqual({
      type: 'UNSET_VIDEO',
    });
  });

  test('toggle overlay with home button', () => {
    render(
      wrapWithVideoContext(wrapWithThemeContext(<Header />), { search: '' }, jest.fn())
    );
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    expect(screen.queryByTestId(/overlay/i)).toBeInTheDocument();
    const home = screen.getByRole('button', { name: /home/i });
    user.click(home);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
  });

  test('toggle overlay when clicking it', () => {
    render(
      wrapWithVideoContext(wrapWithThemeContext(<Header />), { search: '' }, jest.fn())
    );
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    const overlay = screen.queryByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    user.click(overlay);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
  });
});
