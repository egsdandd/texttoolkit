// src/TextDocument.js

import TextAnalyzer from './analyzers/TextAnalyzer.js'
import TextFormatter from './formatters/TextFormatter.js'
import TextSearcher from './searchers/TextSearcher.js'
import TextTransformer from './transformers/TextTransformer.js'

/**
 *
 */
export default class TextDocument {
  /**
   * Creates a new TextDocument instance with the provided text.
   * @param {string} text - The text content to be analyzed, formatted, searched, or transformed.
   */
  constructor(text) {
    this.text = typeof text === 'string' ? text : ''
    this.analyzer = new TextAnalyzer(this.text)
    this.formatter = new TextFormatter(this.text)
    this.searcher = new TextSearcher(this.text)
    this.transformer = new TextTransformer(this.text)
  }

  /**
   * Sets the text content of the document and updates all delegates.
   * @param {string} newText - The new text content to set for the document.
   */
  setText(newText) {
    this.text = typeof newText === 'string' ? newText : ''
    this.analyzer = new TextAnalyzer(this.text)
    this.formatter = new TextFormatter(this.text)
    this.searcher = new TextSearcher(this.text)
    this.transformer = new TextTransformer(this.text)
  }

  /**
   * Returns the current text content of the document.
   * @returns {string} The current text content.
   */
  getText() {
    return this.text
  }

  // Analys
  
  /**
   * Counts the number of words in the current text.
   * @returns {number} The number of words found in the text.
   */
  countWords() { return this.analyzer.countWords() }
  
  /**
   * Counts the number of sentences in the current text.
   * @returns {number} The number of sentences found in the text.
   */
  countSentences() { return this.analyzer.countSentences() }
  
  /**
   * Counts the number of characters in the current text.
   * @param {boolean} includeSpaces - Whether to include spaces in the character count.
   * @returns {number} The number of characters found in the text.
   */
  countCharacters(includeSpaces = true) { return this.analyzer.countCharacters(includeSpaces) }
  
  /**
     * Returns the frequency of each letter in the current text.
     * @returns {object} An object mapping each letter to its frequency count.
     */
    letterFrequency() { return this.analyzer.letterFrequency() }
  
    /**
   * Finds all palindromic words in the current text.
   * @returns {string[]} An array of palindromic words found in the text.
   */
  findPalindromes() { return this.analyzer.findPalindromes() }

  // Formatter
  
  /**
   * Converts the text to uppercase.
   * @returns {string} The text in uppercase.
   */
  toUpperCase() { return this.formatter.toUpperCase() }
  
  /**
   * Converts the text to lowercase.
   * @returns {string} The text in lowercase.
   */
  toLowerCase() { return this.formatter.toLowerCase() }
  
  /**
   * Capitalizes the first letter of each word in the text.
   * @returns {string} The text with each word capitalized.
   */
  capitalizeWords() { return this.formatter.capitalizeWords() }
  
  /**
   * Converts the text to camelCase format.
   * @returns {string} The text in camelCase format.
   */
  toCamelCase() { return this.formatter.toCamelCase() }
  
  /**
   * Converts the text to snake_case format.
   * @returns {string} The text in snake_case format.
   */
  toSnakeCase() { return this.formatter.toSnakeCase() }
  
  /**
   * Trims leading and trailing whitespace from the text.
   * @returns {string} The trimmed text.
   */
  trimWhitespace() { return this.formatter.trimWhitespace() }
  
  /**
   * Reverses the order of words in the text.
   * @returns {string} The text with word order reversed.
   */
  reverseWordOrder() { return this.transformer.reverseWordOrder() }
  
  /**
   * Replaces all occurrences of a word with a new word in the text.
   * @param {string} oldWord - The word to be replaced.
   * @param {string} newWord - The word to replace with.
   * @returns {string} The text with the word replaced.
   */
  replaceWord(oldWord, newWord) { return this.transformer.replaceWord(oldWord, newWord) }

  // Transformer
  
  /**
   * Reverses each word in the text.
   * @returns {string} The text with each word reversed.
   */
  reverseText() { 
    return this.transformer.transformWords(word => word.split('').reverse().join(''))
  }
  
  /**
   * Applies a custom transformation function to each word in the text.
   * @param {function(string): string} transformFn - The function to apply to each word.
   * @returns {string} The transformed text.
   */
  transformText(transformFn) { 
    return this.transformer.transformWords(transformFn)
  }

  // Searcher-metoder
  
  /**
   * Finds the first occurrence of a substring in the text.
   * @param {string} substring - The substring to search for.
   * @returns {number} The index of the first occurrence, or -1 if not found.
   */
  findFirst(substring) { return this.searcher.findFirst(substring) }
  
  /**
   * Finds all occurrences of a substring in the text.
   * @param {string} substring - The substring to search for.
   * @returns {number[]} An array of indices where the substring occurs.
   */
  findAll(substring) { return this.searcher.findAll(substring) }
  
  /**
   * Checks if a substring exists in the text.
   * @param {string} substring - The substring to check for.
   * @returns {boolean} True if the substring exists, false otherwise.
   */
  exists(substring) { return this.searcher.exists(substring) }
  
  /**
   * Matches a pattern in the text using a string or RegExp.
   * @param {string|RegExp} pattern - The pattern to match.
   * @returns {Array|null} The result of the match, or null if no match is found.
   */
  matchPattern(pattern) { return this.searcher.matchPattern(pattern) }
  
  /**
   * Searches the text using a regular expression.
   * @param {RegExp} regexp - The regular expression to search with.
   * @returns {Array|null} An array of matches, or null if no matches are found.
   */
  searchRegexp(regexp) { return this.searcher.searchRegexp(regexp) }
}
