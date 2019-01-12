<script>
import Rectangular from '../../mixins/Marks/Rectangular.js'
import { createPath, interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Rectangular],

  methods: {
    renderSVG (createElement, aesthetics) {
      let aes = this.convertCoordinateSpecification(aesthetics)

      let points = [
        [aes.x1, aes.y1],
        [aes.x1, aes.y2],
        [aes.x2, aes.y2],
        [aes.x2, aes.y1],
        [aes.x1, aes.y1]
      ]

      let path
      if (this._interpolate) {
        path = interpolatePath(points, this.$$transform)
      }

      if (!this._interpolate) {
        path = createPath(points, this.$$transform)
      }

      return createElement('path', {
        attrs: {
          'd': path,
          'style': `fill: ${aesthetics.fill};
                    stroke: ${aesthetics.stroke};
                    stroke-width: ${aesthetics.strokeWidth};`
        }
      })
    }
  }
}
</script>
