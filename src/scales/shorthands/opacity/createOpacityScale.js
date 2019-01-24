import checkValidScale from '../../utils/checkValidScale.js'

import quantitative from './quantitative.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.type || 'linear'
    checkValidScale(prop, variableType, scale, quantitative)

    let scaleFunc = quantitative[scale](domain)

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }
}
