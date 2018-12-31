import createScale from '../../../scales/createScale.js'
import createPositioner from '../../../positioners/createPositioner.js'

import { is } from '../../../utils/equals.js'
import getDimension from '../../../utils/getDimension.js'
import convertToQuantitative from '../../../utils/convertToQuantitative.js'

export default function (aesthetics, context, dataContainer) {
  let assigners = {}
  let scales = {}
  let funcs = {}
  let positioners = {}

  // First, extract the assigners, scales, getter-funcs and positioners
  for (let aesKey in aesthetics) {
    let passedProp = aesthetics[aesKey]

    if (passedProp.hasOwnProperty('assign') && is(passedProp.assign)) {
      assigners[aesKey] = passedProp.assign
    }
    if (passedProp.hasOwnProperty('scale')) {
      scales[aesKey] = passedProp.scale
    }
    if (passedProp.hasOwnProperty('func')) {
      funcs[aesKey] = passedProp.func
    }
    if (passedProp.hasOwnProperty('position')) {
      positioners[aesKey] = passedProp.position
    }
  }

  // Second, we will parse the scales
  let parsedScales = {}

  for (let aesKey in scales) {
    let scalingOptions = scales[aesKey]
    // The scale can be specified in three ways:
    // 1. Set the scale with a shorthand with the default settings
    // 2. Set the scale with a shorthand with custom settings
    // 3. Set the scale by constructing your own scale

    // 1. Set the scale with a shorthand with the default settings.
    // Here we just need the string id of the variable we want to scale
    if (scalingOptions.constructor === String) {
      parsedScales[aesKey] = createScale(aesKey, context, {
        variable: scalingOptions
      })
    }

    if (scalingOptions.constructor === Object) {
      // 2. Set the scale with a shorthand with custom settings
      // In this case we need an object with options with at least a 'variable' key.
      if (!scalingOptions.construct) {
        parsedScales[aesKey] = createScale(aesKey, context, scalingOptions)
      }

      // 3. Set the scale by constructing your own scale
      // In this case we need a 'construct' function. 'variable' key is optional.
      if (scalingOptions.construct) {
        parsedScales[aesKey] = scalingOptions.construct(context)
      }
    }
  }

  // Third, we apply the scales, functions and assigners and calculate props for each mark
  let aestheticsPerMark = []

  dataContainer.forEachRow((row, i) => {
    let props = {}

    for (let aesKey in aesthetics) {
      // If a scale has been specified for this aesthetic:
      if (is(scales[aesKey])) {
        // If the scale was specified a string, it is assumed to be the
        // identifier of a variable (see above).
        if (scales[aesKey].constructor === String) {
          let variable = scales[aesKey]
          props[aesKey] = parsedScales[aesKey](row[variable])
        }

        // If the scale was specified as an object:
        if (scales[aesKey].constructor === Object) {
          // If scales[key].variable is specified, it will be used
          // as the identifier of a variable.
          if (scales[aesKey].hasOwnProperty('variable')) {
            let variable = scales[aesKey].variable
            props[aesKey] = parsedScales[aesKey](row[variable])
          } else {
            // If scales[key].variable is not specified, we will pass the
            // entire row to the mapping function instead of just the value for
            // that variable in that row.
            props[aesKey] = parsedScales[aesKey](row)
          }
        }
      } else if (is(funcs[aesKey])) {
        // If a function was used instead of a scale object:
        // We pass it the entire row, the row index and the context object
        let value = funcs[aesKey](row, i, context)

        // If the value is categorical or temporal, and a coord,
        // we have to convert it to quantitative
        let dimension = getDimension(aesKey)
        if (dimension && [String, Date].includes(value.constructor)) {
          props[aesKey] = convertToQuantitative(value, dimension, context.parentBranch)
        } else {
          props[aesKey] = value
        }
      } else if (is(assigners[aesKey])) {
        // Finally, if there were no scales or getter functions specified,
        // we will assign a constant value if necessary.
        props[aesKey] = assigners[aesKey]
      }
    }

    aestheticsPerMark.push(props)
  })

  // Fourth, we will apply positioning if necessary
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
