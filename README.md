# texttoolkit

Assignment L2 in 1DV610

Dokumentation (README.md - denna fil )



# texttoolkit

_Assignment L2 in 1DV610_

**Version:** 1.0.0  
**Author:** Dan-Håkan Davall
**E-post:** dd222mk@student.lnu.se

---

## 🗂️ Projektbeskrivning

Detta projekt är en **modulär JavaScript-toolkit** för avancerad textanalys, formatering, sökning och transformation – med stöd för svenska (inklusive å/ä/ö) och engelska.  
**Huvudingångspunkt:** `src/TextDocument.js` – samlar analyzers, formatters, searchers och transformers till ett enhetligt API.

Alla publika API:er exporteras via `src/index.js`.

---

## 🏛️ Arkitekturöversikt

Nyckelkomponenter och deras roller:

- **TextDocument**: Sammanställer analyzers, formatters, searchers och transformers till ett enhetligt API.
- **TextAnalyzer**: Ansvarar för ord-, tecken- och meninganalys, frekvens och palindrom.
- **TextFormatter**: Hanterar versaler/gemener, capitalize, camelCase, snake_case och trim.
- **TextSearcher**: Svarar för substring-sökning, regexp-sökning och relaterade positionstjänster.
- **TextTransformer**: Utför transformering på ord och ordningsförändring samt utbytesoperationer.

Validering och felhantering:

- **utils/inputValidation.js**: Ansvarar för validering av indata till publika metoder.
- **utils/errors.js**: Innehåller anpassade felklasser för tydligare felmeddelanden.

***

### Klassöversikt och felklasser

**Huvudklasser:**

- **TextDocument**: Wrapper som samlar och exponerar analys, formattering, sökning och transformation.
- **TextAnalyzer**: Ordräkning, tecken- och meninganalys, frekvensanalys, palindromidentifiering.
- **TextFormatter**: Versaler/gemener, capitalize, camelCase, snake_case, trim.
- **TextTransformer**: Transformerar ord och ordningsföljd, utbytesoperationer.
- **TextSearcher**: Substring- och regexp-sökning, positionstjänster.
- **TextReverser**: Vänder text, rader och ord på olika sätt.

**Felklasser (`utils/errors.js`):**

- **EmptyStringError**: Fel för tomma strängar.
- **InvalidTypeError**: Typvalideringsfel.
- **InvalidBooleanError**: Fel för boolvalidering.
- **InvalidPatternError**: Fel för regex-validering.
- **TooLongError**: Fel för överskriden längd.

**Sammanfattning:**


| Klass | Syfte/Område |
| :-- | :-- |
| TextDocument | Samlar all textlogik/wrapper |
| TextAnalyzer | Statistisk textanalys |
| TextFormatter | Format- och case-omvandling |
| TextTransformer | Transformer/förändring av ord |
| TextSearcher | Substring/regex-sökning |
| TextReverser | Olika textvändarfunktioner |
| EmptyStringError | Felklass för tomma strängar |
| InvalidTypeError | Typvalideringsfel |
| InvalidBooleanError | Fel för boolvalidering |
| InvalidPatternError | Fel för regex-validering |
| TooLongError | Fel för längdvalidering |

**Totalt antal klasser:**

11 (6 huvudklasser + 5 felklasser).

***

## 🚀 Exempel på användning

Se exempel i `examples/exampel1.js` och `examples/exampel2.js` för typiska användningsfall och integration.

```javascript
import { TextDocument } from 'texttoolkit';
const doc = new TextDocument("Hello world! This is a test document.");
console.log(doc.analyze().wordCount); // 7
console.log(doc.format('uppercase')); // "HELLO WORLD! THIS IS A TEST DOCUMENT."
console.log(doc.search('test')); // [24]
console.log(doc.transform('reverse')); // ".tnemucod tset a si sihT !dlrow olleH"
```


***


## 🦾 Utvecklarflöden

- **Linting:**  
  `npm run lint` (regler i `eslint.config.js`)
- **Testning:**  
  `npm test` (Jest, med tester i `test/`-katalogen)
- **Felsökning:**  
  Prova exempel i `examples/`-katalogen.  
- **Modulimporter:**  
  ES-moduler – använd `import/export`.

---

## ⚙️ Projekt-specifika konventioner

- **Språkstöd:** svenska/engelska, regex täcker åäö
- **Validering:** alla publika metoder validerar input med detaljerade fel
- **Statelessness:** alla klasser är rena förutom text-tillståndet i `TextDocument` och dess delegater
- **API-konsistens:** alla operationer exponeras på `TextDocument`
- **JSDoc:** _Alla publika metoder måste dokumenteras med JSDoc_

---

## 🛠️ Integrations- & utbyggnadsanvisningar

- Starta nya analyzers/formatters/searchers/transformers i respektive mapp och exponera via `index.js`
- Alltid använda felklasser från `utils/errors.js` för raise/throw

---

## 📄 Tester & exempel

- Titta i `test/` för förväntade beteenden och edge cases
- Se `examples/` för användning och integration
- Kodstil och JSDoc-regler i `eslint.config.js`

---

## 💻 Installationsbeskrivning

```

git clone <repository-url>
cd texttoolkit
npm install

```

---

## 📦 Beroenden, språk och versioner

- Node.js **v14 eller högre**
- Jest för testning
- ESLint för kodstil
- _Eventuella tredjepartsbibliotek listas i package.json_

---

## 🧪 Testrapporter

- Huvudmoduler och edge cases täcks av tester i `test/`
- Kör `npm test` för resultat med Jest

---

## 🤝 Bidragsriktlinjer

1. Forka och skapa en feature branch
2. Skriv tydliga commit-meddelanden
3. Skapa pull requests med beskrivning av ändringar och syfte
4. Kör alla tester och se till att de passerar innan PR

---

## 🐞 Buggrapporter / issues

_Upptäcker du en bugg?_  
Skapa en issue på GitHub med så mycket information som möjligt: steg för att reproducera, förväntat och faktiskt beteende.

---

## ⚖️ Licens

MIT License

---

## 📈 Versionshantering och changelog

- Semantisk versionering (MAJOR.MINOR.PATCH)
- Alla ändringar dokumenteras i `CHANGELOG.md`

---

## 💬 Kommunikation & frågor

Vid frågor eller förslag – uppdatera denna README och meddela repo-ägarna.

---
```

