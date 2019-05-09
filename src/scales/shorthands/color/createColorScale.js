import checkValidScale from '../../utils/checkValidScale.js'
import quantitative from './quantitative.js'
import categorical from './categorical.js'
import scaleFromRange from './scaleFromRange.js'
import createOrdinalScale from '../../utils/createOrdinalScale.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.type || 'blues'
    checkValidScale(prop, variableType, scale, quantitative)

    let scaleFunc = quantitative[scale](domain, scalingOptions.domainMid)

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }

  if (variableType === 'categorical') {
    if (scalingOptions.range) {
      return scaleFromRange(domain, scalingOptions.range)
    } else if (scalingOptions.rangeMin || scalingOptions.rangeMax) {
      throw new Error(`Cannot use 'rangeMin' or 'rangeMax' with categorical color scales`)
    }

    if (scalingOptions.order) {
      // If we are dealing with ordinal data
      let scale = scalingOptions.type || 'blues'
      checkValidScale(prop, variableType, scale, quantitative)
      return createOrdinalScale(domain, scale, quantitative)
    } else {
      // If we are dealing with regular categorical data
      let scale = scalingOptions.type || 'category10'
      checkValidScale(prop, variableType, scale, categorical)

      let scaleFunc = categorical[scale](domain, scalingOptions)

      return scaleFunc
    }
  }

  if (variableType === 'temporal') {
    console.warn('Temporal data not supported for color props')
    return x => 'black'
  }

  if (variableType === 'interval:quantitative') {
    let scale = scalingOptions.type || 'blues'
    checkValidScale(prop, variableType, scale, quantitative)

    return createOrdinalScale(domain, scale, quantitative)
  }
}
