import createCoordsScale from './shorthands/coords/createCoordsScale.js'
import createColorScale from './shorthands/color/createColorScale.js'
import createNumericScale from './shorthands/numeric/createNumericScale.js'
import createShapeScale from './shorthands/shape/createShapeScale.js'

import parseScaleOptions from './utils/parseScaleOptions.js'
import parseRange from './utils/parseRange.js'
import getPrimitive from './utils/getPrimitive.js'

import mappableProps from './utils/mappableProps.js'
import getPropType from './utils/getPropType.js'

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

  let propType = getPropType(prop)

  // Coordinate props
  if (propType === 'coord') {
    domainType = getPrimitive(domainType)
    let dimension = getDimension(prop)
    let range = context.ranges[dimension]
    range = parseRange(range, scalingOptions)

    return createCoordsScale(prop, domainType, domain, range, scalingOptions)
  }

  // for interval data, either continuous or ordinal behavior
  // Color props
  if (propType === 'color') {
    // current fix: when the domain type is interval:quantitative
    // either the whole data column is retrieved to serve as domain
    // or a section of the domain is given as an array
    if (domainType.includes('interval')) {
      if (scalingOptions.domain.constructor === String) {
        domain = JSON.parse(JSON.stringify(context.dataInterface.getColumn(scalingOptions.domain)))
        domain.sort((a, b) => a[0] - b[0])
      } else if (scalingOptions.domain.constructor === Array) {
        domain = scalingOptions.domain
      }
    }
    return createColorScale(prop, domainType, domain, scalingOptions, context)
  }

  // Numeric props
  if (propType === 'numeric') {
    // current fix: when the domain type is interval:quantitative
    // either the whole data column is retrieved to serve as domain
    // or a section of the domain is given as an array
    if (domainType.includes('interval')) {
      if (scalingOptions.domain.constructor === String) {
        domain = JSON.parse(JSON.stringify(context.dataInterface.getColumn(scalingOptions.domain)))
        domain.sort((a, b) => a[0] - b[0])
      } else if (scalingOptions.domain.constructor === Array) {
        domain = scalingOptions.domain
      }
    }
    return createNumericScale(prop, domainType, domain, scalingOptions)
  }

  if (propType === 'shape') {
    return createShapeScale(prop, domainType, domain, scalingOptions)
  }
}
