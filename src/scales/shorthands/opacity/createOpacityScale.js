import checkValidScale from '../../utils/checkValidScale.js'

import quantitative from './quantitative.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.type || 'linear'
    let scaleFunc
    checkValidScale(prop, variableType, scale, quantitative)

    if (scalingOptions.range) {
      scaleFunc = quantitative[scale](domain, scalingOptions.range)
    } else {
      scaleFunc = quantitative[scale](domain)
    }

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }
}
