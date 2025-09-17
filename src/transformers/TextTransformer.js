/**
 * TextTransformer: transformerar ord och text på olika sätt.
 * @module transformers/TextTransformer
 */
// src/transformers/TextTransformer.js

import {
  validateNonEmptyString,
  validateMaxLength,
  validateFunction,
  MAX_TEXT_LENGTH
} from '../utils/inputValidation.js'

// import {InvalidTypeError, EmptyStringError} from '../utils/errors.js'

/**
 * Klass för att utföra transformationer på text på ordnivå.
 */
export default class TextTransformer {
  /**
   * Skapar en ny TextTransformer.
   * @param {string} text - Texten som ska transformerats.
   */
  constructor(text) {
    validateNonEmptyString(text, 'Text')
    validateMaxLength(text, MAX_TEXT_LENGTH, 'Text')
    this.text = text
  }

  /**
   * Applicerar en transformationsfunktion på varje ord i texten.
   * @param {function(string):string} transformFn - Funktion som transformerar ett ord.
   * @returns {string} Den transformerade texten.
   * @throws {TypeError} Om transformFn inte är en funktion.
   */
  transformWords(transformFn) {
    validateFunction(transformFn, 'transformFn')
    // Om texten är tom returnera tom sträng (tidig avbryt)
    if (!this.text.trim()) return ''
    return this.text
      .split(' ')
      .map(transformFn)
      .join(' ')
  }

  /**
   * Vänder ordningen på orden i texten.
   * @returns {string} Text med omvänd ordning på orden.
   */
  reverseWordOrder() {
    if (!this.text.trim()) return ''
    return this.text.split(' ').reverse().join(' ')
  }

  /**
   * Byter ut alla förekomster av ett ord mot ett nytt ord.
   * @param {string} oldWord - Ordet som ska bytas ut.
   * @param {string} newWord - Ersättningsordet.
   * @returns {string} Text där alla förekomster av oldWord är ersatta med newWord.
   * @throws {TypeError} Om oldWord eller newWord inte är icke-tomma strängar.
   */
  replaceWord(oldWord, newWord) {
    validateNonEmptyString(oldWord, 'oldWord')
    validateNonEmptyString(newWord, 'newWord')
    if (!this.text.trim()) return ''
    // Word boundary regex, case-sensitive byte
    const pattern = new RegExp(`\b${oldWord}\b`, 'g')
    return this.text.replace(pattern, newWord)
  }
}
