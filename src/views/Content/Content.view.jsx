import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import VideoDetails from '../VideoDetails';
import NotFound from '../NotFound';

function Content() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/video/:videoId">
        <VideoDetails />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Content;
