import React, { useContext } from 'react';

import { Title, Wrapper } from '../Home/Home.style';
import VideoList from '../../components/VideoList';
import { VideoContext } from '../../state/Video.state';

function Favorites() {
  const { state } = useContext(VideoContext);
  const { auth, favorites } = state;
  return (
    <>
      <Title>{auth.name}&#39;s Favorite Videos</Title>
      <Wrapper>
        <VideoList videos={favorites} />
      </Wrapper>
    </>
  );
}

export default Favorites;
