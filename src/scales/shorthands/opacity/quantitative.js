import * as d3 from 'd3-scale'

export default {
  linear (domain, range) {
    if (range) {
      return d3.scaleLinear().domain(domain).range(range)
    } else {
      return d3.scaleLinear().domain(domain).range([0, 1])
    }
  }
}
