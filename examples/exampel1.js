// Exempel på användning av TextDocument.js
import TextDocument from '../src/TextDocument.js'

// Skapa ett dokument med vald text
const doc = new TextDocument('Erik såg Otto och Anna paddla en kajak på ån. Madam, blev Eva av med Bob?')

// Några exempel på önskat resultat
console.log('Originaltext:', doc.getText())
console.log('Antal ord:', doc.countWords())
console.log('Antal meningar:', doc.countSentences())
console.log('Antal tecken (inkl. mellanslag):', doc.countCharacters())
console.log('Antal tecken (utan mellanslag):', doc.countCharacters(false))
console.log('Bokstavsfrekvens:', doc.letterFrequency())
console.log('Palindrom i texten:', doc.findPalindromes())

console.log('Versaler:', doc.toUpperCase())
console.log('Gemener:', doc.toLowerCase())
console.log('Capitalize:', doc.capitalizeWords())
console.log('camelCase:', doc.toCamelCase())
console.log('snake_case:', doc.toSnakeCase())
console.log('Trim:', doc.trimWhitespace())
console.log('Reverserad text:', doc.reverseText())

console.log('Finn första "Eva":', doc.findFirst('Eva'))
console.log('Alla "en":', doc.findAll('en'))
console.log('Finns "Bob"?', doc.exists('Bob'))
console.log('Träffar på regex (alla versala ord):', doc.matchPattern(/\b[A-ZÅÄÖ][a-zåäö]+\b/g))
console.log('Första index för "?":', doc.searchRegexp(/\?/))
console.log('Transformerad text (exempel):', doc.transformText((word) => word.split('').reverse().join(''))) 
console.log('Ordningen på orden omkastad:', doc.reverseWordOrder())

console.log(doc.replaceWord('Anna', 'Stina')) 

