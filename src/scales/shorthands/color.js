import * as d3 from 'd3'

export default {
  // Diverging
  brownBlue (domain) {
    return d3.scaleDiverging(d3.interpolateBrBG).domain(domain)
  },

  purpleGreen (domain) {
    return d3.scaleDiverging(d3.interpolatePRGn).domain(domain)
  },

  pinkGreen (domain) {
    return d3.scaleDiverging(d3.interpolatePiYG).domain(domain)
  },

  purpleOrange (domain) {
    return d3.scaleDiverging(d3.interpolatePuOr).domain(domain)
  },

  redBlue (domain) {
    return d3.scaleDiverging(d3.interpolateRdBu).domain(domain)
  },

  redGray (domain) {
    return d3.scaleDiverging(d3.interpolateRdGy).domain(domain)
  },

  redYellowBlue (domain) {
    return d3.scaleDiverging(d3.interpolateRdYlBu).domain(domain)
  },

  redYellowGreen (domain) {
    return d3.scaleDiverging(d3.interpolateRdYlGn).domain(domain)
  },

  spectral (domain) {
    return d3.scaleDiverging(d3.interpolateSpectral).domain(domain)
  },

  // Sequential
  blues (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateBlues).domain(domainCopy)
  },

  greens (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateGreens).domain(domainCopy)
  },

  greys (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateGreys).domain(domainCopy)
  },

  oranges (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateOranges).domain(domainCopy)
  },

  purples (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolatePurples).domain(domainCopy)
  },

  reds (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateReds).domain(domainCopy)
  },

  // Sequential - Multi-Hue
  viridis (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateViridis).domain(domainCopy)
  },

  inferno (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateInferno).domain(domainCopy)
  },

  magma (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateMagma).domain(domainCopy)
  },

  plasma (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolatePlasma).domain(domainCopy)
  },

  warm (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateWarm).domain(domainCopy)
  },

  cool (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateCool).domain(domainCopy)
  },

  cubehelixDefault (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateCubehelixDefault).domain(domainCopy)
  },

  // Cyclical
  rainbow (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateRainbow).domain(domainCopy)
  },

  sinebow (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    return d3.scaleSequential(d3.interpolateSinebow).domain(domainCopy)
  }
}
