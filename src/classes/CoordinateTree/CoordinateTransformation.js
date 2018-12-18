import createCoordsScale from '@/scales/shorthands/coords/createCoordsScale.js'

import parseDomain from './parseDomain.js'
import parseScale from './parseScale.js'

export default class CoordinateTransformation {
  constructor (options) {
    let domainSpecifications = options.domains
    let ranges = options.ranges

    let variableDomains
    let variableMetadata

    if (options.dataContainer) {
      variableDomains = options.dataContainer.getDomains()
      variableMetadata = options.dataContainer.getMetadata()
    }

    // Check for validity, and fetch variable domains from dataContainer if necessary
    let [domainX, domainXType] = parseDomain(
      domainSpecifications.x,
      variableDomains,
      variableMetadata
    )

    let [domainY, domainYType] = parseDomain(
      domainSpecifications.y,
      variableDomains,
      variableMetadata
    )

    let [scaleTypeX, scaleTypeY] = parseScale(options.scale)

    // Store domains and ranges
    this.domains = {
      x: domainX,
      y: domainY
    }

    this.domainTypes = {
      x: domainXType,
      y: domainYType
    }

    this.ranges = options.ranges

    if (options.type === 'scale') {
      let scaleX = createCoordsScale('x', domainXType, domainX, ranges.x, {
        scale: scaleTypeX
      })
      let scaleY = createCoordsScale('y', domainYType, domainY, ranges.y, {
        scale: scaleTypeY
      })

      this.transform = ([x, y]) => {
        return [scaleX(x), scaleY(y)]
      }
    }

    // if (options.type === 'polar') {
    //   let toTheta = numericCoordScales[scaleTypeX](domainX, [0, 2 * Math.PI])
    //   let toRadius = numericCoordScales[scaleTypeY](domainY, [0, 1])
    //
    //   let toRangeX = numericCoordScales['linear']([-1, 1], ranges.x)
    //   let toRangeY = numericCoordScales['linear']([-1, 1], ranges.y)
    //
    //   this.transform = ([x, y]) => {
    //     // First, we map x and y to the polar domains [0, 2 * PI] and [0, 1]
    //     let theta = toTheta(x)
    //     let radius = toRadius(y)
    //
    //     // Second, we convert the polar domains back to cartesian domains:
    //     // x: [-1, 1], y: [-1, 1]
    //     let [xMini, yMini] = polarToCartesian(theta, radius)
    //
    //     // Third, we scale the domains x: [-1, 1], y: [-1, 1] to the ranges x/y
    //     return [toRangeX(xMini), toRangeY(yMini)]
    //   }
    // }
  }
}

// function polarToCartesian (theta, r) {
//   let x = r * Math.sin(theta)
//   let y = r * Math.cos(theta)
//
//   return [x, y]
// }
