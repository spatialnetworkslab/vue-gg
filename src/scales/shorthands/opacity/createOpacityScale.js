import checkValidScale from '../../utils/checkValidScale.js'
import updateDomain from '../../utils/updateDomain.js'

import quantitative from './quantitative.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, quantitative)

    return quantitative[scale](updateDomain(domain, scalingOptions))
  }
}
