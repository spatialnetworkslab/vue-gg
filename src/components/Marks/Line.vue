<script>
import Mark from '@/mixins/Marks/Mark.js'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'
import { interpolatePath, interpolatePathFromFunc } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
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

    color: {
      type: [String, Object, undefined],
      default: undefined
    },

    // Non-mappable
    width: {
      type: Number,
      default: 2
    }
  },

  computed: {
    _x1 () { return this.default(this.x1, 0) },
    _x2 () { return this.default(this.x2, 0) },
    _y1 () { return this.default(this.y1, 0) },
    _y2 () { return this.default(this.y2, 0) },
    _func () { return this.default(this.func, undefined) },
    _color () { return this.default(this.color, '#000000') },

    _width () { return this.default(this.width, 2) },

    aesthetics () {
      return {
        'x1': this._x1,
        'y1': this._y1,
        'x2': this._x2,
        'y2': this._y2,
        'func': this._func,
        'color': this._color,
        'width': this._width
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
