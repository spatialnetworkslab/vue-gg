<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

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
  },

  data () {
    return {
      markType: 'path-mark'
    }
  }
}
</script>
