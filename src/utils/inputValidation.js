// src/utils/inputValidation.js
import {
  InvalidTypeError,
  EmptyStringError,
  TooLongError,
  InvalidBooleanError,
} from './errors.js'

/**
 * Check if the value is a function.
 *
 * @param {any} fn - The value to check.
 * @returns {boolean} Returns true if the value is a function, otherwise false.
 */
export function isFunction(fn) {
  return typeof fn === 'function'
}

/**
 * Check if the value is a positive integer.
 * @param {number} value - The value to check.
 * @param {string} [param] - The parameter name for error messages.
 */
export function validatePositiveInteger(value, param = 'Argument') {
  if (!Number.isInteger(value) || value < 1)
    throw new InvalidTypeError(param, 'an integer greater than 0')
}
/**
 * Check if the value is a non-empty string.
 * @param {any} v - The value to check.
 * @returns {boolean} Returns true if the value is a non-empty string, otherwise false.
 */
export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

/**
 * Check if the value is a non-empty string.
 * @param {any} val - The value to check.
 * @param {string} [msgOrParam] - The parameter name or an error message.
 */
export function validateNonEmptyString(val, msgOrParam = 'Value') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'a string')
  if (val.trim().length === 0) throw new EmptyStringError(msgOrParam)
}

/**
 * Check if the string does not exceed the maximum length.
 * @param {string} val - The string to check.
 * @param {number} max - The maximum allowed length.
 * @param {string} [msgOrParam] - The parameter name or an error message.
 */
export function validateMaxLength(val, max, msgOrParam = 'Value') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'a string')
  if (val.length > max) throw new TooLongError(msgOrParam, max)
}

/**
 * Validates that the value is a boolean.
 * @param {any} val - The value to validate as boolean.
 * @param {string} param - The parameter name for error messages.
 */
export function validateBoolean(val, param = 'Argument') {
  if (typeof val !== 'boolean') throw new InvalidBooleanError(param)
}

/**
 * Validates that the value is a function.
 * @param {any} fn - The value to validate as a function.
 * @param {string} param - The parameter name for error messages.
 */
export function validateFunction(fn, param = 'Argument') {
  if (typeof fn !== 'function') throw new InvalidTypeError(param, 'a function')
}

export const MAX_TEXT_LENGTH = 100000 // or whatever you want
