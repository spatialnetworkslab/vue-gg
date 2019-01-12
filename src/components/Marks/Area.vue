<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

  props: {
    close: {
      type: Boolean,
      default: true
    },

    sortX: {
      type: Boolean,
      default: true
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: '#000000'
    }

  }
}
</script>
