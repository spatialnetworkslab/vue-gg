import CoordinateTreeUser from '@/mixins/CoordinateTreeUser.js'
import DataReceiver from '@/mixins/Data/DataReceiver.js'

import { is, isnt } from '@/utils/equals.js'
import convertToNumeric from '@/utils/convertToNumeric.js'

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
        ranges: this.parentBranch.domains,
        parentBranch: this.parentBranch
      }
    }
  },

  methods: {
    parseCoord (prop, dimension, wh) {
      let parentRangeType = this.parentRangeTypes[dimension]

      if (!this.$$map) {
        if (is(prop) && prop.constructor === Object) {
          throw new Error('Trying to map without vgg-map component.')
        }

        if (is(prop) && prop.constructor === Function) {
          throw new Error('Trying to map without vgg-map component.')
        }

        if (is(prop)) {
          // Here we check whether the passed prop (String, Number, etc)
          // is compatible with the parent domain (categorical, quantitative, etc)
          if (invalidValueForRangeType(prop, parentRangeType)) {
            throw new Error(`Invalid input ${prop} for parent Section domain type ${parentRangeType}`)
          } else {
            if (['categorical', 'temporal'].includes(parentRangeType)) {
              if (wh) {
                throw new Error(`Cannot set 'w' or 'h' value in parent domain '${parentRangeType}'`)
              }
              // We will already convert categorical and temporal data here.
              return convertToNumeric(prop, dimension, this.parentBranch)
            }
            return prop
          }
        }
        if (isnt(prop)) {
          return undefined
        }
      }

      if (this.$$map) {
        let isObject = is(prop) && prop.constructor === Object
        let isFunction = is(prop) && prop.constructor === Function

        if (is(prop) && isObject) {
          // block object mapping syntax if used with categorical or temporal
          // parent domain
          if (['categorical', 'temporal'].includes(parentRangeType) && prop.hasOwnProperty('scale')) {
            throw new Error(`Cannot scale ${prop} to parent Section domain type ${parentRangeType}`)
          }
          return prop
        }
        if (is(prop) && isFunction) { return { func: prop } }
        if (is(prop) && !isObject && !isFunction) {
          // Here we check whether the passed prop (String, Number, etc)
          // is compatible with the parent domain (categorical, quantitative, etc)
          if (invalidValueForRangeType(prop, parentRangeType)) {
            throw new Error(`Invalid input ${prop} for parent Section domain type ${parentRangeType}`)
          } else {
            if (['categorical', 'temporal'].includes(parentRangeType)) {
              if (wh) {
                throw new Error(`Cannot set 'w' or 'h' value in parent domain '${parentRangeType}'`)
              }
              // We will already convert categorical and temporal data here.
              return { assign: convertToNumeric(prop, dimension, this.parentBranch) }
            }
            return { assign: prop }
          }
        }
        if (isnt(prop)) {
          return { assign: undefined }
        }
      }
    },

    parseMappable (prop, defaultVal, funcProp = false) {
      if (prop && funcProp) {
        for (let key in this.parentRangeTypes) {
          if (['categorical', 'temporal'].includes(this.parentRangeTypes[key])) {
            throw new Error(`
              Cannot use :func prop on 'vgg-line' in combination with
              '${this.parentRangeTypes[key]}' parent domain
            `)
          }
        }
      }

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

function invalidValueForRangeType (value, rangeType) {
  if (rangeType === 'quantitative') {
    return value.constructor !== Number
  } else if (rangeType === 'categorical') {
    return value.constructor !== String
  } else if (rangeType === 'temporal') {
    return value.constructor !== Date
  }
}
