import { GroupedData } from './groupBy.js'

import { initNewData, summariseGroup, checkSummariseInstructions } from './summarise.js'
import dataLength from '../utils/dataLength.js'

export default function (data, mutariseInstructions) {
  if (mutariseInstructions.constructor !== Object) {
    throw new Error('mutarise must be an object')
  }

  let newCols = initNewData(mutariseInstructions)

  if (data.constructor === GroupedData) {
    checkSummariseInstructions(mutariseInstructions, data.groupedColumns)

    for (let group of data.groups) {
      let summarizedData = initNewData(mutariseInstructions)
      summarizedData = summariseGroup(group.data, mutariseInstructions, summarizedData)

      let length = dataLength(group.data)
      newCols = addGroupSummaries(newCols, summarizedData, length)
    }

    data = ungroup(data)
  } else {
    let summarizedData = initNewData(mutariseInstructions)
    summarizedData = summariseGroup(data, mutariseInstructions, summarizedData)

    let length = dataLength(data)
    newCols = addGroupSummaries(newCols, summarizedData, length)
  }

  return join(data, newCols)
}

function addGroupSummaries (newCols, summarizedData, length) {
  for (let i = 0; i < length; i++) {
    for (let key in summarizedData) {
      newCols[key].push(summarizedData[key][0])
    }
  }

  return newCols
}

function ungroup (data) {
  let newData = initNewData(data.groups[0].data)

  for (let group of data.groups) {
    for (let col in newData) {
      newData[col].push(...group.data[col])
    }
  }

  return newData
}

function join (data, newCols) {
  for (let col in newCols) {
    data[col] = newCols[col]
  }

  return data
}
