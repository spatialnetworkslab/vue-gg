import wh from './wh.js'

export default function (prop, context, positioningSettings) {
  if (['w', 'h'].includes(prop)) {
    let positioner = positioningSettings.positioner

    let dimension = positioningSettings.dimension || prop === 'w' ? 'x' : 'y'
    let range = context.ranges[dimension]

    return wh[positioner](range, positioningSettings, prop)
  }
}
