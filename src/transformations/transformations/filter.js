import dataLength from '../utils/dataLength.js'

export default function (data, filterFunction) {
  let newData = {}
  let length = dataLength(data)

  for (let colName in data) {
    newData[colName] = []
  }

  for (let i = 0; i < length; i++) {
    let row = {}
    for (let colName in data) { row[colName] = data[colName][i] }
    if (filterFunction(row, i)) {
      for (let colName in data) {
        newData[colName].push(row[colName])
      }
    }
  }

  return newData
}
