<script>
import Section from './Section.vue'
import Rectangular from '../../mixins/Marks/Rectangular.js'

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

    scaleGeo: {
      type: [Object, undefined],
      default: undefined
    },

    data: {
      type: [Array, Object, undefined],
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
      if (this.scaleX || this.scaleY || this.scaleGeo) {
        let scales = {}
        if (this.scaleX) { scales.x = this.scaleX }
        if (this.scaleY) { scales.y = this.scaleY }
        if (this.scaleGeo) { scales.geo = this.scaleGeo }

        return scales
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

    renderSection (createElement) {
      if (this.invalidX) {
        throw new Error('Invalid combination of props x1, x2, x and w')
      }

      if (this.invalidY) {
        throw new Error('Invalid combination of props y1, y2, y and h')
      }

      let aesthetics = this.$options.propsData
      let ranges = this.calculateRanges(aesthetics)

      return createElement(Section, {
        props: {
          type: this.type,
          scales: this.scales,
          ranges,
          data: this.data,
          format: this.format,
          transform: this.transform
        }
      }, this.$slots.default)
    }
  },

  render (createElement) {
    return this.renderSection(createElement, this.aesthetics)
  }
}
</script>
