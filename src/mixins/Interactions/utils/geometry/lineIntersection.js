import distanceToClosestPointLine from './distanceToClosestPointLine.js'

export default function (pointCoordinates, lineWidth, lineCoordinates) {
  for (let i = 0; i < (lineCoordinates.length - 1); i++) {
    let j = i + 1
    let lineSegment = [lineCoordinates[i], lineCoordinates[j]]
    let distanceToClosestPoint = distanceToClosestPointLine(pointCoordinates,
      lineSegment)
    if (distanceToClosestPoint < lineWidth) {
      return true
    }
  }
  return false
}
