<script>
import Rectangular from '@/mixins/Marks/Rectangular.js'
import { interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Rectangular],

  props: {
    color: {
      type: [String, Object, undefined],
      default: undefined
    }
  },

  computed: {
    _color () { return this.default(this.color, '#000000') },

    path () {
      if (!this.$$map && this.__update) {
        let points = [
          [this._x1, this._y1],
          [this._x1, this._y2],
          [this._x2, this._y2],
          [this._x2, this._y1],
          [this._x1, this._y1]
        ]

        let path = interpolatePath(points, this.$$transform)

        return path
      }
    }
  },

  render (h) {
    if (!this.$$map) {
      return h('path', {
        attrs: {
          'd': this.path,
          'style': `fill: ${this._color}`
        }
      })
    }
  }
}
</script>
