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
 * Provides string search utilities with support for case-sensitive/insensitive searches,
 * regex pattern matching, and Unicode text handling.
 * @class TextSearcher
 * @example
 * const searcher = new TextSearcher("Hello World! Welcome to the world.")
 * console.log(searcher.findAll("world", false)) // [6, 29] (case-insensitive)
 * console.log(searcher.exists("hello", false))  // true
 */
export default class TextSearcher {
  /**
   * Creates a new TextSearcher instance.
   * @param {string} text Text to search within. Must be non-empty and under max length.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')
    
    // Cache for case-insensitive operations
    this._lowercaseCache = null
  }

  /**
   * Finds the index of the first occurrence of a substring.
   * @param {string} substring The substring to search for.
   * @param {boolean} caseSensitive Whether the search should be case-sensitive.
   * @returns {number} Index of first occurrence, or -1 if not found.
   */
  findFirst(substring, caseSensitive = true) {
    this.#validateSubstring(substring)
    validateBoolean(caseSensitive, 'caseSensitive')
    
    const searchText = caseSensitive ? this.text : this.#getLowercaseText()
    const searchSub = caseSensitive ? substring : substring.toLowerCase()
    
    return searchText.indexOf(searchSub)
  }

  /**
   * Finds all indices where a substring occurs in the text.
   * @param {string} substring The substring to search for.
   * @param {boolean} caseSensitive Whether the search should be case-sensitive.
   * @returns {number[]} Array of indices where the substring was found.
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
   * Checks if a substring exists anywhere in the text.
   * @param {string} substring The substring to search for.
   * @param {boolean} caseSensitive Whether the search should be case-sensitive.
   * @returns {boolean} True if the substring exists, false otherwise.
   */
  exists(substring, caseSensitive = true) {
    this.#validateSubstring(substring)
    validateBoolean(caseSensitive, 'caseSensitive')
    
    return this.findFirst(substring, caseSensitive) !== -1
  }

  /**
   * Counts the number of occurrences of a substring in the text.
   * @param {string} substring The substring to count.
   * @param {boolean} caseSensitive Whether the search should be case-sensitive.
   * @returns {number} Number of occurrences found.
   */
  count(substring, caseSensitive = true) {
    return this.findAll(substring, caseSensitive).length
  }

  /**
   * Finds all regex pattern matches in the text.
   * @param {RegExp} pattern Regex pattern to match against the text.
   * @returns {RegExpMatchArray|string[]} Array of matches, or empty array if no matches.
   */
  matchPattern(pattern) {
    this.#validateRegexPattern(pattern, 'pattern')
    return this.text.match(pattern) || []
  }

  /**
   * Finds the index of the first regex match in the text.
   * @param {RegExp} regexp Regex pattern to search for.
   * @returns {number} Index of first match, or -1 if no match found.
   */
  searchRegexp(regexp) {
    this.#validateRegexPattern(regexp, 'regexp')
    return this.text.search(regexp)
  }

  /**
   * Tests if a regex pattern matches anywhere in the text.
   * @param {RegExp} pattern Regex pattern to test.
   * @returns {boolean} True if pattern matches, false otherwise.
   */
  testPattern(pattern) {
    this.#validateRegexPattern(pattern, 'pattern')
    return pattern.test(this.text)
  }

  /**
   * Finds all matches with their positions and captured groups.
   * @param {RegExp} pattern Regex pattern with global flag.
   * @returns {Array<{match: string, index: number, groups: string[]}>} Detailed match information.
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