import checkValidScale from '../../utils/checkValidScale.js'

import quantitative from '../coords/quantitative.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, range, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.type || 'squareRoot'
    checkValidScale(prop, variableType, scale, quantitative)

    let scaleFunc = quantitative[scale](domain, range)

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.type || 'equidistant'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain, range)
  }
}
