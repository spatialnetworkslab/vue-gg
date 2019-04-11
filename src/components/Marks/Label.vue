<script>
import Mark from '../../mixins/Marks/Mark.js'
import { textAnchorPoint } from '../../utils/anchorPoint.js'
import checkGeometry from '../../mixins/Marks/utils/checkGeometry.js'

export default {
  mixins: [Mark],

  props: {
    text: {
      type: [String, Number, undefined],
      default: undefined
    },

    x: {
      type: [Number, String, Date],
      // required: true
      required: undefined
    },

    y: {
      type: [Number, String, Date],
      // required: true
      required: undefined
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

    geometry: {
      type: undefined,
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
      markType: 'label-mark',
      validGeomTypes: ['Point']
    }
  },

  methods: {
    calcTransform (rotation, cx, cy) {
      return `rotate(${rotation}, ${cx}, ${cy})`
    },

    renderSVG (createElement) {
      let aesthetics = this._props

      if (this.geometry) {
        checkGeometry(this.markType, this.validGeomTypes, this.geometry)
      }

      let xy = this.geometry
        ? aesthetics.geometry.coordinates
        : [aesthetics.x, aesthetics.y]
      
      let [cx, cy] = this.$$transform(xy)

      let anchorPoint = textAnchorPoint(this.anchorPoint)

      let transform = this.calcTransform(aesthetics.rotation, cx, cy)

      let styles = this.createSVGStyle(aesthetics)

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
