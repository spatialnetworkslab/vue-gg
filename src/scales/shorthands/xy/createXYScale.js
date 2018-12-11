import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'

import numeric from './numeric.js'
import temporal from './temporal.js'
// import nominal from  './nominal'

export default function (prop, context, variableScaling) {
  let variableID = variableScaling.variable
  let variableType = context.metadata.variables[variableID].type

  let domain = context.domains[variableScaling.variable]
  let range = context.ranges[prop]

  if (variableType === 'ratio') {
    let scale = variableScaling.scale || 'linear'
    let fromZero = variableScaling.fromZero || false

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain), range)
    } else {
      return numeric[scale](domain, range)
    }
  }

  if (variableType === 'count') {
    let scale = variableScaling.scale || 'linear'
    let fromZero = variableScaling.fromZero || true

    if (fromZero) {
      return numeric[scale](setDomainFromZero(domain), range)
    } else {
      return numeric[scale](domain, range)
    }
  }

  if (variableType === 'temporal') {
    let scale = variableScaling.scale || 'temporal'

    return temporal[scale](domain, range)
  }

  if (variableType === 'nominal') {
    // let scale = variableMapping.scale || 'nomimal'
  }
}
