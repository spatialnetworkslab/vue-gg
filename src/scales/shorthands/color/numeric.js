import * as d3 from 'd3'

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
  sinebow
}

// Diverging
function brownBlue (domain) {
  return d3.scaleDiverging(d3.interpolateBrBG).domain(domain)
}

function purpleGreen (domain) {
  return d3.scaleDiverging(d3.interpolatePRGn).domain(domain)
}

function pinkGreen (domain) {
  return d3.scaleDiverging(d3.interpolatePiYG).domain(domain)
}

function purpleOrange (domain) {
  return d3.scaleDiverging(d3.interpolatePuOr).domain(domain)
}

function redBlue (domain) {
  return d3.scaleDiverging(d3.interpolateRdBu).domain(domain)
}

function redGray (domain) {
  return d3.scaleDiverging(d3.interpolateRdGy).domain(domain)
}

function redYellowBlue (domain) {
  return d3.scaleDiverging(d3.interpolateRdYlBu).domain(domain)
}

function redYellowGreen (domain) {
  return d3.scaleDiverging(d3.interpolateRdYlGn).domain(domain)
}

function spectral (domain) {
  return d3.scaleDiverging(d3.interpolateSpectral).domain(domain)
}

// Sequential
function blues (domain) {
  return d3.scaleSequential(d3.interpolateBlues).domain(domain)
}

function greens (domain) {
  return d3.scaleSequential(d3.interpolateGreens).domain(domain)
}

function greys (domain) {
  return d3.scaleSequential(d3.interpolateGreys).domain(domain)
}

function oranges (domain) {
  return d3.scaleSequential(d3.interpolateOranges).domain(domain)
}

function purples (domain) {
  return d3.scaleSequential(d3.interpolatePurples).domain(domain)
}

function reds (domain) {
  return d3.scaleSequential(d3.interpolateReds).domain(domain)
}

// Sequential - Multi-Hue
function viridis (domain) {
  return d3.scaleSequential(d3.interpolateViridis).domain(domain)
}

function inferno (domain) {
  return d3.scaleSequential(d3.interpolateInferno).domain(domain)
}

function magma (domain) {
  return d3.scaleSequential(d3.interpolateMagma).domain(domain)
}

function plasma (domain) {
  return d3.scaleSequential(d3.interpolatePlasma).domain(domain)
}

function warm (domain) {
  return d3.scaleSequential(d3.interpolateWarm).domain(domain)
}

function cool (domain) {
  return d3.scaleSequential(d3.interpolateCool).domain(domain)
}

function cubehelixDefault (domain) {
  return d3.scaleSequential(d3.interpolateCubehelixDefault).domain(domain)
}

// Cyclical
function rainbow (domain) {
  return d3.scaleSequential(d3.interpolateRainbow).domain(domain)
}

function sinebow (domain) {
  return d3.scaleSequential(d3.interpolateSinebow).domain(domain)
}