import checkValidScale from '../../utils/checkValidScale.js'
import updateDomain from '../../utils/updateDomain.js'

import quantitative from './quantitative.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'blues'
    checkValidScale(prop, variableType, scale, quantitative)

    return quantitative[scale](updateDomain(domain, scalingOptions))
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'colors'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain)
  }
}
