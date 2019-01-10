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

    color: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    width: {
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

        color: this.parseAesthetic(this.color, { default: '#000000' }),
        fill: this.parseAesthetic(this.fill, { default: '#000000' }),
        width: this.parseAesthetic(this.width, { default: 2 })
      }
    }
  },

  methods: {
    generatePoints (aesthetics) {
      let points = []
      if (aesthetics.points) {
        points = aesthetics.points
      } else if (aesthetics.x.length !== aesthetics.y.length) {
        throw new Error(`'x' and 'y' coordinate sets have different lengths`)
      } else {
        for (let i = 0; i < aesthetics.x.length; ++i) {
          points.push([aesthetics.x[i], aesthetics.y[i]])
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
            'stroke': aesthetics.color,
            'stroke-width': aesthetics.width,
            'fill': 'none'
          }
        })
      } else {
        let points = this.generatePoints(aesthetics)

        if (points.length > 1) {
          if (this.sortX) {
            points = this.sort(points)
          }

          if (this.close) {
            points = this.closePoints(points)
          }

          let path = this.createPath(points)

          return createElement('path', {
            attrs: {
              'd': path,
              'stroke': aesthetics.color,
              'stroke-width': aesthetics.width,
              'fill': 'none'
            }
          })
        } else {
          console.warn('Not enough valid points to draw Mark')
        }
      }
    }
  }
}
