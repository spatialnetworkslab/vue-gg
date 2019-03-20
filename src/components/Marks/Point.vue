<script>
import Mark from '../../mixins/Marks/Mark.js'
import checkGeometry from '../../mixins/Marks/utils/checkGeometry.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, String, Date],
      default: undefined
    },

    y: {
      type: [Number, String, Date],
      default: undefined
    },

    fill: {
      type: String,
      default: '#000000'
    },

    stroke: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 0
    },

    radius: {
      type: Number,
      default: 3
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
    },

    transition: {
      type: Number,
      default: 0
    },

    geometry: {
      type: undefined,
      default: undefined
    }
  },

  data () {
    return {
      markType: 'point',
      validGeomTypes: ['Point']
    }
  },

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props
      let xy = []

      if (this.geometry) {
        checkGeometry(this.markType, this.validGeomTypes, this.geometry)
        let coordinates = aesthetics.geometry.coordinates
        xy.push(coordinates[0], coordinates[1])
      } else {
        xy.push(aesthetics.x, aesthetics.y)
      }

      let [cx, cy] = this.$$transform(xy)

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'r': aesthetics.radius
        },
        style: this.createSVGStyle(aesthetics)
      })
    }
  }
}
</script>
