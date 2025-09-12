import TextFormatter from '../../src/formatters/TextFormatter.js';

const formatter = new TextFormatter('  HeLlo World-Example_text  ');
console.log(formatter.toUpperCase());     // "  HELLO WORLD-EXAMPLE_TEXT  "
console.log(formatter.toLowerCase());     // "  hello world-example_text  "
console.log(formatter.capitalizeWords()); // "  HeLlo World-Example_text  "
console.log(formatter.toCamelCase());     // "helloWorldExampleText"
console.log(formatter.toSnakeCase());     // "hello_world_example_text"
console.log(formatter.trimWhitespace());  // "HeLlo World-Example_text"
