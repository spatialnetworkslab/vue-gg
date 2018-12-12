import wh from './wh.js'

export default function (prop, context, variablePositioning, currentMapping) {
  if (['w', 'h'].includes(prop)) {
    let dimension = variablePositioning.dimension || prop === 'w' ? 'x' : 'y'
    let positioner = variablePositioning.positioner || 'bulge'

    let domain = context.domains[dimension]
    let mapping = currentMapping[dimension]

    return wh[positioner](domain, mapping, variablePositioning)
  }
}
