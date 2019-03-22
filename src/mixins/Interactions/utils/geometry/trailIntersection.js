import { closestPointOnLine } from './distanceToClosestPointLine.js'
import pointDistance from './pointDistance.js'

export default function (mouseCoordinates, points) {
  for (let i = 0; i < points.length - 1; i++) {
    let j = i + 1
    let a = points[i].coord
    let b = points[j].coord

    let lineSegment = [a, b]
    let closestPoint = closestPointOnLine(
      mouseCoordinates,
      lineSegment
    )
    let distanceToClosestPoint = pointDistance(mouseCoordinates, closestPoint)

    let widthA = points[i].strokeWidth
    let widthB = points[j].strokeWidth
    let lineWidthAtClosestPoint = getWidthAtPoint(a, b, widthA, widthB, closestPoint)

    if (lineWidthAtClosestPoint > distanceToClosestPoint) {
      return true
    }
  }

  return false
}

function getWidthAtPoint (a, b, widthA, widthB, point) {
  let lineLength = pointDistance(a, b)
  let lengthToPoint = pointDistance(a, point)
  let positionOnLine = lengthToPoint / lineLength

  let widthDelta = widthA - widthB
  return widthA + (widthDelta * positionOnLine)
}
