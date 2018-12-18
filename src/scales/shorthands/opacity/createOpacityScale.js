import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'
import checkValidScale from '@/scales/utils/checkValidScale.js'

import numeric from './numeric.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'ratio') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, numeric)
    let fromZero = scalingOptions.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'count') {
    let scale = scalingOptions.scale || 'linear'
    checkValidScale(prop, variableType, scale, numeric)
    let fromZero = scalingOptions.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }
}
