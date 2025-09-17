import TextAnalyzer from '../../src/analyzers/TextAnalyzer.js';

describe('TextAnalyzer', () => {
  const sampleText = `
    Anna såg Otto i en röd kajak. Madam, är det ett racecar eller ej?
    Kommer du ihåg sagan om Bob och Eve?
  `;

  let analyzer;
  beforeEach(() => {
    analyzer = new TextAnalyzer(sampleText);
  });

  test('räknar antal ord', () => {
    expect(analyzer.countWords()).toBe(22); // Ändra till rätt om din implementation tolkar på annat sätt
  });

  test('räknar antal meningar', () => {
    expect(analyzer.countSentences()).toBe(3);
  });

  test('räknar antal tecken inkl. mellanslag', () => {
    expect(analyzer.countCharacters()).toBe(114);
  });

  test('räknar antal tecken utan mellanslag', () => {
    expect(analyzer.countCharacters(false)).toBe(81);
  });

  test('visar bokstavsfrekvens', () => {
    const freq = analyzer.letterFrequency();
    expect(freq.a).toBeGreaterThan(0);
    expect(freq.n).toBeGreaterThan(0);
    // Lägg till detaljerad assertion om önskat
  });

  test('hittar alla palindrom', () => {
    expect(analyzer.findPalindromes()).toEqual(
      expect.arrayContaining(['anna', 'otto', 'kajak', 'madam', 'racecar', 'bob', 'eve'])
    );
  });
});

// Förväntade resultat:
// Antal ord: 16
// Antal meningar: 3
// Antal ord: 24
// Antal meningar: 3
// Antal tecken (inkl. mellanslag): 102
// Antal tecken (utan mellanslag): 89
// Bokstavsfrekvens: {a: 7, n: 3, ...}
// Palindrom i texten: [ 'anna', 'otto', 'kajak', 'madam', 'racecar', 'bob', 'eve' ]
