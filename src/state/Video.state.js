import React from 'react';

const VideoContext = React.createContext();

const initialState = {
  auth: null,
  favorites: [],
  search: 'wizeline',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_AUTH':
      return {
        ...state,
        auth: action.payload.auth,
        favorites: action.payload.favorites,
      };
    case 'UNSET_AUTH':
      return { ...state, auth: null, favorites: [] };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [action.payload.videoId, ...state.favorites],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (element) => element !== action.payload.videoId
        ),
      };
    default:
      throw new Error('Error: Undefined action');
  }
};

export { VideoContext, initialState, reducer };
