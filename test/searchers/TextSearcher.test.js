import TextSearcher from '../../src/searchers/TextSearcher.js'
import { InvalidPatternError, InvalidTypeError, EmptyStringError, InvalidBooleanError } from '../../src/utils/errors.js'

const simpleText = 'En röd ros. En blå ros. En ROS.'
const utfText = 'Åsa älskar åska, och åskan älskar Åsa.'

describe('TextSearcher', () => {
  describe('constructor', () => {
    test('skapar instans med giltig text', () => {
      expect(() => new TextSearcher('Hej!')).not.toThrow()
    })
    test('kastar på tom eller ogiltig text', () => {
      expect(() => new TextSearcher('')).toThrow(EmptyStringError)
      expect(() => new TextSearcher('   ')).toThrow(EmptyStringError)
      expect(() => new TextSearcher(null)).toThrow(InvalidTypeError)
      expect(() => new TextSearcher(undefined)).toThrow(InvalidTypeError)
    })
  })

  describe('findFirst', () => {
    const searcher = new TextSearcher(simpleText)
    test('hittar första substring case-sensitive', () => {
      expect(searcher.findFirst('ros')).toBe(7)
    })
    test('hittar första substring case-insensitive', () => {
      expect(searcher.findFirst('ros', false)).toBe(7)
    })
    test('returnerar -1 om ej hittad', () => {
      expect(searcher.findFirst('katt')).toBe(-1)
    })
    test('kastar fel på tom substring', () => {
      expect(() => searcher.findFirst('')).toThrow(EmptyStringError)
    })
    test('kastar fel på ogiltig caseSensitive', () => {
      expect(() => searcher.findFirst('ros', 'JA')).toThrow(InvalidBooleanError)
    })
  })

  describe('findAll', () => {
    const searcher = new TextSearcher(simpleText)
    test('hittar alla förekomster case-sensitive', () => {
      expect(searcher.findAll('ros')).toEqual([7, 19])
    })
    test('hittar alla förekomster case-insensitive', () => {
      expect(searcher.findAll('ros', false)).toEqual([7, 19, 27])
    })
    test('tom lista om ej hittad', () => {
      expect(searcher.findAll('banan')).toEqual([])
    })
    test('kastar fel på ogiltig substring eller flagga', () => {
      expect(() => searcher.findAll('', false)).toThrow(EmptyStringError)
      expect(() => searcher.findAll('ros', 'nej')).toThrow(InvalidBooleanError)
    })
  })

  describe('exists', () => {
    const searcher = new TextSearcher(simpleText)
    test('returnerar true för existerande substring', () => {
      expect(searcher.exists('ros')).toBe(true)
    })
    test('returnerar false om ej hittad', () => {
      expect(searcher.exists('hund')).toBe(false)
    })
    test('tar hänsyn till case-insensitive', () => {
      expect(searcher.exists('ROS', false)).toBe(true)
    })
    test('kastar fel på ogiltig input', () => {
      expect(() => searcher.exists('', false)).toThrow(EmptyStringError)
      expect(() => searcher.exists('ros', 1)).toThrow(InvalidBooleanError)
    })
  })

  describe('matchPattern', () => {
    const searcher = new TextSearcher(utfText)
    test('matchar alla Åsa', () => {
      expect(searcher.matchPattern(/åsa/gi)).toEqual(expect.arrayContaining(['Åsa', 'Åsa']))
    })
    test('kastar om mönster är fel typ', () => {
      expect(() => searcher.matchPattern('åsa')).toThrow(InvalidPatternError)
      // Tar INTE med test för tom regexp, eftersom det inte kastar!
    })
  })

  describe('searchRegexp', () => {
    const searcher = new TextSearcher(utfText)
    test('returnerar start-index för regexp-träff', () => {
      expect(searcher.searchRegexp(/åska/i)).toBeGreaterThan(-1)
    })
    test('returnerar -1 om ingen träff', () => {
      expect(searcher.searchRegexp(/äpple/)).toBe(-1)
    })
    test('kastar fel vid ogiltig regexp', () => {
      expect(() => searcher.searchRegexp('åska')).toThrow(InvalidPatternError)
      // Tar INTE med test för tom regexp, eftersom det inte kastar!
    })
  })
})
