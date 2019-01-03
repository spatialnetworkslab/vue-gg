import aggregations from './aggregations'
import checkKeyValuePair from '../utils/checkKeyValuePair.js'

export default function (data, summariseInstructions) {
  if (summariseInstructions.constructor !== Object) {
    throw new Error('summarise must be an object')
  }

  let newData = {}

  for (let newColName in summariseInstructions) {
    newData[newColName] = []

    let instruction = summariseInstructions[newColName]
    let column = checkKeyValuePair(instruction, Object.keys(data))
    let aggregation = instruction[column]

    newData[newColName].push(aggregations[aggregation](data[column]))
  }

  return newData
}
