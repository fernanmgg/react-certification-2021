import React from 'react';

import Home from '../Home';
import VideoDetails from '../VideoDetails';

function Content({ videos, loading, error, video, setVideo }) {
  return (
    <>
      {video === null ? (
        <Home videos={videos} loading={loading} error={error} setVideo={setVideo} />
      ) : (
        <VideoDetails video={video} setVideo={setVideo} />
      )}
    </>
  );
}

export default Content;
