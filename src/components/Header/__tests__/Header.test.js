import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import user from '@testing-library/user-event';
import _ from 'lodash';

import Header from '../Header.component';
import { wrapWithVideoContext, wrapWithThemeContext } from '../../../state/testing';
import * as app from '../../../firebase.config';

describe('Header UI tests', () => {
  test('renders drawer and auth buttons, search input and theme checkbox', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { search: '' },
          jest.fn()
        )}
      </MemoryRouter>
    );
    const drawer = screen.getByRole('button', { name: /drawer/i });
    const auth = screen.getAllByRole('button', { name: /auth/i });
    const search = screen.getByRole('textbox', { name: /search/i });
    const theme = screen.getAllByText(/dark mode/i);
    expect(drawer).toBeInTheDocument();
    expect(auth).toHaveLength(1);
    expect(search).toBeInTheDocument();
    expect(theme).toHaveLength(2);
  });

  test('calls setSearch after typing', () => {
    _.debounce = jest.fn((fn) => fn);
    const dispatch = jest.fn();
    render(
      <MemoryRouter>
        {wrapWithVideoContext(wrapWithThemeContext(<Header />), { search: '' }, dispatch)}
      </MemoryRouter>
    );
    const search = screen.getByRole('textbox', { name: /search/i });
    user.type(search, '1');
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH',
      payload: '1',
    });
  });

  test('toggles overlay with home button', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { search: '' },
          jest.fn()
        )}
      </MemoryRouter>
    );
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    const overlay = screen.queryByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    const home = screen.getByRole('button', { name: /home/i });
    user.click(home);
    expect(overlay).not.toBeInTheDocument();
  });

  test('toggles overlay with favorites button', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { auth: {}, search: '' },
          jest.fn()
        )}
      </MemoryRouter>
    );
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    const overlay = screen.queryByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    const favorites = screen.queryAllByRole('button', { name: /favorites/i })[0];
    user.click(favorites);
    expect(overlay).not.toBeInTheDocument();
  });

  test('toggles overlay when clicking it', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { search: '' },
          jest.fn()
        )}
      </MemoryRouter>
    );
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    const overlay = screen.queryByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    user.click(overlay);
    expect(overlay).not.toBeInTheDocument();
  });

  test('toggles user menu when clicking user button and somewhere else', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { auth: null, search: '' },
          jest.fn()
        )}
      </MemoryRouter>
    );
    expect(screen.queryAllByRole('button', { name: /login/i }).length).toEqual(1);
    const auth = screen.getByRole('button', { name: /auth/i });
    user.click(auth);
    expect(screen.queryAllByRole('button', { name: /login/i }).length).toEqual(2);
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    expect(screen.queryAllByRole('button', { name: /login/i }).length).toEqual(1);
  });

  test('toggles login modal when clicking any login button and then the overlay', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'login');
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { auth: null, search: '' },
          jest.fn()
        )}
      </MemoryRouter>,
      {
        container: document.body.appendChild(div),
      }
    );
    const login = screen.queryAllByRole('button', { name: /login/i })[0];
    expect(screen.queryByText(/log in/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/overlay/i)).not.toBeInTheDocument();
    user.click(login);
    const title = screen.getByText(/log in/i);
    const overlay = screen.queryByTestId(/overlay/i);
    expect(title).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    user.click(overlay);
    expect(title).not.toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();
  });

  test('shows login buttons when not authenticated', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { auth: null, search: '' },
          jest.fn()
        )}
      </MemoryRouter>
    );
    const auth = screen.getByRole('button', { name: /auth/i });
    user.click(auth);
    const login = screen.queryAllByRole('button', { name: /login/i });
    expect(login.length).toEqual(2);
  });

  test('shows username, favorites and logout buttons when authenticated', () => {
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { auth: { name: 'Test User' }, search: '' },
          jest.fn()
        )}
      </MemoryRouter>
    );
    const auth = screen.getByRole('button', { name: /auth/i });
    user.click(auth);
    const username = screen.queryByText(/test user/i);
    const favorites = screen.queryAllByRole('button', { name: /favorites/i });
    const logout = screen.queryAllByRole('button', { name: /logout/i });
    expect(username).toBeInTheDocument();
    expect(favorites.length).toEqual(2);
    expect(logout.length).toEqual(2);
  });

  test('dispatch is called to unset auth when logout button is clicked', () => {
    const dispatch = jest.fn();
    const mockedSignOut = jest.fn();
    app.default.auth = jest.fn(() => ({
      signOut: mockedSignOut,
    }));
    render(
      <MemoryRouter>
        {wrapWithVideoContext(
          wrapWithThemeContext(<Header />),
          { auth: {}, search: '' },
          dispatch
        )}
      </MemoryRouter>
    );
    const auth = screen.getByRole('button', { name: /auth/i });
    user.click(auth);
    const logout = screen.queryAllByRole('button', { name: /logout/i })[0];
    user.click(logout);
    expect(mockedSignOut).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'UNSET_AUTH' });
  });
});
