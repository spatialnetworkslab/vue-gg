<script>
import { calculateGridLayout } from './utils/grid.js'
import { calculateRowsCols, repeatSections, createAxesProps } from './utils/repeat.js'
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'

import XAxis from '../Guides/XAxis.vue'
import YAxis from '../Guides/YAxis.vue'

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
    axes: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  computed: {
    _axes () {
      if (this.axes && this.axes.constructor === Array) {
        let axes = {}
        for (let axis of this.axes) {
          axes[axis] = null
        }
        return axes
      } else {
        return this.axes
      }
    }
  },

  methods: {
    validateProps () {
      if (this.x === undefined && this.y === undefined) {
        throw new Error(`'vgg-repeat' must have at least a 'x' or 'y' prop`)
      }
    },

    createAxes (createElement) {
      let elements = []
      let axes = this._axes
      let ranges = this.parentBranch.domains

      for (let axis in axes) {
        let axisOptions = axes[axis]

        if (['top', 'bottom'].includes(axis)) {
          let axesProps = createAxesProps(axis, axisOptions, ranges.y, this.y)
          let axes = axesProps.map(props => createElement(XAxis, { props }))
          elements.push(...axes)
        }

        if (['left', 'right'].includes(axis)) {
          let axesProps = createAxesProps(axis, axisOptions, ranges.x, this.x)
          let axes = axesProps.map(props => createElement(YAxis, { props }))
          elements.push(...axes)
        }
      }

      return elements
    }
  },

  render (createElement) {
    this.validateProps()

    let { rows, cols } = calculateRowsCols(this.x, this.y)
    let options = this._props
    let ranges = this.parentBranch.domains
    let layout = calculateGridLayout(rows, cols, options, ranges, this._axes)

    let slot = this.$scopedSlots.default
    let newSections = repeatSections(createElement, slot, layout, this.x, this.y)

    if (!this.axes) {
      return createElement('g', { class: 'layout-repeat' }, newSections)
    }

    if (this.axes) {
      let axes = this.createAxes(createElement)
      let elements = [...newSections, ...axes]
      return createElement('g', { class: 'layout-repeat' }, elements)
    }
  }
}
</script>
