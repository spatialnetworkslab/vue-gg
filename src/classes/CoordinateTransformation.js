import * as d3 from 'd3'
import numericCoordScales from '@/scales/shorthands/coords/numeric.js'
import parseDomain from './utils/parseDomain.js'
import parseScale from './utils/parseScale.js'

export default class CoordinateTransformation {
  constructor (options) {
    if (options.type === 'scale') {
      let domainSpecifications = options.domains
      let ranges = options.ranges

      let variableDomains
      let variableMetadata

      if (options.dataContainer) {
        variableDomains = options.dataContainer.getDomains()
        variableMetadata = options.dataContainer.getMetadata()
      }

      let domainX = parseDomain(
        domainSpecifications.x,
        variableDomains,
        variableMetadata
      )

      let domainY = parseDomain(
        domainSpecifications.y,
        variableDomains,
        variableMetadata
      )

      let [scaleTypeX, scaleTypeY] = parseScale(options.scale)

      let scaleX = numericCoordScales[scaleTypeX](domainX, ranges.x)
      let scaleY = numericCoordScales[scaleTypeY](domainY, ranges.y)

      this.transform = ([x, y]) => {
        return [scaleX(x), scaleY(y)]
      }

      this.domains = {
        x: domainX,
        y: domainY
      }

      this.ranges = options.ranges
    }

    if (options.type === 'polar') {
      let domainX = options.domains.x
      let domainY = options.domains.y
      let rangeX = options.ranges.x
      let rangeY = options.ranges.y

      let deltaDomainX = domainX[1] - domainX[0]
      let deltaDomainY = domainY[1] - domainY[0]

      let mirrorDomainX = [-deltaDomainX, deltaDomainX]
      let mirrorDomainY = [-deltaDomainY, deltaDomainY]

      let scaleX = d3.scaleLinear().domain(mirrorDomainX).range(rangeX)
      let scaleY = d3.scaleLinear().domain(mirrorDomainY).range(rangeY)

      let scaleTheta = d3.scaleLinear().domain(domainX).range([0, 2 * Math.PI])

      this.transform = ([x, y]) => {
        let polar = dataToPolar([x, y], scaleTheta)
        let cartesian = polarToCartesian(polar)

        return [scaleX(cartesian[0]), scaleY(cartesian[1])]
      }

      this.domains = options.domains
      this.ranges = options.ranges
    }
  }
}

function dataToPolar ([x, y], scaleTheta) {
  // Since our polar coordinate system starts from the top (12 o'clock) and
  // then goes clockwise, we will map y to the radius and x to theta.
  // Usually people map x to r and y to theta, but that is when the polar
  // system starts on the right (3 o'clock)
  let r = y
  let theta = scaleTheta(x)

  return [r, theta]
}

function polarToCartesian ([r, theta]) {
  let x = r * Math.sin(theta)
  let y = r * Math.cos(theta)

  return [x, y]
}
