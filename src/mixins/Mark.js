export default {
  inject: ['$$transform', '$$coordinateTree', '$$coordinateTreeParent'],

  computed: {
    __update () {
      return this.$$coordinateTree._update
    }
  }
}
