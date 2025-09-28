
# texttoolkit

_Assignment L2 in 1DV610_

**Version:** 1.0.0    
**Author:** Dan-Håkan Davall  
**Email:** [dd222mk@student.lnu.se](mailto:dd222mk@student.lnu.se)

Documentation (README.md - this file)

[For my teacher](./doc/README.teacher.md)

***
README Documents in the repo:

[README.md](./README.md)

[TextDocument.md](./doc/README.TextDocument.md)

[TextAnalyzer.md](./doc/README.TextAnalyser.md)

[TextFormatter.md](./doc/README.TextFormatters.md)

[TextSearcer.md](./doc/README.TextSearcher.md)

[TextTransformer.md](./doc/README.Transformer.md)

[TextReverser.md](./doc/README.TextReverser.md)

Utils:

[inputValidator.md](./doc/README.InputValidation.md)
[error.md](./doc/README.error.md)

Classes:

 - [Class description](./doc/classer.md)

 - [Copilot-instructions](./doc/copilot-instructions.md) for details about the module

Test Output:

- [Test Coverage Summary](./doc/README.Testresult.md)
- [Detailed Test Report](./doc/README.DetailedTestReport.md)

## 🗂️ Project Description

This project is a **modular JavaScript toolkit** for advanced text analysis, formatting, search, and transformation – with support for Swedish (including å/ä/ö) and English.  
**Main entry point:** `src/TextDocument.js` – gathers analyzers, formatters, searchers, and transformers into a unified API. This is part of a school project.

All public APIs are exported via `src/index.js`.

***

## 🏛️ Architecture Overview

Key components and their roles:

- **TextDocument**: Gathers analyzers, formatters, searchers, and transformers into a unified API.
- **TextAnalyzer**: Responsible for word, character, and sentence analysis, frequency and palindrome.
- **TextFormatter**: Handles uppercase/lowercase, capitalization, camelCase, snake_case and trim.
- **TextSearcher**: Responsible for substring search, regexp search and related position services.
- **TextTransformer**: Performs transformations on words and word order as well as replacement operations.

Validation and error handling:

- **utils/inputValidation.js**: Responsible for validating input to public methods.
- **utils/errors.js**: Contains custom error classes for clearer error messages.

***

### Class Overview and Error Classes

**Main Classes:**

- **TextDocument**: Wrapper that gathers and exposes analysis, formatting, search, and transformation.
- **TextAnalyzer**: Word counting, character and sentence analysis, frequency analysis, palindrome identification.
- **TextFormatter**: Uppercase/lowercase, capitalization, camelCase, snake_case, trim.
- **TextTransformer**: Transforms words and order, replacement operations.
- **TextSearcher**: Substring and regexp search, position services.
- **TextReverser**: Reverses text, lines, and words in various ways.

**Error Classes (`utils/errors.js`):**

- **EmptyStringError**: Error for empty strings.
- **InvalidTypeError**: Type validation error.
- **InvalidBooleanError**: Error for boolean validation.
- **InvalidPatternError**: Error for regex validation.
- **TooLongError**: Error for exceeded length.

**Summary:**

| Class              | Purpose/Scope                   |
| :--                | :--                             |
| TextDocument       | Aggregates all text logic/wrapper |
| TextAnalyzer       | Statistical text analysis         |
| TextFormatter      | Format and case transformation    |
| TextTransformer    | Transform/change words            |
| TextSearcher       | Substring/regex searching         |
| TextReverser       | Various text reversal functions   |
| EmptyStringError   | Error class for empty strings     |
| InvalidTypeError   | Type validation error             |
| InvalidBooleanError| Boolean validation error          |
| InvalidPatternError| Regex validation error            |
| TooLongError       | Length validation error           |

**Total number of classes:**

11 (6 main classes + 5 error classes).

***

## 🚀 Usage Examples

See example in `examples/example1.js` and `examples/example2.js` for typical usage patterns and integration.

```javascript
import { TextDocument } from 'texttoolkit';
const doc = new TextDocument("Hello world! This is a test document.");
console.log(doc.analyze().wordCount); // 7
console.log(doc.format('uppercase')); // "HELLO WORLD! THIS IS A TEST DOCUMENT."
console.log(doc.search('test')); // [^24]
console.log(doc.transform('reverse')); // ".tnemucod tset a si sihT !dlrow olleH"
```


***

## 🦾 Developer Workflows

- **Linting:**  
  `npm run lint` (rules in `eslint.config.js`)
- **Testing:**  
  `npm test` (Jest, with tests in the `test/` directory)
- **Debugging:**  
  Try examples in the `examples/` directory.
- **Module imports:**  
  ES modules – use `import/export`.

***

## ⚙️ Project-Specific Conventions

- **Language support:** Swedish/English, regex covers åäö
- **Validation:** all public methods validate input with detailed errors
- **Statelessness:** all classes are pure except for the text state in `TextDocument` and its delegates
- **API consistency:** all operations are exposed via `TextDocument`
- **JSDoc:** _All public methods must be documented with JSDoc_

***

## 🛠️ Integration \& Extension Guidelines

- Start new analyzers/formatters/searchers/transformers in the respective folder and export via `index.js`
- Always use error classes from `utils/errors.js` for raise/throw

***

## 📄 Tests \& Examples

- See `test/` for expected behaviors and edge cases
- See `examples/` for usage and integration
- Code style and JSDoc rules in `eslint.config.js`

***

## 💻 Installation Instructions

```
git clone <repository-url>
cd texttoolkit
npm install
```


***

## 📦 Dependencies, Language \& Versions

- Node.js **v14 or later**
- Jest for testing
- ESLint for code style
- _Any third-party libraries are listed in package.json_

***

## 🧪 Test Reports

- Main modules and edge cases are covered by tests in `test/`
- Run `npm test` for results with Jest

***

## 🤝 Contribution Guidelines

1. Fork and create a feature branch
2. Write clear commit messages
3. Create pull requests with a description of changes and intent
4. Run all tests and ensure they pass before PR

***

## 🐞 Bug Reports / Issues

_Detected a bug?_
Create an issue on GitHub with as much information as possible: steps to reproduce, expected and actual behavior.

***

## ⚖️ License

MIT License

***

## 📈 Versioning and Changelog

- Semantic versioning (MAJOR.MINOR.PATCH)
- All changes are documented in `CHANGELOG.md`

***

## 💬 Communication \& Questions

For questions or suggestions – update this README and notify the repo owners.



