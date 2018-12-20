<script>
import Mark from '@/mixins/Marks/Mark.js'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'
import { textAnchorPoint } from '@/utils/anchorPoint.js'

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

    rotation: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    // Unmappable
    anchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'].includes(p)
    }
  },

  computed: {
    aesthetics () {
      return {
        text: this.parseMappable(this.text, undefined),
        x: this.parseCoord(this.x, 'x'),
        y: this.parseCoord(this.y, 'y'),
        color: this.parseMappable(this.color, '#000000'),
        fontSize: this.parseMappable(this.fontSize, 16),
        rotation: this.parseMappable(this.rotation, 0)
      }
    }
  },

  methods: {
    calcTransform (rotation, cx, cy) {
      return `rotate(${rotation}, ${cx}, ${cy})`
    },

    renderSVG (createElement, aesthetics) {
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      let anchorPoint = textAnchorPoint(this.anchorPoint)

      let transform = this.calcTransform(aesthetics.rotation, cx, cy)

      let el = createElement('text', {
        attrs: {
          'x': cx,
          'y': cy,
          'fill': aesthetics.color,
          'text-anchor': anchorPoint.textAnchor,
          'dominant-baseline': anchorPoint.dominantBaseline,
          'transform': transform,
          'class': 'vgg-label'
        },
        style: {
          'font-size': aesthetics.fontSize + 'px'
        }
      }, aesthetics.text)

      return el
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

<style scoped>
.vgg-label {
  font-family: sans-serif;
}
</style>
