[Back to README.md](../README.md)

***

# TextFormatter

TextFormatter is a lightweight ES6 JavaScript class that provides a variety of text formatting methods, supporting both Swedish and English characters. Methods include case-changing, word capitalization, camelCase and snake_case conversion, and whitespace handling, all with strict input validation.

***

## Usage Examples

### Import and Instantiation

```javascript
import TextFormatter from './src/formatters/TextFormatter.js'

// Create a formatter instance (text can be Swedish or English)
const formatter = new TextFormatter("  Anna och Otto paddlar KAJAK i ån!  ")
```


### Functions and Example Usage

```javascript
// Convert to uppercase
console.log('Uppercase:', formatter.toUpperCase()) // → "  ANNA OCH OTTO PADDLAR KAJAK I ÅN!  "

// Convert to lowercase
console.log('Lowercase:', formatter.toLowerCase()) // → "  anna och otto paddlar kajak i ån!  "

// Capitalize each word
console.log('Capitalize words:', formatter.capitalizeWords()) // → "  Anna Och Otto Paddlar Kajak I Ån!  "

// Convert text to camelCase
console.log('CamelCase:', formatter.toCamelCase()) // → "annaOchOttoPaddlarKajakIÅn"

// Convert text to snake_case
console.log('Snake_case:', formatter.toSnakeCase()) // → "anna_och_otto_paddlar_kajak_i_ån"

// Trim whitespace
console.log('Trimmed text:', formatter.trimWhitespace()) // → "Anna och Otto paddlar KAJAK i ån!"
```


***

## API Reference

### Class: `TextFormatter`

#### Constructor

```javascript
new TextFormatter(text: string)
```

- Creates a new formatting instance.
- Throws `EmptyStringError` if the input is empty.
- Throws `InvalidTypeError` if the input is not a string.


#### Methods

| Method | Description |
| :-- | :-- |
| `toUpperCase()` | Returns the text converted to uppercase. |
| `toLowerCase()` | Returns the text converted to lowercase. |
| `capitalizeWords()` | Returns the text with the first letter of each word capitalized. |
| `toCamelCase()` | Returns the text converted to camelCase (keeps Swedish/English letters). |
| `toSnakeCase()` | Returns the text converted to snake_case (keeps Swedish/English letters). |
| `trimWhitespace()` | Returns the text with leading and trailing whitespace removed. |


***

### Developer Notes

- **Strict input validation:** All methods throw errors for invalid input (empty string, wrong type).
- **Language support:** Designed to recognize both Swedish (åäö) and English word boundaries and letters.
- **Class purity:** The instance never mutates your original input; all methods are pure and return formatted text.

***

### Compact Reference (JSDoc/Inline-style Example)

```javascript
/**
 * Create a new formatter for text
 * @param {string} text - Text to format
 * @throws {EmptyStringError} if text is empty
 * @throws {InvalidTypeError} if text is not a string
 */
const formatter = new TextFormatter("Example string åäö")

formatter.toUpperCase()      // => "EXAMPLE STRING ÅÄÖ"
formatter.toLowerCase()      // => "example string åäö"
formatter.capitalizeWords()  // => "Example String Åäö"
formatter.toCamelCase()      // => "exampleStringÅäö"
formatter.toSnakeCase()      // => "example_string_åäö"
formatter.trimWhitespace()   // => "Example string åäö"
```


***

## Dependencies

- Relies on validation functions from `../utils/inputValidation.js`


## Limitations

- Designed for Swedish and English; other language alphabets are not fully supported.
- Formatting is based on recognized word boundaries and basic punctuation; edge cases possible.


## License

MIT

***
