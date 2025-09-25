import TextFormatter from '../../src/formatters/TextFormatter.js'

describe('TextFormatter', () => {
  let formatter

  beforeEach(() => {
    formatter = new TextFormatter('  HeLlo World-Example_text  ')
  })

  test('converts to upper case', () => {
    expect(formatter.toUpperCase()).toBe('  HELLO WORLD-EXAMPLE_TEXT  ')
  })

  test('converts to lower case', () => {
    expect(formatter.toLowerCase()).toBe('  hello world-example_text  ')
  })

  test('capitalizes words', () => {
    expect(formatter.capitalizeWords()).toBe('  HeLlo World-Example_text  ')
  })

  test('converts to camelCase', () => {
    expect(formatter.toCamelCase()).toBe('helloWorldExampleText')
  })

  test('converts to snake_case', () => {
    expect(formatter.toSnakeCase()).toBe('hello_world_example_text')
  })

  test('trims whitespace', () => {
    expect(formatter.trimWhitespace()).toBe('HeLlo World-Example_text')
  })


  test('handles Swedish letters and symbols', () => {
    const f = new TextFormatter('åäö! hello')
    expect(f.getWords()).toEqual(['åäö', 'hello'])
    expect(f.toCamelCase()).toBe('åäöHello')
    expect(f.toSnakeCase()).toBe('åäö_hello')
  })

  test('preserves whitespace and layout in capitalizeWords', () => {
    const f = new TextFormatter('  hello-world_åäö  ')
    expect(f.capitalizeWords()).toBe('  Hello-World_Åäö  ')
  })

  test('trims whitespace for trimWhitespace', () => {
    const f = new TextFormatter('   spaced   text   ')
    expect(f.trimWhitespace()).toBe('spaced   text')
  })

  test('splits multiple underscores/hyphens', () => {
    const f = new TextFormatter('hi__there--now')
    expect(f.getWords()).toEqual(['hi', 'there', 'now'])
  })

  test('camelCase with symbols and spaces', () => {
    const f = new TextFormatter('hey! _there again')
    expect(f.toCamelCase()).toBe('heyThereAgain')
  })

  test('throws error for empty input', () => {
    expect(() => new TextFormatter('')).toThrow()
  })

})
