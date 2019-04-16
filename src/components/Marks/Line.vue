<script>
import Mark from '../../mixins/Marks/Mark.js'
import { renderSVG } from '../../rendering/line.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    x1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    x2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    func: {
      type: [Function, undefined],
      default: undefined
    },

    stroke: {
      type: String,
      default: '#000000'
    },

    fill: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 2
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
      this.$$interactionManager.addItem(this.uuid, 'line', coordinates, this, events, this.sectionParentChain)
    }
  }
}
</script>
