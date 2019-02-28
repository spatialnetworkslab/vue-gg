<script>
import Mark from '../../mixins/Marks/Mark.js'
import { textAnchorPoint } from '../../utils/anchorPoint.js'

export default {
  mixins: [Mark],

  props: {
    text: {
      type: [String, Number, undefined],
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

    fontFamily: {
      type: String,
      default: 'Helvetica'
    },

    fontSize: {
      type: Number,
      default: 16
    },

    fontWeight: {
      type: [String, Number],
      default: 'normal'
    },

    rotation: {
      type: Number,
      default: 0
    },

    fill: {
      type: String,
      default: 'none'
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

  methods: {
    calcTransform (rotation, cx, cy) {
      return `rotate(${rotation}, ${cx}, ${cy})`
    },

    renderSVG (createElement) {
      let aesthetics = this._props
      let aestheticsOption = {'fill': blue, 'fillOpacity': 0.6}

      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      let anchorPoint = textAnchorPoint(this.anchorPoint)

      let transform = this.calcTransform(aesthetics.rotation, cx, cy)

      let styles = this.createSVGStyle(aesthetics)
      let elements = []
      styles['fontSize'] = aesthetics.fontSize + 'px'
      styles['font-family'] = this.fontFamily
      styles['font-weight'] = this.fontWeight

      // let textEl = createElement('rect', {
      //   attrs: {
      //     'x': cx,
      //     'y': cy,
      //     'width': 50,
      //     'height': 12,
      //   }, aestheticsOption)
      // elements.push(textEl)
      // ctx.insertBefore(rect, textElm);
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
      elements.push(el)
      return elements
    }
  }
}
</script>
