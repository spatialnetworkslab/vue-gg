import dataLength from '../utils/dataLength.js'

export default function (data, filterFunction) {
  if (filterFunction.constructor !== Function) {
    throw new Error('Filter transformation can only be specified as Function')
  }

  let i = 0
  let length = dataLength(data)

  let rowProxy = {}

  for (let colName in data) {
    Object.defineProperty(rowProxy, colName, {
      get: () => data[colName][i]
    })
  }

  while (i < length) {
    if (filterFunction(rowProxy, i)) {
      i++
    } else {
      for (let colName in data) {
        data[colName].splice(i, 1)
      }
      length--
    }
  }

  return data
}
