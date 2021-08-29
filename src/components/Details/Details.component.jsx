import React, { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import {
  StyledDetails,
  Wrapper,
  Video,
  Info,
  Favorite,
  FavoriteButton,
  Title,
  Description,
} from './Details.style';
import VideoList from '../VideoList';
import useVideoAPI from '../../utils/hooks/useVideoAPI';
import { VideoContext } from '../../state/Video.state';
import { isFavorite, addFavorite, removeFavorite } from '../../utils/favoritesDB';
import stringCutoff from '../../utils/stringCutoff';

function VideoDetails({ videos = [], loading = false, error = false }) {
  const { videoId } = useParams();
  const { video, redirect, fetchError } = useVideoAPI(videoId);
  const { state, addFav, remFav } = useContext(VideoContext);
  const { auth } = state;

  function handleFavoriteClick() {
    if (!isFavorite(auth.id, videoId)) {
      addFavorite(auth.id, {
        id: { videoId },
        snippet: {
          ...video.snippet,
          description: stringCutoff(video.snippet.description, 160),
        },
      });
      addFav(videoId);
    } else {
      removeFavorite(auth.id, videoId);
      remFav(videoId);
    }
  }

  return (
    <StyledDetails>
      {redirect && <Redirect to="/404" />}
      <Wrapper>
        <Video>
          <iframe
            width="100%"
            height="100%"
            title={videoId}
            src={`https://www.youtube.com/embed/${videoId}`}
          />
        </Video>
        <Info>
          {fetchError && <Title>Error fetching details...</Title>}
          {video && (
            <>
              {auth && (
                <Favorite>
                  <FavoriteButton onClick={handleFavoriteClick}>
                    {!isFavorite(auth.id, videoId) ? 'Add' : 'Remove'} favorite
                  </FavoriteButton>
                </Favorite>
              )}
              <Title>{video.snippet.title}</Title>
              <Description>{video.snippet.description}</Description>
            </>
          )}
        </Info>
      </Wrapper>
      <VideoList videos={videos} loading={loading} error={error} related />
    </StyledDetails>
  );
}

export default VideoDetails;
