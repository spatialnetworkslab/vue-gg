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
    },

    transition: {
      type: Number,
      default: 0
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

      let t = this.transition

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'fill': aesthetics.color,
          'r': aesthetics.radius,
          'stroke-width': aesthetics.strokeWidth
        },
        style: {
          'transition': t + 's',
        }
      })
    }
  }
}
</script>
