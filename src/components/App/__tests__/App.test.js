import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import 'jest-styled-components';

import App from '../App.component';
import { lightTheme, darkTheme } from '../App.theme';
import * as useVideoAPI from '../../../utils/hooks/useVideoAPI';

useVideoAPI.default = jest.fn(() => ({ videos: [], loading: false, error: false }));

describe('App UI tests', () => {
  test('renders header and home view', () => {
    render(<App />);
    const header = screen.getAllByText(/dark mode/i);
    const homeView = screen.getByText(/react bootcamp 2021/i);
    expect(header).toHaveLength(2);
    expect(homeView).toBeInTheDocument();
    expect(useVideoAPI.default).toHaveBeenCalled();
    expect(useVideoAPI.default).toHaveBeenCalledWith('wizeline');
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
