// src/analyzers/TextAnalyzer.js

import {
  validateNonEmptyString,
  validateMaxLength, 
  validateBoolean,
  MAX_TEXT_LENGTH,
} from '../utils/inputValidation.js'

const WORD_REGEX = /\b[a-zA-ZåäöÅÄÖ]+\b/g // Handles swedish and english chars

/**
 * A class for analyzing text content, providing methods to count words, sentences,
 * characters, letter frequency, and find palindromes.
 * @class TextAnalyzer 
 * @example
 * const analyzer = new TextAnalyzer("Madam Arora teaches malayalam")
 * console.log(analyzer.countWords()) // Outputs: 4
 * console.log(analyzer.findPalindromes()) // Outputs: ['madam', 'arora', 'malayalam']
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
   * @returns {number} 
   */
  countWords() {
    if (this.#isEmpty()) return 0
    return this.#extractWords().length

  }

  /**
   * Counts the number of sentences in the text.
   * @returns {number} 
   */
  countSentences() {
    if (this.#isEmpty()) return 0
    const sentences = this.text.match(/[\wåäöÅÄÖ\s,;:"'’\-–—]+\s*([.!?]|(\.\.\.))(\s|$)/g)
    return sentences ? sentences.length : 0
  }

  /**
   * Counts the number of characters in the text.
   * @param {boolean} includeSpaces Whether to include spaces in the character count.
   * @returns {number}
   */
  countCharacters(includeSpaces = true) {
    if (this.#isEmpty()) return 0
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
    if (this.#isEmpty()) return {}
    const normText = this.#normalizeText()
    const filteredLetters = Array.from(normText).filter(c => /[a-zåäö]/.test(c))
    return this.#countOccurrences(filteredLetters)

  }

  /**
   * Finds all unique palindromic words (length > 1) in the text, case-insensitive.
   * @returns {string[]} An array of unique palindromic words found in the text.
   */
  findPalindromes() {
    if (this.#isEmpty()) return []
    const words = this.#extractWords()
    const palindromes = new Set()
    for (const word of words) {
      if (this.#isPalindrome(word)) {
        palindromes.add(word)
      }
    }
    return Array.from(palindromes)
  }
  /**
   * Checks if a given word is a palindrome (case-insensitive, length > 1).
   * @param {string} word The word to check for palindrome property.
   * @returns {boolean} True if the word is a palindrome, false otherwise.
   */
  #isPalindrome(word) {
    return word.length > 1 && word === word.split('').reverse().join('')
  }
  /**
   * Checks if the text is empty or contains only whitespace.
   * @returns {boolean} True if the text is empty or whitespace, false otherwise.
   */
  #isEmpty() {
  return !this.text.trim()
}
/*
#extractWords() {
  return this.text
    .toLowerCase()
    .match(WORD_REGEX) || []
}
*/
#extractWords() {
  return this.text
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, '')    // tar bort alla icke-bokstäver utom whitespace
    .split(/\s+/)
    .filter(Boolean)
}

#countOccurrences(items) {
  const counts = {}
  for (const item of items) {
    counts[item] = (counts[item] || 0) + 1
  }
  return counts
}

#normalizeText() {
  return this.text.toLowerCase()
}

}
