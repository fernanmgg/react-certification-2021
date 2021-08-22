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

  function handleClick() {
    history.push(`/video/${videoId}`);
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
