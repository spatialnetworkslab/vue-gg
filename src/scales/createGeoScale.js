import createCoordsScale from './shorthands/coords/createCoordsScale.js'

export default function ({ ranges, dataInterface }) {
  let domainX = dataInterface.getDomain('geometry.x')
  let domainY = dataInterface.getDomain('geometry.y')

  let rangeDeltaX = ranges.x[1] - ranges.x[0]
  let rangeDeltaY = ranges.y[1] - ranges.y[0]
  let midX = (ranges.x[0] + ranges.x[1]) / 2
  let midY = (ranges.y[0] + ranges.y[1]) / 2

  let scalingFactorX = rangeDeltaX / (domainX[1] - domainX[0])
  let scalingFactorY = rangeDeltaY / (domainY[1] - domainY[0])

  let center = [midX, midY]
  let scaleX
  let scaleY

  if (scalingFactorX < scalingFactorY) {
    let fromMidY = (domainY[1] - domainY[0]) / 2 * scalingFactorX
    let newRangeY = [midY - fromMidY, midY + fromMidY]

    scaleX = createCoordsScale('x', 'quantitative', domainX, ranges.x, {})
    scaleY = createCoordsScale('y', 'quantitative', domainY, newRangeY, {})
  }

  if (scalingFactorX >= scalingFactorY) {
    let fromMidX = (domainX[1] - domainX[0]) / 2 * scalingFactorY
    let newRangeX = [midX - fromMidX, midX + fromMidX]

    scaleX = createCoordsScale('x', 'quantitative', domainX, newRangeX, {})
    scaleY = createCoordsScale('y', 'quantitative', domainY, ranges.y, {})
  }

  return { scaleX, scaleY, center }
}
