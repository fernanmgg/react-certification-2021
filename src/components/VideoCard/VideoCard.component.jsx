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

function VideoCard({ image, title, description }) {
  return (
    <StyledVideoCard>
      <Wrapper>
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
