// src/formatters/TextFormatter.js

import {
  validateNonEmptyString,
  validateMaxLength,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'

// Regex constants for better maintainability
const NON_LETTER_REGEX = /[^\p{L}\p{M}\s]/gu  // Include combining marks (\p{M})
const UNDERSCORE_HYPHEN_REGEX = /[_\-]+/g
const WHITESPACE_SPLIT_REGEX = /\s+/

/** @class TextFormatter */
export default class TextFormatter {
   /** @param {string} text - The text to be formatted.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text

    // Cache for expensive operations
    this._normalizedCache = null
    this._wordsCache = null
  }

  /** @returns {string} */
  toUpperCase() {
    return this.text.toUpperCase()
  }

  /** @returns {string} */
  toLowerCase() {
    return this.text.toLowerCase()
  }

  /** @returns {string} */
  capitalizeWords() {
    return this.text.replace(/\p{L}(\p{L}|\p{M})*/gu, (match) =>
      match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    )
  }

  /** @returns {string} */
  capitalizeWordArray() {
    return this.getWords().map(word => this.#capitalize(word)).join(' ')
  }

  /** @returns {string} */
  toCamelCase() {
    const words = this.getWords()
    if (words.length === 0) return ''

    return words[0].toLowerCase() +
      words.slice(1).map(word => this.#capitalize(word)).join('')
  }

  /** @returns {string} */
  toSnakeCase() {
    return this.getWords().join('_')
  }

  /** @returns {string} */
  toPascalCase() {
    return this.getWords().map(word => this.#capitalize(word)).join('')
  }

  /** @returns {string} */
  toKebabCase() {
    return this.getWords().join('-')
  }

  /** @returns {string[]} */
  getWords() {
    if (this._wordsCache === null) {
      this._wordsCache = this.#splitToWords()
    }
    return this._wordsCache
  }

  /** @returns {string} */
  trimWhitespace() {
    return this.text.trim()
  }

  // Private methods

  /** @returns {string} */
  #normalizedText() {
    if (this._normalizedCache === null) {
      this._normalizedCache = this.text
        .trim()
        .replace(/İ/g, 'I')  // Fix Turkish İ before lowercasing
        .toLowerCase()
    }
    return this._normalizedCache
  }

  /**
   * @param {string} word - The word to capitalize.
   * @returns {string}
   */
  #capitalize(word) {
    if (!word) return word
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }

  /**
   * @private
   * @returns {string[]} Array of words extracted from the text.
   */
  #splitToWords() {
    return this.#normalizedText()
      .replace(UNDERSCORE_HYPHEN_REGEX, ' ')
      .replace(NON_LETTER_REGEX, '')
      .split(WHITESPACE_SPLIT_REGEX)
      .filter(Boolean)
  }
}