<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

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
