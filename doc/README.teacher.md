[Tillbaka till README](../README.md)

Hej

Jag har säkert inte gjort denna uppgiften enligt alla de instruktioner vi fått men jag har försökt så gott jag kunnat.

Jag är ju 71-år och pluggar för att jag tycker det är roligt att lära mig nya saker vilket innebär att jag för min del jobbat MYCKET med allt runtomkring och kanske inte så mycket med koden i sig. Jag tycker jag kan kosta på mig att göra det roliga, betyg har underordnad betydelse. 

Jag hade ju lite problem att komma på vad jag skulle koda så jag bad min AI om lite förslag och det resulterade i ett "texttollkit" som manipulerar strängar och texter som ju inte är så upphetsande i sig men det var en bra övning för mig.

Jag har använt min AI att kolla vad jag gjort och att hjälpa mig skapa testfiler så koden har nog blivit ganska ok (den är i och för sig inte så avancerad som den kanske borde vara). Detta får man väl ändå säga är det sätt man skriver kod på idag. Nu är ju koden i sig inte så komplicerad utan det har mest varit en fråga till AI om vilka metoder som finns inbyggt i javascript, dvs vad de heter och hur man använder dem.

Jag har jobbat mycket med clean-code reglerna så där känns det som jag har kommit en bra bit på vägen. 

Vad gäller reflektioner har jag fokuserat på filen Textformatter.js som jag skrev ihop själv för att efter det var gjort kontrollera vilka misstag jag gör. Jag tänka efter lite hur man skulle skrivit innan föreläsningar och bokläsning av kap 1-3 men jag tror den visar ganska ok var jag stod innan kursen då jag ca 1978 startade som Fortan/Assembler programmerare.

[Kod innan 1DV610](nyborjarkod.md) och den är ju inte så mycket att vara stolt över utan innehåller ju i stort sett alla fel man kan göra. Den är ju inte ens körbar. Se kommentarer i filen.

[Filen TextFormatter.js](../src/formatters/TextFormatter.js) uppfyller däremot kraven (tycker jag) och är ju så jag önskat jag kunnat skriva den direkt. Samma gäller för de andra kodfilerna

Strul på vägen:

Jag skrev allt på svenska först och sedan lät jag min AI översätta och fixa till, hoppas jag fick med allt.

1. Jag hade problem med att strängar kan innehålle mellanslag och andra special tecken och det tog ett tag att reda ut det.
2. Jag hade problem med att få regex att fungera som jag ville. Till slut föll allt(?) på plats och jag fick till det men jag gick över till unicode-hantering.
3. Det finns fortfarande många otestade tkn kombinationer och fler metoder att skriva men detta får räcka
4. Det tog ett bra tag innan jag kom igång med att göra privata funktioner (helpers) och på så sätt göra koden lättare att läsa
5. Uppdelning i foldern utils för att  lägga inputValidators och errors kom till ganska sent men lyckades lösa problematiken med att bara ändra på ett ställe

## Projektstruktur

Jag har organiserat koden i moduler enligt separation of concerns:
- `analyzers/` - Textanalys (ordräkning, palindromer, etc.)
- `formatters/` - Formatering (camelCase, snake_case, etc.)
- `searchers/` - Sökning i text
- `transformers/` - Transformationer och reversering
- `TextDocument.js` - Facade som samlar all funktionalitet

Detta ger bra testbarhet och underhållbarhet.

## Testning
Det finns omfattande tester med Jest som täcker:
- Edge cases (tom text, specialtecken)
- Unicode-hantering (svenska tecken, emoji)
- Error handling
- Alla publika metoder

Testerna hjälpte mig hitta buggar tidigt och gav trygghet vid refaktorering.

## Tekniska utmaningar

### Unicode-hantering
Största utmaningen var att hantera internationella tecken korrekt:
- Svenska åäö, franska accenter (café, naïve)
- Turkiska İ-problemet (blir i̇ vid toLowerCase())
- Emoji och andra Unicode-symboler

Lösningen blev att använda `normalize('NFC')` och `Array.from()` istället för `split('')`.

## Clean Code principer jag tillämpat
1. **Små funktioner** - En funktion gör en sak
2. **Beskrivande namn** - `countWords()` istället för `count()`
3. **Undvika kommentarer** - Koden förklarar sig själv
4. **DRY** - Gemensam validering i utility-funktioner
5. **Separation of Concerns** - Varje klass har ett ansvar
6. **Error handling** - Tydliga felmeddelanden

## Refaktoreringsprocess
Efter att ha skapat grundkoden gick jag igenom och:
- Lade till caching för bättre performance
- Förbättrade regex för Unicode-stöd  
- Skapade konstanter för magic numbers
- Förbättrade felhantering
- Lade till JSDoc-dokumentation
- Organiserade om metoder logiskt

## Lärdomar från kursen
- **Innan:** Långa funktioner med allt i en hög
- **Nu:** Små, fokuserade funktioner med tydliga namn
- **Innan:** Inga tester, hopp och be och mycket console.log och debugger
- **Nu:** Tester först, trygg refaktorering
- **Innan:** Kommentarer överallt för att förklara rörig kod
- **Nu:** Självförklarande kod som sällan behöver kommentarer - kan man inte förstå koden är det fel på koden var det väl sagt? Sedan kan man ju fortfarande kanske tycka att det är gott om kommentarer i vissa fall.

## Git-arbetssätt
Jag har försökt att:
- Göra små, atomära commits
- Skriva beskrivande commit-meddelanden

## Användningsexempel

```javascript
import TextDocument from './src/TextDocument.js'
const doc = new TextDocument("Anna swims quickly, Otto laughs loudly.")
// Analysis
console.log(doc.countWords()) // 6
console.log(doc.countSentences()) // 2
console.log(doc.letterFrequency()) // { a:3, n:2, ... }
console.log(doc.findPalindromes()) // ['anna', 'otto']
console.log(doc.getStats()) // { words: 6, sentences: 2, characters: 38, ... }
// Formatting
console.log(doc.toCamelCase()) // "annaSwimsQuicklyOttoLaughsLoudly"
console.log(doc.toSnakeCase()) // "anna_swims_quickly_otto_laughs_loudly"
console.log(doc.toKebabCase()) // "anna-swims-quickly-otto-laughs-loudly"
// Transformation
console.log(doc.reverseText()) // "ydl ughals tto ,ylkciuq smiws annA"
console.log(doc.replaceWord('Anna', 'Eva')) // "Eva swims quickly, Otto laughs loudly."
console.log(doc.removeWords(['quickly', 'loudly'])) // "Anna swims, Otto laughs."
console.log(doc.sortWords()) // "Anna Otto laughs loudly quickly swims"
console.log(doc.shuffleWords()) // Random word order
// Reversal
console.log(doc.reverse()) // ".ylduol shgual otO ,ylkciuq smiws annA"
console.log(doc.reverseWordsIndividually()) // "annA smiws ylkciuq, ottO shgual .ylduol"
console.log(doc.isPalindrome()) // false
// Searching
console.log(doc.findFirst('Otto')) // 23
console.log(doc.findAll('ly', false)) // Case-insensitive search
console.log(doc.count('ly')) // 2
console.log(doc.exists('quickly')) // true
console.log(doc.matchPattern(/[A-Z][a-z]+/g)) // ['Anna', 'Otto']
```
