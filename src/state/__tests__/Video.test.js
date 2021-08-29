import { reducer } from '../Video.reducer';
import { actions } from '../Video.actions';

const auth = {
  id: '123',
  name: 'test',
  avatarUrl: 'test',
};

describe('Reducer function tests', () => {
  test('returns state with set search', () => {
    const state = { auth: null, favorites: [], search: '' };
    const action = { type: 'SET_SEARCH', payload: 'test' };
    expect(reducer(state, action)).toEqual({ auth: null, favorites: [], search: 'test' });
  });

  test('returns state with set auth and favorites', () => {
    const state = { auth: null, favorites: [], search: '' };
    const action = {
      type: 'SET_AUTH',
      payload: { auth, favorites: ['test 1', 'test 2', 'test 3'] },
    };
    expect(reducer(state, action)).toEqual({
      auth,
      favorites: ['test 1', 'test 2', 'test 3'],
      search: '',
    });
  });

  test('returns state with unset auth', () => {
    const state = { auth, favorites: ['test 1', 'test 2', 'test 3'], search: '' };
    const action = { type: 'UNSET_AUTH' };
    expect(reducer(state, action)).toEqual({ auth: null, favorites: [], search: '' });
  });

  test('returns state with added favorite', () => {
    const state = { auth, favorites: ['test 1', 'test 2', 'test 3'], search: '' };
    const action = { type: 'ADD_FAVORITE', payload: 'test 0' };
    expect(reducer(state, action)).toEqual({
      auth,
      favorites: ['test 0', 'test 1', 'test 2', 'test 3'],
      search: '',
    });
  });

  test('returns state with deleted favorite', () => {
    const state = { auth, favorites: ['test 1', 'test 2', 'test 3'], search: '' };
    const action = { type: 'REMOVE_FAVORITE', payload: 'test 2' };
    expect(reducer(state, action)).toEqual({
      auth,
      favorites: ['test 1', 'test 3'],
      search: '',
    });
  });

  test('throws error with undefined action', () => {
    const state = { auth: null, favorites: [], search: '' };
    const action = { type: 'UNDEFINED_ACTION' };
    expect(() => {
      reducer(state, action);
    }).toThrow(/error: undefined action/i);
  });
});

describe('Actions tests', () => {
  test('dispatch is called with proper payload', () => {
    const dispatch = jest.fn();
    const { setSearch, setAuth, unsetAuth, addFav, remFav } = actions(dispatch);
    setSearch('setSearch test');
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'SET_SEARCH',
      payload: 'setSearch test',
    });
    setAuth('setAuth test');
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'SET_AUTH',
      payload: 'setAuth test',
    });
    unsetAuth();
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'UNSET_AUTH',
    });
    addFav('addFav test');
    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'ADD_FAVORITE',
      payload: 'addFav test',
    });
    remFav('remFav test');
    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'REMOVE_FAVORITE',
      payload: 'remFav test',
    });
  });
});
