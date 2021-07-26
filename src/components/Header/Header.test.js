import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './Header.component';

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
});
