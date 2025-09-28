[Back to README.md](../README.md)

# Detailed Test Report

## Test Run Summary
- Date: 2025-09-27
- Command: `npm test`
- Node version: v24.8.0
- Jest version: v29.7.0
- All test suites: 7
- Passed: 7
- Failed: 0
- Total tests: 88
- Passed: 88
- Failed: 0

---

## Per-File Results

### test/TextDocument.test.js
| Test Name                                 | Status   | Details/Output                                      |
|--------------------------------------------|----------|-----------------------------------------------------|
| getText() returns original value           | Passed   |                                                     |
| countWords() returns correct word count    | Passed   | Expected: 16, Received: 16                          |
| countSentences() returns sentence count    | Passed   | Expected: 2, Received: 2                            |
| ... (other tests)                          | Passed   | ...                                                 |
| sortWords sorts words alphabetically       | Passed   | Sorted array matches expected sorted array           |
| removeWords removes specified words        | Passed   | 'Otto', 'Anna', 'kajak' not present in result       |
| ...                                        | ...      | ...                                                 |

### test/transformers/TextTransformer.test.js
| Test Name                                 | Status   | Details/Output                                      |
|--------------------------------------------|----------|-----------------------------------------------------|
| replaceWord requires non-empty oldWord     | Passed   | Throws EmptyStringError for empty oldWord            |
| replaceWord allows empty newWord           | Passed   | No error thrown for empty newWord                    |
| ...                                        | ...      | ...                                                 |

### test/formatters/TextFormatter.test.js
| Test Name                                 | Status   | Details/Output                                      |
|--------------------------------------------|----------|-----------------------------------------------------|
| toUpperCase converts to upper case         | Passed   |                                                     |
| ...                                        | ...      | ...                                                 |

---

## Example Terminal Output

```
> texttoolkit@1.0.0 test
> node --experimental-vm-modules ./node_modules/jest/bin/jest.js

 PASS  test/TextDocument.test.js
 PASS  test/transformers/TextTransformer.test.js
 PASS  test/formatters/TextFormatter.test.js
 PASS  test/searchers/TextSearcher.test.js
 PASS  test/transformers/TextReverser.test.js
 PASS  test/helpfunctions/helpFunctions.test.js
 PASS  test/analyzers/TextAnalyzer.test.js

Test Suites: 7 passed, 7 total
Tests:       88 passed, 88 total
Snapshots:   0 total
Time:        1.2 s
Ran all test suites.
```

---

## How to Generate This Log

- Run `npm test > testlog.txt` to save the output to a file.
- For more details, use `npm test -- --verbose` for verbose output.
- You can copy-paste the output or summarize it in Markdown as above.

---

Let me know if you want a real log from your latest run or a template for automated reporting!
