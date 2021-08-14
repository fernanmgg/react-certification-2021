import React from 'react';

import {
  StyledVideoCard,
  Wrapper,
  Image,
  Content,
  Title,
  Description,
  Effects,
} from './VideoCard.style';

function VideoCard({ videoId, image, title, description, setVideo }) {
  function handleClick() {
    setVideo({
      videoId,
      title,
      description,
    });
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
