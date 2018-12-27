<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

  props: {
    sortX: {
      type: Boolean,
      default: false
    },

    close: {
      type: Boolean,
      default: true
    }
  }
}
</script>
