import random from './random';
import charCodeReplace from './charCodeReplace';

describe('Random function tests', () => {
  test('returns correct floored value', () => {
    global.Math.random = () => 0.123;
    const result = random(100);
    expect(result).toBe(12);
  });
});

describe('Char code replacement function tests', () => {
  test('replaces char codes with corresponding character', () => {
    expect(charCodeReplace('We&#39;re testing components &#38; functions')).toBe(
      "We're testing components & functions"
    );
  });
});
