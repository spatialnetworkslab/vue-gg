import numericCoordScales from '@/scales/shorthands/coords/numeric.js'
import parseDomain from './utils/parseDomain.js'
import parseScale from './utils/parseScale.js'

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

    this.domains = {
      x: domainX,
      y: domainY
    }

    this.ranges = options.ranges

    if (options.type === 'scale') {
      let scaleX = numericCoordScales[scaleTypeX](domainX, ranges.x)
      let scaleY = numericCoordScales[scaleTypeY](domainY, ranges.y)

      this.transform = ([x, y]) => {
        return [scaleX(x), scaleY(y)]
      }
    }

    if (options.type === 'polar') {
      let toTheta = numericCoordScales[scaleTypeX](domainX, [0, 2 * Math.PI])
      let toRadius = numericCoordScales[scaleTypeY](domainY, [0, 1])

      let toRangeX = numericCoordScales['linear']([-1, 1], ranges.x)
      let toRangeY = numericCoordScales['linear']([-1, 1], ranges.y)

      this.transform = ([x, y]) => {
        // First, we map x and y to the polar domains [0, 2 * PI] and [0, 1]
        let theta = toTheta(x)
        let radius = toRadius(y)

        // Second, we convert the polar domains back to cartesian domains:
        // x: [-1, 1], y: [-1, 1]
        let [xMini, yMini] = polarToCartesian(theta, radius)

        // Third, we scale the domains x: [-1, 1], y: [-1, 1] to the ranges x/y
        return [toRangeX(xMini), toRangeY(yMini)]
      }
    }
  }
}

function polarToCartesian (theta, r) {
  let x = r * Math.sin(theta)
  let y = r * Math.cos(theta)

  return [x, y]
}
