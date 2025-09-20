
***

```
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

