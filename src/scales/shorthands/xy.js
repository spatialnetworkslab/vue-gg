import * as d3 from 'd3'
import offsetZeroes from '../offsetZeroes.js'

export default {
  linear (domain, range) {
    return d3.scaleLinear().domain(domain).range(range)
  },

  log (domain, range) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (domainCopy[0] === 0) {
      domainCopy[0] += 1e-6
    }

    let scale = d3.scaleLog().domain(domainCopy).range(range)

    return offsetZeroes(scale)
  },

  square (domain, range) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (domainCopy[0] === 0) {
      domainCopy[0] += 1e-6
    }

    let scale = d3.scalePow().exponent(2).domain(domainCopy).range(range)

    return offsetZeroes(scale)
  },

  squareRoot (domain, range) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (domainCopy[0] === 0) {
      domainCopy[0] += 1e-6
    }

    let scale = d3.scalePow().exponent(1 / 2).domain(domain).range(range)

    return offsetZeroes(scale)
  },

  temporal (domain, range) {
    return d3.scaleTime().domain(domain).nice().range(range)
  }
}
