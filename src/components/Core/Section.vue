<template>
  <g
    v-if="ready && allowScales"
    class="section"
  >

    <slot />

  </g>
</template>

<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataProvider from '../../mixins/Data/DataProvider.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

import CoordinateTransformation from '../../classes/CoordinateTree/CoordinateTransformation.js'
import randomID from '../../utils/id.js'

export default {
  mixins: [CoordinateTreeUser, DataProvider, DataReceiver, ScaleReceiver],

  props: {
    type: {
      type: String,
      default: 'scale'
    },

    scales: {
      type: [Object, undefined],
      default: undefined
    },

    ranges: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ready: false
    }
  },

  computed: {
    _scales () {
      if (this.scales) {
        let scales = {}

        let hasX = this.scales.hasOwnProperty('x')
        let hasY = this.scales.hasOwnProperty('y')

        if (this.scales.hasOwnProperty('geo')) {
          if (hasX || hasY) {
            throw new Error(`Cannot set 'scale-x' or 'scale-y' when 'scale-geo' is defined`)
          }

          if (!this.$$dataInterface.hasColumn('geometry')) {
            throw new Error(`'scale-geo' is only allowed when data has geometry column`)
          }

          return this.scales
        }

        if (hasX) {
          scales.x = this.scales.x
        } else {
          scales.x = this.ranges.x
        }
        if (hasY) {
          scales.y = this.scales.y
        } else {
          scales.y = this.ranges.y
        }
        return scales
      }

      if (!this.scales) { return this.ranges }
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
        let allowedObjX = this.checkAllowedObj(this._scales.x)
        let allowedObjY = this.checkAllowedObj(this._scales.y)

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
        scales: this._scales,
        ranges: this.ranges,
        dataInterface: this.$$dataInterface,
        scaleManager: this.$$scaleManager
      })
      return transformation
    },
    coordinateTreeBranchID () {
      let id
      let parentData = this.$parent.$vnode.data
      if (parentData.attrs.id) {
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
        return domain.hasOwnProperty('domain') && !domain.hasOwnProperty('variable')
      } else if (domain.constructor === Array) {
        return true
      } else {
        return false
      }
    },

    same (oldVal, newVal) {
      return JSON.stringify(oldVal) === JSON.stringify(newVal)
    }
  },

  provide () {
    let $$transform = this.$$coordinateTree.getTotalTransformation(this.coordinateTreeBranchID)
    let $$coordinateTreeParent = this.coordinateTreeBranchID

    return { $$transform, $$coordinateTreeParent, $$map: false }
  }
}
</script>
