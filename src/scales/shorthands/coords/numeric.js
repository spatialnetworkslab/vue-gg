import * as d3 from 'd3-scale'
import offsetZeroes from '@/scales/utils/offsetZeroes.js'

export default {
  linear,
  log,
  square,
  squareRoot
}

function linear (domain, range) {
  return d3.scaleLinear().domain(domain).range(range)
}

function log (domain, range) {
  let domainCopy = JSON.parse(JSON.stringify(domain))
  if (domainCopy[0] === 0) {
    domainCopy[0] += 1e-6
  }

  let scale = d3.scaleLog().domain(domainCopy).range(range)

  return offsetZeroes(scale)
}

function square (domain, range) {
  let domainCopy = JSON.parse(JSON.stringify(domain))
  if (domainCopy[0] === 0) {
    domainCopy[0] += 1e-6
  }

  let scale = d3.scalePow().exponent(2).domain(domainCopy).range(range)

  return scale
}

function squareRoot (domain, range) {
  let domainCopy = JSON.parse(JSON.stringify(domain))
  if (domainCopy[0] === 0) {
    domainCopy[0] += 1e-6
  }

  let scale = d3.scalePow().exponent(1 / 2).domain(domain).range(range)

  return scale
}
