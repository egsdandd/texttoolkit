// src/utils/errors.js
export class InvalidTypeError extends TypeError {
  constructor(param, expected) {
    super(`${param} måste vara ${expected}.`)
    this.name = 'InvalidTypeError'
  }
}

export class EmptyStringError extends TypeError {
  constructor(param) {
    super(`${param} får inte vara tom.`)
    this.name = 'EmptyStringError'
  }
}

export class TooLongError extends RangeError {
  constructor(param, max) {
    super(`${param} får max vara ${max} tecken.`)
    this.name = 'TooLongError'
  }
}

export class InvalidPatternError extends Error {
  constructor(param) {
    super(`${param} är inte ett giltigt reguljärt uttryck.`)
    this.name = 'InvalidPatternError'
  }
}
export class EmptyPatternError extends Error {
  constructor(param) {
    super(`${param} får inte vara tom.`)
    this.name = 'EmptyPatternError'
  }
}
export class InvalidBooleanError extends TypeError {
  constructor(param) {
    super(`${param} måste vara boolean.`)
    this.name = 'InvalidBooleanError'
  }
}
export class TextTooLongError extends RangeError {
  constructor(max) {
    super(`Texten är för lång (max ${max} tecken).`)
    this.name = 'TextTooLongError'
  }
}