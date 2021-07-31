import React from 'react';

import { StyledVideoDetails, Title, Description } from './VideoDetails.style';

function VideoDetails({ video }) {
  return (
    <StyledVideoDetails>
      <iframe
        width="100%"
        height="480px"
        title={video.title}
        src={`https://www.youtube.com/embed/${video.videoId}`}
      />
      <Title>{video.title}</Title>
      <Description>{video.description}</Description>
    </StyledVideoDetails>
  );
}

export default VideoDetails;
