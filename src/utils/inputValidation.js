// src/utils/inputValidation.js

export const MAX_TEXT_LENGTH = 100000;

export function isNonEmptyString(input) {
  return typeof input === 'string' && input.length > 0;
}

export function isFunction(fn) {
  return typeof fn === 'function';
}
