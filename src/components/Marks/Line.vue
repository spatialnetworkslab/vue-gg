<script>
import Mark from '../../mixins/Marks/Mark.js'
import mapAesthetics from './utils/mapAesthetics.js'
import { interpolatePath, interpolatePathFromFunc } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    x1: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    x2: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    y1: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    y2: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    func: {
      type: [Function, Object, undefined],
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
    }
  },

  computed: {
    aesthetics () {
      return {
        x1: this.parseCoordinate(this.x1, { dimension: 'x' }),
        y1: this.parseCoordinate(this.y1, { dimension: 'y' }),
        x2: this.parseCoordinate(this.x2, { dimension: 'x' }),
        y2: this.parseCoordinate(this.y2, { dimension: 'y' }),
        func: this.parseAesthetic(this.func, { isFunction: true }),
        color: this.parseAesthetic(this.color, { default: '#000000' }),

        width: this.parseProperty(this.width, { default: 2 })
      }
    }
  },

  methods: {
    createPath (func, coords) {
      let path

      if (func) {
        let parentId = this.$$coordinateTreeParent
        let domains = this.$$coordinateTree.getBranch(parentId).domains

        path = interpolatePathFromFunc(this.func, this.$$transform, domains)
      }

      if (!func) {
        path = interpolatePath(coords, this.$$transform)
      }

      return path
    },

    renderSVG (createElement, aesthetics) {
      let coords = [
        [aesthetics.x1, aesthetics.y1],
        [aesthetics.x2, aesthetics.y2]
      ]
      let path = this.createPath(aesthetics.func, coords)

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
</script>
