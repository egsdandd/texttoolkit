***

# TextTransformer

TextTransformer is a lightweight ES6 JavaScript class for advanced, word-level transformations on textual data. It includes support for customizable transformation functions, word replacements, and word order reversal, all with strict validation and clear error handling.

***

## Usage Examples

### Import and Instantiation

```javascript
import TextTransformer from './src/transformers/TextTransformer.js'

// Create a transformer instance
const transformer = new TextTransformer("Anna paddlar snabbt kajak")
```


### Functions and Example Usage

```javascript
// Apply a transformation function to each word (e.g., uppercase)
console.log('Transform words:', transformer.transformWords(word => word.toUpperCase()))
// → "ANNA PADDLAR SNABBT KAJAK"

// Reverse the order of words
console.log('Reverse word order:', transformer.reverseWordOrder())
// → "kajak snabbt paddlar Anna"

// Replace all occurrences of a word
console.log('Replace word:', transformer.replaceWord('kajak', 'kanot'))
// → "Anna paddlar snabbt kanot"
```


***

## API Reference

### Class: `TextTransformer`

#### Constructor

```javascript
new TextTransformer(text: string)
```

- Creates a new transformer instance.
- Throws `EmptyStringError` if input is empty.
- Throws `TooLongError` if text length exceeds `MAX_TEXT_LENGTH`.


#### Methods

| Method | Description |
| :-- | :-- |
| `transformWords(transformFn)` | Applies a transformation function to every word in the text. |
|  | Throws `TypeError` if `transformFn` is not a function. |
| `reverseWordOrder()` | Reverses the order of words in the text. |
| `replaceWord(oldWord, newWord)` | Replaces all occurrences of `oldWord` with `newWord` (case-sensitive). |
|  | Throws `TypeError` if `oldWord` or `newWord` are not non-empty strings. |


***

### Developer Notes

- **Strict input validation:** All methods validate input and throw explicit errors for invalid strings, overly long input, or wrong types.
- **Customizable transformations:** Use any function that takes and returns a string for `transformWords`.
- **Class purity:** The instance never mutates your input; all results are pure and side-effect free.

***

### Compact Reference (JSDoc/Inline-style Example)

```javascript
/**
 * Create a new transformer for text
 * @param {string} text - Text to transform
 * @throws {EmptyStringError} if text is empty
 * @throws {TooLongError} if text exceeds MAX_TEXT_LENGTH
 */
const transformer = new TextTransformer("Anna paddlar kajak")

transformer.transformWords(w => w + "!")      // => "Anna! paddlar! kajak!"
transformer.reverseWordOrder()                // => "kajak paddlar Anna"
transformer.replaceWord("kajak", "kanot")     // => "Anna paddlar kanot"
```


***

## Dependencies

- Relies on validation functions from `../utils/inputValidation.js`


## Limitations

- All transformations are space-delimited—multiple spaces or advanced tokenization aren't handled.
- `replaceWord` is case-sensitive and matches full words only via boundaries.


## License

MIT

***
