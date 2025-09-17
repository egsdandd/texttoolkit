import { isNonEmptyString, isFunction } from '../utils/inputValidation.js'

export default class TextTransformer {
  constructor(text) {
    this.text = isNonEmptyString(text) ? text : ''
  }

  transformWords(transformFn) {
    if (!isFunction(transformFn)) throw new TypeError('transformFn måste vara en funktion.')
    if (!isNonEmptyString(this.text)) return ''
    return this.text
      .split(' ')
      .map(transformFn)
      .join(' ')
  }

  reverseWordOrder() {
    if (!isNonEmptyString(this.text)) return ''
    return this.text.split(' ').reverse().join(' ')
  }

  replaceWord(oldWord, newWord) {
    if (!isNonEmptyString(oldWord) || !isNonEmptyString(newWord)) {
      throw new TypeError('oldWord och newWord måste vara icke-tomma strängar.')
    }
    if (!isNonEmptyString(this.text)) return ''
    const pattern = new RegExp(`\\b${oldWord}\\b`, 'g')
    return this.text.replace(pattern, newWord)
  }
}
