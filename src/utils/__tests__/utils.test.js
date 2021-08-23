import charCodeReplace from '../charCodeReplace';
import loginAPI from '../loginAPI';
import { getFavorites } from '../favoritesDB';

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

  test('returns favorites array if there are favorites for given user in local storage', () => {
    const videos = ['test 1', 'test 2', 'test 3'];
    const favorites = [{ name: 'test', videos }];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    expect(getFavorites('test')).toEqual(videos);
  });
});
