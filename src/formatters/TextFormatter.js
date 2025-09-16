// src/formatters/TextFormatter.js
import { isNonEmptyString, MAX_TEXT_LENGTH } from '../utils/inputValidation.js';

export default class TextFormatter {
  constructor(text) {
    if (typeof text !== 'string' || text.trim().length === 0) {
      this.text = '';
    } else if (text.length > MAX_TEXT_LENGTH) {
      throw new Error(`Texten är för lång för formattering (max ${MAX_TEXT_LENGTH} tecken).`);
    } else {
      this.text = text;
    }
  }

  toUpperCase() {
    if (!isNonEmptyString(this.text)) return '';
    return this.text.toUpperCase();
  }

  toLowerCase() {
    if (!isNonEmptyString(this.text)) return '';
    return this.text.toLowerCase();
  }

  capitalizeWords() {
    if (!isNonEmptyString(this.text)) return '';
    return this.text.replace(/\b\w/g, char => char.toUpperCase());
  }

  toCamelCase() {
    if (!isNonEmptyString(this.text)) return '';
    const words = this.text
      .toLowerCase()
      .replace(/[_\-]+/g, ' ')
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(Boolean);
    if (words.length === 0) return '';
    return (
      words[0] +
      words
        .slice(1)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    );
  }

  toSnakeCase() {
    if (!isNonEmptyString(this.text)) return '';
    return this.text
      .toLowerCase()
      .replace(/[\s\-]+/g, '_')
      .replace(/[^\w_]/g, '');
  }

  trimWhitespace() {
    if (typeof this.text !== 'string') return '';
    return this.text.trim();
  }

  // Lägg till fler formatteringsfunktioner med kontroller här...
}
