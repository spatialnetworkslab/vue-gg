export default {
  inject: ['$$coordinateTree', '$$coordinateTreeParent'],

  data () {
  	return {
  		parentBranch: this.$$coordinateTree.getBranch(this.$$coordinateTreeParent)
  	}
  },

  computed: {
    parentRangeTypes () {
      return this.parentBranch.domainTypes
    },
  },

  watch: {
  	$$transform: 'getParent'
  },

  methods: {
  	getParent () {
  		this.parentBranch = this.$$coordinateTree.getBranch(this.$$coordinateTreeParent)
  	}
  }
}
