import { is, isnt } from '../../../utils/equals.js'
import convertToNumeric from '../../../utils/convertToNumeric.js'

export default function (prop, { dimension }) {
  let parentRangeType = this.parentRangeTypes[dimension]

  if (!this.$$map) {
    if (is(prop) && prop.constructor === Object) {
      throw new Error('Trying to map without vgg-map component.')
    }

    if (is(prop) && prop.constructor === Function) {
      throw new Error('Trying to map without vgg-map component.')
    }

    if (is(prop) && prop.constructor === Array) {
      return parseArray(prop, parentRangeType, dimension, this.parentBranch)
    }

    if (is(prop) && prop.constructor === String) {
      if (!this.$$dataContainer.hasVariable(prop)) {
        throw new Error(`Variable ${prop} not found`)
      }

      let data = this.$$dataContainer.getVariableData(prop)
      return parseArray(data, parentRangeType, dimension, this.parentBranch)
    }

    if (isnt(prop)) {
      return undefined
    }
  }

  if (this.$$map) {
    let isObject = is(prop) && prop.constructor === Object
    let isFunction = is(prop) && prop.constructor === Function

    if (is(prop) && isObject) {
      // block object mapping syntax if used with categorical or temporal
      // parent domain
      if (['categorical', 'temporal'].includes(parentRangeType) && prop.hasOwnProperty('scale')) {
        throw new Error(`Cannot scale ${prop} to parent Section domain type ${parentRangeType}`)
      }
      return prop
    }

    if (is(prop) && isFunction) { return { func: prop } }

    if (is(prop) && prop.constructor === Array) {
      return { assign: parseArray(prop, parentRangeType, dimension, this.parentBranch) }
    }

    if (is(prop) && prop.constructor === String) {
      throw new Error(`Cannot set Mark coordinates from variable when mapping`)
    }

    if (isnt(prop)) {
      return { assign: undefined }
    }
  }
}

export function invalidValueForRangeType (value, rangeType) {
  if (rangeType === 'quantitative') {
    return value.constructor !== Number
  } else if (rangeType === 'categorical') {
    return value.constructor !== String
  } else if (rangeType === 'temporal') {
    return value.constructor !== Date
  }
}

function parseArray (data, parentRangeType, dimension, parentBranch) {
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
