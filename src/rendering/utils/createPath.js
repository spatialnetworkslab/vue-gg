import { interpolate } from 'd3-interpolate'
import { line, curveCardinal } from 'd3-shape'
import { geoPath } from 'd3-geo'

import { transform } from '../../utils/geojson.js'

// Step 1: interpolation
export function interpolatePoints (corners, resolution = 100) {
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

  return points
}

export function interpolatePointsFromFunc (func, domains, resolution = 300) {
  let points = []

  let interpolator = interpolate(...domains.x)

  for (let i = 0; i <= resolution; ++i) {
    let x = interpolator(i / resolution)
    let y = func(x)

    if (inDomain([x, y], domains)) {
      points.push([x, y])
    }
  }

  return points
}

// Step 2: Transformation
export function transformPoints (points, transformer, precision = 2) {
  return points.map(p => {
    return transformer(p).map(c => round(c, precision))
  })
}

export const transformFeature = transform

// Step 3: Path creation
const lineGenerator = line()
export const createPath = lineGenerator

const path = geoPath(null)
export const createGeoPath = path

export const arcGenerator = line().curve(curveCardinal.tension(0.96))

// Helpers
function round (input, precision) {
  return Math.round(input * 10 ** precision) / 10 ** precision
}

function inDomain (point, domains) {
  let yMin = Math.min(...domains.y)
  let yMax = Math.max(...domains.y)
  return point[1] > yMin && point[1] < yMax
}
