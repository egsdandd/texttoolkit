// src/TextDocument.js

import TextAnalyzer from './analyzers/TextAnalyzer.js'
import TextFormatter from './formatters/TextFormatter.js'
import TextSearcher from './searchers/TextSearcher.js'
import TextTransformer from './transformers/TextTransformer.js'
import TextReverser from './transformers/TextReverser.js'

/**
 * Facade for text analysis, formatting, searching, and transformation.
 * @class TextDocument
 */
export default class TextDocument {
  /**
   * @param {string} text Text to process.
   */
  constructor(text) {
    this.setText(text) // Use setter for consistent initialization
  }

  /**
   * @param {string} newText New text content.
   */
  setText(newText) {
    // Validate and normalize input
    this.text = typeof newText === 'string' ? newText.trim() : ''

    // Only create instances if text is not empty to avoid validation errors
    if (this.text) {
      this.analyzer = new TextAnalyzer(this.text)
      this.formatter = new TextFormatter(this.text)
      this.searcher = new TextSearcher(this.text)
      this.transformer = new TextTransformer(this.text)
      this.reverser = new TextReverser(this.text)
    } else {
      // Set to null for empty text to avoid unnecessary object creation
      this.analyzer = null
      this.formatter = null
      this.searcher = null
      this.transformer = null
      this.reverser = null
    }
  }

  /**
   * @returns {string}
   */
  getText() {
    return this.text
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return !this.text || this.text.length === 0
  }

  // Text Analysis Methods

  /**
   * @returns {number}
   */
  countWords() {
    return this.isEmpty() ? 0 : this.analyzer.countWords()
  }

  /**
   * @returns {number}
   */
  countSentences() {
    return this.isEmpty() ? 0 : this.analyzer.countSentences()
  }

  /**
   * @param {boolean} includeSpaces Include spaces.
   * @returns {number}
   */
  countCharacters(includeSpaces = true) {
    return this.isEmpty() ? 0 : this.analyzer.countCharacters(includeSpaces)
  }

  /**
   * @returns {{[key: string]: number}}
   */
  letterFrequency() {
    return this.isEmpty() ? {} : this.analyzer.letterFrequency()
  }

  /**
   * @returns {string[]}
   */
  findPalindromes() {
    return this.isEmpty() ? [] : this.analyzer.findPalindromes()
  }

  // Text Formatting Methods

  /**
   * @returns {string}
   */
  toUpperCase() {
    return this.isEmpty() ? '' : this.formatter.toUpperCase()
  }

  /**
   * @returns {string}
   */
  toLowerCase() {
    return this.isEmpty() ? '' : this.formatter.toLowerCase()
  }

  /**
   * @returns {string}
   */
  capitalizeWords() {
    return this.isEmpty() ? '' : this.formatter.capitalizeWords()
  }

  /**
   * @returns {string}
   */
  toCamelCase() {
    return this.isEmpty() ? '' : this.formatter.toCamelCase()
  }

  /**
   * @returns {string}
   */
  toSnakeCase() {
    return this.isEmpty() ? '' : this.formatter.toSnakeCase()
  }

  /**
   * @returns {string}
   */
  toPascalCase() {
    return this.isEmpty() ? '' : this.formatter.toPascalCase()
  }

  /**
   * @returns {string}
   */
  toKebabCase() {
    return this.isEmpty() ? '' : this.formatter.toKebabCase()
  }

  /**
   * @returns {string}
   */
  trimWhitespace() {
    return this.isEmpty() ? '' : this.formatter.trimWhitespace()
  }

  // Text Search Methods

  /**
   * @param {string} substring Substring to find.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {number}
   */
  findFirst(substring, caseSensitive = true) {
    return this.isEmpty() ? -1 : this.searcher.findFirst(substring, caseSensitive)
  }

  /**
   * @param {string} substring Substring to find.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {number[]}
   */
  findAll(substring, caseSensitive = true) {
    return this.isEmpty() ? [] : this.searcher.findAll(substring, caseSensitive)
  }

  /**
   * @param {string} substring Substring to check.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {boolean}
   */
  exists(substring, caseSensitive = true) {
    return this.isEmpty() ? false : this.searcher.exists(substring, caseSensitive)
  }

  /**
   * @param {string} substring Substring to count.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {number}
   */
  count(substring, caseSensitive = true) {
    return this.isEmpty() ? 0 : this.searcher.count(substring, caseSensitive)
  }

  /**
   * @param {RegExp} pattern Pattern to match.
   * @returns {string[]}
   */
  matchPattern(pattern) {
    return this.isEmpty() ? [] : this.searcher.matchPattern(pattern)
  }

  /**
   * @param {RegExp} regexp Regex to search.
   * @returns {number}
   */
  searchRegexp(regexp) {
    return this.isEmpty() ? -1 : this.searcher.searchRegexp(regexp)
  }

  /**
   * @param {RegExp} pattern Pattern to test.
   * @returns {boolean}
   */
  testPattern(pattern) {
    return this.isEmpty() ? false : this.searcher.testPattern(pattern)
  }

  // Text Transformation Methods

  /**
   * @param {Function} transformFn Transformation function.
   * @returns {string}
   */
  transformWords(transformFn) {
    return this.isEmpty() ? '' : this.transformer.transformWords(transformFn)
  }

  /**
   * @returns {string}
   */
  reverseWordOrder() {
    return this.isEmpty() ? '' : this.transformer.reverseWordOrder()
  }

  /**
   * @param {string} oldWord Word to replace.
   * @param {string} newWord Replacement word.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {string}
   */
  replaceWord(oldWord, newWord, caseSensitive = true) {
    return this.isEmpty() ? '' : this.transformer.replaceWord(oldWord, newWord, caseSensitive)
  }

  /**
   * @param {string[]} wordsToRemove Words to remove.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {string}
   */
  removeWords(wordsToRemove, caseSensitive = true) {
    return this.isEmpty() ? '' : this.transformer.removeWords(wordsToRemove, caseSensitive)
  }

  /**
   * @param {boolean} descending Sort descending.
   * @returns {string}
   */
  sortWords(descending = false) {
    return this.isEmpty() ? '' : this.transformer.sortWords(descending)
  }

  /**
   * @returns {string}
   */
  shuffleWords() {
    return this.isEmpty() ? '' : this.transformer.shuffleWords()
  }

  /**
   * @returns {string}
   */
  reverseText() {
    return this.reverseWordsIndividually()
  }

  /**
   * @param {Function} transformFn Function to apply.
   * @returns {string}
   */
  transformText(transformFn) {
    return this.transformWords(transformFn)
  }

  // Text Reversal Methods

  /**
   * @returns {string}
   */
  reverse() {
    return this.isEmpty() ? '' : this.reverser.reverse()
  }

  /**
   * @returns {string}
   */
  reverseWordsIndividually() {
    return this.isEmpty() ? '' : this.reverser.reverseWordsIndividually()
  }

  /**
   * @returns {string}
   */
  reverseLines() {
    return this.isEmpty() ? '' : this.reverser.reverseLines()
  }

  /**
   * @param {boolean} ignoreCase Ignore case.
   * @param {boolean} ignoreSpaces Ignore spaces/punctuation.
   * @returns {boolean}
   */
  isPalindrome(ignoreCase = true, ignoreSpaces = false) {
    return this.isEmpty() ? false : this.reverser.isPalindrome(ignoreCase, ignoreSpaces)
  }

  // Utility Methods

  /**
   * @returns {object}
   */
  getStats() {
    return {
      words: this.countWords(),
      sentences: this.countSentences(),
      characters: this.countCharacters(true),
      charactersNoSpaces: this.countCharacters(false),
      isEmpty: this.isEmpty()
    }
  }
}