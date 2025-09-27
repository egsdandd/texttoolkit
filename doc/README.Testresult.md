# README Test Results

## Test Coverage Summary

All main modules and utility functions in the project are covered by automated Jest tests. Below is a list of which methods and functions are tested in each test file:

---

### test/TextDocument.test.js
- getText
- countWords
- countSentences
- countCharacters (including and excluding spaces)
- letterFrequency
- findPalindromes
- Formatting methods: toUpperCase, toLowerCase, capitalizeWords, toCamelCase, toSnakeCase, toPascalCase, toKebabCase, trimWhitespace
- Transformation: reverseWordOrder, reverseText, removeWords, sortWords, shuffleWords
- Search: findFirst, findAll, exists, count, matchPattern, searchRegexp, testPattern
- Reversal: reverse, reverseWordsIndividually, reverseLines
- Palindrome test: isPalindrome
- Statistics: getStats

### test/analyzers/TextAnalyzer.test.js
- countWords
- countSentences
- countCharacters (including and excluding spaces)
- letterFrequency
- findPalindromes

### test/formatters/TextFormatter.test.js
- toUpperCase
- toLowerCase
- capitalizeWords
- toCamelCase
- toSnakeCase
- trimWhitespace
- getWords
- Handling of Swedish letters and symbols

### test/searchers/TextSearcher.test.js
- findFirst
- findAll
- exists
- matchPattern
- searchRegexp
- testPattern
- Error handling for empty/invalid arguments

### test/transformers/TextReverser.test.js
- reverse
- reverseWordsIndividually
- reverseWordOrder
- reverseLines
- reverseLongWords
- reverseEachSentence
- isPalindrome
- reverseAndCapitalizeWords
- Error handling

### test/transformers/TextTransformer.test.js
- transformWords
- reverseWordOrder
- replaceWord
- removeWords
- filterWords
- transformWordsByPosition
- Error handling

### test/helpfunctions/helpFunctions.test.js
- Various helper functions

---

## Test Results

- All test files are run automatically with `npm test`.
- Latest run: All tests passed without errors.
- The tests cover normal usage, edge cases, and error handling.

---

For a detailed test log, see the terminal output or run `npm test` again.
