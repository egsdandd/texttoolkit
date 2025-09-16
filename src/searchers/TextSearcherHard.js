// src/searchers/TextSearcher.js
import { isNonEmptyString, MAX_TEXT_LENGTH } from '../utils/inputValidation.js';

const MAX_SUBSTRING_LENGTH = 1000;
const MAX_REGEX_SOURCE_LENGTH = 500;

export default class TextSearcherHard {
  constructor(text) {
    if (!isNonEmptyString(text) || !text.trim()) {
      throw new TypeError('Text måste vara en icke-tom sträng.');
    }
    if (text.length > MAX_TEXT_LENGTH) {
      throw new RangeError(`Texten är för lång för sökning (max ${MAX_TEXT_LENGTH} tecken).`);
    }
    this.text = text.normalize('NFC');
  }

  findFirst(substring, caseSensitive = true) {
    if (!isNonEmptyString(substring) || !substring.trim()) {
      throw new TypeError('Substring måste vara en icke-tom sträng.');
    }
    if (substring.length > MAX_SUBSTRING_LENGTH) {
      throw new RangeError('Substring är för lång.');
    }
    if (typeof caseSensitive !== 'boolean') {
      throw new TypeError('caseSensitive måste vara boolean.');
    }

    const searchText = caseSensitive ? this.text : this.text.toLowerCase();
    const searchSub = caseSensitive ? substring : substring.toLowerCase();
    return searchText.indexOf(searchSub);
  }

  findAll(substring, caseSensitive = true) {
    if (!isNonEmptyString(substring) || !substring.trim()) {
      throw new TypeError('Substring måste vara en icke-tom sträng.');
    }
    if (substring.length > MAX_SUBSTRING_LENGTH) {
      throw new RangeError('Substring är för lång.');
    }
    if (typeof caseSensitive !== 'boolean') {
      throw new TypeError('caseSensitive måste vara boolean.');
    }

    const positions = [];
    const searchText = caseSensitive ? this.text : this.text.toLowerCase();
    const searchSub = caseSensitive ? substring : substring.toLowerCase();
    let pos = searchText.indexOf(searchSub);

    while (pos !== -1) {
      positions.push(pos);
      pos = searchText.indexOf(searchSub, pos + searchSub.length);
    }
    return positions;
  }

  exists(substring, caseSensitive = true) {
    if (!isNonEmptyString(substring) || !substring.trim()) {
      throw new TypeError('Substring måste vara en icke-tom sträng.');
    }
    if (typeof caseSensitive !== 'boolean') {
      throw new TypeError('caseSensitive måste vara boolean.');
    }
    return this.findFirst(substring, caseSensitive) !== -1;
  }

  matchPattern(pattern) {
    if (!(pattern instanceof RegExp)) {
      throw new TypeError('pattern måste vara en RegExp.');
    }
    if (pattern.source === '') {
      throw new Error('pattern får inte vara tom.');
    }
    if (pattern.source.length > MAX_REGEX_SOURCE_LENGTH) {
      throw new RangeError('pattern är för lång.');
    }
    return this.text.match(pattern) || [];
  }

  searchRegexp(regexp) {
    if (!(regexp instanceof RegExp)) {
      throw new TypeError('regexp måste vara en RegExp.');
    }
    if (regexp.source === '') {
      throw new Error('regexp får inte vara tom.');
    }
    if (regexp.source.length > MAX_REGEX_SOURCE_LENGTH) {
      throw new RangeError('regexp är för lång.');
    }
    return this.text.search(regexp);
  }
}
