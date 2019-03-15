import createCoordsScale from './shorthands/coords/createCoordsScale.js'
import createColorScale from './shorthands/color/createColorScale.js'
import createOpacityScale from './shorthands/opacity/createOpacityScale.js'
import createRadiusScale from './shorthands/radius/createRadiusScale.js'
import createShapeScale from './shorthands/shape/createShapeScale.js'

import parseScaleOptions from './utils/parseScaleOptions.js'
import parseRange from './utils/parseRange.js'
import getPrimitive from './utils/getPrimitive.js'

import getDimension from '../utils/getDimension.js'

export default function (prop, context, passedScalingOptions) {
  let [domain, domainType, scalingOptions] = parseScaleOptions(
    passedScalingOptions,
    context.dataInterface,
    context.scaleManager
  )

  domainType = getPrimitive(domainType)

  // Coordinate props
  if (['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(prop)) {
    let dimension = getDimension(prop)
    let range = context.ranges[dimension]
    range = parseRange(range, scalingOptions)

    return createCoordsScale(prop, domainType, domain, range, scalingOptions)
  }

  // Other aesthetic props
  if (['stroke', 'fill', 'color'].includes(prop)) {
    return createColorScale(prop, domainType, domain, scalingOptions)
  }

  if (['opacity', 'strokeOpacity', 'fillOpacity'].includes(prop)) {
    return createOpacityScale(prop, domainType, domain, scalingOptions)
  }

  if (['shape'].includes (prop)) {
    return createShapeScale(prop, domainType, domain, scalingOptions)
  }

  // Pixel-value props
  if (['width', 'height', 'fontSize', 'strokeWidth', 'size'].includes(prop)) {
    let range

    if (!scalingOptions.range) {
      console.warn(`No range specified for prop ${prop}. Defaulting to [0, 10]`)
      range = [0, 10]
    } else { range = scalingOptions.range }
    return createCoordsScale(prop, domainType, domain, range, scalingOptions)
  }

  if (prop === 'radius') {
    let range
    if (!scalingOptions.range) {
      console.warn(`No range specified for prop ${prop}. Defaulting to [0, 8]`)
      range = [0, 8]
    } else { range = scalingOptions.range }

    return createRadiusScale(prop, domainType, domain, range, scalingOptions)
  }
}
