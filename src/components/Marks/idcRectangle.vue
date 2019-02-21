<script>
import Rectangular from '../../mixins/Marks/Rectangular.js'
import { createPath, interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Rectangular],

  data () {
    return {
      oldStroke: undefined,
    }
  },

  props: {
    index: {
      type: Number,
      default: undefined
    },

    selectionIndex: {
      type: Number,
      default: undefined
    },

    clickHandler: {
      type: Function
    },

    hoverHandler: {
      type: Function
    },

    leaveHandler: {
      type: Function
    }
  },

  computed: {
    strokeColor () {
      if (this.index && this.selectionIndex && (this.index === this.selectionIndex)) {
        return "red"
      } else {
        return "none"
      }
    },
    strokeWidth () {
      if (this.index && this.selectionIndex && (this.index === this.selectionIndex)) {
        return "5"
      } else {
        return "none"
      }
    }
  },

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props
      let coords = this.coordinateSpecification

      let clickHandler = this.clickHandler
      let hoverHandler = this.hoverHandler
      let leaveHandler = this.leaveHandler

      let newAes = JSON.parse(JSON.stringify(aesthetics))
      newAes.stroke = this.strokeColor
      newAes.strokeWidth = this.strokeWidth

      let points = [
        [coords.x1, coords.y1],
        [coords.x1, coords.y2],
        [coords.x2, coords.y2],
        [coords.x2, coords.y1],
        [coords.x1, coords.y1]
      ]

      let path
      if (this._interpolate) {
        path = interpolatePath(points, this.$$transform)
      }

      if (!this._interpolate) {
        path = createPath(points, this.$$transform)
      }
      return createElement('path', {
        attrs: {
          'd': path
        },
        on: {
          click: clickHandler(this),
          mouseover: hoverHandler(this),
          mouseleave: leaveHandler(this)
        },
        style: this.createSVGStyle(newAes)
      })
    }
  }
}
</script>
