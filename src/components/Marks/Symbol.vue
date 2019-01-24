<script>
import Mark from '../../mixins/Marks/Mark.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Mark],

  props: {
    x: {
      type: [Number, String, Date, Object, Function, undefined],
      default: undefined
    },

    y: {
      type: [Number, String, Date, Object, Function, String, undefined],
      default: undefined
    },

    fill: {
      type: [String, Object, Function, undefined],
      default: 'black'
    },

    stroke: {
      type: [String, Object, Function, undefined],
      default: undefined
    },

    strokeWidth: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    shape: {
      type: String,
      default: 'circle'
    },

    size: {
      type: [Number, Object, Function, undefined],
      default: 10
    },

    opacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, Object, Function, undefined],
      default: undefined
    },

    transition: {
      type: Number,
      default: 0
    }
  },

  computed: {
    aesthetics () {
      return {
        x: this.parseCoordinate(this.x, { dimension: 'x' }),
        y: this.parseCoordinate(this.y, { dimension: 'y' }),
        fill: this.parseAesthetic(this.fill, { default: '#000000' }),
        stroke: this.parseAesthetic(this.stroke, { default: 'none' }),
        strokeWidth: this.parseAesthetic(this.strokeWidth, { default: 0 }),
        opacity: this.parseAesthetic(this.opacity),
        fillOpacity: this.parseAesthetic(this.fillOpacity),
        strokeOpacity: this.parseAesthetic(this.strokeOpacity),
        size: this.parseAesthetic(this.size),
        transition: this.transition + 's'
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
        style: createSVGStyle(aesthetics)
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
        style: createSVGStyle(aesthetics)
      })
    },

    createPath (createElement, aesthetics, d) {
      let [cx, cy] = this.$$transform([aesthetics.x, aesthetics.y])
      let s = createSVGStyle(aesthetics)
      let scale = aesthetics.size / 2
      s.strokeWidth = s.strokeWidth / scale
      s.transform = 'translateX(' + cx + 'px) translateY(' + cy + 'px) scale(' + scale + ', ' + scale + ') '

      return createElement('path', {
        attrs: {
          d: d,
        },
        style: s
      })
    },

    getElement (createElement, aesthetics) {
      let path
      if (this.shape === 'circle') {
        return this.createCircle(createElement, aesthetics)
      } else if (this.shape === 'square') {
        return this.createSquare(createElement, aesthetics)
      } else if (this.shape === 'cross') {
        path = 'M-.5,-1L.5,-1L.5,-.5L1,-.5L1,.5L.5,.5L.5,1L-.5,1L-.5,.5L-1,.5L-1,-.5L-.5,-.5L-.5,-1Z'
      } else if (this.shape === 'diamond') {
        path = 'M0,-1L1,0L0,1L-1,0L0,-1Z'
      } else if (this.shape === 'triangle-up') {
        path = 'M0,-1L1,1L-1,1L0,-1Z'
      } else if (this.shape === 'triangle-down') {
        path = 'M1,-1L0,1L-1,-1L1,-1Z'
      } else if (this.shape === 'triangle-right') {
        path = 'M-1,-1L1,0L-1,1L-1,-1Z'
      } else if (this.shape === 'triangle-left') {
        path = 'M1,-1L-1,0L1,1L1,-1Z'
      } else if (this.shape === 'star') {
        path = 'M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z'
      } else {
        return this.createPath(createElement, aesthetics, this.shape)
      }

      return this.createPath(createElement, aesthetics, path)
      
    },

    renderSVG (createElement, aesthetics) {
      let element = this.getElement(createElement, aesthetics)

      let tooltip = createElement('title', 'color scale')

      return createElement('a', {
        attrs: {
          href: '../scales/color.html',
        },
      }, [element, tooltip])
    }
  }
}
</script>
