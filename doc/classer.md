### Huvudklasser i toolkit

1. **TextDocument**
Wrapper/fasad-klass som samlar och exponerar analyser, formattering, sökning och transformationer.
2. **TextAnalyzer**
Ansvarar för ord-, tecken- och mening-analys, frekvens och palindrom.
3. **TextFormatter**
Hanterar versaler/gemener, capitalize, camelCase, snake_case och trim.
4. **TextTransformer**
Utför transformering på ord och ordningsförändring samt utbytesoperationer.
5. **TextSearcher**
Svarar för substring-sökning, regexp-sökning och relaterade positionstjänster.
6. **TextReverser**
Hanterar olika sätt att vända text, rader eller ord.

***

### Stödfiler/felklasser från utils/errors.js

7. **EmptyStringError**
8. **InvalidTypeError**
9. **InvalidBooleanError**
10. **InvalidPatternError**
11. **TooLongError**

***

### Sammanfattning i tabell

| Klass | Syfte/Område |
| :-- | :-- |
| TextDocument | Samlar all textlogik/wrapper |
| TextAnalyzer | Statistisk textanalys |
| TextFormatter | Format- och case-omvandling |
| TextTransformer | Transformer/förändring av ord/text |
| TextSearcher | Substring/regex-sökning |
| TextReverser | Olika textvändarfunktioner |
| EmptyStringError | Felklass för tomma strängar |
| InvalidTypeError | Typvalideringsfel |
| InvalidBooleanError | Fel för boolvalidering |
| InvalidPatternError | Fel för regex-validering |
| TooLongError | Fel för längdvalidering |


***

### Totalt antal klasser

**11 olika klasser** (6 huvudsakliga funktionsklasser + 5 anpassade error/validerings-klasser).

