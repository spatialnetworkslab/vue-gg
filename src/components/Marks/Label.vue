<script>
import Mark from '@/mixins/Marks/Mark.js'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    text: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

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

    fontSize: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    // Unmappable
    anchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb'].includes(p)
    }
  },

  computed: {
    aesthetics () {
      return {
        text: this.parseMappable(this.text, undefined),
        x: this.parseCoord(this.x, 'x'),
        y: this.parseCoord(this.y, 'y'),
        color: this.parseMappable(this.color, '#000000'),
        fontSize: this.parseMappable(this.fontSize, 12)
      }
    }
  },

  methods: {
    renderSVG (createElement, aesthetics) {
      // TODO
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
