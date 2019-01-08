import dataLength from '../utils/dataLength.js'

export default function (data, filterFunction) {
  if (filterFunction.constructor !== Function) {
    throw new Error('Filter transformation can only be specified as Function')
  }

  let i = 0
  let length = dataLength(data)

  while (i < length) {
    let row = {}
    for (let colName in data) { row[colName] = data[colName][i] }
    if (filterFunction(row, i)) {
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
