import { interpolate } from 'd3-interpolate'
import * as d3 from 'd3-shape'
import regression from 'regression'
import { geoPath } from 'd3-geo'

import { transform } from '../../../utils/geojson.js'

export function interpolatePath (corners, transformer, generator, curveSpec, regress, regressSpec,
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

  let path = createPath(points, transformer, generator, curveSpec, regress, regressSpec, precision)

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

  let path = createPath(points, transformer, undefined, undefined, undefined, undefined, precision)

  return path
}

export function getGenerator (generator, curveSpec = { beta: 0, tension: 0, alpha: 0 }) {
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

  if (!generator) {
    return d3.line()
  } else if (generator === true) {
    return d3.line().curve(d3.curveBasis)
  } else if (generator.constructor === String) {
    return d3.line().curve(allGenerators[generator])
  } else {
    console.warn('Curved paths must be specified as string, defaulting to d3.line()')
    return d3.line()
  }
}

export function createPath (points, transformer, generator, curveSpec,
  regress, regressSpec = { order: 2, precision: 2 }, precision = 2) {
  let transformedPoints = points.map(p => {
    return transformer(p).map(c => round(c, precision))
  })

  let lineGenerator

  if (regress === 'linear') {
    transformedPoints = regression.linear(transformedPoints, regressSpec).points
    lineGenerator = d3.line().curve(d3.curveBasis)
  } else if (regress === 'exponential') {
    transformedPoints = regression.exponential(transformedPoints, regressSpec).points
    lineGenerator = d3.line().curve(d3.curveBasis)
  } else if (regress === 'logarithmic') {
    transformedPoints = regression.logarithmic(transformedPoints, regressSpec).points
    lineGenerator = d3.line().curve(d3.curveBasis)
  } else if (regress === 'power') {
    transformedPoints = regression.power(transformedPoints, regressSpec).points
    lineGenerator = d3.line().curve(d3.curveBasis)
  } else if (regress === 'polynomial') {
    transformedPoints = regression.polynomial(transformedPoints, regressSpec).points
    lineGenerator = d3.line().curve(d3.curveBasis)
  } else if (regress) {
    transformedPoints = regression.linear(transformedPoints, regressSpec).points
    lineGenerator = d3.line().curve(d3.curveBasis)
  } else {
    lineGenerator = getGenerator(generator, curveSpec)
  }

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
