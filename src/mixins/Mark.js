import CoordinateTreeUser from './CoordinateTreeUser.js'

export default {
  mixins: [CoordinateTreeUser],

  inject: ['$$transform'],

  computed: {
    __update () {
      return this.$$coordinateTree._update
    }
  }
}
