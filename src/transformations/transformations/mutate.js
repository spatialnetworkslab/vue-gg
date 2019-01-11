import dataLength from '../utils/dataLength.js'

export function mutate (data, mutateObj) {
  let length = dataLength(data)

  for (let key in mutateObj) {
    data[key] = new Array(length)
  }

  for (let i = 0; i < length; i++) {
    let row = {}
    for (let colName in data) { row[colName] = data[colName][i] }
    for (let key in mutateObj) {
      let mutateFunc = mutateObj[key]
      data[key][i] = mutateFunc(row, i)
    }
  }

  return data
}

export function transmute (data, mutateObj) {
  data = mutate(data, mutateObj)

  for (let key in data) {
    if (!mutateObj.hasOwnProperty(key)) {
      delete data[key]
    }
  }
}
