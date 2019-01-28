import { is, isnt } from '../../../utils/equals.js'
import getDataType from '../../../utils/getDataType.js'
import convertToQuantitative from '../../../utils/convertToQuantitative.js'
import { invalidValueForRangeType } from './parseCoordinateSet.js'

export default function (prop, options) {
  if (!this.$$map) {
    if (options.geojson) {
      if (is(prop) && prop.constructor === Object) {
        return prop
      }
    } else {
      if (is(prop) && prop.constructor === Array) {
        return parseArray(prop, this.parentRangeTypes, this.parentBranch)
      }
    }

    if (isnt(prop)) {
      return undefined
    }
  }

  if (this.$$map) {
    if (options.geojson) {
      if (is(prop) && prop.constructor === Object) {
        if (getDataType(prop, false) === 'geometry') {
          return { assign: prop }
        } else {
          checkMappingObject(prop)
          return prop
        }
      }
    } else {
      if (is(prop) && prop.constructor === Array) {
        return { assign: parseArray(prop, this.parentRangeTypes, this.parentBranch) }
      }
    }

    if (isnt(prop)) {
      return { assign: undefined }
    }
  }
}

function parseArray (data, parentRangeTypes, parentBranch) {
  // Here we check whether array entries' types (String, Number, etc)
  // are compatible with the parent domain (categorical, quantitative, etc)
  let types = ['x', 'y']

  let parsed = []
  for (let entry of data) {
    let point = []

    for (let i = 0; i < types.length; ++i) {
      let type = types[i]
      let parentRangeType = parentRangeTypes[type]

      if (invalidValueForRangeType(entry[i], parentRangeType)) {
        throw new Error(`Invalid input ${entry[i]} for parent Section domain type ${parentRangeType}`)
      } else {
        if (['categorical', 'temporal'].includes(parentRangeType)) {
          // We will already convert categorical and temporal data here.
          point.push(convertToQuantitative(entry[i], type, parentBranch))
        } else {
          point.push(entry[i])
        }
      }
    }

    parsed.push(point)
  }

  return parsed
}

function checkMappingObject (obj) {
  if (!obj.hasOwnProperty('get')) {
    throw new Error(`Missing required mapping option 'get'`)
  }

  const allowed = ['get', 'scaleGeo']

  for (let key in obj) {
    if (!allowed.includes(key)) { throw new Error(`Invalid mapping option '${key}'`) }
  }
}
