import mappableProps from '../../../scales/utils/mappableProps.js'

import { transform } from '../../../utils/geojson.js'
import { invalid } from '../../../utils/equals.js'

export default function mapRow (mappings, slotContent, rowNumber) {
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

  if (['x', 'y', 'points', 'geometry', 'x2', 'y2', 'strokeWidth'].includes(propKey)) {
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
