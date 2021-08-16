import React, { useState, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './App.style';
import { lightTheme, darkTheme } from './App.theme';
import Header from '../Header';
import Content from '../../views/Content';
import { VideoContext, initialState, reducer } from '../../state/Video.state';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, toggleTheme] = useState(false);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={!theme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Content />
      </ThemeProvider>
    </VideoContext.Provider>
  );
}

export default App;
