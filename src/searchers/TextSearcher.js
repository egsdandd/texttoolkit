// src/searchers/TextSearcher.js

import {
  validateNonEmptyString,
  validateMaxLength,
  validateBoolean,
  MAX_TEXT_LENGTH,
} from '../utils/inputValidation.js'

import {
  InvalidPatternError,
  EmptyPatternError,
  TooLongError,
} from '../utils/errors.js'

// Constants for better maintainability
const MAX_SUBSTRING_LENGTH = 1000
const MAX_REGEX_SOURCE_LENGTH = 500

/**
 * String search utilities for substrings and regex.
 * @class TextSearcher
 */
export default class TextSearcher {
  /**
   * @param {string} text Text to search in.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')

    // Cache for case-insensitive operations
    this._lowercaseCache = null
  }

  /**
   * @param {string} substring Substring to find.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {number}
   */
  findFirst(substring, caseSensitive = true) {
    this.#validateSubstring(substring)
    validateBoolean(caseSensitive, 'caseSensitive')

    const searchText = caseSensitive ? this.text : this.#getLowercaseText()
    const searchSub = caseSensitive ? substring : substring.toLowerCase()

    return searchText.indexOf(searchSub)
  }

  /**
   * @param {string} substring Substring to find.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {number[]}
   */
  findAll(substring, caseSensitive = true) {
    this.#validateSubstring(substring)
    validateBoolean(caseSensitive, 'caseSensitive')

    const positions = []
    const searchText = caseSensitive ? this.text : this.#getLowercaseText()
    const searchSub = caseSensitive ? substring : substring.toLowerCase()

    let pos = searchText.indexOf(searchSub)
    while (pos !== -1) {
      positions.push(pos)
      pos = searchText.indexOf(searchSub, pos + 1) // Avoid infinite loops with zero-width matches
    }

    return positions
  }

  /**
   * @param {string} substring Substring to check.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {boolean}
   */
  exists(substring, caseSensitive = true) {
    this.#validateSubstring(substring)
    validateBoolean(caseSensitive, 'caseSensitive')

    return this.findFirst(substring, caseSensitive) !== -1
  }

  /**
   * @param {string} substring Substring to count.
   * @param {boolean} caseSensitive Case sensitivity.
   * @returns {number}
   */
  count(substring, caseSensitive = true) {
    return this.findAll(substring, caseSensitive).length
  }

  /**
   * @param {RegExp} pattern Regex pattern to match.
   * @returns {RegExpMatchArray|string[]}
   */
  matchPattern(pattern) {
    this.#validateRegexPattern(pattern, 'pattern')
    return this.text.match(pattern) || []
  }

  /**
   * @param {RegExp} regexp Regex pattern to search.
   * @returns {number}
   */
  searchRegexp(regexp) {
    this.#validateRegexPattern(regexp, 'regexp')
    return this.text.search(regexp)
  }

  /**
   * @param {RegExp} pattern Regex pattern to test.
   * @returns {boolean}
   */
  testPattern(pattern) {
    this.#validateRegexPattern(pattern, 'pattern')
    return pattern.test(this.text)
  }

  /**
   * @param {RegExp} pattern Regex pattern with global flag.
   * @returns {Array<{match: string, index: number, groups: string[]}>
   */
  findMatches(pattern) {
    this.#validateRegexPattern(pattern, 'pattern')

    if (!pattern.global) {
      throw new InvalidPatternError('Pattern must have global flag for findMatches')
    }

    const matches = []
    let match

    // Reset regex lastIndex to ensure consistent behavior
    pattern.lastIndex = 0

    while ((match = pattern.exec(this.text)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1)
      })

      // Prevent infinite loop on zero-width matches
      if (match[0].length === 0) {
        pattern.lastIndex++
      }
    }

    return matches
  }

  // Private methods

  /**
   * Gets lowercase version of text with caching.
   * @private
   * @returns {string} Lowercase text.
   */
  #getLowercaseText() {
    if (this._lowercaseCache === null) {
      this._lowercaseCache = this.text.toLowerCase()
    }
    return this._lowercaseCache
  }

  /**
   * Validates substring parameters.
   * @private
   * @param {string} substring The substring to validate.
   */
  #validateSubstring(substring) {
    validateNonEmptyString(substring, 'Substring')
    validateMaxLength(substring, MAX_SUBSTRING_LENGTH, 'Substring')
  }

  /**
   * Validates regex pattern parameters.
   * @private
   * @param {RegExp} pattern The pattern to validate.
   * @param {string} paramName Name of the parameter for error messages.
   */
  #validateRegexPattern(pattern, paramName) {
    if (!(pattern instanceof RegExp)) {
      throw new InvalidPatternError(paramName)
    }
    if (pattern.source === '') {
      throw new EmptyPatternError(paramName)
    }
    if (pattern.source.length > MAX_REGEX_SOURCE_LENGTH) {
      throw new TooLongError(paramName, MAX_REGEX_SOURCE_LENGTH)
    }
  }
}