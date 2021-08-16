import React, { useContext } from 'react';

import Home from '../Home';
import VideoDetails from '../VideoDetails';
import { VideoContext } from '../../state/Video.state';

function Content() {
  const { state } = useContext(VideoContext);
  const { video } = state;
  return <>{video === null ? <Home /> : <VideoDetails />}</>;
}

export default Content;
