import createScale from '../../../scales/createScale.js'
import createPositioner from '../../../positioners/createPositioner.js'

import { is, invalid } from '../../../utils/equals.js'
import getDimension from '../../../utils/getDimension.js'
import convertToQuantitative from '../../../utils/convertToQuantitative.js'

export default function (aesthetics, context) {
  let dataInterface = context.dataInterface

  // First, extract the assigners, scales, getters, positioners and replaceNA's
  let { assigners, scales, getters, positioners, replaceNA } = extractMappings(aesthetics)

  // Second, we will parse the scales
  let parsedScales = parseScales(scales, context)

  // Third, we apply the scales, functions and assigners and calculate props for each mark
  let aestheticsPerMark = []

  dataInterface.forEachRow((row, i, prevRow, nextRow) => {
    let props = mapRow(row, i, prevRow, nextRow, aesthetics, parsedScales, getters, assigners, context)
    let parsedProps = parseProps(props, replaceNA, context)

    if (parsedProps) {
      aestheticsPerMark.push(parsedProps)
    } else {
      console.warn(`Skipping row ${i + 1} which contains unhandled invalid values`)
    }
  })

  // Fourth, we will apply positioning if necessary
  aestheticsPerMark = applyPositioners(aestheticsPerMark, positioners, context)

  return aestheticsPerMark
}

function extractMappings (mappings) {
  let assigners = {}
  let scales = {}
  let getters = {}
  let positioners = {}
  let replaceNA = {}

  for (let aesKey in mappings) {
    let passedProp = mappings[aesKey]

    if (passedProp.hasOwnProperty('assign') && is(passedProp.assign)) {
      assigners[aesKey] = passedProp.assign
    }
    if (passedProp.hasOwnProperty('scale')) {
      scales[aesKey] = passedProp.scale
    }
    if (passedProp.hasOwnProperty('get')) {
      // Getters can be specified as strings or functions. When specified as a string,
      // the getter string will be converted to a function here.
      if (passedProp.get.constructor === String) {
        getters[aesKey] = row => row[passedProp.get]
      } else {
        getters[aesKey] = passedProp.get
      }
    }
    if (passedProp.hasOwnProperty('position')) {
      positioners[aesKey] = passedProp.position
    }
    if (passedProp.hasOwnProperty('NA')) {
      replaceNA[aesKey] = passedProp.NA
    }
  }

  return { assigners, scales, getters, positioners, replaceNA }
}

function parseScales (scales, context) {
  let parsedScales = {}

  for (let aesKey in scales) {
    let scalingOptions = scales[aesKey]
    parsedScales[aesKey] = createScale(aesKey, context, scalingOptions)
  }

  return parsedScales
}

function mapRow (row, i, prevRow, nextRow, aesthetics, parsedScales, getters, assigners, context) {
  let props = {}
  for (let aesKey in aesthetics) {
    let value

    // If a 'get' option was specified:.
    if (is(getters[aesKey])) {
      // Use getter to get the right value
      value = getters[aesKey](row, i, prevRow, nextRow, context)

      // If a scale has been specified, we will also scale the value
      if (parsedScales[aesKey]) {
        value = applyScale(value, parsedScales[aesKey])
      }
    }

    // If we are just assigning a constant:
    if (is(assigners[aesKey])) {
      value = assigners[aesKey]
    }

    if (is(value)) {
      // Check if the value is non-quantitative
      let dimension = getDimension(aesKey)
      if (dimension && [String, Date].includes(value.constructor)) {
        // If so, convert to quantitative
        value = convertToQuantitative(value, dimension, context.parentBranch)
      }

      props[aesKey] = value
    }
  }

  return props
}

function applyPositioners (aestheticsPerMark, positioners, context) {
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

function parseProps (props, replaceNA, context) {
  let newProps = {}

  for (let propKey in props) {
    if (invalid(props[propKey])) {
      let replaceValue = replaceNA[propKey]
      if (invalid(replaceValue)) { return undefined }

      // If the value is categorical or temporal, and a coord-type prop,
      // we have to convert it to quantitative
      let dimension = getDimension(propKey)

      if (dimension && [String, Date].includes(replaceValue.constructor)) {
        newProps[propKey] = convertToQuantitative(replaceValue, dimension, context.parentBranch)
      } else {
        newProps[propKey] = replaceValue
      }
    } else {
      newProps[propKey] = props[propKey]
    }
  }

  return newProps
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
    if (value.hasOwnProperty('type') && value.hasOwnProperty('coordinates')) {
      // TODO
    }
  } else {
    return scale(value)
  }
}
