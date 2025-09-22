
# TextAnalyzer

TextAnalyzer is a lightweight ES6 JavaScript class for advanced text analysis, supporting Swedish and English characters. It provides methods for word counting, sentence detection, character counting, letter frequency calculation, and palindrome identification.

***

## Usage Examples

### Import and Instantiation

```javascript
import TextAnalyzer from './src/analyzers/TextAnalyzer.js'

// Create your analysis instance (text may contain Swedish or English letters)
const analyzer = new TextAnalyzer("Otto och Anna paddlar kajak i ån. Madam, blev Eva av med Bob?")
```


### Functions and Example Usage

```javascript
// Word analysis
console.log('Word count:', analyzer.countWords()) // → e.g. 12

// Sentence analysis
console.log('Sentence count:', analyzer.countSentences()) // → e.g. 2

// Character counting
console.log('Characters incl. spaces:', analyzer.countCharacters())       // → e.g. 54
console.log('Characters excl. spaces:', analyzer.countCharacters(false))  // → e.g. 46

// Letter frequency (includes å, ä, ö and English/Swedish letters)
console.log('Letter frequency:', analyzer.letterFrequency())
// → { a: 7, o: 3, n: 2, ... }

// Find palindromes
console.log('Palindromes in text:', analyzer.findPalindromes())
// → [ 'otto', 'anna', 'kajak', 'madam', 'bob' ]
```


***

## API Reference

### Class: `TextAnalyzer`

#### Constructor

```javascript
new TextAnalyzer(text: string)
```

- Creates a new text analysis instance.
- Throws `EmptyStringError` if the text is empty.
- Throws `InvalidTypeError` if the input is not a string.


#### Methods

| Method | Description |
| :-- | :-- |
| `countWords()` | Returns the number of words in the text (Swedish \& English support). |
| `countSentences()` | Returns the number of sentences, detected by period, ! or ?. |
| `countCharacters(includeSpaces=true)` | Returns the number of characters; optionally includes spaces. |
| `letterFrequency()` | Returns an object mapping each letter (a-z, å, ä, ö) to its count. |
| `findPalindromes()` | Returns an array of unique palindromic words, case-insensitive. |


***

### Developer Notes

- **Strict input validation:** All methods provide a clear error if the input is invalid (empty string, wrong type).
- **Language Support:** Algorithms recognize words with both Swedish (åäö) and English letters.
- **Class purity:** The instance never mutates your input. All analysis is performed in a pure, side-effect-free manner.

***

### Compact Overview (JSDoc/Inline-style Example)

```javascript
/**
 * Create a new text analysis
 * @param {string} text - Text to analyze
 * @throws {EmptyStringError} if text is empty
 * @throws {InvalidTypeError} if text is not a string
 */
const analyzer = new TextAnalyzer("This is an example.")

analyzer.countWords()            // => number of words in text
analyzer.countSentences()        // => number of sentences in text
analyzer.countCharacters()       // => number of characters (spaces included, default: true)
analyzer.letterFrequency()       // => {a: 1, ...}
analyzer.findPalindromes()       // => [ 'otto', ... ]
```


***

## Dependencies

- Relies on validation functions from `../utils/inputValidation.js`


## Limitations

- Designed for Swedish and English letters; other languages may not be fully supported.
- Sentences are counted using standard punctuation (. ! ?); edge cases may be missed.


## License

MIT

***

