import React, { useContext } from 'react';

import {
  StyledVideoCard,
  Wrapper,
  Image,
  Content,
  Title,
  Description,
  Effects,
} from './VideoCard.style';
import { VideoContext } from '../../state/Video.state';

function VideoCard({ videoId, image, title, description }) {
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
