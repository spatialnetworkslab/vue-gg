<script>
import Rectangular from '../../mixins/Marks/Rectangular.js'
import { createPath, interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Rectangular],

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props
      let coords = this.coordinateSpecification

      let points = [
        [coords.x1, coords.y1],
        [coords.x1, coords.y2],
        [coords.x2, coords.y2],
        [coords.x2, coords.y1],
        [coords.x1, coords.y1]
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
          'd': path
        },
        style: this.createSVGStyle(aesthetics)
      })
    }
  }
}
</script>
