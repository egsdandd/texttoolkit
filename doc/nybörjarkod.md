### Kodgenomgång - Clean Code ***

### Bokens kapitel 1-3 går igenom vad som menas med tydliga och lättunderhållna funktioner i följande avseende:

- Kod ska vara lättläst och lättförståelig för andra utvecklare.
- Varje kodrad bör ha ett tydligt syfte och undvika överflödig komplexitet.
- Välj namn på variabler, funktioner och klasser som explicit förklarar deras syfte.
- Undvik duplicerad kod och försök att återanvända logik där det är möjligt.
- Håll funktioner och metoder så korta som möjligt – helst ska de bara göra en sak.
- Undvik att en funktion har fler än två–tre parametrar.
- Undvik biverkningar – funktioner ska helst inte ändra på något utanför sin egen kontext.
- Kommentarer behövs ibland, men bra kod ska helst vara självförklarande så att kommentarer blir överflödiga.
- Returnera tidigt i funktioner för att undvika onödigt djupa inbäddningar och ökad komplexitet.
- Undvik att använda flaggargument (t.ex. booleans) – bryt hellre ut separata funktioner.
- Följ etablerade kodstandarder för struktur, indentering och format – så blir koden mer enhetlig och lättare att underhålla.
- Skriv tester som säkerställer att koden är robust, och refaktorera kod löpande för ökad kvalitet.

För att undersöka var jag befinner mig i mitt eget kodskrivande skrev jag ihop en class så gott jag kunde (och med lite AI-hjälp) och fick ett resultat ungefär som detta:


```javascript
// src/formatters/TextFormatter.js

class TF {
  constructor(tekst) {
    this.t = tekst
  }

  // Versaler
  upp() {
    return this.t.toUpperCase() 
  }

  // Gemener
  low() {
    if (this.t && this.t.length > 0) {
      return this.t.toLowerCase()
    }
  }
  // Versal på varje ord
  capWords() {
    var arr = this.t.split(" ")
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i][^0].toUpperCase() + arr[i].slice(1)
    }
    return arr.join(" ")
  }
  // camel Case 
  camel() {
    var parts = this.t.split(" ")
    var out = parts[^0].toLowerCase()
    for (var j = 1; j < parts.length; j++) {
      out += parts[j][^0].toUpperCase() + parts[j].slice(1)
    }
    return out
  }
  // inga mellanslag
  snake() {
    return this.t.replaceAll(' ', '_')
  }
  // ta bort onödiga mellanslag
  trim() {
    if (this.t) {
      return this.t.trim()
    }
  }
}

// Exempel på användning
var f = new TF("    hej världen och Otto, paddlar kajak!   ")
console.log(f.upp())
console.log(f.low())
console.log(f.capWords())
console.log(f.camel())
console.log(f.snake())
console.log(f.trim())
```

### Undersökning av koden

Tittar jag då på min kod med Clean Code regler vid sidan kan man snabbt(?) konstatera:

- Kod ska vara lättläst och lättförståelig för andra utvecklare.

Eftersom koden är simpel i sin struktur tror jag inte någon har problem att förstå vad varje metod gör. Namngivningen av metoder lämnar dock mycket att önska - ej uppfyllt.

- Varje kodrad bör ha ett tydligt syfte och undvika överflödig komplexitet.

De kodrader som jag skrivit är enkla att förstå sig på så detta kan man godtaga - uppfyllt.

- Välj namn på variabler, funktioner och klasser som explicit förklarar deras syfte.

Variabelnamn förenklar inte tillvaron för någon som skall läsa koden alls - ej uppfyllt.

- Undvik duplicerad kod och försök att återanvända logik där det är möjligt.

Det är så korta kodrader så här hamnar jag inte i svårigheter - uppfyllt.

- Håll funktioner och metoder så korta som möjligt – helst ska de bara göra en sak.

Inga problem här - uppfyllt.

- Undvik att en funktion har fler än två–tre parametrar.

Enkla exempel - uppfyllt.

- Undvik biverkningar – funktioner ska helst inte ändra på något utanför sin egen kontext.

Uppfyllt.

- Kommentarer behövs ibland, men bra kod ska helst vara självförklarande så att kommentarer blir överflödiga.

Dåliga kommentarer kopplat till dålig namngivning - ej uppfyllt

- Returnera tidigt i funktioner för att undvika onödigt djupa inbäddningar och ökad komplexitet.

NA

- Undvik att använda flaggargument (t.ex. booleans) – bryt hellre ut separata funktioner.

NA

- Följ etablerade kodstandarder för struktur, indentering och format – så blir koden mer enhetlig och lättare att underhålla.

Inte uppfyllt



- Skriv tester som säkerställer att koden är robust, och refaktorera kod löpande för ökad kvalitet.
Koden kraschar, inga indatakontroller - inte uppfyllt.



### Nybörjarmissar och kodlukt här är:

- Ologiska och korta/förvirrande namn (upp, low, capWords, camel, snake)
- Inga indata-valideringar alls
- Fel vid ogiltig eller tom text (kan ge runtime error)
- Olika logik för hur undefined/null hanteras (inkonsekvent)
- Dåliga loopar, for NÄR det finns bättre itereringsmetoder (t.ex. map)
- Specialtecken hanteras inte, inte svenskans åäö
- Ingen dokumentation, inget API eller tydligt avsikt
- Metodnamn och "API" avviker från branchstandard och förvirrar användare
- Variabelnamn som “t”, “arr”, “parts”, “out” utan kontext
- Ingen kodstil/god formatering (ex: blankrader, indrag, ingen JSDoc)
- Kod fungerar bara för mycket enkla texter


### Missar i koden

class TF: this.t = tekst - sparar texten, ingen kontroll på typ eller tomhet

upp() - Kollar inte om texten finns, kan ge fel

low() - om text saknas returneras undefined

capWords() - Bara split på space, ingen koll på tomma ord
 
camel() Ingen robusthet mot mellanslag/felaktiga tecken

snake() - Tar inte bort specialtecken, ingen lower-case! 


*