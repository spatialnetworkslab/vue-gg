<script>
import Mark from '../../mixins/Marks/Mark.js'
import { textAnchorPoint } from '../../utils/anchorPoint.js'

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
        text: this.parseAesthetic(this.text, {}),
        x: this.parseCoordinate(this.x, { dimension: 'x' }),
        y: this.parseCoordinate(this.y, { dimension: 'y' }),
        color: this.parseAesthetic(this.color, { default: '#000000' }),
        fontSize: this.parseAesthetic(this.fontSize, { default: 16 }),
        rotation: this.parseAesthetic(this.rotation, { default: 0 })
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
          'font-size': aesthetics.fontSize + 'px',
        }
      }, aesthetics.text)

      return el
    }
  }
}
</script>

<style scoped>
.vgg-label {
  font-family: sans-serif;
}
</style>
