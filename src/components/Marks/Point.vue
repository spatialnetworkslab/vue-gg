<script>
import Mark from '@/mixins/Marks/Mark.js'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    x: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    y: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    color: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    // Non-mappable
    radius: {
      type: Number,
      default: 3
    },

    strokeWidth: {
      type: Number,
      default: 0
    }
  },

  computed: {
    aesthetics () {
      return {
        x: this.parseMappable(this.x, 0),
        y: this.parseMappable(this.y, 0),
        color: this.parseMappable(this.color, '#000000'),

        radius: this.parseUnmappable(this.radius, 3),
        strokeWidth: this.parseUnmappable(this.strokeWidth, 0)
      }
    }
  },

  methods: {
    renderSVG (createElement, aesthetics) {
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'fill': aesthetics.color,
          'r': aesthetics.radius,
          'stroke-width': aesthetics.strokeWidth
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
