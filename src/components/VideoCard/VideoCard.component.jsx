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
import { isFavorite } from '../../utils/favoritesDB';

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
    const favorite = isFavorite(auth.name, videoId);
    if (!favorite) {
      dispatch({
        type: 'ADD_FAVORITE',
        payload: {
          name: auth.name,
          video: {
            id: { videoId },
            snippet: { title, description, thumbnails: { medium: { url: image } } },
          },
        },
      });
    } else {
      dispatch({
        type: 'REMOVE_FAVORITE',
        payload: { name: auth.name, videoId },
      });
    }
  }

  return (
    <StyledVideoCard>
      {auth && (
        <FavoriteButton onClick={updateFavorites}>
          {!isFavorite(auth.name, videoId) ? 'Add' : 'Remove'} favorite
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
