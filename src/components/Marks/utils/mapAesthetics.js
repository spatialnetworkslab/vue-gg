import createScale from '@/scales/createScale.js'
import createPositioner from '@/positioners/createPositioner.js'

import { is } from '@/utils/equals.js'

export default function (aesthetics, context, dataContainer) {
  let assigners = {}
  let scales = {}
  let positioners = {}

  // First, extract the assigners, scales and positioners
  for (let aesKey in aesthetics) {
    let passedProp = aesthetics[aesKey]

    if (passedProp.hasOwnProperty('assign') && is(passedProp.assign)) {
      assigners[aesKey] = passedProp.assign
    }
    if (passedProp.hasOwnProperty('scale')) {
      scales[aesKey] = passedProp.scale
    }
    if (passedProp.hasOwnProperty('position')) {
      positioners[aesKey] = passedProp.position
    }
  }

  // Second, we will parse the assigners and scales
  let parsedScales = assigners

  for (let aesKey in scales) {
    let scalingOptions = scales[aesKey]
    // The scale can be specified in four ways:
    // 1. Set the scale with a shorthand with the default settings
    // 2. Set the scale with a shorthand with custom settings
    // 3. Set the scale by constructing your own scale
    // 4. Use a getter function, for custom stuff or an identity scale
    //
    // These four ways are specified through the constructor of the
    // aestheticScaling variable. Respectively:

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

    // 4. Use a getter function that takes (row, i)
    if (scalingOptions.constructor === Function) {
      parsedScales[aesKey] = scalingOptions
    }
  }

  // Third, we apply the scales and calculate props for each mark
  let aestheticsPerMark = []

  dataContainer.forEachRow((row, i) => {
    let props = {}

    for (let aesKey in parsedScales) {
      // Now we will use the assigned values and scaling to calculate prop values.

      // If a scale has been specified:
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

        // If a function was passed, we will pass the entire row to that function
        if (scales[aesKey].constructor === Function) {
          props[aesKey] = parsedScales[aesKey](row, i)
        }
      } else if (is(assigners[aesKey])) {
        // Finally, if no scaling is happening,
        // we will check if there is anything that should be assigned.
        props[aesKey] = assigners[aesKey]
      }
    }

    aestheticsPerMark.push(props)
  })

  // Fourth, we will apply positioning if necessary
  if (Object.keys(positioners).length > 0) {
    for (let aesKey in positioners) {
      let positioningOptions = positioners[aesKey]
      let position

      if (positioningOptions.constructor === String) {
        position = createPositioner(aesKey, context, { positioner: positioningOptions })
      }

      if (positioningOptions.constructor === Object) {
        position = createPositioner(aesKey, context, positioningOptions)
      }

      position(aestheticsPerMark) // Positioners work in-place
    }
  }

  return aestheticsPerMark
}