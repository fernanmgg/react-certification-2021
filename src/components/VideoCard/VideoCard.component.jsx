import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  StyledVideoCard,
  FavoriteButton,
  Wrapper,
  Image,
  Content,
  Title,
  Description,
  Effects,
} from './VideoCard.style';
import { VideoContext } from '../../state/Video.state';
import { isFavorite, addFavorite, removeFavorite } from '../../utils/favoritesDB';

function VideoCard({ videoId, image, title, description }) {
  const history = useHistory();
  const favorites = history.location.pathname.match(/favorites/i);
  const { state, dispatch } = useContext(VideoContext);
  const { auth } = state;

  function handleClick() {
    if (!favorites) history.push(`/video/${videoId}`);
    else history.push(`/favorites/${videoId}`);
  }

  function updateFavorites() {
    const favorite = isFavorite(auth.id, videoId);
    if (!favorite) {
      addFavorite(auth.id, {
        id: { videoId },
        snippet: { title, description, thumbnails: { medium: { url: image } } },
      });
      dispatch({ type: 'ADD_FAVORITE', payload: videoId });
    } else {
      removeFavorite(auth.id, videoId);
      dispatch({ type: 'REMOVE_FAVORITE', payload: videoId });
    }
  }

  return (
    <StyledVideoCard>
      {auth && (
        <FavoriteButton onClick={updateFavorites}>
          {!isFavorite(auth.id, videoId) ? 'Add' : 'Remove'} favorite
        </FavoriteButton>
      )}
      <Wrapper onClick={handleClick}>
        <Image backgroundImage={image} />
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Content>
        <Effects />
      </Wrapper>
    </StyledVideoCard>
  );
}

export default VideoCard;
