<script>
import Mark from '../../mixins/Marks/Mark.js'
import mapAesthetics from './utils/mapAesthetics.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    y: {
      type: [Number, String, Date, Object, Function, String, undefined],
      default: undefined
    },

    color: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    radius: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    strokeWidth: {
      type: [Number, Object, Function, undefined],
      default: undefined
    }
  },

  computed: {
    aesthetics () {
      return {
        x: this.parseCoordinate(this.x, { dimension: 'x' }),
        y: this.parseCoordinate(this.y, { dimension: 'y' }),
        color: this.parseAesthetic(this.color, { default: '#000000' }),
        radius: this.parseAesthetic(this.radius, { default: 3 }),
        strokeWidth: this.parseAesthetic(this.strokeWidth, { default: 0 })
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
        let aestheticsPerMark = mapAesthetics(this.aesthetics, this.context)

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
