import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'
import numeric from './numeric.js'

export default function (prop, variableType, domain, scalingOptions) {
  if (variableType === 'ratio') {
    let scale = scalingOptions.scale || 'linear'
    let fromZero = scalingOptions.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'count') {
    let scale = scalingOptions.scale || 'linear'
    let fromZero = scalingOptions.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }
}
