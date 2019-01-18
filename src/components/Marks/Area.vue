<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

  data () {
    return {
      markType : 'area-mark'
    }
  },

  props: {
    close: {
      type: Boolean,
      default: true
    },

    sort: {
      type: String,
      default: 'x',
      validator: s => ['x', 'y'].includes(s)
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: '#000000'
    },

    stroke: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    points: {
      type: undefined,
      default: undefined
    },

    geometry: {
      type: undefined,
      default: undefined
    },

    // This is not actually meant to be used, just a flag for the mixin logic
    _area: {
      type: Boolean,
      default: true
    }
  }
}
</script>
