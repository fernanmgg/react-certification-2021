import React from 'react';

const VideoContext = React.createContext();

const initialState = {
  auth: null,
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
      return { ...state, auth: action.payload.auth };
    case 'UNSET_AUTH':
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
      return { ...state, auth: null };
    default:
      throw new Error('Error: Undefined action');
  }
};

export { VideoContext, initialState, reducer };
