<script>
import Mark from '../../mixins/Marks/Mark.js'
import { textAnchorPoint } from '../../utils/anchorPoint.js'

export default {
  mixins: [Mark],

  props: {
    text: {
      type: [String, undefined],
      default: undefined
    },

    x: {
      type: [Number, String, Date],
      required: true
    },

    y: {
      type: [Number, String, Date],
      required: true
    },

    fill: {
      type: String,
      default: '#000000'
    },

    stroke: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 0
    },

    opacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    fontSize: {
      type: Number,
      default: 16
    },

    rotation: {
      type: Number,
      default: 0
    },

    // Unmappable
    anchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'].includes(p)
    }
  },

  data () {
    return {
      markType: 'label-mark'
    }
  },

  computed: {
    aesthetics () {
      return {
        text: this.parseAesthetic(this.text),
        x: this.parseCoordinate(this.x, { dimension: 'x' }),
        y: this.parseCoordinate(this.y, { dimension: 'y' }),
        fill: this.parseAesthetic(this.fill, { default: '#000000' }),
        stroke: this.parseAesthetic(this.stroke, { default: 'none' }),
        strokeWidth: this.parseAesthetic(this.strokeWidth, { default: 0 }),
        radius: this.parseAesthetic(this.radius, { default: 3 }),
        opacity: this.parseAesthetic(this.opacity),
        fillOpacity: this.parseAesthetic(this.fillOpacity),
        strokeOpacity: this.parseAesthetic(this.strokeOpacity),
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

      let styles = this.createSVGStyle(aesthetics)
      styles['fontSize'] = aesthetics.fontSize + 'px'

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
        style: styles
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
