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
    },
    sides: {
      type: [Array, undefined],
      default: undefined,
      validator: sides => sides.every(
        side => ['left', 'right', 'top', 'bottom'].includes(side)
      )
    }
  },

  methods: {
    validateProps () {
      if (this.x === undefined && this.y === undefined) {
        throw new Error(`'vgg-repeat' must have at least a 'x' or 'y' prop`)
      }
    }
  },

  render (createElement) {
    this.validateProps()

    let { rows, cols } = calculateRowsCols(this.x, this.y)
    let options = this._props
    let ranges = this.parentBranch.domains
    let layout = calculateGridLayout(rows, cols, options, ranges)
    let sides = this.sides

    let slot = this.$scopedSlots.default
    let newSections = repeatSections(createElement, slot, layout, this.x, this.y, sides)

    return createElement('g', { class: 'layout-repeat' }, newSections)
  }
}
</script>
