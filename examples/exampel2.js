// exempel2.js
import fs from 'fs'
import TextDocument from '../src/TextDocument.js' // Justera importvägen vid behov

// Hämta filnamn från kommandoraden: node exempel2.js README.md
const filename = process.argv[2]

if (!filename) {
    console.error('Ange ett filnamn som första argument, t.ex: node exempel2.js README.md')
    process.exit(1)
}

try {
    const text = fs.readFileSync(filename, 'utf8')
    const doc = new TextDocument(text)

    console.log('Fil:', filename)
    console.log('Antal ord:', doc.countWords())
    console.log('Antal meningar:', doc.countSentences())
    console.log('Antal tecken (inkl. mellanslag):', doc.countCharacters())
    console.log('Antal tecken (utan mellanslag):', doc.countCharacters(false))
    console.log('Bokstavsfrekvens:', doc.letterFrequency())
    console.log('Palindrom i texten:', doc.findPalindromes())
    console.log('Versaler:', doc.toUpperCase().slice(0, 100) + '...')
    console.log('Gemener:', doc.toLowerCase().slice(0, 100) + '...')
    console.log('Capitalize:', doc.capitalizeWords().slice(0, 100) + '...')
    console.log('camelCase:', doc.toCamelCase())
    console.log('snake_case:', doc.toSnakeCase())
    console.log('Trim:', doc.trimWhitespace().slice(0, 100) + '...')
    console.log('Reverserad text:', doc.reverseText().slice(0, 100) + '...')
    console.log('Finn första "README":', doc.findFirst('README'))
    console.log('Alla "markdown":', doc.findAll('markdown'))
    console.log('Finns "code"?', doc.exists('code'))
    console.log('Regexträff (alla ord med minst 10 bokstäver):', doc.matchPattern(/\b[a-zA-ZåäöÅÄÖ]{10,}\b/g))
    console.log('Första index för "#":', doc.searchRegexp(/#/))
    console.log('Transformerad text (vänd varje ord, max 100):', doc.transformText(word => word.split('').reverse().join('')).slice(0, 100) + '...')
    console.log('Ordningen på orden omkastad:', doc.reverseWordOrder().slice(0, 100) + '...')
    // Example på replaceWord: byt ut "markdown" mot "MD"
    const oldWord = 'markdown'
    const newWord = 'MD'
    // ...tidigare kod...

    if (doc.exists(oldWord)) {
        console.log(`Ordet "${oldWord}" hittades!`)
        const allIdx = doc.findAll(oldWord)
        const replacedText = doc.replaceWord(oldWord, newWord)

        // Gör ett "snabbklipp" runt den första träffen i nya texten
        const pos = replacedText.indexOf(newWord)
        const start = Math.max(0, pos - 50)
        const end = Math.min(replacedText.length, pos + newWord.length + 50)
        const clip = replacedText.slice(start, end)

        console.log('Alla positioner:', allIdx)
        console.log(`Förhandsvisning runt första byte:\n...${clip}...`)
    } else {
        console.log(`Ordet "${oldWord}" hittades inte i filen.`)
    }


    // Sök och byt ut ett ord som INTE finns
    const missingWord = 'surdegsgurka'
    if (doc.exists(missingWord)) {
        console.log(`Ordet "${missingWord}" hittades – det var oväntat!`)
        console.log('Text efter byte:', doc.replaceWord(missingWord, 'BLIXT').slice(0, 200) + '...')
    } else {
        console.log(`Ordet "${missingWord}" hittades inte i filen!`)
    }


    // console.log('Exempel på replaceWord:', doc.replaceWord('markdown', 'MD').slice(0, 100) + '...')
} catch (err) {
    console.error(`Fel vid läsning av fil ${filename}:`, err.message)
    process.exit(1)
}
