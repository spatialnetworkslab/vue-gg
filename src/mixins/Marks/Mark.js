import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'
import DataReceiver from '@/mixins/Data/DataReceiver.js'

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
    parseMappable (prop, defaultVal, funcProp = false) {
      if (!this.$$map) {
        if (is(prop) && prop.constructor === Object) {
          throw new Error('Trying to map without vgg-map component.')
        }

        if (is(prop) && prop.constructor === Function && funcProp === false) {
          throw new Error('Trying to map without vgg-map component.')
        }

        if (is(prop)) { return prop }
        if (isnt(prop)) { return defaultVal }
      }
      if (this.$$map) {
        let isObject = is(prop) && prop.constructor === Object
        let isFunction = is(prop) && prop.constructor === Function

        if (is(prop) && isObject) { return prop }
        if (is(prop) && isFunction) { return { func: prop } }
        if (is(prop) && !isObject && !isFunction) { return { assign: prop } }
        if (isnt(prop)) { return { assign: defaultVal } }
      }
    },

    parseUnmappable (prop, defaultVal) {
      if (!this.$$map) {
        if (is(prop) && (prop.constructor === Object || prop.constructor === Function)) {
          throw new Error('Trying to map without vgg-map component.')
        }

        if (is(prop)) { return prop }
        if (isnt(prop)) { return defaultVal }
      }

      if (this.$$map) {
        if (is(prop) && prop.constructor === Object) {
          throw new Error(`Property '${prop}' is unmappable.`)
        }

        let isFunction = is(prop) && prop.constructor === Function

        if (is(prop) && isFunction) { return { func: prop } }
        if (is(prop) && !isFunction) { return { assign: prop } }
        if (isnt(prop)) { return { assign: defaultVal } }
      }
    }
  }
}
