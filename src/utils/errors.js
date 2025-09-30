// src/utils/errors.js
/**
 * Error for invalid type.
 */
export class InvalidTypeError extends TypeError {
  /**
   * @param {string} param Parameter name.
   * @param {string} expected Expected type.
   */
  constructor(param, expected) {
    super(`${param} must be ${expected}.`)
    this.name = 'InvalidTypeError'
  }
}

/**
 * Error for empty string.
 */
export class EmptyStringError extends TypeError {
  /**
   * @param {string} param Parameter name.
   */
  constructor(param) {
    super(`${param} must not be empty.`)
    this.name = 'EmptyStringError'
  }
}

/**
 * Error for string too long.
 */
export class TooLongError extends RangeError {
  /**
   * @param {string} param Parameter name.
   * @param {number} max Max length.
   */
  constructor(param, max) {
    super(`${param} must be at most ${max} characters.`)
    this.name = 'TooLongError'
  }
}

/**
 * Error for invalid regex pattern.
 */
export class InvalidPatternError extends Error {
  /**
   * @param {string} param Parameter name.
   */
  constructor(param) {
    super(`${param} is not a valid regular expression.`)
    this.name = 'InvalidPatternError'
  }
}
/**
 * Error for empty regex pattern.
 */
export class EmptyPatternError extends Error {
  /**
   * @param {string} param Parameter name.
   */
  constructor(param) {
    super(`${param} must not be empty.`)
    this.name = 'EmptyPatternError'
  }
}
/**
 * Error for invalid boolean.
 */
export class InvalidBooleanError extends TypeError {
  /**
   * @param {string} param Parameter name.
   */
  constructor(param) {
    super(`${param} must be a boolean.`)
    this.name = 'InvalidBooleanError'
  }
}
/**
 * Error for text too long.
 */
export class TextTooLongError extends RangeError {
  /**
   * @param {number} max Max length.
   */
  constructor(max) {
    super(`Text is too long (max ${max} characters).`)
    this.name = 'TextTooLongError'
  }
}