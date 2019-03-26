import createCoordsScale from './shorthands/coords/createCoordsScale.js'
import createColorScale from './shorthands/color/createColorScale.js'
import createNumericScale from './shorthands/numeric/createNumericScale.js'
import createShapeScale from './shorthands/shape/createShapeScale.js'

import parseScaleOptions from './utils/parseScaleOptions.js'
import parseRange from './utils/parseRange.js'
import getPrimitive from './utils/getPrimitive.js'

import mappableProps from './utils/mappableProps.js'

import getDimension from '../utils/getDimension.js'

export default function (prop, context, passedScalingOptions) {
  if (!mappableProps.includes(prop)) {
    throw new Error(`Prop ${prop} not mappable`)
  }

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

  // Color props
  if (['stroke', 'fill'].includes(prop)) {
    return createColorScale(prop, domainType, domain, scalingOptions)
  }

  // Numeric props
  if ([
    'width', 'height', 'fontSize', 'strokeWidth', 'size',
    'opacity', 'strokeOpacity', 'fillOpacity',
    'radius'
  ].includes(prop)) {
    return createNumericScale(prop, domainType, domain, scalingOptions)
  }

  if (['shape'].includes(prop)) {
    return createShapeScale(prop, domainType, domain, scalingOptions)
  }
}
