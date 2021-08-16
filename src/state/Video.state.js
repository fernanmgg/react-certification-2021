import React from 'react';

const VideoContext = React.createContext();

const initialState = {
  search: 'wizeline',
  video: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_VIDEO':
      return { ...state, video: action.payload };
    case 'UNSET_VIDEO':
      return { ...state, video: null };
    default:
      throw new Error();
  }
};

export { VideoContext, initialState, reducer };
