<script>
import Rectangular from '@/mixins/Marks/Rectangular.js'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'
import { interpolatePath } from './utils/createPath.js'

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

      let path = interpolatePath(points, this.$$transform)

      return createElement('path', {
        attrs: {
          'd': path,
          'style': `fill: ${aesthetics.color}`
        }
      })
    }
  },

  render (createElement) {
    if (this.__update) {
      if (!this.$$map) {
        // Create svg element using aesthetics
        return this.renderSVG(createElement, this.aesthetics)
      }

      if (this.$$map) {
        // Create the aesthetics for each mark
        let aestheticsPerMark = mapAesthetics(
          this.aesthetics,
          this.context,
          this.$$dataContainer
        )

        // Create svg element for each mark from aesthetics
        let components = []
        for (let aesthetics of aestheticsPerMark) {
          components.push(
            this.renderSVG(createElement, aesthetics)
          )
        }

        return createElement('g', components)
      }
    }
  }
}
</script>
