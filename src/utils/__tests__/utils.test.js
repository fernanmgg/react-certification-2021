import charCodeReplace from '../charCodeReplace';

describe('Char code replacement function tests', () => {
  test('replaces char codes with corresponding character', () => {
    expect(
      charCodeReplace('We&#39;re &quot;testing&quot; components &amp; functions')
    ).toBe(`We're "testing" components & functions`);
  });
});
