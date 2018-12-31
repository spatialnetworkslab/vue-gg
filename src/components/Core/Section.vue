<template>
  <g v-if="ready && allowDomains">

    <slot />

  </g>
</template>

<script>
import CoordinateTreeUser from '../../mixins/CoordinateTreeUser.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'

import CoordinateTransformation from '../../classes/CoordinateTree/CoordinateTransformation.js'
import id from '../../utils/id.js'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  props: {
    type: {
      type: String,
      default: 'scale'
    },

    domains: {
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
    _domains () {
      if (this.domains) {
        let domains = {}

        if (this.domains.hasOwnProperty('x')) {
          domains.x = this.domains.x
        } else {
          domains.x = this.ranges.x
        }
        if (this.domains.hasOwnProperty('y')) {
          domains.y = this.domains.y
        } else {
          domains.y = this.ranges.y
        }
        return domains
      }

      if (!this.domains) { return this.ranges }
    },

    allowDomains () {
      // Allowed means: 'allowed IF there is NO DATACONTAINER'.
      // So if there is NO DATACONTAINER, BOTH of these have to be TRUE.
      // If this is not the case, we have to return FALSE.
      let allowedObjX = this.checkAllowedObj(this._domains.x)
      let allowedObjY = this.checkAllowedObj(this._domains.y)

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
    domains: 'updateCoordinateTreeBranch',
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
        domains: this._domains,
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
        domains: this._domains,
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
