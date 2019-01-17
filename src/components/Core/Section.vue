<template>
  <g v-if="ready && allowScales">

    <slot />

  </g>
</template>

<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataTransformer from '../../mixins/Data/DataTransformer.js'

import CoordinateTransformation from '../../classes/CoordinateTree/CoordinateTransformation.js'
import id from '../../utils/id.js'

export default {
  mixins: [CoordinateTreeUser, DataTransformer],

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
      // Allowed means: 'allowed IF there is NO DATACONTAINER'.
      // So if there is NO DATACONTAINER, BOTH of these have to be TRUE.
      // If this is not the case, we have to return FALSE.
      let allowedObjX = this.checkAllowedObj(this._scales.x)
      let allowedObjY = this.checkAllowedObj(this._scales.y)

      if (!this.$$dataContainer) {
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
        dataContainer: this.$$dataContainer
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
        dataContainer: this.$$dataContainer
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
