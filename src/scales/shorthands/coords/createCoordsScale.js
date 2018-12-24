import setDomainFromZero from '../../utils/setDomainFromZero.js'
import checkValidScale from '../../utils/checkValidScale.js'

import numeric from './numeric.js'
import temporal from './temporal.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, range, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, numeric)
    let fromZero = scalingOptions.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain), range)
    } else {
      return numeric[scale](domain, range)
    }
  }

  if (variableType === 'temporal') {
    let scale = scalingOptions.scale || 'temporal'
    checkValidScale(prop, variableType, scale, temporal)

    return temporal[scale](domain, range)
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'equidistant'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain, range)
  }
}
