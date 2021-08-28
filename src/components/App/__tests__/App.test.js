import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import 'jest-styled-components';

import App from '../App.component';
import { lightTheme, darkTheme } from '../App.theme';
import * as useVideoListAPI from '../../../utils/hooks/useVideoListAPI';

useVideoListAPI.default = jest.fn(() => ({ videos: [], loading: false, error: false }));

describe('App UI tests', () => {
  test('renders header and home view, login button if there is no auth info in storage', () => {
    render(<App />);
    const header = screen.getByRole('button', { name: /login/i });
    const homeView = screen.getByText(/react bootcamp 2021/i);
    expect(header).toBeInTheDocument();
    expect(homeView).toBeInTheDocument();
    expect(useVideoListAPI.default).toHaveBeenCalled();
    expect(useVideoListAPI.default).toHaveBeenCalledWith('wizeline');
  });

  test('renders header and home view, logout button if there is auth info in storage', () => {
    const auth = { id: '123', name: 'test', avatarUrl: 'test' };
    localStorage.setItem('auth', JSON.stringify(auth));
    render(<App />);
    const header = screen.getByRole('button', { name: /logout/i });
    const homeView = screen.getByText(/react bootcamp 2021/i);
    expect(header).toBeInTheDocument();
    expect(homeView).toBeInTheDocument();
    expect(useVideoListAPI.default).toHaveBeenCalled();
    expect(useVideoListAPI.default).toHaveBeenCalledWith('wizeline');
  });

  test('theme changes when toggle is clicked', () => {
    render(<App />);
    const themeText = screen.getAllByText(/dark mode/i);
    expect(themeText[0]).toHaveStyleRule(
      'color',
      lightTheme.textLight.replace(/,\s/g, ',')
    );
    const theme = screen.getAllByRole('checkbox', { name: /theme/i });
    user.click(theme[0]);
    expect(themeText[0]).toHaveStyleRule(
      'color',
      darkTheme.textLight.replace(/,\s/g, ',')
    );
    user.click(theme[0]);
    expect(themeText[0]).toHaveStyleRule(
      'color',
      lightTheme.textLight.replace(/,\s/g, ',')
    );
  });
});
