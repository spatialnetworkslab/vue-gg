import * as d3 from 'd3'

export default {
  temporal
}

function temporal (domain, range) {
  return d3.scaleTime().domain(domain).nice().range(range)
}
