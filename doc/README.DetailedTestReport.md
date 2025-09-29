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

## Verbose test run

PS E:\1DV610\texttoolkit> npm test -- --verbose

> texttoolkit@1.0.0 test
> node --experimental-vm-modules ./node_modules/jest/bin/jest.js --verbose

(node:26380) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

 PASS  test/TextDocument.test.js

  TextDocument
  
    √ getText() returnerar det ursprungliga värdet (1 ms)
    √ countWords() returnerar korrekt antal ord
    √ countSentences() återger antal satser
    √ countCharacters() och countCharacters(false)
    √ letterFrequency() returnerar ett objekt
    √ findPalindromes() hittar palindrom (1 ms)
    √ formatteringsmetoder fungerar (1 ms)
    √ toPascalCase returnerar PascalCase (1 ms)
    √ toKebabCase returnerar kebab-case
    √ reverseWordOrder() och reverseText() returnerar sträng
    √ removeWords tar bort angivna ord
    √ sortWords sorterar ord alfabetiskt (5 ms)
    √ shuffleWords returnerar en sträng med samma ord i annan ordning (3 ms)
    √ reverseLines vänder radordning
    √ isPalindrome känner igen palindrom (1 ms)
    √ getStats returnerar statistikobjekt
    √ replaceWord() byter ut ord korrekt (1 ms)                                                                                                                                                                             
    √ transformText() fungerar med callback                                                                                                                                                                                 
    √ findFirst(), findAll(), exists(), matchPattern(), searchRegexp()                                                                                                                                                      
    √ setText ändrar all underliggande struktur och resultat                                                                                                                                                                
                                                                                                                                                                                                                            
 PASS  test/transformers/TextReverser.test.js                                                                                                                                                                               
  TextReverser
    √ reverse() vänder hela texten                                                                                                                                                                                          
    √ reverseWordsIndividually() vänder varje ord men behåller ordningen                                                                                                                                                    
    √ reverseWordOrder() vänder ordningen på alla ord                                                                                                                                                                       
    √ reverseLines() vänder radorder                                                                                                                                                                                        
    √ reverseLongWords() vänder bara "långa" ord (6 ms)                                                                                                                                                                     
    √ reverseEachSentence() vänder tecken i varje mening men behåller struktur (1 ms)                                                                                                                                       
    √ isPalindrome() känner igen palindrom och hanterar case-flagga (19 ms)                                                                                                                                                 
    √ reverseAndCapitalizeWords() reverserar och gör första bokstav till versal i varje ord                                                                                                                                 
    √ tom sträng och whitespace kastar EmptyStringError vid konstruktion (1 ms)                                                                                                                                             
                                                                                                                                                                                                                            
 PASS  test/searchers/TextSearcher.test.js                                                                                                                                                                                  
  TextSearcher
    constructor                                                                                                                                                                                                             
      √ skapar instans med giltig text (1 ms)                                                                                                                                                                               
      √ kastar på tom eller ogiltig text (20 ms)                                                                                                                                                                            
    findFirst                                                                                                                                                                                                               
      √ hittar första substring case-sensitive                                                                                                                                                                              
      √ hittar första substring case-insensitive (1 ms)                                                                                                                                                                     
      √ returnerar -1 om ej hittad                                                                                                                                                                                          
      √ kastar fel på tom substring                                                                                                                                                                                         
      √ kastar fel på ogiltig caseSensitive (1 ms)                                                                                                                                                                          
    findAll                                                                                                                                                                                                                 
      √ hittar alla förekomster case-sensitive (1 ms)                                                                                                                                                                       
      √ hittar alla förekomster case-insensitive                                                                                                                                                                            
      √ tom lista om ej hittad                                                                                                                                                                                              
      √ kastar fel på ogiltig substring eller flagga (1 ms)                                                                                                                                                                 
    exists                                                                                                                                                                                                                  
      √ returnerar true för existerande substring                                                                                                                                                                           
      √ returnerar false om ej hittad                                                                                                                                                                                       
      √ tar hänsyn till case-insensitive (1 ms)                                                                                                                                                                             
      √ kastar fel på ogiltig input (1 ms)                                                                                                                                                                                  
    matchPattern                                                                                                                                                                                                            
      √ matchar alla Åsa                                                                                                                                                                                                    
      √ kastar om mönster är fel typ (1 ms)                                                                                                                                                                                 
    searchRegexp                                                                                                                                                                                                            
      √ returnerar start-index för regexp-träff                                                                                                                                                                             
      √ returnerar -1 om ingen träff                                                                                                                                                                                        
      √ kastar fel vid ogiltig regexp                                                                                                                                                                                       
                                                                                                                                                                                                                            
 PASS  test/formatters/TextFormatter.test.js                                                                                                                                                                                
  TextFormatter
    √ converts to upper case (1 ms)                                                                                                                                                                                         
    √ converts to lower case                                                                                                                                                                                                
    √ capitalizes words                                                                                                                                                                                                     
    √ converts to camelCase (1 ms)                                                                                                                                                                                          
    √ converts to snake_case                                                                                                                                                                                                
    √ trims whitespace                                                                                                                                                                                                      
    √ handles Swedish letters and symbols (2 ms)                                                                                                                                                                            
    √ preserves whitespace and layout in capitalizeWords                                                                                                                                                                    
    √ trims whitespace for trimWhitespace                                                                                                                                                                                   
    √ splits multiple underscores/hyphens                                                                                                                                                                                   
    √ camelCase with symbols and spaces                                                                                                                                                                                     
    √ throws error for empty input (20 ms)                                                                                                                                                                                  
    √ getWords handles Unicode letters                                                                                                                                                                                      
    √ capitalizeWords handles mixed scripts                                                                                                                                                                                 
    √ toCamelCase is Unicode-clean                                                                                                                                                                                          
    √ toSnakeCase joins Unicode words                                                                                                                                                                                       
                                                                                                                                                                                                                            
 PASS  test/transformers/TextTransformer.test.js                                                                                                                                                                            
  TextTransformer
    √ constructor accepterar giltig text (1 ms)                                                                                                                                                                             
    √ constructor kastar fel vid tom eller ogiltig text (27 ms)                                                                                                                                                             
    √ transformWords vänder varje ord med callback                                                                                                                                                                          
    √ transformWords kräver funktion, annars fel (1 ms)                                                                                                                                                                     
    √ reverseWordOrder vänder ordningen på orden                                                                                                                                                                            
    √ replaceWord byter ut alla exakt matchande ord (1 ms)                                                                                                                                                                  
    √ replaceWord kräver icke-tomt oldWord och giltiga argument (1 ms)                                                                                                                                                      
    √ tom text i metoder ger alltid tom sträng                                                                                                                                                                              
                                                                                                                                                                                                                            
 PASS  test/helpfunctions/helpFunctions.test.js                                                                                                                                                                             
  √ TextAnalyzer kastar på tom och whitespace-sträng (6 ms)
  √ TextAnalyzer kastar på tom sträng (1 ms)                                                                                                                                                                                
  √ extractWords hanterar svenska och engelska ord                                                                                                                                                                          
  √ normalizeText gör texten till små bokstäver (1 ms)                                                                                                                                                                      
  √ countOccurrences summerar bokstäver korrekt                                                                                                                                                                             
  √ findPalindromes hittar palindrom (1 ms)                                                                                                                                                                                 
  √ countWords räknar ord korrekt                                                                                                                                                                                           
  √ findPalindromes ignorerar 1-teckensord                                                                                                                                                                                  
  √ findPalindromes ignorerar icke-palindrom                                                                                                                                                                                
                                                                                                                                                                                                                            
 PASS  test/analyzers/TextAnalyzer.test.js                                                                                                                                                                                  
  TextAnalyzer
    √ räknar antal ord (1 ms)                                                                                                                                                                                               
    √ räknar antal meningar (1 ms)                                                                                                                                                                                          
    √ räknar antal tecken inkl. mellanslag                                                                                                                                                                                  
    √ räknar antal tecken utan mellanslag                                                                                                                                                                                   
    √ visar bokstavsfrekvens                                                                                                                                                                                                
    √ hittar alla palindrom                                                                                                                                                                                                 
                                                                                                                                                                                                                            
Test Suites: 7 passed, 7 total                                                                                                                                                                                              
Tests:       88 passed, 88 total                                                                                                                                                                                            
Snapshots:   0 total
Time:        1.442 s
Ran all test suites.
