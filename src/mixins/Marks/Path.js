import Mark from './Mark.js'
import { createPath, interpolatePath, createGeoPath } from '../../components/Marks/utils/createPath.js'
import checkPoints from './utils/checkPoints.js'
import { invalidPoint } from '../../utils/equals.js'

export default {
  mixins: [Mark],

  props: {
    points: {
      type: [Array, undefined],
      default: undefined
    },

    geometry: {
      type: [Object, undefined],
      default: undefined
    },

    x: {
      type: [Array, undefined],
      default: undefined
    },

    y: {
      type: [Array, undefined],
      default: undefined
    },

    x2: {
      type: [Array, undefined],
      default: undefined
    },

    y2: {
      type: [Array, undefined],
      default: undefined
    },

    stroke: {
      type: String,
      default: '#000000'
    },

    fill: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 2
    },

    opacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeLinecap: {
      type: [String, undefined],
      default: undefined,
      validator: s => ['round', 'square', 'butt'].includes(s) || s === undefined
    },

    // Non-aesthetics
    sort: {
      type: [String, undefined],
      default: undefined,
      validator: s => ['x', 'y'].includes(s) || s === undefined
    },

    close: {
      type: Boolean,
      default: false
    },

    curve: {
      type: [Boolean, String, undefined],
      default: false
    },

    curveBeta: {
      type: Number,
      default: undefined
    },

    curveTension: {
      type: Number,
      default: undefined
    },

    curveAlpha: {
      type: Number,
      default: undefined
    },

    regression: {
      type: [Boolean, String, undefined],
      default: false
    },

    regressionOrder: {
      type: Number,
      default: 2
    },

    regressionPrecision: {
      type: Number,
      default: 2
    },

    interpolate: {
      type: Boolean,
      default: false
    },

    // This is not actually meant to be used, just a flag for the mixin logic
    _area: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    _interpolate () {
      if (this.interpolate !== undefined) { return this.interpolate }
      return false
    },

    curveSpec () {
      let beta = this.curveBeta ? this.curveBeta : 0
      let tension = this.curveTension ? this.curveTension : 0
      let alpha = this.curveAlpha ? this.curveAlpha : 0
      return { beta: beta, tension: tension, alpha: alpha }
    },

    regressSpec () {
      let order = this.regressionOrder
      let precision = this.regressionPrecision
      return { order: order, precision: precision }
    }
  },

  methods: {
    generatePoints (x, y) {
      let points = []
      if (x.length !== y.length) {
        // x and y arrays should have equal length
        // if not we throw an error EXCEPT when one of the two arrays
        // has length 1, in which case we reuse that value for all points
        if (x.length === 1 || y.length === 1) {
          if (x.length === 1) {
            for (let i = 0; i < y.length; ++i) {
              points.push([x[0], y[i]])
            }
          } else if (y.length === 1) {
            for (let i = 0; i < x.length; ++i) {
              points.push([x[i], y[0]])
            }
          }
        } else {
          throw new Error(`'x' and 'y' coordinate sets have different lengths`)
        }
      } else {
        for (let i = 0; i < x.length; ++i) {
          points.push([x[i], y[i]])
        }
      }

      return this.filterInvalid(points)
    },

    filterInvalid (points) {
      let filtered = []
      for (let i = 0; i < points.length; i++) {
        let point = points[i]
        if (invalidPoint(point)) {
          console.warn(`Skipped invalid point ${JSON.stringify(point)} at index ${i}`)
        } else {
          filtered.push(point)
        }
      }

      return filtered
    },

    sortPoints (points) {
      if (this.sort === 'x') {
        return points.sort((a, b) => a[0] - b[0])
      }
      if (this.sort === 'y') {
        return points.sort((a, b) => a[1] - b[1])
      }
    },

    closePoints (points) {
      // Check if polygon is closed
      let lastID = points.length - 1

      if (points[0][0] !== points[lastID][0] ||
        points[0][1] !== points[lastID][1]) {
        // If not, close
        points.push(points[0])
      }

      return points
    },

    createPath (points) {
      if (this._interpolate) {
        return interpolatePath(points, this.$$transform, this.curve, this.curveSpec)
      }

      if (!this._interpolate) {
        return createPath(points, this.$$transform, this.curve, this.curveSpec, this.regression, this.regressSpec)
      }
    },

    renderSVG (createElement) {
      checkPoints(this.points, this.geometry, this.x, this.y, this.x2, this.y2, this._area)
      let aesthetics = this._props

      if (this.geometry) {
        let path = createGeoPath(aesthetics.geometry, this.$$transform)
        return createElement('path', {
          attrs: {
            'd': path
          },
          style: this.createSVGStyle(aesthetics)
        })
      } else {
        let points = []
        if (aesthetics.points) {
          points = this.filterInvalid(aesthetics.points)
        } else {
          points = this.generatePoints(aesthetics.x, aesthetics.y)
        }
        if (points.length > 1) {
          if (this.sort) {
            points = this.sortPoints(points)
          }

          if (this._area) {
            let points2

            if (aesthetics.x2 && !aesthetics.y2) {
              points2 = this.generatePoints(aesthetics.x2, aesthetics.y)
            }

            if (!aesthetics.x2 && aesthetics.y2) {
              points2 = this.generatePoints(aesthetics.x, aesthetics.y2)
            }

            if (aesthetics.x2 && aesthetics.y2) {
              points2 = this.generatePoints(aesthetics.x2, aesthetics.y2)
            }

            if (this.sort) { points2 = this.sortPoints(points2) }
            points = points.concat(points2.reverse())
          }

          if (this.close) {
            points = this.closePoints(points)
          }

          let path = this.createPath(points)
          let element = createElement('path', {
            attrs: {
              'd': path
            },
            style: this.createSVGStyle(aesthetics)
          })

          return element
        } else {
          console.warn('Not enough valid points to draw Mark')
        }
      }
    }
  }
}
