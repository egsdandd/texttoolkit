/**
 * @param {string} str String to check.
 * @returns {boolean}
 */
export function isEmptyOrWhitespace(str) {
  return typeof str !== 'string' || str.trim().length === 0
}
// src/utils/inputValidation.js
import {
  InvalidTypeError,
  EmptyStringError,
  TooLongError,
  InvalidBooleanError,
} from './errors.js'

/**
 * @param {any} fn Value to check.
 * @returns {boolean}
 */
export function isFunction(fn) {
  return typeof fn === 'function'
}

/**
 * @param {number} value Value to check.
 * @param {string} [param] Parameter name.
 */
export function validatePositiveInteger(value, param = 'Argument') {
  if (!Number.isInteger(value) || value < 1)
    throw new InvalidTypeError(param, 'an integer greater than 0')
}
/**
 * @param {any} v Value to check.
 * @returns {boolean}
 */
export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

/**
 * @param {any} val Value to check.
 * @param {string} [msgOrParam] Parameter name or error message.
 */
export function validateNonEmptyString(val, msgOrParam = 'Value') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'a string')
  if (val.trim().length === 0) throw new EmptyStringError(msgOrParam)
}

/**
 * @param {string} val String to check.
 * @param {number} max Max length.
 * @param {string} [msgOrParam] Parameter name or error message.
 */
export function validateMaxLength(val, max, msgOrParam = 'Value') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'a string')
  if (val.length > max) throw new TooLongError(msgOrParam, max)
}

/**
 * @param {any} val Value to validate.
 * @param {string} param Parameter name.
 */
export function validateBoolean(val, param = 'Argument') {
  if (typeof val !== 'boolean') throw new InvalidBooleanError(param)
}

/**
 * @param {any} fn Value to validate.
 * @param {string} param Parameter name.
 */
export function validateFunction(fn, param = 'Argument') {
  if (typeof fn !== 'function') throw new InvalidTypeError(param, 'a function')
}

export const MAX_TEXT_LENGTH = 100000 // or whatever you want
