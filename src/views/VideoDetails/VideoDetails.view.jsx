import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  StyledVideoDetails,
  Wrapper,
  Video,
  Details,
  Favorite,
  FavoriteButton,
  Title,
  Description,
} from './VideoDetails.style';
import VideoList from '../../components/VideoList';
import useVideoAPI from '../../utils/hooks/useVideoAPI';
import useVideoListAPI from '../../utils/hooks/useVideoListAPI';
import { VideoContext } from '../../state/Video.state';
import { isFavorite, addFavorite, removeFavorite } from '../../utils/favoritesDB';
import stringCutoff from '../../utils/stringCutoff';

function VideoDetails() {
  const { videoId } = useParams();
  const { video } = useVideoAPI(videoId);
  const { videos, loading, error } = useVideoListAPI(videoId, true);
  const { state, dispatch } = useContext(VideoContext);
  const { auth } = state;

  function updateFavorites() {
    const favorite = isFavorite(auth.id, videoId);
    if (!favorite) {
      addFavorite(auth.id, {
        id: { videoId },
        snippet: {
          ...video.snippet,
          description: stringCutoff(video.snippet.description, 160),
        },
      });
      dispatch({ type: 'ADD_FAVORITE', payload: videoId });
    } else {
      removeFavorite(auth.id, videoId);
      dispatch({ type: 'REMOVE_FAVORITE', payload: videoId });
    }
  }

  return (
    <StyledVideoDetails>
      <Wrapper>
        <Video>
          <iframe
            width="100%"
            height="100%"
            title={video.snippet.title}
            src={`https://www.youtube.com/embed/${videoId}`}
          />
        </Video>
        <Details>
          {auth && (
            <Favorite>
              <FavoriteButton onClick={updateFavorites}>
                {!isFavorite(auth.id, videoId) ? 'Add' : 'Remove'} favorite
              </FavoriteButton>
            </Favorite>
          )}
          <Title>{video.snippet.title}</Title>
          <Description>{video.snippet.description}</Description>
        </Details>
      </Wrapper>
      <VideoList videos={videos} loading={loading} error={error} related />
    </StyledVideoDetails>
  );
}

export default VideoDetails;
