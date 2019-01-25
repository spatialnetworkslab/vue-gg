<script>
import Mark from '../../mixins/Marks/Mark.js'
import { textAnchorPoint } from '../../utils/anchorPoint.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Mark],

  data () {
    return {
      markType : 'label-mark'
    }
  },

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
    },

    fontFamily: {
      type: String,
      default: 'Helvetica'
    },

    fontSize: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    fontWeight: {
      type: [String, Number],
      default: 'normal'
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
      styles['font-family'] = this.fontFamily
      styles['font-weight'] = this.fontWeight

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
