import { reducer } from '../Video.state';

const auth = {
  id: '123',
  name: 'test',
  avatarUrl: 'test',
};

describe('Reducer function tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('returns state with set search', () => {
    const state = { auth: null, favorites: [], search: '' };
    const action = { type: 'SET_SEARCH', payload: 'test' };
    expect(reducer(state, action)).toEqual({ auth: null, favorites: [], search: 'test' });
  });

  test('returns state with set auth in local storage', () => {
    const state = { auth: null, favorites: [], search: '' };
    const action = {
      type: 'SET_AUTH',
      payload: { auth, remember: true },
    };
    expect(localStorage.getItem('auth')).toBeNull();
    expect(reducer(state, action)).toEqual({ auth, favorites: [], search: '' });
    expect(JSON.parse(localStorage.getItem('auth'))).toEqual(auth);
  });

  test('returns state with set auth in session storage', () => {
    const state = { auth: null, favorites: [], search: '' };
    const action = {
      type: 'SET_AUTH',
      payload: { auth, remember: false },
    };
    expect(sessionStorage.getItem('auth')).toBeNull();
    expect(reducer(state, action)).toEqual({ auth, favorites: [], search: '' });
    expect(JSON.parse(sessionStorage.getItem('auth'))).toEqual(auth);
  });

  test('returns state with favorites from storage', () => {
    const state = { auth, favorites: [], search: '' };
    const action = {
      type: 'SET_AUTH',
      payload: { auth, remember: false },
    };
    const videos = ['test 1', 'test 2', 'test 3'];
    localStorage.setItem(auth.name, JSON.stringify(videos));
    expect(reducer(state, action)).toEqual({
      auth,
      favorites: videos,
      search: '',
    });
  });

  test('returns state with unset video', () => {
    const state = { auth, favorites: [], search: '' };
    const action = { type: 'UNSET_AUTH' };
    expect(reducer(state, action)).toEqual({ auth: null, favorites: [], search: '' });
  });

  test('returns state with added favorite', () => {
    const state = { auth, favorites: [], search: '' };
    const video = 'test 4';
    const action = {
      type: 'ADD_FAVORITE',
      payload: { name: auth.name, video },
    };
    const videos = ['test 1', 'test 2', 'test 3'];
    localStorage.setItem(auth.name, JSON.stringify(videos));
    expect(reducer(state, action)).toEqual({
      auth,
      favorites: [video, ...videos],
      search: '',
    });
  });

  test('returns state with deleted favorite', () => {
    const state = { auth, favorites: [], search: '' };
    const action = {
      type: 'REMOVE_FAVORITE',
      payload: { name: auth.name, videoId: 'test 2' },
    };
    const videos = [{ id: { videoId: 'test 1' } }, { id: { videoId: 'test 2' } }];
    localStorage.setItem(auth.name, JSON.stringify(videos));
    expect(reducer(state, action)).toEqual({
      auth,
      favorites: [{ id: { videoId: 'test 1' } }],
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
