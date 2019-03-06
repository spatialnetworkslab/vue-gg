<script>
import Mark from '../../mixins/Marks/Mark.js'

export default {
  mixins: [Mark],

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
    }
  },

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      let listeners = this.getListeners()

      if (listeners.length > 0) {
        this.addToSpatialIndex([cx, cy], listeners)
      }

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'r': aesthetics.radius
        },
        style: this.createSVGStyle(aesthetics)
      })
    },

    addToSpatialIndex (coordinates, listeners) {
      this.$$interactionManager.addElement(this._uid, 'point', coordinates, this, listeners)
    }
  }
}
</script>
