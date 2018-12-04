<script>
import Mark from '@/mixins/Marks/Mark.js'
import { interpolatePath, interpolatePathFromFunc } from './utils/createPath.js'

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

    x2: {
      type: Number,
      default: 0
    },

    y2: {
      type: Number,
      default: 0
    },

    func: {
      type: [Function, undefined],
      required: false,
      default: undefined
    },

    width: {
      type: Number,
      default: 2
    },

    color: {
      type: String,
      default: '#000000'
    }
  },

  computed: {
    path () {
      let path

      if (this.func) {
        let domains = this.parentCoordinateSystem.domains

        path = interpolatePathFromFunc(this.func, this.transformer, domains)
      }

      if (!this.func) {
        let coords = [
          [this.x, this.y],
          [this.x2, this.y2]
        ]

        path = interpolatePath(coords, this.transformer)
      }

      return path
    }
  },

  render (h) {
    return h('path', {
      attrs: {
        'd': this.path,
        'stroke': this.color,
        'stroke-width': this.width,
        'fill': 'none'
      }
    })
  }
}
</script>
