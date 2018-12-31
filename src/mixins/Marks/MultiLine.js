import Mark from './Mark.js'
import mapAesthetics from '../../components/Marks/utils/mapAesthetics.js'
import { createPath, interpolatePath } from '../../components/Marks/utils/createPath.js'
import checkPoints from '../../components/Marks/utils/checkPoints.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    points: {
      type: [Array, Object, Function, undefined],
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
    }
  },

  computed: {
    aesthetics () {
      checkPoints(this.points, this.x, this.y)

      return {
        points: this.parseGeometry(this.points, {}),

        x: this.parseCoordinateSet(this.x, { dimension: 'x' }),
        y: this.parseCoordinateSet(this.y, { dimension: 'y' }),

        color: this.parseAesthetic(this.color, { default: '#000000' }),
        width: this.parseAesthetic(this.width, { default: 2 })
      }
    }
  },

  methods: {
    generatePoints (aesthetics) {
      if (aesthetics.points) { return aesthetics.points }

      if (aesthetics.x.length !== aesthetics.y.length) {
        throw new Error(`'x' and 'y' coordinate sets have different lengths`)
      } else {
        let zipped = []
        for (let i = 0; i < aesthetics.x.length; ++i) {
          zipped.push([aesthetics.x[i], aesthetics.y[i]])
        }
        return zipped
      }
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
      let points = this.generatePoints(aesthetics)

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
    }
  },

  render (createElement) {
    if (this.__update) {
      if (!this.$$map) {
        // Create svg element using aesthetics
        return this.renderSVG(createElement, this.aesthetics)
      }

      if (this.$$map) {
        // Create the aesthetics for each mark
        let aestheticsPerMark = mapAesthetics(
          this.aesthetics,
          this.context,
          this.$$dataContainer
        )

        // Create svg element for each mark from aesthetics
        let components = []
        for (let aesthetics of aestheticsPerMark) {
          components.push(
            this.renderSVG(createElement, aesthetics)
          )
        }

        return createElement('g', components)
      }
    }
  }
}
