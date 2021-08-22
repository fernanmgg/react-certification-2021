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
    const state = { auth: null, search: '' };
    const action = { type: 'SET_SEARCH', payload: 'test' };
    expect(reducer(state, action)).toEqual({ auth: null, search: 'test' });
  });

  test('returns state with set auth in local storage', () => {
    const state = { auth: null, search: '' };
    const action = {
      type: 'SET_AUTH',
      payload: { auth, remember: true },
    };
    expect(localStorage.getItem('auth')).toBeNull();
    expect(reducer(state, action)).toEqual({ auth, search: '' });
    expect(JSON.parse(localStorage.getItem('auth'))).toEqual(auth);
  });

  test('returns state with set auth in session storage', () => {
    const state = { auth: null, search: '' };
    const action = {
      type: 'SET_AUTH',
      payload: { auth, remember: false },
    };
    expect(sessionStorage.getItem('auth')).toBeNull();
    expect(reducer(state, action)).toEqual({ auth, search: '' });
    expect(JSON.parse(sessionStorage.getItem('auth'))).toEqual(auth);
  });

  test('returns state with unset video', () => {
    const state = { auth, search: '' };
    const action = { type: 'UNSET_AUTH' };
    expect(reducer(state, action)).toEqual({ auth: null, search: '' });
  });

  test('throws error with undefined action', () => {
    const state = { auth: null, search: '' };
    const action = { type: 'UNDEFINED_ACTION' };
    expect(() => {
      reducer(state, action);
    }).toThrow(/error: undefined action/i);
  });
});
