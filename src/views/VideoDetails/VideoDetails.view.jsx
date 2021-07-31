import React from 'react';

import { StyledVideoDetails, Wrapper, Title, Description } from './VideoDetails.style';
import VideoList from '../../components/VideoList';
import useFetch from '../../utils/hooks/useFetch';

function VideoDetails({ video, setVideo }) {
  const { videos, loading, error } = useFetch(video.videoId, true);

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
