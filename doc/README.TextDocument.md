[Back to README.md](../README.md)

# TextDocument

TextDocument is a comprehensive ES6 class providing unified access to advanced text analysis, formatting, searching, transformation, and reversal features. It aggregates functionality from dedicated analyzer, formatter, searcher, transformer, and reverser components, all accessible from a single API entry point with robust Unicode support.

## Usage Example

```javascript
import TextDocument from './src/TextDocument.js'

const doc = new TextDocument("Anna swims quickly, Otto laughs loudly.")

// Analysis
console.log(doc.countWords()) // 6
console.log(doc.countSentences()) // 2
console.log(doc.letterFrequency()) // { a:3, n:2, ... }
console.log(doc.findPalindromes()) // ['anna', 'otto']
console.log(doc.getStats()) // { words: 6, sentences: 2, characters: 38, ... }

// Formatting
console.log(doc.toUpperCase()) // "ANNA SWIMS QUICKLY, OTTO LAUGHS LOUDLY."
console.log(doc.toCamelCase()) // "annaSwimsQuicklyOttoLaughsLoudly"
console.log(doc.toPascalCase()) // "AnnaSwimsQuicklyOttoLaughsLoudly"
console.log(doc.toKebabCase()) // "anna-swims-quickly-otto-laughs-loudly"

// Transformation
console.log(doc.reverseWordOrder()) // "loudly. laughs Otto quickly, swims Anna"
console.log(doc.replaceWord('Anna', 'Eva')) // "Eva swims quickly, Otto laughs loudly."
console.log(doc.removeWords(['quickly', 'loudly'])) // "Anna swims, Otto laughs."
console.log(doc.sortWords()) // "Anna Otto laughs loudly quickly swims"
console.log(doc.shuffleWords()) // Random word order

// Reversal
console.log(doc.reverse()) // ".ylduol shgual otO ,ylkciuq smiws annA"
console.log(doc.reverseWordsIndividually()) // "annA smiws ylkciuq, ottO shgual .ylduol"
console.log(doc.isPalindrome()) // false

// Searching
console.log(doc.findFirst('Otto')) // 23
console.log(doc.findAll('ly', false)) // Case-insensitive search
console.log(doc.count('ly')) // 2
console.log(doc.exists('quickly')) // true
console.log(doc.matchPattern(/[A-Z][a-z]+/g)) // ['Anna', 'Otto']
```

## Methods

**TextDocument** wraps and exposes methods by delegating to underlying components:

### Analysis

- `countWords()` — Returns the number of words in the text
- `countSentences()` — Returns the number of sentences in the text
- `countCharacters(includeSpaces = true)` — Returns character count, optionally including spaces
- `letterFrequency()` — Returns an object with letter frequencies
- `findPalindromes()` — Finds all palindromic words in the text
- `getStats()` — Returns comprehensive text statistics object
- `isEmpty()` — Checks if document has any content

### Formatting

- `toUpperCase()` — Converts text to uppercase
- `toLowerCase()` — Converts text to lowercase
- `capitalizeWords()` — Capitalizes the first letter of each word
- `toCamelCase()` — Converts text to camelCase
- `toSnakeCase()` — Converts text to snake_case
- `toPascalCase()` — Converts text to PascalCase
- `toKebabCase()` — Converts text to kebab-case
- `trimWhitespace()` — Trims leading and trailing whitespace

### Transformation

- `transformWords(transformFn)` — Applies custom function to each word
- `reverseWordOrder()` — Reverses word order, keeps each word intact
- `replaceWord(oldWord, newWord, caseSensitive = true)` — Replaces word occurrences
- `removeWords(wordsArray, caseSensitive = true)` — Removes specified words
- `sortWords(descending = false)` — Sorts words alphabetically
- `shuffleWords()` — Randomizes word order

### Reversal

- `reverse()` — Reverses entire text character by character
- `reverseWordsIndividually()` — Reverses each word while preserving word positions
- `reverseLines()` — Reverses line order in multi-line text
- `isPalindrome(ignoreCase = true, ignoreSpaces = false)` — Checks if text is palindrome

### Searching

- `findFirst(substring, caseSensitive = true)` — Finds index of first occurrence
- `findAll(substring, caseSensitive = true)` — Returns array of all occurrence indices
- `count(substring, caseSensitive = true)` — Counts occurrences of substring
- `exists(substring, caseSensitive = true)` — Checks if substring exists
- `matchPattern(pattern)` — Matches a RegExp pattern
- `searchRegexp(regexp)` — Finds first occurrence matching regexp
- `testPattern(pattern)` — Tests if pattern matches anywhere in text

### Legacy Methods

- `reverseText()` — Alias for `reverseWordsIndividually()`
- `transformText(transformFn)` — Alias for `transformWords()`

### State Management

- `setText(newText)` — Updates the document's text and reinitializes all components
- `getText()` — Retrieves the current text content

## API Structure

TextDocument delegates functionality to specialized components:

- **TextAnalyzer:** Word, character, sentence statistics, palindrome detection
- **TextFormatter:** Case transformations, formatting utilities with Unicode support
- **TextSearcher:** Substring and regex search with case-sensitive options
- **TextTransformer:** Word-level transformations, replacements, sorting
- **TextReverser:** Various text reversal operations with Unicode support

## Key Features

### Unicode Support
- Handles international characters (åäö, café, naïve, etc.)
- Proper handling of emoji and complex Unicode characters
- Turkish İ character normalization
- Combining diacritical marks support

### Performance Optimizations
- Intelligent caching for expensive operations
- Efficient word splitting and text processing
- Minimal object creation for empty text

### Error Handling
- Graceful handling of empty text (returns safe defaults)
- Input validation performed by specialized components
- Consistent error types across all methods

### Case Sensitivity
- Configurable case sensitivity for search and transformation operations
- Intelligent case handling for different locales

## Developer Notes

- All input validation and error handling performed by delegated modules
- Text state maintained internally; `setText()` updates propagate to all components
- Operations are pure functions except for state updates via `setText()`
- Empty text handling returns appropriate defaults (0, [], '', false)
- Unicode normalization applied consistently across all operations
- Performance optimized with caching strategies in underlying components

## License

MIT

This comprehensive text processing library provides a unified interface for advanced text manipulation with robust Unicode support, performance optimizations, and extensive functionality for modern JavaScript applications.