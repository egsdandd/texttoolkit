// src/formatters/TextReverser.js

/** @module formatters/TextReverser
 * Innehåller klassen TextReverser för att vända text på olika sätt.
 */
import {
  validateNonEmptyString,
  validateMaxLength,
  validateBoolean,
  validatePositiveInteger,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'

import {
  InvalidBooleanError,
  EmptyStringError,
  TooLongError,
  InvalidTypeError
} from '../utils/errors.js'

/** Klass för att vända text på olika sätt.
  * @throws {EmptyStringError} Om text är tom eller bara whitespace.
  * @throws {TooLongError} Om text är längre än MAX_TEXT_LENGTH.
  * @throws {InvalidTypeError} Om minLength inte är ett positivt heltal.
  * @throws {InvalidBooleanError} Om ignoreCase inte är boolean.
  * 
 */
export default class TextReverser {
  /**
   *
   * @param text
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  // Vänd hela texten
  /**
   *
   */
  reverse() {
    if (!this.text.trim()) return ''
    return this.text.split('').reverse().join('')
  }

  // Vänd varje ord för sig (men behåll ordningsföljd)
  /**
   *
   */
  reverseWordsIndividually() {
    if (!this.text.trim()) return ''
    return this.text
      .split(' ')
      .map(word => word.split('').reverse().join(''))
      .join(' ')
  }

  // Vänd ordningen på alla ord (men behåll varje ord intakt)
  /**
   *
   */
  reverseWordOrder() {
    if (!this.text.trim()) return ''
    return this.text.split(' ').reverse().join(' ')
  }

  // Vänd radordningen om texten innehåller radbrytningar
  /**
   *
   */
  reverseLines() {
    if (!this.text.trim()) return ''
    return this.text.split('\n').reverse().join('\n')
  }

  // Vänd endast ord som är längre än minLength tecken
  /**
   *
   * @param minLength
   */
  reverseLongWords(minLength = 4) {
    if (!this.text.trim()) return ''
    if (!Number.isInteger(minLength) || minLength < 1) throw new InvalidTypeError('minLength', 'ett heltal större än 0')
    return this.text
      .split(' ')
      .map(word =>
        word.length >= minLength ? word.split('').reverse().join('') : word
      )
      .join(' ')
  }

  // Reversera varje mening (delar på punkt, utropstecken, frågetecken)
  /**
   *
   */
  reverseEachSentence() {
    if (!this.text.trim()) return ''
    return this.text.split(/([.!?])/)
      .map(part => /[.!?]/.test(part) ? part : part.trim().split('').reverse().join(''))
      .join('')
  }

  // Kontrollera om hela texten är ett palindrom
  /**
   *
   * @param ignoreCase
   */
  isPalindrome(ignoreCase = true) {
    validateBoolean(ignoreCase, 'ignoreCase')
    if (!this.text.trim()) return false
    const plain = ignoreCase ? this.text.toLowerCase() : this.text
    return plain === plain.split('').reverse().join('')
  }

  // Reverse och gör första bokstaven i varje reverserat ord till versal
  /**
   *
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
