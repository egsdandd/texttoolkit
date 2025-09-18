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

const MAX_SUBSTRING_LENGTH = 1000
const MAX_REGEX_SOURCE_LENGTH = 500

/**
 * TextSearcher class provides various text searching methods.
 */
export default class TextSearcher {
  /**
   * Creates an instance of TextSearcher.
   * @param {string} text The text to be searched.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')
  }

  /**
   * Finds the first occurrence of a substring in the text.
   * @param {string} substring The substring to search for.
   * @param {boolean} caseSensitive Whether the search should be case-sensitive.
   * @returns {number} The index of the first occurrence of the substring, or -1 if not found.
   */
  findFirst(substring, caseSensitive = true) {
    validateNonEmptyString(substring, 'Substring')
    validateMaxLength(substring, MAX_SUBSTRING_LENGTH, 'Substring')
    validateBoolean(caseSensitive, 'caseSensitive')
    const searchText = caseSensitive ? this.text : this.text.toLowerCase()
    const searchSub = caseSensitive ? substring : substring.toLowerCase()
    return searchText.indexOf(searchSub)
  }

  /**
   * Finds all occurrences of a substring in the text.
   * @param {string} substring The substring to search for.
   * @param {boolean} caseSensitive Whether the search should be case-sensitive.
   * @returns {number[]} An array of indices where the substring occurs.
   */
  findAll(substring, caseSensitive = true) {
    validateNonEmptyString(substring, 'Substring')
    validateMaxLength(substring, MAX_SUBSTRING_LENGTH, 'Substring')
    validateBoolean(caseSensitive, 'caseSensitive')
    const positions = []
    const searchText = caseSensitive ? this.text : this.text.toLowerCase()
    const searchSub = caseSensitive ? substring : substring.toLowerCase()
    let pos = searchText.indexOf(searchSub)
    while (pos !== -1) {
      positions.push(pos)
      pos = searchText.indexOf(searchSub, pos + searchSub.length)
    }
    return positions
  }

  /**
   * Checks if a substring exists in the text.
   * @param {string} substring The substring to search for.
   * @param {boolean} caseSensitive Whether the search should be case-sensitive.
   * @returns {boolean} True if the substring exists, false otherwise.
   */
  exists(substring, caseSensitive = true) {
    validateNonEmptyString(substring, 'Substring')
    validateBoolean(caseSensitive, 'caseSensitive')
    return this.findFirst(substring, caseSensitive) !== -1
  }

  /**
   * Matches a regular expression pattern in the text.
   * @param {RegExp} pattern The regular expression pattern to match.
   * @returns {Array} An array of matches found in the text.
   */
  matchPattern(pattern) {
    if (!(pattern instanceof RegExp)) throw new InvalidPatternError('pattern')
    if (pattern.source === '') throw new EmptyPatternError('pattern')
    if (pattern.source.length > MAX_REGEX_SOURCE_LENGTH) throw new TooLongError('pattern', MAX_REGEX_SOURCE_LENGTH)
    return this.text.match(pattern) || []
  }

  /**
   * Searches for a regular expression pattern in the text.
   * @param {RegExp} regexp The regular expression pattern to search for.
   * @returns {number} The index of the first match, or -1 if not found.
   */
  searchRegexp(regexp) {
    if (!(regexp instanceof RegExp)) throw new InvalidPatternError('regexp')
    if (regexp.source === '') throw new EmptyPatternError('regexp')
    if (regexp.source.length > MAX_REGEX_SOURCE_LENGTH) throw new TooLongError('regexp', MAX_REGEX_SOURCE_LENGTH)
    return this.text.search(regexp)
  }
}
