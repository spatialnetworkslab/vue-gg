import { is, isnt } from '../../../utils/equals.js'
import convertToQuantitative from '../../../utils/convertToQuantitative.js'

export default function (prop, { dimension, wh }) {
  let parentRangeType = this.parentRangeTypes[dimension]

  if (!this.$$map) {
    if (is(prop) && prop.constructor === Object) {
      throw new Error('Trying to map without vgg-map component.')
    }

    if (is(prop)) {
      // Here we check whether the passed prop (String, Number, etc)
      // is compatible with the parent domain (categorical, quantitative, etc)
      if (invalidValueForRangeType(prop, parentRangeType)) {
        throw new Error(`Invalid input ${prop} for parent Section domain type ${parentRangeType}`)
      } else {
        if (['categorical', 'temporal'].includes(parentRangeType)) {
          if (wh) {
            throw new Error(`Cannot set 'w' or 'h' value in parent domain '${parentRangeType}'`)
          }
          // We will already convert categorical and temporal data here.
          return convertToQuantitative(prop, dimension, this.parentBranch)
        }
        return prop
      }
    }
    if (isnt(prop)) {
      return undefined
    }
  }

  if (this.$$map) {
    let isObject = is(prop) && prop.constructor === Object

    if (is(prop) && isObject) {
      // block object mapping syntax if used with categorical or temporal
      // parent domain
      if (['categorical', 'temporal'].includes(parentRangeType) && prop.hasOwnProperty('scale')) {
        throw new Error(`Cannot scale ${prop} to parent Section domain type ${parentRangeType}`)
      }
      return prop
    }
    if (is(prop) && !isObject) {
      // Here we check whether the passed prop (String, Number, etc)
      // is compatible with the parent domain (categorical, quantitative, etc)
      if (invalidValueForRangeType(prop, parentRangeType)) {
        throw new Error(`Invalid input ${prop} for parent Section domain type ${parentRangeType}`)
      } else {
        if (['categorical', 'temporal'].includes(parentRangeType)) {
          if (wh) {
            throw new Error(`Cannot set 'w' or 'h' value in parent domain '${parentRangeType}'`)
          }
          // We will already convert categorical and temporal data here.
          return { assign: convertToQuantitative(prop, dimension, this.parentBranch) }
        }
        return { assign: prop }
      }
    }
    if (isnt(prop)) {
      return { assign: undefined }
    }
  }
}

function invalidValueForRangeType (value, rangeType) {
  if (rangeType === 'quantitative') {
    return value.constructor !== Number
  } else if (rangeType === 'categorical') {
    return value.constructor !== String
  } else if (rangeType === 'temporal') {
    return value.constructor !== Date
  }
}
