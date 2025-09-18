// src/formatters/TextReverser.js

/** @module formatters/TextReverser
 * Contains the TextReverser class for reversing text in various ways.
 */
import {
  validateNonEmptyString,
  validateMaxLength,
  validateBoolean,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'

import {
  InvalidTypeError
} from '../utils/errors.js'

/** Class for reversing text in various ways.
  * @throws {EmptyStringError} If text is empty or only whitespace.
  * @throws {TooLongError} If text exceeds MAX_TEXT_LENGTH.
  * @throws {InvalidTypeError} If minLength is not a positive integer.
  * @throws {InvalidBooleanError} If ignoreCase is not a boolean.
  * 
 */
export default class TextReverser {
  /**
   * Creates a new instance of TextReverser.
   * @param {string} text The text to be reversed.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  /**
   * Reverses the entire text.
   * @returns {string} The reversed text.
   */
  reverse() {
    if (!this.text.trim()) return ''
    return this.text.split('').reverse().join('')
  }

  /**
   * Reverses each word individually (keeps word order).
   * @returns {string} The text with each word reversed.
   */
  reverseWordsIndividually() {
    if (!this.text.trim()) return ''
    return this.text
      .split(' ')
      .map(word => word.split('').reverse().join(''))
      .join(' ')
  }

  /**
   * Reverses the order of all words (keeps each word intact).
   * @returns {string} The text with the word order reversed.
   */
  reverseWordOrder() {
    if (!this.text.trim()) return ''
    return this.text.split(' ').reverse().join(' ')
  }

  /**
   * Reverses the order of lines if the text contains line breaks.
   * @returns {string} The text with the line order reversed.
   */
  reverseLines() {
    if (!this.text.trim()) return ''
    return this.text.split('\n').reverse().join('\n')
  }

  /**
   * Reverses only words longer than minLength characters.
   * @returns {string} The text with words longer than minLength reversed.
   * @param {number} minLength - The minimum number of characters a word must have to be reversed.
   */
  reverseLongWords(minLength = 4) {
    if (!this.text.trim()) return ''
    if (!Number.isInteger(minLength) || minLength < 1) throw new InvalidTypeError('minLength', 'a positive integer greater than 0')
    return this.text
      .split(' ')
      .map(word =>
        word.length >= minLength ? word.split('').reverse().join('') : word
      )
      .join(' ')
  }

  /**
   * Reverses each sentence (splits on period, exclamation mark, question mark).
   * @returns {string} The text with each sentence reversed.
   */
  reverseEachSentence() {
    if (!this.text.trim()) return ''
    return this.text.split(/([.!?])/)
      .map(part => /[.!?]/.test(part) ? part : part.trim().split('').reverse().join(''))
      .join('')
  }

  /**
   * Checks if the entire text is a palindrome.
   * @returns {boolean} True if the text is a palindrome, otherwise false.
   * @param {boolean} ignoreCase - Whether to ignore case when checking for palindrome.
   */
  isPalindrome(ignoreCase = true) {
    validateBoolean(ignoreCase, 'ignoreCase')
    if (!this.text.trim()) return false
    const plain = ignoreCase ? this.text.toLowerCase() : this.text
    return plain === plain.split('').reverse().join('')
  }

  /**
   * Reverses each word individually (keeps word order) and capitalizes the first letter of each reversed word.
   * @returns {string} The text with each word reversed and the first letter of each word capitalized.
   */
  reverseAndCapitalizeWords() {
    if (!this.text.trim()) return ''
    return this.text.split(' ')
      .map(word => {
        const rev = word.split('').reverse().join('')
        return rev.charAt(0).toUpperCase() + rev.slice(1)
      })
      .join(' ')
  }

}
