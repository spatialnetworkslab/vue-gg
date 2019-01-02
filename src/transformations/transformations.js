import { filter as _filter, take } from '@observablehq/array'

export default {
  filter
}

function filter (data, filterFunction) {
  if (filterFunction.constructor !== Function) {
    throw new Error('Filter transformation can only be specified as Function')
  }

  let params = getParamNames(filterFunction)
  if (params.length !== 1) {
    throw new Error('Filter function must have exactly one argument')
  }

  let colName = params[0]
  if (!Object.keys(data).includes(colName)) {
    throw new Error(`Column ${colName} not found`)
  }

  let indices = _filter(data[colName], filterFunction)

  let newData = {}
  for (let col in data) {
    newData[col] = take(data[col], indices)
  }

  return newData
}

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g

function getParamNames (func) {
  let fnStr = func.toString().replace(STRIP_COMMENTS, '')
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if (result === null) { result = [] }
  return result
}
