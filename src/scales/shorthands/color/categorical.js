import { scaleOrdinal } from 'd3-scale'

export default {
  colors
}

function colors (domain, range) {
  return scaleOrdinal().domain(domain).range(range)
}
