<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

  data () {
    return {
      markType : 'multiline-mark'
    }
  },

  props: {
    sort: {
      type: String,
      default: 'x',
      validator: s => ['x', 'y'].includes(s)
    },

    close: {
      type: Boolean,
      default: false
    },

    x2: {
      type: undefined,
      default: undefined
    },

    y2: {
      type: undefined,
      default: undefined
    }
  }
}
</script>
