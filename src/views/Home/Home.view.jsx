import React, { useContext } from 'react';

import { Title, Wrapper } from './Home.style';
import VideoList from '../../components/VideoList';
import { VideoContext } from '../../state/Video.state';
import useVideoListAPI from '../../utils/hooks/useVideoListAPI';

function Home() {
  const { state } = useContext(VideoContext);
  const { search } = state;
  const { videos, loading, error } = useVideoListAPI(search);

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
