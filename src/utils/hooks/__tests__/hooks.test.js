import { renderHook } from '@testing-library/react-hooks';

import useFetch from '../useFetch';

const controlledPromise = () => {
  let deferred;
  const promise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });
  return { deferred, promise };
};

describe('useFetch tests', () => {
  test('fetch is called with search of at least one character', async () => {
    const { deferred, promise } = controlledPromise();
    const mockedVideos = ['test 1', 'test 2', 'test 3'];
    global.fetch = jest.fn(() => promise);
    const { result, waitForNextUpdate } = renderHook(() => useFetch('1234'));
    expect(result.current.videos).toEqual([]);
    deferred.resolve({
      json: () => ({
        items: mockedVideos,
      }),
    });
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/q=1234/i);
    expect(result.current.videos).toEqual(mockedVideos);
  });

  test('videos state remains if the search is empty', async () => {
    global.fetch = jest.fn();
    const { result } = renderHook(() => useFetch(''));
    expect(result.current.videos).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  test('fetch is called with video ID of appropriate length', async () => {
    const { deferred, promise } = controlledPromise();
    const mockedVideos = ['test 1', 'test 2', 'test 3'];
    global.fetch = jest.fn(() => promise);
    const { result, waitForNextUpdate } = renderHook(() => useFetch('A1234567890', true));
    expect(result.current.videos).toEqual([]);
    deferred.resolve({
      json: () => ({
        items: mockedVideos,
      }),
    });
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/relatedToVideoId=A1234567890/i);
    expect(result.current.videos).toEqual(mockedVideos);
  });

  test('videos state remains if the video ID is not valid', async () => {
    global.fetch = jest.fn();
    const { result } = renderHook(() => useFetch('123', true));
    expect(result.current.videos).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  test('loading state is toggled accordingly', async () => {
    const { deferred, promise } = controlledPromise();
    global.fetch = jest.fn(() => promise);
    const { result, waitForNextUpdate } = renderHook(() => useFetch('1234'));
    expect(result.current.loading).toBe(true);
    deferred.resolve();
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
  });

  test('error state is toggled accordingly', async () => {
    const { deferred, promise } = controlledPromise();
    global.fetch = jest.fn(() => promise);
    const { result, waitForNextUpdate } = renderHook(() => useFetch('1234'));
    expect(result.current.error).toBe(false);
    deferred.reject();
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(true);
  });

  test('returns error if API does not return items object', async () => {
    const { deferred, promise } = controlledPromise();
    global.fetch = jest.fn(() => promise);
    const { result, waitForNextUpdate } = renderHook(() => useFetch('1234'));
    expect(result.current.error).toBe(false);
    deferred.resolve({
      json: () => ({ test: 'test' }),
    });
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(true);
  });
});
