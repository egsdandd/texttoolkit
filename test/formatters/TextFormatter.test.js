import TextFormatter from '../../src/formatters/TextFormatter.js';

describe('TextFormatter', () => {
  let formatter;

  beforeEach(() => {
    formatter = new TextFormatter('  HeLlo World-Example_text  ');
  });

  test('converts to upper case', () => {
    expect(formatter.toUpperCase()).toBe('  HELLO WORLD-EXAMPLE_TEXT  ');
  });

  test('converts to lower case', () => {
    expect(formatter.toLowerCase()).toBe('  hello world-example_text  ');
  });

  test('capitalizes words', () => {
    expect(formatter.capitalizeWords()).toBe('  HeLlo World-Example_text  ');
  });

  test('converts to camelCase', () => {
    expect(formatter.toCamelCase()).toBe('helloWorldExampleText');
  });

  test('converts to snake_case', () => {
    expect(formatter.toSnakeCase()).toBe('hello_world_example_text');
  });

  test('trims whitespace', () => {
    expect(formatter.trimWhitespace()).toBe('HeLlo World-Example_text');
  });
});
