export default {
  inject: ['$$coordinateTree', '$$coordinateTreeParent'],

  computed: {
    parentBranch () {
      return this.$$coordinateTree.getBranch(this.$$coordinateTreeParent)
    },

    parentRangeTypes () {
      return this.parentBranch.domainTypes
    }
  }
}
