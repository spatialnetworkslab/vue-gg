import pointDistance from './pointDistance.js'

export default function ([x, y], lineSegment) {
  let closestPoint = closestPointOnLine([x, y], lineSegment)
  return pointDistance([x, y], closestPoint)
}

// https://stackoverflow.com/a/6853926/7237112
export function closestPointOnLine ([x, y], [i, j]) {
  // Line segment coordinates
  let x1 = i[0]
  let y1 = i[1]
  let x2 = j[0]
  let y2 = j[1]

  let A = x - x1
  let B = y - y1
  let C = x2 - x1
  let D = y2 - y1

  let dot = A * C + B * D
  let lengthSquared = C * C + D * D
  let param = -1
  if (lengthSquared !== 0) { // in case of 0 length line
    param = dot / lengthSquared
  }

  let xx, yy

  if (param < 0) {
    xx = x1
    yy = y1
  } else if (param > 1) {
    xx = x2
    yy = y2
  } else {
    xx = x1 + param * C
    yy = y1 + param * D
  }

  return [xx, yy]
}
