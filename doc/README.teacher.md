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
5. Uppdelning i foldern utils för att  lägga inputValidators och errors kom till ganska sent men lyckades lösa problematiken med att bara ändra på ett ställe och göra koden lättare att läsa.

ESLint:
Jag har använt mig av npm run lint för att kontroller riktigheten. Tyvärr kräver den att en del kommentarer som känns överflödiga skall vara kvar men jag valde att inte ändra default reglerna för enkelhets skull

## Försök att svara på frågorna/uppgifterna:

För att svara på frågorna om kapitel 2 och 3 tog jag min vana trogen hjälp av min AI för att analysera vad jag åstakommit i detta avseende och kom upp med följande reultat för kapitel 2

Här är en tabell med fem publika identifierare från modulens publika interface, med analys enligt olika regler från kapitel 2 i Clean Code.

| Namn                        | Förklaring & Regler från Clean Code                                                                                                   | Reflektion och regler från Clean Code                                                                                                 |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| TextDocument                | Klassnamn för huvudklassen i modulen. Use Intention-Revealing Names: Namnet visar tydligt vad klassen representerar.                  | Namnet är tydligt och följer konventionen för klasser. Jag undviker förkortningar och onödig information.                            |
| countWords()                | Metod som räknar antalet ord i texten. Use Verbs for Methods: Metodnamn är ett verb och beskriver exakt vad den gör.                   | Jag tycker det är bra att använda verb för metoder. Namnet är självförklarande och lätt att förstå för andra utvecklare.             |
| isEmpty()                   | Metod som returnerar om texten är tom. Use Boolean Naming: is prefixet signalerar att returvärdet är boolskt.                         | Jag följer konventionen med is/has/can för boolean-metoder. Det gör koden mer läsbar och förutsägbar.                                |
| replaceWord(oldWord, newWord, caseSensitive) | Metod som ersätter ett ord. Choose Descriptive Names: Namnet och parametrarna är beskrivande. Avoid Encodings: Inga förkortningar. | Namnet är långt men tydligt. Jag undviker förkortningar och försöker vara så beskrivande som möjligt utan att bli överdrivet lång.   |
| letterFrequency()           | Metod som returnerar bokstavsfrekvens. Use Nouns for Accessors: Namnet är ett substantiv och beskriver vad som returneras.             | Jag tycker det är bra att accessorer/metoder som returnerar data är substantiv. Namnet är tydligt och undviker onödig information.   |

## Reflektion kring kapitel 2

Jag tycker att många av reglerna i kapitel 2 är självklara när man väl ser dem, men det är lätt att slarva med namngivning när man har bråttom. Jag märker att jag ibland använder för generella namn eller förkortningar, särskilt i interna funktioner, men försöker vara extra tydlig i det publika interfacet. En utmaning är att hitta namn som är både korta och beskrivande, särskilt när metoder har många parametrar. Jag håller med om att intentionen ska vara tydlig och att man ska undvika förkortningar och “söta” namn. Jag ser också att det ibland kan vara svårt att hitta domänspecifika namn som är begripliga för alla, så jag försöker balansera mellan domän- och lösningsnamn.


och för kapitel 3

Här är en tabell över de fem längsta metoderna/funktionerna i projektet, med analys enligt kapitel 3 i Clean Code.

| Metodnamn                        | Länk/kod (fil)                | Antal rader (ej ws) | Regler (följs/bryts) & Förslag                                                                                                   |
|-----------------------------------|-------------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| removeWords(wordsToRemove, caseSensitive) | TextTransformer.js           | 13                  | Do One Thing: Gör flera saker (loopar, anropar annan metod, städar whitespace). Kan brytas upp i mindre hjälpfunktioner.          |
| replaceWord(oldWord, newWord, caseSensitive) | TextTransformer.js           | 8                   | Do One Thing: Hanterar både validering och regex-byten. Kan brytas ut till hjälpfunktion för regex-skapande.                      |
| sortWords(descending)             | TextTransformer.js            | 8                   | Switch Statements: Inga switchar, men sorteringslogik och join i samma metod. Kan brytas ut till sorteringshjälp.                 |
| transformWordsByPosition(transformFn) | TextTransformer.js           | 7                   | Too Many Arguments: Följer regeln (bara två argument). Gör en sak, men map och join kan brytas ut för testbarhet.                 |
| filterWords(predicate)            | TextTransformer.js            | 5                   | Gör en sak, men validering och filtrering i samma metod. Kan brytas ut för testbarhet.                                            |

---

## Förslag på förbättringar

- Dela upp metoder som gör flera saker ytterligare även om jag försökt (t.ex. validering, transformation, städning) i mindre hjälpfunktioner. Det kan j alltid drivas längre.
- Extrahera regex-skapande och whitespace-städning till egna funktioner för att öka återanvändbarhet och testbarhet.
- Jag har försökt att hålla metoder så korta som möjligt och med ett tydligt syfte.

---

## Reflektion kring kapitel 3

Jag märker att även om mina metoder är relativt korta så gör vissa av dem mer än en sak, t.ex. både validerar, transformerar och städar data. Det är lätt att blanda in flera ansvarsområden i en och samma metod när man vill vara effektiv, men det gör koden svårare att testa och återanvända. Jag håller med om att metoder ska vara små och göra en sak, men ibland känns det överdrivet att bryta ut varje liten detalj – det kan göra koden svårare att överblicka, framför allt eftersom mina metoder är väldigt korta från start. Jag försöker dock tänka på att varje metod ska vara lätt att förstå, namnge och återanvända, och att bryta ut kod när det blir för komplext. Komplexiteten är nog inte ett problem i min modul utan snarare ett försök att förenkla inbyggda metoder. Det lurigaste är nog regex som testat runt i oändlighet...


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
