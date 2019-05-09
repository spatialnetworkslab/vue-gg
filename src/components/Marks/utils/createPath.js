import { interpolate } from 'd3-interpolate'
import * as d3shape from 'd3-shape'
import * as d3regression from 'd3-regression'

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
const lineGenerator = d3shape.line()
export const createPath = lineGenerator

const path = geoPath(null)
export const createGeoPath = path

export function getGenerator (generator, curveSpec) {
  let allGenerators = {
    'curveBasis': d3shape.curveBasis,
    'curveBasisClosed': d3shape.curveBasisClosed,
    'curveBundle': d3shape.curveBundle.beta(curveSpec.beta),
    'curveCardinal': d3shape.curveCardinal.tension(curveSpec.tension),
    'curveCatmullRom': d3shape.curveCatmullRom.alpha(curveSpec.alpha),
    'curveMonotoneX': d3shape.curveMonotoneX,
    'curveMonotoneY': d3shape.curveMonotoneY,
    'curveNatural': d3shape.curveNatural,
    'curveStep': d3shape.curveStep,
    'curveStepAfter': d3shape.curveStepAfter,
    'curveStepBefore': d3shape.curveStepBefore
  }

  if (generator === true) {
    return d3shape.line().curve(d3shape.curveBasis)
  } else if (generator.constructor === String) {
    return d3shape.line().curve(allGenerators[generator])
  } else {
    console.warn('Curved paths must be specified as string, defaulting to d3.curveCardinal()')
    return d3shape.line().curve(d3shape.curveCardinal.tension(0))
  }
}

// export const arcGenerator = d3.line().curve(d3.curveCardinal.tension(0.96))

export function createArc (points, generator, curveSpec) {
  let arcGenerator = getGenerator(generator, curveSpec)
  return arcGenerator(points)
}

export function createRegress (points, regress, regressSpec, domain) {
  let allRegression = {
    'linear': d3regression.regressionLinear(),
    'exponential': d3regression.regressionExp(),
    'logarithmic': d3regression.regressionLog(),
    'quadratic': d3regression.regressionQuad(),
    'polynomial': d3regression.regressionPoly(),
    'power': d3regression.regressionPow(),
    'loess': d3regression.regressionLoess(),
  }

  let xMin = domain.x[0]
  let yMin = domain.y[0]

  points = points.map(p => [p[0] - xMin, p[1] - yMin])
  let regressionFunc

  if (regress === true) {
    regressionFunc = d3regression.regressionLinear()
  } else if (regress.constructor === String) {
    regressionFunc = allRegression[regress]
  } else {
    console.warn('Regression must be specified as string, defaulting to linear regression.')
    regressionFunc = d3regression.regressionLinear()
  }

  let transformedPoints = regressionFunc(points)

  transformedPoints = transformedPoints.map(p => [p[0] + xMin, p[1] + yMin])

  return transformedPoints
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
