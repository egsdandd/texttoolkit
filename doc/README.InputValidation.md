[Back to README.md](../README.md)

***

# Input Validation Utilities (utils/inputValidation.js)

This module provides utility functions for validating parameters in text processing applications. All checks are strict and throw custom errors (from `errors.js`) when input does not meet requirements.

***

## API Reference

| Function | Description |
| :-- | :-- |
| `isFunction(fn)` | Returns `true` if value is a function, else `false`. |
| `validatePositiveInteger(value, param)` | Throws if value is not a positive integer (>0). |
| `isNonEmptyString(v)` | Returns `true` if value is a non-empty string, else `false`. |
| `validateNonEmptyString(val, msgOrParam)` | Throws if not a string or if string is empty. |
| `validateMaxLength(val, max, msgOrParam)` | Throws if not a string or string exceeds maximum length. |
| `validateBoolean(val, param)` | Throws if value is not boolean. |
| `validateFunction(fn, param)` | Throws if value is not a function. |
| `MAX_TEXT_LENGTH` | Default maximum allowed text length (100,000 chars by default). |


***

## Usage Examples

```javascript
import {
  isNonEmptyString,
  validateNonEmptyString,
  validatePositiveInteger,
  validateMaxLength,
  validateBoolean,
  validateFunction,
  MAX_TEXT_LENGTH
} from './inputValidation.js'

// Check and validate string
if (isNonEmptyString(userInput)) {
  validateMaxLength(userInput, MAX_TEXT_LENGTH, 'userInput')
}

// Validate required arguments before use
validateNonEmptyString(username, 'username')           // Throws if empty or not a string
validateBoolean(isActive, 'isActive')                  // Throws if not a boolean
validateFunction(callback, 'callback')                 // Throws if not a function
validatePositiveInteger(count, 'count')                // Throws if not integer > 0
```


***

## Errors Thrown

- Errors are imported from `utils/errors.js` and include:
    - `InvalidTypeError` — wrong type
    - `EmptyStringError` — empty string detected
    - `TooLongError` — string exceeds allowed length
    - `InvalidBooleanError` — value is not boolean

***

## Developer Notes

- Use these validation utilities in constructors, setters, and method arguments across modules handling user input or text data.
- All validators throw clear, custom errors for robust error handling and debugging.
- Change `MAX_TEXT_LENGTH` if your application needs to support longer or shorter text fields.


## License

MIT

***

