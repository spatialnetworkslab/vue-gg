import aggregations from './aggregations'
import checkKeyValuePair from '../utils/checkKeyValuePair.js'
import { GroupedData } from './groupBy.js'

export default function (data, summariseInstructions) {
  if (summariseInstructions.constructor !== Object) {
    throw new Error('summarise must be an object')
  }

  let newData = initNewData(summariseInstructions)

  if (data.constructor === GroupedData) {
    checkSummariseInstructions(summariseInstructions, data.groupedColumns)

    for (let group of data.groups) {
      newData = summariseGroup(group.data, summariseInstructions, newData)
    }
  } else {
    newData = summariseGroup(data, summariseInstructions, newData)
  }

  return newData
}

function initNewData (summariseInstructions) {
  let newData = {}
  for (let newCol in summariseInstructions) { newData[newCol] = [] }
  return newData
}

function summariseGroup (data, summariseInstructions, newData) {
  for (let newColName in summariseInstructions) {
    let instruction = summariseInstructions[newColName]
    let column = checkKeyValuePair(instruction, Object.keys(data))
    let aggregation = instruction[column]

    newData[newColName].push(aggregations[aggregation](data[column]))
  }

  return newData
}

function checkSummariseInstructions (summariseInstructions, groupedColumns) {
  for (let newColName in summariseInstructions) {
    let instruction = summariseInstructions[newColName]
    let name = Object.keys(instruction)[0]
    if (groupedColumns.includes(name)) {
      throw new Error(`Cannot summarise the column '${name}': used for grouping`)
    }
  }
}
