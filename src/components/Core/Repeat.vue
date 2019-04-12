<script>
import { calculateGridLayout } from './utils/grid.js'
import { calculateRowsCols, repeatComponents } from './utils/repeat.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

import { calculateWidths, createAxisProps } from './utils/section.js'

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
    },
    axes: {
      type: [Array, Object, undefined],
      default: undefined
    },
    start: {
      type: String,
      default: 'b',
      validator: s => ['b', 't'].includes(s)
    }
  },

  computed: {
    _axes () {
      if (this.axes && this.axes.constructor === Array) {
        let axes = {}
        for (let axis of this.axes) {
          axes[axis] = {}
        }
        return axes
      } else {
        return this.axes
      }
    },

    coords () {
      let domains = this.parentBranch.domains
      return { x1: domains.x[0], x2: domains.x[1], y1: domains.y[0], y2: domains.y[1] }
    },

    rowsCols () {
      return calculateRowsCols(this.x, this.y)
    },

    axisWidths () {
      let rowsCols = this.rowsCols

      let widths = calculateWidths(this._axes, this.coords)
      widths.bottom = Math.round(widths.bottom / rowsCols.rows)
      widths.top = Math.round(widths.top / rowsCols.rows)
      widths.left = Math.round(widths.left / rowsCols.cols)
      widths.right = Math.round(widths.right / rowsCols.cols)

      return widths
    },

    ranges () {
      let axisWidths = this.axisWidths

      let domains = this.parentBranch.domains

      domains.x[0] = domains.x[0] + axisWidths.left
      domains.x[1] = domains.x[1] - axisWidths.right
      domains.y[0] = domains.y[0] + axisWidths.bottom
      domains.y[1] = domains.y[1] - axisWidths.top

      return domains
    }
  },

  methods: {
    validateProps () {
      if (this.x === undefined && this.y === undefined) {
        throw new Error(`'vgg-repeat' must have at least a 'x' or 'y' prop`)
      }
    },

    nudgeLayout (l) {
      let axisWidths = this.axisWidths

      let newLayout = []

      let { rows, cols } = this.rowsCols
      for (let i = 0; i < l.length; i++) {
        let layout = l[i]

        if (i < cols) {
          layout.y1 = layout.y1 - axisWidths.bottom
        }

        if (i % cols === 0) {
          layout.x1 = layout.x1 - axisWidths.left
        }

        if (i >= (cols * (rows - 1 ))) {
          layout.y2 = layout.y2 + axisWidths.top
        }

        if ((i + 1) % cols === 0) {
          layout.x2 = layout.x2 + axisWidths.right
        }

        newLayout.push(layout)
      }

      return newLayout
    }
  },

  render (createElement) {
    this.validateProps()

    let { rows, cols } = this.rowsCols
    let options = this._props
    let ranges = this.ranges
    // console.log(calculateRowsCols(this.x, this.y), ranges, this.axisWidths)
    let bottomAxisWidth = this.axisWidths
    let start = this.start
    let layout = calculateGridLayout(rows, cols, options, ranges, undefined, start)
    layout = this.nudgeLayout(layout)
    let sides = this.sides

    let slot = this.$scopedSlots.default
    let newSections = repeatComponents(slot, layout, this.x, this.y, sides, this.axes)

    return createElement('g', { class: 'layout-repeat' }, newSections)
  }
}
</script>
