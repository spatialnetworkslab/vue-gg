<script>
import Mark from '../../mixins/Marks/Mark.js'
import { renderSVG } from '../../rendering/label.js'

export default {
  mixins: [Mark],

  props: {
    text: {
      type: [String, Number, undefined],
      default: undefined
    },

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

    fontFamily: {
      type: String,
      default: 'Helvetica'
    },

    fontSize: {
      type: Number,
      default: 16
    },

    fontWeight: {
      type: [String, Number],
      default: 'normal'
    },

    rotation: {
      type: Number,
      default: 0
    },

    // Unmappable
    anchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'].includes(p)
    }
  },

  data () {
    return {
      markType: 'label-mark'
    }
  },

  methods: {
    renderSVG
  }
}

</script>
