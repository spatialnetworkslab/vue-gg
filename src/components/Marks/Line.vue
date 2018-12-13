<script>
import Mark from '@/mixins/Marks/Mark.js'
import { interpolatePath, interpolatePathFromFunc } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    x1: {
      type: [Number, Object, undefined],
      default: undefined
    },

    x2: {
      type: [Number, Object, undefined],
      default: undefined
    },

    y1: {
      type: [Number, Object, undefined],
      default: undefined
    },

    y2: {
      type: [Number, Object, undefined],
      default: undefined
    },

    func: {
      type: [Function, Object, undefined],
      default: undefined
    },

    width: {
      type: Number,
      default: 2
    },

    color: {
      type: [String, Object, undefined],
      default: undefined
    }
  },

  computed: {
    _x1 () { return this.default(this.x1, 0) },
    _x2 () { return this.default(this.x2, 0) },
    _y1 () { return this.default(this.y1, 0) },
    _y2 () { return this.default(this.y2, 0) },
    _color () { return this.default(this.color, '#000000') },

    path () {
      if (!this.$$map && this.__update) {
        let coords = [
          [this._x1, this._y1],
          [this._x2, this._y2]
        ]

        return this.createPath(this.func, coords)
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
    }
  },

  render (h) {
    if (!this.$$map) {
      return h('path', {
        attrs: {
          'd': this.path,
          'stroke': this._color,
          'stroke-width': this.width,
          'fill': 'none'
        }
      })
    }
  }
}
</script>
