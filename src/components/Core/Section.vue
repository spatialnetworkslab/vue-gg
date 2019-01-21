<template>
  <g v-if="ready && allowScales">

    <slot />

  </g>
</template>

<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataProvider from '../../mixins/Data/DataProvider.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import CoordinateTransformation from '../../classes/CoordinateTree/CoordinateTransformation.js'
import id from '../../utils/id.js'

export default {
  mixins: [CoordinateTreeUser, DataProvider, DataReceiver],

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
      ready: false,
      id: id()
    }
  },

  computed: {
    _scales () {
      if (this.scales) {
        let scales = {}

        if (this.scales.hasOwnProperty('x')) {
          scales.x = this.scales.x
        } else {
          scales.x = this.ranges.x
        }
        if (this.scales.hasOwnProperty('y')) {
          scales.y = this.scales.y
        } else {
          scales.y = this.ranges.y
        }
        return scales
      }

      if (!this.scales) { return this.ranges }
    },

    allowScales () {
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

  watch: {
    type: 'updateCoordinateTreeBranch',
    scales: 'updateCoordinateTreeBranch',
    ranges: 'updateCoordinateTreeBranch'
  },

  beforeDestroy () {
    this.$$coordinateTree.removeBranch(this.id)
  },

  mounted () {
    this.setCoordinateTreeBranch()
    this.ready = true
  },

  methods: {
    setCoordinateTreeBranch () {
      let transformation = new CoordinateTransformation({
        type: this.type,
        scales: this._scales,
        ranges: this.ranges,
        dataInterface: this.$$dataInterface
      })

      this.$$coordinateTree.addBranch(
        this.id,
        this.$$coordinateTreeParent,
        transformation
      )
    },

    updateCoordinateTreeBranch () {
      let transformation = new CoordinateTransformation({
        type: this.type,
        scales: this._scales,
        ranges: this.ranges,
        dataInterface: this.$$dataInterface
      })

      this.$$coordinateTree.updateBranch(this.id, transformation)
    },

    checkAllowedObj (domain) {
      if (domain.constructor === Object) {
        return domain.hasOwnProperty('domain') && !domain.hasOwnProperty('variable')
      } else if (domain.constructor === Array) {
        return true
      } else {
        return false
      }
    }
  },

  provide () {
    let $$transform = this.$$coordinateTree.getTotalTransformation(this.id)
    let $$coordinateTreeParent = this.id

    return { $$transform, $$coordinateTreeParent, $$map: false }
  }
}
</script>
