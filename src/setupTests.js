// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { lightTheme as theme } from './components/App/App.theme';

global.renderWithThemeContext = (children) => {
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
