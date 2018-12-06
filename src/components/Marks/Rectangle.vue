<script>
import Mark from '@/mixins/Mark.js'
import { interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    color: {
      type: String,
      default: '#000000'
    }
  },

  computed: {
    path () {
      let coords = [
        [this.x, this.y],
        [this.x, this.y2],
        [this.x2, this.y2],
        [this.x2, this.y],
        [this.x, this.y]
      ]

      let path = interpolatePath(coords, this.$$transform)

      return path
    }
  },

  render (h) {
    return h('path', {
      attrs: {
        'd': this.path,
        'style': `fill: ${this.color}`
      }
    })
  }
}
</script>
