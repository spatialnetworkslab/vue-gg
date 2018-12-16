<script>
import Glyph from '@/components/Core/Glyph.vue'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'
import Mark from '@/mixins/Marks/Mark.js'

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
        'x': this.parseMappable(this.x, 0),
        'y': this.parseMappable(this.y, 0),

        'width': this.parseUnmappable(this.width, 10),
        'height': this.parseUnmappable(this.height, 10),
        'anchorPoint': this.anchorPoint
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
