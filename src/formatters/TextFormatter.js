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

/**
 * Text formatting utilities for various string transformations.
 * Supports Unicode characters including Swedish and international letters.
 * @class TextFormatter
 * @example
 * const formatter = new TextFormatter("hello world-foo_bar")
 * console.log(formatter.toCamelCase()) // "helloWorldFooBar"
 * console.log(formatter.toSnakeCase()) // "hello_world_foo_bar"
 */
export default class TextFormatter {
  /**
   * Creates a new TextFormatter instance.
   * @param {string} text Non-empty string with max length of 1000 characters.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
    
    // Cache for expensive operations
    this._normalizedCache = null
    this._wordsCache = null
  }

  /**
   * Converts text to uppercase.
   * @returns {string} The text in uppercase.
   */
  toUpperCase() {
    return this.text.toUpperCase()
  }

  /**
   * Converts text to lowercase.
   * @returns {string} The text in lowercase.
   */
  toLowerCase() {
    return this.text.toLowerCase()
  }

  /**
   * Capitalizes the first letter of each word while preserving the original spacing and punctuation.
   * Handles Unicode characters including combining marks properly.
   * @returns {string} Text with each word capitalized.
   * @example
   * formatter.capitalizeWords() // "Hello World-Foo_Bar"
   */
  capitalizeWords() {
    return this.text.replace(/\p{L}(\p{L}|\p{M})*/gu, (match) =>
      match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    )
  }

  /**
   * Capitalizes words after converting to a clean word array format.
   * This removes punctuation and normalizes spacing.
   * @returns {string} Capitalized words separated by single spaces.
   * @example
   * formatter.capitalizeWordArray() // "Hello World Foo Bar"
   */
  capitalizeWordArray() {
    return this.getWords().map(word => this.#capitalize(word)).join(' ')
  }

  /**
   * Converts text to camelCase format.
   * @returns {string} Text in camelCase format.
   * @example
   * formatter.toCamelCase() // "helloWorldFooBar"
   */
  toCamelCase() {
    const words = this.getWords()
    if (words.length === 0) return ''
    
    return words[0].toLowerCase() + 
           words.slice(1).map(word => this.#capitalize(word)).join('')
  }

  /**
   * Converts text to snake_case format.
   * @returns {string} Text in snake_case format.
   * @example
   * formatter.toSnakeCase() // "hello_world_foo_bar"
   */
  toSnakeCase() {
    return this.getWords().join('_')
  }

  /**
   * Converts text to PascalCase format.
   * @returns {string} Text in PascalCase format.
   * @example
   * formatter.toPascalCase() // "HelloWorldFooBar"
   */
  toPascalCase() {
    return this.getWords().map(word => this.#capitalize(word)).join('')
  }

  /**
   * Converts text to kebab-case format.
   * @returns {string} Text in kebab-case format.
   * @example
   * formatter.toKebabCase() // "hello-world-foo-bar"
   */
  toKebabCase() {
    return this.getWords().join('-')
  }

  /**
   * Extracts words from the text, removing punctuation and normalizing case.
   * @returns {string[]} Array of normalized words.
   */
  getWords() {
    if (this._wordsCache === null) {
      this._wordsCache = this.#splitToWords()
    }
    return this._wordsCache
  }

  /**
   * Trims leading and trailing whitespace.
   * @returns {string} Text with whitespace trimmed.
   */
  trimWhitespace() {
    return this.text.trim()
  }

  // Private methods

  /**
   * Gets normalized (trimmed and lowercase) text with caching.
   * Handles special Unicode cases like Turkish İ properly.
   * @private
   * @returns {string} Normalized text.
   */
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
   * Capitalizes the first letter of a word.
   * @private
   * @param {string} word The word to capitalize.
   * @returns {string} Word with first letter capitalized.
   */
  #capitalize(word) {
    if (!word) return word
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }

  /**
   * Splits text into words, handling Unicode letters and various separators.
   * @private
   * @returns {string[]} Array of words.
   */
  #splitToWords() {
    return this.#normalizedText()
      .replace(UNDERSCORE_HYPHEN_REGEX, ' ')
      .replace(NON_LETTER_REGEX, '')
      .split(WHITESPACE_SPLIT_REGEX)
      .filter(Boolean)
  }
}