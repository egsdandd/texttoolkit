import TextTransformer from '../../src/transformers/TextTransformer.js'
import { InvalidTypeError, EmptyStringError } from '../../src/utils/errors.js'

describe('TextTransformer', () => {
  const sample = 'Anna och Otto paddlar kajak'
  let transformer

  beforeEach(() => {
    transformer = new TextTransformer(sample)
  })

  test('constructor accepterar giltig text', () => {
    expect(() => new TextTransformer('Hej')).not.toThrow()
  })

  test('constructor kastar fel vid tom eller ogiltig text', () => {
    expect(() => new TextTransformer('')).toThrow(EmptyStringError)
    expect(() => new TextTransformer('   ')).toThrow(EmptyStringError)
    expect(() => new TextTransformer()).toThrow(InvalidTypeError)
    expect(() => new TextTransformer(null)).toThrow(InvalidTypeError)
  })

  test('transformWords vänder varje ord med callback', () => {
    const reversed = transformer.transformWords(word => word.split('').reverse().join(''))
    expect(reversed).toBe('annA hco ottO ralddap kajak')
  })

  test('transformWords kräver funktion, annars fel', () => {
    expect(() => transformer.transformWords('inteEnFunktion')).toThrow(InvalidTypeError)
    expect(() => transformer.transformWords(42)).toThrow(InvalidTypeError)
    expect(() => transformer.transformWords()).toThrow(InvalidTypeError)
  })

  test('reverseWordOrder vänder ordningen på orden', () => {
    expect(transformer.reverseWordOrder()).toBe('kajak paddlar Otto och Anna')
  })

  test('replaceWord byter ut alla exakt matchande ord', () => {
    expect(transformer.replaceWord('paddlar', 'seglar')).toBe('Anna och Otto seglar kajak')
    expect(transformer.replaceWord('Anna', 'Eva')).toBe('Eva och Otto paddlar kajak')
  })

  test('replaceWord kräver icke-tomt oldWord och giltiga argument', () => {
    expect(() => transformer.replaceWord('', 'nytt')).toThrow(EmptyStringError)
    expect(() => transformer.replaceWord()).toThrow(InvalidTypeError)
    expect(() => transformer.replaceWord(null, 'x')).toThrow(InvalidTypeError)
    expect(() => transformer.replaceWord('x', null)).toThrow(InvalidTypeError)
    // Tom sträng som newWord är tillåtet
    expect(() => transformer.replaceWord('gammalt', '')).not.toThrow()
  })

  test('tom text i metoder ger alltid tom sträng', () => {
    const emptyTransformer = new TextTransformer('Test')
    emptyTransformer.text = '     '
    expect(emptyTransformer.transformWords(word => word)).toBe('')
    expect(emptyTransformer.reverseWordOrder()).toBe('')
    expect(emptyTransformer.replaceWord('Anna', 'Eva')).toBe('')
  })
})
