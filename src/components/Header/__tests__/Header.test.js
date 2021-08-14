import React from 'react';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import _ from 'lodash';

import Header from '../Header.component';

describe('Header UI tests', () => {
  test('renders drawer and login buttons, search input and theme checkbox', () => {
    // eslint-disable-next-line no-undef
    renderWithThemeContext(<Header />);
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
    const setSearch = jest.fn();
    const setVideo = jest.fn();
    // eslint-disable-next-line no-undef
    renderWithThemeContext(<Header setSearch={setSearch} setVideo={setVideo} />);
    const search = screen.getByRole('textbox', { name: /search/i });
    user.type(search, '1');
    expect(setSearch).toHaveBeenCalledTimes(1);
    expect(setSearch.mock.calls[0][0]).toBe('1');
    expect(setVideo).toHaveBeenCalledTimes(1);
    expect(setVideo.mock.calls[0][0]).toBe(null);
  });

  test('toggle overlay with home button', () => {
    const setVideo = jest.fn();
    // eslint-disable-next-line no-undef
    renderWithThemeContext(<Header setVideo={setVideo} />);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    expect(screen.queryByTestId(/overlay/i)).toBeInTheDocument();
    const home = screen.getByRole('button', { name: /home/i });
    user.click(home);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
  });

  test('toggle overlay when clicking it', () => {
    // eslint-disable-next-line no-undef
    renderWithThemeContext(<Header />);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    const overlay = screen.queryByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    user.click(overlay);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
  });
});
