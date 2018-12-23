import { interpolate } from 'd3-interpolate'

export function interpolatePath (corners, transformer, close = false,
  precision = 2, resolution = 100) {
  let points = []
  points.push(corners[0])

  for (let i = 0; i < corners.length - 1; ++i) {
    let from = corners[i]
    let to = corners[i + 1]

    let interpolator = interpolate(from, to)

    for (let j = 1; j <= resolution; ++j) {
      let point = interpolator(j / resolution)
      points.push([point[0], point[1]]) // this pushes a deep copy of 'point'
    }
  }

  let path = createPath(points, transformer, close, precision)

  return path
}

export function interpolatePathFromFunc (func, transformer, domains,
  close = false, precision = 2, resolution = 300) {
  let points = []

  let interpolator = interpolate(...domains.x)

  for (let i = 0; i <= resolution; ++i) {
    let x = interpolator(i / resolution)
    let y = func(x)

    if (inDomain([x, y], domains)) {
      points.push([x, y])
    }
  }

  let path = createPath(points, transformer, close, precision)

  return path
}

function createPath (points, transformer, close = false, precision = 2) {
  let [ x, y ] = transformer(points[0]).map(c => round(c, precision))

  let path = `M ${x} ${y}`

  for (let i = 1; i < points.length; ++i) {
    [ x, y ] = transformer(points[i]).map(c => round(c, precision))

    path += ` L ${x} ${y}`
  }

  if (close) { path += ' Z' }

  return path
}

function round (input, precision) {
  return Math.round(input * 10 ** precision) / 10 ** precision
}

function inDomain (point, domains) {
  let yMin = Math.min(...domains.y)
  let yMax = Math.max(...domains.y)
  return point[1] > yMin && point[1] < yMax
}
