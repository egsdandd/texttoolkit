// Example usage of TextDocument.js
import TextDocument from '../src/TextDocument.js'

// Create a document with chosen text
const doc = new TextDocument('Erik saw Otto and Anna paddle a kayak on the river. Madam, did Eve get rid of Bob?')

// Some examples of desired results
console.log('Original text:', doc.getText())
console.log('Word count:', doc.countWords())
console.log('Sentence count:', doc.countSentences())
console.log('Character count (including spaces):', doc.countCharacters())
console.log('Character count (excluding spaces):', doc.countCharacters(false))
console.log('Letter frequency:', doc.letterFrequency())
console.log('Palindromes in text:', doc.findPalindromes())

console.log('Uppercase:', doc.toUpperCase())
console.log('Lowercase:', doc.toLowerCase())
console.log('Capitalize:', doc.capitalizeWords())
console.log('camelCase:', doc.toCamelCase())
console.log('snake_case:', doc.toSnakeCase())
console.log('Trim:', doc.trimWhitespace())
console.log('Reversed text:', doc.reverseText())

console.log('Find first "Eve":', doc.findFirst('Eve'))
console.log('All "the":', doc.findAll('the'))
console.log('Exists "Bob"?', doc.exists('Bob'))
console.log('Matches regex (all capitalized words):', doc.matchPattern(/\b[A-Z][a-z]+\b/g))
console.log('First index for "?":', doc.searchRegexp(/\?/))
console.log('Transformed text (example):', doc.transformText((word) => word.split('').reverse().join('')))
console.log('Reversed word order:', doc.reverseWordOrder())

console.log(doc.replaceWord('Anna', 'Stina'))
