import CoordinateTreeUser from '../CoordinateTreeUser.js'
import createSVGStyle from './utils/createSVGStyle.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform', '$$getLocalX', '$$getLocalY'],

  props: {
    interpolate: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    __update () {
      return this.parentBranch.updateCount
    },

    _interpolate () {
      // TODO check if interpolation is necessary (i.e. if all parent
      // coordinate transformations are linear)
      return this.interpolate
    }
  },

  methods: {
    createSVGStyle
  },

  render (createElement) {
    if (this.__update) {
      return this.renderSVG(createElement)
    }
  }
}
