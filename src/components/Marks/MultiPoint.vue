<script>
import Mark from '../../mixins/Marks/Mark.js'
import checkGeometry from '../../mixins/Marks/utils/checkGeometry.js'

export default {
  mixins: [Mark],

  props: {
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
    },

    points: {
      type: [Array, undefined],
      default: undefined
    }
  },

  data () {
    return {
      markType: 'multi-point',
      validGeomTypes: ['MultiPoint']
    }
  },

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props

      if (this.geometry) {
        checkGeometry(this.markType, this.validGeomTypes, this.geometry)
      }

      let points = this.geometry
        ? aesthetics.geometry.coordinates
        : aesthetics.points

      return createElement('g',
        points.map(p => {
          let [cx, cy] = this.$$transform(p)
          return createElement('circle', {
            attrs: {
              'cx': cx,
              'cy': cy,
              'r': aesthetics.radius
            },
            style: this.createSVGStyle(aesthetics)
          })
        })
      )
    }
  }
}
</script>
