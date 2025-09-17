# Copilot Instructions for texttoolkit

## Project Overview
- **texttoolkit** is a modular JavaScript toolkit for advanced text analysis, formatting, searching, and transformation, with Swedish and English language support.
- The main entry point is `src/TextDocument.js`, which composes analyzers, formatters, searchers, and transformers into a single API.
- All public APIs are exported via `src/index.js`.

## Architecture & Key Components
- **src/TextDocument.js**: Facade class. Instantiates and delegates to:
  - `analyzers/TextAnalyzer.js`: Word, sentence, character, frequency, and palindrome analysis.
  - `formatters/TextFormatter.js`: Case, whitespace, and string format conversions.
  - `searchers/TextSearcher.js`: Substring and regex search, with robust validation.
  - `transformers/TextTransformer.js` and `TextReverser.js`: Word and text transformations (reverse, replace, etc).
- **Validation & Errors**: All user input is validated via `utils/inputValidation.js` and custom errors in `utils/errors.js`.
- **Examples**: See `examples/exampel1.js` and `exampel2.js` for usage patterns, including file-based workflows.

## Developer Workflows
- **Linting**: Run `npm run lint` (or `lint:fix`) to check/fix code style. Enforces JSDoc and strict rules via `eslint.config.js`.
- **Testing**: Run `npm test` to execute Jest tests in the `test/` directory. Tests cover all major modules and edge cases.
- **Debugging**: Use the example scripts in `examples/` to quickly try out new features or debug API changes.
- **Module Imports**: All code uses ES modules (`import/export`).

## Project-Specific Conventions
- **Language Support**: Regexes and logic handle both Swedish and English characters (e.g., `åäö` in word boundaries).
- **Validation**: All public methods validate input and throw descriptive custom errors.
- **No Side Effects**: All classes are pure and stateless except for the text value in `TextDocument` and its delegates.
- **Consistent API**: All main operations are exposed as methods on `TextDocument` (see tests and examples for method names).
- **JSDoc Required**: All public methods must be documented with JSDoc (enforced by lint).

## Integration & Extensibility
- **Add new analyzers/formatters/searchers/transformers** by following the structure in `src/` and updating `TextDocument.js` and `index.js`.
- **Error Handling**: Always use the custom error types from `utils/errors.js` for validation failures.

## References
- See `test/` for expected behaviors and edge cases.
- See `examples/` for real-world usage and integration patterns.
- See `eslint.config.js` for enforced code style and documentation rules.

---

For questions about unclear conventions or to propose changes, update this file and notify the maintainer.
