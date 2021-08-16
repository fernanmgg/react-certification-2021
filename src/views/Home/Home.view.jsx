import React, { useContext } from 'react';

import { Title, Wrapper } from './Home.style';
import VideoList from '../../components/VideoList';
import { VideoContext } from '../../state/Video.state';
import useVideoAPI from '../../utils/hooks/useVideoAPI';

function Home() {
  const { state } = useContext(VideoContext);
  const { search } = state;
  const { videos, loading, error } = useVideoAPI(search);
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
