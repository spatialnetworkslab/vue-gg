<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'

export default {
  mixins: [MultiLine],

  props: {
    close: {
      type: Boolean,
      default: true
    },

    sort: {
      type: String,
      default: 'x',
      validator: s => ['x', 'y'].includes(s)
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: '#000000'
    },

    points: {
      type: undefined,
      default: undefined
    },

    geometry: {
      type: undefined,
      default: undefined
    }
  }
}
</script>
