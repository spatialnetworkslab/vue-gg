import { getIntervalBounds } from '../transformations/transformations/binning.js'

import createCoordsScale from './shorthands/coords/createCoordsScale.js'
import createColorScale from './shorthands/color/createColorScale.js'
import createNumericScale from './shorthands/numeric/createNumericScale.js'
import createShapeScale from './shorthands/shape/createShapeScale.js'

import parseRange from './utils/parseRange.js'
import getPropType from './utils/getPropType.js'
import getDimension from '../utils/getDimension.js'

export default function (prop, context, classificationOptions) {
  checkClassificationOptions(classificationOptions, context.dataInterface)
  let dataType = 'quantitative'
  let binning = classificationOptions.binning
  let column = classificationOptions.column
  let data = context.dataInterface.getDataset()

  if (binning.groupBy) {
    console.warn(`groupBy value '${binning.groupBy}' ignored. Don't use groupBy in classifications.`)
  }

  let binningCopy = JSON.parse(JSON.stringify(binning))
  binningCopy.groupBy = column

  let intervalBounds = getIntervalBounds(data, binningCopy)
  let intervals = intervalBounds.length - 1
  let domain = [0, intervals - 1]

  let propType = getPropType(prop)

  let scale

  if (propType === 'coord') {
    let dimension = getDimension(prop)
    let range = context.ranges[dimension]
    range = parseRange(range, classificationOptions)

    scale = createCoordsScale(prop, dataType, domain, range, classificationOptions)
  }

  if (propType === 'color') {
    scale = createColorScale(prop, dataType, domain, classificationOptions, context)
  }

  if (propType === 'numeric') {
    scale = createNumericScale(prop, dataType, domain, classificationOptions)
  }

  if (propType === 'shape') {
    domain = new Array(intervals).fill(0).map((_, i) => i.toString())
    scale = createShapeScale(prop, dataType, domain, classificationOptions)
  }

  return input => {
    if (input < intervalBounds[0] || input > intervalBounds[intervals]) { return null }
    for (let i = 0; i < intervals; i++) {
      if (input >= intervalBounds[i] && input <= intervalBounds[i + 1]) {
        if (propType === 'shape') { return scale(i.toString()) }
        if (propType !== 'shape') { return scale(i) }
      }
    }
  }
}

function checkClassificationOptions (classificationOptions, dataInterface) {
  if (!classificationOptions.hasOwnProperty('binning')) {
    throw new Error(`Missing required classification option 'binning'`)
  }

  if (!classificationOptions.hasOwnProperty('column')) {
    throw new Error(`Missing required classification option 'column'`)
  }

  if (classificationOptions.column.constructor !== String) {
    throw new Error(`'column' must be a String`)
  }

  if (!dataInterface.hasColumn(classificationOptions.column)) {
    throw new Error(`Invalid classification optoins: column '${classificationOptions.domain}' not found`)
  }

  let type = dataInterface.getType(classificationOptions.column)
  if (type !== 'quantitative') {
    throw new Error(`Can only use classification with data type 'quantitative'. Received '${type}'`)
  }
}
