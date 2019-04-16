<script>
import Rectangular from '../../mixins/Marks/Rectangular.js'
import { renderSVG } from '../../rendering/rectangle.js'

export default {
  mixins: [Rectangular],

  props: {
    stroke: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 2
    },

    fill: {
      type: String,
      default: '#000000'
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
      this.$$interactionManager.addItem(this.uuid, 'rectangle', coordinates, this, events, this.sectionParentChain)
    }
  }
}
</script>
