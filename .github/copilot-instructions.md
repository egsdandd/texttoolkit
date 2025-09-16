# Copilot Instructions for texttoolkit

## Project Overview
- **texttoolkit** is a modular JavaScript toolkit for text analysis and transformation, designed for educational use (1DV610 assignment).
- The core API is exposed via `TextDocument` (see `src/TextDocument.js`), which composes and delegates to specialized modules for analysis, formatting, searching, and transformation.
- All modules are ES6 classes, and the project uses ECMAScript modules (`type: module` in `package.json`).

## Architecture & Key Components
- **src/TextDocument.js**: Main entry point. Wraps a text string and exposes high-level methods by delegating to:
  - `analyzers/TextAnalyzer.js`: Word, sentence, character counts, letter frequency, palindrome detection.
  - `formatters/TextFormatter.js`: Case conversion, capitalization, camelCase, snake_case, whitespace trimming.
  - `searchers/TextSearcher.js` and `transformers/TextTransformer.js`, `transformers/TextReverser.js`: (Extendable for searching and text transformation.)
- **src/index.js**: Aggregates and re-exports all main classes for external use.
- **examples/**: Usage examples (see `examples/exampel1.js`).
- **test/**: Simple test scripts for each module (run with Node, not Jest syntax).

## Developer Workflows
- **Linting**: Run `npm run lint` (uses ESLint with JSDoc rules, see `eslint.config.js`).
- **Lint autofix**: `npm run lint:fix`
- **Testing**: Run `npm test` (uses Jest, but tests are simple scripts using `console.log`).
- **Debugging**: Use Node.js to run example or test files directly for quick feedback.

## Project Conventions
- All source files are in `src/`, grouped by function (analyzers, formatters, etc.).
- Each class expects a string as input and exposes methods for specific text operations.
- JSDoc comments are required for public methods (enforced by ESLint).
- Swedish and English are both used in comments and variable names.
- Example/test files use direct imports with relative paths (adjust as needed).

## Integration & Extensibility
- To add new text operations, create a new class in the appropriate subfolder and compose it in `TextDocument`.
- Extend the public API by adding wrapper methods in `TextDocument`.
- All modules are designed for composition and delegation, not inheritance.

## Key Files
- `src/TextDocument.js` (composition/delegation pattern)
- `src/analyzers/TextAnalyzer.js`, `src/formatters/TextFormatter.js`
- `examples/exampel1.js` (usage pattern)
- `test/` (test scripts)
- `eslint.config.js` (linting rules)

## Example Usage
```js
import TextDocument from './src/TextDocument.js';
const doc = new TextDocument('Anna såg Otto paddla kajak.');
console.log(doc.countWords()); // 5
console.log(doc.toCamelCase()); // annaSågOttoPaddlaKajak
```

---

**For AI agents:**
- Always update `TextDocument` when adding new text features.
- Follow the composition/delegation pattern for new modules.
- Maintain JSDoc comments for all public methods.
- Use the provided scripts for linting and testing.
