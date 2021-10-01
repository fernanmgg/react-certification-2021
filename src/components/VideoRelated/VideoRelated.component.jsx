import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  StyledVideoRelated,
  Wrapper,
  Image,
  Content,
  Title,
  Effects,
} from './VideoRelated.style';

function VideoRelated({ videoId, image, title }) {
  const history = useHistory();
  const favorites = history.location.pathname.match(/favorites/i);

  function handleRelatedClick() {
    if (!favorites) history.push(`/video/${videoId}`);
    else history.push(`/favorites/${videoId}`);
  }

  return (
    <StyledVideoRelated>
      <Wrapper onClick={handleRelatedClick}>
        <Image backgroundImage={image} />
        <Content>
          <Title>{title}</Title>
        </Content>
        <Effects />
      </Wrapper>
    </StyledVideoRelated>
  );
}

export default VideoRelated;
