import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'
import numeric from './numeric.js'
import categorical from './categorical.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'ratio') {
    let scale = scalingOptions.scale || 'blues'
    let fromZero = scalingOptions.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'count') {
    let scale = scalingOptions.scale || 'reds'
    let fromZero = scalingOptions.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'categorical') {
    let scale = scalingOptions.scale || 'colors'
    return categorical[scale](domain)
  }
}
