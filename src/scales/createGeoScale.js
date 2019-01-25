import createCoordsScale from './shorthands/coords/createCoordsScale.js'

export default function (domains, ranges) {
  let rangeDeltaX = ranges.x[1] - ranges.x[0]
  let rangeDeltaY = ranges.y[1] - ranges.y[0]
  let midX = (ranges.x[0] + ranges.x[1]) / 2
  let midY = (ranges.y[0] + ranges.y[1]) / 2

  let scalingFactorX = rangeDeltaX / (domains.x[1] - domains.x[0])
  let scalingFactorY = rangeDeltaY / (domains.y[1] - domains.y[0])

  let center = [midX, midY]
  let scaleX
  let scaleY

  if (scalingFactorX < scalingFactorY) {
    let fromMidX = rangeDeltaX / 2
    let newRangeY = [midY - fromMidX, midY + fromMidX]

    scaleX = createCoordsScale('x', 'quantitative', domains.x, ranges.x, {})
    scaleY = createCoordsScale('y', 'quantitative', domains.y, newRangeY, {})
  }

  if (scalingFactorX > scalingFactorY) {
    let fromMidY = rangeDeltaY / 2
    let newRangeX = [midX - fromMidY, midX + fromMidY]

    scaleX = createCoordsScale('x', 'quantitative', domains.x, newRangeX, {})
    scaleY = createCoordsScale('y', 'quantitative', domains.y, ranges.y, {})
  }

  return { scaleX, scaleY, center }
}
