import distanceToClosestPointLine from './distanceToClosestPointLine.js'

export default function (mouseCoordinates, lineWidth, lineCoordinates) {
  for (let i = 0; i < (lineCoordinates.length - 1); i++) {
    let j = i + 1
    let lineSegment = [lineCoordinates[i], lineCoordinates[j]]
    let distanceToClosestPoint = distanceToClosestPointLine(mouseCoordinates,
      lineSegment)
    if (distanceToClosestPoint < lineWidth) {
      return true
    }
  }
  return false
}
