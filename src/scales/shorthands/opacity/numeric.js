import * as d3 from 'd3'

export default {
  linear (domain) {
    return d3.scaleLinear().domain(domain).range([0, 1])
  }
}
