import React from 'react';

import { CardListWrapper, Message } from './CardList.style';
import Card from '../Card';
import { getVideos } from '../../utils/youtubeAPI';
import charCodeReplace from '../../utils/charCodeReplace';

function CardList() {
  const videos = getVideos();
  const cards =
    videos.length === 0 ? (
      <Message>No videos found</Message>
    ) : (
      videos.map((video) => {
        return (
          <Card
            key={video.id.videoId}
            image={video.snippet.thumbnails.medium.url}
            title={charCodeReplace(video.snippet.title)}
            description={video.snippet.description}
          />
        );
      })
    );
  return (
    <>
      <CardListWrapper>{cards}</CardListWrapper>
    </>
  );
}

export default CardList;
