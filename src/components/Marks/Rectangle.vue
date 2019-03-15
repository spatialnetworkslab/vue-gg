<script>
import Rectangular from '../../mixins/Marks/Rectangular.js'
import {
  interpolatePoints,
  transformPoints,
  createPath
} from './utils/createPath.js'

export default {
  mixins: [Rectangular],

  props: {
    stroke: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 2
    },

    fill: {
      type: String,
      default: '#000000'
    },

    opacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, undefined],
      default: undefined
    }
  },

  beforeDestroy () {
    let uid = this.uuid
    if (this.events.length > 0) {
      this.$$interactionManager.removeItem(uid)
    }
  },

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

      let transformedPoints
      let path

      if (this._interpolate) {
        let interpolatedPoints = interpolatePoints(points)
        transformedPoints = transformPoints(interpolatedPoints, this.$$transform)
        path = createPath(transformedPoints)
      }

      if (!this._interpolate) {
        transformedPoints = transformPoints(points, this.$$transform)
        path = createPath(transformedPoints)
      }

      let events = this.events
      if (events.length > 0) {
        this.addToSpatialIndex(transformedPoints, events)
      }

      return createElement('path', {
        attrs: {
          'd': path
        },
        style: this.createSVGStyle(aesthetics)
      })
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, 'rectangle', coordinates, this, events, this.sectionParentChain)
    }
  }
}
</script>
