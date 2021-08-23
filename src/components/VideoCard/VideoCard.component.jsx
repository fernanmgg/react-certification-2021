import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  StyledVideoCard,
  Wrapper,
  Image,
  Content,
  Title,
  Description,
  Effects,
} from './VideoCard.style';

function VideoCard({ videoId, image, title, description }) {
  const history = useHistory();
  const favorites = history.location.pathname.match(/favorites/i);

  function handleClick() {
    if (!favorites) history.push(`/video/${videoId}`);
    else history.push(`/favorites/${videoId}`);
  }

  return (
    <StyledVideoCard>
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
