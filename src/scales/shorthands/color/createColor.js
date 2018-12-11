import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'
import numeric from './numeric.js'

export default function (prop, context, variableMapping) {
  let variableID = variableMapping.variable
  let variableType = context.metadata.variables[variableID].type

  let domain = context.domains[variableMapping.variable]

  if (variableType === 'ratio') {
    let scale = variableMapping.scale || 'blues'
    let fromZero = variableMapping.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'count') {
    let scale = variableMapping.scale || 'reds'
    let fromZero = variableMapping.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain))
    } else {
      return numeric[scale](domain)
    }
  }

  if (variableType === 'nominal') {

  }
}
