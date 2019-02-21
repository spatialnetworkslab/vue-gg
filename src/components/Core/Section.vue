<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataProvider from '../../mixins/Data/DataProvider.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'
import Rectangular from '../../mixins/Marks/Rectangular.js'

import CoordinateTransformation from '../../classes/CoordinateTree/CoordinateTransformation.js'
import randomID from '../../utils/id.js'

import { calculateWidths, createAxisProps } from './utils/section.js'
import Section from './Section.vue'
import XAxis from '../Guides/XAxis.vue'
import YAxis from '../Guides/YAxis.vue'

export default {
  mixins: [CoordinateTreeUser, DataProvider, DataReceiver, ScaleReceiver, Rectangular],

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
    },

    axes: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  data () {
    return {
      ready: false
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
    },

    ranges () {
      let aes = this.coordinateSpecification
      let ranges = {
        x: [aes.x1, aes.x2],
        y: [aes.y1, aes.y2]
      }

      return ranges
    },

    scales () {
      if (this.scaleX || this.scaleY || this.scaleGeo) {
        let scales = {}
        if (this.scaleX) { scales.x = this.scaleX }
        if (this.scaleY) { scales.y = this.scaleY }
        if (this.scaleGeo) { scales.geo = this.scaleGeo }

        let hasX = scales.hasOwnProperty('x')
        let hasY = scales.hasOwnProperty('y')

        if (scales.hasOwnProperty('geo')) {
          if (hasX || hasY) {
            throw new Error(`Cannot set 'scale-x' or 'scale-y' when 'scale-geo' is defined`)
          }

          if (!this.$$dataInterface.hasColumn('geometry')) {
            throw new Error(`'scale-geo' is only allowed when data has geometry column`)
          }

          return scales
        }

        if (!hasX) {
          scales.x = this.ranges.x
        }
        if (!hasY) {
          scales.y = this.ranges.y
        }

        return scales
      } else {
        return this.ranges
      }
    },

    allowScales () {
      if (this.scales && this.scales.geo) {
        return this.$$dataInterface.ready()
      } else {
        // Allowed means: 'allowed IF the data is NOT READY'.
        // So if the data is NOT READY, BOTH of these have to be TRUE.
        // If this is not the case, we have to return FALSE.

        // This is to avoid getting errors when the user wants to create a scale
        // using a domain of a variable that is not available yet.
        let allowedObjX = this.checkAllowedObj(this.scales.x)
        let allowedObjY = this.checkAllowedObj(this.scales.y)

        if (!this.$$dataInterface.ready()) {
          if (allowedObjX && allowedObjY) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    },

    transformation () {
      let transformation = new CoordinateTransformation({
        type: this.type,
        scales: this.scales,
        ranges: this.ranges,
        dataInterface: this.$$dataInterface,
        scaleManager: this.$$scaleManager
      })
      return transformation
    },

    coordinateTreeBranchID () {
      let id
      let parentData = this.$parent.$vnode.data
      if (parentData.attrs && parentData.attrs.id) {
        // use id if given
        id = parentData.attrs.id + '_' + this.randomID
      } else if (parentData.staticClass) {
        // fall back on class if no id is given
        let elClass = parentData.staticClass.replace(/\s+/g, '_')
        id = elClass + '_' + this.randomID
      } else {
        id = '_' + randomID()
      }
      return id
    }
  },

  watch: {
    transformation: 'updateCoordinateTreeBranch',
    axes: {
      handler: 'handleUpdateAxes',
      deep: true
    }
  },

  beforeDestroy () {
    if (!this.axes) {
      this.$$coordinateTree.removeBranch(this.coordinateTreeBranchID)
    }
  },

  mounted () {
    if (!this.axes) {
      this.setCoordinateTreeBranch()
      this.ready = true
    }
  },

  methods: {
    setCoordinateTreeBranch () {
      this.$$coordinateTree.addBranch(
        this.coordinateTreeBranchID,
        this.$$coordinateTreeParent,
        this.transformation
      )
    },

    updateCoordinateTreeBranch () {
      if (!this.axes) {
        this.$$coordinateTree.updateBranch(this.coordinateTreeBranchID, this.transformation)
      }
    },

    checkAllowedObj (domain) {
      if (domain.constructor === Object) {
        return domain.hasOwnProperty('domain')
      } else if (domain.constructor === Array) {
        return true
      } else {
        return false
      }
    },

    handleUpdateAxes (newVal, oldVal) {
      // No axes to axes
      if (!oldVal && newVal) {
        this.$$coordinateTree.removeBranch(this.coordinateTreeBranchID)
      }

      // Axes to no axes
      if (oldVal && !newVal) {
        this.ready = false
        this.setCoordinateTreeBranch()
        this.ready = true
      }
    },

    createSection (createElement, widths) {
      let props = this.updatePositionProps(this._props, widths)
      let slotContent = this.$scopedSlots.default()
      return createElement(Section, { props }, slotContent)
    },

    createAxes (createElement, widths) {
      let elements = []
      let axes = this._axes
      let ranges = this.ranges
      let scales = this.scales

      for (let axis in axes) {
        let axisOptions = axes[axis]

        if (['top', 'bottom'].includes(axis)) {
          let props = createAxisProps(axis, axisOptions, ranges, widths, scales)

          let axisElement = createElement(XAxis, { props })
          elements.push(axisElement)
        }

        if (['left', 'right'].includes(axis)) {
          let props = createAxisProps(axis, axisOptions, ranges, widths, scales)

          let axisElement = createElement(YAxis, { props })
          elements.push(axisElement)
        }
      }

      return elements
    },

    updatePositionProps (props, widths) {
      let newProps = {}
      let coordinateSpecification = this.coordinateSpecification
      let positionProps = ['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h']

      for (let prop in props) {
        if (!positionProps.includes(prop) && prop !== 'axes') {
          newProps[prop] = props[prop]
        }
      }

      newProps.x1 = coordinateSpecification.x1 + widths.left
      newProps.x2 = coordinateSpecification.x2 - widths.right
      newProps.y1 = coordinateSpecification.y1 + widths.bottom
      newProps.y2 = coordinateSpecification.y2 - widths.top

      return newProps
    }
  },

  provide () {
    if (!this.axes) {
      let $$transform = this.$$coordinateTree.getTotalTransformation(this.coordinateTreeBranchID)
      let $$coordinateTreeParent = this.coordinateTreeBranchID

      return { $$transform, $$coordinateTreeParent }
    }
  },

  render (createElement) {
    if (!this.axes) {
      if (this.ready && this.allowScales) {
        let content = this.$scopedSlots.default()
        return createElement('g', { class: 'section' }, content)
      }
    }

    if (this.axes) {
      if (this.allowScales) {
        let widths = calculateWidths(this._axes, this.ranges)

        let section = this.createSection(createElement, widths)
        let axes = this.createAxes(createElement, widths)

        return createElement('g', { class: 'section-with-axes' }, [
          section, ...axes
        ])
      }
    }
  }
}
</script>
