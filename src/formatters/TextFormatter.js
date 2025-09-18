// src/formatters/TextFormatter.js

import {
  validateNonEmptyString,
  validateMaxLength,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'

const WORD_START_REGEX = /\b[a-zA-ZåäöÅÄÖ]/g // Svenska+engelska bokstäver

/**
 * TextFormatter class provides various text formatting methods.
 *
 */
export default class TextFormatter {
  /**
   * Creates an instance of TextFormatter.
   * @param {string} text The text to be formatted.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  /**
   * Converts the text to uppercase.
   * @returns {string} The uppercase version of the text.
   */
  toUpperCase() {
    if (!this.text.trim()) return ''
    return this.text.toUpperCase()
  }

  /**
   * Converts the text to lowercase.
   * @returns {string} The lowercase version of the text.
   */
  toLowerCase() {
    if (!this.text.trim()) return ''
    return this.text.toLowerCase()
  }

  /**
   * Capitalizes the first letter of each word in the text.
   * @returns {string} The text with each word capitalized.
   */
  capitalizeWords() {
    if (!this.text.trim()) return ''
    return this.text.replace(WORD_START_REGEX, char => char.toUpperCase())
  }

  /**
   * Converts the text to title case.
   * @returns {string} The text with each word capitalized.
   */
  toCamelCase() {
    if (!this.text.trim()) return ''
    const words = this.text
      .toLowerCase()
      .replace(/[_\-]+/g, ' ')
      .replace(/[^\wåäöÅÄÖ\s]/g, '')
      .split(' ')
      .filter(Boolean)
    if (words.length === 0) return ''
    return (
      words[0] +
      words
        .slice(1)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    )
  }

  /**
   * Converts the text to snake_case.
   * @returns {string} The snake_case version of the text.
   */
  toSnakeCase() {
    if (!this.text.trim()) return ''
    return this.text
      .trim()
      .toLowerCase()
      .replace(/[\s\-]+/g, '_')
      .replace(/[^\wåäöÅÄÖ_]/g, '')
  }

  /**
   * Trims leading and trailing whitespace from the text.
   * @returns {string} The trimmed text.
   */
  trimWhitespace() {
    validateNonEmptyString(this.text, 'Text')
    return this.text.trim()
  }

}
