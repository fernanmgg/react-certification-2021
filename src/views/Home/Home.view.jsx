import React from 'react';

import { Title, Wrapper } from './Home.style';
import VideoList from '../../components/VideoList';

function Home() {
  return (
    <>
      <Title>React Bootcamp 2021</Title>
      <Wrapper>
        <VideoList />
      </Wrapper>
    </>
  );
}

export default Home;
