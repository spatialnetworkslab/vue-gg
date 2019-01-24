<script>
import Section from './Section.vue'
import Rectangular from '../../mixins/Marks/Rectangular.js'
import mapAesthetics from '../../mixins/Marks/utils/mapAesthetics.js'

export default {
  mixins: [Rectangular],

  props: {
    type: {
      type: String,
      default: 'scale'
    },

    scaleX: {
      type: [Object, String, Array, undefined],
      default: undefined
    },

    scaleY: {
      type: [Object, String, Array, undefined],
      default: undefined
    },

    data: {
      type: [Function, Array, Object, undefined],
      default: undefined
    },

    format: {
      type: [String, undefined],
      default: undefined
    },

    transform: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  computed: {
    scales () {
      if (this.scaleX || this.scaleY) {
        let scales = {}
        if (this.scaleX) { scales.x = this.scaleX }
        if (this.scaleY) { scales.y = this.scaleY }

        return scales
      }
    },

    _sectionData () {
      if (!this.$$map) {
        if (this.data && this.data.constructor === Function) {
          console.warn('Can only use getter function when mapping')
          return undefined
        } else {
          return this.data
        }
      }

      if (this.$$map) {
        if (this.data && this.data.constructor === Function) {
          return { func: this.data }
        } else {
          return { assign: this.data }
        }
      }
    },

    aesthetics () {
      if (this.invalidX) {
        throw new Error('Invalid combination of props x1, x2, x and w')
      }

      if (this.invalidY) {
        throw new Error('Invalid combination of props y1, y2, y and h')
      }

      return {
        x1: this.parseCoordinate(this.x1, { dimension: 'x' }),
        x2: this.parseCoordinate(this.x2, { dimension: 'x' }),
        y1: this.parseCoordinate(this.y1, { dimension: 'y' }),
        y2: this.parseCoordinate(this.y2, { dimension: 'y' }),
        x: this.parseCoordinate(this.x, { dimension: 'x' }),
        y: this.parseCoordinate(this.y, { dimension: 'y' }),
        w: this.parseCoordinate(this.w, { dimension: 'x', wh: true }),
        h: this.parseCoordinate(this.h, { dimension: 'y', wh: true }),
        color: this.parseAesthetic(this.color, { default: '#000000' }),

        data: this._sectionData
      }
    }
  },

  methods: {
    calculateRanges (aesthetics) {
      let aes = this.convertCoordinateSpecification(aesthetics)
      return {
        x: [aes.x1, aes.x2],
        y: [aes.y1, aes.y2]
      }
    },

    renderSection (createElement, aesthetics) {
      let ranges = this.calculateRanges(aesthetics)

      return createElement(Section, {
        props: {
          type: this.type,
          scales: this.scales,
          ranges,
          data: aesthetics.data,
          format: this.format,
          transform: this.transform
        },
      }, this.$slots.default)
    }
  },

  render (createElement) {
    if (!this.$$map) {
      return this.renderSection(createElement, this.aesthetics)
    }

    if (this.$$map) {
      let aestheticsPerSection = mapAesthetics(this.aesthetics, this.context)

      // Create svg element for each mark from aesthetics
      let sections = []
      for (let aesthetics of aestheticsPerSection) {
        sections.push(
          this.renderSection(createElement, aesthetics)
        )
      }

      return createElement('g', sections)
    }
  }
}
</script>
