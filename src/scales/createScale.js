import createCoordsScale from './shorthands/coords/createCoordsScale.js'
import createColorScale from './shorthands/color/createColorScale.js'
import createOpacityScale from './shorthands/opacity/createOpacityScale.js'
import createRadiusScale from './shorthands/radius/createRadiusScale.js'

import getDimension from '../utils/getDimension.js'
import getDataType from '../utils/getDataType.js'

export default function (prop, context, scalingOptions) {
  let domain = context.domains[scalingOptions.variable]
  let variableType = getDataType(domain[0])

  // Coordinate props
  if (['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(prop)) {
    let dimension = getDimension(prop)
    let range = context.ranges[dimension]

    return createCoordsScale(prop, variableType, domain, range, scalingOptions)
  }

  // Other aesthetic props
  if (prop === 'color') {
    return createColorScale(prop, variableType, domain, scalingOptions)
  }

  if (prop === 'opacity') {
    return createOpacityScale(prop, variableType, domain, scalingOptions)
  }

  // Pixel-value props
  if (['width', 'height', 'fontSize', 'strokeWidth'].includes(prop)) {
    let range
    if (!scalingOptions.range) {
      console.warn(`No range specified for prop ${prop}. Defaulting to [0, 10]`)
      range = [0, 10]
    } else { range = scalingOptions.range }

    return createCoordsScale(prop, variableType, domain, range, scalingOptions)
  }

  if (prop === 'radius') {
    let range
    if (!scalingOptions.range) {
      console.warn(`No range specified for prop ${prop}. Defaulting to [0, 8]`)
      range = [0, 8]
    } else { range = scalingOptions.range }

    return createRadiusScale(prop, variableType, domain, range, scalingOptions)
  }
}
