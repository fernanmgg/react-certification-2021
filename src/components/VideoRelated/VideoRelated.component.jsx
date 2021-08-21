import React, { useContext } from 'react';

import {
  StyledVideoRelated,
  Wrapper,
  Image,
  Content,
  Title,
  Effects,
} from './VideoRelated.style';
import { VideoContext } from '../../state/Video.state';

function VideoRelated({ videoId, image, title, description }) {
  const { dispatch } = useContext(VideoContext);

  function handleClick() {
    dispatch({
      type: 'SET_VIDEO',
      payload: {
        videoId,
        title,
        description,
      },
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
