import React from 'react';

import { StyledVideoList, Message } from './VideoList.style';
import VideoCard from '../VideoCard';
import charCodeReplace from '../../utils/charCodeReplace';

function VideoList({ videos, loading, error }) {
  const videoCards =
    videos.length === 0 ? (
      <Message>Search for videos...</Message>
    ) : (
      videos.map((video) => {
        return (
          <VideoCard
            key={video.id.videoId}
            image={video.snippet.thumbnails.medium.url}
            title={charCodeReplace(video.snippet.title)}
            description={video.snippet.description}
          />
        );
      })
    );
  return (
    <StyledVideoList>
      {loading && <Message>Loading...</Message>}
      {error && <Message>Error getting videos. Try again later...</Message>}
      {loading || error || videoCards}
    </StyledVideoList>
  );
}

export default VideoList;
