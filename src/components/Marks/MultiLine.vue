<script>
import Mark from '../../mixins/Marks/Mark.js'
import mapAesthetics from './utils/mapAesthetics.js'
import { interpolatePath } from './utils/createPath.js'
import checkPoints from './utils/checkPoints.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    points: {
      type: [Array, Object, Function, undefined],
      default: undefined
    },

    x: {
      type: [Array, Object, String, Function, undefined],
      default: undefined
    },

    y: {
      type: [Array, Object, String, Function, undefined],
      default: undefined
    },

    color: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    // Non-mappable
    width: {
      type: Number,
      default: 2
    }
  },

  computed: {
    aesthetics () {
      checkPoints(this.points, this.x, this.y)

      return {
        points: this.parseAesthetic(this.points, undefined),
        color: this.parseAesthetic(this.color, '#000000'),

        width: this.parseProperty(this.width, 2)
      }
    }
  },

  methods: {
    createPath (points) {
      let path = interpolatePath(points, this.$$transform)
      return path
    },

    renderSVG (createElement, aesthetics) {
      let path = this.createPath(aesthetics.points)

      return createElement('path', {
        attrs: {
          'd': path,
          'stroke': aesthetics.color,
          'stroke-width': aesthetics.width,
          'fill': 'none'
        }
      })
    }
  },

  render (createElement) {
    if (this.__update) {
      if (!this.$$map) {
        // Create svg element using aesthetics
        return this.renderSVG(createElement, this.aesthetics)
      }

      if (this.$$map) {
        // Create the aesthetics for each mark
        let aestheticsPerMark = mapAesthetics(
          this.aesthetics,
          this.context,
          this.$$dataContainer
        )

        // Create svg element for each mark from aesthetics
        let components = []
        for (let aesthetics of aestheticsPerMark) {
          components.push(
            this.renderSVG(createElement, aesthetics)
          )
        }

        return createElement('g', components)
      }
    }
  }
}
</script>
