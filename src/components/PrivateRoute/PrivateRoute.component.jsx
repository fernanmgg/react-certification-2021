import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { VideoContext } from '../../state/Video.state';

function PrivateRoute({ children, ...rest }) {
  const { state } = useContext(VideoContext);
  const { auth } = state;
  return (
    <Route
      {...rest}
      render={() => {
        return auth ? children : <Redirect to="/" />;
      }}
    />
  );
}

export default PrivateRoute;
