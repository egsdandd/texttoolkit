// src/analyzers/TextAnalyzer.js

import {
  validateNonEmptyString,
  validateMaxLength, 
  validateBoolean,
  MAX_TEXT_LENGTH,
} from '../utils/inputValidation.js'

const WORD_REGEX = /\b[a-zA-ZåäöÅÄÖ]+\b/g // Hanterar svenska och engelska bokstäver

/**
 *
 */
export default class TextAnalyzer {
  /**
   * Creates an instance of TextAnalyzer.
   * @param {string} text The text to be analyzed.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  /**
   * Counts the number of words in the text.
   * @returns {number} The number of words found in the text.
   */
  countWords() {
    if (!this.text.trim()) return 0
    const words = this.text.match(WORD_REGEX)
    return words ? words.length : 0
  }

  /**
   * Counts the number of sentences in the text.
   * @returns {number} The number of sentences found in the text.
   */
  countSentences() {
    if (!this.text.trim()) return 0
    const sentences = this.text.match(/[\wåäöÅÄÖ\s,;:"'’\-–—]+\s*([.!?]|(\.\.\.))(\s|$)/g)
    return sentences ? sentences.length : 0
  }

  /**
   * Counts the number of characters in the text.
   * @param {boolean} includeSpaces Whether to include spaces in the character count.
   * @returns {number} The number of characters in the text.
   */
  countCharacters(includeSpaces = true) {
    if (!this.text.trim()) return 0
    validateBoolean(includeSpaces, 'includeSpaces')
    return includeSpaces
      ? this.text.length
      : this.text.replace(/\s/g, '').length
  }

  /**
   * Calculates the frequency of each letter (a-z, å, ä, ö) in the text, case-insensitive.
   * @returns {object} An object where keys are letters and values are their frequency count.
   */
  letterFrequency() {
    if (!this.text.trim()) return {}
    const freq = {}
    for (const char of this.text.toLowerCase()) {
      if (/[a-zåäö]/.test(char)) {
        freq[char] = (freq[char] || 0) + 1
      }
    }
    return freq
  }

  /**
   * Finds all unique palindromic words (length > 1) in the text, case-insensitive.
   * @returns {string[]} An array of unique palindromic words found in the text.
   */
  findPalindromes() {
    if (!this.text.trim()) return []
    const words = this.text.toLowerCase().match(WORD_REGEX) || []
    const palindromes = new Set()
    for (const word of words) {
      if (
        word.length > 1 &&
        word === word.split('').reverse().join('')
      ) {
        palindromes.add(word)
      }
    }
    return Array.from(palindromes)
  }
}
