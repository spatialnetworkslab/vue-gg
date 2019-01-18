<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

  data () {
    return {
      markType : 'polygon-mark'
    }
  },

  props: {
    sort: {
      type: undefined,
      default: undefined
    },

    close: {
      type: Boolean,
      default: true
    },

    x2: {
      type: undefined,
      default: undefined
    },

    y2: {
      type: undefined,
      default: undefined
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: '#000000'
    }
  }
}
</script>
