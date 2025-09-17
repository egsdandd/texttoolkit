# texttoolkit

Assignment L2 in 1DV610

Dokumentation (README.md - denna fil ) ska innehålla:

Projektbeskrivning
Detta projekt är en modulär JavaScript toolkit för avancerad textanalys, formatering, sökning och transformation, med stöd för svenska och engelska. Huvudingångspunkten är `src/TextDocument.js`, som sammanställer olika analyzers, formatters, searchers och transformers till ett enhetligt API. Alla publika API:er exporteras via `src/index.js`.

Arkitekturöversikt
Nyckelkomponenter och deras roller (TextDocument, TextAnalyzer, TextFormatter, TextSearcher, TextTransformer)
Validering och felhantering (utils/inputValidation.js, utils/errors.js)
Exempel på användning (examples/exampel1.js, exampel2.js)

Utvecklarflöden (testning, felsökning, kodstil)
Linting (npm run lint, eslint.config.js)
Testning (npm test, Jest, test/ katalog)
Felsökning (exempel-skript i examples/ katalogen)
Modulimporter (ES-moduler, import/export)

Projekt-specifika konventioner
Språkstöd (svenska och engelska, regex för åäö)
Validering (alla publika metoder validerar input och kastar beskrivande fel)
Ingen sidoeffekt (alla klasser är rena och stateless förutom textvärdet i TextDocument och dess delegerade)
Konsistent API (alla huvudoperationer exponeras som metoder på TextDocument)
JSDoc (alla publika metoder måste dokumenteras med JSDoc, kontrolleras av lint)

Integrations- och utbyggnadsanvisningar
Startpunkter för att lägga till nya analyzers/formatters/searchers/transformers
Felhantering (använd alltid de anpassade feltyperna från utils/errors.js)

Referenser till tester, exempel och andra viktiga filer
Se test/ för förväntade beteenden och edge cases.
Se examples/ för verkliga användnings- och integrationsmönster.
Se eslint.config.js för kodstil och dokumentationsregler.

Kodexempel

```javascript
import { TextDocument } from 'texttoolkit';
const doc = new TextDocument("Hello world! This is a test document.");
console.log(doc.analyze().wordCount); // 7
console.log(doc.format('uppercase')); // "HELLO WORLD! THIS IS A TEST DOCUMENT."
console.log(doc.search('test')); // [24]
console.log(doc.transform('reverse')); // ".tnemucod tset a si sihT !dlrow olleH"
```

Installationsbeskrivning

```bash
git clone <repository-url>
cd texttoolkit
npm install
```

Kommunikation om beroenden, språk och versioner
Node.js version 14 eller högre
Jest för testning
ESLint för kodstil
Eventuella tredjepartsbibliotek som används

Testrapporter
Sammanfattning av testtäckning och viktiga testfall
Alla huvudmoduler och edge cases täcks av tester i test/ katalogen. Kör `npm test` för att exekvera testerna med Jest.

Bidragsriktlinjer
För att bidra till projektet, vänligen följ dessa riktlinjer:
Forka repo och skapa en feature branch för dina ändringar.
Skriv tydliga commit-meddelanden.
Skapa pull requests med beskrivning av ändringar och syfte.
Kör alla tester och se till att de passerar innan du skapar en PR.

Buggrapporter/issues
Om du hittar en bugg, vänligen rapportera den genom att skapa en issue i GitHub-repo. Inkludera så mycket information som möjligt, inklusive steg för att reproducera felet och förväntat beteende.

Information om licens för öppen källkod
MIT License

Versionsnumrering och releaser
Följ semantisk versionering (MAJOR.MINOR.PATCH).
Nyheter och ändringslogg
Håll en CHANGELOG.md-fil för att dokumentera viktiga ändringar i varje version.

Kommunikation om hur användare kan bidra till projektet.
För frågor om oklara konventioner eller för att föreslå ändringar, uppdatera denna fil och meddela underhållaren.


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

**Nyckelkomponenter & roller:**
- `TextDocument`: Wrapper/fasad för samtliga operationer.
- `TextAnalyzer`: Ord-, tecken- & meningsräkning, frekvensanalyser, palindromer.
- `TextFormatter`: Case/format-omvandling, whitespace-trimning, snake- & camel-case.
- `TextSearcher`: Sök efter substrings och regex; finns/position m.m.
- `TextTransformer`: Reversering, transformering och flexible ordmanipulation.

**Validering & felhantering:**
- Alla metoder använder helpers från `utils/inputValidation.js` samt anpassade feltyper i `utils/errors.js`.

---

## 🚀 Exempel på användning

Se även `examples/exempel1.js` och `examples/exempel2.js`.

```

import { TextDocument } from 'texttoolkit'

const doc = new TextDocument("Hello world! This is a test document.")
console.log(doc.countWords()) // 7
console.log(doc.toUpperCase()) // "HELLO WORLD! THIS IS A TEST DOCUMENT."
console.log(doc.findAll('test')) //
console.log(doc.reverseText()) // ".tnemucod tset a si sihT !dlrow olleH"

```

---

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

- **Rubriker, emojis, kodblock** och punktlistor används för god överblick.
- Objektiv, fjärr-dokumentationston men lättläst.
- Lätt att kopiera in direkt till GitHub och får snygg markdown-rendering.
Justera och lägg till exempelmoduler eller projekt-specifika texter om du vill!

