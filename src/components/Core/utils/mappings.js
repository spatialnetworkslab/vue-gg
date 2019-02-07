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
      geoScales: {},
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

      if (prop.constructor === Object && !isFeature(prop)) {
        validateMapping(prop)

        if (prop.hasOwnProperty('scale')) {
          let scaleOptions = prop.scale
          let scaleStr = JSON.stringify(scaleOptions)

          mappings[i].scales[propKey] = mappings[i].scales[propKey] || {}

          if (!mappings[i].scales[propKey].hasOwnProperty(scaleStr)) {
            let compiledScale = createScale(propKey, context, scaleOptions)
            mappings[i].scales[propKey][scaleStr] = compiledScale
          }
        }

        if (prop.hasOwnProperty('scaleGeo')) {
          let scaleOptions = prop.scaleGeo
          let scaleStr = JSON.stringify(scaleOptions)

          mappings[i].geoScales[propKey] = mappings[i].geoScales[propKey] || {}

          if (!mappings[i].geoScales[propKey].hasOwnProperty(scaleStr)) {
            let { scaleX, scaleY } = createGeoScale(context, scaleOptions)
            mappings[i].geoScales[propKey][scaleStr] = ([x, y]) => {
              return [scaleX(x), scaleY(y)]
            }
          }
        }

        if (prop.hasOwnProperty('band')) {
          let bandOptions = prop.band
          let bandStr = JSON.stringify(bandOptions)

          mappings[i].bands[propKey] = mappings[i].bands[propKey] || {}

          if (!mappings[i].bands[propKey].hasOwnProperty(bandStr)) {
            let bandWidth = createBand(propKey, context, bandOptions)
            mappings[i].bands[propKey][bandStr] = bandWidth
          }
        }
      }
    }
  }

  return mappings
}

export function mapRow (slotContent, mappings, rowNumber) {
  let mappedElements = []

  for (let i = 0; i < slotContent.length; i++) {
    let element = slotContent[i]
    let slotMapping = mappings[i]

    if (element.tag === undefined) {
      mappedElements.push(undefined)
      continue
    }

    let props = element.componentOptions.propsData
    let newProps = {}

    for (let propKey in props) {
      let prop = props[propKey]

      if (prop.constructor === Object && !isFeature(prop)) {
        let value
        if (prop.hasOwnProperty('val')) {
          value = prop.val

          if (prop.hasOwnProperty('scale')) {
            let scaleKey = JSON.stringify(prop.scale)
            let scale = slotMapping.scales[propKey][scaleKey]

            value = applyScale(value, scale)
          }

          if (prop.hasOwnProperty('scaleGeo')) {
            let scaleKey = JSON.stringify(prop.scaleGeo)
            let scale = slotMapping.geoScales[propKey][scaleKey]

            value = applyScale(value, scale)
          }
        }

        if (prop.hasOwnProperty('band')) {
          let bandKey = JSON.stringify(prop.band)
          let band = slotMapping.bands[propKey][bandKey]

          value = band
        }
        newProps[propKey] = value
      } else {
        newProps[propKey] = prop
      }
    }

    newProps = replaceMissing(newProps, props)
    if (newProps) {
      element.componentOptions.propsData = newProps
      mappedElements.push(element)
    } else {
      let tag = element.componentOptions.tag
      console.warn(`Skipping Mark '${tag}', row ${rowNumber + 1} because of unhandled NA values.`)
    }
  }

  return mappedElements
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

function replaceMissing (newProps, props) {
  for (let propKey in newProps) {
    let value = newProps[propKey]
    let replaceValue
    if (props[propKey] && props[propKey].constructor === Object) {
      replaceValue = props[propKey].NA
    }

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

function validateMapping (mapping) {
  if (!mapping.hasOwnProperty('val') && !mapping.hasOwnProperty('band')) {
    throw new Error(`Missing required object keys 'val' or 'band'`)
  }

  if (mapping.hasOwnProperty('band')) {
    if (['val', 'scale', 'scaleGeo'].some(key => mapping.hasOwnProperty(key))) {
      throw new Error(`Cannot combine 'band' with other mapping options`)
    }
  }

  if (mapping.hasOwnProperty('val')) {
    if (['scale', 'scaleGeo'].every(key => mapping.hasOwnProperty(key))) {
      throw new Error(`Cannot combine 'scale' and 'scaleGeo'`)
    }
  } else {
    if (mapping.hasOwnProperty('NA')) {
      throw new Error(`Can only use 'NA' in combination with 'val'`)
    }
  }
}
