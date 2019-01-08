<script>
import Glyph from './Glyph.vue'
import mapAesthetics from '../Marks/utils/mapAesthetics.js'
import Mark from '../../mixins/Marks/Mark.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    x: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    y: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    // Non-mappable
    width: {
      type: Number,
      default: 10
    },

    height: {
      type: Number,
      default: 10
    },

    anchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb'].includes(p)
    }
  },

  computed: {
    aesthetics () {
      return {
        x: this.parseCoordinate(this.x, { dimension: 'x' }),
        y: this.parseCoordinate(this.y, { dimension: 'y' }),

        width: this.parseProperty(this.width, { default: 10 }),
        height: this.parseProperty(this.height, { default: 10 }),
        anchorPoint: this.parseProperty(this.anchorPoint, { default: 'center' })
      }
    }
  },

  methods: {
    renderSVG (createElement, aesthetics) {
      return createElement(Glyph, { props: aesthetics }, this.$slots.default)
    }
  }
}
</script>
