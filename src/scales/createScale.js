import * as xy from './shorthands/xy.js'

export default function (prop, context, variableMapping) {
  if (['x', 'y'].includes(prop)) {
    return xy[variableMapping.scale](prop, context, variableMapping)
  }
}
