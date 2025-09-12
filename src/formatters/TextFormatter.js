// src/formatters/TextFormatter.js

export default class TextFormatter {
  constructor(text) {
    this.text = typeof text === 'string' ? text : ''
  }

  toUpperCase() {
    return this.text.toUpperCase()
  }

  toLowerCase() {
    return this.text.toLowerCase()
  }

  capitalizeWords() {
    // Gör första bokstaven i varje ord versal
    return this.text.replace(/\b\w/g, char => char.toUpperCase())
  }

  toCamelCase() {
    // Konvertera sträng till camelCase
    const words = this.text
      .toLowerCase()
      .replace(/[_\-]+/g, ' ')
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(Boolean)
    if (words.length === 0) return ''
    return words + words
      .slice(1)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }

  toSnakeCase() {
    // Konvertera sträng till snake_case
    return this.text
      .toLowerCase()
      .replace(/[\s\-]+/g, '_')
      .replace(/[^\w_]/g, '')
  }

  trimWhitespace() {
    // Ta bort överflödigt whitespace runt texten
    return this.text.trim()
  }

  // Lägg till fler formatteringsfunktioner efter behov...
}
