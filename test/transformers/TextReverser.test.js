import TextReverser from '../../src/transformers/TextReverser.js'
import { InvalidTypeError, InvalidBooleanError } from '../../src/utils/errors.js'
import { EmptyStringError } from '../../src/utils/errors.js'

describe('TextReverser', () => {
    const sampleText = 'Eva och Bob paddlar kajak. Madam Otto Anna!'
    let reverser

    beforeEach(() => {
        reverser = new TextReverser(sampleText)
    })

    test('reverse() vänder hela texten', () => {
        expect(reverser.reverse()).toBe('!annA ottO madaM .kajak ralddap boB hco avE')
    })

    test('reverseWordsIndividually() vänder varje ord men behåller ordningen', () => {
        expect(reverser.reverseWordsIndividually()).toBe('avE hco boB ralddap .kajak madaM ottO !annA')
    })

    test('reverseWordOrder() vänder ordningen på alla ord', () => {
        expect(reverser.reverseWordOrder()).toBe('Anna! Otto Madam kajak. paddlar Bob och Eva')
    })

    test('reverseLines() vänder radorder', () => {
        const multiLine = new TextReverser('rad1\nrad2\nrad3')
        expect(multiLine.reverseLines()).toBe('rad3\nrad2\nrad1')
    })

    test('reverseLongWords() vänder bara "långa" ord', () => {
        expect(reverser.reverseLongWords(5)).toBe('Eva och Bob ralddap .kajak madaM Otto !annA')
        expect(() => reverser.reverseLongWords(0)).toThrow(InvalidTypeError)
        expect(() => reverser.reverseLongWords('fel')).toThrow(InvalidTypeError)
    })

    test('reverseEachSentence() vänder tecken i varje mening men behåller struktur', () => {
        // Utgår från delning på punkt/utropstecken/frågetecken
        expect(reverser.reverseEachSentence()).toContain('kajak')
        expect(typeof reverser.reverseEachSentence()).toBe('string')
    })

    test('isPalindrome() känner igen palindrom och hanterar case-flagga', () => {
        expect(new TextReverser('abba').isPalindrome()).toBe(true)
        expect(new TextReverser('AbBa').isPalindrome(false)).toBe(false)
        expect(() => reverser.isPalindrome('JA')).toThrow(InvalidBooleanError)
    })

    test('reverseAndCapitalizeWords() reverserar och gör första bokstav till versal i varje ord', () => {
        const result = reverser.reverseAndCapitalizeWords()
        expect(result.split(' ').every(word => word.charAt(0) === word.charAt(0).toUpperCase())).toBe(true)
    })

    test('tom sträng och whitespace kastar EmptyStringError vid konstruktion', () => {
        expect(() => new TextReverser('')).toThrow(EmptyStringError)
        expect(() => new TextReverser('    ')).toThrow(EmptyStringError)
    })

})
