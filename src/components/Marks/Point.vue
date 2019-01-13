<script>
import Mark from '../../mixins/Marks/Mark.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

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
    },

    opacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    fillOpacity: {
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
        radius: this.parseAesthetic(this.radius, { default: 3 }),
        opacity: this.parseAesthetic(this.opacity, { default: undefined }),
        fillOpacity: this.parseAesthetic(this.fillOpacity, { default: undefined }),
        strokeOpacity: this.parseAesthetic(this.strokeOpacity, { default: undefined })
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
          'r': aesthetics.radius
        },
        style: createSVGStyle(aesthetics)
      })
    }
  }
}
</script>
