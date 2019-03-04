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
        this.addToSpatialIndex([cx, cy], aesthetics.radius, listeners)
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

    getListeners () {
      let listeners = []
      const allowedListeners = ['click'] // TODO more

      for (let listener of allowedListeners) {
        if (this.$options._parentListeners.hasOwnProperty(listener)) {
          listeners.push(listener)
        }
      }

      return listeners
    },

    addToSpatialIndex (coordinates, radius, listeners) {
      let bbox = {
        minX: coordinates[0] - radius,
        maxX: coordinates[0] + radius,
        minY: coordinates[1] - radius,
        maxY: coordinates[1] + radius
      }

      this.$$interactionManager.addElement('point', bbox, this, listeners)
    }
  }
}
</script>
