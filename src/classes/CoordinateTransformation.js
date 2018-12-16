import * as d3 from 'd3'
import numericCoordScales from '@/scales/shorthands/coords/numeric.js'
import createScale from '@/scales/createScale.js'

export default class CoordinateTransformation {
  constructor (options) {
    if (options.type === 'scale') {
      let context

      if (options.dataContainer) {
        context = {
          ranges: options.ranges,
          domains: options.dataContainer.getDomains(),
          metadata: options.dataContainer.getMetadata()
        }
      }

      // X
      let domainX
      let scaleX

      let domainSpecificationX = options.domains.x
      let rangeX = options.ranges.x

      if (domainSpecificationX.constructor === Array) {
        domainX = domainSpecificationX
        scaleX = numericCoordScales['linear'](domainX, rangeX)
      } else {
        if (options.dataContainer) {
          if (domainSpecificationX.constructor === Function) {
            domainX = domainSpecificationX(context.domains)
            scaleX = numericCoordScales['linear'](domainX, rangeX)
          }

          if (domainSpecificationX.constructor === String) {
            let variable = domainSpecificationX
            domainX = context.domains[variable]
            scaleX = createScale('x', context, { variable })
          }

          if (domainSpecificationX.constructor === Object) {
            if (!domainSpecificationX.hasOwnProperty('variable')) {
              throw new Error(`Missing required key 'variable'`)
            }

            domainX = context.domains[domainSpecificationX.variable]
            scaleX = createScale('x', context, domainSpecificationX)
          }
        }

        if (!options.dataContainer) {
          domainX = rangeX
          scaleX = numericCoordScales['linear'](domainX, rangeX)
        }
      }

      // Y
      let domainY
      let scaleY

      let domainSpecificationY = options.domains.y
      let rangeY = options.ranges.y

      if (domainSpecificationY.constructor === Array) {
        domainY = domainSpecificationY
        scaleY = numericCoordScales['linear'](domainY, rangeY)
      } else {
        if (options.dataContainer) {
          if (domainSpecificationY.constructor === Function) {
            domainY = domainSpecificationY(context.domains)
            scaleY = numericCoordScales['linear'](domainY, rangeY)
          }

          if (domainSpecificationY.constructor === String) {
            let variable = domainSpecificationY
            domainY = context.domains[variable]
            scaleY = createScale('y', context, { variable })
          }

          if (domainSpecificationY.constructor === Object) {
            if (!domainSpecificationY.hasOwnProperty('variable')) {
              throw new Error(`Missing required key 'variable'`)
            }

            domainY = context.domains[domainSpecificationY.variable]
            scaleY = createScale('y', context, domainSpecificationY)
          }
        }

        if (!options.dataContainer) {
          domainY = rangeY
          scaleY = numericCoordScales['linear'](domainY, rangeY)
        }
      }

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
