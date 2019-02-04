import CoordinateTreeUser from '../CoordinateTreeUser.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform'],

  props: {
    interpolate: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    __update () {
      return this.$$coordinateTree._update
    },

    _interpolate () {
      // TODO check if interpolation is necessary (i.e. if all parent
      // coordinate transformations are linear)
      return this.interpolate
    }
  },

  render (createElement) {
    if (this.__update) {
      return this.renderSVG(createElement, this.aesthetics)
    }
  }
}
