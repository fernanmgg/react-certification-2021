import React from 'react';
import { useParams } from 'react-router-dom';

import { StyledVideoDetails, Wrapper, Title, Description } from './VideoDetails.style';
import VideoList from '../../components/VideoList';
import useVideoAPI from '../../utils/hooks/useVideoAPI';
import useVideoListAPI from '../../utils/hooks/useVideoListAPI';

function VideoDetails() {
  const { videoId } = useParams();
  const { video } = useVideoAPI(videoId);
  const { videos, loading, error } = useVideoListAPI(videoId, true);

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
      <VideoList videos={videos} loading={loading} error={error} related />
    </StyledVideoDetails>
  );
}

export default VideoDetails;
