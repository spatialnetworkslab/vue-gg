import CoordinateTreeUser from '../CoordinateTreeUser.js'
import createSVGStyle from './utils/createSVGStyle.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform', '$$getLocalX', '$$getLocalY'],

  props: {
    interpolate: {
      type: [Boolean, undefined],
      default: undefined
    }
  },

  computed: {
    __update () {
      return this.parentBranch.updateCount
    },

    __interpolationNecessary () {
      return this.interpolationNecessary(this.$$coordinateTreeParent)
    },

    _interpolate () {
      if (this.interpolate !== undefined) { return this.interpolate }
      return this.__interpolationNecessary
    }
  },

  methods: {
    createSVGStyle,

    interpolationNecessary (id) {
      let currentLocation = this.$$coordinateTree.getBranch(id)
      if (currentLocation.type !== 'scale') { return true }

      while (currentLocation.parentID) {
        currentLocation = this.$$coordinateTree.getBranch(currentLocation.parentID)
        if (currentLocation.type !== 'scale') { return true }
      }

      return false
    }
  },

  render (createElement) {
    if (this.__update) {
      return this.renderSVG(createElement)
    }
  }
}
