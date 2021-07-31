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
  test('videos are returned with search of appropriate length', async () => {
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
    expect(result.current.videos).toEqual(mockedVideos);
  });

  test('videos state remains if the search is too short', async () => {
    global.fetch = jest.fn();
    const { result } = renderHook(() => useFetch('123'));
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
});
