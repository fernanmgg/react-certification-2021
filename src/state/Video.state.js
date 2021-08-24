import React from 'react';

import { getFavorites, addFavorite, removeFavorite } from '../utils/favoritesDB';

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
      if (action.payload.remember)
        localStorage.setItem('auth', JSON.stringify(action.payload.auth));
      else sessionStorage.setItem('auth', JSON.stringify(action.payload.auth));
      return {
        ...state,
        auth: action.payload.auth,
        favorites: getFavorites(action.payload.auth.name),
      };
    case 'UNSET_AUTH':
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
      return { ...state, auth: null, favorites: [] };
    case 'ADD_FAVORITE':
      addFavorite(action.payload.name, action.payload.video);
      return { ...state, favorites: getFavorites(action.payload.name) };
    case 'REMOVE_FAVORITE':
      removeFavorite(action.payload.name, action.payload.videoId);
      return { ...state, favorites: getFavorites(action.payload.name) };
    default:
      throw new Error('Error: Undefined action');
  }
};

export { VideoContext, initialState, reducer };
