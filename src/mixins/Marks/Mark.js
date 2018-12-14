import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'
import DataReceiver from '@/mixins/DataReceiver.js'

import { is, isnt } from '@/utils/equals.js'

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
      if (!this.$$map) {
        if (is(prop) && prop.constructor === Object) {
          throw new Error('Error: trying to map without vgg-map component.')
        }

        // return prop || defaultVal
        if (is(prop)) { return prop }
        if (isnt(prop)) { return defaultVal }
      }
      if (this.$$map) {
        if (is(prop) && prop.constructor === Object) { return prop }
        if (is(prop) && prop.constructor !== Object) { return { assign: prop } }
        if (isnt(prop)) { return { assign: defaultVal } }
      }
    }
  }
}
