import React from 'react';
import { useParams } from 'react-router-dom';

import Details from '../../components/Details';
import useVideoListAPI from '../../utils/hooks/useVideoListAPI';

function VideoDetails() {
  const { videoId } = useParams();
  const { videos, loading, error } = useVideoListAPI(videoId, true);
  return <Details videos={videos} loading={loading} error={error} />;
}

export default VideoDetails;
