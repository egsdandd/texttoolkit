[Back to README.md](../README.md)

***

# TextReverser

TextReverser is a lightweight ES6 JavaScript class providing versatile text reversal methods. It enables reversal of entire strings, words, sentences, lines, and more—with strict input validation and robust error handling.

***

## Usage Examples

### Import and Instantiation

```javascript
import TextReverser from './src/formatters/TextReverser.js'

// Create a reverser instance (works with any language text)
const reverser = new TextReverser("Anna och Otto paddlar kajak.\nBob blev Eva av med Madam!")
```


### Functions and Example Usage

```javascript
// Reverse the whole text
console.log('Full reverse:', reverser.reverse())
// → "!madam dem va av ave blev boB\n.kajak ralddap otto hco annA"

// Reverse each word individually (preserves word order)
console.log('Reversed words:', reverser.reverseWordsIndividually())
// → "annA hco ottO raldpad kajak.\nboB blev av ev dem !madaM"

// Reverse word order (preserves word content)
console.log('Reversed word order:', reverser.reverseWordOrder())
// → "Madam! med av Eva blev Bob kajak. paddlar Otto och Anna"

// Reverse lines (for multiline text)
console.log('Reversed lines:', reverser.reverseLines())
// →

// Reverse only words longer than a given length
console.log('Reverse long words:', reverser.reverseLongWords(5))
// → "Anna och Otto raldpad kajak.\nBob blev Eva av med !madam"

// Reverse each sentence
console.log('Reverse sentences:', reverser.reverseEachSentence())
// → "annA hco ottO raldpad kajak. !madaM dem va av ave blev boB"

// Check if the text is a palindrome (ignores case by default)
console.log('Is palindrome:', reverser.isPalindrome())
// → false

// Reverse and capitalize each word
console.log('Reverse & capitalize:', reverser.reverseAndCapitalizeWords())
// → "AnnA Hco OttO Raldpad Kajak. BoB Blev Va Ev Dem !Madam"
```


***

## API Reference

### Class: `TextReverser`

#### Constructor

```javascript
new TextReverser(text: string)
```

- Creates a new reversal instance.
- Throws `EmptyStringError` if input is empty or whitespace.
- Throws `TooLongError` if text length exceeds `MAX_TEXT_LENGTH`.
- Throws `InvalidTypeError` for type errors.


#### Methods

| Method | Description |
| :-- | :-- |
| `reverse()` | Reverses the entire text string. |
| `reverseWordsIndividually()` | Reverses each word individually; word order is preserved. |
| `reverseWordOrder()` | Reverses the order of words; each word remains intact. |
| `reverseLines()` | Reverses the order of lines in multiline text. |
| `reverseLongWords(minLength = 4)` | Reverses only words longer than `minLength` characters. |
| `reverseEachSentence()` | Reverses each sentence (split on ., !, ?). |
| `isPalindrome(ignoreCase = true)` | Checks if the entire text is a palindrome. |
| `reverseAndCapitalizeWords()` | Reverses each word and capitalizes the first letter of each reversed word. |


***

### Developer Notes

- **Strict input validation:** All methods throw explicit errors for empty strings, excessive length, invalid types, or boolean flags.
- **Error handling:** Custom errors include `EmptyStringError`, `TooLongError`, and `InvalidTypeError`.
- **Class purity:** The instance is pure—never mutates your input; all formatting is performed without side effects.

***

### Compact Reference (JSDoc/Inline-style Example)

```javascript
/**
 * Create a new reverser for text
 * @param {string} text - Text to reverse
 * @throws {EmptyStringError} if text is empty or whitespace-only
 * @throws {TooLongError} if text exceeds MAX_TEXT_LENGTH
 * @throws {InvalidTypeError} for invalid types
 */
const reverser = new TextReverser("Racecar anna kayak")
reverser.reverse()                        // => "kayak anna Racecar"
reverser.reverseWordsIndividually()       // => "racecaR anna kayak"
reverser.reverseWordOrder()               // => "kayak anna Racecar"
reverser.reverseLines()                   // => "kayak\nanna\nRacecar"
reverser.reverseLongWords(6)              // => "racecaR anna kayak"
reverser.reverseEachSentence()            // => "racecaR anna kayak"
reverser.isPalindrome()                   // => false
reverser.reverseAndCapitalizeWords()      // => "RacecaR Anna Kayak"
```


***

## Dependencies

- Relies on validation functions from `../utils/inputValidation.js`
- Uses custom errors from `../utils/errors.js`


## Limitations

- Designed for general text reversal; word/sentence delimiters are split on space or punctuation (. ! ?)
- Edge cases may arise for non-standard input formats


## License

MIT

***

