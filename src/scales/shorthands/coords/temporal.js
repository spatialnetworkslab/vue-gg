import * as d3 from 'd3-scale'

export default {
  temporal
}

function temporal (domain, range) {
  console.log(domain)
  return d3.scaleTime().domain(domain).nice().range(range)
}
