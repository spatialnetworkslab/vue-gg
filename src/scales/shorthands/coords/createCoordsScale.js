import checkValidScale from '../../utils/checkValidScale.js'

import quantitative from './quantitative.js'
import temporal from './temporal.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, range, scalingOptions) {

  if (variableType === 'quantitative') {
    let scale = scalingOptions.type || 'linear'
    checkValidScale(prop, variableType, scale, quantitative)
    console.log('check', scale, domain, range, scalingOptions)
    let scaleFunc = quantitative[scale](domain, range)

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }

  if (variableType === 'temporal') {
    let scale = scalingOptions.type || 'temporal'
    checkValidScale(prop, variableType, scale, temporal)

    return temporal[scale](domain, range)
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.type || 'equidistant'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain, range)
  }
}
