// import { range } from 'd3'
import * as d3 from 'd3-scale-chromatic'
import { scaleLinear, scaleDiverging, scaleSequential, scalePow, scaleLog, scaleSqrt, scaleQuantile, scaleQuantize } from 'd3-scale'

export default {
  brownBlue,
  purpleGreen,
  pinkGreen,
  purpleOrange,
  redBlue,
  redGray,
  redYellowBlue,
  redYellowGreen,
  spectral,

  blues,
  greens,
  greys,
  oranges,
  purples,
  reds,

  viridis,
  inferno,
  magma,
  plasma,
  warm,
  cool,
  cubehelixDefault,

  rainbow,
  sinebow,

  log,
  linear,
  exp,
  squareRoot,
  quantile,
  quantize
}

function scale (interpolator, domain, domainMid) {
  if (domainMid) {
    if (domainMid.constructor !== Number) {
      throw new Error('domainMid must be Number')
    }
    let newDomain = [domain[0], domainMid, domain[1]]
    return scaleDiverging(interpolator).domain(newDomain)
  } else {
    return scaleSequential(interpolator).domain(domain)
  }
}

// Diverging
function brownBlue (domain, domainMid) {
  return scale(d3.interpolateBrBG, domain, domainMid)
}

function purpleGreen (domain, domainMid) {
  return scale(d3.interpolatePRGn, domain, domainMid)
}

function pinkGreen (domain, domainMid) {
  return scale(d3.interpolatePiYG, domain, domainMid)
}

function purpleOrange (domain, domainMid) {
  return scale(d3.interpolatePuOr, domain, domainMid)
}

function redBlue (domain, domainMid) {
  return scale(d3.interpolateRdBu, domain, domainMid)
}

function redGray (domain, domainMid) {
  return scale(d3.interpolateRdGy, domain, domainMid)
}

function redYellowBlue (domain, domainMid) {
  return scale(d3.interpolateRdYlBu, domain, domainMid)
}

function redYellowGreen (domain, domainMid) {
  return scale(d3.interpolateRdYlGn, domain, domainMid)
}

function spectral (domain, domainMid) {
  return scale(d3.interpolateSpectral, domain, domainMid)
}

// Sequential
function blues (domain, domainMid) {
  return scale(d3.interpolateBlues, domain, domainMid)
}

function greens (domain, domainMid) {
  return scale(d3.interpolateGreens, domain, domainMid)
}

function greys (domain, domainMid) {
  return scale(d3.interpolateGreys, domain, domainMid)
}

function oranges (domain, domainMid) {
  return scale(d3.interpolateOranges, domain, domainMid)
}

function purples (domain, domainMid) {
  return scale(d3.interpolatePurples, domain, domainMid)
}

function reds (domain, domainMid) {
  return scale(d3.interpolateReds, domain, domainMid)
}

// Sequential - Multi-Hue
function viridis (domain, domainMid) {
  return scale(d3.interpolateViridis, domain, domainMid)
}

function inferno (domain, domainMid) {
  return scale(d3.interpolateInferno, domain, domainMid)
}

function magma (domain, domainMid) {
  return scale(d3.interpolateMagma, domain, domainMid)
}

function plasma (domain, domainMid) {
  return scale(d3.interpolatePlasma, domain, domainMid)
}

function warm (domain, domainMid) {
  return scale(d3.interpolateWarm, domain, domainMid)
}

function cool (domain, domainMid) {
  return scale(d3.interpolateCool, domain, domainMid)
}

function cubehelixDefault (domain, domainMid) {
  return scale(d3.interpolateCubehelixDefault, domain, domainMid)
}

// Cyclical
function rainbow (domain, domainMid) {
  return scale(d3.interpolateRainbow, domain, domainMid)
}

function sinebow (domain, domainMid) {
  return scale(d3.interpolateSinebow, domain, domainMid)
}

function log (domain, colorRange) {
  // console.log(scaleLog().domain(domain).range(range))
  // console.log()
  // let numRange = [0, 500]
  // let logScale = scaleLog().domain(domain).range(numRange)
  //
  // // Map colours across the range in equal intervals
  // let numColors = colorRange.length
  // let diff = numRange[1] - numRange[0]
  //
  // let step = diff / (colorRange.length - 1)
  // console.log(range, numRange, step, numColors)
  // let forInvert = range(numColors).map(function (d) { return numRange[0] + d * step })
  // let logColors = forInvert.map(logScale.invert)
  // console.log(logColors, colorRange)
  // let logColourScale = scaleLog().domain(logColors).range(colorRange)
  return scaleLog().domain(domain).range(colorRange)
}

function exp (domain, range) {
  return scalePow().domain(domain).range(range)
}

function squareRoot (domain, range) {
  return scaleSqrt().domain(domain).range(range)
}

function quantile (domain, range) {
  return scaleQuantile().domain(domain).range(range)
}

function quantize (domain, range) {
  return scaleQuantize().domain(domain).range(range)
}

function linear (domain, range) {
  return scaleLinear().domain(domain).range(range)
}
