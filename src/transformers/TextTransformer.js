/**
 * TextTransformer: transforms words and text in various ways.
 * @module transformers/TextTransformer
 */
// src/transformers/TextTransformer.js

import {
  validateNonEmptyString,
  validateMaxLength,
  validateFunction,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'

/**
 * Class for performing word-level transformations on text.
 */
export default class TextTransformer {
  /**
   * Creates a new TextTransformer.
   * @param {string} text - The text to be transformed.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  /**
   * Applies a transformation function to each word in the text.
   * @param {function(string):string} transformFn - Function that transforms a word.
   * @returns {string} The transformed text.
   * @throws {TypeError} If transformFn is not a function.
   */
  transformWords(transformFn) {
    validateFunction(transformFn, 'transformFn')
    // If the text is empty, return an empty string (early exit)
    if (!this.text.trim()) return ''
    return this.text
      .split(' ')
      .map(transformFn)
      .join(' ')
  }

  /**
   * Reverses the order of words in the text.
   * @returns {string} Text with the word order reversed.
   */
  reverseWordOrder() {
    if (!this.text.trim()) return ''
    return this.text.split(' ').reverse().join(' ')
  }

  /**
   * Replaces all occurrences of a word with a new word.
   * @param {string} oldWord - The word to be replaced.
   * @param {string} newWord - The replacement word.
   * @returns {string} Text where all occurrences of oldWord are replaced with newWord.
   * @throws {TypeError} If oldWord or newWord are not non-empty strings.
   */
  replaceWord(oldWord, newWord) {
    validateNonEmptyString(oldWord, 'oldWord')
    validateNonEmptyString(newWord, 'newWord')
    if (!this.text.trim()) return ''
    // Word boundary regex, case-sensitive match
    const pattern = new RegExp(`\\b${oldWord}\\b`, 'g')
    return this.text.replace(pattern, newWord)
  }
}
