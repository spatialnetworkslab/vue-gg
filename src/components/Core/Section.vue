<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataProvider from '../../mixins/Data/DataProvider.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'
import Rectangular from '../../mixins/Marks/Rectangular.js'
import SelectionManager from '../../mixins/Interactions/SelectionManager.js'

import CoordinateTransformation from '../../classes/CoordinateTree/CoordinateTransformation.js'

import { calculateWidths, createAxisProps } from './utils/section.js'
import { createPropCache, createWatchers } from './utils/propCache.js'

import Section from './Section.vue'
import XAxis from '../Guides/XAxis.vue'
import YAxis from '../Guides/YAxis.vue'
import XGrid from '../Guides/XGrid.vue'
import YGrid from '../Guides/YGrid.vue'

export default {
  mixins: [CoordinateTreeUser, DataProvider, ScaleReceiver, Rectangular, SelectionManager],

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

    axes: {
      type: [Array, Object, undefined],
      default: undefined
    },

    gridLines: {
      type: [Array, Object, undefined],
      default: undefined
    }
  },

  data () {
    return {
      ready: false,
      props: createPropCache(this, ['scaleX', 'scaleY', 'scaleGeo', 'axes', 'gridLines', 'select'])
    }
  },

  computed: {
    ranges () {
      let coords = this.coordinateSpecification
      return {
        x: [coords.x1, coords.x2],
        y: [coords.y1, coords.y2]
      }
    },

    scales () {
      if ((this.props.scaleX || this.props.scaleY || this.props.scaleGeo)) {
        let scales = {}
        if (this.props.scaleX) { scales.x = this.props.scaleX }
        if (this.props.scaleY) { scales.y = this.props.scaleY }
        if (this.props.scaleGeo) { scales.geo = this.props.scaleGeo }

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
      let transformation

      if (!this._axes) {
        transformation = new CoordinateTransformation({
          type: this.type,
          scales: this.scales,
          ranges: this.ranges,
          dataInterface: this.$$dataInterface,
          scaleManager: this.$$scaleManager
        })
      }

      if (this._axes) {
        // If there are axes, we will just do an identity transformation.
        // The actual transformation will then take place in the nested child section.
        transformation = new CoordinateTransformation({
          type: 'scale',
          scales: this.ranges,
          ranges: this.ranges,
          dataInterface: this.$$dataInterface,
          scaleManager: this.$$scaleManager
        })
      }

      return transformation
    },

    $$ownTransform () {
      return this.$$coordinateTree.getTotalTransformation(this.coordinateTreeBranchID)
    },

    coordinateTreeBranchID () {
      let id

      let parentData = this.$parent.$vnode.data
      if (parentData.attrs && parentData.attrs.id) {
        // use id if given
        id = parentData.attrs.id + '_' + this.uuid
      } else if (parentData.staticClass) {
        // fall back on class if no id is given
        let elClass = parentData.staticClass.replace(/\s+/g, '_')
        id = elClass + '_' + this.uuid
      } else {
        id = '_' + this.uuid
      }
      return id
    },

    _axes () {
      if (this.props.axes && this.props.axes.constructor === Array) {
        let axes = {}
        for (let axis of this.props.axes) {
          axes[axis] = {}
        }
        return axes
      } else {
        return this.props.axes
      }
    },

    axisWidths () {
      return calculateWidths(this._axes, this.coordinateSpecification)
    },

    nestedSectionProps () {
      let props = {}
      let coordinateSpecification = this.coordinateSpecification
      let axisWidths = this.axisWidths

      props.x1 = coordinateSpecification.x1 + axisWidths.left
      props.x2 = coordinateSpecification.x2 - axisWidths.right
      props.y1 = coordinateSpecification.y1 + axisWidths.bottom
      props.y2 = coordinateSpecification.y2 - axisWidths.top

      const forbiddenProps = [
        'x1', 'x2', 'x', 'w',
        'y1', 'y2', 'y', 'h',
        'axes'
      ]

      for (let prop in this._props) {
        if (!forbiddenProps.includes(prop)) {
          props[prop] = this._props[prop]
        }
      }

      props = this.replaceScales(props)

      return props
    },

    _gridLines () {
      if (this.props.gridLines && this.props.gridLines.constructor === Array) {
        let gridLines = {}
        for (let gridLine of this.props.gridLines) {
          gridLines[gridLine] = null
        }
        return gridLines
      } else {
        return this.props.gridLines
      }
    }
  },

  watch: {
    transformation: 'updateCoordinateTreeBranch'
  },

  beforeDestroy () {
    this.$$coordinateTree.removeBranch(this.coordinateTreeBranchID)
  },

  mounted () {
    this.setCoordinateTreeBranch()
    createWatchers(this, this.props)
    this.ready = true
  },

  methods: {
    setCoordinateTreeBranch () {
      this.$$coordinateTree.addBranch(
        this.coordinateTreeBranchID,
        this.$$coordinateTreeParent,
        this.transformation
      )
    },

    updateCoordinateTreeBranch (newVal, oldVal) {
      this.$$coordinateTree.updateBranch(this.coordinateTreeBranchID, this.transformation)
    },

    checkAllowedObj (domain) {
      if (domain.constructor === Object) {
        return domain.hasOwnProperty('domain')
      } else if (domain.constructor === Array) {
        return true
      } else if (domain.constructor === String && domain.startsWith('#')) {
        return true
      } else {
        return false
      }
    },

    createSection (createElement) {
      let props = this.nestedSectionProps
      let on = this.$options._parentListeners
      let slotContent = this.getSlotContent()

      return createElement(Section, { props, on }, slotContent)
    },

    createAxes (createElement) {
      let elements = []
      let widths = this.axisWidths
      let axes = this._axes
      let coords = this.coordinateSpecification
      let scales = this.scales

      for (let axis in axes) {
        let axisOptions = axes[axis]

        if (['top', 'bottom'].includes(axis)) {
          let props = createAxisProps(axis, axisOptions, coords, widths, scales)

          let axisElement = createElement(XAxis, { props })
          elements.push(axisElement)
        }

        if (['left', 'right'].includes(axis)) {
          let props = createAxisProps(axis, axisOptions, coords, widths, scales)

          let axisElement = createElement(YAxis, { props })
          elements.push(axisElement)
        }
      }

      return elements
    },

    createGridLines (createElement) {
      let gridLines = []

      const forbiddenProps = [
        'x1', 'x2', 'x', 'w',
        'y1', 'y2', 'y', 'h',
        'axes'
      ]

      for (let dim in this._gridLines) {
        if (dim !== 'x' && dim !== 'y') {
          throw new Error(`Invalid grid line: '${dim}'. Only 'x' and 'y' allowed`)
        }

        let gridLineProps = this._gridLines[dim]
        let props = {}

        for (let propKey in gridLineProps) {
          if (!forbiddenProps.includes(propKey)) {
            props[propKey] = gridLineProps[propKey]
          }
        }

        if (!props.hasOwnProperty('scale')) {
          props.scale = this.scales[dim]
        }

        let element = dim === 'x' ? XGrid : YGrid
        let gridLine = createElement(element, { props })
        gridLines.push(gridLine)
      }

      return gridLines
    },

    getSlotContent () {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default()
      } else if (this.$slots.default) {
        return this.$slots.default
      } else {
        return []
      }
    },

    replaceScales (props) {
      let coords = this.coordinateSpecification
      if (!props.scaleX) {
        props.scaleX = [coords.x1, coords.x2]
      }

      if (!props.scaleY) {
        props.scaleY = [coords.y1, coords.y2]
      }

      return props
    }
  },

  provide () {
    let $$transform = this.$$ownTransform
    let $$coordinateTreeParent = this.coordinateTreeBranchID
    return { $$transform, $$coordinateTreeParent }
  },

  render (createElement) {
    if (this.dataContainer !== false && this.ready && this.allowScales) {
      if (!this._axes) {
        let slotContent = this.getSlotContent()

        if (this.props.gridLines) {
          let gridLines = this.createGridLines(createElement)
          slotContent.push(...gridLines)
        }

        return createElement('g', { class: 'section' }, slotContent)
      }

      if (this._axes) {
        let section = this.createSection(createElement)
        let axes = this.createAxes(createElement)
        let content = [section, ...axes]

        return createElement('g', { class: 'section-with-axes' }, content)
      }
    }
  }
}
</script>
