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
 * Utilities for reversing text in various ways with Unicode support.
 * @class TextReverser
 */
export default class TextReverser {
  /**
   * Creates a new TextReverser instance.
   * @param {string} text The text to reverse.
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
   * Reverses the entire text character by character.
   * @returns {string} The text with all characters reversed.
   */
  reverse() {
    if (this._reversedCache === null) {
      this._reversedCache = this.#reverseString(this.text)
    }
    return this._reversedCache
  }

  /**
   * Reverses each word individually while preserving word positions.
   * @returns {string} Text with each word reversed but in original order.
   */
  reverseWordsIndividually() {
    return this.#getWords()
      .map(word => this.#reverseString(word))
      .join(' ')
  }

  /**
   * Reverses the order of words while keeping each word intact.
   * @returns {string} Text with word order reversed.
   */
  reverseWordOrder() {
    return this.#getWords().reverse().join(' ')
  }

  /**
   * Reverses the order of lines in multi-line text.
   * @returns {string} Text with line order reversed.
   */
  reverseLines() {
    return this.#getLines().reverse().join('\n')
  }

  /**
   * Reverses only words that meet a minimum length requirement.
   * @param {number} minLength Minimum number of characters required to reverse a word.
   * @returns {string} Text with long words reversed.
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
   * Reverses each sentence individually while preserving punctuation.
   * @returns {string} Text with each sentence reversed but punctuation preserved.
   */
  reverseEachSentence() {
    return this.text.split(SENTENCE_DELIMITERS)
      .map(part => SENTENCE_DELIMITERS.test(part) ? part : this.#reverseString(part.trim()))
      .join('')
  }

  /**
   * Checks if the text is a palindrome.
   * @param {boolean} ignoreCase Whether to ignore case differences.
   * @param {boolean} ignoreSpaces Whether to ignore spaces and punctuation.
   * @returns {boolean} True if the text is a palindrome.
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
   * Reverses each word and capitalizes the first letter.
   * @returns {string} Text with words reversed and capitalized.
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
   * Reverses alternating words (1st, 3rd, 5th, etc.).
   * @returns {string} Text with every other word reversed.
   */
  reverseAlternatingWords() {
    return this.#getWords()
      .map((word, index) => index % 2 === 0 ? this.#reverseString(word) : word)
      .join(' ')
  }

  /**
   * Creates a mirror effect by appending the reversed text.
   * @param {string} separator String to insert between original and reversed text.
   * @returns {string} Original text plus separator plus reversed text.
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