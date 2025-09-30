// src/transformers/TextTransformer.js

import {
  validateNonEmptyString,
  isEmptyOrWhitespace,
  validateMaxLength,
  validateFunction,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'
import { InvalidTypeError } from '../utils/errors.js'

/**
 * Word-level text transformation utilities.
 */
export default class TextTransformer {
  /**
   * @param {string} text Text to transform.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')
  }

  /**
   * @param {Function} transformFn Function to apply to each word.
   * @returns {string}
   */
  transformWords(transformFn) {
    validateFunction(transformFn, 'transformFn')
    if (isEmptyOrWhitespace(this.text)) return ''
    return TextTransformer.extractWords(this.text).map(transformFn).join(' ')
  }

  /**
   * @returns {string} Words in reverse order.
   */
  reverseWordOrder() {
    if (isEmptyOrWhitespace(this.text)) return ''
    return TextTransformer.extractWords(this.text).reverse().join(' ')
  }

  /**
   * @param {string} oldWord Word to replace.
   * @param {string} newWord Replacement word.
   * @param {boolean} [caseSensitive] Case sensitivity.
   * @returns {string}
   */
  replaceWord(oldWord, newWord, caseSensitive = true) {
    validateNonEmptyString(oldWord, 'oldWord')
    if (typeof newWord !== 'string') throw new InvalidTypeError('newWord', 'a string')
    if (isEmptyOrWhitespace(this.text)) return ''
    const flags = caseSensitive ? 'gu' : 'gui'
    const escapedOldWord = TextTransformer.escapeRegexChars(oldWord)
    const regex = new RegExp(`(?<=^|\\P{L})${escapedOldWord}(?=\\P{L}|$)`, flags)
    return this.text.replace(regex, newWord)
  }

  /**
   * @param {string[]} wordsToRemove Words to remove.
   * @param {boolean} [caseSensitive] Case sensitivity.
   * @returns {string}
   */
  removeWords(wordsToRemove, caseSensitive = true) {
    if (!Array.isArray(wordsToRemove) || wordsToRemove.length === 0) {
      return this.text
    }
    if (isEmptyOrWhitespace(this.text)) return ''
    let result = this.text
    for (const word of wordsToRemove) {
      if (typeof word === 'string' && word.trim()) {
        result = new TextTransformer(result).replaceWord(word, '', caseSensitive)
      }
    }
    // Remove extra whitespace and spaces before punctuation
    return result
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.!?;:])/g, '$1')
      .trim()
  }

  /**
   * @param {Function} predicate Function to filter words.
   * @returns {string}
   */
  filterWords(predicate) {
    validateFunction(predicate, 'predicate')
    if (isEmptyOrWhitespace(this.text)) return ''
    return TextTransformer.extractWords(this.text).filter(predicate).join(' ')
  }

  /**
   * @param {Function} transformFn Function to transform words by position.
   * @returns {string}
   */
  transformWordsByPosition(transformFn) {
    validateFunction(transformFn, 'transformFn')
    if (isEmptyOrWhitespace(this.text)) return ''
    return TextTransformer.extractWords(this.text)
      .map((word, idx) => transformFn(word, idx))
      .join(' ')
  }

  /**
   * @param {boolean} [descending] Sort descending.
   * @returns {string}
   */
  sortWords(descending = false) {
    if (isEmptyOrWhitespace(this.text)) return ''
    const words = TextTransformer.extractWords(this.text)
    words.sort((a, b) => {
      const cmp = a.toLowerCase().localeCompare(b.toLowerCase())
      return descending ? -cmp : cmp
    })
    return words.join(' ')
  }

  /**
   * @returns {string} Shuffled words.
   */
  shuffleWords() {
    if (isEmptyOrWhitespace(this.text)) return ''
    const words = TextTransformer.extractWords(this.text)
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[words[i], words[j]] = [words[j], words[i]]
    }
    return words.join(' ')
  }

  /**
   * @param {string} text Input text.
   * @returns {string[]}
   */
  static extractWords(text) {
    // \p{L} = letter (any language), (?:-\p{L}+)? for simple hyphenation. Ignores punctuation/digits.
    return (text.match(/\p{L}+(?:-\p{L}+)?/gu) || [])
  }

  /**
   * @param {string} str String to escape.
   * @returns {string}
   */
  static escapeRegexChars(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
}
