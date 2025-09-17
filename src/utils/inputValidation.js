// src/utils/inputValidation.js
import {
  InvalidTypeError,
  EmptyStringError,
  TooLongError,
  InvalidBooleanError,
} from './errors.js'

export function isFunction(fn) {
  return typeof fn === 'function'
}

export function validatePositiveInteger(value, param = 'Argumentet') {
  if (!Number.isInteger(value) || value < 1)
    throw new InvalidTypeError(param, 'ett heltal större än 0')
}
export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0
}

export function validateNonEmptyString(val, msgOrParam = 'Värdet') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'en sträng')
  if (val.trim().length === 0) throw new EmptyStringError(msgOrParam)
}

export function validateMaxLength(val, max, msgOrParam = 'Värdet') {
  if (typeof val !== 'string') throw new InvalidTypeError(msgOrParam, 'en sträng')
  if (val.length > max) throw new TooLongError(msgOrParam, max)
}

export function validateBoolean(val, param = 'Argumentet') {
  if (typeof val !== 'boolean') throw new InvalidBooleanError(param)
}

export const MAX_TEXT_LENGTH = 100000 // eller vad du vill
