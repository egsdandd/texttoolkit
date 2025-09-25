// src/formatters/TextFormatter.js

import {
  validateNonEmptyString,
  validateMaxLength,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'
/*
// Match first letter for capitalize
const WORD_START_REGEX = /\b[a-zA-ZåäöÅÄÖ]/g
const NON_LETTER_REGEX = /[^\wåäö\s]/gi
const UNDERSCORE_HYPHEN_REGEX = /[_\-]+/g
const WHITESPACE_SPLIT_REGEX = /\s+/
*/
// Matches the first letter of each Unicode word for capitalizeWords
const WORD_START_REGEX = /\b\p{L}/gu

// Removes any non-letter and non-space (keeps all letters, incl. åäö, é, ü, etc.)
const NON_LETTER_REGEX = /[^\p{L}\s]/gu

// Matches underscores or hyphens (used for splitting into words)
const UNDERSCORE_HYPHEN_REGEX = /[_\-]+/g

// Splits on any whitespace
const WHITESPACE_SPLIT_REGEX = /\s+/

/**
 * Text formatting utilities.
 */
export default class TextFormatter {
  /**
   * @param {string} text - Non-empty string with max length of 1000 characters.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  /**
   * @returns {string}
   * @private
   */
  #normalizedText() {
    return this.text.trim().toLowerCase()
  }

  /**
   * @returns {string[]}
   * @private
   */
  #splitToWords() {
    return this.#normalizedText()
      .replace(UNDERSCORE_HYPHEN_REGEX, ' ')
      .replace(NON_LETTER_REGEX, '')
      .split(WHITESPACE_SPLIT_REGEX)
      .filter(Boolean)
  }

  /**
   * @param {string} word - The word to capitalize.
   * @returns {string}
   * @private
   */
  #capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
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
    return this.text.replace(WORD_START_REGEX, char => char.toUpperCase())
  }

  /** @returns {string} */
  capitalizeWordArray() {
    return this.getWords().map(w => this.#capitalize(w)).join(' ')
  }

  /** @returns {string} */
  toCamelCase() {
    const words = this.getWords()
    if (words.length === 0) return ''
    return (
      words[0] +
      words.slice(1).map(w => this.#capitalize(w)).join('')
    )
  }

  /** @returns {string} */
  toSnakeCase() {
    return this.getWords().join('_')
  }

  /** @returns {string[]} */
  getWords() {
    return this.#splitToWords()
  }

  /** @returns {string} */
  trimWhitespace() {
    return this.text.trim()
  }
}
