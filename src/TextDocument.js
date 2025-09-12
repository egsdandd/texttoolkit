// src/TextDocument.js

import TextAnalyzer from './analyzers/TextAnalyzer.js'
import TextFormatter from './formatters/TextFormatter.js'
// Lägg till eventuellt fler imports (t.ex. TextSearcher) efter behov

export default class TextDocument {
  constructor(text) {
    this.text = typeof text === 'string' ? text : ''
    // Initiera delkomponenter med samma text (composition)
    this.analyzer = new TextAnalyzer(this.text)
    this.formatter = new TextFormatter(this.text)
    // this.searcher = new TextSearcher(this.text); // Om du har denna modul
  }

  setText(newText) {
    this.text = typeof newText === 'string' ? newText : ''
    this.analyzer = new TextAnalyzer(this.text)
    this.formatter = new TextFormatter(this.text)
    // this.searcher = new TextSearcher(this.text);
  }

  getText() {
    return this.text
  }

  // Delegation: Korta hjälpfunktioner för att förenkla access
  countWords() {
    return this.analyzer.countWords()
  }

  countSentences() {
    return this.analyzer.countSentences()
  }

  countCharacters(includeSpaces = true) {
    return this.analyzer.countCharacters(includeSpaces)
  }

  letterFrequency() {
    return this.analyzer.letterFrequency()
  }

  findPalindromes() {
    return this.analyzer.findPalindromes()
  }

  toUpperCase() {
    return this.formatter.toUpperCase()
  }

  toLowerCase() {
    return this.formatter.toLowerCase()
  }

  capitalizeWords() {
    return this.formatter.capitalizeWords()
  }

  toCamelCase() {
    return this.formatter.toCamelCase()
  }

  toSnakeCase() {
    return this.formatter.toSnakeCase()
  }

  trimWhitespace() {
    return this.formatter.trimWhitespace()
  }

  // Lägg till fler wrapper-funktioner eller "genvägar" vid behov
}
