<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'
import mapAesthetics from './utils/mapAesthetics.js'

export default {
  mixins: [MultiLine],

  props: {
    fill: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    sortX: {
      type: Boolean,
      default: false
    },

    close: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    renderSVG (createElement, aesthetics) {
      let points = this.generatePoints(aesthetics)

      let path = this.createPath(points)

      if (this.sortX) {
        points = this.sort(points)
      }

      if (this.close) {
        points = this.close(points)
      }

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
