import TextSearcher from '../../src/searchers/TextSearcher.js'; // mjuk variant
import TextSearcherHard from '../../src/searchers/TextSearcherHard.js'; // hård variant

describe('TextSearcher (mjuk variant)', () => {
  test('hittar första förekomst', () => {
    const s = new TextSearcher('Hello World');
    expect(s.findFirst('World')).toBe(6);
  });

  test('returnerar -1 om substring saknas', () => {
    const s = new TextSearcher('Hello');
    expect(s.findFirst('abc')).toBe(-1);
  });

  test('hanterar tom text', () => {
    const s = new TextSearcher('');
    expect(s.findFirst('H')).toBe(-1);
    expect(s.findAll('H')).toEqual([]);
    expect(s.exists('H')).toBe(false);
  });

  test('kastar RangeError om substring är för lång', () => {
    const s = new TextSearcher('short text');
    const long = 'x'.repeat(2000);
    expect(() => s.findFirst(long)).toThrow(RangeError);
  });

  test('matchPattern returnerar alla matchningar', () => {
    const s = new TextSearcher('abc abc abc');
    expect(s.matchPattern(/abc/g)).toEqual(['abc', 'abc', 'abc']);
  });

  test('searchRegexp returnerar rätt index', () => {
    const s = new TextSearcher('hej hopp');
    expect(s.searchRegexp(/hopp/)).toBe(4);
  });
});

describe('TextSearcher (hård variant)', () => {
  test('hittar första förekomst', () => {
    const s = new TextSearcherHard('Hello World');
    expect(s.findFirst('World')).toBe(6);
  });

  test('kastar TypeError om substring är tom', () => {
    const s = new TextSearcherHard('Hello');
    expect(() => s.findFirst('')).toThrow(TypeError);
  });

  test('kastar RangeError om substring är för lång', () => {
    const s = new TextSearcherHard('short text');
    const long = 'x'.repeat(2000);
    expect(() => s.findFirst(long)).toThrow(RangeError);
  });

  test('exists returnerar true/false korrekt', () => {
    const s = new TextSearcherHard('banana');
    expect(s.exists('ban')).toBe(true);
    expect(s.exists('apple')).toBe(false);
  });

  test('matchPattern kastar om pattern inte är RegExp', () => {
    const s = new TextSearcherHard('abc');
    expect(() => s.matchPattern('abc')).toThrow(TypeError);
  });

  test('searchRegexp kastar om regexp är tom', () => {
    const s = new TextSearcherHard('hej');
    expect(() => s.searchRegexp(new RegExp(''))).toThrow(Error);
  });
});
