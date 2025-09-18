
```javascript
// src/formatters/TextFormatter.js

class TF {
  constructor(tekst) {
    this.t = tekst // sparar texten, ingen kontroll på typ eller tomhet
  }

  upp() {
    // Kollar inte om texten finns, kan ge fel
    return this.t.toUpperCase() // retunerar versaler
  }

  low() {
    if (this.t && this.t.length > 0) {
      return this.t.toLowerCase()
    }
    // annars returneras undefined (inkonsistent)
  }

  capWords() {
    // En simpel split på space (inte robust)
    var arr = this.t.split(" ")
    for (var i = 0; i < arr.length; i++) {
      // ingen koll på tomma ord
      arr[i] = arr[i][^0].toUpperCase() + arr[i].slice(1)
    }
    return arr.join(" ")
  }

  camel() {
    // Ingen robusthet mot mellanslag/felaktiga tecken
    var parts = this.t.split(" ")
    var out = parts[^0].toLowerCase()
    for (var j = 1; j < parts.length; j++) {
      out += parts[j][^0].toUpperCase() + parts[j].slice(1)
    }
    return out
  }

  snake() {
    // Tar inte bort specialtecken, ingen lower-case!
    return this.t.replaceAll(' ', '_')
  }

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


***

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

***

