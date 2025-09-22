
***

### Main Classes in the Toolkit

1.**TextDocument**

Wrapper/facade class that gathers and exposes analysis, formatting, search, and transformation methods.

**Methods:**

- `analyze()` – returns word, sentence, character statistics, letter frequency, palindromes
- `format(formatType)` – provides formatting options (`uppercase`, `lowercase`, etc.)
- `search(pattern[, options])` – substring or regex search, returns positions
- `transform(transformType[, options])` – word transformation, reversal, replacements

2.**TextAnalyzer**

Responsible for word, character, and sentence analysis, frequency, and palindrome detection.

**Methods:**

- `countWords()`
- `countSentences()`
- `countCharacters(includeSpaces)`
- `letterFrequency()`
- `findPalindromes()`

3.**TextFormatter**

Handles uppercase/lowercase, capitalization, camelCase, snake_case and trimming.

**Methods:**

- `toUpperCase()`
- `toLowerCase()`
- `capitalizeWords()`
- `toCamelCase()`
- `toSnakeCase()`
- `trimWhitespace()`

4.**TextTransformer**

Performs word-level transformation, word order change, and replacement operations.

**Methods:**

- `transformWords(transformFn)`
- `reverseWordOrder()`
- `replaceWord(oldWord, newWord)`

5.**TextSearcher**

Handles substring search, regexp search, and related position services.

**Methods:**

- `findFirst(substring, caseSensitive)`
- `findAll(substring, caseSensitive)`
- `exists(substring, caseSensitive)`
- `matchPattern(pattern)`
- `searchRegexp(regexp)`

6.**TextReverser**

Handles various ways to reverse text, lines, and words.

**Methods:**

- `reverse()`
- `reverseWordsIndividually()`
- `reverseWordOrder()`
- `reverseLines()`
- `reverseLongWords(minLength)`
- `reverseEachSentence()`
- `isPalindrome(ignoreCase)`
- `reverseAndCapitalizeWords()`

***

### Support/Error Classes from utils/errors.js

7. **EmptyStringError**
8. **InvalidTypeError**
9. **InvalidBooleanError**
10. **InvalidPatternError**
11. **TooLongError**

***

### Summary Table

| Class | Purpose/Scope |
| :-- | :-- |
| TextDocument | Aggregates all text logic/wrapper |
| TextAnalyzer | Statistical text analysis |
| TextFormatter | Format and case conversion |
| TextTransformer | Transform/change words/text |
| TextSearcher | Substring/regex search |
| TextReverser | Various text reversal functions |
| EmptyStringError | Error class for empty strings |
| InvalidTypeError | Type validation error |
| InvalidBooleanError | Error for boolean validation |
| InvalidPatternError | Error for regex validation |
| TooLongError | Error for length validation |


***

### Total Number of Classes

**11 distinct classes** (6 main functional classes + 5 custom error/validation classes).

