<script>
import Mark from '../../mixins/Marks/Mark.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

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

  beforeDestroy () {
    let uid = this.uuid
    if (this.events.length > 0) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      let events = this.events
      if (events.length > 0) {
        this.addToSpatialIndex([cx, cy], events)
      }

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'r': aesthetics.radius
        },
        style: createSVGStyle(aesthetics)
      })
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, 'point', coordinates, this, events, this.sectionParentChain)
    }
  }
}

export function renderSVG (createElement) {
  // TODO
}
</script>
