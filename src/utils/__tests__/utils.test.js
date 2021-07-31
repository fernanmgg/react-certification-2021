import charCodeReplace from '../charCodeReplace';

describe('Char code replacement function tests', () => {
  test('replaces char codes with corresponding character', () => {
    expect(charCodeReplace('We&#39;re testing components &amp; functions')).toBe(
      "We're testing components & functions"
    );
  });
});
