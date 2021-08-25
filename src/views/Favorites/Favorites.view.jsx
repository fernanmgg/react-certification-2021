import React, { useContext } from 'react';

import { Title, Wrapper } from '../Home/Home.style';
import VideoList from '../../components/VideoList';
import { VideoContext } from '../../state/Video.state';
import { getFavoritesInfo } from '../../utils/favoritesDB';

function Favorites() {
  const { state } = useContext(VideoContext);
  const { auth, favorites } = state;

  return (
    <>
      <Title>{auth.name}&#39;s Favorite Videos</Title>
      <Wrapper>
        <VideoList videos={getFavoritesInfo(auth.id, favorites)} />
      </Wrapper>
    </>
  );
}

export default Favorites;
