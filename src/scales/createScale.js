import createXY from './shorthands/xy/createXY.js'
import createColor from './shorthands/color/createColor.js'
import createOpacity from './shorthands/opacity/createOpacity.js'

export default function (prop, context, variableMapping) {
  if (['x', 'y'].includes(prop)) {
    return createXY(prop, context, variableMapping)
  }

  if (prop === 'color') {
    return createColor(prop, context, variableMapping)
  }

  if (prop === 'opacity') {
    return createOpacity(prop, context, variableMapping)
  }
}
