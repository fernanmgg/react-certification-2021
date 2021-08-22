import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
        <Router>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Content />
        </Router>
      </ThemeProvider>
    </VideoContext.Provider>
  );
}

export default App;
