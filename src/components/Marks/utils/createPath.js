import { interpolate } from 'd3-interpolate'
import { line } from 'd3-shape'
import { geoPath } from 'd3-geo'

import { transform } from '../../../utils/geojson.js'

export function interpolatePath (corners, transformer,
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

  let path = createPath(points, transformer, precision)

  return path
}

export function interpolatePathFromFunc (func, transformer, domains,
  precision = 2, resolution = 300) {
  let points = []

  let interpolator = interpolate(...domains.x)

  for (let i = 0; i <= resolution; ++i) {
    let x = interpolator(i / resolution)
    let y = func(x)

    if (inDomain([x, y], domains)) {
      points.push([x, y])
    }
  }

  let path = createPath(points, transformer, precision)

  return path
}

export function createPath (points, transformer, precision = 2) {
  let transformedPoints = points.map(p => {
    return transformer(p).map(c => round(c, precision))
  })

  const lineGenerator = line()
  let path = lineGenerator(transformedPoints)

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

const path = geoPath(null)

export function createGeoPath (feature, transformer) {
  let transformedFeature = transform(feature, transformer)
  return path(transformedFeature)
}
