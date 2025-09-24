
***

# TextDocument

TextDocument is a high-level ES6 class providing unified access to advanced text analysis, formatting, searching, and transformation features. It aggregates functionality from dedicated analyzer, formatter, searcher, and transformer components, all accessible from a single API entry point.

***

## Usage Example

```javascript
import TextDocument from './src/TextDocument.js'

const doc = new TextDocument("Anna swims quickly, Otto laughs loudly.")

console.log(doc.countWords()) // 6
console.log(doc.countSentences()) // 2
console.log(doc.letterFrequency()) // { a:3, n:2, ... }
console.log(doc.findPalindromes()) // ['anna', 'otto']

console.log(doc.toUpperCase()) // "ANNA SWIMS QUICKLY, OTTO LAUGHS LOUDLY."
console.log(doc.toCamelCase()) // "annaSwimsQuicklyOttoLaughsLoudly"
console.log(doc.trimWhitespace()) // "Anna swims quickly, Otto laughs loudly."
console.log(doc.reverseWordOrder()) // "loudly. laughs Otto quickly, swims Anna"
console.log(doc.replaceWord('Anna', 'Eva')) // "Eva swims quickly, Otto laughs loudly."

console.log(doc.reverseText()) // "annA swims ylkciuq, ottO laughs ylduol."
console.log(doc.transformText(word => word.toUpperCase() + "!")) // "ANNA! SWIMS! QUICKLY,! OTTO! LAUGHS! LOUDLY.!"

console.log(doc.findFirst('Otto')) // e.g. 23
console.log(doc.findAll('ly')) // e.g. [20, 39]
console.log(doc.exists('quickly')) // true
console.log(doc.matchPattern(/[A-Z][a-z]+/g)) // ['Anna', 'Otto', 'Laughs', 'Loudly']
console.log(doc.searchRegexp(/laughs/i)) // e.g. 29
```


***

## Methods

**TextDocument** wraps and exposes the following methods by delegating calls to underlying analyzer, formatter, transformer, and searcher classes:

### Analysis

- `countWords()` — Returns the number of words in the text.
- `countSentences()` — Returns the number of sentences in the text.
- `countCharacters(includeSpaces = true)` — Returns number of characters, optionally including spaces.
- `letterFrequency()` — Returns an object with letter frequencies.
- `findPalindromes()` — Finds all palindromic words in the text.


### Formatting

- `toUpperCase()` — Converts text to uppercase.
- `toLowerCase()` — Converts text to lowercase.
- `capitalizeWords()` — Capitalizes the first letter of each word.
- `toCamelCase()` — Converts text to camelCase.
- `toSnakeCase()` — Converts text to snake_case.
- `trimWhitespace()` — Trims leading and trailing whitespace.


### Transformation

- `reverseWordOrder()` — Reverses the order of words, keeps each word intact.
- `replaceWord(oldWord, newWord)` — Replaces all occurrences of a word.
- `reverseText()` — Reverses each word individually (keeps word order).
- `transformText(transformFn)` — Applies a custom transformation function to every word.


### Searching

- `findFirst(substring)` — Finds index of first occurrence of substring.
- `findAll(substring)` — Returns array of all occurrence indices of substring.
- `exists(substring)` — Checks if substring exists.
- `matchPattern(pattern)` — Matches a RegExp or string pattern.
- `searchRegexp(regexp)` — Finds first occurrence matching regexp.


### State Management

- `setText(newText)` — Updates the document’s text (and all delegates).
- `getText()` — Retrieves the current text.

***

## API Structure

TextDocument delegates analysis, formatting, searching, and transformation to:

- **TextAnalyzer:** Word, character, and sentence statistics, palindromes
- **TextFormatter:** Case changes, formatting, trimming
- **TextSearcher:** Substring and regex search, position services
- **TextTransformer:** Word transformations, replacements, order changes

***

## Developer Notes

- Input validation and error handling are performed by delegated modules.
- The text state is kept internally; updates via `setText()` propagate to all methods and submodules.
- All operations are pure except for updating text state.
- Methods are chainable; each operates independently on current text.

***

## License

MIT

***

This README offers clear documentation, practical examples, method signatures, and API organization tailored for developers integrating advanced text processing features.



