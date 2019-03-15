import checkValidScale from '../../utils/checkValidScale.js'
import quantitative from './quantitative.js'
import categorical from './categorical.js'
import scaleFromRange from './scaleFromRange.js'

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
    if (scalingOptions.ranges) {
      return scaleFromRange(domain, scalingOptions.ranges)
    } else if (scalingOptions.rangeMin || scalingOptions.rangeMax){
      console.warn('Categorical color scales use `ranges` to specify custom color scales. Using default color scale `category10`')
    }

    let scale = scalingOptions.type || 'category10'
    checkValidScale(prop, variableType, scale, categorical)

    let scaleFunc = categorical[scale](domain, scalingOptions)

    return scaleFunc

  }
}
