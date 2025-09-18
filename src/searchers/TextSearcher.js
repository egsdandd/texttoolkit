// src/searchers/TextSearcher.js

import {
  isNonEmptyString,
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
 *
 */
export default class TextSearcher {
  /**
   *
   * @param text
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')
  }

  /**
   *
   * @param substring
   * @param caseSensitive
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
   *
   * @param substring
   * @param caseSensitive
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
   *
   * @param substring
   * @param caseSensitive
   */
  exists(substring, caseSensitive = true) {
    validateNonEmptyString(substring, 'Substring')
    validateBoolean(caseSensitive, 'caseSensitive')
    return this.findFirst(substring, caseSensitive) !== -1
  }

  /**
   *
   * @param pattern
   */
  matchPattern(pattern) {
    if (!(pattern instanceof RegExp)) throw new InvalidPatternError('pattern')
    if (pattern.source === '') throw new EmptyPatternError('pattern')
    if (pattern.source.length > MAX_REGEX_SOURCE_LENGTH) throw new TooLongError('pattern', MAX_REGEX_SOURCE_LENGTH)
    return this.text.match(pattern) || []
  }

  /**
   *
   * @param regexp
   */
  searchRegexp(regexp) {
    if (!(regexp instanceof RegExp)) throw new InvalidPatternError('regexp')
    if (regexp.source === '') throw new EmptyPatternError('regexp')
    if (regexp.source.length > MAX_REGEX_SOURCE_LENGTH) throw new TooLongError('regexp', MAX_REGEX_SOURCE_LENGTH)
    return this.text.search(regexp)
  }
}
