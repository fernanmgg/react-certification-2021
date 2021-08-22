import React from 'react';

const VideoContext = React.createContext();

const initialState = {
  auth: false,
  search: 'wizeline',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    default:
      throw new Error('Error: Undefined action');
  }
};

export { VideoContext, initialState, reducer };
