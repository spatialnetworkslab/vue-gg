<script>
import { textAnchorPoint } from '../../utils/anchorPoint.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

export default {
  name: 'PlotTitle',

  mixins: [CoordinateTreeUser],

  inject: ['$$transform'],

  props: {
    text: {
      type: String,
      default: 'Plot Title'
    },

    hjust: {
      type: [Number, String],
      default: 'center',
      validator: function (p) {
        return (p.constructor === Number) || (['center', 'l', 'r'].includes(p))
      }
    },

    vjust: {
      type: [Number, String],
      default: 't',
      validator: function (p) {
        return (p.constructor === Number) || (['center', 't', 'b'].includes(p))
      }
    },

    vMargin: {
      type: Number,
      default: 50
    },

    hMargin: {
      type: Number,
      default: 0
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
      let xRange = this.parentBranch.domains.x

      let xMin = Math.min(xRange[0], xRange[1])
      let xMax = Math.max(xRange[0], xRange[1])

      if (this.hjust.constructor === Number) {
        let scaledVal = (xMax - xMin) * this.hjust
        return scaledVal
      } else if (this.hjust === 'center') {
        return (xMax - xMin) / 2 + xRange[0]
      } else if (this.hjust === 'l') {
        return xMin
      } else {
        return xMax
      }
    },

    posY () {
      let yRange = this.parentBranch.domains.y

      let yMin = Math.min(yRange[0], yRange[1])
      let yMax = Math.max(yRange[0], yRange[1])

      if (this.vjust.constructor === Number) {
        let scaledVal = (yMax - yMin) * this.vjust
        return scaledVal
      } else if (this.vjust === 'center') {
        return (yMax - yMin) / 2 + yMin
      } else if (this.vjust === 't') {
        return yMax
      } else {
        return yMin
      }
    },

    screenCoords () {
      let [x, y] = this.$$transform([this.posX, this.posY])

      if (this.hjust === 'l') {
        x = x + this.hMargin
      } else if (this.hjust === 'r') {
        x = x - this.hMargin
      }

      if (this.vjust === 't') {
        y = y + this.vMargin
      } else if (this.vjust === 'b') {
        y = y - this.vMargin
      }

      return [x, y]
    }
  },

  methods: {
    renderSVG (createElement) {
      let [x, y] = this.screenCoords

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
          'dominant-baseline': anchorPoint.dominantBaseline
        },
        style: {
          'font-size': size + 'px',
          'font-family': font
        }
      }, text)

      return el
    }
  },

  render (createElement) {
    return this.renderSVG(createElement)
  }
}
</script>
