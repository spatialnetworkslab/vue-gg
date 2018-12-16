<template>
  <g v-if="ready && allowDomains">

    <slot />

  </g>
</template>

<script>
import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'
import DataReceiver from '@/mixins/Data/DataReceiver.js'

import CoordinateTransformation from '@/classes/CoordinateTransformation.js'
import id from '@/utils/id.js'
import parseDomain from './utils/parseDomain.js'

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

        domains.x = parseDomain(this.domains.x, this.$$dataContainer)
        domains.y = parseDomain(this.domains.y, this.$$dataContainer)

        return domains
      }

      if (!this.domains) { return this.ranges }
    },

    allowDomains () {
      let xNotArray = this.domains.x.constructor !== Array
      let yNotArray = this.domains.y.constructor !== Array
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
        ranges: this.ranges
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
        ranges: this.ranges
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
