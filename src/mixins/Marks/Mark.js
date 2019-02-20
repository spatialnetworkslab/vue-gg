import CoordinateTreeUser from '../CoordinateTreeUser.js'
import createSVGStyle from './utils/createSVGStyle.js'

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
<<<<<<< HEAD
      return this.$$coordinateTree._update
=======
      return this.parentBranch.updateCount
      // return this.$$coordinateTree._update
>>>>>>> d13099ddec0cfc1be573c638ee333ec64402b775
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
