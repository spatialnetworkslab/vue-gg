import createCoordsScale from '../../scales/shorthands/coords/createCoordsScale.js'
import createGeoScale from '../../scales/createGeoScale.js'

import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import parseRange from '../../scales/utils/parseRange.js'

export default class CoordinateTransformation {
  constructor (options) {
    if (options.scales.hasOwnProperty('geo')) {
      this.setGeoTransformation(options)
    } else {
      this.setTransformation(options)
    }
  }

  setTransformation (options) {
    let scaleOptions = options.scales
    let ranges = options.ranges

    let dataInterface = options.dataInterface
    let scaleManager = options.scaleManager

    // Check for validity, and fetch variable domains with dataInterface if necessary
    let [domainX, domainXType, scaleOptionsX] = parseScaleOptions(
      scaleOptions.x, dataInterface, scaleManager
    )
    let [domainY, domainYType, scaleOptionsY] = parseScaleOptions(
      scaleOptions.y, dataInterface, scaleManager
    )

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

    this.ranges = {
      x: parseRange(ranges.x, scaleOptionsX),
      y: parseRange(ranges.y, scaleOptionsY)
    }

    this.scaleX = createCoordsScale('x', domainXType, domainX, this.ranges.x,
      scaleOptionsX
    )
    this.scaleY = createCoordsScale('y', domainYType, domainY, this.ranges.y,
      scaleOptionsY
    )

    // We will wrap the scaling functions in this 'get' function.
    // This way, we can convert data already from non-quantitative to quantitative
    // before we actually use $$transform. This is necessary in a few cases.
    if (['categorical', 'temporal'].includes(this.domainTypes.x)) {
      this.getX = x => x.constructor === Number ? x : this.scaleX(x)
      this.invertX = x => x.constructor === Number ? x : this.scaleX.invert(x)
    } else {
      this.getX = this.scaleX
      this.invertX = this.scaleX.invert
    }
    if (['categorical', 'temporal'].includes(this.domainTypes.y)) {
      this.getY = y => y.constructor === Number ? y : this.scaleY(y)
      this.invertY = y => y.constructor === Number ? y : this.scaleY.invert(y)
    } else {
      this.getY = this.scaleY
      this.invertY = this.scaleY.invert
    }

    if (options.type === 'scale') {
      this.transform = ([x, y]) => {
        return [this.getX(x), this.getY(y)]
      }
    }

    if (options.type === 'polar') {
      let toTheta = createCoordsScale('x', 'quantitative', this.ranges.x, [0, 2 * Math.PI], {})
      let toRadius = createCoordsScale('y', 'quantitative', this.ranges.y, [0, 1], {})

      let toRangeX = createCoordsScale('x', 'quantitative', [-1, 1], this.ranges.x, {})
      let toRangeY = createCoordsScale('y', 'quantitative', [-1, 1], this.ranges.y, {})

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

  setGeoTransformation (options) {
    // let geoOptions = options.scales.geo TODO
    let ranges = options.ranges
    let dataInterface = options.dataInterface

    let domainX = dataInterface.getDomain('geometry.x')
    let domainY = dataInterface.getDomain('geometry.y')

    this.domains = { x: domainX, y: domainY }
    this.domainTypes = { x: 'quantitative', y: 'quantitative' }
    this.ranges = ranges

    let { scaleX, scaleY, center } = createGeoScale(options)
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.center = center

    this.getX = this.scaleX
    this.getY = this.scaleY

    this.invertX = this.scaleX.invert
    this.invertY = this.scaleY.invert

    this.transform = ([x, y]) => {
      return [this.getX(x), this.getY(y)]
    }
  }
}

function polarToCartesian (theta, r) {
  let x = r * Math.sin(theta)
  let y = r * Math.cos(theta)

  return [x, y]
}
