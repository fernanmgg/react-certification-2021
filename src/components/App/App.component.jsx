import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './App.style';
import { lightTheme, darkTheme } from './App.theme';
import Header from '../Header';
import Content from '../../views/Content';
import { VideoContext, initialState, reducer } from '../../state/Video.state';
import AppFavs from './App.favs';
import { getFavorites } from '../../utils/favoritesDB';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, toggleTheme] = useState(false);

  if (!localStorage.getItem('123')) localStorage.setItem('123', JSON.stringify(AppFavs));
  if (!localStorage.getItem('Bv9uJPEosSfVRdwaaRpiNvOFdop1'))
    localStorage.setItem('Bv9uJPEosSfVRdwaaRpiNvOFdop1', JSON.stringify(AppFavs));

  const storageAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
  if (!state.auth && storageAuth) {
    dispatch({
      type: 'SET_AUTH',
      payload: {
        auth: JSON.parse(storageAuth),
        favorites: getFavorites(JSON.parse(storageAuth).id),
      },
    });
  }

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
