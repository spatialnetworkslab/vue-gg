<script>
import Mark from '../../mixins/Marks/Mark.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, String, Date],
      required: true
    },

    y: {
      type: [Number, String, Date],
      required: true
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
      default: 2
    },

    shape: {
      type: String,
      default: 'circle'
    },

    size: {
      type: Number,
      default: 10
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
    }
  },

  computed: {
    pathAlias() {
      return {
        'cross': 'M-.5,-1L.5,-1L.5,-.5L1,-.5L1,.5L.5,.5L.5,1L-.5,1L-.5,.5L-1,.5L-1,-.5L-.5,-.5L-.5,-1Z',
        'crossSharp': 'M0,-1L.2,-.2L1,0L.2,.2L0,1L-.2,.2L-1,0L-.2,-.2Z',

        'diamond': 'M0,-1L1,0L0,1L-1,0L0,-1Z',

        'triangle-up': 'M0,-1L1,1L-1,1L0,-1Z',
        'triangle-down': 'M1,-1L0,1L-1,-1L1,-1Z',
        'triangle-left': 'M-1,-1L1,0L-1,1L-1,-1Z',
        'triangle-right': 'M1,-1L-1,0L1,1L1,-1Z',

        'star4': 'M0,.71L1,1L.71,0L1,-1L0,-.71L-1,-1L-.71,0L-1,1L0,.71Z',
        'star5': 'M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z',
        'star': 'M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z',
        'star6': 'M0,.58L.5,1L.43,.29L1,0L.43,-.29L.5,-1L0,-.58L-.5,-1L-.43,-.29L-1,0L-.43,.29L-.5,1Z',

        'pentagon': 'M-1,-.24L-0,-1L1,-.24L.62,1L-.62,1L-1,-.24Z',
        'hexagon': 'M-1,0L-.57,-1L.57,-1L1,0L.57,1L-.57,1L-1,0Z',
        'heptagon': 'M-1,.29L-.8,-.6L-0,-1L.8,-.6L1,.29L.45,1L-.45,1L-1,.29Z',
        'septagon': 'M-1,.29L-.8,-.6L-0,-1L.8,-.6L1,.29L.45,1L-.45,1L-1,.29Z',
        'octagon': 'M-1,-.41L-.41,-1L.41,-1L1,-.41L1,.41L.41,1L-.41,1L-1,.41L-1,-.41Z',
        'nonagon': 'M.35,-1L.88,-.55L1,.15L.65,.76L0,1L-.65,.76L-1,.15L-.88,-.55L-.35,-1L.35,-1Z',
        'decagon': 'M-1,0L-.81,-.62L-.31,-1L.31,-1L.81,-.62L1,0L.81,.62L.31,1L-.31,1L-.81,.62L-1,0Z'
      }
    }
  },

  methods: {
    createCircle (createElement, aesthetics) {
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])
      let r = aesthetics.size / 2

      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'r': r
        },
        style: this.createSVGStyle(aesthetics)
      })
    },

    createSquare (createElement, aesthetics) {
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])

      let l = aesthetics.size
      let x = cx - (l / 2)
      let y = cy - (l / 2)

      return createElement('rect', {
        attrs: {
          'width': l,
          'height': l,
          'x': x,
          'y': y
        },
        style: this.createSVGStyle(aesthetics)
      })
    },

    createPath (createElement, aesthetics, d) {
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])
      let s = this.createSVGStyle(aesthetics)
      let scale = aesthetics.size / 2
      s.strokeWidth = s.strokeWidth / scale
      s.transform = 'translateX(' + cx + 'px) translateY(' + cy + 'px) scale(' + scale + ', ' + scale + ') '

      return createElement('path', {
        attrs: {
          d
        },
        style: s
      })
    },

    renderSVG (createElement) {
      let aesthetics = this._props
      let path

      if (this.shape === 'circle') {
        return this.createCircle(createElement, aesthetics)
      } else if (this.shape === 'square') {
        return this.createSquare(createElement, aesthetics)
      } else if (this.pathAlias.hasOwnProperty(this.shape)) {
        path = this.pathAlias[this.shape]
      } 

      else {
        return this.createPath(createElement, aesthetics, this.shape)
      }

      return this.createPath(createElement, aesthetics, path)
    }
  }
}
</script>
