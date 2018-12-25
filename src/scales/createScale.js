import createCoordsScale from './shorthands/coords/createCoordsScale.js'
import createColorScale from './shorthands/color/createColorScale.js'
import createOpacityScale from './shorthands/opacity/createOpacityScale.js'

import getDimension from '../utils/getDimension.js'
import getDataType from '../utils/getDataType.js'

export default function (prop, context, scalingOptions) {
  let domain = context.domains[scalingOptions.variable]
  let variableType = getDataType(domain[0])

  if (['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(prop)) {
    let dimension = getDimension(prop)
    let range = context.ranges[dimension]

    return createCoordsScale(prop, variableType, domain, range, scalingOptions)
  }

  if (prop === 'color') {
    return createColorScale(prop, variableType, domain, scalingOptions)
  }

  if (prop === 'opacity') {
    return createOpacityScale(prop, variableType, domain, scalingOptions)
  }
}
