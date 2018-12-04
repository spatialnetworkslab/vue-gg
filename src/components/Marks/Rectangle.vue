<script>
import Mark from '@/mixins/Marks/Mark.js'
import Rectangular from '@/mixins/Marks/Rectangular.js'
import { interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Mark, Rectangular],

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

      let path = interpolatePath(coords, this.transformer)

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
