<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

  props: {
    close: {
      type: Boolean,
      default: true
    },

    sort: {
      type: String,
      default: 'x',
      validator: s => ['x', 'y'].includes(s)
    },

    fill: {
      type: String,
      default: '#000000'
    },

    stroke: {
      type: [String, undefined],
      default: undefined
    },

    points: {
      type: undefined,
      default: undefined
    },

    geometry: {
      type: undefined,
      default: undefined
    }
  },

  data () {
    return {
      pathType: 'area'
    }
  },

  methods: {
    getOtherPoints () {
      let points

      let aesthetics = this._props

      // if neither x2 nor y2 is given, assume x2 is bottom of section
      if (!aesthetics.x2 && !aesthetics.y2) {
        let yMin = this.parentBranch.domains.y[0]
        points = this.generatePoints([yMin], aesthetics.y)
      } 

      if (aesthetics.x2 && !aesthetics.y2) {
        points = this.generatePoints(aesthetics.x2, aesthetics.y)
      }

      if (!aesthetics.x2 && aesthetics.y2) {
        points = this.generatePoints(aesthetics.x, aesthetics.y2)
      }

      if (aesthetics.x2 && aesthetics.y2) {
        points = this.generatePoints(aesthetics.x2, aesthetics.y2)
      }

      if (this.sort) { points = this.sortPoints(points) }

      return points.reverse()
    }
  }
}
</script>
