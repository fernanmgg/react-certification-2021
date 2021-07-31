import React from 'react';

import { Title, Wrapper } from './Home.style';
import VideoList from '../../components/VideoList';

function Home({ videos, loading, error }) {
  return (
    <>
      <Title>React Bootcamp 2021</Title>
      <Wrapper>
        <VideoList videos={videos} loading={loading} error={error} />
      </Wrapper>
    </>
  );
}

export default Home;
