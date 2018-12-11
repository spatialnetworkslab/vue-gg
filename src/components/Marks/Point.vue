<script>
import Mark from '@/mixins/Marks/Mark.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: Number,
      default: 0
    },

    y: {
      type: Number,
      default: 0
    },

    radius: {
      type: Number,
      default: 3
    },

    color: {
      type: String,
      default: '#000000'
    }
  },

  render (h) {
    if (this.__update) {}

    let [cx, cy] = this.$$transform([this.x, this.y])

    return h('circle', {
      attrs: {
        'cx': cx,
        'cy': cy,
        'r': this.radius,
        'fill': this.color,
        'stroke-width': 0
      }
    })
  }
}
</script>
