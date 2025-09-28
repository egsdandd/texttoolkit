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
 * Utility for word-level text transformation (Unicode support).
 */
export default class TextTransformer {
  /**
   * Create a new instance.
   * @param {string} text The text to transform.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')
  }

  /**
   * Apply a function to every word.
   * @param {Function} transformFn - function(word) => transformedWord
   * @returns {string}
   */
  transformWords(transformFn) {
    validateFunction(transformFn, 'transformFn')
    if (isEmptyOrWhitespace(this.text)) return ''
    return TextTransformer.extractWords(this.text).map(transformFn).join(' ')
  }

  /**
   * Reverse the order of the words.
   * @returns {string}
   */
  reverseWordOrder() {
    if (isEmptyOrWhitespace(this.text)) return ''
    return TextTransformer.extractWords(this.text).reverse().join(' ')
  }

  /**
   * Replace all occurrences of a word using Unicode-aware word boundaries.
   * @param {string} oldWord - word to replace
   * @param {string} newWord - replacement word
   * @param {boolean} [caseSensitive=true] - whether the match is case-sensitive
   * @returns {string}
   */
  replaceWord(oldWord, newWord, caseSensitive = true) {
    validateNonEmptyString(oldWord, 'oldWord')
    if (typeof newWord !== 'string') throw new InvalidTypeError('newWord', 'a string')
    if (isEmptyOrWhitespace(this.text)) return ''
    const flags = caseSensitive ? 'gu' : 'gui'
    const escapedOldWord = TextTransformer.escapeRegexChars(oldWord)
    // Unicode-aware word boundaries using lookarounds for letters
    const regex = new RegExp(`(?<=^|\\P{L})${escapedOldWord}(?=\\P{L}|$)`, flags)
    return this.text.replace(regex, newWord)
  }

  /**
   * Remove specified words from the text.
   * @param {string[]} wordsToRemove - array of words to remove
   * @param {boolean} [caseSensitive=true] - whether the removal is case-sensitive
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
   * Filter words by a predicate.
   * @param {Function} predicate - function(word) => boolean
   * @returns {string}
   */
  filterWords(predicate) {
    validateFunction(predicate, 'predicate')
    if (isEmptyOrWhitespace(this.text)) return ''
    return TextTransformer.extractWords(this.text).filter(predicate).join(' ')
  }

  /**
   * Transform words based on position.
   * @param {Function} transformFn - function(word, index)
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
   * Sort words alphabetically.
   * @param {boolean} [descending=false] - Sort in descending order if true.
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
   * Shuffle words using Fisher-Yates algorithm.
   * @returns {string}
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
   * Extract words (Unicode, allows hyphens).
   * @param {string} text - input text
   * @returns {string[]}
   */
  static extractWords(text) {
    // \p{L} = letter (any language), (?:-\p{L}+)? for simple hyphenation. Ignores punctuation/digits.
    return (text.match(/\p{L}+(?:-\p{L}+)?/gu) || [])
  }

  /**
   * Escape special regex characters in a string.
   * @param {string} str string to escape
   * @returns {string}
   */
  static escapeRegexChars(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
}
