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

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  props: {
    type: {
      type: String,
      default: 'scale'
    },

    scale: {
      type: String,
      default: 'linear'
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

        let x = this.domains.x
        let y = this.domains.y

        if (x.constructor === Array) {
          domains.x = x
        }

        if (x.constructor === Function) {
          if (this.$$dataContainer) {
            let context = {
              domains: this.$$dataContainer.getDomains(),
              metadata: this.$$dataContainer.getMetadata()
            }

            domains.x = x(context)
          } else {
            // If no data is available yet, set domain to range for now
            domains.x = this.ranges.x
          }
        }

        if (y.constructor === Array) {
          domains.y = y
        }

        if (y.constructor === Function) {
          if (this.$$dataContainer) {
            let context = {
              domains: this.$$dataContainer.getDomains(),
              metadata: this.$$dataContainer.getMetadata()
            }

            domains.y = y(context)
          } else {
            // If no data is available yet, set domain to range for now
            domains.y = this.ranges.y
          }
        }

        return domains
      }

      if (!this.domains) { return this.ranges }
    },

    allowDomains () {
      let xFunction = this.domains.x.constructor === Function
      let yFunction = this.domains.y.constructor === Function
      if (!this.$$dataContainer && (xFunction || yFunction)) {
        return false
      } else {
        return true
      }
    }
  },

  watch: {
    type: 'updateCoordinateTreeBranch',
    scale: 'updateCoordinateTreeBranch',
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
        scale: this.scale,
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
        scale: this.scale,
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
