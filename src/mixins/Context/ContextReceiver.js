export default {
  inject: ['$$context', '$coordinateSystemParent'],

  computed: {
    // reactivity hack
    update () {
      return this.$$context.coordinateSystem._update
    },

    transformer () {
      if (this.update) {
        let parentID = this.$coordinateSystemParent
        let transformer = this.$$context.coordinateSystem.getTransformer(parentID)

        return transformer
      }
    },

    parentCoordinateSystem () {
      if (this.update) {
        let parentID = this.$coordinateSystemParent
        let coordinateSystem = this.$$context.coordinateSystem.getBranch(parentID)

        return coordinateSystem
      }
    }
  }
}
