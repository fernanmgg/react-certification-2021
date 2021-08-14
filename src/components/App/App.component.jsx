import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './App.style';
import { lightTheme } from './App.theme';
import Header from '../Header';
import Content from '../../views/Content';
import useVideoAPI from '../../utils/hooks/useVideoAPI';

function App() {
  const [search, setSearch] = useState('wizeline');
  const [video, setVideo] = useState(null);
  const { videos, loading, error } = useVideoAPI(search);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Header search={search} setSearch={setSearch} setVideo={setVideo} />
      <Content
        videos={videos}
        loading={loading}
        error={error}
        video={video}
        setVideo={setVideo}
      />
    </ThemeProvider>
  );
}

export default App;
