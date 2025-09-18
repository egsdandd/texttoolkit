
## TextFormatter – användningsexempel

Formattera och omvandla text på svenska och engelska med tydliga metoder för case, snake/camel-case och whitespace.

### Installation och import

npm install texttoolkit


import TextFormatter from './src/formatters/TextFormatter.js'

### Snabbstart

const formatter = new TextFormatter(' hej världen och Otto, paddlar kajak! ')

// Versaler/gemener

console.log(formatter.toUpperCase()) // " HEJ VÄRLDEN OCH OTTO, PADDLAR KAJAK! "

console.log(formatter.toLowerCase()) // " hej världen och otto, paddlar kajak! "

// Capitalize varje ord

console.log(formatter.capitalizeWords()) // " Hej Världen Och Otto, Paddlar Kajak! "

// camelCase (för identifierare m.m.)

console.log(formatter.toCamelCase()) // "hejVärldenOchOttoPaddlarKajak"

// snake_case

console.log(formatter.toSnakeCase()) // "hej_världen_och_otto_paddlar_kajak"

// Rensa omgivande whitespace

console.log(formatter.trimWhitespace()) // "hej världen och Otto, paddlar kajak!"


### Noteringar

- Alla publika metoder validerar indata och kastar beskrivande fel vid tom eller ogiltig text.
- Stödjer svenska tecken (åäö ÅÄÖ) i alla format-metoder.
- Används bäst tillsammans med andra klasser i toolkit:en för avancerad textpipeline.
