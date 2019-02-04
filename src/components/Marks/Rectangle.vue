<script>
import Rectangular from '../../mixins/Marks/Rectangular.js'
import { createPath, interpolatePath } from './utils/createPath.js'

export default {
  mixins: [Rectangular],

  methods: {
    renderSVG (createElement) {
      let aesthetics = this.$options.propsData
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
          'd': path
        },
        style: this.createSVGStyle(aesthetics)
      })
    }
  }
}
</script>
