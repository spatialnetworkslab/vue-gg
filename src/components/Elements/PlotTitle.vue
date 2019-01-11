<script>
import { textAnchorPoint } from '../../utils/anchorPoint.js'

export default {
  name: 'PlotTitle',

  props: {
    text: {
      type: String,
      default: 'Plot Title'
    },

    x: {
      type: Number,
      required: true
    },

    y: {
      type: Number,
      required: true
    },

    color: {
      type: String,
      default: 'black'
    },

    fontSize: {
      type: Number,
      default: 16
    },

    fontFamily: {
      type: String,
      default: 'Helvetica'
    },

    anchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'].includes(p)
    }
  },

  methods: {
    renderSVG (createElement) {
      let x = this.x
      let y = this.y
      let color = this.color
      let font = this.fontFamily
      let size = this.fontSize

      let text = this.text

      let anchorPoint = textAnchorPoint(this.anchorPoint)

      let el = createElement('text', {
        attrs: {
          'x': x,
          'y': y,
          'fill': color,
          'text-anchor': anchorPoint.textAnchor,
          'dominant-baseline': anchorPoint.dominantBaseline,
        },
        style: {
          'font-size': size + 'px',
          'font-family': font,
        }
      }, text)

      return el
    }
  },
  
  render (createElement) {
    let el = this.renderSVG(createElement)
    return this.renderSVG(createElement)
  }
} 
</script>