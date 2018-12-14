<script>
import Mark from '@/mixins/Marks/Mark.js'
import mapAesthetics from '@/components/Marks/utils/mapAesthetics.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, Object, undefined],
      default: undefined
    },

    y: {
      type: [Number, Object, undefined],
      default: undefined
    },

    color: {
      type: [String, Object, undefined],
      default: undefined
    },

    radius: {
      type: Number,
      default: 3
    },

    strokeWidth: {
      type: Number,
      default: 0
    }
  },

  computed: {
    _x () { return this.default(this.x, 0) },
    _y () { return this.default(this.y, 0) },
    _color () { return this.default(this.color, '#000000') },

    _radius () { return this.$$map ? { assign: this.radius } : this.radius },
    _strokeWidth () { return this.$$map ? { assign: this.strokeWidth } : this.strokeWidth },

    aesthetics () {
      return {
        'x': this._x,
        'y': this._y,
        'color': this._color,
        'radius': this._radius,
        'strokeWidth': this._strokeWidth
      }
    }
  },

  methods: {
    renderSVG (createElement, transform, aesthetics) {
      let [cx, cy] = transform([aesthetics.x, aesthetics.y])

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'fill': aesthetics.color,
          'r': aesthetics.radius,
          'stroke-width': aesthetics.strokeWidth
        }
      })
    }
  },

  render (createElement) {
    if (this.__update) {
      if (!this.$$map) {
        // Create svg element using aesthetics
        return this.renderSVG(createElement, this.$$transform, this.aesthetics)
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
            this.renderSVG(createElement, this.$$transform, aesthetics)
          )
        }

        return createElement('g', components)
      }
    }
  }
}
</script>
