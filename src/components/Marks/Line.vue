<script>
import Mark from '../../mixins/Marks/Mark.js'
import { createPath, interpolatePath, interpolatePathFromFunc } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    x1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    x2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    func: {
      type: [Function, undefined],
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

    transition: {
      type: Number,
      default: 0
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
        if (this._interpolate) {
          path = interpolatePath(coords, this.$$transform)
        }

        if (!this._interpolate) {
          path = createPath(coords, this.$$transform)
        }
      }

      return path
    },

    renderSVG (createElement) {
      let aesthetics = this.$options.propsData
      let coords = [
        [aesthetics.x1, aesthetics.y1],
        [aesthetics.x2, aesthetics.y2]
      ]
      let path = this.createPath(aesthetics.func, coords)

      return createElement('path', {
        attrs: {
          'd': path
        },
        style: this.createSVGStyle(aesthetics)
      })
    }
  }
}
</script>
