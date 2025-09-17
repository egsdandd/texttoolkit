// src/analyzers/TextAnalyzer.js

import {
  validateNonEmptyString,
  validateMaxLength, 
  validateBoolean,
  MAX_TEXT_LENGTH,
} from '../utils/inputValidation.js'

import {
  EmptyStringError,
  InvalidTypeError,
  InvalidBooleanError,
  TooLongError,
} from '../utils/errors.js'

const WORD_REGEX = /\b[a-zA-ZåäöÅÄÖ]+\b/g // Hanterar svenska och engelska bokstäver

export default class TextAnalyzer {
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  countWords() {
    if (!this.text.trim()) return 0
    const words = this.text.match(WORD_REGEX)
    return words ? words.length : 0
  }

  countSentences() {
    if (!this.text.trim()) return 0
    const sentences = this.text.match(/[\wåäöÅÄÖ\s,;:"'’\-–—]+\s*([.!?]|(\.\.\.))(\s|$)/g)
    return sentences ? sentences.length : 0
  }

  countCharacters(includeSpaces = true) {
    if (!this.text.trim()) return 0
    validateBoolean(includeSpaces, 'includeSpaces')
    return includeSpaces
      ? this.text.length
      : this.text.replace(/\s/g, '').length
  }

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
