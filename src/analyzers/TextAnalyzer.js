// src/analyzers/TextAnalyzer.js
import { isNonEmptyString, MAX_TEXT_LENGTH } from '../utils/inputValidation.js';

export default class TextAnalyzer {
  constructor(text) {
    // Typkontroll, whitespace-only och maxlängd
    if (typeof text !== 'string' || text.trim().length === 0) {
      this.text = '';
    } else if (text.length > MAX_TEXT_LENGTH) {
      throw new Error(`Texten är för lång för analys (max ${MAX_TEXT_LENGTH} tecken).`);
    } else {
      this.text = text;
    }
  }

  countWords() {
    if (!isNonEmptyString(this.text)) return 0;
    // Valfritt: ignorera text med ogiltiga tecken som siffror, specialsymboler eller emoji
    // if (/[^a-zA-ZåäöÅÄÖ\s.,!?]/.test(this.text)) return 0;
    const words = this.text.trim().match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  countSentences() {
    if (!isNonEmptyString(this.text)) return 0;
    const sentences = this.text.match(/[\w\s,;:"'’\-–—]+\s*([.!?]|(\.\.\.))(\s|$)/g);
    return sentences ? sentences.length : 0;
  }

  countCharacters(includeSpaces = true) {
    if (!isNonEmptyString(this.text)) return 0;
    if (typeof includeSpaces !== 'boolean') throw new TypeError('Argumentet till countCharacters måste vara boolean.');
    return includeSpaces
      ? this.text.length
      : this.text.replace(/\s/g, '').length;
  }

  letterFrequency() {
    if (!isNonEmptyString(this.text)) return {};
    // Valfritt: ignorera ovanliga tecken, men räkna svenska bokstäver
    const freq = {};
    for (const char of this.text.toLowerCase()) {
      if (/[a-zåäö]/i.test(char)) {
        freq[char] = (freq[char] || 0) + 1;
      }
    }
    return freq;
  }

  findPalindromes() {
    if (!isNonEmptyString(this.text)) return [];
    const words = this.text.toLowerCase().match(/\b\w+\b/g) || [];
    const palindromes = new Set();
    for (const word of words) {
      // Endast ord med bokstäver, inga siffror/symboler, och minst två tecken
      if (
        word.length > 1 &&
        /^[a-zåäö]+$/i.test(word) &&
        word === word.split('').reverse().join('')
      ) {
        palindromes.add(word);
      }
    }
    return Array.from(palindromes);
  }
}
