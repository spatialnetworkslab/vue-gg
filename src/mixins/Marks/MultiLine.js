import Mark from './Mark.js'
import mapAesthetics from '../../components/Marks/utils/mapAesthetics.js'
import { interpolatePath } from '../../components/Marks/utils/createPath.js'
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

    // Non-mappable
    width: {
      type: Number,
      default: 2
    },

    _sortX: {
      type: Boolean,
      default: true
    },

    _close: {
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
        width: this.parseProperty(this.width, { default: 2 })
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

    createPath (points) {
      let path = interpolatePath(points, this.$$transform)
      return path
    },

    renderSVG (createElement, aesthetics) {
      let points = this.generatePoints(aesthetics)

      if (this._sortX) {
        points = this.sort(points)
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
