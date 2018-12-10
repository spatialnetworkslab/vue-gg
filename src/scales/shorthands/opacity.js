import * as d3 from 'd3'

export default {
  linear (domain, fromZero) {
    let domainCopy = JSON.parse(JSON.stringify(domain))
    if (fromZero) { domainCopy[0] = 0 }
    let range = [0, 1]

    return d3.scaleLinear().domain(domainCopy).range(range)
  }
}
