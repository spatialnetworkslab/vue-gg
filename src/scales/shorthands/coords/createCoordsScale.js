import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'

import numeric from './numeric.js'
import temporal from './temporal.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, range, scalingOptions) {
  if (variableType === 'ratio') {
    let scale = scalingOptions.scale || 'linear'
    let fromZero = scalingOptions.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain), range)
    } else {
      return numeric[scale](domain, range)
    }
  }

  if (variableType === 'count') {
    let scale = scalingOptions.scale || 'linear'
    let fromZero = scalingOptions.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain), range)
    } else {
      return numeric[scale](domain, range)
    }
  }

  if (variableType === 'temporal') {
    let scale = scalingOptions.scale || 'temporal'

    return temporal[scale](domain, range)
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'equidistant'

    return categorical[scale](domain, range)
  }
}
