import TextDocument from '../src/TextDocument.js'

const sampleText = 'Erik såg Otto och Anna paddla en kajak på ån. Madam, blev Eva av med Bob?'
//const words = sampleText.match(/\b[a-zA-ZåäöÅÄÖ]+\b/g);
//console.log(words);

describe('TextDocument', () => {
    let doc
    beforeEach(() => {
        doc = new TextDocument(sampleText)
    })

    test('getText() returnerar det ursprungliga värdet', () => {
        expect(doc.getText()).toBe(sampleText)
    })

    test('countWords() returnerar korrekt antal ord', () => {
        expect(doc.countWords()).toBe(16) // justera om din implementation räknar annorlunda
    })

    test('countSentences() återger antal satser', () => {
        expect(doc.countSentences()).toBe(2)
    })

    test('countCharacters() och countCharacters(false)', () => {
        expect(typeof doc.countCharacters()).toBe('number')
        expect(typeof doc.countCharacters(false)).toBe('number')
        expect(doc.countCharacters(false)).toBeLessThan(doc.countCharacters())
    })

    test('letterFrequency() returnerar ett objekt', () => {
        const freq = doc.letterFrequency()
        expect(typeof freq).toBe('object')
        expect(freq.a).toBeGreaterThan(0)
    })

    test('findPalindromes() hittar palindrom', () => {
        const pals = doc.findPalindromes()
        expect(Array.isArray(pals)).toBe(true)
        expect(pals).toEqual(expect.arrayContaining(['otto', 'anna', 'kajak', 'madam', 'bob']))
    })

    test('formatteringsmetoder fungerar', () => {
        expect(doc.toUpperCase()).toContain('ERIK SÅG OTTO')
        expect(doc.toLowerCase()).toContain('erik såg otto')
        expect(typeof doc.capitalizeWords()).toBe('string')
        expect(typeof doc.toCamelCase()).toBe('string')
        expect(typeof doc.toSnakeCase()).toBe('string')
        expect(typeof doc.trimWhitespace()).toBe('string')
    })

    test('toPascalCase returnerar PascalCase', () => {
        expect(doc.toPascalCase()).toBe('ErikSågOttoOchAnnaPaddlaEnKajakPåÅnMadamBlevEvaAvMedBob')
    })

    test('toKebabCase returnerar kebab-case', () => {
        expect(doc.toKebabCase()).toBe('erik-såg-otto-och-anna-paddla-en-kajak-på-ån-madam-blev-eva-av-med-bob')
    })

    test('reverseWordOrder() och reverseText() returnerar sträng', () => {
        expect(typeof doc.reverseWordOrder()).toBe('string')
        expect(typeof doc.reverseText()).toBe('string')
    })

    test('removeWords tar bort angivna ord', () => {
        const removed = doc.removeWords(['Otto', 'Anna', 'kajak'])
        expect(removed.includes('Otto')).toBe(false)
        expect(removed.includes('Anna')).toBe(false)
        expect(removed.includes('kajak')).toBe(false)
    })

    test('sortWords sorterar ord alfabetiskt', () => {
        const sorted = doc.sortWords()
        // Använd samma ordextraktion som i implementationen!
        const normalize = words => words.map(w => w.normalize('NFC'))
        const sortedWords = normalize(sorted.split(/\s+/)).sort()
        const expectedWords = normalize(
            doc.getText().match(/\p{L}+(?:-\p{L}+)?/gu) || []
        ).sort()
        expect(sortedWords).toEqual(expectedWords)
    })


test('shuffleWords returnerar en sträng med samma ord i annan ordning', () => {
    const shuffled = doc.shuffleWords()
    expect(typeof shuffled).toBe('string')
    // Använd identisk ordextraktion för båda
    const originalWords = doc.getText().match(/\p{L}+(?:-\p{L}+)?/gu) || []
    const shuffledWords = shuffled.split(/\s+/)
    expect(shuffledWords.sort()).toEqual(originalWords.sort())
})


    test('reverseLines vänder radordning', () => {
        const multiLineDoc = new TextDocument('rad1\nrad2\nrad3')
        expect(multiLineDoc.reverseLines()).toBe('rad3\nrad2\nrad1')
    })
    test('isPalindrome känner igen palindrom', () => {
        expect(new TextDocument('abba').isPalindrome()).toBe(true)
        expect(new TextDocument('AbBa').isPalindrome(false)).toBe(false)
    })
    test('getStats returnerar statistikobjekt', () => {
        const stats = doc.getStats()
        expect(stats).toHaveProperty('words')
        expect(stats).toHaveProperty('sentences')
        expect(stats).toHaveProperty('characters')
        expect(stats).toHaveProperty('charactersNoSpaces')
        expect(stats).toHaveProperty('isEmpty')
        expect(stats.words).toBe(doc.countWords())
    })

    test('replaceWord() byter ut ord korrekt', () => {
        const replaced = doc.replaceWord('Anna', 'Stina')
        expect(replaced.includes('Stina')).toBe(true)
    })

    test('transformText() fungerar med callback', () => {
        // eslint-disable-next-line no-unused-vars
        const res = doc.transformText(word => 'X')
        expect(typeof res).toBe('string')
    })

    test('findFirst(), findAll(), exists(), matchPattern(), searchRegexp()', () => {
        expect(doc.findFirst('Eva')).toBeGreaterThan(-1)
        expect(Array.isArray(doc.findAll('en'))).toBe(true)
        expect(typeof doc.exists('Bob')).toBe('boolean')
        const regexHits = doc.matchPattern(/\b[A-ZÅÄÖ][a-zåäö]+\b/g)
        expect(Array.isArray(regexHits)).toBe(true)
        expect(doc.searchRegexp(/\?/)).toBeGreaterThan(-1)
    })

    test('setText ändrar all underliggande struktur och resultat', () => {
        doc.setText('Aba BaB Bob')
        expect(doc.countWords()).toBe(3)
        expect(doc.findPalindromes()).toEqual(expect.arrayContaining(['aba', 'bab', 'bob']))
        expect(doc.letterFrequency().b).toBeGreaterThan(0)
        expect(doc.reverseWordOrder()).toContain('Bob')
    })
})
