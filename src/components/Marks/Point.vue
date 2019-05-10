<script>
import Mark from '../../mixins/Marks/Mark.js'
import checkGeometry from '../../mixins/Marks/utils/checkGeometry.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, String, Date],
      default: undefined
    },

    y: {
      type: [Number, String, Date],
      default: undefined
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

    geometry: {
      type: undefined,
      default: undefined
    }
  },

  data () {
    return {
      markType: 'point',
      validGeomTypes: ['Point']
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

      if (this.geometry) {
        checkGeometry(this.markType, this.validGeomTypes, this.geometry)
      }

      let xy = this.geometry
        ? aesthetics.geometry.coordinates
        : [aesthetics.x, aesthetics.y]

      let [cx, cy] = this.$$transform(xy)

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
        style: this.createSVGStyle(aesthetics)
      })
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, 'point', coordinates, this, events, this.sectionParentChain)
    }
  }
}
</script>
