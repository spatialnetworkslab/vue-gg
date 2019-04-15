<script>
import Mark from '../../mixins/Marks/Mark.js'
import { textAnchorPoint } from '../../utils/anchorPoint.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

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
    renderSVG (createElement) {
      return renderSVG(createElement, this.$$transform, this._props)
    }
  }
}

export function renderSVG (createElement, $$transform, props) {
  let [cx, cy] = $$transform([props.x, props.y])
  let anchorPoint = textAnchorPoint(props.anchorPoint)
  let transform = calcTransform(props.rotation, cx, cy)
  let styles = createSVGStyle(props)

  styles['fontSize'] = props.fontSize + 'px'
  styles['font-family'] = props.fontFamily
  styles['font-weight'] = props.fontWeight

  return createElement('text', {
    attrs: {
      'x': cx,
      'y': cy,
      'fill': props.color,
      'text-anchor': anchorPoint.textAnchor,
      'dominant-baseline': anchorPoint.dominantBaseline,
      'transform': transform,
      'class': 'vgg-label'
    },
    style: styles
  }, props.text)
}

function calcTransform (rotation, cx, cy) {
  return `rotate(${rotation}, ${cx}, ${cy})`
}

</script>
