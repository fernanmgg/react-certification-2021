import React, { useState, useLayoutEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './App.style';
import { lightTheme } from './App.theme';
import Header from '../Header';
import Content from '../../views/Content';
import useFetch from '../../utils/hooks/useFetch';
import random from '../../utils/random';

function App() {
  const [search, setSearch] = useState('');
  const { videos, loading, error } = useFetch(search);

  useLayoutEffect(() => {
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
      <Header setSearch={setSearch} />
      <Content videos={videos} loading={loading} error={error} />
    </ThemeProvider>
  );
}

export default App;
