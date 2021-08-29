import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './App.style';
import { lightTheme, darkTheme } from './App.theme';
import Header from '../Header';
import Content from '../../views/Content';
import { VideoContext, VideoContextData } from '../../state/Video.state';
import AppFavs from './App.favs';
import { getFavorites } from '../../utils/favoritesDB';

function App() {
  const { state, actions } = VideoContextData();
  const [theme, toggleTheme] = useState(false);

  if (!localStorage.getItem('123')) localStorage.setItem('123', JSON.stringify(AppFavs));
  if (!localStorage.getItem('Bv9uJPEosSfVRdwaaRpiNvOFdop1'))
    localStorage.setItem('Bv9uJPEosSfVRdwaaRpiNvOFdop1', JSON.stringify(AppFavs));

  const storageAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
  if (!state.auth && storageAuth) {
    actions.setAuth({
      auth: JSON.parse(storageAuth),
      favorites: getFavorites(JSON.parse(storageAuth).id),
    });
  }

  return (
    <VideoContext.Provider value={{ state, ...actions }}>
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
