// src/TextDocument.js

import TextAnalyzer from './analyzers/TextAnalyzer.js'
import TextFormatter from './formatters/TextFormatter.js'
import TextSearcher from './searchers/TextSearcher.js'
import TextTransformer from './transformers/TextTransformer.js'
import TextReverser from './transformers/TextReverser.js'

/**
 * A comprehensive text document class providing analysis, formatting, searching, and transformation capabilities.
 * Acts as a facade for all text processing utilities.
 * @class TextDocument
 */
export default class TextDocument {
  /**
   * Creates a new TextDocument instance.
   * @param {string} text The text content to process.
   */
  constructor(text) {
    this.setText(text) // Use setter for consistent initialization
  }

  /**
   * Sets new text content and updates all processors.
   * @param {string} newText The new text content.
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
   * Gets the current text content.
   * @returns {string} The current text content.
   */
  getText() {
    return this.text
  }

  /**
   * Checks if the document has any content.
   * @returns {boolean} True if document is empty.
   */
  isEmpty() {
    return !this.text || this.text.length === 0
  }

  // Text Analysis Methods

  /**
   * Counts words in the text.
   * @returns {number} Number of words.
   */
  countWords() { 
    return this.isEmpty() ? 0 : this.analyzer.countWords() 
  }

  /**
   * Counts sentences in the text.
   * @returns {number} Number of sentences.
   */
  countSentences() { 
    return this.isEmpty() ? 0 : this.analyzer.countSentences() 
  }

  /**
   * Counts characters in the text.
   * @param {boolean} includeSpaces Whether to include spaces.
   * @returns {number} Number of characters.
   */
  countCharacters(includeSpaces = true) { 
    return this.isEmpty() ? 0 : this.analyzer.countCharacters(includeSpaces) 
  }

  /**
   * Gets letter frequency distribution.
   * @returns {{[key: string]: number}} Letter frequency map.
   */
  letterFrequency() { 
    return this.isEmpty() ? {} : this.analyzer.letterFrequency() 
  }

  /**
   * Finds palindromic words in the text.
   * @returns {string[]} Array of palindromes.
   */
  findPalindromes() { 
    return this.isEmpty() ? [] : this.analyzer.findPalindromes() 
  }

  // Text Formatting Methods

  /**
   * Converts text to uppercase.
   * @returns {string} Uppercase text.
   */
  toUpperCase() { 
    return this.isEmpty() ? '' : this.formatter.toUpperCase() 
  }

  /**
   * Converts text to lowercase.
   * @returns {string} Lowercase text.
   */
  toLowerCase() { 
    return this.isEmpty() ? '' : this.formatter.toLowerCase() 
  }

  /**
   * Capitalizes each word.
   * @returns {string} Text with capitalized words.
   */
  capitalizeWords() { 
    return this.isEmpty() ? '' : this.formatter.capitalizeWords() 
  }

  /**
   * Converts text to camelCase.
   * @returns {string} camelCase text.
   */
  toCamelCase() { 
    return this.isEmpty() ? '' : this.formatter.toCamelCase() 
  }

  /**
   * Converts text to snake_case.
   * @returns {string} snake_case text.
   */
  toSnakeCase() { 
    return this.isEmpty() ? '' : this.formatter.toSnakeCase() 
  }

  /**
   * Converts text to PascalCase.
   * @returns {string} PascalCase text.
   */
  toPascalCase() {
    return this.isEmpty() ? '' : this.formatter.toPascalCase()
  }

  /**
   * Converts text to kebab-case.
   * @returns {string} kebab-case text.
   */
  toKebabCase() {
    return this.isEmpty() ? '' : this.formatter.toKebabCase()
  }

  /**
   * Trims whitespace from text.
   * @returns {string} Trimmed text.
   */
  trimWhitespace() { 
    return this.isEmpty() ? '' : this.formatter.trimWhitespace() 
  }

  // Text Search Methods

  /**
   * Finds first occurrence of substring.
   * @param {string} substring Substring to find.
   * @param {boolean} caseSensitive Whether search is case-sensitive.
   * @returns {number} Index of first occurrence or -1.
   */
  findFirst(substring, caseSensitive = true) { 
    return this.isEmpty() ? -1 : this.searcher.findFirst(substring, caseSensitive) 
  }

  /**
   * Finds all occurrences of substring.
   * @param {string} substring Substring to find.
   * @param {boolean} caseSensitive Whether search is case-sensitive.
   * @returns {number[]} Array of indices.
   */
  findAll(substring, caseSensitive = true) { 
    return this.isEmpty() ? [] : this.searcher.findAll(substring, caseSensitive) 
  }

  /**
   * Checks if substring exists in text.
   * @param {string} substring Substring to check.
   * @param {boolean} caseSensitive Whether search is case-sensitive.
   * @returns {boolean} True if substring exists.
   */
  exists(substring, caseSensitive = true) { 
    return this.isEmpty() ? false : this.searcher.exists(substring, caseSensitive) 
  }

  /**
   * Counts occurrences of substring.
   * @param {string} substring Substring to count.
   * @param {boolean} caseSensitive Whether search is case-sensitive.
   * @returns {number} Number of occurrences.
   */
  count(substring, caseSensitive = true) {
    return this.isEmpty() ? 0 : this.searcher.count(substring, caseSensitive)
  }

  /**
   * Matches pattern in text.
   * @param {RegExp} pattern Pattern to match.
   * @returns {string[]} Array of matches.
   */
  matchPattern(pattern) { 
    return this.isEmpty() ? [] : this.searcher.matchPattern(pattern) 
  }

  /**
   * Searches text with regex.
   * @param {RegExp} regexp Regular expression to search with.
   * @returns {number} Index of first match or -1.
   */
  searchRegexp(regexp) { 
    return this.isEmpty() ? -1 : this.searcher.searchRegexp(regexp) 
  }

  /**
   * Tests if pattern matches text.
   * @param {RegExp} pattern Pattern to test.
   * @returns {boolean} True if pattern matches.
   */
  testPattern(pattern) {
    return this.isEmpty() ? false : this.searcher.testPattern(pattern)
  }

  // Text Transformation Methods

  /**
   * Applies transformation function to each word.
   * @param {Function} transformFn Transformation function.
   * @returns {string} Transformed text.
   */
  transformWords(transformFn) { 
    return this.isEmpty() ? '' : this.transformer.transformWords(transformFn) 
  }

  /**
   * Reverses word order.
   * @returns {string} Text with reversed word order.
   */
  reverseWordOrder() { 
    return this.isEmpty() ? '' : this.transformer.reverseWordOrder() 
  }

  /**
   * Replaces word with another word.
   * @param {string} oldWord Word to replace.
   * @param {string} newWord Replacement word.
   * @param {boolean} caseSensitive Whether replacement is case-sensitive.
   * @returns {string} Text with word replaced.
   */
  replaceWord(oldWord, newWord, caseSensitive = true) { 
    return this.isEmpty() ? '' : this.transformer.replaceWord(oldWord, newWord, caseSensitive) 
  }

  /**
   * Removes specified words from text.
   * @param {string[]} wordsToRemove Words to remove.
   * @param {boolean} caseSensitive Whether removal is case-sensitive.
   * @returns {string} Text with words removed.
   */
  removeWords(wordsToRemove, caseSensitive = true) {
    return this.isEmpty() ? '' : this.transformer.removeWords(wordsToRemove, caseSensitive)
  }

  /**
   * Sorts words alphabetically.
   * @param {boolean} descending Whether to sort in descending order.
   * @returns {string} Text with words sorted.
   */
  sortWords(descending = false) {
    return this.isEmpty() ? '' : this.transformer.sortWords(descending)
  }

  /**
   * Shuffles words randomly.
   * @returns {string} Text with words in random order.
   */
  shuffleWords() {
    return this.isEmpty() ? '' : this.transformer.shuffleWords()
  }

  /**
   * Reverses each word in the text (legacy method).
   * @returns {string} Text with each word reversed.
   */
  reverseText() {
    return this.reverseWordsIndividually()
  }

  /**
   * Applies custom transformation function to each word (legacy method).
   * @param {Function} transformFn Function to apply to each word.
   * @returns {string} Transformed text.
   */
  transformText(transformFn) {
    return this.transformWords(transformFn)
  }

  // Text Reversal Methods

  /**
   * Reverses entire text.
   * @returns {string} Text with all characters reversed.
   */
  reverse() {
    return this.isEmpty() ? '' : this.reverser.reverse()
  }

  /**
   * Reverses each word individually.
   * @returns {string} Text with each word reversed.
   */
  reverseWordsIndividually() {
    return this.isEmpty() ? '' : this.reverser.reverseWordsIndividually()
  }

  /**
   * Reverses line order.
   * @returns {string} Text with lines in reverse order.
   */
  reverseLines() {
    return this.isEmpty() ? '' : this.reverser.reverseLines()
  }

  /**
   * Checks if text is a palindrome.
   * @param {boolean} ignoreCase Whether to ignore case.
   * @param {boolean} ignoreSpaces Whether to ignore spaces and punctuation.
   * @returns {boolean} True if text is palindrome.
   */
  isPalindrome(ignoreCase = true, ignoreSpaces = false) {
    return this.isEmpty() ? false : this.reverser.isPalindrome(ignoreCase, ignoreSpaces)
  }

  // Utility Methods

  /**
   * Gets basic text statistics.
   * @returns {object} Object containing word count, sentence count, and character count.
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