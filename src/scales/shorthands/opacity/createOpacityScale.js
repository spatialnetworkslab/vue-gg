import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'
import numeric from './numeric.js'

export default function (prop, context, variableScaling) {
  let variableID = variableScaling.variable
  let variableType = context.metadata.variables[variableID].type

  let domain = context.domains[variableScaling.variable]

  if (variableType === 'ratio') {
    let scale = variableScaling.scale || 'linear'
    let fromZero = variableScaling.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'count') {
    let scale = variableScaling.scale || 'linear'
    let fromZero = variableScaling.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }
}
