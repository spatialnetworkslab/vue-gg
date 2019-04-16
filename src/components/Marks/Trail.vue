<script>
import Path from '../../mixins/Marks/Path.js'
import { renderSVG } from '../../rendering/trail.js'

export default {
  mixins: [Path],

  props: {
    strokeWidth: {
      type: [Number, Array],
      default: 1
    }
  },

  data () {
    return {
      markType: 'trail-mark'
    }
  },

  beforeDestroy () {
    let uid = this.uuid
    if (this.events) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    renderSVG,

    addToSpatialIndex (points, events) {
      this.$$interactionManager.addItem(this.uuid, 'trail', points, this, events, this.sectionParentChain)
    }
  }
}
</script>
