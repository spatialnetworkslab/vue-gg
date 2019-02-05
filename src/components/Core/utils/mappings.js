import createScale from '../../../scales/createScale.js'
import createGeoScale from '../../../scales/createGeoScale.js'
import createPositioner from '../../../positioners/createPositioner.js'

import { transform } from '../../../utils/geojson.js'
import { invalid } from '../../../utils/equals.js'

export function extractMappings (props, context) {
  let scales = {}
  let positioners = {}
  let replaceNA = {}

  for (let propKey in props) {
    let prop = props[propKey]
    if (prop.constructor === Object && !isFeature(prop)) {
      if (prop.hasOwnProperty('scale')) { scales[propKey] = prop.scale }
      if (prop.hasOwnProperty('scaleGeo')) {
        scales[propKey] = prop.scaleGeo
        scales[propKey].geo = true
      }
      if (prop.hasOwnProperty('position')) { positioners[propKey] = prop.position }
      if (prop.hasOwnProperty('NA')) { replaceNA[propKey] = prop.NA }
    }
  }

  scales = parseScales(scales, context)

  return { scales, positioners, replaceNA }
}

export function mapRow (props, { scales, replaceNA }) {
  let newProps = {}
  for (let propKey in props) {
    let prop = props[propKey]

    if (prop.constructor === Object) {
      if (isFeature(prop)) {
        newProps[propKey] = prop
      } else {
        if (prop.hasOwnProperty('val')) {
          let value = prop.val

          if (scales.hasOwnProperty(propKey)) {
            value = applyScale(value, scales[propKey])
          }

          newProps[propKey] = value
        } else {
          newProps[propKey] = prop
        }
      }
    } else {
      newProps[propKey] = prop
    }
  }

  newProps = replaceMissing(newProps, replaceNA)

  return newProps
}

export function applyPositioners (aestheticsPerMark, positioners, context) {
  if (Object.keys(positioners).length > 0) {
    for (let aesKey in positioners) {
      let positioningOptions = positioners[aesKey]

      if (positioningOptions.constructor !== Array) {
        let position

        if (positioningOptions.constructor === String) {
          position = createPositioner(aesKey, context, { positioner: positioningOptions })
        }

        if (positioningOptions.constructor === Object) {
          position = createPositioner(aesKey, context, positioningOptions)
        }

        position(aestheticsPerMark) // Positioners work in-place
      }

      // Positioners can be chained by passing an array of positioningOptions-objects
      if (positioningOptions.constructor === Array) {
        for (let chainedOptions of positioningOptions) {
          let position

          if (chainedOptions.constructor === String) {
            position = createPositioner(aesKey, context, { positioner: chainedOptions })
          }

          if (chainedOptions.constructor === Object) {
            position = createPositioner(aesKey, context, chainedOptions)
          }

          position(aestheticsPerMark) // Positioners work in-place
        }
      }
    }
  }

  return aestheticsPerMark
}

function isFeature (prop) {
  return prop.hasOwnProperty('type') && prop.hasOwnProperty('coordinates')
}

function parseScales (scales, context) {
  let parsedScales = {}

  for (let aesKey in scales) {
    let scalingOptions = scales[aesKey]
    if (scalingOptions.geo) {
      let { scaleX, scaleY } = createGeoScale(context, scalingOptions)
      parsedScales[aesKey] = ([x, y]) => {
        return [scaleX(x), scaleY(y)]
      }
    } else {
      parsedScales[aesKey] = createScale(aesKey, context, scalingOptions)
    }
  }

  return parsedScales
}

function applyScale (value, scale) {
  if (value.constructor === Array) {
    // points (array of arrays)
    if (value[0].constructor === Array) {
      // TODO
    }

    // coordinateSet (array of x or y coordinates)
    if (value[0].constructor !== Array) {
      return value.map(val => scale(val))
    }
  } else if (value.constructor === Object) {
    // geojson feature
    if (isFeature(value)) {
      return transform(value, scale)
    }
  } else {
    return scale(value)
  }
}

function replaceMissing (props, replaceValues) {
  let newProps = {}

  for (let propKey in props) {
    let value = props[propKey]
    let replaceValue = replaceValues[propKey]

    // If both are invalid, we will need to skip this row
    if (invalid(value) && invalid(replaceValue)) {
      return undefined
    }

    if (!invalid(replaceValue)) {
      if (invalid(value)) {
        newProps[propKey] = replaceValue
      } else if (value.constructor === Array) {
        newProps[propKey] = value.map(v => invalid(v) ? replaceValue : value)
      } else {
        newProps[propKey] = value
      }
    } else {
      newProps[propKey] = value
    }
  }

  return newProps
}
