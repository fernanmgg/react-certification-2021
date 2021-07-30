import React from 'react';

import { StyledVideoList, Message } from './VideoList.style';
import VideoCard from '../VideoCard';
import { getVideos } from '../../utils/youtubeAPI';
import charCodeReplace from '../../utils/charCodeReplace';

function VideoList() {
  const videos = getVideos();
  const cards =
    videos.length === 0 ? (
      <Message>No videos found</Message>
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
  return <StyledVideoList>{cards}</StyledVideoList>;
}

export default VideoList;
