import setDomainFromZero from '@/scales/utils/setDomainFromZero.js'

import numeric from './numeric.js'
import temporal from './temporal.js'
import nominal from './nominal.js'

export default function (prop, context, variableScaling) {
  let variableID = variableScaling.variable
  let variableType = context.metadata.variables[variableID].type

  let domain = context.domains[variableScaling.variable]

  let dimension = getDimension(prop)
  let range = context.ranges[dimension]

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
    let scale = variableScaling.scale || 'equidistant'

    return nominal[scale](domain, range)
  }
}

function getDimension (prop) {
  if (['x', 'x1', 'x2', 'w'].includes(prop)) { return 'x' }
  if (['y', 'y1', 'y2', 'h'].includes(prop)) { return 'y' }
}
