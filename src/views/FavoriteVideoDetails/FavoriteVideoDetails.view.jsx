import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  StyledVideoDetails,
  Wrapper,
  Title,
  Description,
} from '../VideoDetails/VideoDetails.style';
import VideoList from '../../components/VideoList';
import useVideoAPI from '../../utils/hooks/useVideoAPI';
import { VideoContext } from '../../state/Video.state';

function FavoriteVideoDetails() {
  const { videoId } = useParams();
  const { video } = useVideoAPI(videoId);
  const { state } = useContext(VideoContext);
  const { favorites } = state;

  return (
    <StyledVideoDetails>
      <Wrapper>
        <iframe
          width="100%"
          height="480px"
          title={video.title}
          src={`https://www.youtube.com/embed/${videoId}`}
        />
        <Title>{video.title}</Title>
        <Description>{video.description}</Description>
      </Wrapper>
      <VideoList videos={favorites} related />
    </StyledVideoDetails>
  );
}

export default FavoriteVideoDetails;
