<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

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
    },

    _validGeomTypes: {
      type: Array,
      default: () => ['LineString', 'MultiLineString']
    },

    _mark: {
      type: String,
      default: 'vgg-multi-line'
    }
  }
}
</script>
