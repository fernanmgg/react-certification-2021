import React from 'react';

import { StyledVideoList, StyledVideoListRel, Message } from './VideoList.style';
import VideoCard from '../VideoCard';
import VideoRelated from '../VideoRelated';
import charCodeReplace from '../../utils/charCodeReplace';

function VideoList({ videos = [], loading = false, error = false, related = false }) {
  const StyledList = !related ? StyledVideoList : StyledVideoListRel;
  const VideoComponent = !related ? VideoCard : VideoRelated;
  const videoCards =
    videos.length === 0 ? (
      <Message>No videos found...</Message>
    ) : (
      videos
        .filter((video) => {
          return 'id' in video && 'snippet' in video;
        })
        .map((video) => {
          return (
            <VideoComponent
              key={video.id.videoId}
              videoId={video.id.videoId}
              image={video.snippet.thumbnails.medium.url}
              title={charCodeReplace(video.snippet.title)}
              description={video.snippet.description}
            />
          );
        })
    );
  return (
    <StyledList>
      {loading && <Message>Loading...</Message>}
      {error && <Message>Error getting videos. Try again later...</Message>}
      {loading || error || videoCards}
    </StyledList>
  );
}

export default VideoList;
