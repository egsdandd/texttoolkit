// src/utils/errors.js
/**
 * Thrown when a value is not of the expected type.
 */
export class InvalidTypeError extends TypeError {
  /**
   * Thrown when a value is not of the expected type.
   *
   * @param {string} param - The name of the parameter that failed validation.
   * @param {string} expected - The expected type description.
   */
  constructor(param, expected) {
    super(`${param} must be ${expected}.`)
    this.name = 'InvalidTypeError'
  }
}

/**
 * Thrown when a string is empty.
 */
export class EmptyStringError extends TypeError {
  /**
   * Thrown when a string is empty.
   * @param {string} param - The name of the parameter that failed validation.
   */
  constructor(param) {
    super(`${param} must not be empty.`)
    this.name = 'EmptyStringError'
  }
}

/**
 * Thrown when a string exceeds the maximum allowed length.
 */
export class TooLongError extends RangeError {
  /**
   * Thrown when a string exceeds the maximum allowed length.
   * @param {string} param - The name of the parameter that failed validation.
   * @param {number} max - The maximum allowed number of characters.
   */
  constructor(param, max) {
    super(`${param} must be at most ${max} characters.`)
    this.name = 'TooLongError'
  }
}

/**
 *
 */
export class InvalidPatternError extends Error {
  /**
   *
   * @param {string} param - The name of the parameter that failed validation.
   */
  constructor(param) {
    super(`${param} is not a valid regular expression.`)
    this.name = 'InvalidPatternError'
  }
}
/**
 * Thrown when a string is empty.
 */
export class EmptyPatternError extends Error {
  /**
   * Thrown when a pattern string is empty.
   * @param {string} param - The name of the parameter that failed validation.
   */
  constructor(param) {
    super(`${param} must not be empty.`)
    this.name = 'EmptyPatternError'
  }
}
/**
 *
 */
export class InvalidBooleanError extends TypeError {
  /**
   * Thrown when a value is not a boolean.
   * @param {string} param - The name of the parameter that failed validation.
   */
  constructor(param) {
    super(`${param} must be a boolean.`)
    this.name = 'InvalidBooleanError'
  }
}
/**
 *
 */
export class TextTooLongError extends RangeError {
  /**
   * Thrown when the text exceeds the maximum allowed length.
   * @param {number} max - The maximum allowed number of characters.
   */
  constructor(max) {
    super(`Text is too long (max ${max} characters).`)
    this.name = 'TextTooLongError'
  }
}