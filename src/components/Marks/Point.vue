<script>
import Mark from '../../mixins/Marks/Mark.js'
import checkGeometry from '../../mixins/Marks/utils/checkGeometry.js'
import { createGeoPath } from '../../components/Marks/utils/createPath.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, String, Date],
      default: undefined
      // required: true
    },

    y: {
      type: [Number, String, Date],
      default: undefined
      // required: true
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
      validGeomTypes: ['Point', 'MultiPoint']
    }
  },

  methods: {
    renderSVG (createElement) {
      let aesthetics = this._props
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      if (this.geometry) {
        checkGeometry(this.markType, this.validGeomTypes, this.geometry)
        let path = createGeoPath(aesthetics.geometry, this.$$transform)
        return createElement('path', {
          attrs: {
            'd': path
          },
          style: this.createSVGStyle(aesthetics)
        })
      } else {
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
}
</script>
