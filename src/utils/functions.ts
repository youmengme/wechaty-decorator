import * as util from 'util'

export function isRegexp (data: any) {
  return util.types.isRegExp(data)
}

export function isFunction (data: any) {
  return typeof data === 'function'
}

export  function isString(data: any) {
  return typeof data === 'string'
}

export function valueToArray (value: any) {
  return Array.isArray(value) ? value : [value]
}
