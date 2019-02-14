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
      if (this.$$coordinateTree._update) {console.log('update')}
      return this.$$coordinateTree._update
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
