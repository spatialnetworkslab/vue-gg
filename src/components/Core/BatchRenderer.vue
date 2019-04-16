<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

import { renderSVG as renderLabelSVG } from '../../rendering/label.js'
import { renderSVG as renderLineSVG } from '../../rendering/line.js'
import { renderSVG as renderPathSVG } from '../../rendering/path.js'
import { renderSVG as renderPointSVG } from '../../rendering/point.js'
import { renderSVG as renderRectangleSVG } from '../../rendering/rectangle.js'
import { renderSVG as renderSymbolSVG } from '../../rendering/symbol.js'
import { renderSVG as renderTrailSVG } from '../../rendering/trial.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform', '$$interactionManager', '$$sectionParentChain'],

  props: {
    content: {
      type: Array,
      required: true
    }
  },

  computed: {
    sectionParentChain () {
      return JSON.stringify(this.$$sectionParentChain)
    },

    _renderContext () {
      return {
        $$transform: this.$$transform,
        $$coordinateTreeParent: this.$$coordinateTreeParent,
        $$coordinateTree: this.$$coordinateTree,
        parentBranch: this.parentBranch
      }
    }
  },

  render (createElement) {
    let elements = []
    for (let elementOptions of this.content) {

    }
  }
}
</script>
