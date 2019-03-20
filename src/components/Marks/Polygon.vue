<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

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
      type: String,
      default: '#000000'
    }
  },

  data () {
    return {
      pathType: 'polygon',
      validGeomTypes: ['Polygon', 'MultiPolygon']
    }
  }
}
</script>
