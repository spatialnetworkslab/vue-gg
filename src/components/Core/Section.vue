<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataProvider from '../../mixins/Data/DataProvider.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'
import Rectangular from '../../mixins/Marks/Rectangular.js'

import CoordinateTransformation from '../../classes/CoordinateTree/CoordinateTransformation.js'
import randomID from '../../utils/id.js'

import { createAxisProps, calculateWidths } from './utils/section.js'
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
    }
  },

  data () {
    return {
      ready: false
    }
  },

  computed: {
    ranges () {
      let aes = this.coordinateSpecification
      let ranges = {
        x: [aes.x1, aes.x2],
        y: [aes.y1, aes.y2]
      }

      return ranges
    },

    innerRanges () {
      if (this.ready && this.allowScales) {
        let ranges = this.calculateInnerRanges()
        return ranges
      }
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
    transformation: 'updateCoordinateTreeBranch'
  },

  beforeDestroy () {
    this.$$coordinateTree.removeBranch(this.coordinateTreeBranchID)
  },

  mounted () {
    this.setCoordinateTreeBranch()
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

    updateCoordinateTreeBranch () {
      this.$$coordinateTree.updateBranch(this.coordinateTreeBranchID, this.transformation)
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

    calculateInnerRanges () {
      let slots = this.$scopedSlots
      let domains = this.transformation.domains

      let widths = calculateWidths(slots, domains)

      let innerRanges = {
        x: [domains.x[0] + widths.left, domains.x[1] - widths.right],
        y: [domains.y[0] + widths.bottom, domains.y[1] - widths.top]
      }

      return innerRanges
    },

    createAxesFromSlot (createElement) {
      let elements = []
      let slots = this.$scopedSlots
      let domains = this.transformation.domains
      let scales = this.scales

      let widths = calculateWidths(slots, domains)

      for (let slotName in slots) {
        if (['top', 'bottom'].includes(slotName)) {
          let props = createAxisProps(slots, slotName, domains, widths, scales)

          let axis = createElement(XAxis, { props })
          elements.push(axis)
        }

        if (['left', 'right'].includes(slotName)) {
          let props = createAxisProps(slots, slotName, domains, widths, scales)

          let axis = createElement(YAxis, { props })
          elements.push(axis)
        }
      }

      return elements
    }
  },

  provide () {
    let $$transform = this.$$coordinateTree.getTotalTransformation(this.coordinateTreeBranchID)
    let $$coordinateTreeParent = this.coordinateTreeBranchID

    return { $$transform, $$coordinateTreeParent }
  },

  render (createElement) {
    if (this.ready && this.allowScales) {
      let content = this.$scopedSlots.default()
      let axes = this.createAxesFromSlot(createElement)

      let elements = [...content, ...axes]

      return createElement('g', { class: 'section' }, elements)
    }
  }
}
</script>
