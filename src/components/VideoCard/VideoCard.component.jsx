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

  function handleClick() {
    history.push(`/video/${videoId}`);
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
