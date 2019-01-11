import aggregations from './aggregations'
import checkKeyValuePair from '../utils/checkKeyValuePair.js'

export default function (data, summariseInstructions) {
  if (summariseInstructions.constructor !== Object) {
    throw new Error('summarise must be an object')
  }

  let newData = initNewData(summariseInstructions, data)

  if (data.hasOwnProperty('grouped')) {
    checkSummariseInstructions(summariseInstructions, data)

    let dataClone = JSON.parse(JSON.stringify(data))
    delete dataClone.grouped
    for (let col in dataClone) {
      newData[col] = dataClone[col]
    }

    for (let group of data.grouped) {
      newData = summariseGroup(group, summariseInstructions, newData)
    }
  } else {
    newData = summariseGroup(data, summariseInstructions, newData)
  }

  return newData
}

export function initNewData (summariseInstructions, data) {
  let newData = {}
  for (let newCol in summariseInstructions) { newData[newCol] = [] }
  if (data.hasOwnProperty('grouped')) {
    for (let col in data) {
      if (col !== 'grouped') {
        newData[col] = []
      }
    }
  }
  return newData
}

export function summariseGroup (data, summariseInstructions, newData) {
  for (let newColName in summariseInstructions) {
    let instruction = summariseInstructions[newColName]
    let column = checkKeyValuePair(instruction, Object.keys(data))
    let aggregation = instruction[column]

    newData[newColName].push(aggregations[aggregation](data[column]))
  }

  return newData
}

export function checkSummariseInstructions (summariseInstructions, data) {
  for (let newColName in summariseInstructions) {
    let instruction = summariseInstructions[newColName]
    let name = Object.keys(instruction)[0]

    if (name === 'grouped') {
      throw new Error(`Invalid column name 'grouped'`)
    }

    if (data.hasOwnProperty(name)) {
      throw new Error(`Cannot summarise the column '${name}': used for grouping`)
    }
  }
}
