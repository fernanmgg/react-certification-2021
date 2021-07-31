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
    render(<Header setSearch={setSearch} />);
    const search = screen.getByRole('textbox', { name: /search/i });
    user.clear(search);
    user.type(search, '1234{enter}');
    expect(setSearch).toHaveBeenCalledTimes(1);
  });

  test('renders message if search is too short', () => {
    render(<Header />);
    const search = screen.getByRole('textbox', { name: /search/i });
    user.clear(search);
    user.type(search, '123{enter}');
    const message = screen.getByText(/search must be more than 3 characters/i);
    expect(message).toBeInTheDocument();
  });
});
