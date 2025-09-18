// src/formatters/TextFormatter.js

import {
  validateNonEmptyString,
  validateMaxLength,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'

import {
  EmptyStringError,
  InvalidTypeError
} from '../utils/errors.js'

const WORD_START_REGEX = /\b[a-zA-ZåäöÅÄÖ]/g // Svenska+engelska bokstäver

/**
 *
 */
export default class TextFormatter {
  /**
   *
   * @param text
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  /**
   *
   */
  toUpperCase() {
    if (!this.text.trim()) return ''
    return this.text.toUpperCase()
  }

  /**
   *
   */
  toLowerCase() {
    if (!this.text.trim()) return ''
    return this.text.toLowerCase()
  }

  /**
   *
   */
  capitalizeWords() {
    if (!this.text.trim()) return ''
    return this.text.replace(WORD_START_REGEX, char => char.toUpperCase())
  }

  /**
   *
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
   *
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
   *
   */
  trimWhitespace() {
    validateNonEmptyString(this.text, 'Text')
    return this.text.trim()
  }

}
