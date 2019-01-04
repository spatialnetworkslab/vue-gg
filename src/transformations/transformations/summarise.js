import aggregations from './aggregations'
import checkKeyValuePair from '../utils/checkKeyValuePair.js'
import { GroupedData } from './groupBy.js'

export default function (data, summariseInstructions) {
  if (summariseInstructions.constructor !== Object) {
    throw new Error('summarise must be an object')
  }

  let newData = initNewData(summariseInstructions, data.groupedColumns)

  if (data.constructor === GroupedData) {
    checkSummariseInstructions(summariseInstructions, data.groupedColumns)

    for (let group of data.groups) {
      newData = summariseGroup(group.data, summariseInstructions, newData)
      newData = attachGroupedValues(
        data.groupedColumns,
        group.groupedValues,
        newData
      )
    }
  } else {
    newData = summariseGroup(data, summariseInstructions, newData)
  }

  return newData
}

function initNewData (summariseInstructions, groupedColumns) {
  let newData = {}
  for (let newCol in summariseInstructions) { newData[newCol] = [] }
  if (groupedColumns) {
    for (let col of groupedColumns) { newData[col] = [] }
  }
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

function attachGroupedValues (groupedColumns, groupedValues, newData) {
  for (let i = 0; i < groupedColumns.length; i++) {
    let col = groupedColumns[i]
    let val = groupedValues[i]

    newData[col].push(val)
  }

  return newData
}
