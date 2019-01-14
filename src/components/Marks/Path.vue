<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

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
