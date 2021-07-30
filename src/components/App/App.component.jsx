import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from './App.theme';
import { GlobalStyle } from './App.style';
import Header from '../Header';
import Content from '../../views/Content';
import random from '../../utils/random';

function App() {
  useEffect(() => {
    const { body } = document;

    const intervalId = setInterval(() => {
      const xPercent = random(100);
      const yPercent = random(100);
      body.style.setProperty('--bg-position', `${xPercent}% ${yPercent}%`);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Header />
      <Content />
    </ThemeProvider>
  );
}

export default App;
