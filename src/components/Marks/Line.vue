<script>
import Mark from '../../mixins/Marks/Mark.js'
import { createPath, interpolatePath, interpolatePathFromFunc } from './utils/createPath.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Mark],

  data () {
    return {
      markType : 'line-mark'
    }
  },

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

    transition: {
      type: Number,
      default: 0
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
        stroke: this.parseAesthetic(this.stroke, { default: '#000000' }),
        fill: this.parseAesthetic(this.fill, { default: 'none' }),
        strokeWidth: this.parseAesthetic(this.strokeWidth, { default: 2 }),
        opacity: this.parseAesthetic(this.opacity),
        fillOpacity: this.parseAesthetic(this.fillOpacity),
        strokeOpacity: this.parseAesthetic(this.strokeOpacity),
        transition: this.transition + 's'
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
        if (this._interpolate) {
          path = interpolatePath(coords, this.$$transform)
        }

        if (!this._interpolate) {
          path = createPath(coords, this.$$transform)
        }
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
          'd': path
        },
        style: createSVGStyle(aesthetics)
      })
    }
  }
}
</script>
