<script>
import Mark from '../../mixins/Marks/Mark.js'
import { renderSVG } from '../../rendering/symbol.js'

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
      default: 2
    },

    shape: {
      type: String,
      default: 'circle'
    },

    size: {
      type: Number,
      default: 10
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
    if (this.events) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    renderSVG,

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, 'symbol', coordinates, this, events, this.sectionParentChain)
    }
  }
}
</script>
