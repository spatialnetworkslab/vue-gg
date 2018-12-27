<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

  props: {
    sortX: {
      type: Boolean,
      default: true
    },

    close: {
      type: Boolean,
      default: false
    }
  }
}
</script>
