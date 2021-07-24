import random from './random';

describe('Random function tests', () => {
  test('returns correct floored value', () => {
    global.Math.random = () => 0.123;
    const result = random(100);
    expect(result).toBe(12);
  });
});
