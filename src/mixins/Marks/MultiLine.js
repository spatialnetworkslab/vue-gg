import Mark from './Mark.js'
import { createPath, interpolatePath, createGeoPath } from '../../components/Marks/utils/createPath.js'
import checkPoints from './utils/checkPoints.js'
import { invalidPoint } from '../../utils/equals.js'

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
      type: [Array, Object, String, Function, undefined],
      default: undefined
    },

    y: {
      type: [Array, Object, String, Function, undefined],
      default: undefined
    },

    x2: {
      type: [Array, Object, String, Function, undefined],
      default: undefined
    },

    y2: {
      type: [Array, Object, String, Function, undefined],
      default: undefined
    },

    stroke: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    strokeWidth: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    // Non-mappable
    sortX: {
      type: Boolean,
      default: true
    },

    close: {
      type: Boolean,
      default: false
    },

    interpolate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    aesthetics () {
      checkPoints(this.points, this.geometry, this.x, this.y)

      return {
        points: this.parseGeometry(this.points, {}),
        geometry: this.parseGeometry(this.geometry, { geojson: true }),

        x: this.parseCoordinateSet(this.x, { dimension: 'x' }),
        y: this.parseCoordinateSet(this.y, { dimension: 'y' }),
        x2: this.parseCoordinateSet(this.x2, { dimension: 'x2' }),
        y2: this.parseCoordinateSet(this.y2, { dimension: 'y2' }),

        stroke: this.parseAesthetic(this.stroke, { default: '#000000' }),
        fill: this.parseAesthetic(this.fill, { default: 'none' }),
        strokeWidth: this.parseAesthetic(this.strokeWidth, { default: 2 })
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

    sort (points) {
      return points.sort((a, b) => a[0] - b[0])
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
            'd': path,
            'style': `fill: ${aesthetics.fill};
                    stroke: ${aesthetics.stroke};
                    stroke-width: ${aesthetics.strokeWidth};`
          }
        })
      } else {
        let points = []
        if (aesthetics.points) {
          points = aesthetics.points
        } else {
          points = this.generatePoints(aesthetics.x, aesthetics.y)
        }

        if (points.length > 1) {
          if (this.sortX) {
            points = this.sort(points)
          }

          if (aesthetics.y && aesthetics.y2) {
            let x = aesthetics.x2 ? aesthetics.x2 : aesthetics.x
            let pointsY2 = this.generatePoints(x, aesthetics.y2)
            if (this.sortX) {
              pointsY2 = this.sort(pointsY2)
            }
            points = points.concat(pointsY2.reverse())
          }

          if (this.close) {
            points = this.closePoints(points)
          }

          let path = this.createPath(points)

          return createElement('path', {
            attrs: {
              'd': path,
              'style': `fill: ${aesthetics.fill};
                    stroke: ${aesthetics.stroke};
                    stroke-width: ${aesthetics.strokeWidth};`
            }
          })
        } else {
          console.warn('Not enough valid points to draw Mark')
        }
      }
    }
  }
}
