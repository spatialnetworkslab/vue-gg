import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'
import DataReceiver from '@/mixins/DataReceiver.js'

export default {
  mixins: [CoordinateTreeUser, DataReceiver],

  inject: ['$$transform', '$$map'],

  computed: {
    __update () {
      return this.$$coordinateTree._update
    },

    context () {
      return {
        domains: this.$$dataContainer.getDomains(),
        metadata: this.$$dataContainer.getMetadata(),
        ranges: this.$$coordinateTree.getBranch(this.$$coordinateTreeParent).domains
      }
    }
  },

  methods: {
    default (prop, defaultVal) {
      if (!this.$$map) { return prop || defaultVal }
      if (this.$$map) {
        return prop.constructor === Object ? prop : { assign: prop || defaultVal }
      }
    }
  }
}
