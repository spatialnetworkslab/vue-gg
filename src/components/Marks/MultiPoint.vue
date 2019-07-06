<script>
import Mark from '../../mixins/Marks/Mark.js'
import { renderSVG } from '../../rendering/multiPoint.js'

export default {
  mixins: [Mark],

  props: {
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
    },

    // Unmappable
    points: {
      type: [Array, undefined],
      default: undefined
    }
  },

  data () {
    return {
      markType: 'multi-point',
      validGeomTypes: ['MultiPoint']
    }
  },

  methods: {
    renderSVG
  }
}
</script>
