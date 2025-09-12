// src/analyzers/TextAnalyzer.js

export default class TextAnalyzer {
  constructor(text) {
    this.text = typeof text === 'string' ? text : ''
  }

  countWords() {
    // Räkna antal ord genom att splitta på whitespace, ignorera tomma strängar
    const words = this.text.trim().match(/\b\w+\b/g)
    return words ? words.length : 0
  }

  countSentences() {
    // En enkel men robust meningräknare (för svenska och engelska meningsavslut)
    const sentences = this.text.match(/[\w\s,;:"'’\-–—]+\s*([.!?]|(\.\.\.))(\s|$)/g)
    return sentences ? sentences.length : 0
  }

  countCharacters(includeSpaces = true) {
    // Räkna tecken, med eller utan mellanslag
    return includeSpaces 
      ? this.text.length
      : this.text.replace(/\s/g, '').length
  }

  letterFrequency() {
    // Returnera ett objekt: { a: 4, b: 2, ... }
    const freq = {}
    for (const char of this.text.toLowerCase()) {
      if (/[a-zåäö]/i.test(char)) {
        freq[char] = (freq[char] || 0) + 1
      }
    }
    return freq
  }

  findPalindromes() {
    // Hitta unika palindromord i texten
    const words = this.text.toLowerCase().match(/\b\w+\b/g) || []
    const palindromes = new Set()
    for (const word of words) {
      if (word.length > 1 && word === word.split('').reverse().join('')) {
        palindromes.add(word)
      }
    }
    return Array.from(palindromes)
  }
}
