<script>
import Rectangular from '@/mixins/Marks/Rectangular.js'
import Mark from '@/mixins/Marks/Mark.js'
import { interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Rectangular, Mark],

  props: {
    color: {
      type: String,
      default: '#000000'
    }
  },

  computed: {
    path () {
      if (this.__update) {
        let coords = [
          [this._x1, this._y1],
          [this._x1, this._y2],
          [this._x2, this._y2],
          [this._x2, this._y1],
          [this._x1, this._y1]
        ]

        let path = interpolatePath(coords, this.$$transform)

        return path
      }
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
