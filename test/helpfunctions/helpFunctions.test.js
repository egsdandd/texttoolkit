import TextAnalyzer from '../../src/analyzers/TextAnalyzer.js'

test('TextAnalyzer kastar på tom och whitespace-sträng', () => {
  expect(() => new TextAnalyzer('')).toThrow('Text must not be empty')
  expect(() => new TextAnalyzer('   ')).toThrow('Text must not be empty')
  expect(() => new TextAnalyzer('\n \t')).toThrow('Text must not be empty')
})

// Testar att konstruktorn kastar fel på tom eller whitespace-sträng
test('TextAnalyzer kastar på tom sträng', () => {
  expect(() => new TextAnalyzer('')).toThrow('Text must not be empty')
  expect(() => new TextAnalyzer('   ')).toThrow('Text must not be empty')
  expect(() => new TextAnalyzer('\n \t')).toThrow('Text must not be empty')
})

test('extractWords hanterar svenska och engelska ord', () => {
  const analyzer = new TextAnalyzer('hej Hello å ä ö')
  expect(analyzer.countWords()).toBe(5)
  // resultaträkning signalerar om extractWords funkar för svenska tecken
})

test('normalizeText gör texten till små bokstäver', () => {
  const analyzer = new TextAnalyzer('HeJ Test')
  // letterFrequency är beroende av normalizeText
  expect(analyzer.letterFrequency().h).toBe(1)
  expect(analyzer.letterFrequency().e).toBe(2)
  expect(analyzer.letterFrequency().j).toBe(1)
  expect(analyzer.letterFrequency().t).toBe(2)
  // Bokstäverna ska vara lowercase i resultatet
})

test('countOccurrences summerar bokstäver korrekt', () => {
  const analyzer = new TextAnalyzer('Test test')
  expect(analyzer.letterFrequency()).toEqual({ t: 4, e: 2, s: 2 })
})

test('findPalindromes hittar palindrom', () => {
  const analyzer = new TextAnalyzer('Anna bob Eva Otto')
  expect(analyzer.findPalindromes().sort()).toEqual(['anna', 'bob', 'otto'].sort())
})


test('countWords räknar ord korrekt', () => {
  const analyzer = new TextAnalyzer('Hello, world! This is a test.')
  expect(analyzer.countWords()).toBe(6)
})

test('findPalindromes ignorerar 1-teckensord', () => {
  const analyzer = new TextAnalyzer('a b c')
  expect(analyzer.findPalindromes()).toEqual([])
})

test('findPalindromes ignorerar icke-palindrom', () => {
  const analyzer = new TextAnalyzer('hello world')
  expect(analyzer.findPalindromes()).toEqual([])
})

// --- FJÄRNA: Dessa tester är ej tillåtna om konstruktorn kastar fel! ---
// test('findPalindromes hanterar tom sträng', () => {
//   const analyzer = new TextAnalyzer('')
//   expect(analyzer.findPalindromes()).toEqual([])
// })
// test('findPalindromes hanterar whitespace sträng', () => {
//   const analyzer = new TextAnalyzer('   ')
//   expect(analyzer.findPalindromes()).toEqual([])
// })
// ---------------------------------------------------------------

