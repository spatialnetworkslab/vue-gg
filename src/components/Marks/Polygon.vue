<script>
import Mark from '@/mixins/Marks/Mark.js'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'
import { interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    points: {
      type: [Array, Object, Function],
      required: true
    },

    color: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    fill: {
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
      return {
        points: this.parseMappable(this.points, undefined),
        color: this.parseMappable(this.color, '#000000'),
        fill: this.parseMappable(this.fill, 'none'),

        width: this.parseUnmappable(this.width, 2)
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
    },

    renderSVG (createElement, aesthetics) {
      let path = this.createPath(aesthetics.points)

      return createElement('path', {
        attrs: {
          'd': path,
          'stroke': aesthetics.color,
          'stroke-width': aesthetics.width,
          'fill': aesthetics.fill
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

      if (!this.$$map) {
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
