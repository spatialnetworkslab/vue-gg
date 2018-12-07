import * as d3 from 'd3'
import offsetZeroes from '../offsetZeroes.js'

export function linear (prop, { domains, ranges }, { variable }) {
  let domain = domains[variable]
  let range = ranges[prop]

  return d3.scaleLinear().domain(domain).range(range)
}

export function log (prop, { domains, ranges }, { variable }) {
  let domain = domains[variable]
  if (domain[0] === 0) {
    domain[0] += 1e-6
  }
  let range = ranges[prop]

  let scale = d3.scaleLog().domain(domain).range(range)

  return offsetZeroes(scale)
}

export function square (prop, { domains, ranges }, { variable }) {
  let domain = domains[variable]
  if (domain[0] === 0) {
    domain[0] += 1e-6
  }
  let range = ranges[prop]

  let scale = d3.scalePow().exponent(2).domain(domain).range(range)

  return offsetZeroes(scale)
}

export function squareRoot (prop, { domains, ranges }, { variable }) {
  let domain = domains[variable]
  if (domain[0] === 0) {
    domain[0] += 1e-6
  }
  let range = ranges[prop]

  let scale = d3.scalePow().exponent(1 / 2).domain(domain).range(range)

  return offsetZeroes(scale)
}

export function temporal (prop, { domains, ranges }, { variable }) {
  let domain = domains[variable]
  let range = ranges[prop]

  return d3.scaleTime().domain(domain).nice().range(range)
}
