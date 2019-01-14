import Mark from './Mark.js'
import { createPath, interpolatePath, createGeoPath } from '../../components/Marks/utils/createPath.js'
import checkPoints from './utils/checkPoints.js'
import { invalidPoint } from '../../utils/equals.js'
import createSVGStyle from './utils/createSVGStyle.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    points: {
      type: [Array, Function, undefined],
      default: undefined
    },

    geometry: {
      type: [Object, Function, undefined],
      default: undefined
    },

    x: {
      type: [Array, String, Function, undefined],
      default: undefined
    },

    y: {
      type: [Array, String, Function, undefined],
      default: undefined
    },

    x2: {
      type: [Array, String, Function, undefined],
      default: undefined
    },

    y2: {
      type: [Array, String, Function, undefined],
      default: undefined
    },

    stroke: {
      type: [String, Object, Function, undefined],
      default: '#000000'
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: 'none'
    },

    strokeWidth: {
      type: [Number, Object, Function, undefined],
      default: 2
    },

    opacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    // Non-mappable
    sort: {
      type: [String, undefined],
      default: undefined,
      validator: s => ['x', 'y'].includes(s) || s === undefined
    },

    close: {
      type: Boolean,
      default: false
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
    aesthetics () {
      checkPoints(this.points, this.geometry, this.x, this.y, this.x2, this.y2, this._area)

      return {
        points: this.parseGeometry(this.points, {}),
        geometry: this.parseGeometry(this.geometry, { geojson: true }),

        x: this.parseCoordinateSet(this.x, { dimension: 'x' }),
        y: this.parseCoordinateSet(this.y, { dimension: 'y' }),
        x2: this.parseCoordinateSet(this.x2, { dimension: 'x' }),
        y2: this.parseCoordinateSet(this.y2, { dimension: 'y' }),

        stroke: this.parseAesthetic(this.stroke),
        fill: this.parseAesthetic(this.fill),
        strokeWidth: this.parseAesthetic(this.strokeWidth),
        opacity: this.parseAesthetic(this.opacity),
        fillOpacity: this.parseAesthetic(this.fillOpacity),
        strokeOpacity: this.parseAesthetic(this.strokeOpacity)
      }
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
        return interpolatePath(points, this.$$transform)
      }

      if (!this._interpolate) {
        return createPath(points, this.$$transform)
      }
    },

    renderSVG (createElement, aesthetics) {
      if (this.geometry) {
        let path = createGeoPath(aesthetics.geometry, this.$$transform)
        return createElement('path', {
          attrs: {
            'd': path
          },
          style: createSVGStyle(aesthetics)
        })
      } else {
        let points = []
        if (aesthetics.points) {
          points = aesthetics.points
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
          return createElement('path', {
            attrs: {
              'd': path
            },
            style: createSVGStyle(aesthetics)
          })
        } else {
          console.warn('Not enough valid points to draw Mark')
        }
      }
    }
  }
}
