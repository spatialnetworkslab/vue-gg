import createCoordsScale from '../../scales/shorthands/coords/createCoordsScale.js'

import parseDomain from './parseDomain.js'
import parseScale from './parseScale.js'

export default class CoordinateTransformation {
  constructor (options) {
    let domainSpecifications = options.domains
    let ranges = options.ranges

    let variableDomains

    if (options.dataContainer) {
      variableDomains = options.dataContainer.getDomains()
    }

    // Check for validity, and fetch variable domains from dataContainer if necessary
    let [domainX, domainXType] = parseDomain(domainSpecifications.x, variableDomains)
    let [domainY, domainYType] = parseDomain(domainSpecifications.y, variableDomains)

    let [scaleOptionsX, scaleOptionsY] = parseScale(options.scale)

    // Store domains and ranges
    this.domainTypes = {
      x: domainXType,
      y: domainYType
    }

    // If we have a categorical or temporal domain: set ranges as domains
    this.domains = {}

    if (['categorical', 'temporal'].includes(this.domainTypes.x)) {
      this.domains.x = ranges.x
    } else {
      this.domains.x = domainX
    }

    if (['categorical', 'temporal'].includes(this.domainTypes.y)) {
      this.domains.y = ranges.y
    } else {
      this.domains.y = domainY
    }

    this.ranges = ranges

    this.scaleX = createCoordsScale('x', domainXType, domainX, ranges.x,
      scaleOptionsX
    )
    this.scaleY = createCoordsScale('y', domainYType, domainY, ranges.y,
      scaleOptionsY
    )

    // We will wrap the scaling functions in this 'get' function.
    // For categorical and temporal domains, we don't need to apply the scaling,
    // since we've already done this when the prop was passed (see Mark.js,
    // parseCoord function). This is because we need to support nested Sections,
    // where the parent is for example categorical but the child is quantitative. It
    // is also necessary to properly interpolate in the interpolatePath function
    // (you cannot interpolate between 'A' and 'B'). So for these components,
    // we already need to know the converted (quantitative) value before the transform
    // function is used.
    this.getX = x => {
      if (['categorical', 'temporal'].includes(this.domainTypes.x)) {
        return x
      } else {
        return this.scaleX(x)
      }
    }
    this.getY = y => {
      if (['categorical', 'temporal'].includes(this.domainTypes.y)) {
        return y
      } else {
        return this.scaleY(y)
      }
    }

    if (options.type === 'scale') {
      this.transform = ([x, y]) => {
        return [this.getX(x), this.getY(y)]
      }
    }

    if (options.type === 'polar') {
      let toTheta = createCoordsScale('x', 'quantitative', ranges.x, [0, 2 * Math.PI], {})
      let toRadius = createCoordsScale('y', 'quantitative', ranges.y, [0, 1], {})

      let toRangeX = createCoordsScale('x', 'quantitative', [-1, 1], ranges.x, {})
      let toRangeY = createCoordsScale('y', 'quantitative', [-1, 1], ranges.y, {})

      this.transform = ([x, y]) => {
        let scaledX = this.getX(x)
        let scaledY = this.getY(y)

        let theta = toTheta(scaledX)
        let radius = toRadius(scaledY)

        let cartesian = polarToCartesian(theta, radius)

        return [toRangeX(cartesian[0]), toRangeY(cartesian[1])]
      }
    }
  }
}

function polarToCartesian (theta, r) {
  let x = r * Math.sin(theta)
  let y = r * Math.cos(theta)

  return [x, y]
}
