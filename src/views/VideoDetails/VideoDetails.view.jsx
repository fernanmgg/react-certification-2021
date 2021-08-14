import React from 'react';

import { StyledVideoDetails, Wrapper, Title, Description } from './VideoDetails.style';
import VideoList from '../../components/VideoList';
import useVideoAPI from '../../utils/hooks/useVideoAPI';

function VideoDetails({ video, setVideo }) {
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
      <VideoList
        videos={videos}
        loading={loading}
        error={error}
        setVideo={setVideo}
        related
      />
    </StyledVideoDetails>
  );
}

export default VideoDetails;
