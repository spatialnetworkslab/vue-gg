<script>
import Section from './Section.vue'
import Rectangular from '../../mixins/Marks/Rectangular.js'
import mapAesthetics from '../../components/Marks/utils/mapAesthetics.js'

export default {
  mixins: [Rectangular],

  props: {
    type: {
      type: String,
      default: 'scale'
    },

    domains: {
      type: [Object, undefined],
      default: undefined
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
          domains: this.domains,
          ranges
        }
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
