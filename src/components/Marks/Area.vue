<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

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
      type: String,
      default: '#000000'
    },

    stroke: {
      type: [String, undefined],
      default: undefined
    },

    points: {
      type: undefined,
      default: undefined
    },

    geometry: {
      type: undefined,
      default: undefined
    }
  },

  data () {
    return {
      pathType: 'area'
    }
  }
}
</script>
