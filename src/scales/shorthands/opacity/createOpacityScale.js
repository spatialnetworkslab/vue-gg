import setDomainFromZero from '../../utils/setDomainFromZero.js'
import checkValidScale from '../../utils/checkValidScale.js'

import numeric from './numeric.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'quantitative') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, numeric)
    let fromZero = scalingOptions.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }
}
