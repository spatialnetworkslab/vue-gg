<script>
import Mark from '../../mixins/Marks/Mark.js'

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

    fill: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    stroke: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    strokeWidth: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    radius: {
      type: [Number, Object, Function, undefined],
      default: undefined
    }
  },

  computed: {
    aesthetics () {
      return {
        x: this.parseCoordinate(this.x, { dimension: 'x' }),
        y: this.parseCoordinate(this.y, { dimension: 'y' }),
        fill: this.parseAesthetic(this.fill, { default: '#000000' }),
        stroke: this.parseAesthetic(this.stroke, { default: 'none' }),
        strokeWidth: this.parseAesthetic(this.strokeWidth, { default: 0 }),
        radius: this.parseAesthetic(this.radius, { default: 3 })
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
          'r': aesthetics.radius,
          'style': `fill: ${aesthetics.fill};
                    stroke: ${aesthetics.stroke};
                    stroke-width: ${aesthetics.strokeWidth};`
        }
      })
    }
  }
}
</script>
