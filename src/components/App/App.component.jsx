import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './App.style';
import { lightTheme, darkTheme } from './App.theme';
import Header from '../Header';
import Content from '../../views/Content';
import { VideoContext, initialState, reducer } from '../../state/Video.state';
import AppFavs from './App.favs';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, toggleTheme] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('favorites'))
      localStorage.setItem('favorites', JSON.stringify(AppFavs));

    const localAuth = localStorage.getItem('auth');
    if (localAuth) {
      dispatch({
        type: 'SET_AUTH',
        payload: { auth: JSON.parse(localAuth), remember: true },
      });
    }
  }, []);

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
