import dataLength from '../utils/dataLength.js'

export function mutate (data, mutateObj) {
  let length = dataLength(data)

  for (let key in mutateObj) {
    data[key] = new Array(length)
  }

  for (let i = 0; i < length; i++) {
    let row = {}
    let prevRow = {}
    let nextRow = {}

    for (let colName in data) {
      row[colName] = data[colName][i]
      prevRow[colName] = data[colName][i - 1]
      nextRow[colName] = data[colName][i + 1]
    }

    if (i === 0) { prevRow = undefined }
    if (i === length - 1) { nextRow = undefined }

    for (let key in mutateObj) {
      let mutateFunc = mutateObj[key]
      data[key][i] = mutateFunc(row, i, prevRow, nextRow)
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
