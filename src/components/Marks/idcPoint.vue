<script>
import Mark from '../../mixins/Marks/Mark.js'

export default {
  mixins: [Mark],

  data () {
    return {
      oldFill: undefined,
    }
  },

  props: {
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

    radius: {
      type: Number,
      default: 3
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

    transition: {
      type: Number,
      default: 0
    },

    index: {
      type: Number,
      default: undefined
    },

    selectionIndex: {
      type: Number,
      default: undefined
    },

    clickHandler: {
      type: Function
    },

    hoverHandler: {
      type: Function
    },

    leaveHandler: {
      type: Function
    }
  },

  computed: {
    fillColor () {
      if (this.index && this.selectionIndex && (this.index === this.selectionIndex)) {
        return "red"
      } else {
        return this._props.fill
      }
    },

    colorOpacity () {
      if (this.index && this.selectionIndex && (this.index === this.selectionIndex)) {
        return 1
      } else {
        return this._props.fillOpacity
      }
    }
  },

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      let clickHandler = this.clickHandler
      let hoverHandler = this.hoverHandler
      let leaveHandler = this.leaveHandler

      let newAes = JSON.parse(JSON.stringify(aesthetics))
      newAes.fillOpacity = this.colorOpacity
      newAes.fill = this.fillColor

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'r': aesthetics.radius,
        },
        on: {
          click: clickHandler(this),
          mouseover: hoverHandler(this),
          mouseleave: leaveHandler(this)
        },
        style: this.createSVGStyle(newAes)
      })
    }
  }
}
</script>
