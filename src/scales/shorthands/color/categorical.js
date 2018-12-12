import * as d3 from 'd3'

export default {
  colors
}

function colors (domain, range) {
  return d3.scaleOrdinal().domain(domain).range(range)
}
