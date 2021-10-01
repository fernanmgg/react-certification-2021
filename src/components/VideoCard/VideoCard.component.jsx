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
  const { state, addFav, remFav } = useContext(VideoContext);
  const { auth } = state;

  function handleCardClick() {
    if (!favorites) history.push(`/video/${videoId}`);
    else history.push(`/favorites/${videoId}`);
  }

  function handleFavoriteClick() {
    const favorite = isFavorite(auth.id, videoId);
    if (!favorite) {
      addFavorite(auth.id, {
        id: { videoId },
        snippet: { title, description, thumbnails: { medium: { url: image } } },
      });
      addFav(videoId);
    } else {
      removeFavorite(auth.id, videoId);
      remFav(videoId);
    }
  }

  return (
    <StyledVideoCard>
      {auth && (
        <FavoriteButton onClick={handleFavoriteClick}>
          {!isFavorite(auth.id, videoId) ? 'Add' : 'Remove'} favorite
        </FavoriteButton>
      )}
      <Wrapper onClick={handleCardClick}>
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
