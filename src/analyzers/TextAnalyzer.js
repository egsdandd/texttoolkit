// src/analyzers/TextAnalyzer.js

import {
  validateNonEmptyString,
  validateMaxLength,
  validateBoolean,
  MAX_TEXT_LENGTH,
  isEmptyOrWhitespace,
} from '../utils/inputValidation.js'

// Regex constants for maintainability
const LETTER_REGEX = /[\p{L}]/u // Matches all Unicode letters
const SENTENCE_REGEX = /[^.!?]+[.!?]+/g // Matches entire sentences

/**
 * A class for analyzing text content, providing methods to count words, sentences,
 * characters, letter frequency, and find palindromes.
 * @class TextAnalyzer 
 * @example
 * const analyzer = new TextAnalyzer("Madam Arora teaches malayalam")
 * console.log(analyzer.countWords()) // Outputs: 4
 * console.log(analyzer.findPalindromes()) // Outputs: ['madam', 'arora', 'malayalam']
 * 
 */
export default class TextAnalyzer {
  /**
   * Creates an instance of TextAnalyzer.
   * @param {string} text The text to be analyzed.
   */
  constructor(text) {
    this.setText(text)
  }

  /**
   * Counts the number of words in the text.
   * Words are defined as sequences of Unicode letters separated by whitespace or punctuation.
   * @returns {number} The number of words found in the text.
   */
  countWords() {
    if (isEmptyOrWhitespace(this.text)) return 0
    return this.#getWords().length
  }

  /**
   * Counts the number of sentences in the text.
   * Sentences are identified by ending punctuation (.!?).
   * @returns {number} The number of sentences found in the text.
   */
  countSentences() {
    if (isEmptyOrWhitespace(this.text)) return 0
    const sentences = this.text.match(SENTENCE_REGEX)
    return sentences ? sentences.length : 0
  }

  /**
   * Counts the number of characters in the text.
   * @param {boolean} includeSpaces Whether to include spaces in the character count.
   * @returns {number} The total character count.
   * analyzer.countCharacters(false) // excludes spaces
   */
  countCharacters(includeSpaces = true) {
    if (isEmptyOrWhitespace(this.text)) return 0
    validateBoolean(includeSpaces, 'includeSpaces')
    return includeSpaces
      ? this.text.length
      : this.text.replace(/\s/g, '').length
  }

  /**
   * Calculates the frequency of each letter (a-z, å, ä, ö) in the text, case-insensitive.
   * @returns {{[key: string]: number}} An object where keys are letters and values are their frequency count.
   */
  letterFrequency() {
    if (isEmptyOrWhitespace(this.text)) return {}

    const frequency = {}
    const normalizedText = this.#getNormalizedText()

    for (const char of normalizedText) {
      if (LETTER_REGEX.test(char)) {
        frequency[char] = (frequency[char] || 0) + 1
      }
    }

    return frequency
  }

  /**
   * Finds all unique palindromic words (length > 1) in the text, case-insensitive.
   * @returns {string[]} An array of unique palindromic words found in the text.
   */
  findPalindromes() {
    if (isEmptyOrWhitespace(this.text)) return []
    return [...new Set(this.#getWords().filter(this.#isPalindrome))]
  }

  /**
   * Sets the text to be analyzed and resets caches.
   * @param {string} text The text to be analyzed.
   */
  setText(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
    this._wordsCache = null
    this._normalizedTextCache = null
  }

  // Private methods

  /**
   * Checks if a given word is a palindrome (case-insensitive, length > 1).
   * @private
   * @param {string} word The word to check for palindrome property.
   * @returns {boolean} True if the word is a palindrome, false otherwise.
   */
  #isPalindrome(word) {
    if (typeof word !== 'string' || word.length <= 1) return false
    return word === [...word].reverse().join('')
  }

  /**
   * Extracts words from the text with caching, converting to lowercase and removing punctuation.
   * Supports Unicode characters.
   * @private
   * @returns {string[]} An array of words extracted from the text.
   */
  #getWords() {
    if (this._wordsCache === null) {
      this._wordsCache = this.#getNormalizedText()
        .replace(/[^\p{L}\s]/gu, '') // Remove everything except letters and whitespace
        .split(/\s+/)
        .filter(Boolean)
    }
    return this._wordsCache
  }

  /**
   * Gets normalized (lowercase) text with caching.
   * @private
   * @returns {string} The normalized text.
   */
  #getNormalizedText() {
    if (this._normalizedTextCache === null) {
      this._normalizedTextCache = this.text.toLowerCase()
    }
    return this._normalizedTextCache
  }
}