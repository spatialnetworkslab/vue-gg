import checkValidScale from '../../utils/checkValidScale.js'
import createOrdinalScale from '../../utils/createOrdinalScale.js'

import quantitative from './quantitative.js'

export default function (prop, variableType, domain, scalingOptions) {
  let scale = scalingOptions.type || 'linear'
  checkValidScale(prop, variableType, scale, quantitative)

  if (variableType === 'quantitative') {
    let scaleFunc = quantitative[scale](domain)

    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }

  if (variableType === 'categorical') {
    if (!scalingOptions.order) {
      console.warn(`prop '${prop}': no order specified for categorical data. Using order of appearance as default.`)
    }

    let scaleFunc = createOrdinalScale(domain, scale, scalingOptions, quantitative)
    return scaleFunc
  }
}
