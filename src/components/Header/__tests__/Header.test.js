import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import Header from '../Header.component';

describe('Header UI tests', () => {
  test('renders drawer and login buttons, search input and theme checkbox', () => {
    render(<Header />);
    const drawer = screen.getByRole('button', { name: /drawer/i });
    const login = screen.getByRole('button', { name: /login/i });
    const search = screen.getByRole('textbox', { name: /search/i });
    const theme = screen.getByRole('checkbox', { name: /theme/i });
    const themeText = screen.getByText(/dark mode/i);
    expect(drawer).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(theme).toBeInTheDocument();
    expect(themeText).toBeInTheDocument();
  });

  test('calls setSearch if search is an appropriate length', () => {
    const setSearch = jest.fn();
    const setVideo = jest.fn();
    render(<Header setSearch={setSearch} setVideo={setVideo} />);
    const search = screen.getByRole('textbox', { name: /search/i });
    user.clear(search);
    user.type(search, '1234{enter}');
    expect(setSearch).toHaveBeenCalledTimes(1);
    expect(setSearch.mock.calls[0][0]).toBe('1234');
    expect(setVideo).toHaveBeenCalledTimes(1);
    expect(setVideo.mock.calls[0][0]).toBe(null);
  });

  test('renders message if search is too short', () => {
    render(<Header />);
    const search = screen.getByRole('textbox', { name: /search/i });
    user.clear(search);
    user.type(search, '123{enter}');
    const message = screen.getByText(/search must be more than 3 characters/i);
    expect(message).toBeInTheDocument();
  });

  test('toggle overlay with home button', () => {
    const setVideo = jest.fn();
    render(<Header setVideo={setVideo} />);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    expect(screen.queryByTestId(/overlay/i)).toBeInTheDocument();
    const home = screen.getByRole('button', { name: /home/i });
    user.click(home);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
  });

  test('toggle overlay when clicking it', () => {
    render(<Header />);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
    const drawer = screen.getByRole('button', { name: /drawer/i });
    user.click(drawer);
    const overlay = screen.queryByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    user.click(overlay);
    expect(screen.queryByTestId(/overlay/i)).toBeNull();
  });
});
