[Back to README.md](../README.md)

# GitHub Copilot Instructions for texttoolkit

## Purpose

These instructions help Copilot generate code that matches the current architecture, conventions, and workflows of the **texttoolkit** project—a modular JavaScript toolkit for advanced text analysis, formatting, searching, and transformation, supporting both Swedish and English.

---

## 1. Project Structure & Entry Points

- **Main Facade:** `src/TextDocument.js`  
  Central API that delegates to analyzers, formatters, searchers, and transformers.
- **Public API:** All exports are re-exported via `src/index.js`.
- **Key Modules:**
  - `src/analyzers/TextAnalyzer.js`: Word, sentence, character, frequency, and palindrome analysis.
  - `src/formatters/TextFormatter.js`: Case, whitespace, and string format conversions.
  - `src/searchers/TextSearcher.js`: Substring and regex search with robust validation.
  - `src/transformers/TextTransformer.js`, `src/transformers/TextReverser.js`: Word and text transformations (reverse, replace, etc).
- **Validation:** All user input is validated using `src/utils/inputValidation.js` and custom errors from `src/utils/errors.js`.
- **Tests:** All modules have corresponding tests in `test/`.
- **Examples:** Example scripts in `examples/` for feature trials and debugging.

---

## 2. Coding Conventions

- **ES Modules:** Use `import`/`export` syntax throughout.
- **Language Support:** All logic and regexes must handle both Swedish and English (e.g., `åäö` in word boundaries).
- **Validation:** All public methods must validate input and throw descriptive custom errors from `src/utils/errors.js`.
- **Statelessness:** All classes are pure and stateless, except for the text value in `TextDocument` and its delegates.
- **Consistent API:** Expose all main operations as methods on `TextDocument`.
- **JSDoc:** Every public method must include a JSDoc comment (enforced by lint).
- **Error Handling:** Always use custom error types for validation failures.
- **No Side Effects:** Avoid side effects outside of `TextDocument`'s text state.

---

## 3. Developer Workflows

- **Linting:**
  - Run `npm run lint` or `npm run lint:fix` to check/fix code style.
  - Linting is enforced via `eslint.config.js` (including JSDoc).
- **Testing:**
  - Run `npm test` to execute Jest tests in the `test/` directory.
  - Tests cover all modules and edge cases.
- **Debugging:**
  - Use scripts in `examples/` (e.g., `exampel1.js`, `exampel2.js`) for quick feature trials and debugging.
- **Extensibility:**
  - Add new analyzers, formatters, searchers, or transformers by following the `src/` structure and updating `TextDocument.js` and `index.js`.

---

## 4. References

- **Tests:** See `test/` for expected behaviors and edge cases.
- **Examples:** See `examples/` for real-world usage and integration patterns.
- **Lint Rules:** See `eslint.config.js` for enforced code style and documentation.

---

## 5. Maintenance

- For questions about conventions or to propose changes, update this file and notify the maintainer.

---
