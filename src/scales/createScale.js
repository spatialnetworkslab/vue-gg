import createCoordsScale from './shorthands/coords/createCoordsScale.js'
import createColorScale from './shorthands/color/createColorScale.js'
import createOpacityScale from './shorthands/opacity/createOpacityScale.js'

export default function (prop, context, variableScaling) {
  if (['x', 'y'].includes(prop)) {
    return createCoordsScale(prop, context, variableScaling)
  }

  if (prop === 'color') {
    return createColorScale(prop, context, variableScaling)
  }

  if (prop === 'opacity') {
    return createOpacityScale(prop, context, variableScaling)
  }
}
