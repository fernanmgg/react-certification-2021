import React, { useReducer } from 'react';

import { initialState, reducer } from './Video.reducer';
import { actions } from './Video.actions';

const VideoContext = React.createContext();

const VideoContextData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, actions: actions(dispatch) };
};

export { VideoContext, VideoContextData };
