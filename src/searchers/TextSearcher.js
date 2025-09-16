// src/searchers/TextSearcher.js
import { isNonEmptyString, MAX_TEXT_LENGTH } from '../utils/inputValidation.js';

const MAX_SUBSTRING_LENGTH = 1000;
const MAX_REGEX_SOURCE_LENGTH = 500;

export default class TextSearcher {
  constructor(text) {
    if (!isNonEmptyString(text) || !text.trim()) {
      this.text = '';
    } else if (text.length > MAX_TEXT_LENGTH) {
      throw new RangeError(`Texten är för lång för sökning (max ${MAX_TEXT_LENGTH} tecken).`);
    } else {
      this.text = text.normalize('NFC');
    }
  }

  findFirst(substring, caseSensitive = true) {
    if (!isNonEmptyString(this.text)) return -1;
    if (!isNonEmptyString(substring) || !substring.trim()) return -1;
    if (substring.length > MAX_SUBSTRING_LENGTH) throw new RangeError('Substring är för lång.');
    if (substring.length > this.text.length) return -1;
    if (typeof caseSensitive !== 'boolean') return -1;

    const searchText = caseSensitive ? this.text : this.text.toLowerCase();
    const searchSub = caseSensitive ? substring : substring.toLowerCase();
    return searchText.indexOf(searchSub);
  }

  findAll(substring, caseSensitive = true) {
    if (!isNonEmptyString(this.text)) return [];
    if (!isNonEmptyString(substring) || !substring.trim()) return [];
    if (substring.length > MAX_SUBSTRING_LENGTH) throw new RangeError('Substring är för lång.');
    if (substring.length > this.text.length) return [];
    if (typeof caseSensitive !== 'boolean') return [];

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
    if (!isNonEmptyString(this.text)) return false;
    if (!isNonEmptyString(substring) || !substring.trim()) return false;
    if (typeof caseSensitive !== 'boolean') return false;
    return this.findFirst(substring, caseSensitive) !== -1;
  }

  matchPattern(pattern) {
    if (!isNonEmptyString(this.text)) return [];
    if (!(pattern instanceof RegExp)) return [];
    if (pattern.source === '' || pattern.source.length > MAX_REGEX_SOURCE_LENGTH) return [];
    return this.text.match(pattern) || [];
  }

  searchRegexp(regexp) {
    if (!isNonEmptyString(this.text)) return -1;
    if (!(regexp instanceof RegExp)) return -1;
    if (regexp.source === '' || regexp.source.length > MAX_REGEX_SOURCE_LENGTH) return -1;
    return this.text.search(regexp);
  }
}
