import charCodeReplace from '../charCodeReplace';
import loginAPI from '../loginAPI';
import {
  getFavorites,
  getFavoritesInfo,
  isFavorite,
  addFavorite,
  removeFavorite,
} from '../favoritesDB';

describe('Char code replacement function tests', () => {
  test('replaces char codes with corresponding character', () => {
    expect(
      charCodeReplace('We&#39;re &quot;testing&quot; components &amp; functions')
    ).toBe(`We're "testing" components & functions`);
  });
});

describe('Login API tests', () => {
  test('returns user if credentials are valid', async () => {
    const user = {
      id: '123',
      name: 'Wizeline',
      avatarUrl:
        'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
    };
    return loginAPI('wizeline', 'Rocks!').then((response) => {
      expect(response).toEqual(user);
    });
  });

  test('returns error if credentials are invalid', async () => {
    return loginAPI('test', 'test').catch((error) => {
      expect(error.message).toMatch(/username or password invalid/i);
    });
  });
});

describe('FavoritesDB tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns empty array if there are no favorites for given user in local storage', () => {
    expect(getFavorites('test')).toEqual([]);
  });

  test('returns favorites IDs if there are favorites for given user in local storage', () => {
    const videos = [{ id: { videoId: 'test 1' } }, { id: { videoId: 'test 2' } }];
    localStorage.setItem('test', JSON.stringify(videos));
    expect(getFavorites('test')).toEqual(['test 1', 'test 2']);
  });

  test('returns favorites info from IDs', () => {
    const videos = [{ id: { videoId: 'test 1' } }, { id: { videoId: 'test 2' } }];
    const favorites = ['test 1', 'test 2'];
    localStorage.setItem('test', JSON.stringify(videos));
    expect(getFavoritesInfo('test', favorites)).toEqual(videos);
  });

  test('returns true if favorite is in local storage', () => {
    const videos = [{ id: { videoId: 'test 1' } }, { id: { videoId: 'test 2' } }];
    localStorage.setItem('test', JSON.stringify(videos));
    expect(isFavorite('test', 'test 1')).toBeTruthy();
  });

  test('returns false if favorite is not in local storage', () => {
    const videos = [{ id: { videoId: 'test 1' } }, { id: { videoId: 'test 2' } }];
    localStorage.setItem('test', JSON.stringify(videos));
    expect(isFavorite('test', 'test 3')).toBeFalsy();
  });

  test('adds favorite to old local storage if user already has favorites', () => {
    const video = 'test 0';
    const videos = ['test 1', 'test 2', 'test 3'];
    localStorage.setItem('test', JSON.stringify(videos));
    addFavorite('test', video);
    expect(JSON.parse(localStorage.getItem('test'))).toEqual([video, ...videos]);
  });

  test('adds favorite to new local storage if user has no favorites', () => {
    const video = 'test';
    addFavorite('test', video);
    expect(JSON.parse(localStorage.getItem('test'))).toEqual([video]);
  });

  test('removes favorite from local storage', () => {
    const videos = [{ id: { videoId: 'test 1' } }, { id: { videoId: 'test 2' } }];
    localStorage.setItem('test', JSON.stringify(videos));
    removeFavorite('test', 'test 2');
    removeFavorite('...', '...');
    expect(JSON.parse(localStorage.getItem('test'))).toEqual([
      { id: { videoId: 'test 1' } },
    ]);
  });
});
