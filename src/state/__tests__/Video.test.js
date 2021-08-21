import { reducer } from '../Video.state';

describe('Reducer function tests', () => {
  test('returns state with set search', () => {
    const state = { search: '', video: null };
    const action = { type: 'SET_SEARCH', payload: 'test' };
    expect(reducer(state, action)).toEqual({ search: 'test', video: null });
  });

  test('returns state with set video', () => {
    const video = {
      videoId: 'Test id',
      title: 'Test title',
      description: 'Test description',
    };
    const state = { search: '', video: null };
    const action = {
      type: 'SET_VIDEO',
      payload: video,
    };
    expect(reducer(state, action)).toEqual({ search: '', video });
  });

  test('returns state with unset video', () => {
    const video = {
      videoId: 'Test id',
      title: 'Test title',
      description: 'Test description',
    };
    const state = { search: '', video };
    const action = { type: 'UNSET_VIDEO' };
    expect(reducer(state, action)).toEqual({ search: '', video: null });
  });

  test('throws error with undefined action', () => {
    const state = { search: '', video: null };
    const action = { type: 'UNDEFINED_ACTION' };
    expect(() => {
      reducer(state, action);
    }).toThrow(/error: undefined action/i);
  });
});
