<script>
import Mark from '../../mixins/Marks/Mark.js'
import { textAnchorPoint } from '../../utils/anchorPoint.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    text: {
      type: [String, Object, undefined],
      default: undefined
    },

    x: {
      type: [Number, String, Date, Object, undefined],
      default: undefined
    },

    y: {
      type: [Number, String, Date, Object, String, undefined],
      default: undefined
    },

    fill: {
      type: [String, Object, undefined],
      default: undefined
    },

    stroke: {
      type: [String, Object, undefined],
      default: undefined
    },

    strokeWidth: {
      type: [Number, Object, undefined],
      default: undefined
    },

    opacity: {
      type: [Number, Object, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, Object, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, Object, undefined],
      default: undefined
    },

    fontSize: {
      type: [Number, Object, undefined],
      default: undefined
    },

    rotation: {
      type: [Number, Object, undefined],
      default: undefined
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

      let styles = createSVGStyle(aesthetics)
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
