<script>
import Mark from '@/mixins/Marks/Mark.js'
import { interpolatePath, interpolatePathFromFunc } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    x1: {
      type: Number,
      default: 0
    },

    x2: {
      type: Number,
      default: 0
    },

    y1: {
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
      if (this.__update) {
        let path

        if (this.func) {
          let parentId = this.$$coordinateTreeParent
          let domains = this.$$coordinateTree.getBranch(parentId).domains

          path = interpolatePathFromFunc(this.func, this.$$transform, domains)
        }

        if (!this.func) {
          let coords = [
            [this.x1, this.y1],
            [this.x2, this.y2]
          ]

          path = interpolatePath(coords, this.$$transform)
        }

        return path
      }
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
