
***

# Error Classes (utils/errors.js)

This module defines custom error classes for strict input validation in text utilities. These errors provide descriptive feedback when parameters do not meet expected type or value constraints.

***

## Error Classes

| Class Name | Extends | Description |
| :-- | :-- | :-- |
| `InvalidTypeError` | TypeError | Thrown when a parameter is not of the expected type. |
| `EmptyStringError` | TypeError | Thrown when a required string parameter is empty. |
| `TooLongError` | RangeError | Thrown when a string exceeds the allowed maximum length. |
| `InvalidPatternError` | Error | Thrown when a parameter is not a valid regular expression. |
| `EmptyPatternError` | Error | Thrown when a pattern (string or regexp) is empty. |
| `InvalidBooleanError` | TypeError | Thrown when a value is not a boolean. |
| `TextTooLongError` | RangeError | Thrown when the main text input is too long as a whole. |


***

## Usage Examples

```javascript
import { InvalidTypeError, EmptyStringError } from '../utils/errors.js'

// Invalid type
function expectNumber(x) {
  if (typeof x !== 'number') throw new InvalidTypeError('x', 'a number')
}
try {
  expectNumber('hej')
} catch (err) {
  console.error(err.message) // "x must be a number."
}

// Empty string
function notEmpty(str) {
  if (!str) throw new EmptyStringError('str')
}
try {
  notEmpty('')
} catch (err) {
  console.error(err.message) // "str must not be empty."
}
```


***

## API Reference

### InvalidTypeError

```javascript
new InvalidTypeError(param: string, expected: string)
```

- Indicates a parameter was not of the expected type.


### EmptyStringError

```javascript
new EmptyStringError(param: string)
```

- Indicates a required string parameter was empty.


### TooLongError

```javascript
new TooLongError(param: string, max: number)
```

- Indicates a string parameter exceeded the allowed maximum length.


### InvalidPatternError

```javascript
new InvalidPatternError(param: string)
```

- Indicates a parameter was not a valid regular expression.


### EmptyPatternError

```javascript
new EmptyPatternError(param: string)
```

- Indicates a pattern string or RegExp was empty.


### InvalidBooleanError

```javascript
new InvalidBooleanError(param: string)
```

- Indicates a value was not a boolean.


### TextTooLongError

```javascript
new TextTooLongError(max: number)
```

- Indicates the main text input exceeded the allowed maximum length.

***

## Developer Notes

- All custom errors include a descriptive message and set `name` for easier type-checking.
- Import only the specific errors needed for validation in your own utilities or classes.


## License

MIT

***
