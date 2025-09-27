// src/index.js
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

// Export main class as default, others as named exports
export default TextDocument

export {
  TextAnalyzer,
  TextFormatter,
  TextSearcher,
  TextTransformer,
  TextReverser
}
