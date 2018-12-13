<script>
import Mark from '@/mixins/Marks/Mark.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, Object, undefined],
      default: undefined
    },

    y: {
      type: [Number, Object, undefined],
      default: undefined
    },

    radius: {
      type: Number,
      default: 3
    },

    color: {
      type: [String, Object, undefined],
      default: undefined
    }
  },

  computed: {
    _x () { return this.default(this.x, 0) },
    _y () { return this.default(this.y, 0) },
    _color () { return this.default(this.color, '#000000') }
  },

  render (h) {
    if (!this.$$map && this.__update) {
      let [cx, cy] = this.$$transform([this._x, this._y])

      return h('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'r': this.radius,
          'fill': this._color,
          'stroke-width': 0
        }
      })
    }
  }
}
</script>
