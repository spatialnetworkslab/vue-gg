import createScale from '../../../scales/createScale.js'
import createGeoScale from '../../../scales/createGeoScale.js'
import createBand from '../../../scales/createBand.js'

import mappableProps from '../../../scales/utils/mappableProps.js'

import { transform } from '../../../utils/geojson.js'
import { invalid } from '../../../utils/equals.js'

function getChildren (element) {
  if (element.componentOptions && element.componentOptions.children) {
    return element.componentOptions.children.filter(c => c !== undefined)
  }
}

export function initMappingTree (slotContent) {
  let tree = []
  slotContent.forEach(element => {
    tree.push(createNode(element))
  })
  return tree
}

function createNode (element) {
  let node = {
    scales: {},
    geoScales: {},
    bands: {},
    children: []
  }

  let children = getChildren(element)

  if (children && children.length > 0) {
    element.componentOptions.children.forEach(child => {
      let childNode = createNode(child)
      node.children.push(childNode)
    })
  }

  return node
}

export function extractMappings (mappings, slotContent, context) {
  for (let i = 0; i < slotContent.length; i++) {
    let mapping = mappings[i]
    let element = slotContent[i]

    let updatedMapping = updateMapping(mapping, element, context)
    mapping = updatedMapping || mapping
  }

  return mappings
}

function updateMapping (mapping, element, context) {
  if (element.tag === undefined) { return undefined }

  let props = element.componentOptions.propsData

  for (let propKey in props) {
    if (mappableProps.includes(propKey)) {
      let prop = props[propKey]

      if (prop.constructor === Object && !isFeature(prop)) {
        validateMapping(prop)

        if (prop.hasOwnProperty('scale')) {
          let scaleOptions = prop.scale
          let scaleStr = JSON.stringify(scaleOptions)

          mapping.scales[propKey] = mapping.scales[propKey] || {}

          if (!mapping.scales[propKey].hasOwnProperty(scaleStr)) {
            let compiledScale = createScale(propKey, context, scaleOptions)
            mapping.scales[propKey][scaleStr] = compiledScale
          }
        }

        if (prop.hasOwnProperty('scaleGeo')) {
          let scaleOptions = prop.scaleGeo
          let scaleStr = JSON.stringify(scaleOptions)

          mapping.geoScales[propKey] = mapping.geoScales[propKey] || {}

          if (!mapping.geoScales[propKey].hasOwnProperty(scaleStr)) {
            let { scaleX, scaleY } = createGeoScale(context, scaleOptions)
            mapping.geoScales[propKey][scaleStr] = ([x, y]) => {
              return [scaleX(x), scaleY(y)]
            }
          }
        }

        if (prop.hasOwnProperty('band')) {
          let bandOptions = prop.band
          let bandStr = JSON.stringify(bandOptions)

          mapping.bands[propKey] = mapping.bands[propKey] || {}

          if (!mapping.bands[propKey].hasOwnProperty(bandStr)) {
            let bandWidth = createBand(propKey, context, bandOptions)
            mapping.bands[propKey][bandStr] = bandWidth
          }
        }
      }
    }
  }

  let children = getChildren(element)

  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      let childMapping = mapping.children[i]
      let childElement = children[i]

      let updatedMapping = updateMapping(childMapping, childElement, context)
      childMapping = updatedMapping || childMapping
    }
  }

  return mapping
}

export function mapRow (mappings, slotContent, rowNumber) {
  for (let i = 0; i < slotContent.length; i++) {
    let mapping = mappings[i]
    let element = slotContent[i]

    slotContent[i] = mapElement(mapping, element, rowNumber)
  }

  return slotContent
}

function mapElement (mapping, element, rowNumber) {
  if (element.tag === undefined) { return undefined }

  let props = element.componentOptions.propsData

  let newProps = {}

  for (let propKey in props) {
    let prop = props[propKey]

    if (prop.constructor === Object && !isFeature(prop) && mappableProps.includes(propKey)) {
      let value
      if (prop.hasOwnProperty('val')) {
        value = prop.val

        if (prop.hasOwnProperty('scale')) {
          let scaleKey = JSON.stringify(prop.scale)
          let scale = mapping.scales[propKey][scaleKey]

          value = applyScale(value, scale, propKey)
        }

        if (prop.hasOwnProperty('scaleGeo')) {
          let scaleKey = JSON.stringify(prop.scaleGeo)
          let scale = mapping.geoScales[propKey][scaleKey]

          value = applyScale(value, scale, propKey)
        }
      }

      if (prop.hasOwnProperty('band')) {
        let bandKey = JSON.stringify(prop.band)
        let band = mapping.bands[propKey][bandKey]

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
  } else {
    let tag = element.componentOptions.tag
    console.warn(`Skipping '${tag}', row ${rowNumber + 1} because of unhandled NA values.`)
    return undefined
  }

  let children = getChildren(element)
  if (children && children.length > 0) {
    children = mapRow(mapping.children, children, rowNumber)
  }

  return element
}

function isFeature (prop) {
  return prop.hasOwnProperty('type') && prop.hasOwnProperty('coordinates')
}

function applyScale (value, scale, propKey) {
  if (invalid(value)) return

  if (['x', 'y', 'points', 'geometry', 'x2', 'y2'].includes(propKey)) {
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
        newProps[propKey] = value.map(v => invalid(v) ? replaceValue : v)
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
    throw new Error(`Missing required mapping object keys 'val' or 'band'`)
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
