import React, { useContext } from 'react';

import { StyledVideoDetails, Wrapper, Title, Description } from './VideoDetails.style';
import VideoList from '../../components/VideoList';
import useVideoAPI from '../../utils/hooks/useVideoAPI';
import { VideoContext } from '../../state/Video.state';

function VideoDetails() {
  const { state } = useContext(VideoContext);
  const { video } = state;
  const { videos, loading, error } = useVideoAPI(video.videoId, true);

  return (
    <StyledVideoDetails>
      <Wrapper>
        <iframe
          width="100%"
          height="480px"
          title={video.title}
          src={`https://www.youtube.com/embed/${video.videoId}`}
        />
        <Title>{video.title}</Title>
        <Description>{video.description}</Description>
      </Wrapper>
      <VideoList videos={videos} loading={loading} error={error} related />
    </StyledVideoDetails>
  );
}

export default VideoDetails;
