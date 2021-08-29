import React from 'react';
import { ThemeProvider } from 'styled-components';

import { VideoContext } from './Video.state';
import { lightTheme as theme } from '../components/App/App.theme';

const wrapWithThemeContext = (children) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const wrapWithVideoContext = (children, state = {}, actions = {}) => {
  return (
    <VideoContext.Provider value={{ state, ...actions }}>
      {children}
    </VideoContext.Provider>
  );
};

export { wrapWithThemeContext, wrapWithVideoContext };
