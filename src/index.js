// src/index.js
export default TextDocument

/**
 * @author Dan-Håkan Davall <dd222mk@student.lnu.se>
 * @version 1.0.0
 * @license MIT
 */

import TextDocument from './TextDocument.js'
import TextAnalyzer from './analyzers/TextAnalyzer.js'
import TextFormatter from './formatters/TextFormatter.js'
import TextSearcher from './searchers/TextSearcher.js'
import TextTransformer from './transformers/TextTransformer.js'
import TextReverser from './transformers/TextReverser.js'

// Export all relevant classes in a unified public API

export {
  TextDocument,
  TextAnalyzer,
  TextFormatter,
  TextSearcher,
  TextTransformer,
  TextReverser
}
