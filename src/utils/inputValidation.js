// src/utils/inputValidation.js
import {
  InvalidTypeError,
  EmptyStringError,
  TooLongError,
  InvalidBooleanError,
} from './errors.js'

/**
 * Kontrollera om värdet är en funktion.
 *
 * @param {any} fn - Värdet som ska kontrolleras.
 * @returns {boolean} Returnerar true om värdet är en funktion, annars false.
 */
export function isFunction(fn) {
  return typeof fn === 'function'
}

/**
 * Kontrollera om värdet är ett positivt heltal.
 * @param {number} value - Värdet som ska kontrolleras.
 * @param {string} [param] - Namnet på parametern för felmeddelanden.
 */
export function validatePositiveInteger(value, param = 'Argumentet') {
  if (!Number.isInteger(value) || value < 1)
    throw new InvalidTypeError(param, 'ett heltal större än 0')
}
/**
 * Kontrollera om värdet är en icke-tom sträng.
 * @param {any} v - Värdet som ska kontrolleras.
 * @returns {boolean} Returnerar true om värdet är en icke-tom sträng, annars false.
 */
export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

/**
 * Kontrollera om värdet är en icke-tom sträng.
 * @param {any} val - Värdet som ska kontrolleras.
 * @param {string} [msgOrParam] - Namnet på parametern eller ett felmeddelande.
 */
export function validateNonEmptyString(val, msgOrParam = 'Värdet') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'en sträng')
  if (val.trim().length === 0) throw new EmptyStringError(msgOrParam)
}

/**
 * Kontrollera om strängen inte överstiger maxlängden.
 * @param {string} val - Strängen som ska kontrolleras.
 * @param {number} max - Maximal tillåten längd.
 * @param {string} [msgOrParam] - Namnet på parametern eller ett felmeddelande.
 */
export function validateMaxLength(val, max, msgOrParam = 'Värdet') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'en sträng')
  if (val.length > max) throw new TooLongError(msgOrParam, max)
}

/**
 * Validates that the value is a boolean.
 * @param {any} val - The value to validate as boolean.
 * @param {string} param - The parameter name for error messages.
 */
export function validateBoolean(val, param = 'Argumentet') {
  if (typeof val !== 'boolean') throw new InvalidBooleanError(param)
}

/**
 * Validates that the value is a function.
 * @param {any} fn - The value to validate as a function.
 * @param {string} param - The parameter name for error messages.
 */
export function validateFunction(fn, param = 'Argumentet') {
  if (typeof fn !== 'function') throw new InvalidTypeError(param, 'en funktion')
}

export const MAX_TEXT_LENGTH = 100000 // eller vad du vill
