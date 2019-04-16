import CoordinateTreeUser from '../CoordinateTreeUser.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform', '$$interactionManager', '$$sectionParentChain'],

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
    },

    events () {
      if (!this.$options._parentListeners) { return undefined }

      const allowedEvents = ['click', 'hover', 'mouseover', 'mouseout', 'select', 'deselect']

      let events = {}
      let moreThanZeroAllowedEvents = false

      for (let event of allowedEvents) {
        if (this.$options._parentListeners.hasOwnProperty(event)) {
          events[event] = this.$options._parentListeners[event]
          moreThanZeroAllowedEvents = true
        }
      }

      return moreThanZeroAllowedEvents ? events : undefined
    },

    sectionParentChain () {
      return JSON.stringify(this.$$sectionParentChain)
    },

    _renderOptions () {
      return {
        $$transform: this.$$transform,
        props: this._props,
        addToSpatialIndex: this.addToSpatialIndex,
        interpolate: this._interpolate,
        pathType: this.pathType,
        $$coordinateTreeParent: this.$$coordinateTreeParent,
        $$coordinateTree: this.$$coordinateTree,
        parentBranch: this.parentBranch
      }
    }
  },

  methods: {
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
      return this.renderSVG(createElement, this._renderOptions)
    }
  }
}
