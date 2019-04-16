import Mark from './Mark.js'
import { renderSVG } from '../../rendering/path.js'

export default {
  mixins: [Mark],

  props: {
    points: {
      type: [Array, undefined],
      default: undefined
    },

    geometry: {
      type: [Object, undefined],
      default: undefined
    },

    x: {
      type: [Array, undefined],
      default: undefined
    },

    y: {
      type: [Array, undefined],
      default: undefined
    },

    x2: {
      type: [Array, undefined],
      default: undefined
    },

    y2: {
      type: [Array, undefined],
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

    strokeLinecap: {
      type: [String, undefined],
      default: undefined,
      validator: s => ['round', 'square', 'butt'].includes(s) || s === undefined
    },

    // Non-aesthetics
    sort: {
      type: [String, undefined],
      default: undefined,
      validator: s => ['x', 'y'].includes(s) || s === undefined
    },

    close: {
      type: Boolean,
      default: false
    },

    interpolate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    _interpolate () {
      if (this.interpolate !== undefined) { return this.interpolate }
      return false
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
          this.uuid, this.pathType, coordinates, this, this.events, this.sectionParentChain
        )
      }
    }
  }
}
