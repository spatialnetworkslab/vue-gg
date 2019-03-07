import CoordinateTreeUser from '../CoordinateTreeUser.js'
import createSVGStyle from './utils/createSVGStyle.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform', '$$interactionManager'],

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

  beforeDestroy () {
    let listeners = this.getListeners()
    if (listeners.length > 0) {
      let uid = this._uid
      this.$$interactionManager.removeElement(uid, listeners)
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
    },

    getListeners () {
      let listeners = []
      if (!this.$options._parentListeners) { return listeners }

      const allowedListeners = ['click'] // TODO more

      for (let listener of allowedListeners) {
        if (this.$options._parentListeners.hasOwnProperty(listener)) {
          listeners.push(listener)
        }
      }

      return listeners
    }
  },

  render (createElement) {
    if (this.__update) {
      return this.renderSVG(createElement)
    }
  }
}
