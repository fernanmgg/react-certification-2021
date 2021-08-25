import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  StyledVideoDetails,
  Wrapper,
  Favorite,
  FavoriteButton,
  Title,
  Description,
} from '../VideoDetails/VideoDetails.style';
import VideoList from '../../components/VideoList';
import useVideoAPI from '../../utils/hooks/useVideoAPI';
import { VideoContext } from '../../state/Video.state';
import {
  getFavoritesInfo,
  isFavorite,
  addFavorite,
  removeFavorite,
} from '../../utils/favoritesDB';

function FavoriteVideoDetails() {
  const { videoId } = useParams();
  const { video } = useVideoAPI(videoId);
  const { state, dispatch } = useContext(VideoContext);
  const { auth, favorites } = state;

  function updateFavorites() {
    const favorite = isFavorite(auth.id, videoId);
    if (!favorite) {
      addFavorite(auth.id, { id: { videoId }, ...video });
      dispatch({ type: 'ADD_FAVORITE', payload: videoId });
    } else {
      removeFavorite(auth.id, videoId);
      dispatch({ type: 'REMOVE_FAVORITE', payload: videoId });
    }
  }

  return (
    <StyledVideoDetails>
      <Wrapper>
        <iframe
          width="100%"
          height="480px"
          title={video.snippet.title}
          src={`https://www.youtube.com/embed/${videoId}`}
        />
        <Favorite>
          <FavoriteButton onClick={updateFavorites}>
            {!isFavorite(auth.id, videoId) ? 'Add' : 'Remove'} favorite
          </FavoriteButton>
        </Favorite>
        <Title>{video.snippet.title}</Title>
        <Description>{video.snippet.description}</Description>
      </Wrapper>
      <VideoList videos={getFavoritesInfo(auth.id, favorites)} related />
    </StyledVideoDetails>
  );
}

export default FavoriteVideoDetails;
