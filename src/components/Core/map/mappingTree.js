import stringify from 'fast-stringify'

import createScale from '../../../scales/createScale.js'
import createGeoScale from '../../../scales/createGeoScale.js'
import createBand from '../../../scales/createBand.js'

import mappableProps from '../../../scales/utils/mappableProps.js'

export function initMappingTree (slotContent) {
  let tree = []
  slotContent.forEach(element => {
    tree.push(createNode(element))
  })

  return tree
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

function createNode (element) {
  let node = {
    scales: {},
    geoScales: {},
    bands: {},
    children: []
  }

  let children = getChildren(element)

  if (children) {
    element.componentOptions.children.forEach(child => {
      let childNode = createNode(child)
      node.children.push(childNode)
    })
  }

  return node
}

function updateMapping (mapping, element, context) {
  if (!element || element.tag === undefined) { return undefined }

  if (!mapping) {
    let newMapping = createNode(element)
    updateMapping(newMapping, element, context)
  }

  let props = element.componentOptions.propsData

  for (let propKey in props) {
    if (mappableProps.includes(propKey)) {
      let prop = props[propKey]

      if (prop.constructor === Object && !isFeature(prop)) {
        validateMapping(prop)

        if (prop.hasOwnProperty('scale')) {
          let scaleOptions = prop.scale
          let scaleStr = stringify(scaleOptions)

          mapping.scales[propKey] = mapping.scales[propKey] || {}

          if (!mapping.scales[propKey].hasOwnProperty(scaleStr)) {
            let compiledScale = createScale(propKey, context, scaleOptions)
            mapping.scales[propKey][scaleStr] = compiledScale
          }
        }

        if (prop.hasOwnProperty('scaleGeo')) {
          let scaleOptions = prop.scaleGeo
          let scaleStr = stringify(scaleOptions)

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
          let bandStr = stringify(bandOptions)

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

export function getChildren (element) {
  if (element && element.componentOptions && element.componentOptions.children) {
    return element.componentOptions.children
  }
}

function isFeature (prop) {
  return prop.hasOwnProperty('type') && prop.hasOwnProperty('coordinates')
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
