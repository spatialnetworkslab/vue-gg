<script>
import MultiLine from '../../mixins/Marks/MultiLine.js'
import mapAesthetics from './utils/mapAesthetics.js'

export default {
  mixins: [MultiLine],

  props: {
    fill: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    sortX: {
      type: Boolean,
      default: false
    },

    close: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    renderSVG (createElement, aesthetics) {
      let points = this.generatePoints(aesthetics)

      let path = this.createPath(points)

      if (this.sortX) {
        points = this.sort(points)
      }

      if (this.close) {
        points = this.closePoints(points)
      }

      return createElement('path', {
        attrs: {
          'd': path,
          'stroke': aesthetics.color,
          'stroke-width': aesthetics.width,
          'fill': aesthetics.fill
        }
      })
    }
  }
}
</script>
