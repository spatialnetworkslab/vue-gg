import { interpolate } from 'd3-interpolate'
import * as d3 from 'd3-shape'
import regression from 'regression'

import { geoPath } from 'd3-geo'

import { transform } from '../../../utils/geojson.js'

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
const lineGenerator = d3.line()
export const createPath = lineGenerator

const path = geoPath(null)
export const createGeoPath = path

export function getGenerator (generator, curveSpec) {
  let allGenerators = {
    'curveBasis': d3.curveBasis,
    'curveBasisClosed': d3.curveBasisClosed,
    'curveBundle': d3.curveBundle.beta(curveSpec.beta),
    'curveCardinal': d3.curveCardinal.tension(curveSpec.tension),
    'curveCatmullRom': d3.curveCatmullRom.alpha(curveSpec.alpha),
    'curveMonotoneX': d3.curveMonotoneX,
    'curveMonotoneY': d3.curveMonotoneY,
    'curveNatural': d3.curveNatural,
    'curveStep': d3.curveStep,
    'curveStepAfter': d3.curveStepAfter,
    'curveStepBefore': d3.curveStepBefore
  }

  if (generator === true) {
    return d3.line().curve(d3.curveBasis)
  } else if (generator.constructor === String) {
    return d3.line().curve(allGenerators[generator])
  } else {
    console.warn('Curved paths must be specified as string, defaulting to d3.curveCardinal()')
    return d3.line().curve(d3.curveCardinal.tension(0))
  }
}

// export const arcGenerator = d3.line().curve(d3.curveCardinal.tension(0.96))

export function createArc (points, generator, curveSpec) {
  let arcGenerator = getGenerator(generator, curveSpec)
  return arcGenerator(points)
}

export function createRegress (points, regress, regressSpec) {
  let allRegression = {
    'linear': regression.linear,
    'exponential': regression.exponential,
    'logarithmic': regression.logarithmic,
    'power': regression.power,
    'polynomial': regression.polynomial
  }

  let regressionFunc

  if (regress === true) {
    regressionFunc = regression.linear
  } else if (regress.constructor === String) {
    regressionFunc = allRegression[regress]
  } else {
    console.warn('Regression must be specified as string, defaulting to linear regression.')
    regressionFunc = regression.linear
  }

  let transformedPoints = regressionFunc(points, regressSpec).points

  let lineGenerator = d3.line().curve(d3.curveBasis)
  let path = lineGenerator(transformedPoints)

  return path
}

// Helpers
function round (input, precision) {
  return Math.round(input * 10 ** precision) / 10 ** precision
}

function inDomain (point, domains) {
  let yMin = Math.min(...domains.y)
  let yMax = Math.max(...domains.y)
  return point[1] > yMin && point[1] < yMax
}
