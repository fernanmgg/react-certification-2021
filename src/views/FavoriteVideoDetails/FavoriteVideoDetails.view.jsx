import React, { useContext } from 'react';

import Details from '../../components/Details';
import { VideoContext } from '../../state/Video.state';
import { getFavoritesInfo } from '../../utils/favoritesDB';

function FavoriteVideoDetails() {
  const { state } = useContext(VideoContext);
  const { auth, favorites } = state;
  return <Details videos={getFavoritesInfo(auth.id, favorites)} />;
}

export default FavoriteVideoDetails;
