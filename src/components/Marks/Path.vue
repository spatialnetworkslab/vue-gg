<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

  props: {
    _sortX: {
      type: Boolean,
      default: false
    },

    _close: {
      type: Boolean,
      default: true
    }
  }
}
</script>
