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
        x: this.parseCoordinate(this.x, 'x'),
        y: this.parseCoordinate(this.y, 'y'),

        width: this.parseProperty(this.width, 10),
        height: this.parseProperty(this.height, 10),
        anchorPoint: this.parseProperty(this.anchorPoint, 'center')
      }
    }
  },

  methods: {
    renderGlyph (createElement, aesthetics) {
      return createElement(Glyph, { props: aesthetics }, this.$slots.default)
    }
  },

  render (createElement) {
    if (!this.$$map) {
      return this.renderGlyph(createElement, this.aesthetics)
    }

    if (this.$$map) {
      let aestheticsPerGlyph = mapAesthetics(
        this.aesthetics,
        this.context,
        this.$$dataContainer
      )

      // Create svg element for each mark from aesthetics
      let glyphs = []
      for (let aesthetics of aestheticsPerGlyph) {
        glyphs.push(
          this.renderGlyph(createElement, aesthetics)
        )
      }

      return createElement('g', glyphs)
    }
  }
}
</script>
