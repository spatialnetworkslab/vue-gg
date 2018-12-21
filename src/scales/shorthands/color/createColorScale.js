import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'
import checkValidScale from '@/scales/utils/checkValidScale.js'

import numeric from './numeric.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'ratio') {
    let scale = scalingOptions.scale || 'blues'
    checkValidScale(prop, variableType, scale, numeric)
    let fromZero = scalingOptions.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'count') {
    let scale = scalingOptions.scale || 'reds'
    checkValidScale(prop, variableType, scale, numeric)
    let fromZero = scalingOptions.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'colors'
    checkValidScale(prop, variableType, scale, categorical)

    return categorical[scale](domain)
  }
}
