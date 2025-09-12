// src/index.js
export default TextDocument

import TextDocument from './TextDocument.js'
import TextAnalyzer from './analyzers/TextAnalyzer.js'
import TextFormatter from './formatters/TextFormatter.js'
import TextSearcher from './searchers/TextSearcher.js'
import TextTransformer from './transformers/TextTransformer.js'

// Exportera alla relevanta klasser i ett samlat publik API
export {
  TextDocument,
  TextAnalyzer,
  TextFormatter,
  TextSearcher,
  TextTransformer
}
