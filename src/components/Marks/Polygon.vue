<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'
import { createGeoPath } from './utils/createPath.js'

export default {
  mixins: [MultiLine],

  props: {
    sortX: {
      type: [String, undefined],
      default: undefined
    },

    close: {
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
