// src/formatters/TextReverser.js

export default class TextReverser {
  constructor(text) {
    this.text = typeof text === 'string' ? text : '';
  }

  reverse() {
    return this.text.split('').reverse().join('');
  }

  // Extra: reversera varje ord separat (valfritt)
  reverseWordsIndividually() {
    return this.text
      .split(' ')
      .map(word => word.split('').reverse().join(''))
      .join(' ');
  }
}
