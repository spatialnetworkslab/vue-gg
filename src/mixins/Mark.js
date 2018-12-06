export default {
  inject: ['$$transform', '$$coordinateTree'],

  computed: {
    __update () {
      return this.$$coordinateTree._update
    }
  }
}
