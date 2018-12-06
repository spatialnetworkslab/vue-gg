<script>
import Mark from '@/mixins/Mark.js'
import { interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    points: {
      type: Array,
      required: true
    },

    width: {
      type: Number,
      default: 2
    },

    color: {
      type: String,
      default: '#000000'
    },

    fill: {
      type: String,
      default: 'none'
    }
  },

  computed: {
    path () {
      let points = this.points
      let lastID = points.length - 1

      // Check if polygon is closed
      if (points[0][0] !== points[lastID][0] ||
        points[0][1] !== points[lastID][1]) {
        points.push(points[0])
      }

      let path = interpolatePath(this.points, this.$$transform)

      return path
    }
  },

  render (h) {
    return h('path', {
      attrs: {
        'd': this.path,
        'stroke': this.color,
        'stroke-width': this.width,
        'fill': this.fill
      }
    })
  }
}
</script>
