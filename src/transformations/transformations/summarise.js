import aggregations from './aggregations'
import checkKeyValuePair from '../utils/checkKeyValuePair.js'
import * as lodash from 'lodash'

export default function (data, summariseInstructions) {
  if (summariseInstructions.constructor !== Object) {
    throw new Error('summarise must be an object')
  }
  console.log(data)
  let newData = initNewData(summariseInstructions, data)
  console.log(newData)
  if (data.hasOwnProperty('grouped')) {
    checkSummariseInstructions(summariseInstructions, data)

    let dataClone = lodash.cloneDeep(data)
    delete dataClone.grouped
    for (let col in dataClone) {
      newData[col] = dataClone[col]
    }
    console.log(data.grouped)
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
  if (data && data.hasOwnProperty('grouped')) {
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

    // If the aggregation instructions are an Object, only one column will be
    // used as summary: the column that is used as key in the Object
    if (instruction.constructor === Object) {
      let column = checkKeyValuePair(instruction, Object.keys(data))
      let aggregation = instruction[column]

      if (aggregation.constructor === String) {
        newData[newColName].push(aggregations[aggregation](data[column]))
      } else if (aggregation.constructor === Function) {
        newData[newColName].push(aggregation(data[column]))
      } else {
        throw new Error(`Invalid aggregation instruction: ${aggregation}. Must be String or Function`)
      }
    }

    // If the instruction is a Function, it will be passed the entire group,
    // and is expected to return a completely new dataframe.
    if (instruction.constructor === Function) {
      newData[newColName].push(instruction(data))
    }
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
