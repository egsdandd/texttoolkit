// test/textanalyzer-test.js (eller i egen test-app)

import TextAnalyzer from '../../src/analyzers/TextAnalyzer.js';

const sampleText = `
  Anna såg Otto i en röd kajak. Madam, är det ett racecar eller ej?
  Kommer du ihåg sagan om Bob och Eve?
`;

// Skapa ett analysobjekt
const analyzer = new TextAnalyzer(sampleText);

console.log('Antal ord:', analyzer.countWords());
console.log('Antal meningar:', analyzer.countSentences());
console.log('Antal tecken (inkl. mellanslag):', analyzer.countCharacters());
console.log('Antal tecken (utan mellanslag):', analyzer.countCharacters(false));
console.log('Bokstavsfrekvens:', analyzer.letterFrequency());
console.log('Palindrom i texten:', analyzer.findPalindromes());
// Förväntade resultat:
// Antal ord: 16
// Antal meningar: 3
// Antal ord: 24
// Antal meningar: 3
// Antal tecken (inkl. mellanslag): 102
// Antal tecken (utan mellanslag): 89
// Bokstavsfrekvens: {a: 7, n: 3, ...}
// Palindrom i texten: [ 'anna', 'otto', 'kajak', 'madam', 'racecar', 'bob', 'eve' ]
