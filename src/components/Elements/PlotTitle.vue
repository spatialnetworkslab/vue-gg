<script>
import { textAnchorPoint } from '../../utils/anchorPoint.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

export default {
  name: 'PlotTitle',

  mixins: [CoordinateTreeUser],

  props: {
    text: {
      type: String,
      default: 'Plot Title'
    },

    vjust: {
      type: [Number, String],
      default: 'center',
      validator: function (p) {
        return (p.constructor === Number) || (['center', 'l', 'r'].includes(p))
      }
    },

    hjust: {
      type: [Number, String],
      default: 't',
      validator: function (p) {
        return (p.constructor === Number) || (['center', 't', 'b'].includes(p))
      }
    },

    margin: {
      type: Number,
      default: 50
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

  computed: {
    posX () {
      let xRange = this.parentBranch.ranges.x

      if (this.vjust.constructor === Number) { 
        let scaledVal = (xRange[1] - xRange[0]) * this.vjust + xRange[0]
        return scaledVal
      } else if (this.vjust === 'center') {
        return (xRange[1] - xRange[0]) / 2 + xRange[0]
      } else if (this.vjust === 'l') {
        return xRange[0] + this.margin
      } else {
        return xRange[1] - this.margin
      }
    },

    posY () {
      let yRange = this.parentBranch.ranges.y

      let yMin = Math.min(yRange[0], yRange[1])
      let yMax = Math.max(yRange[0], yRange[1])

      if (this.hjust.constructor === Number) { 
        let scaledVal = (yMx - yMin) * this.hjust + yMin
        return scaledVal
      } else if (this.hjust === 'center') {
        return (yMax - yMin / 2) + yMin
      } else if (this.hjust === 't') {
        return yMin + this.margin
      } else {
        return yMax - this.margin
      }
    }
  },

  methods: {
    renderSVG (createElement) {
      let x = this.posX
      let y = this.posY

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