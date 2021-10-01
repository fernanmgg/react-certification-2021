export const actions = (dispatch) => ({
  setSearch: (payload) => dispatch({ type: 'SET_SEARCH', payload }),
  setAuth: (payload) => dispatch({ type: 'SET_AUTH', payload }),
  unsetAuth: () => dispatch({ type: 'UNSET_AUTH' }),
  addFav: (payload) => dispatch({ type: 'ADD_FAVORITE', payload }),
  remFav: (payload) => dispatch({ type: 'REMOVE_FAVORITE', payload }),
});
