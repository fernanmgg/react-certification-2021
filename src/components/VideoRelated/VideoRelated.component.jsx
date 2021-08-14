import React from 'react';

import {
  StyledVideoRelated,
  Wrapper,
  Image,
  Content,
  Title,
  Effects,
} from './VideoRelated.style';

function VideoRelated({ videoId, image, title, description, setVideo }) {
  function handleClick() {
    setVideo({
      videoId,
      title,
      description,
    });
  }

  return (
    <StyledVideoRelated>
      <Wrapper onClick={handleClick}>
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
