import { is, isnt } from '../../../utils/equals.js'
import convertToNumeric from '../../../utils/convertToNumeric.js'
import { invalidValueForRangeType } from './parseCoordinateSet.js'

export default function (prop) {
  if (!this.$$map) {
    if (is(prop) && prop.constructor === Array) {
      return prop
    }

    if (isnt(prop)) {
      return undefined
    }
  }

  if (this.$$map) {
    if (is(prop) && prop.constructor === Array) {
      return { assign: prop }
    }

    if (isnt(prop)) {
      return { assign: undefined }
    }
  }
}

function parseArray (data, parentRangeType, dimension, parentBranch) {
  // TODO nested
  // Here we check whether array entries' types (String, Number, etc)
  // are compatible with the parent domain (categorical, quantitative, etc)
  let parsed = []
  for (let entry of data) {
    if (invalidValueForRangeType(entry, parentRangeType)) {
      throw new Error(`Invalid input ${entry} for parent Section domain type ${parentRangeType}`)
    } else {
      if (['categorical', 'temporal'].includes(parentRangeType)) {
        // We will already convert categorical and temporal data here.
        parsed.push(convertToNumeric(entry, dimension, parentBranch))
      } else {
        parsed.push(entry)
      }
    }
  }

  return parsed
}
