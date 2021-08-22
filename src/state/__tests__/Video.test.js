import { reducer } from '../Video.state';

describe('Reducer function tests', () => {
  test('returns state with set search', () => {
    const state = { search: '', video: null };
    const action = { type: 'SET_SEARCH', payload: 'test' };
    expect(reducer(state, action)).toEqual({ search: 'test', video: null });
  });

  test('throws error with undefined action', () => {
    const state = { search: '', video: null };
    const action = { type: 'UNDEFINED_ACTION' };
    expect(() => {
      reducer(state, action);
    }).toThrow(/error: undefined action/i);
  });
});
