<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

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
