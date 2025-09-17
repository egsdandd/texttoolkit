***

## Användningsexempel för utvecklare

### Import och instansiering

```javascript
import TextAnalyzer from './src/analyzers/TextAnalyzer.js'

// Skapa din analys-instans (texten kan vara svensk eller engelsk)
const analyzer = new TextAnalyzer("Otto och Anna paddlar kajak i ån. Madam, blev Eva av med Bob?")
```


### Funktioner och exempel på användning

```javascript
// Ord-analys
console.log('Antal ord:', analyzer.countWords()) // → t.ex. 12

// Mening-analys
console.log('Antal meningar:', analyzer.countSentences()) // → t.ex. 2

// Teckenräkning
console.log('Antal tecken inkl. mellanslag:', analyzer.countCharacters())      // → t.ex. 54
console.log('Antal tecken utan mellanslag:', analyzer.countCharacters(false))  // → t.ex. 46

// Bokstavsfrekvens (åäö och engelska/svenska bokstäver räknas)
console.log('Bokstavsfrekvens:', analyzer.letterFrequency())
// → { a: 7, o: 3, n: 2, ... }

// Upptäck palindrom
console.log('Palindrom i texten:', analyzer.findPalindromes())
// → [ 'otto', 'anna', 'kajak', 'madam', 'bob' ]
```


***

### Viktiga anteckningar för utvecklare

- **Input valideras strikt:** Alla metoder ger begripligt fel vid felaktig indata (tomma strängar, fel typ).
- **Språkstöd:** Algoritmerna identifierar ord med både svenska tecken (åäö) och engelska.
- **Används som en ren klass:** Instansen ändrar aldrig din inmatning.

***

### Kompakt översikt med JSDoc/inline (exempel):

```javascript
/**
 * Skapar en ny textanalys
 * @param {string} text - Text att analysera
 * @throws {EmptyStringError} om texten är tom
 * @throws {InvalidTypeError} om texten inte är en sträng
 */
const analyzer = new TextAnalyzer("Det här är ett exempel.")

analyzer.countWords()          // => antal ord i texten
analyzer.countSentences()      // => antal meningar i texten
analyzer.countCharacters()     // => antal tecken (inkl. mellanslag, default: true)
analyzer.letterFrequency()     // => {a: 1, ...}
analyzer.findPalindromes()     // => [ 'otto', ... ]
```


***
