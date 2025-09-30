// src/transformers/TextReverser.js

import {
  validateNonEmptyString,
  validateMaxLength,
  validateBoolean,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'
import { InvalidTypeError } from '../utils/errors.js'

// Regex constants for better maintainability
const SENTENCE_DELIMITERS = /([.!?])/
const WORD_BOUNDARIES = /\s+/

/**
 * Text reversal utilities.
 * @class TextReverser
 */
export default class TextReverser {
  /**
   * @param {string} text Text to reverse.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')

    // Cache for expensive operations
    this._reversedCache = null
    this._wordsCache = null
    this._linesCache = null
  }

  /**
   * @returns {string} Reversed text.
   */
  reverse() {
    if (this._reversedCache === null) {
      this._reversedCache = this.#reverseString(this.text)
    }
    return this._reversedCache
  }

  /**
   * @returns {string} Each word reversed.
   */
  reverseWordsIndividually() {
    return this.#getWords()
      .map(word => this.#reverseString(word))
      .join(' ')
  }

  /**
   * @returns {string} Word order reversed.
   */
  reverseWordOrder() {
    return this.#getWords().reverse().join(' ')
  }

  /**
   * @returns {string} Line order reversed.
   */
  reverseLines() {
    return this.#getLines().reverse().join('\n')
  }

  /**
   * @param {number} minLength Minimum word length.
   * @returns {string} Long words reversed.
   */
  reverseLongWords(minLength = 4) {
    if (!Number.isInteger(minLength) || minLength < 1) {
      throw new InvalidTypeError('minLength', 'a positive integer greater than 0')
    }

    return this.#getWords()
      .map(word => word.length >= minLength ? this.#reverseString(word) : word)
      .join(' ')
  }

  /**
   * @returns {string} Each sentence reversed.
   */
  reverseEachSentence() {
    return this.text.split(SENTENCE_DELIMITERS)
      .map(part => SENTENCE_DELIMITERS.test(part) ? part : this.#reverseString(part.trim()))
      .join('')
  }

  /**
   * @param {boolean} ignoreCase Ignore case.
   * @param {boolean} ignoreSpaces Ignore spaces/punctuation.
   * @returns {boolean}
   */
  isPalindrome(ignoreCase = true, ignoreSpaces = false) {
    validateBoolean(ignoreCase, 'ignoreCase')
    validateBoolean(ignoreSpaces, 'ignoreSpaces')

    let processedText = ignoreCase ? this.text.toLowerCase() : this.text

    if (ignoreSpaces) {
      processedText = processedText.replace(/[^\p{L}\p{N}]/gu, '')
    }

    return processedText === this.#reverseString(processedText)
  }

  /**
   * @returns {string} Words reversed and capitalized.
   */
  reverseAndCapitalizeWords() {
    return this.#getWords()
      .map(word => {
        const reversed = this.#reverseString(word)
        return this.#capitalize(reversed)
      })
      .join(' ')
  }

  /**
   * @returns {string} Alternating words reversed.
   */
  reverseAlternatingWords() {
    return this.#getWords()
      .map((word, index) => index % 2 === 0 ? this.#reverseString(word) : word)
      .join(' ')
  }

  /**
   * @param {string} separator Separator string.
   * @returns {string} Mirrored text.
   */
  mirror(separator = ' ') {
    return this.text + separator + this.reverse()
  }

  // Private methods

  /**
   * Reverses a string with proper Unicode handling.
   * @private
   * @param {string} str String to reverse.
   * @returns {string} Reversed string.
   */
  #reverseString(str) {
    // Use Array.from to handle Unicode surrogate pairs correctly
    return Array.from(str).reverse().join('')
  }

  /**
   * Gets words from text with caching, using intelligent word splitting.
   * @private
   * @returns {string[]} Array of words.
   */
  #getWords() {
    if (this._wordsCache === null) {
      this._wordsCache = this.text.trim().split(WORD_BOUNDARIES).filter(Boolean)
    }
    return this._wordsCache
  }

  /**
   * Gets lines from text with caching.
   * @private
   * @returns {string[]} Array of lines.
   */
  #getLines() {
    if (this._linesCache === null) {
      this._linesCache = this.text.split('\n')
    }
    return this._linesCache
  }

  /**
   * Capitalizes the first character of a string.
   * @private
   * @param {string} str String to capitalize.
   * @returns {string} String with first character capitalized.
   */
  #capitalize(str) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
}