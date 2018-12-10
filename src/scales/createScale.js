import xy from './shorthands/xy.js'
import color from './shorthands/color.js'
import opacity from './shorthands/opacity.js'

export default function (prop, context, variableMapping) {
  if (['x', 'y'].includes(prop)) {
    let domain = context.domains[variableMapping.variable]
    let range = context.ranges[prop]

    return xy[variableMapping.scale](domain, range)
  }

  if (['color'].includes(prop)) {
    console.log(context)
    let domain = context.domains[variableMapping.variable]
    let fromZero = variableMapping.fromZero

    return color[variableMapping.scale](domain, fromZero)
  }

  if (['opacity'].includes(prop)) {
    let domain = context.domains[variableMapping.variable]

    return opacity[variableMapping.scale](domain)
  }
}
