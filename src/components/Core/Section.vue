<template>
  <g v-if="ready && allowDomains">

    <slot />

  </g>
</template>

<script>
import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'
import DataReceiver from '@/mixins/Data/DataReceiver.js'

import CoordinateTransformation from '@/classes/CoordinateTree/CoordinateTransformation.js'
import id from '@/utils/id.js'

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
    },

    scale: {
      type: [String, Object],
      default: 'linear'
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
      }

      if (!this.domains) { return this.ranges }
    },

    allowDomains () {
      let xNotArray = this._domains.x.constructor !== Array
      let yNotArray = this._domains.y.constructor !== Array
      if (!this.$$dataContainer && (xNotArray || yNotArray)) {
        return false
      } else {
        return true
      }
    }
  },

  watch: {
    type: 'updateCoordinateTreeBranch',
    domains: 'updateCoordinateTreeBranch',
    ranges: 'updateCoordinateTreeBranch',
    scale: 'updateCoordinateTreeBranch'
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
        scale: this.scale,
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
        scale: this.scale,
        dataContainer: this.$$dataContainer
      })

      this.$$coordinateTree.updateBranch(this.id, transformation)
    }
  },

  provide () {
    let $$transform = this.$$coordinateTree.getTotalTransformation(this.id)
    let $$coordinateTreeParent = this.id

    return { $$transform, $$coordinateTreeParent, $$map: false }
  }
}
</script>
