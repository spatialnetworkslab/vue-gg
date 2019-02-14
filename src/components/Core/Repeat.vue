<script>
import { calculateGridLayout } from './utils/grid.js'
import { calculateRowsCols, repeatSections } from './utils/repeat.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

export default {
  mixins: [CoordinateTreeUser],

  props: {
    x: {
      type: [Array, undefined],
      default: undefined
    },
    y: {
      type: [Array, undefined],
      default: undefined
    },
    layoutPadding: {
      type: [Number, Object],
      default: 0
    },
    cellPadding: {
      type: [Number, Object],
      default: 0
    }
  },

  methods: {
    validateProps () {
      return !(this.x === undefined && this.y === undefined)
    }
  },

  render (createElement) {
    let allowed = this.validateProps()

    if (allowed) {
      let { rows, cols } = calculateRowsCols(this.x, this.y)
      let options = this._props
      let ranges = this.parentBranch.domains
      let layout = calculateGridLayout(rows, cols, options, ranges)

      let slot = this.$scopedSlots.default
      let newSections = repeatSections(createElement, slot, layout, this.x, this.y)

      return createElement('g', { class: 'layout-repeat' }, newSections)
    }
  }
}
</script>
