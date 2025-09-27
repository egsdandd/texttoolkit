// src/transformers/TextTransformer.js

import {
  validateNonEmptyString,
  isEmptyOrWhitespace,
  validateMaxLength,
  validateFunction,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'
import { InvalidTypeError } from '../utils/errors.js'

// Regex constants
const WORD_BOUNDARIES = /\s+/

/**
 * Word-level text transformation utilities with Unicode support.
 * @class TextTransformer
 */
export default class TextTransformer {
  /**
   * Creates a new TextTransformer instance.
   * @param {string} text Text to transform.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text.normalize('NFC')

    // Cache for expensive operations
    this._wordsCache = null
  }

  /**
   * Applies a transformation function to each word.
   * @param {Function} transformFn Function that takes a word and returns transformed word.
   * @returns {string} Text with transformation applied to each word.
   */
  transformWords(transformFn) {
    validateFunction(transformFn, 'transformFn')
    if (isEmptyOrWhitespace(this.text)) return ''

    return this.#getWords().map(transformFn).join(' ')
  }

  /**
   * Reverses the order of words while keeping each word intact.
   * @returns {string} Text with word order reversed.
   */
  reverseWordOrder() {
    if (isEmptyOrWhitespace(this.text)) return ''
    return this.#getWords().reverse().join(' ')
  }

  /**
   * Replaces all occurrences of a word with another word.
   * Uses word boundaries to avoid partial matches.
   * @param {string} oldWord Word to replace.
   * @param {string} newWord Replacement word.
   * @param {boolean} caseSensitive Whether replacement should be case-sensitive.
   * @returns {string} Text with words replaced.
   */
  replaceWord(oldWord, newWord, caseSensitive = true) {
    validateNonEmptyString(oldWord, 'oldWord')
    // Tillåt tom sträng för newWord (används av removeWords)
    if (typeof newWord !== 'string') throw new InvalidTypeError('newWord', 'a string')
    if (isEmptyOrWhitespace(this.text)) return ''

    const flags = caseSensitive ? 'gu' : 'gui'
    const escapedOldWord = this.#escapeRegexChars(oldWord)
    const regex = new RegExp(`\\b${escapedOldWord}\\b`, flags)

    return this.text.replace(regex, newWord)
  }

  /**
   * Removes all occurrences of specified words from the text.
   * @param {string[]} wordsToRemove Array of words to remove.
   * @param {boolean} caseSensitive Whether removal should be case-sensitive.
   * @returns {string} Text with specified words removed.
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
    // Clean up extra spaces
    return result.replace(/\s+/g, ' ').trim()
  }

  /**
   * Filters words based on a predicate function.
   * @param {Function} predicate Function that returns true for words to keep.
   * @returns {string} Text containing only words that pass the predicate.
   */
  filterWords(predicate) {
    validateFunction(predicate, 'predicate')
    if (isEmptyOrWhitespace(this.text)) return ''

    return this.#getWords().filter(predicate).join(' ')
  }

  /**
   * Transforms words based on their position (index).
   * @param {Function} transformFn Function that takes (word, index) and returns transformed word.
   * @returns {string} Text with position-based transformations applied.
   */
  transformWordsByPosition(transformFn) {
    validateFunction(transformFn, 'transformFn')
    if (isEmptyOrWhitespace(this.text)) return ''

    return this.#getWords()
      .map((word, index) => transformFn(word, index))
      .join(' ')
  }

  /**
   * Sorts words alphabetically while preserving their original casing.
   * @param {boolean} descending Whether to sort in descending order.
   * @returns {string} Text with words sorted alphabetically.
   */
  sortWords(descending = false) {
    if (isEmptyOrWhitespace(this.text)) return ''

    const words = this.#getWords()
    words.sort((a, b) => {
      const comparison = a.toLowerCase().localeCompare(b.toLowerCase())
      return descending ? -comparison : comparison
    })

    return words.join(' ')
  }

  /**
   * Shuffles the order of words randomly.
   * @returns {string} Text with words in random order.
   */
  shuffleWords() {
    if (isEmptyOrWhitespace(this.text)) return ''

    const words = [...this.#getWords()] // Create a copy

    // Fisher-Yates shuffle algorithm
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[words[i], words[j]] = [words[j], words[i]]
    }

    return words.join(' ')
  }

  // Private methods

  // The #isEmpty method has been removed and replaced with isEmptyOrWhitespace.

  /**
   * Gets words from text with caching and intelligent splitting.
   * @private
   * @returns {string[]} Array of words.
   */
  #getWords() {
    if (this._wordsCache === null) {
      this._wordsCache = this.text.trim().split(WORD_BOUNDARIES).filter(Boolean)
    }
    return this._wordsCache
  }

  /**
   * Escapes special regex characters in a string.
   * @private
   * @param {string} str String to escape.
   * @returns {string} Escaped string safe for regex.
   */
  #escapeRegexChars(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
}