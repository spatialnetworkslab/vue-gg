import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'
import numeric from './numeric.js'
import categorical from './categorical.js'

export default function (prop, context, variableScaling) {
  let variableID = variableScaling.variable
  let variableType = context.metadata.variables[variableID].type

  let domain = context.domains[variableScaling.variable]

  if (variableType === 'ratio') {
    let scale = variableScaling.scale || 'blues'
    let fromZero = variableScaling.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'count') {
    let scale = variableScaling.scale || 'reds'
    let fromZero = variableScaling.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'categorical') {
    let scale = variableScaling.scale || 'colors'
    return categorical[scale](domain)
  }
}
