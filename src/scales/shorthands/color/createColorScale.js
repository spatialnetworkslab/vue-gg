import checkValidScale from '../../utils/checkValidScale.js'
import updateDomain from '../../utils/updateDomain.js'

import quantitative from './quantitative.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'blues'
    checkValidScale(prop, variableType, scale, quantitative)

    let scaleFunc = quantitative[scale](updateDomain(domain, scalingOptions), scalingOptions.domainMid)
    if (scalingOptions.absolute) {
      return x => scaleFunc(Math.abs(x))
    }
    if (!scalingOptions.absolute) {
      return scaleFunc
    }
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'colors'
    checkValidScale(prop, variableType, scale, categorical)

    if (scalingOptions.domain) {
      console.warn('Cannot modify categorical domain')
    }

    return categorical[scale](domain)
  }
}
