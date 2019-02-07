import createScale from '../../../scales/createScale.js'
import createGeoScale from '../../../scales/createGeoScale.js'
import createBand from '../../../scales/createBand.js'

import { transform } from '../../../utils/geojson.js'
import { invalid } from '../../../utils/equals.js'

export function initMappings (slotContent) {
  let mappings = []
  for (let i = 0; i < slotContent.length; i++) {
    mappings.push({
      scales: {},
      NA: {},
      bands: {}
    })
  }

  return mappings
}

export function extractMappings (mappings, slotContent, context) {
  for (let i = 0; i < slotContent.length; i++) {
    let element = slotContent[i]

    if (element.tag === undefined) { continue }

    let props = element.componentOptions.propsData

    for (let propKey in props) {
      let prop = props[propKey]

      if (prop.constructor === Object) {
        if (!isFeature(prop)) {
          if (!prop.hasOwnProperty('val') && !prop.hasOwnProperty('band')) {
            throw new Error(`Missing required object keys 'val' or 'band'`)
          }

          if (prop.hasOwnProperty('scale')) {
            let scaleOptions = prop.scale
            let scaleStr = JSON.stringify(scaleOptions)

            if (!mappings[i].scales.hasOwnProperty(scaleStr)) {
              let compiledScale = createScale(propKey, context, scaleOptions)
              mappings[i].scales[scaleStr] = compiledScale
            }
          }

          if (prop.hasOwnProperty('scaleGeo')) {
            let scaleOptions = prop.scaleGeo
            scaleOptions._geo = true
            let scaleStr = JSON.stringify(scaleOptions)

            if (!mappings[i].scales.hasOwnProperty(scaleStr)) {
              let compiledScale = createGeoScale(context, scaleOptions)
              mappings[i].scales[scaleStr] = compiledScale
            }
          }

          if (prop.hasOwnProperty('band')) {
            let bandOptions = prop.band
            let bandStr = JSON.stringify(bandOptions)

            if (!mappings[i].bands.hasOwnProperty(bandStr)) {
              let bandWidth = createBand(propKey, context, bandOptions)
              mappings[i].bands[bandStr] = bandWidth
            }
          }
        }
      }
    }
  }
}

export function mapRow (props, { scales, replaceNA }) {
  let newProps = {}

  // TODO

  newProps = replaceMissing(newProps, replaceNA)

  return newProps
}

function isFeature (prop) {
  return prop.hasOwnProperty('type') && prop.hasOwnProperty('coordinates')
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
