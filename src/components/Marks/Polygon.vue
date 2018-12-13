<script>
import Mark from '@/mixins/Marks/Mark.js'
import { interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    points: {
      type: [Array, Object],
      required: true
    },

    width: {
      type: Number,
      default: 2
    },

    color: {
      type: [String, Object, undefined],
      default: undefined
    },

    fill: {
      type: [String, Object, undefined],
      default: undefined
    }
  },

  computed: {
    _color () { return this.default(this.color, '#000000') },
    _fill () { return this.default(this.fill, 'none') },

    path () {
      if (!this.$$map && this.__update) {
        let points = this.points
        return this.createPath(points)
      }
    }
  },

  methods: {
    createPath (points) {
      let lastID = points.length - 1

      // Check if polygon is closed
      if (points[0][0] !== points[lastID][0] ||
        points[0][1] !== points[lastID][1]) {
        // If not, close
        points.push(points[0])
      }

      let path = interpolatePath(this.points, this.$$transform)

      return path
    }
  },

  render (h) {
    if (!this.$$map && this.__update) {
      return h('path', {
        attrs: {
          'd': this.path,
          'stroke': this._color,
          'stroke-width': this.width,
          'fill': this._fill
        }
      })
    }
  }
}
</script>
