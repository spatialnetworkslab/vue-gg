<script>
import Mark from '../../mixins/Marks/Mark.js'
import { renderSVG } from '../../rendering/point.js'

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
    if (this.events) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    renderSVG,

    addToSpatialIndex (coordinates) {
      if (this.events) {
        this.$$interactionManager.addItem(
          this.uuid, 'point', coordinates, this._props, this.events, this.sectionParentChain
        )
      }
    }
  }
}
</script>
