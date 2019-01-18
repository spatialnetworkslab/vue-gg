<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

  data () {
    return {
      markType : 'path-mark'
    }
  },

  props: {
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
    }
  }
}
</script>
