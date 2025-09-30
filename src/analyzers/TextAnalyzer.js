// src/analyzers/TextAnalyzer.js

import {
  validateNonEmptyString,
  validateMaxLength,
  validateBoolean,
  MAX_TEXT_LENGTH,
  isEmptyOrWhitespace,
} from '../utils/inputValidation.js'

// Regex constants for maintainability
const LETTER_REGEX = /[\p{L}]/u // Unicode letters
const SENTENCE_REGEX = /[^.!?]+[.!?]+/g // Entire sentences

/** @class TextAnalyzer */
export default class TextAnalyzer {
  /** @param {string} text The text to be analyzed. */
  constructor(text) {
    this.setText(text)
  }

  /** @returns {number} Number of words found in the text. */
  countWords() {
    if (isEmptyOrWhitespace(this.text)) return 0
    return this.#getWords().length
  }

  /** @returns {number} Number of sentences found in the text. */
  countSentences() {
    if (isEmptyOrWhitespace(this.text)) return 0
    const sentences = this.text.match(SENTENCE_REGEX)
    return sentences ? sentences.length : 0
  }

  /**
   * @param {boolean} includeSpaces Whether to include spaces.
   * @returns {number} Total character count.
   */
  countCharacters(includeSpaces = true) {
    if (isEmptyOrWhitespace(this.text)) return 0
    validateBoolean(includeSpaces, 'includeSpaces')
    return includeSpaces
      ? this.text.length
      : this.text.replace(/\s/g, '').length
  }

  /** @returns {{[key: string]: number}} Object with letter frequencies. */
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

  /** @returns {string[]} Array of unique palindromic words. */
  findPalindromes() {
    if (isEmptyOrWhitespace(this.text)) return []
    return [...new Set(this.#getWords().filter(this.#isPalindrome))]
  }

  /** @param {string} text The text to be analyzed. */
  setText(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
    this._wordsCache = null
    this._normalizedTextCache = null
  }

  // Private methods

  /**
   * @param {string} word Word to check.
   * @returns {boolean} if palindrome.
   */
  #isPalindrome(word) {
    if (typeof word !== 'string' || word.length <= 1) return false
    return word === [...word].reverse().join('')
  }

  /**
   * @returns {string[]} words extracted from the text.
   */
  #getWords() {
    if (this._wordsCache === null) {
      this._wordsCache = this.#getNormalizedText()
        .replace(/[^\p{L}\s]/gu, '') // letters and whitespace
        .split(/\s+/)
        .filter(Boolean)
    }
    return this._wordsCache
  }

  /**
   * @returns {string} The normalized text.
   */
  #getNormalizedText() {
    if (this._normalizedTextCache === null) {
      this._normalizedTextCache = this.text.toLowerCase()
    }
    return this._normalizedTextCache
  }
}