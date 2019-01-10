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
    }
  },

  methods: {
    renderSVG (createElement, aesthetics) {
      if (this.geometry) {
        let path = createGeoPath(aesthetics.geometry, this.$$transform)

        return createElement('path', {
          attrs: {
            'd': path,
            'stroke': aesthetics.color,
            'stroke-width': aesthetics.width,
            'fill': aesthetics.fill
          }
        })
      } else {
        let points = this.generatePoints(aesthetics)

        if (points.length > 1) {
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
        } else {
          console.warn('Not enough valid points to draw Mark')
        }
      }
    }
  }
}
</script>
