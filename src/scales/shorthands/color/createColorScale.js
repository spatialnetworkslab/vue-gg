import checkValidScale from '../../utils/checkValidScale.js'

import quantitative from './quantitative.js'
import categorical from './categorical.js'

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
    let scale = scalingOptions.type || 'colors'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain, scalingOptions.range)
  }
}
