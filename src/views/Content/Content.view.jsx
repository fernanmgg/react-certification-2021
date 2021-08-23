import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import VideoDetails from '../VideoDetails';
import Favorites from '../Favorites';
import FavoriteVideoDetails from '../FavoriteVideoDetails';
import NotFound from '../NotFound';
import PrivateRoute from '../../components/PrivateRoute';

function Content() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/video/:videoId">
        <VideoDetails />
      </Route>
      <PrivateRoute path="/favorites/:videoId">
        <FavoriteVideoDetails />
      </PrivateRoute>
      <PrivateRoute path="/favorites">
        <Favorites />
      </PrivateRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Content;
