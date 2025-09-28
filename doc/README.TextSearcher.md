[Back to README.md](../README.md)

***

# TextSearcher

TextSearcher is a lightweight ES6 JavaScript class for advanced text searching within strings. It offers substring search, existence checks, and regular expression support, all with strict input validation and robust error handling.

***

## Usage Examples

### Import and Instantiation

```javascript
import TextSearcher from './src/searchers/TextSearcher.js'

// Create a searcher instance (works with Swedish and English text)
const searcher = new TextSearcher("Otto och Anna paddlar kajak i ån. Madam, blev Eva av med Bob?")
```


### Functions and Example Usage

```javascript
// Find first occurrence of a substring (case-sensitive)
console.log('First index:', searcher.findFirst('kajak')) // → e.g. 23

// Find all occurrences (case-insensitive)
console.log('All indices:', searcher.findAll('anna', false)) // → [^8]

// Check existence of a substring
console.log('Exists?', searcher.exists('Madam')) // → true

// Match regular expression pattern
console.log('Regex matches:', searcher.matchPattern(/[A-ZÅÄÖ][a-zåäö]+/g)) 
// → ['Otto', 'Anna', 'Madam', 'Eva', 'Bob']

// Search for regex (returns first match index)
console.log('Regex first index:', searcher.searchRegexp(/kajak/i)) // → 23
```


***

## API Reference

### Class: `TextSearcher`

#### Constructor

```javascript
new TextSearcher(text: string)
```

- Creates a new search instance.
- Throws `EmptyStringError` if the text is empty.
- Throws `InvalidTypeError` if input is not a string.


#### Methods

| Method | Description |
| :-- | :-- |
| `findFirst(substring, caseSensitive = true)` | Returns index of first occurrence of substring, or -1 if not found. |
| `findAll(substring, caseSensitive = true)` | Returns array of all indices for the substring. |
| `exists(substring, caseSensitive = true)` | Returns true if substring exists, else false. |
| `matchPattern(pattern: RegExp)` | Returns array of matches for regular expression pattern. |
| `searchRegexp(regexp: RegExp)` | Returns index of first regex match, or -1 if not found. |


***

### Developer Notes

- **Strict input validation:** All methods throw clear errors for invalid input (empty/too long string, wrong type, invalid regex, etc).
- **Robust error handling:** Custom errors include `InvalidPatternError`, `EmptyPatternError`, and `TooLongError`.
- **Class purity:** The instance never mutates original text; all searches are pure and side-effect free.

***

### Compact Reference (JSDoc/Inline-style Example)

```javascript
/**
 * Create a new searcher for text
 * @param {string} text - Text to search within
 * @throws {EmptyStringError} if text is empty
 * @throws {InvalidTypeError} if text is not a string
 */
const searcher = new TextSearcher("Example Anna Bob kajak")

searcher.findFirst('Bob')                 // => index of first match, e.g. 15
searcher.findAll('kajak', false)          // => [^19]
searcher.exists('Anna')                   // => true
searcher.matchPattern(/[A-ZÅÄÖ][a-zåäö]+/g)  // => [ 'Example', 'Anna', 'Bob' ]
searcher.searchRegexp(/kajak/i)           // => 19
```


***

## Dependencies

- Relies on validation functions from `../utils/inputValidation.js`
- Uses custom errors from `../utils/errors.js`


## Limitations

- Substring length and regex source length are limited for safety (`MAX_SUBSTRING_LENGTH`, `MAX_REGEX_SOURCE_LENGTH`)
- Designed for “NFC” normalized Unicode text; unsupported encodings may yield unexpected results


## License

MIT

***


