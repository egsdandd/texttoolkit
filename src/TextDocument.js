// src/TextDocument.js

import TextAnalyzer from './analyzers/TextAnalyzer.js';
import TextFormatter from './formatters/TextFormatter.js';
import TextSearcher from './searchers/TextSearcher.js';
import TextTransformer from './transformers/TextTransformer.js';

export default class TextDocument {
  constructor(text) {
    this.text = typeof text === 'string' ? text : '';
    this.analyzer = new TextAnalyzer(this.text);
    this.formatter = new TextFormatter(this.text);
    this.searcher = new TextSearcher(this.text);
    this.transformer = new TextTransformer(this.text);
  }

  setText(newText) {
    this.text = typeof newText === 'string' ? newText : '';
    this.analyzer = new TextAnalyzer(this.text);
    this.formatter = new TextFormatter(this.text);
    this.searcher = new TextSearcher(this.text);
    this.transformer = new TextTransformer(this.text);
  }

  getText() {
    return this.text;
  }

  // Analys
  countWords() { return this.analyzer.countWords(); }
  countSentences() { return this.analyzer.countSentences(); }
  countCharacters(includeSpaces = true) { return this.analyzer.countCharacters(includeSpaces); }
  letterFrequency() { return this.analyzer.letterFrequency(); }
  findPalindromes() { return this.analyzer.findPalindromes(); }

  // Formatter
  toUpperCase() { return this.formatter.toUpperCase(); }
  toLowerCase() { return this.formatter.toLowerCase(); }
  capitalizeWords() { return this.formatter.capitalizeWords(); }
  toCamelCase() { return this.formatter.toCamelCase(); }
  toSnakeCase() { return this.formatter.toSnakeCase(); }
  trimWhitespace() { return this.formatter.trimWhitespace(); }
  reverseWordOrder() { return this.transformer.reverseWordOrder(); }
  replaceWord(oldWord, newWord) { return this.transformer.replaceWord(oldWord, newWord); }

  // Transformer
  reverseText() { 
    return this.transformer.transformWords(word => word.split('').reverse().join(''));
  }
  transformText(transformFn) { 
    return this.transformer.transformWords(transformFn);
  }

  // Searcher-metoder (lägg till alla wrapper-funktioner för searcher här om du vill)
  findFirst(substring) { return this.searcher.findFirst(substring); }
  findAll(substring) { return this.searcher.findAll(substring); }
  exists(substring) { return this.searcher.exists(substring); }
  matchPattern(pattern) { return this.searcher.matchPattern(pattern); }
  searchRegexp(regexp) { return this.searcher.searchRegexp(regexp); }
}
