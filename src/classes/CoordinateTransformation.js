import * as d3 from 'd3'
import coordsScales from '@/scales/shorthands/coords/numeric.js'

export default class CoordinateTransformation {
  constructor (options) {
    // For every type other than 'custom', we will expect two more option keys:
    //   - domains
    //   - ranges
    // Both of these will be objects with x and y keys
    // Behind each of these keys will be an array of length two. For example:
    //
    // {
    //   type: 'linear',
    //   domains: {
    //     x: [-100, 100],
    //     y: [-200, 200]
    //   },
    //   ranges: {
    //     x: [0, 500],
    //     y: [0, 500]
    //   }
    // }
    //
    // 'domains' refers to the values of the marks inside of the transformation,
    // while 'ranges' refers to the portion of the parent coordinate space that
    // the values of the marks will be mapped to.
    if (options.type === 'scale') {
      let domainX = options.domains.x
      let domainY = options.domains.y
      let rangeX = options.ranges.x
      let rangeY = options.ranges.y

      let scaleX = coordsScales[options.scale](domainX, rangeX)
      let scaleY = coordsScales[options.scale](domainY, rangeY)

      this.transform = ([x, y]) => {
        return [scaleX(x), scaleY(y)]
      }

      this.domains = options.domains
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