<script>
import { renderSVG as renderLabelSVG } from '../../rendering/label.js'
import { renderSVG as renderLineSVG } from '../../rendering/line.js'
import { renderSVG as renderPathSVG } from '../../rendering/path.js'
import { renderSVG as renderPointSVG } from '../../rendering/point.js'
import { renderSVG as renderRectangleSVG } from '../../rendering/rectangle.js'
import { renderSVG as renderSymbolSVG } from '../../rendering/symbol.js'
import { renderSVG as renderTrailSVG } from '../../rendering/trial.js'

export default {
  props: {
    content: {
      type: Array,
      required: true
    }
  },

  render (createElement) {
    let elements = []
    for (let elementOptions of this.content) {
      
    }
  }
}
</script>
